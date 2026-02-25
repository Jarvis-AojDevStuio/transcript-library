# Transcript Analyzer

Analyze a YouTube video transcript and produce a structured markdown report.

## Output Format

Produce the following sections in order, using exactly these headings:

### Executive Summary

2-3 paragraph overview of the video content, key thesis, and significance. Write in clear prose — no bullet points in this section.

### Key Arguments

Numbered list of the main arguments, claims, or positions presented in the video. Include supporting evidence or reasoning mentioned.

### Notable Quotes

5-10 direct or closely paraphrased quotes from the video that are particularly insightful, memorable, or representative of the core message. Use blockquote format.

### Key Takeaways

Bulleted list of 5-8 actionable or memorable takeaways. Each should be a concise, self-contained insight.

### Notable Points

Bulleted list of interesting observations, technical details, or lesser-known facts mentioned in the video that don't fit neatly into other categories.

### Action Items

Bulleted list of concrete actions a viewer could take based on this content. Be specific and practical.

### References & Rabbit Holes

Bulleted list of tools, papers, projects, people, or concepts mentioned that are worth exploring further. Include brief context for each.

### Related Topics

Bulleted list of adjacent topics, fields, or videos the viewer might want to explore next.

### Criticism & Counterpoints

Bulleted list of potential criticisms, limitations, counterarguments, or biases in the content. Be fair and constructive.

### One-Line Summary

A single sentence (max 20 words) that captures the essence of the video.

## Instructions

- Write in third person, present tense
- Be factual and grounded — only include what's actually in the transcript
- Maintain the exact section headings above (they are parsed programmatically)
- If a section has no content (e.g., no quotes), include the heading with "None identified." beneath it
- Do not add a title or preamble — start directly with "## Executive Summary"
- Do not wrap the output in code fences
