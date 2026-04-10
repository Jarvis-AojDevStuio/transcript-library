---
video_id: "8dVCSPXG6Mw"
title: "Anthropic Just Killed Tool Calling"
channel: "Prompt Engineering"
topic: "ai-llms"
published_date: "2026-02-18"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=8dVCSPXG6Mw"
duration: 820
word_count: 1963
---
Okay, so with set 46 release, Entropic
also introduced a few very interesting
and important developer tools that
nobody is talking about. These are not
only going to save you money, but they
will also improve the performance of
your agent. Now, in particular, I'm
talking about programmatic tool calling.
This feature has been available for a
while. The idea is that instead of your
agent trying to load everything into the
context window, you can make specific
calls to a specific tool just by writing
code. And this way you will not only
save on the tokens that the agent is
going to be using, but you're also
improving on the accuracy of the
calling. Now has been doing some really
really interesting engineering work and
they have been one of the companies that
is actually openly discussing their
innovations which is really really cool
to see. Now the question is why this
works better than JSON structure that
you provide to your agent for tool
calling. Well these agents are LLMs are
specifically trained with code. They are
not trained for tool calling and writing
code is pretty natural to them. Now the
question is why even pay attention to
this? Well, I think anthropic has a
track record of when they release
certain tools or technologies the rest
of the industry actually tends to adopt
them. This happened with the
introduction of MCPS or model context
pro protocol. Now every company is
building MCPs. We saw a very similar
trend with agent skills. Pretty much
every coding agent out there is
introducing agent skills or supporting
them. Now the only other time that we
have seen wide adoption of something
coming out of a frontier lab was
probably the chat completion API from
OpenAI. Okay. So let's put things in the
context and why exactly do we need
programmatic tool calling. So for that
we need to look at this context window
problem that every agentic company is
trying to solve. And this has been made
worse with the introduction of protocols
like MCP. Now here's what usually
happens. Let's say if you have an MCP
connected it's going to have different
tools. All of those tool definitions are
loaded into the context of your large
language model. Now during interaction
with the user, it's going to make tool
calls. The input outputs of every tool
call and then subsequent tool calls are
also put into the context window. You
also have the uh system prompt plus user
memory and the actual user messages and
responses.
And as a result you can see that most of
the context window is going to be
polluted or used by unnecessary things
that you should be able to avoid. Now
last year we started seeing this concept
of context engineering appearing
everywhere and the idea is that you want
to provide just useful information in
the context window and discard
everything else. Now in general uh tool
calls play a very major role in this.
Now here's what usually happens. When
the user query comes in a coding agent
like clot code is going to make a tool
call. The results are passed on to the
context that is going to make another
tool call and this process repeats every
time you invoke a tool. The results are
passed on to cloud code and put it in
the context window. Now the idea of
programmatic tool calling is a little
different. In this case, instead of
directly calling the tool cla or your
coding agent is going to write code to
invoke certain tools in a sandbox
environment. The coding agent can define
the order of how those tools are going
to be invoked in this sandbox
environment. Now in this case we will
provide the code written to the sandbox
along with the actual input and the only
output is going to be the final summary
or final answer. So anything that
happens in between stays within the
sandbox environment and as a result the
coding agent is going to be only seeing
the final results.
Hence, you're going to be using a lot
less tokens compared to if you are doing
a tool calling. Now, one thing is very
important that this is not just one
company idea. Other companies have been
exploring the same idea. Let me walk you
through a timeline. Back in September
2025, Cloudflare actually published a
report called code mode, the better way
to use MCP. And they also came up with
this idea of programmatically invoking
different tools rather than going the
traditional tool calling within an MCP
server. And they showed that you can
save from 30% all the way up to 80% on
tokens if you adopt this sandboxed
approach. In November 2025, Anthropic
published this article called code
execution with MCP building more
efficient agents. and they pretty much
came to the exact same conclusions as
Cloudflare.
Then uh later in the month Tropic
released the full advanced tool used. So
this included tools like tool search
tool which is another way of looking at
or looking for specific tools within an
MCP server which saves you on tokens
that are going to be used by the agent.
And with that they also had this uh
concept of programmatic tool calling.
Now their results at that point showed
about 37% token reduction and improved
accuracy on several benchmarks. And just
like anything released by anthropic the
usage kind of exploded within the open
source community. So you had
implementation from blocks goose agent
which added code mode MCP support. Then
there were other um GitHub repos that
implemented the programmatic tool call.
Now a good example of this is light LLM
which basically added native supports
across different providers and this
brings us to today. So basically moved
this from beta so it's now fully
supported and they also added dynamic
filtering
for web search. We're going to look at
that later in the video. But both of
these concepts together can really save
you not only on token cost but also can
improve the performance. Code execution
has been part of Gemini offering since
Gemini 2.0 and now even OpenAI GPD since
5.2 has added support for 20 plus
different tools behind their API. Now
the key insight is that LLMs are trained
on billions of lines of code especially
with coding agents. You can see that
they can produce and understand code but
barely any synthetic JSON tool calling
formats. So you want to do or let the
agent do what they are good at and that
is writing code. Okay. So what exactly
does this looks like in practice and
what type of results you should expect?
That's exactly what I want to talk about
in the rest of the video. With sonnet 46
release, Anthropic also introduced two
different set of tools. uh one is web
search and the second is dynamic
filtering capabilities. Both of these
are powered by programmatic tool
calling. These tools were previously
available but now anthropic is
introducing improved versions of these.
And with this they say cloud can now
natively write and execute code during
web searches to filter search results
before they reach the context windows
improving the accuracy and token
efficiency. So like maniacs these models
used to just dump everything into the
context window whenever they used to do
web search. So this will pollute the
context window with irrelevant
information. Now they say that after
doing the initial search cloud writes
code and execute code to do
post-processing on the query results and
using the programmatic tool calling by
doing dynamic filtering they are going
to post-process the results and only put
the relevant results in the context
window. So this is a step that happens
before injecting information into the
context window. So they were
specifically looking at two different
benchmarks. one is browser comp and the
other one is deep uh search QA and they
saw an average of 11% improvement while
average of 24%
fewer input tokens.
This is significant. This kind of
improvements are usually expected if you
have a major uh model version upgrade.
The browser comp benchmark tests whether
an agent can navigate many websites to
find a specific piece of information
that is deliberately hard to find. Now
with this new dynamic filtering they saw
that sonnet went from 33% to 46%. We're
talking about almost 13% improvement
whereas OPOS went from 45% to 61%. And
again, this is dramatic improvement on
this one specific benchmark. But we do
need to keep one thing in mind. This is
not always going to result in reduction
on of token usage. Uh and I'll explain
why later. Now this second uh benchmark
deep search QA basically tests the
capability of the model to find all the
correct answers via web search. So a
question has more than one correct
answers and it's supposed to find those.
Now in this case again we see an F1
score improvement from 52 to 59%
for Sonnet 46 and COPUS also saw almost
8% improvement.
Now here's the most important thing. Uh
they say token cost will be will vary
depending on how much code the model
needs to write to filter context. So
this price weighted token decreased for
sonnet 46 on both the benchmarks but
increased for OPUS 46. So that means
OPUS was writing a lot more code
although the number of tokens in the
final output were reduced but since OPUS
was writing a lot more code to filter
those results the weighted uh or the
price weighted token actually increased
for OPUS.
So this is important to keep in mind.
You're not always going to see reduction
in token price, but that is an
expectation. Okay. So how exactly does
this work? Well, if you're using the
search API, you don't have to do
anything whatsoever. You just provide or
use the exact same search API with data
fetching enabled. And Anthropic is now
going to automatically use this
capability to reduce the number of
tokens that are going to be returned
with only the most relevant information.
Now there are also a number of other
tools that went out of beta and are now
generally available. So one is code
execution sandboxes. Memory is another
one. Programmatic tool calling. Then
tool search and tool example are
basically some cookbooks that anthropic
has provided. Uh they also released
detailed documentation on how to use
this with some really quick examples. So
for example, if you look at this in
here, you will just provide a list of
tools. The structure remains very
similar to normal tool definition. You
provide what the tool does along with
the name. Then the input schema what are
the required parameters and what is
going to be the out output schema along
with the definition of the tool and then
if cloth needs it instead of doing
function calling it's going to just
write code to execute this specific tool
for you. Now I suspect this is probably
going to become a standard in the
industry just like MCP and agent skills.
Now do let me know if you have a
specific use case for this and what are
your thoughts and also if you are
interested in more detailed tutorial on
how to use this with other coding agents
let me know. Anyways I hope you found
this video useful. Thanks for watching
and as always see you in the next one.
