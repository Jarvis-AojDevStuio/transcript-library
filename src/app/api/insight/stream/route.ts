import { NextResponse } from "next/server";
import { isProcessAlive, isValidVideoId, readStatus } from "@/modules/analysis";
import { getInsightArtifacts, readInsightLogTail, readRunMetadata } from "@/modules/insights";

export const runtime = "nodejs";

/**
 * Builds the SSE data payload for a given video's current analysis state.
 * Promotes a stale "running" status to "failed" when the recorded PID is no
 * longer alive.
 *
 * @param videoId - The video identifier to read state for.
 * @returns An object with `status`, `startedAt`, `completedAt`, `error`, `logs`,
 *   `artifacts`, and `run` fields.
 */
function toPayload(videoId: string) {
  const status = readStatus(videoId);
  const logs = readInsightLogTail(videoId);
  const state =
    status?.status === "running" && status.pid && !isProcessAlive(status.pid)
      ? "failed"
      : (status?.status ?? "idle");

  return {
    status: state,
    startedAt: status?.startedAt ?? null,
    completedAt: status?.completedAt ?? null,
    error: status?.error ?? null,
    logs,
    artifacts: getInsightArtifacts(videoId),
    run: readRunMetadata(videoId),
  };
}

/**
 * GET /api/insight/stream
 * Opens a Server-Sent Events stream that pushes the analysis payload every 2 s.
 * The stream closes automatically when the client disconnects.
 *
 * @param req - Incoming request. Expects `?videoId=` query param.
 * @returns An SSE `text/event-stream` response, or a 400 JSON error if the
 *   videoId is invalid.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const videoId = url.searchParams.get("videoId") || "";

  if (!isValidVideoId(videoId)) {
    return NextResponse.json({ ok: false, error: "invalid videoId" }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const send = () => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(toPayload(videoId))}\n\n`));
      };

      send();
      const interval = setInterval(send, 2000);

      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-store",
      Connection: "keep-alive",
    },
  });
}
