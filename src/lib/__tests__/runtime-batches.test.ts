import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type MockVideo = {
  videoId: string;
  title: string;
  channel: string;
  topic: string;
  publishedDate: string;
  parts: Array<{ chunk: number; wordCount: number; filePath: string }>;
};

const originalInsightsBaseDir = process.env.INSIGHTS_BASE_DIR;
const originalPlaylistRepo = process.env.PLAYLIST_TRANSCRIPTS_REPO;

let mockVideos: MockVideo[] = [];
let mockEligibilityByVideo = new Map<
  string,
  {
    canStart: boolean;
    outcome:
      | "started"
      | "already-running"
      | "already-analyzed"
      | "retry-needed"
      | "capacity-reached";
    snapshot: {
      status: "idle" | "running" | "complete" | "failed";
      lifecycle: string | null;
      error: string | null;
      run?: { runId: string } | null;
    };
    message: string;
  }
>();
let mockStartResultByVideo = new Map<
  string,
  {
    started: boolean;
    outcome: "started" | "capacity-reached" | "failed-to-start";
    runId?: string;
    snapshot: {
      status: "idle" | "running" | "complete" | "failed";
      lifecycle: string | null;
      error: string | null;
      run?: { runId: string } | null;
    };
    message: string;
  }
>();
let mockRuntimeSnapshotByVideo = new Map<
  string,
  {
    status: "idle" | "running" | "complete" | "failed";
    lifecycle: string | null;
    error: string | null;
    run: { runId: string } | null;
  }
>();

vi.mock("@/lib/catalog-import", () => ({
  rebuildCatalogFromCsv: vi.fn(() => ({
    catalogVersion: "catalog-v1",
    videoCount: mockVideos.length,
    partCount: mockVideos.reduce((sum, video) => sum + video.parts.length, 0),
  })),
}));

vi.mock("@/lib/catalog", () => ({
  groupVideos: vi.fn(() => new Map(mockVideos.map((video) => [video.videoId, video]))),
  absTranscriptPath: vi.fn((filePath: string) =>
    path.join(process.env.PLAYLIST_TRANSCRIPTS_REPO!, filePath),
  ),
}));

vi.mock("@/lib/analysis", () => ({
  atomicWriteJson: vi.fn((filePath: string, obj: unknown) => {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2));
  }),
  getAnalyzeStartEligibility: vi.fn((videoId: string) => {
    const record = mockEligibilityByVideo.get(videoId);
    if (!record) {
      throw new Error(`missing eligibility mock for ${videoId}`);
    }

    return {
      canStart: record.canStart,
      outcome: record.outcome,
      retryable: record.outcome === "retry-needed",
      hasArtifacts: record.outcome === "already-analyzed",
      snapshot: {
        status: record.snapshot.status,
        lifecycle: record.snapshot.lifecycle,
        run: record.snapshot.run ?? null,
        startedAt: null,
        completedAt: null,
        error: record.snapshot.error,
      },
      message: record.message,
    };
  }),
  hasAnalysisArtifacts: vi.fn((videoId: string) => {
    const record = mockEligibilityByVideo.get(videoId);
    return record?.outcome === "already-analyzed";
  }),
  insightsBaseDir: vi.fn(() => process.env.INSIGHTS_BASE_DIR!),
  readRuntimeSnapshot: vi.fn((videoId: string) => {
    const snapshot = mockRuntimeSnapshotByVideo.get(videoId);
    return {
      status: snapshot?.status ?? "idle",
      lifecycle: snapshot?.lifecycle ?? null,
      run: snapshot?.run ?? null,
      startedAt: null,
      completedAt: null,
      error: snapshot?.error ?? null,
    };
  }),
  startAnalysis: vi.fn((videoId: string) => {
    const result = mockStartResultByVideo.get(videoId);
    if (!result) {
      throw new Error(`missing start result mock for ${videoId}`);
    }

    return {
      started: result.started,
      outcome: result.outcome,
      runId: result.runId,
      snapshot: {
        status: result.snapshot.status,
        lifecycle: result.snapshot.lifecycle,
        run: result.snapshot.run ?? (result.runId ? { runId: result.runId } : null),
        startedAt: null,
        completedAt: null,
        error: result.snapshot.error,
      },
      message: result.message,
    };
  }),
}));

beforeEach(() => {
  mockVideos = [];
  mockEligibilityByVideo = new Map();
  mockStartResultByVideo = new Map();
  mockRuntimeSnapshotByVideo = new Map();
});

afterEach(() => {
  vi.clearAllMocks();

  if (originalInsightsBaseDir === undefined) {
    delete process.env.INSIGHTS_BASE_DIR;
  } else {
    process.env.INSIGHTS_BASE_DIR = originalInsightsBaseDir;
  }

  if (originalPlaylistRepo === undefined) {
    delete process.env.PLAYLIST_TRANSCRIPTS_REPO;
  } else {
    process.env.PLAYLIST_TRANSCRIPTS_REPO = originalPlaylistRepo;
  }
});

function setCatalogFixture(repoRoot: string) {
  const alphaPath = path.join(repoRoot, "youtube-transcripts", "alpha-part-1.txt");
  const betaPath = path.join(repoRoot, "youtube-transcripts", "beta-part-1.txt");
  const gammaPath = path.join(repoRoot, "youtube-transcripts", "gamma-part-1.txt");
  const deltaPath = path.join(repoRoot, "youtube-transcripts", "delta-part-1.txt");

  fs.mkdirSync(path.dirname(alphaPath), { recursive: true });
  fs.writeFileSync(alphaPath, "alpha transcript");
  fs.writeFileSync(betaPath, "beta transcript");
  fs.writeFileSync(gammaPath, "gamma transcript");
  fs.writeFileSync(deltaPath, "delta transcript");

  mockVideos = [
    {
      videoId: "alpha123xyz89",
      title: "Alpha",
      channel: "Channel A",
      topic: "Topic",
      publishedDate: "2026-03-10",
      parts: [{ chunk: 1, wordCount: 100, filePath: "alpha-part-1.txt" }],
    },
    {
      videoId: "beta123xyz89",
      title: "Beta",
      channel: "Channel B",
      topic: "Topic",
      publishedDate: "2026-03-09",
      parts: [{ chunk: 1, wordCount: 120, filePath: "beta-part-1.txt" }],
    },
    {
      videoId: "gamma123xyz89",
      title: "Gamma",
      channel: "Channel C",
      topic: "Topic",
      publishedDate: "2026-03-08",
      parts: [{ chunk: 1, wordCount: 140, filePath: "gamma-part-1.txt" }],
    },
    {
      videoId: "delta123xyz89",
      title: "Delta",
      channel: "Channel D",
      topic: "Topic",
      publishedDate: "2026-03-07",
      parts: [{ chunk: 1, wordCount: 160, filePath: "delta-part-1.txt" }],
    },
  ];
}

describe("runtime batches", () => {
  it("creates durable batch and item records with honest started, skipped, pending, and failed outcomes", async () => {
    const insightsRoot = fs.mkdtempSync(path.join(os.tmpdir(), "runtime-batches-"));
    const transcriptRoot = fs.mkdtempSync(path.join(os.tmpdir(), "runtime-transcripts-"));
    process.env.INSIGHTS_BASE_DIR = insightsRoot;
    process.env.PLAYLIST_TRANSCRIPTS_REPO = transcriptRoot;
    setCatalogFixture(transcriptRoot);

    mockEligibilityByVideo.set("alpha123xyz89", {
      canStart: true,
      outcome: "started",
      snapshot: { status: "idle", lifecycle: null, error: null },
      message: "ready",
    });
    mockEligibilityByVideo.set("beta123xyz89", {
      canStart: false,
      outcome: "already-analyzed",
      snapshot: { status: "complete", lifecycle: "completed", error: null },
      message: "already analyzed",
    });
    mockEligibilityByVideo.set("gamma123xyz89", {
      canStart: true,
      outcome: "started",
      snapshot: { status: "idle", lifecycle: null, error: null },
      message: "ready",
    });
    mockEligibilityByVideo.set("delta123xyz89", {
      canStart: true,
      outcome: "started",
      snapshot: { status: "idle", lifecycle: null, error: null },
      message: "ready",
    });

    mockStartResultByVideo.set("alpha123xyz89", {
      started: true,
      outcome: "started",
      runId: "run-alpha",
      snapshot: {
        status: "running",
        lifecycle: "running",
        error: null,
        run: { runId: "run-alpha" },
      },
      message: "analysis started",
    });
    mockStartResultByVideo.set("gamma123xyz89", {
      started: false,
      outcome: "capacity-reached",
      snapshot: { status: "idle", lifecycle: null, error: null },
      message: "capacity reached",
    });
    mockStartResultByVideo.set("delta123xyz89", {
      started: false,
      outcome: "failed-to-start",
      runId: "run-delta",
      snapshot: {
        status: "failed",
        lifecycle: "failed",
        error: "spawn error",
        run: { runId: "run-delta" },
      },
      message: "spawn error",
    });

    mockRuntimeSnapshotByVideo.set("alpha123xyz89", {
      status: "running",
      lifecycle: "running",
      error: null,
      run: { runId: "run-alpha" },
    });
    mockRuntimeSnapshotByVideo.set("delta123xyz89", {
      status: "failed",
      lifecycle: "failed",
      error: "spawn error",
      run: { runId: "run-delta" },
    });

    const { readBatch, readBatchItems, submitRuntimeBatch } = await import("@/lib/runtime-batches");

    const submission = submitRuntimeBatch({
      source: "nightly",
      limit: 4,
      logPrefix: "[test-batch]",
    });

    expect(submission.outcome).toBe("created");
    expect(submission.batch.counts).toMatchObject({
      queued: 0,
      started: 1,
      pending: 1,
      skipped: 1,
      failed: 1,
      completed: 0,
    });

    const items = readBatchItems(submission.batch.batchId);
    expect(items.map((item) => [item.videoId, item.status, item.reason])).toEqual([
      ["alpha123xyz89", "started", "analysis-started"],
      ["beta123xyz89", "skipped", "already-analyzed"],
      ["delta123xyz89", "failed", "start-failed"],
      ["gamma123xyz89", "pending", "capacity-reached"],
    ]);

    const batchJsonPath = path.join(
      path.dirname(insightsRoot),
      "runtime",
      "batches",
      submission.batch.batchId,
      "batch.json",
    );
    expect(fs.existsSync(batchJsonPath)).toBe(true);
    expect(readBatch(submission.batch.batchId)?.summary.startedVideoIds).toEqual(["alpha123xyz89"]);
  });

  it("reuses a prior webhook batch when the request key is replayed inside the dedupe window", async () => {
    const insightsRoot = fs.mkdtempSync(path.join(os.tmpdir(), "runtime-batches-"));
    const transcriptRoot = fs.mkdtempSync(path.join(os.tmpdir(), "runtime-transcripts-"));
    process.env.INSIGHTS_BASE_DIR = insightsRoot;
    process.env.PLAYLIST_TRANSCRIPTS_REPO = transcriptRoot;
    setCatalogFixture(transcriptRoot);

    for (const video of mockVideos) {
      mockEligibilityByVideo.set(video.videoId, {
        canStart: false,
        outcome: "already-analyzed",
        snapshot: { status: "complete", lifecycle: "completed", error: null },
        message: "already analyzed",
      });
    }

    const { submitRuntimeBatch } = await import("@/lib/runtime-batches");

    const receivedAt = new Date().toISOString();

    const first = submitRuntimeBatch({
      source: "sync-hook",
      request: {
        requestKey: "sync-hook:delivery-123",
        idempotencyKey: "delivery-123",
        receivedAt,
      },
      logPrefix: "[sync-hook]",
    });
    const second = submitRuntimeBatch({
      source: "sync-hook",
      request: {
        requestKey: "sync-hook:delivery-123",
        idempotencyKey: "delivery-123",
        receivedAt,
      },
      logPrefix: "[sync-hook]",
    });

    expect(first.outcome).toBe("created");
    expect(second.outcome).toBe("reused");
    expect(second.batch.batchId).toBe(first.batch.batchId);
    expect(second.batch.request?.requestKey).toBe("sync-hook:delivery-123");
  });
});
