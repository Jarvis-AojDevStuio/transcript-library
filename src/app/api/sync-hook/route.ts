import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawn } from "node:child_process";
import { groupVideos, absTranscriptPath } from "@/lib/catalog";
import {
  atomicWriteJson,
  readStatus,
  isProcessAlive,
  statusPath,
  analysisPath,
  insightDir,
  canSpawn,
  incrementRunning,
  decrementRunning,
} from "@/lib/analysis";

export const runtime = "nodejs";

function validateBearerToken(req: Request, expectedToken: string): boolean {
  const header = req.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;

  const provided = Buffer.from(match[1], "utf8");
  const expected = Buffer.from(expectedToken, "utf8");

  if (provided.length !== expected.length) return false;
  return crypto.timingSafeEqual(provided, expected);
}

function spawnAnalysis(videoId: string, title: string, channel: string, topic: string, publishedDate: string, transcript: string): void {
  if (!canSpawn()) return;

  const prompt = [
    `Analyze this YouTube video transcript using the /YouTubeAnalyzer skill pattern.`,
    ``,
    `Video: ${title}`,
    `Channel: ${channel}`,
    `Topic: ${topic}`,
    `Published: ${publishedDate}`,
    ``,
    `Transcript:`,
    ``,
    transcript,
  ].join("\n");

  // Pipe prompt via stdin to avoid ARG_MAX limit on large transcripts
  const child = spawn("claude", ["-p"], {
    stdio: ["pipe", "pipe", "pipe"],
    detached: false,
  });

  child.stdin!.write(prompt);
  child.stdin!.end();

  if (child.pid === undefined) {
    atomicWriteJson(statusPath(videoId), {
      status: "failed",
      pid: 0,
      startedAt: new Date().toISOString(),
      error: "spawn failed: claude not found",
    });
    return;
  }

  incrementRunning();

  const startedAt = new Date().toISOString();
  atomicWriteJson(statusPath(videoId), {
    status: "running",
    pid: child.pid,
    startedAt,
  });

  const chunks: Buffer[] = [];
  const stderrChunks: Buffer[] = [];
  child.stdout?.on("data", (chunk: Buffer) => {
    chunks.push(chunk);
  });
  child.stderr?.on("data", (chunk: Buffer) => {
    stderrChunks.push(chunk);
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

    const stderr = Buffer.concat(stderrChunks).toString("utf8");
    if (stderr) console.error(`[sync-hook] stderr for ${videoId}:`, stderr.slice(0, 2000));

    if (code === 0 && chunks.length > 0) {
      const output = Buffer.concat(chunks).toString("utf8");
      const outDir = insightDir(videoId);
      fs.mkdirSync(outDir, { recursive: true });
      const tmpPath = `${analysisPath(videoId)}.tmp_${Date.now()}`;
      fs.writeFileSync(tmpPath, output);
      fs.renameSync(tmpPath, analysisPath(videoId));
      atomicWriteJson(statusPath(videoId), {
        status: "complete",
        pid: child.pid!,
        startedAt,
        completedAt: new Date().toISOString(),
      });
    } else {
      atomicWriteJson(statusPath(videoId), {
        status: "failed",
        pid: child.pid!,
        startedAt,
        completedAt: new Date().toISOString(),
        error: code === null ? "process killed (timeout)" : `exit code ${code}`,
      });
    }
  });

  child.on("error", (err) => {
    clearTimeout(timeout);
    decrementRunning();
    atomicWriteJson(statusPath(videoId), {
      status: "failed",
      pid: child.pid ?? 0,
      startedAt,
      error: `spawn error: ${err.message}`,
    });
  });
}

export async function POST(req: Request) {
  const syncToken = process.env.SYNC_TOKEN;
  if (!syncToken) {
    return NextResponse.json({ error: "webhook not configured" }, { status: 503 });
  }

  if (!validateBearerToken(req, syncToken)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Return 200 immediately, process asynchronously
  const videos = Array.from(groupVideos().values());

  // Find un-analyzed videos
  const unanalyzed = videos.filter((v) => {
    // Skip if analysis.md already exists
    try {
      fs.accessSync(analysisPath(v.videoId));
      return false;
    } catch {
      // No analysis yet
    }

    // Skip if currently running
    const st = readStatus(v.videoId);
    if (st?.status === "running" && isProcessAlive(st.pid)) {
      return false;
    }

    return true;
  });

  // Process sequentially (respects global concurrency cap)
  const processAsync = async () => {
    for (const video of unanalyzed) {
      if (!canSpawn()) {
        // Wait a bit for a slot
        await new Promise((r) => setTimeout(r, 5000));
        if (!canSpawn()) continue; // Still full, skip
      }

      const transcriptParts = video.parts.map((p) => {
        const abs = absTranscriptPath(p.filePath);
        try {
          return fs.readFileSync(abs, "utf8");
        } catch {
          return `[Part ${p.chunk}: file not found]`;
        }
      });
      const transcript = transcriptParts.join("\n\n---\n\n");

      spawnAnalysis(
        video.videoId,
        video.title,
        video.channel,
        video.topic,
        video.publishedDate,
        transcript
      );
    }
  };

  // Fire and forget
  processAsync().catch((err) => {
    console.error("[sync-hook] Batch processing error:", err);
  });

  return NextResponse.json({
    ok: true,
    message: "analysis triggered",
    queued: unanalyzed.length,
  });
}
