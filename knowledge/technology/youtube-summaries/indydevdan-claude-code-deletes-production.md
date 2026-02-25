---
category: technology
format: discussion
video_title: "Claude Code is Amazing... Until It DELETES Production"
channel: IndyDevDan
analysis_date: 2026-02-01
source_topic: ai-llms
fabric_patterns_applied: [extract_wisdom, extract_insights]
transcript_word_count: 4708
reviewed: true
key_topics: [claude-code, security, hooks, damage-control, production-safety, agent-safety]
---

# Claude Code is Amazing... Until It DELETES Production

**Channel:** IndyDevDan | **Words:** 4708

## One-Sentence Summary
Comprehensive damage control system using Claude Code hooks prevents catastrophic production deletions through deterministic blocks, prompt guards, permission requests.

## Executive Summary

This video addresses the critical security challenge of AI agents executing destructive commands on production systems. IndyDevDan presents a comprehensive damage control framework using Claude Code's hook system to prevent catastrophic irreversible commands from running. The system implements four layers of protection: local project hooks, global user-level hooks, deterministic pattern matching for known dangerous commands, and non-deterministic prompt-based guards for previously unseen destructive operations.

The presenter provides a ready-to-use skill with an interactive /install command that walks engineers through setting up hooks across three scopes (global, project, personal) with support for both Python and TypeScript environments. The damage control system uses a patterns.yaml file to maintain three protection levels: zero-access paths (completely blocked), read-only paths (no modifications), and no-delete paths (read/write allowed, deletion blocked). The prompt hook feature stands out as a last-ditch safety mechanism that uses LLM evaluation to catch destructive commands that weren't explicitly anticipated.

The video emphasizes that while AI models are improving their built-in safety, one hallucinated destructive command out of 100,000 can destroy months of work. The message is clear: sandboxes help, but deterministic and probabilistic hook systems reduce the need for trust, making agent autonomy safer for production environments.

## Key Insights

- Single destructive command hallucination can erase months of work
- Prompt hooks catch unknown dangerous commands through LLM evaluation
- Patterns file enables granular path protection with minimal configuration
- Global hooks provide baseline safety across all development environments
- Agent trust built through deterministic controls not blind faith
- Interactive installation workflows improve skill adoption across teams significantly
- Hook system runs parallel catching fastest responder reducing delay
- Sandboxes defer trust but hooks eliminate trust requirement entirely

## Core Ideas

- AI coding agents can permanently delete production databases codebases git repositories in single misinterpreted hallucinated command
- Claude Code hooks provide four damage control layers local project global user deterministic prompt-based protections
- Local hooks configured in project settings.json file catch commands before execution using pre-tool use matchers
- Global hooks installed at user level apply everywhere on device merging with project settings automatically
- Prompt hooks use LLM to evaluate bash commands for destructiveness catching previously unseen dangerous operations
- Deterministic hooks block explicitly listed patterns using regex matching for known dangerous command structures reliably
- Patterns.yaml file centralizes damage control configuration making updates simple without editing multiple hook scripts directly
- Interactive /install command uses ask-user-question tool to guide engineers through multi-step configuration workflow agentic setup
- Zero-access paths completely block agent interaction preventing reads writes or any file system operations whatsoever
- Read-only paths allow agents to read file contents but prevent modifications ensuring critical configurations remain unchanged
- No-delete paths permit reading and writing but block deletion operations providing granular protection for important files
- Hook scripts are lightweight wrappers around patterns file loading regex matching and returning block decisions efficiently
- Pre-tool use hooks catch bash edit write commands before execution preventing irreversible damage from completing successfully
- Ask patterns enable conditional execution where agent requests permission before running potentially destructive but sometimes necessary commands
- Hook hierarchy follows user project local enterprise levels with proper merging enabling layered security controls effectively
- Prompt hooks run on every bash command adding latency but preventing catastrophic production asset deletion permanently
- Models improving safety features but single missed hallucination out of hundred thousand tool calls ruins careers
- Trust building with agents parallels trust building with junior engineers requiring graduated access to critical systems
- Sandbox environments provide complete isolation but hooks enable safe production access with controlled risk exposure practically
- Skill-based distribution enables reusable damage control across codebases with consistent security posture organization-wide guaranteed implementation

## Notable Quotes

> "Your agent had too much compute last night and it starts hallucinating at the worst possible time back to back to back running damaging commands." -- IndyDevDan

> "If you delete your codebase, your git repo, or your production database, it doesn't matter how fast, powerful, or autonomous your agents are." -- IndyDevDan

> "All of your months and years of hard work can be evaporated in a single misinterpreted or hallucinated command." -- IndyDevDan

> "Most engineers don't know about prompt hooks." -- IndyDevDan

> "Whatever you put in this prompt is fantastic and you should consider this an additional guard." -- IndyDevDan

> "As soon as you find that command, you should add them to your deterministic hook. This is essentially a last ditch effort." -- IndyDevDan

> "The problem is just that there is a chance that your agents can permanently damage your production assets." -- IndyDevDan

> "Running this prompt every single time is going to be faster than potentially deleting a valuable production asset." -- IndyDevDan

> "Claude Code is already really good at this stuff. It's trained on not deleting important files." -- IndyDevDan

> "You just don't want to think about your security over and over and over. You just want to have great defaults and then you want to run with it." -- IndyDevDan

> "Yes, models are improving. Yes, Cloud Code and Opus have great built-in protections, but there's going to be a moment where you miss something." -- IndyDevDan

> "One out of a 100,000. That's enough to really ruin your day. It's enough to destroy a lot of value." -- IndyDevDan

> "Building out Claude Code hooks and having a great deterministic and probabilistic hook system is going to be a great way to not require trust at all." -- IndyDevDan

> "Just like you trust the engineer on your team that you know is not going to delete the production database versus that new hire." -- IndyDevDan

> "We're talking days and months of work that can be deleted in an instant." -- IndyDevDan

## Practical Recommendations

- Install damage control hooks on every production codebase immediately before enabling agent autonomy in environments
- Use interactive /install command pattern for skills requiring complex multi-step configuration across different project types
- Configure zero-access paths for credentials SSH keys API tokens preventing any agent interaction whatsoever
- Set read-only protection on configuration files bash profiles environment variables allowing reads blocking modifications safely
- Enable no-delete paths on source code directories allowing agent edits but preventing accidental file removal
- Add dangerous commands to deterministic hooks immediately after discovering them through prompt hook catches naturally
- Use ask patterns for operations requiring human judgment like database deletions production deployments credential rotations carefully
- Implement global hooks as baseline safety layer protecting all development environments on device automatically everywhere
- Layer project-specific hooks on top of global hooks for additional protection tailored to codebase requirements
- Test hook configurations by attempting destructive operations in safe environment before trusting production deployment scenarios
- Create patterns.yaml file for each codebase making damage control rules explicit and easily auditable by teams
- Run prompt hooks on all bash commands accepting latency cost for comprehensive protection against unforeseen attacks
- Build interactive skill installation workflows using ask-user-question tool for consistent team adoption across different engineers
- Fork and customize damage control skill to match organization-specific security policies and compliance requirements precisely
- Document all blocked commands and protection levels in skill README enabling new team members understanding quickly
- Combine sandboxes with hooks creating layered defense strategy reducing risk exposure while maintaining development velocity
- Review hook logs regularly to identify patterns of blocked commands and improve deterministic rules proactively
- Set up merge workflows for installing hooks in codebases with existing settings.json preventing accidental configuration overwrites

## Facts & Data Points

- Claude Code hooks support four hierarchy levels user project local enterprise with proper merging behavior
- Prompt hooks run on every bash command using LLM to evaluate potential destructiveness catching unknown risks
- Hook scripts run in parallel with fastest finisher determining which protection mechanism catches command first
- Patterns.yaml file supports three protection levels zero-access read-only no-delete for granular path control
- Interactive /install command supports three installation scopes global project personal with TypeScript and Python options
- Pre-tool use matchers catch bash edit write commands before execution enabling prevention not just detection
- Agent deterioration risk exists even with improving models requiring deterministic safety mechanisms not trust alone
- Single destructive command out of hundred thousand tool calls can destroy months of production engineering work
- Global hooks apply everywhere on device merging with project settings providing baseline safety for all work
- Hook system prevents rm commands psql deletions AWS CLI destructive operations cloud platform dangerous calls automatically
- Damage control skill includes nine-step agentic workflow for installation setup and configuration across different environments
- Claude Code has built-in training to avoid deleting important files like bashrc creating backups before operations
- Ask patterns enable conditional execution where agent requests permission before running potentially destructive necessary commands
- Patterns file uses regex matching for command blocking supporting complex patterns beyond simple string matching
- Hook hierarchy documentation available in Claude Code official docs detailing precedence and merging behavior clearly
- Sandbox environments provide complete isolation but hooks enable safe production access with controlled risk exposure
- Skill-based distribution enables consistent damage control across multiple codebases with standardized security posture organization-wide

## References & Resources

- **Claude Code Hooks** - Official hook system for pre/post tool execution control
- **Claude Code Damage Control Skill** - IndyDevDan's ready-to-use hook installation skill
- **settings.json** - Claude Code configuration file for hooks and permissions
- **patterns.yaml** - Custom configuration file for centralized damage control rules
- **Astral UV** - Python package manager used in hook scripts
- **Bun** - JavaScript runtime alternative for TypeScript hook implementations
- **Ask User Question Tool** - Claude Code interactive prompt mechanism
- **Pre-tool Use Matchers** - Hook system feature catching commands before execution
- **User/Project/Local/Enterprise Hooks** - Four hierarchy levels in Claude Code
- **Agent Sandbox Video** - Referenced video about complete trust deferral
- **Cursor IDE** - VS Code fork shown for development environment
- **Git Clone** - Installation method for damage control skill distribution
- **PSQL Commands** - PostgreSQL CLI referenced for database deletion risks
- **AWS CLI** - Amazon Web Services command-line interface mentioned for cloud risks
- **Google Cloud CLI** - Google Cloud Platform tools referenced for destructive operations
- **/install Command** - Custom command pattern for interactive skill setup

## PAI Action Items

| Action | Category | Priority | Context |
|--------|----------|----------|---------|
| Implement deterministic hook system blocking known destructive commands | security | P1 | Prevent accidental production asset deletion from agents |
| Build prompt-based hook using LLM to evaluate unknown commands | security | P1 | Catch previously unseen destructive operations before execution |
| Create patterns.yaml configuration system for centralized damage control | architecture | P1 | Enable easy updates without editing multiple scripts |
| Develop interactive /install workflow for damage control deployment | skill-development | P2 | Improve adoption across different PAI contexts and projects |
| Configure zero-access read-only no-delete path protection levels | security | P1 | Implement granular file system protection for critical assets |
| Deploy global hooks providing baseline safety across all environments | security | P1 | Ensure consistent protection even in new unconfigured projects |
| Add ask-patterns for operations requiring human judgment confirmation | workflow | P2 | Balance agent autonomy with human oversight for critical operations |
| Build hook logging and monitoring to identify blocked command patterns | instrumentation | P3 | Improve deterministic rules through observability of agent behavior |

## Cross-Reference Tags

themes: [agent-security, production-safety, claude-code-hooks, damage-control, trust-building, deterministic-controls, prompt-guards, file-protection]
