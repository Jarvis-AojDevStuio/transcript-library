# Claude Code Git Worktrees Documentation

This document provides comprehensive information about using Git worktrees with Claude Code, based on the official Anthropic documentation.

## Overview

Git worktrees allow you to have multiple working directories for the same Git repository, enabling parallel development on different branches. This is particularly useful when working with Claude Code, as it allows you to run multiple Claude Code instances simultaneously in complete isolation.

## Key Benefits

- **Complete Code Isolation**: Each worktree provides a separate working directory with its own file state
- **Parallel Development**: Work on different features or bug fixes simultaneously
- **Shared Git History**: All worktrees share the same `.git` directory and commit history
- **Independent Sessions**: Run multiple Claude Code instances without interference

## Creating Git Worktrees

### Create a New Worktree with a New Branch

```bash
# Create a new worktree with a new branch
git worktree add ../project-feature-a -b feature-a
```

### Create a Worktree with an Existing Branch

```bash
# Or create a worktree with an existing branch
git worktree add ../project-bugfix bugfix-123
```

## Running Claude Code in Worktrees

### Navigate to Your Worktree

```bash
# Navigate to your worktree
cd ../project-feature-a

# Run Claude Code in this isolated environment
claude
```

### Running Multiple Sessions

```bash
# Terminal 1: Feature development
cd ../project-feature-a
claude

# Terminal 2: Bug fixing
cd ../project-bugfix
claude
```

## Managing Worktrees

### List All Worktrees

```bash
# List all worktrees
git worktree list
```

### Remove a Worktree

```bash
# Remove an existing worktree
git worktree remove ../project-feature-a
```

## Git Operations with Claude Code

Claude Code integrates seamlessly with Git operations. You can perform various Git tasks conversationally:

### Query Git Status

```bash
> what files have I changed?
```

### Commit Changes

```bash
> commit my changes with a descriptive message
```

### Branch Management

```bash
> create a new branch called feature/quickstart
```

### View Commit History

```bash
> show me the last 5 commits
```

### Resolve Conflicts

```bash
> help me resolve merge conflicts
```

## Common Development Workflows

### Bash Tool Examples

```bash
# Run tests and generate coverage report
pytest && coverage report

# Install dependencies and build
npm install && npm run build

# Git workflow commands
git status && git add . && git commit -m "message"
```

## Best Practices

1. **Isolated Development**: Use separate worktrees for different features to avoid conflicts
2. **Descriptive Names**: Use meaningful directory names that reflect the work being done
3. **Regular Cleanup**: Remove worktrees when features are complete to maintain organization
4. **Consistent Structure**: Keep worktrees in a consistent directory structure for easy navigation

## Project Setup

### Quick Start

```bash
# Navigate to your project
cd your-project-directory

# Generate project guide
/init

# Create worktrees directory structure
mkdir -p ../worktrees

# Create feature worktree
git worktree add ../worktrees/feature-auth -b feature/authentication

# Navigate and start Claude Code
cd ../worktrees/feature-auth
claude
```

## Essential Commands

### Claude Code CLI Commands

```bash
# Start interactive mode
claude

# Run one-time task
claude "task"

# Query mode
claude -p "query"

# Continue previous session
claude -c

# Resume from conversation picker
claude -r

# Quick commit
claude commit

# Clear conversation
/clear

# Get help
/help

# Exit
exit
```

## Advanced Usage

### Custom Commands

Create project-specific commands for common workflows:

```bash
# Create commands directory
mkdir -p .claude/commands

# Create custom command
echo "Review this code for security vulnerabilities, focusing on:" > .claude/commands/security-review.md

# Use the command
> /project:security-review
```

### Output Formats

Control Claude's output format for integration with other tools:

```bash
# Plain text output
claude -p 'analyze this code' --output-format text

# JSON output for programmatic use
claude -p 'analyze this code' --output-format json

# Streaming JSON for real-time processing
claude -p 'analyze this code' --output-format stream-json
```

## Integration with CI/CD

### GitHub Actions

Claude Code can be integrated into GitHub Actions workflows for automated code review and assistance:

```yaml
name: Claude PR Action
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  claude-pr:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - uses: ./.github/actions/claude-pr-action
        with:
          trigger_phrase: "@claude"
          timeout_minutes: "60"
```

## Troubleshooting

### Common Issues

1. **Permission Denied**: Ensure you have write permissions to the target directory
2. **Branch Conflicts**: Check if the branch already exists or has uncommitted changes
3. **Path Issues**: Use absolute paths or ensure you're in the correct directory

### Diagnostic Commands

```bash
# Check worktree status
git worktree list

# Verify Git repository state
git status

# Check branch information
git branch -v
```

## Related Resources

- [Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Git Worktree Documentation](https://git-scm.com/docs/git-worktree)
- [Claude Code GitHub Actions](https://docs.anthropic.com/en/docs/claude-code/github-actions)

---

_This documentation is based on the official Anthropic Claude Code documentation and provides practical guidance for using Git worktrees effectively with Claude Code._
