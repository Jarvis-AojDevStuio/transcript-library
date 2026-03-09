import { NextResponse } from "next/server";
import { listVideosByChannel } from "@/modules/catalog";

export const runtime = "nodejs";

/**
 * GET /api/channel
 * Returns the ordered list of videos belonging to the requested channel.
 *
 * @param req - Incoming request. Expects `?channel=` query param.
 * @returns JSON `{ channel, videos }`, or a 400 if the param is absent.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const channel = url.searchParams.get("channel");
  if (!channel) return NextResponse.json({ error: "missing channel" }, { status: 400 });
  const videos = listVideosByChannel(channel);
  return NextResponse.json({ channel, videos });
}
