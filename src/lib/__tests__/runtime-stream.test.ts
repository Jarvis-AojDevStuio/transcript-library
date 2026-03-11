import { afterEach, describe, expect, it, vi } from "vitest";

const mockReadRuntimeSnapshot = vi.fn();
const mockGetInsightArtifacts = vi.fn();
const mockReadInsightLogTail = vi.fn();
const mockReadInsightRecentLines = vi.fn();
const mockReconcileRuntimeArtifacts = vi.fn();

vi.mock("@/lib/analysis", () => ({
  readRuntimeSnapshot: mockReadRuntimeSnapshot,
}));

vi.mock("@/lib/insights", () => ({
  getInsightArtifacts: mockGetInsightArtifacts,
  readInsightLogTail: mockReadInsightLogTail,
  readInsightRecentLines: mockReadInsightRecentLines,
}));

vi.mock("@/lib/runtime-reconciliation", () => ({
  reconcileRuntimeArtifacts: mockReconcileRuntimeArtifacts,
}));

describe("runtime stream", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("reuses one shared snapshot for concurrent viewers of the same video", async () => {
    mockReadRuntimeSnapshot.mockReturnValue({
      status: "running",
      lifecycle: "running",
      startedAt: "2026-03-10T20:10:00.000Z",
      completedAt: null,
      error: null,
      run: { runId: "run-stream-1", lifecycle: "running", status: "running" },
    });
    mockGetInsightArtifacts.mockReturnValue({
      canonicalFileName: "analysis.md",
      displayFileName: null,
      metadataFileName: "video-metadata.json",
      runFileName: "run.json",
      stdoutFileName: "worker-stdout.txt",
      stderrFileName: "worker-stderr.txt",
    });
    mockReadInsightLogTail.mockReturnValue({
      stdout: "stdout line 1\nstdout line 2",
      stderr: "",
    });
    mockReadInsightRecentLines.mockReturnValue(["stdout line 1", "stdout line 2"]);
    mockReconcileRuntimeArtifacts.mockReturnValue({
      status: "ok",
      resolution: "none",
      retryable: false,
      reasons: [],
    });

    const { __resetRuntimeStreamForTests, readRuntimeStreamEvent } =
      await import("@/lib/runtime-stream");
    __resetRuntimeStreamForTests();

    const first = readRuntimeStreamEvent("abc123xyz89");
    const second = readRuntimeStreamEvent("abc123xyz89", first.version);

    expect(first.event).toBe("snapshot");
    expect(second.event).toBe("heartbeat");
    expect(mockReadRuntimeSnapshot).toHaveBeenCalledTimes(1);
    expect(mockGetInsightArtifacts).toHaveBeenCalledTimes(1);
    expect(mockReadInsightLogTail).toHaveBeenCalledTimes(1);
    expect(mockReadInsightRecentLines).toHaveBeenCalledTimes(1);
    expect(mockReconcileRuntimeArtifacts).toHaveBeenCalledTimes(1);
    expect(second.payload).toMatchObject({
      status: "running",
      stage: { key: "running", label: "Running" },
      recentLogs: ["stdout line 1", "stdout line 2"],
    });
  });

  it("rebuilds the payload when the cached snapshot expires", async () => {
    vi.useFakeTimers();
    mockReadRuntimeSnapshot.mockReturnValue({
      status: "complete",
      lifecycle: "completed",
      startedAt: "2026-03-10T20:11:00.000Z",
      completedAt: "2026-03-10T20:12:00.000Z",
      error: null,
      run: { runId: "run-stream-2", lifecycle: "completed", status: "complete" },
    });
    mockGetInsightArtifacts.mockReturnValue({
      canonicalFileName: "analysis.md",
      displayFileName: "sample.md",
      metadataFileName: "video-metadata.json",
      runFileName: "run.json",
      stdoutFileName: "worker-stdout.txt",
      stderrFileName: "worker-stderr.txt",
    });
    mockReadInsightLogTail.mockReturnValue({ stdout: "", stderr: "" });
    mockReadInsightRecentLines.mockReturnValue([]);
    mockReconcileRuntimeArtifacts.mockReturnValue({
      status: "resolved",
      resolution: "resolved",
      retryable: false,
      reasons: [],
    });

    const { __resetRuntimeStreamForTests, readRuntimeStreamEvent } =
      await import("@/lib/runtime-stream");
    __resetRuntimeStreamForTests();

    const first = readRuntimeStreamEvent("abc123xyz89");
    vi.advanceTimersByTime(2_500);
    const second = readRuntimeStreamEvent("abc123xyz89", first.version);

    expect(first.event).toBe("snapshot");
    expect(second.payload).toMatchObject({
      status: "complete",
      reconciliation: {
        status: "resolved",
        resolution: "resolved",
      },
    });
    expect(mockReadRuntimeSnapshot).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });
});
