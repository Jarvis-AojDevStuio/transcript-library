import { NextResponse } from "next/server";
import fs from "node:fs";
import { absTranscriptPath, getVideo } from "@/modules/catalog";
import { isProcessAlive, readStatus, isValidVideoId, spawnAnalysis } from "@/modules/analysis";

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

  const spawned = spawnAnalysis(
    videoId,
    {
      videoId,
      title: video.title,
      channel: video.channel,
      topic: video.topic,
      publishedDate: video.publishedDate,
      transcriptPartPath: absTranscriptPath(video.parts[0]?.filePath ?? ""),
    },
    transcript,
    "[analyze]",
  );

  if (!spawned) {
    return NextResponse.json({ ok: false, error: "too many analyses running" }, { status: 429 });
  }

  return NextResponse.json({ ok: true, status: "running" });
}
