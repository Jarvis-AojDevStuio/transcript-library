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
word_count: 3996
chunk: 4
total_chunks: 7
parent_video_id: "xgPWCuqLoek"
---
to put in that model selector and then
let's move on to phase three. And
actually, sometimes I find if I'm trying
to make a list of bugs to fix. If it's a
very long list, a lot of the time you're
better off just to use a transcription
service and just dump it into a notepad
file and then just paste it all in as a
single prompt. And if it's a really long
list, that could be quite complicated.
You might even need to make a plan to
tackle the full list. If it's just a
handful, it can do it in a single shot.
Can you fix up these tabs on the left?
When you click on documents, the layout
or the format is broken. So, I'll just
grab a screenshot of that with my
snipping tool. And we are approaching
the 50% mark here as well. 100,000
tokens used. I'm tempted to clear this
down. So, uh yeah, that's what I'll do.
So I'll onboard the agent of the project
again so I can get up to speed on where
we are at. We're at the end of module 2.
So I'm saying can you fix these bugs for
me from the module 2 build and then so I
have my screenshot. So let's copy that
in altv and then let's just keep
tracking what changes we need to make.
So that's the fix the tabs. I'd like a
config interface that's available from
the user menu at the bottom left where
there's the ability to select the model
and provider. This was in the spec, I
believe, but is not in the interface.
There are a couple of residual columns
in the database that we no longer need
around the OpenAI responses API. Can you
get those removed? I think they've
already been removed from the migration
script. There's a real time issue around
the removal of documents from the
documents table. So, in the documents
interface, when you click delete, the
document stays visible even though it
has been removed from the back end. And
then when you refresh the page, it's
gone. So, maybe real time needs to be
enabled. I think we need an interface
where we can choose the different models
both for the LLM and for the embeddings.
So, for example, we currently have an
embedding model. I don't know what it
is, but I'd like the user to have the
ability to change the LLMs and at least
set the embedding model. Obviously, once
there's data in the table, they
shouldn't be able to change it. This
config style interface should be
available from the user menu at the
bottom. Okay, so a few things mentioned
there. And I'm asking to use multiple
sub aents just to speed it up. So while
it makes those changes, let's actually
build out this validation test suite.
I'd like to create a test suite that
covers all of the features of this
application. When new features are built
or changes are made, I can get an agent
to run through the validation suite to
make sure that we haven't broken
anything when creating the new feature.
So, can you plan this out and then also
work through the PRD and the plans in
the agent plans folder to figure out
what features have already been built
and let's create tests for those along
with acceptance criteria on what it
means to pass those tests. So, at the
moment we're using Claude's vanilla plan
mode. We don't have our own plan/comand.
So, I don't believe it uses testdriven
development as such. But at least if we
can build out a validation suite or a
regression test suite, we'll be able to
figure out whether we're breaking things
as we're building newer things. And it's
best to do this pretty early in a
project because it becomes a monumental
task once there's a very large feature
set that you actually need to cover. So
our bug fixes are nearly complete.
There's four sub aents, four task agents
running at that. And then also our test
plan is in progress as well. And it's
currently carrying out playright browser
testing. I'm not touching anything here.
And yeah, we now have a settings a
toggle at the bottom, which is nice. And
there's an error showing. So the
iterative nature of claw code now means
it can go and fix that. I'll let that
continue to work away. So this test plan
looks good. I'm just going to get it to
also add these instructions to clawed MD
so that for future plans we're creating,
we need to make sure that they update
this test suite with the new features.
Can you build this plan? And then also
at the very end, can you update our
claw.md file to provide instructions to
future agents that when they build out
new features, they need to update the
test suite. Okay, so it is now building
up the test suite and it looks like my
bug fixes are complete. Clawed code has
a habit of creating lots of different
services. So you can see here I have
lots of different PowerShell windows. So
this is generally bad because if it's
trying to refresh the server or refresh
the environment, it might not be picking
up the right environment. So it's good
just to keep on top of these. And so I'm
just going to turn them all off
essentially and and start up both the
front end and the back end again. Okay,
looks like it's good. So let's test it
out. The formatting issue is fixed. If I
delete a file, it's gone. So that
real-time connection is now working.
Slight issue on the layout. you know the
the user menu is appearing at the top
whereas it's at the bottom there. So we
can fix that again. Do we have a config?
So yeah we have our settings and by
clicking that cool so we can set our LLM
configurations. So okay hang on at the
moment if we start a chat. So we are
getting a response back even though
there's nothing set here. So we need to
decide how are we saving these secrets.
Yeah it looks like it's saving API keys
as plain text in the database which
isn't ideal. And then this must be
defaulting to what's in the env file
because all of these are set as null. So
this is why it is good just to keep on
top of of what the AI coding models will
do because they will be lazy at times
and stuff might not be exactly that
secure. It looks like API keys would be
stored in plain text in the database
which doesn't exactly seem like best
practice. Also if you look at the
screenshot you can see that nothing is
selected here yet the chat is actually
working. So I assume it's defaulting to
thev. Can you implement best practices
here around saving of these credentials
within the superbase setup? I might push
this into plan mode because I want to
see what it's actually going to propose
to do. Okay, so I think we have the
validation test suite complete. So
claw.md is supposedly updated, which it
is. Yeah, validation suite. We'll just
remove the numbers cuz that's going to
evolve. Okay, so let's have a look. So
it's agent validation. So this is our
full test suite. Nice. and then fixtures
as a test document. Okay, very good.
Yeah, let's figure out how often we want
to run this as well because obviously
there's a lot of tests here and this is
going to grow into hundreds or possibly
thousands of tests. So, we just need to
be careful about how often we run it
otherwise we're going to destroy our our
usage budget. The other thing is we can
codify some of these so we can just set
them as scripts as opposed to an agent
having to run them. It's come up with a
plan on fixing the security issues
around the API keys being plain text in
the database. So, I've opened it up
here. I'm just going to copy it and add
it to our plans folder. So, we'll paste
that in there. Actually, let's make one
change to this plan. Instead of these
being user settings, I'd like this
interface at the front end to be global
settings. So that way we don't have
multiple users setting different LLMs
and different embedding models because
then the dimensions of the embedded
models would kind of conflict. Can you
make a plan on changing the existing
user settings and having these as global
settings? The idea would be that we
might need a user profiles table and
then when a user is created it
automatically creates a profile for the
user. we need to assign a role of admin
or not. It could just be a boolean. If
the user is an admin, then they would
have access to the settings and then
they could set the LLM API keys, all of
that stuff, the embedding models. So,
yeah, let's let's plan that out. So, I'm
having an issue where the admin user
can't access the settings panel and
cloud code was spinning its wheels on
it. This debug mode is so good on
cursor. It creates these hypotheses. It
puts in logging then you reproduce it
and it's able to narrow down exactly
what the problem is. So it actually has
identified the root cause here. There
isn't I don't believe a debug mode or
debug kind of slash command in clawed
code. There we go. It worked. Brilliant.
Yeah, that debug mode is is very useful.
I definitely recommend it. And then it
removes all the debug information and
instrumentation that it used to actually
figure out the problem. Okay, so let's
test things out end to end. So we'll
sign in. And now if I try a new chat,
just say hello. This should not work
because I I don't have any API key set.
Connection error. Okay. And then if we
come in here to settings, and then I
have an open router key set up.
Worthwhile setting this up anyway. Go to
open router, grab an API key, and then
I'll just drop that in there. And then
the model name. So what model will I
use? Let's use the new GLM. So we'll
grab that. And then the base URL for
open router is just this. And then for
the embeddings, now it's saying there's
chunks existing. So I can't set the
embeddings. So within the vector
database, if you have any chunk set,
then you can't change the embedding
model or the well, you shouldn't change
the embedding model. You definitely
can't if it's different dimensions. And
so I'll just delete that document, which
should then cascade down to the chunks.
If I refresh, yeah, I'm now able to
change the embedding configuration. Um,
I don't believe there's any embedding
models on Open Router. Oh, there is.
They now have added embedding models.
Cool. Let's use the Quinn 3 embedding
model. That's doing pretty well on the
MTEB leaderboard at the moment. So, just
copy that out. So, that's the model.
Same base URL, same API key, and then
dimensions.
Let's go with the 4096. See, does that
work? Okay, that's saved. And then back
into the chat, let's ask a question.
Okay, there you go. So that is coming
through from open router. That's
brilliant. And then for a document,
let's just upload our test text file.
It's dropped in there. Now that has
failed. I'll get cloud code or cursor to
uh dive into this one. When uploading a
document, I'm receiving an error. I
assume it's when it's trying to embed
the document. The error is actually cut
off, but it starts with this. Could you
check log files and figure out what the
problem is? Oh, it's a Postgres error.
So, ah, of course, the dimensions are
hard set in the database. It's probably
in the migrations file. Yeah, vector
1536. And we have configurable
dimensions on the front end. So, we
probably just need to change that so
that that vector column can support
different numbers of dimensions. Okay, I
think that's fixed. So, it has just
removed that specific dimension number
from the the column itself. It might
have had to remove an index. So, that
might be something we'll come back to in
the future. But, let's just try this
again. Drag that into the box. Okay.
Yeah, that worked. There's our document.
We have our chunks. We have our
embeddings. All 4,000 dimensions of
them. Cool. So, we are now using GLM
4.7, which was only released recently
along with Quinn 3 embedding model,
which according to the MTEB leaderboard
is better than the OpenAI one. Of
course, benchmarks need to be taken with
a pinch of salt. And just before we move
on, um I just want to test our local
models. So, I have my AI server set up
on my network here. And I have Quincree
VL30 billion, which is a mixture of
experts model. And I also have the small
Quinn3 embedding model. So we have a
look here in LM Studio I'm using as
opposed to a llama. Um we have various
models downloaded. These are the two
that I have mounted. So you can see them
there on the Quinn3 VL. I've set a
context window of 70,000. So okay, let's
give it a shot. So we come into
documents and again we need a text
document. So um I've just copied in the
text from one of those manuals into a
text file. So if we drop that in there.
Okay, that was pretty good. You can see
the log files coming through the Samsung
electric dryer. And now if we ask a
question of it, tell me all about this
Samsung electric dryer. Okay, so you can
see it's all streaming through. That's
pretty fast actually. Let me try that
again. And all of that looks pretty
solid based off the the text file that I
uploaded. So this is the text file that
I uploaded. There's only one file in the
vector store. We're just testing here,
but cool. So yeah, this works locally.
As you can see, this is using LM Studio.
I'm on an RTX5090 here. It's 32 gigs of
VRAM. So, there's plenty of space here
for this. And even with the context
length of 70,000 tokens, yeah, we're
right at the limit of the GPU memory
with that. Now, we could decrease the
context length if we needed to load more
models in parallel, but no, that's all
very good. Okay, so let's clear the
decks here and let's move on to module
3. And actually, before we continue, we
just need to commit everything. So I
could get one of the agents to do this.
I do have GitHub desktop set up here. So
we can just see what changes are there.
So 55 changed files. So this is module
2. But looking through it, it all looks
pretty good. The various database
migrations. So these are really
important that we have these migration
scripts. So let's commit all of that to
master. And before pushing it, let's
just give it a tag. So come into
history. There's module 2. Let's create
a tag which is v 0.2. So that's the tag
created. And now we can just push. And
if we have a look at our GitHub. Okay.
So we can see we have our two tags.
There's version 0.2. Okay. So there's
our version 0.2 release. So bring your
own retrieval provider abstraction.
There was a few extra features we built
in at the end. So let's get on with
version 0.3 or module 3. Okay. So let's
get into plan mode. Shift tab. And then
let's start planning out module 3,
please. So okay, what is module three
about? We're creating a record manager
because we want to avoid a situation
where you can upload duplicate files and
that's exactly what can happen here.
Right? So this is a file and if I upload
the exact same file again it will just
upload. So now these chunks are
duplicated in the vector store. If we
come into chunks we have these two files
which is essentially the same file and
we have duplication. So this is going to
cause problems when we come to retrieval
because you can end up with a lot of
noise in your vector store if documents
are going to be duplicated. So we
essentially need some sort of hashing
algorithm, some way of recognizing that
actually the file has not changed. And
thinking about it, we're working away at
a record manager here, but module 4
metadata extraction. This is pretty much
a different feature to module 3. It's
quite possible we could run at these in
parallel. So yeah, let's on board our
second agent here and let's see can we
start planning that out as well. Okay,
so it's saved the plan. So there we go.
Module three, record manager. Let's have
a read of it. It's a medium level of
complexity. Prevent duplicate ingestion.
Enable incremental updates. So skip
processing entirely if it's identical
content. If it's modify content, only
re-mbed chunks that actually change
preserving unchanged ones. I do prefer
to delete out all of the old chunks and
re uh import. I have found that's better
because you can end up with orphan
chunks depending on what changes were
made to a file. So I'll get to make that
change. Now we are on accept edits on
here. So I do want to just make sure it
doesn't actually execute this once it
updates the plan. Okay. No, it is
actually executing it. So let's just uh
stop that. Just finish making changes to
the plan. Don't carry out any code
changes yet. Okay. So that's changed.
Yeah. So let's clear down this and we'll
use our build slash command and then
just drop in the plan and let it go. So
on the module four for example where we
want to do the metadata filtering. Can
you plan the implementation of module 4?
Module 3 is currently already in
progress and we just need to change this
to plan mode. And actually for this one
with metadata filtering I'm just going
to really push it to ask me any
questions if you need clarification
because I feel like there's a few ways
that this could be implemented. Okay,
now we're up and running. Running at two
phases at the same time and that's
kicked off multiple sub agents as well.
So, we're burning through tokens. So,
the metadata planning agent has come
back and it's asking me some questions.
We'll use the same LLM provider for the
moment that we're using in the chat for
metadata extraction. On the UI side,
maybe we need this expandable detail
panel per document. That would be pretty
cool. And then on the back fill, should
we include a backfill mechanism for
documents uploaded before module 4? Uh,
no. Let's not do that. Okay, so our plan
is complete. Let's have a look at it.
The goal is to extract out structured
metadata during ingestion. Metadata
stored on documents and propagated to
chunks. That's good. Retrieval supports
metadata filtering. That's good. So,
obviously, we need a database migration
script to add the new fields. We have a
pideantic metadata schema for
validation. Interesting. So, it uses the
first 8,000 characters of the document
text. I think that's probably a smart
move because some documents could be
absolutely enormous and we don't want to
burn through API budgets. So this this
model is is a a key part of it. We need
to define this depending on what
metadata we are trying to extract. Looks
like a good plan. My question is where
can we define the metadata keys? I'm
wondering should we create an interface
where the admin can actually add
metadata rows basically and then I'm
sure we're going to need required not
required or the the data type as well.
What do you think? Meanwhile, it looks
like we're finished on the left hand
side. So we have our content hash the
record manager service the upload
endpoint with dduplication. So let's
test that out. I've seen playright and
claude code automatically testing and
validating some of this. So at least it
carried out that. So we're mostly doing
a smoke test here. Okay. So let's
refresh. And now we can just try to
upload this exact same file again. So
document updated reprocessing. That's
interesting. It definitely wasn't
updated. Or maybe it was. Document
unchanged. Skipped processing. The
content hash hadn't saved initially.
That's what it is. Okay. So that is
working. If we refresh here. Yeah, we
can see the content hash. Cool. And I'll
just test uh by uploading a an
additional file. Perfect. Yeah, that
uploaded fine. And that was a new file.
Okay. So then on to the questions from
the metadata. So yeah, it's saying how
configurable should this be? Yeah, maybe
database store. That's a good idea.
Let's not overengineer this. So we
already have a global settings table in
the database. So maybe we just have a
field which is the JSON. So I'm happy
with that. I don't want it hardcoded. I
think it'll be nicer if it's in either
the database or the admin UI. If I go
dynamic, what field types should be
supported? Yeah, let's go for the full
list for the moment. So, let's submit
those. Okay, so the plan's updated. Let
me just copy that into my plans folder.
The new changes and saved in the global
settings. Perfect. So, let's get out of
that. This is done as well. So, we can
just clear both of these now. And now,
let's jump into our build slash command.
It's rinse and repeat really. Drop in
the link to the plan and let's go. So
after this is finished, we'll commit
everything and then this could be our
next release which is a mixture of
module 3 and module 4. Cool. So it looks
like we're finished on the metadata. So
let's have a look here. I'll just
