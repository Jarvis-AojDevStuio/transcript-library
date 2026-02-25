---
title: "AGENTS.md Outperforms Skills in Agent Evals"
source: https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals
author: Jude Gao
published: 2026-01-27
scraped: 2026-01-30
tags:
  - ai-agents
  - coding-agents
  - documentation
  - agent-evals
  - nextjs
  - vercel
  - agents-md
  - skills
category: technology
type: article
---

# AGENTS.md Outperforms Skills in Agent Evals

**Source:** [Vercel Blog](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals)
**Author:** Jude Gao
**Published:** January 27, 2026
**Scraped:** 2026-01-30

---

## Overview

The article presents findings from evaluations comparing two approaches for teaching AI coding agents framework-specific knowledge: **skills** (an open standard for packaging domain knowledge) versus **`AGENTS.md`** (a persistent markdown context file).

## Key Finding

A compressed 8KB documentation index embedded in `AGENTS.md` achieved **perfect results (100% pass rate)**, while skills maxed out at **79%** despite explicit instructions.

## The Problem

Current AI models lack training data on newer APIs. Next.js 16 introduced features like `'use cache'`, `connection()`, and `forbidden()` that agents don't recognize, leading to:

- Incorrect code generation
- Reliance on outdated patterns
- Hallucinated or deprecated API usage

Without proper guidance, agents revert to patterns from their training data, which may not include the latest framework features.

## Testing Approach

The researchers evaluated four configurations across multiple test scenarios:

1. **Baseline** (no documentation)
2. **Skills with default behavior**
3. **Skills with explicit instructions**
4. **`AGENTS.md` docs index**

Each configuration was tested against real-world coding tasks requiring knowledge of Next.js 16's new APIs.

## Results Summary

| Configuration | Pass Rate |
|---|---|
| Baseline | 53% |
| Skill (default) | 53% |
| Skill (with instructions) | 79% |
| `AGENTS.md` | 100% |

### Key Observations

- **Baseline and default skills performed identically** - Skills weren't automatically consulted
- **Explicit instructions improved skills** - But still fell short of perfect accuracy
- **`AGENTS.md` achieved perfection** - Passive context loaded in every interaction

## Why Passive Context Won

The article identifies three critical advantages of embedded documentation over skills:

### 1. No Decision Burden

**Skills approach:** The agent must decide whether and when to consult documentation, adding cognitive overhead and potential for failure.

**`AGENTS.md` approach:** Information is automatically available in every context window without decision-making required.

### 2. Consistent Access

**Skills approach:** Documentation access is conditional and may be skipped based on agent's interpretation of the task.

**`AGENTS.md` approach:** Context persists across every interaction turn, ensuring the agent always has current information.

### 3. Simplified Sequencing

**Skills approach:** Creates ordering dilemmas about when to consult documentation relative to other tasks.

**`AGENTS.md` approach:** No sequencing issues - the context is always present from the start.

## Technical Implementation

### Compression Format

The compressed format uses a **pipe-delimited structure** that reduces a 40KB documentation file to just **8KB** while maintaining full effectiveness.

Example structure:
```
API_NAME | Brief description | Code example | Link to full docs
```

This aggressive compression ensures the documentation fits within context windows without overwhelming the agent.

### Installation

Users can implement this via the Next.js codemod:

```bash
npx @next/codemod@canary agents-md
```

**What this command does:**
1. Automatically detects the Next.js version
2. Downloads matching documentation to `.next-docs/`
3. Injects the compressed index into `AGENTS.md`

### Manual Setup

For custom implementations:

1. Create or update `AGENTS.md` in your project root
2. Add a compressed documentation index
3. Include links to full documentation for deep dives
4. Keep the total size under 10KB for optimal performance

## Framework Author Guidance

The article provides recommendations for framework maintainers:

### When to Use `AGENTS.md`

- **Horizontal improvements** - General framework knowledge that applies across many use cases
- **New API features** - Syntax and patterns outside model training data
- **Breaking changes** - Deprecated APIs that need migration guidance

### When to Use Skills

- **Vertical workflows** - Specific tasks like migrations or upgrades
- **Multi-step processes** - Complex operations requiring tool invocation sequences
- **Interactive workflows** - Tasks needing user input or decision trees

### Best Practices

1. **Test with evals** - Target newer APIs outside model training data
2. **Aggressive compression** - Reduce documentation size while preserving meaning
3. **Version-specific content** - Match documentation to exact framework versions
4. **Regular updates** - Keep documentation current with each release

## Implications for AI Development

This research highlights a fundamental insight about AI agent design:

**Passive context distribution > Active documentation retrieval**

The findings suggest that for framework-specific knowledge:

- **Always-on context** beats conditional access
- **Simple markdown files** can outperform sophisticated skill systems
- **Compression techniques** enable rich documentation within context limits
- **Decision minimization** improves agent reliability

## Practical Takeaways

### For Developers

1. Add `AGENTS.md` to your projects with framework-specific guidance
2. Use compressed documentation indices for common APIs
3. Test agent performance with and without documentation
4. Combine with skills for workflow-specific operations

### For Framework Authors

1. Publish compressed documentation indices
2. Provide codegen tools for automatic setup
3. Version documentation alongside releases
4. Measure effectiveness with agent evaluations

### For AI Researchers

1. Consider passive context as a baseline in agent evaluations
2. Measure decision burden in multi-step workflows
3. Study compression techniques that preserve semantic meaning
4. Explore hybrid approaches combining passive context with active retrieval

## Future Directions

The article suggests several areas for further research:

- **Optimal compression ratios** - How much can documentation be compressed?
- **Context window allocation** - What's the right balance between docs and code?
- **Hybrid approaches** - When should passive context trigger active skill retrieval?
- **Multi-framework support** - How to handle polyglot projects efficiently?

## Conclusion

The research demonstrates that for teaching AI coding agents about framework-specific knowledge, **passive documentation embedded in `AGENTS.md` significantly outperforms active skills-based approaches**.

The key insight: **reducing decision burden and ensuring consistent context access** leads to more reliable agent performance than sophisticated retrieval systems.

For Next.js developers, the immediate action is clear:

```bash
npx @next/codemod@canary agents-md
```

This simple command can boost agent accuracy from 53% to 100% on Next.js 16 features.

---

## Related Resources

- [AGENTS.md Specification](https://agents.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Skills Standard](https://skills.dev)
- [Vercel AI SDK](https://sdk.vercel.ai)

## Implementation Notes

The compressed documentation format is language-agnostic and can be applied to any framework or library. The principles of passive context distribution extend beyond Next.js to any domain where agents need current, accurate information.

---

*This article was scraped and formatted for offline reference. All credit goes to the original author and Vercel.*
