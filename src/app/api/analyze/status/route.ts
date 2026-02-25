import { NextResponse } from "next/server";
import fs from "node:fs";
import {
  readStatus,
  isStaleRunning,
  isValidVideoId,
  statusPath,
  analysisPath,
  atomicWriteJson,
} from "@/lib/analysis";

export const runtime = "nodejs";

type StatusResponse = {
  status: "idle" | "running" | "complete" | "failed";
  startedAt?: string;
  elapsedSeconds?: number;
  error?: string;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const videoId = url.searchParams.get("videoId") || "";

  if (!isValidVideoId(videoId)) {
    return NextResponse.json({ ok: false, error: "invalid videoId" }, { status: 400 });
  }

  const status = readStatus(videoId);

  let response: StatusResponse;

  if (status?.status === "running") {
    // Check for stale "running" status (server restart recovery)
    if (isStaleRunning(status)) {
      const updated = {
        ...status,
        status: "failed" as const,
        completedAt: new Date().toISOString(),
        error: "analysis timed out (stale running status)",
      };
      atomicWriteJson(statusPath(videoId), updated);
      response = { status: "failed", startedAt: status.startedAt, error: updated.error };
    } else {
      const elapsed = Math.round((Date.now() - new Date(status.startedAt).getTime()) / 1000);
      response = {
        status: "running",
        startedAt: status.startedAt,
        elapsedSeconds: elapsed,
      };
    }
  } else if (status?.status === "complete") {
    response = { status: "complete", startedAt: status.startedAt };
  } else if (status?.status === "failed") {
    response = {
      status: "failed",
      startedAt: status.startedAt,
      error: status.error,
    };
  } else {
    // No status.json — check if analysis.md exists
    try {
      fs.accessSync(analysisPath(videoId));
      response = { status: "complete" };
    } catch {
      response = { status: "idle" };
    }
  }

  return NextResponse.json(response, {
    headers: { "Cache-Control": "no-store" },
  });
}
