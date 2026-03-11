import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { rebuildCatalogFromCsv } from "@/lib/catalog-import";
import { absTranscriptPath, groupVideos, type Video } from "@/lib/catalog";
import {
  atomicWriteJson,
  getAnalyzeStartEligibility,
  hasAnalysisArtifacts,
  insightsBaseDir,
  readRuntimeSnapshot,
  startAnalysis,
  type AnalyzeStartEligibility,
  type RuntimeSnapshot,
} from "@/lib/analysis";

export type BatchSource = "sync-hook" | "nightly";
export type BatchItemStatus = "queued" | "started" | "pending" | "skipped" | "failed" | "completed";

export type BatchCounts = Record<BatchItemStatus, number>;

export type BatchRequestMetadata = {
  requestKey?: string;
  receivedAt?: string;
  idempotencyKey?: string | null;
  replayWindowMs?: number;
  method?: string;
  path?: string;
  remoteAddress?: string | null;
  userAgent?: string | null;
};

export type BatchRecord = {
  schemaVersion: number;
  batchId: string;
  source: BatchSource;
  status: "active" | "completed";
  createdAt: string;
  updatedAt: string;
  catalogVersion: string;
  totalItems: number;
  counts: BatchCounts;
  request?: BatchRequestMetadata;
  summary: {
    startedVideoIds: string[];
    pendingVideoIds: string[];
    skippedVideoIds: string[];
    failedVideoIds: string[];
    completedVideoIds: string[];
  };
};

export type BatchItemRecord = {
  schemaVersion: number;
  batchId: string;
  source: BatchSource;
  videoId: string;
  title: string;
  channel: string;
  topic: string;
  publishedDate: string;
  transcriptPartCount: number;
  createdAt: string;
  updatedAt: string;
  status: BatchItemStatus;
  reason?: string;
  runId?: string;
  lifecycle?: string | null;
  runtimeStatus?: string | null;
  error?: string | null;
};

export type BatchSubmissionResult = {
  outcome: "created" | "reused";
  batch: BatchRecord;
  items: BatchItemRecord[];
};

type SubmitBatchOptions = {
  source: BatchSource;
  limit?: number;
  request?: BatchRequestMetadata;
  logPrefix?: string;
};

const BATCH_SCHEMA_VERSION = 1;
const DEDUPE_SCHEMA_VERSION = 1;
const DEFAULT_REPLAY_WINDOW_MS = 10 * 60 * 1000;

function nowIso(): string {
  return new Date().toISOString();
}

function runtimeRoot(): string {
  return path.join(path.dirname(insightsBaseDir()), "runtime");
}

function batchesRoot(): string {
  return path.join(runtimeRoot(), "batches");
}

function dedupeRoot(): string {
  return path.join(runtimeRoot(), "request-index");
}

function batchDir(batchId: string): string {
  return path.join(batchesRoot(), batchId);
}

function batchPath(batchId: string): string {
  return path.join(batchDir(batchId), "batch.json");
}

function batchItemsDir(batchId: string): string {
  return path.join(batchDir(batchId), "items");
}

function batchItemPath(batchId: string, videoId: string): string {
  return path.join(batchItemsDir(batchId), `${videoId}.json`);
}

function dedupePath(requestKey: string): string {
  return path.join(dedupeRoot(), `${requestKey}.json`);
}

function createBatchId(now = new Date()): string {
  const stamp = now.toISOString().replace(/[-:.TZ]/g, "");
  return `batch-${stamp}-${crypto.randomBytes(3).toString("hex")}`;
}

function emptyCounts(): BatchCounts {
  return {
    queued: 0,
    started: 0,
    pending: 0,
    skipped: 0,
    failed: 0,
    completed: 0,
  };
}

function dedupeWindowMs(request?: BatchRequestMetadata): number {
  return request?.replayWindowMs && request.replayWindowMs > 0
    ? request.replayWindowMs
    : DEFAULT_REPLAY_WINDOW_MS;
}

function readJsonFile<T>(filePath: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch {
    return null;
  }
}

function writeBatch(record: BatchRecord): BatchRecord {
  atomicWriteJson(batchPath(record.batchId), record);
  return record;
}

function writeBatchItem(item: BatchItemRecord): BatchItemRecord {
  atomicWriteJson(batchItemPath(item.batchId, item.videoId), item);
  return item;
}

function listBatchItems(batchId: string): BatchItemRecord[] {
  try {
    return fs
      .readdirSync(batchItemsDir(batchId))
      .filter((entry) => entry.endsWith(".json"))
      .sort()
      .map((entry) => readJsonFile<BatchItemRecord>(path.join(batchItemsDir(batchId), entry)))
      .filter((item): item is BatchItemRecord => item !== null);
  } catch {
    return [];
  }
}

function computeBatchSummary(items: BatchItemRecord[]) {
  const counts = emptyCounts();
  const summary = {
    startedVideoIds: [] as string[],
    pendingVideoIds: [] as string[],
    skippedVideoIds: [] as string[],
    failedVideoIds: [] as string[],
    completedVideoIds: [] as string[],
  };

  for (const item of items) {
    counts[item.status] += 1;

    if (item.status === "started") {
      summary.startedVideoIds.push(item.videoId);
    } else if (item.status === "pending") {
      summary.pendingVideoIds.push(item.videoId);
    } else if (item.status === "skipped") {
      summary.skippedVideoIds.push(item.videoId);
    } else if (item.status === "failed") {
      summary.failedVideoIds.push(item.videoId);
    } else if (item.status === "completed") {
      summary.completedVideoIds.push(item.videoId);
    }
  }

  return { counts, summary };
}

function refreshBatchRecord(batchId: string): BatchRecord {
  const existing = readJsonFile<BatchRecord>(batchPath(batchId));
  const items = listBatchItems(batchId).map((item) => refreshBatchItem(batchId, item.videoId));
  const { counts, summary } = computeBatchSummary(items);
  const updatedAt = nowIso();

  const record: BatchRecord = {
    schemaVersion: BATCH_SCHEMA_VERSION,
    batchId,
    source: existing?.source ?? "nightly",
    status: counts.started > 0 || counts.pending > 0 || counts.queued > 0 ? "active" : "completed",
    createdAt: existing?.createdAt ?? updatedAt,
    updatedAt,
    catalogVersion: existing?.catalogVersion ?? "unknown",
    totalItems: items.length,
    counts,
    request: existing?.request,
    summary,
  };

  return writeBatch(record);
}

function createQueuedItem(batchId: string, source: BatchSource, video: Video, createdAt: string) {
  return writeBatchItem({
    schemaVersion: BATCH_SCHEMA_VERSION,
    batchId,
    source,
    videoId: video.videoId,
    title: video.title,
    channel: video.channel,
    topic: video.topic,
    publishedDate: video.publishedDate,
    transcriptPartCount: video.parts.length,
    createdAt,
    updatedAt: createdAt,
    status: "queued",
  });
}

function selectionReasonForEligibility(eligibility: AnalyzeStartEligibility): string {
  if (eligibility.outcome === "already-running") {
    return "already-running";
  }
  if (eligibility.outcome === "already-analyzed") {
    return "already-analyzed";
  }
  if (eligibility.outcome === "retry-needed") {
    return "retry-needed-manual-review";
  }
  return "not-eligible";
}

function buildTranscript(video: Video): string {
  return video.parts
    .map((part) => {
      try {
        return fs.readFileSync(absTranscriptPath(part.filePath), "utf8");
      } catch {
        return `[Part ${part.chunk}: file not found]`;
      }
    })
    .join("\n\n---\n\n");
}

function materializeItemState(
  batchId: string,
  source: BatchSource,
  video: Video,
  overrides: Partial<BatchItemRecord>,
): BatchItemRecord {
  const existing = readJsonFile<BatchItemRecord>(batchItemPath(batchId, video.videoId));
  return writeBatchItem({
    schemaVersion: BATCH_SCHEMA_VERSION,
    batchId,
    source,
    videoId: video.videoId,
    title: video.title,
    channel: video.channel,
    topic: video.topic,
    publishedDate: video.publishedDate,
    transcriptPartCount: video.parts.length,
    createdAt: existing?.createdAt ?? nowIso(),
    updatedAt: nowIso(),
    status: existing?.status ?? "queued",
    ...existing,
    ...overrides,
  });
}

function submitVideo(batchId: string, source: BatchSource, video: Video, logPrefix: string) {
  const eligibility = getAnalyzeStartEligibility(video.videoId);

  if (!eligibility.canStart) {
    return materializeItemState(batchId, source, video, {
      status: "skipped",
      reason: selectionReasonForEligibility(eligibility),
      lifecycle: eligibility.snapshot.lifecycle,
      runtimeStatus: eligibility.snapshot.status,
      error: eligibility.snapshot.error,
    });
  }

  const transcript = buildTranscript(video);
  const started = startAnalysis(
    video.videoId,
    {
      videoId: video.videoId,
      title: video.title,
      channel: video.channel,
      topic: video.topic,
      publishedDate: video.publishedDate,
      transcriptPartPath: absTranscriptPath(video.parts[0]?.filePath ?? ""),
    },
    transcript,
    logPrefix,
  );

  if (started.outcome === "started") {
    return materializeItemState(batchId, source, video, {
      status: "started",
      reason: "analysis-started",
      runId: started.runId,
      lifecycle: started.snapshot.lifecycle,
      runtimeStatus: started.snapshot.status,
      error: started.snapshot.error,
    });
  }

  if (started.outcome === "capacity-reached") {
    return materializeItemState(batchId, source, video, {
      status: "pending",
      reason: "capacity-reached",
      lifecycle: started.snapshot.lifecycle,
      runtimeStatus: started.snapshot.status,
      error: started.snapshot.error,
    });
  }

  return materializeItemState(batchId, source, video, {
    status: "failed",
    reason: "start-failed",
    runId: started.runId,
    lifecycle: started.snapshot.lifecycle,
    runtimeStatus: started.snapshot.status,
    error: started.message,
  });
}

function refreshStartedItem(item: BatchItemRecord, snapshot: RuntimeSnapshot): BatchItemRecord {
  if (!item.runId || !snapshot.run || snapshot.run.runId !== item.runId) {
    return item;
  }

  if (snapshot.lifecycle === "completed") {
    return {
      ...item,
      updatedAt: nowIso(),
      status: "completed",
      reason: "analysis-completed",
      lifecycle: snapshot.lifecycle,
      runtimeStatus: snapshot.status,
      error: snapshot.error,
    };
  }

  if (snapshot.status === "failed") {
    return {
      ...item,
      updatedAt: nowIso(),
      status: "failed",
      reason: snapshot.error ?? "analysis-failed",
      lifecycle: snapshot.lifecycle,
      runtimeStatus: snapshot.status,
      error: snapshot.error,
    };
  }

  return {
    ...item,
    updatedAt: nowIso(),
    lifecycle: snapshot.lifecycle,
    runtimeStatus: snapshot.status,
    error: snapshot.error,
  };
}

export function refreshBatchItem(batchId: string, videoId: string): BatchItemRecord {
  const item = readJsonFile<BatchItemRecord>(batchItemPath(batchId, videoId));
  if (!item) {
    throw new Error(`batch item not found: ${batchId}/${videoId}`);
  }

  const snapshot = readRuntimeSnapshot(videoId);
  let nextItem = item;

  if (item.status === "started") {
    nextItem = refreshStartedItem(item, snapshot);
  } else if (item.status === "pending" && !hasAnalysisArtifacts(videoId)) {
    nextItem = {
      ...item,
      updatedAt: nowIso(),
      lifecycle: snapshot.lifecycle,
      runtimeStatus: snapshot.status,
      error: snapshot.error,
    };
  }

  return writeBatchItem(nextItem);
}

export function readBatch(batchId: string): BatchRecord | null {
  const record = readJsonFile<BatchRecord>(batchPath(batchId));
  if (!record) {
    return null;
  }
  return refreshBatchRecord(batchId);
}

export function readBatchItems(batchId: string): BatchItemRecord[] {
  const items = listBatchItems(batchId);
  if (items.length === 0) {
    return [];
  }
  return items.map((item) => refreshBatchItem(batchId, item.videoId));
}

function findReusableBatch(request?: BatchRequestMetadata): BatchSubmissionResult | null {
  const requestKey = request?.requestKey;
  if (!requestKey) {
    return null;
  }

  const index = readJsonFile<{
    schemaVersion: number;
    requestKey: string;
    batchId: string;
    source: BatchSource;
    createdAt: string;
    expiresAt: string;
  }>(dedupePath(requestKey));
  if (!index) {
    return null;
  }

  if (Date.parse(index.expiresAt) < Date.now()) {
    return null;
  }

  const batch = readBatch(index.batchId);
  if (!batch) {
    return null;
  }

  return {
    outcome: "reused",
    batch,
    items: readBatchItems(index.batchId),
  };
}

function recordDedupeIndex(batchId: string, source: BatchSource, request?: BatchRequestMetadata) {
  const requestKey = request?.requestKey;
  if (!requestKey) {
    return;
  }

  const createdAt = request?.receivedAt ?? nowIso();
  const expiresAt = new Date(Date.parse(createdAt) + dedupeWindowMs(request)).toISOString();
  atomicWriteJson(dedupePath(requestKey), {
    schemaVersion: DEDUPE_SCHEMA_VERSION,
    requestKey,
    batchId,
    source,
    createdAt,
    expiresAt,
  });
}

function selectCandidateVideos(limit?: number): Video[] {
  const videos = Array.from(groupVideos().values()).sort((left, right) => {
    const leftDate = left.publishedDate || "";
    const rightDate = right.publishedDate || "";
    if (leftDate !== rightDate) {
      return rightDate.localeCompare(leftDate);
    }
    return left.videoId.localeCompare(right.videoId);
  });

  if (!limit || limit <= 0) {
    return videos;
  }

  return videos.slice(0, limit);
}

export function submitRuntimeBatch(options: SubmitBatchOptions): BatchSubmissionResult {
  const reused = findReusableBatch(options.request);
  if (reused) {
    return reused;
  }

  const refresh = rebuildCatalogFromCsv();
  const createdAt = nowIso();
  const batchId = createBatchId();
  const logPrefix = options.logPrefix ?? `[${options.source}]`;
  const videos = selectCandidateVideos(options.limit);

  for (const video of videos) {
    createQueuedItem(batchId, options.source, video, createdAt);
  }

  writeBatch({
    schemaVersion: BATCH_SCHEMA_VERSION,
    batchId,
    source: options.source,
    status: "active",
    createdAt,
    updatedAt: createdAt,
    catalogVersion: refresh.catalogVersion,
    totalItems: videos.length,
    counts: { ...emptyCounts(), queued: videos.length },
    request: options.request,
    summary: {
      startedVideoIds: [],
      pendingVideoIds: [],
      skippedVideoIds: [],
      failedVideoIds: [],
      completedVideoIds: [],
    },
  });

  for (const video of videos) {
    submitVideo(batchId, options.source, video, logPrefix);
  }

  recordDedupeIndex(batchId, options.source, options.request);

  return {
    outcome: "created",
    batch: refreshBatchRecord(batchId),
    items: readBatchItems(batchId),
  };
}
