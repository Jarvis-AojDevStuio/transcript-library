---
title: "LangChain Agents Tutorial"
description: "Comprehensive tutorial on building AI agents with LangChain, covering tool creation, LLM integration, memory management, and streaming capabilities."
category: "Research"
subcategory: "AI Development"
product_line: "Development Tools"
audience: "Software Engineers"
status: "Active"
author: "AOJDevStudio"
created_date: "2025-09-06"
last_updated: "2025-09-06"
tags:
  - langchain
  - ai-agents
  - langgraph
  - tool-calling
  - llm-development
url: "https://python.langchain.com/docs/tutorials/agents/"
scraped_date: "2025-09-06"
domain: "python.langchain.com"
---

# LangChain Agents Tutorial

## Overview

LangChain supports the creation of agents - systems that use LLMs as reasoning engines to determine which actions to take and the inputs necessary to perform those actions. After executing actions, results can be fed back into the LLM to determine whether more actions are needed or if the task is complete. This is often achieved via tool-calling.

## Quick Start: End-to-End Agent

Complete functional agent with search capabilities and conversational memory:

```python
# Import relevant functionality
from langchain.chat_models import init_chat_model
from langchain_tavily import TavilySearch
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent

# Create the agent
memory = MemorySaver()
model = init_chat_model("anthropic:claude-3-5-sonnet-latest")
search = TavilySearch(max_results=2)
tools = [search]
agent_executor = create_react_agent(model, tools, checkpointer=memory)

# Use the agent
config = {"configurable": {"thread_id": "abc123"}}
input_message = {"role": "user", "content": "Hi, I'm Bob and I live in SF."}
for step in agent_executor.stream(
    {"messages": [input_message]}, config, stream_mode="values"
):
    step["messages"][-1].pretty_print()
```

## Setup Requirements

### Installation

```bash
%pip install -U langgraph langchain-tavily langgraph-checkpoint-sqlite
```

### Environment Variables

#### LangSmith (for tracing)

```bash
export LANGSMITH_TRACING="true"
export LANGSMITH_API_KEY="..."
```

#### Tavily Search API

```bash
export TAVILY_API_KEY="..."
```

#### Language Model API Keys

Configure based on your chosen provider (OpenAI, Anthropic, Google, etc.)

## Core Components

### 1. Define Tools

Tools are the actions an agent can take. Example using Tavily search:

```python
from langchain_tavily import TavilySearch

search = TavilySearch(max_results=2)
search_results = search.invoke("What is the weather in SF")
tools = [search]
```

**Note**: LangChain supports custom tool creation via Python functions. See [How to create tools](https://python.langchain.com/docs/how_to/custom_tools/) guide.

### 2. Language Model Configuration

LangChain supports multiple language models interchangeably:

#### Supported Providers

- OpenAI
- Anthropic
- Azure
- Google Gemini
- Google Vertex
- AWS Bedrock
- Groq
- Cohere
- NVIDIA
- Fireworks AI
- Mistral AI
- Together AI
- IBM watsonx
- Databricks
- xAI
- Perplexity
- DeepSeek

Example with Google Gemini:

```python
from langchain.chat_models import init_chat_model

model = init_chat_model("gemini-2.5-flash", model_provider="google_genai")
```

### 3. Tool Binding

Enable the model to use tools:

```python
model_with_tools = model.bind_tools(tools)

# Test tool calling
query = "Search for the weather in SF"
response = model_with_tools.invoke([{"role": "user", "content": query}])
print(f"Tool calls: {response.tool_calls}")
```

### 4. Create the Agent

Using LangGraph's high-level interface:

```python
from langgraph.prebuilt import create_react_agent

agent_executor = create_react_agent(model, tools)
```

**Note**: `create_react_agent` automatically calls `.bind_tools` internally.

## Agent Execution Modes

### Basic Invocation

Stateless query execution:

```python
input_message = {"role": "user", "content": "Search for the weather in SF"}
response = agent_executor.invoke({"messages": [input_message]})

for message in response["messages"]:
    message.pretty_print()
```

### Streaming Messages

Show intermediate progress as steps occur:

```python
for step in agent_executor.stream(
    {"messages": [input_message]},
    stream_mode="values"
):
    step["messages"][-1].pretty_print()
```

### Streaming Tokens

Stream individual tokens as they're generated:

```python
for step, metadata in agent_executor.stream(
    {"messages": [input_message]},
    stream_mode="messages"
):
    if metadata["langgraph_node"] == "agent" and (text := step.text()):
        print(text, end="|")
```

**Note**: Token streaming requires `langchain-core>=0.3.37`

## Memory Management

### Adding Conversational Memory

Enable the agent to remember previous interactions:

```python
from langgraph.checkpoint.memory import MemorySaver

memory = MemorySaver()
agent_executor = create_react_agent(model, tools, checkpointer=memory)

# Configure with thread ID for conversation tracking
config = {"configurable": {"thread_id": "abc123"}}
```

### Example Conversation with Memory

```python
# First message
input_message = {"role": "user", "content": "Hi, I'm Bob!"}
for step in agent_executor.stream(
    {"messages": [input_message]}, config, stream_mode="values"
):
    step["messages"][-1].pretty_print()

# Follow-up message (agent remembers context)
input_message = {"role": "user", "content": "What's my name?"}
for step in agent_executor.stream(
    {"messages": [input_message]}, config, stream_mode="values"
):
    step["messages"][-1].pretty_print()
# Output: "Your name is Bob, as you introduced yourself earlier."
```

### Starting New Conversations

Change the `thread_id` to start a fresh conversation:

```python
config = {"configurable": {"thread_id": "xyz123"}}
# Agent won't remember previous interactions
```

## Key Features

### Tool Calling Flow

1. User provides input
2. LLM analyzes and determines if tools are needed
3. LLM generates tool call with appropriate parameters
4. Tool executes and returns results
5. Results fed back to LLM
6. LLM determines if more actions needed or task complete

### Agent Capabilities

- **Reasoning**: Uses LLM to determine appropriate actions
- **Tool Usage**: Dynamically calls external tools/APIs
- **Memory**: Maintains conversation context across interactions
- **Streaming**: Provides real-time feedback during processing
- **Flexibility**: Supports multiple LLM providers and custom tools

## Best Practices

### Development Environment

- Use Jupyter notebooks for interactive development
- Enable LangSmith tracing for debugging
- Test tool calls individually before agent integration

### Tool Design

- Keep tools focused on single responsibilities
- Provide clear descriptions for tool usage
- Handle errors gracefully within tools

### Memory Management

- Use unique thread IDs for different conversations
- Consider memory persistence for production applications
- Clean up old conversation threads periodically

## Advanced Topics

### Custom Tool Creation

- Define tools as Python functions
- Use `@tool` decorator for automatic schema generation
- Implement error handling and validation

### Agent Customization

- LangGraph provides low-level APIs for custom agent logic
- Modify agent behavior through custom nodes and edges
- Implement complex multi-step workflows

### Production Considerations

- Use persistent checkpointers (e.g., SQLite, PostgreSQL)
- Implement rate limiting for API calls
- Add monitoring and observability
- Handle edge cases and timeouts

## Resources

- **LangGraph Documentation**: Complete agent framework documentation
- **LangSmith**: Tracing and debugging platform
- **Tool Creation Guide**: [How to create tools](https://python.langchain.com/docs/how_to/custom_tools/)
- **Integration Packages**: Provider-specific packages for various LLMs

## Example Use Cases

1. **Customer Support Bot**: Agent with access to knowledge base and ticket system
2. **Research Assistant**: Agent that searches multiple sources and synthesizes information
3. **Task Automation**: Agent that performs multi-step workflows with various tools
4. **Data Analysis**: Agent that queries databases and generates insights

## Conclusion

LangChain agents provide a powerful framework for building AI systems that can reason, use tools, and maintain conversation context. The combination of LangChain's tool ecosystem and LangGraph's agent orchestration enables complex, production-ready AI applications.

Key takeaways:

- Agents use LLMs as reasoning engines
- Tools extend agent capabilities
- Memory enables conversational interactions
- Streaming provides real-time feedback
- LangGraph offers both high-level and low-level control

---

_For more information, refer to the [LangGraph documentation](https://python.langchain.com/docs/concepts/architecture/#langgraph) for detailed concepts, tutorials, and how-to guides._
