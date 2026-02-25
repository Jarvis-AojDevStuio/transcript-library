---
title: "Knowledge Gap Research: Cross-Session State Management"
date: 2026-02-02
gaps: [2]
status: research-complete
author: Nova (Intern Agent)
---

# Cross-Session State Management

## Executive Summary

PAI currently operates **five overlapping state persistence mechanisms** without clear decision frameworks for when to use each. This research analyzes the current state, compares PAI's approach with leading AI memory systems (Mem0, Letta, Zep), and provides actionable recommendations for resolving conflicts and establishing best practices.

**Key Finding:** PAI's multi-layered approach mirrors industry trends (hybrid storage, semantic retrieval, git-backed persistence), but lacks composition patterns and clear usage boundaries. The primary tension is between **structured task tracking** (Tasks), **consulting memory** (Beads), **session-level memory** (WORK/), and **algorithmic state** (STATE/).

---

## Current State Analysis

### State Mechanisms Inventory

PAI employs **five distinct state persistence mechanisms**, each with different scopes, lifetimes, and use cases:

| Mechanism | Storage | Scope | Retention | Populated By | Purpose |
|-----------|---------|-------|-----------|--------------|---------|
| **Tasks** | In-memory (session) | Agent coordination | Session-only | TaskCreate/Update tools | Real-time dependency tracking across parallel agents |
| **Beads** | Git-backed JSONL | Client consulting | Permanent | bd CLI commands | Client context, decisions, deliverables across sessions |
| **WORK/** | Filesystem | Work tracking | 30-day sessions | AutoWorkCreation hook | Primary work unit tracking with lineage |
| **Memory (LEARNING/)** | Filesystem | System learnings | Permanent | Hooks + harvesting tools | Captured insights, failures, patterns |
| **STATE/** | JSON files | Runtime state | Ephemeral | Various hooks/tools | Fast read/write for current execution state |

### Deep Dive: Each Mechanism

#### 1. Task System (TaskCreate/Update/List/Get)

**What it stores:**
- Task subject, description, activeForm
- Status (pending, in_progress, completed)
- Dependencies (blocks/blockedBy relationships)
- Owner assignment
- Created/updated timestamps

**When it's used:**
- Multi-turn work with multiple criteria
- Parallel agents needing coordination
- Complex ISC (Ideal State Criteria) with dependencies
- Work that must persist across tool calls **within a session**

**Storage mechanism:** In-memory during session (does NOT persist across Claude Code sessions)

**Example from CORE Skill:**
```
PLAN Phase:
  1. Define ISC criteria as usual
  2. For complex work: TaskCreate for each criterion
  3. TaskUpdate to set blockedBy dependencies

BUILD/EXECUTE Phase:
  1. TaskUpdate status → in_progress when starting
  2. Work toward criterion
  3. TaskUpdate status → completed with evidence

VERIFY Phase:
  1. TaskList to see overall progress
  2. ISC table shows final state
```

**Limitations:**
- Session-scoped only (resets when Claude Code session ends)
- Not git-tracked
- No cross-session continuity

#### 2. Beads (bd commands)

**What it stores:**
- Client deliverables, decisions, context notes, follow-ups, blockers
- Hierarchical tags: client, type, status, priority, category, location
- Issue metadata: created/updated dates, descriptions, comments
- Client context files (.beads-context) with preferences, contacts, directories

**When it's used:**
- Client consulting work ONLY
- Capturing decisions that affect client work
- Tracking deliverables across sessions/weeks/months
- Preserving communication preferences and context

**Storage mechanism:** Git-native JSONL files in `.beads/issues.jsonl` + SQLite database

**Tag conventions (required):**
```
client:<slug>        # todays-dental, agerite-pharmacy, prosper-shelter
type:<type>          # deliverable, decision, context, follow-up, blocker
status:<status>      # pending, in-progress, waiting, done, cancelled
priority:<p>         # p0-urgent, p1-high, p2-normal, p3-low (optional)
category:<cat>       # ops, hr, technical, strategic, financial (optional)
```

**Session protocols:**
- START: `bd-resume-client <slug>` loads full context
- END: `bd-capture-context` preserves decisions, then `bd sync` commits to git

**Limitations:**
- Client-specific only (not for general work)
- Manual capture workflow (no automatic extraction)
- No semantic search (tag-based filtering only)

#### 3. WORK/ - Primary Work Tracking

**What it stores:**
- Work directories: `WORK/{work_id}/`
- Metadata: `META.yaml` (status, session, lineage)
- ISC tracking: `ISC.json` (Ideal State Criteria with version history)
- Work items: `items/` (individual work pieces)
- Sub-agent outputs: `agents/`
- Research findings: `research/`
- Scratch artifacts: `scratch/` (diagrams, prototypes)
- Verification evidence: `verification/`

**When it's used:**
- Every user request creates a work directory (AutoWorkCreation hook)
- ISC captured from PAI Algorithm execution
- Work items updated on each response (ResponseCapture hook)
- Marked COMPLETED on session end (SessionSummary hook)

**Storage mechanism:** Filesystem in `~/.claude/MEMORY/WORK/`

**Work directory lifecycle:**
```
1. UserPromptSubmit → AutoWorkCreation creates work dir + first item
2. Stop → ResponseCapture updates item + captures ISC
3. SessionEnd → SessionSummary marks COMPLETED, clears STATE/current-work.json
```

**ISC.json format:**
```json
{
  "workId": "20260118-...",
  "effortTier": "STANDARD",
  "current": {
    "criteria": ["Criterion 1", "Criterion 2"],
    "antiCriteria": ["Anti-criterion 1"],
    "phase": "BUILD",
    "timestamp": "2026-01-18T..."
  },
  "history": [
    {"version": 1, "phase": "OBSERVE", "criteria": [...], "timestamp": "..."}
  ],
  "satisfaction": {"satisfied": 3, "partial": 1, "failed": 0, "total": 4}
}
```

**Limitations:**
- Session-scoped (one work directory per session)
- No cross-session aggregation
- ISC capture depth varies by effort tier (QUICK = summary only, DEEP = full history)

#### 4. LEARNING/ - Categorized Learnings

**What it stores:**
- System learnings: `LEARNING/SYSTEM/YYYY-MM/` (infrastructure issues)
- Algorithm learnings: `LEARNING/ALGORITHM/YYYY-MM/` (task execution errors)
- Failure captures: `LEARNING/FAILURES/YYYY-MM/{timestamp}_description/` (full context for ratings 1-3)
- Pattern synthesis: `LEARNING/SYNTHESIS/YYYY-MM/` (aggregated weekly reports)
- Ratings: `LEARNING/SIGNALS/ratings.jsonl` (user satisfaction data)

**When it's used:**
- ResponseCapture hook (if content qualifies as learning)
- ExplicitRatingCapture hook (ratings + low-rating context dumps)
- ImplicitSentimentCapture hook (detected frustration)
- WorkCompletionLearning hook (significant session completions)
- SessionHarvester tool (periodic extraction from session transcripts)

**Storage mechanism:** Filesystem in `~/.claude/MEMORY/LEARNING/`

**Categorization logic:**
| Directory | When Used | Example Triggers |
|-----------|-----------|------------------|
| SYSTEM/ | Tooling/infrastructure failures | hook crash, config error, deploy failure |
| ALGORITHM/ | Task execution issues | wrong approach, over-engineered, missed the point |
| FAILURES/ | Full context for low ratings (1-3) | severe frustration, repeated errors |
| SYNTHESIS/ | Pattern aggregation | weekly analysis, recurring issues |

**Failure capture structure:**
```
FAILURES/YYYY-MM/{timestamp}_{8-word-description}/
├── CONTEXT.md          # Human-readable analysis
├── transcript.jsonl    # Raw conversation
├── sentiment.json      # Sentiment metadata
└── tool-calls.json     # Tool invocations
```

**Limitations:**
- No semantic search (directory-based browsing)
- Manual harvesting (not real-time)
- Synthesis reports require separate tooling

#### 5. STATE/ - Fast Runtime Data

**What it stores:**
- Current work pointer: `STATE/current-work.json`
- Algorithm execution state: `STATE/algorithm-state.json`
- Performance metrics: `STATE/format-streak.json`, `algorithm-streak.json`
- Trending cache: `STATE/trending-cache.json`
- Multi-session progress: `STATE/progress/`
- System health: `STATE/integrity/`

**When it's used:**
- High-frequency read/write during execution
- Algorithm phase tracking
- Performance streak monitoring
- Cached analysis (TTL-based)

**Storage mechanism:** JSON files in `~/.claude/MEMORY/STATE/`

**Key property:** Ephemeral - can be rebuilt from RAW (session transcripts) or other sources. Optimized for speed, not permanence.

**Limitations:**
- Mutable state (changes during execution)
- No historical tracking
- System recovers gracefully if deleted

### Overlap & Conflict Map

**Source of Truth Problem:**

| Information Type | Stored In | Conflicts With |
|------------------|-----------|----------------|
| Active work status | WORK/META.yaml, STATE/current-work.json | Two sources, no sync |
| Task dependencies | Tasks (in-memory), ISC.json | Tasks reset on session end, ISC persists |
| Client decisions | Beads (type:decision), LEARNING/ALGORITHM/ | Decision vs. learning categorization unclear |
| Follow-up items | Beads (type:follow-up), WORK/items/ | Client-specific vs. general work |
| Work completion | WORK/META.yaml (COMPLETED), TaskList (completed) | Tasks don't persist, WORK does |

**When mechanisms overlap:**

1. **Client work tracking:**
   - Beads: Deliverables with client context
   - WORK/: Individual work sessions
   - Tasks: Real-time status (if used within session)
   - **Conflict:** A client deliverable could have entries in all three with no automatic sync

2. **Decision capture:**
   - Beads: `type:decision` for client decisions
   - LEARNING/ALGORITHM/: Learnings about approach errors
   - LEARNING/SYSTEM/: Learnings about tooling failures
   - **Conflict:** Is a client technology decision (e.g., "migrate from Archy to Open Dental") a Beads decision OR a system learning?

3. **Session continuity:**
   - Tasks: Session-scoped, resets every session
   - WORK/: Persists but marked COMPLETED on session end
   - Beads: Persists indefinitely until manually closed
   - STATE/current-work.json: Cleared on session end
   - **Conflict:** How do you resume multi-session work? (Only Beads provides resume mechanism)

4. **Progress tracking:**
   - Tasks: blockedBy dependencies (real-time)
   - Beads: type:blocker issues (persistent)
   - STATE/progress/: Multi-session project tracking
   - **Conflict:** Three ways to track blockers with no canonical source

### Usage Patterns

**Current documented triggers:**

| Mechanism | Trigger | Automatic? | User Action Required? |
|-----------|---------|------------|-----------------------|
| Tasks | Explicit tool call | No | Yes (TaskCreate in prompts) |
| Beads | Manual command | No | Yes (bd create or bd-capture-context) |
| WORK/ | Every user request | Yes | No (AutoWorkCreation hook) |
| LEARNING/ | Ratings or session end | Yes | Sometimes (ratings require user input) |
| STATE/ | Tool/hook execution | Yes | No |

**Pattern observations:**

1. **Automatic vs. Manual:**
   - WORK/, LEARNING/, STATE/ populate automatically via hooks
   - Tasks and Beads require explicit user/agent action

2. **Session vs. Permanent:**
   - Session-scoped: Tasks, WORK/ (marked COMPLETED), STATE/ (ephemeral)
   - Permanent: Beads, LEARNING/ (archived but retained)

3. **Structured vs. Unstructured:**
   - Structured: Tasks (dependency graph), Beads (tags), ISC.json (criteria)
   - Unstructured: LEARNING/ (markdown files), WORK/items/ (text summaries)

4. **Single-agent vs. Multi-agent:**
   - Single-agent: Beads (consultant-facing), LEARNING/ (system-facing)
   - Multi-agent: Tasks (coordination across parallel agents)

---

## External Research

### AI Memory Systems Comparison

The AI memory landscape in 2026 features three major production-ready systems, each addressing state persistence differently:

#### Mem0 - Hybrid Datastore with Selective Retrieval

**Architecture:** [Two-phase memory pipeline](https://arxiv.org/abs/2504.19413) (extraction + update) with hybrid datastore

**Core components:**
- **Extraction Phase:** Ingests latest exchange, rolling summary, and recent messages → LLM extracts candidate memories
- **Update Phase:** Each new fact compared to top-s similar entries in vector database
- **Hybrid Storage:**
  - Key-value stores: Quick access to structured facts/preferences
  - Graph stores: Relationships (people, places, objects)
  - Vector stores: Overall meaning and context of conversations

**Performance (LOCOMO benchmark, 2025-2026):**
- 26% higher response accuracy vs. OpenAI's memory
- 91% lower p95 latency (1.44s vs. 17.12s)
- 90% token savings via selective retrieval

**Graph variant (Mem0ᵍ):**
- Layers in graph-based store for multi-session relationships
- ~2% higher overall score than base configuration

**Key insight:** Selective retrieval over concise memory facts (not entire chat histories) dramatically reduces latency

**Comparison to PAI:**
- PAI's LEARNING/ is unstructured (markdown files), not semantic vector store
- PAI lacks automatic memory extraction (manual capture in Beads)
- PAI's STATE/ is key-value-like but not integrated with vector search

**Sources:**
- [Mem0 - The Memory Layer for your AI Apps](https://mem0.ai/)
- [GitHub - mem0ai/mem0: Universal memory layer for AI Agents](https://github.com/mem0ai/mem0)
- [Mem0 Tutorial: Persistent Memory Layer for AI Applications | DataCamp](https://www.datacamp.com/tutorial/mem0-tutorial)
- [Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory (arXiv)](https://arxiv.org/abs/2504.19413)

#### Letta (formerly MemGPT) - Self-Editing Memory Blocks

**Architecture:** [LLM Operating System](https://www.letta.com/blog/agent-memory) with persistent, structured memory blocks

**Core capabilities:**
- **Memory blocks:** Persistent structured context visible across all interactions (no retrieval needed)
- **Self-editing memory:** Agents don't just READ from memory - they actively MANAGE it using built-in tools
- **Conversations API:** Shared memory across parallel experiences with users (announced Jan 21, 2026)
- **Letta Code:** #1 model-agnostic open source agent on Terminal-Bench (announced Dec 16, 2025)

**Memory types:**
- Core memory: Always-visible context (like PAI's WORK/META.yaml)
- Archival memory: Long-term storage with retrieval (like PAI's LEARNING/)
- Recall memory: Conversation history

**Key insight:** Unlike traditional RAG (passive retrieval), Letta agents **decide** what to remember, update, and search for

**Comparison to PAI:**
- PAI's WORK/ is similar (always-visible current state)
- PAI lacks self-editing capability (agents can't update WORK/ directly)
- PAI's hooks are reactive (on events), not proactive (agent-driven)

**Sources:**
- [Letta](https://www.letta.com/)
- [GitHub - letta-ai/letta](https://github.com/letta-ai/letta)
- [Memory overview | Letta Docs](https://docs.letta.com/guides/agents/memory/)
- [Agent Memory: How to Build Agents that Learn and Remember | Letta](https://www.letta.com/blog/agent-memory)

#### Zep - Temporal Knowledge Graph

**Architecture:** [Temporally-aware knowledge graph](https://arxiv.org/abs/2501.13956) (Graphiti engine)

**Core technology:**
- **Temporal facts:** Each fact includes `valid_at` and `invalid_at` dates
- **Evolution tracking:** Agents understand how relationships, preferences, context changed over time
- **Multi-source synthesis:** Dynamically combines chat history, business data, user behavior
- **Sub-200ms latency:** End-to-end context assembly

**Performance (2025-2026 benchmarks):**
- DMR benchmark: 94.8% vs. MemGPT's 93.4%
- LongMemEval: Up to 18.5% accuracy improvement
- 90% latency reduction vs. baseline implementations

**Key insight:** Time-aware memory enables agents to understand context evolution (e.g., "user used to prefer X, now prefers Y")

**Comparison to PAI:**
- PAI tracks versions (ISC.json history) but not temporally-aware relationships
- PAI's Beads issues have created/updated timestamps but no `valid_at`/`invalid_at` semantics
- PAI lacks graph-based relationship modeling

**Sources:**
- [Context Engineering & Agent Memory Platform for AI Agents - Zep](https://www.getzep.com/)
- [Zep: A Temporal Knowledge Graph Architecture for Agent Memory (arXiv)](https://arxiv.org/abs/2501.13956)
- [Agent Memory - Zep | Zep](https://www.getzep.com/product/agent-memory/)

### Persistence Patterns from Software Engineering

| Pattern | Description | Applicable to PAI? | Current PAI Usage |
|---------|-------------|-------------------|-------------------|
| **Event Sourcing** | Store all state changes as immutable events | ✅ Yes | Claude Code's `projects/{uuid}.jsonl` is event log |
| **CQRS** | Separate read models from write models | ✅ Yes | WORK/ (write), STATE/ (read cache) |
| **Snapshot + Log** | Periodic snapshots + event log for rebuilding | ✅ Yes | ISC.json (snapshot), WORK/items/ (log) |
| **Write-Ahead Logging** | Log changes before applying to state | ⚠️ Partial | Hooks write to WORK/ before STATE/ update |
| **Distributed Consensus** | Coordinate state across nodes | ❌ No | Single-node only (no multi-instance PAI) |
| **Eventual Consistency** | Accept temporary inconsistencies | ⚠️ Implicit | Beads sync, LEARNING/ harvesting are async |
| **Materialized Views** | Pre-compute queries for fast reads | ✅ Yes | STATE/trending-cache.json |
| **Optimistic Locking** | Assume no conflicts, roll back if detected | ❌ No | No conflict detection between mechanisms |

**Key takeaway:** PAI already uses many solid persistence patterns (event sourcing via session transcripts, CQRS with WORK/STATE split, materialized views). The gap is **coordination** between mechanisms and **conflict resolution** when they diverge.

---

## Decision Framework

### When to Use What

| State Type | Mechanism | When | Example | Reason |
|-----------|-----------|------|---------|--------|
| **Real-time task coordination (single session)** | Tasks | Multi-turn work with parallel agents needing dependency tracking | "Research 5 topics in parallel, summarize when all complete" | In-memory coordination is fastest; no need to persist beyond session |
| **Client consulting context (permanent)** | Beads | Client deliverables, decisions, follow-ups that must survive weeks/months | "Resume Today's Dental work from 2 weeks ago" | Git-backed persistence, tag-based filtering, resume commands |
| **Current work tracking (session-scoped)** | WORK/ | Every user request creates a work unit with ISC, items, verification | Automatic work directory for "Refactor authentication module" | Hooks auto-populate, provides structured work lineage |
| **System/algorithm learnings (permanent)** | LEARNING/ | Capture failures, patterns, insights for future improvement | Low rating (1-3) triggers failure capture with full context | Enables retroactive analysis, pattern detection over time |
| **Algorithm execution state (ephemeral)** | STATE/ | Current phase, performance metrics, cached analysis | "Which algorithm phase am I in?" | Fast read/write, rebuilt if deleted |
| **Multi-session project progress** | STATE/progress/ | Track progress on projects spanning multiple sessions | "Day 3 of 5-day migration project" | Bridges sessions but ephemeral (not archived) |
| **System configuration (permanent)** | CLAUDE.md | Project instructions, branding rules, workflow protocols | "Always use Unified Dental branding" | Loaded at session start, version-controlled |
| **Context restoration** | Session summaries | Claude Code auto-summarizes long conversations | Conversation > 100K tokens → summary generated | Built-in Claude Code feature, automatic |

### Composition Patterns

**How mechanisms should work together:**

#### Pattern 1: Client Deliverable Lifecycle

```
1. START SESSION
   - User: "Resume Today's Dental work"
   - Agent: bd-resume-client todays-dental (Beads)
   - Output: Pending deliverables, follow-ups, context

2. PICK DELIVERABLE
   - Beads shows: "Complete employee handbook (P1, in-progress)"
   - Agent: Read Beads issue for full context

3. CREATE WORK SESSION
   - AutoWorkCreation hook creates WORK/{work_id}/
   - ISC defined: "Handbook has sections X, Y, Z"
   - If complex: TaskCreate for each section (optional)

4. DURING WORK
   - Tasks track section progress (if created)
   - ResponseCapture updates WORK/items/
   - ISC.json updates as criteria satisfied

5. COMPLETE WORK
   - TaskUpdate status=completed (if Tasks used)
   - Beads: bd update <issue-id> --status done
   - SessionSummary marks WORK/ as COMPLETED

6. END SESSION
   - bd-capture-context if new decisions/follow-ups
   - bd sync commits to git
   - WORK/ archived, STATE/ cleared
```

**Key integration points:**
- Beads provides cross-session continuity
- WORK/ provides current session structure
- Tasks provide real-time coordination (optional)
- All three stay in sync through manual updates

#### Pattern 2: Learning from Failure

```
1. LOW RATING DETECTED
   - User rates response 2/10
   - ImplicitSentimentCapture hook triggers

2. FAILURE CAPTURE
   - Creates LEARNING/FAILURES/{timestamp}_description/
   - Saves transcript.jsonl, sentiment.json, tool-calls.json
   - Writes CONTEXT.md with analysis

3. SESSION HARVESTING
   - SessionHarvester (periodic) scans Claude Code projects/
   - Extracts additional learnings from transcript
   - Writes to LEARNING/SYSTEM/ or LEARNING/ALGORITHM/

4. PATTERN SYNTHESIS
   - LearningPatternSynthesis analyzes LEARNING/SIGNALS/
   - Generates weekly reports in LEARNING/SYNTHESIS/
   - Identifies recurring failure modes

5. FUTURE SESSIONS
   - Agent reads relevant LEARNING/ files before similar work
   - Avoids previously identified anti-patterns
   - Applies lessons learned
```

**Key integration points:**
- Hooks capture raw data (FAILURES/, SIGNALS/)
- Harvesting tools extract insights (SYSTEM/, ALGORITHM/)
- Synthesis tools aggregate patterns (SYNTHESIS/)
- Agents consume learnings (manual file reads)

#### Pattern 3: Multi-Session Project

```
1. DAY 1: START PROJECT
   - User: "Migrate auth system (5-day project)"
   - WORK/ created for session
   - STATE/progress/auth-migration.json created with:
     {
       "project": "auth-migration",
       "days_planned": 5,
       "days_completed": 0,
       "current_phase": "planning"
     }

2. DAY 1 END
   - WORK/ marked COMPLETED
   - STATE/progress/auth-migration.json updated:
     { "days_completed": 1, "current_phase": "implementation" }

3. DAY 2 START
   - Agent: Read STATE/progress/auth-migration.json
   - Resume from "implementation" phase
   - New WORK/ created for Day 2 session

4. DAY 5 END
   - STATE/progress/auth-migration.json:
     { "days_completed": 5, "current_phase": "complete" }
   - Archive auth-migration.json (project done)
```

**Key integration points:**
- STATE/progress/ bridges sessions
- WORK/ provides per-session detail
- No automatic resumption (agent must read STATE/progress/)

### Anti-Patterns

**What NOT to do:**

| Anti-Pattern | Why It's Bad | Instead Do This |
|-------------|--------------|-----------------|
| **Store same info in multiple places without sync** | Source of truth problem; data diverges | Pick ONE canonical source, reference it from others |
| **Use Tasks for cross-session continuity** | Tasks reset on session end | Use Beads or STATE/progress/ for multi-session work |
| **Manually update WORK/ directories** | Hooks auto-populate; manual edits get overwritten | Let hooks manage WORK/, read from it only |
| **Store PHI in Beads issues** | HIPAA violation, security risk | Store client work context only, no patient data |
| **Create Beads issues for non-client work** | Beads is client-specific system | Use WORK/ for general work, Beads only for consulting |
| **Expect Tasks to persist after session** | In-memory only, no git backing | Complete work within session or migrate to Beads |
| **Duplicate learnings across SYSTEM/ and ALGORITHM/** | Same insight stored twice | Categorize clearly: infrastructure vs. approach |
| **Skip bd sync at session end** | Beads context not backed up to git | Always sync before exiting client work |
| **Edit STATE/ files manually** | Ephemeral, rebuilt from other sources | STATE/ is read-only for agents; hooks manage it |
| **Use LEARNING/ for active task tracking** | LEARNING/ is post-hoc analysis | Use WORK/ or Tasks for current work, LEARNING/ for retrospectives |

---

## Recommendations

### Immediate (P1) - Critical Gaps

| # | Recommendation | Impact | Effort | Evidence |
|---|---------------|--------|--------|----------|
| 1 | **Create state mechanism decision tree** | HIGH | LOW | Users/agents don't know which mechanism to use; current overlap causes confusion (5 mechanisms with no guidance) |
| 2 | **Document Beads ↔ WORK/ integration pattern** | HIGH | LOW | Client deliverables span sessions but WORK/ is session-scoped; no canonical pattern for linking them |
| 3 | **Add Task → Beads migration tool** | MEDIUM | MEDIUM | Tasks reset on session end; complex work loses progress if not manually migrated to Beads |
| 4 | **Implement state conflict detection** | HIGH | MEDIUM | No validation when WORK/ completion doesn't match Beads issue status; silent divergence |
| 5 | **Add semantic search to LEARNING/** | HIGH | HIGH | 18.5% accuracy boost (Zep) and 26% accuracy boost (Mem0) from semantic retrieval; PAI relies on manual file browsing |

**Detailed recommendations:**

**#1: Create State Mechanism Decision Tree**

Build a simple flowchart agents can reference:

```
Start
  ↓
Is this client consulting work?
  YES → Use Beads (for deliverables/decisions/context)
  NO ↓
Does it need to survive this session?
  NO → Use Tasks (for real-time coordination)
  YES ↓
Is it algorithmic/system learning?
  YES → Use LEARNING/ (for failure capture/patterns)
  NO ↓
Is it current work being tracked?
  YES → WORK/ (auto-populated by hooks)
  NO ↓
Is it runtime execution state?
  YES → STATE/ (ephemeral, fast read/write)
  NO → Document in CLAUDE.md or specs
```

Embed this in `MEMORYSYSTEM.md` and reference from CORE Skill.

**#2: Document Beads ↔ WORK/ Integration Pattern**

Create canonical workflow in Beads user guide:

```markdown
## Beads + WORK/ Integration for Multi-Session Deliverables

### Pattern: Long-Running Client Deliverable

1. SESSION 1 START
   - bd-resume-client todays-dental
   - Beads shows: "Employee handbook (in-progress)"
   - Read Beads issue: bd show desktop-commander-155

2. SESSION 1 WORK
   - WORK/ auto-created by AutoWorkCreation hook
   - Link to Beads in WORK/META.yaml:
     ```yaml
     beads_issue: desktop-commander-155
     client: todays-dental
     ```
   - Work progresses, ISC tracked in WORK/

3. SESSION 1 END
   - Beads comment: bd comments add desktop-commander-155 "Completed sections 1-3"
   - WORK/ marked COMPLETED
   - bd sync

4. SESSION 2+ (repeat)
   - New WORK/ created, links to same Beads issue
   - Progress accumulates in Beads comments
   - Final session: bd update desktop-commander-155 --status done
```

Add `beads_issue` field to WORK/META.yaml schema.

**#3: Add Task → Beads Migration Tool**

Create `scripts/beads-helpers/migrate-tasks-to-beads.sh`:

```bash
#!/usr/bin/env bash
# Migrate in-memory Tasks to Beads for cross-session persistence

# Usage: Invoke at session end for client work

# 1. TaskList to get all incomplete tasks
# 2. For each task:
#    - Detect if client-related (from activeForm or description)
#    - Create Beads issue with type:deliverable
#    - Tag with client slug
#    - Map Task status → Beads status
# 3. Output summary of migrated tasks
```

Call from session-end checklist for client work.

**#4: Implement State Conflict Detection**

Add validation script `scripts/memory-validation/check-state-conflicts.sh`:

```bash
#!/usr/bin/env bash
# Detect conflicts between state mechanisms

CONFLICTS=()

# Check 1: WORK/ COMPLETED but Beads issue still in-progress
# Query Beads for in-progress issues with location tags
# Cross-reference with WORK/ directories marked COMPLETED
# Flag mismatches

# Check 2: STATE/current-work.json points to non-existent WORK/ dir
# Read current-work.json, verify directory exists

# Check 3: Beads issue marked done but no corresponding WORK/ completion
# Query Beads for recently completed issues
# Check for recent WORK/ directories with matching description

# Output conflicts as warnings, not errors (some are expected)
echo "Found ${#CONFLICTS[@]} potential conflicts"
```

Run weekly via cron or manually.

**#5: Add Semantic Search to LEARNING/**

Implement vector search over LEARNING/ markdown files:

**Approach 1: Integrate Mem0**
- Add Mem0 client to PAI hooks
- On SessionHarvester run, embed LEARNING/ files into Mem0
- Expose search: `pai search-learnings "authentication failures"`
- Returns semantically similar past learnings

**Approach 2: Local vector store (Chroma/Qdrant)**
- Embed LEARNING/ files locally
- Index on write (WorkCompletionLearning hook)
- Query before similar work: "Show me past auth migration learnings"

**Impact:** Mem0 shows 26% accuracy boost; Zep shows 18.5% boost. PAI currently relies on manual file browsing (inefficient for 100+ learning files).

### Near-Term (P2) - Significant Improvements

| # | Recommendation | Impact | Effort | Evidence |
|---|---------------|--------|--------|----------|
| 6 | **Auto-link WORK/ to Beads on client directory detection** | MEDIUM | LOW | Manual linking error-prone; auto-detect client from $PWD and create Beads issue if in client directory |
| 7 | **Implement ISC → Tasks auto-conversion** | MEDIUM | MEDIUM | Complex ISC with dependencies manually converted to Tasks; automate based on criteria count + blockedBy |
| 8 | **Add temporal versioning to Beads issues** | MEDIUM | HIGH | Zep's temporal graph shows value in "valid_at"/"invalid_at" dates; Beads issues lack evolution tracking |
| 9 | **Create unified state query interface** | HIGH | HIGH | Currently need bd list, ls WORK/, cat STATE/*.json separately; unified API for cross-mechanism queries |
| 10 | **Implement auto-resume for multi-session projects** | MEDIUM | MEDIUM | STATE/progress/ exists but no auto-resume; agents manually read it; hook could auto-load context |

**Detailed recommendations:**

**#6: Auto-link WORK/ to Beads on Client Directory Detection**

Modify AutoWorkCreation hook:

```typescript
// In AutoWorkCreation.hook.ts
export async function onUserPromptSubmit(event: UserPromptSubmitEvent) {
  const workId = generateWorkId();
  const cwd = process.env.PWD;

  // Detect client directory
  const clientMatch = cwd.match(/consulting\/clients\/([^\/]+)/);

  if (clientMatch) {
    const clientSlug = clientMatch[1];

    // Check if .beads-context exists
    const beadsContextPath = `${cwd}/.beads-context`;
    if (fs.existsSync(beadsContextPath)) {
      // Prompt agent: "Create Beads issue for this work?"
      // Or auto-create if in client dir

      // Link in WORK/META.yaml
      workMeta.beads = {
        client: clientSlug,
        auto_created: true
      };
    }
  }

  // Continue normal work creation
}
```

**#7: Implement ISC → Tasks Auto-Conversion**

Add to PAI Algorithm (PLAN phase):

```markdown
## PLAN Phase Enhancement

After defining ISC criteria:

1. Count criteria: X
2. Check for dependencies (blockedBy keywords in criteria)
3. If X > 3 OR dependencies detected:
   - Auto-invoke TaskCreate for each criterion
   - Map ISC criterion → Task subject
   - Extract blockedBy from criterion description
   - TaskUpdate to set dependencies
   - Display: "Created X tasks for ISC tracking"
```

Makes Tasks automatic for complex work (no manual conversion).

**#8: Add Temporal Versioning to Beads Issues**

Extend Beads issue schema:

```json
{
  "id": "desktop-commander-155",
  "title": "Employee handbook",
  "type": "deliverable",
  "status": "done",
  "status_history": [
    {"status": "pending", "valid_from": "2025-12-01", "valid_to": "2025-12-15"},
    {"status": "in-progress", "valid_from": "2025-12-15", "valid_to": "2026-01-10"},
    {"status": "done", "valid_from": "2026-01-10", "valid_to": null}
  ],
  "tags": [
    {"tag": "priority:p1-high", "valid_from": "2025-12-01", "valid_to": "2025-12-20"},
    {"tag": "priority:p2-normal", "valid_from": "2025-12-20", "valid_to": null}
  ]
}
```

Enables queries like: "What was status on 2025-12-18?" (in-progress)

**#9: Create Unified State Query Interface**

Build `pai state-query` command:

```bash
pai state-query "open deliverables for todays-dental"

# Queries:
# - Beads: bd list --tag client:todays-dental --tag type:deliverable --tag status:in-progress
# - WORK/: Recent WORK/ directories with client:todays-dental in META.yaml
# - STATE/progress/: Any active multi-session projects for client
# - Tasks: TaskList (if session active)

# Unified output:
OPEN DELIVERABLES FOR TODAY'S DENTAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Beads Issues (2):
  - [P1] Employee handbook (desktop-commander-155, in-progress since 2025-12-15)
  - [P2] Training platform (desktop-commander-160, in-progress since 2025-12-20)

Recent WORK/ Sessions (1):
  - 20260201-143022 "Complete training frontend" (COMPLETED)

Active Multi-Session Projects (0):
  (None)

Current Session Tasks (0):
  (Tasks not used this session)
```

**#10: Implement Auto-Resume for Multi-Session Projects**

Add SessionStart hook for STATE/progress/:

```typescript
// In SessionStart.hook.ts
export async function onSessionStart(event: SessionStartEvent) {
  const progressFiles = fs.readdirSync(STATE_PROGRESS_DIR);

  if (progressFiles.length > 0) {
    // Check for active multi-session projects
    const activeProjects = progressFiles
      .filter(f => {
        const project = JSON.parse(fs.readFileSync(f));
        return project.current_phase !== 'complete';
      });

    if (activeProjects.length > 0) {
      // Display notification
      console.log(`
📋 ACTIVE MULTI-SESSION PROJECTS (${activeProjects.length})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${activeProjects.map(p => `  - ${p.project}: Day ${p.days_completed}/${p.days_planned}, Phase: ${p.current_phase}`).join('\n')}

Resume? Ask me to continue any of these projects.
      `);
    }
  }
}
```

### Future (P3) - Long-Term Evolution

| # | Recommendation | Impact | Effort | Evidence |
|---|---------------|--------|--------|----------|
| 11 | **Adopt Letta-style self-editing memory** | HIGH | VERY HIGH | Enable agents to directly update WORK/, LEARNING/ via tools (not just hooks); proactive vs. reactive memory |
| 12 | **Implement Mem0's two-phase extraction** | MEDIUM | HIGH | Automatic memory extraction from conversations (no manual capture); 91% latency reduction |
| 13 | **Add graph-based relationship tracking** | MEDIUM | VERY HIGH | Track how client preferences evolve, project dependencies, team relationships (Zep/Mem0ᵍ approach) |
| 14 | **Build cross-repository state sync** | MEDIUM | HIGH | Beads multi-repo support; aggregate context from multiple vaults/projects |
| 15 | **Create state migration tooling** | LOW | MEDIUM | Migrate historical data to new mechanisms when upgrading (e.g., WORK/ → semantic vector store) |

---

## Open Questions

1. **Should Tasks automatically persist to Beads at session end for client work?**
   - **Pro:** No manual migration needed
   - **Con:** Creates Beads clutter if Tasks were exploratory
   - **Suggestion:** Prompt agent at session end: "Migrate 3 incomplete Tasks to Beads?"

2. **How should we handle cross-session ISC continuity?**
   - **Current:** ISC.json lives in WORK/ (session-scoped), marked COMPLETED
   - **Gap:** Multi-session work has multiple ISC.json files across WORK/ directories
   - **Options:**
     - A) Aggregate ISC.json into Beads issue comments
     - B) Create STATE/progress/{project}/ISC-aggregate.json
     - C) Keep separate per-session (current approach)
   - **Recommendation:** Option B (aggregate into STATE/progress/)

3. **Should LEARNING/ learnings auto-apply to future sessions?**
   - **Current:** Passive (agents manually read LEARNING/ files)
   - **Gap:** Learnings not automatically incorporated
   - **Options:**
     - A) SessionStart hook displays recent LEARNING/ summaries
     - B) Semantic search returns learnings during PLAN phase
     - C) Agent proactively queries before similar work
   - **Recommendation:** Option B (semantic search during PLAN)

4. **What's the retention policy for WORK/ directories?**
   - **Current:** Indefinite retention (never deleted)
   - **Gap:** 30-day sessions retained, but WORK/ grows unbounded
   - **Options:**
     - A) Archive WORK/ older than 90 days
     - B) Compress to summary after 30 days
     - C) Keep indefinitely (disk is cheap)
   - **Recommendation:** Option B (compress to summary, keep ISC.json)

5. **How should we expose state mechanisms to external agents (e.g., Ralph sub-agents)?**
   - **Current:** Sub-agents have no access to parent session state
   - **Gap:** Fresh context every spawn (by design to avoid pollution)
   - **Options:**
     - A) Pass STATE/current-work.json to sub-agents
     - B) Pass WORK/META.yaml + ISC.json
     - C) Keep isolated (current approach)
   - **Recommendation:** Option B for agents that need context (e.g., verification agents)

6. **Should we unify Beads and WORK/ into a single system?**
   - **Pro:** Single source of truth, no sync issues
   - **Con:** Beads is client-specific, WORK/ is general-purpose
   - **Complexity:** Major refactor of hooks + commands
   - **Recommendation:** Keep separate but improve integration (auto-linking, conflict detection)

7. **How do we handle state when switching between Claude Code and Claude Desktop?**
   - **Current:** Separate environments, no state sync
   - **Gap:** Work in Claude Code doesn't appear in Claude Desktop
   - **Options:**
     - A) Shared MEMORY/ directory (symlink)
     - B) Explicit sync command (pai sync-state)
     - C) Keep separate (current approach)
   - **Recommendation:** Option A (shared MEMORY/) if both tools access same filesystem

---

## Conclusion

PAI's multi-layered state persistence approach is **architecturally sound** but suffers from **composition gaps** and **unclear decision boundaries**. The system already implements industry best practices (event sourcing, CQRS, hybrid storage) but lacks:

1. **Decision frameworks** (when to use which mechanism)
2. **Conflict detection** (when mechanisms diverge)
3. **Semantic search** (manual browsing vs. intelligent retrieval)
4. **Auto-linking** (manual coordination across mechanisms)
5. **Temporal versioning** (evolution tracking)

**Top 3 immediate actions:**

1. **Create state mechanism decision tree** (document when to use what)
2. **Add semantic search to LEARNING/** (26% accuracy boost potential)
3. **Implement Task → Beads migration tool** (preserve cross-session work)

**Long-term vision:**

Evolve toward **Letta-style self-editing memory** where agents proactively manage state using tools, combined with **Mem0's semantic retrieval** for learnings and **Zep's temporal graph** for relationship tracking. This would position PAI as a production-ready AI system with human-competitive memory capabilities.

---

## References

### External Research Sources

**Mem0:**
- [Mem0 - The Memory Layer for your AI Apps](https://mem0.ai/)
- [GitHub - mem0ai/mem0: Universal memory layer for AI Agents](https://github.com/mem0ai/mem0)
- [AI Memory Research: 26% Accuracy Boost for LLMs | Mem0](https://mem0.ai/research)
- [Mem0 Tutorial: Persistent Memory Layer for AI Applications | DataCamp](https://www.datacamp.com/tutorial/mem0-tutorial)
- [Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory (arXiv)](https://arxiv.org/abs/2504.19413)

**Letta (MemGPT):**
- [Letta](https://www.letta.com/)
- [GitHub - letta-ai/letta](https://github.com/letta-ai/letta)
- [Memory overview | Letta Docs](https://docs.letta.com/guides/agents/memory/)
- [MemGPT | Letta Docs](https://docs.letta.com/concepts/memgpt/)
- [Agent Memory: How to Build Agents that Learn and Remember | Letta](https://www.letta.com/blog/agent-memory)
- [Letta Code: A Memory-First Coding Agent | Letta](https://www.letta.com/blog/letta-code)

**Zep:**
- [Context Engineering & Agent Memory Platform for AI Agents - Zep](https://www.getzep.com/)
- [Zep: A Temporal Knowledge Graph Architecture for Agent Memory (arXiv)](https://arxiv.org/abs/2501.13956)
- [Agent Memory - Zep | Zep](https://www.getzep.com/product/agent-memory/)
- [Scaling AI Memory with Zep's Knowledge Graph - Torc](https://www.torc.dev/blog/scaling-ai-memory-how-zep-s-knowledge-graph-enhances-llama-3-chat-history)

### Internal PAI Documentation

- `/Users/ossieirondi/.claude/skills/CORE/SYSTEM/MEMORYSYSTEM.md`
- `/Users/ossieirondi/Projects/dev-utils/.obsidian/desktop-commander/docs/beads-user-guide.md`
- `/Users/ossieirondi/Projects/dev-utils/.obsidian/desktop-commander/docs/beads-persistent-memory-architecture-prd.md`
- `/Users/ossieirondi/.claude/skills/CORE/SKILL.md` (Task system documentation)

---

**Document Metadata:**
- **Author:** Nova (Intern Agent)
- **Date:** 2026-02-02
- **Research Duration:** 2 hours
- **Sources:** 3 external AI memory systems + internal PAI documentation
- **Status:** Ready for review by Obi/Atlas
