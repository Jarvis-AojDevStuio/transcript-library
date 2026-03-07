import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import {
  buildHeadlessAnalysisPrompt,
  enrichAnalysisMeta,
  type HeadlessAnalysisMeta,
} from "@/lib/headless-youtube-analysis";

export type StatusFile = {
  status: "running" | "complete" | "failed";
  pid: number;
  startedAt: string;
  completedAt?: string;
  error?: string;
};

export type AnalysisMeta = {
  videoId: string;
  title: string;
  channel: string;
  topic: string;
  publishedDate: string;
  transcriptPartPath?: string;
};

export type AnalysisProvider = "claude-cli" | "codex-cli";

export type RunFile = {
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
    canonicalFileName: string;
    displayFileName: string;
    metadataFileName: string;
    stdoutFileName: string;
    stderrFileName: string;
  };
};

type ProviderSpec = {
  provider: AnalysisProvider;
  command: string;
  args: string[];
  model?: string;
  outputMode: "stdout" | "file";
  outputPath?: string;
};

declare global {
  var __analysisRunningCount: number | undefined;
}

const MAX_CONCURRENT = 2;
const RUN_SCHEMA_VERSION = 1;
const WORKER_STDOUT_FILE = "worker-stdout.txt";
const WORKER_STDERR_FILE = "worker-stderr.txt";
const LEGACY_CLAUDE_STDOUT_FILE = "claude-stdout.txt";
const LEGACY_CLAUDE_STDERR_FILE = "claude-stderr.txt";
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

export function displayAnalysisPath(videoId: string, title: string): string {
  return path.join(insightDir(videoId), `${slugifyTitle(title)}.md`);
}

export function metadataCachePath(videoId: string): string {
  return path.join(insightDir(videoId), "video-metadata.json");
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

export function slugifyTitle(title: string): string {
  const normalized = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
  return normalized || "analysis";
}

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

function isRunFile(val: unknown): val is RunFile {
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

export function readRunMetadata(videoId: string): RunFile | null {
  try {
    const raw = fs.readFileSync(runMetadataPath(videoId), "utf8");
    const parsed: unknown = JSON.parse(raw);
    return isRunFile(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{6,11}$/;

export function isValidVideoId(id: string): boolean {
  return VIDEO_ID_RE.test(id);
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

function resolveProviderSpec(videoId: string): ProviderSpec {
  const configured = (process.env.ANALYSIS_PROVIDER ?? "claude-cli").trim().toLowerCase();

  if (configured === "codex-cli") {
    const outputPath = path.join(insightDir(videoId), "provider-output.md");
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
  if (model) args.unshift("--model", model);
  return {
    provider: "claude-cli",
    command: "claude",
    args,
    model,
    outputMode: "stdout",
  };
}

function writeRunMetadata(
  videoId: string,
  payload: Omit<RunFile, "schemaVersion" | "videoId">,
): void {
  atomicWriteJson(runMetadataPath(videoId), {
    schemaVersion: RUN_SCHEMA_VERSION,
    videoId,
    ...payload,
  } satisfies RunFile);
}

function initializeArtifacts(videoId: string, resolvedMeta: HeadlessAnalysisMeta): void {
  const outDir = insightDir(videoId);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(stdoutLogPath(videoId), "");
  fs.writeFileSync(stderrLogPath(videoId), "");
  try {
    fs.rmSync(path.join(outDir, "provider-output.md"), { force: true });
  } catch {}
  atomicWriteJson(metadataCachePath(videoId), resolvedMeta);
}

function readProviderOutput(spec: ProviderSpec, chunks: Buffer[]): string {
  if (spec.outputMode === "file") {
    return spec.outputPath ? fs.readFileSync(spec.outputPath, "utf8") : "";
  }
  return Buffer.concat(chunks).toString("utf8");
}

function spawnProvider(spec: ProviderSpec): ChildProcessWithoutNullStreams {
  return spawn(spec.command, spec.args, {
    stdio: ["pipe", "pipe", "pipe"],
    detached: false,
  });
}

export function spawnAnalysis(
  videoId: string,
  meta: AnalysisMeta,
  transcript: string,
  logPrefix = "[analyze]",
): boolean {
  if (!tryAcquireSlot()) return false;

  const promptResolvedAt = new Date().toISOString();
  let resolvedMeta: HeadlessAnalysisMeta;
  let prompt: string;
  try {
    resolvedMeta = resolvePrompt(meta);
    prompt = buildHeadlessAnalysisPrompt(resolvedMeta, transcript);
  } catch (err) {
    decrementRunning();
    atomicWriteJson(statusPath(videoId), {
      status: "failed",
      pid: 0,
      startedAt: promptResolvedAt,
      error: `prompt setup error: ${(err as Error).message}`,
    });
    return false;
  }

  initializeArtifacts(videoId, resolvedMeta);
  const provider = resolveProviderSpec(videoId);

  let child: ChildProcessWithoutNullStreams;
  try {
    child = spawnProvider(provider);
  } catch (err) {
    decrementRunning();
    atomicWriteJson(statusPath(videoId), {
      status: "failed",
      pid: 0,
      startedAt: promptResolvedAt,
      error: `spawn error: ${(err as Error).message}`,
    });
    writeRunMetadata(videoId, {
      provider: provider.provider,
      model: provider.model,
      command: provider.command,
      args: provider.args,
      status: "failed",
      startedAt: promptResolvedAt,
      promptResolvedAt,
      pid: 0,
      completedAt: new Date().toISOString(),
      exitCode: null,
      error: `spawn error: ${(err as Error).message}`,
      artifacts: {
        canonicalFileName: path.basename(analysisPath(videoId)),
        displayFileName: path.basename(displayAnalysisPath(videoId, resolvedMeta.title)),
        metadataFileName: path.basename(metadataCachePath(videoId)),
        stdoutFileName: path.basename(stdoutLogPath(videoId)),
        stderrFileName: path.basename(stderrLogPath(videoId)),
      },
    });
    return false;
  }

  if (child.pid === undefined) {
    decrementRunning();
    atomicWriteJson(statusPath(videoId), {
      status: "failed",
      pid: 0,
      startedAt: promptResolvedAt,
      error: `spawn failed: ${provider.command} not found`,
    });
    return false;
  }

  const pid = child.pid;
  const startedAt = new Date().toISOString();
  child.stdin.write(prompt);
  child.stdin.end();

  atomicWriteJson(statusPath(videoId), {
    status: "running",
    pid,
    startedAt,
  });
  writeRunMetadata(videoId, {
    provider: provider.provider,
    model: provider.model,
    command: provider.command,
    args: provider.args,
    status: "running",
    startedAt,
    promptResolvedAt,
    pid,
    artifacts: {
      canonicalFileName: path.basename(analysisPath(videoId)),
      displayFileName: path.basename(displayAnalysisPath(videoId, resolvedMeta.title)),
      metadataFileName: path.basename(metadataCachePath(videoId)),
      stdoutFileName: path.basename(stdoutLogPath(videoId)),
      stderrFileName: path.basename(stderrLogPath(videoId)),
    },
  });

  const chunks: Buffer[] = [];
  const stderrChunks: Buffer[] = [];
  child.stdout.on("data", (chunk: Buffer) => {
    chunks.push(chunk);
    fs.appendFileSync(stdoutLogPath(videoId), chunk);
  });
  child.stderr.on("data", (chunk: Buffer) => {
    stderrChunks.push(chunk);
    fs.appendFileSync(stderrLogPath(videoId), chunk);
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

    const completedAt = new Date().toISOString();
    const stderr = Buffer.concat(stderrChunks).toString("utf8");
    if (stderr) console.error(`${logPrefix} stderr for ${videoId}:`, stderr.slice(0, 2000));

    let output = "";
    try {
      output = readProviderOutput(provider, chunks);
    } catch (err) {
      atomicWriteJson(statusPath(videoId), {
        status: "failed",
        pid,
        startedAt,
        completedAt,
        error: `output read error: ${(err as Error).message}`,
      });
      writeRunMetadata(videoId, {
        provider: provider.provider,
        model: provider.model,
        command: provider.command,
        args: provider.args,
        status: "failed",
        startedAt,
        promptResolvedAt,
        pid,
        completedAt,
        exitCode: code,
        error: `output read error: ${(err as Error).message}`,
        artifacts: {
          canonicalFileName: path.basename(analysisPath(videoId)),
          displayFileName: path.basename(displayAnalysisPath(videoId, resolvedMeta.title)),
          metadataFileName: path.basename(metadataCachePath(videoId)),
          stdoutFileName: path.basename(stdoutLogPath(videoId)),
          stderrFileName: path.basename(stderrLogPath(videoId)),
        },
      });
      return;
    }

    if (code === 0 && output.trim()) {
      const tmpPath = `${analysisPath(videoId)}.tmp_${Date.now()}`;
      fs.writeFileSync(tmpPath, output);
      fs.renameSync(tmpPath, analysisPath(videoId));
      fs.writeFileSync(displayAnalysisPath(videoId, resolvedMeta.title), output);
      atomicWriteJson(statusPath(videoId), {
        status: "complete",
        pid,
        startedAt,
        completedAt,
      });
      writeRunMetadata(videoId, {
        provider: provider.provider,
        model: provider.model,
        command: provider.command,
        args: provider.args,
        status: "complete",
        startedAt,
        promptResolvedAt,
        pid,
        completedAt,
        exitCode: code,
        artifacts: {
          canonicalFileName: path.basename(analysisPath(videoId)),
          displayFileName: path.basename(displayAnalysisPath(videoId, resolvedMeta.title)),
          metadataFileName: path.basename(metadataCachePath(videoId)),
          stdoutFileName: path.basename(stdoutLogPath(videoId)),
          stderrFileName: path.basename(stderrLogPath(videoId)),
        },
      });
    } else {
      const error = code === null ? "process killed (timeout)" : `exit code ${code}`;
      atomicWriteJson(statusPath(videoId), {
        status: "failed",
        pid,
        startedAt,
        completedAt,
        error,
      });
      writeRunMetadata(videoId, {
        provider: provider.provider,
        model: provider.model,
        command: provider.command,
        args: provider.args,
        status: "failed",
        startedAt,
        promptResolvedAt,
        pid,
        completedAt,
        exitCode: code,
        error,
        artifacts: {
          canonicalFileName: path.basename(analysisPath(videoId)),
          displayFileName: path.basename(displayAnalysisPath(videoId, resolvedMeta.title)),
          metadataFileName: path.basename(metadataCachePath(videoId)),
          stdoutFileName: path.basename(stdoutLogPath(videoId)),
          stderrFileName: path.basename(stderrLogPath(videoId)),
        },
      });
    }
  });

  child.on("error", (err) => {
    clearTimeout(timeout);
    decrementRunning();
    const completedAt = new Date().toISOString();
    atomicWriteJson(statusPath(videoId), {
      status: "failed",
      pid,
      startedAt,
      completedAt,
      error: `spawn error: ${err.message}`,
    });
    writeRunMetadata(videoId, {
      provider: provider.provider,
      model: provider.model,
      command: provider.command,
      args: provider.args,
      status: "failed",
      startedAt,
      promptResolvedAt,
      pid,
      completedAt,
      exitCode: child.exitCode,
      error: `spawn error: ${err.message}`,
      artifacts: {
        canonicalFileName: path.basename(analysisPath(videoId)),
        displayFileName: path.basename(displayAnalysisPath(videoId, resolvedMeta.title)),
        metadataFileName: path.basename(metadataCachePath(videoId)),
        stdoutFileName: path.basename(stdoutLogPath(videoId)),
        stderrFileName: path.basename(stderrLogPath(videoId)),
      },
    });
  });

  return true;
}
