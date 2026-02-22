import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

// --- Types ---

export type StatusFile = {
  status: "running" | "complete" | "failed";
  pid: number;
  startedAt: string;
  completedAt?: string;
  error?: string;
};

export type AnalysisStatusResponse = {
  status: "idle" | "running" | "complete" | "failed";
  startedAt?: string;
  error?: string;
};

// --- globalThis concurrency tracking ---

declare global {
  var __analysisRunningCount: number | undefined;
}

const MAX_CONCURRENT = 2;

export function getRunningCount(): number {
  return globalThis.__analysisRunningCount ?? 0;
}

export function incrementRunning(): void {
  globalThis.__analysisRunningCount = getRunningCount() + 1;
}

export function decrementRunning(): void {
  globalThis.__analysisRunningCount = Math.max(0, getRunningCount() - 1);
}

export function canSpawn(): boolean {
  return getRunningCount() < MAX_CONCURRENT;
}

/** Atomic check-and-increment to prevent TOCTOU race between canSpawn() and incrementRunning() */
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
    try { fs.unlinkSync(tmp); } catch {}
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

export function insightDir(videoId: string): string {
  return path.join(process.cwd(), "data", "insights", videoId);
}

export function statusPath(videoId: string): string {
  return path.join(insightDir(videoId), "status.json");
}

export function analysisPath(videoId: string): string {
  return path.join(insightDir(videoId), "analysis.md");
}

// --- Read status ---

export function readStatus(videoId: string): StatusFile | null {
  try {
    const raw = fs.readFileSync(statusPath(videoId), "utf8");
    return JSON.parse(raw) as StatusFile;
  } catch {
    return null;
  }
}

// --- VideoId validation ---

const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{6,11}$/;

export function isValidVideoId(id: string): boolean {
  return VIDEO_ID_RE.test(id);
}
