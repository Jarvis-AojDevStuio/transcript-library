---
title: "SuperClaude Flag Reference Template"
description: "Template for defining flag systems in AI frameworks including priority handling, auto-activation, and conflict resolution."
category: "Templates"
subcategory: "System Configuration"
product_line: "Desktop Commander"
audience: "AI Framework Developers"
status: "Template"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - template
  - superclaude
  - flags
  - system-configuration
  - auto-activation
---

# FLAGS.md - SuperClaude Flag Reference

_Briefly describe the purpose of the flag system, its architecture, and how it handles conflicts and auto-activation._

---

## Flag System Architecture

_Outline the priority order for flag activation. For example, specify how safety flags override optimization flags, and how user-provided flags take precedence over auto-detection._

---

## Planning & Analysis Flags

_List flags used for planning and analysis, such as `--plan`, `--think`, `--think-hard`, and `--ultrathink`. For each flag, describe its purpose, token budget, and auto-activation conditions._

---

## Compression & Efficiency Flags

_Detail flags that manage token efficiency and output verbosity, like `--uc`, `--answer-only`, `--validate`, and `--safe-mode`. Explain what each flag does and when it's automatically triggered._

---

## MCP Server Control Flags

_Document flags that control MCP server interactions, such as `--c7`, `--seq`, `--magic`, and `--play`. Include flags for enabling or disabling all or specific servers._

---

## Sub-Agent Delegation Flags

_Describe flags for managing sub-agent delegation, like `--delegate` and `--concurrency`. Explain how these flags enable parallel processing and control resource usage._

---

## Wave Orchestration Flags

_List flags that control Wave Orchestration, such as `--wave-mode` and `--wave-strategy`. Explain how these flags manage multi-stage, complex operations._

---

## Scope & Focus Flags

_Detail flags that define the scope and focus of an operation, like `--scope` (e.g., file, module, project) and `--focus` (e.g., performance, security, quality)._

---

## Iterative Improvement Flags

_Outline flags used for iterative workflows, such as `--loop`, `--iterations`, and `--interactive`. Describe how these flags enable progressive refinement._

---

## Persona Activation Flags

_List all available persona flags (e.g., `--persona-architect`, `--persona-frontend`). Briefly describe the specialty of each persona._

---

## Introspection & Transparency Flags

_Describe flags that provide insight into the framework's internal processes, such as `--introspect`. Explain what kind of information is exposed._

---

## Flag Integration Patterns

### MCP Server Auto-Activation

_Explain the logic for automatically activating MCP servers based on context, such as detecting external library imports or specific keywords._

### Flag Precedence

_Define the rules that resolve conflicts between different flags. Create a clear hierarchy of which flags override others._

### Context-Based Auto-Activation

_Detail the specific conditions under which flags are automatically enabled. For example, specify the complexity score or file count that triggers wave mode or sub-agent delegation._
