import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { absTranscriptPath, getVideo } from "@/lib/catalog";
import {
  atomicWriteJson,
  isProcessAlive,
  readStatus,
  statusPath,
  analysisPath,
  insightDir,
  isValidVideoId,
  tryAcquireSlot,
  decrementRunning,
} from "@/lib/analysis";

export const runtime = "nodejs";

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

  // Check if already running
  const current = readStatus(videoId);
  if (current?.status === "running" && isProcessAlive(current.pid)) {
    return NextResponse.json({ ok: false, error: "already running" }, { status: 409 });
  }

  // Atomically check and acquire concurrency slot
  if (!tryAcquireSlot()) {
    return NextResponse.json({ ok: false, error: "too many analyses running" }, { status: 429 });
  }

  // Build transcript content
  const transcriptParts = video.parts
    .map((p) => {
      const abs = absTranscriptPath(p.filePath);
      try {
        return fs.readFileSync(abs, "utf8");
      } catch {
        return `[Part ${p.chunk}: file not found]`;
      }
    });
  const transcript = transcriptParts.join("\n\n---\n\n");

  const prompt = [
    `Analyze this YouTube video transcript using the /YouTubeAnalyzer skill pattern.`,
    ``,
    `Video: ${video.title}`,
    `Channel: ${video.channel}`,
    `Topic: ${video.topic}`,
    `Published: ${video.publishedDate}`,
    ``,
    `Transcript:`,
    ``,
    transcript,
  ].join("\n");

  // Spawn claude -p, pipe prompt via stdin to avoid ARG_MAX limit
  const child = spawn("claude", ["-p"], {
    stdio: ["pipe", "pipe", "pipe"],
    detached: false,
  });

  // Write prompt to stdin (avoids macOS 262KB ARG_MAX for large transcripts)
  child.stdin!.write(prompt);
  child.stdin!.end();

  if (child.pid === undefined) {
    decrementRunning(); // Release the slot we acquired
    atomicWriteJson(statusPath(videoId), {
      status: "failed",
      pid: 0,
      startedAt: new Date().toISOString(),
      error: "spawn failed: claude not found",
    });
    return NextResponse.json({ ok: false, error: "spawn failed" }, { status: 500 });
  }

  // Write initial status
  const startedAt = new Date().toISOString();
  atomicWriteJson(statusPath(videoId), {
    status: "running",
    pid: child.pid,
    startedAt,
  });

  // Buffer stdout and stderr
  const chunks: Buffer[] = [];
  const stderrChunks: Buffer[] = [];
  child.stdout?.on("data", (chunk: Buffer) => {
    chunks.push(chunk);
  });
  child.stderr?.on("data", (chunk: Buffer) => {
    stderrChunks.push(chunk);
  });

  // 5-minute timeout with SIGTERM -> SIGKILL escalation
  const timeout = setTimeout(() => {
    child.kill("SIGTERM");
    const escalation = setTimeout(() => {
      if (child.exitCode === null) child.kill("SIGKILL");
    }, 10_000);
    child.once("exit", () => clearTimeout(escalation));
  }, 300_000);

  // Handle completion (close guarantees stdio flushed)
  child.on("close", (code) => {
    clearTimeout(timeout);
    decrementRunning();

    const stderr = Buffer.concat(stderrChunks).toString("utf8");
    if (stderr) console.error(`[analyze] stderr for ${videoId}:`, stderr.slice(0, 2000));

    if (code === 0 && chunks.length > 0) {
      const output = Buffer.concat(chunks).toString("utf8");
      // Atomic write for analysis.md — prevents corrupted output on crash
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

  // Handle spawn errors
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

  return NextResponse.json({ ok: true, status: "running" });
}
