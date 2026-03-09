---
name: RepoArchitect
description: Repository organization expert — structure, audit, and refactor via 8 framework archetypes. USE WHEN creating a new project, auditing repo structure, or planning refactors.
category: development
context: fork
hooks:
  SessionStart:
    - hooks:
        - type: command
          command: "${PAI_DIR}/hooks/SkillActivationNotify.hook.ts --skill RepoArchitect"
          once: true
  PostToolUse:
    - matcher: "Write|Bash"
      hooks:
        - type: command
          command: "${PAI_DIR}/skills/RepoArchitect/Hooks/StructureValidator.hook.ts"
          async: true
  SubagentStop:
    - hooks:
        - type: command
          command: "${PAI_DIR}/skills/RepoArchitect/Hooks/RefactorVerifier.hook.ts"
          async: true
---

## Customization

**Before executing, check for user customizations at:**
`~/.claude/skills/CORE/USER/SKILLCUSTOMIZATIONS/RepoArchitect/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.

## Voice Notification

**When executing a workflow, do BOTH:**

1. **Send voice notification**:

   ```bash
   curl -s -X POST http://localhost:8888/notify \
     -H "Content-Type: application/json" \
     -d '{"message": "Running the WORKFLOWNAME workflow in the RepoArchitect skill to ACTION"}' \
     > /dev/null 2>&1 &
   ```

2. **Output text notification**:
   ```
   Running the **WorkflowName** workflow in the **RepoArchitect** skill to ACTION...
   ```

**Full documentation:** `~/.claude/skills/CORE/SYSTEM/THENOTIFICATIONSYSTEM.md`

# RepoArchitect

**Repository organization expert — structure, audit, and refactor via 8 framework archetypes.**

Encodes the Repo Architect blueprint: 8 framework archetypes, structured intake, health checks, CI templates, and move map migration planning. Ensures every repo gets intentional structure, not ad-hoc folder creation.

---

## Agent Detection

RepoArchitect adapts its behavior based on which AI agent is running it. This prevents circular delegation (e.g., Codex trying to delegate to itself) and optimizes execution paths.

**Detection tool:** `Tools/detect-agent.ts` — run via `bun run ~/.claude/skills/RepoArchitect/Tools/detect-agent.ts`

**Detected agents and their capabilities:**

| Agent       | Marker                         | Can Delegate to Codex | Execution Strategy                     |
| ----------- | ------------------------------ | --------------------- | -------------------------------------- |
| Claude Code | `CLAUDECODE=1`                 | Yes                   | Delegate refactors to Codex CLI        |
| Codex CLI   | `CODEX_SANDBOX` / `CODEX_HOME` | No (circular)         | Execute moves directly                 |
| Gemini CLI  | `GEMINI_CLI_*` vars            | Yes                   | Delegate or execute directly           |
| OpenClaw    | `OPENCLAW_HOME`                | Yes                   | Delegate or execute directly           |
| Unknown     | No markers                     | No                    | Manual plan export or direct execution |

**When to detect:** At the start of ExecuteRefactor and RefactorPlan workflows. NewProject and AuditRepo don't need agent detection (no delegation involved).

**How workflows adapt:**

- **ExecuteRefactor:** If running inside Codex, executes file moves directly instead of spawning `codex exec` (which would be circular). If running inside Claude Code, delegates to Codex as designed.
- **RefactorPlan (Step 8):** Adjusts the execution options presented to the user based on which delegations are available from the current agent.

---

## DEFAULT PRINCIPLES

- Choose the organization framework that matches how the repo will be USED (runtime, data, features, packages), not just how it's built.
- Keep the root directory calm: only essential top-level folders + README + configs.
- Favor deterministic structure and conventions (names, metadata, scripts) over "tribal knowledge".
- Prefer metadata-driven indexing for RAG/data repos.
- Prefer runtime-boundary separation for Dockerized services and workflow/runtime products.
- Include tests + CI that catch structural drift (lint-for-repo-shape).
- If the repo already exists, propose a migration plan (move map + path updates + validation).

---

## TOP PRIORITIES

These override all other defaults when applicable.

### 1) Modules First

- Every capability MUST live in `src/modules/<capability>/`.
- Every module MUST expose one public entrypoint (`index.ts`).
- Target: 3-7 exports max (orchestrators + IO types).

### 2) One-Way Dependencies

- External code MAY import only `@/modules/<capability>`.
- Deep imports into module internals MUST be blocked by lint guardrails.

### 3) Provider Boundary Enforcement

- SDK imports (all 13 categories from the SDK Boundary List — Clerk, Supabase, Convex, Drizzle, Stripe, Resend, AI SDK, Composio, Sentry, Cloudflare, Vercel) MUST stay in owning module internals at `internal/providers/`.
- Skill outputs MUST include checks for provider leakage.
- See full SDK → owner module mapping in `~/.claude/PAI/USER/Plans/2026-02-26-module-first-decisions.md` Appendix A.

### 4) Auth & Tenancy

- `orgId` is the canonical tenant identifier — never provider-specific IDs in public types.
- Auth module exports `getAuthSession`, `requireAuth`, `requireOrg`, `requireOnboardedOrg`.
- Office/tenant profiles in `src/modules/offices/` backed by DB, keyed on `orgId`.

### 5) Wrap First, Rewrite Later

- ALL refactors MUST establish boundary (entrypoint + contract) before moving internals.
- No big-bang rewrites. Incremental migration only.

### 6) UI Wiring (Next.js App Router)

- Reads: Server Components call module orchestrators directly.
- Writes: Server Actions (at `src/actions/<capability>/`) call one orchestrator each.
- Charts/data: View Models (VM suffix) shaped by modules, not raw DB rows.
- Maximum 3 hops: UI → action → orchestrator.

### 7) Health Checks

- Module boundary violations: deep imports, SDK leakage, exported internals, misc-bucket drift.
- Run as part of AuditRepo workflow.

---

## Module Standard

### Canonical Module Shape

```text
src/modules/<capability>/
  index.ts              # Contract + re-exports (3-7 max)
  orchestrators/        # One function per use case (verbNoun naming)
    createClaim.ts
    verifyClaim.ts
  internal/
    types/              # Internal + public IO types
      public.ts         # Exported via index.ts
    providers/          # Optional — SDK/vendor adapters
      clerk/
      stripe/
    repo.ts             # Data access (ORM calls)
    domain.ts           # Pure business rules
```

### Module Contract Template

Every `index.ts` MUST have this header:

```ts
/**
 * Module: <capability>
 * Purpose: <what this capability owns>
 *
 * Public API:
 * - orchestratorA(input): output
 * - orchestratorB(input): output
 *
 * Exported IO Types:
 * - InputType, OutputType
 *
 * Side Effects:
 * - DB writes, cookies, network calls
 *
 * Error Behavior:
 * - typed result union | thrown errors policy
 */
```

### `src/actions/` Convention

Server Actions live at `src/actions/<capability>/<useCase>.action.ts`. Each action is a thin wrapper calling one module orchestrator. Actions are NOT modules — they're wiring.

### DB & Realtime Module Pattern

When app uses Postgres + optional realtime:

```text
src/modules/
  db/                     # System of record
    index.ts
    internal/
      providers/
        supabase/         # Or neon/
        drizzle/          # ORM
        convex/           # Optional, DB features only
  realtime/               # Optional — incremental updates
    index.ts
    internal/
      providers/
        convex/           # Or pusher, etc.
  activity/               # Canonical event log (Postgres-backed)
    index.ts
    orchestrators/
  analytics/              # Dashboard metrics (Postgres-backed)
    index.ts
    orchestrators/
```

Rule: Dashboard initial state from Postgres modules. Realtime layers provide incremental updates only.

---

## Workflow Routing

Route to the appropriate workflow based on the request.

**When executing a workflow, output this notification directly:**

```
Running the **WorkflowName** workflow in the **RepoArchitect** skill to ACTION...
```

### New Project Setup

- "new project", "start repo", "project setup", "scaffold project" -> `Workflows/NewProject.md`
  - **Context loaded:** IntakeQuestions.md, Frameworks.md, OutputSpec.md, CiTemplates.md

### Audit Existing Repo

- "audit repo", "repo health", "check structure" -> `Workflows/AuditRepo.md`
  - **Context loaded:** Frameworks.md, HealthChecks.md
  - **Note:** AuditRepo now includes module boundary checks (Category 5) when `src/modules/` exists. See HealthChecks.md.

### Plan a Refactor

- "refactor repo", "restructure", "move map" -> `Workflows/RefactorPlan.md`
  - **Context loaded:** MoveMapSpec.md, Frameworks.md, HealthChecks.md

### Execute a Refactor

- "execute refactor", "run migration", "apply move map" -> `Workflows/ExecuteRefactor.md`
  - **Context loaded:** MoveMapSpec.md, Tools/detect-agent.ts
  - **Agent-aware:** Detects current agent to decide delegation vs direct execution. See Agent Detection section.

---

## Cross-Skill Activation

| Product Type                      | Also Activate                                          |
| --------------------------------- | ------------------------------------------------------ |
| SaaS / web app with user accounts | **SaaSStandards** — for auth, onboarding, route guards |

When the product type is SaaS or a web application with user accounts, note to the user that SaaSStandards should be activated for authentication and onboarding patterns. RepoArchitect handles structure; SaaSStandards handles substance.

### Multi-Tenant SaaS Activation

When product type is SaaS with multi-tenancy:

1. Activate RepoArchitect (structure) + SaaSStandards (substance)
2. Ensure `src/modules/auth/` and `src/modules/offices/` are in the canonical tree
3. Ensure `orgId` is used as tenant FK in all schema examples
4. Include ESLint `no-restricted-imports` in CI guardrails output

---

## Context Files

| File                 | Source Blueprint          | Purpose                                                                 |
| -------------------- | ------------------------- | ----------------------------------------------------------------------- |
| `Frameworks.md`      | 02_frameworks-cheatsheet  | 8 framework archetypes + selection heuristics                           |
| `OutputSpec.md`      | 03_output-spec            | Required output sections A-G + quality criteria                         |
| `HealthChecks.md`    | 04_repo-health-checks     | 5 check categories (including module boundary) + severity + JSON schema |
| `CiTemplates.md`     | 05_ci-templates           | Hook strategies + GitHub Actions templates                              |
| `IntakeQuestions.md` | 06_intake-prompt          | AskUserQuestion-structured intake bank                                  |
| `MoveMapSpec.md`     | 07_reformat-existing-repo | Move Map format + migration order + rollback                            |

## Examples

**Example 1: New project setup**

```
User: "I need to set up a new TypeScript API project"
-> Invokes NewProject workflow
-> Runs intake questions, selects framework, generates A-G output
-> User receives canonical tree, CI config, and implementation steps
```

**Example 2: Audit existing repo**

```
User: "Check the health of my repo"
-> Invokes AuditRepo workflow
-> Scans structure, classifies framework, runs health checks
-> User receives score (e.g., 14/18) and prioritized fix list
```

**Example 3: Plan a restructure**

```
User: "My repo is messy, help me restructure it"
-> Invokes RefactorPlan workflow
-> Generates Move Map with phased migration plan
-> Offers Codex-powered execution or manual plan export
```
