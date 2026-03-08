---
videoId: bzWI3Dil9Ig
title: "My Multi-Agent Team with OpenClaw"
channel: "Brian Casel"
topic: "ai-llms"
publishedDate: "2026-02-16"
generatedAt: "2026-02-20T23:20:00Z"
pattern: "YouTubeAnalyzer (full)"
---

# Executive summary
Brian describes standing up a small “agent team” using OpenClaw on a dedicated Mac mini: multiple named agents (dev/marketer/assistant/sysadmin) chatting via Slack, sharing a workspace, and running background tasks. The real insight is operational: treat agents like employees—separate accounts, least privilege, dedicated machine, and explicit cost controls.

# What OpenClaw is (in his framing)
- A persistent gateway process running on a dedicated machine
- Always-on agents you can message via chat (Telegram/Slack)
- Persistent workspace + memory + session logs
- Background tool execution (bash, browser, etc.)

# Setup decisions (the “hard parts”)
## Where to run it
- Not on daily driver (security + must be awake 24/7)
- Options:
  - cheap VPS
  - dedicated physical machine (he chose Mac mini for screen share + storage)

## Security model: “hire an employee” mindset
- Dedicated email identity for agents
- Separate GitHub user invited to specific repos
- Separate Dropbox account; share only specific folders with main account
- Principle: revoke/grant access like real team members

## Costs (non-trivial)
- Easy to burn hundreds in a couple days while experimenting.
- He keeps personal Claude subscription separate from agent usage.
- Runs agent tokens via OpenRouter for centralized billing + per-agent model selection.

## Chat interface choice
- Started with Telegram, moved to Slack for better markdown + threads.

# Multi-agent configuration
- Four agents with roles + personalities
  - sysadmin
  - developer
  - marketer
  - assistant
- Each is its own Slack bot
- Shared workspace for shared memory
- Model assignment:
  - heavier models for dev/sysadmin
  - cheaper/faster models for marketer/assistant

# The “real” win: management UI
- Chat-only didn’t scale for him.
- Built a custom dashboard (Rails) to:
  - see scheduled tasks
  - assign tasks to specific agents
  - track costs/token usage

# Use cases he’s targeting
1) **Content pipeline**: capture and repurpose work into posts/newsletter/video ideas
2) **Development**: backlog issues, production errors, PRs while he’s away
3) **Glue work**: PM, copying/pasting, scheduling, documentation
4) **Reporting**: surface trends/patterns/ideas and blind spots

# Key takeaways (for Ossie)
- You’re already doing the “dedicated machine + cron” part; the next maturity step is:
  - role separation
  - permission boundaries
  - a dashboard / library UI (exactly what transcript-library is becoming)
- Most value comes from: **background throughput + retrieval**, not personal-life automation.

# Action items
- Create “agent identities” the same way you’d create employees.
- Decide which tasks are safe for autonomous execution vs review-required.
- Build/standardize a task queue + status reporting (your 5-min cron updates are the seed).
