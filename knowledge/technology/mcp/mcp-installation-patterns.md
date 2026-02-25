---
title: "MCP Installation Patterns & Single-Command Setup Guide"
description: "Research findings on MCP installation patterns and recommendations for creating streamlined single-command installation experiences."
category: "Research"
subcategory: "MCP Servers"
product_line: "Desktop Commander"
audience: "Developers"
status: "Active"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - mcp-installation
  - setup-patterns
  - automation
  - configuration
  - developer-experience
---

# MCP Installation Patterns & Single-Command Setup Guide

Research findings on MCP (Model Context Protocol) installation patterns and recommendations for creating single-command installation experiences.

## Research Summary

**Repository Search Results**: The specific "desktop-commander" repo by wonderwhy-er couldn't be located, but analysis of official MCP repositories reveals standard installation patterns used by the community.

**Key Finding**: Most MCP servers follow npm package distribution with Claude Desktop config integration.

## Standard MCP Installation Pattern

### 1. Package Structure

Based on analysis of `@modelcontextprotocol/server-everything`:

```json
{
  "name": "@your-org/mcp-server-name",
  "bin": {
    "mcp-server-name": "dist/index.js"
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsc && shx cp instructions.md dist/ && shx chmod +x dist/*.js",
    "prepare": "npm run build"
  }
}
```

### 2. Current Installation Process

Users typically need to:

1. Install the package: `npm install -g @your-org/mcp-server-name`
2. Manually edit `claude_desktop_config.json`
3. Add server configuration
4. Restart Claude Desktop

### 3. Pain Points Identified

- Manual JSON editing prone to syntax errors
- Path resolution issues
- Config file location varies by OS
- No validation of configuration

## Recommended Single-Command Installation

### Option 1: Install Script with Config Auto-Detection

Create an installation script that:

```bash
#!/bin/bash
# install-mcp-server.sh

set -e

echo "🚀 Installing MCP Server..."

# Install the package
npm install -g @your-org/mcp-server-name

# Detect Claude Desktop config location
if [[ "$OSTYPE" == "darwin"* ]]; then
    CONFIG_DIR="$HOME/Library/Application Support/Claude"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    CONFIG_DIR="$HOME/.config/claude"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    CONFIG_DIR="$APPDATA/Claude"
else
    echo "❌ Unsupported OS: $OSTYPE"
    exit 1
fi

CONFIG_FILE="$CONFIG_DIR/claude_desktop_config.json"

# Create config directory if it doesn't exist
mkdir -p "$CONFIG_DIR"

# Create or update config file
if [ ! -f "$CONFIG_FILE" ]; then
    echo "📝 Creating new Claude Desktop config..."
    cat > "$CONFIG_FILE" << 'EOF'
{
  "mcpServers": {
    "your-mcp-server": {
      "command": "mcp-server-name",
      "args": []
    }
  }
}
EOF
else
    echo "📝 Updating existing Claude Desktop config..."
    # Use Node.js to safely merge JSON
    node -e "
    const fs = require('fs');
    const configPath = '$CONFIG_FILE';
    let config = {};

    try {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
        console.log('⚠️  Invalid JSON, creating new config');
        config = {};
    }

    if (!config.mcpServers) config.mcpServers = {};

    config.mcpServers['your-mcp-server'] = {
        command: 'mcp-server-name',
        args: []
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('✅ Configuration updated successfully');
    "
fi

echo "✅ Installation complete!"
echo "📋 Please restart Claude Desktop to use the new MCP server"
echo "🔧 Config file: $CONFIG_FILE"
```

### Option 2: NPX-Based Installation

Create a setup package that users can run with npx:

```bash
npx @your-org/setup-mcp-server-name
```

Package structure:

```json
{
  "name": "@your-org/setup-mcp-server-name",
  "bin": {
    "setup-mcp-server-name": "dist/install.js"
  },
  "dependencies": {
    "@your-org/mcp-server-name": "latest"
  }
}
```

### Option 3: One-Line curl Installation

Host installation script and allow:

```bash
curl -fsSL https://your-domain.com/install-mcp-server.sh | bash
```

## Implementation Recommendations

### 1. Create Installation Package Structure

```
your-mcp-project/
├── packages/
│   ├── server/                 # Main MCP server
│   │   ├── package.json
│   │   ├── src/
│   │   └── dist/
│   └── installer/              # Installation utility
│       ├── package.json
│       ├── src/
│       │   └── install.ts
│       └── templates/
│           └── config-template.json
├── scripts/
│   └── install.sh              # Bash installation script
└── docs/
    └── installation.md
```

### 2. Cross-Platform Config Management

Create a Node.js utility for config management:

```typescript
import fs from 'fs';
import path from 'path';
import os from 'os';

export class ClaudeConfigManager {
  private getConfigPath(): string {
    const platform = os.platform();
    switch (platform) {
      case 'darwin':
        return path.join(os.homedir(), 'Library/Application Support/Claude');
      case 'linux':
        return path.join(os.homedir(), '.config/claude');
      case 'win32':
        return path.join(os.homedir(), 'AppData/Roaming/Claude');
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  async addMcpServer(name: string, config: any): Promise<void> {
    const configDir = this.getConfigPath();
    const configFile = path.join(configDir, 'claude_desktop_config.json');

    // Ensure directory exists
    await fs.promises.mkdir(configDir, { recursive: true });

    let claudeConfig: any = { mcpServers: {} };

    try {
      const existing = await fs.promises.readFile(configFile, 'utf8');
      claudeConfig = JSON.parse(existing);
    } catch (error) {
      // File doesn't exist or invalid JSON, use default
    }

    if (!claudeConfig.mcpServers) claudeConfig.mcpServers = {};
    claudeConfig.mcpServers[name] = config;

    await fs.promises.writeFile(
      configFile,
      JSON.stringify(claudeConfig, null, 2)
    );
  }
}
```

### 3. Package.json Scripts Integration

Add convenience scripts to your main package:

```json
{
  "scripts": {
    "install:global": "npm install -g && npm run configure",
    "configure": "node scripts/configure-claude.js",
    "postinstall": "node scripts/post-install-message.js"
  }
}
```

### 4. Validation & Error Handling

Include configuration validation:

```typescript
export function validateClaudeConfig(config: any): string[] {
  const errors: string[] = [];

  if (!config.mcpServers) {
    errors.push('Missing mcpServers section');
  }

  for (const [name, serverConfig] of Object.entries(config.mcpServers)) {
    if (!serverConfig.command) {
      errors.push(`Server '${name}' missing command`);
    }
  }

  return errors;
}
```

## Best Practices

### 1. User Experience

- ✅ Single command installation
- ✅ Clear progress indicators
- ✅ Automatic config backup
- ✅ Validation with helpful error messages
- ✅ Cross-platform compatibility

### 2. Error Recovery

- Backup existing configs before modification
- Provide rollback capability
- Clear error messages with resolution steps
- Test mode for dry-run installations

### 3. Documentation

- Provide both automated and manual installation methods
- Include troubleshooting guide
- Document config file locations for each OS
- Example configurations

## Example Implementation

For immediate implementation, you could create:

1. **install.sh** - Bash script for Unix-like systems
2. **install.ps1** - PowerShell script for Windows
3. **@your-org/install-mcp-name** - NPX package for cross-platform
4. **Makefile** - Simple `make install` command

## Key Takeaways

1. **JSON Manipulation**: Safe JSON editing is crucial - use proper parsers
2. **Cross-Platform**: Handle different OS config locations
3. **Validation**: Validate both installation and configuration
4. **User Feedback**: Provide clear progress and error messages
5. **Recovery**: Always provide backup/rollback options

The pattern that seems most successful is the NPX approach combined with a fallback bash script, as it provides both convenience and reliability across different environments.
