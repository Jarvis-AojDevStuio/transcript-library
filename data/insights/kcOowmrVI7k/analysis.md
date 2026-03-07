```md
---
title: "How to prompt Gemini 3.1 for Epic animations"
channel: "AI Jason"
topic: "ai-llms"
publishedDate: "2026-02-25"
generatedAt: "2026-03-07"
pattern: "headless-youtube-analysis"
contentType: "tutorial"
analysisDepth: "standard"
sourceUrl: "https://youtube.com/watch?v=kcOowmrVI7k"
githubRepos: []
---

## Summary

This short tutorial (under 5 minutes) by AI Jason addresses the quality gap between impressive Gemini-generated animations seen online and the mediocre results most people get when they try it themselves. The core diagnosis: the model receives vague, open-ended prompts that force it to handle spatial planning it was never trained for, producing chaotic, PowerPoint-style output.

The proposed fix is a two-stage workflow: plan first, build second. The planning artifact is a structured, scene-based prompt that explicitly enumerates every scene's timing, UI state, visual effects, and transitions. This prompt structure offloads all spatial and temporal reasoning from the model so it can focus purely on code generation.

The tutorial demonstrates the workflow through a concrete product-launch video example, showing how a real user ("rocket") produced high-quality open-claw animation by following this exact structure. The author then walks through producing a similar video using Super Design's skill library, which wraps the scene-planning process behind a guided UI with targeted clarifying questions before generating the final prompt.

While the demo uses Super Design + Gemini 2.0/3.1 Pro specifically, the author explicitly frames the prompting approach as provider-agnostic — applicable to Claude Code, Cursor, or any coding agent.

## Key Takeaways

- The quality gap in model-generated animation is almost entirely a prompting problem, not a model capability ceiling
- Vague prompts like "animate this" force the model to handle spatial planning it cannot do well; structured prompts remove that burden
- A scene-based prompt has four required components: **timing**, **defined UI state per scene**, **special effect keywords**, and **action/technical details**
- Separating planning (structured prompt generation) from building (code generation) is the critical architectural move
- Effect keywords (e.g., "3D perspective rotation", "fading with staggered delay") are not decoration — they are control signals the model responds to
- Super Design's product-release-demo skill automates structured prompt generation via targeted questions, then hands the completed plan to Gemini 3.1 Pro
- The technique works with any coding agent; the Super Design tooling is a convenience wrapper, not a requirement

## Action Items

1. Before prompting any model for animation, write a scene-by-scene plan first — list every scene with its duration, starting UI state, ending UI state, and effects
2. Include explicit timing values (e.g., "0–1.2s: logo fades in with opacity ease-in") rather than relative language like "slow" or "quick"
3. Add specific effect keywords to each scene description to give the model precise rendering intent
4. If using Super Design, use the Chrome extension to clone the target UI component, then invoke the product-release-demo skill for guided prompt scaffolding
5. Validate the generated animation plan before building — the plan stage is where corrections are cheap; post-generation rewrites are expensive
6. Apply this same scene-based prompt structure in Claude Code or Cursor if not using Super Design

## Supporting Details

### Ideas / Methods / Claims

- **Root cause of bad AI animation**: open-ended prompts force models to perform spatial planning, a task outside their training distribution
- **Scene-based prompt structure**: each scene block contains timing, UI state description, effect keywords, and action/transition details
- **Two-stage separation**: Stage 1 = structured planning artifact; Stage 2 = code generation against that artifact
- **Claim**: even a basic structured prompt (without special techniques) yields "2–3x better results" than a freeform prompt
- The transcript references "rocket" as an external practitioner whose open-claw animation prompt exemplifies the correct structure

### Tools / Repos / Resources Mentioned

- **Gemini 2.0 / Gemini 3.1 Pro** — target model for animation generation; 3.1 Pro cited as best for this use case
- **Super Design** — platform with a skill library for structured animation prompting; includes a "product release demo" skill
- **Super Design Chrome Extension** — clones any website or UI component into a pixel-perfect HTML artifact for use in coding agents
- **Claude Code / Cursor** — mentioned as valid alternative environments for the same prompting technique

### Who This Is For

- Developers and designers trying to generate polished product-launch or demo animations using LLMs
- Anyone who has tried Gemini or similar models for SVG/animation work and been disappointed by the output
- Users of Super Design who want to leverage the built-in animation skill pipeline
- Builders using Claude Code or Cursor who want structured prompting techniques that transfer across tools

### Risks, Gaps, or Caveats

- The tutorial is short (~5 min, ~1000 words) and the concrete prompt examples shown are partial — no full scene-based prompt template is provided verbatim in the transcript
- The "2–3x better results" claim is anecdotal and not benchmarked
- The Super Design workflow requires their Chrome extension and platform account; the "free" tier is mentioned but limits are not specified
- The transcript references "Gemini 3.1 Pro" but the published date is 2026-02-25 — this likely refers to Gemini 2.0 Flash or a model branded differently at release; verify the exact model ID before building on this
- Transcript audio quality indicators ("shitty", "skew", "pera release") suggest some transcription noise; minor factual details may be slightly garbled
```
