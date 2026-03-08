---
videoId: sOPhVSeimtI
title: "THIS is how to expose your apps to AI: WebMCP"
channel: "Syntax"
topic: "ai-llms"
publishedDate: "2026-02-16"
generatedAt: "2026-02-20T23:20:00Z"
pattern: "YouTubeAnalyzer (full)"
---

# Executive summary
WebMCP is a proposal/spec for publishing an app’s “tools” *directly from the website* so an AI (or browser extension) can discover and call them without slow UI automation. The selling point: avoid DOM/screenshot parsing; expose explicit tool schemas via JS registration or even HTML forms.

# The problem being solved
- Browser-driving agents (Playwright, accessibility tree, screenshots) work but are **slow** and token-expensive.
- Building a separate MCP server for every web app is extra infra + duplicated logic.

# The WebMCP idea
A website can declare tool capabilities so an AI can:
- open the site
- discover available tools
- call them via a standard interface

## Two declaration methods
1) **Imperative JS registration**
- `navigator.modelcontext.registerTool(...)`
- Provide name, description, input/output schemas

2) **Declarative HTML via forms** (the clever part)
- Add attributes like:
  - tool name/description
  - param titles/descriptions
- Schema can be inferred from form fields

# Demo (grocery app)
Capabilities exposed as tools:
- create store
- add item
- move item
- delete item/store
- list items

The AI can do multi-step ops fast:
- “Add bananas to Costco, then move bananas to Whole Foods”
- “Add all ingredients for chicken noodle soup”

# Why it’s compelling
- **Speed:** direct tool calls beat UI inference.
- **Token efficiency:** send tool schemas vs full DOM/screenshot.
- **Low friction adoption:** frameworks could autogenerate tool declarations from existing schemas/forms.

# Hot takes / concerns raised
- **Cross-app workflows:** likely possible if a controller can visit multiple sites and unify tools.
- **Will big platforms allow it?** History of public APIs suggests platforms may restrict “utility-style” access over time.
- Many companies want users in their UI for upsells/ads; tool-only access is “too clean.”

# Key takeaways for Ossie
- WebMCP is the web’s “AI-ready” equivalent of responsive design: a small spec change that unlocks natural-language control.
- Your transcript-library app could publish WebMCP-style tools (e.g., mark watched, add note, queue analysis) so agents can operate it without custom MCP.

# Action items
- Track the spec maturity and browser support.
- If building internal tools: consider shipping both
  - a normal UI
  - a tool surface (WebMCP or MCP)
so humans and agents can share the same product.
