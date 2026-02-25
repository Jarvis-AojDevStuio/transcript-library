import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawn } from "node:child_process";

// --- Types ---

export type StatusFile = {
  status: "running" | "complete" | "failed";
  pid: number;
  startedAt: string;
  completedAt?: string;
  error?: string;
};

export type AnalysisMeta = {
  title: string;
  channel: string;
  topic: string;
  publishedDate: string;
};

// --- globalThis concurrency tracking ---

declare global {
  var __analysisRunningCount: number | undefined;
}

const MAX_CONCURRENT = 2;

/** Whether we have recovered the running count from disk after a restart. */
let _initialized = false;

function getRunningCount(): number {
  if (!_initialized) {
    _initialized = true;
    let liveCount = 0;
    try {
      const entries = fs.readdirSync(insightsBaseDir(), { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const status = readStatus(entry.name);
        if (status && status.status === "running" && isProcessAlive(status.pid)) {
          liveCount++;
        }
      }
    } catch {
      // Directory may not exist yet — count stays 0
    }
    globalThis.__analysisRunningCount = liveCount;
  }
  return globalThis.__analysisRunningCount ?? 0;
}

function incrementRunning(): void {
  globalThis.__analysisRunningCount = getRunningCount() + 1;
}

export function decrementRunning(): void {
  globalThis.__analysisRunningCount = Math.max(0, getRunningCount() - 1);
}

/** Atomic check-and-increment to prevent TOCTOU race */
export function tryAcquireSlot(): boolean {
  if (getRunningCount() >= MAX_CONCURRENT) return false;
  incrementRunning();
  return true;
}

// --- Atomic file write ---

export function atomicWriteJson(filePath: string, obj: unknown): void {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  const tmp = `${filePath}.tmp_${crypto.randomBytes(6).toString("hex")}`;
  const fd = fs.openSync(tmp, "w");
  try {
    fs.writeSync(fd, JSON.stringify(obj, null, 2));
    fs.fsyncSync(fd);
    fs.closeSync(fd);
    fs.renameSync(tmp, filePath);
  } catch (err) {
    fs.closeSync(fd);
    try {
      fs.unlinkSync(tmp);
    } catch {
      /* best-effort cleanup */
    }
    throw err;
  }
}

// --- PID liveness check ---

export function isProcessAlive(pid: number): boolean {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "EPERM") return true;
    return false;
  }
}

// --- Insight paths ---

/** Base directory for all insight folders: `<cwd>/data/insights` */
export function insightsBaseDir(): string {
  return path.join(process.cwd(), "data", "insights");
}

export function insightDir(videoId: string): string {
  return path.join(insightsBaseDir(), videoId);
}

export function statusPath(videoId: string): string {
  return path.join(insightDir(videoId), "status.json");
}

export function analysisPath(videoId: string): string {
  return path.join(insightDir(videoId), "analysis.md");
}

// --- Read status (with runtime validation) ---

function isStatusFile(val: unknown): val is StatusFile {
  if (typeof val !== "object" || val === null) return false;
  const obj = val as Record<string, unknown>;
  return (
    (obj.status === "running" || obj.status === "complete" || obj.status === "failed") &&
    typeof obj.pid === "number" &&
    typeof obj.startedAt === "string"
  );
}

export function readStatus(videoId: string): StatusFile | null {
  try {
    const raw = fs.readFileSync(statusPath(videoId), "utf8");
    const parsed: unknown = JSON.parse(raw);
    return isStatusFile(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

// --- VideoId validation ---

const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{6,11}$/;

export function isValidVideoId(id: string): boolean {
  return VIDEO_ID_RE.test(id);
}

// --- Shared spawn analysis ---

/**
 * Spawn a `claude -p` child process to analyze a video transcript.
 * Handles: slot acquisition, PID validation, stdin piping, timeout with
 * SIGTERM→SIGKILL escalation, atomic status/output writes, slot release.
 *
 * Returns true if the process was spawned, false if rejected (capacity/failure).
 */
export function spawnAnalysis(
  videoId: string,
  meta: AnalysisMeta,
  transcript: string,
  logPrefix = "[analyze]",
): boolean {
  if (!tryAcquireSlot()) return false;

  const prompt = [
    `Analyze this YouTube video transcript using the /YouTubeAnalyzer skill pattern.`,
    ``,
    `Video: ${meta.title}`,
    `Channel: ${meta.channel}`,
    `Topic: ${meta.topic}`,
    `Published: ${meta.publishedDate}`,
    ``,
    `Transcript:`,
    ``,
    transcript,
  ].join("\n");

  let child;
  try {
    child = spawn("claude", ["-p"], {
      stdio: ["pipe", "pipe", "pipe"],
      detached: false,
    });
  } catch (err) {
    decrementRunning();
    atomicWriteJson(statusPath(videoId), {
      status: "failed",
      pid: 0,
      startedAt: new Date().toISOString(),
      error: `spawn error: ${(err as Error).message}`,
    });
    return false;
  }

  // Check PID BEFORE writing to stdin — spawn can fail synchronously
  if (child.pid === undefined) {
    decrementRunning();
    atomicWriteJson(statusPath(videoId), {
      status: "failed",
      pid: 0,
      startedAt: new Date().toISOString(),
      error: "spawn failed: claude not found",
    });
    return false;
  }

  const pid = child.pid; // Capture as number (no more non-null assertions)

  // Now safe: spawn succeeded, stdio streams are guaranteed
  child.stdin.write(prompt);
  child.stdin.end();

  const startedAt = new Date().toISOString();
  atomicWriteJson(statusPath(videoId), {
    status: "running",
    pid,
    startedAt,
  });

  // Buffer stdout and stderr
  const chunks: Buffer[] = [];
  const stderrChunks: Buffer[] = [];
  child.stdout.on("data", (chunk: Buffer) => {
    chunks.push(chunk);
  });
  child.stderr.on("data", (chunk: Buffer) => {
    stderrChunks.push(chunk);
  });

  // 5-minute timeout with SIGTERM -> SIGKILL escalation
  const timeout = setTimeout(() => {
    child.kill("SIGTERM");
    const escalation = setTimeout(() => {
      if (child.exitCode === null) child.kill("SIGKILL");
    }, 10_000);
    child.once("exit", () => clearTimeout(escalation));
  }, 300_000);

  // Handle completion (close guarantees stdio flushed)
  child.on("close", (code) => {
    clearTimeout(timeout);
    decrementRunning();

    const stderr = Buffer.concat(stderrChunks).toString("utf8");
    if (stderr) console.error(`${logPrefix} stderr for ${videoId}:`, stderr.slice(0, 2000));

    if (code === 0 && chunks.length > 0) {
      const output = Buffer.concat(chunks).toString("utf8");
      const outDir = insightDir(videoId);
      fs.mkdirSync(outDir, { recursive: true });
      const tmpPath = `${analysisPath(videoId)}.tmp_${Date.now()}`;
      fs.writeFileSync(tmpPath, output);
      fs.renameSync(tmpPath, analysisPath(videoId));
      atomicWriteJson(statusPath(videoId), {
        status: "complete",
        pid,
        startedAt,
        completedAt: new Date().toISOString(),
      });
    } else {
      atomicWriteJson(statusPath(videoId), {
        status: "failed",
        pid,
        startedAt,
        completedAt: new Date().toISOString(),
        error: code === null ? "process killed (timeout)" : `exit code ${code}`,
      });
    }
  });

  // Handle spawn errors
  child.on("error", (err) => {
    clearTimeout(timeout);
    decrementRunning();
    atomicWriteJson(statusPath(videoId), {
      status: "failed",
      pid,
      startedAt,
      error: `spawn error: ${err.message}`,
    });
  });

  return true;
}
