<div align="center">

# Transcript Library

### **Watch the source. Read the analysis. Keep the signal.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/AojdevStudio/transcript-library/pulls)

_A private reading room for a small group of friends who take YouTube seriously._

[**Library**](#quick-start) · [**Knowledge Base**](#how-it-works) · [**Analysis Runtime**](#how-it-works)

</div>

---

## The Problem With Shared Playlists

You drop a YouTube video in the group chat. Three friends say they'll watch it. One actually does, a week later, alone, and forgets what they wanted to say. The other two never get around to it.

The video had real signal. A framework you could apply. A story worth discussing. But the knowledge dissolved — into separate browser sessions, half-watched tabs, and messages that got buried.

- The insight lived in your head, not somewhere shareable
- There was no way to read the transcript without leaving the video
- Analysis you'd want to reference later didn't exist
- You watched it once and moved on

**Sound familiar?**

> _"I'll send you the timestamp." — said before forgetting the timestamp, the video, and what it was about._

---

## The Insight

Everyone in the group is curious. Nobody has unlimited time. You need a way to extract signal from a video without treating it like a solo research project.

<div align="center">

### **Watch the video inside the app.**

### **Let the analysis run in the background.**

</div>

The transcript is already there. The AI tooling already exists. The only missing piece was a workspace that wired it together — for a specific group of people who already trust each other's taste in content.

<div align="center">

## **A reading room for your shared playlist.**

</div>

---

## What This Is

Transcript Library is a private internal tool for a small group of friends built around a shared YouTube playlist.

| Layer         | What It Does                                                                   |
| :------------ | :----------------------------------------------------------------------------- |
| **Catalog**   | Refreshes a local SQLite catalog from the transcript repo for all browse reads |
| **Player**    | Embeds the YouTube video in-app — no tab switching                             |
| **Analysis**  | Runs AI synthesis headlessly via `claude` CLI or `codex` CLI                   |
| **Knowledge** | Stores markdown notes alongside video insights for long-term reference         |

This is not a SaaS product. It is a proof of concept for a trusted group that already has access to Claude and ChatGPT tooling.

---

## See It In Action

<details>
<summary><b>The workspace: player + analysis on one page</b></summary>

```
Library > Channel > Video Title

[  YouTube player — full width, no chrome  ]

Analysis
──────────────────────────────────────────
Summary    Key Takeaways    Action Items

Full report ↓ (rendered inline, no disclosure)

Transcript
──────────────────────────────────────────
Part 1  ·  2,400 words         Open ↗
Part 2  ·  1,800 words         Open ↗
```

</details>

<details>
<summary><b>The pipeline: how a video becomes an insight</b></summary>

```
Shared YouTube Playlist
        ↓
playlist-transcripts repo (auto-syncs every 4h)
        ↓
Transcript Library catalog ingestion
        ↓
POST /api/analyze?videoId=...
        ↓
claude CLI or codex CLI (headless, local)
        ↓
data/insights/<videoId>/analysis.md
        ↓
VideoAnalysisWorkspace (live status, polling)
```

</details>

---

## What You Get

| Feature                   | How It Works                                     | Why It Matters                                                     |
| :------------------------ | :----------------------------------------------- | :----------------------------------------------------------------- |
| **Embedded player**       | YouTube iframe, no redirect                      | Watch and read without splitting attention                         |
| **Headless analysis**     | claude-cli or codex-cli via provider abstraction | Run from any machine, swap providers without touching UI           |
| **Insight artifacts**     | Canonical `analysis.md` + run metadata per video | Stable lookup by `videoId`, human-readable alongside machine paths |
| **Live status**           | SSE stream during analysis run                   | Know when it's done without refreshing                             |
| **Knowledge base**        | Markdown folders alongside video insights        | Essays and notes in the same editorial workspace                   |
| **Breadcrumb navigation** | Library → Channel → Video                        | Always know where you are, always one click back                   |

---

## Quick Start

### Prerequisites

- Node.js 18+ / [Bun](https://bun.sh)
- A local clone of your `playlist-transcripts` repo
- `claude` CLI or `codex` CLI (for running analysis)

### Install

```bash
git clone https://github.com/AojdevStudio/transcript-library
cd transcript-library
bun install
cp .env.example .env.local
```

### Configure

```bash
# Required
PLAYLIST_TRANSCRIPTS_REPO=/absolute/path/to/playlist-transcripts

# Optional
ANALYSIS_PROVIDER=claude-cli
INSIGHTS_BASE_DIR=/srv/transcript-library/insights   # hosted deploys
CATALOG_DB_PATH=/srv/transcript-library/catalog/catalog.db

# Hosted deployment (set these when deploying, not for local dev)
HOSTED=true                          # enables preflight validation + hosted guard
CLOUDFLARE_ACCESS_AUD=<cf-access-aud> # required — trusts browser identity from Cloudflare Access
PRIVATE_API_TOKEN=<strong-random>    # machine token for supported automation entrypoints
SYNC_TOKEN=<webhook-secret>          # recommended — authenticates /api/sync-hook callers
```

> **Local dev needs zero hosted config.** Leave `HOSTED` unset and all API routes
> work without authentication. The server logs warnings for missing vars but never
> blocks startup.
>
> **Hosted access model:** `library.aojdevstudio.me` is the friend-facing Cloudflare Access
> hostname. Approved friends use browser access there with Cloudflare-managed identity.
> Do not ship `PRIVATE_API_TOKEN` to the browser or assume bearer-only access is supported on
> that hostname. Machine access stays on explicit automation paths such as `/api/sync-hook`,
> same-host cron/systemd jobs, or a dedicated automation/deploy hostname.

### Run

```bash
just start
# → http://localhost:3939
```

---

## How It Works

![Transcript Library Architecture](./docs/architecture-diagram.png)

### Artifact Layout

Each analysis lives under a stable `videoId` path. Local development defaults to
`data/insights`, while the canonical hosted path is `/srv/transcript-library/insights` via
`INSIGHTS_BASE_DIR`.

```
data/insights/<videoId>/
  analysis.json            ← authoritative structured artifact
  analysis.md              ← human-readable report derived from JSON
  <slugified-title>.md     ← human-readable copy
  video-metadata.json      ← channel, topic, published date
  run.json                 ← provider, model, timing
  worker-stdout.txt        ← live log during run
  worker-stderr.txt        ← errors
  status.json              ← idle | running | complete | failed

data/insights/.migration-status.json
  remainingLegacyCount     ← machine-checkable migration window status
```

Legacy markdown-only artifacts are supported only during the one-time migration window. Operators
can check migration completion with `node scripts/migrate-legacy-insights-to-json.ts --check` and
complete the upgrade by rerunning the script without `--check`.

### Catalog Refresh Contract

Browse reads are SQLite-only after Phase 2. The app keeps the live catalog at
`data/catalog/catalog.db` by default and writes the latest import report to
`data/catalog/last-import-validation.json` unless `CATALOG_DB_PATH` points somewhere else.

```bash
npx tsx scripts/rebuild-catalog.ts
npx tsx scripts/rebuild-catalog.ts --check
```

- `npx tsx scripts/rebuild-catalog.ts` rebuilds a temp SQLite snapshot, validates it, and atomically
  swaps it into place only when the import passes.
- `npx tsx scripts/rebuild-catalog.ts --check` runs the same validation gate without replacing the live
  DB, while still updating `last-import-validation.json` for operator review.
- A failed validation leaves the last known-good `catalog.db` in place. The app does not fall back
  to `videos.csv` at runtime anymore.
- `POST /api/sync-hook` and `scripts/daily-operational-sweep.ts` both use the supported refresh
  authority before reading browse metadata, so unattended automation and the app use the same
  catalog authority.

### Provider Abstraction

Analysis runs through a thin provider boundary. Swap `ANALYSIS_PROVIDER` to switch between `claude-cli` and `codex-cli` — no UI changes, no redeployment.

```bash
# In .env.local
ANALYSIS_PROVIDER=claude-cli    # default
ANALYSIS_PROVIDER=codex-cli     # alternative
```

### Runtime Observability Contract

Phase 3 keeps the operator story simple and durable:

- `run.json` is the latest durable run record for a `videoId`, including provider, model, lifecycle, and timing.
- `status.json` is the compatibility artifact that mirrors the current lifecycle for quick reads and older surfaces.
- `worker-stdout.txt` and `worker-stderr.txt` remain the raw evidence trail when a run needs deeper inspection.
- `reconciliation.json` records whether the latest durable run and the expected artifacts still agree, including mismatch reasons and rerun-ready guidance.
- `GET /api/insight` is the status-first snapshot used by the video workspace. It returns lifecycle, stage, retry guidance, reconciliation details, recent log lines, and the current artifact bundle without making operators read raw files first.
- `GET /api/insight/stream` reuses a shared per-video snapshot cache so concurrent viewers consume the same live status payload instead of polling disk independently. The workspace prioritizes stage, retry guidance, and `recentLogs`; full raw logs stay secondary.

When `reconciliation.json` reports a mismatch, the app treats the latest run as retry-needed instead of quietly presenting it as normal success. The intended operator recovery path is a clean rerun, not manual file repair.

### Core API Routes

```
POST /api/analyze?videoId=...         Start headless analysis
GET  /api/analyze/status?videoId=...  Poll run status
GET  /api/insight?videoId=...         Fetch completed insight
GET  /api/insight/stream?videoId=...  SSE stream during run
GET  /api/raw?path=...                Serve raw transcript chunks
```

---

## Commands

```bash
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> gsd/M002/S04
just start              # Dev server
just prod-start         # Production
just build              # Next.js build
just lint               # ESLint
just typecheck          # tsc --noEmit
just daily-sweep        # Unattended daily sweep: refresh-only ingest + safe repair, no analysis launch
just backfill-insights  # Explicit analysis workflow for existing videos
<<<<<<< HEAD
=======
just start            # Dev server
just prod-start       # Production
just build            # Next.js build
just lint             # ESLint
just typecheck        # tsc --noEmit
just backfill-insights  # Re-run analysis for existing videos
>>>>>>> gsd/M002/S01
=======
>>>>>>> gsd/M002/S04
npx tsx scripts/rebuild-catalog.ts --check  # Validate catalog parity without cutover
npx tsx scripts/benchmark-hosted-scale.ts --check  # Scale validation (1000-video benchmark)
```

### Unattended daily sweep

Schedule this command for unattended operation:

```bash
just daily-sweep
# or: node --import tsx scripts/daily-operational-sweep.ts
```

The daily sweep is the unattended default. It refreshes source state, republishes browse state, runs
only the conservative historical repair pass, and writes a durable operator record to
`data/runtime/daily-operational-sweep/latest.json` by default (or the sibling `runtime/`
directory next to `INSIGHTS_BASE_DIR` on hosted installs). Each run also writes an immutable archive
record under `data/runtime/daily-operational-sweep/archive/<sweepId>.json`.

When the sweep reports `manualFollowUpVideoIds`, those are rerun-only videos: the sweep left them
visible for manual follow-up instead of fabricating `run.json` or starting analysis work. Analysis
remains on-demand or explicit.

---

## The Story

This started as a frustration. Our group watches a lot of YouTube — not casually, but deliberately. We share links and say "this one is worth your time." But saying it and actually watching it together are different things.

The `playlist-transcripts` repo already existed — a cron job pulling transcript data for 243 videos across 91 channels. The AI tooling already existed. What didn't exist was a workspace that made the signal accessible without a separate workflow for every person in the group.

So this became a reading room. You pick a video, the player loads inline, the analysis runs in the background, and the transcript is there if you want the exact words. The knowledge base holds notes alongside the video insights. Everything is organized by the same `videoId` key, so nothing ever gets lost.

It's private, it's opinionated, and it's built for exactly one use case: a small group of friends who take ideas seriously.

<div align="center">

### The video is the source. The analysis is the shortcut. The discussion is the point.

</div>

---

## Docs

- [System overview](./docs/architecture/system-overview.md)
- [Analysis runtime](./docs/architecture/analysis-runtime.md)
- [Worker topology](./docs/architecture/worker-topology.md)
- [Artifact schema](./docs/architecture/artifact-schema.md)
- [Provider runbook](./docs/operations/provider-runbook.md)

---

<div align="center">

**Built for the group. Kept private. Worth sharing the idea.**

</div>
