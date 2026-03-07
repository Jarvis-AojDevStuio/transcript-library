---
name: HeadlessYouTubeAnalysis
description: Deterministic, non-interactive YouTube transcript analysis for Transcript Library.
---

# HeadlessYouTubeAnalysis

Purpose: produce a stable markdown analysis from an already-selected YouTube transcript without asking the user any follow-up questions.

## Operating mode

This workflow is strictly headless:
- No AskUserQuestion
- No interactive branching
- No repo browsing prompts
- No clarification requests
- No voice notifications
- No sub-agent orchestration

If metadata is missing, infer conservatively and continue.

## Inputs expected from the caller

- `videoId`
- `title`
- `channel`
- `topic`
- `publishedDate`
- `sourceUrl`
- `durationSeconds` when available
- `contentType`
- `analysisDepth` fixed to `standard`
- `description` when available
- `githubRepos` extracted from description when available
- full transcript text

## Output contract

Return markdown only.

Required structure:

```md
---
title: "..."
channel: "..."
topic: "..."
publishedDate: "..."
generatedAt: "..."
pattern: "headless-youtube-analysis"
contentType: "..."
analysisDepth: "standard"
sourceUrl: "..."
githubRepos:
  - "..."
---

## Summary

2-4 paragraphs.

## Key Takeaways

- 4-8 bullets

## Action Items

1. 3-6 concrete actions

## Supporting Details

### Ideas / Methods / Claims

### Tools / Repos / Resources Mentioned

### Who This Is For

### Risks, Gaps, or Caveats
```

## Content-type routing

Use the caller-provided `contentType`.

Interpretation guidelines:
- `tutorial`: emphasize steps, setup, tools, implementation sequence
- `finance`: emphasize theses, assumptions, catalysts, risk
- `sermon`: emphasize themes, scripture, applications
- `commentary`: emphasize claims, arguments, evidence, counterpoints
- `interview`: emphasize frameworks, memorable insights, operator lessons
- `case-study`: emphasize what happened, why it worked, transferable lessons
- `general`: default balanced synthesis

## GitHub repo handling

If `githubRepos` are present:
- mention them in `Tools / Repos / Resources Mentioned`
- infer likely relevance from title/description/transcript
- do not fabricate repository details you were not given

## Quality bar

- Be concise, specific, and operationally useful
- Prefer concrete claims from transcript over generic summaries
- Avoid filler, motivational language, and meta commentary
- Never ask the user what output depth they want; use standard depth
