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
word_count: 3995
chunk: 6
total_chunks: 7
parent_video_id: "xgPWCuqLoek"
---
plan is complete. So let's have a look
at it. Sub aents implementation plan. So
this is complex as I thought it would
be. Multiple phases changes across back
end and front end. So add hierarchical
agent architecture where the main agent
can spawn isolated sub aents for full
document analysis. When a user asks to
analyze an entire document such as
summarize, review, extra key points, the
main agent delegates to a sub agent with
isolated message context, document
specific analysis capabilities,
streaming, reasoning visible to the user
and then this will be triggered via a
new analyze document tool. Cool. We
could kind of make this broader and less
specific to full document analysis. So
that's one thought that jumps to mind.
For the moment, let's leave it at this.
We can always try to generalize this a
bit more in the future. And the agents
have other tools anyway like web search
or text to SQL. Now, yeah, I think I'm
happy with this. Let's kick it off and
let's see how it goes. It's quite a big
change. It might need a couple of
phases. Are there elements of this plan
that could be executed in parallel?
Yeah, I think there is. So, parallel
execution opportunities. Yes, please
update the plan with this. So yeah,
mostly backend work and front end work
and could run in parallel. Okay, so
that's done and let's not trigger it
just yet. We'll copy this into the one
that's in our plans folder. So these are
the parallel waves of the build. So
let's clear this down because we've got
36% of our context used already. So
let's start it from scratch. And then
let's trigger our build slash command
and drop in the plan. And away we go.
Cool. So, let's carry out some manual
testing now on module 7, which are the
additional tools. So, let's just restart
the servers. I've got all of these
command shells opened up. So, let's just
close them all. Okay, nothing running.
So, let's start again. And actually,
this is incredibly bright. So, let's
implement a dark mode here. Can you
implement a dark mode on our front end
and have it as a setting from the user
menu at the bottom left? Okay, so we
have our documents, we have our chat.
Now let's come in here to the database
because if we want to do text to SQL
obviously we need a database and we have
it there sales data. So it has created
some dummy data. That's perfect. So
let's test it off the back of that. So
what can we say? What's the total value
of all order space by the metro office.
Okay. So checking the sales database.
Now it has come back with this. So let's
go into lang and see has it actually
called the tool or did it just
hallucinate that we are using Quinn 3
our local 30 billion mixture of experts
model. So you can see the tools that are
available. So query sales database is
there and yeah it did use it. So select
some total amount from sales data where
customer name equals metro office and it
shows that the query returned 12 rows.
So from looking at the sales data in
Zubase it does look correct. So Metro
office 25 units 1124. So that's correct.
And then the keyboard pro 30 units 2399.
That looks correct. For some reason
though in lang we can see the SQL query
which is there select a sum of the total
amount. So if I just run this against
the table. So let's come into SQL
editor. If I paste and run I'm just
getting a single value 3524 which is
that. So this breakdown where is this
coming from? So if we can trace exactly
what happened here. So we have the
input. So this is our system message. We
have the question I asked and then it
hits the query sales database tool. It
passes in the SQL query it wrote and
then this is the tool call response. So
query returned 12 rows. I don't
understand why that happened because
when I run the query myself, I'm only
getting a single row. So I do wonder
maybe it's hardcoded something in the
back end. Let's copy this out and see.
And we can see cloud code is auto
testing new features here as I
investigate this one. So this claude
agent that built out module 7, this is
the one that built the text to SQL tool,
it's at 72% of its context window. So we
definitely need to clear this down. So
let's just clear it. How are we on
usage? Use about 50% so far. Okay. So
let's on board again because best to
have an agent fully up to scratch on the
codebase before we get it to try to bug
fix. I just asked this question on the
front end. However, I can see in
Langsmith that the response included the
full table as opposed to the actual sum
which was in the query. Here's the
example. Why did this not produce the
actual sum, a single row with the sum?
Maybe it's hard coding a some query for
example. It looks like my dark mode is
finished. And it also looks like module
8 is finished and verified as well. So,
we can test that out too. Let's come
back into here. Okay, so there's dark
mode. I think we need to update our logo
to have a dark mode version of our logo.
I've just dropped in a dark mode of our
logo in the front end public folder. Can
you apply that, please? All right. And
that's working away. Now, let's have a
look what happened to this query. Yeah,
there you go. There's a fallback within
the script that ignores the query
entirely if it fails and just does a
select all on the whole table. So, it's
deliberately returning all data. We
definitely need to get rid of that. Ah,
the migration file was never applied to
the database. Okay, so let's try that
again. Then just copy out that question
back into new chat and paste. I'll check
the sales database. No, it didn't. Still
just getting all rows. So I think it's
an issue around the locked down user. So
having a role that only has read
permissions on a single table is the
issue. So fix the execute SQL as reader
function. Let's just go to superbase and
let's look at the database functions.
Execute SQL as reader. Why do we have a
database function for this? Is this
simply not a case of creating a new
Postgres user that only has read access
to this table? Is that not it? So, I
might be trying to overengineer
something here and it's proposing
something different here that I'm not
necessarily convinced by. Surely what
you're proposing means that the LLM
could delete all data in the table.
Yeah, you're completely right and I was
wrong to suggest relying on Python
validation alone is the solution. Yeah.
So it's just dedicated Postgres user
with only select access on the sales
data table. That's all I want. Stop
overengineering it. Okay, let's
implement that. And you can kind of see
how a code base can go off track fairly
quickly. And this is just a perfect
example of it. Like here it was creating
database functions and using RPC and
essentially was creating a system that
was highly complex and actually doesn't
even work and doesn't actually have the
security that we need. We need this to
be enforced at the database level. So
while I was thinking about that, let me
get a Tavi API key so we can actually
try out the web search. The alternative
to Tavali is search engine. This might
be a better approach as we're doing a
lot of things locally here. I'll leave
it at Tavali for the time being because
it's a simple API key, but this is
definitely a good system to use and it's
a a local way to access search results.
Okay, so just copy out my API key for
Tavi. Drop it into the ENV in the back
end. I'm not seeing it in the ENV
example in the back end folder. So I
don't know the exact key name we're
looking for here. So you can search the
codebase on the top left with the the
search icon. So there's Tavi. So
fullswuite.md web search.py PI Tavity
API URL. Where's the key? Settings API
key. Oh, on the settings page, of
course. So, it's not an ENV, it's down
here. We could arguably just put it into
There we go. Enable web search. Oh,
yeah. A provider dropdown as well. So,
you can decide where it makes sense to
save things in a likes of a settings
page like this where a user can change
it or where it makes sense for it to be
set in av file. I think arguably this
probably makes more sense in an ENV
file. Ah, anyway, it doesn't really
matter. We'll save it here and let's see
does it work. Okay, so web search is
enabled and this agent has finished on
the SQL the text SQL. So create the
readonly user and clean up the broken
RPC function. All right, so it's asking
us to run some SQL in the Superbase
database. Yeah, let's do that very
quickly. So let's just drop this
function. We could of course get it to
do it too, but uh no harm us getting our
hands dirty a little bit. So let's drop
the function. Yeah, we already have
sales data. So it's not letting us drop
it. Okay, fine. We'll get it to do it.
Can you make these changes? It is asking
us to create this ENV for the SQL reader
database URL. That's the direct Postgres
connection. So we will do that. And then
we need a password for this user. So
I've just got a password here. So we can
drop that in. So I'm just saying, can
you make these changes? I've added the
SQL reader database URL and I've added a
password for that user into that string.
Now Claude is looking for the password
for this user. So I can either give it
the password or just run this myself. We
have Superbase CLI set up and you should
have full access to our Superbase
system. Please trigger this yourself.
It's getting very lazy unfortunately.
Okay, so that is the dark mode and light
mode working with our logo. So that
works pretty well. It seems to be
struggling with this Postgress
connection. So I might just stop it for
two seconds and I might come into the
connect section of superbase because
this has a lot of the information that's
needed. Now you could direct connect or
use the transaction pooler. What should
we do? Let me think. Let's use the
transaction pooler. Actually this is
what we have set in superbase for the
Postgres connection. It was hitting the
wrong port. Okay, just need to update
our connection in the ENV. It was trying
to hit 5432. That's actually 6543.
Okay, let's reload the back end and I'll
get it to continue validating. Okay, so
security is now enforced at the database
level and I just saw that it tried to
delete from the table or delete from
other tables and it couldn't. Let's test
this out again. So, new chat total value
of all orders placed by the metro
office. Check in the sales table. Total
value is 3,524. Then into lang. Okay,
what's the total value of all orders?
There is the SQL. Excellent. Qu return
one row and that's the row. Perfect. Can
you give me a breakdown of these orders?
Cool. That worked. Perfect. Yeah. So,
select the product name, quantity, unit
price where the customer name equals
metro office order by order date.
Brilliant. Yeah. So, that's working
pretty well. Nice that you can see the
tool calls as well. So, let's try
another one. Give me all order data. So,
you can see querying database. Very
nice. 12 orders and we have 12 records
there. Excellent. So that's our text to
SQL up and running. There's so much more
you could do with this. I'll leave it
there at this point, but you could
definitely take that a lot further. Now,
it's a simple table. So obviously, you
could have a lot more tables and things
get a lot more complicated then when the
tables are normalized. So in a lot of
cases, you might need to denormalize
them by creating views and just make
things a little bit easier for your
agent. But you get the idea. That works
pretty well. So let's test out our web
search. Can you search online for the
latest weather in Galway, Ireland? Okay,
searching the web. As you can see there,
little bit of a rendering issue here.
The search bar has gotten very big. I've
reached the context window length of
4,000 tokens on my local model. I did
have that set higher, but then I
restarted the server, so I need to just
change that. But anyway, you can see
that it worked. And if we come into
Langmith and have a look at the tool
call, that's that one. So, you can see
the full back and forth. There's the
order data web search latest weather in
Gway Ireland and Tavali has provided all
of this back. Excellent. That's our
agentic rag up and running in terms of
having a vector store having a
structured database that we can use SQL
queries and have in web search. Let's
now test the sub aents because that was
this agent here which is now finished
and verified. So let's test it out
because of the documents that we've
uploaded. Let's try to find a big one.
This one is three and a half megs. Yeah,
that's 38 pages. So, let's ask it to
maybe summarize the higher 24in built-in
oven and we'll pass this product code.
Oh, this this weird styling issue is
because we have too many chats. Okay,
I've reloaded that model with 70,000
tokens of a context window. So, that
should be enough. Can you give me a
summary of the naire um built-in oven?
Here's the product code. Okay, let's see
how it goes. I'll check the documents to
find information. So, it's searching the
documents. Couldn't find any documents
about the built-in oven. I really need
to fix these formatting issues cuz it's
it keeps popping down. Okay, that front
end fix is now complete. So, the scroll
bar on the left stops at this point. So,
the user menu always appears and that
should hopefully fix our issue with the
chat. Let's jump into Langsmith and see
what happened here. So, back into
Langsmith. So, the summary of the
built-in oven, it did search documents
naire built-in oven hcw.
Ah, the metadata filters are are killing
us here. It set document type as product
spec and give topics. It's just being
overly conservative. What's the best
thing to do here? So, I probably need to
just update the system prompt and to
guide this model a bit better and how to
use these tools. So, let's see where is
our system prompt. So backend app models
possibly services LLM service. Okay. So
this is our system prompt. You're a
helpful assistant for the rag
masterclass application. You have access
to multiple tools. The available tools
are these. Okay. So I'm just going to
say for the moment do not use metadata
filtering. Search modes hybrid keyword
or vector. Yeah, we'll leave that for
the moment. And there's the analyze
document sub aent. I think we need to
just describe how it's okay for the
agent to essentially execute a retrieval
strategy so that it can use multiple
tool calls to actually get to the
response. So I might just use cursors
agents for this one. Within this LLM
service Python file, can you update the
system prompt around the tool call
usage? I want the uh the AI agent to
essentially generate a retrieval
strategy to answer the user's query and
then execute against that strategy. And
if that means multiple tool calls to the
search documents tool or to querying the
sales database, so be it. So this is
really where the agentic side of it
should kick in because we want the agent
to be able to work through tool calls
progressively and build up a view of the
data similar to the way claw code does
it in the in the code editor here. Now
we are using a much smaller model. It's
a 30 billion mixture of experts model.
So there's arguably only six or seven
billion parameters in play at any one
time. This might be kind of at the edge
of what these local models can do. Okay,
let's keep that develop a retrieval
strategy and then execute it
strategically. Let's just restart all
services because these changes to the
Python files may not kick in if I don't.
Okay, and we'll try this one again. And
we got a superbase error. So, it did
carry out the search, a hybrid search
with the product code and naier. So,
that should have produced the right um
document and it did actually a 24in
built-in oven. And then a tree with the
analyze document tool call and I pass
the document ID summarize the ner
built-in oven with the query. So
actually this is exactly what we wanted
from this main agent. So what happened
our sub agent? This is probably where
this error came in. Postgres couldn't
retrieve response. Please check. We'll
copy this code and let's see can cloud
code get to the model over this one. In
fairness this is pretty complex
functionality. Um so I'm not surprised
that it didn't get it right first time.
And this is the agent that built this
feature and it's nearly at 60% of the
context window. So I'm tempted to just
start from scratch here. I'm currently
manually testing um the functionality
built in module 8. I'm encountering this
error message in a chat that is
triggering the sub agent. Can you see
what's going on with this? So there's
the message. I won't plan just yet.
Let's see. Can it actually figure it out
on the fly? The one thing that jumps out
to me is logging. I think we need a lot
more log files, debug files to actually
get to the bottom of certain issues like
this. And lang is great because it's a
very visual way to figure out how the
tools are being called. But something
like this where it's an agent within
this codebase communicating with the sub
agent within the codebase, all of that
is locked in the codebase itself. So we
need some visibility on that. I don't
know which direction this is going down.
Now the error is coming from the Subbase
Python client when using maybe single
with the query that returns no results.
The 204 status code means no content. P
the client is raising it as an exception
instead of returning none. Okay. Uh I
have no idea. Maybe I'm definitely not
committing to git enough as well cuz I
feel like we may be going down the wrong
path with this. If we were committing to
git kind of a lot more frequently, it
would be easier to roll back. Let's see
though. Okay, it's made those changes.
Let's test it out now and see. So back
into here. new chat. So, searching
documents. So, that's our rag. That's
our vector search. Looks like there's
two calls happening. I need to fix the
formatting of this because these should
appear obviously below and when one is
finished, it doesn't need to keep
appearing. Yeah. So, this one looks like
it's failed. Let's track it. So, we have
got the right chunk back and then tried
another query. I don't know why it
didn't try to um trigger the analyze
document tool. Let's try it again. I've
grabbed a screenshot of that as well
because it's not supposed to render like
that. Obviously, we're getting some
strange rendering issues on the chat
interface around tool calls as you can
see in the attached image. Can you fix
this up? Because it should obviously be
progressive. Yeah, it doesn't seem to
have a tool call complete event. So,
it's going to implement that. Okay,
that's fixed. So, at least we are now
seeing a a green tick mark when it is
complete. Still should be showing below.
I wouldn't mind also seeing, you know,
what is actually been searched. We need
a little bit of transparency here.
Similar to what you have with kind of
claude and chatbt and then they all just
disappear. So still some front end bugs
to work out here. That seems to have
worked in the sense that I have the
green tick when it's complete. However,
the tool calls are still showing above
the first message from the agent. I'm
just looking at how Claude renders this
stuff. So you can see there's the tool
call. You have different steps as well.
So they have nested steps and then
obviously this is the thinking mode of
the the LLM. I'll take a snap of this
and just try to reproduce this type of
interface. Can we try to reproduce this
type of layout? I don't know is thinking
mode enabled with this agent. If it is
and we're getting think tags back and a
thought process, we could render it in
the bubble as you see here. But then all
of the tool calls, they're grouped like
this. Um you can see the results of the
tool calls as well. Can you have a look
at the attached image and let's try to
recreate this? Okay, let's see. Can we
get this sub agent working? I have
Claude working on this layout so we can
have it a little bit more like a
standard LLM chat with kind of thought
process and tool calls. Let's grab the
uh the file name and let's just ask can
you trigger the analyze document tool
pass this file name and ask to provide a
summary of the file. So this should
definitely trigger the analyze document
tool and it has. Okay, document not
