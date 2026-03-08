import { NextResponse } from "next/server";
import fs from "node:fs";
import { absTranscriptPath, getVideo } from "@/modules/catalog";

export const runtime = "nodejs";

function safeRead(p: string) {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const videoId = url.searchParams.get("videoId");
  if (!videoId) return NextResponse.json({ error: "missing videoId" }, { status: 400 });

  const video = getVideo(videoId);
  if (!video) return NextResponse.json({ error: "not found" }, { status: 404 });

  const parts = video.parts.map((p) => ({
    ...p,
    absPath: absTranscriptPath(p.filePath),
    content: safeRead(absTranscriptPath(p.filePath)),
  }));

  return NextResponse.json({ video, parts });
}
