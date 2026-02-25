# Claude Code Slash Commands Reference

## Overview

Claude Code provides a comprehensive set of slash commands for managing development workflows, configuration, and project-specific automation. Commands are categorized into built-in system commands and custom commands that can be project or user-specific.

## Built-in System Commands

### Core Functionality

#### `/help`

Displays available commands and usage information.

#### `/bug`

- **Purpose**: Submits conversation logs to Anthropic for analysis
- **Features**: Automatic context capture including stack traces, tool call histories, and permission decision logs
- **Usage**: Use when encountering unexpected behavior or errors

#### `/clear`

- **Purpose**: Resets conversation context using LRU cache eviction
- **Features**: Preserves system prompts and CLAUDE.md references while reducing token usage by ~62%
- **Usage**: Use when context becomes too large or unfocused

#### `/compact [instructions]`

- **Purpose**: Optimizes context window through intelligent message filtering
- **Parameters**: Optional focus parameter to prioritize code references over natural language
- **Usage**: `/compact` or `/compact focus on authentication logic`

### Configuration & Environment

#### `/config`

- **Purpose**: Manages runtime settings via configuration files
- **Features**: Controls model parameters, behavior settings, and session preferences
- **Settings Include**:
  - Temperature (0.0-1.0)
  - Max tokens
  - Conversation compaction toggle
  - Tool permissions

#### `/doctor`

- **Purpose**: Runs comprehensive diagnostic checks (23+ tests)
- **Checks Include**:
  - API connectivity tests
  - File permission validations
  - Dependency version verification
  - Environment setup validation

#### `/init`

- **Purpose**: Bootstraps projects with context-aware CLAUDE.md templates
- **Features**:
  - Auto-detects tech stack through file signature analysis
  - Generates onboarding checklists for new contributors
  - Sets up project-specific command structure

### Security & Authentication

#### `/login` / `/logout`

- **Purpose**: Manages authentication sessions
- **Features**:
  - OAuth 2.0 device flow with PKCE
  - JWT refresh tokens (rotate every 15 minutes)
  - Audit logs for all authentication events

#### `/permissions`

- **Purpose**: Manages tool allow/deny lists using glob patterns
- **Usage**: Control which tools Claude can access
- **Examples**:
  - `Bash(git push*)` - restricts push operations
  - Integrates with enterprise IAM systems

#### `/approved-tools`

- **Purpose**: Interactive tool permission management
- **Features**: Convenient interface for controlling tool access

### Development Workflows

#### `/review`

- **Purpose**: Initiates comprehensive code analysis pipeline
- **Features**:
  - Static analysis
  - Security scanning
  - Performance checks
  - Generates fix patches in unified diff format

#### `/memory`

- **Purpose**: Manages conversation memory and context
- **Features**: Control what Claude remembers across sessions

#### `/model`

- **Purpose**: Switch between different Claude models
- **Usage**: Select optimal model for specific tasks

#### `/status`

- **Purpose**: Shows current session status and configuration
- **Features**: Displays active settings, connected tools, and session info

### Utility Commands

#### `/vim`

- **Purpose**: Activates modal editing with Vim-style keybindings
- **Features**:
  - Supports macros and register operations
  - Integrates with tmux sessions
  - Mirrors Vim 9.0 functionality

#### `/terminal-setup`

- **Purpose**: Configures terminal integration and shell setup
- **Features**: Optimizes Claude Code for your specific terminal environment

#### `/cost`

- **Purpose**: Displays token usage and associated costs
- **Features**: Track spending and optimize usage patterns

#### `/release-notes`

- **Purpose**: View recent updates and feature releases
- **Features**: Stay informed about new capabilities and changes

#### `/mcp`

- **Purpose**: Manage Model Context Protocol (MCP) servers
- **Subcommands**:
  - `claude mcp add` - Interactive setup wizard
  - `claude mcp add-from-claude-desktop` - Import from Claude Desktop
  - `claude mcp add-json <n> <json>` - Add via JSON string

#### `/pr_comments`

- **Purpose**: Manage pull request comments and reviews
- **Features**: Streamline code review workflows

# Slash commands

> Control Claude's behavior during an interactive session with slash commands.

## Built-in slash commands

| Command                   | Purpose                                                                        |
| :------------------------ | :----------------------------------------------------------------------------- |
| `/add-dir`                | Add additional working directories                                             |
| `/bug`                    | Report bugs (sends conversation to Anthropic)                                  |
| `/clear`                  | Clear conversation history                                                     |
| `/compact [instructions]` | Compact conversation with optional focus instructions                          |
| `/config`                 | View/modify configuration                                                      |
| `/cost`                   | Show token usage statistics                                                    |
| `/doctor`                 | Checks the health of your Claude Code installation                             |
| `/help`                   | Get usage help                                                                 |
| `/init`                   | Initialize project with CLAUDE.md guide                                        |
| `/login`                  | Switch Anthropic accounts                                                      |
| `/logout`                 | Sign out from your Anthropic account                                           |
| `/mcp`                    | Manage MCP server connections and OAuth authentication                         |
| `/memory`                 | Edit CLAUDE.md memory files                                                    |
| `/model`                  | Select or change the AI model                                                  |
| `/permissions`            | View or update [permissions](/en/docs/claude-code/iam#configuring-permissions) |
| `/pr_comments`            | View pull request comments                                                     |
| `/review`                 | Request code review                                                            |
| `/status`                 | View account and system statuses                                               |
| `/terminal-setup`         | Install Shift+Enter key binding for newlines (iTerm2 and VSCode only)          |
| `/vim`                    | Enter vim mode for alternating insert and command modes                        |

## Custom slash commands

Custom slash commands allow you to define frequently-used prompts as Markdown files that Claude Code can execute. Commands are organized by scope (project-specific or personal) and support namespacing through directory structures.

### Syntax

```
/<command-name> [arguments]
```

#### Parameters

| Parameter        | Description                                                       |
| :--------------- | :---------------------------------------------------------------- |
| `<command-name>` | Name derived from the Markdown filename (without `.md` extension) |
| `[arguments]`    | Optional arguments passed to the command                          |

### Command types

#### Project commands

Commands stored in your repository and shared with your team. When listed in `/help`, these commands show "(project)" after their description.

**Location**: `.claude/commands/`

In the following example, we create the `/optimize` command:

```bash
# Create a project command
mkdir -p .claude/commands
echo "Analyze this code for performance issues and suggest optimizations:" > .claude/commands/optimize.md
```

#### Personal commands

Commands available across all your projects. When listed in `/help`, these commands show "(user)" after their description.

**Location**: `~/.claude/commands/`

In the following example, we create the `/security-review` command:

```bash
# Create a personal command
mkdir -p ~/.claude/commands
echo "Review this code for security vulnerabilities:" > ~/.claude/commands/security-review.md
```

### Features

#### Namespacing

Organize commands in subdirectories. The subdirectory name appears in the command's description to help identify its source.

For example, a file at `.claude/commands/frontend/component.md` creates the command `/component` with description showing "(project:frontend)"

#### Arguments

Pass dynamic values to commands using the `$ARGUMENTS` placeholder.

For example:

```bash
# Command definition
echo 'Fix issue #$ARGUMENTS following our coding standards' > .claude/commands/fix-issue.md

# Usage
> /fix-issue 123
```

#### Bash command execution

Execute bash commands before the slash command runs using the `!` prefix. The output is included in the command context.

For example:

```markdown
---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit
---

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`

## Your task

Based on the above changes, create a single git commit.
```

#### File references

Include file contents in commands using the `@` prefix to [reference files](/en/docs/claude-code/common-workflows#reference-files-and-directories).

For example:

```markdown
# Reference a specific file
Review the implementation in @src/utils/helpers.js

# Reference multiple files
Compare @src/old-version.js with @src/new-version.js
```

#### Thinking mode

Slash commands can trigger extended thinking by including [extended thinking keywords](/en/docs/claude-code/common-workflows#use-extended-thinking).

### File format

Command files support:

- **Markdown format** (`.md` extension)
- **YAML frontmatter** for metadata:
  - `allowed-tools`: List of tools the command can use
  - `description`: Brief description of the command
- **Dynamic content** with bash commands (`!`) and file references (`@`)
- **Prompt instructions** as the main content

## MCP slash commands

MCP servers can expose prompts as slash commands that become available in Claude Code. These commands are dynamically discovered from connected MCP servers.

### Command format

MCP commands follow the pattern:

```
/mcp__<server-name>__<prompt-name> [arguments]
```

### Features

#### Dynamic discovery

MCP commands are automatically available when:

- An MCP server is connected and active
- The server exposes prompts through the MCP protocol
- The prompts are successfully retrieved during connection

#### Arguments

MCP prompts can accept arguments defined by the server:

```
# Without arguments
> /mcp__github__list_prs

# With arguments
> /mcp__github__pr_review 456
> /mcp__jira__create_issue "Bug title" high
```

#### Naming conventions

- Server and prompt names are normalized
- Spaces and special characters become underscores
- Names are lowercased for consistency

### Managing MCP connections

Use the `/mcp` command to:

- View all configured MCP servers
- Check connection status
- Authenticate with OAuth-enabled servers
- Clear authentication tokens
- View available tools and prompts from each server

## See also

- [Interactive mode](/en/docs/claude-code/interactive-mode) - Shortcuts, input modes, and interactive features
- [CLI reference](/en/docs/claude-code/cli-reference) - Command-line flags and options
- [Settings](/en/docs/claude-code/settings) - Configuration options
- [Memory management](/en/docs/claude-code/memory) - Managing Claude's memory across sessions

## Custom Slash Commands

### Project-Specific Commands (`/project:`)

**Location**: `.claude/commands/` directory in project root

**Namespacing Structure**:

```
.claude/commands/frontend/test.md → /project:frontend:test
.claude/commands/backend/deploy.md → /project:backend:deploy
```

**Argument Templating**:

```markdown
<!-- fix-issue.md -->
Repair $ARGUMENTS using company coding standards and best practices
```

**Usage**: `/project:fix-issue ABC-123`

### Personal Commands (`/user:`)

**Location**: `~/.claude/commands/` directory in user home

**Features**:

- Cross-project access (available in all repositories)
- Personal workflow automation
- Reusable across different codebases

**Example Security Command**:

```markdown
<!-- sec-review.md -->
Check for OWASP Top 10 vulnerabilities in:
- Authentication flows
- Data serialization
- Error handling
```

**Usage**: `/user:sec-review`

## Advanced Features

### Session Management

```bash
# Resume specific conversation
claude --continue
claude --resume

# MCP server configuration
claude --mcp-config <path-to-file>
claude --mcp-debug
```

### Command Chaining

```bash
# Pipe output between commands (conceptual)
/project:lint | /project:fix --aggressive
```

### Enterprise Integration

- SCIM integration for user management
- Enterprise IAM system compatibility
- Audit logging and compliance features

## Command Categories Summary

| Category        | Commands                                             | Purpose                                 |
| --------------- | ---------------------------------------------------- | --------------------------------------- |
| **Core**        | `/help`, `/clear`, `/compact`, `/bug`                | Basic functionality and troubleshooting |
| **Config**      | `/config`, `/doctor`, `/init`, `/permissions`        | Environment and setup management        |
| **Auth**        | `/login`, `/logout`, `/approved-tools`               | Security and authentication             |
| **Development** | `/review`, `/memory`, `/model`, `/status`            | Code analysis and workflow              |
| **Utility**     | `/vim`, `/terminal-setup`, `/cost`, `/release-notes` | Interface and information               |
| **MCP**         | `/mcp`                                               | Model Context Protocol management       |
| **Custom**      | `/project:*`, `/user:*`                              | Project and personal automation         |

## Best Practices

1. **Use `/doctor`** regularly to ensure environment health
2. **Leverage `/compact`** when contexts become unwieldy
3. **Set up custom commands** for repetitive project tasks
4. **Use `/permissions`** to maintain security boundaries
5. **Check `/cost`** periodically to monitor usage
6. **Configure `/vim`** if you prefer modal editing
7. **Use `/review`** before committing code changes

This comprehensive command system enables Claude Code to handle everything from simple queries to complex deployment workflows while maintaining strict security controls and enabling extensive customization for team-specific needs.
