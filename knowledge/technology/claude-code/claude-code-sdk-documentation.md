---
url: https://docs.anthropic.com/en/docs/claude-code/sdk
scraped_date: 2025-08-22T16:01:15-05:00
domain: docs.anthropic.com
title: Claude Code SDK Documentation
source: Official Anthropic Documentation
---

# Claude Code SDK Documentation

The Claude Code SDK provides all the building blocks you need to build production-ready agents with optimized Claude integration, rich tool ecosystem, advanced permissions, and production essentials like built-in error handling, session management, and monitoring.

## Why use the Claude Code SDK?

- **Optimized Claude integration**: Automatic prompt caching and performance optimizations
- **Rich tool ecosystem**: File operations, code execution, web search, and MCP extensibility
- **Advanced permissions**: Fine-grained control over agent capabilities
- **Production essentials**: Built-in error handling, session management, and monitoring

## What can you build with the SDK?

**Coding agents:**

- SRE agents that diagnose and fix production issues
- Security review bots that audit code for vulnerabilities
- Oncall engineering assistants that triage incidents
- Code review agents that enforce style and best practices

**Business agents:**

- Legal assistants that review contracts and compliance
- Finance advisors that analyze reports and forecasts
- Customer support agents that resolve technical issues
- Content creation assistants for marketing teams

The SDK is available in TypeScript and Python, with a command line interface (CLI) for quick prototyping.

## Quick Start

### 1. Install the SDK

**Command line:**

```bash
npm install -g @anthropic-ai/claude-code
```

**TypeScript:**

```bash
npm install -g @anthropic-ai/claude-code
```

**Python:**

```bash
pip install claude-code-sdk
npm install -g @anthropic-ai/claude-code  # Required dependency
```

### 2. Set your API key

Get your API key from the [Anthropic Console](https://console.anthropic.com/) and set the `ANTHROPIC_API_KEY` environment variable:

```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

### 3. Create your first agent

**Command line:**

```bash
# Create a simple legal assistant
claude -p "Review this contract clause for potential issues: 'The party agrees to unlimited liability...'" \
  --append-system-prompt "You are a legal assistant. Identify risks and suggest improvements."
```

**TypeScript:**

```ts
// legal-agent.ts
import { query } from "@anthropic-ai/claude-code";

// Create a simple legal assistant
for await (const message of query({
  prompt: "Review this contract clause for potential issues: 'The party agrees to unlimited liability...'",
  options: {
    systemPrompt: "You are a legal assistant. Identify risks and suggest improvements.",
    maxTurns: 2
  }
})) {
  if (message.type === "result") {
    console.log(message.result);
  }
}
```

**Python:**

```python
# legal-agent.py
import asyncio
from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

async def main():
    async with ClaudeSDKClient(
        options=ClaudeCodeOptions(
            system_prompt="You are a legal assistant. Identify risks and suggest improvements.",
            max_turns=2
        )
    ) as client:
        # Send the query
        await client.query(
            "Review this contract clause for potential issues: 'The party agrees to unlimited liability...'"
        )

        # Stream the response
        async for message in client.receive_response():
            if hasattr(message, 'content'):
                # Print streaming content as it arrives
                for block in message.content:
                    if hasattr(block, 'text'):
                        print(block.text, end='', flush=True)

if __name__ == "__main__":
    asyncio.run(main())
```

## Core Usage

### Authentication

#### Anthropic API key

For basic authentication, retrieve an Anthropic API key from the [Anthropic Console](https://console.anthropic.com/) and set the `ANTHROPIC_API_KEY` environment variable.

#### Third-party API credentials

The SDK also supports authentication via third-party API providers:

- **Amazon Bedrock**: Set `CLAUDE_CODE_USE_BEDROCK=1` environment variable and configure AWS credentials
- **Google Vertex AI**: Set `CLAUDE_CODE_USE_VERTEX=1` environment variable and configure Google Cloud credentials

### Multi-turn conversations

**Command line:**

```bash
# Continue the most recent conversation
claude --continue "Now refactor this for better performance"

# Resume a specific conversation by session ID
claude --resume 550e8400-e29b-41d4-a716-446655440000 "Update the tests"
```

**TypeScript:**

```ts
import { query } from "@anthropic-ai/claude-code";

// Continue most recent conversation
for await (const message of query({
  prompt: "Now refactor this for better performance",
  options: { continueSession: true }
})) {
  if (message.type === "result") console.log(message.result);
}

// Resume specific session
for await (const message of query({
  prompt: "Update the tests",
  options: {
    resumeSessionId: "550e8400-e29b-41d4-a716-446655440000",
    maxTurns: 3
  }
})) {
  if (message.type === "result") console.log(message.result);
}
```

**Python:**

```python
import asyncio
from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions, query

# Method 1: Using ClaudeSDKClient for persistent conversations
async def multi_turn_conversation():
    async with ClaudeSDKClient() as client:
        # First query
        await client.query("Let's refactor the payment module")
        async for msg in client.receive_response():
            # Process first response
            pass

        # Continue in same session
        await client.query("Now add comprehensive error handling")
        async for msg in client.receive_response():
            # Process continuation
            pass
```

### Using Plan Mode

Plan Mode allows Claude to analyze code without making modifications, useful for code reviews and planning changes.

**Command line:**

```bash
claude -p "Review this code" --permission-mode plan
```

**TypeScript:**

```ts
import { query } from "@anthropic-ai/claude-code";

for await (const message of query({
  prompt: "Your prompt here",
  options: {
    permissionMode: 'plan'
  }
})) {
  if (message.type === "result") {
    console.log(message.result);
  }
}
```

**Python:**

```python
from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

async with ClaudeSDKClient(
    options=ClaudeCodeOptions(permission_mode='plan')
) as client:
    await client.query("Your prompt here")
```

### Custom system prompts

System prompts define your agent's role, expertise, and behavior:

**Command line:**

```bash
# SRE incident response agent
claude -p "API is down, investigate" \
  --append-system-prompt "You are an SRE expert. Diagnose issues systematically and provide actionable solutions."

# Legal document review agent
claude -p "Review this contract" \
  --append-system-prompt "You are a corporate lawyer. Identify risks, suggest improvements, and ensure compliance."
```

**TypeScript:**

```ts
import { query } from "@anthropic-ai/claude-code";

// SRE incident response agent
for await (const message of query({
  prompt: "API is down, investigate",
  options: {
    systemPrompt: "You are an SRE expert. Diagnose issues systematically and provide actionable solutions.",
    maxTurns: 3
  }
})) {
  if (message.type === "result") console.log(message.result);
}
```

**Python:**

```python
import asyncio
from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

async def specialized_agents():
    # SRE incident response agent with streaming
    async with ClaudeSDKClient(
        options=ClaudeCodeOptions(
            system_prompt="You are an SRE expert. Diagnose issues systematically and provide actionable solutions.",
            max_turns=3
        )
    ) as sre_agent:
        await sre_agent.query("API is down, investigate")

        # Stream the diagnostic process
        async for message in sre_agent.receive_response():
            if hasattr(message, 'content'):
                for block in message.content:
                    if hasattr(block, 'text'):
                        print(block.text, end='', flush=True)
```

## Advanced Usage

### Custom tools via MCP

The Model Context Protocol (MCP) lets you give your agents custom tools and capabilities. Example MCP server configuration:

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {"SLACK_TOKEN": "your-slack-token"}
    },
    "jira": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-jira"],
      "env": {"JIRA_TOKEN": "your-jira-token"}
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {"DB_CONNECTION_STRING": "your-db-url"}
    }
  }
}
```

**Usage with MCP tools:**

```bash
# SRE agent with monitoring tools
claude -p "Investigate the payment service outage" \
  --mcp-config sre-tools.json \
  --allowedTools "mcp__datadog,mcp__pagerduty,mcp__kubernetes" \
  --append-system-prompt "You are an SRE. Use monitoring data to diagnose issues."
```

### Custom permission prompt tool

Use `--permission-prompt-tool` to pass in an MCP tool for permission checking. The tool must return a JSON-stringified payload:

```ts
// tool call is allowed
{
  "behavior": "allow",
  "updatedInput": {...}, // updated input, or just return back the original input
}

// tool call is denied
{
  "behavior": "deny",
  "message": "..." // human-readable string explaining why the permission was denied
}
```

## Output Formats

### Text output (default)

```bash
claude -p "Explain file src/components/Header.tsx"
# Output: This is a React component showing...
```

### JSON output

Returns structured data including metadata:

```bash
claude -p "How does the data layer work?" --output-format json
```

Response format:

```json
{
  "type": "result",
  "subtype": "success",
  "total_cost_usd": 0.003,
  "is_error": false,
  "duration_ms": 1234,
  "duration_api_ms": 800,
  "num_turns": 6,
  "result": "The response text here...",
  "session_id": "abc123"
}
```

### Streaming JSON output

Streams each message as it is received:

```bash
claude -p "Build an application" --output-format stream-json
```

## Input Formats

### Text input (default)

```bash
# Direct argument
claude -p "Explain this code"

# From stdin
echo "Explain this code" | claude -p
```

### Streaming JSON input

A stream of messages provided via stdin where each message represents a user turn:

```bash
echo '{"type":"user","message":{"role":"user","content":[{"type":"text","text":"Explain this code"}]}}' | claude -p --output-format=stream-json --input-format=stream-json --verbose
```

## Agent Integration Examples

### SRE incident response bot

**Command line:**

```bash
#!/bin/bash

# Automated incident response agent
investigate_incident() {
    local incident_description="$1"
    local severity="${2:-medium}"

    claude -p "Incident: $incident_description (Severity: $severity)" \
      --append-system-prompt "You are an SRE expert. Diagnose the issue, assess impact, and provide immediate action items." \
      --output-format json \
      --allowedTools "Bash,Read,WebSearch,mcp__datadog" \
      --mcp-config monitoring-tools.json
}

# Usage
investigate_incident "Payment API returning 500 errors" "high"
```

**TypeScript:**

```ts
import { query } from "@anthropic-ai/claude-code";

// Automated incident response agent
async function investigateIncident(
  incidentDescription: string,
  severity = "medium"
) {
  const messages = [];

  for await (const message of query({
    prompt: `Incident: ${incidentDescription} (Severity: ${severity})`,
    options: {
      systemPrompt: "You are an SRE expert. Diagnose the issue, assess impact, and provide immediate action items.",
      maxTurns: 6,
      allowedTools: ["Bash", "Read", "WebSearch", "mcp__datadog"],
      mcpConfig: "monitoring-tools.json"
    }
  })) {
    messages.push(message);
  }

  return messages.find(m => m.type === "result");
}

// Usage
const result = await investigateIncident("Payment API returning 500 errors", "high");
console.log(result.result);
```

**Python:**

```python
import asyncio
from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

async def investigate_incident(incident_description: str, severity: str = "medium"):
    """Automated incident response agent with real-time streaming"""

    # MCP server configuration for monitoring tools
    mcp_servers = {
        # Example configuration - uncomment and configure as needed:
        # "datadog": {
        #     "command": "npx",
        #     "args": ["-y", "@modelcontextprotocol/server-datadog"],
        #     "env": {"API_KEY": "your-datadog-key", "APP_KEY": "your-app-key"}
        # }
    }

    async with ClaudeSDKClient(
        options=ClaudeCodeOptions(
            system_prompt="You are an SRE expert. Diagnose the issue, assess impact, and provide immediate action items.",
            max_turns=6,
            allowed_tools=["Bash", "Read", "WebSearch", "mcp__datadog"],
            mcp_servers=mcp_servers
        )
    ) as client:
        # Send the incident details
        prompt = f"Incident: {incident_description} (Severity: {severity})"
        print(f"🚨 Investigating: {prompt}\n")
        await client.query(prompt)

        # Stream the investigation process
        investigation_log = []
        async for message in client.receive_response():
            if hasattr(message, 'content'):
                for block in message.content:
                    if hasattr(block, 'type'):
                        if block.type == 'tool_use':
                            print(f"[{block.name}] ", end='')
                    if hasattr(block, 'text'):
                        text = block.text
                        print(text, end='', flush=True)
                        investigation_log.append(text)

            # Capture final result
            if type(message).__name__ == "ResultMessage":
                return {
                    'analysis': ''.join(investigation_log),
                    'cost': message.total_cost_usd,
                    'duration_ms': message.duration_ms
                }

# Usage
result = await investigate_incident("Payment API returning 500 errors", "high")
print(f"\n\nInvestigation complete. Cost: ${result['cost']:.4f}")
```

### Automated security review

**Command line:**

```bash
# Security audit agent for pull requests
audit_pr() {
    local pr_number="$1"

    gh pr diff "$pr_number" | claude -p \
      --append-system-prompt "You are a security engineer. Review this PR for vulnerabilities, insecure patterns, and compliance issues." \
      --output-format json \
      --allowedTools "Read,Grep,WebSearch"
}

# Usage and save to file
audit_pr 123 > security-report.json
```

### Multi-turn legal assistant

**Command line:**

```bash
# Legal document review with session persistence
session_id=$(claude -p "Start legal review session" --output-format json | jq -r '.session_id')

# Review contract in multiple steps
claude -p --resume "$session_id" "Review contract.pdf for liability clauses"
claude -p --resume "$session_id" "Check compliance with GDPR requirements"
claude -p --resume "$session_id" "Generate executive summary of risks"
```

## Python-Specific Best Practices

### Key Patterns

```python
import asyncio
from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

# Always use context managers
async with ClaudeSDKClient() as client:
    await client.query("Analyze this code")
    async for msg in client.receive_response():
        # Process streaming messages
        pass

# Run multiple agents concurrently
async with ClaudeSDKClient() as reviewer, ClaudeSDKClient() as tester:
    await asyncio.gather(
        reviewer.query("Review main.py"),
        tester.query("Write tests for main.py")
    )

# Error handling
from claude_code_sdk import CLINotFoundError, ProcessError

try:
    async with ClaudeSDKClient() as client:
        # Your code here
        pass
except CLINotFoundError:
    print("Install CLI: npm install -g @anthropic-ai/claude-code")
except ProcessError as e:
    print(f"Process error: {e}")
```

### IPython/Jupyter Tips

```python
# In Jupyter, use await directly in cells
client = ClaudeSDKClient()
await client.connect()
await client.query("Analyze data.csv")
async for msg in client.receive_response():
    print(msg)
await client.disconnect()

# Create reusable helper functions
async def stream_print(client, prompt):
    await client.query(prompt)
    async for msg in client.receive_response():
        if hasattr(msg, 'content'):
            for block in msg.content:
                if hasattr(block, 'text'):
                    print(block.text, end='', flush=True)
```

## Best Practices

- **Use JSON output format** for programmatic parsing of responses
- **Handle errors gracefully** - check exit codes and stderr
- **Use session management** for maintaining context in multi-turn conversations
- **Consider timeouts** for long-running operations
- **Respect rate limits** when making multiple requests by adding delays between calls

## Message Schema

Messages returned from the JSON API are strictly typed according to the following schema:

```ts
type SDKMessage =
  // An assistant message
  | {
      type: "assistant";
      message: Message; // from Anthropic SDK
      session_id: string;
    }

  // A user message
  | {
      type: "user";
      message: MessageParam; // from Anthropic SDK
      session_id: string;
    }

  // Emitted as the last message
  | {
      type: "result";
      subtype: "success";
      duration_ms: float;
      duration_api_ms: float;
      is_error: boolean;
      num_turns: int;
      result: string;
      session_id: string;
      total_cost_usd: float;
    }

  // Emitted as the last message, when we've reached the maximum number of turns
  | {
      type: "result";
      subtype: "error_max_turns" | "error_during_execution";
      duration_ms: float;
      duration_api_ms: float;
      is_error: boolean;
      num_turns: int;
      session_id: string;
      total_cost_usd: float;
    }

  // Emitted as the first message at the start of a conversation
  | {
      type: "system";
      subtype: "init";
      apiKeySource: string;
      cwd: string;
      session_id: string;
      tools: string[];
      mcp_servers: {
        name: string;
        status: string;
      }[];
      model: string;
      permissionMode: "default" | "acceptEdits" | "bypassPermissions" | "plan";
    };
```

## Command Line Configuration

Key CLI flags for SDK usage:

| Flag                       | Description                                           | Example                                              |
| -------------------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| `--print`, `-p`            | Run in non-interactive mode                           | `claude -p "query"`                                  |
| `--output-format`          | Specify output format (`text`, `json`, `stream-json`) | `claude -p --output-format json`                     |
| `--resume`, `-r`           | Resume a conversation by session ID                   | `claude --resume abc123`                             |
| `--continue`, `-c`         | Continue the most recent conversation                 | `claude --continue`                                  |
| `--verbose`                | Enable verbose logging                                | `claude --verbose`                                   |
| `--append-system-prompt`   | Append to system prompt (only with `--print`)         | `claude --append-system-prompt "Custom instruction"` |
| `--allowedTools`           | Space-separated list of allowed tools                 | `claude --allowedTools mcp__slack mcp__filesystem`   |
| `--disallowedTools`        | Space-separated list of denied tools                  | `claude --disallowedTools mcp__splunk mcp__github`   |
| `--mcp-config`             | Load MCP servers from a JSON file                     | `claude --mcp-config servers.json`                   |
| `--permission-prompt-tool` | MCP tool for handling permission prompts              | `claude --permission-prompt-tool mcp__auth__prompt`  |

## Related Resources

- [CLI usage and controls](https://docs.anthropic.com/en/docs/claude-code/cli-reference) - Complete CLI documentation
- [GitHub Actions integration](https://docs.anthropic.com/en/docs/claude-code/github-actions) - Automate your GitHub workflow with Claude
- [Common workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows) - Step-by-step guides for common use cases
