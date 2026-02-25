---
url: https://www.anthropic.com/news/skills
scraped_date: 2025-10-16
domain: anthropic.com
title: "Claude Skills: Customize AI for your workflows"
type: product-announcement
tags:
  - claude-skills
  - agent-skills
  - claude-code
  - api
  - product-features
---

# Introducing Claude Skills

**Published:** Oct 16, 2025 | **Read time:** 3 min

![](https://www-cdn.anthropic.com/images/4zrzovbb/website/77dd9077412abc790bf2bc6fa3383b37724d6305-1000x1000.svg)

Claude can now use _Skills_ to improve how it performs specific tasks. Skills are folders that include instructions, scripts, and resources that Claude can load when needed.

Claude will only access a skill when it's relevant to the task at hand. When used, skills make Claude better at specialized tasks like working with Excel or following your organization's brand guidelines.

You've already seen Skills at work in Claude apps, where Claude uses them to create files like spreadsheets and presentations. Now, you can build your own skills and use them across Claude apps, Claude Code, and our API.

## How Skills work

While working on tasks, Claude scans available skills to find relevant matches. When one matches, it loads only the minimal information and files needed—keeping Claude fast while accessing specialized expertise.

Skills are:

- **Composable**: Skills stack together. Claude automatically identifies which skills are needed and coordinates their use.
- **Portable**: Skills use the same format everywhere. Build once, use across Claude apps, Claude Code, and API.
- **Efficient**: Only loads what's needed, when it's needed.
- **Powerful**: Skills can include executable code for tasks where traditional programming is more reliable than token generation.

Think of Skills as custom onboarding materials that let you package expertise, making Claude a specialist on what matters most to you. For a technical deep-dive on the Agent Skills design pattern, architecture, and development best practices, read our [engineering blog.](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)

## Skills work with every Claude product

### **Claude apps**

Skills are available to Pro, Max, Team and Enterprise users. We provide skills for common tasks like document creation, examples you can customize, and the ability to create your own custom skills.

![The Skills capabilities interface in Claude.ai with example Skills toggled on. ](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Faf2845deb68f4074e12f8b0c1ea3b9cae8946cac-1920x1080.png&w=3840&q=75)

Claude automatically invokes relevant skills based on your task—no manual selection needed. You'll even see skills in Claude's chain of thought as it works.

Creating skills is simple. The "skill-creator" skill provides interactive guidance: Claude asks about your workflow, generates the folder structure, formats the SKILL.md file, and bundles the resources you need. No manual file editing required.

Enable Skills in [Settings](https://claude.ai/redirect/website.v1.3b7d8b71-3452-48c4-8bb6-4a15e9e57b1e/settings/features). For Team and Enterprise users, admins must first enable Skills organization-wide.

### **Claude Developer Platform (API)**

Agent Skills, which we often refer to simply as Skills, can now be added to Messages API requests and the new `/v1/skills` endpoint gives developers programmatic control over custom skill versioning and management. Skills require the [Code Execution Tool](https://docs.claude.com/en/docs/agents-and-tools/tool-use/code-execution-tool) beta, which provides the secure environment they need to run.

Use Anthropic-created skills to have Claude read and generate professional Excel spreadsheets with formulas, PowerPoint presentations, Word documents, and fillable PDFs. Developers can create custom Skills to extend Claude's capabilities for their specific use cases.

Developers can also easily create, view, and upgrade skill versions through the Claude Console.

Explore the [documentation](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) or [Anthropic Academy](https://www.anthropic.com/learn/build-with-claude) to learn more.

![Box logo](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F890f0f2ef5b8bcfff0d8dfd000ace220cb440864-120x65.png&w=256&q=75)

> Skills teaches Claude how to work with Box content. Users can transform stored files into PowerPoint presentations, Excel spreadsheets, and Word documents that follow their organization's standards—saving hours of effort.

![Notion logo](https://www-cdn.anthropic.com/images/4zrzovbb/website/f9ea50555647585fc11a0df17655e98956e0b488-1216x350.svg)

> With Skills, Claude works seamlessly with Notion - taking users from questions to action faster. Less prompt wrangling on complex tasks, more predictable results.

![Canva logo](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F3b2022164e7d66fc302c845547a7bc782f97a68c-1536x864.png&w=256&q=75)

> Canva plans to leverage Skills to customize agents and expand what they can do. This unlocks new ways to bring Canva deeper into agentic workflows—helping teams capture their unique context and create stunning, high-quality designs effortlessly.

![Rakuten logo](https://www-cdn.anthropic.com/images/4zrzovbb/website/0e7636568b10b8552dbe89ff9a0b36a74ff47527-166x49.svg)

> Skills streamline our management accounting and finance workflows. Claude processes multiple spreadsheets, catches critical anomalies, and generates reports using our procedures. What once took a day, we can now accomplish in an hour.

### **Claude Code**

Skills extend Claude Code with your team's expertise and workflows. Install skills via plugins from the anthropics/skills marketplace. Claude loads them automatically when relevant. Share skills through version control with your team. You can also manually install skills by adding them to `~/.claude/skills`. The Claude Agent SDK provides the same Agent Skills support for building custom agents.

## Getting started

- **Claude apps:** [User Guide](https://support.claude.com/en/articles/12580051-teach-claude-your-way-of-working-using-skills) & [Help Center](https://support.claude.com/en/articles/12512176-what-are-skills)
- **API developers:** [Documentation](https://docs.claude.com/en/api/skills-guide)
- **Claude Code:** [Documentation](https://docs.claude.com/en/docs/claude-code/skills)
- **Example Skills to customize:** [GitHub repository](https://github.com/anthropics/skills)

## What's next

We're working toward simplified skill creation workflows and enterprise-wide deployment capabilities, making it easier for organizations to distribute skills across teams.

Keep in mind, this feature gives Claude access to execute code. While powerful, it means being mindful about which skills you use—stick to trusted sources to keep your data safe. [Learn more](https://support.claude.com/en/articles/12512180-using-skills-in-claude#h_2746475e70).

---

## Related Articles

- [Claude and your productivity platforms](https://www.anthropic.com/news/productivity-platforms) - Oct 16, 2025
- [Introducing Claude Haiku 4.5](https://www.anthropic.com/news/claude-haiku-4-5) - Oct 15, 2025
- [Anthropic and Salesforce expand partnership to bring Claude to regulated industries](https://www.anthropic.com/news/salesforce-anthropic-expanded-partnership) - Oct 14, 2025
