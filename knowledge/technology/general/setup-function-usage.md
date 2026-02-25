---
title: "Setup Function - Consolidated Project Initialization"
description: "Comprehensive documentation for the setup function that creates standardized project structures with gitignore, documentation, and CodeRabbit configuration."
category: "Technical Documentation"
subcategory: "Shell Functions"
product_line: "Desktop Commander"
audience: "Developers"
status: "Active"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - setup-function
  - project-initialization
  - shell-scripts
  - automation
  - development-tools
---

# Setup Function - Consolidated Project Initialization

## Overview

The `setup` function consolidates all project initialization tasks into one convenient command that creates:

- **`.gitignore`** - Comprehensive exclusions for all major development tools
- **`.coderabbit.yaml`** - Code-focused review configuration (excludes markdown, yaml, txt files)
- **`docs/`** - Complete documentation structure with 22+ categories
- **`docs/templates/prd-template.md`** - Product Requirements Document template

## Installation

### 1. Load the Setup Alias

Add this to your `~/.zshrc` or `~/.bashrc`:

```bash
# Load setup function aliases
source /Users/ossieirondi/Projects/dev-utils/.obsidian/desktop-commander/scripts/shell-optimization/aliases/setup-alias.zsh
```

### 2. Reload Your Shell

```bash
source ~/.zshrc
# or
exec zsh
```

## Usage

### Basic Usage

```bash
# Initialize project with current directory name
setup

# Initialize project with custom name
setup my-awesome-project

# Initialize with custom gitignore entries
setup my-project "*.custom" "temp-files/"
```

### Check Project Status

```bash
# View current project setup status
setup-status
```

### Quick Access Commands

```bash
# View documentation index
docs-index

# View PRD template
prd-template

# View CodeRabbit configuration
coderabbit-config
```

## What Gets Created

### File Structure

```
project-root/
├── .gitignore                     # 280+ exclusion rules
├── .coderabbit.yaml              # Code-focused review config
├── docs/                         # Documentation structure
│   ├── index.md                  # Project overview & navigation
│   ├── templates/
│   │   └── prd-template.md       # Structured PRD template
│   ├── architecture/             # System design docs
│   ├── business-processes/       # Workflow documentation
│   ├── checklists/              # QA checklists
│   ├── database/                # Schema & migrations
│   ├── deployment/              # Deployment guides
│   ├── developer-guidelines/    # Coding standards
│   ├── examples/                # Code examples
│   ├── features/                # Feature specs
│   ├── fixes/                   # Bug fix docs
│   ├── guides/                  # How-to guides
│   ├── implementation-plans/    # Step-by-step plans
│   ├── issues/                  # Bug reports
│   ├── migration/               # Migration docs
│   ├── prds/                    # Requirements docs
│   ├── reports/                 # Analysis reports
│   ├── research/                # Research findings
│   ├── stories/                 # User stories
│   ├── tasks/                   # Task breakdowns
│   ├── testing-plans/           # Test strategies
│   ├── troubleshooting/         # Debug guides
│   ├── unified-dental/          # Project-specific
│   └── validation/              # Acceptance criteria
└── setup-[timestamp].log        # Setup process log
```

### CodeRabbit Configuration Features

The `.coderabbit.yaml` file is configured to:

✅ **Focus on Code Files:**

- JavaScript/TypeScript (`.js`, `.ts`, `.jsx`, `.tsx`)
- Python (`.py`)
- Java (`.java`)
- Go (`.go`)
- Rust (`.rs`)

❌ **Skip Documentation Files:**

- Markdown (`.md`)
- YAML (`.yml`, `.yaml`)
- Text files (`.txt`)
- reStructuredText (`.rst`)
- AsciiDoc (`.adoc`)

🔧 **Enhanced Features:**

- AST-grep rules for advanced pattern matching
- Essential security rules enabled
- Custom rule directories support
- TSDoc and Google-style docstring generation

## Example Workflow

```bash
# 1. Navigate to your project directory
cd ~/Projects/my-new-project

# 2. Run setup with project name
setup my-new-project "*.tmp" "cache/"

# 3. Check what was created
setup-status

# 4. View the documentation index
docs-index

# 5. Initialize git and make first commit
git init
git add .
git commit -m "Initial project setup with comprehensive structure"

# 6. Create your first PRD
cp docs/templates/prd-template.md docs/prds/user-authentication.md
```

## Advanced Usage

### Custom Gitignore Entries

```bash
# Add project-specific exclusions
setup my-project "*.custom" "temp-data/" "local-config.json"
```

### Integration with Git

The setup function automatically detects git repositories and includes:

- Current branch information
- Last commit details
- GitHub repository links (if available)
- Dynamic project context in documentation

### Integration with GitHub CLI

If `gh` CLI is installed, the function will:

- Automatically detect GitHub repository URLs
- Include issue tracker links in documentation
- Provide quick links for creating new issues

## Troubleshooting

### Permission Issues

```bash
chmod +x /Users/ossieirondi/Projects/dev-utils/.obsidian/desktop-commander/scripts/shell-optimization/functions/setup
```

### Alias Not Found

Ensure the alias is loaded:

```bash
source /Users/ossieirondi/Projects/dev-utils/.obsidian/desktop-commander/scripts/shell-optimization/aliases/setup-alias.zsh
```

### Existing Files

The function handles existing files gracefully:

- **`.gitignore`**: Creates backup before overwriting
- **`docs/`**: Creates missing subdirectories, preserves existing files
- **Setup log**: Saves detailed execution log with timestamp

## Benefits

1. **Consistency**: Every project starts with the same professional structure
2. **Time Savings**: One command replaces 4+ separate initialization tasks
3. **Best Practices**: Incorporates industry-standard exclusions and configurations
4. **Code Focus**: CodeRabbit reviews only actual code, not documentation
5. **Documentation Ready**: Professional documentation structure from day one
6. **Git Integration**: Seamless integration with version control workflows

## Next Steps After Setup

1. **Review** `docs/index.md` for project overview
2. **Customize** `.coderabbit.yaml` for your specific tech stack
3. **Create** your first feature using `docs/templates/prd-template.md`
4. **Commit** the initial structure to git
5. **Share** the setup function with your team for consistency
