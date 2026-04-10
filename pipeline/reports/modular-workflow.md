# Modular Workflow Plan (RepoArchitect)

## 1) AuditRepo (completed)

Current classification:
- Primary: `data-pipeline-based` (HIGH fit)
- Secondary: `index-first` (already present through `youtube-transcripts/index/`)

Health result:
- Score: `12/16`
- Fails:
  - `archive-sync-drift`: archive missing playlist IDs
  - `no-duplicate-ids`: duplicate chunk numbers for one video_id group
- Warnings:
  - sensitive cookies file tracked in repo root
  - non-chunk duplicate video_id groups

## 2) RefactorPlan (target modular structure)

Goal: keep current behavior, but move to clear module boundaries so sync, archive, ingest, index, and QA do not drift.

### Recommended target (hybrid)
- Keep **Data Pipeline** flow (`playlist -> archive -> download -> ingest -> index -> summary`)
- Add **Module boundaries** by capability inside `youtube-transcripts/modules/`

### Target tree

```text
youtube-transcripts/
  modules/
    playlist_source/
      index.py              # fetch playlist IDs (with retries)
      providers/
        yt_dlp.py
    archive_state/
      index.py              # read/write archive, diff sets, atomic write
    ingest/
      index.py              # ingest orchestration
      clean_vtt.py
      metadata.py
      chunking.py
    classify/
      index.py
    indexing/
      index.py              # build videos/channels/topics indexes
    summary/
      index.py
    qa/
      index.py              # repo health checks
    sync/
      index.py              # pipeline orchestrator for one full run
  scripts/
    sync.py                 # thin CLI wrapper calling modules/sync
```

### Rules
- External callers import only module entrypoints (`modules/<capability>/index.py`)
- No deep imports across capability internals
- Archive updates happen only after successful playlist fetch
- Archive source of truth is playlist IDs, not existing index

## 3) Move Map (Wrap first, rewrite later)

| # | Current Path | Target Path | Category | Notes |
|---|---|---|---|---|
| 1 | `sync_playlist.sh` | keep + call `youtube-transcripts/scripts/sync.py` | orchestration | shell stays as scheduler entrypoint |
| 2 | `youtube-transcripts/scripts/ingest_transcript.py` | `youtube-transcripts/modules/ingest/*` | module extraction | split cleaner, metadata, chunking |
| 3 | `youtube-transcripts/scripts/classify_topic.py` | `youtube-transcripts/modules/classify/index.py` | module extraction | keep behavior, wrap first |
| 4 | `youtube-transcripts/scripts/build_index.py` | `youtube-transcripts/modules/indexing/index.py` | module extraction | keep CSV schema unchanged |
| 5 | `youtube-transcripts/scripts/build_summary.py` | `youtube-transcripts/modules/summary/index.py` | module extraction | no behavior change in phase 1 |
| 6 | archive logic in `sync_playlist.sh` | `youtube-transcripts/modules/archive_state/index.py` | bug fix boundary | owns archive rebuild from playlist IDs |
| 7 | playlist fetch in `yt-dlp` shell call | `youtube-transcripts/modules/playlist_source/providers/yt_dlp.py` | bug fix boundary | enforce 3 retries |
| 8 | `youtube-transcripts/scripts/run_repo_checks.py` | `youtube-transcripts/modules/qa/index.py` | module extraction | keep current checks + archive drift check |

## 4) Execution Phases

### Phase 1: Stabilize archive sync (highest priority)
- Add playlist fetch with 3 retries
- If all retries fail: stop run, do not mutate archive
- If success: rebuild archive from playlist IDs only

Verification:
- `playlist_ids == archive_ids` after sync
- no accidental archive truncation on failed fetch

### Phase 2: Wrap capabilities into modules
- Create module entrypoints
- Move existing logic behind wrappers, no logic rewrite yet

Verification:
- one full sync run output matches current output
- generated files and indexes remain compatible

### Phase 3: Deduplicate index/video_id logic
- fix duplicate chunk numbering issue
- enforce one canonical non-chunk transcript per `video_id`

Verification:
- `run_repo_checks.py` no FAIL
- duplicate warnings reduced to zero (or documented expected chunk cases)

### Phase 4: CI guardrails
- add check for archive drift (`playlist - archive == 0`)
- keep existing health checks in CI

Verification:
- CI fails on archive mismatch before merge

## 5) Workflow order to run now

1. `AuditRepo` (done)
2. `RefactorPlan` (this document)
3. `ExecuteRefactor` (implement in a worktree branch)

