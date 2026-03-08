import { NextResponse } from "next/server";
import { listVideosByChannel } from "@/modules/catalog";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const channel = url.searchParams.get("channel");
  if (!channel) return NextResponse.json({ error: "missing channel" }, { status: 400 });
  const videos = listVideosByChannel(channel);
  return NextResponse.json({ channel, videos });
}
