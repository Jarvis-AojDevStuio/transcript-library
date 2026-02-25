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
dev:
  bun run dev

# Build for production
build:
  bun run build

# Start production server
start:
  bun run start

# Run ESLint
lint:
  bun run lint

# Run type checking
typecheck:
  bunx tsc --noEmit

# Format code with Prettier
fmt:
  bunx prettier --write "src/**/*.{ts,tsx,json,css}"

# Run nightly insights script
insights:
  bun scripts/nightly-insights.ts

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
