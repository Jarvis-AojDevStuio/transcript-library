---
title: "Create and edit files with Claude"
description: "Comprehensive guide on Claude's file creation and editing capabilities for various document formats"
category: "Documentation"
subcategory: "Product Features"
product_line: "Claude"
audience: "End Users"
status: "Active"
author: "Anthropic Support"
created_date: "2025-01-12"
last_updated: "2025-01-12"
tags:
  - claude
  - file-creation
  - excel
  - powerpoint
  - word
  - pdf
  - data-analysis
  - feature-preview
url: "https://support.anthropic.com/en/articles/12111783-create-and-edit-files-with-claude"
scraped_date: "2025-01-12"
domain: "support.anthropic.com"
---

# Create and edit files with Claude

Claude can now create and work with files directly in your conversations. Prompt Claude using natural language to generate Excel spreadsheets, PowerPoint presentations, Word documents, and PDF files that you can download and use immediately.

File creation is currently available as a feature preview on Claude web and desktop for users on Max, Team, and Enterprise plans. This feature preview allows you to explore these new capabilities while we refine them based on your feedback.

These new file creation capabilities make it easy to produce professional documents by simply chatting with Claude. You can create financial models in Excel with working formulas, perform advanced analyses on uploaded data, produce reports with charts and visualizations, and generate presentations from your documents — all without specialized software skills.

## How to get started

### Enabling the feature preview

**Enterprise plans:** This feature preview is disabled by default at the organization level. Owners can manually enable it in Settings > Features > Organization features by toggling **Upgraded file creation and analysis** on. Individual members still need to opt in to file creation in Settings > Features before using this feature.

**Team plans:** This feature preview is enabled by default at the organization level. Individual members still need to opt in to file creation in Settings > Features before using this feature. Owners can manually disable the feature at the organization level if desired in Settings > Features > Organization features by toggling **Upgraded file creation and analysis** off.

**Max plans:** Enable file creation from Settings > Features the chat interface by toggling **Upgraded file creation and analysis** on.

When enabled, simply describe what you need in your message. For example, you might say "Create an Excel spreadsheet to track monthly expenses" or "Convert this document into a PowerPoint presentation." Claude will generate the file, which you can then download directly from the conversation.

Start with simple tasks to familiarize yourself with Claude's capabilities, then progress to more complex workflows. Be specific in your requests—describe the structure, content, and formatting you want. You may need to review and refine Claude's outputs to meet your exact requirements.

## Supported file types

Claude can create Excel spreadsheets (.xlsx), PowerPoint presentations (.pptx), Word documents (.docx), and PDF files. You can download the files Claude creates or save them directly to Google Drive.

With this feature, Claude can also do more advanced data analysis and data science work. Claude can create Python scripts for data analysis. Claude can create data visualizations in image files like PNG. You can also upload CSV, TSV, and other files for data analysis and visualization.

The maximum file size is 30MB per file for both uploads and downloads.

## Common workflows

**Note:** Refer to [Create and edit files with Claude to eliminate hours of busy work](https://support.anthropic.com/en/articles/12143746-create-and-edit-files-with-claude-to-eliminate-hours-of-busy-work) for use cases and demo videos, and [Financial Analysis Workflows with Claude](https://support.anthropic.com/en/articles/12220298-financial-analysis-workflows-with-claude) for guidelines specific to Claude for Financial Services customers.

### Build a financial model in Excel

Generate spreadsheets with working formulas and calculations by describing your needs. Try: "Create a monthly budget tracker with income, expenses categories, and automatic calculations for savings." Claude will produce an Excel file with proper formulas, formatting, and even charts to visualize your data.

### Generate a professional report

Combine data analysis with document creation by providing your information and requirements. Try: "Create a quarterly sales report using this CSV data, including trend analysis and recommendations." Claude will analyze your data and produce a formatted Word document or PDF with charts, insights, and professional formatting.

### Convert between file formats

Change any document from one format to another while preserving or enhancing the content. Try: "Convert this Word document to a presentation" or "Explain this Excel spreadsheet in a Word report with commentary." Claude can even support workflows requiring multiple file format conversions. For instance, you could upload a CSV file and prompt Claude to create a financial model, write a memo summarizing it, and generate a PowerPoint to share the results.

### Extract and analyze PDF data

Upload a PDF containing tables or forms and ask Claude to extract the information. Try: "Extract all the data from this PDF into an Excel spreadsheet and create a summary chart." Claude will pull the data, organize it in spreadsheet format, and add visualizations for quick insights.

### Perform Complex Analyses

Upload a CSV with data and ask Claude to build a machine learning model to predict a particular outcome. Have Claude output a report summarizing what it did and the results. Claude will use python to train a model on your data, and provide an explanation of what it did, including the quality of the model, and the results.

## Security Considerations

The create files feature gives Claude a sandboxed computing environment with limited internet access. Internet access lets Claude download and use packages (e.g., npm).

It is possible for a bad actor to inconspicuously add instructions via external files or websites that trick Claude into:

1. Downloading and running untrusted code in the sandbox environment for malicious purposes.

2. Reading sensitive data from a claude.ai connected knowledge source (e.g., Remote MCP, projects) and using the sandbox environment to make an external network request to leak the data.

This means Claude can be tricked into sending information from its context (e.g., prompts, projects, data via MCP, Google integrations) to malicious third parties. To mitigate these risks, we recommend you monitor Claude while using the feature and stop it if you see it using or accessing data unexpectedly. You can report issues to us using the thumbs down function directly in claude.ai.

In line with our [safe and trustworthy agents framework](https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents), we have applied the following mitigations for individual users:

- Given you full control of the feature. You can turn it on or off at any time.

- Designed Claude to give you user-friendly summaries of its actions so you can see what it is doing. You can stop Claude's actions at any time and we recommend monitoring Claude's work while using the feature.

- Given you the ability to review and audit actions taken by Claude within the Sandbox environment.

- Disabled public sharing of conversations that include any file artifacts from the create files feature for Pro and Max users.

- Limited the duration of tasks that can be completed by Claude and the length of time you can use a single sandbox container to avoid loops of malicious activity.

- Intentionally limited the network, container, and storage resources.

- Implemented a classifier to detect prompt injections and stop execution if they are detected.

We have performed red-teaming and security testing on the feature. We have a continuous process for ongoing security testing and red-teaming of this feature. We encourage organizations to evaluate these protections against their specific security requirements when deciding whether to enable this feature.

### For Team and Enterprise administrators

In addition to the mitigations listed above, we have applied the following mitigations specifically for Team and Enterprise plans:

1. Given Team and Enterprise Admins full control over this feature.

2. Implemented sandbox isolation such that no sandbox environments are ever shared between Enterprise users.

Note that Claude can only be tricked into leaking data it has access to in a conversation via an individual user's prompt, project or activated connections.

## Allowlist

Leading \* means wildcard subdomain matching.

**Anthropic Services (Explicit):** api.anthropic.com, statsig.anthropic.com

**Version Control**

**GitHub:** github.com

**Package Managers - JavaScript/Node**

**NPM:** registry.npmjs.org, npmjs.com, npmjs.org

**Yarn:** yarnpkg.com, registry.yarnpkg.com

**Package Managers - Python:** pypi.org, files.pythonhosted.org, pythonhosted.org

## FAQ

### How does file creation work?

We have given Claude a private computing environment directly in claude.ai. This allows Claude to write and run code (for example python or javascript). It uses common code packages to create documents, spreadsheets, and slides. Users can also have Claude use its computing environment for other things like data analysis, debugging code snippets, and fun tasks like gif-creation.

### How do Claude's file creation capabilities impact usage limits?

Use of this capability draws from the same usage limits offered by your plan. Note that creating files will use more of your limit compared to normal chats with Claude.

### Can Claude work with more than one file at a time?

Claude can handle multiple files in a single chat, allowing you to create comprehensive multi-file reports and analyses. Files remain available for download throughout your conversation.

### Is file creation supported on Claude for iOS or Android?

This feature is not supported on mobile at this time. Chats with files will be accessible on mobile, but some file-related functionality will be unavailable.

### Does file creation work with the analysis tool?

Toggling **Upgraded file creation and analysis** on will automatically switch "Analysis tool" off. Enabling this feature gives you access to a new python-based data science tool which will create files, expanding on the capabilities of the previous javascript-based analysis tool.

### Do artifacts work with file creation?

Yes you are still able to create artifacts (e.g., HTML or react apps, markdown documents, mermaid diagrams, SVGs) with file creation on. Claude now uses the computing environment to create artifacts so the user experience may look slightly different than users are used to. Please report any issues or feedback using the thumbs up/down functionality in claude.ai.

---

## Related Articles

- [Claude for Marketing](https://support.anthropic.com/en/articles/9945697-claude-for-marketing)
- [Claude for Sales](https://support.anthropic.com/en/articles/9945703-claude-for-sales)
- [FAQs on Using Claude for Education at Your University](https://support.anthropic.com/en/articles/11139144-faqs-on-using-claude-for-education-at-your-university)
- [Create and edit files with Claude to eliminate hours of busy work](https://support.anthropic.com/en/articles/12143746-create-and-edit-files-with-claude-to-eliminate-hours-of-busy-work)
- [Claude Financial Analysis Solution Overview](https://support.anthropic.com/en/articles/12219959-claude-financial-analysis-solution-overview)
