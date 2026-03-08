# Transcript Library Agent Guide

This repository is a private internal tool for a small friend group. It is a proof of concept for sharing knowledge from a shared YouTube playlist. It is not a SaaS product.

## What the app does

- indexes videos and transcript parts from `PLAYLIST_TRANSCRIPTS_REPO`
- renders a desktop-first app for browsing, watching, and reading
- runs headless transcript analysis through local CLI providers
- stores analysis artifacts under `data/insights/<videoId>/`

## Non-goals

- multi-tenant billing
- public self-serve onboarding
- end-user subscription management

## Working rules

- keep the app machine-keyed by `videoId`
- also write human-readable slugged markdown files for manual review
- keep provider switching behind the server runtime, not the UI
- prefer additive migrations over destructive rewrites of stored artifacts
- maintain observability through `status.json`, `run.json`, and worker logs

## Runtime assumptions

- this group already has access to Claude and ChatGPT/OpenAI tooling
- the current deployment model is private and can rely on authenticated local or private worker CLIs
- analysis execution should remain compatible with future worker separation

## Primary commands

```bash
just start
just prod-start
just build
just lint
just typecheck
just backfill-insights
```
