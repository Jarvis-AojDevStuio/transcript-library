---
title: "Justfile + Claude Code Hooks: The Install-and-Maintain Pattern"
date: 2026-02-02
source:
  video: "One Prompt Every AGENTIC Codebase Should Have (For Engineering Teams)"
  channel: IndyDevDan
  published: 2026-01-26
  youtube: https://youtube.com/watch?v=3_mwKbYvbUg
  repo: https://github.com/disler/install-and-maintain
tags:
  - claude-code
  - justfile
  - hooks
  - developer-experience
  - onboarding
  - automation
category: technology/claude-code
---

# Justfile + Claude Code Hooks: The Install-and-Maintain Pattern

A pattern for deterministic project setup with optional agentic supervision. The core idea: **hooks do the work, prompts do the thinking**. Scripts are the source of truth -- both hooks and slash commands execute the same underlying scripts.

## TL;DR

```
justfile recipe  -->  claude CLI flags  -->  Setup hook (deterministic)  -->  slash command prompt (agentic)
```

One `just` command boots Claude Code with the right flags, triggers deterministic hooks that install deps and seed databases, then optionally hands off to an agentic prompt that reads the logs and reports status. Three modes of operation from one command hierarchy.

---

## Architecture Overview

```
.claude/
  commands/
    install.md          # /install slash command
    install-hil.md      # /install-hil (human-in-the-loop variant)
    maintenance.md      # /maintenance slash command
    prime.md            # /prime (context bootstrap)
  hooks/
    setup_init.py       # Runs on --init (install deps, seed DB)
    setup_maintenance.py # Runs on --maintenance (update deps, vacuum DB)
    session_start.py    # Runs on every session (loads .env)
  settings.json         # Wires hooks to lifecycle events
apps/
  backend/              # FastAPI + SQLite
  frontend/             # Vite + Vue + TypeScript
app_docs/
  install_results.md    # Written by /install after hook completes
  maintenance_results.md
justfile                # Command launchpad
```

---

## The Three Execution Modes

| Mode | What Runs | Use Case |
|------|-----------|----------|
| **Deterministic** | Hook script only | CI/CD, quick local setup |
| **Agentic** | Hook script + slash command prompt | Troubleshooting, status reporting |
| **Interactive** | Hook script + slash command + user Q&A | New engineer onboarding |

The key insight: **the script is always the source of truth**. The agent layer reads logs and reports -- it does not replace the deterministic execution.

---

## 1. Justfile: The Command Launchpad

The justfile provides memorable shorthand recipes that compose Claude CLI flags.

```just
set dotenv-load := true

default:
  @just --list

# --- App Runners ---

fe:
  cd apps/frontend && npm install && npm run dev

be:
  cd apps/backend && uv sync && uv run uvicorn main:app --reload

# --- Claude Code Recipes ---

# Deterministic only: hook runs, no agent prompt
cldi:
  claude --model opus --dangerously-skip-permissions --init

# Deterministic + agentic: hook runs, then /install prompt fires
cldii:
  claude --model opus --dangerously-skip-permissions --init "/install"

# Deterministic + agentic + interactive: hook runs, then /install branches to HIL
cldit:
  claude --model opus --dangerously-skip-permissions --init "/install true"

# Deterministic maintenance only
cldm:
  claude --model opus --dangerously-skip-permissions --maintenance

# Deterministic + agentic maintenance
cldmm:
  claude --model opus --dangerously-skip-permissions --maintenance "/maintenance"

# Undo everything
reset:
  rm -rf apps/backend/.venv
  rm -rf apps/backend/starter.db
  rm -rf apps/frontend/node_modules
  rm -rf .claude/hooks/*.log
  rm -rf app_docs/install_results.md
  rm -rf app_docs/maintenance_results.md
```

### Key Mechanism: Quoted String After --init

The quoted string after `--init` becomes the **first prompt** Claude executes after hooks complete. This is effectively an appended system prompt at boot time.

```bash
# These are equivalent in effect:
claude --init "/install"        # Boot + run /install as first prompt
claude --init "/prime"          # Boot + run /prime as first prompt
claude --init "Read README.md"  # Boot + run any arbitrary prompt
```

This means any justfile recipe can boot Claude with a specific context-loading command.

---

## 2. settings.json: Hook Wiring

The `.claude/settings.json` file maps lifecycle events to hook scripts.

```json
{
  "hooks": {
    "Setup": [
      {
        "matcher": "init",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/setup_init.py",
            "timeout": 120
          }
        ]
      },
      {
        "matcher": "maintenance",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/setup_maintenance.py",
            "timeout": 60
          }
        ]
      }
    ],
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/session_start.py",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

### How Matchers Work

- `--init` flag triggers Setup hooks where `matcher` equals `"init"`
- `--maintenance` flag triggers Setup hooks where `matcher` equals `"maintenance"`
- `SessionStart` hooks fire on every session (start, resume, clear, compact) -- no matcher needed

### Important Details

- `$CLAUDE_PROJECT_DIR` resolves to the repo root automatically
- Hooks receive JSON on stdin with `trigger` type and `session_id`
- Hooks return structured JSON on stdout
- Stderr is used for logging (keeps stdout clean for JSON protocol)
- Timeout is in seconds -- set generously for install operations

---

## 3. The Setup Hook (setup_init.py)

This is the deterministic backbone. It runs the same way every time, whether triggered by a human, CI, or an agent.

```python
#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["python-dotenv"]
# ///

import subprocess, json, sys, os
from datetime import datetime
from pathlib import Path

PROJECT_DIR = os.environ.get("CLAUDE_PROJECT_DIR", str(Path(__file__).parent.parent.parent))
LOG_FILE = Path(PROJECT_DIR) / ".claude" / "hooks" / "setup.init.log"

class Logger:
    """Print to stderr and append to log file."""
    def log(self, msg):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        line = f"[{timestamp}] {msg}"
        print(line, file=sys.stderr)
        with open(LOG_FILE, "a") as f:
            f.write(line + "\n")

logger = Logger()

def run(cmd, cwd=None):
    """Run command, log output, exit 2 on failure."""
    logger.log(f"Running: {cmd}")
    result = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True, text=True)
    if result.returncode != 0:
        logger.log(f"FAILED (exit {result.returncode}): {result.stderr[:200]}")
        sys.exit(2)
    logger.log(f"OK: {result.stdout[:200]}")
    return result

def main():
    hook_input = json.loads(sys.stdin.read())
    logger.log(f"Setup init triggered: {hook_input}")

    backend_dir = Path(PROJECT_DIR) / "apps" / "backend"
    frontend_dir = Path(PROJECT_DIR) / "apps" / "frontend"

    # 1. Backend deps
    run("uv sync", cwd=str(backend_dir))

    # 2. Frontend deps
    run("npm install", cwd=str(frontend_dir))

    # 3. Database init
    run("uv run python init_db.py", cwd=str(backend_dir))

    # 4. Environment setup
    env_file = os.environ.get("CLAUDE_ENV_FILE")
    if env_file:
        with open(env_file, "a") as f:
            f.write("BACKEND_URL=http://localhost:8000\n")
            f.write("FRONTEND_URL=http://localhost:5173\n")

    # Return structured output
    output = {
        "status": "success",
        "actions": ["uv sync", "npm install", "init_db.py", "env configured"],
        "instructions": "Run 'just be' and 'just fe' to start the app"
    }
    print(json.dumps(output))

if __name__ == "__main__":
    main()
```

### Critical Design Decisions

1. **Log everything** -- the log file (`setup.init.log`) becomes the bridge between the deterministic hook and the agentic prompt
2. **Exit code 2 on failure** -- Claude Code interprets this as a hook failure
3. **JSON on stdout** -- the structured output is what Claude Code processes
4. **stderr for human-readable logs** -- keeps the JSON protocol clean
5. **uv run --script shebang** -- dependencies are declared inline, no separate requirements file

---

## 4. The Maintenance Hook (setup_maintenance.py)

Same pattern, different operations: update deps and run database maintenance.

```python
def main():
    hook_input = json.loads(sys.stdin.read())

    backend_dir = Path(PROJECT_DIR) / "apps" / "backend"
    frontend_dir = Path(PROJECT_DIR) / "apps" / "frontend"

    # Update deps
    run("uv sync --upgrade", cwd=str(backend_dir))
    run("npm update", cwd=str(frontend_dir))

    # Database maintenance
    db_path = backend_dir / "starter.db"
    if db_path.exists():
        run(f"sqlite3 {db_path} 'VACUUM;'")
        run(f"sqlite3 {db_path} 'PRAGMA integrity_check;'")
        # Count rows across all tables
        run(f"sqlite3 {db_path} \"SELECT name, COUNT(*) FROM sqlite_master WHERE type='table';\"")

    output = {
        "status": "success",
        "actions": ["uv sync --upgrade", "npm update", "db vacuum", "integrity check"]
    }
    print(json.dumps(output))
```

---

## 5. Session Start Hook (session_start.py)

Loads `.env` variables into every Claude Code session.

```python
def main():
    hook_input = json.loads(sys.stdin.read())

    env_file_path = Path(PROJECT_DIR) / ".env"
    claude_env_file = os.environ.get("CLAUDE_ENV_FILE")

    if env_file_path.exists() and claude_env_file:
        from dotenv import dotenv_values
        values = dotenv_values(str(env_file_path))

        with open(claude_env_file, "a") as f:
            for key, value in values.items():
                # Escape single quotes to prevent shell injection
                escaped = value.replace("'", "'\\''") if value else ""
                f.write(f"{key}='{escaped}'\n")

        logger.log(f"Loaded {len(values)} env vars")

    output = {"status": "success", "env_vars_loaded": len(values)}
    print(json.dumps(output))
```

### Why This Matters

Without this hook, environment variables from `.env` would not persist across bash tool calls within a Claude Code session. The hook writes them to `CLAUDE_ENV_FILE`, which Claude Code sources automatically.

---

## 6. Slash Commands

### /prime -- Agent Context Bootstrap

The foundation command. Every other command calls this first.

```markdown
# .claude/commands/prime.md
---
description: Quick-start agent understanding of the codebase structure
---

# Purpose
Quickly orient an agent to understand this codebase.

## Workflow
1. Run `git ls-files` to get the complete list of tracked files
2. Read `README.md`
3. Read `justfile`
4. Read `ai_docs/cc_hooks.md` if it exists
5. Read `.claude/settings.json`
6. Read all files in `.claude/hooks/`
7. Read all files in `.claude/commands/`

## Report
Report your understanding of the codebase.
```

This gives Claude full project awareness before it does any real work. The cost is a few file reads. The payoff is dramatically better agent behavior.

### /install -- Agentic Setup with Reporting

```markdown
# .claude/commands/install.md
---
description: Run setup_init hook and report installation results
argument-hint: [hil]
---

## Variables
MODE: $1 (optional - if "true", run interactive mode)

## Workflow
1. Execute `/prime` to understand the codebase
2. If MODE is "true", run `/install-hil` and stop
3. Read `.claude/hooks/setup.init.log` (hook already ran via --init)
4. Analyze for successes and failures
5. Write results to `app_docs/install_results.md`
6. Report to user

## Report Format
**Status**: SUCCESS or FAILED
**What worked**: [completed actions]
**What failed**: [errors with context]
**Next steps**: [what to do now]
```

The hook already ran before this prompt fires. The slash command reads the log and provides intelligent analysis.

### /install-hil -- Human-in-the-Loop Variant

```markdown
# .claude/commands/install-hil.md
---
description: Interactive setup with user preferences
---

Ask the engineer about:
1. **Database Setup** -- Fresh, keep existing, or skip?
2. **Installation Mode** -- Full (with dev tools), minimal, or conditional?
3. **Environment Check** -- Verify Python 3.11+, Node.js 18+, uv installed
4. **Environment Variables** -- Configure .env interactively (NEVER read actual values)
5. **Documentation** -- Scrape external docs if older than 24 hours
```

Security note: the HIL variant validates that env vars **exist and are non-empty** using `grep -q "^VARIABLE_NAME=.\\+" .env` but never reads actual values.

### /maintenance -- Agentic Maintenance Reporting

Same pattern as /install but reads `setup.maintenance.log` and writes to `app_docs/maintenance_results.md`. Reports dependency update status and database integrity.

---

## 7. The Complete Flow

### `just cldii` (most common development usage)

```
Developer runs: just cldii
  |
  v
claude --model opus --dangerously-skip-permissions --init "/install"
  |
  |-- 1. SETUP HOOK FIRES (deterministic)
  |     setup_init.py runs:
  |       - uv sync (backend Python deps)
  |       - npm install (frontend JS deps)
  |       - init_db.py (seed SQLite database)
  |       - Configure BACKEND_URL and FRONTEND_URL
  |       - Log everything to .claude/hooks/setup.init.log
  |       - Return JSON status on stdout
  |
  |-- 2. SESSION START HOOK FIRES
  |     session_start.py runs:
  |       - Load .env vars into CLAUDE_ENV_FILE
  |
  |-- 3. FIRST PROMPT EXECUTES: "/install"
  |     /install slash command:
  |       a. Runs /prime (reads git ls-files, README, justfile, all .claude/ files)
  |       b. Reads setup.init.log to see what the hook did
  |       c. Analyzes successes and failures
  |       d. Writes report to app_docs/install_results.md
  |       e. Reports status to user
  |
  v
Claude is now running with:
  - Full project context loaded
  - All deps installed
  - Database seeded
  - Environment configured
  - Install status documented
```

### `just cldit` (new engineer onboarding)

Same as above, but step 3 branches to `/install-hil` which asks the engineer questions via `AskUserQuestion` before proceeding.

### `just cldi` (CI/CD or quick setup)

Only steps 1 and 2 run. No agent prompt. Pure deterministic execution. Claude exits after hooks complete.

---

## 8. Recommended Use Cases

| Scenario | Command | Why |
|----------|---------|-----|
| CI/CD pipeline | `claude --init` (no prompt) | Deterministic only, no agent overhead |
| Quick local setup | `just cldi` | Fast, predictable, no conversation |
| Troubleshooting failed setup | `just cldii` | Agent reads logs and diagnoses issues |
| New engineer onboarding | `just cldit` | Interactive walkthrough with preferences |
| Routine dependency updates | `just cldmm` | Agent reports what changed and any issues |
| Context loading only | `claude "/prime"` | Understand codebase without setup |

---

## 9. Adapting This Pattern

### Minimal Implementation (Start Here)

You need three files to adopt this pattern:

**justfile:**
```just
# Boot Claude with project context
start:
  claude --model opus "/prime"

# Full setup
setup:
  claude --model opus --init "/install"
```

**.claude/commands/prime.md:**
```markdown
---
description: Load project context
---

1. Run `git ls-files`
2. Read README.md
3. Read justfile
4. Read .claude/settings.json
5. Report understanding
```

**.claude/settings.json:**
```json
{
  "hooks": {
    "Setup": [
      {
        "matcher": "init",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/scripts/setup.sh",
            "timeout": 120
          }
        ]
      }
    ]
  }
}
```

### Adding Maintenance

Add a `--maintenance` matcher in settings.json and a corresponding hook script. Mirror the init pattern exactly.

### Adding Interactive Mode

Create an `/install-hil` command that uses `AskUserQuestion` (or equivalent tool) to collect preferences before running setup steps conditionally.

### Adding Session Environment

Add a `SessionStart` hook that loads `.env` into `CLAUDE_ENV_FILE` to persist environment variables across bash calls.

---

## 10. Key Takeaways

1. **Hooks are deterministic, prompts are agentic.** Keep them separate. The hook does the work; the prompt analyzes and reports.

2. **The log file is the bridge.** Hooks write logs. Prompts read logs. This decouples execution from analysis cleanly.

3. **The quoted string after --init is a boot prompt.** Any justfile recipe can boot Claude into a specific context or workflow.

4. **Three modes from one codebase.** Deterministic (CI), agentic (dev), and interactive (onboarding) all share the same scripts.

5. **/prime is the universal context loader.** Every command starts by reading the project structure. This is cheap and dramatically improves agent behavior.

6. **uv run --script shebangs eliminate requirements files.** Python hook dependencies are declared inline, keeping the .claude/hooks directory self-contained.

7. **Environment persistence requires explicit handling.** Without a SessionStart hook writing to CLAUDE_ENV_FILE, .env vars vanish between bash calls.

8. **Exit code 2 signals hook failure to Claude Code.** Use this consistently for error handling in hook scripts.
