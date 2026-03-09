#!/usr/bin/env bun
/**
 * StructureValidator.hook.ts - Repo Structure Validation (PostToolUse → Write|Bash)
 *
 * PURPOSE:
 * After files/dirs are created during NewProject or RefactorPlan execution,
 * validates that the resulting structure matches the selected framework archetype.
 *
 * TRIGGER: PostToolUse — fires after Write or Bash tool calls while RepoArchitect is loaded.
 *
 * INPUT:
 * - PostToolUse event with tool_name, tool_input, tool_response
 *
 * OUTPUT:
 * - stdout: empty (async hook)
 * - stderr: warning if structure score < 0.75
 * - exit(0): Always
 *
 * SIDE EFFECTS:
 * - Writes to: MEMORY/STATE/repo-structure-quality.jsonl
 * - Reads: MEMORY/STATE/repo-architect-session.json
 *
 * INTER-HOOK RELATIONSHIPS:
 * - COORDINATES WITH: RefactorVerifier.hook.ts (reads same session state)
 * - MUST RUN AFTER: File/directory creation tool calls
 *
 * ERROR HANDLING:
 * - No session state: Exit silently (skill not actively in use)
 * - Parse errors: Exit silently
 * - File system errors: Log and continue
 *
 * PERFORMANCE:
 * - Non-blocking: Yes (async: true)
 * - Typical execution: <500ms
 * - Design: Quick glob check, no network calls
 */

import { existsSync, readFileSync, appendFileSync, mkdirSync, readdirSync } from "fs";
import { paiPath } from "../../../hooks/lib/paths";
import { withTimeout } from "../../../hooks/lib/hook-runner";

// ========================================
// Types
// ========================================

interface PostToolUseInput {
  tool_name: string;
  tool_input?: {
    command?: string;
    file_path?: string;
    [key: string]: unknown;
  };
  tool_response?: string;
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

interface QualityLogEntry {
  timestamp: string;
  session_id: string;
  project_path: string;
  framework: string;
  expected_dirs: string[];
  actual_dirs: string[];
  score: number;
  missing: string[];
  unexpected: string[];
  severity: "PASS" | "WARN" | "FAIL";
}

// ========================================
// Session State
// ========================================

function loadSessionState(): SessionState | null {
  try {
    const sessionPath = paiPath("MEMORY", "STATE", "repo-architect-session.json");
    if (!existsSync(sessionPath)) return null;
    const data = JSON.parse(readFileSync(sessionPath, "utf-8"));
    if (!data.project_path || !data.framework || !data.expected_dirs) return null;
    return data;
  } catch {
    return null;
  }
}

// ========================================
// Structure Check
// ========================================

function getTopLevelDirs(projectPath: string): string[] {
  try {
    if (!existsSync(projectPath)) return [];
    return readdirSync(projectPath, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .filter((name) => !name.startsWith(".") && name !== "node_modules");
  } catch {
    return [];
  }
}

// ========================================
// Quality Logging
// ========================================

function logQuality(entry: QualityLogEntry): void {
  try {
    const logPath = paiPath("MEMORY", "STATE", "repo-structure-quality.jsonl");
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

function isRelevantToolCall(input: PostToolUseInput): boolean {
  const { tool_name, tool_input } = input;

  // Only care about Write and Bash
  if (tool_name !== "Write" && tool_name !== "Bash") return false;

  // For Bash: only care about mkdir commands
  if (tool_name === "Bash") {
    const cmd = tool_input?.command || "";
    return cmd.includes("mkdir");
  }

  // For Write: always relevant (file creation)
  return true;
}

// ========================================
// Main
// ========================================

async function main(): Promise<void> {
  let input: PostToolUseInput;

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

  // Filter: only act on relevant tool calls
  if (!isRelevantToolCall(input)) return;

  // Load session state — if no active session, exit silently
  const session = loadSessionState();
  if (!session) return;

  // Get actual top-level directories
  const actualDirs = getTopLevelDirs(session.project_path);
  if (actualDirs.length === 0) return;

  // Compare against expected
  const expected = new Set(session.expected_dirs);
  const actual = new Set(actualDirs);

  const missing = session.expected_dirs.filter((d) => !actual.has(d));
  const unexpected = actualDirs.filter((d) => !expected.has(d));

  // Score: matching dirs / expected dirs
  const matching = session.expected_dirs.filter((d) => actual.has(d));
  const score =
    session.expected_dirs.length > 0 ? matching.length / session.expected_dirs.length : 1;

  // Determine severity
  let severity: "PASS" | "WARN" | "FAIL" = "PASS";
  if (score < 0.5) severity = "FAIL";
  else if (score < 0.75) severity = "WARN";

  // Log quality metrics
  logQuality({
    timestamp: new Date().toISOString(),
    session_id: process.env.SESSION_ID || "unknown",
    project_path: session.project_path,
    framework: session.framework,
    expected_dirs: session.expected_dirs,
    actual_dirs: actualDirs,
    score,
    missing,
    unexpected,
    severity,
  });

  // Warn on low score
  if (score < 0.75) {
    const parts = [
      `[StructureValidator] Structure score ${(score * 100).toFixed(0)}%`,
      `(${matching.length}/${session.expected_dirs.length} expected dirs present).`,
    ];
    if (missing.length > 0) {
      parts.push(`Missing: ${missing.join(", ")}.`);
    }
    if (unexpected.length > 0) {
      parts.push(`Unexpected: ${unexpected.join(", ")}.`);
    }
    console.error(parts.join(" "));
  }
}

// Run with standard timeout — file I/O involved
withTimeout("StructureValidator", "standard", main);
