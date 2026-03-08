# Transcript Library — PRD (v0)

## What this is

A browse-first, local-first library for YouTube playlist transcripts with _fast recall_ and _curated insights_.

You should be able to:

- land on a channel/topic,
- see what’s worth watching,
- open a video page,
- get a clean curated summary + takeaways + action items,
- and still access the raw transcript and full report when needed.

## Non-goals (for v0)

- Multi-user auth
- Cloud hosting
- Complex search relevance ranking
- Perfect markdown/metadata fidelity (we’ll be tasteful + pragmatic)

## Data model (current)

- Transcript index: `playlist-transcripts/youtube-transcripts/index/videos.csv`
- Raw transcript chunks: `playlist-transcripts/youtube-transcripts/...`
- Insights output:
  - canonical: `apps/transcript-library/data/insights/<videoId>/analysis.md`
  - artifacts: `transcript-combined.md`, `claude-stdout.txt`, `claude-stderr.txt`

## UX principles

- Editorial, not dashboardy.
- The list view should answer: “what should I read next?”
- The video page should answer: “what’s the point + what do I do with it?”
- Raw material is always there, but never the default view.

## Pages

- **Home:** channels (newest-first)
- **Channel:** video cards w/ insight badge + preview
- **Video:** curated sections + raw report (collapsible) + transcript parts

## Analysis pipeline

- Trigger: `POST /api/analyze?videoId=...`
- Worker: `apps/transcript-library/scripts/analysis-worker.sh`
- LLM: `claude -p` using `/YouTubeAnalyzer` prompt

## Convex

Not integrated yet.

### Why not yet

We’re still stabilizing the ingestion + curation schema; Convex is best once we know:

- what we’re storing (curated JSON fields),
- how we query it (search, filters),
- and what needs recomputation.

### When we add it

Phase 2:

- store `videos`, `insights`, and `runs` in Convex
- enable full-text-ish search over curated fields
- add “inbox” + “reviewed” workflows

## Milestones

- **M0 (now):** gorgeous browsing + stable insight rendering
- **M1:** curated JSON alongside markdown + channel-level badges/previews
- **M2:** import your `knowledge/` hand-written insights and unify display
- **M3:** Convex + search + tags + workflow states
