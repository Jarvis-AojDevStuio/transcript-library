---
title: "Knowledge Gap Research: Execution Reliability (Hooks + Agent Collaboration)"
date: 2026-02-02
gaps: [3, 11]
status: research-complete
---

# Execution Reliability: Hooks & Agent Collaboration

## Executive Summary

This research examines two critical architecture gaps in PAI's execution reliability: hook execution patterns (Gap 3) and agent collaboration mechanisms (Gap 11). Analysis reveals that PAI has sophisticated hook infrastructure with documented patterns but lacks systematic error handling, timeout management, and conflict resolution. Agent collaboration shows similar maturity gaps—while the system supports multiple subagent types and custom agents, it lacks concurrency controls and state coordination mechanisms found in production multi-agent frameworks.

**Key Findings:**
- 14 active hooks across 6 lifecycle events with limited error recovery
- No timeout enforcement or circuit breaker patterns for hooks
- Prompt-based hooks (ImplicitSentimentCapture, AutoWorkCreation) risk LLM call latency
- Agent Task system has no collision detection or shared state management
- Industry frameworks (CrewAI, LangGraph) demonstrate proven coordination patterns

---

## Current State Analysis

### Hook System Audit

**Inventory:** 14 hooks across 6 lifecycle events:

| Event | Hooks | Blocking | LLM Calls |
|-------|-------|----------|-----------|
| SessionStart | StartupGreeting, LoadContext, CheckVersion | LoadContext only | No |
| UserPromptSubmit | FormatReminder, AutoWorkCreation, ExplicitRatingCapture, ImplicitSentimentCapture, UpdateTabTitle | FormatReminder only | Yes (3 hooks) |
| PreToolUse | SecurityValidator, SetQuestionTab | SecurityValidator only | No |
| SubagentStop | AgentOutputCapture | No | No |
| Stop | StopOrchestrator | No | No |
| SessionEnd | WorkCompletionLearning, SessionSummary | No | Yes (1 hook) |

**Architecture Strengths:**
1. **Well-documented patterns:** Each hook has comprehensive inline documentation (purpose, inputs, outputs, inter-hook dependencies, error handling philosophy)
2. **Shared library system:** Standardized utilities in `hooks/lib/` for identity, time, paths, notifications
3. **Coordination protocols:** Explicit deference patterns (e.g., ImplicitSentimentCapture defers to ExplicitRatingCapture)
4. **Fail-safe defaults:** SecurityValidator, AutoWorkCreation, ImplicitSentimentCapture all use "fail open" on parse errors
5. **Event logging:** Security events logged to structured JSONL files for audit trails

**Architecture Weaknesses:**

1. **Error Handling: Inconsistent Strategies**
   - SecurityValidator: Fail-open on parse errors, exit(2) on hard blocks, exit(0) on soft blocks
   - AutoWorkCreation: Fail-silent on classification errors (falls back to defaults)
   - ImplicitSentimentCapture: Fail-silent on inference timeout (25s max)
   - No centralized error recovery or circuit breaker patterns
   - Silent failures don't surface to user (no visibility)

2. **Timeout Management: Ad-hoc Implementation**
   - SecurityValidator: 100ms stdin timeout
   - AutoWorkCreation: 5s stdin timeout, 10s inference timeout
   - ImplicitSentimentCapture: 5s stdin timeout, 25s analysis timeout
   - No global timeout policy or enforcement
   - No timeout monitoring or alerting

3. **Prompt-Based Hooks: Latency Risk**
   - AutoWorkCreation: LLM call per UserPromptSubmit (classifies prompt type)
   - ImplicitSentimentCapture: LLM call per UserPromptSubmit (sentiment analysis)
   - UpdateTabTitle: LLM call per UserPromptSubmit (summarizes prompt)
   - 3 concurrent LLM calls block every user prompt (0.5-1.5s each)
   - No batching, caching, or rate limiting

4. **Hook Conflicts: No Detection**
   - Multiple hooks write to same files (ratings.jsonl, current-work.json)
   - No locking, atomic writes, or conflict resolution
   - Race conditions possible if hooks run in parallel
   - No ordering guarantees documented beyond "multiple hooks on same event run sequentially"

5. **Performance: No Observability**
   - No hook execution time tracking
   - No performance budgets or SLOs
   - stderr logging only (no structured traces)
   - No monitoring or alerting on hook failures

**Example: SecurityValidator Hook**

```typescript
// SecurityValidator.hook.ts (simplified)
async function main(): Promise<void> {
  try {
    // Fast stdin read with timeout
    const text = await Promise.race([
      Bun.stdin.text(),
      new Promise<string>((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 100)
      )
    ]);

    const input = JSON.parse(text);

    // Validate and decide
    // ...

  } catch {
    // Parse error or timeout - fail open
    console.log(JSON.stringify({ continue: true }));
    return;
  }
}

// Run main, fail open on any error
main().catch(() => {
  console.log(JSON.stringify({ continue: true }));
});
```

**Analysis:** The fail-open strategy prioritizes usability over security. Parse errors, timeouts, and exceptions all result in `{continue: true}`. This is reasonable for a personal AI system but could mask systematic failures. No mechanism exists to surface repeated failures to the user.

---

### Agent Collaboration Audit

**Current Architecture:**

PAI distinguishes three agent systems:

1. **Task Tool Subagent Types** (built-in): Architect, Designer, Engineer, Intern, Explore, Plan, QATester, Pentester, ClaudeResearcher, GeminiResearcher, GrokResearcher
2. **Named Agents** (persistent identities): Serena (Architect), Marcus (Engineer), Rook (Pentester), Dev (Intern), Ava (Claude), Alex (Gemini)
3. **Custom Agents** (dynamic composition): Created via ComposeAgent from traits (expertise + personality + approach)

**Task Tool Interface:**

```typescript
Task({
  prompt: string,
  subagent_type: "Architect" | "Engineer" | "Intern" | ...,
  model?: "haiku" | "sonnet" | "opus"
})
```

**State Sharing:**

- Agents share filesystem access (same working directory)
- Agents can read/write to `MEMORY/STATE/current-work.json`
- Agents can append to `MEMORY/LEARNING/SIGNALS/ratings.jsonl`
- No coordination mechanism for concurrent writes
- No task dependencies or sequencing beyond implicit "launch in order"

**Coordination Patterns Observed:**

1. **Sequential Execution:** Launch agent 1, wait for result, launch agent 2
2. **Parallel + Spotcheck:** Launch multiple agents, then launch spotcheck agent to verify consistency
3. **Named Agent Continuity:** Use same named agent across sessions for relationship building

**Architecture Weaknesses:**

1. **No Collision Detection**
   - Multiple agents can modify same files simultaneously
   - No locking or conflict resolution
   - Race conditions on shared state files (current-work.json, ratings.jsonl)
   - No isolation between agent tasks

2. **No Shared State Coordination**
   - Agents cannot pass structured data between each other
   - All communication via filesystem side effects
   - No message passing or event bus
   - No transactional updates

3. **No Dependency Management**
   - Tasks cannot declare dependencies on other tasks
   - No task graph or DAG structure
   - "Spotcheck pattern" is manual, not enforced

4. **No Error Recovery**
   - If agent fails, no automatic retry
   - No fallback or delegation patterns
   - Failure propagation unclear

5. **Performance: No Observability**
   - No agent execution time tracking
   - No task queue visibility
   - AgentOutputCapture hook logs outputs but no structured telemetry

**Example: Parallel Agent Pattern (from system docs)**

```typescript
// Launch 3 custom research agents
Task({ prompt: agentPrompt1, subagent_type: "Intern", model: "sonnet" })
Task({ prompt: agentPrompt2, subagent_type: "Intern", model: "sonnet" })
Task({ prompt: agentPrompt3, subagent_type: "Intern", model: "sonnet" })

// Manual spotcheck
Task({
  prompt: "Verify consistency across all agent outputs: [results]",
  subagent_type: "Intern",
  model: "haiku"
})
```

**Analysis:** This pattern has no enforcement mechanism. Nothing prevents agents from writing conflicting data to shared files. The spotcheck agent receives results manually (user must copy/paste), not automatically via structured state.

---

## External Research

### Hook/Plugin Reliability Patterns

**Git Hooks Best Practices** ([Git Hooks for Automated Code Quality Checks Guide 2025](https://dev.to/arasosman/git-hooks-for-automated-code-quality-checks-guide-2025-372f), [Mastering Git Hooks: Advanced Techniques and Best Practices](https://kinsta.com/blog/git-hooks/)):

1. **Timeout Enforcement:** Default 30s timeout using `timeout` command
2. **Clear Error Messages:** Hooks return structured error messages explaining rejection reasons
3. **Graceful Failure:** Proper exit codes (0=success, non-zero=failure) with error logs
4. **Skip Mechanisms:** Environment variables or flags to bypass hooks when needed
5. **Validation:** Verify inputs, repository state before executing
6. **Logging:** Centralized logs with timestamps and correlation IDs

**VSCode Extension Reliability** ([Building VS Code Extensions in 2026: The Complete Guide](https://abdulkadersafi.com/blog/building-vs-code-extensions-in-2026-the-complete-modern-guide), [Extension runtime security](https://code.visualstudio.com/docs/configure/extensions/extension-runtime-security)):

1. **Event-Driven Activation:** Extensions activate on-demand, not at startup
2. **Lazy Loading:** Defer work until activation event fires
3. **Marketplace Signing:** All extensions signed, verified on install
4. **Automatic Removal:** Malicious extensions automatically uninstalled
5. **Performance Monitoring:** Too many extensions slow startup (user visibility)
6. **Hook Limitations:** VSCode extension hooks don't always work (CLI vs GUI inconsistency)

**Key Insights:**
- Industry standard: 30s timeout for background operations
- Fail-fast with clear error messages > fail-silent
- Skip mechanisms essential for development workflows
- Performance visibility important (users notice slow hooks)
- Hook reliability gaps exist even in mature systems (VSCode)

---

### Multi-Agent Coordination Research

**CrewAI Patterns** ([Agents - CrewAI](https://docs.crewai.com/en/concepts/agents), [Hierarchical AI Agents: A Guide to CrewAI Delegation](https://activewizards.com/blog/hierarchical-ai-agents-a-guide-to-crewai-delegation), [Building Multi-Agent Systems With CrewAI](https://www.firecrawl.dev/blog/crewai-multi-agent-systems-tutorial)):

1. **Coordination Modes:**
   - Sequential: Tasks run in order, each receives previous output
   - Hierarchical: Manager agent delegates to specialist agents
   - Parallel: Tasks run concurrently (experimental)

2. **Error Handling:**
   - `max_retry_limit` parameter (default: 2 retries per agent)
   - `respect_context_window=True`: Auto-summarize when history too large
   - Fault-tolerant: Errors send informative messages back to agent
   - Production pattern: Manager handles failures (retry, delegate, or flag)

3. **Delegation:**
   - `allow_delegation=True`: Agent can ask other agents for help
   - Workflow routing: Code reviewer flags error → route back to coder agent

4. **State Management:**
   - Agents share conversation context
   - Sequential tasks pass outputs as inputs
   - No explicit locking or concurrency control documented

**LangGraph Patterns** ([Agent Orchestration 2026: LangGraph, CrewAI & AutoGen Guide](https://iterathon.tech/blog/ai-agent-orchestration-frameworks-2026), [LangGraph vs AutoGen](https://www.zenml.io/blog/langgraph-vs-autogen), [Autogen vs LangGraph](https://www.openxcell.com/blog/autogen-vs-langgraph/)):

1. **State Management:**
   - Graph-based state transitions (nodes = agents, edges = state deltas)
   - Pass only necessary state deltas between nodes (most efficient)
   - Built-in state persistence (traceability, debugging)
   - Human-in-the-loop built on persistence layer

2. **Concurrency:**
   - Native parallel execution (multiple nodes run concurrently)
   - 2.2x faster than CrewAI in benchmarks
   - 8-9x better token efficiency than AutoGen

3. **Error Handling:**
   - State checkpoints enable rollback
   - Graph structure makes failures traceable

4. **Production Maturity (2026):**
   - Maximum control and flexibility for complex workflows
   - Production-grade monitoring and observability

**AutoGen Patterns** ([AutoGen vs LangGraph: Comparing Multi-Agent AI Frameworks](https://www.truefoundry.com/blog/autogen-vs-langgraph)):

1. **Coordination:**
   - Multi-agent conversations (agents talk to each other)
   - Linear conversation flow
   - No native parallel execution

2. **Error Handling:**
   - Less structured than LangGraph
   - Conversation-based error recovery

3. **Performance:**
   - Efficient for linear workflows
   - 8-9x worse token efficiency than LangGraph in benchmarks

**Operational Transformation & Optimistic Locking** ([Operational transformation - Wikipedia](https://en.wikipedia.org/wiki/Operational_transformation), [Optimistic Locking Concurrency Control Scheme](https://link.springer.com/chapter/10.1007/11568421_41)):

1. **Operational Transformation (OT):**
   - Optimistic concurrency control for real-time collaborative editing
   - Each client has own document copy, operates lock-free
   - When receiving changes from others, transform before applying
   - Maintains consistency criteria across distributed systems
   - Good for high-latency environments (web)

2. **Optimistic Locking:**
   - Assume operations won't conflict (optimistic)
   - Detect conflicts on commit, retry if conflict detected
   - Multi-granularity schemes balance responsiveness vs consistency

3. **Integration:**
   - Optional locking can integrate with OT in distributed real-time editors
   - Proven in collaborative editing (Google Docs, etc.)

**Key Insights:**
- Industry frameworks use explicit coordination modes (sequential, parallel, hierarchical)
- State management critical: LangGraph's state delta approach most efficient
- Error handling: Retry limits, context summarization, fallback delegation
- Concurrency: Parallel execution requires state isolation or transformation
- Production systems: Monitoring, traceability, checkpointing essential

---

## Findings

### Gap 3: Hook Reliability

**Current State:**
PAI's hook system is well-architected with documented patterns, shared libraries, and coordination protocols. However, error handling is inconsistent (fail-open, fail-silent, or fail-hard depending on hook), timeout management is ad-hoc, and prompt-based hooks risk latency accumulation.

**Industry Comparison:**
Git hooks enforce 30s timeouts, return structured errors, and provide skip mechanisms. VSCode extensions activate lazily and get performance monitoring. Both systems surface failures to users.

**Gap Analysis:**
1. **Error Recovery:** No centralized error handling or circuit breaker patterns
2. **Timeout Enforcement:** Ad-hoc timeouts (100ms to 25s) with no global policy
3. **Performance Visibility:** No hook execution time tracking or SLOs
4. **Prompt-Based Hook Latency:** 3 LLM calls per user prompt (0.5-1.5s each)
5. **Conflict Detection:** No locking or atomic writes for shared state files

**Root Causes:**
- Personal AI system optimizes for flexibility over strict reliability
- Fail-open philosophy prioritizes usability (don't block user)
- No monitoring infrastructure for hook performance
- Prompt-based hooks added incrementally without coordination

---

### Gap 11: Agent Collaboration

**Current State:**
PAI supports three agent types (Task tool, Named, Custom) with filesystem-based state sharing. Coordination patterns exist (sequential, parallel+spotcheck) but are manual. No collision detection, dependency management, or structured state coordination.

**Industry Comparison:**
CrewAI provides sequential/hierarchical/parallel modes with retry limits and delegation. LangGraph uses graph-based state deltas for efficiency and built-in persistence. Both frameworks support error recovery patterns.

**Gap Analysis:**
1. **Concurrency Control:** No collision detection or locking for concurrent agents
2. **State Coordination:** Agents communicate via filesystem side effects only
3. **Dependency Management:** No task graph or DAG structure
4. **Error Recovery:** No retry limits, fallback, or delegation patterns
5. **Observability:** No task queue visibility or structured telemetry

**Root Causes:**
- Task tool API is minimal (prompt + subagent_type only)
- No centralized agent orchestration layer
- Filesystem as shared state is simple but lacks coordination primitives
- Spotcheck pattern is convention, not enforcement

---

## Recommendations

### Immediate (P1)

| # | Recommendation | Impact | Effort | Evidence |
|---|---------------|--------|--------|----------|
| 1 | **Hook Timeout Policy**: Establish global timeout standards (fast=100ms, standard=5s, LLM=20s) and enforce via wrapper | High: Prevents hook hangs | Low: Add timeout wrapper in hooks/lib/ | Git hooks use 30s standard; PAI hooks already implement ad-hoc timeouts |
| 2 | **Hook Error Dashboard**: Create `MEMORY/STATE/hook-health.json` tracking failures, execution times, last run timestamps | High: Surfaces silent failures | Medium: Add error tracking to each hook + statusline display | VSCode surfaces extension performance; no visibility into PAI hook health currently |
| 3 | **Prompt-Based Hook Batching**: Batch LLM calls in AutoWorkCreation, ImplicitSentimentCapture, UpdateTabTitle into single inference request | High: 3x latency reduction (3 calls → 1) | Medium: Refactor 3 hooks to use shared inference queue | 3 hooks currently make sequential LLM calls per prompt (0.5-1.5s each) |
| 4 | **Agent Collision Detection**: Add file locking to current-work.json, ratings.jsonl writes via flock or advisory locks | High: Prevents race conditions | Low: Wrap writes in lock utility | Multiple agents/hooks write to same files with no coordination |
| 5 | **Task Dependency API**: Extend Task tool to accept `depends_on: [task_id]` parameter for explicit sequencing | Medium: Enables reliable parallel workflows | Medium: Requires Task tool extension in Claude Code | Current "spotcheck pattern" is manual, no enforcement |

### Near-Term (P2)

| # | Recommendation | Impact | Effort | Evidence |
|---|---------------|--------|--------|----------|
| 6 | **Hook Circuit Breaker**: After 3 consecutive failures, disable hook and notify user via voice + statusline | High: Prevents cascading failures | Medium: Add circuit breaker lib + hook health tracking | Industry pattern: fail-fast with visibility |
| 7 | **Structured Hook Logging**: Replace stderr logging with structured JSONL logs (`MEMORY/OBSERVABILITY/hooks.jsonl`) for tracing | Medium: Enables debugging, monitoring | Low: Add logging utility in hooks/lib/ | Current stderr logs disappear; no persistent trace |
| 8 | **Agent State Bus**: Implement message-passing layer (`MEMORY/STATE/agent-messages/`) for inter-agent communication | High: Enables structured coordination | High: New subsystem + agent API changes | Industry frameworks (CrewAI, LangGraph) use message passing, not filesystem side effects |
| 9 | **Hook Skip Mechanism**: Add `PAI_SKIP_HOOKS=security,sentiment` env var to bypass hooks during development | Medium: Developer ergonomics | Low: Check env var in hook main() | Git hooks support skip via env vars; essential for dev workflows |
| 10 | **Agent Retry Limits**: Add `max_retries` parameter to Task tool (default: 2) with exponential backoff | Medium: Improves reliability | Medium: Requires Task tool extension | CrewAI uses retry limits with default of 2; PAI has no retry mechanism |

### Future (P3)

| # | Recommendation | Impact | Effort | Evidence |
|---|---------------|--------|--------|----------|
| 11 | **Hook Marketplace Architecture**: Enable user-contributed hooks with sandboxing, signing, and security review | High: Extensibility, community | Very High: Security model, marketplace infrastructure | VSCode extension marketplace model; would enable PAI ecosystem |
| 12 | **Agent Orchestration DSL**: Graph-based agent workflow definition (LangGraph-inspired) for complex coordination | High: Advanced workflows | Very High: New DSL + runtime | LangGraph's graph-based approach is most efficient (2.2x faster than CrewAI) |
| 13 | **Operational Transformation for Agents**: Implement OT-based concurrency control for agents editing same files | High: True parallel collaboration | Very High: Complex algorithm | OT proven in collaborative editing; would enable conflict-free parallel agents |
| 14 | **Hook Performance SLOs**: Define and enforce performance budgets (e.g., UserPromptSubmit hooks < 2s total) | Medium: User experience | Medium: Add performance tracking + alerting | Industry standard: performance budgets for user-facing operations |
| 15 | **Agent Context Summarization**: Auto-summarize agent conversation history when approaching context limits | Medium: Prevents context overflow | Medium: Add summarization logic + token counting | CrewAI implements this with `respect_context_window=True` |

---

## Open Questions

1. **Hook Execution Order:** Should hooks within an event be guaranteed sequential, or can they run in parallel? Current docs imply sequential but don't guarantee it. Parallel execution would require coordination.

2. **Agent Task Persistence:** Should Task tool persist task state to filesystem for recovery after crashes? Current implementation is ephemeral.

3. **Hook Hot-Reload:** Should hook file changes apply without restarting Claude Code session? Would improve development ergonomics but add complexity.

4. **Agent Model Selection:** Should Task tool auto-select model based on prompt complexity, or require explicit specification? Current API allows optional model parameter.

5. **Hook Telemetry Privacy:** Should hook execution traces include prompt text, or only metadata? Security/sentiment hooks process sensitive data.

6. **Agent Communication Protocol:** Should agents use files, sockets, or API endpoints for message passing? Filesystem is simple but lacks coordination primitives.

7. **Hook Configuration Hierarchy:** Should projects have local hook overrides (`.pai/hooks/`) separate from global hooks (`~/.claude/hooks/`)? Git has global vs local hooks.

8. **Agent State Isolation:** Should agents run in separate working directories to prevent collisions, or share context via filesystem? Current approach shares everything.

9. **Hook Failure Thresholds:** What's the right threshold for circuit breaker activation? 3 consecutive failures? 5 failures in 10 runs?

10. **Agent Composition Complexity:** Custom agents compose from 3 trait categories (expertise, personality, approach). Is this sufficient granularity? Should traits be hierarchical?

---

## Conclusion

PAI's execution reliability foundations are solid—the hook system is well-documented and the agent system supports diverse use cases. However, both systems lack production-grade coordination, error recovery, and observability patterns found in mature frameworks.

**Critical Path:**
1. Implement hook timeout policy and error dashboard (P1 #1-2) for immediate visibility
2. Add collision detection and task dependencies (P1 #4-5) to prevent race conditions
3. Batch prompt-based hooks (P1 #3) to reduce latency
4. Build toward structured coordination (P2 #8, P3 #12-13) for advanced workflows

The recommendations prioritize quick wins (error visibility, collision detection) before systemic changes (orchestration DSL, OT-based concurrency). This incremental approach balances risk and value delivery while building toward a production-grade execution reliability layer.

---

## Sources

### Hook System Research
- [Git Hooks for Automated Code Quality Checks Guide 2025](https://dev.to/arasosman/git-hooks-for-automated-code-quality-checks-guide-2025-372f)
- [Mastering Git Hooks: Advanced Techniques and Best Practices](https://kinsta.com/blog/git-hooks/)
- [Guide to GitHub Webhooks Features and Best Practices](https://hookdeck.com/webhooks/platforms/guide-github-webhooks-features-and-best-practices)
- [Building VS Code Extensions in 2026: The Complete Guide](https://abdulkadersafi.com/blog/building-vs-code-extensions-in-2026-the-complete-modern-guide)
- [Extension runtime security](https://code.visualstudio.com/docs/configure/extensions/extension-runtime-security)
- [Plugin hooks not triggered in VSCode extension](https://github.com/thedotmack/claude-mem/issues/382)

### Multi-Agent Coordination Research
- [Agents - CrewAI](https://docs.crewai.com/en/concepts/agents)
- [Hierarchical AI Agents: A Guide to CrewAI Delegation](https://activewizards.com/blog/hierarchical-ai-agents-a-guide-to-crewai-delegation)
- [Building Multi-Agent Systems With CrewAI](https://www.firecrawl.dev/blog/crewai-multi-agent-systems-tutorial)
- [Multi AI Agents Systems with CrewAI](https://medium.com/@sulbha.jindal/multi-ai-agents-systems-with-crewai-71301bd3dd9a)
- [Agent Orchestration 2026: LangGraph, CrewAI & AutoGen Guide](https://iterathon.tech/blog/ai-agent-orchestration-frameworks-2026)
- [LangGraph vs AutoGen: How are These LLM Workflow Orchestration Platforms Different?](https://www.zenml.io/blog/langgraph-vs-autogen)
- [Autogen vs LangGraph: Comparing Multi-Agent Workflow Solutions](https://www.openxcell.com/blog/autogen-vs-langgraph/)
- [AutoGen vs LangGraph: Comparing Multi-Agent AI Frameworks](https://www.truefoundry.com/blog/autogen-vs-langgraph)
- [First hand comparison of LangGraph, CrewAI and AutoGen](https://aaronyuqi.medium.com/first-hand-comparison-of-langgraph-crewai-and-autogen-30026e60b563)
- [Operational transformation - Wikipedia](https://en.wikipedia.org/wiki/Operational_transformation)
- [Optimistic Locking Concurrency Control Scheme for Collaborative Editing System](https://link.springer.com/chapter/10.1007/11568421_41)
- [Operational Transformation: An Introduction](https://fitzgen.com/2011/03/26/operational-transformation-an-introduction.html)
