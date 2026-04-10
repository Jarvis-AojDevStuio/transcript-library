---
video_id: "eFCHwtufjJc"
title: "How To Use NotebookLM - 7 Crazy Ways"
channel: "AI LABS"
topic: "ai-llms"
published_date: "2026-02-13"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=eFCHwtufjJc"
duration: 677
word_count: 2393
---
Are AI agents getting weaker or are they
just working with bad information? The
main problem with agents is their
context. It's not that agents don't have
information or can't remember things,
but that they are not grounded with a
controlled source of truth. This means
that working with bad information is the
reason they perform so poorly. Now, you
might know about Google's Notebook LM,
which is a tool that does extremely good
research and is also a podcast
generator. But what if it were much more
than that? Our team tried to take this
research tool and test it from various
angles to find a way to make it fit into
our development workflows. And honestly,
we didn't expect it to fit in that well.
Throughout the video, our team used
Notebook LM through its CLI tool. It's
an interface for the product that gives
you full control over managing your
notebooks, sources, and audio reviews
from the notebook sources. The
installation is straightforward. Just
one command, and it was done. Now, once
it's installed, you can verify the
installation by running the help
command. This shows all the available
commands for controlling the sources for
notebook LM handling multimodal inputs
and all the functions you can perform
with the tool. But before using it,
authenticate the CLI with your Google
account using the NLM O command. Once
you run it, a Chrome window opens and
you sign in. After that, NLM saves your
credentials for future use. Notebook LM
can be accessed through the CLI and MCP,
both built by the same developer, but
you can use whichever you prefer. We
chose the CLI because it's token
efficient and won't be a problem when
it's run on long horizon tasks. We can
use notebook LM as a second brain for AI
agents by giving it information
regarding the codebase and letting it
document things as it goes. Now to do
this, we added instructions in the
claude.md file and told it that all
project knowledge, architectural
decisions, and all other documentation
should live in the notebook. This
notebook was a single source of truth.
We used Claude to create the notebook
using the CLI tool and saved its ID in
the claude.m MD. So when we were working
on a feature for the app, we used plan
mode to plan it out first. After
implementation, when the build passed,
it updated the notebook with the feature
implementation as instructed. The
notebook it created contained all of the
decisions that Claude took along the
way. Setting this up as a second brain
means Claude doesn't need to search
through a large number of documents on
its own. Reading it by pattern matching
and bloating context with unwanted
information. Instead, it relied on the
notebook LM's rag capabilities to get
exactly what it needed. So, Claude gets
synthesized answers from Gemini, not raw
dumps, and it can focus on the
development and implementation more. You
can also share the notebook with anyone,
and they can use Notebook LM's
capabilities to make sure the
implementation is on par with what they
need, even if they're non-technical,
letting them understand the technical
details at their own pace. Notebook LM
is designed for research across multiple
sources. So since we use Claude code a
lot for research already, we provided
the research topic we were working on
and asked Claude to find the sources,
create a new notebook and upload them
there. It identified all the sources and
uploaded them to the notebook it had
created for this task. Research with
Claude takes up a lot of context because
it also looks through links that it
later identifies as unrelated. Splitting
the research into two parts and letting
a tool designed for the job handle it
saved both time and tokens. Once the
sources were in the notebook, we cleared
the context so that it does not have the
context of the research and asked Claude
to look up the information on notebook
LM using the CLI, find the one with the
rag pipeline research and get the key
findings from it through the notebook LM
chat. Claude used the CLI tool to fetch
the notebooks, sent a chat message to
get the key findings and returned the
output. This happened much faster than
normal Claude research. And the benefit
we get out of using the notebook is that
if we want more information from the
same research, we can go back to the
notebook because the sources are saved
in it. So Claude doesn't have to search
for them again because this research is
now available externally. If we were
just doing it with Claude alone, we
wouldn't be able to refer back to the
sources unless we repeated the research
and Claude found and queried them all
over again. But this allows us to reuse
them in future runs. Understanding
[snorts] a codebase that's not written
by you is the toughest part of
development work. And in order to
simplify that, we also used notebook LM.
For doing this, we asked Claude to clone
the repository using the GitHub CLI. And
once the repo had been cloned, we asked
it to use repo mix to generate a
document for this repo. Now, repoMix is
the tool that packs a codebase into an
AI friendly format. You can either use
the web interface to convert the code to
documents in multiple formats which AI
can use to understand the codebase
easily in token efficient manner. But we
used the repo mix CLI. We installed it
using npm and once done the reperomix
CLI was available globally. So we asked
claude to create a notebook on notebook
LM using the CLI tool and add the
formatted document as a source for this
notebook. Once it had cloned the repo,
it used the repo mix CLI tool to convert
the code to a token efficient document
and then created a new notebook and
added the source in txt format. Now the
source had been added. We asked Claude
to use the notebook tools to visualize
the codebase and create diagrams that
would help us understand what's in the
codebase. It ran a series of
visualization commands. And once the
diagrams were completed, we could view
them in the studio on notebook LM. It
created an atlas that acts as a guide
for the project's key workings. It
created a proper mind map for each
aspect of the app and allowed us to chat
about each individually. There were also
infographics created where we could see
the different aspects visualized making
it easier to understand the codebase
visually instead of relying on textual
responses by claude. Now before we move
forwards let's have a word from our
sponsor make the platform that empowers
teams to realize their full potential by
building and accelerating their business
with AI. We all know the biggest risk
with autonomous agents is the blackbox
problem. You deploy them but you can't
verify their decisions. Make has solved
this, combining AI assisted noode
capabilities with over 3,000 pre-built
applications to give you a true glassbox
approach. For this video, I'm using
their pre-built market research analyst
agent to show how you can finally scale
with control alongside powerful tools
like make grid, MCP, and advanced
analytics. The game changer here is the
reasoning panel. It lets you watch the
agents logic step by step, ground its
responses using the knowledge feature,
and debug live with the chat tool
directly in the canvas. It's the
transparency developers have been
waiting for. Stop guessing and start
scaling with control. Click the link in
the pinned comment to experience the new
make agents today. Whenever [snorts] AI
hits an issue that's not in its
knowledge base, it uses web searches and
narrows down resources to find a
solution. So, we wondered whether we
could skip the web searches entirely and
replace it with a knowledge base. The
problem with web search is that Claude
pulls in a bunch of sources, but only a
few of them actually matter. The rest
just waste tokens. So, we asked Claude
to create a new notebook on Notebook LM
and add sources from documentation,
communities, and solutions across
platforms that could make this notebook
a go-to place for debugging. It created
the notebook and started looking for
sources to add. By the end, the notebook
had official documentation, community
forums, GitHub repos, blogs, and other
relevant references that could act as a
knowledge base for debugging related
issues. We added the ID of the notebook
in the claude.md file and told claude to
use it as a source for all the debugging
issues it might face. We also added the
instruction that whenever it hits a bug,
it should rely on the notebook first
before searching the web. With this in
place, whenever it came across an error,
for example, the deprecated middleware
it had used in the project, it handled
it differently. If it would have
resolved it normally, it would first
fetch the documentation and then use it
to fix the issue. but instead it just
queried the notebook with a specific
question on how to migrate to the latest
proxy all by just using the notebook and
getting a structured response back
instead of fetching results from the
whole web. Now this claude.md along with
all the other resources are available in
AIABS Pro. For those who don't know,
it's our recently launched community
where you get ready to use templates,
prompts, all the commands and skills
that you can plug directly into your
projects for this video and all previous
ones. If you found value in what we do
and want to support the channel, this is
the best way to do it. Links in the
description. We always start the AI
development process by writing
documentation. So, we thought about
pushing those documents to Notebook LM
as well. When we were working on an
application, we created documents. And
once they were ready, we asked Claude to
create another notebook on notebook LM
and push all the documents as sources
for that notebook. So, it created a
notebook and added all of the sources to
notebook LM. Once we had these sources,
they became organized and reliable,
helping Claude understand things about
the project. And if we're working with
non-technical people, we can just share
this notebook and let anyone with access
chat with it and understand things on
their own. And this notebook doesn't
only help Claude. If you're using other
tools like cursor, Gemini, CLI, or
anyone else is building along with you,
this notebook can work as a knowledge
base for them as well. Because with the
notebook chat, each agent can get
information that's specific to what they
need instead of relying on file tools to
search through files. This way, Claude
or any other agent can just use the NLM
notebook query tool, ask for what's
related to what they need at the moment
and build their context from that. Also,
if you are enjoying our content,
consider pressing the hype button
because it helps us create more content
like this and reach out to more people.
Now, we [snorts] already saw how we can
use it to onboard ourselves onto a
codebase, but we wanted to see if those
same visualizations could help agents,
too. So, we asked Claude to create
another notebook and create
visualizations that would help the agent
find its way around the code. So, it
created a notebook and added mind maps,
infographics, data tables, and several
sources to notebook LM, and downloaded
them into the visualizations folder in
the project. It had several formats for
the agents understanding including
tables in CSV and markdown files and it
also contained JSON files for the mind
maps. So what it did was create mind
maps for all of these features. These
were the ones we saw that it had
exported as JSON files. It also created
a full slide deck to aid visual
understanding. Whenever it ran into
anything that it needed to check, it
checked the respective mind map for it
instead of crawling through the file
system from which it found the exact
flow and queried the notebook for what
it needed. Similarly, it checked
endpoints, analyzed flows, and queried
the notebook using the JSON exported
mind maps instead of relying on
navigating around the code base to do
it. [snorts] Another way we can use
notebook LM is for adding all the
security related issues that we commonly
face with AI generated websites by
grounding them in proper sources. So, we
asked Claude to create a notebook using
the CLI tool and add feature specs and
all the relevant sources related to
security. The purpose of this notebook
is to act as a security handbook for
Claude so that whenever it runs into any
issues, it can refer to this for help.
It created the notebook and added all
the sources. It included custom security
guides and cheat sheets from OASP,
security measures built by the tech
stack we're using from GitHub, CVE
databases, and the other resources
needed to ensure the security of the
app. The notebook it created had 61
sources, all in different files
containing security advisories from
several sources. Using this, when we
asked Claude to do a quick security
check, it used the handbook, generated a
security report, and identified several
issues with different severities, like
the floating point error in the
transactions that it detected in the app
that could be severe if transactions are
in high amounts. It was able to do so
because the check was grounded in
research from Notebook LM. That brings
us to the end of this video. If you'd
like to support the channel and help us
keep making videos like this, you can do
so by using the super thanks button
below. As always, thank you for watching
and I'll see you in the next one.
