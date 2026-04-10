# System Overview

## Product

Transcript Library is a private internal tool for a small friend group. The group shares a YouTube playlist, ingests transcripts into a local transcript repository, and uses AI analysis to turn long videos into searchable, discussable knowledge.

## Core flow

1. A video is added to the shared playlist and lands in the upstream transcript repo.
2. Transcript Library refreshes its local `PLAYLIST_TRANSCRIPTS_REPO` checkout through `node --import tsx scripts/refresh-source-catalog.ts` or `POST /api/sync-hook`.
3. The refresh authority fast-forwards the local checkout, rebuilds SQLite, and writes `data/catalog/last-source-refresh.json` plus `data/catalog/last-import-validation.json`.
4. A user opens a video page and watches the YouTube video inside the app.
5. The user starts analysis from the app.
6. The server resolves metadata, builds a deterministic headless prompt, and launches the configured provider runtime.
7. The runtime writes status, logs, metadata, run metadata, and markdown artifacts into `data/insights/<videoId>/`.
8. The app reads those artifacts and renders the analysis alongside the video.

## Major subsystems

- Catalog: transcript indexing and video/channel lookup
- Video workspace: in-app watch/read experience
- Analysis runtime: prompt construction, provider selection, process execution
- Insight storage: stable per-video artifact directories
- Knowledge browsing: curated markdown/knowledge content

## Runtime observability

The durable runtime surfaces one operator-facing contract across files, routes, and UI:

- `run.json` is the latest durable run authority for a video. It stores run identity, lifecycle, provider, model, and timing.
- `status.json` is the compatibility status artifact derived from the same lifecycle transitions so older reads and quick filesystem checks stay aligned.
- `worker-stdout.txt` and `worker-stderr.txt` are the raw evidence trail for a run. They are still written canonically, but the normal workspace treats them as secondary evidence.
- `reconciliation.json` is the durable mismatch record. It explains when a completed run no longer matches the expected artifacts, when the mismatch was detected, and whether a clean rerun is the correct next step.
- `GET /api/insight` assembles the status-first snapshot used by the video workspace. It reads the durable run state, reconciliation status, artifact names, retry guidance, and recent useful log lines.
- `GET /api/insight/stream` serves the same live-status story over SSE using a shared per-video cache, so concurrent viewers reuse one snapshot stream instead of hammering the filesystem independently.

This means operators can trust the video page first, then fall back to raw files when needed. If reconciliation reports a mismatch, the UI does not present that state as normal success.

## Hosted runtime and private API boundary

The app supports two deployment modes controlled by the `HOSTED` environment variable:

- **Local dev** (`HOSTED` unset): No authentication required. All API routes are open. No configuration needed to browse or iterate.
- **Hosted** (`HOSTED=true`): Server startup runs a preflight check via `src/instrumentation.ts` that validates both env presence and the source-refresh contract. Hosted startup now checks that `PLAYLIST_TRANSCRIPTS_REPO` is configured as an absolute-path git checkout, warns if the checkout is detached HEAD without `PLAYLIST_TRANSCRIPTS_BRANCH`, and warns when `last-source-refresh.json` or `last-import-validation.json` have not been produced yet.

Hosted mode has **two caller classes** behind one shared origin guard (`src/lib/private-api-guard.ts`):

1. **Friend-facing browser access** on `library.aojdevstudio.me`
   - Cloudflare Access is the identity system.
   - Browser requests are trusted only when they arrive with both `cf-access-jwt-assertion` and `cf-access-authenticated-user-email` and the app is configured with `CLOUDFLARE_ACCESS_AUD`.
   - The browser does **not** receive or manage `PRIVATE_API_TOKEN`.
2. **Machine access** for automation callers
   - Bearer authentication remains supported for machine-only entrypoints.
   - `/api/sync-hook` accepts `SYNC_TOKEN` for dedicated refresh callers and also accepts `PRIVATE_API_TOKEN` as the broader hosted override.
   - Any automation that must cross the Cloudflare edge should use either a dedicated automation hostname or Cloudflare service-token protection rather than assuming bearer-only access will work on the friend-facing hostname.

This means hosted `/api/*` is **not** a single bearer-only contract anymore. Human browser routes such as `/api/insight`, `/api/analyze`, and `/api/insight/stream` are meant to succeed through Cloudflare-managed browser identity, while machine workflows keep explicit bearer/service-token paths.

In hosted mode, response payloads are sanitized to strip internal filesystem paths, provider details, and worker PIDs. Local dev responses include full diagnostic detail.

The supported hosted contract is documented in `docs/operations/source-repo-sync-contract.md`.

### Required env vars (hosted mode)

| Variable                      | Purpose                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| `HOSTED`                      | Set to `true` or `1` to enable hosted mode                                                      |
| `PLAYLIST_TRANSCRIPTS_REPO`   | Absolute path to the app-owned transcript git checkout                                          |
| `CLOUDFLARE_ACCESS_AUD`       | Required trust anchor for browser access arriving from the Cloudflare Access-protected hostname |
| `PRIVATE_API_TOKEN`           | Hosted bearer token for supported machine callers                                               |
| `SYNC_TOKEN`                  | Refresh webhook authentication for dedicated callers (recommended, not required)                |
| `PLAYLIST_TRANSCRIPTS_BRANCH` | Recommended when the transcript checkout may be detached HEAD                                   |

## Scale validation

The hosted deployment has a repeatable validation path for checking browse and runtime behavior as the catalog grows:

```bash
npx tsx scripts/benchmark-hosted-scale.ts --check
```

At 1000 videos, all benchmarks operate with 25×–250× headroom. The current SQLite + filesystem architecture is validated through at least 5000 videos. See `docs/operations/hosted-scale-validation.md` for thresholds, escalation triggers, and runbook details.

## Design invariants

- Lookup key is always `videoId`
- Runtime browse reads come from SQLite only, never directly from `videos.csv`
- Failed catalog validation preserves the last known-good `catalog.db`
- Human review uses slugged markdown artifacts
- Provider choice does not leak into the UI contract
- Analysis execution remains separable from the web app
- Runtime outputs are inspectable from both filesystem and API surfaces

## Catalog operations

- Live browse catalog: `data/catalog/catalog.db` by default, or `CATALOG_DB_PATH` when configured
- Source refresh record: `data/catalog/last-source-refresh.json`
- Validation report: `data/catalog/last-import-validation.json`
- Manual refresh-only validation: `node --import tsx scripts/refresh-source-catalog.ts --check`
- Manual refresh-only publish: `node --import tsx scripts/refresh-source-catalog.ts`
- Legacy catalog-only validation: `npx tsx scripts/rebuild-catalog.ts --check`
- Legacy catalog-only publish: `npx tsx scripts/rebuild-catalog.ts`
- Automated refresh callers: `POST /api/sync-hook` or host-local cron/systemd invoking the refresh CLI

Refresh is refresh-only. Analysis remains on-demand and uses separate entrypoints.

## Analysis runtime operations

- Start a run: `POST /api/analyze?videoId=...`
- Read the latest durable workspace snapshot: `GET /api/insight?videoId=...`
- Follow live stage and recent evidence: `GET /api/insight/stream?videoId=...`
- Review raw filesystem evidence: `run.json`, `status.json`, `reconciliation.json`, `worker-stdout.txt`, and `worker-stderr.txt` under `data/insights/<videoId>/`

The preferred recovery path for failed or mismatched runs is a clean rerun from the workspace. Manual inspection of raw files is available for debugging, but it is not the primary operator workflow.
