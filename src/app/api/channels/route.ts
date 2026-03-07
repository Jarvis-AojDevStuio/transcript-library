import { NextResponse } from "next/server";
import { listChannels } from "@/modules/catalog";

export const runtime = "nodejs";

export async function GET() {
  const channels = listChannels();
  return NextResponse.json({ channels });
}
