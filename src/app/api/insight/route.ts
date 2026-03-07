import { NextResponse } from "next/server";
import fs from "node:fs";
import {
  analysisPath,
  atomicWriteJson,
  isProcessAlive,
  isValidVideoId,
  readStatus,
  statusPath,
} from "@/modules/analysis";
import { curateYouTubeAnalyzer } from "@/modules/curation";
import { getInsightArtifacts, readInsightMarkdown, readRunMetadata } from "@/modules/insights";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const videoId = url.searchParams.get("videoId") || "";

  if (!isValidVideoId(videoId)) {
    return NextResponse.json({ ok: false, error: "invalid videoId" }, { status: 400 });
  }

  const insight = readInsightMarkdown(videoId).markdown;
  const status = readStatus(videoId);

  let state: "idle" | "running" | "complete" | "failed" = insight ? "complete" : "idle";
  let error: string | undefined;

  if (!insight && status?.status === "running") {
    if (!isProcessAlive(status.pid)) {
      const updated = {
        ...status,
        status: "failed" as const,
        completedAt: new Date().toISOString(),
        error: "process died unexpectedly",
      };
      atomicWriteJson(statusPath(videoId), updated);
      state = "failed";
      error = updated.error;
    } else {
      state = "running";
    }
  } else if (!insight && status?.status === "failed") {
    state = "failed";
    error = status.error;
  } else if (!insight) {
    try {
      fs.accessSync(analysisPath(videoId));
      state = "complete";
    } catch {
      state = "idle";
    }
  }

  return NextResponse.json(
    {
      status: state,
      error,
      insight,
      curated: insight ? curateYouTubeAnalyzer(insight) : null,
      artifacts: getInsightArtifacts(videoId),
      run: readRunMetadata(videoId),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
