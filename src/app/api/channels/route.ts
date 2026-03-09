import { NextResponse } from "next/server";
import { listChannels } from "@/modules/catalog";

export const runtime = "nodejs";

/**
 * GET /api/channels
 * Returns all channels derived from the indexed transcript catalog.
 *
 * @returns JSON `{ channels }` — an array of channel name strings.
 */
export async function GET() {
  const channels = listChannels();
  return NextResponse.json({ channels });
}
