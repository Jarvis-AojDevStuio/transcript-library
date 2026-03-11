import { afterEach, describe, expect, it, vi } from "vitest";

const mockReadRuntimeStreamEvent = vi.fn();

vi.mock("@/lib/runtime-stream", () => ({
  readRuntimeStreamEvent: mockReadRuntimeStreamEvent,
}));

describe("insight stream route", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("rejects invalid video IDs before opening the stream", async () => {
    const { GET } = await import("@/app/api/insight/stream/route");
    const response = await GET(new Request("http://localhost/api/insight/stream?videoId=nope"));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, error: "invalid videoId" });
    expect(mockReadRuntimeStreamEvent).not.toHaveBeenCalled();
  });

  it("streams a status-first payload with reconciliation and recent log evidence", async () => {
    mockReadRuntimeStreamEvent.mockReturnValue({
      event: "snapshot",
      version: "stream-v1",
      payload: {
        videoId: "abc123xyz89",
        status: "running",
        lifecycle: "running",
        stage: { key: "running", label: "Running" },
        startedAt: "2026-03-10T20:10:00.000Z",
        completedAt: null,
        error: null,
        logs: { stdout: "stdout line 1", stderr: "" },
        recentLogs: ["stdout line 1"],
        reconciliation: {
          status: "ok",
          resolution: "none",
          retryable: false,
          reasons: [],
        },
        artifacts: {
          canonicalFileName: "analysis.md",
          displayFileName: null,
          metadataFileName: "video-metadata.json",
          runFileName: "run.json",
          stdoutFileName: "worker-stdout.txt",
          stderrFileName: "worker-stderr.txt",
        },
        run: { runId: "run-stream-1" },
      },
    });

    const { GET } = await import("@/app/api/insight/stream/route");
    const response = await GET(
      new Request("http://localhost/api/insight/stream?videoId=abc123xyz89"),
    );

    expect(response.headers.get("Content-Type")).toContain("text/event-stream");

    const reader = response.body?.getReader();
    const chunk = await reader?.read();
    const text = new TextDecoder().decode(chunk?.value);
    await reader?.cancel();

    expect(text).toContain('"event":"snapshot"');
    expect(text).toContain('"status":"running"');
    expect(text).toContain('"stage":{"key":"running","label":"Running"}');
    expect(text).toContain('"recentLogs":["stdout line 1"]');
    expect(text).toContain('"reconciliation":{"status":"ok","resolution":"none","retryable":false');
  });
});
