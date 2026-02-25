---
title: "Current Allowed Tools Configuration"
description: "JSON configuration defining allowed and denied Claude Code tools and bash commands for security and permission management."
category: "Research"
subcategory: "Claude Code"
product_line: "Desktop Commander"
audience: "Technical Team"
status: "Active"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - claude-code
  - permissions
  - security-config
  - tool-allowlist
  - bash-commands
---

{
"permissions": {
"allow": [
"Read",
"Write",
"Edit",
"MultiEdit",
"Grep",
"Glob",
"LS",
"NotebookRead",
"WebFetch",
"WebSearch",

      "mcp__context7__resolve-library-id",
      "mcp__context7__get-library-docs",
      "mcp__gitmcp__get-repo-docs",
      "mcp__gitmcp__search-code",
      "mcp__gitmcp__fetch-file",

      "Bash(npm install:*)",
      "Bash(npm run:*)",
      "Bash(npm ci:*)",
      "Bash(npm list:*)",
      "Bash(npm info:*)",
      "Bash(npm audit:*)",
      "Bash(npm outdated:*)",

      "Bash(pnpm install:*)",
      "Bash(pnpm add:*)",
      "Bash(pnpm remove:*)",
      "Bash(pnpm run:*)",
      "Bash(pnpm list:*)",
      "Bash(pnpm why:*)",
      "Bash(pnpm outdated:*)",

      "Bash(uv install:*)",
      "Bash(uv run:*)",
      "Bash(uv sync:*)",
      "Bash(uv list:*)",

      "Bash(yarn install:*)",
      "Bash(yarn add:*)",
      "Bash(yarn remove:*)",
      "Bash(yarn run:*)",

      "Bash(git status:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git branch:*)",
      "Bash(git checkout:*)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git stash:*)",
      "Bash(git fetch:*)",
      "Bash(git worktree:*)",

      "Bash(tsc:*)",
      "Bash(eslint:*)",
      "Bash(prettier:*)",
      "Bash(jest:*)",
      "Bash(vitest:*)",
      "Bash(webpack:*)",
      "Bash(vite:*)",

      "Bash(ls:*)",
      "Bash(pwd)",
      "Bash(mkdir:*)",
      "Bash(find:*)",
      "Bash(grep:*)",
      "Bash(cat:*)",
      "Bash(head:*)",
      "Bash(tail:*)",
      "Bash(sort:*)",
      "Bash(uniq:*)",
      "Bash(wc:*)",
      "Bash(which:*)",
      "Bash(echo:*)",
      "Bash(touch:*)",

      "Bash(ps:*)",
      "Bash(jobs:*)",

      "Bash(env:*)",
      "Bash(printenv:*)",
      "Bash(history:*)",

      "Bash(node ./scripts/decompose-parallel.cjs:*)",
      "Bash(node ./scripts/cache-linear-issue.sh:*)",
      "Bash(./spawn-agents.sh:*)",

      "Bash(python:*)",
      "Bash(python3:*)",
      "Bash(pip list:*)",
      "Bash(pip show:*)",

      "Bash(gh repo view:*)",
      "Bash(gh issue list:*)",
      "Bash(gh pr list:*)",
      "Bash(bun run:*)",
      "Bash(deno run:*)"
    ],
    "deny": [
      "Bash(rm:*)",
      "Bash(rmdir:*)",
      "Bash(mv:*)",
      "Bash(cp:*)",
      "Bash(chmod:*)",
      "Bash(chown:*)",
      "Bash(sudo:*)",
      "Bash(git push:*)",
      "Bash(git reset:*)",
      "Bash(git rebase:*)",
      "Bash(docker:*)",
      "Bash(curl:*)",
      "Bash(wget:*)",
      "Bash(ssh:*)",
      "Bash(scp:*)",
      "Bash(aws:*)",
      "Bash(gcloud:*)",
      "Bash(az:*)",
      "Bash(kubectl:*)",
      "Bash(terraform:*)",
      "Bash(kill:*)",
      "Bash(killall:*)"
    ]

}
}
