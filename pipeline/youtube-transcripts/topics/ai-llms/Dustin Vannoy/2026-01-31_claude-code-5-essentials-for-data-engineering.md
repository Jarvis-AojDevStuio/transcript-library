---
video_id: "YnIWW88l0mc"
title: "Claude Code: 5 Essentials for Data Engineering"
channel: "Dustin Vannoy"
topic: "ai-llms"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=YnIWW88l0mc"
word_count: 4491
---
Hey, Dustin Vanoi here. I've been saying
lately that AI coding is a big part of
the future for data professionals,
including data engineering, data
science, and analytics engineering
workloads. And so, I believe adopting AI
for development will become essential. I
released a video on cursor a few months
ago which uh is talking about working
with AI coding agents [snorts] and what
the process looks like and it definitely
was specific to cursor but has a lot of
uh context and opinions that I won't re
rehash all of that here but since then
I've been digging into this space a lot
more and testing out cloud code. Um
mostly I'm testing cloud code and cursor
because it's a favorite among many
developers. It's got a lot of attention
right now and so I haven't gone and
analyzed everything and come back to you
with like this is the best thing ever.
Um, but I really do like these two tools
and that's what I'll focus on is cloud
code today and go back and check out the
cursor video if you want to know more
about where that fits in beyond the
little bit I'll touch on. So what I want
to do in this video is focus on cloud
code and the most important concepts to
master as you get started. Many of these
are foundational ideas. They're going to
be useful for whatever AI coding tool
you use, whether that's cursor, cloud
code, or others. Uh, real quick, I want
to just say uh yet again, I believe it's
not too late to get started with these
for the first time. The space is
starting to settle a bit for now, and
we're gaining a clear understanding of
which capabilities are providing the
most value. So, while this technology
will continue to evolve at a rapid pace,
I hope this video can provide a solid
foundation on the basics you need to
know. I will be sharing a little bit
about using cloud code with data bricks
and really from a data professional data
engineer etc perspective um because I
work with data bricks regularly I work
in data engineering but I won't go too
deep into the data bricks integrations
and capabilities yet I'll call out a few
things that are good to know and I'll
follow up with some more detailed dives
into that so this is the part where I
ask you to subscribe to the channel and
turn on notifications so when I do come
out with a more data brick specific
video and uh deeper sessions on this you
uh know about it and can come in and
tune into those as well.
So AI enhanced development or AI coding
tools focused on cloud code is what this
overview is going to be about. Uh big
thanks to Robbie Kiss Canyon who's
worked with me on these slides, worked
with me on the cursor slides and a lot
of other learning that I've been doing
in this space. Uh many others have been
uh helping me to try and get up to speed
here. What I'm trying to do is really
take what I've been learning from other
people on YouTube, from people at my
company, and distill it into uh my
opinion, my take on kind of the main
components you need to know about in
order to be effective as a data
professional using cloud code. So cloud
code is a highly popular tool for AI
coding. It's I'd say primarily used
through the terminal uh or via
extensions to idees. And so uh it uses
an agentic approach. By default, you're
going to use it through the terminal and
it's going to have this approach where
you're really letting Cloud Code do a
lot of the work for you, right? This
isn't just a back and forth chatbot.
It's actually making changes across many
files uh for your project and maybe your
entire system depending on how much
access you give it. So if you let the
agent or maybe multiple agents develop a
significant amount of code, run the test
and respond to errors in a directed way,
you typically or I see this most often
and little bit less back and forth
hands-on approach than those that take
like the the developer interface uh
focused view of it like cursor provides.
So, as you may use cloud code from the
terminal and have it do a lot of things
across your your project for you without
really paying much attention to the
individual files being changed, there's
also a pattern and a common practice
where you want to actually see the
changes via text editor or via
development environment. And so some of
the idees that I see very common uh for
this are uh really just giving us this
ability to structure and track what's
going on within our project as cloud
code does its thing. First let me talk
about cursor. Now cursor is a VS code
fork with built-in AI capabilities like
code completion um generation and
explanation of you know what you have in
your project. So you can use it on its
own of course but here I'm talking about
using it with cloud code as well. And so
you might use, you know, cursor for
certain things and let it do
autocomplete and everything with its
built-in capabilities. And then for
cloud code, you could have that running
from a terminal session within cursor,
right, as just another pain within that
developer interface. Or you might have a
separate terminal, you know, off on a
separate screen as a pretty effective
way to give you more screen space to
work with these tools. Now, others like
to actually turn on the extension and
have just another pane that's cloud
code. but it's a bit more integrated
into being able to like highlight which
lines within the text I'm looking at
right now Cloud Code needs to know about
to take its next action. All right, so
uh another popular option is Visual
Studio Code. This has been really
popular uh among developers and so now
that there's you know other options to
use with it but if you like cloud code
you can use the cloud code extension
with VS code and get that same type of
experience I was describing with cursor
other tools other developer interfaces
very much have plugins I'd say I've
checked on Jet Brains I've used PyCharm
a ton in the past Jetrains has a plugin
in beta I haven't personally worked with
that one so I'm just going to kind of
focus on these two as some of the top
options day.
Now, the key to succeeding with agents
is context. Basically, this is the
session memory. So, if you think about a
computer's memory, if it gets really
full and things start to deteriorate,
same concept, um very different way it
all works in practice, but the same
concept here. So, it's about providing
the right details and managing the
memory so that the agent has the correct
information at the right time. So, just
remember if your memory gets to a
certain point, I think I hear a lot of
times either 40 or 60% in that range is
kind of where you're starting to get
deteriorated results and you may want to
start a new session or clear up your
session context in some way. So, as we
go through this, we're going to be kind
of talking about ways that help us
manage this context well is really the
key. And we're also counting on cloud
code to do a lot of context management.
Here's the components that we're going
to spend time on uh in this session.
We're going to talk about the cloud.mmd
file for managing memory or putting
things in memory explicitly. We'll talk
about how skills can give us a lot of
capabilities for uh pulling things in at
the right time. We'll talk about
specific commands that we can have to
preset uh like prompts that we want to
use. How sub agents can help us break
out different workloads and keep that
context clear of things that it doesn't
need to do a specific task. And then
we'll talk about MCPs and really the um
ability to have external interaction
that is wrapped up in a way that's kind
of standardized across all the different
types of agents you'll use whether
you're using cloud code or something
completely different. So first you have
your cloud MD. Sometimes in other tools
this should be agents.mmd instead.
Essentially this is the core information
that you want in memory when you start
up a new agent session. So, you know,
you can have one of these at your user
level or do it at the project level. I
like to do it at the project level
typically. And it's going to define
things that are key for your project and
are definitely worth having in every
time you start up a new session. But you
don't want this to be too big or you're
going to fill up that whole agent
session, uh, fill up that whole memory
with this information and you're going
to not have space for all the other
things you need to do. Examples of
things you may have in here are key
design principles, things about which
tools or frameworks you want to use,
maybe a list of references of examples
that this project should really leverage
to make sure it writes its code
effectively in a style that matches what
you want. But that's if your whole
project is focused on it, if you need
this every time. It's not um quite as
efficient as if you pull in that
information only when you need it,
assuming you start different agent
sessions throughout the work that you
do.
One of the popular capabilities at this
time is Claude agent skills. This is a
way to really package some expertise or
guidance on the workflow you want to
follow and things that you want your
agent to know when doing certain types
of tasks. So an example would be one of
the built-in skills is a PDF writer. So
this is a skill available from
Anthropic, the creators of cloud and
cloud code. And this is anytime you want
to actually write to a PDF this you want
this skill to be invoked. Okay. And you
don't want to always tell it in your
CloudMD file that this is how you do
PDFs. You want to only use this at the
times that you're doing that type of
work. So you essentially want it to uh
know a little bit about each of the
skills that are available to it, just
enough that it knows when to go read in
more information into memory and
leverage that. And that's exactly how
skills are built built to work. So on
this image you can uh see that it's got
this small block at the top called the
front matter and this will always be
available to your to your session to
know what skills are available and try
and figure out when to invoke them. So
it's really important to get that
concise but also useful for cloud code
to figure out when to use it. As you go
further down it's going to start pulling
in the rest of your skill.md directions
uh when it starts to activate that
skill. And then optionally, you might
have scripts that it uses for
references, other markdowns it uses as
references depending on, you know, how
deep into this certain skill you need to
go. So, it's not going to automatically
pull in everything as soon as it invokes
the skill. That's the main concept that
makes these really powerful and uh gives
you more options to have quite a few of
these within the same project. Uh, a
good example would be like a Spark
declarative pipelines developer skill.
Spark declarative pipelines is a way of
creating declarative pipelines with
Apache Spark and on data bricks and
essentially the APIs have changed a bit
over time. The naming has changed over
time which leads to a little bit of
complications. Beyond that I probably
have some like best practices of how I
want my team's uh Spark declarative
pipelines to look and I can build those
into the skill. I think skills are a
great place to start getting specific to
how your team, your organization is
going to do things. you can get really
opinionated in skills and then people
can tweak those if it's a different team
that has their own needs. They can kind
of customize the skill more for what
they're doing.
On the other hand, we have cloud
commands. These commands are a way to
say when I run / command name, run a
predefined prompt. And so you can really
control exactly what you want to happen
when you invoke it. These aren't going
to get automatically triggered or pulled
in the way skills might. You will need
to choose to run commands by calling
slash whatever your command name is.
Commands are a great thing to build up
when you have certain challenges and the
LLM isn't responding the way you had
hoped. Uh once you find that in order to
like save a better path, a better
workflow or a prompt, save that to a
custom command that you can always reuse
in the future, assuming it's a
repeatable task, of course. So, there's
some built-in commands that you want to
get familiar with. uh you'll probably
find them as you go through tutorials or
anything else, but you can add custom
commands and these can really be helpful
for specific things you want to be able
to initiate.
Now, I want to call out sub agents. I
haven't been using them heavily yet. I'm
more likely to have two different cloud
code sessions going like in a separate
terminal tabs, but it's an important
concept for you to be aware of and see
how it fits for you. Sub agents are a
way to split up the work. Sometimes this
is so that you can do work in parallel.
So sometimes it's so I can have
predefined uh specific task and
capabilities that will focus on just one
type of work. So overall I think of this
as a way to get a fresh context a fresh
set of memory to focus on a particular
task within my larger project. For
example, if I want to write a uh group
of unit test or refactor a group of unit
tests that could be a good sub agent to
invoke. It's a task that I could
actually do that doesn't need to know
everything else in my main uh agent
session. Uh it can be kind of its own
isolated thing maybe with a couple of
skills that it has available without
having all of the different um context
maybe other tools that are available in
the main session. Okay. So, I would say
spin up this sub aent, do the test
writing, and what you'll see is you can
actually do slash agent in cloud code to
configure a pre-built sub aent and what
um kind of what that agent should be
focused on. When we talk about sub
aents, an example of a particular sub
aent could be something for Spark
optimization. Feed it a certain amount
of documentation about optimizing.
Perhaps you have, you know, a skill
that's available to it that's not
available to your main session and let
it go do its thing. Now, you may be most
familiar with MCP, so I saved it for
last. MCP is for stands for model
context protocol. It's a standardized
way for defining a set of tools and
handling specific logic related to
working with those tools. So,
essentially, you have this agent, it has
some built-in tools for it. If I want to
go work with another external system, a
lot of times, you know, I either have to
kind of train it to go find the right
documentation, write some code, or use a
use bash commands like terminal commands
to do it. MCP is going to wrap all that
up better in a way that's kind of ready
to go. So, MCP's been around longer than
Cloud Skills has that we talked about
earlier, and there's quite a bit of
overlap on what these two capabilities
could do, which kind of makes it
confusing. Quite frankly, one of the
reasons it took me a while to get to
this video was trying to understand a
little more on that. But more on that in
a moment, a little bit more about MCP
server. That tends to be a good option
if I need to work with maybe some
internal data or internal systems and
there's some special authentication,
maybe some sort of state management I
need to look up. Uh, and I will need the
special interface to work with it,
right? uh if I have everything available
via easy code snippets that the agent
can find already, easy CLI commands,
it's less important that you wrap those
in an MCP. And so these MCPs really just
open up the ability to use a system and
use specialized calls from anywhere
you're working with agents. So I think
the best way to really get into MCP
servers is to talk about a few examples
on the data brick side. Uh there's
actually quite a few different options.
Let's talk about a few managed MCPS that
data bricks offers for you. You just
need to configure it uh within your
workspace. Make sure it's enabled and
then you'll be able to use these. For
instance, uh probably the most popular
at least for the types of things I do
are to either use a genie space where
you've actually wrapped a set of tables
maybe with a bit of logic and
instructions so that you can have it
automatically create SQL and return
results to you with a little bit of
reasoning around it. In addition, datab
brick SQL is uh available via managed
MCP. So I can actually submit queries to
a datab brick SQL warehouse using this
MCP. And it might be a little bit
simpler than trying to have it use uh
like API calls to submit data brick SQL.
I find it's a little bit of a a shortcut
to getting to your data brick SQL
statements um rather than having it have
to run through the API.
Now, it kind of depends on how much you
want to simplify the different process
as to whether you bother having an MCP
attached. And part of the reason is that
MCPs are going to add a lot more to your
context. As I if I have a bunch of
different MCP tools available, my
context will fill up with those as I use
them. And um I'm going to have to kind
of be a little bit more diligent about
clearing that memory, clearing that
context as I go.
um potentially if I'm using something
like skills, I'll only really need to
pull some of that into context when I
need it. And so it should fill it up,
you know, not as much or definitely not
as quickly in every single agent session
I start up. So MCPS can add a lot to
context. Uh I believe there's some
patterns around to try and avoid that
and it kind of depends on what uh tools
you're using there. But just a heads up
that that's kind of where a lot of the
debate about do I use skills, do I use
MCP servers, do I use these two things
together? A lot of it's around this
context and um I'm still kind of keeping
track of what uh what the arguments and
and pros and cons are with those
different things.
I'll quickly call out a couple of
external MCPS that uh me and some
colleagues at data bricks seem to be
using. Context 7 is one that has
up-to-date code examples and
documentation. So I might use that to
actually go ask it to go use those docs
from datab bricks to figure out how to
do something the right way and context 7
already has access to all those docs.
Another is the playright mcp. If I'm
building out like a web application, so
with data bricks apps, I might be
building out a web application. Now, I
can automate some of the web UI checking
and have it be able to interpret what's
going on in this web UI on the app it
just built, which lets it kind of
interact better with the more what the
finished result looks like versus me
having to like take screenshots and
paste those in and everything. Another
is ML flow, which is a way to interact
with certain capabilities that MLflow
provides. So you can interact you can
interact with MLflow traces
programmatically is one example I'm
aware of. I haven't used this heavily
myself but some of the people more on
the data science and ML engineering side
have been using this kind of thing.
So let's try to break down these
different options. I'm not going to get
into every detail that's on this slide
but if I think about commands remember
that's like a specific task I'm going to
trigger as the user. I'm going to say I
want to trigger this command. And when
I'm talking about a skill, that's
something that ideally cloud code will
know enough information about it and it
will just automatically get used when
needed through the process. The the
skill itself is going to be specialized
knowledge for when it's doing a certain
type of work. Examples I have for that
are a data bricks asset bundle writer
skill which would create your CI/CD code
for deploying to data bricks. I might
have a datab bricks app builder skill to
help guide um how to use datab bricks
apps specifically and maybe which
frameworks and things I want to use
within this project. I've actually got a
couple different versions of this I'm
playing with because there's different
ways to build apps, different frameworks
to use. So remember skills can have
extra information linked to externally
or in separate markdown files which will
let it sort of build up what's in the
memory, what's in the context as that
information is needed.
In addition, we have sub agents.
Remember, those are a way to have
standalone workers, so to speak. They
can be set up to run in parallel as
well. And it's just a way to focus an
agent on specific amount of work, get
the job done, and then clean itself up
rather than keeping everything together
in one main agent session throughout the
course of your work. Then, MCP servers,
probably the most common way to access
tools right now. Very powerful.
something where you can look at the data
bricks managed ones or other external
MCPS. GitHub MCP is another example and
these will help you get access to tools
pretty easily just by enabling MCP
servers. My main criticism of MCP
servers is that there is a little
overhead to either get all of the code
set up to where it can run on your local
machine or get connected to one if it's
not um a managed MCP server that's
already enabled for you with some
specific, you know, authentication
instructions that you need. Point is,
you might get stuck a little bit trying
to get MCP servers working. I think
skills have a tendency because they're
relying on the agent so much to not
require much setup. It's really just a
lot more guidance, information, and
references that um your agent can use.
And the agent itself, like the cloud
code main session is so powerful that
skills tend to get you really far. Uh
MCP servers can definitely close the gap
though on external systems, uh internal
tools within your company that just the
internet doesn't know about. It's a
little bit hard to find and point to the
right information all the time. So with
that, we've kind of looked at these
different components. uh there's some
more advanced concepts I think are
beyond really uh what you want to know
to really get started. So, we're going
to cut off this conversation here uh and
pick up in the future with more of a
deep deeper demo of some of these
capabilities and as I start to find more
things really useful for me as a data
professional um I'll try to come back
and share about those or at least put
them on my my blog on my website
dustinbanway.com.
Well, that's a wrap on this video to try
and give an introduction to these really
important components of Cloud Code and
just kind of the basics of how this can
be helpful. I hope this really did uh
get you started on this path. Um I will
like I said follow up with some more
detailed um view of some of these
different things in action like skills
working directly with data bricks in
order to help us have more success using
cloud code or other agent tools. So, uh,
please subscribe to this channel and
turn on notifications so that you know
about those videos when they come out.
If you're interested in other types of
data engineering or data bricks focused
videos, check out everything else I have
on the channel. Uh, thank you. I'll see
you next time.
