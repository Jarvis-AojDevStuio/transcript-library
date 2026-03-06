---
status: pending
priority: p2
issue_id: "005"
tags: [code-review, quality]
dependencies: []
---

# Missing .prettierignore — package-lock.json May Be Reformatted

## Problem Statement

No `.prettierignore` file exists. The lint-staged config runs `prettier --write` on `*.json` files. If `package-lock.json` is staged and committed, Prettier will reformat it, potentially corrupting the lockfile format npm expects.

## Findings

- **Source:** Architecture Strategist
- **Location:** `.prettierrc`, `package.json` lint-staged config

## Proposed Solutions

Create `.prettierignore`:

```
package-lock.json
.next/
node_modules/
```

- **Effort:** Small (1 file)
- **Risk:** Low

## Acceptance Criteria

- [ ] `.prettierignore` exists with `package-lock.json` entry
- [ ] `npx prettier --check .` does not check package-lock.json
