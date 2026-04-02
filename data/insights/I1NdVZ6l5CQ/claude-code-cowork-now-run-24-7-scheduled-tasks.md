---
title: "Claude Code & Cowork Now Run 24/7 — Scheduled Tasks"
channel: "Kenny Liao"
topic: "ai-llms"
publishedDate: "2026-02-28"
generatedAt: "2026-03-12"
pattern: "headless-youtube-analysis"
contentType: "tutorial"
analysisDepth: "standard"
sourceUrl: "https://youtube.com/watch?v=I1NdVZ6l5CQ"
githubRepos:
  - "https://github.com/kenneth-liao/ai-launchpad-marketplace"
---

## Summary

Kenny Liao presents scheduled tasks as a genuinely useful automation layer for Claude rather than another speculative “agent” feature. His core claim is that recurring prompts become much more valuable when they run automatically and leave finished work waiting for you, whether that work is a morning brief, a weekly business report, or a nightly file-organization pass.

The first half of the video is demo-driven. Liao shows recurring workflows he actually uses: a daily business brief that checks calendar, email, and Sentry; a weekly Stripe sales analysis; a daily Substack note drafting flow; and a nightly brain-dump organizer that updates a structured personal context system. The throughline is not novelty but removal of repetitive setup and prompting.

He then explains how scheduled tasks work inside Claude Cowork. Tasks are configured as prompts with a selected model, working directory, and frequency, and they can use the same skills, slash commands, and MCP servers already available in Claude Code. That gives the feature leverage, but it also introduces a runtime caveat: Cowork jobs only run reliably when the machine and the Claude desktop app are both open.

To address that limitation, Liao shares a free Claude Code scheduler plugin that uses OS cron tooling to create recurring local jobs. The plugin stores task metadata in a scheduler registry, writes logs and results to predictable folders, generates wrapper scripts, and supports safer configuration choices like limited permissions, timeouts, and optional output directories.

## Key Takeaways

- **Scheduled prompts become real workflows** — Liao’s main point is that the value comes from having useful work already completed when you sit down, not from watching the agent act in real time.
- **Cowork inherits Claude Code capabilities** — Because scheduled tasks use the Claude Code stack underneath, they can call existing `skills`, `slash commands`, and configured `MCP servers` rather than living in a separate automation silo.
- **Recurring briefs are the easiest starting point** — Daily AI news, calendar plus email triage, and weekly Stripe reporting are presented as low-friction automations with immediate payoff.
- **Human review still matters** — In the Substack workflow, Liao intentionally stages note drafts for review instead of fully auto-posting them, which keeps quality control in the loop.
- **Context maintenance is a powerful backend use case** — The nightly brain-dump organizer shows that scheduled tasks are useful not just for summaries but for continuously updating a personal assistant’s structured memory files.
- **Cowork has an uptime dependency** — A scheduled task may be missed if the app is closed or the computer is off, and replay behavior on reopen is best-effort rather than guaranteed.
- **Claude Code plugin avoids app-open dependency** — The scheduler plugin runs natively on the machine via cron, so it is better suited to people who live in `Claude Code` instead of the desktop app.
- **Operational safety is part of the design** — Timeouts, scoped permissions, explicit output directories, a registry file, and per-job logs make the plugin feel more like an automation system than a one-off script hack.

## Action Items

1. **Update Claude Desktop** — Install the latest desktop app version and confirm the `Scheduled` sidebar entry or `/schedule` command appears before attempting Cowork-based automation.
2. **Prototype one recurring brief** — Create a narrow daily or weekly task such as email prioritization, a news brief, or a Stripe report, then use `Run now` to verify model choice, permissions, and output quality.
3. **Adopt the scheduler plugin for Claude Code workflows** — If you prefer local execution, install the scheduler plugin from the `ai-launchpad-marketplace` repo and let Claude create cron-backed jobs through the provided skill.
4. **Define artifact destinations up front** — For tasks that generate reports, specify an output path like `docs/plans` so outputs land where your team already reviews them.
5. **Constrain automation scope** — Add timeouts, restrict permissions, and separate “report-only” jobs from “take action” jobs so recurring tasks stay safe and debuggable.

## Supporting Details

### Ideas / Methods / Claims

- **Practical autonomy over hype** — Liao explicitly distances this feature from AI hype and argues it matters because it solves recurring work he expects to remain valuable over time.
- **Prompt-first scheduling model** — A scheduled task is essentially a saved prompt plus runtime configuration such as model, working directory, and recurrence.
- **Leverage existing agent infrastructure** — The video emphasizes that scheduled jobs can invoke the same skills and MCP integrations the user already depends on in Claude Code.
- **Deliver work before the workday starts** — Several examples center on front-loading useful decisions so the user opens the computer to finished analysis rather than a blank chat box.
- **Separate reporting from execution** — In the cleanup-report example, the scheduled task is intentionally limited to scanning, recommending, and writing a report rather than mutating the project automatically.

### Tools / Repos / Resources Mentioned

- **`Claude Cowork`** — Anthropic’s environment where native scheduled tasks appear in the desktop app sidebar and via `/schedule`.
- **`Claude Code`** — Liao’s preferred environment, used as the mental model and runtime base for the plugin approach.
- **`ai-launchpad-marketplace`** — Free GitHub marketplace repo that contains the scheduler plugin and supporting scripts: `https://github.com/kenneth-liao/ai-launchpad-marketplace`
- **`Claude Desktop App`** — Required for the native Cowork feature walkthrough; linked in the description as `https://claude.com/download`.
- **`Stripe`** — Used in the weekly sales-report example to pull transaction data and generate a business analysis.
- **`Substack`** — Used in the daily note-generation example, with staging favored over fully automatic posting.
- **`Playwright MCP`** — Mentioned as the mechanism that could automate browser posting flows if the user wants end-to-end scheduling.
- **`Sentry`** — Checked in the morning business brief example to surface production issues from overnight.
- **`cron` / built-in OS scheduling tools** — The underlying mechanism the plugin uses to create recurring local jobs.
- **`registry.json`, `logs/`, `results/`, `wrappers/`** — The main scheduler artifacts created inside the project-level `.claude/scheduler` directory.

### Who This Is For

- **Claude power users** — People already using `Claude Code`, custom skills, and MCP servers who want recurring jobs without rebuilding their tooling stack.
- **Solo operators and creators** — Founders, newsletter writers, and indie builders who benefit from recurring briefs, content staging, and lightweight reporting.
- **Developers managing active projects** — Teams or individuals who want scheduled audits, cleanup reports, file organization, or overnight monitoring outputs.
- **Users building a persistent assistant context** — Anyone maintaining structured memory files or personal operating documents that can be updated from recurring notes and brain dumps.
- **Automation-curious practitioners who still want oversight** — Viewers interested in autonomous workflows but not ready to hand off irreversible actions without review.

### Risks, Gaps, or Caveats

- **Cowork runtime dependency** — Native scheduled tasks depend on both the machine and the Claude app being open, which limits reliability for true unattended execution.
- **Platform availability uncertainty** — The video mentions an online complaint that Windows support may lag, but Liao does not verify that claim directly.
- **Plugin details are shown at a high level** — The repo is linked and file structure is demonstrated, but the transcript does not provide exhaustive installation or permission-model documentation.
- **Automation can outrun review discipline** — The examples are powerful enough to automate posting or file actions, but the safest demonstrated workflows keep a human approval step in place.
- **Transcript is slightly noisy** — Some product terms and phrases appear imperfectly transcribed, but the main workflow descriptions and caveats remain clear enough to analyze reliably.
