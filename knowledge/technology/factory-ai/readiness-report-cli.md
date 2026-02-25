---
title: "Slash Command: /readiness-report"
source: "https://docs.factory.ai/cli/features/readiness-report"
date_scraped: "2026-01-30"
type: documentation
tags:
  - factory-ai
  - droid-cli
  - readiness-report
  - slash-command
---

# Slash Command: /readiness-report

## Overview

The `/readiness-report` command assesses repository autonomy maturity using the Autonomy Maturity Model, scoring across five levels and offering recommendations for improvement.

## Prerequisites

Enable this feature by navigating to `/settings` > `Experimental` > `Readiness Report`.

## Usage

Execute the command in your target repository:

```bash
droid
> /readiness-report
```

## Evaluation Process

The command performs these steps:

1. **Language Detection** -- Identifies supported languages (JavaScript/TypeScript, Python, Rust, Go, Java, Ruby)
2. **Sub-application Discovery** -- Distinguishes mono-repos from single services and identifies deployable applications
3. **Criteria Evaluation** -- Assesses criteria across all five maturity levels
4. **Report Storage** -- Saves evaluation results for Factory app visualization
5. **Summary Output** -- Generates a human-readable report
6. **Remediation** -- Coming soon: automatic fixing of failing criteria

## Output Structure

### Maturity Levels (1-5)

| Level | Name | Description |
|-------|------|-------------|
| 1 | Functional | Basic tooling established |
| 2 | Documented | Processes and documentation in place |
| 3 | Standardized | Security and observability configured |
| 4 | Optimized | Fast feedback and continuous measurement |
| 5 | Autonomous | Self-improving systems |

### Applications Discovered

Mono-repos display each application with brief descriptions.

### Criteria Results

Results use `numerator/denominator` format, where numerator represents passing sub-applications and denominator represents total evaluated applications.

### Action Items

The report provides 2-3 high-impact recommendations to reach the next maturity level.

## Historical Reporting

All reports save automatically and are viewable in the web dashboard to track progression, compare repositories, and share findings with teams.

## Coming Features

Remediation functionality will enable automatic fixes for failing criteria directly from the CLI.
