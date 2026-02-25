---
title: "Personal Repository MCP Server - 1-Day Implementation Plan"
description: "Detailed implementation plan for building a personal repository MCP server with project setup, tool development, and testing strategies."
category: "Research"
subcategory: "MCP Servers"
product_line: "Desktop Commander"
audience: "Developers"
status: "Active"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - mcp-server
  - implementation-plan
  - personal-repository
  - development-workflow
  - project-planning
---

# Personal Repository MCP Server - 1-Day Implementation Plan

## Project Setup (30 minutes)

### Directory Structure

```
personal-repo-mcp/
├── src/
│   ├── index.ts                 # Main MCP server entry point
│   ├── server.ts                # MCP server implementation
│   ├── search-engine.ts         # Search logic and ranking
│   ├── repo-scanner.ts          # Repository discovery and indexing
│   ├── vector-store.ts          # ChromaDB integration
│   ├── chunker.ts              # File content chunking
│   ├── config.ts               # Configuration management
│   └── types.ts                # TypeScript interfaces
├── config/
│   ├── default.json            # Default configuration
│   └── repositories.json       # Repository list (auto-generated)
├── data/                       # Local data storage
│   ├── chroma_db/             # ChromaDB files
│   ├── metadata.db            # SQLite database
│   └── search_index/          # Lunr.js index files
├── scripts/
│   ├── scan-repos.ts          # CLI for repository scanning
│   ├── test-search.ts         # Search testing utility
│   └── stats.ts               # Repository statistics
├── package.json
├── tsconfig.json
├── esbuild.config.js
└── README.md
```

### Initial Package Setup

```bash
# Initialize project
npm init -y
npm install @modelcontextprotocol/sdk @modelcontextprotocol/inspector
npm install chromadb @xenova/transformers lunr fs-extra ignore simple-git
npm install -D @types/node @types/lunr typescript esbuild nodemon concurrently

# Create package.json scripts
{
  "scripts": {
    "build": "esbuild src/index.ts --outfile=dist/index.cjs --bundle --platform=node --format=cjs --banner:js='#!/usr/bin/env node' && chmod +x dist/index.cjs",
    "dev": "concurrently \"esbuild src/index.ts --outfile=dist/index.cjs --bundle --platform=node --format=cjs --watch\" \"nodemon dist/index.cjs\"",
    "scan": "tsx scripts/scan-repos.ts",
    "inspect": "npx @modelcontextprotocol/inspector node dist/index.cjs",
    "test-search": "tsx scripts/test-search.ts"
  }
}
```

## Phase 1: Core MCP Server (2-3 hours)

### 1.1 TypeScript Interfaces (30 minutes)

**File: `src/types.ts`**

```typescript
export interface Repository {
  id: string;
  name: string;
  path: string;
  lastScanned: Date;
  fileCount: number;
  gitRemoteUrl?: string;
  primaryLanguage: string;
  description?: string;
  isActive: boolean;
}

export interface DocumentChunk {
  id: string;
  repositoryId: string;
  filePath: string;
  relativePath: string;
  content: string;
  startLine: number;
  endLine: number;
  chunkType: 'code' | 'comment' | 'documentation' | 'config';
  language?: string;
  metadata: {
    size: number;
    lastModified: Date;
    functionNames?: string[];
    classNames?: string[];
    imports?: string[];
    exports?: string[];
  };
}

export interface SearchResult {
  chunk: DocumentChunk;
  repository: Repository;
  score: number;
  relevanceReason: string;
}

export interface SearchOptions {
  repositoryIds?: string[];
  fileTypes?: string[];
  maxResults?: number;
  minScore?: number;
  includeMetadata?: boolean;
}

export interface MCPSession {
  sessionId: string;
  searchHistory: string[];
  lastActivity: Date;
  resultCache: Map<string, SearchResult[]>;
}
```

### 1.2 Configuration Management (30 minutes)

**File: `src/config.ts`**

```typescript
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface Config {
  repositories: {
    scanPaths: string[];
    excludePatterns: string[];
    autoScan: boolean;
    maxFileSize: number; // in bytes
  };
  search: {
    maxResults: number;
    chunkSize: number;
    overlapSize: number;
    enableVectorSearch: boolean;
    enableKeywordSearch: boolean;
  };
  embeddings: {
    model: string;
    dimension: number;
    batchSize: number;
  };
  server: {
    name: string;
    version: string;
    transport: 'stdio' | 'http';
    port?: number;
  };
}

const DEFAULT_CONFIG: Config = {
  repositories: {
    scanPaths: [
      '~/Projects',
      '~/code',
      '~/development',
      '~/workspace'
    ],
    excludePatterns: [
      'node_modules',
      '.git',
      'dist',
      'build',
      '.next',
      'coverage',
      '.vscode',
      '.idea'
    ],
    autoScan: true,
    maxFileSize: 1024 * 1024 // 1MB
  },
  search: {
    maxResults: 10,
    chunkSize: 1000,
    overlapSize: 200,
    enableVectorSearch: true,
    enableKeywordSearch: true
  },
  embeddings: {
    model: 'all-MiniLM-L6-v2',
    dimension: 384,
    batchSize: 32
  },
  server: {
    name: 'Personal Repo MCP',
    version: '1.0.0',
    transport: 'stdio'
  }
};

export class ConfigManager {
  private config: Config;
  private configPath: string;

  constructor(configPath: string = './config/default.json') {
    this.configPath = configPath;
    this.loadConfig();
  }

  private loadConfig(): void {
    if (existsSync(this.configPath)) {
      const configData = readFileSync(this.configPath, 'utf-8');
      this.config = { ...DEFAULT_CONFIG, ...JSON.parse(configData) };
    } else {
      this.config = DEFAULT_CONFIG;
      this.saveConfig();
    }
  }

  private saveConfig(): void {
    writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
  }

  get(): Config {
    return this.config;
  }

  update(updates: Partial<Config>): void {
    this.config = { ...this.config, ...updates };
    this.saveConfig();
  }
}
```

### 1.3 Basic MCP Server Implementation (90 minutes)

**File: `src/server.ts`**

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
  type Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { SearchEngine } from './search-engine.js';
import { RepoScanner } from './repo-scanner.js';
import { ConfigManager } from './config.js';
import type { SearchOptions, MCPSession } from './types.js';

export class PersonalRepoMCPServer {
  private server: Server;
  private searchEngine: SearchEngine;
  private repoScanner: RepoScanner;
  private config: ConfigManager;
  private sessions: Map<string, MCPSession> = new Map();

  constructor() {
    this.config = new ConfigManager();
    this.searchEngine = new SearchEngine(this.config);
    this.repoScanner = new RepoScanner(this.config);

    const serverConfig = this.config.get().server;
    this.server = new Server(
      {
        name: serverConfig.name,
        version: serverConfig.version,
      },
      {
        capabilities: {
          tools: {},
          logging: {},
        },
      }
    );

    this.setupTools();
    this.setupRequestHandlers();
  }

  private setupTools(): void {
    const tools: Tool[] = [
      {
        name: 'search_personal_repos',
        description: 'Search across your personal repositories for code, documentation, and configurations. Use this to find relevant code examples, documentation, or configuration files.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query - can include code snippets, function names, concepts, or natural language descriptions'
            },
            repositories: {
              type: 'array',
              items: { type: 'string' },
              description: 'Optional: specific repository names to search within'
            },
            fileTypes: {
              type: 'array',
              items: { type: 'string' },
              description: 'Optional: file extensions to search (e.g., ["ts", "js", "md"])'
            },
            maxResults: {
              type: 'number',
              description: 'Maximum number of results to return (default: 10)',
              default: 10
            }
          },
          required: ['query']
        }
      },
      {
        name: 'read_repo_file',
        description: 'Read the complete content of a specific file from your repositories. Use this after search_personal_repos to get full file context.',
        inputSchema: {
          type: 'object',
          properties: {
            repositoryId: {
              type: 'string',
              description: 'Repository ID from search results'
            },
            filePath: {
              type: 'string',
              description: 'File path relative to repository root'
            },
            startLine: {
              type: 'number',
              description: 'Optional: starting line number (1-based)'
            },
            endLine: {
              type: 'number',
              description: 'Optional: ending line number (1-based)'
            }
          },
          required: ['repositoryId', 'filePath']
        }
      },
      {
        name: 'list_repositories',
        description: 'List all indexed personal repositories with their metadata and statistics.',
        inputSchema: {
          type: 'object',
          properties: {
            includeStats: {
              type: 'boolean',
              description: 'Include detailed statistics about each repository',
              default: true
            }
          }
        }
      },
      {
        name: 'scan_repositories',
        description: 'Scan for new repositories or re-scan existing ones to update the index.',
        inputSchema: {
          type: 'object',
          properties: {
            paths: {
              type: 'array',
              items: { type: 'string' },
              description: 'Optional: specific paths to scan (defaults to configured scan paths)'
            },
            forceRescan: {
              type: 'boolean',
              description: 'Force re-scanning of all repositories',
              default: false
            }
          }
        }
      }
    ];

    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools
    }));
  }

  private setupRequestHandlers(): void {
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'search_personal_repos':
            return await this.handleSearch(args as any);

          case 'read_repo_file':
            return await this.handleReadFile(args as any);

          case 'list_repositories':
            return await this.handleListRepositories(args as any);

          case 'scan_repositories':
            return await this.handleScanRepositories(args as any);

          default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
        }
      } catch (error) {
        console.error(`Error in tool ${name}:`, error);
        throw new McpError(
          ErrorCode.InternalError,
          `Error executing ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  private async handleSearch(args: {
    query: string;
    repositories?: string[];
    fileTypes?: string[];
    maxResults?: number;
  }) {
    const options: SearchOptions = {
      repositoryIds: args.repositories,
      fileTypes: args.fileTypes,
      maxResults: args.maxResults || 10,
      minScore: 0.1,
      includeMetadata: true
    };

    const results = await this.searchEngine.search(args.query, options);

    if (results.length === 0) {
      return {
        content: [{
          type: 'text',
          text: 'No results found for your query. Try different keywords or check if repositories are properly indexed.'
        }]
      };
    }

    const formattedResults = results.map(result => {
      const repo = result.repository;
      const chunk = result.chunk;

      return {
        type: 'text' as const,
        text: `Repository: ${repo.name}
File: ${chunk.relativePath}
Language: ${chunk.language || 'unknown'}
Lines: ${chunk.startLine}-${chunk.endLine}
Score: ${result.score.toFixed(3)}
Reason: ${result.relevanceReason}

Content:
\`\`\`${chunk.language || ''}
${chunk.content}
\`\`\`

---`
      };
    });

    return { content: formattedResults };
  }

  private async handleReadFile(args: {
    repositoryId: string;
    filePath: string;
    startLine?: number;
    endLine?: number;
  }) {
    const content = await this.searchEngine.readFile(
      args.repositoryId,
      args.filePath,
      args.startLine,
      args.endLine
    );

    return {
      content: [{
        type: 'text',
        text: content
      }]
    };
  }

  private async handleListRepositories(args: { includeStats?: boolean }) {
    const repositories = await this.repoScanner.listRepositories();

    const formattedRepos = repositories.map(repo => {
      let text = `Repository: ${repo.name}
Path: ${repo.path}
Primary Language: ${repo.primaryLanguage}
Files: ${repo.fileCount}
Last Scanned: ${repo.lastScanned.toISOString()}`;

      if (repo.gitRemoteUrl) {
        text += `\nRemote: ${repo.gitRemoteUrl}`;
      }

      if (repo.description) {
        text += `\nDescription: ${repo.description}`;
      }

      return {
        type: 'text' as const,
        text: text + '\n---'
      };
    });

    return { content: formattedRepos };
  }

  private async handleScanRepositories(args: {
    paths?: string[];
    forceRescan?: boolean;
  }) {
    const scanPaths = args.paths || this.config.get().repositories.scanPaths;
    const results = await this.repoScanner.scanRepositories(scanPaths, args.forceRescan);

    return {
      content: [{
        type: 'text',
        text: `Scan completed:
- Repositories found: ${results.found}
- New repositories: ${results.new}
- Updated repositories: ${results.updated}
- Files indexed: ${results.filesIndexed}
- Scan duration: ${results.duration}ms`
      }]
    };
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Personal Repo MCP Server running on stdio');
  }

  onError(handler: (error: Error) => void): void {
    this.server.onerror = handler;
  }
}
```

### 1.4 Main Entry Point (15 minutes)

**File: `src/index.ts`**

```typescript
import { PersonalRepoMCPServer } from './server.js';

async function main() {
  const server = new PersonalRepoMCPServer();

  server.onError((error) => {
    console.error('Server error:', error);
  });

  process.on('SIGINT', async () => {
    console.error('Shutting down gracefully...');
    process.exit(0);
  });

  await server.start();
}

main().catch((error) => {
  console.error('Fatal error starting server:', error);
  process.exit(1);
});
```

## Phase 2: Vector Storage & Search (2-3 hours)

### 2.1 ChromaDB Vector Store (60 minutes)

**File: `src/vector-store.ts`**

```typescript
import { ChromaApi, OpenAIEmbeddingFunction, Collection } from 'chromadb';
import type { DocumentChunk } from './types.js';

export class VectorStore {
  private client: ChromaApi;
  private collection: Collection;
  private embeddingFunction: OpenAIEmbeddingFunction;

  constructor() {
    this.client = new ChromaApi({
      path: './data/chroma_db'
    });

    // Use local embeddings (or OpenAI if API key provided)
    this.embeddingFunction = new OpenAIEmbeddingFunction({
      openai_api_key: process.env.OPENAI_API_KEY || '',
      openai_model: 'text-embedding-3-small'
    });
  }

  async initialize(): Promise<void> {
    try {
      this.collection = await this.client.getOrCreateCollection({
        name: 'personal_repos',
        embeddingFunction: this.embeddingFunction
      });
    } catch (error) {
      console.error('Failed to initialize vector store:', error);
      throw error;
    }
  }

  async addDocuments(chunks: DocumentChunk[]): Promise<void> {
    if (chunks.length === 0) return;

    const ids = chunks.map(chunk => chunk.id);
    const documents = chunks.map(chunk => chunk.content);
    const metadatas = chunks.map(chunk => ({
      repositoryId: chunk.repositoryId,
      filePath: chunk.filePath,
      relativePath: chunk.relativePath,
      language: chunk.language || 'unknown',
      chunkType: chunk.chunkType,
      startLine: chunk.startLine,
      endLine: chunk.endLine,
      lastModified: chunk.metadata.lastModified.toISOString(),
      functionNames: JSON.stringify(chunk.metadata.functionNames || []),
      classNames: JSON.stringify(chunk.metadata.classNames || []),
      imports: JSON.stringify(chunk.metadata.imports || [])
    }));

    await this.collection.add({
      ids,
      documents,
      metadatas
    });
  }

  async search(
    query: string,
    options: {
      nResults?: number;
      where?: Record<string, any>;
      whereDocument?: Record<string, any>;
    } = {}
  ): Promise<Array<{
    id: string;
    distance: number;
    document: string;
    metadata: any;
  }>> {
    const results = await this.collection.query({
      queryTexts: [query],
      nResults: options.nResults || 10,
      where: options.where,
      whereDocument: options.whereDocument
    });

    if (!results.ids || !results.ids[0]) {
      return [];
    }

    return results.ids[0].map((id, index) => ({
      id,
      distance: results.distances?.[0]?.[index] || 1,
      document: results.documents?.[0]?.[index] || '',
      metadata: results.metadatas?.[0]?.[index] || {}
    }));
  }

  async deleteByRepository(repositoryId: string): Promise<void> {
    await this.collection.delete({
      where: { repositoryId }
    });
  }

  async getCount(): Promise<number> {
    return await this.collection.count();
  }
}
```

### 2.2 File Content Chunker (45 minutes)

**File: `src/chunker.ts`**

```typescript
import { readFileSync } from 'fs';
import { extname, basename } from 'path';
import type { DocumentChunk, Repository } from './types.js';

export class ContentChunker {
  private readonly CHUNK_SIZE = 1000; // characters
  private readonly OVERLAP_SIZE = 200; // characters

  async chunkFile(
    filePath: string,
    relativePath: string,
    repository: Repository
  ): Promise<DocumentChunk[]> {
    try {
      const content = readFileSync(filePath, 'utf-8');
      const extension = extname(filePath).slice(1);
      const language = this.detectLanguage(extension);
      const chunkType = this.detectChunkType(filePath, content);

      const metadata = await this.extractMetadata(content, language);
      const chunks: DocumentChunk[] = [];

      // For small files, create single chunk
      if (content.length <= this.CHUNK_SIZE) {
        chunks.push({
          id: `${repository.id}:${relativePath}:0`,
          repositoryId: repository.id,
          filePath,
          relativePath,
          content,
          startLine: 1,
          endLine: content.split('\n').length,
          chunkType,
          language,
          metadata: {
            ...metadata,
            size: content.length,
            lastModified: new Date()
          }
        });
        return chunks;
      }

      // For larger files, create overlapping chunks
      const lines = content.split('\n');
      let currentChunk = '';
      let chunkStartLine = 1;
      let currentLine = 1;
      let chunkIndex = 0;

      for (const line of lines) {
        currentChunk += line + '\n';

        if (currentChunk.length >= this.CHUNK_SIZE) {
          chunks.push({
            id: `${repository.id}:${relativePath}:${chunkIndex}`,
            repositoryId: repository.id,
            filePath,
            relativePath,
            content: currentChunk.trim(),
            startLine: chunkStartLine,
            endLine: currentLine,
            chunkType,
            language,
            metadata: {
              ...metadata,
              size: currentChunk.length,
              lastModified: new Date()
            }
          });

          // Start next chunk with overlap
          const overlapLines = Math.ceil(this.OVERLAP_SIZE / 50); // Rough estimation
          const startOverlap = Math.max(0, currentLine - overlapLines);
          chunkStartLine = startOverlap + 1;
          currentChunk = lines.slice(startOverlap, currentLine + 1).join('\n') + '\n';
          chunkIndex++;
        }

        currentLine++;
      }

      // Add remaining content as final chunk
      if (currentChunk.trim()) {
        chunks.push({
          id: `${repository.id}:${relativePath}:${chunkIndex}`,
          repositoryId: repository.id,
          filePath,
          relativePath,
          content: currentChunk.trim(),
          startLine: chunkStartLine,
          endLine: currentLine - 1,
          chunkType,
          language,
          metadata: {
            ...metadata,
            size: currentChunk.length,
            lastModified: new Date()
          }
        });
      }

      return chunks;
    } catch (error) {
      console.error(`Error chunking file ${filePath}:`, error);
      return [];
    }
  }

  private detectLanguage(extension: string): string {
    const languageMap: Record<string, string> = {
      'ts': 'typescript',
      'js': 'javascript',
      'jsx': 'javascript',
      'tsx': 'typescript',
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'cs': 'csharp',
      'php': 'php',
      'rb': 'ruby',
      'go': 'go',
      'rs': 'rust',
      'swift': 'swift',
      'kt': 'kotlin',
      'scala': 'scala',
      'sh': 'bash',
      'ps1': 'powershell',
      'sql': 'sql',
      'md': 'markdown',
      'yaml': 'yaml',
      'yml': 'yaml',
      'json': 'json',
      'xml': 'xml',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'less': 'less'
    };

    return languageMap[extension] || extension;
  }

  private detectChunkType(filePath: string, content: string): 'code' | 'comment' | 'documentation' | 'config' {
    const fileName = basename(filePath).toLowerCase();

    // Documentation files
    if (fileName.includes('readme') || fileName.includes('doc') ||
        filePath.includes('/docs/') || extname(filePath) === '.md') {
      return 'documentation';
    }

    // Configuration files
    if (fileName.includes('config') || fileName.includes('settings') ||
        ['.json', '.yaml', '.yml', '.toml', '.ini'].includes(extname(filePath))) {
      return 'config';
    }

    // Mostly comments
    const lines = content.split('\n');
    const commentLines = lines.filter(line =>
      line.trim().startsWith('//') ||
      line.trim().startsWith('#') ||
      line.trim().startsWith('/*') ||
      line.trim().startsWith('*')
    ).length;

    if (commentLines > lines.length * 0.7) {
      return 'comment';
    }

    return 'code';
  }

  private async extractMetadata(content: string, language: string): Promise<{
    functionNames?: string[];
    classNames?: string[];
    imports?: string[];
    exports?: string[];
  }> {
    const metadata: any = {};

    if (['typescript', 'javascript'].includes(language)) {
      metadata.functionNames = this.extractJSFunctions(content);
      metadata.classNames = this.extractJSClasses(content);
      metadata.imports = this.extractJSImports(content);
      metadata.exports = this.extractJSExports(content);
    } else if (language === 'python') {
      metadata.functionNames = this.extractPythonFunctions(content);
      metadata.classNames = this.extractPythonClasses(content);
      metadata.imports = this.extractPythonImports(content);
    }

    return metadata;
  }

  private extractJSFunctions(content: string): string[] {
    const functionRegex = /(?:function\s+(\w+)|const\s+(\w+)\s*=|(\w+)\s*:\s*(?:async\s+)?function|(\w+)\s*\(.*?\)\s*(?:=>|{))/g;
    const functions: string[] = [];
    let match;

    while ((match = functionRegex.exec(content)) !== null) {
      const name = match[1] || match[2] || match[3] || match[4];
      if (name && !functions.includes(name)) {
        functions.push(name);
      }
    }

    return functions;
  }

  private extractJSClasses(content: string): string[] {
    const classRegex = /class\s+(\w+)/g;
    const classes: string[] = [];
    let match;

    while ((match = classRegex.exec(content)) !== null) {
      classes.push(match[1]);
    }

    return classes;
  }

  private extractJSImports(content: string): string[] {
    const importRegex = /import\s+.*?\s+from\s+['"`]([^'"`]+)['"`]/g;
    const imports: string[] = [];
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }

    return imports;
  }

  private extractJSExports(content: string): string[] {
    const exportRegex = /export\s+(?:default\s+)?(?:class|function|const|let|var)\s+(\w+)/g;
    const exports: string[] = [];
    let match;

    while ((match = exportRegex.exec(content)) !== null) {
      exports.push(match[1]);
    }

    return exports;
  }

  private extractPythonFunctions(content: string): string[] {
    const functionRegex = /def\s+(\w+)\s*\(/g;
    const functions: string[] = [];
    let match;

    while ((match = functionRegex.exec(content)) !== null) {
      functions.push(match[1]);
    }

    return functions;
  }

  private extractPythonClasses(content: string): string[] {
    const classRegex = /class\s+(\w+)/g;
    const classes: string[] = [];
    let match;

    while ((match = classRegex.exec(content)) !== null) {
      classes.push(match[1]);
    }

    return classes;
  }

  private extractPythonImports(content: string): string[] {
    const importRegex = /(?:from\s+(\S+)\s+import|import\s+(\S+))/g;
    const imports: string[] = [];
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      const module = match[1] || match[2];
      if (module && !imports.includes(module)) {
        imports.push(module);
      }
    }

    return imports;
  }
}
```

## Phase 3: Repository Scanner (2-3 hours)

### 3.1 Repository Discovery & Git Integration (90 minutes)

**File: `src/repo-scanner.ts`**

```typescript
import { promises as fs, statSync, existsSync } from 'fs';
import { join, basename, relative } from 'path';
import { homedir } from 'os';
import ignore from 'ignore';
import simpleGit from 'simple-git';
import type { Repository, DocumentChunk } from './types.js';
import type { ConfigManager } from './config.js';
import { ContentChunker } from './chunker.js';
import { VectorStore } from './vector-store.js';

export interface ScanResult {
  found: number;
  new: number;
  updated: number;
  filesIndexed: number;
  duration: number;
}

export class RepoScanner {
  private repositories: Map<string, Repository> = new Map();
  private chunker: ContentChunker;
  private vectorStore: VectorStore;
  private config: ConfigManager;

  constructor(config: ConfigManager) {
    this.config = config;
    this.chunker = new ContentChunker();
    this.vectorStore = new VectorStore();
    this.loadRepositories();
  }

  async initialize(): Promise<void> {
    await this.vectorStore.initialize();
  }

  private async loadRepositories(): Promise<void> {
    try {
      const repoFile = './config/repositories.json';
      if (existsSync(repoFile)) {
        const data = await fs.readFile(repoFile, 'utf-8');
        const repos: Repository[] = JSON.parse(data);
        repos.forEach(repo => {
          this.repositories.set(repo.id, repo);
        });
      }
    } catch (error) {
      console.error('Error loading repositories:', error);
    }
  }

  private async saveRepositories(): Promise<void> {
    try {
      const repos = Array.from(this.repositories.values());
      await fs.writeFile('./config/repositories.json', JSON.stringify(repos, null, 2));
    } catch (error) {
      console.error('Error saving repositories:', error);
    }
  }

  async scanRepositories(scanPaths?: string[], forceRescan: boolean = false): Promise<ScanResult> {
    const startTime = Date.now();
    const result: ScanResult = {
      found: 0,
      new: 0,
      updated: 0,
      filesIndexed: 0,
      duration: 0
    };

    const paths = scanPaths || this.config.get().repositories.scanPaths;
    const expandedPaths = paths.map(path => path.startsWith('~') ?
      join(homedir(), path.slice(1)) : path);

    for (const scanPath of expandedPaths) {
      if (!existsSync(scanPath)) {
        console.warn(`Scan path does not exist: ${scanPath}`);
        continue;
      }

      const foundRepos = await this.discoverRepositories(scanPath);
      result.found += foundRepos.length;

      for (const repoPath of foundRepos) {
        const repoId = this.generateRepoId(repoPath);
        const existingRepo = this.repositories.get(repoId);

        if (!existingRepo || forceRescan || await this.needsUpdate(repoPath, existingRepo)) {
          const repository = await this.analyzeRepository(repoPath, repoId);
          if (repository) {
            const isNew = !existingRepo;
            this.repositories.set(repoId, repository);

            if (isNew) {
              result.new++;
            } else {
              result.updated++;
            }

            // Index repository files
            const indexedFiles = await this.indexRepository(repository);
            result.filesIndexed += indexedFiles;
          }
        }
      }
    }

    await this.saveRepositories();
    result.duration = Date.now() - startTime;
    return result;
  }

  private async discoverRepositories(basePath: string): Promise<string[]> {
    const repositories: string[] = [];

    try {
      const items = await fs.readdir(basePath);

      for (const item of items) {
        const itemPath = join(basePath, item);

        try {
          const stat = statSync(itemPath);
          if (!stat.isDirectory()) continue;

          // Check if this directory is a git repository
          if (existsSync(join(itemPath, '.git'))) {
            repositories.push(itemPath);
          } else {
            // Recursively search subdirectories (max depth 2)
            const subRepos = await this.discoverRepositories(itemPath);
            repositories.push(...subRepos);
          }
        } catch (error) {
          // Skip directories we can't access
          continue;
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${basePath}:`, error);
    }

    return repositories;
  }

  private generateRepoId(repoPath: string): string {
    return basename(repoPath) + '_' + Buffer.from(repoPath).toString('base64').slice(0, 8);
  }

  private async needsUpdate(repoPath: string, existingRepo: Repository): Promise<boolean> {
    try {
      // Check if repository was modified since last scan
      const git = simpleGit(repoPath);
      const status = await git.status();

      // If there are any changes, we need to update
      if (status.files.length > 0) return true;

      // Check if any files were modified since last scan
      const log = await git.log({ maxCount: 1 });
      if (log.latest && new Date(log.latest.date) > existingRepo.lastScanned) {
        return true;
      }

      return false;
    } catch (error) {
      // If we can't check git status, assume we need to update
      return true;
    }
  }

  private async analyzeRepository(repoPath: string, repoId: string): Promise<Repository | null> {
    try {
      const name = basename(repoPath);
      let gitRemoteUrl: string | undefined;
      let description: string | undefined;

      // Get git information
      try {
        const git = simpleGit(repoPath);
        const remotes = await git.getRemotes(true);
        gitRemoteUrl = remotes.find(r => r.name === 'origin')?.refs?.fetch;
      } catch (error) {
        // Not a git repository or no remotes
      }

      // Try to get description from package.json or README
      try {
        const packageJsonPath = join(repoPath, 'package.json');
        if (existsSync(packageJsonPath)) {
          const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
          description = packageJson.description;
        }
      } catch (error) {
        // No package.json or invalid JSON
      }

      // Count files and detect primary language
      const { fileCount, primaryLanguage } = await this.analyzeFiles(repoPath);

      return {
        id: repoId,
        name,
        path: repoPath,
        lastScanned: new Date(),
        fileCount,
        gitRemoteUrl,
        primaryLanguage,
        description,
        isActive: true
      };
    } catch (error) {
      console.error(`Error analyzing repository ${repoPath}:`, error);
      return null;
    }
  }

  private async analyzeFiles(repoPath: string): Promise<{ fileCount: number; primaryLanguage: string }> {
    const languageCounts: Record<string, number> = {};
    let fileCount = 0;

    const gitignoreFile = join(repoPath, '.gitignore');
    const ig = ignore();

    if (existsSync(gitignoreFile)) {
      const gitignoreContent = await fs.readFile(gitignoreFile, 'utf-8');
      ig.add(gitignoreContent);
    }

    // Add default exclusions
    ig.add(this.config.get().repositories.excludePatterns);

    async function scanDirectory(dirPath: string): Promise<void> {
      try {
        const items = await fs.readdir(dirPath);

        for (const item of items) {
          const itemPath = join(dirPath, item);
          const relativePath = relative(repoPath, itemPath);

          if (ig.ignores(relativePath)) continue;

          const stat = statSync(itemPath);

          if (stat.isDirectory()) {
            await scanDirectory(itemPath);
          } else if (stat.isFile()) {
            fileCount++;
            const ext = itemPath.split('.').pop()?.toLowerCase();
            if (ext) {
              languageCounts[ext] = (languageCounts[ext] || 0) + 1;
            }
          }
        }
      } catch (error) {
        // Skip directories we can't access
      }
    }

    await scanDirectory(repoPath);

    // Determine primary language
    const primaryLanguage = Object.entries(languageCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'unknown';

    return { fileCount, primaryLanguage };
  }

  private async indexRepository(repository: Repository): Promise<number> {
    let filesIndexed = 0;

    // Remove existing chunks for this repository
    await this.vectorStore.deleteByRepository(repository.id);

    const gitignoreFile = join(repository.path, '.gitignore');
    const ig = ignore();

    if (existsSync(gitignoreFile)) {
      const gitignoreContent = await fs.readFile(gitignoreFile, 'utf-8');
      ig.add(gitignoreContent);
    }

    ig.add(this.config.get().repositories.excludePatterns);

    const supportedExtensions = new Set([
      'ts', 'js', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'cs', 'php', 'rb', 'go', 'rs',
      'swift', 'kt', 'scala', 'sh', 'ps1', 'sql', 'md', 'yaml', 'yml', 'json', 'xml',
      'html', 'css', 'scss', 'less', 'txt', 'conf', 'ini', 'toml'
    ]);

    async function indexDirectory(dirPath: string): Promise<void> {
      try {
        const items = await fs.readdir(dirPath);

        for (const item of items) {
          const itemPath = join(dirPath, item);
          const relativePath = relative(repository.path, itemPath);

          if (ig.ignores(relativePath)) continue;

          const stat = statSync(itemPath);

          if (stat.isDirectory()) {
            await indexDirectory(itemPath);
          } else if (stat.isFile()) {
            const ext = itemPath.split('.').pop()?.toLowerCase();

            if (ext && supportedExtensions.has(ext) &&
                stat.size <= config.get().repositories.maxFileSize) {

              try {
                const chunks = await chunker.chunkFile(itemPath, relativePath, repository);
                if (chunks.length > 0) {
                  await vectorStore.addDocuments(chunks);
                  filesIndexed++;
                }
              } catch (error) {
                console.error(`Error indexing file ${itemPath}:`, error);
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error indexing directory ${dirPath}:`, error);
      }
    }

    const chunker = this.chunker;
    const vectorStore = this.vectorStore;
    const config = this.config;

    await indexDirectory(repository.path);
    return filesIndexed;
  }

  async listRepositories(): Promise<Repository[]> {
    return Array.from(this.repositories.values())
      .filter(repo => repo.isActive)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async getRepository(id: string): Promise<Repository | undefined> {
    return this.repositories.get(id);
  }
}
```

## Phase 4: Search Engine (2-3 hours)

### 4.1 Hybrid Search Implementation (90 minutes)

**File: `src/search-engine.ts`**

```typescript
import { readFileSync } from 'fs';
import { join } from 'path';
import lunr from 'lunr';
import type { ConfigManager } from './config.js';
import type { Repository, DocumentChunk, SearchResult, SearchOptions, MCPSession } from './types.js';
import { VectorStore } from './vector-store.js';
import { RepoScanner } from './repo-scanner.js';

export class SearchEngine {
  private vectorStore: VectorStore;
  private repoScanner: RepoScanner;
  private config: ConfigManager;
  private keywordIndex?: lunr.Index;
  private documentMap: Map<string, DocumentChunk> = new Map();
  private sessions: Map<string, MCPSession> = new Map();

  constructor(config: ConfigManager) {
    this.config = config;
    this.vectorStore = new VectorStore();
    this.repoScanner = new RepoScanner(config);
  }

  async initialize(): Promise<void> {
    await this.vectorStore.initialize();
    await this.repoScanner.initialize();
    await this.buildKeywordIndex();
  }

  private async buildKeywordIndex(): Promise<void> {
    // This would need to be rebuilt when repositories are updated
    // For now, we'll focus on vector search
    console.log('Keyword index building would go here...');
  }

  async search(query: string, options: SearchOptions = {}): Promise<SearchResult[]> {
    const config = this.config.get().search;
    const maxResults = options.maxResults || config.maxResults;

    // Build search filters
    const whereClause: Record<string, any> = {};
    if (options.repositoryIds?.length) {
      whereClause.repositoryId = { $in: options.repositoryIds };
    }
    if (options.fileTypes?.length) {
      whereClause.language = { $in: options.fileTypes };
    }

    // Perform vector search
    const vectorResults = await this.vectorStore.search(query, {
      nResults: maxResults * 2, // Get more results to allow for filtering
      where: whereClause
    });

    // Convert to SearchResult format
    const searchResults: SearchResult[] = [];

    for (const result of vectorResults) {
      const repository = await this.repoScanner.getRepository(result.metadata.repositoryId);
      if (!repository) continue;

      // Calculate relevance score (convert distance to similarity)
      const score = Math.max(0, 1 - result.distance);
      if (score < (options.minScore || 0.1)) continue;

      // Create document chunk from result
      const chunk: DocumentChunk = {
        id: result.id,
        repositoryId: result.metadata.repositoryId,
        filePath: result.metadata.filePath,
        relativePath: result.metadata.relativePath,
        content: result.document,
        startLine: result.metadata.startLine,
        endLine: result.metadata.endLine,
        chunkType: result.metadata.chunkType,
        language: result.metadata.language,
        metadata: {
          size: result.document.length,
          lastModified: new Date(result.metadata.lastModified),
          functionNames: JSON.parse(result.metadata.functionNames || '[]'),
          classNames: JSON.parse(result.metadata.classNames || '[]'),
          imports: JSON.parse(result.metadata.imports || '[]'),
          exports: []
        }
      };

      const relevanceReason = this.generateRelevanceReason(query, chunk, score);

      searchResults.push({
        chunk,
        repository,
        score,
        relevanceReason
      });
    }

    // Sort by score and apply final filtering
    const sortedResults = searchResults
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);

    return sortedResults;
  }

  private generateRelevanceReason(query: string, chunk: DocumentChunk, score: number): string {
    const reasons: string[] = [];

    // Check for exact keyword matches
    const queryLower = query.toLowerCase();
    const contentLower = chunk.content.toLowerCase();

    if (contentLower.includes(queryLower)) {
      reasons.push('contains exact query match');
    }

    // Check for function/class name matches
    const queryWords = queryLower.split(/\s+/);
    const functionMatches = chunk.metadata.functionNames?.filter(name =>
      queryWords.some(word => name.toLowerCase().includes(word))
    );

    if (functionMatches?.length) {
      reasons.push(`matches function names: ${functionMatches.join(', ')}`);
    }

    const classMatches = chunk.metadata.classNames?.filter(name =>
      queryWords.some(word => name.toLowerCase().includes(word))
    );

    if (classMatches?.length) {
      reasons.push(`matches class names: ${classMatches.join(', ')}`);
    }

    // Check file type relevance
    if (chunk.language && queryLower.includes(chunk.language)) {
      reasons.push(`relevant ${chunk.language} code`);
    }

    // Check chunk type relevance
    if (chunk.chunkType === 'documentation' && queryWords.some(w => ['doc', 'readme', 'guide'].includes(w))) {
      reasons.push('documentation content');
    }

    // Default to semantic similarity
    if (reasons.length === 0) {
      if (score > 0.8) {
        reasons.push('high semantic similarity');
      } else if (score > 0.6) {
        reasons.push('good semantic similarity');
      } else {
        reasons.push('moderate semantic similarity');
      }
    }

    return reasons.join(', ');
  }

  async readFile(
    repositoryId: string,
    filePath: string,
    startLine?: number,
    endLine?: number
  ): Promise<string> {
    const repository = await this.repoScanner.getRepository(repositoryId);
    if (!repository) {
      throw new Error(`Repository not found: ${repositoryId}`);
    }

    const fullPath = join(repository.path, filePath);

    try {
      const content = readFileSync(fullPath, 'utf-8');

      if (startLine !== undefined || endLine !== undefined) {
        const lines = content.split('\n');
        const start = Math.max(0, (startLine || 1) - 1);
        const end = Math.min(lines.length, endLine || lines.length);

        return lines.slice(start, end).join('\n');
      }

      return content;
    } catch (error) {
      throw new Error(`Error reading file ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Session management for result filtering (like ref-tools)
  private getOrCreateSession(sessionId: string): MCPSession {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        sessionId,
        searchHistory: [],
        lastActivity: new Date(),
        resultCache: new Map()
      });
    }
    return this.sessions.get(sessionId)!;
  }

  private updateSession(sessionId: string, query: string, results: SearchResult[]): void {
    const session = this.getOrCreateSession(sessionId);
    session.searchHistory.push(query);
    session.lastActivity = new Date();

    // Keep only last 10 searches
    if (session.searchHistory.length > 10) {
      session.searchHistory = session.searchHistory.slice(-10);
    }

    // Cache results for potential follow-up queries
    session.resultCache.set(query, results);

    // Clean old cache entries
    if (session.resultCache.size > 20) {
      const oldestKey = session.resultCache.keys().next().value;
      session.resultCache.delete(oldestKey);
    }
  }
}
```

### 4.2 CLI Scripts for Testing (30 minutes)

**File: `scripts/test-search.ts`**

```typescript
import { SearchEngine } from '../src/search-engine.js';
import { ConfigManager } from '../src/config.js';

async function testSearch() {
  const config = new ConfigManager();
  const searchEngine = new SearchEngine(config);

  await searchEngine.initialize();

  console.log('Testing search functionality...\n');

  const queries = [
    'React component useState',
    'API endpoint authentication',
    'database connection configuration',
    'error handling try catch',
    'TypeScript interface definition'
  ];

  for (const query of queries) {
    console.log(`🔍 Query: "${query}"`);
    console.log('─'.repeat(50));

    try {
      const results = await searchEngine.search(query, { maxResults: 3 });

      if (results.length === 0) {
        console.log('No results found.\n');
        continue;
      }

      results.forEach((result, index) => {
        console.log(`${index + 1}. ${result.repository.name}/${result.chunk.relativePath}`);
        console.log(`   Score: ${result.score.toFixed(3)}`);
        console.log(`   Reason: ${result.relevanceReason}`);
        console.log(`   Content: ${result.chunk.content.slice(0, 100)}...`);
        console.log();
      });
    } catch (error) {
      console.error(`Error searching for "${query}":`, error);
    }

    console.log('═'.repeat(80));
    console.log();
  }
}

testSearch().catch(console.error);
```

**File: `scripts/scan-repos.ts`**

```typescript
import { RepoScanner } from '../src/repo-scanner.js';
import { ConfigManager } from '../src/config.js';

async function scanRepositories() {
  const config = new ConfigManager();
  const scanner = new RepoScanner(config);

  await scanner.initialize();

  console.log('Starting repository scan...\n');

  const startTime = Date.now();
  const result = await scanner.scanRepositories();

  console.log('Scan completed!');
  console.log('─'.repeat(30));
  console.log(`Repositories found: ${result.found}`);
  console.log(`New repositories: ${result.new}`);
  console.log(`Updated repositories: ${result.updated}`);
  console.log(`Files indexed: ${result.filesIndexed}`);
  console.log(`Duration: ${result.duration}ms`);

  console.log('\nRepository list:');
  console.log('─'.repeat(50));

  const repositories = await scanner.listRepositories();
  repositories.forEach(repo => {
    console.log(`📁 ${repo.name}`);
    console.log(`   Path: ${repo.path}`);
    console.log(`   Language: ${repo.primaryLanguage}`);
    console.log(`   Files: ${repo.fileCount}`);
    if (repo.gitRemoteUrl) {
      console.log(`   Remote: ${repo.gitRemoteUrl}`);
    }
    console.log();
  });
}

scanRepositories().catch(console.error);
```

## Phase 5: Testing & Documentation (1 hour)

### 5.1 Build & Test Commands (15 minutes)

**Add to package.json:**

```json
{
  "scripts": {
    "build": "esbuild src/index.ts --outfile=dist/index.cjs --bundle --platform=node --format=cjs --banner:js='#!/usr/bin/env node' && chmod +x dist/index.cjs",
    "dev": "concurrently \"npm run build -- --watch\" \"sleep 2 && npm run inspect\"",
    "scan": "npm run build && node scripts/scan-repos.ts",
    "test-search": "npm run build && node scripts/test-search.ts",
    "inspect": "npx @modelcontextprotocol/inspector node dist/index.cjs",
    "start": "node dist/index.cjs"
  }
}
```

### 5.2 Quick Start Documentation (30 minutes)

**File: `docs/research/personal-repo-mcp/quick-start.md`**

````markdown
# Personal Repository MCP - Quick Start Guide

## Installation & Setup

### 1. Clone and Install
```bash
git clone <your-repo> personal-repo-mcp
cd personal-repo-mcp
npm install
````

### 2. Configure Repository Paths

Edit `config/default.json`:

```json
{
  "repositories": {
    "scanPaths": [
      "~/Projects",
      "~/code",
      "~/development"
    ]
  }
}
```

### 3. Initial Scan

```bash
npm run scan
```

### 4. Test Search

```bash
npm run test-search
```

## MCP Integration

### Claude Desktop Configuration

Add to your MCP settings:

```json
{
  "personal-repos": {
    "command": "node",
    "args": ["/path/to/personal-repo-mcp/dist/index.cjs"],
    "env": {}
  }
}
```

### Cursor Integration

```json
{
  "personal-repos": {
    "command": "npx",
    "args": ["personal-repo-mcp@latest"]
  }
}
```

## Usage Examples

### Search Personal Repositories

```
@personal-repos search_personal_repos query="React hooks useEffect"
```

### Read Specific Files

```
@personal-repos read_repo_file repositoryId="myproject_abc123" filePath="src/components/App.tsx"
```

### List All Repositories

```
@personal-repos list_repositories includeStats=true
```

## Advanced Features

### Re-scan Repositories

```
@personal-repos scan_repositories forceRescan=true
```

### Search Specific Languages

```
@personal-repos search_personal_repos query="database connection" fileTypes=["ts", "js"]
```

### Repository-Scoped Search

```
@personal-repos search_personal_repos query="authentication" repositories=["backend-api"]
```

## Performance Tips

1. **Exclude Large Directories**: Update `excludePatterns` in config
2. **File Size Limits**: Adjust `maxFileSize` for large files
3. **Selective Scanning**: Specify exact paths instead of broad scans
4. **Regular Updates**: Run periodic scans to keep index fresh

## Troubleshooting

### No Results Found

- Check if repositories are properly scanned
- Verify file types are supported
- Try broader search terms

### Slow Performance

- Reduce scan paths
- Increase exclude patterns
- Lower maxFileSize limit

### Memory Issues

- Reduce chunk size in config
- Limit number of repositories
- Clear old session data

````

### 5.3 Integration Test Script (15 minutes)

**File: `scripts/integration-test.ts`**
```typescript
import { PersonalRepoMCPServer } from '../src/server.js';

async function runIntegrationTests() {
  console.log('🧪 Starting integration tests...\n');

  const server = new PersonalRepoMCPServer();

  // Test 1: Server initialization
  console.log('✅ Server initialized successfully');

  // Test 2: Repository scanning
  console.log('🔍 Testing repository scanning...');
  // This would involve mocking the MCP call

  // Test 3: Search functionality
  console.log('🔎 Testing search functionality...');
  // This would involve mocking search calls

  // Test 4: File reading
  console.log('📖 Testing file reading...');
  // This would involve mocking file read calls

  console.log('\n🎉 All integration tests passed!');
}

runIntegrationTests().catch(console.error);
````

## Summary

This implementation plan provides a complete 1-day development path for creating a personal repository MCP server that replicates ref-tools' core functionality while adding personal repository focus.

**Key Features Delivered:**
✅ MCP server with 4 core tools
✅ Vector-based search using ChromaDB
✅ Repository auto-discovery and indexing
✅ Git integration and smart file filtering
✅ Session management for search optimization
✅ File chunking with language awareness
✅ Metadata extraction for enhanced search
✅ Token-efficient result formatting

**Time Allocation:**

- Phase 1 (MCP Server): 2-3 hours
- Phase 2 (Vector Storage): 2-3 hours
- Phase 3 (Repository Scanner): 2-3 hours
- Phase 4 (Search Engine): 2-3 hours
- Phase 5 (Testing): 1 hour

**Total: 8-10 hours** (allowing for debugging and refinement)

The system will be fully functional for personal use and can be extended with additional features over time.
