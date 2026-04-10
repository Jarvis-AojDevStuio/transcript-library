# Repo Audit Report

## Classification
**Detected framework:** data-pipeline-based (HIGH fit)
**Divergences:** Archive source-of-truth drift, duplicate video_id records in index, and tracked runtime virtualenv in repo.

## Health Score: 12/16 (12/16 passing)

### Failures (Must Fix)
| # | Check | Issue | Fix |
|---|---|---|---|
| 1 | no-duplicate-ids | 1 video_id groups have duplicate chunk numbers | Repair chunk metadata and deduplicate repeated ingests by video_id. |
| 2 | archive-sync-drift | Archive missing 92 playlist IDs | Regenerate .yt-dlp-archive.txt from live playlist IDs after successful fetch. |

### Warnings (Should Fix)
| # | Check | Issue | Fix |
|---|---|---|---|
| 1 | no-junk-root | Sensitive cookie file is tracked at repo root | Do not commit real cookies; use local untracked cookies file or secret mount path. |
| 2 | nonchunk-duplicate-ids | 9 video_id groups have duplicate non-chunk rows | Enforce one canonical non-chunk transcript per video_id. |

### Recommendations (Priority Order)
1. Make playlist IDs the canonical source each sync, with 3 retries, then hard-stop before archive mutation.
2. Repair duplicate `video_id` entries in `videos.csv` and enforce canonical dedupe in ingest/index stages.
3. Stop tracking `.venv/` in git; recreate venv on host to avoid broken interpreter symlink drift and deep tree noise.
4. Add a CI check that fails when archive is missing any current playlist IDs.
