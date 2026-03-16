# Transcript Library - Command Launchpad
set dotenv-load := true

# Claude Code with skip permissions
cc := "claude --dangerously-skip-permissions"

# List all recipes
default:
  @just --list

# --- Development ---

# Install dependencies
install:
  bun install

# Start Next.js dev server
dev host="127.0.0.1" port="3000":
  bun run dev -- --hostname {{host}} --port {{port}}

# Build for production using webpack (avoids the Next 16 Turbopack panic)
build:
  bunx next build --webpack

# Start the local app server
start host="127.0.0.1" port="3000":
  just dev {{host}} {{port}}

# Start production server (builds first and allows host/port override)
prod-start host="127.0.0.1" port="3000":
  just build
  HOSTNAME={{host}} PORT={{port}} bun run start

# Run ESLint
lint:
  bun run lint

# Run type checking
typecheck:
  bunx tsc --noEmit

# Format code with Prettier
fmt:
  bunx prettier --write "src/**/*.{ts,tsx,json,css}"

# Run the unattended daily sweep (refresh-only ingest + safe repair, no analysis launch)
daily-sweep:
  node --import tsx scripts/daily-operational-sweep.ts

# Run the legacy nightly analysis workflow explicitly; not the unattended default
insights:
  node --import tsx scripts/nightly-insights.ts
<<<<<<< HEAD

# Rebuild the SQLite-backed catalog snapshot with the supported runtime
rebuild-catalog:
  npx tsx scripts/rebuild-catalog.ts

# Validate catalog parity without replacing the live snapshot
rebuild-catalog-check:
  npx tsx scripts/rebuild-catalog.ts --check
=======
>>>>>>> gsd/M002/S04

# Rebuild the SQLite-backed catalog snapshot with the supported runtime
rebuild-catalog:
  npx tsx scripts/rebuild-catalog.ts

# Validate catalog parity without replacing the live snapshot
rebuild-catalog-check:
  npx tsx scripts/rebuild-catalog.ts --check

# Backfill canonical/title artifacts for existing insights
backfill-insights:
  bun run scripts/backfill-insight-artifacts.ts

# --- Claude Code Boot ---

# Start Claude with project context loaded
cld:
  {{cc}} --model opus "/prime"

# Quick start (no context preload)
cldq:
  {{cc}} --model opus

# Deterministic setup only (runs hooks, no agent)
cldi:
  {{cc}} --model opus --init

# Setup + agentic install reporting
cldii:
  {{cc}} --model opus --init "/install"

# Setup + interactive onboarding (human-in-the-loop)
cldit:
  {{cc}} --model opus --init "/install true"

# Deterministic maintenance only
cldm:
  {{cc}} --model opus --maintenance

# Maintenance + agentic reporting
cldmm:
  {{cc}} --model opus --maintenance "/maintenance"

# --- Context Loading ---

# Load knowledge base as system context
load-knowledge topic:
  {{cc}} --append-system-prompt "$(cat knowledge/{{topic}}/*.md 2>/dev/null || echo 'No files found for topic: {{topic}}')"

# --- Utilities ---

# Git status (short)
gs:
  git status -sb

# Push current branch
push:
  git push origin HEAD

# Clean build artifacts
clean:
  rm -rf .next node_modules/.cache

# Full reset (reinstall everything)
reset:
  rm -rf node_modules .next package-lock.json
  bun install
