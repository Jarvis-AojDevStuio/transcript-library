#!/usr/bin/env bun
/**
 * Batch analysis pipeline — replaces nightly-insights.ts.
 * Reads the catalog, finds videos missing insights, and processes them
 * via direct Anthropic API calls.
 *
 * Usage:
 *   bun scripts/batch-analyze.ts                  # Process up to 20 videos
 *   bun scripts/batch-analyze.ts --limit 5        # Process up to 5
 *   bun scripts/batch-analyze.ts --video f8cfH5XX-XU  # Single video
 *   bun scripts/batch-analyze.ts --dry-run        # List without processing
 *   bun scripts/batch-analyze.ts --channel IndyDevDan  # Filter by channel
 */

import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { groupVideos, absTranscriptPath, type Video } from "../src/lib/catalog";
import { hasInsight } from "../src/lib/insights";
import { addCatalogEntry, readCatalogMap } from "../src/lib/catalog-map";
import { slugify, channelSlug } from "../src/lib/slugify";
import { atomicWriteJson } from "../src/lib/analysis";
import { systemPrompt, userPrompt } from "./analysis-prompt";

// --- CLI args ---

function getArg(name: string): string | undefined {
  const idx = process.argv.indexOf(`--${name}`);
  return idx !== -1 ? process.argv[idx + 1] : undefined;
}

const hasFlag = (name: string) => process.argv.includes(`--${name}`);

const limit = Number.parseInt(getArg("limit") || "20", 10) || 20;
const singleVideoId = getArg("video");
const dryRun = hasFlag("dry-run");
const channelFilter = getArg("channel");

// --- Main ---

const INSIGHTS_BASE = path.join(process.cwd(), "data", "insights");

async function processVideo(video: Video, index: number, total: number): Promise<boolean> {
  const label = `[${index + 1}/${total}]`;
  const channel = channelSlug(video.channel);
  const date = video.publishedDate.slice(0, 10);
  const slug = slugify(video.title);
  const relPath = `${channel}/${date}_${slug}`;
  const outDir = path.join(INSIGHTS_BASE, relPath);
  const statusFile = path.join(outDir, "status.json");
  const analysisFile = path.join(outDir, "analysis.md");

  process.stdout.write(`${label} ${video.channel} / ${slug} ... `);

  // Build transcript
  const transcriptParts = video.parts.map((p) => {
    const abs = absTranscriptPath(p.filePath);
    try {
      return fs.readFileSync(abs, "utf8");
    } catch {
      return `[Part ${p.chunk}: file not found]`;
    }
  });
  const transcript = transcriptParts.join("\n\n---\n\n");

  // Write running status
  const startedAt = new Date().toISOString();
  atomicWriteJson(statusFile, { status: "running", startedAt });

  try {
    const client = new Anthropic();
    const startMs = Date.now();

    const meta = {
      title: video.title,
      channel: video.channel,
      topic: video.topic,
      publishedDate: video.publishedDate,
    };

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8192,
      system: systemPrompt(),
      messages: [{ role: "user", content: userPrompt(meta, transcript) }],
    });

    const output = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    if (!output.trim()) {
      throw new Error("empty response from API");
    }

    // Write output atomically
    fs.mkdirSync(outDir, { recursive: true });
    const tmpPath = `${analysisFile}.tmp_${Date.now()}`;
    fs.writeFileSync(tmpPath, output);
    fs.renameSync(tmpPath, analysisFile);

    // Update status
    atomicWriteJson(statusFile, {
      status: "complete",
      startedAt,
      completedAt: new Date().toISOString(),
    });

    // Register in catalog-map
    addCatalogEntry(video.videoId, { channel, slug, date });

    const elapsed = ((Date.now() - startMs) / 1000).toFixed(1);
    console.log(`${elapsed}s ... done`);
    return true;
  } catch (err) {
    atomicWriteJson(statusFile, {
      status: "failed",
      startedAt,
      completedAt: new Date().toISOString(),
      error: (err as Error).message,
    });
    console.log(`FAILED: ${(err as Error).message}`);
    return false;
  }
}

async function main() {
  const videos = Array.from(groupVideos().values());
  let candidates: Video[];

  if (singleVideoId) {
    const video = videos.find((v) => v.videoId === singleVideoId);
    if (!video) {
      console.error(`Video not found: ${singleVideoId}`);
      process.exit(1);
    }
    candidates = [video];
  } else {
    candidates = videos
      .filter((v) => !hasInsight(v.videoId))
      .filter((v) => !channelFilter || v.channel === channelFilter)
      .sort((a, b) => (b.publishedDate || "").localeCompare(a.publishedDate || ""));
  }

  const toDo = candidates.slice(0, limit);

  console.log(`\nBatch Analysis Pipeline`);
  console.log(`${"=".repeat(50)}`);
  console.log(`Total videos: ${videos.length}`);
  console.log(`Missing insights: ${candidates.length}`);
  console.log(`Processing: ${toDo.length}${dryRun ? " (DRY RUN)" : ""}`);
  if (channelFilter) console.log(`Channel filter: ${channelFilter}`);
  console.log();

  if (dryRun) {
    for (const v of toDo) {
      const slug = slugify(v.title);
      console.log(`  ${v.videoId} — ${v.channel} / ${slug}`);
    }
    console.log(`\n${toDo.length} videos would be processed.`);
    return;
  }

  let processed = 0;
  let failed = 0;

  for (let i = 0; i < toDo.length; i++) {
    const ok = await processVideo(toDo[i], i, toDo.length);
    if (ok) processed++;
    else failed++;
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(
    `Summary: ${processed} processed, ${failed} failed, ${toDo.length - processed - failed} skipped`,
  );

  if (failed > 0) process.exit(2);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
