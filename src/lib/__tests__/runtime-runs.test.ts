import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  __resetAnalysisRuntimeForTests,
  attemptStderrLogPath,
  attemptStdoutLogPath,
  buildRunArtifacts,
  readRunMetadata,
  readStatus,
  reconcileLatestRun,
  runAttemptMetadataPath,
  stdoutLogPath,
  stderrLogPath,
  writeRunLifecycle,
} from "@/lib/analysis";

const originalInsightsBaseDir = process.env.INSIGHTS_BASE_DIR;

afterEach(() => {
  __resetAnalysisRuntimeForTests();
  if (originalInsightsBaseDir === undefined) {
    delete process.env.INSIGHTS_BASE_DIR;
  } else {
    process.env.INSIGHTS_BASE_DIR = originalInsightsBaseDir;
  }
});

describe("runtime run authority", () => {
  it("writes a latest-run record with runId and a derived compatibility status", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "runtime-runs-"));
    process.env.INSIGHTS_BASE_DIR = tmpDir;

    const run = writeRunLifecycle("abc123xyz89", {
      runId: "run-001",
      provider: "claude-cli",
      command: "claude",
      args: ["-p"],
      lifecycle: "queued",
      startedAt: "2026-03-10T18:00:00.000Z",
      promptResolvedAt: "2026-03-10T18:00:00.000Z",
      pid: null,
      artifacts: buildRunArtifacts("abc123xyz89", "Test Title", "run-001"),
    });

    expect(run).toMatchObject({
      runId: "run-001",
      lifecycle: "queued",
      status: "running",
    });
    expect(readRunMetadata("abc123xyz89")).toMatchObject({
      runId: "run-001",
      lifecycle: "queued",
      status: "running",
    });
    expect(readStatus("abc123xyz89")).toMatchObject({
      runId: "run-001",
      lifecycle: "queued",
      status: "running",
      pid: null,
    });
    expect(fs.existsSync(runAttemptMetadataPath("abc123xyz89", "run-001"))).toBe(true);
  });

  it("marks a stale running attempt as interrupted during reconciliation", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "runtime-runs-"));
    process.env.INSIGHTS_BASE_DIR = tmpDir;

    writeRunLifecycle("abc123xyz89", {
      runId: "run-002",
      provider: "claude-cli",
      command: "claude",
      args: ["-p"],
      lifecycle: "running",
      startedAt: "2026-03-10T18:05:00.000Z",
      promptResolvedAt: "2026-03-10T18:04:59.000Z",
      pid: 999999,
      artifacts: buildRunArtifacts("abc123xyz89", "Test Title", "run-002"),
    });

    const reconciled = reconcileLatestRun("abc123xyz89", {
      now: "2026-03-10T18:06:00.000Z",
      reason: "worker missing after restart",
    });

    expect(reconciled).toMatchObject({
      runId: "run-002",
      lifecycle: "interrupted",
      status: "failed",
      completedAt: "2026-03-10T18:06:00.000Z",
      error: "worker missing after restart",
      reconciliationReason: "worker missing after restart",
    });
    expect(readStatus("abc123xyz89")).toMatchObject({
      lifecycle: "interrupted",
      status: "failed",
    });
  });

  it("keeps per-attempt log paths separate from the canonical worker log names", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "runtime-runs-"));
    process.env.INSIGHTS_BASE_DIR = tmpDir;

    const firstRunId = "run-003";
    const secondRunId = "run-004";

    fs.mkdirSync(path.dirname(stdoutLogPath("abc123xyz89")), { recursive: true });
    fs.writeFileSync(stdoutLogPath("abc123xyz89"), "latest stdout");
    fs.writeFileSync(stderrLogPath("abc123xyz89"), "latest stderr");
    fs.mkdirSync(path.dirname(attemptStdoutLogPath("abc123xyz89", firstRunId)), {
      recursive: true,
    });
    fs.writeFileSync(attemptStdoutLogPath("abc123xyz89", firstRunId), "first run stdout");
    fs.writeFileSync(attemptStderrLogPath("abc123xyz89", firstRunId), "first run stderr");
    fs.mkdirSync(path.dirname(attemptStdoutLogPath("abc123xyz89", secondRunId)), {
      recursive: true,
    });
    fs.writeFileSync(attemptStdoutLogPath("abc123xyz89", secondRunId), "second run stdout");

    expect(path.basename(stdoutLogPath("abc123xyz89"))).toBe("worker-stdout.txt");
    expect(path.basename(stderrLogPath("abc123xyz89"))).toBe("worker-stderr.txt");
    expect(fs.readFileSync(attemptStdoutLogPath("abc123xyz89", firstRunId), "utf8")).toBe(
      "first run stdout",
    );
    expect(fs.readFileSync(attemptStdoutLogPath("abc123xyz89", secondRunId), "utf8")).toBe(
      "second run stdout",
    );
  });
});
