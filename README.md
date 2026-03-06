# Transcript Library

Browse-first library for playlist transcripts + curated insights.

## What’s here

- UI: `apps/transcript-library` (Next.js)
- Transcript index + source files: `playlist-transcripts/`
- Insights output: `data/insights/<videoId>/analysis.md`
- Planning: `docs/ops/plans/PRD.md`

## Dev

### Getting started

```bash
cp .env.example .env.local   # set PLAYLIST_TRANSCRIPTS_REPO
bun install
bun run dev -- --port 3939
```

Open: http://127.0.0.1:3939

### Commands

```bash
bun run dev        # Start dev server
bun run build      # Production build
bun run lint       # ESLint
bunx tsc --noEmit   # Type check
bunx prettier --check .  # Format check
```

### Environment variables

| Variable                    | Purpose                           | Default              |
| --------------------------- | --------------------------------- | -------------------- |
| `PLAYLIST_TRANSCRIPTS_REPO` | Path to playlist-transcripts repo | (hardcoded fallback) |

## Plan / PRD

See `docs/ops/plans/PRD.md`.
