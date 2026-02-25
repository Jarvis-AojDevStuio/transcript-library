---
category: technology
format: discussion
video_title: "Don't Outsource Your Thinking to your Agent"
channel: Prompt Engineering
analysis_date: 2026-02-02
source_topic: ai-llms
fabric_patterns_applied: [extract_wisdom, extract_insights]
transcript_word_count: 1871
reviewed: true
key_topics: [agent-management, best-practices, thinking-partnership, test-driven-development, context-management, code-quality]
---

# Don't Outsource Your Thinking to your Agent

**Channel:** Prompt Engineering | **Words:** 1871

## One-Sentence Summary
Coding agents multiply output when paired with solid fundamentals but multiply confusion without them.

## Executive Summary
Prompt Engineering argues that coding agents' productivity gains come with hidden risks—particularly when users outsource their thinking to AI. After a year of daily agent usage, the presenter identifies key patterns: agents can produce codebases that look like 10 non-communicating developers worked on them, with duplicate logic, inconsistent naming, and no architecture. The solution isn't to avoid agents but to maintain human judgment throughout. Core practices include planning before coding, incremental development over big prompts, treating agent output like junior developer code requiring review, implementing test-driven development, grounding agents with well-maintained agent.md files, using git religiously, and leveraging multiple models for cross-validation. The central thesis: AI multiplies your fundamentals—if they're solid, output multiplies; if they're weak, confusion multiplies.

## Key Insights
- Agents multiply fundamentals whether good or bad creating amplification effect
- Bad prompts outsource thinking while good prompts facilitate learning through interaction
- Planning before coding feels slow but prevents expensive downstream rework dramatically
- Incremental contained tasks work better than big feature requests consistently
- Treating agents as overconfident junior developers maintains appropriate code review rigor
- Test-driven development gives agents objective success criteria preventing blind assumptions completely
- Multi-model review catches blind spots single-model development misses through diverse perspectives
- Agent.md becomes living project memory surviving session resets and context limits

## Core Ideas
- Coding agents make you faster or worse depending entirely on how you use them.
- 90 percent of Claude Code written by Claude Code itself according to Anthropic claims.
- Productivity gains are real enabling weeks of work in days and hours in minutes.
- AI-written codebases can look like 10 independent non-communicating developers worked on them.
- Common issues include duplicate logic, inconsistent naming, and complete absence of architecture design.
- Core principle is you cannot outsource your thinking to coding agents ever successfully.
- Bad prompts require model to make many assumptions about what user actually wants.
- Good prompts facilitate learning to learn rather than just getting answers from agents.
- Context rot happens when irrelevant information stops helping and starts hurting agent performance.
- Model starts forgetting long lists, ignoring half of questions, unable to determine attention focus.
- Restart sessions or use catchup command when context rot symptoms appear during work.
- Plan first then code later workflow actually works in practice despite feeling slow.
- Workflow: brainstorm with agent, let it ask questions, compile into specs, generate step-by-step plan.
- Only start coding after comprehensive planning completes to reduce ambiguity in requirements thoroughly.
- Without plan you simply get slop because you cannot think through something nonexistent.
- With plan you can carry context forward and restart sessions while preserving architectural intent.
- Incremental development with small chunks beats big prompts consistently in practice always reliably.
- Big mistake is asking agent to build entire feature resulting in mess consistently.
- Follow test-driven development: ask for step one, code it, test it, then step two.
- LLMs excel at contained tasks so work with that strength not against it.
- Think of yourself as team lead or technical manager even without programming knowledge.
- Get better at best programming practices not syntax to maximize agent effectiveness overall.
- Simon Wilson quote: LLM pair programmer is overconfident and prone to mistakes writing bugs convincingly.
- Treat every snippet like it came from junior developer requiring review, testing, validation.
- Review every plan before execution and interrupt agent when it drifts off track immediately.
- Never merge code you cannot explain to someone else clearly and completely always.
- Hold yourself responsible and accountable for every line AI agent writes on your behalf.
- Test-driven development essential because without tests agents are completely blind to errors systemically.
- Without tests coding agent assumes everything works fine despite potential bugs lurking beneath.
- Unit tests never don't save your life according to presenter's experience with agents.
- Ground model with well-maintained claude.md or agent.md as onboarding document for agent.
- Include project style, gotchas, and how you want agent to think about problems.
- Run /init command to auto-generate agent.md when starting new project or existing codebase.
- Document issues and resolutions in agent.md creating living document updated throughout project lifecycle.
- Agent.md helps multi-session projects where each session agent reviews current state understanding immediately.
- Sub-agents not always the solution and can introduce more problems than they solve.
- Do not use agents for explorative work without clear done criteria or end state.
- Architectural decisions need human judgment not just iterations from AI systems currently today.
- Security-critical code needs human eyes because passing tests does not equal secure code.
- AI currently good at implementation but not yet good at designing architecture systems.
- Multi-agent systems with 10 sub-agents mean 10 different failure sources to debug.
- Sub-agents theoretically good for separation of concerns but cumbersome in practice when breaks.
- Debugging multi-agent breaks becomes combinatorial explosion of possibilities to investigate systematically always painfully.
- Git is safety net requiring frequent commits when using coding agents for development.
- Commit often because if things go sideways easy rollback to previous working checkpoint.
- Small commits help debugging while bigger commits are nightmare for debugging purposes.
- Never commit what you cannot explain to others clearly and completely always without exception.
- Use multiple different models for development flow since each has different strengths weaknesses.
- Have Claude write code, ask Gemini to review, or use Codex for PR review.
- Second model catches blind spots ignored by first model similar to PR review process.
- Use different model provider for PR review than development model for better coverage.
- AI multiplies fundamentals whether solid or weak creating either output or confusion amplification.
- Better fundamentals give better AI results resulting in more learning and even better fundamentals.
- Use AI agents as tools for learning not just development to improve prompting skills.
- Secret is not in prompts but in process involving planning, thinking, collaboration, context teaching.

## Notable Quotes
> "They can definitely make you faster in code production, but they can also make you worse. And the difference comes down to how you use them."

> "Do not outsource your thinking."

> "I have personally seen code bases written by AI that looks like they were worked on by 10 independent developers who were not talking to each other."

> "You cannot outsource your thinking. Everything else flows from this."

> "Bad prompts where the model has to make a lot of assumption of what exactly you want is outsourcing your thinking to the model."

> "Better prompts are about learning to learn."

> "Context rot happens when you have a lot of irrelevant information in your context and it stops helping and starts hurting."

> "Plan first and then code later... This definitely is going to feel slow, but it's actually faster."

> "Without a plan, you simply get slob. You and the agent cannot think through something that does not exist."

> "Think of yourself as a team lead or technical manager."

> "Think of an LLM, pair programmer, as an overconfident and prone to mistakes. It writes bug with complete conviction."

> "You need to treat every snippet like it came from a junior developer. You need to read it, run it, test it."

> "Never merge a code that you can't explain."

> "Nobody gets promoted for writing unit tests, but unit tests never don't save your life."

> "AI is really good at implementation. is not good at designing yet."

> "Never commit what you cannot explain."

> "Second model catches blind spots that were ignored by the first model."

> "If you have really solid fundamentals, the AI will actually multiply your output. But if you don't, it multiplies confusion."

> "Secret isn't in the prompts, it's actually in the process."

## Practical Recommendations
- Restart sessions immediately when agent shows context rot symptoms like forgetting requirements.
- Use catchup command in Claude Code to help agent refocus attention when drifting.
- Always brainstorm with agent first letting it ask clarifying questions before coding begins.
- Compile brainstorming into formal specs document before generating any code whatsoever systematically.
- Generate detailed step-by-step plan breaking tasks into smallest possible atomic pieces before coding.
- Ask for one step at a time coding and testing it before moving to next step.
- Review every plan thoroughly before allowing agent to execute code generation from it.
- Interrupt agent immediately when it drifts from plan or makes architectural decisions alone.
- Read run and test every code snippet treating it as coming from junior developer.
- Never merge code you cannot explain clearly to someone else without hesitation ever.
- Implement test-driven development giving agents objective success criteria for every task always.
- Write unit tests before asking agent to implement features for blind-spot prevention systematically.
- Run /init command at project start to auto-generate agent.md as onboarding document.
- Document every issue and resolution in agent.md creating living project memory across sessions.
- Keep agent.md intentional and updated including project style, gotchas, and thinking guidance explicitly.
- Avoid using sub-agents for explorative work without clear done criteria or end states.
- Keep architectural decisions and security-critical code under human judgment not agent delegation entirely.
- Commit frequently to git creating rollback checkpoints when agent work goes sideways unexpectedly.
- Make small commits for easier debugging versus nightmare of large commit debugging sessions.
- Use multiple models in development flow having Claude write and Gemini review catching blind spots.
- Use different model providers for PR review than development for maximum coverage diversity.

## Facts & Data Points
- 90 percent of Claude Code is written by Claude Code itself according to Anthropic.
- Productivity gains enable weeks of work in days and hours of work in minutes.
- Presenter used coding agents every day for approximately one year before creating video.
- Agent-written codebases can exhibit duplicate logic, inconsistent naming, no architecture when unsupervised.
- Context rot causes models to forget long lists and ignore half of user questions.
- Planning first then coding later feels slow but actually faster preventing downstream rework.
- LLMs and coding agents excel at contained tasks requiring small chunk incremental approach.
- AI currently good at implementation but not yet good at designing architecture systems.
- Multi-agent systems with 10 sub-agents create 10 different failure sources to debug.

## References & Resources
- **Claude Code** - Anthropic's coding agent discussed extensively throughout presentation
- **Gemini** - Google's model mentioned for code review and PR analysis
- **Codex** - OpenAI's model suggested for PR review workflows
- **Simon Wilson** - Quoted on LLM pair programmers being overconfident and mistake-prone
- **Claude.md / Agent.md** - Project onboarding documents for agent context grounding
- **/init Command** - Auto-generates agent.md files for new projects or existing codebases
- **/catchup Command** - Claude Code feature to help agent refocus attention after context rot
- **Git** - Version control system recommended as safety net for agent-driven development
- **Test-Driven Development (TDD)** - Methodology essential for giving agents objective success criteria
- **Blog Posts** - Multiple resources referenced but not specifically named in transcript

## PAI Action Items

| Action | Category | Priority | Context |
|--------|----------|----------|---------|
| Implement mandatory planning phase in PAI algorithm before BUILD execution | workflow-enforcement | P1 | Prevent "slop" from vague instructions without clear specs |
| Create PAI agent.md as living document updated across session resets | documentation | P1 | Capture gotchas, style, architectural decisions surviving context limits |
| Build PAI hook to detect context rot symptoms and suggest session reset | agent-monitoring | P1 | Automatically identify forgetting, ignoring, attention-focus degradation |
| Enforce test-driven development in PAI workflows before agent implementation begins | quality-standards | P1 | Give agents objective success criteria preventing blind assumptions |
| Implement multi-model review pattern where different model validates PAI agent work | quality-assurance | P2 | Catch blind spots through diverse model perspectives systematically |
| Add "never merge unexplainable code" rule to PAI AI steering rules | behavioral-standards | P1 | Prevent outsourcing thinking to agents without human understanding |
| Create incremental task decomposition templates in PAI PLAN phase automatically | workflow-patterns | P1 | Break big features into contained tasks agents excel at |
| Build PAI hook triggering git commits at strategic checkpoints during work | safety-automation | P2 | Ensure rollback points exist when agent work goes sideways |
| Document "treat agent as overconfident junior developer" principle in PAI architecture | mindset-guidance | P2 | Set appropriate skepticism and review rigor expectations for users |
| Create PAI evals measuring code quality with and without planning phase | measurement | P3 | Empirically validate planning-first approach effectiveness in PAI context |

## Cross-Reference Tags
themes: [agent-management, thinking-partnership, code-quality, test-driven-development, planning-first, incremental-development, multi-model-validation, context-management, git-workflow]
