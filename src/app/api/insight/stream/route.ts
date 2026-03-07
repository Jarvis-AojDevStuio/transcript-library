import { NextResponse } from "next/server";
import { isProcessAlive, isValidVideoId, readStatus } from "@/modules/analysis";
import { getInsightArtifacts, readInsightLogTail, readRunMetadata } from "@/modules/insights";

export const runtime = "nodejs";

function toPayload(videoId: string) {
  const status = readStatus(videoId);
  const logs = readInsightLogTail(videoId);
  const state =
    status?.status === "running" && status.pid && !isProcessAlive(status.pid) ? "failed" : status?.status ?? "idle";

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
