---
title: "Introducing Agent Readiness"
source: "https://factory.ai/news/agent-readiness"
date_scraped: "2026-01-30"
type: documentation
tags:
  - factory-ai
  - agent-readiness
  - droid
  - codebase-maturity
---

# Introducing Agent Readiness

Factory can now evaluate how well your codebase supports autonomous development. Run `/readiness-report` to see where you stand across eight technical pillars and five maturity levels, with specific recommendations for what to fix first.

## The Invisible Bottleneck

Teams deploying AI coding agents often see uneven results. They blame the model, try a different agent, get the same thing. The real problem is usually the codebase itself.

The agent is not broken. The environment is. Missing pre-commit hooks mean the agent waits ten minutes for CI feedback instead of five seconds. Undocumented environment variables mean the agent guesses, fails, and guesses again. Build processes requiring tribal knowledge from Slack threads mean the agent has no idea how to verify its own work.

These are environment problems, not agent problems. And they compound. A codebase with poor feedback loops will defeat any agent you throw at it. A codebase with fast feedback and clear instructions will make any agent dramatically more effective.

## What We Measure

Agent Readiness evaluates repositories across eight technical pillars. Each one addresses a specific failure mode observed in production deployments:

- **Style & Validation**: Linters, type checkers, formatters. Automated tools that catch bugs instantly. Without them, agents waste cycles on syntax errors and style drift that could be caught in seconds. (Examples: ESLint, Biome, TypeScript strict mode, Prettier, Black)

- **Build System**: Build tooling and configuration that allows agents to compile, bundle, and verify changes independently.

- **Testing**: Test suites and coverage that provide fast, reliable feedback on whether changes work correctly.

- **Documentation**: Docs, READMEs, AGENTS.md, and inline comments that give agents the context they need to understand the codebase.

- **Dev Environment**: Local development setup, environment variables, and dependency management that allow agents to run and test code.

- **Code Quality**: Static analysis, complexity limits, and code organization that keep the codebase navigable and maintainable.

- **Observability**: Logging, monitoring, and alerting that help agents understand runtime behavior and diagnose issues.

- **Security & Governance**: Security scanning, branch protection, CODEOWNERS, and access controls that enforce safe development practices.

## Five Maturity Levels

Repositories progress through five levels. Each level represents a qualitative shift in what autonomous agents can accomplish:

### Level 1: Functional

Basic tooling established. The repository can be built and has some automated checks in place.

### Level 2: Documented

Processes and documentation are in place. Agents can understand project structure and conventions.

### Level 3: Standardized (Production-ready for agents)

- Clear processes defined and enforced
- Minimum bar for production-grade autonomous operation
- **Key Signals**: E2E tests exist, docs maintained, security scanning, observability
- **Agent Capability**: Routine maintenance including bug fixes, tests, docs, dependency upgrades

### Level 4: Optimized

Fast feedback loops and continuous measurement. Agents can iterate quickly and self-correct with minimal human intervention.

### Level 5: Autonomous

Self-improving systems. The codebase actively supports and accelerates autonomous development.

**Level 3 is the target. Most teams should aim here first.**

## See It in Action

Published Agent Readiness reports are available at [factory.ai/agent-readiness](https://factory.ai/agent-readiness) for popular open source projects:

| Project | Language | Level | Score |
|---------|----------|-------|-------|
| CockroachDB | Go | Level 4 | 74% |
| FastAPI | Python | Level 3 | 53% |
| Express | TypeScript | Level 2 | 28% |

CockroachDB at Level 4 has extensive CI, comprehensive testing, clear documentation, and security scanning. Express at Level 2 lacks several foundational signals. Both are successful, widely-used projects, but agents contribute more effectively to CockroachDB.

## How to Use It

Three ways to interact with Agent Readiness in Factory:

### CLI: /readiness-report

Run `/readiness-report` in Droid to evaluate any repository. The report shows your current level, which criteria pass and fail, and prioritized suggestions for what to fix first.

### Dashboard: Organization View

View organization readiness scores at [app.factory.ai/analytics/readiness](https://app.factory.ai/analytics/readiness). Track progress over time, see repository distribution across maturity levels, and identify which active repositories need attention.

The dashboard surfaces lowest-scoring active repositories (those with commits in the last 90 days) with specific remediation suggestions.

### API: Programmatic Access

Access reports via the Readiness Reports API to integrate with existing tooling. Run readiness checks in CI/CD, build custom dashboards, or set up alerting when scores drop below thresholds.

Requires API key from Settings.

## Consistent Evaluations

Agent Readiness evaluates 60+ criteria using LLMs, which introduces non-determinism challenges. The same repository could receive different scores on consecutive runs. This was solved by grounding each evaluation on the previous report for that repository. Before the fix, variance averaged 7% with spikes to 14.5%. After grounding, variance dropped to 0.6% and remained stable for six weeks across 9 benchmark repositories.

## How Scoring Works

Each criterion is binary: pass or fail. Most signals are file existence checks or configuration parsing. Does the linter config exist? Is branch protection enabled? Can tests run locally?

Criteria evaluate at two scopes:

- **Repository-scoped**: Run once for entire repo (CODEOWNERS exists, branch protection enabled)
- **Application-scoped**: Run per application in monorepos (linter configured for each app, unit tests exist for each app)

Monorepos see scores like "3/4" meaning three of four apps pass that criterion.

To unlock a level, you must pass 80% of criteria from that level and all previous levels. This gated progression emphasizes building on solid foundations rather than cherry-picking easy wins.

At the organization level, track the percentage of active repositories reaching Level 3 or higher. "80% of our active repos are agent-ready" is more actionable than "our average score is 73.2%."

## Automated Remediation

When you run a readiness report, you can kick off automated remediation from the CLI or dashboard. This spins up an agent that opens a pull request to fix failing criteria: adding missing files like AGENTS.md, configuring linters, setting up pre-commit hooks.

The initial focus is on foundational gaps. Missing documentation, absent configuration files, basic tooling that should exist in every repository. These fixes are straightforward and high-impact. What took a team days of manual configuration work happens in minutes.

After fixes are applied, re-run the readiness check to validate and refresh your score.

## The Compounding Effect

From helping organizations like Ernst & Young, Groq, and Bilt: the work compounds.

Better environments make agents more productive. More productive agents handle more work. That frees up time to improve environments further. Teams that measure this and systematically improve will pull ahead of teams that do not. The gap will widen.

This is not just about Factory. A more agent-ready codebase improves the performance of all software development agents. The investment pays dividends regardless of which tools you use.

---

**Start with `/readiness-report` on your most active repository. See where you stand. Fix the gaps. Watch your agents get better.**
