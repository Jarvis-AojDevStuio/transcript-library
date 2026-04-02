import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

const mockRequirePrivateApi = vi.fn(() => ({
  allowed: true as const,
  reason: "local-dev" as const,
}));
const mockSanitizePayload = vi.fn(<T>(value: T) => value);
const mockGetVideo = vi.fn();
const mockAbsTranscriptPath = vi.fn();
const mockIsValidVideoId = vi.fn();
const mockGetAnalyzeStartEligibility = vi.fn();
const mockSpawnAnalysis = vi.fn();
const mockReconcileRuntimeArtifacts = vi.fn();

vi.mock("@/lib/private-api-guard", () => ({
  requirePrivateApi: mockRequirePrivateApi,
  sanitizePayload: mockSanitizePayload,
}));

vi.mock("@/modules/catalog", () => ({
  getVideo: mockGetVideo,
  absTranscriptPath: mockAbsTranscriptPath,
}));

vi.mock("@/modules/analysis", () => ({
  isValidVideoId: mockIsValidVideoId,
  getAnalyzeStartEligibility: mockGetAnalyzeStartEligibility,
  spawnAnalysis: mockSpawnAnalysis,
}));

vi.mock("@/lib/runtime-reconciliation", () => ({
  reconcileRuntimeArtifacts: mockReconcileRuntimeArtifacts,
}));

vi.mock("@/lib/catalog-db", async () => {
  const actual = await vi.importActual<typeof import("@/lib/catalog-db")>("@/lib/catalog-db");
  return {
    ...actual,
  };
});

function resetMocks() {
  vi.clearAllMocks();
  mockRequirePrivateApi.mockReturnValue({ allowed: true, reason: "local-dev" });
  mockSanitizePayload.mockImplementation(<T>(value: T) => value);
  mockIsValidVideoId.mockReturnValue(true);
  mockReconcileRuntimeArtifacts.mockReturnValue({ status: "ok", reasons: [] });
  mockGetAnalyzeStartEligibility.mockReturnValue({
    canStart: true,
    outcome: "started",
    retryable: false,
    message: null,
    snapshot: { lifecycle: null },
  });
  mockSpawnAnalysis.mockReturnValue(true);
}

afterEach(() => {
  resetMocks();
});

resetMocks();

describe("POST /api/analyze", () => {
  it("turns a broken catalog lookup into an operator-readable rebuild response", async () => {
    mockGetVideo.mockImplementation(() => {
      throw new Error("no such table: catalog_videos");
    });

    const { POST } = await import("@/app/api/analyze/route");
    const response = await POST(
      new Request("http://localhost/api/analyze?videoId=abc123xyz89", {
        method: "POST",
      }),
    );
    const body = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(503);
    expect(body).toMatchObject({
      ok: false,
      error: "catalog unavailable",
      outcome: "catalog-rebuild-needed",
      retryable: true,
      repairCommand: "npx tsx scripts/rebuild-catalog.ts",
    });
    expect(String(body.message)).toContain("Rebuild the catalog");
    expect(mockGetAnalyzeStartEligibility).not.toHaveBeenCalled();
    expect(mockSpawnAnalysis).not.toHaveBeenCalled();
  });

  it("starts analysis when the catalog is healthy", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "analyze-route-"));
    const transcriptPath = path.join(tmpDir, "part-1.md");
    fs.writeFileSync(transcriptPath, "# Transcript\n\nWorking content.");

    mockAbsTranscriptPath.mockReturnValue(transcriptPath);
    mockGetVideo.mockReturnValue({
      videoId: "abc123xyz89",
      title: "Healthy Video",
      channel: "Channel",
      topic: "Topic",
      publishedDate: "2026-03-12",
      parts: [{ chunk: 1, wordCount: 123, filePath: "part-1.md" }],
    });

    const { POST } = await import("@/app/api/analyze/route");
    const response = await POST(
      new Request("http://localhost/api/analyze?videoId=abc123xyz89", {
        method: "POST",
      }),
    );
    const body = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ ok: true, status: "running", outcome: "started" });
    expect(mockGetAnalyzeStartEligibility).toHaveBeenCalledWith("abc123xyz89");
    expect(mockSpawnAnalysis).toHaveBeenCalledTimes(1);
    expect(mockSpawnAnalysis.mock.calls[0]?.[0]).toBe("abc123xyz89");
    expect(mockSpawnAnalysis.mock.calls[0]?.[2]).toContain("Working content.");

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("allows a clean rerun when reconciliation marks artifacts-without-run as retry-needed", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "analyze-route-"));
    const transcriptPath = path.join(tmpDir, "part-1.md");
    fs.writeFileSync(transcriptPath, "# Transcript\n\nRetry content.");

    mockAbsTranscriptPath.mockReturnValue(transcriptPath);
    mockGetVideo.mockReturnValue({
      videoId: "abc123xyz89",
      title: "Retry Video",
      channel: "Channel",
      topic: "Topic",
      publishedDate: "2026-03-12",
      parts: [{ chunk: 1, wordCount: 123, filePath: "part-1.md" }],
    });
    mockGetAnalyzeStartEligibility.mockReturnValue({
      canStart: false,
      outcome: "retry-needed",
      retryable: true,
      message:
        "existing analysis artifacts need a clean rerun because durable run history is missing",
      snapshot: { lifecycle: null },
    });
    mockReconcileRuntimeArtifacts.mockReturnValue({
      status: "mismatch",
      reasons: [
        {
          code: "artifacts-without-run",
          message: "Canonical artifacts exist without a matching durable run record.",
        },
      ],
    });

    const { POST } = await import("@/app/api/analyze/route");
    const response = await POST(
      new Request("http://localhost/api/analyze?videoId=abc123xyz89", {
        method: "POST",
      }),
    );
    const body = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ ok: true, status: "running", outcome: "started" });
    expect(mockSpawnAnalysis).toHaveBeenCalledTimes(1);

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });
});
