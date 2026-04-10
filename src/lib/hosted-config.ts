/**
 * Hosted runtime configuration and preflight validation.
 *
 * This module encodes the deployment contract for the transcript library:
 * - In production (`HOSTED=true`), critical env vars must be present or the
 *   server fails early with actionable guidance.
 * - In local dev, everything works with zero config — the app infers safe defaults.
 *
 * The preflight check runs once at server startup via `src/instrumentation.ts`.
 */

import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Environment detection
// ---------------------------------------------------------------------------

export type HostedAccessConfig = {
  cloudflareAccessAud: string | null;
  cloudflareAccessTeamDomain: string | null;
  cloudflareJwtHeader: "cf-access-jwt-assertion";
  cloudflareEmailHeader: "cf-access-authenticated-user-email";
};

export type PreflightResult = {
  ok: boolean;
  mode: "hosted" | "local";
  errors: string[];
  warnings: string[];
};

export function isHosted(): boolean {
  const v = process.env.HOSTED;
  return v === "true" || v === "1";
}

export function isLocalDev(): boolean {
  return !isHosted();
}

export function getHostedAccessConfig(): HostedAccessConfig {
  const cloudflareAccessAud = process.env.CLOUDFLARE_ACCESS_AUD?.trim() || null;
  const cloudflareAccessTeamDomain = process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN?.trim() || null;

  return {
    cloudflareAccessAud,
    cloudflareAccessTeamDomain,
    cloudflareJwtHeader: "cf-access-jwt-assertion",
    cloudflareEmailHeader: "cf-access-authenticated-user-email",
  };
}

function validateEmbeddedPipelineContract(errors: string[], _warnings: string[]) {
  // Transcripts are now embedded in the repo at pipeline/youtube-transcripts/.
  // PLAYLIST_TRANSCRIPTS_REPO env var is optional (overrides default path).
  // When not set, verify the embedded pipeline directory exists.
  if (process.env.PLAYLIST_TRANSCRIPTS_REPO?.trim()) {
    // Caller has explicitly overridden the path — trust them.
    return;
  }

  const pipelineTranscriptsDir = path.join(process.cwd(), "pipeline", "youtube-transcripts");
  if (!fs.existsSync(pipelineTranscriptsDir)) {
    errors.push(
      `pipeline/youtube-transcripts/ does not exist at ${pipelineTranscriptsDir}. The embedded transcript directory is required. Ensure the pipeline/ directory is present in the deployment image.`,
    );
  }
}

function validateHostedAccessContract(errors: string[], warnings: string[]) {
  const config = getHostedAccessConfig();

  if (!config.cloudflareAccessAud) {
    errors.push(
      "CLOUDFLARE_ACCESS_AUD is not set. Hosted browser access cannot be trusted until the app knows which Cloudflare Access audience the origin should accept.",
    );
  }

  if (!config.cloudflareAccessTeamDomain) {
    warnings.push(
      "CLOUDFLARE_ACCESS_TEAM_DOMAIN is not set. Add the Cloudflare Access team domain so hosted startup logs make the browser trust boundary explicit for operators.",
    );
  }
}

/**
 * Validates the runtime environment and returns a structured result.
 *
 * In hosted mode, missing critical env vars produce errors (the deploy should
 * fail). In local mode, the same gaps produce warnings at most.
 *
 * Critical hosted requirements:
 * - `PRIVATE_API_TOKEN` — shared secret for private API boundary
 * - `pipeline/youtube-transcripts/` must exist (or PLAYLIST_TRANSCRIPTS_REPO overrides)
 *
 * Non-critical but recommended:
 * - `SYNC_TOKEN` — webhook authentication (warns if missing in hosted mode, endpoint is retired)
 *
 * Note: PLAYLIST_TRANSCRIPTS_REPO is now optional. Transcripts are embedded in
 * the repo at pipeline/. Set PLAYLIST_TRANSCRIPTS_REPO only to override the default.
 */
export function runPreflight(): PreflightResult {
  const hosted = isHosted();
  const mode = hosted ? "hosted" : "local";
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!process.env.PRIVATE_API_TOKEN) {
    const msg =
      "PRIVATE_API_TOKEN is not set. Machine-authenticated internal API routes will be unavailable. Set a strong random token to keep the hosted machine caller path enabled.";
    if (hosted) errors.push(msg);
    else warnings.push(msg);
  }

  if (hosted) {
    validateHostedAccessContract(errors, warnings);
    validateEmbeddedPipelineContract(errors, warnings);
  }

  if (hosted && !process.env.SYNC_TOKEN) {
    warnings.push(
      "SYNC_TOKEN is not set. The /api/sync-hook endpoint has been retired (returns 410). This warning can be safely ignored.",
    );
  }

  return {
    ok: errors.length === 0,
    mode,
    errors,
    warnings,
  };
}

export function assertPreflight(): PreflightResult {
  const result = runPreflight();

  for (const w of result.warnings) {
    console.warn(`[hosted-config] ⚠ ${w}`);
  }

  if (!result.ok) {
    const summary = result.errors.map((e) => `  ✗ ${e}`).join("\n");
    const config = getHostedAccessConfig();
    const message = [
      `[hosted-config] Hosted preflight failed (${result.errors.length} error(s)):`,
      summary,
      "",
      `[hosted-config] Hosted browser contract: ${config.cloudflareJwtHeader} + ${config.cloudflareEmailHeader}${config.cloudflareAccessAud ? ` (aud=${config.cloudflareAccessAud})` : ""}${config.cloudflareAccessTeamDomain ? ` via ${config.cloudflareAccessTeamDomain}` : ""}`,
      "Fix the environment variables above and redeploy.",
      "Set HOSTED=true only when all required vars are configured.",
      "For local development, leave HOSTED unset — no configuration is required.",
    ].join("\n");

    console.error(message);
    throw new Error(
      `Hosted preflight failed: ${result.errors.length} error(s). See server logs for details.`,
    );
  }

  const config = getHostedAccessConfig();
  const contract = hostedContractSummary(config);

  if (result.warnings.length === 0) {
    console.log(`[hosted-config] ✓ Preflight passed (mode=${result.mode}; ${contract})`);
  } else {
    console.log(
      `[hosted-config] ✓ Preflight passed with ${result.warnings.length} warning(s) (mode=${result.mode}; ${contract})`,
    );
  }

  return result;
}

function hostedContractSummary(config: HostedAccessConfig): string {
  if (!isHosted()) return "local-dev";

  const aud = config.cloudflareAccessAud ? `aud=${config.cloudflareAccessAud}` : "aud=unset";
  const team = config.cloudflareAccessTeamDomain
    ? `team=${config.cloudflareAccessTeamDomain}`
    : "team=unset";

  return `browser=${config.cloudflareJwtHeader}+${config.cloudflareEmailHeader}, ${aud}, ${team}, machine=bearer(PRIVATE_API_TOKEN)`;
}
