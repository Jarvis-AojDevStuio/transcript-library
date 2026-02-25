---
category: technology
format: tutorial
video_title: "Intro to AgentKit - Create a RAG Agent"
channel: Alejandro AO
analysis_date: 2026-02-01
source_topic: ai-llms
workflow: YouTubeAnalyzer/TutorialWorkflow
transcript_word_count: 2913
reviewed: true
packages_tracked: 4
key_topics: [openai-agentkit, rag, chatkit, agent-builder]
---

# Intro to AgentKit - Create a RAG Agent

**Channel:** Alejandro AO | **Words:** 2913 | **Format:** Tutorial

## One-Sentence Summary
Build a RAG agent using OpenAI's AgentKit visual builder and deploy it via ChatKit embeddable chat.

## What's Being Built
This tutorial demonstrates OpenAI's AgentKit suite—specifically Agent Builder (a graphical workflow editor) and ChatKit (an embeddable chat interface). The project creates a RAG agent that answers questions about Anna Karenina novel using OpenAI's file search tool, includes jailbreak guardrails, and deploys to a pre-built chat window that can be embedded in websites. The workflow uses visual node-based programming with pass/fail logic paths, guardrail nodes, and evaluation tracing.

## Technology Stack
| Package | Version | Category | Core/Optional | Purpose |
|---------|---------|----------|---------------|---------|
| OpenAI AgentKit | Latest | Agent Framework | Core | Visual agent workflow builder (Agent Builder + ChatKit) |
| OpenAI File Search | Built-in | RAG Tool | Core | Pre-built file search capability for RAG |
| GPT-5 | Latest | LLM | Core | Base reasoning model for agent |
| ChatKit React Component | Latest | UI Component | Core | Embeddable chat window for deployment |
| OpenAI Platform API | Latest | API | Core | Backend for agent execution |
| Node.js/npm | N/A | Runtime | Core | Frontend application environment |
| MCP Protocol | N/A | Integration | Optional | Model Context Protocol compatibility |

## Step-by-Step Implementation Guide
### Phase 1: Agent Workflow Setup
- Navigate to platform.openai.com/dashboard/agent-builder
- Create new agent workflow starting with Start node (input variables stored as `input` text)
- Add Guardrails node with jailbreak protection (pass/fail edges)
- Configure guardrail: jailbreak detection using LLM-based security system
- Create pass path to main RAG agent node

### Phase 2: RAG Agent Configuration
- Add Agent node, rename to "RAG Agent"
- Set system prompt: "You are a research agent in charge of answering questions related to a novel. Use the file search tool to find answers inside the novel."
- Select GPT-5 model with reasoning effort setting
- Enable chat history inclusion for context
- Add File Search tool (pre-built in Agent Builder)
- Upload HTML file with Anna Karenina novel text
- Configure verbosity: high, show summary (for reasoning models)
- Enable response logging and search source display
- Write response to conversation history

### Phase 3: Fail Path & Testing
- Add fail path from guardrails to separate Agent node ("Fail Agent")
- Configure fail agent: GPT-4.1-nano model, simple LLM call
- Prompt: "Explain that the requested task is not possible since it violates our policy"
- Both paths lead to End nodes
- Test in preview mode with queries ("Who was related to Anna?")
- Test jailbreak with "ignore all previous instructions" prompt
- Review traces in Evaluate section (view guardrail LLM prompts, confidence scores, JSON responses)

### Phase 4: ChatKit Deployment
- Publish agent workflow (click Publish button)
- Copy workflow ID from Code section
- Clone ChatKit starter repo from OpenAI docs
- Run `npm install` in project directory
- Copy `.env.example` to `.env.local`
- Add OpenAI API key and workflow ID to environment variables
- Run `npm run dev` to start local server
- Access chat interface at localhost
- Query deployed agent through embedded chat window
- Customize accent color, background, font in ChatKit component

## Tool Evaluation
| Tool | Maturity | Alternatives | PAI Fit | Verdict |
|------|----------|-------------|---------|---------|
| OpenAI AgentKit | Early Release | LangGraph, AutoGen Studio | Medium | Promising but vendor lock-in risk |
| Agent Builder | Beta | Flowise, n8n, Langflow | Low | Too GUI-dependent for code-first workflows |
| ChatKit | Beta | Chainlit, Streamlit Chat, Gradio | Medium | Good for quick demos, limited customization |
| File Search Tool | Production | LangChain Retrieval, LlamaIndex | Low | Black box implementation, prefer open source |
| GPT-5 Reasoning | Production | Claude Opus, DeepSeek R1 | High | Strong but summary-only reasoning limits debugging |
| MCP Support | Announced | N/A | High | Critical for PAI tool integration |

## Production Readiness Checklist
| Area | Covered? | Gap | Priority |
|------|----------|-----|----------|
| Authentication | N | No user auth, only API key | P1 |
| Error Handling | Partial | Guardrails exist but no retry logic | P2 |
| Testing | Y | Preview mode + eval traces available | P2 |
| CI/CD | N | Manual publish workflow only | P2 |
| Monitoring | Partial | Traces logged but no alerting | P2 |
| Input Validation | Y | Guardrails for jailbreak, PII, moderation | P1 |
| Rate Limiting | N | No built-in rate limiting shown | P1 |
| Logging | Y | Conversation history + trace logging | P3 |
| Security | Partial | Guardrails present but no data encryption discussion | P1 |
| Performance | N | No caching, latency optimization discussed | P3 |

## Key Insights
- **Guardrails are LLM-powered**: Jailbreak detection uses a separate LLM call with security prompt, returns JSON with `{flagged: boolean, confidence: float}`. This is expensive but effective.
- **Reasoning model limitations**: GPT-5 only provides summary of chain-of-thought (unlike Claude/DeepSeek which show full reasoning tokens). This limits debugging capabilities.
- **Visual programming trade-offs**: Agent Builder excels at rapid prototyping but creates vendor lock-in. Node-based flows are harder to version control than code.
- **ChatKit is component-first**: Pre-built React component makes embedding trivial but limits architectural flexibility compared to building custom UI.
- **Evaluation tooling built-in**: Traces are automatically logged with full prompt visibility (including guardrail system prompts), enabling rapid iteration.
- **File Search is opaque**: Pre-built RAG tool works but provides no control over chunking, embeddings, or retrieval strategy.

## PAI Action Items
| Action | Category | Priority | Context |
|--------|----------|----------|---------|
| Evaluate MCP integration with AgentKit | Integration | P2 | AgentKit claims MCP support—test if PAI skills can be exposed as MCP servers |
| Build guardrail skill for PAI | Security | P1 | Adapt LLM-based jailbreak detection pattern for Claude Code hooks |
| Create diagram generation workflow for agent flows | Documentation | P3 | Visual agent flows could be documented as Mermaid diagrams |
| Test third-party model support | Experimentation | P2 | AgentKit announced non-OpenAI model support—try Claude as agent LLM |
| Research automated prompt optimization feature | Optimization | P3 | AgentKit includes prompt optimization—study for PAI skill improvements |
| Build custom ChatKit alternative | Development | P3 | Create PAI-native chat interface with better customization |

## Cross-Reference Tags
themes: [agent-frameworks, rag-systems, guardrails, visual-programming, llm-security, embeddable-chat]
