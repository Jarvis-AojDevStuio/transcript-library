---
title: "Command Center File Trees Documentation"
description: "Complete directory structure and organization documentation for the Desktop Commander system architecture."
category: "System Architecture"
subcategory: "Documentation"
product_line: "Desktop Commander"
audience: "Developers"
status: "Active Documentation"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - architecture
  - file-structure
  - documentation
  - command-center
  - organization
---

# Command Center Documentation - File Trees

**Full Path:**
/Users/ossieirondi/Projects/dev-utils/.obsidian/desktop-commander

## CC Commands Directory - High level tree of main folders

```
.
├── ai-docs                    # AI documentation templates and frameworks
├── CHANGELOG.md              # Project change history
├── CLAUDE.md                 # Claude integration instructions
├── docs                      # Main documentation directory
├── format-needed             # PDFs awaiting formatting
├── GEMINI.md                 # Gemini integration docs
├── logs                      # System and agent logs
├── nas                       # Network Attached Storage configs
├── outputs                   # Generated files and reports
├── personal                  # Personal planning documents
├── scripts                   # Automation and utility scripts
└── workflows                 # Workflow templates and experiments
```

The desktop commander command center directory contains **documentation repository and knowledge base** that serves as an **Obsidian vault** accessed directly through **Claude Desktop** via the **Desktop Commander MCP tool**. It functions as a centralized location for project documentation, workflow templates, context optimization, and organizational knowledge management.

## Docs Directory - tree of sub-folders in the docs directory

```
docs/
├── agentic-tdd-commands/              # Test-driven development workflows *deprecated*
├── claude-code-subagents-collection/  # Specialized AI agent definitions
├── command-center-file-trees.md       # This documentation file
├── dental-dashboard-docs/             # Dental practice management system docs
├── research/                          # Technology research and analysis
├── templates/                         # Document templates
└── unified-dental/                    # Unified Dental platform docs
```

The Docs directory contains many kinds of documentation, created by desktop commander or by the user. It is a place to store documentation for the Command Center, research materials, and other documentation.

## Research Directory - tree of sub-folders in the docs/research directory

```
research/
├── ai-coding/               # AI coding practices and announcements
├── anthropic/               # Claude/Anthropic documentation
├── astral-uv-docs/         # Astral UV scripting docs
├── context7.md             # Context7 integration guide
├── google-docs/            # Google Apps Script documentation
├── investing/              # Investment research (empty)
├── mastra-docs/            # Mastra orchestration platform
├── mcp-docs/               # MCP server documentation
├── personal-repo-mcp/      # Personal MCP repository specs
├── prisma-docs-supabase-docs/ # Database technology docs
├── proxmox-docs/           # Proxmox virtualization docs
├── supabase-docs/          # Supabase platform docs
├── testing-docs/           # Testing framework documentation
└── youtube-summaries/      # Video content summaries
```

The Research directory contains documentation related to various development tools and platforms. It includes Claude AI configuration, Command Center documentation, and research materials for Prisma, Supabase, pnpm, and Proxmox. The directory serves as a knowledge repository for development workflows and platform-specific implementation guides.

## Unified Dental Directory - tree of the sub-folders in the docs/unified-dental directory

```
unified-dental/
├── ai-training/             # AI training materials
│   ├── agent-frameworks/    # Agent behavior templates
│   ├── claude-projects/     # Claude project configurations
│   └── dental-narrator/     # Dental claim narration system
├── assets/                  # Visual assets and logos
├── business-intelligence/   # BI and analytics profiles
├── dental-knowledge-base/   # Dental practice knowledge
│   ├── miscelleneous/      # Misc documentation
│   ├── operations/         # Operational procedures
│   ├── position-based-guides/ # Role-specific guides
│   └── sops/               # Standard operating procedures
└── frameworks/             # Business frameworks
```

The Unified Dental directory contains documentation for the Unified Dental platform, including AI training materials, assets, and position-based guides. It also includes frameworks for office operations and employee handbooks.

## Scripts Directory - tree of the sub-folders in the scripts directory

```
scripts/
├── changelog/              # Changelog generation utilities
│   ├── README.md
│   ├── update-changelog.py
│   └── utils.py
├── deprecated/             # Deprecated scripts
│   └── agentic-tdd/       # Old TDD implementation
├── shell-optimization/     # Shell performance optimization
│   ├── aliases/           # Shell aliases
│   ├── completions/       # Shell completions
│   ├── config/            # Configuration files
│   ├── functions/         # Shell functions
│   ├── modules/           # Modular components
│   └── utils/             # Utility scripts
└── system/                # System maintenance scripts
    ├── audit-global-packages.py
    ├── migrate-memory-mcp.sh
    ├── system-health-check.py
    └── system-health-check-enhanced.py
```

The Scripts directory contains scripts for maintaining the performance of the parent machine which is a M4 Pro Macbook Pro. It includes scripts for shell optimization, performance monitoring, and system maintenance. It is also a place to store scripts created by desktop commander.

## Workflows Directory - tree of the sub-folders in the workflows directory

```
workflows/
└── paralell-development-claude-brainstorm/  # Parallel dev workflow
    ├── ai-docs/            # AI documentation
    ├── cjs-scripts/        # CommonJS scripts
    ├── logs/               # Workflow logs
    ├── scripts/            # Workflow scripts
    ├── standalone-scripts/ # Independent Python scripts
    └── utils/              # Utility functions
```

The Workflows directory contains ideas for workflows that can be implemented in the future. It is a place to store ideas for workflows that can be implemented in the future.

## Nas Directory - tree of the sub-folders in the nas directory

```
nas/
├── backup/                 # Backup configurations
├── docker-compose.yml      # Docker service definitions
├── grafana/               # Grafana monitoring configs
│   └── provisioning/      # Auto-provisioning
├── prometheus/            # Prometheus metrics configs
├── scripts/               # NAS management scripts
│   ├── backup-sync.sh
│   └── manage-backup.sh
├── secrets/               # Encrypted credentials
└── setup.sh              # NAS setup script
```

The Nas directory contains documentation and configurations for a production-grade Docker deployment stack for self-hosted development environment, including services like Traefik, code-server, PostgreSQL, Redis, Prometheus, Grafana, and Portainer. It provides comprehensive monitoring, security with Tailscale integration, automatic HTTPS, and encrypted secrets management.

_Generated on: 2025-08-02_
