import { NextResponse } from "next/server";
import fs from "node:fs";
import {
  readStatus,
  isProcessAlive,
  isValidVideoId,
  statusPath,
  analysisPath,
  atomicWriteJson,
} from "@/modules/analysis";

export const runtime = "nodejs";

type StatusResponse = {
  status: "idle" | "running" | "complete" | "failed";
  startedAt?: string;
  error?: string;
};

/**
 * GET /api/analyze/status
 * Returns the current analysis lifecycle status for a video. Reconciles a stale
 * "running" entry by writing a "failed" tombstone when the worker PID is gone,
 * and falls back to checking for `analysis.md` when no `status.json` exists.
 *
 * @param req - Incoming request. Expects `?videoId=` query param.
 * @returns JSON `StatusResponse` (`{ status, startedAt?, error? }`), or a 400
 *   error if the videoId is invalid. Always served with `Cache-Control: no-store`.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const videoId = url.searchParams.get("videoId") || "";

  if (!isValidVideoId(videoId)) {
    return NextResponse.json({ ok: false, error: "invalid videoId" }, { status: 400 });
  }

  const status = readStatus(videoId);

  let response: StatusResponse;

  if (status?.status === "running") {
    // Verify PID is alive
    if (!isProcessAlive(status.pid)) {
      // Process died — update status file
      const updated = {
        ...status,
        status: "failed" as const,
        completedAt: new Date().toISOString(),
        error: "process died unexpectedly",
      };
      atomicWriteJson(statusPath(videoId), updated);
      response = { status: "failed", startedAt: status.startedAt, error: updated.error };
    } else {
      response = { status: "running", startedAt: status.startedAt };
    }
  } else if (status?.status === "complete") {
    response = { status: "complete", startedAt: status.startedAt };
  } else if (status?.status === "failed") {
    response = { status: "failed", startedAt: status.startedAt, error: status.error };
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
