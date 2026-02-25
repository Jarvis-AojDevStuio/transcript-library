---
title: "Claude Code Tools Documentation"
description: "Comprehensive reference for all available tools in Claude Code environment including file operations, memory management, IDE integration, and MCP tools."
category: "Research"
subcategory: "Claude Code"
product_line: "Desktop Commander"
audience: "Developers"
status: "Active"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - claude-code
  - tools-reference
  - api-documentation
  - mcp-integration
  - development-tools
---

# Claude Code Tools Documentation

This document provides a comprehensive reference for all available tools in the Claude Code environment.

## Core Development Tools

### Task Management

- **`Task(description: string, prompt: string): void`**  
  Launch a new agent with access to comprehensive tools for autonomous task execution

- **`TodoWrite(todos: Array<{content: string, status: "pending" | "in_progress" | "completed", priority: "high" | "medium" | "low", id: string}>): void`**  
  Create and manage structured task lists for complex multi-step coding sessions

### System Operations

- **`Bash(command: string, description?: string, timeout?: number): string`**  
  Execute bash commands in a persistent shell session with proper security measures

- **`exit_plan_mode(plan: string): void`**  
  Exit plan mode after presenting implementation plan for coding tasks

### File System Operations

- **`Glob(pattern: string, path?: string): string[]`**  
  Fast file pattern matching tool supporting glob patterns like `"**/*.js"`

- **`Grep(pattern: string, path?: string, output_mode?: "content" | "files_with_matches" | "count", glob?: string, type?: string, multiline?: boolean, head_limit?: number, -A?: number, -B?: number, -C?: number, -i?: boolean, -n?: boolean): string`**  
  Powerful search tool built on ripgrep with regex support and filtering options

- **`LS(path: string, ignore?: string[]): string`**  
  List files and directories in a given absolute path with optional ignore patterns

- **`Read(file_path: string, offset?: number, limit?: number): string`**  
  Read files from filesystem with optional line offset and limit for large files

- **`Edit(file_path: string, old_string: string, new_string: string, replace_all?: boolean): void`**  
  Perform exact string replacements in files with unique matching requirements

- **`MultiEdit(file_path: string, edits: Array<{old_string: string, new_string: string, replace_all?: boolean}>): void`**  
  Make multiple sequential edits to a single file in one atomic operation

- **`Write(file_path: string, content: string): void`**  
  Write content to files, preferring edits over new file creation

### Jupyter Notebook Operations

- **`NotebookRead(notebook_path: string, cell_id?: string): string`**  
  Read Jupyter notebook cells and their outputs from `.ipynb` files

- **`NotebookEdit(notebook_path: string, new_source: string, cell_id?: string, cell_type?: "code" | "markdown", edit_mode?: "replace" | "insert" | "delete"): void`**  
  Edit Jupyter notebook cells with replace, insert, or delete operations

### Web Operations

- **`WebFetch(url: string, prompt: string): string`**  
  Fetch and process web content using AI with automatic HTML to markdown conversion

- **`WebSearch(query: string, allowed_domains?: string[], blocked_domains?: string[]): string`**  
  Search the web for up-to-date information with domain filtering support

## Memory and Knowledge Management

### Memory Operations

- **`mcp__memory__create_entities(entities: Array<{name: string, entityType: string, observations: string[]}>): void`**  
  Create multiple new entities in the knowledge graph with associated observations

- **`mcp__memory__create_relations(relations: Array<{from: string, to: string, relationType: string}>): void`**  
  Create relationships between entities in the knowledge graph using active voice

- **`mcp__memory__add_observations(observations: Array<{entityName: string, contents: string[]}>): void`**  
  Add new observations to existing entities in the knowledge graph

- **`mcp__memory__delete_entities(entityNames: string[]): void`**  
  Delete multiple entities and their relations from the knowledge graph

- **`mcp__memory__delete_observations(deletions: Array<{entityName: string, observations: string[]}>): void`**  
  Delete specific observations from entities in the knowledge graph

- **`mcp__memory__delete_relations(relations: Array<{from: string, to: string, relationType: string}>): void`**  
  Delete multiple relations from the knowledge graph

- **`mcp__memory__read_graph(): object`**  
  Read the entire knowledge graph structure and content

- **`mcp__memory__search_nodes(query: string): object`**  
  Search for nodes in the knowledge graph based on query matching

- **`mcp__memory__open_nodes(names: string[]): object`**  
  Open and retrieve specific nodes from the knowledge graph by name

## IDE Integration

### VS Code Integration

- **`mcp__ide__getDiagnostics(uri?: string): object`**  
  Get language diagnostics from VS Code for specified file or all files

- **`mcp__ide__executeCode(code: string): object`**  
  Execute Python code in the current Jupyter kernel with persistent state

## Advanced Analysis Tools (Zen)

### Deep Analysis

- **`mcp__zen__thinkdeep(step: string, step_number: number, total_steps: number, next_step_required: boolean, findings: string, model: string, thinking_mode?: "minimal" | "low" | "medium" | "high" | "max", use_assistant_model?: boolean, use_websearch?: boolean, ...): object`**  
  Comprehensive investigation and reasoning workflow for complex problem analysis

- **`mcp__zen__analyze(step: string, step_number: number, total_steps: number, next_step_required: boolean, findings: string, model: string, analysis_type?: "architecture" | "performance" | "security" | "quality" | "general", ...): object`**  
  Comprehensive code analysis workflow with expert validation and systematic investigation

### Code Quality

- **`mcp__zen__codereview(step: string, step_number: number, total_steps: number, next_step_required: boolean, findings: string, model: string, confidence?: "exploring" | "low" | "medium" | "high" | "certain", ...): object`**  
  Step-by-step code review workflow with systematic investigation and expert analysis

- **`mcp__zen__refactor(step: string, step_number: number, total_steps: number, next_step_required: boolean, findings: string, model: string, refactor_type?: "codesmells" | "decompose" | "modernize" | "organization", confidence?: "exploring" | "incomplete" | "partial" | "complete", ...): object`**  
  Comprehensive refactoring workflow with code smell detection and improvement opportunities

### Debugging and Testing

- **`mcp__zen__debug(step: string, step_number: number, total_steps: number, next_step_required: boolean, findings: string, model: string, hypothesis?: string, confidence?: "exploring" | "low" | "medium" | "high" | "certain", ...): object`**  
  Systematic debugging and root cause analysis workflow with guided investigation

- **`mcp__zen__testgen(step: string, step_number: number, total_steps: number, next_step_required: boolean, findings: string, model: string, confidence?: "exploring" | "low" | "medium" | "high" | "certain", ...): object`**  
  Comprehensive test generation workflow with edge case coverage and framework-specific tests

- **`mcp__zen__precommit(step: string, step_number: number, total_steps: number, next_step_required: boolean, findings: string, model: string, path?: string, compare_to?: string, include_staged?: boolean, include_unstaged?: boolean, ...): object`**  
  Comprehensive pre-commit validation workflow with systematic investigation

### Code Tracing and Planning

- **`mcp__zen__tracer(step: string, step_number: number, total_steps: number, next_step_required: boolean, findings: string, target_description: string, trace_mode: "precision" | "dependencies" | "ask", model: string, confidence?: "exploring" | "low" | "medium" | "high" | "certain", ...): object`**  
  Step-by-step code tracing workflow for method execution flow and dependency analysis

- **`mcp__zen__planner(step: string, step_number: number, total_steps: number, next_step_required: boolean, model: string, is_step_revision?: boolean, is_branch_point?: boolean, branch_from_step?: number, branch_id?: string, ...): object`**  
  Interactive sequential planner for breaking down complex tasks with branching and revision

### Collaboration and Consensus

- **`mcp__zen__chat(prompt: string, model: string, files?: string[], images?: string[], temperature?: number, thinking_mode?: "minimal" | "low" | "medium" | "high" | "max", use_websearch?: boolean, continuation_id?: string): object`**  
  General chat and collaborative thinking tool for brainstorming and explanations

- **`mcp__zen__consensus(prompt: string, models: Array<{model: string, stance?: "for" | "support" | "favor" | "against" | "oppose" | "critical" | "neutral", stance_prompt?: string}>, focus_areas?: string[], temperature?: number, thinking_mode?: "minimal" | "low" | "medium" | "high" | "max", use_websearch?: boolean, ...): object`**  
  Multi-model consensus gathering for technical proposals and complex decisions

### Utility

- **`mcp__zen__listmodels(): object`**  
  Display all available AI models organized by provider with capabilities and context windows

- **`mcp__zen__version(): object`**  
  Get server version, configuration details, and list of available tools

## Obsidian Integration (DEPRECATED)

**Note**: The Docker-based Obsidian MCP tools listed below have been replaced by **Desktop Commander MCP** which provides direct file system access to the Obsidian vault at `/Users/ossieirondi/Projects/dev-utils/.obsidian/desktop-commander`.

Desktop Commander provides equivalent functionality through native file operations:

- **File Management**: `mcp__desktop-commander__read_file`, `mcp__desktop-commander__write_file`, `mcp__desktop-commander__list_directory`
- **Search Operations**: `mcp__desktop-commander__search_files`, `mcp__desktop-commander__search_code`
- **Batch Operations**: `mcp__desktop-commander__read_multiple_files`

### Legacy Obsidian Tools (No Longer Available)

The following tools were part of the previous Docker-based setup and are documented for reference only:

~~- **`mcp__obsidian__obsidian_list_files_in_dir(dirpath: string): object`**~~  
~~- **`mcp__obsidian__obsidian_list_files_in_vault(): object`**~~  
~~- **`mcp__obsidian__obsidian_get_file_contents(filepath: string): object`**~~  
~~- **`mcp__obsidian__obsidian_batch_get_file_contents(filepaths: string[]): object`**~~  
~~- **`mcp__obsidian__obsidian_append_content(filepath: string, content: string): object`**~~  
~~- **`mcp__obsidian__obsidian_patch_content(filepath: string, operation, target_type, target: string, content: string): object`**~~  
~~- **`mcp__obsidian__obsidian_delete_file(filepath: string, confirm: boolean): object`**~~  
~~- **`mcp__obsidian__obsidian_simple_search(query: string, context_length?: number): object`**~~  
~~- **`mcp__obsidian__obsidian_complex_search(query: object): object`**~~  
~~- **`mcp__obsidian__obsidian_get_periodic_note(period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"): object`**~~  
~~- **`mcp__obsidian__obsidian_get_recent_periodic_notes(period, limit?: number, include_content?: boolean): object`**~~  
~~- **`mcp__obsidian__obsidian_get_recent_changes(limit?: number, days?: number): object`**~~

## Documentation and Library Access

### Context7 Integration

- **`mcp__context7__resolve_library_id(libraryName: string): object`**  
  Resolve package/product name to Context7-compatible library ID for documentation access

- **`mcp__context7__get_library_docs(context7CompatibleLibraryID: string, tokens?: number, topic?: string): object`**  
  Fetch up-to-date documentation for a library using Context7-compatible library ID

## Cloud Services Integration

### Supabase Integration

#### Organization and Project Management

- **`mcp__supabase__list_organizations(): object`**  
  List all organizations that the user is a member of

- **`mcp__supabase__get_organization(id: string): object`**  
  Get details for a Supabase organization including subscription plan

- **`mcp__supabase__list_projects(): object`**  
  List all Supabase projects for the user to help discover project IDs

- **`mcp__supabase__get_project(id: string): object`**  
  Get details for a specific Supabase project

- **`mcp__supabase__get_project_url(project_id: string): object`**  
  Get the API URL for a Supabase project

- **`mcp__supabase__get_anon_key(project_id: string): object`**  
  Get the anonymous API key for a Supabase project

#### Cost Management

- **`mcp__supabase__get_cost(type: "project" | "branch", organization_id: string): object`**  
  Get the cost of creating a new project or branch for an organization

- **`mcp__supabase__confirm_cost(type: "project" | "branch", recurrence: "hourly" | "monthly", amount: number): object`**  
  Confirm understanding of costs before creating projects or branches

#### Project Operations

- **`mcp__supabase__create_project(name: string, organization_id: string, confirm_cost_id: string, region?: string): object`**  
  Create a new Supabase project with cost confirmation

- **`mcp__supabase__pause_project(project_id: string): object`**  
  Pause a Supabase project to reduce costs

- **`mcp__supabase__restore_project(project_id: string): object`**  
  Restore a previously paused Supabase project

#### Branch Management

- **`mcp__supabase__create_branch(project_id: string, confirm_cost_id: string, name?: string): object`**  
  Create a development branch with fresh database and applied migrations

- **`mcp__supabase__list_branches(project_id: string): object`**  
  List all development branches of a Supabase project with status information

- **`mcp__supabase__delete_branch(branch_id: string): object`**  
  Delete a development branch from Supabase

- **`mcp__supabase__merge_branch(branch_id: string): object`**  
  Merge migrations and edge functions from development branch to production

- **`mcp__supabase__reset_branch(branch_id: string, migration_version?: string): object`**  
  Reset development branch migrations with optional specific version target

- **`mcp__supabase__rebase_branch(branch_id: string): object`**  
  Rebase development branch on production to handle migration drift

#### Database Operations

- **`mcp__supabase__list_tables(project_id: string, schemas?: string[]): object`**  
  List all tables in one or more database schemas

- **`mcp__supabase__list_extensions(project_id: string): object`**  
  List all extensions installed in the Supabase database

- **`mcp__supabase__list_migrations(project_id: string): object`**  
  List all database migrations in the Supabase project

- **`mcp__supabase__apply_migration(project_id: string, name: string, query: string): object`**  
  Apply a database migration with DDL operations

- **`mcp__supabase__execute_sql(project_id: string, query: string): object`**  
  Execute raw SQL in the Postgres database for data operations

- **`mcp__supabase__generate_typescript_types(project_id: string): object`**  
  Generate TypeScript types for a Supabase project database schema

#### Edge Functions

- **`mcp__supabase__list_edge_functions(project_id: string): object`**  
  List all Edge Functions deployed in a Supabase project

- **`mcp__supabase__deploy_edge_function(project_id: string, name: string, files: Array<{name: string, content: string}>, entrypoint_path?: string, import_map_path?: string): object`**  
  Deploy Edge Function to Supabase project with TypeScript support

#### Monitoring and Debugging

- **`mcp__supabase__get_logs(project_id: string, service: "api" | "branch-action" | "postgres" | "edge-function" | "auth" | "storage" | "realtime"): object`**  
  Get logs for a Supabase project by service type for debugging

- **`mcp__supabase__get_advisors(project_id: string, type: "security" | "performance"): object`**  
  Get advisory notices for security vulnerabilities or performance improvements

#### Documentation

- **`mcp__supabase__search_docs(graphql_query: string): object`**  
  Search Supabase documentation using GraphQL with comprehensive schema support

## Project Management Integration

### Linear Integration

#### Issue Management

- **`mcp__linear-server__get_issue(id: string): object`**  
  Retrieve Linear issue details including attachments and git branch name

- **`mcp__linear-server__list_issues(query?: string, assignee?: string, team?: string, state?: string, project?: string, cycle?: string, parentId?: string, createdAt?: string, updatedAt?: string, includeArchived?: boolean, limit?: number): object`**  
  List issues in the Linear workspace with extensive filtering capabilities

- **`mcp__linear-server__create_issue(title: string, team: string, description?: string, assignee?: string, state?: string, priority?: number, project?: string, cycle?: string, parentId?: string, labels?: string[], dueDate?: string, links?: Array<{url: string, title: string}>): object`**  
  Create a new Linear issue with comprehensive metadata support

- **`mcp__linear-server__update_issue(id: string, title?: string, description?: string, assignee?: string, state?: string, priority?: number, project?: string, cycle?: string, parentId?: string, labels?: string[], dueDate?: string, estimate?: number, links?: Array<{url: string, title: string}>): object`**  
  Update an existing Linear issue with any combination of fields

  > **Note**: To list your own issues, use `list_issues` with `assignee: "me"`

#### Comments

- **`mcp__linear-server__list_comments(issueId: string): object`**  
  Retrieve comments for a Linear issue by ID

- **`mcp__linear-server__create_comment(issueId: string, body: string): object`**  
  Create a comment on a Linear issue using Markdown formatting

#### Issue Metadata

- **`mcp__linear-server__list_issue_statuses(team: string): object`**  
  List available issue statuses in a Linear team

- **`mcp__linear-server__get_issue_status(query: string, team: string): object`**  
  Retrieve details of a specific issue status by name or ID

- **`mcp__linear-server__list_issue_labels(team: string): object`**  
  List available issue labels in a Linear team

#### Project Management

- **`mcp__linear-server__list_projects(team?: string, includeArchived?: boolean, orderBy?: "createdAt" | "updatedAt", limit?: number, createdAt?: string, updatedAt?: string, after?: string, before?: string): object`**  
  List projects in the Linear workspace with filtering and pagination

- **`mcp__linear-server__get_project(query: string): object`**  
  Retrieve details of a specific Linear project by ID or name

- **`mcp__linear-server__create_project(name: string, team: string, summary?: string, description?: string, startDate?: string, targetDate?: string): object`**  
  Create a new Linear project with comprehensive metadata

- **`mcp__linear-server__update_project(id: string, name?: string, summary?: string, description?: string, startDate?: string, targetDate?: string): object`**  
  Update an existing Linear project with any combination of fields

- **`mcp__linear-server__list_project_labels(): object`**  
  List available project labels in the Linear workspace

#### Cycles

- **`mcp__linear-server__list_cycles(team: string, type?: "current" | "previous" | "next"): object`**  
  Retrieve cycles for a Linear team with optional type filtering

#### Teams and Users

- **`mcp__linear-server__list_teams(query?: string, includeArchived?: boolean, orderBy?: "createdAt" | "updatedAt", limit?: number, createdAt?: string, updatedAt?: string, after?: string, before?: string): object`**  
  List teams in the Linear workspace with search and filtering capabilities

- **`mcp__linear-server__get_team(query: string): object`**  
  Retrieve details of a specific Linear team by UUID, key, or name

- **`mcp__linear-server__list_users(): object`**  
  Retrieve all users in the Linear workspace

- **`mcp__linear-server__get_user(query: string): object`**  
  Retrieve details of a specific Linear user by UUID or name

#### Documentation

- **`mcp__linear-server__get_document(id: string): object`**  
  Retrieve a Linear document by ID or slug

- **`mcp__linear-server__list_documents(query?: string, createdAt?: string, updatedAt?: string, creatorId?: string, project?: string, initiative?: string, includeArchived?: boolean, orderBy?: "createdAt" | "updatedAt", limit?: number, after?: string, before?: string): object`**  
  List documents in the Linear workspace with comprehensive filtering options

- **`mcp__linear-server__search_documentation(query: string, page?: number): object`**  
  Search Linear's documentation to learn about features and usage

## Git Integration

### GitHub Repository Tools

- **`mcp__gitmcp__match_common_libs_owner_repo_mapping(library: string): object`**  
  Match library name to GitHub owner/repo for use with other Git MCP tools

- **`mcp__gitmcp__fetch_generic_documentation(owner: string, repo: string): object`**  
  Fetch comprehensive documentation for any GitHub repository

- **`mcp__gitmcp__search_generic_documentation(owner: string, repo: string, query: string): object`**  
  Semantically search documentation for specific queries in GitHub repositories

- **`mcp__gitmcp__search_generic_code(owner: string, repo: string, query: string, page?: number): object`**  
  Search for code in GitHub repositories with pagination support

- **`mcp__gitmcp__fetch_generic_url_content(url: string): object`**  
  Fetch content from any absolute URL while respecting robots.txt rules
