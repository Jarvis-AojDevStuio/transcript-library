---
category: technology
format: tutorial
video_title: "The senior engineer's guide to AI coding: Context loading, custom hooks, and automation"
channel: How I AI
analysis_date: 2026-02-01
source_topic: ai-llms
workflow: YouTubeAnalyzer/TutorialWorkflow
transcript_word_count: 10405
reviewed: true
packages_tracked: 8
key_topics: [claude-code, mermaid-diagrams, hooks, context-loading, automation, senior-engineering]
---

# The Senior Engineer's Guide to AI Coding: Context Loading, Custom Hooks, and Automation

**Channel:** How I AI | **Words:** 10405 | **Format:** Tutorial Interview

## One-Sentence Summary
Advanced Claude Code techniques: preload mermaid diagrams as system prompts, build shell aliases, create CLI tools, and write stop hooks for automated quality checks and commits.

## What's Being Built
This is a comprehensive senior engineer's guide to advanced AI coding workflows, not a single project. The tutorial covers: (1) Mermaid diagram generation and system prompt injection for instant context loading, (2) Shell aliasing for rapid Claude Code mode switching, (3) Custom CLI tool creation using Gemini for image generation, (4) Stop hooks for automated TypeScript checking and git commits. The emphasis is on eliminating friction, automating quality gates, and building tools that match ideal (infinite junior engineer) workflows.

## Technology Stack
| Package | Version | Category | Core/Optional | Purpose |
|---------|---------|----------|---------------|---------|
| Claude Code | Latest | AI IDE | Core | Primary coding environment with hooks support |
| Cursor (v20+) | Latest | AI IDE | Optional | Alternative IDE with agents view |
| Mermaid | Latest | Diagramming | Core | Text-based diagram format for context compression |
| zsh/bash | N/A | Shell | Core | Alias and function definitions for rapid mode switching |
| @anthropic-ai/agent-sdk | Latest | Hook Framework | Core | Types and utilities for building Claude Code hooks |
| TypeScript/Bun | Latest | Runtime | Core | Stop hook implementation and type checking |
| Git | N/A | Version Control | Core | Automated commit workflow via hooks |
| Gemini CLI | Latest | Image Generation | Optional | Example CLI tool for design ideation |
| Work OS | Sponsor | Enterprise Auth | Optional | SSO and access control APIs |
| Tines | Sponsor | Workflow Automation | Optional | Agentic workflow platform |
| Node.js/npm | N/A | Runtime | Core | CLI tool development environment |

## Step-by-Step Implementation Guide
### Phase 1: Mermaid Diagram Context Loading
- Create `memory/ai-docs/diagrams/` directory structure in repo
- Generate mermaid diagrams from existing codebase (use Claude prompt: "diagram user flows, data flows, authentication flow, database operations")
- Diagrams are markdown files with embedded mermaid syntax (text-based, AI-readable, human-challenging)
- Run `claude help` to view available system commands
- Use `claude append-system-prompt` command to inject context BEFORE user prompts
- Command: `claude append-system-prompt "$(cat memory/ai-docs/diagrams/*.md)"`
- Uses glob pattern and `cat` to concatenate all markdown diagram files
- Trade-off: High token cost upfront BUT eliminates file reads, codebase exploration, and delivers faster/more reliable results
- Test: Ask "Please explain the authentication flow" without @ file references
- Result: Instant response with no file reads because context already loaded

### Phase 2: Shell Aliases for Rapid Mode Switching
- Edit `~/.zshrc` (Mac) or PowerShell profile (Windows)
- Create aliases for common Claude Code configurations:
  - `alias x='claude --bypass-permissions'` (dangerous mode for trusted tasks)
  - `alias H='claude --model haiku'` (faster, cheaper, less smart)
  - `alias cdi='claude append-system-prompt "$(cat memory/ai-docs/diagrams/*.md)"'` (diagram loading)
- Optional: Project-specific aliases like `cc-project-name` to load project diagrams
- Reload shell config: `source ~/.zshrc`
- Usage: Type single letter/short command to instantly launch Claude with preset configuration
- Benefit: Eliminates repetitive typing, encourages context-rich workflows

### Phase 3: Custom CLI Tool Development (Example: Sketch)
- Build CLI tool called "sketch" that wraps Gemini for website design generation
- Use interactive prompts (library like Inquirer or Prompts) to ask:
  - "What type of website?" → "Christmas decorations store"
  - "Page to build?" → "Homepage"
  - "Style?" → "Creative and artistic"
  - "Device?" → "Desktop"
  - "Color scheme?" → "GitHub light theme"
  - "Reference image?" → None
  - "Number of variations?" → 5
- Script executes Gemini CLI with pre-loaded prompts
- Gemini generates 5 design variations based on inputs
- Output images can be fed to Claude/Cursor for website implementation
- Philosophy: Build throwaway tools for every idea—easier to edit than author
- Benefit: Constrained terminal UI prevents distraction (vs. building web UI), rapid prototyping, captures ideas before they fade

### Phase 4: Stop Hooks for Quality Automation
- Navigate to Claude Code settings → Hooks → Add Stop Hook
- Accept responsibility warnings (hooks run unchecked scripts)
- Create `claude-hooks/index.ts` file in project root
- Install `@anthropic-ai/agent-sdk` via `bun install`
- Import `HookInput` type for access to session metadata (files changed, current directory, permission mode)
- Hook logic:
  ```
  1. Check if files changed (input.filesChanged)
  2. If yes:
     a. Run `bun typecheck --quiet` (or `bun build`, linters, etc.)
     b. If errors: console.log(JSON.stringify({prompt: "Please fix the TypeScript errors", blocking: true, output: <error report>}))
     c. If no errors: console.log(JSON.stringify({prompt: "Please commit files (avoid sensitive data)", blocking: false}))
  3. If no files changed: Return success
  ```
- **Gotcha**: console.log becomes stdin to Claude—use console.error for debug logs
- **Gotcha**: Return JSON with `prompt` (natural language instruction) and `blocking` (true = Claude must fix, false = suggestion)
- Add to `settings.local.json` (personal) or `settings.json` (team-wide)
- Test: Create `fu.ts` file with quote syntax error
- Result: Stop hook catches error, prompts Claude to fix, Claude corrects, hook reruns, commits on success

### Phase 5: Advanced Hook Patterns
- Pre-commit hooks: Format code (Prettier, Black), check imports, validate commit message
- Circular dependency detection: Parse imports, flag files referencing each other
- Code complexity analysis: Use tools like complexity metrics, flag functions above threshold
- Duplicate code detection: Compare file similarity, suggest refactoring
- Security checks: Scan for hardcoded secrets, SQL injection patterns
- Performance profiling: Run benchmarks, alert on regressions
- Diagram generation: After successful PR merge, auto-generate updated mermaid diagrams
- Philosophy: Automate every quality gate you'd run manually if you had infinite time

## Tool Evaluation
| Tool | Maturity | Alternatives | PAI Fit | Verdict |
|------|----------|-------------|---------|---------|
| Claude Code | Production | Cursor, GitHub Copilot, VS Code extensions | High | Best-in-class hook system, strong PAI foundation |
| Mermaid Diagrams | Mature | PlantUML, Graphviz, D2 | High | Text-based, AI-readable, version-controllable |
| Anthropic Agent SDK | Beta | Custom hook frameworks | High | Official support, well-typed, stable API |
| Cursor Agent Mode | Beta | Claude Code plan mode, Copilot Workspace | Medium | Promising UI but less scriptable than Claude |
| Shell Aliases | Mature | Custom wrapper scripts, task runners | High | Universal, zero overhead, instant productivity |
| CLI Tools (custom) | DIY | Pre-built CLIs, web apps | High | Constrained UI forces focus, fast iteration |
| Bun | Production | Node, Deno | High | Fast TypeScript execution, great for hooks |
| Gemini for Vision | Production | DALL-E, Midjourney, Stable Diffusion | Medium | Strong multimodal but less code-focused than Claude |

## Production Readiness Checklist
| Area | Covered? | Gap | Priority |
|------|----------|-----|----------|
| Authentication | N | No user auth for CLI tools or hooks | P3 |
| Error Handling | Y | Hooks catch and report errors to Claude | P2 |
| Testing | Partial | Manual hook testing, no unit tests | P1 |
| CI/CD | Partial | Hooks run locally, no CI integration shown | P2 |
| Monitoring | N | No hook execution metrics or alerting | P2 |
| Input Validation | Y | Type checking enforced via stop hooks | P1 |
| Rate Limiting | N | No limits on Claude API calls from hooks | P3 |
| Logging | Partial | console.error for debug, no structured logs | P2 |
| Security | Partial | Bypass mode requires caution, no secret scanning shown | P1 |
| Performance | Y | Hooks run async, don't block core workflows | P3 |

## Key Insights
- **Context beats search every time**: Preloading diagrams via system prompts eliminates 80% of file reads and codebase exploration. Trade tokens for speed and reliability.
- **Mermaid is the AI's native language**: Humans struggle with text-based diagrams, but LLMs consume them instantly. Compress entire application architecture into a few hundred lines.
- **Stop hooks are the missing CI layer**: Most developers wait for CI to fail, then fix. Stop hooks catch errors BEFORE leaving local machine, creating instant feedback loop.
- **Aliases unlock muscle memory**: Senior engineers have deep muscle memory for commands. Single-letter aliases (x, H, cdi) eliminate context switching friction.
- **CLI tools are the new rapid prototyping**: Terminal-constrained UI prevents bikeshedding design. Build idea → test → iterate in minutes, not hours.
- **Hooks enable "infinite junior engineer" model**: Design workflows as if you have unlimited time and help. What would you do? Diagram everything, run all quality checks, write perfect commits—then automate that workflow.
- **Planning modes eliminate drift**: Claude Code and Cursor plan modes drastically reduce AI going off-rails. Use for multi-file changes.
- **Console.log becomes AI's stdin**: Hook gotcha—console.log returns JSON to Claude, console.error for debug. This is non-obvious but critical.
- **Team-wide hooks scale engineering culture**: `settings.json` (committed) vs `settings.local.json` (gitignored) enables org-wide quality standards.

## PAI Action Items
| Action | Category | Priority | Context |
|--------|----------|----------|---------|
| Generate mermaid diagrams for PAI repo | Documentation | P1 | Create diagrams/ directory with skill loading, agent execution, hook flows |
| Create PAI shell aliases | Efficiency | P1 | Alias for loading PAI context, Haiku mode, bypass mode, skill-specific modes |
| Build stop hook for PAI quality gates | Automation | P1 | Check markdown formatting, validate YAML frontmatter, run skill tests |
| Create CLI tool for skill generation | Development | P2 | Interactive prompt to scaffold new skill with metadata, examples, tests |
| Implement pre-commit hook for diagram updates | Documentation | P2 | Auto-generate diagrams on skill changes, update context files |
| Build "context analyzer" CLI | Observability | P3 | Analyze token usage of different context loading strategies |
| Create video processing workflow | Content | P3 | Adapt John's workshop → notes flow for PAI training videos |
| Add circular dependency checker to hooks | Quality | P3 | Prevent skill dependency loops, validate import graphs |
| Build custom "PAI Shell" with context preloaded | Experimentation | P3 | Wrapper that always starts with PAI diagrams, skills, memory loaded |
| Test Gemini Deep Think for code review | Experimentation | P3 | Use as "second set of eyes" when Claude goes off-rails |

## Cross-Reference Tags
themes: [advanced-workflows, context-engineering, hook-architecture, automation, senior-engineering, cli-tools, diagram-as-code, quality-gates]
