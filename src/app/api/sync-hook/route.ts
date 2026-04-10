import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * POST /api/sync-hook — RETIRED
 *
 * This endpoint previously triggered a runtime `git fetch`/`merge` on an external
 * transcript repo. That repo has been merged into this repo at `pipeline/`.
 * Runtime git sync is no longer necessary or possible.
 *
 * Returns 410 Gone for all requests.
 */
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error:
        "This endpoint has been retired. Transcripts are now embedded in the repo at pipeline/. Deploy a new image to update transcript content.",
    },
    { status: 410 },
  );
}
