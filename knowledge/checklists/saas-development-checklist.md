# SaaS Development Checklist

**Daily reference for building production-ready SaaS applications.**
Use this when starting new projects, resuming work, or doing weekly audits.

Last updated: 2026-02-03

---

## How to Use This Checklist

- Work through sections in order for new projects
- Use as an audit tool for existing projects (check what's missing)
- Each item links to the skill or workflow that handles it
- Mark items as you complete them: `- [x]` in your editor
- **Phase 0 is prerequisite** — do this ONCE, then maintain it

---

## Phase 0: Toolbox Setup (Do This First)

**You can't build production-ready apps without the right tools installed and working.**

### 0A. Core PAI Skills (Verify Installed & Triggering)

These are the skills you already have. Verify each one triggers correctly.

**Planning & Thinking:**

- [ ] `/RalphPlan` — Autonomous planning with adaptive questioning and spec generation
- [ ] `/HITLPlan` — Human-in-the-loop planning with parallel research agents
- [ ] `plan:quick-plan` — Quick implementation specs through codebase analysis
- [ ] `plan:interview-me` — Analyze and refine existing specs by identifying gaps
- [ ] `/FirstPrinciples` — First principles decomposition and root cause analysis
- [ ] `/Council` — Multi-agent debate for diverse perspective analysis
- [ ] `/BeCreative` — Extended thinking mode for deep reasoning and creative tasks
- [ ] `/RedTeam` — Adversarial analysis with 32 specialized critique agents
- [ ] `/Evals` — Agent evaluation framework for comparing solutions objectively

**Building & Architecture:**

- [ ] `/RepoArchitect` — Repository structure via 7 framework archetypes
- [ ] `/SaaSStandards` — Auth, onboarding, route guards, state management
- [ ] `/CreateCLI` — TypeScript CLI application generator
- [ ] `/CreateSkill` — Skill creation, validation, and canonicalization
- [ ] `/AppsScript` — Google Apps Script development
- [ ] `/GitWorkflow` — Smart Git workflow with submodule awareness
- [ ] `/Browser` — Debug-first browser automation with console/network capture

**Development Process (superpowers):**

- [ ] `superpowers:brainstorming` — Must use before any creative/feature work
- [ ] `superpowers:test-driven-development` — Before writing implementation code
- [ ] `superpowers:systematic-debugging` — On any bug or unexpected behavior
- [ ] `superpowers:requesting-code-review` — After completing major features
- [ ] `superpowers:receiving-code-review` — When getting feedback on code
- [ ] `superpowers:verification-before-completion` — Before claiming work is done
- [ ] `superpowers:writing-plans` — When you have specs for multi-step tasks
- [ ] `superpowers:executing-plans` — When implementing from a written plan
- [ ] `superpowers:subagent-driven-development` — For parallel task execution
- [ ] `superpowers:finishing-a-development-branch` — When feature is complete
- [ ] `superpowers:using-git-worktrees` — For isolated feature work
- [ ] `superpowers:dispatching-parallel-agents` — For 2+ independent tasks

**Research & Analysis:**

- [ ] `/Research` — Multi-mode research (quick, standard, extensive)
- [ ] `/Fabric` — 240+ prompt patterns for content analysis
- [ ] `/OSINT` — Open source intelligence for due diligence
- [ ] `/WebAssessment` — Web application security testing

**Content & Marketing:**

- [ ] `/copywriting` — Marketing copy for landing pages, features, pricing
- [ ] `/landing-page` — Single-file HTML landing pages
- [ ] `/marketing-ideas` — 139 proven marketing approaches
- [ ] `/email-sequence` — Drip campaigns and lifecycle emails
- [ ] `/SocialMedia` — LinkedIn, Twitter, Instagram posts
- [ ] `/BrandGuidelines` — Multi-brand identity system
- [ ] `/AwesomeReadme` — Story-driven GitHub READMEs
- [ ] `/Art` — Visual content, diagrams, illustrations

**Operations & Memory:**

- [ ] `/bd-resume-client` — Resume client context from Beads memory
- [ ] `/bd-capture-context` — Capture session context to Beads memory
- [ ] `/brief-update` — Daily brief with calendar, tasks, emails
- [ ] `documentation:update-claude` — Keep CLAUDE.md current
- [ ] `/VoiceNotes` — Process voice notes end-to-end

### 0B. Community Skills to Install (from AOJ-201)

**High Priority — Install these first:**

- [ ] Supabase best practices:
  ```
  npx skills add https://github.com/supabase/agent-skills --skill supabase-postgres-best-practices
  ```
- [ ] UI/UX reviews:
  ```
  npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max
  ```
- [ ] Tailwind design system:
  ```
  npx skills add https://github.com/wshobson/agents --skill tailwind-design-system
  ```
- [ ] Frontend code review:
  ```
  npx skills add https://github.com/langgenius/dify --skill frontend-code-review
  ```

**Medium Priority:**

- [ ] Programmatic SEO:
  ```
  npx skills add https://github.com/coreyhaines31/marketingskills --skill programmatic-seo
  ```
- [ ] Canvas design:
  ```
  npx skills add https://github.com/anthropics/skills --skill canvas-design
  ```
- [ ] Theme factory:
  ```
  npx skills add https://github.com/anthropics/skills --skill theme-factory
  ```
- [ ] Release skills:
  ```
  npx skills add https://github.com/jimliu/baoyu-skills --skill release-skills
  ```
- [ ] Python performance (Finance Guru):
  ```
  npx skills add https://github.com/wshobson/agents --skill python-performance-optimization
  ```

### 0C. Custom Skills to Build

- [ ] **Plaid API skill** — AOJ-226: Build for Finance Guru project
- [ ] **DCN v2 analysis** — AOJ-224: Analyze video at https://youtu.be/7kdDLp-SOsU

### 0D. Infrastructure Check

- [ ] `linearis` CLI working (`linearis issues list`)
- [ ] `bun` installed and current
- [ ] `gh` CLI authenticated
- [ ] Supabase CLI installed (if using Supabase)
- [ ] Beads CLI working (`bd list`)
- [ ] Voice server running (optional: `curl http://localhost:8888/status`)

---

## Phase 1: Planning & Architecture

*Prerequisite: Phase 0 complete — your tools are ready.*

### 1A. Requirements Gathering

Pick the right planning tool for the situation:

| Situation | Skill to Use |
|-----------|-------------|
| Need autonomous spec from scratch | `/RalphPlan` |
| Want to plan collaboratively (back and forth) | `/HITLPlan` |
| Have existing spec, need to fill gaps | `plan:interview-me` |
| Need quick implementation steps | `plan:quick-plan` |
| Problem is ambiguous, need root cause | `/FirstPrinciples` |
| Multiple valid approaches, need to pick one | `/Council` |
| Need creative divergent thinking first | `/BeCreative` |
| Want to stress-test the plan | `/RedTeam` |
| Want to compare two approaches objectively | `/Evals` |

- [ ] Requirements gathered using appropriate planning skill
- [ ] Spec documented and reviewed
- [ ] Plan stress-tested with `/RedTeam` (for non-trivial features)

### 1B. Repository Structure

- [ ] **Run `/RepoArchitect` NewProject workflow** — selects from 7 framework archetypes
- [ ] Canonical directory tree generated with NOW/LATER markers
- [ ] Naming conventions documented
- [ ] `check-structure.sh` health check script created
- [ ] GitHub Actions CI config for structural drift detection
- [ ] `.claude/CLAUDE.md` initialized with project context

### 1C. Tech Stack Decisions

- [ ] Framework selected (Next.js App Router / Pages Router / React SPA / other)
- [ ] Database selected (Supabase / PostgreSQL / Firebase / other)
- [ ] Auth provider selected (Supabase Auth / NextAuth / Clerk / other)
- [ ] Hosting/deployment decided (Vercel / Cloudflare / AWS / other)
- [ ] Package manager chosen (bun preferred, pnpm, npm)

---

## Phase 2: Authentication & Onboarding

Run `/SaaSStandards` ScaffoldAuth workflow or audit with AuditSignupFlow.

### 2A. Signup Flow

- [ ] `/signup` route exists
- [ ] Email + password fields with validation
- [ ] Password strength meter (NIST 800-63B Rev 4 compliant)
- [ ] Breached password check (HaveIBeenPwned API)
- [ ] Confirm password field
- [ ] Terms of Service / Privacy Policy checkbox
- [ ] Duplicate email handling (inline error)
- [ ] Post-signup redirect goes to `/onboarding` (NOT dashboard)

### 2B. Onboarding Wizard

- [ ] `/onboarding` route exists with multi-step wizard
- [ ] **Required fields collected:**
  - [ ] first_name, last_name
  - [ ] role / position
  - [ ] organization_name
  - [ ] organization_phone
  - [ ] organization_location
  - [ ] team_size
- [ ] **Healthcare-specific (if applicable):**
  - [ ] practice_type, NPI_number
  - [ ] number_of_providers, number_of_staff
  - [ ] HIPAA_BAA_accepted
- [ ] Data saves per step (not just at the end)
- [ ] Progress indicator visible
- [ ] `onboarding_completed` flag set on completion
- [ ] Redirect to `/dashboard` after completion

### 2C. Route Guards

- [ ] Auth middleware exists (unauthenticated -> /login)
- [ ] Onboarding guard exists (un-onboarded -> /onboarding)
- [ ] Dashboard inaccessible without auth + onboarding
- [ ] /signup and /login redirect to /dashboard if already authenticated
- [ ] API routes return 401/403 for unauthorized requests

### 2D. Database Schema

- [ ] Separate `users` table (auth only)
- [ ] Separate `profiles` table (personal info)
- [ ] Separate `organizations` table (business info)
- [ ] `memberships` join table (user <-> organization)
- [ ] `onboarding_completed` boolean on users table
- [ ] Required fields are NOT NULL

---

## Phase 3: State Management

Run `/SaaSStandards` AuditStateManagement workflow (interview-based, unbiased).

### 3A. State Architecture Audit

- [ ] **Server state layer identified** — Where does data live? What tool manages it?
  - [ ] TanStack Query for client-component data fetching (recommended for Supabase SaaS)
  - [ ] OR Server Components + Server Actions for simple CRUD pages
  - [ ] OR SWR / Apollo for specific use cases
- [ ] **Client state layer identified** — What UI-only state is shared across components?
  - [ ] Zustand for cross-component UI state (wizard, selections, notifications)
  - [ ] OR useState for single-component state (default, no library needed)
- [ ] **URL state layer identified** — What's bookmarkable/shareable?
  - [ ] useSearchParams or nuqs for filters, sort, search, pagination
- [ ] **Form state layer identified** — How are forms managed?
  - [ ] React Hook Form + Zod for moderate-complex forms
  - [ ] OR useActionState for simple server-first forms
- [ ] **Real-time state layer identified** — What needs live updates?
  - [ ] Supabase Realtime for DB change subscriptions
  - [ ] OR Pusher/Socket.io for custom backends
  - [ ] OR "not needed yet" (document when it will be)

### 3B. State Management Anti-Patterns Check

- [ ] NOT using a client state library (Zustand/Redux) for server data caching
- [ ] NOT putting everything in one global store
- [ ] NOT avoiding libraries when complexity warrants them
- [ ] NOT using useState with 5+ hooks in one component (extract hook or use store)
- [ ] HIPAA: No PHI stored in client state, localStorage, or sessionStorage
- [ ] HIPAA: All caches clear on logout

---

## Phase 4: Core Feature Development

### 4A. Development Process (Per Feature)

- [ ] **Plan before code** — Use appropriate planning skill from Phase 1A table
- [ ] **Brainstorm first** — Use `superpowers:brainstorming` before building new features
- [ ] **TDD approach** — Use `superpowers:test-driven-development` before writing implementation
- [ ] **Systematic debugging** — Use `superpowers:systematic-debugging` for any bugs
- [ ] **Code review** — Use `superpowers:requesting-code-review` after each major feature
- [ ] **Verification** — Use `superpowers:verification-before-completion` before saying "done"

### 4B. Git Workflow

- [ ] Feature branches for each piece of work
- [ ] Smart commits via `/git:commit` with auto-push
- [ ] Use `superpowers:finishing-a-development-branch` when feature complete
- [ ] PRs for review before merging to main

### 4C. Browser Verification

- [ ] Use `/Browser` skill to verify UI changes (screenshots, not assumptions)
- [ ] Console errors checked after each deployment
- [ ] Mobile responsiveness verified

---

## Phase 5: Testing

### 5A. Critical Path E2E Tests

- [ ] New user signup -> lands on onboarding
- [ ] Onboarding completion -> lands on dashboard
- [ ] Un-onboarded user cannot access dashboard
- [ ] Returning onboarded user login -> dashboard
- [ ] Duplicate email signup -> error
- [ ] Direct URL to dashboard while unauthenticated -> login
- [ ] Weak password shows inline validation

### 5B. Feature Tests

- [ ] Each major feature has at least happy-path test coverage
- [ ] Edge cases tested for critical business logic
- [ ] Form validation tested (client + server)

---

## Phase 6: Security & Compliance

### 6A. General Security

- [ ] No secrets in git history (.env, API keys, credentials)
- [ ] Environment variables for all sensitive config
- [ ] HTTPS enforced
- [ ] CORS configured properly
- [ ] Rate limiting on auth endpoints

### 6B. Healthcare/HIPAA (if applicable)

- [ ] HIPAA BAA accepted during onboarding
- [ ] PHI never in client state, URLs, or localStorage
- [ ] Audit logging enabled
- [ ] Session timeout configured
- [ ] Data encryption at rest and in transit
- [ ] RLS (Row Level Security) enabled in Supabase

---

## Phase 7: Pre-Launch

### 7A. Documentation

- [ ] README with setup instructions — Use `/AwesomeReadme`
- [ ] CLAUDE.md updated with current project context — Use `documentation:update-claude`
- [ ] API documentation if applicable

### 7B. Branding & Content

- [ ] Brand guidelines applied — Use `/BrandGuidelines`
- [ ] Landing page created — Use `/landing-page`
- [ ] Social media content prepared — Use `/SocialMedia`
- [ ] Email sequences set up — Use `/email-sequence`
- [ ] Marketing copy reviewed — Use `/copywriting`

### 7C. Final Audit

- [ ] `/SaaSStandards` AuditSignupFlow — full compliance check
- [ ] `/SaaSStandards` AuditStateManagement — architecture verification
- [ ] `/RepoArchitect` AuditRepo — structural health check
- [ ] `/WebAssessment` — security vulnerability scan

---

## Weekly Audit Routine

Run these on Monday mornings:

1. [ ] Open this checklist — check against current project state
2. [ ] `/brief-update` — daily brief with calendar, tasks, emails
3. [ ] `/bd-resume-client` — resume Beads context for active clients
4. [ ] `linearis issues list --state "In Progress"` — review Linear backlog
5. [ ] Run `/SaaSStandards` AuditSignupFlow on active SaaS projects
6. [ ] Run `/RepoArchitect` AuditRepo on repos with recent changes
7. [ ] `/bd-capture-context` — capture any decisions/follow-ups
