import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { submitRuntimeBatch, type BatchRequestMetadata } from "@/lib/runtime-batches";

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

function extractRequestIdentity(req: Request, bodyText: string): BatchRequestMetadata {
  const idempotencyKey =
    req.headers.get("idempotency-key") ??
    req.headers.get("x-sync-request-id") ??
    req.headers.get("x-github-delivery") ??
    req.headers.get("x-delivery-id");
  const receivedAt = new Date().toISOString();

  if (idempotencyKey) {
    return {
      requestKey: `sync-hook:${idempotencyKey}`,
      receivedAt,
      idempotencyKey,
      method: "POST",
      path: "/api/sync-hook",
      remoteAddress: req.headers.get("x-forwarded-for"),
      userAgent: req.headers.get("user-agent"),
    };
  }

  const fingerprint = crypto
    .createHash("sha256")
    .update(
      JSON.stringify({
        method: "POST",
        path: "/api/sync-hook",
        bodyText,
        userAgent: req.headers.get("user-agent") ?? "",
        forwardedFor: req.headers.get("x-forwarded-for") ?? "",
        bucket: Math.floor(Date.now() / (10 * 60 * 1000)),
      }),
    )
    .digest("hex")
    .slice(0, 24);

  return {
    requestKey: `sync-hook:fingerprint:${fingerprint}`,
    receivedAt,
    method: "POST",
    path: "/api/sync-hook",
    remoteAddress: req.headers.get("x-forwarded-for"),
    userAgent: req.headers.get("user-agent"),
  };
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

  const bodyText = await req.text();
  const request = extractRequestIdentity(req, bodyText);
  const submission = submitRuntimeBatch({
    source: "sync-hook",
    request,
    logPrefix: "[sync-hook]",
  });

  console.log("[sync-hook] Batch submission", {
    outcome: submission.outcome,
    batchId: submission.batch.batchId,
    counts: submission.batch.counts,
    requestKey: submission.batch.request?.requestKey,
  });

  return NextResponse.json(
    {
      ok: true,
      outcome: submission.outcome,
      batch: submission.batch,
      itemCount: submission.items.length,
      counts: submission.batch.counts,
      request: submission.batch.request ?? null,
    },
    { status: submission.outcome === "created" ? 202 : 200 },
  );
}
