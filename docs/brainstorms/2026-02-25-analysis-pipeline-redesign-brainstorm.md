---
date: 2026-02-25
topic: analysis-pipeline-redesign
---

# Analysis Pipeline Redesign

## What We're Building

Replace the current `claude -p` subprocess analysis mechanism with a two-mode architecture:

1. **Batch mode** — Nightly Anthropic API-direct pipeline that processes all videos missing insights. Fast, headless, no Claude Code overhead. Runs via cron or manual trigger.

2. **Real-time mode** — On-demand analysis triggered from Desktop Commander (which has transcript-library as a git submodule). Uses the same analysis skill but runs interactively.

Both modes share a single **project-level analysis skill** (`.claude/skills/`) that defines the exact analysis template, output format, and extraction logic. This is the single source of truth for "how we analyze a transcript."

## Why This Approach

### The Problem

The current mechanism spawns `claude -p` as a child process. This loads the entire PAI system (hooks, skills, Algorithm, voice curls) and runs a full 7-phase Algorithm execution for what should be a focused extraction task. Results:

- 88+ minutes for a single analysis (should be 30-90 seconds)
- No real progress visibility (process appears hung)
- Fragile timeout management
- Environment variable conflicts (CLAUDECODE nested session issue)
- Unpredictable behavior — the subprocess runs its own Algorithm, ISC, etc.

### The Solution

- **Batch:** Call Anthropic API directly from a TypeScript script. No subprocess. Streaming. Predictable 30-90s per video.
- **Real-time:** Claude Code reads the project skill and executes it. The skill defines exactly what to extract and how to format it — no freestyle Algorithm execution.
- **Shared skill:** `.claude/skills/TranscriptAnalyzer.md` defines the analysis template. Both modes reference this for consistent output.

## Architecture

### Data Flow

```
Transcript Repo (playlist-transcripts/)
  └── youtube-transcripts/topics/{topic}/{channel}/{date}_{slug}_part-{N}.md
       │
       ├── Batch Mode (nightly API pipeline)
       │     scripts/batch-analyze.ts
       │     → reads catalog → reads transcripts → calls Anthropic API
       │     → writes data/insights/{videoId}/analysis.md
       │     → writes data/insights/{videoId}/analysis.json (structured)
       │
       └── Real-time Mode (Desktop Commander → Claude Code)
             .claude/skills/TranscriptAnalyzer.md
             → triggered from Desktop Commander or transcript-library
             → reads transcript → produces analysis using skill template
             → writes to same data/insights/{videoId}/ location
```

### Data Mapping Structure

**Current (bad):** `data/insights/f8cfH5XX-XU/` — opaque video IDs, not human-navigable.

**New:** Organize by channel name, mirroring the transcript repo structure:

```
data/
├── insights/
│   └── {channel-name}/
│       └── {date}_{slug}/
│           ├── analysis.json     # Structured extraction (quotes, insights, etc.)
│           ├── analysis.md       # Rich markdown rendered from JSON
│           └── status.json       # Pipeline status tracking
│
│   Examples:
│   ├── IndyDevDan/
│   │   └── 2026-02-23_the-pi-coding-agent/
│   │       ├── analysis.md
│   │       └── analysis.json
│   ├── AI Jason/
│   │   └── 2026-02-20_building-agents-from-scratch/
│   │       └── ...
│   └── NetworkChuck/
│       └── ...
│
├── queue/                    # Batch job queue (existing — to be purged)
│   └── {jobId}.json
│
└── catalog-map.json          # videoId → channel/slug mapping
                              # So code can resolve videoId to human-readable path
```

**Migration:** Existing `data/insights/{videoId}/` directories need to be migrated to `data/insights/{channel}/{date}_{slug}/`. The catalog already has channel and date metadata to drive this.

**Lookup:** The app uses videoId internally, so `catalog-map.json` provides the reverse lookup: `videoId → channel/slug path`. This keeps URLs stable while making the filesystem browsable.

### Components

**1. Project Skill: `.claude/skills/TranscriptAnalyzer.md`**

- Defines the analysis template with all desired sections
- Sections: Executive Summary, Key Arguments, Notable Quotes, Action Items, References & Rabbit Holes, Related Topics, Metadata
- Usable by Claude Code interactively (real-time mode)
- The prompt template is also extracted and used by the batch script

**2. Shared Prompt Template: `scripts/analysis-prompt.ts`**

- Exports the system prompt and user prompt template
- Used by batch-analyze.ts for API calls
- Derived from / kept in sync with the skill file
- Defines the structured JSON output schema

**3. Batch Pipeline: `scripts/batch-analyze.ts`**

- Replaces nightly-insights.ts + analysis-worker.sh
- Uses `@anthropic-ai/sdk` directly
- Streaming responses for progress visibility
- Processes queue sequentially (or parallel with concurrency limit)
- Writes both .json (structured) and .md (rendered) output
- Configurable: `--limit N`, `--video {id}`, `--dry-run`

**4. Real-time API Route: `src/app/api/analyze/route.ts`**

- Replaces subprocess spawning with direct API call
- Streaming: SSE or chunked response for real-time UI progress
- Falls back gracefully if API key not set

**5. Desktop Commander Integration**

- transcript-library added as git submodule
- Desktop Commander can trigger analysis via the project skill
- Reads from the same data/insights/ directory

## Key Decisions

- **API over subprocess:** Direct Anthropic API eliminates all the overhead of loading PAI, running the Algorithm, managing PIDs, and timeout fragility.
- **Git submodule:** Transcript-library is a submodule in Desktop Commander, keeping repos independent but linked.
- **Skill as source of truth:** `.claude/skills/TranscriptAnalyzer.md` is the canonical definition of what an analysis looks like. Batch mode extracts its logic.
- **Dual output (JSON + MD):** JSON enables re-rendering, programmatic access, and future UI features. MD is the human-readable output.
- **Keep status.json pattern:** The status tracking mechanism works well for the UI — just remove the PID/process complexity.

## Output Sections (Richer Format)

Based on user preference for richer analysis:

1. **Metadata** — videoId, title, channel, topic, date, duration, word count
2. **Executive Summary** — 2-3 paragraph synthesis
3. **Key Arguments / Proposals** — What the video is arguing for
4. **Notable Quotes** — Direct quotes with approximate timestamps
5. **Key Insights** — Bulleted takeaways
6. **Action Items** — Things the viewer could do based on the content
7. **References & Rabbit Holes** — Tools, papers, people mentioned
8. **Related Topics** — Tags and connections to other videos/topics
9. **Criticism / Counterpoints** — Where the arguments are weak
10. **One-Line Summary** — For list views and search

## Bakeoff Results (2026-02-25)

Ran the same 10-section analysis on video f8cfH5XX-XU (~11K words, 3 parts) across 3 models:

| Metric        | Opus              | Sonnet                           | Haiku                      |
| ------------- | ----------------- | -------------------------------- | -------------------------- |
| Duration      | 100s              | 116s                             | 53s                        |
| Output lines  | 124               | 145                              | 212                        |
| Est. API cost | ~$0.35            | ~$0.07                           | ~$0.02                     |
| Quality       | Best prose polish | Best structure + insight framing | 90%+ quality, most content |

**Verdict:** Sonnet is the sweet spot for quality-per-dollar. Haiku is surprisingly competitive. All three are production-quality.

## Revised Architecture: Fabric-First (v2)

### Why Fabric Changes Everything

The original v1 brainstorm assumed we'd build a custom prompt and call the Anthropic API directly. But we already have:

1. **240+ Fabric patterns** — optimized extraction prompts, including `extract_wisdom` which covers ~70% of our desired output (IDEAS, INSIGHTS, QUOTES, REFERENCES, RECOMMENDATIONS, FACTS, HABITS)
2. **PAI Inference.ts** — model routing tool (`--level fast|standard|smart`) that uses **subscription billing**, not per-token API costs
3. **Native Fabric execution** — PAI reads `system.md` from any pattern and applies it directly — no CLI dependency

### Architecture: Fabric Pattern + Inference.ts

```
Transcript Repo (playlist-transcripts/)
  └── youtube-transcripts/topics/{topic}/{channel}/{date}_{slug}_part-{N}.md
       │
       ├── Batch Mode (Inference.ts + Fabric pattern)
       │     scripts/batch-analyze.ts
       │     → reads catalog → reads transcripts
       │     → pipes through: bun Inference.ts --level standard \
       │         "$(cat Patterns/analyze_transcript/system.md)" \
       │         "$(cat transcript.md)"
       │     → writes data/insights/{videoId}/analysis.md
       │
       ├── Real-time Mode (Native in Claude Code)
       │     Read Patterns/analyze_transcript/system.md
       │     Apply to transcript directly in session
       │     → Zero cost, Opus quality
       │
       └── Desktop Commander Mode (via git submodule)
             Same pattern, triggered interactively
```

### Cost Comparison: API vs Inference.ts

| Approach                        | Per Video   | 120-Video Batch      | Monthly (20 new) |
| ------------------------------- | ----------- | -------------------- | ---------------- |
| Anthropic API (Sonnet)          | $0.07       | $8.40                | $1.40            |
| Anthropic API (Haiku)           | $0.02       | $2.40                | $0.40            |
| **Inference.ts (subscription)** | **$0.00\*** | **$0.00\***          | **$0.00\***      |
| Native in Claude Code           | $0.00\*     | N/A (not batch-able) | $0.00\*          |

\*Included in existing Claude Max/Pro subscription

### The Fabric Pattern: `analyze_transcript/system.md`

New composite pattern combining:

- `extract_wisdom` structure (IDEAS, INSIGHTS, QUOTES, REFERENCES, RECOMMENDATIONS)
- `youtube_summary` approach (structured, timestamped)
- Custom additions: Metadata table, Key Arguments, Criticism/Counterpoints, Action Items, One-Line Summary

Lives at: `~/.claude/skills/Fabric/Patterns/analyze_transcript/system.md`
Also symlinked/copied to: `.claude/skills/TranscriptAnalyzer.md` (project-level)

### What Gets Deleted

- `src/lib/analysis.ts` spawn logic (the `claude -p` mechanism)
- `scripts/analysis-worker.sh`
- `scripts/nightly-insights.ts` (replaced by simpler batch-analyze.ts)
- PID tracking, timeout management, CLAUDECODE env stripping
- The entire subprocess-based architecture

### What Gets Created

1. **Fabric pattern:** `~/.claude/skills/Fabric/Patterns/analyze_transcript/system.md`
2. **Batch script:** `scripts/batch-analyze.ts` — simple loop: read transcript → Inference.ts → write output
3. **Simplified API route:** `src/app/api/analyze/route.ts` — calls Inference.ts, no subprocess
4. **Simplified status:** No PID tracking — just "idle", "running", "complete", "failed"

## Resolved Questions

- **Model for batch:** Sonnet via Inference.ts (standard level). Zero additional cost.
- **Desktop Commander discovery:** Git submodule + catalog-map.json for navigation.
- **Prompt versioning:** The Fabric pattern file IS the version. Git tracks changes.
- **Queue cleanup:** Yes, purge stale queue files. New system doesn't use them.

## Open Questions (Remaining)

- Should we also run `extract_wisdom` separately alongside our custom pattern for cross-referencing?
- Is Inference.ts fast enough for batch (uses `claude -p` under the hood — does it hit the same PAI overhead)?
- Should the Fabric pattern live in the global patterns dir or project-local only?
- Do we want a `--parallel N` option on batch-analyze.ts for concurrent Inference.ts calls?

## Next Steps

→ Create the `analyze_transcript` Fabric pattern
→ Test with Inference.ts on one video to validate speed
→ Build the simplified batch-analyze.ts
→ Simplify the API route and AnalysisPanel
→ `/workflows:plan` for full implementation task breakdown
