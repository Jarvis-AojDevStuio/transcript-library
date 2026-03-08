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

Return clean markdown. Your output is rendered directly by a web UI using react-markdown with remark-gfm and rehype-highlight — so use GFM features (bold, tables, lists, inline code) freely, knowing they render beautifully. Never wrap your output in code fences (no ` ``` ` blocks around the whole document). The output must start directly with the YAML frontmatter `---` delimiter.

### Frontmatter (required)

Start your output with exactly this YAML frontmatter block:

    ---
    title: "..."
    channel: "..."
    topic: "..."
    publishedDate: "..."
    generatedAt: "YYYY-MM-DD"
    pattern: "headless-youtube-analysis"
    contentType: "..."
    analysisDepth: "standard"
    sourceUrl: "..."
    githubRepos:
      - "..."
    ---

### Sections (required, in this order)

**## Summary** — 2-4 paragraphs of substantive synthesis. Lead with the core thesis or finding.

**## Key Takeaways** — 4-8 bullets. Each bullet starts with a **bold phrase** followed by an em-dash and explanation. Use concrete details from the transcript, not generic summaries.

**## Action Items** — 3-6 numbered items. Each starts with a **bold verb phrase**. Must be specific enough that a reader can act on them without re-watching the video.

**## Supporting Details** — Contains these subsections:

- **### Ideas / Methods / Claims** — Key concepts, frameworks, or arguments presented. Use bullet points with **bold lead-ins**.
- **### Tools / Repos / Resources Mentioned** — Named tools, libraries, repos, URLs. Use bullet points with **bold names**.
- **### Who This Is For** — 3-5 bullets describing the target audience with specificity.
- **### Risks, Gaps, or Caveats** — Honest limitations, missing context, transcript quality issues. Use bullet points with **bold lead-ins**.

### Formatting rules

- Use `##` for top-level sections, `###` for subsections — never `#` (reserved for the UI)
- Use **bold** generously for scanability — lead every bullet with a bold phrase
- Use `inline code` for tool names, CLI commands, file paths, and code references
- Use tables when comparing 3+ items with shared attributes
- Keep paragraphs to 3-5 sentences max for readability
- Use em-dashes (—) not hyphens for parenthetical asides

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
