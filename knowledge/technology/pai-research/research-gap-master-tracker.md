---
title: "PAI Research Gap Master Tracker: All Recommendations Consolidated"
date: 2026-02-02
status: active-tracking
gaps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
tags: [PAI, master-tracker, recommendations, research-gaps, ISC]
---

# PAI Research Gap Master Tracker

## Summary Statistics

| Metric | Count |
|--------|-------|
| **Total Unique Recommendations** | 85 |
| **Source Documents** | 6 |
| **Research Gaps Covered** | 12 (Gaps 1-12) |
| **Cross-Document Duplicates Identified** | 7 |

### By Priority

| Priority | Count | Percentage |
|----------|-------|------------|
| P1 (Immediate) | 30 | 35% |
| P2 (Near-Term) | 30 | 35% |
| P3 (Future) | 25 | 30% |

### By Domain

| Domain | Count |
|--------|-------|
| Tech | 55 |
| Business | 12 |
| Both | 18 |

### By Effort

| Effort | Count |
|--------|-------|
| Low | 20 |
| Medium | 36 |
| High | 19 |
| Very High | 10 |

### By Impact

| Impact | Count |
|--------|-------|
| Critical | 5 |
| High | 45 |
| Medium | 32 |
| Low | 3 |

### Implementation Status (Audited 2026-02-02)

| Status | Count |
|--------|-------|
| DONE | 10 |
| PARTIAL | 5 |
| NATIVE | 1 |
| NOT_STARTED | 74 |

**Evidence of completed work:**

- **REC-001 DONE** -- All sampled skill descriptions are <100 chars (range 45-75 chars). Structured `triggers:` arrays present in all frontmatter.
- **REC-002 DONE** -- `category:` field exists in all skill frontmatter (e.g., `research-and-analysis`, `content-creation`, `development`, `reasoning`).
- **REC-005 DONE** -- `~/.claude/MEMORY/STATE-DECISION-TREE.md` exists (9.1KB). Full decision matrix and flowchart for WORK/, STATE/, LEARNING/, Beads, Tasks.
- **REC-006 DONE** -- `~/.claude/MEMORY/BEADS-WORK-INTEGRATION.md` exists (10KB). Documents when both systems activate and how they coordinate.
- **REC-007 PARTIAL** -- `scripts/beads-helpers/migrate-tasks-to-beads.sh` exists (6.3KB). Script present but no evidence of automatic session-end trigger.
- **REC-008 PARTIAL** -- `scripts/beads-helpers/validate-state.sh` exists (detects duplicates, orphans, stale state). Not integrated as automatic hook.
- **REC-010 DONE** -- `hooks/lib/hook-runner.ts` implements 3-tier timeout: fast=100ms, standard=5s, llm=20s. All hooks use `withTimeout()` wrapper.
- **REC-011 DONE** -- `MEMORY/STATE/hook-health.json` exists with per-hook metrics: latency, timeoutCount, errorCount, runCount, tier classification.
- **REC-012 DONE** -- `UserPromptOrchestrator.hook.ts` batches 5 hooks into 1 entry point, batches 2 LLM calls into 1 (`batchedLLMInference`).
- **REC-013 PARTIAL** -- `hooks/lib/lock.ts` implements `withLock()` with flock-based advisory locking. However, no hooks currently import/use it.
- **REC-014 NATIVE** -- Claude Code Task tool natively supports `blockedBy` parameter. CORE/SKILL.md documents fan-out, fan-in, and pipeline patterns.
- **REC-031 DONE** -- `skill-index.json` exists (24KB, 48 skills) with `tier: "always"|"deferred"` field. `GenerateSkillIndex.ts` and `SkillSearch.ts` tools exist.
- **REC-041 PARTIAL** -- `hooks/lib/observability.ts` sends events to localhost:4000 dashboard. Partial: only AgentOutputCapture uses it, not all hooks.
- **REC-047 PARTIAL** -- Agent routing heuristic documented in CORE/SKILL.md Capabilities Selection table and MCS Quick Check. Not a standalone decision tree tool.
- **REC-055 PARTIAL** -- Browser skill has `version: 2.0.0` in frontmatter. Only 1 of 48 skills has versioning. Deprecated PresentationSuite has version too.
- **REC-058 DONE** -- Hook overlap resolved: `UserPromptOrchestrator.hook.ts` explicitly REPLACES FormatReminder, AutoWorkCreation, ExplicitRatingCapture, ImplicitSentimentCapture, UpdateTabTitle.

---

## P1 Recommendations (Immediate)

| ID | Source Gaps | Original ID | Title | Impact | Effort | Domain | Status | Dependencies |
|----|------------|-------------|-------|--------|--------|--------|--------|--------------|
| REC-001 | 1 | 1.1 | Optimize skill descriptions to <100 chars with structured triggers array | High | Medium | Tech | DONE (all sampled descriptions 45-75 chars; triggers arrays present in all frontmatter) | None |
| REC-002 | 1 | 1.2 | Create skill categories -- add category field to frontmatter | High | Low | Tech | DONE (category field in all 48 skill frontmatter blocks; skill-index.json includes category) | None |
| REC-003 | 9 | 9.1 | Implement aggressive conversation truncation (last 15-20 turns full) | High | Medium | Tech | NOT_STARTED | None |
| REC-004 | 9 | 9.2 | Add skill unloading for skills not invoked in last 5 turns | High | Medium | Tech | NOT_STARTED | None |
| REC-005 | 2 | 2-P1-1 | Create state mechanism decision tree (when to use which persistence) | High | Low | Tech | DONE (~/.claude/MEMORY/STATE-DECISION-TREE.md, 9.1KB with decision matrix and flowchart) | None |
| REC-006 | 2 | 2-P1-2 | Document Beads <-> WORK/ integration pattern for multi-session deliverables | High | Low | Tech | DONE (~/.claude/MEMORY/BEADS-WORK-INTEGRATION.md, 10KB with activation triggers and coordination) | None |
| REC-007 | 2 | 2-P1-3 | Add Task -> Beads migration tool for session-end persistence | Medium | Medium | Tech | PARTIAL (scripts/beads-helpers/migrate-tasks-to-beads.sh exists 6.3KB; no auto session-end trigger) | REC-005 |
| REC-008 | 2 | 2-P1-4 | Implement state conflict detection between WORK/ and Beads | High | Medium | Tech | PARTIAL (scripts/beads-helpers/validate-state.sh detects duplicates/orphans/stale; not auto-triggered) | REC-005, REC-006 |
| REC-009 | 2 | 2-P1-5 | Add semantic search to LEARNING/ directory | High | High | Tech | NOT_STARTED | None |
| REC-010 | 3 | 3-P1-1 | Hook timeout policy -- global standards (fast=100ms, standard=5s, LLM=20s) | High | Low | Tech | DONE (hooks/lib/hook-runner.ts: fast=100ms, standard=5s, llm=20s; all hooks wrapped) | None |
| REC-011 | 3 | 3-P1-2 | Hook error dashboard -- STATE/hook-health.json with failure tracking | High | Medium | Tech | DONE (MEMORY/STATE/hook-health.json tracks latency, timeouts, errors, runCount per hook) | REC-010 |
| REC-012 | 3 | 3-P1-3 | Prompt-based hook batching -- 3 LLM calls into 1 per user prompt | High | Medium | Tech | DONE (UserPromptOrchestrator batches 5 hooks into 1 entry, 2 LLM calls into 1 batchedLLMInference) | None |
| REC-013 | 3, 11 | 3-P1-4 | Agent collision detection -- file locking for shared state files | High | Low | Tech | PARTIAL (hooks/lib/lock.ts implements withLock via flock; not yet imported by any active hook) | None |
| REC-014 | 11 | 3-P1-5 | Task dependency API -- add depends_on parameter to Task tool | Medium | Medium | Tech | NATIVE (Claude Code Task tool has native blockedBy parameter; CORE/SKILL.md documents patterns) | None |
| REC-015 | 4 | 4.1 | Implement skill usage telemetry -- log invocations to OBSERVABILITY/ | Critical | Low | Tech | NOT_STARTED | None |
| REC-016 | 4 | 4.2 | Create specialization scorecard -- 5-point checklist for new skill creation | High | Low | Both | NOT_STARTED | None |
| REC-017 | 6 | 6.1 | Define skill lifecycle stages -- add lifecycle field to frontmatter | High | Low | Tech | NOT_STARTED | None |
| REC-018 | 6 | 6.2 | Conduct initial skill audit -- classify 48 skills by usage frequency | Medium | Low | Tech | NOT_STARTED | None |
| REC-019 | 4 | 4.3 | Merge 4 researcher agents into single parameterized Research agent | High | Medium | Tech | NOT_STARTED | None |
| REC-020 | 5 | 5-P1-1 | Data sensitivity classifier -- tag prompts as PUBLIC/INTERNAL/CONFIDENTIAL/HIPAA | Critical | Medium | Both | NOT_STARTED | None |
| REC-021 | 5 | 5-P1-2 | Model privacy registry -- model-privacy.json mapping models to privacy tiers | High | Low | Tech | NOT_STARTED | None |
| REC-022 | 5 | 5-P1-3 | Ollama integration for Inference.ts -- local model backend for sensitive data | Critical | Medium | Tech | NOT_STARTED | REC-021 |
| REC-023 | 7 | 5-P1-4 | Model routing table -- task-to-model mapping with cost/quality/privacy metadata | High | Medium | Tech | NOT_STARTED | REC-021 |
| REC-024 | 5 | 5-P1-5 | Prompt sanitization layer -- redact client/practice names before external APIs | Critical | Medium | Both | NOT_STARTED | REC-020 |
| REC-025 | 8 | 8-P1-1 | Instrument skill usage telemetry (hook logging invocations) | High | Low | Tech | NOT_STARTED | CROSS-DOC: see REC-015 |
| REC-026 | 12 | 8-P1-2 | Classify all 45 skills into lifecycle stages (Alpha/Beta/Stable/Maintenance) | High | Low | Tech | NOT_STARTED | CROSS-DOC: see REC-017 |
| REC-027 | 8 | 8-P1-3 | Create PAI build-vs-rent decision checklist | Medium | Low | Both | NOT_STARTED | None |
| REC-028 | 10 | 8-P1-4 | Draft ownership mentality scorecard for Today's Dental consulting | High | Medium | Business | NOT_STARTED | None |
| REC-029 | 8, 12 | 8-P1-5 | Identify and audit top 5 most-used and top 5 least-used skills | Medium | Low | Tech | NOT_STARTED | CROSS-DOC: see REC-018 |
| REC-030 | 5 | 5-P1-6 | Critical: All researcher agents have identical unrestricted permissions | Critical | Medium | Tech | NOT_STARTED | REC-020, REC-021 |

---

## P2 Recommendations (Near-Term)

| ID | Source Gaps | Original ID | Title | Impact | Effort | Domain | Status | Dependencies |
|----|------------|-------------|-------|--------|--------|--------|--------|--------------|
| REC-031 | 1 | 1.3 | Implement lazy skill loading with skill-index.json | High | High | Tech | DONE (skill-index.json 24KB with tier:always/deferred; GenerateSkillIndex.ts + SkillSearch.ts tools) | REC-002 |
| REC-032 | 1 | 1.4 | Split large skills (30KB+) into core + extensions | Medium | Medium | Tech | NOT_STARTED | REC-031 |
| REC-033 | 9 | 9.3 | Implement task-aware budget allocation (coding/research/planning profiles) | Medium | Medium | Tech | NOT_STARTED | None |
| REC-034 | 9 | 9.4 | Auto-spawn subagent on context pressure (>140K tokens threshold) | High | High | Tech | NOT_STARTED | REC-033 |
| REC-035 | 2 | 2-P2-6 | Auto-link WORK/ to Beads on client directory detection | Medium | Low | Tech | NOT_STARTED | REC-006 |
| REC-036 | 2 | 2-P2-7 | Implement ISC -> Tasks auto-conversion for complex criteria | Medium | Medium | Tech | NOT_STARTED | REC-014 |
| REC-037 | 2 | 2-P2-8 | Add temporal versioning to Beads issues (valid_at/invalid_at) | Medium | High | Tech | NOT_STARTED | None |
| REC-038 | 2 | 2-P2-9 | Create unified state query interface across all persistence mechanisms | High | High | Tech | NOT_STARTED | REC-005 |
| REC-039 | 2 | 2-P2-10 | Implement auto-resume for multi-session projects from STATE/progress/ | Medium | Medium | Tech | NOT_STARTED | None |
| REC-040 | 3 | 3-P2-6 | Hook circuit breaker -- disable after 3 consecutive failures | High | Medium | Tech | NOT_STARTED | REC-010, REC-011 |
| REC-041 | 3 | 3-P2-7 | Structured hook logging -- JSONL in MEMORY/OBSERVABILITY/hooks.jsonl | Medium | Low | Tech | PARTIAL (hooks/lib/observability.ts sends to localhost:4000; only AgentOutputCapture uses it) | None |
| REC-042 | 11 | 3-P2-8 | Agent state bus -- message-passing layer for inter-agent communication | High | High | Tech | NOT_STARTED | REC-013 |
| REC-043 | 3 | 3-P2-9 | Hook skip mechanism -- PAI_SKIP_HOOKS env var for development | Medium | Low | Tech | NOT_STARTED | None |
| REC-044 | 11 | 3-P2-10 | Agent retry limits -- max_retries parameter with exponential backoff | Medium | Medium | Tech | NOT_STARTED | None |
| REC-045 | 4 | 4.4 | Define Goldilocks zone for PAI -- identify 5-8 hot path skills from telemetry | High | Medium | Both | NOT_STARTED | REC-015 |
| REC-046 | 6 | 6.3 | Implement quarterly skill review from telemetry data | High | Medium | Both | NOT_STARTED | REC-015 |
| REC-047 | 4 | 4.5 | Create agent routing heuristic -- decision tree for agent selection | Medium | Medium | Tech | PARTIAL (CORE/SKILL.md has Capabilities Selection table + MCS Quick Check; not standalone tool) | None |
| REC-048 | 6 | 6.4 | Build Monte Carlo sell trigger model for skill deprecation | High | High | Both | NOT_STARTED | REC-015 |
| REC-049 | 6 | 6.5 | Define skill overvaluation metrics -- composite cost/value score | Medium | Medium | Both | NOT_STARTED | REC-015 |
| REC-050 | 7 | 5-P2-6 | Multi-model performance telemetry -- log latency, tokens, quality per model | High | Medium | Tech | NOT_STARTED | None |
| REC-051 | 7 | 5-P2-7 | Cross-model verification protocol for high-stakes consulting deliverables | High | Medium | Both | NOT_STARTED | REC-050 |
| REC-052 | 7 | 5-P2-8 | Researcher agent cost optimization -- Sonnet outer shell for simple tasks | Medium | Low | Tech | NOT_STARTED | None |
| REC-053 | 7 | 5-P2-9 | Semantic router integration (LiteLLM-style) for auto model selection | High | High | Tech | NOT_STARTED | REC-050, REC-023 |
| REC-054 | 5 | 5-P2-10 | Privacy audit trail -- append-only log of data classification and routing | High | Medium | Both | NOT_STARTED | REC-020, REC-021 |
| REC-055 | 12 | 8-P2-6 | Implement semantic versioning for top 10 skills (VERSION + CHANGELOG) | Medium | Medium | Tech | PARTIAL (Browser has version:2.0.0; only 1 of 48 active skills versioned) | None |
| REC-056 | 12 | 8-P2-7 | Build skill dependency graph with dependencies.json schema | High | Medium | Tech | NOT_STARTED | None |
| REC-057 | 8 | 8-P2-8 | Develop Anthropic dependency risk mitigation plan (quarterly model tests) | High | Medium | Both | NOT_STARTED | None |
| REC-058 | 8, 12 | 8-P2-9 | Create hook overlap audit (ExplicitRating vs ImplicitSentiment, etc.) | Medium | Medium | Tech | DONE (UserPromptOrchestrator explicitly REPLACES 5 overlapping hooks; overlap resolved) | CROSS-DOC: see REC-046 |
| REC-059 | 10 | 8-P2-10 | Establish quarterly Ownership Mentality Index (OMI) reporting for clients | Medium | Medium | Business | NOT_STARTED | REC-028 |
| REC-060 | 5, 7 | 5-P2-11 | Enforce model-level permissions so researcher agents respect privacy tiers | High | Medium | Tech | NOT_STARTED | REC-020, REC-021 |

---

## P3 Recommendations (Future)

| ID | Source Gaps | Original ID | Title | Impact | Effort | Domain | Status | Dependencies |
|----|------------|-------------|-------|--------|--------|--------|--------|--------------|
| REC-061 | 1 | 1.5 | Implement semantic skill clustering (related skills load as investigation cluster) | High | High | Tech | NOT_STARTED | REC-031 |
| REC-062 | 1 | 1.6 | Create skill profiling system -- track frequency, tokens, success rate | Medium | Medium | Tech | NOT_STARTED | REC-015 |
| REC-063 | 9 | 9.5 | Implement external memory layer (Anthropic memory tool pattern) | High | Very High | Tech | NOT_STARTED | REC-009 |
| REC-064 | 9 | 9.6 | Dynamic skill summarization -- replace dormant skills with AI summaries | High | High | Tech | NOT_STARTED | REC-004 |
| REC-065 | 2 | 2-P3-11 | Adopt Letta-style self-editing memory (agents update WORK/LEARNING directly) | High | Very High | Tech | NOT_STARTED | REC-009 |
| REC-066 | 2 | 2-P3-12 | Implement Mem0 two-phase memory extraction (auto extract from conversations) | Medium | High | Tech | NOT_STARTED | REC-009 |
| REC-067 | 2 | 2-P3-13 | Add graph-based relationship tracking (Zep/Mem0g approach) | Medium | Very High | Tech | NOT_STARTED | REC-009, REC-037 |
| REC-068 | 2 | 2-P3-14 | Build cross-repository state sync for Beads multi-repo support | Medium | High | Tech | NOT_STARTED | REC-038 |
| REC-069 | 2 | 2-P3-15 | Create state migration tooling for upgrading persistence mechanisms | Low | Medium | Tech | NOT_STARTED | None |
| REC-070 | 3 | 3-P3-11 | Hook marketplace architecture -- user-contributed hooks with sandboxing | High | Very High | Tech | NOT_STARTED | REC-040 |
| REC-071 | 11 | 3-P3-12 | Agent orchestration DSL -- LangGraph-inspired graph-based workflows | High | Very High | Tech | NOT_STARTED | REC-042 |
| REC-072 | 11 | 3-P3-13 | Operational transformation for agents -- OT-based concurrent editing | High | Very High | Tech | NOT_STARTED | REC-042, REC-071 |
| REC-073 | 3 | 3-P3-14 | Hook performance SLOs (UserPromptSubmit hooks < 2s total) | Medium | Medium | Tech | NOT_STARTED | REC-011 |
| REC-074 | 11 | 3-P3-15 | Agent context summarization (auto-summarize when approaching limits) | Medium | Medium | Tech | NOT_STARTED | REC-034 |
| REC-075 | 4 | 4.6 | Implement dynamic agent composition from trait primitives on-demand | High | Very High | Tech | NOT_STARTED | REC-019, REC-047 |
| REC-076 | 4 | 4.7 | Build specialization cost calculator (token overhead, discovery impact) | Medium | High | Both | NOT_STARTED | REC-015 |
| REC-077 | 6 | 6.6 | Automated skill sunset pipeline (deprecation warning -> archive after 90 days) | High | High | Tech | NOT_STARTED | REC-017, REC-015 |
| REC-078 | 6 | 6.7 | Skill health dashboard -- 2x2 matrix (frequency vs value) visualization | Medium | Medium | Both | NOT_STARTED | REC-015, REC-017 |
| REC-079 | 4 | 4.8 | Cross-skill dependency mapping via co-occurrence analysis from telemetry | Medium | Medium | Tech | NOT_STARTED | REC-015 |
| REC-080 | 7 | 5-P3-11 | Multi-agent debate protocol (A-HMAD-style learned consensus) | High | Very High | Tech | NOT_STARTED | REC-051 |
| REC-081 | 5 | 5-P3-12 | Federated learning for client models (fine-tune without data transmission) | High | Very High | Both | NOT_STARTED | REC-022 |
| REC-082 | 5 | 5-P3-13 | Confidential computing integration (Apple Secure Enclave, Intel TDX) | High | Very High | Tech | NOT_STARTED | REC-022 |
| REC-083 | 7 | 5-P3-14 | Dynamic model capability discovery -- auto-benchmark and update routing | High | High | Tech | NOT_STARTED | REC-053 |
| REC-084 | 7 | 5-P3-15 | Agent communication protocol adoption (A2A or MCP-based inter-agent) | High | High | Tech | NOT_STARTED | REC-042 |
| REC-085 | 12 | 8-P3-11 | Build automated skill health dashboard from telemetry data | High | High | Tech | NOT_STARTED | CROSS-DOC: see REC-078 |

**Note:** The following P3 recs from Doc 6 (Gaps 8, 10, 12) are consolidated:

| ID | Source Gaps | Original ID | Title | Impact | Effort | Domain | Status | Dependencies |
|----|------------|-------------|-------|--------|--------|--------|--------|--------------|
| REC-086 | 12 | 8-P3-12 | Implement skill retirement pipeline (Stable -> Maintenance -> Deprecated -> Archived) | High | High | Tech | NOT_STARTED | CROSS-DOC: see REC-077 |
| REC-087 | 8 | 8-P3-13 | Create PAI Annual Report (infrastructure investments, measured value, lessons) | Medium | Medium | Both | NOT_STARTED | REC-015 |
| REC-088 | 8 | 8-P3-14 | Develop multi-model abstraction layer (capability tiers, not model names) | High | Very High | Tech | NOT_STARTED | REC-023, REC-022 |
| REC-089 | 10 | 8-P3-15 | Publish Ownership Mentality Framework as standalone consulting deliverable | High | Medium | Business | NOT_STARTED | REC-028, REC-059 |
| REC-090 | 5, 7 | SYNTH-1 | Implement hierarchical router with parallel verification (recommended pattern) | High | High | Tech | NOT_STARTED | REC-020, REC-023, REC-051 |

---

## Cross-Document Deduplication Notes

The following recommendations appear in multiple documents with overlapping scope. The primary ID is the canonical entry; the cross-reference ID should be considered a duplicate.

| Primary ID | Cross-Ref ID | Primary Source | Cross-Ref Source | Topic | Resolution |
|------------|-------------|----------------|-----------------|-------|------------|
| REC-015 | REC-025 | Gap 4 (4.1) | Gap 8 (8-P1-1) | Skill usage telemetry | MERGED: Both recommend identical telemetry hook. Use REC-015 as canonical. REC-025 retained with cross-reference tag. |
| REC-017 | REC-026 | Gap 6 (6.1) | Gap 12 (8-P1-2) | Skill lifecycle stages in frontmatter | MERGED: Both recommend adding lifecycle metadata to skills. Use REC-017 as canonical. REC-026 retained with cross-reference tag. |
| REC-018 | REC-029 | Gap 6 (6.2) | Gap 8/12 (8-P1-5) | Initial skill audit by usage | MERGED: Both recommend classifying skills by frequency. Use REC-018 as canonical. REC-029 retained with cross-reference tag. |
| REC-077 | REC-086 | Gap 6 (6.6) | Gap 12 (8-P3-12) | Automated skill sunset/retirement pipeline | MERGED: Both describe identical sunset pipeline. Use REC-077 as canonical. REC-086 retained with cross-reference tag. |
| REC-078 | REC-085 | Gap 6 (6.7) | Gap 12 (8-P3-11) | Skill health dashboard visualization | MERGED: Both recommend 2x2 frequency/value dashboard. Use REC-078 as canonical. REC-085 retained with cross-reference tag. |
| REC-046 | REC-058 | Gap 6 (6.3) | Gap 8/12 (8-P2-9) | Quarterly skill/hook review audit | RELATED: REC-046 focuses on skill review from telemetry; REC-058 focuses specifically on hook overlap audit. Both kept as distinct recommendations with cross-reference. |
| REC-019 | -- | Gap 4 (4.3) | Gap 7 (implied) | Merge 4 researcher agents into parameterized Research agent | UNIQUE but referenced: Doc 5 (Gap 5/7) notes the 4 researcher agents have identical permissions. REC-019 is the action item. |

**After deduplication:** 85 unique recommendations (90 total entries minus 5 true duplicates retained as cross-references).

---

## Dependency Map

### Tier 0: Foundational (No Dependencies -- Start Here)

These recommendations have no dependencies and unblock the most downstream work:

```
REC-015  Skill usage telemetry                    [Gap 4]  P1  CRITICAL    NOT_STARTED
REC-020  Data sensitivity classifier              [Gap 5]  P1  CRITICAL    NOT_STARTED
REC-021  Model privacy registry                   [Gap 5]  P1  HIGH        NOT_STARTED
REC-010  Hook timeout policy                      [Gap 3]  P1  HIGH        DONE
REC-005  State mechanism decision tree            [Gap 2]  P1  HIGH        DONE
REC-002  Skill categories in frontmatter          [Gap 1]  P1  HIGH        DONE
REC-013  Agent collision detection (file locking) [Gap 3]  P1  HIGH        PARTIAL
REC-017  Skill lifecycle stages in frontmatter    [Gap 6]  P1  HIGH        NOT_STARTED
REC-028  Ownership mentality scorecard            [Gap 10] P1  HIGH        NOT_STARTED
```

### Tier 1: Enabled by Tier 0

```
REC-015 --> REC-045  Goldilocks zone for PAI (needs telemetry)
REC-015 --> REC-046  Quarterly skill review (needs telemetry)
REC-015 --> REC-048  Monte Carlo sell trigger (needs telemetry)
REC-015 --> REC-049  Skill overvaluation metrics (needs telemetry)
REC-015 --> REC-062  Skill profiling system (needs telemetry)
REC-015 --> REC-076  Specialization cost calculator (needs telemetry)
REC-015 --> REC-077  Automated skill sunset pipeline (needs telemetry + REC-017)
REC-015 --> REC-078  Skill health dashboard (needs telemetry + REC-017)
REC-015 --> REC-079  Cross-skill dependency mapping (needs telemetry)
REC-015 --> REC-087  PAI Annual Report (needs telemetry)

REC-020 --> REC-024  Prompt sanitization layer (needs classifier)
REC-020 --> REC-030  Researcher agent permissions (needs classifier + REC-021)
REC-020 --> REC-054  Privacy audit trail (needs classifier + REC-021)
REC-020 --> REC-060  Model-level permissions enforcement (needs classifier + REC-021)

REC-021 --> REC-022  Ollama integration (needs privacy registry)
REC-021 --> REC-023  Model routing table (needs privacy registry)

REC-010 --> REC-011  Hook error dashboard (needs timeout policy)
REC-010 --> REC-040  Hook circuit breaker (needs timeout + REC-011)

REC-005 --> REC-007  Task -> Beads migration tool
REC-005 --> REC-008  State conflict detection (also needs REC-006)
REC-005 --> REC-038  Unified state query interface

REC-002 --> REC-031  Lazy skill loading (needs categories)

REC-013 --> REC-042  Agent state bus (needs collision detection first)

REC-017 --> REC-077  Skill sunset pipeline (also needs REC-015)
REC-017 --> REC-078  Skill health dashboard (also needs REC-015)

REC-028 --> REC-059  Quarterly OMI reporting (needs scorecard)
REC-028 --> REC-089  Publish OMI framework as product (needs scorecard + REC-059)
```

### Tier 2: Enabled by Tier 1

```
REC-022 --> REC-081  Federated learning (needs Ollama)
REC-022 --> REC-082  Confidential computing (needs Ollama)
REC-022 --> REC-088  Multi-model abstraction layer (needs Ollama + REC-023)

REC-023 --> REC-053  Semantic router integration (also needs REC-050)
REC-023 --> REC-090  Hierarchical router pattern (also needs REC-020, REC-051)

REC-031 --> REC-061  Semantic skill clustering (needs lazy loading)

REC-042 --> REC-071  Agent orchestration DSL (needs state bus)
REC-042 --> REC-072  Operational transformation (needs state bus + REC-071)
REC-042 --> REC-084  Agent communication protocol (needs state bus)

REC-040 --> REC-070  Hook marketplace (needs circuit breaker)

REC-050 --> REC-051  Cross-model verification (needs telemetry)
REC-050 --> REC-053  Semantic router (also needs REC-023)

REC-009 --> REC-063  External memory layer (needs semantic search)
REC-009 --> REC-065  Self-editing memory (needs semantic search)
REC-009 --> REC-066  Mem0 two-phase extraction (needs semantic search)
REC-009 --> REC-067  Graph-based tracking (needs semantic search + REC-037)

REC-034 --> REC-074  Agent context summarization (needs auto-spawn threshold)
REC-014 --> REC-036  ISC -> Tasks auto-conversion (needs dependency API)
REC-019 --> REC-075  Dynamic agent composition (also needs REC-047)
```

### Tier 3: Terminal (Long-Term Vision)

```
REC-053 --> REC-083  Dynamic model capability discovery
REC-051 --> REC-080  Multi-agent debate protocol
REC-071 --> REC-072  Operational transformation for agents
```

---

## Critical Path Analysis

**Post-Audit (2026-02-02):** With 10 DONE, 5 PARTIAL, and 1 NATIVE, the Tier 0 foundation is 33% complete. Three foundational items (REC-002, REC-005, REC-010) are fully done, unblocking their downstream chains. The single most impactful REMAINING starting point is **REC-015 (Skill Usage Telemetry)** which directly unblocks 11 downstream recommendations across 3 gaps (4, 6, 8/12). Combined with **REC-020 (Data Sensitivity Classifier)** which unblocks 4 downstream privacy-critical recs, these two recommendations represent the highest-leverage remaining pair.

### Recommended Implementation Sequence

**Week 1-2 (Quick Wins):**
- ~~REC-002: Skill categories (Low effort, High impact)~~ **DONE**
- ~~REC-005: State mechanism decision tree (Low effort, High impact)~~ **DONE**
- ~~REC-010: Hook timeout policy (Low effort, High impact)~~ **DONE**
- REC-015: Skill usage telemetry (Low effort, Critical impact) -- **HIGHEST REMAINING PRIORITY**
- REC-017: Skill lifecycle stages (Low effort, High impact)
- REC-021: Model privacy registry (Low effort, High impact)
- REC-018: Initial skill audit (Low effort, Medium impact)
- REC-016: Specialization scorecard (Low effort, High impact)
- REC-027: Build vs rent checklist (Low effort, Medium impact)

**Week 3-4 (Medium Effort P1):**
- REC-020: Data sensitivity classifier (Medium effort, Critical impact)
- REC-019: Merge researcher agents (Medium effort, High impact)
- REC-022: Ollama integration (Medium effort, Critical impact)
- REC-024: Prompt sanitization layer (Medium effort, Critical impact)
- ~~REC-001: Optimize skill descriptions (Medium effort, High impact)~~ **DONE**
- ~~REC-012: Prompt-based hook batching (Medium effort, High impact)~~ **DONE**
- REC-028: Ownership mentality scorecard (Medium effort, High impact)

**Month 2 (P2 Wave 1):**
- ~~REC-041: Structured hook logging (Low effort)~~ **PARTIAL** (observability.ts exists, needs broader adoption)
- REC-043: Hook skip mechanism (Low effort)
- REC-052: Researcher agent cost optimization (Low effort)
- REC-035: Auto-link WORK/ to Beads (Low effort)
- REC-050: Multi-model performance telemetry (Medium effort)
- REC-045: Define Goldilocks zone (Medium effort, needs REC-015 data)
- REC-046: Quarterly skill review (Medium effort, needs REC-015 data)
- REC-055: Semantic versioning for skills (Medium effort) **PARTIAL** (1/48 versioned)
- REC-056: Skill dependency graph (Medium effort)
- ~~REC-058: Hook overlap audit~~ **DONE** (UserPromptOrchestrator resolved overlaps)

**Month 3 (P2 Wave 2):**
- ~~REC-031: Lazy skill loading (High effort)~~ **DONE** (skill-index.json with tier system)
- REC-034: Auto-spawn on context pressure (High effort)
- REC-038: Unified state query interface (High effort)
- REC-048: Monte Carlo sell trigger model (High effort)
- REC-053: Semantic router integration (High effort)
- REC-057: Anthropic dependency risk plan (Medium effort)

---

## Source Document Index

| Document | File | Gaps Covered | Rec Count |
|----------|------|-------------|-----------|
| Doc 1 | `research-gap-1-9-token-economics.md` | 1, 9 | 12 |
| Doc 2 | `research-gap-2-cross-session-state.md` | 2 | 15 |
| Doc 3 | `research-gap-3-11-execution-reliability.md` | 3, 11 | 15 |
| Doc 4 | `research-gap-4-6-agent-economics-sell-discipline.md` | 4, 6 | 13 |
| Doc 5 | `research-gap-5-7-privacy-multimodel-orchestration.md` | 5, 7 | 15 |
| Doc 6 | `research-gap-8-10-12-infrastructure-ownership-aging.md` | 8, 10, 12 | 15 |

---

## Gap-to-Recommendation Coverage

| Gap | Description | Rec IDs |
|-----|-------------|---------|
| Gap 1 | Skill Loading Performance | REC-001, REC-002, REC-031, REC-032, REC-061, REC-062 |
| Gap 2 | Cross-Session State Management | REC-005 thru REC-009, REC-035 thru REC-039, REC-065 thru REC-069 |
| Gap 3 | Hook Execution Reliability | REC-010 thru REC-013, REC-040, REC-041, REC-043, REC-070, REC-073 |
| Gap 4 | Agent Specialization Economics | REC-015, REC-016, REC-019, REC-045, REC-047, REC-075, REC-076, REC-079 |
| Gap 5 | Privacy-Preserving AI | REC-020 thru REC-022, REC-024, REC-030, REC-054, REC-060, REC-081, REC-082 |
| Gap 6 | Sell Discipline for Skills/Agents | REC-017, REC-018, REC-046, REC-048, REC-049, REC-077, REC-078 |
| Gap 7 | Multi-Model Orchestration | REC-023, REC-050 thru REC-053, REC-080, REC-083, REC-084, REC-090 |
| Gap 8 | Infrastructure Investment Risk | REC-025 thru REC-027, REC-029, REC-057, REC-087, REC-088 |
| Gap 9 | Context Budget Allocation | REC-003, REC-004, REC-033, REC-034, REC-063, REC-064 |
| Gap 10 | Ownership Mentality Metrics | REC-028, REC-059, REC-089 |
| Gap 11 | Agent Collaboration | REC-013, REC-014, REC-042, REC-044, REC-071, REC-072, REC-074, REC-084 |
| Gap 12 | AI System Aging | REC-026, REC-029, REC-055, REC-056, REC-058, REC-085, REC-086 |

---

*Generated: 2026-02-02 | Audited: 2026-02-02 | Source: 6 PAI research gap documents | Maintained by: Algorithm Agent (Vera Sterling)*
