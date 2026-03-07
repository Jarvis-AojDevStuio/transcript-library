```md
---
title: "How I use Claude Code (Meta Staff Engineer Tips)"
channel: "John Kim"
topic: "software-engineering"
publishedDate: "2026-02-07"
generatedAt: "2026-03-07"
pattern: "headless-youtube-analysis"
contentType: "tutorial"
analysisDepth: "standard"
sourceUrl: "https://youtube.com/watch?v=mZzhfPle9QU"
githubRepos: []
---

## Summary

A Meta Staff Engineer shares 50 practical Claude Code tips derived from six months of daily use — approximately 12 hours per day — spanning personal projects and professional work. The video is organized into four acts: Foundations (Tips 1–25), Daily Workflow (Tips 26–32), Power User (Tips 33–40), and Advanced (Tips 41–50). The format is a live terminal demonstration with annotated slides, walking through each tip in sequence with working examples on iOS (Swift/Xcode) and Next.js projects.

The central thesis is that Claude Code is primarily a **context engineering tool**, not just a code generator. Every major feature — slash commands, auto-compaction, CLAUDE.md, sub-agents, skills — exists to help the engineer manage what the model sees and when. The author argues that a well-structured CLAUDE.md with a validation loop is the single highest-leverage investment for most engineers, capable of resolving 80% of agentic coding headaches without mastering advanced primitives.

The advanced workflow section reframes the engineer's job as "juggling Claude instances" — running multiple parallel sessions across projects, switching between them like a Starcraft game, using Git worktrees to enable concurrent edits on the same codebase, and lazy-loading context only when needed. This is presented as the next productivity step function, distinct from conventional AI-assisted coding where a single session handles one task at a time.

---

## Key Takeaways

- **CLAUDE.md is your highest-leverage artifact**: keep it under ~300 lines, structure it top-to-bottom by priority (most critical rules first), include a working validation loop (build → run → check), and commit it to git so teammates inherit the same AI behavior.
- **Context is the bottleneck, not generation**: fresh, condensed context beats bloated context every time. Start features in Plan Mode, finalize the execution spec before switching to edit mode, and use `/clear` or new instances to prevent old context from polluting new tasks.
- **Skills and commands are just named system prompts**: create them by doing the workflow once and asking Claude to save it — never author them manually. They are markdown files in a known directory and are directly editable.
- **Sub-agents are for atomic, isolated side effects**: do not use sub-agents for work that requires shared context (e.g., testing code just written). The sub-agent only returns its output, not the reasoning chain that produced it.
- **Parallel instances are the productivity multiplier**: run multiple Claude terminals simultaneously across different tasks or projects; use iTerm split panes or tabs and Git worktrees for concurrent edits on the same repo.
- **MCPs blow up token usage**: install only project-specific MCPs, audit with `/context`, and disable or remove MCPs not actively needed to control cost and keep context quality high.
- **Hooks are composable automation primitives**: use PostToolUse hooks for auto-formatting/linting, PreToolUse hooks to block destructive mutations (e.g., `rm -rf`, database drops). Ask Claude to generate them — do not write them by hand.
- **Validation loop quality determines agentic output quality**: giving Claude a repeatable build/run/check cycle (Xcode build, Puppeteer navigation, integration tests, log tailing) is the single most impactful design decision for autonomous coding loops.

---

## Action Items

1. **Run `/init` on every project immediately** and commit the generated CLAUDE.md to git; then evolve it iteratively by asking Claude to update rules when it makes a mistake — never edit the file manually.
2. **Add a validation section to CLAUDE.md** — a concrete build/lint/test command sequence that Claude can run autonomously to self-verify its changes before declaring done.
3. **Audit your MCP footprint with `/context`** — identify which MCPs are consuming the most tokens and disable any not required for the active task to reduce cost and improve model focus.
4. **Set up Git worktrees** for any project where you run more than one Claude instance, so parallel sessions can make independent edits without branch conflicts.
5. **Convert your most-repeated Claude workflows into skills** by doing the workflow once in a session, then saying "save what we just did as a skill called X" — verify the generated markdown file and refine as needed.
6. **Implement at least one destructive-command block hook** using Claude's hooks system (PreToolUse) to prevent accidental deletions or database mutations in production-adjacent environments.

---

## Supporting Details

### Ideas / Methods / Claims

- **CLAUDE.md hierarchy**: global (`~/.claude/CLAUDE.md`) + project-level (`.claude/CLAUDE.md`) + user-level. All are additive; project file loaded on every session start and counts toward initial token usage.
- **"Context is best served fresh and condensed"** — the author's core mental model. Every tool feature is interpreted through this lens.
- **Compound engineering**: committing CLAUDE.md to the repo so all teammates get the same AI behavior. Author notes there's no established evaluation framework yet; teams are using qualitative ("vibes") feedback loops over several weeks.
- **Second brain concept**: a local project notes directory (`~/.claude/projects/`) that stores summaries, to-dos, and context checkpoints. Lazy-loaded per session rather than always in context.
- **"Bring the work to the context, not the context to the work"**: argues against CEO/product/design agent architectures that spread shared context across isolated agents; instead keep tightly coupled reasoning in one session.
- **Auto-compaction**: Claude summarizes the context window automatically when it grows long. Author leaves it enabled by default; only manually compacts when saving a context snapshot to the second brain.
- **`--dangerously-skip-permissions`**: yolo mode for throwaway environments. Pair with `/permissions` allowlist to still block specific high-risk commands. Author bricked a Linux machine using it without guards.

### Tools / Repos / Resources Mentioned

- **Claude Code** (Anthropic) — primary tool throughout
- **iTerm2** — preferred terminal; used for split panes, tabs, and renamed sessions for parallel instance management
- **Xcode MCP** — iOS-specific MCP for build/run cycles; flagged as a necessary exception to the "avoid MCPs" heuristic
- **Whisper** (speech-to-text overlay) — used at home to voice-prompt multiple Claude instances simultaneously
- **Git worktrees** — for concurrent edits on the same repo across multiple Claude instances
- **`/chrome` command** — built-in Claude Code browser automation; demonstrated navigating YouTube by screenshot interaction
- **Figma MCP** — mentioned as a recommended addition for UI validation workflows
- **Perretto (Perfetto)** — mentioned for mobile performance trace analysis via MCP
- **Puppeteer** — mentioned as a web validation loop option alongside `/chrome`
- **Hacker News** — used as a live example for skill/command creation demo
- **Anthropic plugin directory** — referenced as a source for community-shared Claude Code plugins
- Newsletter: https://getpushtoprod.substack.com

### Who This Is For

- Software engineers actively using or evaluating Claude Code for daily coding workflows
- Engineers wanting to reduce per-task overhead through better CLAUDE.md configuration and validation loops
- Team leads considering committing AI behavior rules (CLAUDE.md) to shared repositories
- Engineers hitting context degradation or runaway token costs and unsure why

### Risks, Gaps, or Caveats

- **`--dangerously-skip-permissions` is genuinely dangerous**: the author confirms having bricked a Linux machine. This mode should be restricted to ephemeral containers or sandboxed VMs, not development machines.
- **Transcript noise**: the transcript contains transcription artifacts (e.g., "claw.md", "slashresentally", "peretto") that indicate automated transcription from audio. All references have been interpreted by context; direct quotes from the transcript should be verified against the video.
- **Opus-first recommendation is cost-intensive**: the suggestion to default to Opus 4.5 assumes an enterprise or employer-subsidized token budget. Cost-sensitive individual developers should benchmark Sonnet on their specific workflows before committing.
- **"Second brain" workflow is underspecified**: the author references a separate video for the full system; the tip as presented lacks enough detail to implement without that supplementary content.
- **Sub-agent advice is nuanced but may be misread**: the "sub-agents are bad for shared context" argument is valid, but the inverse — that all shared-context work must stay in one session — does not account for very long-running tasks where context window limits force decomposition regardless.
- **No mention of security scanning, secrets management, or code review processes** — relevant omissions for engineers using Claude Code in production codebases with sensitive data.
```
