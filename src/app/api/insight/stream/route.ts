import { NextResponse } from "next/server";
import { isValidVideoId } from "@/modules/analysis";
import { readRuntimeStreamEvent } from "@/lib/runtime-stream";

export const runtime = "nodejs";

/**
 * GET /api/insight/stream
 * Opens a Server-Sent Events stream that pushes status-first runtime snapshots
 * backed by a shared per-video cache. Concurrent viewers reuse the same
 * snapshot payload and receive heartbeat frames when nothing changed.
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
      let lastVersion: string | undefined;
      const send = () => {
        const event = readRuntimeStreamEvent(videoId, lastVersion);
        lastVersion = event.version;
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
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
