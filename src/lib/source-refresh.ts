/**
 * source-refresh — RETIRED
 *
 * This module previously performed runtime `git fetch`/`merge` on an external
 * transcript repo pointed to by PLAYLIST_TRANSCRIPTS_REPO. That repo has been
 * merged into this repo at `pipeline/`. Runtime git sync is no longer possible
 * or necessary.
 *
 * All exported functions are no-ops that return success/empty results.
 * The module is kept (not deleted) because other files import from it.
 */

import { catalogDbPath } from "@/lib/catalog-db";
import path from "node:path";

export type RefreshOutcome = "updated" | "noop" | "failed";
export type RefreshPhase =
  | "repo-inspect"
  | "git-fetch"
  | "git-fast-forward"
  | "catalog-rebuild"
  | "completed";
export type RefreshTrigger = "sync-hook" | "cli";

export type RefreshRequestMetadata = {
  requestKey?: string;
  receivedAt?: string;
  idempotencyKey?: string | null;
  identityStrategy?: string;
  method?: string;
  path?: string;
  userAgent?: string | null;
};

export type SourceRefreshRecord = {
  schemaVersion: 1;
  trigger: RefreshTrigger;
  outcome: RefreshOutcome;
  phase: RefreshPhase;
  startedAt: string;
  completedAt: string;
  request?: RefreshRequestMetadata;
  repo: {
    remote: string;
    branch: string;
    currentBranch: string;
    headBefore: string;
    headAfter: string;
    upstreamHead: string;
  };
  catalog: {
    version: string | null;
    videoCount: number | null;
    partCount: number | null;
    checkOnly: boolean;
    preservedLastKnownGood: boolean;
  };
  error?: {
    message: string;
  };
};

export type RefreshSourceOptions = {
  trigger: RefreshTrigger;
  request?: RefreshRequestMetadata;
  checkOnly?: boolean;
};

const RETIRED_REPO_STUB = {
  remote: "none",
  branch: "none",
  currentBranch: "none",
  headBefore: "none",
  headAfter: "none",
  upstreamHead: "none",
};

/**
 * No-op stub. source-refresh has been retired — transcripts are now embedded
 * in the repo at pipeline/. Returns a synthetic "noop" record.
 */
export function refreshSourceCatalog(options: RefreshSourceOptions): SourceRefreshRecord {
  console.log(
    "[source-refresh] source-refresh retired: transcripts are now embedded in the repo (pipeline/). No git sync performed.",
  );

  const now = new Date().toISOString();
  return {
    schemaVersion: 1,
    trigger: options.trigger,
    outcome: "noop",
    phase: "completed",
    startedAt: now,
    completedAt: now,
    request: options.request,
    repo: RETIRED_REPO_STUB,
    catalog: {
      version: null,
      videoCount: null,
      partCount: null,
      checkOnly: options.checkOnly ?? false,
      preservedLastKnownGood: false,
    },
  };
}

export function sourceRefreshRecordPath(dbPath = catalogDbPath()): string {
  return path.join(path.dirname(dbPath), "last-source-refresh.json");
}
