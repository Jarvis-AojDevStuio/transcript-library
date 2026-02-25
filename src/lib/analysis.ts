import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { resolveInsightPath } from "@/lib/catalog-map";

// --- Types ---

export type StatusFile = {
  status: "running" | "complete" | "failed";
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

// --- In-process concurrency tracking ---

let _runningCount = 0;
const MAX_CONCURRENT = 2;

export function tryAcquireSlot(): boolean {
  if (_runningCount >= MAX_CONCURRENT) return false;
  _runningCount++;
  return true;
}

export function releaseSlot(): void {
  _runningCount = Math.max(0, _runningCount - 1);
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

// --- Stale detection ---

const STALE_THRESHOLD_MS = 15 * 60 * 1000; // 15 minutes

export function isStaleRunning(status: StatusFile): boolean {
  if (status.status !== "running") return false;
  const age = Date.now() - new Date(status.startedAt).getTime();
  return age > STALE_THRESHOLD_MS;
}

// --- Insight paths ---

/** Base directory for all insight folders: `<cwd>/data/insights` */
export function insightsBaseDir(): string {
  return path.join(process.cwd(), "data", "insights");
}

/**
 * Resolve the insight directory for a videoId.
 * Checks catalog-map.json first, falls back to `{videoId}/`.
 */
export function insightDir(videoId: string): string {
  const mapped = resolveInsightPath(videoId);
  if (mapped) {
    return path.join(insightsBaseDir(), mapped);
  }
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
