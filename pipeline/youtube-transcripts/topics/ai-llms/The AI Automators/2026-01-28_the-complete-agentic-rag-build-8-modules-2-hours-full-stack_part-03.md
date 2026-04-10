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
word_count: 3994
chunk: 3
total_chunks: 7
parent_video_id: "xgPWCuqLoek"
---
back end. So I'll just add that ID to my
ENV file which is what it wants me to
do. So I'll save that. So, I'm just
going to restart the back end. Now, I
could get clawed code to do it, but it's
something that I need to do so often. I
may as well just trigger these commands
myself. So, I can open up another
terminal here. And then let's just check
to see what command we need. So, I think
it's in scripts. Say restart all. And
this is what I need. So, you could just
ask cloud what's the exact command. So,
that's restarting all services.
And you can see they just popped up
there as well. And now, let's test it
out. So a new chat and let's ask tell me
about the whirlpool refrigerator. Now
that's actually not based off what's in
the vector store and that's just general
information on whirlpools. Is it
possible that we have multiple Python
services running or multiple front-end
services running? So when we restart
them they actually the other ones remain
open. So this is an issue I ran into. I
have two claws open here and I was just
having different conversations with them
and there are basically multiple
background tasks, multiple servers
running. So when I restart the server,
it's actually keeping the other ones up.
So we just need to update this restart
services script that it kills all
processes and does a full fresh restart.
So this is the depth that you need to
get to if you really want to understand
how these types of architectures and
these types of apps work between a
front-end React application on node and
a backend Python application in its own
virtual environment. Okay, hopefully
that has done the trick. So let's keep
an eye on our langu because we
definitely need to see traces. Every
request we make to an LLM has to show up
here. We're getting a bit high on the
context limit here as well. We're at
55%. So, I definitely should look to
clear it soon. Okay, let's try it again.
And no, that's not working. Okay, let's
clear down this session. Uh, the context
window is getting full up and I'm
getting kind of poor results back. Okay,
new session. I might just onboard this
agent to the project again just to try
to solve this bug. So, a key
productivity hack is to have multiple
clouds running at the same time. So as
one clawed agent is working through a
problem, another clawed agent can work
at a completely different feature, let's
say, or a different bug fix, and that
way you're making better use of your
time. For example, this bug fix has been
running for more than 8 minutes now, and
it may just have solved it. And while it
is interesting to track the progress of
the fix, it gives you a better
understanding of how the codebase
actually works, it can make more sense
to run at multiple features, multiple
bug fixes at the same time. So hopefully
now we have our traces up and running
and this is connected to the vector
store. Let's just trigger a chat message
now that that's fixed. So we'll refresh
here, go to new chat and we'll ask it to
tell us about that refrigerator that's
in the vector store. And we are getting
another error. So this is where you need
claude to be able to validate itself.
And while that claude fixes that one,
let's get another cloud up and running
and we'll get it working on a different
task in parallel. So we'll just onboard
it. Can you carry out some front-end
changes for me? So the threads on the
left hand side currently it just says
new chat. I would like these to be
dynamically generated depending on the
message that was passed initially.
Secondly, there's no way to stop a
stream of messages coming back from the
agent. And another thing is it would be
nice to have a loading icon when the
back end is actually working generating
a response. My traces still aren't
working. So I might just take a
screenshot of this. I'll get another
cloud up and running. So this will be my
third claude. And this time because it's
really struggling to actually figure
this out. I might go into plan mode. And
then I'm going to say we're having a
serious problem getting our lang traces
working. The env is set and it's set
correctly. That's for both the API key
and the project. However, the OpenAI
responses API, whatever way we're
wrapping it or whatever is happening,
we're not getting the feeds through. I
cannot see the traces and I need the
traces. Okay, let's run through our
terminals. So, here it's asking, do we
want to proceed there? Let's do that.
This is currently working through the
front end changes and this is now trying
to get to the bottom of that issue. Also
something to consider here is that the
original spec was for the OpenAI
assistance. However, we moved it to the
OpenAI responses API and maybe there's a
legacy hangover that could be a problem.
Also check versions of of everything
relevant as well. Maybe we're running
older versions of things. Okay, so that
front end change looks good. It was
thinking and we have the stop button now
which appears down there. That does seem
to have worked. Yep, it stops it in its
tracks. And yeah, we now have the
dynamic titles as well. So the front end
fixes are are really fast, which is
quite nice. Okay, so let's ask our
question again. Tell me about the
Whirlpool refrigerator. Excellent. So it
is now working. World refrigerator is a
sideby-side model, electrical
requirements, etc., etc. So that's
exactly what is in that PDF. So we now
know that that our vector store
essentially this file is accessible via
the responses API in the front end and
we're able to ask questions of it and
this is manage drag. So you know you
could drop in more and more files into
this vector store using this interface
or you could build your own interface
which is what we're going to be doing in
the next module and you could drop files
into that interface for it to push them
up into this storage bucket. So all of
that is possible. But what we're going
to do next is we're going to get out of
the world of manage drag because
everything is in this black box. You
know, we don't have any view of the
chunking. We don't have any view of the
embedding models, the strategies used to
actually trigger the different retrieval
tools. So it is very much a black box
and you're also paying for that. So in
the next phases, we're going to move
away from OpenAI. We'll plug in open
router and I might even try out my own
AI server here to run a local model and
let's actually put the building blocks
of this rag system together using PG
vector within our our superb basease
instance and the one thing we have not
resolved is our tracing. So Langmith
still is not showing traces and so I've
brought out the big guns. I've gone to
the plan mode and that has triggered
three explore agents to explore the
codebase to figure out what actually is
going wrong. And while that does some
digging, I might make some more
front-end changes just to keep things
ticking over. So, I've just burned
through my claw allocation. So, I need
to wait for 45 minutes for it to
unblock. In the meantime, I picked up
with cursor and this Langmith tracing
issue has been going on for ages. I used
their debug mode. You can see it down
here. So, there's different agent modes
and this come up with a number of
hypotheses from investigating the
codebase and it cracked it. I have an
example now where I have a stream coming
through while also having the response
registered. So just interesting that uh
clawed code when it runs into too much
of an issue you could try cursor or
Google anti-gravity and some of these
different modes they can behave
differently. So if we look here, we get
a streamed response. And then if we load
latest, we also have our trace. And this
is so important because we do need to be
able to see all the various tool calls
that that we're going to be generating.
So essentially, module one is now
complete. And one thing that I didn't
do, which I probably should have, is I
haven't committed anything yet to our
git repository. The idea I had was that
I would commit as each module is
complete. And that's why there's so much
green here that needs to be committed.
In reality, there was a lot of code in
that module. I probably should have done
a lot more incremental commits. That
way, I could track the actual changes
and possibly revert in a couple of
instances when I went down the wrong
path. But anyhow, because clawed code is
currently waiting to be unblocked, I've
hit the limit for this time slot. Let's
just get cursor and say cursor can you
initialize a git repository here and
commit this codebase as our first phase.
Now the other thing is you can do this
yourself using the GitHub desktop
application. So here for example you can
add an existing repository because this
has now been initialized here and if I
come into this I can see that there's 74
changed files that need to be committed.
So that's essentially what I'm getting
cursor to do here. And of course very
important that we're not committing ENV
files.
So they are within the back end and
front end. And you can see with this
little symbol that they are get ignored.
So that is done. The changes have been
committed and pushed. So I've committed
everything and I've pushed it to GitHub.
And this is my new personal repository
which is uh CC rag tutorial. It's a
private repository which is important.
Now this is different obviously to the
one that I'll be linking in the
description below. This is my version of
my build, but the one that you'll be
using will be the the claude code
agentic rag masterclass. But it is
important that you version control your
build. That way you'll be able to
actually roll back if you ever need to.
And pushing to GitHub means that you
have a remote copy as well. Just make
sure that it's private. That's the most
important thing. So just to demonstrate
this manage drag system, I obviously
have this OpenAI storage bucket here.
I've just uploaded a single file. So
let's just delete that. The test files I
have. So, I have an SFTP folder of 9,000
PDF product manuals. So, we're going to
be playing with this over the course of
this project. I've downloaded a few of
them, though. I've got like 150 files
here in a local folder. And these are
all appliance manuals. So, if I just
jump into one, this is a food freezer.
This is a dryer, uh, a built-in wall
oven. So, generally for rag systems, you
need to upload your documents. With this
manage rag style system, we'll just drag
a few of these into this storage bucket
here. So, I'll click add files and I'll
just drag these in and I'll let those
upload and attach. Okay, so they've
loaded up and then let's open up one of
them. So, this is a refrigerator. Here's
the product code. So, let's now ask our
question. How do I install the filter
cartridge on my refrigerator? And I'm
going to say here's the model number.
And this is where these manage rag
solutions can struggle. It's a black
box. So we have no idea actually how it
does it. So we're getting a rather slow
stream back from OpenAI's responses AI.
So there's our answer. And from
eyeballing the response compared to the
instructions does look pretty accurate.
Do not push it into the holder. Don't
overtighten it which is mentioned there.
So yeah, it looks pretty decent. We do
have six steps instead of five which is
listed here. But again it is
synthesizing based off the chunks let's
say in this document. So you can get
good responses from the likes of these
managed rag services. The likes of
Gemini file search is another good
example. These are decent systems. The
problem though is you just don't know
what's actually happening under the
hood. We've only uploaded a small number
of files there. But let's say you have
hundreds of refrigerator manuals. when
this file search takes place, how do you
know what's actually pulling the right
information from the right manual?
That's the thing. You just don't know.
It's a black box. So that's why in the
next phase, we're not going to use these
managed rag services. We're going to
build out a full end toend rag pipeline
ourselves that we have total control
over. Another downside to these managed
rag services is you're tied into a
single provider. It's a cloud provider,
so you don't have control over how
they're actually managing the data. and
you're also tied into those models. So
you saw there we were getting pretty
slow streams back from that responses
API. So you can't swap that out for
another provider. And then also there's
a file search cost. OpenAI charges 10
cent per gigabyte and $2.50 for each
1,000 tool calls. So that bill adds up.
Gemini file search is a bit cheaper, but
who's to say they might not increase
that cost in the future? I've done a
full video on Gemini file search where I
dive into the pros and cons of these
managed rag services. So I'll leave a
link for that in the card above. Now
that we've committed everything to git,
can you create a release for this phase?
Let's tag it 0.1.
Okay, so there's our release version 0.1
phase 1 application shell. And this has
all of the source code and the migration
scripts to get up and running. So let's
create releases for each module from
here on out. So for phase two then I've
onboarded this agent over here. I've
entered plan mode. So let's jump in.
We're ready to plan module two. Can you
kick this off with planning agents? So
it has kicked off by exploring the
current OpenAI integration and sub
agents are brilliant in cloud code and
like this one has consumed 30,000
tokens. This one 25,000. This one
15,000. But it's not blocking the main
agent. We're still at the 15% mark here.
And let's just dive into phase two and
have a look at what actually is
happening here. So within our PRD module
2, we're going to bring our own
retrieval. So we're going to create an
ingestion UI where we can drop in files
similar to what we just did in the
OpenAI playground. And further down the
track, we'll create the pipelines to
pull in files from folders or SFTP. So
we'll be creating our own retrieval and
memory. And we then need the ability to
chunk and create embeddings to upsert to
our superbase kind of PG vector store.
And here we're talking about having some
sort of selector for a model provider.
So actually it will be in the UI and
then having a real-time ingestion status
for this interface where we drop in
files. Okay. So we have some questions
to answer for embeddings generation.
Should the embedding provider be
configured separately from the chat LLM?
Definitely. For the plan scope, how
should we break up the module 2
implementation? There's five distinct
pieces. Let's do a single plan, but
let's try to get multiple general
purpose sub agents to actually run at
it. And we'll submit those answers.
Okay, so the plan is finished. Again,
it's trying to get me to do it straight
away, but let's escape. And we'll just
get out of plan mode so it can write
files. Can you save this plan to the
agents plan folder? Now, of course, we
could actually just do this ourselves
because this plan is accessible. So,
just control and click. That is the
plan. We could just copy and paste.
Okay, so there's our plan. And now
before we continue with this, can you
analyze this plan and figure out if any
elements of the plan can be executed in
parallel and if so make the appropriate
changes? Yeah, so it looks like we can
definitely run two builds at the same
time. Phase three is dependent on phase
one and two. So yeah, it's breaking it
into stages. So this is a good way of
just speeding things up. So I'll have a
chat back and forth with Claw just to
make some more changes to this plan and
then we'll kick it off. So let's clear
down this session now. So just type in
clear and then we will use our build
slash command which is build from a plan
and we'll just drop in this plan and hit
enter. The plan itself talks about how
it wants to run things in parallel with
sub aents. So hopefully that should work
here. Let me have a look. Now it doesn't
actually look like it's using sub aents.
So I might just stop it there. Can you
use general purpose sub agents to
actually parallelize this? Ah there we
go. Now it's running two task agents or
general purpose agents. Okay. So that is
the build finished for this module. It
has verified it. So I've been tracking
playright as it actually tests out the
interface. So that's quite nice. So
let's do a bit of a check ourselves so
that we can actually test and verify.
Okay. So just hit refresh. So we now
have a documents tab. So this is our
ingestion flow. So we can drop in
documents here. The tabs are a little
bit broken there. So we can get that
fixed. Let's just regression test the
chat just to make sure it still works.
Test one, two. So, we are getting
something back. Let's just make sure
Langsmith is still working a few seconds
ago. That looks good. Then, let's go
into the documents and let's upload a
couple of documents and see what
happens. So, let's grab a document from
here. Let's just try one. So, throw that
up there. Also worth a file type. So,
only allowed text or markdown files.
Okay, fair enough. Let's just upload a
text file to test. So, there we have
test one, two, three. So, drop that in
there. Okay. Yeah, processing and
completed. Only eight bytes. one chunk.
So let's come into superbase and now
yeah our documents and chunks has loaded
up. So do we have embeddings? We do have
embeddings. So let's check to see what
embedding model we're using. We have a
bit of metadata coming through such as
file name and chunk index. That's good.
We can build that out as we go. And then
we have the content of the document. We
have the user ID. So that's good for
role level security. And we have
document IDs. Okay, not bad. So storage
path. So looks like these are being
stored in the buckets. So let's open
that up and see. So storage files, we
have documents. This looks like a user
ID, I would say. Let's go into
authentication. Yeah, E3 CD. So okay,
each user has their own folder. That's
nice. And these are the documents. Nice.
And then if I delete a document, test
one, two, three. So it hasn't deleted
there. If I refresh, it is deleted. So
maybe that's the the real time
connection to Superbase is missing
there. The file has been removed from
the bucket. That's good. And it's no
longer in the documents table and the
chunk is gone. Excellent. Let's check
out the rest of the acceptance criteria
for this module. Ingestion UI file
storage. So chunking embedding PG vector
writing a selector for a model provider.
So I don't see that. So we kind of need
a config screen really for that. Chat
history storage. Can we see that in
threads? So we have some legacy columns
here. We can remove open eye message ID
and thread ID. So I might just sort this
by created descending. Yeah, test 1 2 3
4 that's there. So if I just delete out
some of these and refresh. Okay,
everything's gone on the threads and the
messages. So this is looking pretty
good. And then if I log out and log in.
So we just need to also test the
isolation and the separation of data. So
let's come in here and let's create a
new user. This is test two at test.com.
So we're getting to the point where we
need a regression test suite. So that
might be something I'll uh talk to
claude code about. We need to track test
cases. This is going to get pretty
annoying. I have to keep doing these
tests for every phase of the project.
And with AI coding as well as actual
devs, there's always the potential of
breaking something when you make a
change. Okay, so I'll add these test
credentials. So it's the same password.
This one is test two. So this is my
clawed MD file for testing the isolation
of data between users. Okay. So log out.
This is test two. So let's upload that
document. That's completed. Now if I log
out of there and log into test one.
Cool. Yeah, that test uh one 123
document is not there. This is a
different document. And you can see the
two documents in the folder and
different user ids. Perfect. This is all
great. And it is important that you
understand the table structure. how the
data is actually separated across the
tables, the buckets, the authentication,
the policies. It's it's just good to
know this stuff. So, I'll just get Chlo
to fix up a few things like fix up the
problem with the tabs there. I'll ask it
