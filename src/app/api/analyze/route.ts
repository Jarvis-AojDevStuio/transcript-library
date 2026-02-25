import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { absTranscriptPath, getVideo } from "@/lib/catalog";
import {
  readStatus,
  isValidVideoId,
  isStaleRunning,
  tryAcquireSlot,
  releaseSlot,
  insightsBaseDir,
  atomicWriteJson,
} from "@/lib/analysis";
import { addCatalogEntry } from "@/lib/catalog-map";
import { slugify, channelSlug } from "@/lib/slugify";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 min ceiling for serverless

const SKILL_PATH = path.join(process.cwd(), ".claude", "skills", "TranscriptAnalyzer.md");

function readSystemPrompt(): string {
  return fs.readFileSync(SKILL_PATH, "utf8");
}

function buildUserPrompt(
  meta: { title: string; channel: string; topic: string; publishedDate: string },
  transcript: string,
): string {
  return [
    `Analyze this YouTube video transcript.`,
    ``,
    `Video: ${meta.title}`,
    `Channel: ${meta.channel}`,
    `Topic: ${meta.topic}`,
    `Published: ${meta.publishedDate}`,
    ``,
    `Transcript:`,
    ``,
    transcript,
  ].join("\n");
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const videoId = url.searchParams.get("videoId") || "";

  if (!isValidVideoId(videoId)) {
    return NextResponse.json({ ok: false, error: "invalid videoId" }, { status: 400 });
  }

  const video = getVideo(videoId);
  if (!video) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  }

  // Check if already running (with stale detection)
  const current = readStatus(videoId);
  if (current?.status === "running" && !isStaleRunning(current)) {
    return NextResponse.json({ ok: false, error: "already running" }, { status: 409 });
  }

  if (!tryAcquireSlot()) {
    return NextResponse.json({ ok: false, error: "too many analyses running" }, { status: 429 });
  }

  // Resolve output path
  const channel = channelSlug(video.channel);
  const date = video.publishedDate.slice(0, 10);
  const slug = slugify(video.title);
  const relPath = `${channel}/${date}_${slug}`;
  const outDir = path.join(insightsBaseDir(), relPath);
  const statusFile = path.join(outDir, "status.json");
  const analysisFile = path.join(outDir, "analysis.md");

  // Write initial running status
  const startedAt = new Date().toISOString();
  atomicWriteJson(statusFile, { status: "running", startedAt });

  // Register in catalog-map so status polling can find it
  addCatalogEntry(videoId, { channel, slug, date });

  // Build transcript content
  const transcriptParts = video.parts.map((p) => {
    const abs = absTranscriptPath(p.filePath);
    try {
      return fs.readFileSync(abs, "utf8");
    } catch {
      return `[Part ${p.chunk}: file not found]`;
    }
  });
  const transcript = transcriptParts.join("\n\n---\n\n");

  // Fire-and-forget: run analysis asynchronously
  const meta = {
    title: video.title,
    channel: video.channel,
    topic: video.topic,
    publishedDate: video.publishedDate,
  };
  runAnalysis(meta, transcript, statusFile, analysisFile)
    .catch((err) => {
      console.error("[analyze] unexpected error:", err);
      atomicWriteJson(statusFile, {
        status: "failed",
        startedAt,
        completedAt: new Date().toISOString(),
        error: `unexpected: ${(err as Error).message}`,
      });
    })
    .finally(() => {
      releaseSlot();
    });

  return NextResponse.json({ ok: true, status: "running" });
}

async function runAnalysis(
  meta: { title: string; channel: string; topic: string; publishedDate: string },
  transcript: string,
  statusFile: string,
  analysisFile: string,
): Promise<void> {
  const startedAt = new Date().toISOString();
  const client = new Anthropic();

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8192,
      system: readSystemPrompt(),
      messages: [{ role: "user", content: buildUserPrompt(meta, transcript) }],
    });

    const output = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    if (!output.trim()) {
      atomicWriteJson(statusFile, {
        status: "failed",
        startedAt,
        completedAt: new Date().toISOString(),
        error: "empty response from API",
      });
      return;
    }

    // Write analysis markdown atomically
    const dir = path.dirname(analysisFile);
    fs.mkdirSync(dir, { recursive: true });
    const tmpPath = `${analysisFile}.tmp_${Date.now()}`;
    fs.writeFileSync(tmpPath, output);
    fs.renameSync(tmpPath, analysisFile);

    atomicWriteJson(statusFile, {
      status: "complete",
      startedAt,
      completedAt: new Date().toISOString(),
    });

    const elapsed = ((Date.now() - new Date(startedAt).getTime()) / 1000).toFixed(1);
    console.log(`[analyze] complete videoId=${meta.title} elapsed=${elapsed}s`);
  } catch (err) {
    atomicWriteJson(statusFile, {
      status: "failed",
      startedAt,
      completedAt: new Date().toISOString(),
      error: `API error: ${(err as Error).message}`,
    });
  }
}
