---
category: technology
format: discussion
video_title: "Why MCP is dead & How I vibe now"
channel: AI Jason
analysis_date: 2026-02-02
source_topic: ai-llms
fabric_patterns_applied: [extract_wisdom, extract_insights]
transcript_word_count: 2094
reviewed: true
key_topics: [mcp, skills-system, token-optimization, claude-code, agent-efficiency]
---

# Why MCP is dead & How I vibe now

**Channel:** AI Jason | **Words:** 2094

## One-Sentence Summary
Skills plus CLI tools reduce AI agent token consumption by 70% versus MCP servers.

## Executive Summary
AI Jason argues that the Model Context Protocol (MCP) approach is inefficient for Claude Code agents because every MCP server loads all tool schemas into context regardless of relevance, consuming massive amounts of tokens. He demonstrates that the Skills + CLI tool pattern—where skills load minimal tokens and execute commands on-demand—can reduce token consumption by over 70% while providing more flexibility. The video walks through converting MCP servers to skills using MCP Porter, showcases real-world examples including browser automation comparisons, and introduces a "add new MCP" skill that automates the conversion process. This represents a fundamental shift in agent architecture from always-loaded tools to just-in-time capability retrieval.

## Key Insights
- Skills consume 10-50 tokens each versus thousands for MCP tools
- CLI tools enable piping, debugging, and complex command composition naturally
- Context window efficiency directly impacts agent performance and cost dramatically
- Agent Browser skill uses 70% fewer tokens than Chrome MCP
- Skills pattern scales to thousands of integrations without context bloat
- On-demand loading beats always-available for infrequently used capabilities consistently
- MCP Porter bridges MCP tools to CLI for backward compatibility
- Token efficiency is the critical constraint for agent capability expansion

## Core Ideas
- MCP servers bundle multiple tools with JSON schemas loaded into context constantly, regardless necessity.
- Each MCP tool consumes context whether current task needs it or not wastefully always.
- Skills add only 10-50 tokens per skill, allowing 4000+ integrations with same MCP footprint.
- CLI tools combined with skills provide 70% token reduction in real-world browser testing scenarios.
- Agent Browser returns optimized page structure info versus verbose MCP browser tool output always.
- CLI tools enable bash piping, waiting, result passing that MCP tools cannot easily support.
- Manis breaks tools into fundamental (always-loaded) and infrequent (command-line accessible) tiers strategically.
- MCP Porter allows running MCP servers through CLI with schema introspection helper functions available.
- Converting MCP to skills requires creating skill.md with tool descriptions and CLI execution instructions.
- Chrome DevTools MCP left 87k tokens available versus Agent Browser skill leaving 117k tokens.
- Skills pattern allows meta-skill for adding new MCP skills, enabling self-extending agent architectures.
- Super Design integration used CLI-first approach rather than MCP for design agent integration naturally.
- Context 7 MCP converted to skill runs via "mpx mcp-porter call context7 resolve-library-id" command.
- Token consumption directly impacts effective context window available for actual task work and reasoning.
- Skills retrieve only when semantically matched versus MCP tools always consuming context window space.
- CLI tools provide better error handling and debugging capabilities than MCP protocol abstractions fundamentally.

## Notable Quotes
> "Every MCP server you add comes with this bundle of different tools and each tool comes with this JSON schema and all those information is part of context no matter whether the task that agent is doing at moment is relevant or not."

> "A much more scalable and easy to use method in my opinion is this combination of skills plus CLI tool."

> "With the amount of token that is taken from MCP tools in this screenshot, you can easily add about 4,000 different SKUs, which is more than anything you will possibly need."

> "Using agent browser with the same task when it finish it got 117,000 token left that is 70% less token consumptions."

> "This bash plus CLI tool just provides so much more freedom about how agent can execute tasks."

> "One thing I think really everyone should be doing is migrate off your MCP to a skill instead."

> "Every single skill you add only additional 10 to 50 tokens."

> "Instead of adding the context 7 MCP tool, I can just add this one skill.md file for contact 7."

> "It allows you extend your agent capability to hundreds different integrations with only minimum amount of token consumptions."

> "Browser tool like playride or even cloud code's own chrome mcp is very complicated because it will load up a whole bunch of different tools."

## Practical Recommendations
- Convert existing MCP servers to skills using MCP Porter for immediate 70 percent efficiency gains.
- Separate fundamental always-needed tools from infrequent tools that should be CLI-accessible on demand.
- Use Agent Browser skill instead of Chrome MCP for browser automation tasks reducing consumption.
- Create meta-skills like "add new MCP" to automate conversion process for future integrations smoothly.
- Optimize skill descriptions to further reduce token consumption beyond default 10-50 token baseline.
- Build new integrations CLI-first rather than MCP-first for better token efficiency from project start.
- Use skill.md files with CLI command documentation instead of exposing full tool schemas always.
- Implement MCP Porter for backward compatibility while migrating to skills-based architecture over time gradually.
- Monitor effective context window remaining after tool loading to measure token efficiency improvement quantitatively.
- Leverage CLI tool piping capabilities for complex multi-step actions in single command execution.
- Return optimized, structured data from CLI tools rather than verbose HTML or unstructured responses.
- Test token consumption before and after migration to validate 70 percent reduction claims empirically.
- Join AI Builder Club for pre-built skill templates including "add new MCP" meta skill.
- Use Super Design CLI tool as reference implementation for CLI-first agent integration architecture patterns.

## Facts & Data Points
- Skills consume 10-50 tokens each versus thousands consumed by equivalent MCP server tool bundles.
- Agent Browser skill resulted in 117k tokens remaining versus 87k with Chrome MCP tool approach.
- 70 percent token consumption reduction achieved in real-world browser automation testing comparison scenario.
- 4000 different skills can fit in token budget of typical MCP tool collection loaded.
- Chrome DevTools MCP consumes approximately 2 percent of total available context window constantly regardless.
- Claude Code effective context window is 128k tokens in baseline configuration without additional tools.
- MCP tools introduce JSON schemas for every bundled tool regardless of current task relevance.
- Manis agent separates fundamental tools that load always from infrequent tools accessed via CLI.
- MCP Porter provides helper functions to introspect tool schemas and parameters through command line.
- Context 7 MCP can be called via "mpx mcp-porter call context7 resolve-library-id parameters" syntax.
- Super Design CLI tool installed via "npm install -g superdesign/cli" and authorized with login.
- Skills pattern introduced end of 2025, gained popularity in early 2026 for efficiency reasons.
- Agent Browser returns optimized page structure and interactive elements versus verbose MCP browser output.

## References & Resources
- **MCP Porter** - Open source CLI tool for running MCP servers through command line
- **Agent Browser** - CLI browser automation tool optimized for AI agents
- **Manis** - AI coding agent showcasing skills-based context engineering approach
- **Context 7** - Documentation lookup MCP server converted to skill in examples
- **Super Design** - Platform for AI-driven design generation with Claude Code integration
- **Claude Code Works** - Anthropic's specialized version of Claude Code for knowledge work
- **AI Builder Club** - Community resource with pre-built skills and templates
- **Chrome DevTools Protocol (CDP)** - Browser automation protocol used in MCP comparison
- **Playwright** - Browser testing framework mentioned as complex MCP implementation
- **HubSpot Research** - 12 advanced prompts for Claude Code Works use cases

## PAI Action Items

| Action | Category | Priority | Context |
|--------|----------|----------|---------|
| Audit current MCP servers in PAI system for token consumption | system-optimization | P1 | Measure baseline before conversion |
| Convert high-token MCP servers to skills using MCP Porter pattern | system-architecture | P1 | Immediate 70% efficiency gains available |
| Implement "add new MCP" meta-skill for self-extending architecture | skill-development | P2 | Enables automated future conversions |
| Adopt CLI-first approach for new PAI tool integrations | development-standards | P1 | Prevent future token bloat |
| Create skill token consumption monitoring dashboard | observability | P2 | Track efficiency metrics over time |
| Separate PAI tools into fundamental vs on-demand tiers | system-architecture | P1 | Follow Manis pattern for efficiency |
| Build CLI wrapper for PAI-specific tools to enable skills pattern | infrastructure | P2 | Enable skills-based access to custom tools |
| Document skills conversion process in PAI architecture docs | documentation | P3 | Knowledge sharing for team |
| Evaluate Agent Browser as replacement for browser automation MCP | tool-evaluation | P2 | Potential 70% token savings |
| Create PAI skill template library for common integration patterns | developer-experience | P3 | Standardize skill creation process |

## Cross-Reference Tags
themes: [token-optimization, skills-architecture, agent-efficiency, mcp-alternatives, cli-tools, context-management]
