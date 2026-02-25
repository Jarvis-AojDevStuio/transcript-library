# My Complete Tech & Tool Stack (Everything) - Ras Mic

## Video Metadata

- **Channel**: Ras Mic
- **Published**: January 23, 2026
- **Duration**: 21:54
- **URL**: https://www.youtube.com/watch?v=yAO28HOS5x4
- **Transcript Type**: Auto-generated
- **Analysis Date**: January 23, 2026
- **Transcript Quality**: MEDIUM - Clean auto-generated transcript with good accuracy throughout

## Executive Summary

Ras Mic provides a comprehensive walkthrough of his complete tech stack for building AI-powered web and mobile applications in 2026. The video emphasizes tool choices optimized for AI-assisted development, focusing on frameworks and services that AI models understand well. Key highlights include Next.js with ElysiaJS for frontend/backend, Convex as the primary backend platform, and a suite of AI development tools including Claude Code, Cursor, and Daytona for sandboxed development environments.

## Key Topics Covered

1. **Web & Mobile Frameworks**
   - Next.js (frontend framework)
   - ElysiaJS (backend framework integrated with Next.js)
   - Expo (mobile development)
   - Turbo Repo (monorepo management)

2. **Backend & Database**
   - Convex (primary backend platform)
   - Real-time database capabilities
   - Code-first infrastructure

3. **Styling & UI Components**
   - Tailwind CSS V4
   - Shadcn UI component library
   - Base UI for component primitives

4. **Payments & Authentication**
   - Stripe (primary payment provider)
   - Clerk (easiest setup)
   - Better Auth (improving integration)
   - WorkOS (enterprise solutions)

5. **AI Development Tools**
   - Daytona (cloud development environments)
   - AI SDK by Vercel
   - Claude Agent SDK
   - Composio (tool integration layer)

6. **Deployment & Infrastructure**
   - Vercel (Next.js deployments)
   - Railway (backend servers and databases)

7. **AI Coding Tools**
   - Claude Code (primary AI coding assistant)
   - Cursor (IDE with AI agent)
   - Grvyle (AI code review)

8. **AI Models**
   - Claude Opus 4.5 with thinking (primary for programming)
   - GPT-5.2 (everyday tasks and chatting)
   - CodeX (edge case bug detection)

## Detailed Analysis

### Web and Mobile Framework Philosophy

**Next.js as the Standard**: Ras Mic advocates for Next.js over newer alternatives like Tanstack Start due to two critical reasons:
1. **AI Training Data**: AI models have extensive training on Next.js, resulting in fewer hallucinations and more accurate code generation
2. **Production Readiness**: Tanstack Start remains in release candidate status, making it unsuitable for production deployments

**ElysiaJS Integration**: A unique aspect of his stack is using ElysiaJS (a Bun-first backend framework) within Next.js rather than Next.js's default API routes. The key benefits include:
- Better than Hono (in his opinion)
- Works with both Bun and Node.js
- Provides end-to-end type safety through Eden (their TRPC-like solution)
- Integration is simple: create a catch-all route at `app/api/[...slugs]/route.ts`

**Technical Implementation**: The ElysiaJS setup involves creating a catch-all route that intercepts API requests and routing them through Elysiajs. Eden provides type-safe API calls from the frontend with full TypeScript inference, returning structured responses with data, error, status, and response objects.

### Convex: The Backend Platform

**Why Convex**: Ras Mic's most passionate endorsement is for Convex as the primary backend platform. His enthusiasm stems from both personal advocacy (he reached out to work there because he loved the product) and practical benefits:

**Core Capabilities**:
- Real-time database with automatic client synchronization
- Clean separation between functions and database operations
- Built-in webhook handling
- Cron jobs and scheduled functions
- Background job processing and queues
- Type-safe, fully TypeScript-based

**AI-First Design Philosophy**: The critical advantage for AI-assisted development is that Convex is "code-first" - everything from database schemas to scheduled jobs to webhooks is defined in TypeScript code. This means:
- AI can understand and generate the entire backend configuration
- No dashboard configuration required
- Similar to "Terraform but for your backend"
- All type-safe with real-time capabilities by default

**Real-World Example - Trading Alerts Dashboard**: Ras Mic shares a practical implementation where he built a personal finance tracking app:
1. Trading View fires alerts to a Convex webhook when price levels are hit
2. Convex backend receives the webhook and updates the database
3. Changes automatically propagate to the Next.js and Expo apps in real-time
4. Zero additional infrastructure needed for real-time updates

**Convex Components**: A standout feature is the component ecosystem - pre-built, modular TypeScript packages for common backend needs:
- Payment integrations (Stripe, Polar, Autumn, Dodo Payments) - Ras Mic built the Stripe component
- Workflow management
- Work pools for job processing
- Storage solutions (Cloudflare R2)
- Email services (Resend)

**AI Integration**: AI models can scaffold entire payment systems by referencing the component repository, with Ras Mic claiming "10 times out of 10" it generates correct code when given proper context.

### Styling and UI Development

**Tailwind + Shadcn Workflow**: His UI development starts with Shadcn's project initialization:
1. Visit Shadcn UI website
2. Click "New Project" and customize:
   - Choose Base UI as component foundation
   - Select style (e.g., "New Mirror" for compact design)
   - Set border radius (none for boxy look)
   - Pick theme color (e.g., Sky Blue)
3. Run the generated `bunx` command to scaffold the project

**Philosophy**: Shadcn UI provides the default component library with Tailwind V4 for utility-first styling. This combination offers rapid prototyping with customizable design systems.

### Payment Processing

**Stripe as Primary**: While Stripe is his default choice, he acknowledges:
- **Autumn**: Would use for usage-based billing or AI credit systems due to the Convex component
- **Ease of Setup**: Convex components make payment integration trivial - AI can scaffold complete subscription systems from the component repository

### Authentication Landscape

**Three-Tier Approach**:
1. **Clerk**: "Easiest to set up" - his current default for most projects
2. **Better Auth**: Improving with better Convex integration - may become his default
3. **WorkOS**: Reserved for enterprise-level applications requiring advanced features

**Key Insight**: "You can't go wrong with any of these" - the choice depends on project requirements rather than fundamental quality differences.

### AI Application Development Tools

**Daytona - Cloud Development Environments**: Ras Mic's newest addition for building AI coding agents:
- **Use Case**: Building "Sandstorm" - an autonomous coding agent app that wraps his Ralphie project
- **Why Daytona**: Best developer experience among sandbox providers for AI agents
- **Architecture**: Agents run in isolated Daytona sandboxes rather than local file systems
- **Recommendation**: Essential for any AI coding agent or AI application requiring file system access

**AI SDK by Vercel**: His primary SDK for building AI agents:
- Most popular TypeScript AI SDK
- Well-supported and documented
- Extensive tutorial ecosystem
- No reason not to use it

**Claude Agent SDK**: The "most slept on" tool in his stack:
- Powers Claude Code agents
- Can spawn multiple Claude Code instances
- Versatile for coding agents, assistants, and various AI applications
- Works exceptionally well when combined with sandboxed environments

**Composio - The Tool Integration Layer**: Solves the integration complexity problem:
- **Problem**: Connecting AI agents to external services (Gmail, Google Calendar, Slack, GitHub, Google Sheets, Shopify, Google Drive)
- **Solution**: Composio provides pre-built integrations with simple initialization
- **Implementation**: Initialize Composio, create tool router session with user ID, pass tools to AI SDK's stream text function
- **Scale**: Hundreds to thousands of pre-built tool integrations
- **Value Proposition**: "Building that yourself is a headache. Composio is a no-brainer."

### Deployment Strategy

**Dual Deployment Approach**:

1. **Vercel for Next.js**: Default platform for deploying Next.js applications

2. **Railway for Backend Services**: When separate servers are needed
   - **Pricing**: $5/month (no free tier, but worth it)
   - **DX Excellence**: Extremely simple database and server deployment
   - **Example Workflow**:
     - Click "New" → "Databases" → "PostgreSQL" → Instant deployment
     - Deploy connected services (e.g., Elysia Bun server with Drizzle ORM)
     - Services in same deployment environment communicate with blazing speed
   - **Use Cases**: External servers, microservices, database hosting

### AI Coding Tool Ecosystem

**Claude Code**: Primary AI coding assistant
- Main tool for AI-assisted development
- Excellent code generation for modern frameworks

**Cursor IDE**: Strategic dual usage
- **IDE Features**: Likes the editor for reviewing and writing code
- **Cursor Agent CLI**: Hidden feature - type "agent" in terminal to access Cursor's CLI agent
- **Use Case**: Back-and-forth iteration and code review

**Ghosty Terminal**: Terminal emulator of choice
- Fast hotkey navigation
- Optimized DX for rapid terminal work

**Grvyle - AI Code Review**: The game-changer for code review workflow:

**Workflow**:
1. Pull request submitted → Grvyle analyzes code
2. Reviews confidence score (out of 5 stars)
3. Decision matrix:
   - 4-5 stars: Approve and merge
   - Below 4 stars: Request changes based on Grvyle comments

**Advanced Usage**:
- Pass Grvyle review directly to AI agent with "address the comments" prompt
- Grvyle provides suggestions or prompts for AI to fix flagged issues
- Can apply suggestions directly in some cases

**Impact**: "Grvyle has sincerely cut down the amount of time I've spent reviewing code that is just blah."

**Verdict**: "If you're building anything, especially if you're using AI, you 100% need to use Grvyle. Grvyle, in my opinion, is one of the best AI code reviewing tools."

### Model Selection Strategy

**Programming Tasks**:
- **Primary**: Claude Opus 4.5 with thinking mode
- **Secondary**: CodeX (for catching edge case bugs)

**Everyday Tasks & Chatting**:
- **Primary**: GPT-5.2

**Chat Applications**:
- **Daily Driver**: T3 Chat
- **OpenAI Subscription**: For Deep Research feature (also used by his wife)
- **Claude Subscription**: For Claude Co-work feature (occasional use)

## Notable Quotes

> "With AI writing a good chunk of the code, now more than ever, the tools we use matter." - [00:00:00]
> Context: Opening statement establishing the video's premise about tool importance in the AI era

> "I genuinely believe with all these tools, I can ship any web and mobile app." - [00:00:50]
> Context: Expressing confidence in his curated tech stack

> "The AI models have not been trained on it [Tanstack Start]. So it definitely does hallucinate." - [00:01:12]
> Context: Explaining why he doesn't use Tanstack Start despite its technical merits

> "Give me a job cuz I love the product so much [Convex]." - [00:05:58]
> Context: Revealing he reached out to Convex for employment due to genuine product advocacy

> "You need a database, a real-time database, you got it. You want a clean separation between your functions and your DB, you got it... any sort of job except getting a real job, you got it." - [00:06:04]
> Context: Humorously listing Convex's extensive capabilities

> "If all of it is code, that means you can use the AI to build all these crazy things." - [00:07:12]
> Context: Explaining why Convex's code-first approach is ideal for AI-assisted development

> "Think of Terraform but for your back end. But it's all Typescript and it's all type safe and it's real time by default." - [00:07:20]
> Context: Drawing an analogy to explain Convex's infrastructure-as-code approach

> "Composio is a no-brainer. Every time I build AI applications, I'm using all these tools." - [00:16:40]
> Context: Strong endorsement of Composio for AI agent tool integration

> "I've been greenpilled or gravile pled on is Grvyle. And the reason being is AI code review has allowed me to ship much faster." - [00:18:52]
> Context: Enthusiastic endorsement of AI-powered code review

> "We're entering an era of more engineering, less programming. Although I'm very sad about it, it is what it is." - [00:21:39]
> Context: Philosophical reflection on the changing nature of software development

> "I think one edge developers have over non-developers when using AI is we know what's good and what's not. We know what works and what doesn't." - [00:21:28]
> Context: Emphasizing the continued importance of developer expertise even in the AI era

## Practical Applications

- **Rapid Prototyping**: The stack enables quick iteration from idea to MVP using AI-assisted coding with well-understood frameworks
- **Real-Time Applications**: Convex's default real-time capabilities make building live dashboards, collaborative tools, and notification systems straightforward
- **AI Agent Development**: Combination of Daytona sandboxes, Claude Agent SDK, and Composio enables sophisticated AI applications with external tool access
- **Code Quality Maintenance**: Grvyle integration ensures consistent code quality even when using AI for generation
- **Monorepo Management**: Turbo Repo + Next.js + Expo enables unified web and mobile development
- **Payment Integration**: Convex components allow AI to scaffold complete payment systems without manual integration work
- **Type Safety Everywhere**: ElysiaJS with Eden, Convex's TypeScript-first approach, and TypeScript throughout ensures end-to-end type safety

## Related Resources

- **Ralphie Project**: Autonomous agent framework mentioned as basis for Sandstorm (1.6k GitHub stars)
- **Sandstorm**: Upcoming cloud-based autonomous coding agent application using Daytona
- **Convex Documentation**: Comprehensive docs for all features (webhooks, scheduled jobs, components)
- **Shadcn UI**: Component library and project scaffolding tool
- **ElysiaJS Documentation**: Integration guides for Next.js and Eden setup
- **Composio Documentation**: Integration guides for AI SDK and tool configuration
- **GitHub Templates**: Ras Mic plans to update templates for easy AI-assisted app building

## Quality Notes

The transcript quality is consistently good throughout the 22-minute video. The auto-generated captions are accurate with minimal errors. Some minor issues include:
- Occasional slight repetition of phrases at timestamp boundaries (cleaned in processing)
- Brand name inconsistencies ("Nex.js" vs "Next.js", "Alicia"/"Alysia" vs "ElysiaJS")
- Technical terms are generally captured correctly

The presenter speaks clearly and provides visual demonstrations throughout, making the tutorial highly followable. No significant content gaps or unclear audio sections were detected.

## Transcript Timestamps - Key Sections

- **00:00:00 - 00:00:35**: Introduction and overview of topics
- **00:00:35 - 00:05:31**: Web frameworks (Next.js, ElysiaJS setup demonstration)
- **00:05:31 - 00:09:23**: Convex backend platform and real-world trading alert example
- **00:09:23 - 00:09:43**: Turbo Repo and Expo for mobile development
- **00:09:43 - 00:10:31**: Styling with Tailwind V4 and Shadcn UI
- **00:10:31 - 00:12:34**: Payments (Stripe) and Convex components ecosystem
- **00:12:34 - 00:13:17**: Authentication options (Clerk, Better Auth, WorkOS)
- **00:13:17 - 00:16:48**: AI application development tools (Daytona, AI SDK, Claude Agent SDK, Composio)
- **00:16:48 - 00:18:08**: Deployment platforms (Vercel, Railway)
- **00:18:08 - 00:20:20**: AI coding tools (Claude Code, Cursor, Ghosty, Grvyle)
- **00:20:20 - 00:21:00**: AI models and chat applications
- **00:21:00 - 00:21:54**: Closing thoughts on developer expertise in the AI era

## Educational Value Assessment

**Rating: 9/10 - Highly Valuable**

**Strengths**:
- **Comprehensive Coverage**: Addresses entire development stack from frontend to deployment
- **Practical Demonstrations**: Shows actual setup processes (ElysiaJS integration, Railway database creation)
- **Real-World Examples**: Trading alert dashboard provides concrete use case
- **AI-First Perspective**: Uniquely focuses on tool choices optimized for AI-assisted development
- **Tool Rationale**: Explains *why* each tool is chosen, not just *what* is used
- **Honest Assessments**: Acknowledges tradeoffs and alternatives (e.g., Tanstack Start evaluation)
- **Current Technology**: Features cutting-edge tools and recent releases (Opus 4.5, Tailwind V4, GPT-5.2)

**Target Audience**:
- Experienced developers building AI-powered applications
- Teams adopting AI-assisted development workflows
- Full-stack developers seeking modern tooling recommendations
- Entrepreneurs building SaaS products with AI features

**Learning Outcomes**:
After watching, developers will understand:
1. How to structure a full-stack application optimized for AI development
2. Which tools AI models understand best for code generation
3. How to integrate multiple specialized services into a cohesive stack
4. Practical deployment strategies for modern web applications
5. How to leverage AI for both development and code review

**Minor Limitations**:
- Assumes intermediate to advanced development knowledge
- Some tool choices reflect personal preference (though well-justified)
- Enterprise considerations (scaling, security, compliance) are not deeply explored
- Cost analysis of the stack is minimal (though Railway's $5/month is mentioned)
