---
videoId: HGPTUc7tEq4
title: "Fine-Tune an Open Source LLM with Claude Code/Codex (Hugging Face Model Trainer Skill)"
channel: "Alejandro AO"
topic: "ai-llms"
publishedDate: "2026-02-17"
generatedAt: "2026-02-20T23:20:00Z"
pattern: "YouTubeAnalyzer (full)"
---

# Executive summary
This is a “fine-tuning without being a fine-tuning expert” walkthrough: use a small base model (Qwen 3 0.6B), a labeled dataset (customer support intents), and let an agent (Codex/Claude Code) drive a Hugging Face Jobs training run via an MCP server + a Model Trainer skill. The payoff: a tiny on-server model that outputs structured JSON (intent/confidence/reason) for pennies.

# System being built
A ticket classifier/router:
- Input: customer message + metadata
- Output: JSON `{ intent, confidence, reason }`
- Store result in DB; use intent for routing/automation

# Setup requirements (as described)
- Hugging Face Pro account
- HF token with:
  - write access
  - permission to start/manage jobs
- Hugging Face MCP server installed in your agent
- Install “Hugging Face model trainer” skill via `npx skills add ...`
- HF CLI login (ensure the right token is active)

# Training recipe (what matters)
- Base model: **Qwen 3 0.6B** (small/cheap)
- Dataset: customer support dataset with instruction + intent labels
- Keep only top intents by frequency (12 intents) on first ~5k rows
- Format training samples in chat style:
  - user: ticket
  - assistant: JSON `{ intent, confidence, reason }`
- Strategy: **SFT**
- Max seq length: 512
- Evaluate on held-out slice:
  - accuracy
  - valid JSON rate
  - schema pass rate

# Results / claims
- Before fine-tune: ~20% accuracy, low JSON/schema validity.
- After fine-tune: ~85% accuracy in notebook eval, ~98% valid JSON, ~88% schema pass.
- Cost example: ~55 minutes wall-clock at ~$0.40/hr → **~$0.36–$0.40 total**.

# Key takeaways (for you)
1) **Small models + narrow task = huge ROI.** Don’t spend frontier-model money to classify tickets.
2) **Agents make “expert workflows” accessible** by automating choice points (hardware, cost, strategy).
3) **Always optimize for structured outputs** (JSON + schema checks) in production.
4) Evaluate twice:
   - job-reported metrics
   - your own notebook/playground to catch failure modes

# Practical pitfalls
- Your dataset quality dominates; thumbs-up/down feedback is gold.
- Keep schema strict. The “valid JSON rate” is as important as accuracy.
- Don’t skip cost estimation prompts; HF Jobs can scale spend quickly.

# Suggested next steps
- Replicate this flow for any repeatable classification task in your pipeline:
  - routing
  - tagging
  - moderation
  - triage
- Wrap the fine-tuned model behind a tiny API so it becomes a cheap internal primitive.
