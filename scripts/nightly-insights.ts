import fs from "node:fs";
import path from "node:path";
import { submitRuntimeBatch } from "../src/lib/runtime-batches.ts";

function takeArg(name: string, fallback?: string): string | undefined {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx !== -1) return process.argv[idx + 1] ?? fallback;
  return fallback;
}

const limit = Number.parseInt(takeArg("limit", process.env.LIMIT || "20") || "20", 10) || 20;
const appDir = process.cwd();
const artifactsDir = path.join(appDir, "docs", "ops", "artifacts");

fs.mkdirSync(artifactsDir, { recursive: true });

const submission = submitRuntimeBatch({
  source: "nightly",
  limit,
  logPrefix: "[nightly-insights]",
});

const stamp = new Date().toISOString();
const summary = {
  at: stamp,
  limit,
  outcome: submission.outcome,
  batchId: submission.batch.batchId,
  source: submission.batch.source,
  catalogVersion: submission.batch.catalogVersion,
  totalItems: submission.batch.totalItems,
  counts: submission.batch.counts,
  startedVideoIds: submission.batch.summary.startedVideoIds,
  pendingVideoIds: submission.batch.summary.pendingVideoIds,
  skippedVideoIds: submission.batch.summary.skippedVideoIds,
  failedVideoIds: submission.batch.summary.failedVideoIds,
  completedVideoIds: submission.batch.summary.completedVideoIds,
};

const md = `# Nightly insights

- at: ${summary.at}
- limit: ${summary.limit}
- outcome: ${summary.outcome}
- batchId: ${summary.batchId}
- catalogVersion: ${summary.catalogVersion}
- totalItems: ${summary.totalItems}
- started: ${summary.counts.started}
- pending: ${summary.counts.pending}
- skipped: ${summary.counts.skipped}
- failed: ${summary.counts.failed}
- completed: ${summary.counts.completed}

## Started

${summary.startedVideoIds.length > 0 ? summary.startedVideoIds.map((videoId) => `- ${videoId}`).join("\n") : "- none"}

## Pending

${summary.pendingVideoIds.length > 0 ? summary.pendingVideoIds.map((videoId) => `- ${videoId}`).join("\n") : "- none"}

## Skipped

${summary.skippedVideoIds.length > 0 ? summary.skippedVideoIds.map((videoId) => `- ${videoId}`).join("\n") : "- none"}

## Failed

${summary.failedVideoIds.length > 0 ? summary.failedVideoIds.map((videoId) => `- ${videoId}`).join("\n") : "- none"}

## Completed

${summary.completedVideoIds.length > 0 ? summary.completedVideoIds.map((videoId) => `- ${videoId}`).join("\n") : "- none"}
`;

const outFile = path.join(
  artifactsDir,
  `nightly-insights_${new Date().toISOString().slice(0, 10)}.md`,
);
fs.writeFileSync(outFile, md);

console.log(JSON.stringify(summary, null, 2));

if (summary.counts.failed > 0) {
  process.exit(2);
}
