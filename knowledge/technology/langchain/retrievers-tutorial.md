---
title: "LangChain Retrievers Tutorial"
description: "Comprehensive guide on building vector search and retrieval systems with LangChain, covering document loaders, embeddings, vector stores, and retrievers."
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
  - vector-search
  - embeddings
  - rag
  - document-retrieval
url: "https://python.langchain.com/docs/tutorials/retrievers/"
scraped_date: "2025-09-06"
domain: "python.langchain.com"
---

# LangChain Retrievers Tutorial

## Overview

This tutorial covers LangChain's document loader, embedding, and vector store abstractions designed to support retrieval of data from databases and other sources for integration with LLM workflows. These are fundamental for applications that fetch data to be reasoned over as part of model inference, particularly in retrieval-augmented generation (RAG).

The tutorial demonstrates building a search engine over a PDF document to retrieve passages similar to input queries.

## Core Concepts

### 1. Documents and Document Loaders

- **Documents**: Text units with associated metadata
- **Text Splitters**: Partition documents into manageable chunks
- **Embeddings**: Convert text to numeric vectors
- **Vector Stores**: Specialized databases for similarity search
- **Retrievers**: Runnables that fetch relevant documents

## Setup Requirements

### Installation

```bash
pip install langchain-community pypdf
```

### Environment Configuration

```python
# LangSmith for tracing
export LANGSMITH_TRACING="true"
export LANGSMITH_API_KEY="..."

# Or in notebook:
import getpass
import os
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_API_KEY"] = getpass.getpass()
```

## Documents and Document Loaders

### Document Structure

LangChain's Document abstraction includes:

- **page_content**: String representing the content
- **metadata**: Dict containing arbitrary metadata
- **id**: Optional string identifier

```python
from langchain_core.documents import Document

documents = [
    Document(
        page_content="Dogs are great companions, known for their loyalty and friendliness.",
        metadata={"source": "mammal-pets-doc"},
    ),
    Document(
        page_content="Cats are independent pets that often enjoy their own space.",
        metadata={"source": "mammal-pets-doc"},
    ),
]
```

### Loading PDF Documents

Using PyPDFLoader for PDF processing:

```python
from langchain_community.document_loaders import PyPDFLoader

file_path = "../example_data/nke-10k-2023.pdf"
loader = PyPDFLoader(file_path)
docs = loader.load()

print(len(docs))  # 107 pages
print(docs[0].metadata)  # {'source': '../example_data/nke-10k-2023.pdf', 'page': 0}
```

### Document Splitting

Split documents into manageable chunks for better retrieval:

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,           # Characters per chunk
    chunk_overlap=200,          # Overlap between chunks
    add_start_index=True        # Preserve character index
)
all_splits = text_splitter.split_documents(docs)
```

**Key Considerations**:

- Overlap helps maintain context between chunks
- RecursiveCharacterTextSplitter uses common separators (newlines, etc.)
- Recommended for generic text use cases

## Embeddings

### Purpose

- Convert text to numeric vectors
- Enable similarity-based search
- Support semantic search beyond keyword matching

### Available Providers

LangChain supports dozens of embedding providers:

- OpenAI
- Azure
- Google Gemini
- AWS Bedrock
- HuggingFace
- Ollama
- Cohere
- MistralAI
- NVIDIA
- And many more

### Implementation Example

```python
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model="text-embedding-3-large")

# Generate embeddings
vector_1 = embeddings.embed_query(all_splits[0].page_content)
vector_2 = embeddings.embed_query(all_splits[1].page_content)

print(f"Generated vectors of length {len(vector_1)}")  # 1536 dimensions
```

## Vector Stores

### Functionality

VectorStore objects provide methods for:

- Adding text and Document objects
- Querying using various similarity metrics
- Integration with embedding models

### Available Options

- **In-memory**: Lightweight, no infrastructure
- **Cloud-hosted**: AstraDB, Pinecone, etc.
- **Self-hosted**: Postgres, Milvus, MongoDB
- **Local**: Chroma, FAISS, Qdrant

### Basic Usage

```python
from langchain_core.vectorstores import InMemoryVectorStore

# Initialize with embeddings
vector_store = InMemoryVectorStore(embeddings)

# Index documents
ids = vector_store.add_documents(documents=all_splits)
```

### Query Methods

#### Similarity Search

```python
results = vector_store.similarity_search(
    "How many distribution centers does Nike have in the US?"
)
print(results[0])
```

#### Async Queries

```python
results = await vector_store.asimilarity_search("When was Nike incorporated?")
```

#### With Scores

```python
results = vector_store.similarity_search_with_score("What was Nike's revenue in 2023?")
doc, score = results[0]
print(f"Score: {score}")
```

#### By Vector

```python
embedding = embeddings.embed_query("How were Nike's margins impacted in 2023?")
results = vector_store.similarity_search_by_vector(embedding)
```

### Query Types

VectorStore supports multiple query types:

- **Synchronous/Asynchronous**: Different execution modes
- **String/Vector**: Query by text or pre-computed embeddings
- **With/Without scores**: Return similarity metrics
- **Similarity/MMR**: Balance relevance with diversity

## Retrievers

### Purpose

- Retrievers are Runnables (implement standard methods)
- Interface with vector stores and other data sources
- Support batch operations and async execution

### Custom Retriever

Create a simple retriever using the @chain decorator:

```python
from typing import List
from langchain_core.documents import Document
from langchain_core.runnables import chain

@chain
def retriever(query: str) -> List[Document]:
    return vector_store.similarity_search(query, k=1)

# Batch queries
retriever.batch([
    "How many distribution centers does Nike have in the US?",
    "When was Nike incorporated?",
])
```

### VectorStoreRetriever

Use the built-in retriever with configuration:

```python
retriever = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 1},
)
```

### Search Types

- **"similarity"** (default): Basic similarity search
- **"mmr"**: Maximum marginal relevance for diversity
- **"similarity_score_threshold"**: Filter by minimum score

## Advanced Retrieval Strategies

### Complex Retrieval Patterns

- **Rule-based filtering**: Infer filters from queries (e.g., "documents after 2020")
- **Linked documents**: Return related documents via taxonomy
- **Multiple embeddings**: Generate various embeddings per context
- **Ensemble methods**: Combine results from multiple retrievers
- **Weighted retrieval**: Prioritize recent or important documents

### Custom Retrievers

Extend BaseRetriever class for custom implementations:

- Override search methods
- Implement custom scoring logic
- Add preprocessing/postprocessing steps

## Integration with RAG

### Use Case

Retrievers are commonly used in RAG applications that:

1. Retrieve relevant context based on a query
2. Combine query and context into a prompt
3. Generate responses using an LLM

### Example Flow

```python
# 1. User query
query = "What was Nike's revenue in 2023?"

# 2. Retrieve relevant documents
docs = retriever.invoke(query)

# 3. Combine with prompt template
context = "\n".join([doc.page_content for doc in docs])
prompt = f"Based on the following context, answer the question:\n\nContext: {context}\n\nQuestion: {query}"

# 4. Generate response with LLM
# response = llm.invoke(prompt)
```

## Best Practices

### Document Processing

- Choose appropriate chunk sizes (typically 500-2000 characters)
- Include overlap to maintain context (10-20% of chunk size)
- Preserve metadata for filtering and attribution

### Embedding Selection

- Consider model performance vs. cost trade-offs
- Match embedding dimensions to use case requirements
- Test different models for domain-specific content

### Vector Store Configuration

- Select based on scale and infrastructure requirements
- Consider persistence needs (in-memory vs. persistent)
- Optimize similarity metrics for your use case

### Retrieval Optimization

- Experiment with different k values for top-k retrieval
- Use MMR for diverse results when needed
- Implement reranking for improved relevance
- Consider hybrid search (keyword + semantic)

## Performance Considerations

### Scaling

- Use batch operations for multiple queries
- Leverage async methods for concurrent processing
- Consider distributed vector stores for large datasets

### Caching

- Cache embeddings for frequently accessed documents
- Store preprocessed chunks to avoid repeated splitting
- Use connection pooling for database-backed stores

## Next Steps

### Related Concepts

- [Document Loaders Guide](https://python.langchain.com/docs/concepts/document_loaders/)
- [Embedding Models](https://python.langchain.com/docs/concepts/embedding_models/)
- [Vector Stores](https://python.langchain.com/docs/concepts/vectorstores/)

### Advanced Topics

- [Build a RAG App](https://python.langchain.com/docs/tutorials/rag/)
- [Self-querying retrievers](https://python.langchain.com/docs/how_to/self_query/)
- [Parent document retrievers](https://python.langchain.com/docs/how_to/parent_document_retriever/)
- [Time-weighted vector stores](https://python.langchain.com/docs/how_to/time_weighted_vectorstore/)

## Summary

This tutorial demonstrates building a semantic search engine using LangChain's retrieval components:

1. **Load documents** using specialized loaders
2. **Split content** into manageable chunks
3. **Generate embeddings** for semantic search
4. **Store vectors** in specialized databases
5. **Create retrievers** for flexible querying
6. **Integrate with LLMs** for RAG applications

The modular architecture allows mixing and matching components based on specific requirements, from simple in-memory search to production-scale distributed systems.

---

_For complete documentation and examples, visit [python.langchain.com](https://python.langchain.com/)_
