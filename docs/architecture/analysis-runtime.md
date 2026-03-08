# Analysis Runtime

## Goal

Run YouTube transcript analysis headlessly without interactive skill prompts for a private internal tool used by a small trusted group.

## Design

### 1. Deterministic local contract
The analysis prompt is built from a repo-local skill file:
- `.claude/skills/HeadlessYouTubeAnalysis/SKILL.md`

This avoids dependence on the external interactive `YouTubeAnalyzer` skill.

### 2. Metadata enrichment
Before spawning Claude, the server resolves:
- `videoId`
- `title`
- `channel`
- `topic`
- `publishedDate`
- `sourceUrl`
- `durationSeconds`
- `description`
- `githubRepos`
- `contentType`
- `analysisDepth=standard`

Sources, in order:
1. transcript frontmatter
2. transcript repo `youtube-transcripts/inbox/<videoId>.info.json`
3. `yt-dlp --dump-single-json`
4. fallback defaults

### 3. Caching
Resolved video metadata is cached per insight directory:
- `data/insights/<videoId>/video-metadata.json`

The cache is schema-versioned so heuristic improvements invalidate stale metadata automatically.

### 4. Runtime output
Each run writes:
- `status.json`
- `run.json`
- `worker-stdout.txt`
- `worker-stderr.txt`
- `analysis.md`
- `<slugified-video-title>.md`

Runtime observability is exposed through:
- `GET /api/insight`
- `GET /api/insight/stream` (SSE status and log tail events)

### 5. Stable lookup model
The application still keys everything by `videoId`.
Human-readable filenames are additive, not the lookup key.

## Why the folder stays keyed by videoId

Video titles are mutable and non-unique.
`videoId` is stable and safe for API lookups, routing, and deduplication.

### 6. Output rendering

Analysis markdown is rendered in the video detail page UI:
- **Curated sections** (Summary, Key Takeaways, Action Items) are extracted by `src/lib/curation.ts` and rendered as styled cards
- **Full Analysis Report** is rendered by `src/components/Markdown.tsx` using `react-markdown` + `remark-gfm` + `rehype-highlight`
- The Markdown component strips outer code fences defensively (legacy outputs wrapped in ` ```md ``` `)
- The Full Analysis Report is collapsed by default; users expand via toggle
- Transcript parts are collapsed by default with per-part expand/collapse

The SKILL.md output contract instructs the LLM to emit clean markdown (no code fences) with GFM formatting, knowing the output renders directly in a web markdown viewer.

## Future work
- add queue-backed worker execution
- add retry policy and stale-job recovery
- add channel-specific content-type overrides
- keep splitting provider execution from worker orchestration as the runtime grows
