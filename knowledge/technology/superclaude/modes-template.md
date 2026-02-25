---
title: "SuperClaude Operational Modes Reference Template"
description: "Template for defining operational modes in AI frameworks including task management, introspection, and efficiency modes."
category: "Templates"
subcategory: "Operational Design"
product_line: "Desktop Commander"
audience: "AI Framework Developers"
status: "Template"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - template
  - superclaude
  - operational-modes
  - task-management
  - framework-design
---

# MODES.md - SuperClaude Operational Modes Reference

_Provide a high-level overview of the different operational modes available in the framework, such as Task Management, Introspection, and Token Efficiency._

---

# Task Management Mode

_Explain the purpose of Task Management Mode and its core principles, such as evidence-based progress and single-task focus._

## Core Principles

_List the fundamental rules that govern task management, like requiring measurable outcomes and performing validation before completion._

## Architecture Layers

_Describe the different layers of task management, from session-level todos to multi-session project management._

### Layer 1: TodoRead/TodoWrite (Session Tasks)

_Detail the scope, states (e.g., pending, in_progress), and capacity of session-level tasks._

### Layer 2: /task Command (Project Management)

_Explain how the `/task` command is used for longer-term, multi-session features, including its hierarchical structure._

### Layer 3: /use-agent Command (Meta-Orchestration)

_Describe the purpose of the `/use-agent` command for coordinating complex, multi-domain operations._

### Layer 4: /loop Command (Iterative Enhancement)

_Explain how the `/loop` command supports progressive refinement and iterative workflows._

## Task Detection and Creation

_Outline how tasks are identified and created, both automatically and manually._

### Automatic Triggers

_List the keywords (e.g., build, fix) and scope indicators that automatically trigger task creation._

### Task State Management

_Define the different states a task can be in (e.g., pending, in_progress, completed) and what each state signifies._

---

# Introspection Mode

_Explain that this mode allows the AI to analyze its own reasoning, decision-making, and action sequences._

## Purpose

_Describe the goal of Introspection Mode, which is to enable meta-cognitive analysis for self-awareness and optimization._

## Core Capabilities

_Detail the key functions of this mode, such as examining decision logic, validating assumptions, and identifying knowledge gaps._

### 1. Reasoning Analysis

_Explain how the AI analyzes its logical flow, chain of thought, and underlying assumptions._

### 2. Action Sequence Analysis

_Describe how the AI reviews its tool selection, workflow patterns, and the efficiency of its actions._

### 3. Meta-Cognitive Self-Assessment

_Detail how the AI examines its own thinking processes, calibrates confidence levels, and identifies learning patterns._

### 4. Framework Compliance & Optimization

_Explain how the AI checks its adherence to the framework's rules and principles, and identifies deviations from optimal patterns._

### 5. Retrospective Analysis

_Describe how the AI evaluates outcomes, recognizes error patterns, and identifies opportunities for improvement._

## Activation

_Outline the methods for activating Introspection Mode._

### Manual Activation

_Specify the flags (`--introspect` or `--introspection`) used to manually activate this mode._

### Automatic Activation

_List the conditions that automatically trigger Introspection Mode, such as self-analysis requests or error recovery._

## Analysis Markers

_Define the markers (e.g., 🧠, 🔄, 🎯) used to signify different types of analysis and provide transparency into the process._

## Communication Style

_Describe the communication approach used in this mode, emphasizing its analytical and self-reflective nature._

### Analytical Approach

_Explain that the focus is on examining reasoning processes and supporting conclusions with evidence._

### Meta-Cognitive Perspective

_Describe how the AI adopts a perspective of self-awareness, pattern recognition, and continuous learning._

## Common Issues & Troubleshooting

_Outline common problems that can be diagnosed and addressed using Introspection Mode._

### Performance Issues

_Describe how to analyze tool selection, persona activation, and MCP coordination to resolve performance problems._

### Quality Issues

_Explain how to examine quality gate compliance and evidence collection to address quality gaps._

### Framework Confusion

_Detail how to identify and resolve issues related to suboptimal framework configuration or pattern usage._

---

# Token Efficiency Mode

_Explain that this mode uses an intelligent optimization engine to manage token usage effectively through adaptive compression._

## Core Philosophy

_List the guiding principles of this mode, such as evidence-based efficiency, adaptive intelligence, and quality preservation._

## Symbol System

_Provide tables that define the symbols used for core logic, status updates, and technical domains to achieve compression._

### Core Logic & Flow

_List symbols that represent logical operations and flow control (e.g., →, ⇒, ∴)._

### Status & Progress

_List symbols that indicate the status of an operation (e.g., ✅, ❌, ⚠️)._

### Technical Domains

_List symbols that represent different technical areas (e.g., ⚡ for Performance, 🛡️ for Security)._

## Abbreviations

_Provide a list of common abbreviations used to reduce token count in communications._

### System & Architecture

_List abbreviations for terms related to system design and architecture (e.g., cfg, arch, perf)._

### Development Process

_List abbreviations for terms related to the development lifecycle (e.g., req, deps, val)._

### Quality & Analysis

_List abbreviations for terms related to quality assurance and analysis (e.g., qual, sec, err)._

## Intelligent Token Optimizer

_Describe the evidence-based compression engine, its activation strategies, and the techniques it uses._

### Activation Strategy

_Explain how the optimizer is activated, including manual flags, automatic thresholds, and progressive levels._

### Enhanced Techniques

_Detail the advanced methods used for optimization, such as persona-aware symbols and context-sensitive abbreviations._

## Advanced Token Management

_Describe the strategies for managing token usage in complex scenarios._

### Intelligent Compression Strategies

_Outline the adaptive compression levels, from minimal to emergency, based on token usage percentage._

### Framework Integration

_Explain how token optimization is integrated with other framework components like Wave Coordination and Personas._

### MCP Optimization & Caching

_Describe how caching is used with MCP servers to save tokens and improve efficiency._

### Performance Metrics

_Define the target metrics for token efficiency, including reduction percentage, information preservation score, and processing speed._
