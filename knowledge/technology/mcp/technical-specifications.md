---
title: "Personal Repository MCP Server - Technical Specifications"
description: "Technical specifications and architecture documentation for a personal repository MCP server including system design, API specs, and security considerations."
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
  - technical-specifications
  - system-architecture
  - api-design
  - security
---

# Personal Repository MCP Server - Technical Specifications

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Claude Desktop / Cursor                   │
│                              (MCP Client)                        │
└─────────────────────┬───────────────────────────────────────────┘
                      │ MCP Protocol (stdio/HTTP)
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│                Personal Repository MCP Server                    │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   MCP Server    │  │ Search Engine   │  │ Session Manager │ │
│  │   (stdio/HTTP)  │  │ (Hybrid Search) │  │ (Result Cache)  │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│           │                      │                      │       │
│           │                      │                      │       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Repo Scanner   │  │ Content Chunker │  │ Config Manager  │ │
│  │ (Git-aware)     │  │ (Lang-aware)    │  │ (Settings)      │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│                    Local Storage Layer                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   ChromaDB      │  │  File System    │  │   Config Files  │ │
│  │ (Vector Store)  │  │ (Source Code)   │  │ (JSON/Settings) │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow Architecture

```
Repository Discovery → File Analysis → Content Chunking → Vector Embedding → Storage

1. Scan configured directories for Git repositories
2. Analyze files (respect .gitignore, file size limits)
3. Extract content and split into semantic chunks
4. Generate embeddings for each chunk
5. Store in ChromaDB with metadata
6. Index for hybrid search (vector + keyword)
```

## Component Specifications

### 1. MCP Server Interface

**Protocol Compliance**: MCP v1.0.3
**Transport Methods**: stdio (primary), HTTP (future)
**Session Management**: Stateful session tracking for result filtering

**Tool Definitions**:

```typescript
interface MCPTools {
  search_personal_repos: {
    input: {
      query: string;
      repositories?: string[];
      fileTypes?: string[];
      maxResults?: number;
    };
    output: SearchResult[];
  };

  read_repo_file: {
    input: {
      repositoryId: string;
      filePath: string;
      startLine?: number;
      endLine?: number;
    };
    output: string;
  };

  list_repositories: {
    input: {
      includeStats?: boolean;
    };
    output: Repository[];
  };

  scan_repositories: {
    input: {
      paths?: string[];
      forceRescan?: boolean;
    };
    output: ScanResult;
  };
}
```

### 2. Search Engine Specifications

**Hybrid Search Strategy**:

- **Vector Search**: Semantic similarity using sentence embeddings
- **Keyword Search**: Traditional full-text search with Lunr.js
- **Metadata Filtering**: Repository, language, file type filtering
- **Result Fusion**: Combine and rank results from multiple sources

**Embedding Model**:

- **Default**: all-MiniLM-L6-v2 (384 dimensions, fast, local)
- **Alternative**: OpenAI text-embedding-3-small (API required)
- **Batch Processing**: 32 documents per embedding call

**Search Performance Targets**:

- **Response Time**: <200ms for typical queries
- **Result Quality**: Top 5 results relevant 90%+ of time
- **Token Efficiency**: <5K tokens per result with high relevance

### 3. Repository Scanner Specifications

**Discovery Algorithm**:

```
1. Scan configured directory paths (expandable from ~/path)
2. Recursively search for .git directories (max depth: 3)
3. Extract Git metadata (remote URLs, recent commits)
4. Analyze file structure and determine primary language
5. Respect .gitignore patterns and size limitations
```

**File Processing Rules**:

- **Supported Extensions**: .ts, .js, .jsx, .tsx, .py, .java, .cpp, .c, .cs, .php, .rb, .go, .rs, .swift, .kt, .scala, .sh, .ps1, .sql, .md, .yaml, .yml, .json, .xml, .html, .css, .scss, .less
- **Size Limit**: 1MB per file (configurable)
- **Exclusion Patterns**: node_modules, .git, dist, build, .next, coverage, .vscode, .idea
- **Update Detection**: Git status and file modification timestamps

**Incremental Indexing**:

- **Change Detection**: Git status, file modification times
- **Selective Updates**: Only re-index modified files
- **Repository-level Tracking**: Last scan timestamps per repository
- **Batch Processing**: Group file operations for efficiency

### 4. Content Chunking Specifications

**Chunking Strategy**:

```
IF file_size <= 1000 chars:
    CREATE single chunk
ELSE:
    CREATE overlapping chunks:
        chunk_size = 1000 chars
        overlap_size = 200 chars
        MAINTAIN line boundaries
        PRESERVE function/class boundaries where possible
```

**Language-Aware Processing**:

- **JavaScript/TypeScript**: Extract functions, classes, imports, exports
- **Python**: Extract functions, classes, imports
- **Markdown**: Preserve heading structure, code blocks
- **Configuration Files**: Maintain key-value structure
- **Generic Text**: Line-based chunking with overlap

**Metadata Extraction**:

```typescript
interface ChunkMetadata {
  functionNames: string[];     // Extracted function definitions
  classNames: string[];        // Extracted class definitions
  imports: string[];           // Import statements
  exports: string[];           // Export statements
  language: string;            // Detected programming language
  chunkType: 'code' | 'comment' | 'documentation' | 'config';
  startLine: number;           // Source line numbers
  endLine: number;
  lastModified: Date;          // File modification timestamp
}
```

### 5. Vector Storage Specifications

**ChromaDB Configuration**:

- **Collection Name**: `personal_repos`
- **Embedding Function**: OpenAI or local transformer
- **Distance Metric**: Cosine similarity
- **Persistence**: Local file-based storage

**Document Schema**:

```typescript
interface StoredDocument {
  id: string;                  // Unique chunk identifier
  content: string;             // Chunk text content
  metadata: {
    repositoryId: string;
    filePath: string;
    relativePath: string;
    language: string;
    chunkType: string;
    startLine: number;
    endLine: number;
    lastModified: string;      // ISO timestamp
    functionNames: string;     // JSON array
    classNames: string;        // JSON array
    imports: string;           // JSON array
  };
  embedding: number[];         // Vector embedding
}
```

**Query Operations**:

- **Similarity Search**: Vector-based semantic search
- **Filtered Search**: Metadata-based filtering
- **Hybrid Queries**: Combined vector + metadata filters
- **Batch Operations**: Efficient bulk insert/update/delete

### 6. Configuration System

**Configuration Hierarchy**:

1. Default configuration (embedded)
2. System-wide config file (`config/default.json`)
3. User-specific overrides (future: `~/.personal-repo-mcp/config.json`)
4. Environment variables (future: `PERSONAL_REPO_MCP_*`)

**Configuration Schema**:

```typescript
interface Configuration {
  repositories: {
    scanPaths: string[];         // Directories to scan for repos
    excludePatterns: string[];   // .gitignore-style patterns
    autoScan: boolean;           // Automatic periodic scanning
    maxFileSize: number;         // Maximum file size to index (bytes)
    supportedExtensions: string[]; // File extensions to process
  };

  search: {
    maxResults: number;          // Default result count
    chunkSize: number;           // Characters per chunk
    overlapSize: number;         // Overlap between chunks
    enableVectorSearch: boolean; // Vector search toggle
    enableKeywordSearch: boolean; // Keyword search toggle
    minScore: number;            // Minimum relevance score
  };

  embeddings: {
    model: string;               // Embedding model name
    dimension: number;           // Vector dimensions
    batchSize: number;           // Embedding batch size
    provider: 'local' | 'openai'; // Embedding provider
  };

  server: {
    name: string;                // MCP server name
    version: string;             // Version string
    transport: 'stdio' | 'http'; // Transport method
    port?: number;               // HTTP port (if applicable)
    sessionTimeout: number;      // Session timeout (ms)
  };

  storage: {
    dataDirectory: string;       // Base data directory
    chromaPath: string;          // ChromaDB storage path
    metadataPath: string;        // Metadata storage path
    cacheSize: number;           // In-memory cache size
  };
}
```

## Performance Specifications

### Response Time Targets

- **Search Operations**: <200ms average, <500ms p95
- **File Read Operations**: <50ms for files <100KB
- **Repository Scanning**: ~1000 files/minute
- **Initial Indexing**: ~500 files/minute (including embeddings)

### Memory Usage Targets

- **Base Memory**: <100MB idle
- **Active Indexing**: <500MB during scan
- **Search Operations**: <50MB additional per concurrent search
- **ChromaDB**: ~10% of indexed content size

### Storage Efficiency

- **Vector Storage**: ~384 bytes per chunk (embedding size)
- **Metadata Storage**: ~1KB per chunk average
- **Index Overhead**: <10% of original repository size
- **Compression**: Text content compressed in storage

### Scalability Limits

- **Repositories**: Tested up to 100 repositories
- **Files**: Tested up to 10,000 files
- **Chunks**: Tested up to 100,000 chunks
- **Concurrent Searches**: Up to 5 simultaneous queries
- **Index Size**: Up to 1GB vector database

## Security Specifications

### Local Data Protection

- **File Access**: Only read access to configured repository paths
- **Data Isolation**: All data stored locally, no external transmission
- **Configuration Security**: Secure storage of API keys (if used)
- **Process Isolation**: Standard Node.js process security

### Git Repository Safety

- **Read-Only Access**: Never modify repository contents
- **Gitignore Respect**: Honor .gitignore and exclude patterns
- **Large File Protection**: Size limits prevent memory exhaustion
- **Branch Awareness**: Work with current checked-out branch

### API Key Management

- **Environment Variables**: Secure storage of OpenAI API keys
- **Optional Dependencies**: Function without external APIs
- **Local Fallback**: Use local embeddings when APIs unavailable
- **Key Rotation**: Support for API key updates

## Error Handling & Resilience

### Repository Scanning Errors

- **Permission Denied**: Skip inaccessible directories/files
- **Corrupted Files**: Log and continue with remaining files
- **Git Errors**: Fallback to non-Git repository scanning
- **Large Files**: Skip files exceeding size limits
- **Network Timeouts**: Local-only operation, no network dependencies

### Search Operation Errors

- **Empty Results**: Graceful handling with helpful messages
- **Vector DB Errors**: Fallback to keyword search if available
- **Parsing Errors**: Skip problematic chunks, continue operation
- **Memory Pressure**: Automatic cleanup of old cache entries

### Recovery Mechanisms

- **Incremental Rebuild**: Rebuild index for specific repositories
- **Partial Operation**: Continue with available data if some corrupted
- **Graceful Degradation**: Reduce functionality rather than fail completely
- **Automatic Retry**: Retry failed operations with exponential backoff

## Integration Specifications

### MCP Client Compatibility

- **Claude Desktop**: Full compatibility with stdio transport
- **Cursor**: Compatible via npx package execution
- **VS Code**: Future compatibility via MCP extension
- **Custom Clients**: Standard MCP protocol compliance

### Development Workflow Integration

- **Git Hooks**: Optional pre-commit index updates
- **CI/CD Integration**: Batch indexing in automation pipelines
- **IDE Extensions**: Future direct IDE integration
- **File Watchers**: Optional real-time index updates

### Export/Import Capabilities

- **Configuration Export**: JSON export of all settings
- **Index Export**: Export vector database for backup
- **Repository List**: Export/import repository configurations
- **Selective Sync**: Choose repositories to share/backup

This technical specification provides the complete technical foundation for implementing a production-ready personal repository MCP server that matches and extends ref-tools' capabilities for personal use.
