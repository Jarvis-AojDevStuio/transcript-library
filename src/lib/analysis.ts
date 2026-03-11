/**
 * Headless transcript analysis runtime.
 *
 * Spawns CLI providers (claude-cli, codex-cli) to analyze YouTube transcripts,
 * manages concurrency slots, and persists artifacts under the configured
 * insights base directory for each {videoId}.
 *
 * @module analysis
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import {
  analysisPath,
  displayAnalysisPath,
  insightDir,
  insightsBaseDir,
  metadataCachePath,
  structuredAnalysisPath,
} from "./insight-paths";
import {
  buildHeadlessAnalysisPrompt,
  enrichAnalysisMeta,
  type HeadlessAnalysisMeta,
} from "@/lib/headless-youtube-analysis";
import { parseStructuredAnalysis, type StructuredAnalysis } from "@/lib/analysis-contract";

export {
  analysisPath,
  displayAnalysisPath,
  insightDir,
  insightsBaseDir,
  isValidVideoId,
  metadataCachePath,
  structuredAnalysisPath,
} from "./insight-paths";

export type CompatibilityStatus = "running" | "complete" | "failed";
export type RunLifecycle =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "interrupted"
  | "reconciled";

export type RuntimeState = "idle" | "running" | "complete" | "failed";

/**
 * Status file written to `status.json` for each analysis run.
 * Keeps the legacy `status` field while publishing the richer lifecycle state.
 */
export type StatusFile = {
  schemaVersion: number;
  videoId: string;
  runId: string;
  status: CompatibilityStatus;
  lifecycle: RunLifecycle;
  pid: number | null;
  startedAt: string;
  completedAt?: string;
  error?: string;
  reconciledAt?: string;
  reconciliationReason?: string;
};

/**
 * Metadata for a video used to build the analysis prompt.
 */
export type AnalysisMeta = {
  videoId: string;
  title: string;
  channel: string;
  topic: string;
  publishedDate: string;
  transcriptPartPath?: string;
};

/** Supported analysis provider CLIs. */
export type AnalysisProvider = "claude-cli" | "codex-cli";

export type RunArtifacts = {
  structuredFileName: string;
  canonicalFileName: string;
  displayFileName: string;
  metadataFileName: string;
  stdoutFileName: string;
  stderrFileName: string;
  attemptDirectory: string;
  attemptRunFileName: string;
  attemptStdoutFileName: string;
  attemptStderrFileName: string;
};

/**
 * Run metadata written to `run.json` for each analysis run.
 * `run.json` is the durable latest-run authority for a video.
 */
export type RunFile = {
  schemaVersion: number;
  runId: string;
  provider: AnalysisProvider;
  model?: string;
  command: string;
  args: string[];
  status: CompatibilityStatus;
  lifecycle: RunLifecycle;
  videoId: string;
  startedAt: string;
  promptResolvedAt: string;
  pid: number | null;
  completedAt?: string;
  exitCode?: number | null;
  error?: string;
  reconciledAt?: string;
  reconciliationReason?: string;
  artifacts: RunArtifacts;
};

export type RuntimeSnapshot = {
  status: RuntimeState;
  lifecycle: RunLifecycle | null;
  run: RunFile | null;
  startedAt: string | null;
  completedAt: string | null;
  error: string | null;
};

export type AnalyzeStartOutcome =
  | "started"
  | "already-running"
  | "already-analyzed"
  | "retry-needed"
  | "capacity-reached";

export type AnalyzeStartEligibility = {
  canStart: boolean;
  outcome: AnalyzeStartOutcome;
  retryable: boolean;
  hasArtifacts: boolean;
  snapshot: RuntimeSnapshot;
  message: string;
};

export type StartAnalysisOutcome = "started" | "capacity-reached" | "failed-to-start";

export type StartAnalysisResult = {
  started: boolean;
  outcome: StartAnalysisOutcome;
  runId?: string;
  snapshot: RuntimeSnapshot;
  message: string;
};

type ProviderSpec = {
  provider: AnalysisProvider;
  command: string;
  args: string[];
  model?: string;
  outputMode: "stdout" | "file";
  outputPath?: string;
  env?: NodeJS.ProcessEnv;
};

type RunLifecycleWriteInput = Omit<RunFile, "schemaVersion" | "status" | "videoId"> & {
  lifecycle: RunLifecycle;
};

declare global {
  var __analysisRunningCount: number | undefined;
}

const MAX_CONCURRENT = 2;
const RUN_SCHEMA_VERSION = 2;
const WORKER_STDOUT_FILE = "worker-stdout.txt";
const WORKER_STDERR_FILE = "worker-stderr.txt";
const LEGACY_CLAUDE_STDOUT_FILE = "claude-stdout.txt";
const LEGACY_CLAUDE_STDERR_FILE = "claude-stderr.txt";
const ATTEMPTS_DIR = "runs";
const ATTEMPT_RUN_FILE = "run.json";
let _initialized = false;

function compatibilityStatusForLifecycle(lifecycle: RunLifecycle): CompatibilityStatus {
  if (lifecycle === "failed" || lifecycle === "interrupted") {
    return "failed";
  }

  if (lifecycle === "completed" || lifecycle === "reconciled") {
    return "complete";
  }

  return "running";
}

function nowIso(): string {
  return new Date().toISOString();
}

export function createRunId(now = new Date()): string {
  const stamp = now.toISOString().replace(/[-:.TZ]/g, "");
  return `${stamp}-${crypto.randomBytes(3).toString("hex")}`;
}

export function statusPath(videoId: string): string {
  return path.join(insightDir(videoId), "status.json");
}

export function runMetadataPath(videoId: string): string {
  return path.join(insightDir(videoId), "run.json");
}

export function stdoutLogPath(videoId: string): string {
  return path.join(insightDir(videoId), WORKER_STDOUT_FILE);
}

export function stderrLogPath(videoId: string): string {
  return path.join(insightDir(videoId), WORKER_STDERR_FILE);
}

export function legacyStdoutLogPath(videoId: string): string {
  return path.join(insightDir(videoId), LEGACY_CLAUDE_STDOUT_FILE);
}

export function legacyStderrLogPath(videoId: string): string {
  return path.join(insightDir(videoId), LEGACY_CLAUDE_STDERR_FILE);
}

export function runAttemptDir(videoId: string, runId: string): string {
  return path.join(insightDir(videoId), ATTEMPTS_DIR, runId);
}

export function runAttemptMetadataPath(videoId: string, runId: string): string {
  return path.join(runAttemptDir(videoId, runId), ATTEMPT_RUN_FILE);
}

export function attemptStdoutLogPath(videoId: string, runId: string): string {
  return path.join(runAttemptDir(videoId, runId), WORKER_STDOUT_FILE);
}

export function attemptStderrLogPath(videoId: string, runId: string): string {
  return path.join(runAttemptDir(videoId, runId), WORKER_STDERR_FILE);
}

function attemptProviderOutputPath(videoId: string, runId: string): string {
  return path.join(runAttemptDir(videoId, runId), "provider-output.json");
}

function isStatusFile(val: unknown): val is StatusFile {
  if (typeof val !== "object" || val === null) return false;
  const obj = val as Record<string, unknown>;
  return (
    typeof obj.runId === "string" &&
    typeof obj.startedAt === "string" &&
    typeof obj.lifecycle === "string" &&
    (obj.status === "running" || obj.status === "complete" || obj.status === "failed")
  );
}

function isLegacyStatusFile(val: unknown): val is {
  status: "running" | "complete" | "failed";
  pid: number;
  startedAt: string;
  completedAt?: string;
  error?: string;
} {
  if (typeof val !== "object" || val === null) return false;
  const obj = val as Record<string, unknown>;
  return (
    (obj.status === "running" || obj.status === "complete" || obj.status === "failed") &&
    typeof obj.pid === "number" &&
    typeof obj.startedAt === "string"
  );
}

function normalizeStatusFile(videoId: string, parsed: unknown): StatusFile | null {
  if (isStatusFile(parsed)) {
    return parsed;
  }

  if (!isLegacyStatusFile(parsed)) {
    return null;
  }

  const runId = `legacy-${parsed.startedAt.replace(/[^0-9]/g, "").slice(0, 14) || "status"}`;
  return {
    schemaVersion: RUN_SCHEMA_VERSION,
    videoId,
    runId,
    status: parsed.status,
    lifecycle:
      parsed.status === "complete"
        ? "completed"
        : parsed.status === "failed"
          ? "failed"
          : "running",
    pid: parsed.pid,
    startedAt: parsed.startedAt,
    completedAt: parsed.completedAt,
    error: parsed.error,
  };
}

export function readStatus(videoId: string): StatusFile | null {
  try {
    const raw = fs.readFileSync(statusPath(videoId), "utf8");
    const parsed: unknown = JSON.parse(raw);
    return normalizeStatusFile(videoId, parsed);
  } catch {
    return null;
  }
}

function isRunFile(val: unknown): val is RunFile {
  if (typeof val !== "object" || val === null) return false;
  const obj = val as Record<string, unknown>;
  return (
    typeof obj.runId === "string" &&
    typeof obj.schemaVersion === "number" &&
    (obj.provider === "claude-cli" || obj.provider === "codex-cli") &&
    typeof obj.command === "string" &&
    Array.isArray(obj.args) &&
    typeof obj.lifecycle === "string" &&
    typeof obj.startedAt === "string"
  );
}

function isLegacyRunFile(val: unknown): val is {
  schemaVersion: number;
  provider: AnalysisProvider;
  model?: string;
  command: string;
  args: string[];
  status: "running" | "complete" | "failed";
  videoId: string;
  startedAt: string;
  promptResolvedAt: string;
  pid: number;
  completedAt?: string;
  exitCode?: number | null;
  error?: string;
  artifacts: {
    structuredFileName: string;
    canonicalFileName: string;
    displayFileName: string;
    metadataFileName: string;
    stdoutFileName: string;
    stderrFileName: string;
  };
} {
  if (typeof val !== "object" || val === null) return false;
  const obj = val as Record<string, unknown>;
  return (
    typeof obj.schemaVersion === "number" &&
    (obj.provider === "claude-cli" || obj.provider === "codex-cli") &&
    typeof obj.command === "string" &&
    Array.isArray(obj.args) &&
    (obj.status === "running" || obj.status === "complete" || obj.status === "failed")
  );
}

function normalizeRunFile(videoId: string, parsed: unknown): RunFile | null {
  if (isRunFile(parsed)) {
    return parsed;
  }

  if (!isLegacyRunFile(parsed)) {
    return null;
  }

  const runId = `legacy-${parsed.startedAt.replace(/[^0-9]/g, "").slice(0, 14) || "run"}`;
  return {
    schemaVersion: RUN_SCHEMA_VERSION,
    runId,
    provider: parsed.provider,
    model: parsed.model,
    command: parsed.command,
    args: parsed.args,
    status: parsed.status,
    lifecycle:
      parsed.status === "complete"
        ? "completed"
        : parsed.status === "failed"
          ? "failed"
          : "running",
    videoId,
    startedAt: parsed.startedAt,
    promptResolvedAt: parsed.promptResolvedAt,
    pid: parsed.pid,
    completedAt: parsed.completedAt,
    exitCode: parsed.exitCode,
    error: parsed.error,
    artifacts: {
      ...parsed.artifacts,
      attemptDirectory: path.join(ATTEMPTS_DIR, runId),
      attemptRunFileName: ATTEMPT_RUN_FILE,
      attemptStdoutFileName: parsed.artifacts.stdoutFileName,
      attemptStderrFileName: parsed.artifacts.stderrFileName,
    },
  };
}

export function readRunMetadata(videoId: string): RunFile | null {
  try {
    const raw = fs.readFileSync(runMetadataPath(videoId), "utf8");
    const parsed: unknown = JSON.parse(raw);
    return normalizeRunFile(videoId, parsed);
  } catch {
    return null;
  }
}

function resolveRepoRoot(): string {
  const repoRoot = process.env.PLAYLIST_TRANSCRIPTS_REPO;
  if (!repoRoot) {
    throw new Error("PLAYLIST_TRANSCRIPTS_REPO is not set");
  }
  return repoRoot;
}

function resolvePrompt(meta: AnalysisMeta): HeadlessAnalysisMeta {
  return enrichAnalysisMeta({
    videoId: meta.videoId,
    title: meta.title,
    channel: meta.channel,
    topic: meta.topic,
    publishedDate: meta.publishedDate,
    transcriptPartPath: meta.transcriptPartPath,
    repoRoot: resolveRepoRoot(),
  });
}

function resolveProviderSpec(videoId: string, runId: string): ProviderSpec {
  const configured = (process.env.ANALYSIS_PROVIDER ?? "claude-cli").trim().toLowerCase();

  if (configured === "codex-cli") {
    const outputPath = attemptProviderOutputPath(videoId, runId);
    const model = process.env.CODEX_ANALYSIS_MODEL || process.env.ANALYSIS_MODEL || undefined;
    const args = [
      "exec",
      "--dangerously-bypass-approvals-and-sandbox",
      "--skip-git-repo-check",
      "-C",
      process.cwd(),
      "-o",
      outputPath,
      "-",
    ];
    if (model) args.splice(1, 0, "-m", model);
    return {
      provider: "codex-cli",
      command: "codex",
      args,
      model,
      outputMode: "file",
      outputPath,
    };
  }

  const model = process.env.CLAUDE_ANALYSIS_MODEL || process.env.ANALYSIS_MODEL || undefined;
  const args = ["--dangerously-skip-permissions", "-p"];
  const env = { ...process.env };
  delete env.CLAUDECODE;
  if (model) args.unshift("--model", model);
  return {
    provider: "claude-cli",
    command: "claude",
    args,
    model,
    outputMode: "stdout",
    env,
  };
}

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
    } catch {}
    throw err;
  }
}

function atomicWriteText(filePath: string, contents: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.tmp_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
  fs.writeFileSync(tmpPath, contents);
  fs.renameSync(tmpPath, filePath);
}

function writeAttemptRunMetadata(videoId: string, run: RunFile): void {
  atomicWriteJson(runAttemptMetadataPath(videoId, run.runId), run);
}

function writeStatusFromRun(videoId: string, run: RunFile): void {
  atomicWriteJson(statusPath(videoId), {
    schemaVersion: RUN_SCHEMA_VERSION,
    videoId,
    runId: run.runId,
    status: run.status,
    lifecycle: run.lifecycle,
    pid: run.pid,
    startedAt: run.startedAt,
    completedAt: run.completedAt,
    error: run.error,
    reconciledAt: run.reconciledAt,
    reconciliationReason: run.reconciliationReason,
  } satisfies StatusFile);
}

export function buildRunArtifacts(videoId: string, title: string, runId: string): RunArtifacts {
  return {
    structuredFileName: path.basename(structuredAnalysisPath(videoId)),
    canonicalFileName: path.basename(analysisPath(videoId)),
    displayFileName: path.basename(displayAnalysisPath(videoId, title)),
    metadataFileName: path.basename(metadataCachePath(videoId)),
    stdoutFileName: path.basename(stdoutLogPath(videoId)),
    stderrFileName: path.basename(stderrLogPath(videoId)),
    attemptDirectory: path.relative(insightDir(videoId), runAttemptDir(videoId, runId)),
    attemptRunFileName: ATTEMPT_RUN_FILE,
    attemptStdoutFileName: path.basename(attemptStdoutLogPath(videoId, runId)),
    attemptStderrFileName: path.basename(attemptStderrLogPath(videoId, runId)),
  };
}

export function writeRunLifecycle(videoId: string, payload: RunLifecycleWriteInput): RunFile {
  const run: RunFile = {
    schemaVersion: RUN_SCHEMA_VERSION,
    videoId,
    ...payload,
    status: compatibilityStatusForLifecycle(payload.lifecycle),
  };
  atomicWriteJson(runMetadataPath(videoId), run);
  writeAttemptRunMetadata(videoId, run);
  writeStatusFromRun(videoId, run);
  return run;
}

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

function getRunningCount(): number {
  if (!_initialized) {
    _initialized = true;
    let liveCount = 0;
    try {
      const entries = fs.readdirSync(insightsBaseDir(), { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const run = reconcileLatestRun(entry.name);
        if (run?.lifecycle === "running" && run.pid && isProcessAlive(run.pid)) {
          liveCount++;
        }
      }
    } catch {}
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

export function tryAcquireSlot(): boolean {
  if (getRunningCount() >= MAX_CONCURRENT) return false;
  incrementRunning();
  return true;
}

function persistStructuredAnalysis(
  videoId: string,
  title: string,
  structured: StructuredAnalysis,
): void {
  atomicWriteJson(structuredAnalysisPath(videoId), structured);
  atomicWriteText(analysisPath(videoId), structured.reportMarkdown);
  atomicWriteText(displayAnalysisPath(videoId, title), structured.reportMarkdown);
}

function initializeArtifacts(
  videoId: string,
  runId: string,
  resolvedMeta: HeadlessAnalysisMeta,
): void {
  const outDir = insightDir(videoId);
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(runAttemptDir(videoId, runId), { recursive: true });
  fs.writeFileSync(stdoutLogPath(videoId), "");
  fs.writeFileSync(stderrLogPath(videoId), "");
  fs.writeFileSync(attemptStdoutLogPath(videoId, runId), "");
  fs.writeFileSync(attemptStderrLogPath(videoId, runId), "");
  try {
    fs.rmSync(path.join(outDir, "provider-output.json"), { force: true });
    fs.rmSync(attemptProviderOutputPath(videoId, runId), { force: true });
  } catch {}
  atomicWriteJson(metadataCachePath(videoId), resolvedMeta);
}

function appendRunLog(
  videoId: string,
  runId: string,
  stream: "stdout" | "stderr",
  chunk: Buffer,
): void {
  const latestPath = stream === "stdout" ? stdoutLogPath(videoId) : stderrLogPath(videoId);
  const attemptPath =
    stream === "stdout"
      ? attemptStdoutLogPath(videoId, runId)
      : attemptStderrLogPath(videoId, runId);
  fs.appendFileSync(latestPath, chunk);
  fs.appendFileSync(attemptPath, chunk);
}

function readProviderOutput(spec: ProviderSpec, chunks: Buffer[]): string {
  if (spec.outputMode === "file") {
    return spec.outputPath ? fs.readFileSync(spec.outputPath, "utf8") : "";
  }
  return Buffer.concat(chunks).toString("utf8");
}

function spawnProvider(spec: ProviderSpec): ChildProcessWithoutNullStreams {
  return spawn(spec.command, spec.args, {
    env: spec.env ?? process.env,
    stdio: ["pipe", "pipe", "pipe"],
    detached: false,
  });
}

export function hasAnalysisArtifacts(videoId: string): boolean {
  return fs.existsSync(analysisPath(videoId)) || fs.existsSync(structuredAnalysisPath(videoId));
}

export function reconcileLatestRun(
  videoId: string,
  options?: { now?: string; reason?: string },
): RunFile | null {
  const run = readRunMetadata(videoId);
  if (!run) {
    return null;
  }

  if (run.lifecycle !== "running") {
    return run;
  }

  if (run.pid && isProcessAlive(run.pid)) {
    return run;
  }

  return writeRunLifecycle(videoId, {
    ...run,
    lifecycle: "interrupted",
    pid: run.pid ?? null,
    completedAt: options?.now ?? nowIso(),
    error: options?.reason ?? "worker missing after restart",
    reconciledAt: options?.now ?? nowIso(),
    reconciliationReason: options?.reason ?? "worker missing after restart",
  });
}

export function readRuntimeSnapshot(videoId: string): RuntimeSnapshot {
  const run = reconcileLatestRun(videoId);
  if (!run) {
    return {
      status: hasAnalysisArtifacts(videoId) ? "complete" : "idle",
      lifecycle: null,
      run: null,
      startedAt: null,
      completedAt: null,
      error: null,
    };
  }

  return {
    status:
      run.status === "running" ? "running" : run.status === "complete" ? "complete" : "failed",
    lifecycle: run.lifecycle,
    run,
    startedAt: run.startedAt,
    completedAt: run.completedAt ?? null,
    error: run.error ?? null,
  };
}

export function getAnalyzeStartEligibility(videoId: string): AnalyzeStartEligibility {
  const snapshot = readRuntimeSnapshot(videoId);
  const artifactsPresent = hasAnalysisArtifacts(videoId);

  if (snapshot.status === "running") {
    return {
      canStart: false,
      outcome: "already-running",
      retryable: false,
      hasArtifacts: artifactsPresent,
      snapshot,
      message: "analysis already running",
    };
  }

  if (artifactsPresent && snapshot.status === "complete") {
    return {
      canStart: false,
      outcome: "already-analyzed",
      retryable: false,
      hasArtifacts: true,
      snapshot,
      message: "analysis already exists",
    };
  }

  if (artifactsPresent) {
    return {
      canStart: false,
      outcome: "retry-needed",
      retryable: true,
      hasArtifacts: true,
      snapshot,
      message: "existing analysis evidence needs manual review before rerun",
    };
  }

  return {
    canStart: true,
    outcome: "started",
    retryable:
      snapshot.lifecycle === "failed" ||
      snapshot.lifecycle === "interrupted" ||
      snapshot.lifecycle === "reconciled",
    hasArtifacts: false,
    snapshot,
    message: "ready to start",
  };
}

export function __resetAnalysisRuntimeForTests(): void {
  _initialized = false;
  globalThis.__analysisRunningCount = 0;
}

export function startAnalysis(
  videoId: string,
  meta: AnalysisMeta,
  transcript: string,
  logPrefix = "[analyze]",
): StartAnalysisResult {
  if (!tryAcquireSlot()) {
    return {
      started: false,
      outcome: "capacity-reached",
      snapshot: readRuntimeSnapshot(videoId),
      message: "analysis concurrency cap reached",
    };
  }

  const runId = createRunId();
  const promptResolvedAt = nowIso();
  const provider = resolveProviderSpec(videoId, runId);

  let resolvedMeta: HeadlessAnalysisMeta;
  let prompt: string;
  try {
    resolvedMeta = resolvePrompt(meta);
    prompt = buildHeadlessAnalysisPrompt(resolvedMeta, transcript);
  } catch (err) {
    decrementRunning();
    writeRunLifecycle(videoId, {
      runId,
      provider: provider.provider,
      model: provider.model,
      command: provider.command,
      args: provider.args,
      lifecycle: "failed",
      startedAt: promptResolvedAt,
      promptResolvedAt,
      pid: null,
      completedAt: promptResolvedAt,
      exitCode: null,
      error: `prompt setup error: ${(err as Error).message}`,
      artifacts: buildRunArtifacts(videoId, meta.title, runId),
    });
    return {
      started: false,
      outcome: "failed-to-start",
      runId,
      snapshot: readRuntimeSnapshot(videoId),
      message: `prompt setup error: ${(err as Error).message}`,
    };
  }

  initializeArtifacts(videoId, runId, resolvedMeta);
  writeRunLifecycle(videoId, {
    runId,
    provider: provider.provider,
    model: provider.model,
    command: provider.command,
    args: provider.args,
    lifecycle: "queued",
    startedAt: promptResolvedAt,
    promptResolvedAt,
    pid: null,
    artifacts: buildRunArtifacts(videoId, resolvedMeta.title, runId),
  });

  let child: ChildProcessWithoutNullStreams;
  try {
    child = spawnProvider(provider);
  } catch (err) {
    decrementRunning();
    writeRunLifecycle(videoId, {
      runId,
      provider: provider.provider,
      model: provider.model,
      command: provider.command,
      args: provider.args,
      lifecycle: "failed",
      startedAt: promptResolvedAt,
      promptResolvedAt,
      pid: null,
      completedAt: nowIso(),
      exitCode: null,
      error: `spawn error: ${(err as Error).message}`,
      artifacts: buildRunArtifacts(videoId, resolvedMeta.title, runId),
    });
    return {
      started: false,
      outcome: "failed-to-start",
      runId,
      snapshot: readRuntimeSnapshot(videoId),
      message: `spawn error: ${(err as Error).message}`,
    };
  }

  if (child.pid === undefined) {
    decrementRunning();
    writeRunLifecycle(videoId, {
      runId,
      provider: provider.provider,
      model: provider.model,
      command: provider.command,
      args: provider.args,
      lifecycle: "failed",
      startedAt: promptResolvedAt,
      promptResolvedAt,
      pid: null,
      completedAt: nowIso(),
      exitCode: null,
      error: `spawn failed: ${provider.command} not found`,
      artifacts: buildRunArtifacts(videoId, resolvedMeta.title, runId),
    });
    return {
      started: false,
      outcome: "failed-to-start",
      runId,
      snapshot: readRuntimeSnapshot(videoId),
      message: `spawn failed: ${provider.command} not found`,
    };
  }

  const pid = child.pid;
  const startedAt = nowIso();
  child.stdin.write(prompt);
  child.stdin.end();

  writeRunLifecycle(videoId, {
    runId,
    provider: provider.provider,
    model: provider.model,
    command: provider.command,
    args: provider.args,
    lifecycle: "running",
    startedAt,
    promptResolvedAt,
    pid,
    artifacts: buildRunArtifacts(videoId, resolvedMeta.title, runId),
  });

  const stdoutChunks: Buffer[] = [];
  const stderrChunks: Buffer[] = [];
  child.stdout.on("data", (chunk: Buffer) => {
    stdoutChunks.push(chunk);
    appendRunLog(videoId, runId, "stdout", chunk);
  });
  child.stderr.on("data", (chunk: Buffer) => {
    stderrChunks.push(chunk);
    appendRunLog(videoId, runId, "stderr", chunk);
  });

  const timeout = setTimeout(() => {
    child.kill("SIGTERM");
    const escalation = setTimeout(() => {
      if (child.exitCode === null) child.kill("SIGKILL");
    }, 10_000);
    child.once("exit", () => clearTimeout(escalation));
  }, 300_000);

  child.on("close", (code) => {
    clearTimeout(timeout);
    decrementRunning();

    const completedAt = nowIso();
    const stderr = Buffer.concat(stderrChunks).toString("utf8");
    if (stderr) console.error(`${logPrefix} stderr for ${videoId}:`, stderr.slice(0, 2000));

    let output = "";
    try {
      output = readProviderOutput(provider, stdoutChunks);
    } catch (err) {
      writeRunLifecycle(videoId, {
        runId,
        provider: provider.provider,
        model: provider.model,
        command: provider.command,
        args: provider.args,
        lifecycle: "failed",
        startedAt,
        promptResolvedAt,
        pid,
        completedAt,
        exitCode: code,
        error: `output read error: ${(err as Error).message}`,
        artifacts: buildRunArtifacts(videoId, resolvedMeta.title, runId),
      });
      return;
    }

    if (code === 0 && output.trim()) {
      let structured: StructuredAnalysis;
      try {
        structured = parseStructuredAnalysis(output);
      } catch (err) {
        const error = `structured analysis validation failed: ${(err as Error).message}`;
        console.error(`${logPrefix} ${error}`);
        appendRunLog(videoId, runId, "stderr", Buffer.from(`\n${error}\n`));
        writeRunLifecycle(videoId, {
          runId,
          provider: provider.provider,
          model: provider.model,
          command: provider.command,
          args: provider.args,
          lifecycle: "failed",
          startedAt,
          promptResolvedAt,
          pid,
          completedAt,
          exitCode: code,
          error,
          artifacts: buildRunArtifacts(videoId, resolvedMeta.title, runId),
        });
        return;
      }

      try {
        persistStructuredAnalysis(videoId, resolvedMeta.title, structured);
      } catch (err) {
        const error = `structured analysis write failed: ${(err as Error).message}`;
        console.error(`${logPrefix} ${error}`);
        appendRunLog(videoId, runId, "stderr", Buffer.from(`\n${error}\n`));
        writeRunLifecycle(videoId, {
          runId,
          provider: provider.provider,
          model: provider.model,
          command: provider.command,
          args: provider.args,
          lifecycle: "failed",
          startedAt,
          promptResolvedAt,
          pid,
          completedAt,
          exitCode: code,
          error,
          artifacts: buildRunArtifacts(videoId, resolvedMeta.title, runId),
        });
        return;
      }

      writeRunLifecycle(videoId, {
        runId,
        provider: provider.provider,
        model: provider.model,
        command: provider.command,
        args: provider.args,
        lifecycle: "completed",
        startedAt,
        promptResolvedAt,
        pid,
        completedAt,
        exitCode: code,
        artifacts: buildRunArtifacts(videoId, resolvedMeta.title, runId),
      });
      return;
    }

    const stderrSummary = stderr
      .trim()
      .split(/\r?\n/)
      .find((line) => line.trim().length > 0);
    const error =
      code === null
        ? "process killed (timeout)"
        : stderrSummary
          ? `exit code ${code}: ${stderrSummary}`
          : `exit code ${code}`;
    writeRunLifecycle(videoId, {
      runId,
      provider: provider.provider,
      model: provider.model,
      command: provider.command,
      args: provider.args,
      lifecycle: "failed",
      startedAt,
      promptResolvedAt,
      pid,
      completedAt,
      exitCode: code,
      error,
      artifacts: buildRunArtifacts(videoId, resolvedMeta.title, runId),
    });
  });

  child.on("error", (err) => {
    clearTimeout(timeout);
    decrementRunning();
    writeRunLifecycle(videoId, {
      runId,
      provider: provider.provider,
      model: provider.model,
      command: provider.command,
      args: provider.args,
      lifecycle: "failed",
      startedAt,
      promptResolvedAt,
      pid,
      completedAt: nowIso(),
      exitCode: child.exitCode,
      error: `spawn error: ${err.message}`,
      artifacts: buildRunArtifacts(videoId, resolvedMeta.title, runId),
    });
  });

  return {
    started: true,
    outcome: "started",
    runId,
    snapshot: readRuntimeSnapshot(videoId),
    message: "analysis started",
  };
}

export function spawnAnalysis(
  videoId: string,
  meta: AnalysisMeta,
  transcript: string,
  logPrefix = "[analyze]",
): boolean {
  return startAnalysis(videoId, meta, transcript, logPrefix).started;
}
