---
title: "Desktop Commander MCP - Single-Command Installation Analysis"
description: "Analysis of wonderwhy-er's DesktopCommanderMCP implementation and their successful single-command installation pattern for MCP servers."
category: "Research"
subcategory: "MCP Servers"
product_line: "Desktop Commander"
audience: "Developers"
status: "Active"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - desktop-commander
  - mcp-installation
  - installation-analysis
  - developer-experience
  - automation
---

# Desktop Commander MCP - Single-Command Installation Analysis

Analysis of wonderwhy-er's DesktopCommanderMCP implementation and their successful single-command installation pattern.

## Repository Found: ✅

**Repository**: https://github.com/wonderwhy-er/DesktopCommanderMCP  
**Package**: `@wonderwhy-er/desktop-commander`  
**Stars**: 4k+ stars, 445 forks  
**Status**: Very successful MCP server with excellent installation UX

## Their Single-Command Installation Approach

### 1. Multiple Installation Methods

**Option A: One-line bash script (macOS)**

```bash
curl -fsSL https://raw.githubusercontent.com/wonderwhy-er/DesktopCommanderMCP/refs/heads/main/install.sh | bash
```

**Option B: NPX setup**

```bash
npx @wonderwhy-er/desktop-commander@latest setup
```

**Option C: Traditional install + setup**

```bash
npm install -g @wonderwhy-er/desktop-commander
setup  # Uses the bin command
```

### 2. Installation Script Architecture

**install.sh breakdown:**

```bash
#!/bin/bash
set -e

# 1. Node.js version validation (requires 18+)
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | cut -d 'v' -f 2)
    NODE_MAJOR_VERSION=$(echo "$NODE_VERSION" | cut -d '.' -f 1)

    if [ "$NODE_MAJOR_VERSION" -lt 18 ]; then
        print_error "Detected Node.js v$NODE_VERSION, but v18+ is required. Please upgrade Node.js."
        exit 1
    fi
else
    # 2. Automatic Node.js installation for macOS
    echo "Node.js not found. Installing Node.js v22.14.0..."
    mkdir -p /tmp/nodejs-install
    curl -fsSL -o /tmp/nodejs-install/node-v22.14.0.pkg https://nodejs.org/dist/v22.14.0/node-v22.14.0.pkg
    sudo installer -pkg /tmp/nodejs-install/node-v22.14.0.pkg -target /
fi

# 3. Run the NPX setup command
echo "Running setup command..."
if npx @wonderwhy-er/desktop-commander@latest setup; then
    print_success "Setup completed successfully!"
else
    print_error "Setup failed. Check the console output above for more information."
    exit 1
fi
```

### 3. Package.json Structure

**Key elements from their package.json:**

```json
{
  "name": "@wonderwhy-er/desktop-commander",
  "version": "0.2.7",
  "bin": {
    "desktop-commander": "dist/index.js",
    "setup": "dist/setup-claude-server.js"  // ← Key insight!
  },
  "scripts": {
    "setup": "npm install && npm run build && node setup-claude-server.js",
    "setup:debug": "npm install && npm run build && node setup-claude-server.js --debug"
  }
}
```

**Key Insight**: They have TWO bin entries:

1. `desktop-commander` - The actual MCP server
2. `setup` - The configuration utility

### 4. Configuration Management

The `setup-claude-server.js` script handles:

- Cross-platform Claude Desktop config file detection
- Safe JSON manipulation and merging
- Configuration validation
- Error handling and user feedback
- Debug mode support

## Success Factors Analysis

### 1. Multiple Entry Points

- **Bash script**: One-liner for power users
- **NPX**: No global installation needed
- **Global install**: Traditional approach for developers

### 2. Dependency Management

- Automatic Node.js installation on macOS
- Version validation (Node.js 18+ required)
- Clear error messages with resolution steps

### 3. User Experience

- Progress indicators with emojis (✅ ❌)
- Clear error messages
- Automatic cleanup on failure
- Debug mode for troubleshooting

### 4. Cross-Platform Support

The setup script detects different OS configurations for Claude Desktop config files.

### 5. Zero-Configuration Philosophy

The setup process:

1. Installs the package globally
2. Automatically detects Claude Desktop config location
3. Safely merges MCP server configuration
4. Provides success confirmation

## Implementation Pattern for Your MCPs

### Recommended Structure

```
your-mcp-project/
├── src/
│   ├── index.ts              # Main MCP server
│   └── setup-claude.ts       # Setup utility
├── scripts/
│   └── install.sh            # Bash installation script
├── package.json              # With dual bin entries
└── README.md                 # Clear installation instructions
```

### Package.json Template

```json
{
  "name": "@your-org/your-mcp-server",
  "version": "1.0.0",
  "description": "Your MCP server description",
  "bin": {
    "your-mcp-server": "dist/index.js",
    "setup": "dist/setup-claude.js"
  },
  "scripts": {
    "setup": "npm install && npm run build && node setup-claude.js",
    "build": "tsc && shx chmod +x dist/*.js",
    "prepare": "npm run build"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Installation Options Template

**1. One-line install (create install.sh):**

```bash
curl -fsSL https://your-domain.com/install.sh | bash
```

**2. NPX setup:**

```bash
npx @your-org/your-mcp-server@latest setup
```

**3. Traditional:**

```bash
npm install -g @your-org/your-mcp-server
setup
```

## Key Takeaways

### What Makes Desktop Commander Successful

1. **Multiple installation paths** - Users can choose their preferred method
2. **Automatic dependency management** - Handles Node.js installation automatically
3. **Safe configuration management** - Doesn't break existing Claude configs
4. **Clear feedback** - Users know exactly what's happening
5. **Cross-platform support** - Works on macOS, Linux, Windows
6. **Zero-configuration** - Just run and it works

### Implementation Priorities

1. **Create dual bin entries** - Main server + setup utility
2. **Build setup-claude utility** - Safe JSON config manipulation
3. **Add Node.js version validation** - Prevent runtime issues
4. **Create bash install script** - One-liner installation option
5. **Comprehensive error handling** - Clear error messages and recovery steps
6. **Cross-platform config detection** - Handle different OS paths

### Why Their Approach Works

- **Reduces friction**: From complex manual JSON editing to single command
- **Handles edge cases**: Node.js missing, invalid JSON, file permissions
- **Provides multiple options**: Different installation preferences
- **Professional UX**: Clear feedback, progress indicators, error handling
- **Maintainable**: NPX ensures users get latest version automatically

This analysis shows that wonderwhy-er's success comes from treating installation as a **first-class user experience problem** rather than an afterthought, and providing multiple pathways while maintaining zero-configuration simplicity.
