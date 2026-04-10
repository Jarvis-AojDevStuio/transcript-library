---
video_id: "eRu5kIYAAz8"
title: "Claude Code's HIDDEN Agent Swarm (Better Than Kimi K2.5?)"
channel: "Better Stack"
topic: "ai-llms"
published_date: "2026-01-30"
ingested_date: "2026-03-12"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=eRu5kIYAAz8"
duration: 408
word_count: 1363
---
People are going crazy over Kimmy 2.5.
It's an open- source model that has some
better benchmarks than Opus and an
insanely clever agent swarm mode where
an orchestrator can spawn up to 100
specialized agents for a complex task.
But did you know that this feature also
exists in Claw's code behind a hidden
flag and was discovered by a user on
Twitter? How did someone discover this?
And did Anthropolic just steal this idea
from Kimmy? Hit subscribe and let's get
into it. [music]
Anthropic announced custom sub aents in
July last year, and since then, people
have been using them for all kinds of
specialized tasks. We actually made a
video about it back then, too. But sub
agents themselves only have a snippet of
the wider context since they're designed
for a specialized task. So, they do that
task, return the data, and have a fresh
slate of memory. So people kind of
implemented memory by getting the sub
agents to output their findings to a
markdown file and also update a main
context file. So if the same or a
different sub aent was asked to make an
update, they could just read those files
and see where the other sub aents had
left off. But you still have to manually
create a sub agent, giving it a role,
access to specific skills, tools,
[music] permissions, and so on. And this
is why Kimmy's new agent swarm takes
things to the next level because the
orchestrator is the one that dynamically
creates a specialized sub agent for a
specific task. So you don't have to do
anything. These sub aents can work in
parallel to complete an overall task and
when they're done with their bit, they
can give it to the orchestrator who can
decide if new sub agents need to be spun
up with that data in order to complete
the complex task. Kimmy's agent swarm is
still a research project, but it's
already showing great improvements
compared to a single agent workflow. I
mean, look at this graph. The more
complex a task is, it pretty much stays
consistent because of the agents working
in parallel to complete the same thing.
Now, if I'm being honest, you [music]
can kind of already do this in Claude
Code. So, with the newish task feature,
you can create a list of tasks and fan
them out to individual sub aents. The
problem is that these sub aents are
general purpose and not specialized for
the specific task. I'm also not sure if
Claude is automatically able to assign
tasks to the correct custom sub aent.
Let me know in the comments if you've
tried this already. But it looks like
the Claude team have been working on a
way for an orchestrator to automatically
create sub agents on the fly based on
the task. And this feature has been
hidden behind a flag which was found by
Mike Kelly who shows how it works in
this tweet. and in the same tweet shares
a link to a repo which is a fork of CC
mirror called Claude sneak peek. Let's
try it. So this is a plan written by AI
to create a web front end for a tool
called XDL that allows you to download
videos from X or Twitter in the
terminal. I've already installed and
have Claude sneak peek running which you
can see looks like a minimal version of
Claude code. I'm going to ask it to read
the plan MD file and create tasks that
can be executed by a swarm of sub aents.
Then I'll leave it to create the tasks.
And now it's finished creating the
tasks, I'm going to ask it to execute
the tasks using sub aents. Now before I
do that, just to confirm I don't have
any custom sub aents in place, I'm going
to run the agent slash command. And you
can see that there are no specialized or
custom sub aents in place. So now it's
executing the tasks and here it's
automatically added a front-end builder
sub agent for the front-end tasks. And
you can see here we have a team. If we
press down to view the team, we can see
we have five agents in place. a team
lead, QA tester, backend builder,
component builder, and front-end
builder, all working on tasks at the
same time. And we can also see what each
agent on our team is working on. So, we
can see the QA tester is searching for
patterns. The backend builder is also
searching for patterns and reading
files. And so is the component builder
and front end builder. If we want to see
exactly what our agent is doing, we can
hit enter. And now we're in the agents
view, and we can see its system prompt.
If we go back, we can see we now have
eight agents. So, a components creator,
an API server, someone doing the V
setup, someone integrating the API, and
now we have someone doing CSS, and our
team of agents just seems to keep
growing. If we hit enter on the team
lead, we can see we're back in the main
Claude code view. So, the team lead is
the main Claude code orchestrator. We
can also see in the main view that each
sub agent is giving us its current
status. And if I zoom out a tiny bit and
scroll up, we can see the messages sent
previously from all the different
agents. And now that all the tasks are
complete, we get a swarm project
complete file which tells us everything
that was done. But we also get a swarm
execution report which gives us the
number of specialized agents that were
used, their role, and if they completed
the task. We can also scroll down to see
in detail exactly what each agent did.
Now, based on how much work the claw
team have already put into this feature,
I don't think they copied Kimmy. I think
they saw implementations online like
agents and be mad and wanted to add it
to claude code natively, but I can
totally understand why they haven't
released it. Firstly, I don't think this
feature has had the many hours of
training that the Kimmy 2.5 orchestrator
has. And also, things get really
complicated for a user that already has
some or even many sub agents. For
example, if a user wants to complete a
complex task, how does the orchestrator
know to create a brand new front-end sub
aent or use the user's existing sub
aent? What metrics or data is he using
to make that judgment? And also, skills
adds more complication. If a user
already has a bunch of downloaded
skills, how would the orchestrator know
to use them for a new agent or to
download its own ones which may even be
more appropriate for the task at hand? I
mean, this orchestrator, if Anthropic
ever release it, will have to go through
a bunch of user data already, agents,
tools, skills, just before it can decide
if it needs to make its own sub agent
and what things it should add to it. I
actually don't know if the team are
working on this feature right now as I
speak or if they've decided it's too
complicated and won't release it. I
don't know. Speaking of features, if
you're using an AI or a human to rapidly
add features to a project and you want
to make sure things don't break, then
you really need to check out Beta Stack
because it's able to monitor logs on
your servers and use anomaly detection
to tell you if anything goes wrong
before it does. And it also has AI
native error tracking to let you know if
anything goes wrong on your front end.
