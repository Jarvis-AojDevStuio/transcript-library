---
title: "Five-Step Equity Research Prompt Framework"
date: 2026-02-18
source: "User-provided framework"
tags:
  - investing
  - equity-research
  - prompts
  - gemini-deep-research
  - analysis-framework
category: technology/agentic-engineer
---

# Five-Step Equity Research Prompt Framework

## Step 1: Understand the Business Model

### The Question

How does this company actually make money?

### What You're Looking For

- What does it sell?
- Who buys it, and why?
- How does revenue flow? (recurring vs one-off)
- What drives costs?
- What's the gross margin profile?
- Is it simple or complex?
- Is it predictable or cyclical?

### Why This Matters

You can't evaluate anything else until you understand the economic engine.

### How AI Accelerates This

Open Gemini Deep Research, paste one structured prompt, and insert the company name.

```text
ROLE: Senior equity analyst.
COMPANY: [INSERT NAME]
TASK: Explain how this company actually makes money.

COVER:
1. What it sells and who buys (customer type, decision process, why they pay)
2. Revenue model: recurring vs one-off vs hybrid
3. Gross margin profile and main cost drivers
4. Business simplicity: simple, complex, project-based, or cyclical?
5. One-sentence money engine: how cash actually flows through this business

RULES:
- Use only official filings and investor materials
- Mark anything inferred as (inferred)
- No speculation, no valuation

OUTPUT:
400-600 words. Clear sections. Cite sources.
```

---

## Step 2: Evaluate Management Quality

### The Question

Will management compound my capital or destroy it?

### What You're Looking For

Not just compensation or insider ownership (though those matter). You're assessing behavior:

- Integrity: Do they tell the truth in tough times?
- Long-term thinking: Do they sacrifice short-term EPS for durable value?
- Capital allocation: Do they deploy capital intelligently?
- Communication: Do they explain clearly or hide behind jargon?
- Execution: Do they deliver on what they promise?

### Why This Matters

Great business + poor management = mediocre investment.  
Average business + great management = potential compounder.

### How AI Accelerates This

Instead of reading 5 years of CEO letters, transcripts, and insider transactions manually, drop this management-evaluation prompt into Gemini Deep Research:

```text
ROLE: Buy-side analyst evaluating management behavior.
COMPANY: [INSERT NAME]
TASK: Assess whether management will compound or destroy capital.

EVALUATE (with evidence from filings, transcripts, letters):
1. Integrity: Do they tell the truth in tough times?
2. Long-term thinking: Do they sacrifice short-term EPS for durable value?
3. Capital allocation: Reinvestment, buybacks, M&A discipline - smart or empire-building?
4. Communication: Clear and honest, or jargon and spin?
5. Execution: Promises vs results over 3-5 years

OUTPUT:
- Management Quality Score: X/10
- One-paragraph verdict with key evidence
- If below 7/10, flag as "proceed with caution"

RULES:
- Use only official sources (letters, calls, filings, insider transactions)
- No opinions - behavior patterns only
```

---

## Step 3: Map Growth Drivers and Constraints

### The Question

Where did growth come from, and what limits it?

This is where most theses break. Investors assume growth continues because "it's been growing." That's not analysis. That's hope.

### Part A: Decompose Historical Growth

```text
ROLE: Fundamentals-driven analyst.
COMPANY: [INSERT NAME]
TASK: Break down where revenue growth actually came from over the last 5-7 years.

DECOMPOSE INTO:
- Volume growth (new customers, usage, geography)
- Price/mix (real pricing power or inflation pass-through?)
- Acquisitions (organic vs inorganic)

FOR EACH SOURCE:
- Classify as Structural (repeatable) or Temporary (cycle, one-off, reset)
- Cite evidence from filings

OUTPUT:
Executive summary (5-7 bullets) + detailed breakdown by lever.

RULES:
- No valuation.
- No forecasts.
- Evidence only.
```

### Part B: Identify Constraints

```text
ROLE: Operations strategist using Theory of Constraints.
COMPANY: [INSERT NAME]
TASK: Identify what currently limits growth.

ANSWER:
1. What is the ONE bottleneck limiting growth today?
2. Why is it binding? (evidence)
3. Which growth driver does it constrain?
4. If removed, what becomes the NEXT constraint?
5. Is the bottleneck internal (controllable) or external (structural)?

OUTPUT:
Constraint hierarchy table + 300-word explanation.

RULES:
This is NOT a risk list. Rank constraints by impact.
```

### Part C: Validate Your Growth Assumption

```text
ROLE: Skeptical long-term investor.
COMPANY: [INSERT NAME]
GROWTH ASSUMPTION: ~[X]% CAGR for [Y] years, driven by [A] and [B].
TASK: Test this assumption against reality.

CHECK AGAINST:
1. Company's own history (when did it achieve similar growth? what stopped it?)
2. Competitor behavior (did peers sustain this rate? what broke?)
3. Constraint alignment (do current limits allow this rate for this duration?)

OUTPUT:
- Verdict: Supported / Weakly Supported / Not Supported
- Which part is most fragile: rate, duration, or drivers?
- What must go right for assumption to hold?

RULES:
Do NOT adjust the assumption to make it work. Be explicit.
```

### Why This Matters

80% of valuation is growth. If your growth assumption is wrong, your thesis is wrong.

---

## Step 4: Run the 3-Layer Risk Audit

### The Question

What could break this investment?

Most investors check "risks" once and move on. They list generic risks everyone knows about. That's not useful.

### Layer 1: Core Business Risk (Operational)

```text
ROLE: Business analyst diagnosing operational fragility.
COMPANY: [INSERT NAME]
TASK: Identify what could break the business model from the inside.

COVER:
1. Customer risk: Why would they leave? (price, alternatives, switching costs)
2. Growth risk: What stops revenue from growing? (saturation, execution, competition)
3. Margin risk: What compresses profitability? (input costs, pricing pressure, mix)
4. Moat risk: What erodes competitive advantage? (replication, disruption, commoditization)

FOR EACH:
- Mechanism (how it breaks)
- Evidence (is it already happening?)
- Leading indicator to monitor

OUTPUT:
Ranked risk table + 500-word analysis.
```

### Layer 2: Financial Risk (Balance Sheet)

```text
ROLE: Credit analyst stress-testing capital structure.
COMPANY: [INSERT NAME]
TASK: Assess whether the balance sheet survives stress.

COVER:
1. Leverage: Net debt vs cash generation, interest coverage, maturities
2. Liquidity: Cash buffers, FCF stability, working capital swings
3. Dilution: Share count trends, SBC, capital raises
4. Capital allocation: How management deploys cash - disciplined or reckless?

OUTPUT:
- Financial Risk Score: Low / Medium / High
- Key vulnerability
- What breaks first if conditions worsen?

RULES:
Use latest figures. If balance sheet is strong, say so clearly.
```

### Layer 3: Structural and External Risk (Environment)

```text
ROLE: Industry strategist analyzing external forces.
COMPANY: [INSERT NAME]
TASK: Identify what could permanently change the business from the outside.

COVER:
1. Regulation: Policy shifts, compliance costs, licensing risk
2. Technology: Disruption vectors, substitution, automation
3. Industry power: Consolidation, pricing pressure, customer/supplier leverage
4. Geopolitical: Supply chain, trade, regional exposure
5. Demand trends: Long-cycle shifts, demographic changes

FOR EACH:
- Is it already happening?
- What signal confirms it's becoming material?

OUTPUT:
Top 3-5 structural risks ranked by likelihood x severity.
```

---

## Step 5: Build Your Bear Case

### The Question

How could I lose money on this stock?

### What You're Looking For

- Main failure mode (the most likely way you lose money)
- Structural weaknesses (what's hard to fix)
- Key assumptions that might not hold
- What could permanently impair the business
- Why investors might be fooling themselves
- Evidence that would prove the bear case right

### How AI Accelerates This

Instead of manually building counterarguments and hunting for contrary evidence, give AI your bull thesis and ask it to destroy it.

```text
ROLE: Devil's advocate trying to invalidate this investment.
COMPANY: [INSERT NAME]
TASK: Write the strongest case for why this stock is a bad long-term investment.

COVER:
1. Main failure mode: The single most likely way to lose money
2. Structural weaknesses: What's hard to fix in the business model?
3. Key assumptions that might not hold
4. What could permanently impair earnings or cash flow?
5. Why investors might be fooling themselves (narrative traps, misleading metrics)
6. Evidence that would prove the bear case right

OUTPUT:
- 1-page memo (400-600 words)
- End with: "If [X] happens, the thesis is broken."

RULES:
- Use only official sources
- No softening - be direct
- This is intellectual honesty, not pessimism
```
