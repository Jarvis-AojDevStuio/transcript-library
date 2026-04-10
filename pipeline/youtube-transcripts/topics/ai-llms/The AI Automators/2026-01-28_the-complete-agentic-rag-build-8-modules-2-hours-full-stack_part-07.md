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
word_count: 3727
chunk: 7
total_chunks: 7
parent_video_id: "xgPWCuqLoek"
---
found or not accessible. So that's
probably what our issue is. I'm not sure
why it rendered like that, but we can
figure that out again. So document not
found or not accessible. So let's have a
look in our documents. So the file name
is there. So it's saying it can't access
the document with that ID. So we can see
it is triggering the analyze document
tool. It's passing the document ID and a
query such as summarize. Sorry, it's the
name. It's the file name. Ah, that's the
ID. Yeah, we need to map it to the file
name because that's in the metadata. So,
if we look at chunks, the chunk metadata
has file name. I'm now getting this
issue when I'm trying to trigger the
analyze document sub agent. I think
we're mapping to the wrong field. It
should be file name as opposed to ID.
Does that make sense? Okay, that's that
one. Now, I think the UI updates have
finished. So, let's have a look. What's
the weather like in Gway? So, we have
thinking. I'll check the weather. Okay,
that's yeah, kind of worked. The steps
should have stayed where they were. So,
we can show and hide. That's good. Um,
current weather and Gway, no results.
Doesn't make sense. So, that kind of
worked. The steps now shows except they
flow to the bottom. They should appear
where they were in the sequence of the
actual inference. So, they should appear
underneath the first sentence in this
case. Okay. So, that's working away.
Let's go back to our other bug. Let's
copy this and let's see. Can it analyze
the document? And no. Oh, I might need
to restart the server. Let's let this
one finish first. This is why it
actually makes sense to use a git
checkout or to use git work trees. So
that way we could have a clone of the
codebase. So that way you can work on
bugs in this case or features in
parallel without the agents tripping
each other up by restarting the server
or making changes to the same file.
That's something we'll definitely look
at in the next video around deployment
and then also making changes and then
how do you check out and commit those
changes. Okay, let's try it again. No,
still getting this error message. So,
it's just an issue with the prompting.
Okay, let's try it again. And it has
possibly completed. One step completed.
Results found. Okay, so we're getting a
different PCR error here. Could not find
the table public document chunks in the
schema cache. Now it's a different
error. So definitely not the document
underscore chunks. That's some lazy
coding by Claude. So this is why plan
mode makes a lot more sense. And it's
also why having a verification loop
makes more sense so that you don't need
to be the one to actually provide the
the feedback. It should be able to do it
itself. So that's something that I
probably could lean a bit more on and
and step out of the way. So we do need a
loading section there. Okay. Yeah, that
has worked. Excellent. And fast as well.
This model is incredibly fast locally.
Now, we have lost all of our tool calls,
but it is working, which is lovely. Can
you check out the attached screenshot?
All of the tool calls are showing and
rendering really nicely, but then when
the agent is finished, they all
disappear. I think Claude is realizing
that this is more complicated than it
initially appears because essentially we
need to save to history the tool calls
if we want to be able to track back up
through the conversation and see
previous tool calls for previous
messages. Okay. So, let's see. Does it
disappear this time? No, still there.
And now I'll just ask a follow-up
question. Can this appliance be used
outdoors? So, again, it's going to a
tool call. No, this appliance cannot be
used outdoors. Context window. I thought
I increased that to 70,000. Actually, it
was set to 4,000. My server restarted
without me realizing. So, just reloading
that at 70,000 context window. Yeah, we
still have a little bit of breathing
room on the GPU, so that's fine. Okay.
So, let's ask that one again. Can the
supplies be used outdoors? And cool.
Yeah, we're not getting those issues. We
are getting these steps through. I don't
know which tools they're calling. So, we
might get the UI updated so we can see
what tools have been called. We also
haven't got a response back. Yeah, the
output was a tool call, the search
documents tool. And one thing I've
noticed as well is that when you go
through the different conversations, you
can't see those tool calls. So, the tool
calls do seem to just live in the actual
session itself as it's been built out.
In reality, I think we probably need to
save them to this messages table. So, I
might open that up as an issue
essentially and get the cloud code to go
and fix it. Yeah, I'll do it on this
thread just because this is the one that
has built out this feature. That's
working pretty well. Now, it would be
good to actually have the name of the
tool that has been called. It's not
obvious from the tool calls. Secondly,
when I go to an older conversation, if I
refresh the page, let's say on the
existing conversation, I lose all of the
tool call information. So, do we need to
save this to like the messages table in
the database? Yeah, looks like you're
going to save everything now to a JSON B
in the messages table. Is there any way
to enforce the LLM not to end on a tool
call that it needs to at least output a
response? I've seen examples of an LLM
where it just finishes on a vector
search and doesn't do anything with the
retrieved data. Interesting. It looks
like there's a max tool rounds of three.
So, we definitely need that as a kind of
a configurable parameter. And there's
another option here which is uh to force
a final LLM call without tools. In the
situation where the tool was the last um
kind of action of the LLM, you could do
another call just to synthesize an
output. How about this? Let's set that
configurable tool call limit to 10. But
then also can we have a dynamic element
to the system prompt which basically
tries to force the LLM to output an
answer before it hits that limit and
just reference the variable in case we
change the number. It's funny, I do like
using cursors AI agent as well as claude
code because for things like that you
can kind of just ask it questions of the
codebase whereas with cloud code you end
up in like kind of a multi-step
multi-round agent interaction at times
if you just want to chat to the codebase
the cursor agents are quite useful okay
let's try this out again so can you
trigger the analyze document tool for
the particular ID now so we can see it's
analyzed document that's great we are
getting an error here I'd say the
Superbase migration wasn't pushed. And
it's interesting. Anytime there's a
superb basease migration, the agent can
never push it. It can never figure it
out. I think I need to add some
information to claw.md about this. It
never seems to realize that it's a
remote setup, not a local setup. It
doesn't ever realize that the Superbase
CLI is installed. Can you do this? The
Superbase CLI is installed. It's a
Superbase remote implementation. here.
Can you review the claw.md file and just
make sure that future clawed code agents
know how to actually carry out superbase
migrations? Okay, so let's test this out
again. I think the back end has been
refreshed. So we've triggered the
analyze document, pass the ID. We have
got the document back and all of that is
great. Now if I refresh, so we can see
that this was loaded. We are no longer
seeing the nice uh thought process that
we saw. So that might be something we
could add. We'll add it to the backlog.
But if I ask a question now, can this
appliance be used outdoors? So now it's
carrying out a document search. Whoa, it
looks like we're caught in a loop here.
Yeah, I'll just stop that. Let me try a
different model. So let's try the Quinn
3 32 billion model. And let's just try
that question again. So new chat.
Interesting. This model provides think
tags whereas the mixture of experts
model didn't. So we can reproduce what
we have on Claude actually for that. So
you can see them there. are the think
tags. Can you render think tags similar
to the screenshot where there's a
thought process bubble essentially?
Here's an example of how this currently
renders on our application. Okay, that's
done. Let's give it a shot. Well,
there's a thought process. So, that's
better. Brilliant. Styles can be updated
a little bit, but uh that looks pretty
good. Okay, it semi broke here. Whoa.
Okay, stop. I think it's because there's
multiple uh think tags here. This is a
little bit buggy. So the first thought
process bubble worked fine. Then it
moved into the analyze document step.
Then I got the the tool response within
that pop-up. That's fine. However,
there's now another think tag of the
agent. So we need a second thought
process bubble. And also not all models
use think tags. So you can't start it
off just using a thought bubble. Yeah.
So this is the the edge cases that we
need to test out for. There's quite a
lot in this. They're quite sophisticated
interfaces. Okay, so that's good. Then
it's triggered the tool. Ah, it jumped
again. At least now we have a second
think tag. So, we're making some
progress. Whoa, massive bouncing all
over the pages here. So, there are still
bugs here. It was pretty good up until
this point. That should have been up
there. And we got into the the summary
of the document. That's pretty much what
I asked for, but then for whatever
reason, it duplicated it all and then it
stopped. Now did all of this happen in
Langsmith as well or is that some sort
of strange behavior that we are seeing
in the front end or in the back end?
Maybe it's an application bug. This
seems to have worked correctly. So we
have our input. It hit the analyze
document with the ID provide a summary.
We get the tool call response. So this
is the internal think of the sub agent.
This is what I'm talking about how the
sub agent rendering is going to cause us
issues. So the sub agent is thinking and
then it sends it back up and then our
agent outputs this and it thinks about
it. There's a lot of thinking going on
anyway. So okay, let's start by looking
at what the user provided is the this
one. So this is the thought process of
this tool call and this is the output
and I think this is specific to these
smaller local models. I'll just switch
it back to the OpenAI one. So it's GPT
5.2
and that's our base URL. So let's go
into new chat. Yeah, the fact that
that's rendering at the same time as the
thinking would suggest that this is not
actually the main agent thinking it.
This is the sub agent. Yeah, that's the
issue. It looks like we're duplicating
the rendering of the output from the sub
agent. It appears both as main agent
text as well as sub aent text in this
box. So the sub aent content should only
ever render in that box. So, not
specific to local models, just a bug in
our code essentially. Okay, let's go
again. That's much better. And really
nice actually that you can see that it's
still rendering and then the green tick.
Brilliant. Can this be used outside?
Now, it triggers the document search.
So, that's the vector search. And it's
obviously picked up this from the
previous conversation history. Let me
just verify that. Exactly. Yeah. Can
this be used outside? So, it's still
getting the full flow of the
conversation. Okay, that's great. Now,
final check. Let's put it back to the
local model. We are nearly there I
think. So we'll copy that out. It's
Quinn 32 billion with thinking. This is
our base URL and let's get this back
again. So now it's thinking. Yeah, just
one small bug around the thought process
here. So this one is a thought process.
That should be up there. We're nearly
there. H one small bug around the
thinking tags. The think process showed
up correctly, the bubble and then the
hide steps and then the the the sub
aent. But then after the sub agent
finished rendering, the thought process
bubble dropped back down underneath it.
And then another thought process showed
up. I need to figure out myself what's
going on here. Let me just come back in
again. We have our user message trigger
the analyze document. So actually this
doesn't seem to have had any thinking
first. It then does some thinking. So
this is like the first round of
thinking, is it? This is the second
round. So where is the thinking here?
From looking at Langsmith, there is
actually three traces. The first trace
is my question and the thought process
and then the subsequent triggering of
the analyze document tool. The second
trace is then the sub agent doing its
thing and that's fine. And then the
third trace it is almost like it has the
full history but it's missing the
thinking tag in the trace itself but the
thinking tag is still rendered on the
screen. So that is that why the bubble
is jumping down underneath the tool call
response. So it is amazing how complex
these interfaces can get. I think it has
figured out the problem based off me
providing the exact issue. So it is
worth getting into the detail of it I
think. So we're restarting the front
end. Okay, give it one more shot.
Fingers crossed. So there's our thinking
tag and here's our tool call. So there's
our second think tag. Excellent. This is
this is perfect now. And there's our
response. That's really good. And then
let's ask our follow-up question. Can
this be used outside? Excellent. That's
so good. Now let's swap it back in for
our mixture of experts model. I just
want to make sure that it can work with
it because I was getting some really
strange duplication of of text streamed
back, but I think it might have been
actually sub agent tool calls. So, let's
eject that. Let's load back up our 30
billion. And we'll set our context
length up to 70,000, which is probably
as far as I can go on this GPU. And I'll
need to change the settings actually.
So, this is the VL30 billion. And now,
let's ask our question. Okay. So,
there's no think tags here. As you can
see, we're getting the tool, the sub
aent response. There's the streamed
answer. And then, can this be used
outside?
So, then it's carrying out a document
search. Cool. There we go. Can this be
used in the United States? So, again, a
bit of a document search. It's carrying
out a few searches. Is now carrying out
a web search and providing an answer.
Excellent. We're properly up and running
here. That's so good. Now, let's step
back again. So, this is a very specific
question. So, let's go back to this
question. Can you give me a summary of
the naier built-in oven and here's the
product code? So, it's gone to document
search. Then it triggers the sub agent
which loads it all into memory and then
answers it. Beautiful. Can this be used
outside? Excellent. That is really good.
So, that's module 7 and module 8 pretty
much built. Of course, more testing to
be done, but end to end on all modules
now. So, let's just commit everything.
So, I'll clear this down. Okay, so it's
pushed everything, created the tag, and
now we are just releasing. And there we
go. Modules seven and eight. So we have
our additional tools, sub aents, and
dark mode. And that pretty much finishes
this out. So from looking at the PRD, we
have covered everything except
deployment. And I'm tempted to leave
this for a follow-on video on this
series because there's a whole world in
the deployment area that I want to
cover. Not just a case of dockerizing
everything and deploying remotely, but I
want to cover actually managing this as
a production project because up until
now we have just been pushing without
blinking to the main repository. But in
reality, we need a dev environment which
pushes to a staging environment which
then releases in an orderly fashion to
the production environment carrying out
database migrations and making sure
everything is actually okay. when we do
that, we also need ways of rolling back
if the push does not work correctly. So
this is the real side of software
development. Whether you're using AI
coding or not, you need a way of
formally managing the release cycle and
release trains. So I plan on getting
into that in another video. To be
honest, where we have gotten this to, I
would in all reality call this an alpha
version. It hasn't been fully tested.
I've done smoke tests end to end.
There's been a level of validation that
Claude has carried out, but there's a
lot more testing to be done on this
application. So, I wouldn't be
comfortable deploying it anyway. But
let's go through it in another video in
this series. But if you look at how far
we've come, we now have an agentic rag
system that has a full chat interface
that has a full documents system that
has a full ingestion system where you
can drag and drop in documents. It uses
Dockling. It can support the processing
of PDFs, of DocX, of PowerPoints. There
is vision language model capabilities
within Dockling. So you can tie in a VLM
alongside your standard pipeline for
processing these documents. Within the
chat interface, we're handling tool
calls, we're handling sub agents,
there's markdown rendering. Within our
settings, you can swap in and out LLMs.
There's embeddings configurations,
there's rerankers, web searches
supported. So it is amazing how far
we've come in eight short modules and of
course all of this is a multi-user app.
So different users having their login
and then there's isolation through rowle
security within superbase. So the only
unrestricted table is sales data and
actually that is totally incorrect
because unrestricted means anyone in the
world can access. So we definitely need
to enable RLS on this, but we are happy
for that to be globally accessible to
all loggedin users. So we definitely
need to set an RLS policy on that. And
that's what I mean by this being an
alpha version. There's still plenty of
of due diligence to carry out and make
sure that this is actually ready for for
production. So on the one hand, we have
come pretty far in these eight modules.
On the other hand, we are only
scratching the surface. There's so much
deeper that we can and need to go with
this. As I mentioned, this is the first
video in a series. So, make sure to
subscribe to see how this system
evolves, but within our YouTube channel,
we have over 30 videos that dive into
the intricacies of some of these
advanced RAG systems. I have an entire
video on rag design patterns. Here, we
talk about the benefits of pattern
matching search as well as lexical and
semantic. In this video, I show you how
to use the deep eval system to actually
evaluate AI systems on an ongoing basis.
This video is about zero trust rag. How
do you secure your systems? I have a
number of videos on knowledge graphs.
This graph rag video has over 135,000
views. Agentic sheets, reranking,
multimodal vision rag. So definitely
subscribe to our channel and check out
some of these videos if you're looking
to level up your AI system. Now that you
see what it takes to get a full rag
application up and running in clawed
code, check out this video here to learn
all about context expansion, which is a
great way to improve the accuracy of
your rag system. Thanks so much for
watching and I'll see you in the next
