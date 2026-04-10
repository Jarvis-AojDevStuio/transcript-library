---
video_id: "xgPWCuqLoek"
title: "The Complete Agentic RAG Build: 8 Modules, 2+ Hours, Full Stack"
channel: "The AI Automators"
topic: "ai-llms"
published_date: "2026-01-28"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=xgPWCuqLoek"
duration: 8050
word_count: 3992
chunk: 1
total_chunks: 7
parent_video_id: "xgPWCuqLoek"
---
Welcome to our claude code agentic rag
masterclass. Despite all of the
advancements over the last 12 months,
rag is still the fundamental way to
ground your AI systems in your private
company data. Because what else is there
other than retrieval? We can't easily
pre-train LLMs on private knowledge. Nor
have context windows grown to the point
where we can stuff absolutely everything
in and ask questions and get reliable
answers back. So, we still need
retrieval augmented generation. There
has been an evolution though from naive
rag to agentic rag. Vector search is no
longer seen as the silver bullet for all
retrieval. A hybrid strategy is needed
that encompasses things like text to SQL
for structured data, text to cipher for
graph data, bash commands to GP file
systems and more. And the retrieval
mechanisms have changed. Where we once
only had simple tool calls, we now also
have MCP servers. Agent skills now allow
you to package up domain expertise and
knowledge and code execution and
sandboxes allows a much more flexible
execution of a retrieval strategy. And
as well as all of that, the agent
harnesses have taken leaps forward,
allowing much deeper research into your
knowledge through the use of sub aents
and retrieval loops. So these retrieval
engineering and context engineering
skills are incredibly important to have
when building out these systems. In this
video, we're going to collaborate with
Claude Code to build an Aenta Rag app
from scratch. And I invite you to follow
along using the project docs in our
GitHub repo that's linked below. This
includes everything you need, the PRD,
the prompts, the whole setup to get you
up and running. And by the end, you'll
have something like this, a Rag web app
with a featurerich chat interface that
uses advanced agentic rag techniques and
a complete pipeline to ingest documents
into your system. A lot of rag content
online is either too surface level or
it's too deep on theory. So here we're
going to dive straight into building and
you can learn the key concepts along the
way. My stack here is a vanilla Python
back end. We're not using any frameworks
here. A React front end. And then we're
using Superbase for vector search
database and file storage. And we're
also using Dockling for document
processing. But you can swap in and out
whatever tech you want and take it in
whatever direction you want to go. In
this build, I use both cloud AI models
and local AI models. I have a server
here with an RTX5090.
So, we put that through its paces using
the various Quinn 3 local models. So,
you can build this app completely
airgapped if you want, but if you don't
have the hardware, don't worry about it.
You can use cloud APIs. Cloud code is
our tool of choice for today. And even
if you've never used it before, you'll
see my full development process, how I
use markdown files, the plan, build, and
validate loop, slash commands, git
commits, and ongoing context management
of the agent. And a quick note on who
this course is for. You don't have to
have used clawed code before, nor do you
need to know how to code. But you do
need to be as technically minded and
willing to learn about things like APIs
and databases and system architecture.
Because in the workflow that I'm going
to show you, you're not the one doing
the coding. applaud is your job is to
guide it to understand what you're
asking it to build to catch when
something goes in the wrong direction so
that you can course correct when needed
and this requires technical thinking and
patience and if you put the work in you
will learn a huge amount along the way
and develop your core skills and a quick
intro if you're new to the channel I'm
Daniel my brother Alan and I run the AI
automators and we have been neck deep in
rag over the last 12 months we produced
over 30 deep dive videos on advanced rag
techniques on our channel. My previous
rag masterass has over 60,000 views and
we have a community of hundreds of
builders all building production grade
rag systems. And Allan and I both are
developers. So we have a combined 35
years of experience in the tech industry
across various roles from building
solutions for small businesses to
deploying ERPs and e-commerce platforms
in large scale enterprises. I mentioned
earlier that we're collaborating with
claude code on this build and there's a
lot of talk right now about longunning
autonomous coding agents like the Ralph
Wigum loop. With these you can delegate
entire projects and essentially walk
away and come back and you have a
finished app. And these are two
fundamentally different philosophies
with AI assisted coding at the moment.
You either collaborate and stay in the
loop or you delegate and walk away. And
the reason we're using the collaborative
approach today is that we're learning as
we build and it allows the solution to
evolve on a solid foundation. The specs
we've provided have enough info to lock
down the tech stack and a highle list of
features across eight modules. But we
have intentionally left it light on
detail so you can figure out the rest
with Claude during the planning stages
of each module. And true that you'll
learn how to leverage the tool as well
as build the fundamental skills along
the way. So, in this video, you'll see
every decision I make, every correction,
and every moment I steer clawed code,
and your build won't look exactly like
mine. These systems are
non-deterministic. So, you will get
something different. Let me know in the
comments where you stand on this.
Autonomous coding agents versus actually
collaborating and staying in the loop.
Along with our GitHub starter repo,
we've also included our own code files
from module one and module 2. So that
way if you hit a wall, you can grab our
files and jump into the next module with
a solid foundation. Code files for the
remaining modules are available
exclusively to our community members.
But to be clear, you don't need them.
The PRD, the prompts should be enough to
get you over the line. This video took a
huge amount of work, so I'd really
appreciate if you give it a like below.
It really helps us out. And if you do
get started, don't forget to bookmark
the video so that you can come back and
pick up where you left off. This is the
first video in our agentic rag AI coding
series. So make sure to subscribe to the
channel to catch the next one. Okay,
let's jump into the highle architecture.
Let's start with how all of this works
locally within our local computer or our
local network. We have a code base. So
we're using cloud code. I also use an
IDE during this build, an integrated
development environment. That way you
can see the code files and actually make
changes if you want. But essentially
these are the tools that we're using and
the codebase then from a front-end
perspective uses these technologies. So
first up we're using React which is a
toolkit to build out interactive user
interfaces. And for safety we're using
TypeScript which works very well
alongside React. For styling, we're
using Tailwind CSS along with the Shad
CN UI library that Claude Code can use
to drop in pre-built components like
buttons or forms or dialogues that look
professional out of the box. And then
this whole front end is then bundled
using Vit. And this is essentially our
build tool that takes all of these code
files and packages it up into plain CSS,
HTML, and JavaScript that web browsers
can understand. So that's our front-end
tech stack. On the back end side, we're
going to be using Python with fast API.
So this is essentially the brain of the
application and we also have Dockling as
a library that we're using for document
parsing. So it's a JavaScript front end
and a Python back end. And we could have
used JavaScript for both the front end
and the back end. But Python is
essentially the primary language in AI
development. All of the major SDKs, the
eval libraries, the parsing tools,
they're always Python first. And by its
very name, fast API is incredibly fast
for communicating between the back end
and the front end. So as I mentioned,
this is the local architecture. So this
front end when you run npm rundev or
when you get cloud code to run it, that
essentially compiles all of that down to
HTML, CSS, and JavaScript. So all of
that happens on the VIT dev server,
which is essentially a NodeJS server. So
in our build here, that's accessible on
localhost 5173. that might be different
in your build. But essentially then that
serves to you in the web browser and any
changes that are made in the codebase
will instantly appear to you in the web
browser through this vde dev server and
the hot reload. So the front end is
rendered via this dev server. The back
end is rendered via this uvorn server.
So for us this is accessible on port
8000 and our built scripts from the
front end will be communicating with the
back end over HTTP or SSE to stream
messages. So that's the codebase.
They're the two servers that are running
locally. That's us in the web browser.
So outside of that, we have a database.
Now in this project, I actually use
superbase.com. So this is sitting within
cloud services here remotely. So it's
not in our local computer or local
network. You could run Superbase locally
if you wanted. You could just spin it up
on Docker. But essentially the backend
can persist data into Superbase. And the
web browser also has a real-time
connection to Superbase. So if any data
changes in this database, it's
immediately reflected in the browser.
And then in terms of AI models in this
build, I use both local and cloud
models. So I'm using LM studio and
various Quen 3 models here. So the back
end, the Python backend, that server can
communicate with those models. I do at
times also use OpenAI and Open Router.
So communicates out via that path as
well. So that's our local architecture.
This project remains local. We don't
actually deploy it remotely. But if we
were to do that, the production
architecture if it was in the cloud for
example would look something like this.
So we have our local codebase and as
changes are made, we commit those
changes and push them to our remote
server. So we're using GitHub here. And
that way then we have a remote version
of our codebase and then depending on
whatever infrastructure you have set up,
you can trigger builds or trigger
deployments when new pushes are made to
that remote repo. So for example on the
front end side if you were using Versell
or Cloudflare or if you had your own
server and you were using engine X you
could configure it in such a way that
when changes are made to the repo it can
trigger the build of the front-end app.
So again you're getting that full text
stack all of the code files and you're
building it or compiling it to HTML CSS
and JavaScript and then that's
accessible via the web browser. So if
someone accesses rag.app app for
example, it would be served by this
front-end server and they would just get
those files and that's the same on the
back end then. So you can deploy from
GitHub essentially you're going to be
pushing it to the backend server and it
uses uvorn and fast API to be able to
send data to the front end. So in this
case if you think about it from a
domains perspective this one would be
rag.app and here you might have
api.ra.app.
So that's the data feeding the front end
and again you have a database so you
would be using authentication within
this web browser and data will be
streamed through from the database. So
we'll be getting into the likes of role
level security and kind of
authentication in module one of the
build and that in a nutshell is the
production architecture. Now you could
publish this locally to the network. So
if you wanted to run this airgapped
behind a firewall, you could just
trigger the build yourself to a local
server and make that accessible via the
network. So onto the project. What are
we actually building here? Well, we've
broken this down into eight modules and
we have this PRD document that's in the
repo that you can download. So we're
building an agentic rag application that
has two primary interfaces. There's the
chat interface and an ingestion
interface. And that's essentially what
you see here. So this is an example of
the chat interface. And while it looks
simple, there's actually quite a lot
going on here. Not just threads of
conversations, but you have all of the
various tool calls, sub agents
triggering, streaming and markdown
rendering, chat history, and memory.
There's a lot going on in these
interfaces. And then on the second side,
we have the document ingestion where you
can drop in files. And then there's
various statuses of files as they're
processed, metadata extraction. But of
course, this is just the tip of the
iceberg. you can bring this project on
much further after these eight modules.
So step one is to create the app shell.
So it's linking it with superbase. So
we're using superbase for
authentication. So users can log in and
through the use of something called role
level security. Their data is isolated
from other users within the system. And
by the end of module one, you will have
a chat interface. I call it manage drag
because in module one, we're going to
use the open AAI responses API. Now if
you don't want to use this, that's fine.
you can use something else. But there
are plenty of people that might just
want to build a wrapper on OpenAI's
responses API or perhaps Gemini's file
search for example. So that's
essentially what this module one is.
Creating the chat interface, creating
the login and getting a basic chat up
and running with a cloud model. And then
from step two onwards, we no longer use
the OpenAI responses API. We use the
more generic chat completions API. And
then we can use any number of models
both local and cloud. So then for cloud
you can use open router and for local
I'm using LM studio. So module one is
the chat interface. Module two is our
data ingestion interface as well as the
backend flows for that. Here we're using
PG vector within superbase to actually
save our embeddings for our documents.
In module three we build out our record
manager because we want to avoid
duplicating files in our knowledge base.
In module four, it's all about metadata
extraction and filtering. So, this
allows you to narrow your search across
documents in a vector store, which can
lead to much better results. In module
five, we hook up Dockane for multifile
format support. Dockling has a standard
pipeline, which is what we use. You can
also use VLMs with Dockling, and again,
those could be local VLMs or cloud VLMs,
depending on what hardware you have. For
module six, we implement hybrid search
and re-ranking. So we're no longer
relying just on semantic search. We also
bring in keyword search and we can use a
local or a cloud re-ranking model at
this point. Module 7 is building out
additional tools for the agent. So this
is where it becomes really agentic rag.
We create a web search tool and we also
create a text to SQL tool. So the agent
can write and execute arbitrary SQL
commands against a table in a database.
So a key aspect of this area is database
level security. So we only want to
provide readonly access to a specific
table for the agent. We don't want to
let it loose on the entire database with
the potential to delete everything. And
finally in module 8 we build out sub
agents. So similar to the way claude
code does this with their own explore
agent we ourselves create an analyze
document sub agent and this allows a
completely different LLM to load up an
entire document into its context window
to carry out some sort of extraction.
you know summarize or extract out
insights or look for a particular topic.
So the beauty here is that it's not
cluttering the context window of the
main agent that can stay focused on
answering the user's question in the
interface. The front end becomes quite
complicated at this point because we are
rendering all of the tool calls the sub
agents thinking process. So this is
where things really get interesting. And
I forgot to mention that across all of
these modules, we're using Langmith for
observability because we need to be able
to see what's happening behind the
scenes with these LLM calls. What
prompts are being passed? What tools are
being called? What memory is in context
because context management is crucial
for these systems to work. So you will
end up living in Langsmith looking at
traces trying to figure out what
actually is going on. And before we get
started, I just want to call out the AI
dev loop that we use here. So we have
our PRD, we have the eight modules at a
high level, we know what features we're
going to be implementing. So for each of
those phases, then each of those
features, we're going to go and use
Claude codes plan mode. And as I
mentioned, we've kept the PRD light. So,
so we're not using spec kit or BMAD or
any of those upfront planning tools for
this project because the idea is I want
to show you how you collaborate with
claude code to get to an end result. But
they are by and large great solutions.
But for this, for each major phase in
the PRD, we use Claude Code's plan mode.
And then you can have a back and forth
with claude code on that phase on the
features on the acceptance criteria and
then we work through to the build phase
where claude code will go and build that
across the main agent maybe numerous sub
agents if it's a phased build and then
it will produce an output which then it
will carry out some level of validation
but then you also need to carry out your
own manual testing and validation and
that typically results in a back and
forth. You might need to clear down the
session at that point and start fresh
and because you need to manage the
context window, but eventually you'll
get to the point where you commit all of
those changes and you move on to the
next phase, the next section of the PRD.
So this in general is the AI dev loop.
What I have found is if you build out a
feature and if there's lots of problems,
if there's lots of changes, sometimes
you might need to create a separate plan
just to solve a particular bug or to add
a specific feature. But generally this
is the main loop that you will be using
constantly. And on the version control
front, we have kept things simple for
this course. We're just going to use the
main git branch. Now it is better
practice to have feature branches and
then merge code into the main branch.
But for those who are starting off in
development, I don't want to over
complicate things. In the next few
videos, we're going to dive deeper into
actually how you have more formal
version control, branching of the code
bases, merging in, deployment across
dev, staging, and production. There's a
few pieces of software you'll need to
get started. Obviously, the first one is
clawed code, but we also want to use an
IDE because we want to have visibility
on the files as they're being created.
So, you have options here. I generally
tend to use cursor, but you could use
Google Anti-gravity or VS Code. I won't
go through the process of installing
cloud code or these IDEs. That's covered
in numerous videos online and the
instructions are pretty clear. But once
you have them installed, the next thing
you need will be the source files to
kick off the project. This is published
on our GitHub account. It's linked below
as well, and it contains all of the
setup markdown files that Claude Code
needs to actually work through this
project. So just grab the URL at the top
and there's lots of ways to clone this
repo. You can do it in clawed code, you
can do it in terminal. I generally do it
in the IDE itself. So I'm going to use
cursor. So that's opened up here and I
have a clone repo option. So we'll just
hit that and then I'll paste in my repo
and I've just created a folder. So I can
now select this as my destination and
then that clones the repo and brings
down the files. So let's open it up. And
within cursor you get this view. Press
controlB or this button to open up the
sidebar. And now we have a view of the
files in the repository. And this is
important because we want you to be in
the driver's seat as you actually build
this out. So even though you don't
necessarily need to know how to code,
you should have a general sense of how
the code base is progressing and
evolving. Great. So with our repo
cloned, we can then open up the
terminal. So there's a few options here.
You can click on new terminal at the
top. And then within this folder, we are
in the the claude code agent masterass.
I can just type in claude because it's
installed. And that should open it up.
Now you can use this within the terminal
here. There's also a clawed code
extension in these VS code forks that
you can see there and install. I have
found that using clawed code in the
terminal like this can actually be a
little bit laggy and a bit glitchy.
Let's start with it here. And if it
becomes unbearable, we might switch to a
separate terminal alongside the IDE. And
before we get started, I do recommend
that you configure a status line as you
