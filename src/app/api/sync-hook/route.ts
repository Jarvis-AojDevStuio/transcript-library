import { NextResponse } from "next/server";
import fs from "node:fs";
import crypto from "node:crypto";
import { groupVideos, absTranscriptPath } from "@/modules/catalog";
import { readStatus, isProcessAlive, analysisPath, spawnAnalysis } from "@/modules/analysis";

export const runtime = "nodejs";

/**
 * Validates the `Authorization: Bearer <token>` header against an expected token
 * using a constant-time HMAC comparison to prevent timing attacks.
 *
 * @param req - Incoming request whose `authorization` header is inspected.
 * @param expectedToken - The token value to compare against.
 * @returns `true` if the provided token matches, `false` otherwise.
 */
function validateBearerToken(req: Request, expectedToken: string): boolean {
  const header = req.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;

  // HMAC both values to fixed-length buffers for fully constant-time comparison
  const provided = crypto.createHmac("sha256", "sync-hook-compare").update(match[1]).digest();
  const expected = crypto.createHmac("sha256", "sync-hook-compare").update(expectedToken).digest();
  return crypto.timingSafeEqual(provided, expected);
}

/**
 * POST /api/sync-hook
 * Webhook handler that triggers a batch analysis pass for all videos that do not
 * yet have an `analysis.md`. Returns immediately after token validation and
 * processes the batch asynchronously so callers with short timeouts do not hang.
 *
 * @param req - Incoming request. Must carry a valid `Authorization: Bearer` token
 *   matching the `SYNC_TOKEN` environment variable.
 * @returns JSON `{ ok: true }` on success, or a 401 / 503 error response.
 */
export async function POST(req: Request) {
  const syncToken = process.env.SYNC_TOKEN;
  if (!syncToken) {
    return NextResponse.json({ ok: false, error: "webhook not configured" }, { status: 503 });
  }

  if (!validateBearerToken(req, syncToken)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  // Process asynchronously — return immediately so curl --max-time 10 doesn't timeout
  (async () => {
    const videos = groupVideos();

    for (const [videoId, video] of videos) {
      // Skip if analysis already exists
      try {
        fs.accessSync(analysisPath(videoId));
        continue;
      } catch {
        // No analysis.md — proceed
      }

      // Skip if already running with alive PID
      const status = readStatus(videoId);
      if (status?.status === "running" && isProcessAlive(status.pid)) {
        continue;
      }

      // Build transcript
      const transcriptParts = video.parts.map((p) => {
        const abs = absTranscriptPath(p.filePath);
        try {
          return fs.readFileSync(abs, "utf8");
        } catch {
          return `[Part ${p.chunk}: file not found]`;
        }
      });
      const transcript = transcriptParts.join("\n\n---\n\n");

      const spawned = spawnAnalysis(
        videoId,
        {
          videoId,
          title: video.title,
          channel: video.channel,
          topic: video.topic,
          publishedDate: video.publishedDate,
          transcriptPartPath: absTranscriptPath(video.parts[0]?.filePath ?? ""),
        },
        transcript,
        "[sync-hook]",
      );

      if (!spawned) {
        console.log("[sync-hook] Concurrency cap reached, stopping batch");
        break;
      }
    }
  })().catch((err) => {
    console.error("[sync-hook] Batch processing error:", err);
  });

  return NextResponse.json({ ok: true, message: "analysis triggered" });
}
