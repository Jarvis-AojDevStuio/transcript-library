---
title: "LangChain Classification (Tagging) Tutorial"
description: "Guide on using LangChain for document classification and tagging with structured output using LLMs and Pydantic models."
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
  - classification
  - tagging
  - structured-output
  - pydantic
url: "https://python.langchain.com/docs/tutorials/classification/"
scraped_date: "2025-09-06"
domain: "python.langchain.com"
---

# LangChain Classification (Tagging) Tutorial

## Overview

Tagging means labeling documents with classes such as:

- Sentiment
- Language
- Style (formal, informal, etc.)
- Covered topics
- Political tendency

Classification/tagging in LangChain uses:

- **Functions**: Specify how the model should tag a document (similar to extraction)
- **Schema**: Define how we want to tag the document

## Quickstart Implementation

### Setup

```bash
pip install -U langchain-core
```

### Basic Example with Structured Output

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field

# Define the tagging prompt
tagging_prompt = ChatPromptTemplate.from_template(
    """
Extract the desired information from the following passage.

Only extract the properties mentioned in the 'Classification' function.

Passage:
{input}
"""
)

# Define the classification schema
class Classification(BaseModel):
    sentiment: str = Field(description="The sentiment of the text")
    aggressiveness: int = Field(
        description="How aggressive the text is on a scale from 1 to 10"
    )
    language: str = Field(description="The language the text is written in")

# Create structured LLM
llm = ChatOpenAI(temperature=0, model="gpt-4o-mini")
structured_llm = llm.with_structured_output(Classification)
```

### Usage Example

```python
# Input text
inp = "Estoy increiblemente contento de haberte conocido! Creo que seremos muy buenos amigos!"

# Process
prompt = tagging_prompt.invoke({"input": inp})
response = structured_llm.invoke(prompt)

print(response)
# Output: Classification(sentiment='positive', aggressiveness=1, language='Spanish')

# Get dictionary output
print(response.model_dump())
# Output: {'sentiment': 'positive', 'aggressiveness': 1, 'language': 'Spanish'}
```

## Finer Control with Enums

For more controlled outputs, use enums to restrict possible values:

```python
class Classification(BaseModel):
    sentiment: str = Field(..., enum=["happy", "neutral", "sad"])
    aggressiveness: int = Field(
        ...,
        description="describes how aggressive the statement is, the higher the number the more aggressive",
        enum=[1, 2, 3, 4, 5],
    )
    language: str = Field(
        ..., enum=["spanish", "english", "french", "german", "italian"]
    )

# Create controlled LLM
llm = ChatOpenAI(temperature=0, model="gpt-4o-mini").with_structured_output(
    Classification
)
```

### Controlled Output Examples

```python
# Happy Spanish text
inp = "Estoy increiblemente contento de haberte conocido!"
prompt = tagging_prompt.invoke({"input": inp})
response = llm.invoke(prompt)
# Output: Classification(sentiment='happy', aggressiveness=1, language='spanish')

# Angry Spanish text
inp = "Estoy muy enojado con vos! Te voy a dar tu merecido!"
prompt = tagging_prompt.invoke({"input": inp})
response = llm.invoke(prompt)
# Output: Classification(sentiment='sad', aggressiveness=4, language='spanish')

# Neutral English text
inp = "Weather is ok here, I can go outside without much more than a coat"
prompt = tagging_prompt.invoke({"input": inp})
response = llm.invoke(prompt)
# Output: Classification(sentiment='happy', aggressiveness=1, language='english')
```

## Key Features

### Schema Definition Benefits

1. **Type Safety**: Pydantic models ensure type validation
2. **Controlled Outputs**: Enums restrict possible values
3. **Clear Descriptions**: Help the model understand properties
4. **Required Fields**: Ensure all necessary properties are returned

### Common Classification Categories

- **Sentiment Analysis**: positive, negative, neutral
- **Language Detection**: Identify text language
- **Aggression Scoring**: Numeric scale ratings
- **Topic Classification**: Categorize by subject matter
- **Style Analysis**: formal, informal, technical, casual

## Advanced Usage

### Multiple Classifications

```python
class DetailedClassification(BaseModel):
    primary_sentiment: str = Field(..., enum=["positive", "negative", "neutral"])
    secondary_sentiment: str = Field(..., enum=["excited", "calm", "angry", "sad"])
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confidence score 0-1")
    topics: list[str] = Field(..., description="List of topics covered")
    writing_style: str = Field(..., enum=["formal", "informal", "technical", "conversational"])
```

### Batch Processing

```python
texts = [
    "I love this product!",
    "This is terrible service.",
    "The documentation is comprehensive."
]

results = []
for text in texts:
    prompt = tagging_prompt.invoke({"input": text})
    result = structured_llm.invoke(prompt)
    results.append(result.model_dump())
```

## Integration with Document Processing

### Document Metadata Tagger

LangChain provides a document transformer for extracting metadata:

```python
from langchain.document_transformers import OpenAIMetadataTagger

# Use with LangChain Documents
# Applies tagging to Document objects
# Extracts and adds metadata automatically
```

## Best Practices

### 1. Schema Design

- Keep schemas simple and focused
- Use clear, descriptive field names
- Provide detailed descriptions for complex fields
- Use enums for categorical data

### 2. Prompt Engineering

- Be explicit about extraction requirements
- Include examples if needed
- Specify output format clearly

### 3. Error Handling

```python
try:
    response = structured_llm.invoke(prompt)
except Exception as e:
    print(f"Classification failed: {e}")
    # Fallback logic
```

### 4. Validation

- Validate enum values match your use case
- Test with diverse inputs
- Monitor classification accuracy

## Use Cases

### Content Moderation

```python
class ContentModeration(BaseModel):
    is_appropriate: bool = Field(..., description="Whether content is appropriate")
    categories: list[str] = Field(..., description="Violation categories if any")
    severity: int = Field(..., enum=[1, 2, 3, 4, 5], description="Severity level")
```

### Customer Feedback Analysis

```python
class FeedbackAnalysis(BaseModel):
    sentiment: str = Field(..., enum=["positive", "negative", "neutral"])
    category: str = Field(..., enum=["product", "service", "delivery", "pricing"])
    actionable: bool = Field(..., description="Whether feedback requires action")
    priority: str = Field(..., enum=["low", "medium", "high"])
```

### Document Routing

```python
class DocumentRouting(BaseModel):
    department: str = Field(..., enum=["sales", "support", "billing", "technical"])
    urgency: str = Field(..., enum=["low", "normal", "high", "critical"])
    requires_human: bool = Field(..., description="Needs human intervention")
```

## Performance Considerations

### Model Selection

- Smaller models (gpt-4o-mini) for simple classifications
- Larger models for nuanced or complex schemas
- Consider cost vs accuracy trade-offs

### Optimization Tips

- Cache classification results when possible
- Batch process similar documents
- Use streaming for real-time applications
- Monitor token usage for cost management

## Debugging with LangSmith

LangSmith traces provide visibility into:

- Actual prompts sent to the model
- Token usage
- Response time
- Classification decisions

Enable tracing:

```python
import os
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_API_KEY"] = "your-api-key"
```

## Summary

LangChain's classification/tagging system provides:

- Structured output using Pydantic models
- Type-safe classification with validation
- Flexible schema definition with enums
- Easy integration with existing workflows
- Support for complex, multi-field classifications

This approach ensures consistent, reliable document classification suitable for production applications requiring automated content analysis and categorization.

---

_For more information, see the [LangChain documentation](https://python.langchain.com/docs/)_
