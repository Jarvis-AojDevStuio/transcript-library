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
word_count: 3997
chunk: 5
total_chunks: 7
parent_video_id: "xgPWCuqLoek"
---
refresh and let's just drop back in that
text file. And you can see it's
processing and then it loads up an LLM
generated title and a summary as well as
applying a document type and topics and
a language. So really cool. This is
using a local model as well. So that's
class and then that metadata schema is
actually within the global settings of
Superbase. So we have this metadata
schema and it describes exactly what can
be in these fields. Now this can cause
problems when it comes to actually
fetching responses. So let's come back
into our chat. If I ask the same
question again, tell me about the
Samsung electric dryer. Yeah, I don't
have any specific information about the
electric dryer in the documents
provided. I think it's just being overly
conservative with the metadata filters.
So if we come into Langsmith and this is
why it's really important to see the
tracing. And if we come into the latest
one, which is this one, you can see that
it triggered this search documents tool,
which is our rag tool. So if we ask the
same question again, tell me about the
Samsung electric dryer. When I test this
out on the front end, I am getting an
error when the vector store is being
searched. So I'll just paste that in. We
are hitting over 50% of the context
window again. So I want to clear this
down soon. It's a database error from
the duplicate database functions not
actually the agent having duplicate
function calls. Okay, there we go. So it
is working. Great. So that has fixed
that. So this is just uh bug hunting at
this point. We can stop that there. So
from looking at the traces here, I can
see that the AI triggered the search
documents tool which is our vector
store. It passed in a query of Samsung
electric dryer. So it didn't actually
pass any metadata filters. So it wasn't
actually being conservative. What can
happen though is it can get overzealous
with the metadata filters to the point
where it doesn't actually return
anything. So this is where your system
prompting really kicks in. You need to
describe to the agent what metadata
filters to pass in what particular
circumstance. And in reality looking at
these metadata filters, you might want
to filter by topic for example. So let
me try that. Let me see what topics are
associated with this uh document
smarthome integration. So, let's try
that. And I'll just be specific in this
prompt because I don't have the system
prompt set for the agent. Can you search
the documents for anything to do with
Samsung refrigerators? But I want you to
specifically narrow this down to the
topic of smartome integration. Now, I
couldn't find any documents. Document
type was article is what it passed.
Yeah, document type is reference. So,
that's why it couldn't find anything. It
did get the topic correct, which is
smart home integration, but it picked
the wrong document type. So then as a
result, it completely ruled out all of
the chunks about this document and it
returns nothing. So that's something
that will number one need to be prompted
around. So we'll need to update the
prompts of the agent, but number two,
you just need to be very conservative
and cautious when it comes to setting
metadata filters to avoid a situation
where zero results are returned. Okay,
so we're pretty much done with this
feature. So let's clear this one because
it's over 100,000 tokens. Can you create
a git commit for everything that's
outstanding? Check module three and four
in our PRD and plans seven and eight in
our agent plans folder. This is
essentially what has been worked on that
needs to be committed. And there's our
release. Excellent. Okay, on to module
five. Now that we've pushed that release
multiformat support, the big one for me
here is PDFs. So we're going to use
docklane that has both a standard
pipeline and a VLM pipeline. We could
also use Mistral OCR and that would just
be a simple web hook or an API that we
would hit but I really like dockane
because it gives you a lot of
flexibility. So we'll just do the usual
clear down on board and then ask cloud
code to create a plan. Let's kick off
the planning for module five and let's
focus on installing dockling. Let's not
support unstructured or mistral or any
others just dockling. And I'll change
that to plan mode. And while that's
working, let's also plan module six.
Like these aren't necessarily um related
features. One is about ingesting
different file formats. The other is
about implementing hybrid search and
reranking. And a few questions. So which
file formats should module 5 support
beyond the existing text and markdown?
I'm just going to say whatever dockling
supports essentially. Doc requires
PyTorch as a dependency which is large
around two gigs. It also downloads
machine learning models on first use.
Are you comfortable with this? So this
is a good question. I think I probably
will download it to this uh to this
laptop. So this is a gaming laptop that
has um 8 gigs of VRAM. That should be
enough to run these smaller machine
learning models. For the VLM models
within Dockane, I'll use my AI server
that has 32 gigs of VRAM. Okay. And then
PRD mentions cascade deletes. Currently
there's no delete document endpoint or
storage cleanup. Should we add a delete
document feature? So I think that might
be incorrect. There actually is a delete
document button in the front end and
that does actually delete the records,
the chunks and the files from Superbase
storage. So I believe this is already
implemented. Okay, let's submit that.
And I've hit my raid limit which
unblocks in 5 minutes. So I'm going to
get a cup of coffee. Okay, so coffee.
Well, tea actually. So let's kick it off
again. We're currently building out
module five. Can you plan out module six
please? Okay. So that plan is finished.
So multiformat support with docklane. So
complexity medium focus change to one
pipeline stage which is text extraction.
Max file size 50 megs. That's fine. And
then just update the front end
component. I think that's all good.
Let's clear. And then straight into
build. And away it goes. Meanwhile, I
think module six is almost finished and
planning. So it's really now just a
production line of planning, building,
testing, and bug fix. And it looks like
it's downloading those models now. Okay,
so here's our plan for module 6. Let's
open it up and let's bring it into our
plans folder. Okay, so we're talking
about replacing the pure vector search
with the hybrid search pipeline. So
keyword, full text search plus vector.
And then we're going to have reciprocal
rank fusion and optional ranking with
cohhere. I would like a local option as
well. cohhere makes sense. So people can
put in the public cohhere API and an API
key. I would like the option to uh run a
local re-ranking model as well. So we
just need to be able to set the various
credentials particularly because the
Quinn 3 re-ranking model is supposed to
be pretty good. Okay, so those changes
have been made. Just paste that into my
plan that's in the folder. So we'll
escape out of that. Let's clear the
context. We'll go into edit mode. Then
we'll use our build slash command. drop
in that module and then let's go. Cool.
So, hybrid search is done. I think the
other one is done as well. It's just
working through the validation tasks.
So, I'll let that continue and then I'll
just test out the hybrid search and
re-ranking. So, we now have a lot more
documents supported. So, let's drop in
that one. So, it's processing and that
has completed. So, yeah, we have five
chunks. We have all of the LLM generated
metadata that's in the completed status
and we have our chunks there as well.
Brilliant. So that section is working
and let's ask um explain to me what the
water supply situation is for this
product number. Cool. Yeah, there you
go. So it's pulled it out of that
document and we are using Quinn 3 VL30
billion. So that's a pretty good answer
actually. Excellent. And that is the
module 5 multi format that we're testing
there. Module six is hybrid search and
reranking. So let me come into settings.
So we have our re-ranking configuration
here. must not be enabled though because
we got an answer back and we don't have
an API key set for cohhere. So let's get
an API key very quickly and we'll test
out a local reanker as well in a minute.
So there's the API key. Okay, let's save
that and let's ask the same question
again. We definitely need to figure out
um some logging as well. How can we
verify that there is actually reranking
going on here? I think it's in lang. So
let me go into that. Yeah, so this was
that message that I sent explain to me
the water situation. We got that answer
back. search mode hybrid and we can see
in the tool call yeah rerank 0.75 RF 0.1
similarity score 0.47 47. Excellent. So,
we have reranking working. And if I
compare that to the question I asked a
few minutes ago before I set the API
key. Exactly. We only have RRF there and
similarity. Whereas, when reranking is
enabled, we have rerank RF and
similarity. So, perfect. I think that
works. So, I could do a lot more testing
on this, but in the meantime, I'm just
going to commit everything. So, I'll
just get a new agent up and running. So,
let's just clear this down. Can you
review plans number nine and 10 in the
agent plans folder and then commit
everything that is outstanding? Create a
new tag called 0.5-0.6
using the same convention and then
create some release notes and let's get
all of this pushed up to GitHub. Cool.
So, we'll let the agent do that. Okay.
So, version 0.5 to 6 is now up on
GitHub. be doing a lot more thorough
testing of this as time goes by, but
these quick smoke tests are working well
and obviously the LLMs are doing
verification as well. Okay, so let's
test out how fast this ingestion is
before moving on to the next phase. So
I've got nearly 200 files here. Let's
just grab a handful of them like that.
Drop them in and let's see how it works.
So a little bit slow. They are streaming
through. So it definitely could be
faster. Of the 16 files I uploaded,
they're kind of coming through one at a
time. I know in Dockling there's an
async mode that you can use. So, we
might look to see can we use that to try
to speed this up. You can see all of the
completed ones there. All right, we're
nearly completed. Um, I get the feeling
I might be maxing out on uh my resources
though because my computer has slowed
down quite a lot. So, I'm at 92% of my
RAM. So, this is definitely down to
running the machine learning models for
Dockling on my laptop and then loading
in lots of files in one go. it possibly
has spun off lots of asynchronous
processes. I will have a chat with claw
code to see how I can make this leaner
and also make it faster as well. Maybe
it is worth offloading these processes
to my main server. Now you can always
use cloud document parsing services like
llama parse or OCR services like Mistral
or the likes of data lab OCR. So there's
lots of different options here if you
didn't want to do this locally. But if
you do want to do it locally, you will
need to make this as optimized as
possible. And you can see of that memory
usage. Yeah, Python is using about 8
gigs of that. Actually, I have Da Vinci
Resolve open. I might just close that
and save some space. Yeah, things are
starting to look a bit better. In the
meantime, definitely worth seeing with
Claude. Is there any ways that we can
make this leaner? So, let's just have a
chat. Can you check out the document
ingestion process and flow to see is
there any way that we can make it faster
and leaner and make sure that we don't
max out, you know, server resources.
Okay, so let's let it run at that and in
the meantime let's have a look at module
7 which is the additional tools. So here
we're looking to build a text to SQL
tool. So for quering structured data
have a web search fallback because we
are building an agentic rag system. It
isn't just vector search. We want to
have lots of different tools and in
future we will also provide a code
access so it can actually execute
arbitrary code in a sandbox. We won't do
that in this video, but we'll do it in
uh follow on videos in the series. Can
you create a plan for module 7 based off
the PRD? Okay, so it has provided an
analysis and there does seem to be some
issues here. So it seems to be loading
the file twice into memory. There's no
concurrency limits on the background
tasks. So it could spawn unlimited
background tasks which could crash the
the computer. Let's go with those four
recommended optimizations. And also, can
you just document this in the agents
plans folder, please? And trigger
multiple sub aents to speed up this
process. So, our performance
improvements are finished. So, let's
test them out. We need a delete all
button here to make things faster. So,
we can add that to the backlog. I'll
just do it in the Subase. So, just
select all documents and delete. And
then back into here. Now, maybe I should
restart the server actually just in
case. So, let's do that. Okay. Just stop
everything and start up again. Possibly
not required, but no harm just in case.
Okay. And let's drag in our files. So,
they're all getting added. Yeah, they're
now in that pending state I was kind of
hoping for last time. Let's keep an eye
on our task manager as well. Yeah, so
it's definitely faster. The fact that a
lot of them are staying in pending
definitely proves that it's actually
loading them in batches now as opposed
to shoving them all in at the same time
and crashing the server. It definitely
still could be faster though. I would
like to figure out where the bottleneck
is in this pipeline. Is it in the LLM
calls or is it actually on the dockling
side? And then also we have three that
are still processing here. Let's say
whereas lots of them are pending. So
what is our batch size? There always
seems to be three in processing. And
that's a constant here. Max concurrent
ingestions is three. So we could change
that. And I can't hear the fan spin on
the server. So we're definitely not
maxing out on LLM calls here. Let's try
to set this number to 10. And let's run
it again. So I'll just delete out
everything. And now with 10 set, let's
try it again. Okay, going again. All
right. And they're processing. And you
can see the falloff in both CPU and
memory when I turned off those jobs. And
on the graphics card side, we're fine as
well. So resources are okay. Yeah. So it
is slightly faster, but it's nowhere
near as fast as it needs to get to. So
there's a few iterations of this needed
and diving deep into the Dockling
library as well to figure out what
exactly is going on. In the meantime,
I'm going to move on to the next phase.
This is a project we're going to be
building on over the next few weeks and
months. So we'll definitely get to the
bottom of that side of it. So on to
module seven. So we have our plan. Let's
have a look at it. So it's a medium
complexity adding multiple new tools
with established patterns. So text to
SQL predefined query templates not raw
SQL allowing LLM to generate arbitrary
SQL could expose users data sensitive
tables or enable destructive queries.
Solution implement a query documents
database tool with predefined
parameterized query types. So list
documents, get document stats, document
search by metadata, chunk count by
document, recent activity. So this is
very much up to you whether you want to
use these blueprints, these
parameterized database queries or
whether you want to allow kind of raw
SQL generation but actually lock it down
at the user level. So it's only a
readonly user. So even if it tries to
delete the database, it won't have
access to do it. And that's controlled
at the database level. So for this text
to SQL, instead of going down the
parameterized query route, I might just
give access to read only on one table.
I'll create a specific user for that.
But you definitely could go the query
templates route. It's a very good
pattern to use. On the web search, we'll
use Tavly. I'm happy with that. On the
text to SQL, instead of using query
templates, I am happy with raw SQL.
However, what we're going to do is
create user accounts, database users
that have the permissions locked down.
So, let's say we only have a single
table. We're not given access to
everything in Superbase here. Instead,
we're just going to create one new table
in Superbase. And we'll call this as an
example order history, let's say. And
then I want to give this agent access to
this table, but only readonly access. So
if they try to create raw SQL to delete
the table or or access other tables, it
won't be allowed by the database. Allan
has created a video on SQL agents where
he goes through lots of different design
patterns. Here I'm just using text to
SQL for example. Whereas in that video
he also goes through other patterns like
creating views if there's complex data
tables and highly normalized tables or
creating query statements like was
recommended here. I'll leave a link for
that in the card above. And that's our
updated module 7 plan. So it's a raw SQL
with database level security. So let's
clear down the session and let's use our
build slash command and we'll provide a
link to that plan and let's kick it off.
And that's up and running. So on to
module eight which is sub agents. So I
want a situation where within this rag
system, if we find a chunk that is
interesting, we're able to ask a sub
agent to load up that entire document
into its context and extract out any
relevant insights based off whatever the
query is. So, a problem with rag systems
is that a lot of the time they're
building out answers of segments or
snippets of a document and they're
missing the full context of the document
itself or of sections or categories. So,
a nice pattern is for a sub agent to be
able to load in the entire document.
With all that loaded into context, they
can extract out answers, but you don't
want to load these documents into the
main agent. Exactly the same as here.
Like we are very cautious about going
over 50% of the context window here. Yet
these agents are triggering sub agents
to go off and build things or to explore
or to test. So within our own rag
system, we want to keep our main agent
focused on answering the user's question
and it can spin off workers to go and do
some research. Let's create a plan for
module 8 within our PRD. And I'll go
back into plan mode because I'm actually
in edit mode here. Now, this could be a
big one because it's actually talking
about having nested tool calls displayed
in the UI as well as showing reasoning
from both the main agent and the sub
agent. So, this could get kind of
complicated from a front-end
perspective. And while that's building
out, it's worth exploring the code base.
And again, even if you're not a coder,
just to get a sense of where everything
sits and how everything fits in
together. So here we have a backend and
a front end folder which makes sense
because they are totally separate
systems. One on Python, another on
React. We have a scripts folder which is
what we're triggering when we're
restarting, stopping or starting the
servers. There's a superbase folder
which is mostly for migrations as well
as a bit of config. And then we have our
AI code editor folders agent.claw.cursor
in this case. There's also a playride
mcp for browser testing. Within our
front end section, we have this Node
modules folder. So all of the NodeJS
modules are loaded into this area. So
it's essentially like a localized
environment. We have public, which are
any of the assets that we need to render
publicly. And then there's source, which
are the source files that build out the
React application. And then that's all
broken into components and hooks and
pages and types. So you can have a chat
with an agent in the likes of cursor
here. You could ask it to explain what's
in all of these folders and how it all
fits together. And the same with
backend. So we have a virtual
environment. We have an app folder which
is broken down then into the likes of
models and routers and services and the
database layer. Again, chat to the AI to
figure out what all of these things do
because the better mental model and
mental picture you have of how this
works, the more likely you're able to
keep it on the rails as you keep adding
new features and fixing bugs. So module
7 is now finished and we have our module
8 plan as well. So let's not kick that
off just yet. Let's open it up and let's
just save it into our plans folder. So
this is number 13 module 8. Our module 8
