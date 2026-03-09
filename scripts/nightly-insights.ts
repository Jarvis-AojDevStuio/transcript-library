import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { groupVideos } from "../src/lib/catalog";
import { insightPaths } from "../src/lib/insights";

type Job = {
  jobId: string;
  type: "video_analysis_v1";
  status: "queued";
  createdAt: string;
  video: {
    videoId: string;
    title: string;
    channel: string;
    topic: string;
    publishedDate: string;
  };
  transcripts: {
    root: string;
    parts: Array<{ chunk: number; wordCount: number; filePath: string; absPath: string }>;
  };
  output: { outDir: string; outPath: string };
  options: {
    runner: "claude-p";
    skill: "YouTubeAnalyzer";
    depth: "full";
  };
  attempts: number;
  maxAttempts: number;
};

function repoRoot(): string {
  return (
    process.env.PLAYLIST_TRANSCRIPTS_REPO ||
    "/Users/aojdevstudio/projects/clawd/playlist-transcripts"
  );
}

function absTranscriptPath(filePath: string): string {
  return path.join(repoRoot(), "youtube-transcripts", filePath);
}

function atomicWriteJson(filePath: string, obj: unknown) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tmp = `${filePath}.tmp_${crypto.randomBytes(6).toString("hex")}`;
  fs.writeFileSync(tmp, JSON.stringify(obj, null, 2));
  fs.renameSync(tmp, filePath);
}

function makeJobId() {
  return `analyze_${new Date().toISOString().replace(/[:.]/g, "-")}_${crypto
    .randomBytes(4)
    .toString("hex")}`;
}

function existsNonEmpty(p: string): boolean {
  try {
    return fs.existsSync(p) && fs.statSync(p).isFile() && fs.statSync(p).size > 0;
  } catch {
    return false;
  }
}

function countJson(dir: string): number {
  try {
    return fs.readdirSync(dir).filter((f) => f.endsWith(".json")).length;
  } catch {
    return 0;
  }
}

function takeArg(name: string, fallback?: string): string | undefined {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx !== -1) return process.argv[idx + 1] ?? fallback;
  return fallback;
}

const limit = Number.parseInt(takeArg("limit", process.env.LIMIT || "20") || "20", 10) || 20;
const appDir = process.cwd();
const dataDir = path.join(appDir, "data");
const queueDir = path.join(dataDir, "queue");
const failedDir = path.join(queueDir, "failed");
const artifactsDir = path.join(appDir, "docs", "ops", "artifacts");

fs.mkdirSync(queueDir, { recursive: true });
fs.mkdirSync(failedDir, { recursive: true });
fs.mkdirSync(artifactsDir, { recursive: true });

const videos = Array.from(groupVideos().values());
const missing = videos
  .filter((v) => !existsNonEmpty(insightPaths(v.videoId).analysis))
  .sort((a, b) => (b.publishedDate || "").localeCompare(a.publishedDate || ""));

const toDo = missing.slice(0, limit);

const beforeFailed = countJson(failedDir);

let enqueued = 0;
for (const v of toDo) {
  const output = insightPaths(v.videoId);

  const parts = v.parts.map((p) => ({
    chunk: p.chunk,
    wordCount: p.wordCount,
    filePath: p.filePath,
    absPath: absTranscriptPath(p.filePath),
  }));

  const job: Job = {
    jobId: makeJobId(),
    type: "video_analysis_v1",
    status: "queued",
    createdAt: new Date().toISOString(),
    video: {
      videoId: v.videoId,
      title: v.title,
      channel: v.channel,
      topic: v.topic,
      publishedDate: v.publishedDate,
    },
    transcripts: {
      root: repoRoot(),
      parts,
    },
    output: { outDir: output.dir, outPath: output.analysis },
    options: { runner: "claude-p", skill: "YouTubeAnalyzer", depth: "full" },
    attempts: 0,
    maxAttempts: 3,
  };

  atomicWriteJson(path.join(queueDir, `${job.jobId}.json`), job);
  enqueued++;
}

// Run worker up to `enqueued` times.
let processed = 0;
for (let i = 0; i < enqueued; i++) {
  const { spawnSync } = await import("node:child_process");
  const r = spawnSync(path.join(appDir, "scripts", "analysis-worker.sh"), {
    cwd: appDir,
    stdio: "inherit",
  });
  if (r.status !== 0) {
    // worker already moved job to failed/; stop for the night.
    break;
  }
  processed++;
}

const afterFailed = countJson(failedDir);
const newFailed = Math.max(0, afterFailed - beforeFailed);

const stamp = new Date().toISOString();
const summary = {
  at: stamp,
  limit,
  totalVideos: videos.length,
  missingBefore: missing.length,
  enqueued,
  processed,
  newFailed,
};

const md = `# Nightly insights\n\n- at: ${summary.at}\n- limit: ${summary.limit}\n- totalVideos: ${summary.totalVideos}\n- missingBefore: ${summary.missingBefore}\n- enqueued: ${summary.enqueued}\n- processed: ${summary.processed}\n- newFailed: ${summary.newFailed}\n\n## Worklist\n\n${toDo
  .map((v) => `- ${v.videoId} — ${v.title} (${v.channel})`)
  .join("\n")}\n`;

const outFile = path.join(
  artifactsDir,
  `nightly-insights_${new Date().toISOString().slice(0, 10)}.md`,
);
fs.writeFileSync(outFile, md);

// stdout for cron summary
console.log(md);

if (newFailed > 0) {
  process.exit(2);
}
