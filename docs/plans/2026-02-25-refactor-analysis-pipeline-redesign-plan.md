---
title: "refactor: Analysis Pipeline Redesign — Fabric-First Architecture"
type: refactor
status: completed
date: 2026-02-25
brainstorm: docs/brainstorms/2026-02-25-analysis-pipeline-redesign-brainstorm.md
---

# refactor: Analysis Pipeline Redesign — Fabric-First Architecture

## Overview

Replace the `claude -p` subprocess analysis mechanism with a two-mode architecture that uses direct API calls (Anthropic SDK or Inference.ts) and a shared Fabric pattern as the single source of truth for transcript analysis. Restructure the `data/insights/` directory from opaque videoId paths to human-readable `{channel}/{date}_{slug}/` paths with a `catalog-map.json` for reverse lookup.

## Problem Statement / Motivation

The current mechanism spawns `claude -p` as a child process, which loads the entire PAI system (hooks, skills, Algorithm, voice curls) and runs a full 7-phase Algorithm execution for what should be a focused extraction task:

- **88+ minutes** for a single analysis (should be 30-90 seconds)
- No real progress visibility (process appears hung)
- Fragile timeout management (10-min ceiling with SIGTERM/SIGKILL escalation)
- Environment variable conflicts (`CLAUDECODE` nested session issue)
- Unpredictable behavior — subprocess runs its own Algorithm, ISC, etc.
- `data/insights/{videoId}/` is opaque and not human-navigable

## Proposed Solution

### Two-Mode Architecture

1. **Batch mode** — TypeScript script (`scripts/batch-analyze.ts`) that reads the catalog, finds videos missing insights, and processes them via direct API calls. Runs via cron or manual trigger. Sequential by default, with optional `--parallel N` in Phase 3.

2. **Real-time mode** — On-demand analysis triggered from the web UI. POST `/api/analyze?videoId=X` calls the Anthropic API directly (no subprocess), writes status.json for polling, and writes output to the new path structure.

### Shared Prompt Template

Both modes use the same prompt, defined in:

- **Canonical source:** `.claude/skills/TranscriptAnalyzer.md` (project-level skill, usable by Claude Code interactively)
- **Batch export:** `scripts/analysis-prompt.ts` (exports system prompt + user prompt template for programmatic use)

### Data Restructure

```
data/
├── insights/
│   └── {channel-name}/              # e.g., "IndyDevDan", "AI-Jason"
│       └── {date}_{slug}/           # e.g., "2026-02-23_the-pi-coding-agent"
│           ├── analysis.json        # Structured extraction (future)
│           ├── analysis.md          # Rich markdown
│           └── status.json          # Pipeline status
│
├── catalog-map.json                 # videoId → { channel, slug, date }
└── queue/                           # DELETED (stale, not used by new system)
```

## Open Questions — Resolved

### 1. Should we run `extract_wisdom` separately alongside our custom pattern?

**Decision: No.** Start with a single composite pattern (`analyze_transcript`) that incorporates the best of `extract_wisdom` (IDEAS, INSIGHTS, QUOTES, REFERENCES, RECOMMENDATIONS) plus custom additions (Key Arguments, Criticism, Action Items, One-Line Summary). Running two patterns doubles processing time for marginal benefit. Can revisit later if cross-referencing proves valuable.

### 2. Is Inference.ts fast enough for batch?

**Decision: Unknown — MUST VALIDATE FIRST.** Inference.ts may use `claude -p` under the hood, which would hit the same PAI overhead. Phase 0 includes a validation step:

- Run `Inference.ts --help` and read its source to determine if it shells to `claude -p`
- Test one video: `time echo "test" | bun Inference.ts --level standard`
- If Inference.ts is fast (< 2 min per video): use it for batch (zero additional cost)
- If Inference.ts hits PAI overhead: **fall back to `@anthropic-ai/sdk` directly** (Sonnet at ~$0.07/video)

### 3. Should the Fabric pattern live global or project-local?

**Decision: Project-local as canonical.** The pattern lives at `.claude/skills/TranscriptAnalyzer.md` (checked into the repo, portable, works on any machine). The batch script reads from a co-located `scripts/analysis-prompt.ts` that exports the same prompt content. No dependency on `~/.claude/` paths.

### 4. Do we want `--parallel N` for batch?

**Decision: Phase 3 enhancement.** Start sequential in Phase 2. Add `--parallel N` with a concurrency limiter (e.g., `p-limit`) in Phase 3 after the core pipeline is proven correct.

## Technical Approach

### Architecture

```
                    ┌─────────────────────────────────────┐
                    │  .claude/skills/TranscriptAnalyzer.md │
                    │  (Canonical prompt definition)        │
                    └──────────────┬──────────────────────┘
                                   │
                    ┌──────────────┴──────────────────────┐
                    │  scripts/analysis-prompt.ts           │
                    │  (Exports systemPrompt, userPrompt)   │
                    └──────┬────────────────────┬──────────┘
                           │                    │
              ┌────────────┴───┐     ┌──────────┴──────────┐
              │ Batch Mode     │     │ Real-Time Mode       │
              │ batch-analyze  │     │ /api/analyze route   │
              │ (CLI script)   │     │ (Next.js API route)  │
              └───────┬────────┘     └──────────┬───────────┘
                      │                         │
                      │    Anthropic SDK or      │
                      │    Inference.ts           │
                      │                         │
              ┌───────┴─────────────────────────┴───────────┐
              │  data/insights/{channel}/{date}_{slug}/      │
              │  ├── analysis.md                              │
              │  ├── status.json                              │
              │  └── analysis.json (future)                   │
              │                                               │
              │  data/catalog-map.json                        │
              └───────────────────────────────────────────────┘
```

### Key Technical Decisions

| Decision    | Choice                                               | Rationale                                             |
| ----------- | ---------------------------------------------------- | ----------------------------------------------------- |
| API client  | Anthropic SDK (fallback) or Inference.ts (preferred) | Inference.ts = zero cost if it avoids PAI overhead    |
| Model       | Sonnet (standard level)                              | Best quality-per-dollar per bakeoff results           |
| Progress    | Keep polling model (status.json + GET route)         | Already works; AnalysisPanel doesn't need rewrite     |
| Output      | Markdown only (Phase 1); add JSON in Phase 3         | Current UI reads .md via curateYouTubeAnalyzer()      |
| Concurrency | In-process counter (replace PID-based tracking)      | Simpler — no subprocess, no PID liveness checks       |
| Migration   | Copy-then-validate-then-delete, idempotent           | Safe; can run multiple times; no data loss on crash   |
| Slug        | Shared `slugify()` in `src/lib/slugify.ts`           | Both migration and batch must produce identical slugs |

### Implementation Phases

#### Phase 0: Validate Inference.ts (30 min)

**Goal:** Determine if Inference.ts avoids PAI overhead. This gates the entire approach.

**Tasks:**

- [x] Read `~/.claude/skills/PAI/Tools/Inference.ts` source — check if it calls `claude -p`
- [x] Run timing test: `time echo "Summarize this." | bun ~/.claude/skills/PAI/Tools/Inference.ts standard`
- [ ] If < 2 min: Inference.ts is viable for batch mode
- [x] If >= 2 min: Plan uses `@anthropic-ai/sdk` directly — run `bun add @anthropic-ai/sdk`

**Gate:** Phase 1 does not start until this is resolved.

#### Phase 1: Foundation — Shared Utilities + Path Resolution (1-2 hours)

**Goal:** Build the path resolution layer and slug utilities that all other phases depend on.

**Tasks:**

1. **Create `src/lib/slugify.ts`** — Shared slug generation
   - Lowercase, replace spaces/special chars with hyphens, strip non-alphanumeric (except hyphens), collapse consecutive hyphens, max 60 chars
   - Handle collision detection: if path exists, append `-2`, `-3`, etc.
   - Export: `slugify(title: string): string`

2. **Create `src/lib/catalog-map.ts`** — catalog-map.json reader/writer
   - Schema: `Record<string, { channel: string; slug: string; date: string }>`
   - `readCatalogMap(): CatalogMap` — reads `data/catalog-map.json`, returns empty object if missing
   - `writeCatalogMap(map: CatalogMap): void` — atomic write using existing `atomicWriteJson`
   - `addCatalogEntry(videoId, entry): void` — read-modify-write with file lock (or atomic swap)
   - `resolveInsightPath(videoId): string | null` — returns `{channel}/{date}_{slug}` or null
   - Type export: `CatalogMap`, `CatalogEntry`

3. **Update `src/lib/analysis.ts`** — New path resolution
   - Update `insightDir(videoId)` to check catalog-map.json first, fall back to `{videoId}/`
   - Update `statusPath(videoId)` and `analysisPath(videoId)` accordingly
   - Remove: `spawnAnalysis()`, `tryAcquireSlot()`, `incrementRunning()`, `decrementRunning()`, `isProcessAlive()`, PID liveness check, `MAX_CONCURRENT` global
   - Add: simple in-process concurrency counter (no PID tracking)
   - Simplify `StatusFile` type: remove `pid`, `stdoutBytes`, `stderrBytes`, `lastStderr`; keep `status`, `startedAt`, `completedAt`, `error`
   - Add: `isStaleRunning(status: StatusFile): boolean` — returns true if status is "running" and `startedAt` is > 15 minutes ago (server restart recovery)

4. **Update `src/lib/insights.ts`** — Support new path structure
   - Update `buildInsightSet()` to read `catalog-map.json` as primary source
   - Fall back to existing directory scan for unmigrated videoIds
   - Update `insightPaths()` to resolve via catalog-map
   - `readInsightMarkdown()` tries: catalog-map path → `{videoId}/analysis.md` → `{videoId}.md` (legacy)

**Acceptance Criteria:**

- [x] `slugify("The Pi Coding Agent — Claude Code Competitor")` → `the-pi-coding-agent-claude-code-competitor`
- [x] `resolveInsightPath("f8cfH5XX-XU")` returns null (no map entry yet) → falls back to `f8cfH5XX-XU/`
- [x] `hasInsight("f8cfH5XX-XU")` returns true for existing `data/insights/f8cfH5XX-XU/` directories
- [x] `readInsightMarkdown("f8cfH5XX-XU")` returns existing analysis markdown
- [x] `StatusFile` type no longer includes `pid`
- [x] Type check passes: `bunx tsc --noEmit`
- [x] Build passes: `bun run build`

#### Phase 2: Core Pipeline — API Route + Batch Script (2-3 hours)

**Goal:** Replace subprocess spawning with direct API calls in both real-time and batch modes.

**Tasks:**

1. **Create `.claude/skills/TranscriptAnalyzer.md`** — Project analysis skill
   - 10-section analysis template: Metadata, Executive Summary, Key Arguments, Notable Quotes, Key Insights, Action Items, References & Rabbit Holes, Related Topics, Criticism/Counterpoints, One-Line Summary
   - Section headings MUST match what `curateYouTubeAnalyzer()` parses (check `src/lib/curation.ts` heading regex)
   - Include instructions for both interactive use and batch extraction

2. **Create `scripts/analysis-prompt.ts`** — Exported prompt template
   - `export function systemPrompt(): string` — reads and returns the TranscriptAnalyzer skill content
   - `export function userPrompt(meta: AnalysisMeta, transcript: string): string` — builds the user message with video metadata + transcript
   - `export const OUTPUT_SECTIONS` — array of expected section headings (for validation)

3. **Rewrite `src/app/api/analyze/route.ts`** — Direct API call
   - Remove `spawnAnalysis()` import and call
   - Add: import `@anthropic-ai/sdk` (or Inference.ts wrapper)
   - POST handler: validate videoId → check not already running → acquire slot → call API → write status.json → write analysis.md → release slot
   - Use `async/await` with try/catch — no subprocess, no PID
   - Write `status: "running"` at start, update to `"complete"` or `"failed"` at end
   - Write to new `{channel}/{date}_{slug}/` path via `catalog-map.ts`
   - Return `{ ok: true, status: "running" }` immediately (keep existing contract)

4. **Update `src/app/api/analyze/status/route.ts`** — Simplified status
   - Remove PID liveness check (`isProcessAlive`)
   - Add stale "running" detection: if `startedAt` > 15 min ago and still "running", mark as failed
   - Keep same response shape for backward compatibility with AnalysisPanel

5. **Create `scripts/batch-analyze.ts`** — Batch pipeline
   - Replaces `nightly-insights.ts`
   - CLI args: `--limit N` (default 20), `--video {id}` (single video), `--dry-run`, `--channel {name}`
   - Process: read catalog → find videos without insights → for each: read transcript → build prompt → call API → write output
   - Write both to new path structure and catalog-map.json
   - Progress logging: `[1/20] IndyDevDan / the-pi-coding-agent ... 45s ... done`
   - Summary at end: processed, failed, skipped

6. **Update `src/components/AnalysisPanel.tsx`** — Simplify
   - Remove PID-related error messages
   - Remove `stdoutBytes` / `stderrBytes` display (no longer tracked)
   - Keep polling loop and backoff logic (proven pattern)
   - Add: 15-minute timeout (matches server-side stale detection)

**Acceptance Criteria:**

- [x] POST `/api/analyze?videoId=X` triggers analysis without subprocess
- [x] Analysis completes in < 2 minutes (not 88 minutes)
- [x] `status.json` written with simplified schema (no `pid`, no `stdoutBytes`)
- [x] GET `/api/analyze/status?videoId=X` returns correct status
- [x] `batch-analyze.ts --video f8cfH5XX-XU` processes one video successfully
- [x] `batch-analyze.ts --dry-run --limit 5` lists 5 videos without processing
- [x] Output markdown is parseable by `curateYouTubeAnalyzer()` (section headings match)
- [x] AnalysisPanel shows spinner, completes, refreshes page on done
- [x] Build passes: `bun run build`
- [x] Type check passes: `bunx tsc --noEmit`

#### Phase 3: Data Migration + Cleanup (1-2 hours)

**Goal:** Migrate existing insights to new path structure and clean up old artifacts.

**Tasks:**

1. **Create `scripts/migrate-insights.ts`** — Migration script
   - Reads all `data/insights/{videoId}/` directories
   - For each videoId: look up channel + date in catalog (videos.csv)
   - Derive slug from title using shared `slugify()`
   - Copy `analysis.md` and `status.json` to `data/insights/{channel}/{date}_{slug}/`
   - Add entry to `catalog-map.json`
   - Validate: read new path, confirm file exists and is non-empty
   - Delete old directory only after successful validation
   - Handle edge cases: videoId not in catalog (skip with warning), channel name with special chars
   - Idempotent: skip if new path already exists and matches
   - CLI args: `--dry-run`, `--keep-old` (copy without delete)

2. **Migrate legacy flat files**
   - `data/insights/{videoId}.md` → copy to new structure
   - These predate the directory-per-video pattern

3. **Clean up old queue**
   - Delete `data/queue/` directory and contents
   - Remove `data/queue/failed/` subdirectory

4. **Delete deprecated files**
   - `scripts/nightly-insights.ts` — replaced by `batch-analyze.ts`
   - `scripts/analysis-worker.sh` — if it exists (may already be deleted)

5. **Update `package.json` scripts**
   - Remove/update any scripts referencing `nightly-insights.ts`
   - Add: `"analyze": "bun scripts/batch-analyze.ts"` (convenience alias)
   - Add: `"migrate-insights": "bun scripts/migrate-insights.ts"` (one-time use)

**Acceptance Criteria:**

- [x] All existing insights accessible at new paths via `readInsightMarkdown(videoId)`
- [x] `catalog-map.json` contains entries for all migrated videos
- [x] `hasInsight(videoId)` returns true for all previously analyzed videos
- [x] Old `data/insights/{videoId}/` directories removed (unless `--keep-old`)
- [x] `data/queue/` directory deleted
- [x] `scripts/nightly-insights.ts` deleted
- [x] No references to deleted files in codebase (`grep -r "nightly-insights" src/`)
- [x] Build passes: `bun run build`

#### Phase 4: Polish + Enhancements (optional, 1-2 hours)

**Goal:** Add structured JSON output, parallel batch processing, and Desktop Commander integration.

**Tasks:**

- [ ] Add `analysis.json` output alongside `.md` in batch and real-time modes
- [ ] Add `--parallel N` option to `batch-analyze.ts` with `p-limit` concurrency
- [ ] Document Desktop Commander integration (git submodule + skill usage)
- [ ] Add `--channel {name}` filter to `batch-analyze.ts`
- [ ] Consider: Update `curateYouTubeAnalyzer()` to read from `.json` instead of parsing `.md`

## File Change Manifest

### Files to CREATE

| File                                   | Purpose                                                |
| -------------------------------------- | ------------------------------------------------------ |
| `src/lib/slugify.ts`                   | Shared slug generation function                        |
| `src/lib/catalog-map.ts`               | catalog-map.json reader/writer/resolver                |
| `.claude/skills/TranscriptAnalyzer.md` | Canonical analysis prompt (project skill)              |
| `scripts/analysis-prompt.ts`           | Exported prompt template for batch/API use             |
| `scripts/batch-analyze.ts`             | Batch analysis pipeline (replaces nightly-insights.ts) |
| `scripts/migrate-insights.ts`          | One-time data migration script                         |
| `data/catalog-map.json`                | videoId → channel/slug mapping (generated)             |

### Files to EDIT

| File                                  | Changes                                                                                                     |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `src/lib/analysis.ts`                 | Remove subprocess logic; add path resolution via catalog-map; simplify StatusFile type; add stale detection |
| `src/lib/insights.ts`                 | Update `buildInsightSet()` and `readInsightMarkdown()` for new paths; consult catalog-map.json              |
| `src/app/api/analyze/route.ts`        | Replace `spawnAnalysis()` with direct API call                                                              |
| `src/app/api/analyze/status/route.ts` | Remove PID check; add stale "running" detection                                                             |
| `src/components/AnalysisPanel.tsx`    | Remove PID-related UI; add 15-min timeout                                                                   |
| `package.json`                        | Add `@anthropic-ai/sdk` (if needed); add `"analyze"` script; update/remove nightly script                   |

### Files to DELETE

| File                                   | Reason                                                   |
| -------------------------------------- | -------------------------------------------------------- |
| `scripts/nightly-insights.ts`          | Replaced by `batch-analyze.ts`                           |
| `scripts/analysis-worker.sh`           | Part of old subprocess architecture (if exists)          |
| `data/queue/`                          | Old job queue, not used by new system                    |
| `data/insights/{videoId}/` directories | Migrated to `{channel}/{date}_{slug}/` (after migration) |

## Data Migration Strategy

### Approach: Copy-Validate-Delete (Idempotent)

```
For each data/insights/{videoId}/ directory:
  1. Look up videoId in catalog (videos.csv)
     → If not found: log warning, skip
  2. Derive: channel = catalog.channel, date = catalog.publishedDate, slug = slugify(catalog.title)
  3. Target = data/insights/{channel}/{date}_{slug}/
  4. If target already exists and has analysis.md: skip (already migrated)
  5. Copy analysis.md + status.json to target
  6. Add entry to catalog-map.json: { videoId: { channel, slug, date } }
  7. Validate: read target/analysis.md, confirm non-empty
  8. Delete source directory (data/insights/{videoId}/)
```

### Slug Algorithm

```typescript
function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .replace(/[^a-z0-9\s-]/g, "") // strip non-alphanumeric
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/-+/g, "-") // collapse hyphens
    .replace(/^-|-$/g, "") // trim leading/trailing
    .slice(0, 60); // max length
}
```

### Collision Handling

If `data/insights/{channel}/{date}_{slug}/` already exists for a DIFFERENT videoId:

- Append `-2`, `-3`, etc. until unique
- Log the collision for review

### catalog-map.json Schema

```typescript
type CatalogEntry = {
  channel: string; // Filesystem-safe channel name
  slug: string; // slugify(title)
  date: string; // YYYY-MM-DD from publishedDate
};

type CatalogMap = Record<string, CatalogEntry>; // key = videoId
```

### Channel Name Sanitization

Channel names may contain spaces and special characters (e.g., "AI Jason"). For filesystem paths:

- Replace spaces with hyphens: `"AI Jason"` → `"AI-Jason"`
- Same `slugify()` function but with capitalize preservation option, or a separate `channelSlug()` that preserves casing but replaces unsafe chars

### Backward Compatibility During Transition

The `readInsightMarkdown()` function supports three fallback paths:

1. **New:** `data/insights/{channel}/{date}_{slug}/analysis.md` (via catalog-map.json lookup)
2. **Current:** `data/insights/{videoId}/analysis.md` (directory per video)
3. **Legacy:** `data/insights/{videoId}.md` (flat file)

This means the app works correctly before, during, and after migration. No maintenance window needed.

## UI Backward Compatibility

### What stays the same

- `AnalysisPanel.tsx` polling loop (setTimeout + backoff)
- Status endpoint contract (`GET /api/analyze/status?videoId=X` → `StatusResponse`)
- `curateYouTubeAnalyzer()` markdown parsing (output headings must match)
- "Run analysis" / "Retry analysis" button behavior
- `router.refresh()` on completion

### What changes

- Status response no longer includes `stdoutBytes`, `stderrBytes`, `lastStderr` (AnalysisPanel already handles these being undefined)
- 15-minute client-side timeout replaces 11-minute PID-based timeout
- Error messages simplified (no PID or stderr references)

### What's removed

- PID liveness checking in status route
- `process.kill(pid, 0)` calls
- Global `__analysisRunningCount` with PID-based recovery on restart

## Risk Analysis & Mitigation

| Risk                                       | Impact                   | Mitigation                                                   |
| ------------------------------------------ | ------------------------ | ------------------------------------------------------------ |
| Inference.ts uses `claude -p` internally   | Entire approach negated  | Phase 0 validation gate; fallback to Anthropic SDK           |
| Slug collisions between videos             | Data overwrite           | Collision detection with `-2`, `-3` suffix                   |
| catalog-map.json corruption                | All insights unreachable | Atomic writes; fallback to videoId directory scan            |
| Migration crash mid-way                    | Split-brain data         | Copy-first (old stays until validated); idempotent reruns    |
| Anthropic API rate limits during batch     | Batch fails partway      | Sequential processing; exponential backoff; resume from last |
| `curateYouTubeAnalyzer()` heading mismatch | UI shows raw markdown    | Match section headings exactly; add integration test         |
| Channel name filesystem issues             | Path creation fails      | Sanitize channel names through same slug pipeline            |

## Dependencies & Prerequisites

- **Anthropic API key** in environment (if using SDK directly): `ANTHROPIC_API_KEY`
- **Inference.ts** availability and behavior (Phase 0 validation)
- **videos.csv** in transcript repo must have channel + date metadata for all videos to migrate
- **No active analyses running** when migration script runs (not strictly required due to idempotency, but recommended)

## Success Metrics

| Metric                            | Current               | Target                                  |
| --------------------------------- | --------------------- | --------------------------------------- |
| Analysis time per video           | 88+ minutes           | < 2 minutes                             |
| Cost per analysis                 | $0 (but PAI overhead) | $0 (Inference.ts) or $0.07 (Sonnet SDK) |
| Data directory navigability       | Opaque videoIds       | Human-readable channel/slug paths       |
| Batch processing reliability      | Fragile (PID/timeout) | Robust (direct API, no subprocess)      |
| UI responsiveness during analysis | Appears hung          | Real-time progress via polling          |

## References & Research

### Internal References

- Brainstorm: `docs/brainstorms/2026-02-25-analysis-pipeline-redesign-brainstorm.md`
- Prior plan: `docs/plans/2026-02-22-feat-fix-analysis-pipeline-inline-execution-plan.md`
- Prior brainstorm: `docs/brainstorms/2026-02-22-analysis-pipeline-fix-brainstorm.md`
- Current spawn logic: `src/lib/analysis.ts:167-328`
- Insight reader: `src/lib/insights.ts:60-85`
- Curation parser: `src/lib/curation.ts` (heading regex for section extraction)
- Status API: `src/app/api/analyze/status/route.ts`
- UI component: `src/components/AnalysisPanel.tsx`
- Batch script: `scripts/nightly-insights.ts`

### Bakeoff Results (from brainstorm)

| Model  | Duration | Quality        | Cost/video |
| ------ | -------- | -------------- | ---------- |
| Opus   | 100s     | Best prose     | ~$0.35     |
| Sonnet | 116s     | Best structure | ~$0.07     |
| Haiku  | 53s      | 90%+ quality   | ~$0.02     |
