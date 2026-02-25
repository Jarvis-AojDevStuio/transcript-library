import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { groupVideos, absTranscriptPath } from "@/lib/catalog";
import {
  readStatus,
  isStaleRunning,
  analysisPath,
  tryAcquireSlot,
  releaseSlot,
  insightsBaseDir,
  atomicWriteJson,
} from "@/lib/analysis";
import { addCatalogEntry } from "@/lib/catalog-map";
import { slugify, channelSlug } from "@/lib/slugify";

export const runtime = "nodejs";

const SKILL_PATH = path.join(process.cwd(), ".claude", "skills", "TranscriptAnalyzer.md");

function readSystemPrompt(): string {
  return fs.readFileSync(SKILL_PATH, "utf8");
}

function validateBearerToken(req: Request, expectedToken: string): boolean {
  const header = req.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;

  const provided = crypto.createHmac("sha256", "sync-hook-compare").update(match[1]).digest();
  const expected = crypto.createHmac("sha256", "sync-hook-compare").update(expectedToken).digest();
  return crypto.timingSafeEqual(provided, expected);
}

export async function POST(req: Request) {
  const syncToken = process.env.SYNC_TOKEN;
  if (!syncToken) {
    return NextResponse.json({ ok: false, error: "webhook not configured" }, { status: 503 });
  }

  if (!validateBearerToken(req, syncToken)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  // Process asynchronously — return immediately
  (async () => {
    const videos = groupVideos();
    const sysPrompt = readSystemPrompt();

    for (const [videoId, video] of videos) {
      // Skip if analysis already exists
      try {
        fs.accessSync(analysisPath(videoId));
        continue;
      } catch {
        // No analysis.md — proceed
      }

      // Skip if already running (non-stale)
      const status = readStatus(videoId);
      if (status?.status === "running" && !isStaleRunning(status)) {
        continue;
      }

      if (!tryAcquireSlot()) {
        console.log("[sync-hook] Concurrency cap reached, stopping batch");
        break;
      }

      const channel = channelSlug(video.channel);
      const date = video.publishedDate.slice(0, 10);
      const slug = slugify(video.title);
      const outDir = path.join(insightsBaseDir(), channel, `${date}_${slug}`);
      const statusFile = path.join(outDir, "status.json");
      const analysisFile = path.join(outDir, "analysis.md");

      const startedAt = new Date().toISOString();
      atomicWriteJson(statusFile, { status: "running", startedAt });
      addCatalogEntry(videoId, { channel, slug, date });

      try {
        const transcriptParts = video.parts.map((p) => {
          const abs = absTranscriptPath(p.filePath);
          try {
            return fs.readFileSync(abs, "utf8");
          } catch {
            return `[Part ${p.chunk}: file not found]`;
          }
        });
        const transcript = transcriptParts.join("\n\n---\n\n");

        const client = new Anthropic();
        const message = await client.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 8192,
          system: sysPrompt,
          messages: [
            {
              role: "user",
              content: `Analyze this YouTube video transcript.\n\nVideo: ${video.title}\nChannel: ${video.channel}\nTopic: ${video.topic}\nPublished: ${video.publishedDate}\n\nTranscript:\n\n${transcript}`,
            },
          ],
        });

        const output = message.content
          .filter((b): b is Anthropic.TextBlock => b.type === "text")
          .map((b) => b.text)
          .join("\n");

        if (output.trim()) {
          fs.mkdirSync(outDir, { recursive: true });
          const tmpPath = `${analysisFile}.tmp_${Date.now()}`;
          fs.writeFileSync(tmpPath, output);
          fs.renameSync(tmpPath, analysisFile);
          atomicWriteJson(statusFile, {
            status: "complete",
            startedAt,
            completedAt: new Date().toISOString(),
          });
        } else {
          atomicWriteJson(statusFile, {
            status: "failed",
            startedAt,
            completedAt: new Date().toISOString(),
            error: "empty response",
          });
        }
      } catch (err) {
        atomicWriteJson(statusFile, {
          status: "failed",
          startedAt,
          completedAt: new Date().toISOString(),
          error: `API error: ${(err as Error).message}`,
        });
      } finally {
        releaseSlot();
      }
    }
  })().catch((err) => {
    console.error("[sync-hook] Batch processing error:", err);
  });

  return NextResponse.json({ ok: true, message: "analysis triggered" });
}
