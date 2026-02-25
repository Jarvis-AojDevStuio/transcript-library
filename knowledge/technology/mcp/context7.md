---
title: "Context7 Direct Research Command"
description: "Context7 MCP tool command template for retrieving library documentation and saving to markdown."
category: "Research"
subcategory: "MCP Servers"
product_line: "Desktop Commander"
audience: "Developers"
status: "Active"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - context7
  - mcp-server
  - documentation
  - research
  - library-docs
---

## Direct Research

**variables**
Libid:$ARGUMENTS
Directory_name:$ARGUMENTS
Topic:$ARGUMENTS

Use context7 get tool with the libid $ARGUMENTS and save the results to a directory called $ARGUMENTS in markdown format, the topic is $ARGUMENTS. If the directory already exists, skip the step, if the user fails to give you a directory name, search for related directories before creating a new one. If the user fails to give you a topic, use the libid as the topic.

**Example command:**

/context7 `/mastra-ai/mastra` `mastra-docs` `rag`
