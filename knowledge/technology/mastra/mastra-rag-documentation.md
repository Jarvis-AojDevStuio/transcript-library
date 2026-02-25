---
title: "Mastra RAG Documentation"
description: "Comprehensive documentation for Mastra's RAG capabilities including document processing, vector storage, agents, and advanced features."
category: "Technical Documentation"
subcategory: "API Integration"
product_line: "Desktop Commander"
audience: "Developers"
status: "Active"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - mastra
  - rag
  - vector-database
  - document-processing
  - ai-agents
---

# Mastra RAG Documentation

This documentation provides comprehensive examples and reference for using Mastra's RAG (Retrieval-Augmented Generation) capabilities.

## Table of Contents

1. [Basic Setup](#basic-setup)
2. [Core Components](#core-components)
3. [Document Processing](#document-processing)
4. [Vector Storage](#vector-storage)
5. [RAG Agents](#rag-agents)
6. [Advanced Features](#advanced-features)
7. [Examples](#examples)

## Basic Setup

### Environment Variables

```bash
OPENAI_API_KEY=your_openai_api_key_here
POSTGRES_CONNECTION_STRING=your_connection_string_here
```

### Installation

```bash
npm install @mastra/rag
```

### Core Dependencies

```typescript
import { openai } from "@ai-sdk/openai";
import { Mastra } from "@mastra/core";
import { Agent } from "@mastra/core/agent";
import { PgVector } from "@mastra/pg";
import { MDocument, createVectorQueryTool } from "@mastra/rag";
import { embedMany } from "ai";
```

## Core Components

### MDocument Class

The `MDocument` class is the foundation for document processing in Mastra RAG:

```typescript
import { MDocument } from '@mastra/rag';

// From text
const doc = MDocument.fromText("Your document text here...");

// From markdown
const doc = MDocument.fromMarkdown("# Your markdown content...");

// From HTML
const doc = MDocument.fromHTML(`
<div>
    <h1>h1 content...</h1>
    <p>p content...</p>
</div>
`);

// From JSON
const testJson = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com"
};
const doc = MDocument.fromJSON(JSON.stringify(testJson));

// Basic instance
const doc = new MDocument({
  text: 'Document content',
  metadata: { source: 'example.txt' },
});
```

## Document Processing

### Basic Chunking

```typescript
// Basic chunking with defaults
const chunks = await doc.chunk();

// Text chunking
const doc = MDocument.fromText("Your plain text content...");
const chunks = await doc.chunk();
```

### Advanced Chunking Strategies

#### Recursive Strategy

```typescript
const chunks = await doc.chunk({
  strategy: "recursive",
  size: 512,
  overlap: 50,
  separator: "\n"
});
```

#### Markdown Strategy

```typescript
const chunks = await doc.chunk({
  strategy: "markdown",
  headers: [
    ["#", "title"],
    ["##", "section"],
  ],
  stripHeaders: true,
  overlap: 50,
});

// With metadata extraction
const chunksWithMetadata = await doc.chunk({
  strategy: "markdown",
  headers: [
    ["#", "title"],
    ["##", "section"],
  ],
  extract: {
    summary: true,
    keywords: true,
  },
});
```

#### HTML Strategy

```typescript
const chunks = await doc.chunk({
  strategy: "html",
  headers: [
    ["h1", "Header 1"],
    ["p", "Paragraph"],
  ],
  sections: [["div.content", "main"]],
  size: 500,
});
```

#### Token Strategy

```typescript
const chunks = await doc.chunk({
  strategy: "token",
  encodingName: "gpt2",
  modelName: "gpt-3.5-turbo",
  size: 1000,
});
```

#### JSON Chunking

```typescript
const chunks = await doc.chunk({
  maxSize: 100
});
```

### Chunking with Metadata Extraction

```typescript
const chunks = await doc.chunk({
  strategy: "recursive",
  size: 512,
  overlap: 50,
  separator: "\n",
  extract: {
    keywords: true
  },
});
```

## Vector Storage

### Complete RAG Workflow

```typescript
// 1. Initialize document
const doc = MDocument.fromText(`Your document text here...`);

// 2. Create chunks
const chunks = await doc.chunk({
  strategy: "recursive",
  size: 512,
  overlap: 50,
});

// 3. Generate embeddings
const { embeddings } = await embedMany({
  values: chunks.map((chunk) => chunk.text),
  model: openai.embedding("text-embedding-3-small"),
});

// 4. Store in vector database
const pgVector = new PgVector({
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
});
await pgVector.upsert({
  indexName: "embeddings",
  vectors: embeddings,
});

// 5. Query similar chunks
const results = await pgVector.query({
  indexName: "embeddings",
  queryVector: queryVector,
  topK: 3,
});

console.log("Similar chunks:", results);
```

### Vector Store Setup

```typescript
const pgVector = new PgVector({
  connectionString: process.env.POSTGRES_CONNECTION_STRING!,
});

// Create index
await vectorStore.createIndex({
  indexName: "embeddings",
  dimension: 1536
});

// Upsert embeddings with metadata
await vectorStore.upsert({
  indexName: "embeddings",
  vectors: embeddings,
  metadata: chunks?.map((chunk: any) => ({ text: chunk.text }))
});
```

## RAG Agents

### Basic RAG Agent

```typescript
const vectorQueryTool = createVectorQueryTool({
  vectorStoreName: "pgVector",
  indexName: "embeddings",
  model: openai.embedding("text-embedding-3-small"),
});

export const ragAgent = new Agent({
  name: "RAG Agent",
  instructions: `You are a helpful assistant that answers questions based on the provided context.`,
  model: openai("gpt-4o-mini"),
  tools: {
    vectorQueryTool
  }
});
```

### Agent with Metadata Filtering

```typescript
import { PGVECTOR_PROMPT } from "@mastra/pg";

export const ragAgent = new Agent({
  name: "RAG Agent",
  model: openai("gpt-4o-mini"),
  instructions: `
  You are a helpful assistant that answers questions based on the provided context.

  Filter the context by searching the metadata.

  The metadata is structured as follows:

  {
    text: string,
    excerptKeywords: string,
    nested: {
      keywords: string[],
      id: number,
    },
  }

  ${PGVECTOR_PROMPT}

  Important: When asked to answer a question, please base your answer only on the context provided in the tool.
  If the context doesn't contain enough information to fully answer the question, please state that explicitly.
  `,
  tools: { vectorQueryTool },
});
```

### Mastra Instance Setup

```typescript
export const mastra = new Mastra({
  agents: { ragAgent },
  vectors: { pgVector },
});

const agent = mastra.getAgent("ragAgent");
```

### Querying the Agent

```typescript
const prompt = `
[Insert query based on document here]
Please base your answer only on the context provided in the tool.
If the context doesn't contain enough information to fully answer the question, please state that explicitly.
`;

const completion = await agent.generate(prompt);
console.log(completion.text);
```

## Advanced Features

### Document Chunking Tool

```typescript
import { createDocumentChunkerTool } from "@mastra/rag";

const documentChunkerTool = createDocumentChunkerTool();

const ragAgent = new Agent({
  name: "RAG Agent",
  instructions: `You are a helpful assistant that handles both querying and cleaning documents.
    When cleaning: Process, clean, and label data, remove irrelevant information and deduplicate content while preserving key facts.
    When querying: Provide answers based on the available context.`,
  model: openai("gpt-4o-mini"),
  tools: {
    vectorQueryTool,
    documentChunkerTool,
  },
});
```

### Data Optimization and Cleaning

```typescript
// Clean and optimize RAG data
const chunkPrompt = `Use the tool provided to clean the chunks. Make sure to filter out irrelevant information that is not space related and remove duplicates.`;

const newChunks = await agent.generate(chunkPrompt);
const updatedDoc = MDocument.fromText(newChunks.text);

const updatedChunks = await updatedDoc.chunk({
  strategy: "recursive",
  size: 256,
  overlap: 50,
  separator: "\n"
});

const { embeddings: cleanedEmbeddings } = await embedMany({
  model: openai.embedding("text-embedding-3-small"),
  values: updatedChunks.map((chunk) => chunk.text)
});

// Update the vector store with cleaned embeddings
await vectorStore.deleteIndex({ indexName: "embeddings" });
await vectorStore.createIndex({
  indexName: "embeddings",
  dimension: 1536
});

await vectorStore.upsert({
  indexName: "embeddings",
  vectors: cleanedEmbeddings,
  metadata: updatedChunks?.map((chunk: any) => ({ text: chunk.text }))
});
```

### Graph RAG

#### Basic GraphRAG Usage

```typescript
import { GraphRAG } from "@mastra/rag";

const graphRag = new GraphRAG({
  dimension: 1536,
  threshold: 0.7,
});

// Create the graph from chunks and embeddings
graphRag.createGraph(documentChunks, embeddings);

// Query the graph with embedding
const results = await graphRag.query({
  query: queryEmbedding,
  topK: 10,
  randomWalkSteps: 100,
  restartProb: 0.15,
});
```

#### Advanced GraphRAG

```typescript
const graphRag = new GraphRAG({
  dimension: 1536,
  threshold: 0.8, // Stricter similarity threshold
});

// Create graph from chunks and embeddings
graphRag.createGraph(documentChunks, embeddings);

// Query with custom parameters
const results = await graphRag.query({
  query: queryEmbedding,
  topK: 5,
  randomWalkSteps: 200,
  restartProb: 0.2,
});
```

#### GraphRAG Tool

```typescript
import { createGraphRAGTool } from "@mastra/rag";

const graphRagTool = createGraphRAGTool({
  vectorStoreName: "pgVector",
  indexName: "embeddings",
  model: openai.embedding("text-embedding-3-small"),
  graphOptions: {
    dimension: 1536,
    threshold: 0.7,
  },
});

// With advanced options
const advancedGraphTool = createGraphRAGTool({
  vectorStoreName: "pinecone",
  indexName: "docs",
  model: openai.embedding("text-embedding-3-small"),
  graphOptions: {
    dimension: 1536,
    threshold: 0.8,
    randomWalkSteps: 200,
    restartProb: 0.2
  },
  description: "Analyze document relationships to find complex patterns and connections"
});
```

#### GraphRAG Agent

```typescript
const ragAgent = new Agent({
  name: "GraphRAG Agent",
  instructions: `You are a helpful assistant that answers questions based on the provided context. Format your answers as follows:

1. DIRECT FACTS: List only the directly stated facts from the text relevant to the question (2-3 bullet points)
2. CONNECTIONS MADE: List the relationships you found between different parts of the text (2-3 bullet points)
3. CONCLUSION: One sentence summary that ties everything together

Keep each section brief and focus on the most important points.`,
  model: openai("gpt-4o-mini"),
  tools: {
    graphRagTool,
  },
});
```

### Reranking

```typescript
import { rerank } from "@mastra/rag";

// Get initial results from vector search
const initialResults = await pgVector.query({
  indexName: "embeddings",
  queryVector: queryEmbedding,
  topK: 10,
});

// Rerank the results
const rerankedResults = await rerank(initialResults, query);

// Display comparison
console.log("Initial Results:");
initialResults.forEach((result, index) => {
  console.log(`Result ${index + 1}:`, {
    text: result.metadata.text,
    score: result.score
  });
});

console.log("Re-ranked Results:");
rerankedResults.forEach(({ result, score, details }, index) => {
  console.log(`Result ${index + 1}:`, {
    text: result.metadata.text,
    score: score,
    semantic: details.semantic,
    vector: details.vector,
    position: details.position
  });
});
```

### Workflows

#### Basic RAG Workflow

```typescript
import { Step, Workflow } from "@mastra/core/workflows";
import { z } from "zod";

export const ragWorkflow = new Workflow({
  name: "rag-workflow",
  triggerSchema: z.object({
    query: z.string()
  })
});
```

#### Chain of Thought RAG Steps

```typescript
// Breakdown step
const breakdownThoughts = new Step({
  id: "breakdownThoughts",
  outputSchema: z.object({
    breakdown: z.string(),
  }),
  execute: async ({ context, mastra }) => {
    const ragAgent = mastra?.getAgent("ragAgent");
    const query = context?.triggerData?.query;
    const breakdownPrompt = `
        Question: ${query}
        1. Break down this question into key components that need to be addressed.
        2. Identify what specific information you need to look for in the retrieved chunks.
    `;

    const breakdown = await ragAgent?.generate(breakdownPrompt);
    console.log(breakdown?.text);
    return {
      breakdown: breakdown?.text ?? "",
    };
  },
});

// Connection step
const connectPieces = new Step({
  id: "connectPieces",
  outputSchema: z.object({
    connections: z.string(),
  }),
  execute: async ({ context, mastra }) => {
    const ragAgent = mastra?.getAgent("ragAgent");
    const process = context?.getStepResult<{
      breakdown: string;
    }>("breakdownThoughts")?.breakdown;
    const connectionPrompt = `
        Based on the breakdown: ${process}
        3. Explain how you're connecting different pieces from the retrieved chunks.
    `;

    const connections = await ragAgent?.generate(connectionPrompt);
    console.log(connections?.text);
    return {
      connections: connections?.text ?? "",
    };
  },
});

// Conclusion step
const drawConclusions = new Step({
  id: "drawConclusions",
  outputSchema: z.object({
    conclusions: z.string(),
  }),
  execute: async ({ context, mastra }) => {
    const ragAgent = mastra?.getAgent("ragAgent");
    const evidence = context?.getStepResult<{
      connections: string;
    }>("connectPieces")?.connections;
    const conclusionPrompt = `
        Based on the connections: ${evidence}
        4. Draw conclusions based only on the evidence in the retrieved context.
    `;

    const conclusions = await ragAgent?.generate(conclusionPrompt);
    console.log(conclusions?.text);
    return {
      conclusions: conclusions?.text ?? "",
    };
  },
});

// Final answer step
const finalAnswer = new Step({
  id: "finalAnswer",
  outputSchema: z.object({
    finalAnswer: z.string(),
  }),
  execute: async ({ context, mastra }) => {
    const ragAgent = mastra?.getAgent("ragAgent");
    const conclusions = context?.getStepResult<{
      conclusions: string;
    }>("drawConclusions")?.conclusions;
    const answerPrompt = `
        Based on the conclusions: ${conclusions}
        Format your response as:
        THOUGHT PROCESS:
        - Step 1: [Initial analysis of retrieved chunks]
        - Step 2: [Connections between chunks]
        - Step 3: [Reasoning based on chunks]

        FINAL ANSWER:
        [Your concise answer based on the retrieved context]`;

    const finalAnswer = await ragAgent?.generate(answerPrompt);
    console.log(finalAnswer?.text);
    return {
      finalAnswer: finalAnswer?.text ?? "",
    };
  },
});
```

#### Executing Workflows

```typescript
const query = "What are the main adaptation strategies for farmers?";

console.log("\nQuery:", query);
const prompt = `
    Please answer the following question:
    ${query}

    Please base your answer only on the context provided in the tool. If the context doesn't contain enough information to fully answer the question, please state that explicitly.
    `;

const { runId, start } = ragWorkflow.createRun();

console.log("Run:", runId);

const workflowResult = await start({
  triggerData: {
    query: prompt,
  },
});
console.log("\nThought Process:");
console.log(workflowResult.results);
```

## Examples

### Example Queries

#### Basic Queries

```typescript
// Simple query
const queryOne = "What are the adaptation strategies mentioned?";
const answerOne = await agent.generate(queryOne);
console.log("\nQuery:", queryOne);
console.log("Response:", answerOne.text);

// Technology query
const query = "What are all the technologies mentioned for space exploration?";
const response = await agent.generate(query);
console.log("\nQuery:", query);
console.log("Response:", response.text);
```

#### Metadata-based Queries

```typescript
// Metadata field query
const queryTwo = 'Show me recent sections. Check the "nested.id" field and return values that are greater than 2.';
const answerTwo = await agent.generate(queryTwo);
console.log("\nQuery:", queryTwo);
console.log("Response:", answerTwo.text);

// Regex search
const queryThree = 'Search the "text" field using regex operator to find sections containing "temperature".';
const answerThree = await agent.generate(queryThree);
console.log("\nQuery:", queryThree);
console.log("Response:", answerThree.text);
```

#### Graph RAG Queries

```typescript
const queryOne = "What are the direct and indirect effects of early railway decisions on Riverdale Heights' current state?";
const answerOne = await ragAgent.generate(queryOne);
console.log("\nQuery:", queryOne);
console.log("Response:", answerOne.text);

const queryTwo = "How have changes in transportation infrastructure affected different generations of local businesses and community spaces?";
const answerTwo = await ragAgent.generate(queryTwo);
console.log("\nQuery:", queryTwo);
console.log("Response:", answerTwo.text);

const queryThree = "Compare how the Rossi family business and Thompson Steel Works responded to major infrastructure changes, and how their responses affected the community.";
const answerThree = await ragAgent.generate(queryThree);
console.log("\nQuery:", queryThree);
console.log("Response:", answerThree.text);

const queryFour = "Trace how the transformation of the Thompson Steel Works site has influenced surrounding businesses and cultural spaces from 1932 to present.";
const answerFour = await ragAgent.generate(queryFour);
console.log("\nQuery:", queryFour);
console.log("Response:", answerFour.text);
```

### Sample Documents

#### Climate Change Document

```typescript
const doc = MDocument.fromText(
  `The Impact of Climate Change on Global Agriculture...`,
);
```

#### Trading/Baseball Cards Document

```typescript
const doc1 = MDocument.fromText(`
market data shows price resistance levels.
technical charts display moving averages.
support levels guide trading decisions.
breakout patterns signal entry points.
price action determines trade timing.

baseball cards show gradual value increase.
rookie cards command premium prices.
card condition affects resale value.
authentication prevents fake trading.
grading services verify card quality.

volume analysis confirms price trends.
sports cards track seasonal demand.
chart patterns predict movements.
mint condition doubles card worth.
resistance breaks trigger orders.
rare cards appreciate yearly.
`);
```

#### Community Development Study

```typescript
const doc = MDocument.fromText(`
# Riverdale Heights: Community Development Study
// ... extensive text content ...
`);
```

### Running Examples

```bash
# Basic setup
git clone https://github.com/mastra-ai/mastra
cd examples/basics/rag/[example-name]

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env

# Run the example
pnpm start
```

## Error Handling

### Vector Store Error Handling

```typescript
try {
  await store.query({
    indexName: "my_index",
    queryVector: queryVector,
  });
} catch (error) {
  if (error.message.includes("Invalid index name")) {
    console.error("Index name must start with a letter or underscore and contain only valid characters.");
  } else if (error.message.includes("Index not found")) {
    console.error("The specified index does not exist");
  } else {
    console.error("Vector store error:", error.message);
  }
}
```

### General Error Handling

```typescript
try {
  await store.query({
    tableName: "my_vectors",
    queryVector: queryVector,
  });
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
```

## API Reference

### QueryResult Interface

```typescript
interface QueryResult {
  id: string;
  score: number;
  metadata: Record<string, any>;
  vector?: number[]; // Only included if includeVector is true
}
```

### GraphRAG Constructor

```typescript
GraphRAG Constructor:
  dimension: number (Optional, Default: 1536)
    Dimension of the embedding vectors
  threshold: number (Optional, Default: 0.7)
    Similarity threshold for creating edges between nodes (0-1)
```

### GraphRAG Methods

#### createGraph

```typescript
createGraph(chunks: GraphChunk[], embeddings: GraphEmbedding[]): void
  chunks: GraphChunk[] (Required)
    Array of document chunks with text and metadata
  embeddings: GraphEmbedding[] (Required)
    Array of embeddings corresponding to chunks
```

#### query

```typescript
query({
  query,
  topK = 10,
  randomWalkSteps = 100,
  restartProb = 0.15
}: {
  query: number[];
  topK?: number;
  randomWalkSteps?: number;
  restartProb?: number;
}): RankedNode[]
  Parameters:
    query: number[] (Required)
      Query embedding vector
    topK: number (Optional, Default: 10)
      Number of results to return
    randomWalkSteps: number (Optional, Default: 100)
      Number of steps in random walk
    restartProb: number (Optional, Default: 0.15)
      Probability of restarting walk from query node
  Returns: RankedNode[]
    id: string
      Unique identifier for the node
    content: string
      Text content of the document chunk
    metadata: Record<string, any>
      Additional metadata associated with the chunk
    score: number
      Combined relevance score from graph traversal
```

### createGraphRAGTool Return Value

```typescript
Returns: object
  relevantContext: string - Combined text from the most relevant document chunks, retrieved using graph-based ranking
  sources: QueryResult[] - Array of full retrieval result objects. Each object contains all information needed to reference the original document, chunk, and similarity score.
```

### Chunking Strategy Options

#### Markdown Strategy

```typescript
Markdown Strategy Options:
  headers: Array<[string, string]>
    description: Array of [header level, metadata key] pairs
  stripHeaders: boolean (optional)
    description: Whether to remove headers from the output
  returnEachLine: boolean (optional)
    description: Whether to return each line as a separate chunk
```

### Vector Store Operations

#### Delete Table

```typescript
deleteTable(tableName: string)
  tableName: string - Name of the table to delete
```

## Recent Updates

### RAG Package Updates (2025-03-25)

- Upgraded Node.js types to v20.17.27
- Updated ESLint to v9.23.0
- Updated Vitest to v3.0.9
- Updated core package dependencies to latest alpha versions

#### Input Validation and Error Handling

- Updated input schema validation for vector query tools:
  - Added number coercion for `topK` parameter to ensure consistent numeric values
  - Added string coercion for `filter` parameter to handle various input formats
- Enhanced error handling and logging in GraphRAG and Vector Query tools:
  - Improved filter parsing error messages
  - Added more detailed debug logging for query parameters
  - Switched to using centralized logger instance
- Updated vector store access pattern to use `getVector()` method instead of direct property access for better encapsulation

This documentation covers the comprehensive RAG capabilities in Mastra, from basic document processing to advanced graph-based retrieval and workflow orchestration.
