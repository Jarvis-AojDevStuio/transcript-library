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
chunk: 2
total_chunks: 7
parent_video_id: "xgPWCuqLoek"
---
see here. So here I can see what model
that I'm using, the percentage of the
context that's actually been consumed.
So for example, if I just type in hi,
you'll see now that I'm using 10% of the
context, which is 20,000 tokens. and
context management is absolutely
critical when you're using cloud code or
any AI coding tool. So you need to keep
an eye on these numbers. Generally
speaking, if that goes over 50%, I
generally look to start a new
conversation. So if you want to set this
up, I'll leave a link to CC status line,
which is the GitHub repo in the
description as well. And there's lots of
configuration options you can use with
this, but it's really worthwhile setting
this up. So let's work through some of
the files in our repo. The first one is
our global rules, our claude.md file.
And we've kept this pretty lean because
obviously this will be loaded on every
single thread, every single conversation
we have with clawed code. Essentially,
we're just describing the tech stack,
some of the rules of engagement. So, we
don't want to use frameworks that's kind
of raw code, raw SDK calls, and explain
things like how we want role level
security so that specific users can only
see their own data. So we'll be using
the clawed code planning function quite
a lot and I've described here how I want
these plans saved to our agent plans
folder a naming convention on the plans
and then also talking about the
complexity of the plans and whether it's
feasible for them to be done in a single
shot or not and then I just described a
development flow about how we plan build
validate and iterate and finally we want
all of the progress to be tracked in our
progress.mmd file which is best practice
that way new agents as they're spun up
will be able to figure out very quickly
where the project is at and where they
need to continue. So just to jump into
that progress.mmd file, it's pretty lean
and the agents can build this out as
they go. And our convention is not
started, in progress or completed. We
have our PRD then which is our product
requirements document and this is
essentially the modules, the phases of
the build. So we've described what's in
scope and out of scope and then we've
broken down each of the modules. So
initially we're building the app shell.
Then we're going to have our own bring
your own retrieval and memory building
out record managers in module 3, hybrid
search in module six and then add in
additional tools and sub aents. So this
is our global product document that
we'll be basing everything off. So
outside of those then within our claude
folder we have a couple of commands. We
have a build command and this is the
iterative cycle of planning, building
and then testing. So essentially we're
telling it to read the entire plan,
execute the tasks in order and then test
and validate. And one thing missing here
is just for the agent to update our
progress.md file with how the task has
progressed. And finally, the last one is
our onboarding command. And I'll show
you this in a couple of minutes, but
essentially when we start from scratch,
we want a way to be able to onboard a
new agent who has no context of the
project with what the project is all
about and with where we are in the
progress of the project. So let's
actually trigger this onboard slash
command. And then based off this prompt,
it's actually scanning the project
structure. It's looking at the git log
even though there isn't any at the
moment. and it's grounding itself in the
project so it knows where to start from.
Cool. So I can figure out the current
state. Nothing is done. Module one has
not yet started. So we're ready to get
going. So we're going to kick off module
one where we build out the app shell. We
set up observability with Langmith and
we hook up Superbase. So we're going to
get our login screen up and running
using Superbase off for user management.
And by the end of this we're going to
have a chat interface. We're going to
have manage drag up and running using
OpenAI within the OpenAI playground.
We'll be able to create a vector store
and drop in files into that vector store
and through our chat UI, we can have a
conversation with those files. Now, if
you don't want to use OpenAI and if you
want to use something generic, you could
just get it to use the chat completions
API for whatever model you want. You
could use open router, use a local
model, but I wanted to include this in
this phase because there's lots of
people that might want to just build a
wrapper on OpenAI's responses API or the
Gemini APIs and use their manage drag.
So feel free to update your plan
depending on what you want to do. So
currently we're in the editing mode as
you can see here. So I'll just press
shift and tab to enter plan mode and
I'll use my voice to text here. Let's
kick off the planning for module one.
Okay, so let's let that run. And we can
see it's going to launch a plan sub
agent to actually kick this off. And
this is great because it protects the
context window of the main agent, which
we can track here. So we're at 12% at
the moment. Or as you can see, this
planning sub agent is consuming its own
tokens. So it's giving us options here
on would we like to proceed with the
plan. Generally speaking, no, not yet.
Because we're in plan mode, it's
readonly mode. So, I want to save this
plan into our plans folder on the top
left because I want to keep a history of
all of these plans and that way when we
need to onboard a new agent, he'll be
able to jump in and see what plan we
were working on. So, we'll just exit out
of that. Just press escape. We'll get
out of plan mode. So, just shift tab
into edit mode. I'm just going to ask,
can you move this plan into our agent
plans folder? Okay, so it has added that
now. And it's based off the naming
convention that we have in our clawed MD
file. And this is why I didn't want to
just accept what it provided. I want to
actually read this plan and make changes
if needed. So it's talking about how the
complexity of this is medium because
there's actually quite a bit in this.
Building out the foundation. It gives an
idea of the structure of the front end
and the back end task sequencing. So set
up the back end first, then the
superbase client, then the database. So
yeah, there is quite a lot in this. We
could break this up into multiple tasks.
Let's try to execute this in a single
shot. And if it can't make it, we'll be
able to pick up a new agent and we'll
get it to update the progress file. So,
at this point now, I could just get it
to build out this plan. Generally
speaking, I prefer to clear the session
and start from scratch. We have consumed
about 50,000 tokens here. So, if we
start this really longunning feature
build, we're already using about 25% of
our allocation. So, we're probably
better off just to clear it completely,
which is just slashcle. That'll bring us
back to zero. And now I'm going to use
my slash command build, which is the one
up here. So, slash build. And now I'm
just going to drag in this plan, which
you can see here. Now, you could also
just copy a relative path and paste it
in there if you're on the terminal, but
we'll just build from here. We're
starting with a completely fresh
context, but it has everything it needs
in this plan to actually be able to
succeed. Okay. Hey, and it's off and
it's created the tasks within this
module, within this phase. So, 14 tasks
to work through. And this is what's nice
about using an IDE is you can see the
files being built out as Claude
progresses. So, we can see that it's
working on the back end. And it's back
to this idea of you being in the
driver's seat. You don't necessarily
need to understand everything that's in
this main.py file, for example. But it
is important for you to have a mental
model of how the code all fits together.
So we can see that we have the backend
folder. Within that we have the app and
then there's database models, routers
and services. And another reason to use
an IDE is that if you have a
subscription to the likes of cursor, you
can use their agent mode which you can
see here on the top right and you could
ask it to explain some of these files.
So once the back end is complete, you
could drag that in here and this is Opus
4.5 as well and you could ask can you
explain what this folder is, how the
files work just to give you a better
understanding of how it all fits
together. And this is really important
because you need to track the progress
and the evolution of the app. The other
thing is you could run this in YOLO mode
which accepts all commands. I generally
prefer just to keep track of the
commands that are coming in. We have a
settings.json JSON file that has a
number of permissions that are allowed.
Certain ones are denied and then others
require to be asked. So here npm create
commands we will allow. And again you
can ask claude either in the agent
browser here or within claw code what
these commands actually mean if you
don't know. So we're progressing through
our tasks here. We're at task four and
we've only used about 17% of the context
window. And that's why it was a good
idea to clear it down because that was
already nearly at 25% without any of it
being done. And I mentioned that clawed
code can become a little bit buggy
within the terminal of the IDE. And you
can kind of see that here where it's not
really rendering out correctly, but it
hasn't become a blocker as of yet. Okay,
so that took just under 13 minutes to
build out all of the tasks. It's now
updating the progress report. So it's
added all of those tasks to module one.
Now it has outputed a next steps for the
user and I am conscious it hasn't gone
through the validation steps in the plan
and it is being a little bit lazy here
by telling me to go run scripts and run
commands but there is one area that I do
need to add which is this one around
environmental variables. So we need to
copy the envample to env. So let's just
do that one. So this is sitting under
backend. So we'll just copy and paste
that and let's rename it with F2. So it
should be just env. And then we need to
add our Superbase credentials. So for
this project, I'll use superbase.com.
You could run this locally if you
wanted. You could bring down the Docker
containers that contain Superbase and
then ping it that way. That might be
something we might do in a future video,
but for the moment, I'll just use
superbase.com. You can create a free
account on Superbase with up to two
projects. Now, it does turn them off
after a few days, but just to get up and
running, it's well worth it. So I have
created a project here my cloud code rag
master class and if you look at what we
need so the superbase URL is the first
one and that's down here under project
URL. Now these environmental variables
might be different for you because
obviously it's a probabilistic system.
It'll produce something different for
everyone. So we need the superbase anon
key and the service ro key. Superbase
has these new publishable keys. It's not
that just in case you don't know. Click
on API settings API keys and just use
the legacy keys. So we'll copy that in.
And then this is the service ro secret.
So then we also need an open AI API key.
So let's go and get that. So for module
one we're going to use open AI but for
module 2 onwards you could use something
local like or LM studio or you could use
any LLM on the likes of the open router
platform. So all of those services
support the OpenAI SDK format. Okay, so
that's the key. I'll delete it after
this video. Langsmith API key. This is
important because you need some way of
actually seeing what the LLM calls are
going back and forth from your custom
app to OpenAI in this case. So Langmith
is a good platform for this. Again, it's
a free account you can set up. Okay, so
we're now in and just on the bottom left
go to settings API keys and then the top
right you can create one. Okay, that is
the API key and then the project ID will
just give it as rag masterclass. Okay,
so we have our env set. So now I'm going
to go back to claude. Can you carry out
the validation steps that were in the
plan and also these next steps for the
user? Can you do these? I have created
thev file in the backend folder and I've
applied API keys. You just can't see it
because you don't have permission to see
it, but they are there. Cool. So, it
should be able to use the actual
variables. It shouldn't have to be able
to see them. Ah, so have you also
created the envend folder? Uh, no, I
didn't. And then, have you run the SQL
migrations in the Superbase SQL editor?
Um, I'm going to say no, I haven't. Can
you run these? So, it's asking which
Superbase project we should use. So, I
just copy the ID of the project. So
again, the back and forth you're going
to have will be different to the back
and forth I'm having. And it looks like
I'm on a different Superbase account
within the CLI. We are now logged into
the right account. Please continue.
Great. It looks like we're linked. And
it's now going to start carrying out all
of the testing that was in the original
plan. And the other thing we probably
should have done when we were actually
doing the original feature build was we
probably should have got sub agents to
do things in parallel because the back
end probably could have been spun up at
the same time as the front end. So that
would have saved some time. It took
about 12 minutes in total. So I might
have cut that down a bit. So we're
nearly finished this validation. We're
approaching 50% of our context window.
Nearly 100,000 tokens. I definitely want
to be clearing this down soon. Okay. So
I was running into issues there. And I
was hitting nearly 95,000 tokens. So I
just exited my session, went back in and
hit resume. And I've asked Claude just
to update the progress log with where
it's currently at in this validation
process. So it's halfway through as you
can see and it's blocked here. Now at
least there's a handoff to the next
agent so it knows where to take up the
project. So back into cloud and I'm just
going to type in clear. That'll bring
our token usage back down to zero. So
fresh context and then I'm going to ask
can you check the progress.md?
We're currently halfway through the
validation on our first module and I
need you to continue. And this is all
based off the plan that's in the agents
folder, plan number one. So a lot of the
time you'll find you're better off
starting from scratch with a fresh
agent, fresh context, but you just need
a way to pick up where you left off and
that's where the progress log makes a
lot of sense. Okay, it looks like it's
now able to install the front end and it
had to actually trigger it via
PowerShell. So there was a bit of back
and forth there. I think what we should
do is set up a kind of a startup script
or a restart script so that we don't
have this conversation every single
time. Now it's asking me to test the off
flow. I want it to do the testing
though. Can you carry out the testing of
the oflow? Can we install the playride
mcp? Okay, I just need to restart cloud
code. Can we create a start services
script that actually has these the bash
commands that actually work and let's
save that in the repo and then let's
update our clawed MD file to describe to
future agents how to actually spin up
services. So generally speaking you need
to be on the lookout for prompts that
you're continually providing any kind of
duplication of effort. You need to see
is there a way that you can create slash
commands, create scripts, make life
easier for yourself so you constantly
don't repeat yourself to the agent. So
here I'm getting it to create a start
services script instead of having this
constant back and forth around starting
the services. So it looks like both
services are running and it's just
getting playride up and running now. Can
you update the progress log with where
we currently are at and then I'll start
a fresh session and pick it up from
there. Okay, so let's clear the session.
Can you pick up where we left off? Have
a look at the progress.md file. So let's
now see how the browser testing goes and
the validation of module one. Okay, so
it is able to hit the login screen. So
I'm getting a lot of permissions
prompts. So we probably just need to add
playright to our settings into
superbase. Let's go into authentication
and then we'll add a user. create new
user test.com
and we'll just get it to suggest a
password. Here's the test username and
password. Now, I don't mind actually
giving Claude this because it is a test
username and password. I don't need to
put it into an env file. Can you save
these credentials to our claude.md file
so that future agents can use them for
testing? And then also, can you continue
the validation with this account? Okay,
we are logged into our app. Brilliant.
So the O flow works. User signed in. We
have threads on the left and we have our
main chat in the middle. So let's see
does it do any more validation of this
because there was a few more tasks
within that module that it should
validate. And it's realizing that the
migration hasn't taken place of the
script. So it's doing that now. So if we
go to database editor, nothing appears
there just yet. Okay, migration applies
successfully. So let's have a look at
Subbase. Cool. Cool. We have our threads
table and we have our messages table. So
now if we come back here, let's see kind
of test out the chat interface. We're
okay context window wise here. We're at
uh 26%. Cool. And we have an answer. So
that is the OpenAI assistant responding.
So that's the thread creation and chat
messaging. Let's go into tracing. So
nothing showing in Langmith just yet.
Okay. So module one validation complete.
We are finished the first module. So
then it's down to manual testing and
let's just check what's in superbase as
well. So these messages, yeah, between
the user and the assistant. So we are
tracking the kind of short-term memory
for the various threads. If I refresh
and click on the chat, yeah, it loads.
If I open up a new chat and ask a
message, it is streaming through. So
this is where we get into bug fix as
well. And then depending on how many
bugs there are, again, it might make
sense to clear a session and start from
a fresh bugs list. If it's only a few
bugs, then you could just dump it into
the current session. So, I'll just try
these two for the time being. The
Langsmith traces aren't showing. And
also, after I type in one message, I
can't type in any further messages.
Okay, so it claims to have fixed it.
Let's have a look back into Langsmith
and not seeing the traces. Anything in
the home? Nope. anything in monitoring?
Nope. So, it's interesting that trying
to get the Langsmith tracing up and
running has pointed out that actually
we're using a much older version of the
OpenAI API. It's using the assistance
one which is sunsetting this year.
Responses API is the actual current one.
So, I'm getting it to upgrade that
library. And actually, the OpenAI
assistance API was in the original PRD.
So, I can't exactly blame Cloud Code for
that. I should have read that a bit
better. And that's why it is important
to really read the product requirements
documents before you let your agent
loose. So now that we're tied into the
OpenAI responses API, we essentially
have manage drag. So if we come into the
playground and go to storage, we can
create a vector store. So let's call
this our CC rag.
So we have a vector store ID and then we
can upload files to the vector store. So
if we just click add files at the bottom
and drag in this PDF and click attach.
So now this vector store has a file. We
can see the file there. So now if we
copy out this ID and then I'll just come
back into cloud code and I'll say can
you link the OpenAI responses API to
this vector store ID. Okay. And that's
just changed the OpenAI service in the
