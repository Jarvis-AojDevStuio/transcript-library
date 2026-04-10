---
video_id: "3wglqgskzjQ"
title: "Anthropic killed Tool calling"
channel: "AI Jason"
topic: "ai-llms"
published_date: "2026-02-22"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=3wglqgskzjQ"
duration: 849
word_count: 2834
---
So, entropy has released a list of
really interesting updates for the
agenda tool calling then not a lot of
people are talking about or pay
attention to but I think it is really
big deal if you're building agents
particularly for longunning and complex
tasks and this is what I want to talk
you through today what it is and how can
you apply to your agent so what entrop
here has I can almost consider as two
calling 2.0
If you're not familiar with two calling
concept, two calling is a foundation of
agents. It transform large language
model from outputting pure text to
outputting a specific JSON that can be
used to invoke an API or functions. So
that enables large language model to
take actions in real world and the
mechanism of tool calling or function
calling hasn't been really changed for
the past two years. Basically you will
give large language model a list of two
definitions. It has title, name,
description and most importantly the
parameters that agent need to generate
to run this function. Then when user
asking agent question like what's the
weather in Paris it will send both the
user question to schema to the large
langu model which will return a tool
called text looks something like this
where the model decided to call get a
weather function with param paris. Then
on the server side we will run the
function with this specific param get a
response and then send all the previous
message plus this new tool response back
to the model and in the end the model
return a synthesized message. So when
you look at this process it's actually
kind of manual and basic but because
everything is happening automatically it
feels kind of magical. This is exactly
what is happening when you message your
cloud bar and it is showing typing
behind the scenes is doing this ping
pong round trip to decide what tool to
call output params run function get
response back decide the next step but
this tool concept we introduced two
years ago also has a lot of problems and
limitations the biggest issue is
efficiency so for more complex task
where agent will run multiple different
tools in a row we're basically purely
relying on large lang model to generate
the parameters for each function and
this can lead to some nondeterministic
behavior as well as loads of wastes in
the token context window. Let's just
take one basic example. Let's say your
agent has access to a list of Gmail
related tools and you ask it what are
the all the emails we have from Bob in
my Gmail inbox. What happen is agent
will first try to call the function
search email with parameters Bob which
can return a list of different email ids
because that's how their API endpoint
works. Then to get each email agent will
need to run re email two with ID one
then do it again for the other email ID
repeat multiple times until it get all
the information and here we are relying
on large range model to regenerate the
ID exactly same and also some of to MCP
their response result is gigantic like
for the search email function it return
us a huge amount of metadata that we
don't really need even though we just
need the ID to be able to invoke the
next function but all those information
just stay and eat up our context window
unnecessarily. And this type of
situation can get even worse in some
other situation where the function tool
core par is actually complicated. Let's
say you give your agent a task to write
a blog about AI news and it can run the
web search first which return list of
URL and for each URL it will run the web
fetch tool which will return HTML
alongside a whole bunch of noise in the
HTML as well. And in the end if you have
a specialized tool to write block where
it will take row content and output a
well-written block then large model will
need to manually recreate all the row
content from each web fetch function to
pass into this right block tool and this
is going to be very expensive and with
whole bunch of token unnecessarily and
this problem is not going to be solved
by just having model with bigger context
window because even though today's model
has a 1 million context window the
actual effective context window is just
somewhere between 120 AK to 200K. So you
almost always want to optimize what goes
into context window. And this is what
Entropic's new advanced two core release
is so interesting. They released a list
of different improvements to it two core
capability to solve exactly this problem
and I will talk you through one by one.
Firstly, let's talk about programmatic
tool calling. This is one of the most
important release here. The main idea
here is very similar to a paper called
executable code actions. So instead of
using large learn model to be the glue
to take a response from one action and
passing to next action, what if we can
just give a model environment where it
can access any tools the agent has
access to and just let larger model to
output a piece of code to run multip
functions. It will know how to use code
to passing the result from one function
to the other. It can even use things
like for loop conditional pass to
achieve more complicated workflow in a
very deterministic and token efficient
way. And this paper was released when we
were still on like GPD4 era but the
improvement of 2 use was already
significant and cloudflare also had
something similar released last year
called code mode. They found that large
model is much better at writing code
rather than outputting JSON like this
for calling the tool. So getting large
model to perform task with tool calling
is almost putting Shakespeare through a
monthsl long class in mandaring and then
ask him to write a play. So their point
of view is that larger model just going
to be so much better at writing code
rather than outputting JSON and
reasoning about it deciding the next
step. So they also have code mode where
it has function to convert any MCP to a
TypeScript. So the agent can write a
code to evoke those MCP tools and this
entropic programmatic tool calling is
exactly the same concept. So instead of
just getting model to run one two cord
time see the response and decide to next
action they can just get a model have
access in an environment they have
direct access to all the MCP tools. Then
the model can just write a piece of code
like this to invoke those MCP tools so
that they can contain whole bunch of
noise and the context within the
function rather than exposed in the
context window. And in their
experimentation they compare two methods
side by side to get same model perform
some puzzle resolving tasks. And you can
see the context window of programmatic
to call core is so much smaller than the
traditional tool call and ops 4.5 is
able to proceed much further on this
task completion compared with the
previous one and the way they design
this make it very easy for you to enable
programmatic tool calling in your
existing agent setup without
restructuring the whole agent
archration. All you need to do is in
your larger model response making sure
you include this code execution
function. So code execution function is
a sandbox where agent will use to write
and execute the code. Then for each tool
that you pass into the large model, you
can pass this new param called allowed
caller. Pass this code execution 2026
0120 as one of the callers here. With
this the programmatic two call is
already automatically activated. It will
firstly return a response look like
this. So when you pass large model a
function for query database with a
request query customer purchase history
from the last quarter and identify the
top five customer by revenue large model
will firstly return a response of a
piece of code that it written and inside
this code you can see it will try to
call this function with certain param as
well as another one with two use for
this function and input param. So you
can take out this response by filtering
out all tool use and caller to do the
actual database query and once finished
you can send back all the past
conversation history with a new user
message of two response. Then the large
lang model will just take your new two
results feeding back to the piece of
code you written before run it get a
response and synthesize and in the end
get a final response back. So the change
on agent side is fairly minimum. All you
need to do just adding this code
execution tool alongside a lot of
quarter param for for the functions and
update your agent runtime to be able to
extract those type of tool use and this
comes with bunch of benefits because
with code large model can use for loop
to just batch processing task that can
be ran in parallel and you can also use
conditional loop to set up some more
complex structure as well as some
deterministic filtering to making sure
only relevant information are returned.
It fundamentally reduce all the model
round trip to just minimum amount of
larger model call. So you can reduce 30
to even 50% of token consumption and run
agent much faster. This is particularly
good for use cases where you're
processing large data sets that needing
aggregations or fairly deterministic to
call sequence that can be represented in
code. And if you're interested in
learning more, we have the step-by-step
examples and tutorials in AI builder
club about how it works and how you can
set things up properly for both
programmatic tool and all the other
techniques that we're going to talk
about. Meanwhile, we have course and
content to cover AI coding, building
production agents and weekly workshop
where industry experts and myself will
come and share the latest learnings of
building large learning model software.
And most importantly, we have this
community of top AI builders who are
building and launching AI products now.
So if you want to follow and learn what
myself and other builders are reading
and learnings every day, this is a great
place to be. I put the link in the
description below so you can join if
you're interested. But yeah, this is the
first part of programmatic tool call.
Next, let's talk about dynamic filtering
for web fetch. Dynamic filtering is a
subset feature of this programmatic tool
call. So entropy releases dynamic
filtering capability for the web fetch
tool. The problem try to solve is that
web fetch tool traditionally dumps a
large HTML page into cloud's context
window. But most of those HTML content
is irrelevant and this leads to a lot of
wasted token in cloud's context window
and reduce accuracy. And what dynamic
filtering do is that it will add a layer
in the middle instead of returning the
full row HTML. It will run a code that
filter out only relevant content and
extract only those relevant ones into
context window. And from their testing,
this dynamic filtering methods is able
to reduce on average 24% of token
consumptions. To activate it is also
pretty straightforward. You just need to
making sure you're pointing to the
special version of web fetch tool
2026209.
You will see in API response you will
automatically see those code execution
step happening in the middle to extract
only specific relevant keys. So in the
end it return back only the relevant
content back to large range model.
Meanwhile J also introduces two search
concept. So the problem try to solve is
that the way agent use tools or MCP is
not really scalable very easily. loads
up context window in your agent
regardless whether this tool is always
needed or not and this didn't feel very
optimal and also why so many people are
dropping the concept of MCP instead of
moving towards the skill plus CRI
version because it just so much more
token efficient however agent skill is
not a complete replacement for MCP
because MCP also comes with a lot of
benefits especially around the type safe
since large model will know exactly what
the input schema is and will try to
follow that exact at input schema which
you don't really get from the skill plus
CRI easily. That's why entropy released
this tool search concept. What that
means is instead of loading up hundreds
tool schema into context window, you
just have one tool called tool search
tool that can be used to retrieve
relevant tools and that takes only
around 500 token. So for many scenario
it can lead to up to around 80% of
context window optimization. And the way
it works is that you can give your large
model call a two search tool and then
for each tool MCP you can start setting
this deferred loading data. Once the
deferred loading is true then this tool
won't be visible to the agent at
default. Instead large model can use
this tool search tool to retrieve the
information dynamically. And in the
large mode call response you'll just see
some additional steps show up in the
middle where you will see it it will try
to invoke this tool and this works with
MCP as well for the MCP server is
actually very flexible you have this one
config called default config and if you
set defer loading to be true that means
all the tools from this MCP server
default won't be visible but you can set
specific actions within this MCP like
search events here to be deferred
loading false which means only this
specific function will be always
visible. So this is really good methods
if your agent has more than 10 different
tools or MCPS and use this to
significantly reduce the amount of token
consumptions. And lastly tool use
example. So this is try to solve another
problem that for some of the complex
tools you found large model even with
MCP will struggle to know how to use
this tool. Think about a tool you might
have for customer support called create
ticket. It has many different properties
that agent need to fill in. Even though
schema will clearly describe what kind
of field need to be put in but it's not
entirely clear how to fill in each
field. For example, for due date here,
it's not clear which format you want
agent to output for due date. And also
there might be some correlation between
one field to another. Like in this
escalation, you might have different SLA
hours depends on the level field here.
And all those things can be probably
achieved before by adding more
description and prompt to indicate how
to use a tool. But now they have more
specific field for you to adding those
information in called input examples. So
when you define a tool you can also pass
in a array of examples of how this tool
will be called. So it can be used as
example for agent follow and this is
particularly useful for complex nested
structure where valid JSON doesn't imply
the correct usage or your tools has many
optional parameters and larger language
model just keep forgetting or not
feeling certain optional parameters when
it should in his own experimentation
using two use example can improve
accuracy from 72% to 90% on on complex
parameter handling. So those are a few
new use cases and patterns and tropic
release about tool calling that I
thought was really exciting and
interesting and again if you want to
learn more there are step-by-step
tutorial in AI builder club you can read
and follow and every week we have weekly
workshop to talk through those latest
learnings from both myself and industry
experts and if you want to follow and
learn what I'm reading every day about
this constant changing AI field this a
great place to be in. I put the link in
the description below so you can join if
you're interested. I hope you enjoy this
video. Thank you and I see you next
