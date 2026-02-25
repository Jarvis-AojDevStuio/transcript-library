---
category: technology
format: tutorial
video_title: "Claude Code's New Task System Explained"
channel: Ray Amjad
analysis_date: 2026-02-02
source_topic: ai-llms
fabric_patterns_applied: [extract_wisdom, extract_insights]
transcript_word_count: 2545
reviewed: true
key_topics: [claude-code, task-management, dependency-tracking, sub-agents, parallel-execution, beads-integration]
---

# Claude Code's New Task System Explained

**Channel:** Ray Amjad | **Words:** 2545

## One-Sentence Summary
Claude Code's new task system persists work across sessions with dependency tracking enabling workflows.

## Executive Summary
Ray Amjad explains Claude Code's revolutionary task management system that solves "agent amnesia"—the problem where agents forget context when starting new sessions. Inspired by the Beads repository, the system replaces ephemeral to-do lists with persistent tasks stored in `.claude/tasks/` with dependency tracking, enabling parallel execution and cross-session sharing. Each task can be completed by independent sub-agents with fresh context windows, mirroring real engineering workflows with blockers and handoffs. The system supports multi-session orchestration where two Claude Code instances share the same task list with real-time updates, enabling novel workflows like having one session execute tasks while another spawns checker sub-agents to verify implementations. This fundamentally changes long-term project work by preserving state across context limits and enabling sophisticated parallel agent coordination.

## Key Insights
- Persistent task storage eliminates agent amnesia across session boundaries completely
- Dependency tracking enables parallel execution with blocker awareness like real engineering
- Sub-agent isolation gives each task fresh context preventing context window bloat
- Real-time task list synchronization between sessions enables orchestration patterns previously impossible
- Task system reduces context usage from 56 percent to 18 percent through parallelization
- Checker workflows enable quality assurance separate from implementation execution automatically
- Task list ID configuration prevents accidental task loss during session resets
- Beads integration shows Claude team adopting successful community patterns into product

## Core Ideas
- Claude Code update introduces brand new persistent task management system with dependency tracking.
- Biggest problem previously was agent amnesia where new sessions forgot task context completely.
- Starting new session due to context window limits caused agents to forget progress entirely.
- Beads repository provided popular solution writing goals and next steps to JSON files.
- Coding agents drop bugs when context window already at 90,000-100,000 tokens capacity.
- Claude Code team inspired by Beads and integrated similar functionality into core product.
- Previous to-do lists stored in session memory not persisting across different sessions ever.
- New task list saved to computer in `.claude/tasks/` folder persisting across sessions permanently.
- Each task has description plus blocks and blocked-by relationships defining task dependencies clearly.
- Dependencies enable many tasks running in parallel reliably with completion order guarantees always.
- Task list stored on file system shared across different sessions and sub-agents universally.
- Sub-agent one completes task one, sub-agent two completes task two, each isolated.
- Main session and sub-agents have access to four new tools: TaskCreate, TaskGet, TaskUpdate, TaskList.
- Sub-agents can create new tasks for other sub-agents when discovering additional work needed.
- Makes Claude Code more useful for longer projects across many different sessions dramatically.
- Two sessions with different sub-agents can all share same set of tasks simultaneously.
- Hypersper application example adding 11 Labs provider requiring six tasks with dependencies identified.
- Task three depends on two, task five depends on one two and four creating dependency graph.
- Tasks written to folder with session ID as folder name for organization and isolation.
- Must specify "completed by different sub-agents" or tasks complete in main chat instead.
- Wave 1 had three tasks run in parallel, wave two next, then wave three sequentially.
- Using sub-agents for each task resulted in 18 percent context usage versus 56 percent single session.
- Each task completed in own fresh context window similar to Ralph Wiggum pattern benefits.
- Mirrors real engineering workflows with parallel work, handoffs, blockers, and dependencies naturally accurately.
- Unlike Ralph bash loop, orchestrator still exists slowly eating context receiving sub-agent outputs.
- Can tell sub-agents to update task list with new tasks discovered during execution.
- Can tell sub-agents to update next task with relevant information discovered during current work.
- Two different sessions A and B can share same context with task list synchronization.
- Previously required polling every 30 seconds causing stale task status views during interval.
- New system notifies sessions immediately when task marked completed or updated in any way.
- No stale information problem and prevents two sessions accidentally starting same task simultaneously.
- Task list ID environment variable defines shared task list between sessions for synchronization.
- Localization example shows 15 tasks created on left appearing immediately on right session.
- Updates to blocking relationships reflected immediately on right session without any prompts sent.
- Can specify different sub-agent types for each task type if project has multiple varieties.
- Right session can act as monitor spawning checker sub-agents every 30 seconds for verification.
- Checker sub-agents verify task completion correctness adding new tasks if implementation incomplete or wrong.
- Found five completed tasks, spawned checker sub-agents, verified all five, then sleeps and repeats.
- Enables sophisticated workflows with execution session and separate verification session running parallel operations.
- Could use code simplification or security vulnerability identification as checking tasks automatically and systematically.
- Could spawn headless Codex Claude or Gemini Claude for checking instead of same-model validation.
- Default task list ID is session ID meaning /clear command loses tasks if custom ID not set.
- Can set task list ID in settings.json to project name for persistence across session resets.
- Claude Code deletes all tasks only after all completed not on session reset when custom ID set.
- Claude team integrates popular community packages like Beads into core product iteratively over time.

## Notable Quotes
> "Yesterday we had a pretty interesting cloud code update that may change the way that many of you fundamentally use cloud code."

> "One of the biggest problems of coding agents these days is this agent amnesia that it has."

> "If you start a brand new session in the middle of a task because the context window filled up too much or something, then the agent would forget where it was."

> "Beads is kind of now integrated into cloud code."

> "Previously cloud code had a to-do list... stored in session memory and did not persist across different sessions."

> "Each sub agent now has the ability to see which tasks there are which are ones are remaining and to even write new tasks as well."

> "This makes cloud code more useful for longer projects across many different sessions and sub agents."

> "By the end of the plan we only used 18% of the context window... versus 56% of the context window instead."

> "It's kind of like Ralph Wigum as well because each task has been completed in its own brand new fresh context window."

> "This now mirrors real engineering workflows where you have work being done in parallel. You have handoffs, blockers, and dependencies."

> "Unlike the real Ralph Wigan bash loop, we still have an orchestra in this case, which is slowly like eating into our context window."

> "Each session is notified immediately when the task is marked as completed or updated in any way."

> "You could have the second session of cloud code being a checker."

> "The default value for the task list ID will always be the session ID. Which means that if you don't define your task list ID and then do / clear, for example, that will start a brand new session and your task list will disappear."

> "The team looks at any popular packages online and then integrates a version of that into cloud code itself."

## Practical Recommendations
- Specify "complete each task by different sub-agents" to ensure parallel execution and context isolation.
- Set custom task list ID in settings.json to project name preventing loss on session reset.
- Use environment variable `CLAUDE_CODE_TASK_LIST_ID=projectname` before launching Claude Code for sharing tasks.
- Review task dependencies after generation to ensure correct blocking relationships before execution begins immediately.
- Monitor context usage comparing single-session versus sub-agent execution to validate efficiency gains empirically.
- Implement two-session workflow with one executing and one checking for quality assurance automation.
- Configure checker session to spawn verification sub-agents every 30 seconds for completed tasks systematically.
- Tell checker sub-agents to add new tasks if implementation incomplete or incorrect per requirements.
- Use TaskList tool periodically to view overall progress and remaining work across all sessions.
- Leverage TaskCreate in sub-agents to add discovered work without interrupting orchestrator flow entirely.
- Use TaskUpdate to pass information between dependent tasks for handoff context preservation explicitly always.
- Consider headless alternative model instances for checking versus same-model validation for diversity coverage.
- Store task list ID in settings.json at project level rather than relying on session ID default.
- Use polling intervals of 5-30 seconds for checker sessions balancing responsiveness and context consumption.
- Experiment with different sub-agent types for specialized tasks when project complexity justifies architecture overhead.

## Facts & Data Points
- Claude Code task system update released one day before video publication in late January 2026.
- Task system inspired by Beads repository popular in coding agent community for persistence.
- Tasks stored in `.claude/tasks/` folder on local file system not in session memory.
- Four new tools available: TaskCreate, TaskGet, TaskUpdate, TaskList for task manipulation universally.
- Hypersper application example required six tasks with identified dependency relationships for 11 Labs integration.
- Sub-agent execution used 18 percent context window versus 56 percent single-session approach demonstrating efficiency.
- Context window problems begin at 90,000-100,000 tokens causing agents to drop bugs discovered.
- Previous polling solutions required 30-second intervals causing stale task status views during wait period.
- Task list ID defaults to session ID meaning /clear loses tasks without custom configuration set.
- Real-time synchronization enables immediate notification when tasks marked completed or updated anywhere in system.
- Three-wave parallel execution possible with wave 1 running three tasks simultaneously when no dependencies block.

## References & Resources
- **Beads** - Popular repository for coding agent persistence that inspired Claude Code integration
- **Claude Code** - Anthropic's agentic coding tool with new task management system
- **Hypersper** - Ray Amjad's application used as demonstration example for task system
- **11 Labs** - Text-to-speech provider being integrated in demo example workflow
- **Deep Gram** - Existing speech provider in Hypersper application before integration work
- **Ralph Wiggum Loop** - Context reset pattern referenced for comparison with task isolation
- **Codex Claude** - Mentioned as potential headless checker sub-agent option for verification
- **Gemini Claude** - Alternative mentioned for headless checker sub-agent spawning for quality assurance
- **.claude/tasks/ Folder** - Local storage location for persistent task JSON files on filesystem
- **Settings.json** - Configuration file for setting persistent task list ID at project level
- **Ray Amjad's Claude Code Masterclass** - Mentioned course with comprehensive training and future updates

## PAI Action Items

| Action | Category | Priority | Context |
|--------|----------|----------|---------|
| Implement task dependency tracking in PAI Task tools matching Claude Code pattern | task-management | P1 | Enable parallel agent execution with blocker awareness |
| Create persistent task storage in PAI system surviving session resets and context limits | system-architecture | P1 | Eliminate agent amnesia across multi-session work |
| Build PAI two-session orchestration pattern with executor and checker workflows | quality-assurance | P2 | Separate implementation from verification for higher quality |
| Add TaskCreate/Get/Update/List tools to all PAI agents for task manipulation capability | agent-capabilities | P1 | Enable sub-agents to discover and create tasks dynamically |
| Configure PAI task list ID persistence in settings preventing accidental task loss | user-experience | P1 | Avoid frustration from lost work on session resets |
| Measure context usage reduction when using sub-agent task isolation in PAI | performance-analysis | P2 | Validate efficiency gains empirically in PAI context specifically |
| Build PAI hook to recommend task decomposition when detecting complex multi-step work | workflow-optimization | P2 | Proactively suggest task system usage for appropriate scenarios |
| Create PAI evals comparing single-session versus multi-agent task completion quality metrics | quality-measurement | P3 | Quantify quality improvements from isolation and fresh context |
| Implement real-time task synchronization between PAI agent instances when sharing lists | technical-infrastructure | P2 | Enable orchestration patterns without polling delays and staleness |
| Document PAI task system workflows in architecture docs with execution and checker patterns | documentation | P2 | Educate users on sophisticated multi-session orchestration capabilities available |

## Cross-Reference Tags
themes: [task-management, dependency-tracking, sub-agents, parallel-execution, context-isolation, multi-session-orchestration, beads-integration, agent-amnesia, persistent-state]
