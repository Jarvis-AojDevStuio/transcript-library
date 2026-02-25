---
title: "My review of Claude's new Code Interpreter, released under a very confusing name"
description: "Simon Willison's detailed review of Claude's code interpreter feature, comparing it to ChatGPT's implementation"
category: "Research"
subcategory: "Product Reviews"
product_line: "Claude"
audience: "Developers"
status: "Active"
author: "Simon Willison"
created_date: "2025-01-12"
last_updated: "2025-01-12"
tags:
  - claude
  - code-execution
  - python
  - node
  - data-analysis
  - prompt-injection
  - ai-assisted-programming
  - llm-tool-use
url: "https://simonwillison.net/2025/Sep/9/claude-code-interpreter/"
scraped_date: "2025-01-12"
domain: "simonwillison.net"
---

# My review of Claude's new Code Interpreter, released under a very confusing name

_By Simon Willison - 9th September 2025_

Today on the Anthropic blog: **[Claude can now create and edit files](https://www.anthropic.com/news/create-files)**:

> Claude can now create and edit Excel spreadsheets, documents, PowerPoint slide decks, and PDFs directly in [Claude.ai](https://claude.ai/) and the desktop app. [...]
>
> File creation is now available as a preview for Max, Team, and Enterprise plan users. Pro users will get access in the coming weeks.

Then right at the _very end_ of their post:

> This feature gives Claude internet access to create and analyze files, which may put your data at risk. Monitor chats closely when using this feature. [Learn more](https://support.anthropic.com/en/articles/12111783-create-and-edit-files-with-claude).

And tucked away half way down their [Create and edit files with Claude](https://support.anthropic.com/en/articles/12111783-create-and-edit-files-with-claude) help article:

> With this feature, Claude can also do more advanced data analysis and data science work. Claude can create Python scripts for data analysis. Claude can create data visualizations in image files like PNG. You can also upload CSV, TSV, and other files for data analysis and visualization.

Talk about [burying the lede](https://www.merriam-webster.com/wordplay/bury-the-lede-versus-lead)... this is their version of [ChatGPT Code Interpreter](https://simonwillison.net/tags/code-interpreter/), my all-time favorite feature of ChatGPT!

Claude can now write and execute custom Python (and Node.js) code in a server-side sandbox and use it to process and analyze data.

In a particularly egregious example of AI companies being terrible at naming features, the official name for this one really does appear to be **Upgraded file creation and analysis**. Sigh.

This is quite a confusing release, because Claude _already_ had a variant of this feature, [released in October 2024](https://www.anthropic.com/news/analysis-tool) with the weak but more sensible name **Analysis tool**. Here are [my notes from when that came out](https://simonwillison.net/2024/Oct/24/claude-analysis-tool/). That tool worked by generating and executing JavaScript in the user's own browser.

The new tool works entirely differently. It's much closer in implementation to OpenAI's Code Interpreter: Claude now has access to a server-side container environment in which it can run shell commands and execute Python and Node.js code to manipulate data and both read and generate files.

It's worth noting that Anthropic have a similar feature in their API called [Code execution tool](https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/code-execution-tool), but today is the first time end-users of Claude have been able to execute arbitrary code in a server-side container.

## Switching it on in settings/features

I have a Pro Plan but found the setting to enable it on the [claude.ai/settings/features](https://claude.ai/settings/features). It's possible my account was granted early access without me realizing, since the Pro plan isn't supposed to have it yet.

Interestingly, toggling on the "Upgraded file creation and analysis" option toggles off the "Analysis tool" option, and vice versa. You can't have both at the same time.

I guess this is to help reduce confusion? It surprised me though as Claude can sometimes use the existing analysis tool to help it in the creation of artifacts, as I [noted here](https://simonwillison.net/2025/Jun/25/ai-powered-apps-with-claude/) when I wrote about the Claudeception feature they added in June.

## Exploring the environment

I started by using the tool to explore the tool. Here's my [first transcript](https://claude.ai/share/d796a596-380c-4db2-847d-2eeedc620bc0) where I simply prompted the following to see what it could figure out about itself:

> `Tell me everything you can about your shell and Python environments`

And the key details it returned, each of which I've verified as true by checking the displayed output of the relevant commands:

- **OS**: Ubuntu 24.04.2 LTS (Noble) running on Linux kernel 4.4.0-
- **Architecture**: x86_64
- **Shell**: GNU Bash 5.2.21(1)-release
- **Current User**: root (with access to /home/claude directory)
- **Working Directory**: Currently in root (/), but /home/claude is the main workspace
- **Python Version**: Python 3.12.3
- **Python Executable**: /usr/bin/python3
- **Package Manager**: pip 24.0
- **Python Path**: Standard system locations including:
  - /usr/lib/python3.12 (standard library)
  - /usr/local/lib/python3.12/dist-packages (local packages)
- **Disk Space**: 4.9GB total, with 4.6GB available
- **Memory**: 9.0GB RAM available, minimal usage currently
- **Node.js**: v18.19.1 available
- **npm**: Configured with global packages in `/home/claude/.npm-global`

So we have an Ubuntu 24.04.2 container with 9GB of RAM, ~5GB of disk, Python 3.12.3, and Node.js v18.19.1.

### Network Access Investigation

How about network access? I tried the following:

> `Can you access the Internet? Can you run curl? How about using Python http to fetch https://latest.datasette.io/fixtures.json ?`

Claude tried `https://latest.datasette.io/fixtures.json` and then `https://httpbin.org/json` and got a 403 forbidden error for both, then `https://google.com` and got this curious result:

```bash
curl -s -I https://google.com
```

Output:

```
HTTP/1.1 200 OK
date: Tue, 09 Sep 2025 16:02:17 GMT
server: envoy

HTTP/2 403
content-length: 13
content-type: text/plain
date: Tue, 09 Sep 2025 16:02:17 GMT
```

Claude did note that it can still use the `web_fetch` and `web_search` containers independently of that container environment, so it should be able to fetch web content using tools running outside of the container and then write it to a file there.

On a hunch I tried this:

> `Run pip install sqlite-utils`

... and it worked! Claude can `pip install` additional packages from [PyPI](https://pypi.org/).

A little more poking around revealed the following relevant environment variables:

```
HTTPS_PROXY=http://21.0.0.167:15001
no_proxy=localhost,127.0.0.1,169.254.169.254,metadata.google.internal,*.svc.cluster.local,*.local,*.googleapis.com,*.google.com
NO_PROXY=localhost,127.0.0.1,169.254.169.254,metadata.google.internal,*.svc.cluster.local,*.local,*.googleapis.com,*.google.com
https_proxy=http://21.0.0.167:15001
http_proxy=http://21.0.0.167:15001
```

So based on an earlier HTTP header there's an [Envoy proxy](https://www.envoyproxy.io/) running at an accessible port which apparently implements a strict allowlist.

### Network Allowlist

The [help page](https://support.anthropic.com/en/articles/12111783-create-and-edit-files-with-claude#h_0ee9d698a1) includes a full description of what's on that allowlist:

**Anthropic Services (Explicit)**

- api.anthropic.com, statsig.anthropic.com

**Version Control**

- github.com

**Package Managers—JavaScript/Node**

- **NPM:** registry.npmjs.org, npmjs.com, npmjs.org
- **Yarn:** yarnpkg.com, registry.yarnpkg.com

**Package Managers—Python**

- pypi.org, files.pythonhosted.org, pythonhosted.org

So it looks like we have a _very_ similar system to ChatGPT Code Interpreter. The key differences are that Claude's system can install additional Python packages and has Node.js pre-installed.

One important limitation from the docs:

> The maximum file size is 30MB per file for both uploads and downloads.

The ChatGPT [limit here](https://help.openai.com/en/articles/8555545-file-uploads-faq) is 512MB. I've often uploaded 100MB+ SQLite database files to ChatGPT, so I'm a little disappointed by this lower limit for Claude.

## Starting with something easy

I grabbed a copy of the SQLite database behind [my TILs website](https://til.simonwillison.net/) (21.9MB [from here](https://s3.amazonaws.com/til.simonwillison.net/tils.db)) and uploaded it to Claude, then prompted:

> `Use your Python environment to explore this SQLite database and generate a PDF file containing a join diagram of all the tables`

Here's [that conversation](https://claude.ai/share/f91a95be-0fb0-4e14-b46c-792b47117a3d). It did an OK job, producing both [the PDF](https://static.simonwillison.net/static/2025/til_database_join_diagram.pdf) I asked for and a PNG equivalent.

This isn't an ideal result—those join lines are difficult to follow—but I'm confident I could get from here to something I liked with only a little more prompting. The important thing is that the system clearly works, and can analyze data in uploaded SQLite files and use them to produce images and PDFs.

## Something much harder: recreating the AI adoption chart

Thankfully I have a fresh example of a really challenging ChatGPT Code Interpreter task from just last night, which I described in great detail in [Recreating the Apollo AI adoption rate chart with GPT-5, Python and Pyodide](https://simonwillison.net/2025/Sep/9/apollo-ai-adoption/).

Short version: I took [this chart](https://www.apolloacademy.com/ai-adoption-rate-trending-down-for-large-companies/) from Apollo Global and asked ChatGPT to recreate it based on a screenshot and an uploaded XLSX file.

This time I skipped the bit where I had ChatGPT hunt down the original data and jumped straight to the "recreate this chart" step. I used the exact same prompt as I provided to ChatGPT:

> `Use this data to recreate this chart using python`

And uploaded the same two files— [this XLSX file](https://static.simonwillison.net/static/cors-allow/2025/Employment-Size-Class-Sep-2025.xlsx) and the [screenshot of the original chart](https://static.simonwillison.net/static/2025/apollo-ai-chart.jpg).

Claude wrote and ran a bunch of Python code and produced a chart with jagged lines. After several iterations including:

- `Plot it as a six survey rolling average`
- `Make those lines less jagged`
- `No not like that, I wanted the lines to be a smooth curve like in the original screenshot`
- `I did not mean smooth the rendering of the lines. I meant that I wanted curved and not straight lines between points.`

We eventually got to a satisfactory result with smooth curves between points and a properly positioned title.

(Normally if I have to argue this much with a model I'll start a fresh session and try a different prompting strategy from the start.)

I've shared [the full transcript of the chat](https://claude.ai/share/cc32d405-cb53-4e52-a1a0-9b4df4e528ac), although frustratingly the images and some of the code may not be visible. I [created this Gist](https://gist.github.com/simonw/806e1aa0e6c29ad64834037f779e0dc0) with copies of the files that it let me download.

## Prompt injection risks

ChatGPT Code Interpreter has no access to the internet at all, which limits how much damage an attacker can do if they manage to sneak their own malicious instructions into the model's context.

Since Claude Code Interpreter (I'm _not_ going to be calling it "Upgraded file creation and analysis"!) has a limited form of internet access, we need to worry about [lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) and other prompt injection attacks.

The [help article](https://support.anthropic.com/en/articles/12111783-create-and-edit-files-with-claude#h_0ee9d698a1) actually covers this in some detail:

> It is possible for a bad actor to inconspicuously add instructions via external files or websites that trick Claude into:
>
> 1. Downloading and running untrusted code in the sandbox environment for malicious purposes.
> 2. Reading sensitive data from a claude.ai connected knowledge source (e.g., Remote MCP, projects) and using the sandbox environment to make an external network request to leak the data.
>
> This means Claude can be tricked into sending information from its context (e.g., prompts, projects, data via MCP, Google integrations) to malicious third parties. To mitigate these risks, we recommend you monitor Claude while using the feature and stop it if you see it using or accessing data unexpectedly.

"We recommend you monitor Claude while using the feature" smells me to me like unfairly outsourcing the problem to Anthropic's users, but I'm not sure what more they can do!

It's interesting that they still describe the external communication risk even though they've locked down a lot of network access. My best guess is that they know that allowlisting `github.com` opens an _enormous_ array of potential exfiltration vectors.

Anthropic also note:

> We have performed red-teaming and security testing on the feature. We have a continuous process for ongoing security testing and red-teaming of this feature.

I plan to be cautious using this feature with any data that I very much don't want to be leaked to a third party, if there's even the slightest chance that a malicious instructions might sneak its way in.

## My verdict on Claude Code Interpreter so far

I'm generally very excited about this. Code Interpreter has been my most-valued LLM feature since it launched in early 2023, and the Claude version includes some upgrades on the original—package installation, Node.js support—that I expect will be very useful.

I don't particularly mark it down for taking a little more prompting to recreate the Apollo chart than ChatGPT did. For one thing I was using Claude Sonnet 4—I expect Claude Opus 4.1 would have done better. I also have a much stronger intuition for Code Interpreter prompts that work with GPT-5.

I don't think my chart recreation exercise here should be taken as showing any meaningful differences between the two.

## AI labs find explaining this feature incredibly difficult

I find it _fascinating_ how difficult the AI labs find describing this feature to people! OpenAI went from "Code Interpreter" to "Advanced Data Analysis" and maybe back again? It's hard to even find their official landing page for that feature now. (I [got GPT-5 to look for it](https://chatgpt.com/share/68c070ff-fe9c-8006-91b5-cff799253836) and it hunted for 37 seconds and settled on the help page for [Data analysis with ChatGPT](https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt)).

Anthropic already used the bad name "Analysis tool" for a different implementation, and now have the somehow-worse name "Upgraded file creation and analysis". Their launch announcement avoids even talking about code execution, focusing exclusively on the tool's ability to generate spreadsheets and PDFs!

I wonder if any of the AI labs will crack the code on how to name and explain this thing? I feel like it's still a very under-appreciated feature of LLMs, despite having been around for more than two years now.
