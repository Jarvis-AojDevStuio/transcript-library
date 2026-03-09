#!/usr/bin/env bun
/**
 * RefactorVerifier.hook.ts - Refactor Result Verification (SubagentStop)
 *
 * PURPOSE:
 * After a Codex agent completes (ExecuteRefactor workflow), verifies that
 * the refactor results match the Move Map. Checks that source files moved,
 * destinations exist, and no stale imports remain.
 *
 * TRIGGER: SubagentStop — fires when any subagent stops. Filters to only
 * act when the agent output contains Move Map markers.
 *
 * INPUT:
 * - SubagentStop event with transcript/stdout
 *
 * OUTPUT:
 * - stdout: empty (async hook)
 * - stderr: warning if verification score < 1.0
 * - exit(0): Always
 *
 * SIDE EFFECTS:
 * - Writes to: MEMORY/STATE/refactor-results.jsonl
 * - Reads: MEMORY/STATE/repo-architect-session.json
 *
 * INTER-HOOK RELATIONSHIPS:
 * - COORDINATES WITH: StructureValidator.hook.ts (reads same session state)
 * - MUST RUN AFTER: Codex/subagent refactor execution
 *
 * ERROR HANDLING:
 * - No session state: Exit silently
 * - No Move Map: Exit silently
 * - File system errors: Count as failed moves
 *
 * PERFORMANCE:
 * - Non-blocking: Yes (async: true)
 * - Typical execution: <2s (file existence checks + grep)
 * - Design: Sequential file checks, one grep for stale imports
 */

import { existsSync, readFileSync, appendFileSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";
import { paiPath } from "../../../hooks/lib/paths";
import { withTimeout } from "../../../hooks/lib/hook-runner";

// ========================================
// Types
// ========================================

interface SubagentStopInput {
  session_id: string;
  transcript?: string;
  stdout?: string;
  stderr?: string;
  [key: string]: unknown;
}

interface SessionState {
  project_path: string;
  framework: string;
  expected_dirs: string[];
  move_map?: Array<{ from: string; to: string }>;
  phase?: string;
  updated_at?: string;
}

interface MoveVerification {
  from: string;
  to: string;
  source_removed: boolean;
  dest_exists: boolean;
  dest_non_empty: boolean;
  verified: boolean;
  reason?: string;
}

interface RefactorLogEntry {
  timestamp: string;
  session_id: string;
  project_path: string;
  total_moves: number;
  verified_moves: number;
  failed_moves: number;
  stale_imports: number;
  score: number;
  failures: Array<{ from: string; to: string; reason: string }>;
}

// ========================================
// Session State
// ========================================

function loadSessionState(): SessionState | null {
  try {
    const sessionPath = paiPath("MEMORY", "STATE", "repo-architect-session.json");
    if (!existsSync(sessionPath)) return null;
    const data = JSON.parse(readFileSync(sessionPath, "utf-8"));
    if (!data.project_path || !data.move_map || data.move_map.length === 0) return null;
    return data;
  } catch {
    return null;
  }
}

// ========================================
// Move Verification
// ========================================

function verifyMove(projectPath: string, move: { from: string; to: string }): MoveVerification {
  const fromPath = join(projectPath, move.from);
  const toPath = join(projectPath, move.to);

  const source_removed = !existsSync(fromPath);
  const dest_exists = existsSync(toPath);

  let dest_non_empty = false;
  if (dest_exists) {
    try {
      const content = readFileSync(toPath, "utf-8");
      dest_non_empty = content.length > 0;
    } catch {
      // Directory — check if it has contents
      try {
        dest_non_empty = readdirSync(toPath).length > 0;
      } catch {
        dest_non_empty = false;
      }
    }
  }

  const verified = source_removed && dest_exists && dest_non_empty;
  let reason: string | undefined;

  if (!source_removed) reason = "source still exists at old path";
  else if (!dest_exists) reason = "destination missing at new path";
  else if (!dest_non_empty) reason = "destination exists but is empty";

  return {
    from: move.from,
    to: move.to,
    source_removed,
    dest_exists,
    dest_non_empty,
    verified,
    reason,
  };
}

// ========================================
// Stale Import Detection
// ========================================

async function countStaleImports(
  projectPath: string,
  moves: Array<{ from: string; to: string }>,
): Promise<number> {
  let count = 0;

  for (const move of moves) {
    try {
      // Use Bun's built-in to run rg for stale old paths
      const proc = Bun.spawn(
        ["rg", "--count", "--no-filename", move.from, projectPath, "--type", "ts", "--type", "js"],
        { stdout: "pipe", stderr: "null" },
      );
      const output = await new Response(proc.stdout).text();
      const matches = output.trim().split("\n").filter(Boolean);
      count += matches.reduce((sum, line) => sum + (parseInt(line) || 0), 0);
    } catch {
      // rg not found or no matches — fine
    }
  }

  return count;
}

// ========================================
// Quality Logging
// ========================================

function logResults(entry: RefactorLogEntry): void {
  try {
    const logPath = paiPath("MEMORY", "STATE", "refactor-results.jsonl");
    const dir = logPath.substring(0, logPath.lastIndexOf("/"));
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    appendFileSync(logPath, JSON.stringify(entry) + "\n");
  } catch {
    // Silent — async hook
  }
}

// ========================================
// Relevance Filter
// ========================================

function isRefactorRelated(input: SubagentStopInput): boolean {
  const text = [input.transcript || "", input.stdout || ""].join("\n").toLowerCase();
  return (
    text.includes("move map") ||
    text.includes("refactor") ||
    text.includes("restructur") ||
    text.includes("migration phase")
  );
}

// ========================================
// Main
// ========================================

async function main(): Promise<void> {
  let input: SubagentStopInput;

  try {
    const text = await Promise.race([
      Bun.stdin.text(),
      new Promise<string>((_, reject) => setTimeout(() => reject(new Error("timeout")), 200)),
    ]);

    if (!text.trim()) return;
    input = JSON.parse(text);
  } catch {
    return;
  }

  // Filter: only act on refactor-related agent output
  if (!isRefactorRelated(input)) return;

  // Load session state
  const session = loadSessionState();
  if (!session || !session.move_map || session.move_map.length === 0) return;

  // Verify each move
  const results = session.move_map.map((move) => verifyMove(session.project_path, move));
  const verified = results.filter((r) => r.verified).length;
  const failed = results.filter((r) => !r.verified);
  const score = session.move_map.length > 0 ? verified / session.move_map.length : 1;

  // Check for stale imports
  const staleImports = await countStaleImports(session.project_path, session.move_map);

  // Log results
  logResults({
    timestamp: new Date().toISOString(),
    session_id: input.session_id || process.env.SESSION_ID || "unknown",
    project_path: session.project_path,
    total_moves: session.move_map.length,
    verified_moves: verified,
    failed_moves: failed.length,
    stale_imports: staleImports,
    score,
    failures: failed.map((f) => ({
      from: f.from,
      to: f.to,
      reason: f.reason || "unknown",
    })),
  });

  // Warn if not perfect
  if (score < 1.0 || staleImports > 0) {
    const parts = [
      `[RefactorVerifier] Refactor verification: ${verified}/${session.move_map.length} moves verified (${(score * 100).toFixed(0)}%).`,
    ];
    if (failed.length > 0) {
      parts.push(
        `Failed moves: ${failed.map((f) => `${f.from} → ${f.to} (${f.reason})`).join("; ")}.`,
      );
    }
    if (staleImports > 0) {
      parts.push(`Found ${staleImports} stale import reference(s) to old paths.`);
    }
    console.error(parts.join(" "));
  }
}

// Run with standard timeout — file I/O + subprocess involved
withTimeout("RefactorVerifier", "standard", main);
