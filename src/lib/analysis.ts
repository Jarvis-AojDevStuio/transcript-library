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
  buildHeadlessAnalysisPrompt,
  enrichAnalysisMeta,
  type HeadlessAnalysisMeta,
} from "@/lib/headless-youtube-analysis";

/**
 * Status file written to `status.json` for each analysis run.
 * @typedef {Object} StatusFile
 * @property {"running"|"complete"|"failed"} status - Current run state
 * @property {number} pid - Process ID of the worker
 * @property {string} startedAt - ISO timestamp when the run started
 * @property {string} [completedAt] - ISO timestamp when the run finished
 * @property {string} [error] - Error message if status is "failed"
 */
export type StatusFile = {
  status: "running" | "complete" | "failed";
  pid: number;
  startedAt: string;
  completedAt?: string;
  error?: string;
};

/**
 * Metadata for a video used to build the analysis prompt.
 * @typedef {Object} AnalysisMeta
 * @property {string} videoId - YouTube video ID
 * @property {string} title - Video title
 * @property {string} channel - Channel name
 * @property {string} topic - Topic/category
 * @property {string} publishedDate - Publication date string
 * @property {string} [transcriptPartPath] - Optional path to transcript part file
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

/**
 * Run metadata written to `run.json` for each analysis run.
 * @typedef {Object} RunFile
 * @property {number} schemaVersion - Schema version for migrations
 * @property {AnalysisProvider} provider - Provider that executed the run
 * @property {string} [model] - Model used (if applicable)
 * @property {string} command - CLI command invoked
 * @property {string[]} args - Arguments passed to the command
 * @property {"running"|"complete"|"failed"} status - Run outcome
 * @property {string} videoId - YouTube video ID
 * @property {string} startedAt - ISO timestamp when the run started
 * @property {string} promptResolvedAt - ISO timestamp when the prompt was built
 * @property {number} pid - Process ID of the worker
 * @property {string} [completedAt] - ISO timestamp when the run finished
 * @property {number|null} [exitCode] - Process exit code
 * @property {string} [error] - Error message if status is "failed"
 * @property {Object} artifacts - Paths to output artifacts
 * @property {string} artifacts.canonicalFileName - analysis.md
 * @property {string} artifacts.displayFileName - slugified title markdown
 * @property {string} artifacts.metadataFileName - video-metadata.json
 * @property {string} artifacts.stdoutFileName - worker-stdout.txt
 * @property {string} artifacts.stderrFileName - worker-stderr.txt
 */
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

/**
 * Resolved provider configuration for spawning an analysis worker.
 * @typedef {Object} ProviderSpec
 * @property {AnalysisProvider} provider - Provider identifier
 * @property {string} command - CLI binary name
 * @property {string[]} args - Arguments for the CLI
 * @property {string} [model] - Model override
 * @property {"stdout"|"file"} outputMode - Where the provider writes output
 * @property {string} [outputPath] - Path for file output mode
 * @property {NodeJS.ProcessEnv} [env] - Environment overrides
 */
type ProviderSpec = {
  provider: AnalysisProvider;
  command: string;
  args: string[];
  model?: string;
  outputMode: "stdout" | "file";
  outputPath?: string;
  env?: NodeJS.ProcessEnv;
};

declare global {
  var __analysisRunningCount: number | undefined;
}

/** Maximum concurrent analysis workers. */
const MAX_CONCURRENT = 2;
/** Schema version for run.json. */
const RUN_SCHEMA_VERSION = 1;
/** Filename for worker stdout log. */
const WORKER_STDOUT_FILE = "worker-stdout.txt";
/** Filename for worker stderr log. */
const WORKER_STDERR_FILE = "worker-stderr.txt";
/** Legacy Claude stdout filename (pre-worker rename). */
const LEGACY_CLAUDE_STDOUT_FILE = "claude-stdout.txt";
/** Legacy Claude stderr filename (pre-worker rename). */
const LEGACY_CLAUDE_STDERR_FILE = "claude-stderr.txt";
const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{6,11}$/;
let _initialized = false;

/**
 * Returns the number of analysis workers currently running.
 * Scans insight directories on first call to reconcile with live processes.
 * @returns {number} Count of running workers
 * @internal
 */
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

/** Increments the running worker count. @internal */
function incrementRunning(): void {
  globalThis.__analysisRunningCount = getRunningCount() + 1;
}

/**
 * Decrements the running worker count. Call when a worker exits.
 * @returns {void}
 */
export function decrementRunning(): void {
  globalThis.__analysisRunningCount = Math.max(0, getRunningCount() - 1);
}

/**
 * Attempts to acquire a slot for a new analysis worker.
 * @returns {boolean} True if a slot was acquired, false if at capacity
 */
export function tryAcquireSlot(): boolean {
  if (getRunningCount() >= MAX_CONCURRENT) return false;
  incrementRunning();
  return true;
}

/**
 * Writes JSON to disk atomically via a temp file and rename.
 * Creates parent directories if needed.
 * @param {string} filePath - Target file path
 * @param {unknown} obj - Object to serialize as JSON
 * @throws {Error} On write or rename failure
 */
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

/**
 * Checks whether a process is still running.
 * @param {number} pid - Process ID to check
 * @returns {boolean} True if the process exists and is alive
 */
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

/**
 * Returns the base directory for all insight artifacts.
 * Falls back to the repo-local default when INSIGHTS_BASE_DIR is unset.
 * Hosted deployments should set INSIGHTS_BASE_DIR=/srv/transcript-library/insights.
 * @returns {string} Absolute path to the configured insights root
 */
export function insightsBaseDir(): string {
  const configured = process.env.INSIGHTS_BASE_DIR?.trim();
  if (configured) {
    return path.resolve(configured);
  }
  return path.join(process.cwd(), "data", "insights");
}

/**
 * Throws when a video ID is not safe to use in artifact paths.
 * @param {string} videoId - Candidate YouTube video ID
 * @returns {string} The validated video ID
 * @throws {Error} If the video ID is invalid
 */
function assertValidVideoId(videoId: string): string {
  if (!isValidVideoId(videoId)) {
    throw new Error(`Invalid videoId: ${videoId}`);
  }
  return videoId;
}

/**
 * Returns the insight directory for a video.
 * @param {string} videoId - YouTube video ID
 * @returns {string} Path to {insightsBaseDir()}/{videoId}
 */
export function insightDir(videoId: string): string {
  return path.join(insightsBaseDir(), assertValidVideoId(videoId));
}

/**
 * Returns the path to status.json for a video.
 * @param {string} videoId - YouTube video ID
 * @returns {string} Path to status.json
 */
export function statusPath(videoId: string): string {
  return path.join(insightDir(videoId), "status.json");
}

/**
 * Returns the path to the canonical analysis markdown file.
 * @param {string} videoId - YouTube video ID
 * @returns {string} Path to analysis.md
 */
export function analysisPath(videoId: string): string {
  return path.join(insightDir(videoId), "analysis.md");
}

/**
 * Returns the path to the human-readable analysis file (slugified title).
 * @param {string} videoId - YouTube video ID
 * @param {string} title - Video title to slugify
 * @returns {string} Path to {slugified-title}.md
 */
export function displayAnalysisPath(videoId: string, title: string): string {
  return path.join(insightDir(videoId), `${slugifyTitle(title)}.md`);
}

/**
 * Returns the path to the cached video metadata JSON.
 * @param {string} videoId - YouTube video ID
 * @returns {string} Path to video-metadata.json
 */
export function metadataCachePath(videoId: string): string {
  return path.join(insightDir(videoId), "video-metadata.json");
}

/**
 * Returns the path to run.json for a video.
 * @param {string} videoId - YouTube video ID
 * @returns {string} Path to run.json
 */
export function runMetadataPath(videoId: string): string {
  return path.join(insightDir(videoId), "run.json");
}

/**
 * Returns the path to the worker stdout log.
 * @param {string} videoId - YouTube video ID
 * @returns {string} Path to worker-stdout.txt
 */
export function stdoutLogPath(videoId: string): string {
  return path.join(insightDir(videoId), WORKER_STDOUT_FILE);
}

/**
 * Returns the path to the worker stderr log.
 * @param {string} videoId - YouTube video ID
 * @returns {string} Path to worker-stderr.txt
 */
export function stderrLogPath(videoId: string): string {
  return path.join(insightDir(videoId), WORKER_STDERR_FILE);
}

/**
 * Returns the path to the legacy Claude stdout log.
 * @param {string} videoId - YouTube video ID
 * @returns {string} Path to claude-stdout.txt
 */
export function legacyStdoutLogPath(videoId: string): string {
  return path.join(insightDir(videoId), LEGACY_CLAUDE_STDOUT_FILE);
}

/**
 * Returns the path to the legacy Claude stderr log.
 * @param {string} videoId - YouTube video ID
 * @returns {string} Path to claude-stderr.txt
 */
export function legacyStderrLogPath(videoId: string): string {
  return path.join(insightDir(videoId), LEGACY_CLAUDE_STDERR_FILE);
}

/**
 * Slugifies a video title for use in filenames.
 * Lowercases, replaces non-alphanumeric with hyphens, trims to 96 chars.
 * @param {string} title - Raw video title
 * @returns {string} Slugified string, or "analysis" if empty
 */
export function slugifyTitle(title: string): string {
  const normalized = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
  return normalized || "analysis";
}

/**
 * Type guard for StatusFile.
 * @param {unknown} val - Value to check
 * @returns {val is StatusFile} True if val is a valid StatusFile
 * @internal
 */
function isStatusFile(val: unknown): val is StatusFile {
  if (typeof val !== "object" || val === null) return false;
  const obj = val as Record<string, unknown>;
  return (
    (obj.status === "running" || obj.status === "complete" || obj.status === "failed") &&
    typeof obj.pid === "number" &&
    typeof obj.startedAt === "string"
  );
}

/**
 * Reads and parses status.json for a video.
 * @param {string} videoId - YouTube video ID
 * @returns {StatusFile|null} Parsed status or null if missing/invalid
 */
export function readStatus(videoId: string): StatusFile | null {
  try {
    const raw = fs.readFileSync(statusPath(videoId), "utf8");
    const parsed: unknown = JSON.parse(raw);
    return isStatusFile(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Type guard for RunFile.
 * @param {unknown} val - Value to check
 * @returns {val is RunFile} True if val is a valid RunFile
 * @internal
 */
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

/**
 * Reads and parses run.json for a video.
 * @param {string} videoId - YouTube video ID
 * @returns {RunFile|null} Parsed run metadata or null if missing/invalid
 */
export function readRunMetadata(videoId: string): RunFile | null {
  try {
    const raw = fs.readFileSync(runMetadataPath(videoId), "utf8");
    const parsed: unknown = JSON.parse(raw);
    return isRunFile(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Validates a YouTube video ID format.
 * @param {string} id - String to validate
 * @returns {boolean} True if id matches YouTube video ID pattern
 */
export function isValidVideoId(id: string): boolean {
  return VIDEO_ID_RE.test(id);
}

/**
 * Resolves PLAYLIST_TRANSCRIPTS_REPO from environment.
 * @returns {string} Absolute path to transcript repo
 * @throws {Error} If PLAYLIST_TRANSCRIPTS_REPO is not set
 * @internal
 */
function resolveRepoRoot(): string {
  const repoRoot = process.env.PLAYLIST_TRANSCRIPTS_REPO;
  if (!repoRoot) {
    throw new Error("PLAYLIST_TRANSCRIPTS_REPO is not set");
  }
  return repoRoot;
}

/**
 * Builds HeadlessAnalysisMeta from AnalysisMeta with repo root.
 * @param {AnalysisMeta} meta - Video metadata
 * @returns {HeadlessAnalysisMeta} Enriched metadata for prompt building
 * @internal
 */
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

/**
 * Resolves provider configuration from env (ANALYSIS_PROVIDER, model vars).
 * @param {string} videoId - YouTube video ID (for output paths)
 * @returns {ProviderSpec} Resolved provider spec
 * @internal
 */
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

/**
 * Writes run metadata to run.json.
 * @param {string} videoId - YouTube video ID
 * @param {Omit<RunFile, "schemaVersion"|"videoId">} payload - Run metadata
 * @internal
 */
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

/**
 * Creates insight directory and initial artifact files.
 * @param {string} videoId - YouTube video ID
 * @param {HeadlessAnalysisMeta} resolvedMeta - Metadata to cache
 * @internal
 */
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

/**
 * Reads provider output from file or concatenated stdout chunks.
 * @param {ProviderSpec} spec - Provider spec (determines output mode)
 * @param {Buffer[]} chunks - Stdout chunks (used when outputMode is "stdout")
 * @returns {string} Provider output text
 * @internal
 */
function readProviderOutput(spec: ProviderSpec, chunks: Buffer[]): string {
  if (spec.outputMode === "file") {
    return spec.outputPath ? fs.readFileSync(spec.outputPath, "utf8") : "";
  }
  return Buffer.concat(chunks).toString("utf8");
}

/**
 * Spawns the analysis provider CLI with the given spec.
 * @param {ProviderSpec} spec - Provider configuration
 * @returns {ChildProcessWithoutNullStreams} Spawned child process
 * @internal
 */
function spawnProvider(spec: ProviderSpec): ChildProcessWithoutNullStreams {
  return spawn(spec.command, spec.args, {
    env: spec.env ?? process.env,
    stdio: ["pipe", "pipe", "pipe"],
    detached: false,
  });
}

/**
 * Spawns a headless analysis worker for a video.
 * Builds the prompt, initializes artifacts, spawns the provider CLI, and wires
 * stdout/stderr to log files. On success, writes analysis.md and display file.
 * @param {string} videoId - YouTube video ID
 * @param {AnalysisMeta} meta - Video metadata for the prompt
 * @param {string} transcript - Full transcript text
 * @param {string} [logPrefix="[analyze]"] - Prefix for stderr logs
 * @returns {boolean} True if a slot was acquired and worker spawned, false otherwise
 */
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
