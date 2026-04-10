---
video_id: "4_2j5wgt_ds"
title: "Claude Code Task System: ANTI-HYPE Agentic Coding (Advanced)"
channel: "IndyDevDan"
topic: "ai-llms"
published_date: "2026-02-02"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=4_2j5wgt_ds"
duration: 1706
word_count: 6084
---
We're entering a new paradigm of agentic
coding. And I'm not talking about the
very powerful but very dangerous maltbot
or previously cloudbot. More on that
later. I'm talking about new tools for
engineers to orchestrate intelligence.
The new cla code task system is going
under the radar in a massive way,
probably because of all the cloud pot
hype. But this feature hints at the
future of engineering work. I have two
prompts to show you that you can use to
extend your ability to build with agents
and it's all based on this new cloud
code task system. This changes the
workflow of engineering in a pretty
significant way and really it's not
getting enough attention. So I want to
focus on this in a very anti-hype way. I
have one metaprompt and one plan to
share with you that can really push what
you can do with agents in a cloud code
instance. We will slash plan, but this
isn't an ordinary plan. We're going to
plan with a team. We have a user prompt
and an orchestrator prompt. I'm going to
jump through this and fill this out.
Paste and paste. I'll explain what this
does further on. Feel free to pause the
video if you want. I'll fire this off.
This prompt will showcase you can now
reliably and consistently create teams
of agents. More agents, more autonomy,
and more compute doesn't always mean
better outcomes. What we want is more
organized agents that can communicate
together to work toward a common goal.
If you want to understand how to use the
cloud code task system at scale reliably
and consistently to create teams of
agents, stick around and let's jump
right in. Let's take a look at plan with
team. This isn't like most prompts
you've seen. This prompt has three
powerful components to it. Self-
validation, agent orchestration, and
templating. The first thing you'll
notice here is that we have hooks in the
front matter. This agent is self
validating. In fact, it has specialized
scripts that it uses to validate its own
work. You can see here we have validate
new file and we have validate file
contains. So on the stop hook once this
agent finishes running, it's going to
make sure that it created a file of a
specific type in a specific directory
and it's going to make sure that it
contains specific content. This is very
powerful. Now we know for a fact that
this plan was created. And in fact, we
should be able to see that right now. If
we close this, we can see that our plan
has been created and it's been
validated. And so now the next step is
we're going to actually kick this off.
And you can see our agent has done
something really interesting here. We
have a team task list. Every task has an
owner. All right. So this is not an
ordinary sub aent prompt. This task list
has specific team members doing specific
work all the way through. and we're
using two specific types of agents.
We're going to break down in just a
second a builder agent and a validator
agent. We're going to go ahead and kick
off this prompt and we're going to
actually start building this out. We'll
look at the spec. This is the second
prompt that we're going to look at and
we're going to understand why this
generated prompt from our meta prompt is
so unique. Let's just go ahead and kick
this off. Get this building in the
background. We're going to use a /bu
prompt. And now you'll notice here it is
building up that brand new task list.
And so it's just going to keep stacking
on the brand new task list. We're also
going to look at the actual tools that
this agent is running to put together
this team of agent and to communicate
the results. You can see we have five
more pending. So a lot of work is
getting stacked up here. And now we're
getting the dependency blockers. Not
only is our agent planning out work,
building a team, it's also setting up
the tasks and the order that the tasks
need to operate in. So you can see here
our first five or six tasks. These can
run in parallel. They're building out
the brand new hooks. And so to be clear
here, what we're doing is I have this
code base on my repo cloud code hooks
mastery. Last update was five or six
months ago. So we're going to go ahead
and update the documentation and update
some of the code. Right? So this is a
very common engineering workflow that
you would run that you would enhance
with agents. You need to update old code
to update and reflect changes and new
documentation. So that's what we're
doing here. Right now we're kicking off
a bunch of agents to run in parallel.
&gt;&gt; Dan A4 EC 608 built out your post tool
used failure hook so error handling
works smoothly now. A249 B56 built out
the session end hook implementation and
it's ready to go.
&gt;&gt; All right, so you're hearing our sub
agent text to speech responses. Those
are going to keep streaming in here. So
it might be
&gt;&gt; agent A7A 26A nailed it.
&gt;&gt; It might be a little annoying. It's
going to interrupt us a bunch here, but
every sub aent that completes is going
to summarize their work as well. So I
have this built into the sub agent stop
hook
&gt;&gt; a356. Got your setup hook implementation
done. Hook setup.py PI file is ready and
Dan A1FA9A7
built your permission and it's ready to
handle authorization.
&gt;&gt; Awesome. This work is just going to
continue to stream in. The next
important piece is of course agent
orchestration. If we collapse everything
here, you can see a classic agentic
prompt format. We have our purpose. We
have our list of variables. You can see
our prompt format and our orchestration
prompt. We have our instructions. This
is where things get really interesting.
Inside of the instructions, we have an
additional new block, team
orchestration. And so here we're
starting to detail these new task
management tools. Task create, update,
list, and git. This is how the task
system works. This is everything that
our primary agent needs to conduct,
control, and orchestrate all possible
sub aents, right? The communication
happens through this task list. This is
a huge stepping stone from just calling
ad hoc sub aents without a common
mission without task dependencies and
without a way to communicate to each
agent that the work is or isn't done
yet. We're detailing some things there.
But what's really important here is in
our workflow. If we look at our agentic
prompt format here where we're detailing
the steps that we want our plan with
team prompt to set up, um we can see
something really interesting here. In
step four and five, we're doing two
important things. We're defining team
members using the orchestration prompt
if provided and we're defining
stepby-step tasks. So our plan is going
to use team orchestration. So this
primary agent that is actually creating
this plan is going to build a team and
then give each team member a task step
by step. All right. So this is, you
know, unique in that our previous
planning prompts that we would set up
that create the plans for us that
research the codebase, we would have to
specify exactly what agent was running,
exactly how we wanted to specialize that
workflow, and then it would run in some
topto bottom format that you would have
to strictly organize. Now, with teams
and with the task list, we can teach our
primary agent how to create plans that
also contain individual team members.
And then the last very important piece
of this prompt is that we are
templating. So this metaprompt is
actually a template metaprompt. This is
a big idea we talk about in tactical
agentic coding. We're teaching our
agents how to build as we would. You can
see here we have a plan format and the
plan format actually has embedded
prompts inside of it. Replace nested
content with the actual request inside
of it. So our plan is going to come out
to task name. And we can pull up the
plan that was generated side by side
here. If we open up specs, you can see
we have hooks update with team. And if
we go side by side, you can see exactly
how this is getting templated. Here's
the plan name. Here's the task
description. And then we're having our
agent fill out the task description. So
this agent is really building as we
would. You want to be teaching your
agents how to build like you would,
right? This is the big difference
between a gentic engineering and vibe
coding and slop engineering. When you're
running a prompt to a random tool like
Clawbot or insert whatever tool,
whatever agent, and you don't know what
the agent is actually going to do or how
it's going to do the work, the results
can be anywhere from exactly what you
wanted to not so great to this doesn't
work at all. As models progress and
become more proficient, of course,
you'll be able to prompt with less
effort, with less thought. But if you're
doing real engineering work, you want to
be going the opposite direction. You
want to know the outcome that your agent
is generating for you. And you can do
that with the template prompt, right?
specifically the template meta prompt.
This is a prompt that generates a new
prompt in a very specific, highly vetted
consistent format. And so we can just
continue down the line. You can see the
objective on both sides here, right? We
have our problem statement. We have the
solution approach. So on and so forth.
But where things get interesting is
here. We have team orchestration. If we
search for this uh I know for a fact
that team orchestration will be inside
the generated prompt. Why is that? It's
because if we scroll up here, remember
that this stop hook ran self validation.
And check this out, right? It's running
validate file contains. It's making sure
that it's in the specs directory, which
obviously it is here. It's a markdown
file and it contains these sub points.
So, I'm making absolute sure that the
file that was generated has the correct
section. If it doesn't, this script
here, validate file contains, is going
to spit back out instructions for this
planner agent. Right? So, this is very,
very powerful. We're combining
specialized self validation, which we've
covered in a previous video, with this
new team orchestration with powerful
templating. Okay? And again, templating
is something we discuss at length in
tactical agent coding because it allows
you to teach your agents to build like
you would. But this team orchestration
section is very, very powerful. So,
let's go and just take a look at this.
You can see here this is part of a
template, but it's, you know, just raw
text. So, our agent copied it as is per
the instructions. But then here our
agent starts building out the team
members. And so, you know, to be super
clear here, just to reiterate this, on
the left we have the template
metaprompt. And on the right, we have
the generated plan file that our agent
is running and probably has completed it
by now. Okay, look, it's it's already
finished, right? 2 minutes of work
thanks to that parallel setup.
Everything's already done. Hooks
configured, complete documentation in
the readme. We'll check this out after
we finish breaking down this powerful
prompt. Right. So, team members, you can
see builder, validator, builder,
validator, builder, validator, on and on
and on. Right? I have two specific
agents that I'm using in this workflow.
And I think this is going to be the most
like foundational like bare minimum that
you're going to want to have set up. A
builder and a validator. An agent that
does the work and an agent that checks
the work. I'm 2xing the compute for
every single task so that we build and
then we validate. We actually push this
further. I'll show you the agents in
just a second here, but uh you can see
here in our prompt template, we have our
builder and then we're specifying the
name, role, agent type, and if it should
resume if something goes wrong. And this
is all just about filling in the
variables, filling in the specification
for the team that's going to execute
this work. Okay, we also have the
step-by-step tasks, which breaks down
the actual workflow. This is the part of
the plan where we're just going through
step by step and our agents are going
through the work that they need to do.
And so this is this task list. Just to
make this super clear, this is the task
list that we're building up, working
step by step. And again, we built this
into a reusable prompt that we can
deploy over and over and over. And so,
you know, it's always one thing to just
open up a terminal and start prompting
something, but we can do much much
better than this, right? Build reusable
prompts, build reusable skills. I think
a lot of engineers in the space, you
already understand this as a kind of
foundational concept, but you can push
it further. Remember this metaprompt has
three powerful components. It is self-
validating. It is building a team and it
has specific instructions on how to
build a team. And if the orchestration
prompt is provided like we passed in,
that orchestration prompt is actually
going to help guide how the planner
builds the team. All right, so that's
where you solve that. And then we're
also templating. So this is a template
metaprompt. It might sound like a super
fancy term, but it's it's not. It's a
prompt that generates another prompt in
a specific format. All right, it's
actually quite simple, but it's very
very powerful. This is advanced agentic
prompt engineering. But once you see
this and once you start building these
out, it becomes second nature. Becomes
very easy to build out these reusable
formulas for success in your engineering
work. All right. And you can see what
it's built out here for us. Uh a huge
prompt. You know, we have all of our
validation commands at the bottom as you
saw here. We have notes here. You know,
again, this is a classic metaprompt. The
big difference here is that we are
instructing our metaprompt that's going
to run over and over and over for us
hundreds of times. We're instructing it
how to build a team with the new cloud
code task system. And so what does the
new cloud code task system look like?
How is this unique? As mentioned, what
we're doing here is we're actually
building up a task list and a dedicated
team to handle the individual tasks.
Now, this is vastly superior to the
previous generation to-do list and
previous generation sub aent colon via
the task tool because you can set up
tasks that run in specific order that
block and that depend on other tasks to
be complete. Okay. And not only that,
this allows for massively longer running
threads of work because your primary
agent can orchestrate a massive task
list, kick it off, and then as agents
complete it will receive specific
events. As sub agents complete work,
they will actually ping back to the
primary agent that accomplished the
work. And the primary agent can react to
it in real time. So you don't have to
sit, you don't need to add bash, sleep,
loops. The task system handles all of
that. And now, you know, speaking of the
task system, what are the task system
key function? So let's just take a look
at the key ones, right? There's task
create, there's task get, we have task
list, and we have task update. Task
update is obviously the big one. You'll
create a task and then update the task
with additional details. The powerful
thing about this is that your primary
agent and your sub agents can use these
tools to communicate to each other.
That's what's happening here with these
four tools. Task update is going to be
the big one because this allows the sub
agents and the primary agent to
communicate the work. And this unlocks
powerful workflows like this. We can now
set up multi- aent teams with even more
than one primary agent. So, you know,
same type of workflow, right? You kick
off a larger plan, a larger set of work.
Your agents will start working on it.
The agents will then complete their work
and then the blocked tasks are now
unblocked and the agents will continue
working through those piece by piece,
sending messages that they finished once
the task list is complete. And really,
as work completes, the primary agents
will be alerted. So, you can spin up as
many agents as you want. And notice how
this is looking a lot like the agent
threads that we talked about a couple
weeks ago. You know, thread-based
engineering is a powerful mental
framework to think about how work gets
complete. And we're seeing that here
with this multi- aent task system. So,
just once again, you prompt your agents.
Your agents create a large task list.
Your agent teams, right? Your sub agents
then accomplish the work in order
reviewing, checking each other's work.
If you set up the right reviewer agents,
and then they unblock the next task, so
on and so forth, right? They'll
communicate when their work is done. The
task list system will ping back to the
agent and then your agent will respond
to you once the work is done. So this is
the powerful taskless system and it
becomes even more powerful when you
deploy it and build it into a reusable
prompt that you can run over and over
and over. So what did our agent do for
us? It added and update the
documentation for this codebase. Let's
go ahead and check it out. Let's open up
a terminal here. Let's run gs. So you
can see all the files changed. You can
see we have a bunch of new status lines.
We got those new hooks that just weren't
there. We updated the readme. We have
that new spec. And we have our new JSON
file. Let's go ahead and just diff this.
And we can see those new hooks there.
Session end, permission request, sub
aent start, setup, and we have a bunch
of new hooks. And every one of these
hooks should have their own log file. So
keep in mind if we open up this prompt
here, let's just understand how these
two agents work together. We had our
planning agent build a team. Okay? And
so why is this different? Why is this
more powerful? because you can build
specialized agents that do one thing
extraordinarily well. All right. So, if
we look at the team members here, uh
where's that where's that note agent
slash here we go. So, team members, this
is a variable here and it's something
that we detail inside of the workflow.
In step four, we say this exactly,
right? Use the orchestration prompt to
guide team composition. Identify
fromcloud agents team markdown. So we're
looking at agents only in the specific
directory or we're using a
generalpurpose agent. And so if we open
up this directory here.Cloud agents
team, you can see I have just two
teammates, right? Two specific types of
agents that this codebase has access to.
We have a builder and we have a
validator. The purpose of the builder is
just to focus on that one task to build
it and then to report its work. But our
builder goes a little further. We
covered this in the previous video, but
it's so important to keep mentioning
this. You can now build specialized self
validation into every one of your
agents. You can see here my builder
agent after it runs. So on post tool
use, write edit, it's going to look to
see if it's operating in a Python file
and then it's going to run rough and ty.
So it's going to run its own code
checkers basically, right? And these can
be any types of code validation that you
want. The powerful thing here is that
we've kind of built in a micro step of
validation inside the builder on its
own. And then we have a higher level
validator agent that's just going to
make sure that the task was done
properly, right? Make sure that the code
is complete, make sure that it can run
whatever validation it needs to validate
that the builder did actually do the
work. Okay, so I really like this kind
of two agent pairing. We're basically
increasing our compute to increase the
trust we have that the work was
delivered. And if we had a specific type
of validation, we could also build out
tools to give this agent specialized
tools to make sure that the builder did
his job properly. I think this is
probably the simplest team combination
you can build. Of course, there are
other things, you know, QA tester
agents, reviewer agents, deploy agents,
blog monitoring agents. You can build
all types of agent teams, but I think
these are the two most foundational.
Have an agent build the thing and then
have another agent validate the thing.
Very powerful. This is what our primary
agent that was doing the planning work,
right, with the template metaprompt.
This is what it used to actually put
together the team. You know to be super
clear if we search for team
orchestration here we can see our team
members but you can see here every one
of these agents was unique. So we built
a session end builder for this session
end hook and then we built the
corresponding validator. Same thing with
permission request builder and then
permission request validator. All right
and this is where it gets really
powerful. If we go to this step-by-step
task, you can see here we have build
workflows. So build build build. And
then guess what happens after six? We
have validators. is doing compilation on
the code to make sure that it's legit.
And then we have additional validation
steps down here. And you know, looking
back at this, I actually missed an
opportunity here. If I search for
claw-p, there's a huge opportunity for
every validator agent to actually just
fire off claw--pey
all logs are created in logs slash. We
could have built a more tighter closed
loop where the agents were validating
this log file. We have all of our logs
for each one of these new methods. So,
if we just search for one of our new
ones, session end, we should see a
session end file here now. Yeah, there's
our session end. And so, we have some
new logging files that just weren't
there before, right? Permission request.
Um, and one of the newer ones that I
haven't really played with a lot, post
tool use failure. And you can see that
log file there. Fantastic. And then you
can see here, step 15, step 16, we're
going to update the readme. So, of
course, you know, simple validation
here. Just to quickly check this, we can
open this. And then once again, we can
just search for one of these tools that
weren't previously documented, right?
So, if I just search for post tool use,
you can see all of our documentation got
edited. And we can do this even faster
if we just want to get the file path
here. GDF, which is get diff, and then
we can just see the overall diff there.
We got a bunch of new status lines. We
got our file references updated, yada
yada yada. We have our new documentation
for these hooks here. So, that's
fantastic. We also got our GDF uh
settings file got updated as well. And
you can see new hooks were added.
Nothing super novel there. This was a
relatively simple task for Opus to
handle, especially with it deployed
across multiple agents, focusing on one
specific task at a time. That's another
huge value proposition of this system.
Every one of your agents has a focused
context window doing one thing
extraordinarily well. This is something
we talk about all the time in tactical
agent coding. This is the lesson six
tactic. If you're interested, check that
out. Link in the description. But
basically, the more agents you have with
focus context windows doing one specific
thing, the better. And this multi- aent
task system is perfect for that. Your
top level planner orchestrator agent
writes the plan. You want to refresh the
context after that, kick it off in a new
agent to do the building that was inside
of the plan. But once they do that, your
multi- aent systems task list and the
individual agent teams that you assign
the work to, they kind of take care of
it from there. And that leads us to the
question when should you use this task
system? So this is on by default if you
write a large enough prompt claude code
and opus it knows it has access to these
tools that in itself is like fine. It's
like you know a little bit more valuable
but I think if you're really pushing and
you're really scaling what you can do
with agents you're going to want to
build out a meta prompt like this. Okay.
It's a prompt that builds a prompt.
Specifically with agentic coding there
are two primary constraints. Planning
and reviewing. you're probably spending
most of your time planning or reviewing
if you're doing things right, if you're
doing true agentic engineering. Now,
this prompt, this new set of tools
really helps us in the planning phase.
We can build out specialized agents that
are again self- validating. So, every
one of them is checking their own work.
This is super important. I'll link
previous videos on the channel where we
talk about building out these embedded
hooks so that your agents are validating
specific work that they're designed to
do. But what you can do with your team
members, your agents that are, you know,
built for specific purposes, is really
build in unique workflows where you
think about the combination of running
multiple agents together that outperform
a single one. And that's why, you know,
we do build, we do test, we do build, we
do review. We have a documentation agent
that is just all about documenting.
That's another direction we can go with
this. You can see here our validator is
just reporting if the thing was built
right. If it was, we report success. If
it wasn't, we report failure. Okay, so a
very powerful dedicated agent just for
validating work. And as mentioned here,
you know, I could have pushed uh this
validation a bit further. We should have
had cloud-p messages for every single
validation agent. Instead, we just got
Python compile of the individual
scripts. This is probably enough for
Opus, though. If we open up any one of
these files, right, we had the logs
generated, too. But it's going to
basically mirror and copy the previous
format from all of the other hook
scripts that were running. And yeah,
just at a glance, I can see that this is
right. So, we got our sub agent
announce. This all looks great. But you
get the point, right? We could have
improved our validation there. And this
is where that orchestrator prompt
becomes even more important. If we go to
plan with team here, remember we pass in
two prompts. What we wanted to build and
then the actual orchestration prompt.
And I can pull that out here. I just
copy pasted that in. Had that set up
beforehand. So, you can just kind of see
exactly what this looks like, right?
create groups of agents for each hook,
one builder and one validator. All
right, so this is our orchestration
prompt. This is our highle prompt that
gets boiled down into a low-level prompt
thanks to our metaprompt. Then in the
orchestrator prompt, we're actually
helping our agent guide how to build the
team that does the work. This is a new
paradigm of multi- aent orchestration
that's emerging. This is one way you can
use it repeatedly, consistently, and
reliably. And it also gives you a little
bit of flexibility because you can also
pass in that orchestration prompt. So a
couple big ideas we're hitting on here.
Self- validation. We're hitting on
multi- aent orchestration. And again,
we're building it into our reusable
prompts. A lot of engineers are going to
miss this. Please don't be one of them.
You can build team orchestration into
your reusable prompt so you get the
value every single time. Right? It only
takes one time to build out a great
prompt, right? Just that upfront
investment is really where you want to
be spending more and more of your time.
As mentioned in tactical agentic coding,
you want to be building the agentic
layer of your code base. Don't work on
the application anymore. Work on the
agents that build the application for
you. All right, big big idea there. Uh
there's a lot of value embedded in that.
A lot of what we're seeing coming out,
you know, the Ralph Wickham technique,
uh all of this stuff around multi- aent
orchestration, which the cloud code team
is not documenting very well. Oh, I wish
they would really up their documentation
on this stuff. This task feature is
pushing in the direction of multi- aent
orchestration. Remember, in the
beginning, you have a base agent. Then
you learn how to use it better by
context engineering and prompt
engineering. And then you add more
agents. Very powerful. After you add
more agents, you customize them. And
then lastly, you add an orchestrator
agent to help you conduct all of them.
And that's what we're turning our
primary agent into. Let's be super clear
about this. your primary agent when
they're working with this task list,
when they're working with your agent
teams, they are orchestrating. All
right. Now, there's levels to this. We
built our own multi- aent orchestration
system inside of Agentic Horizon. Um,
I'll link the course in the description
obviously for you if you want to push
what you can do with Agentic Engineering
further beyond. I'll leave this prompt
in the cloud code hooks mastery codebase
for you. If you want to check it out, if
you want to understand how you can build
template meta prompts that encode your
engineering, this is very, very
powerful. I think there's a lot of hype
right now in the tech industry. There's
a lot of slop engineering and just vibe
slopping
and it's coming out by a lot of people
just jumping onto these super super
highle abstract tools like Moltbot. Now
I have nothing against this thing. I can
see why people are really interested.
You know, it's very powerful. This
thing's gone super viral, but I am super
concerned about an over reliance on
tools like this without understanding
the pieces of it. Now I think if you're
a agentic engineer, if you're an
engineer that has been learning to
really use agents and build proficient
systems that operate with and without
you, you know, go crazy with tools like
this. You know what's happening
underneath the hood. It's more of
everyone else that I'm worried about,
right?
That uh really have no idea what's going
on underneath the hood. When really, if
you're trying to learn how to build with
agents, it's all about the core four
context, model, prompt, and tools. And
it's about learning to leverage these
fundamental levers of agentic coding,
the fundamental pieces of building with
agents. And that comes down to reusable
prompts, building out your own
specialized agents, and building out AI
developer workflows, ADWs as we call
them in TAC. It's all about knowing what
you're doing and teaching your agents
how to do it. All right. There's going
to be a big gap between engineers that
turn their brain off and engineers that
keep learning and keep adding to their
stack of agentics, their patterns and
tools that they can use to teach their
agents how to build on their behalf. I'm
not saying don't use agents. I think
this tool and other tools like it,
they're incredible. What I'm saying is
know how to use the primitives and the
leverage points of agentic coding,
right? The foundational pieces that make
it all up. Because if you do that as I
have, as many of us have that watch this
channel, um you'll be able to hop from
tool to tool to tool to feature to
feature to feature. All right? And this
tool is a great example, right? This
system that the cloud code team has
built out, it's not new, right? Open
source tools have had this, but what
they've done here is standardized it and
made it accessible through the best
agent coding tool. That's worth paying
attention to. That's worth learning.
These are just tools and prompts. This
entire feature set is just tools and
prompts. So if we needed to, if you
wanted to, we could step away from cloud
code. We could build it into another
tool if needed. Thankfully, we don't
have to. They built it in. This is the
Claude Code task system. You can use
this to build specialized agent teams
when you combine it with a powerful meta
prompt, a prompt that builds a prompt.
And when you template and add self
validation into your agentic systems,
all right, these are powerful trends.
We're starting to stack up on the
channel. Make sure to like and comment.
let the algorithm know you're interested
in like real hands-on agentic
engineering. I want to kind of push back
against some of this, you know, insane
AI hype that's going on right now. Let's
stay close to the fundamentals. Let's
stay close to what makes up the agent at
a foundational level while increasing
what we can do with this. All right,
that's all for this one. You know where
to find me every single Monday. Stay
focused and keep building.
