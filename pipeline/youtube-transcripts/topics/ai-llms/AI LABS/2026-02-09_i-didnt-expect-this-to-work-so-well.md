---
video_id: "MSyWjPDrHJw"
title: "I Didn't Expect This To Work So Well"
channel: "AI LABS"
topic: "ai-llms"
published_date: "2026-02-09"
ingested_date: "2026-02-09"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=MSyWjPDrHJw"
duration: 522
word_count: 1922
---
Was Opus 4.6 the only upgrade from
Anthropic? You already know about sub
agents where each agent operates as an
individual entity with its own context
window. But these sub agents failed when
there was a task that required
coordination between them. In those
cases, the orchestrator had to step in
taking responses from one agent and
delegating them to another or the agents
had to rely on notes in the project
folder. Because of this communication
gap, simple tasks would become too over
complicated. To deal with this,
Anthropic released a new upgrade to sub
agents and named them agent teams.
They've been launched alongside Opus
4.6. Although this is still an
experimental feature, we've implemented
it in multiple workflows and the
greatest improvement was that the time
these tasks took was greatly reduced,
but it is experimental for a reason and
still has some rough edges and we found
little fixes for those problems as well.
Agent [snorts] teams is the idea of
having multiple clawed code instances
working together. Each member of the
team works on isolated tasks and has
centralized management controlled by one
agent. Now, you might think this sounds
really similar to the already existing
clawed sub aents because both run in
parallel and split up tasks, but they're
not the same. This is because agent
teams solve the one problem the sub aent
framework has. Sub aents are not able to
communicate with each other and have to
rely on the orchestrator agent to act as
a medium of communication for them. Team
members, on the other hand, are able to
communicate with each other. The core
idea behind agent teams is having
multiple claude code sessions working
together. One session acts as a team
leader coordinating work, assigning
tasks, and synthesizing results while
the teammates work independently in
their own context windows. Sub agents
have their own context window, and they
report the result back to the caller.
But for teams, it works differently.
Each member of the agent team is a fully
independent terminal session. They're
not restricted or coordinated by an
orchestrator that just divides tasks.
Instead, these terminal sessions are
opened and closed by the main team lead.
They are able to work across tasks that
require discussion and collaboration
between agents because of their ability
to communicate. So an agent team
essentially consists of a team lead and
teammates. The team lead is the main
agent that creates the team and
coordinates their work. The teammates
are the workers who actually perform the
tasks. Each teammate receives a task
list which is a shared list of items.
Each member identifies what it needs to
do from this list and executes it to
communicate. They also have a shared
mailbox that allows them to send
messages to each other. Now the question
was how this actually works. If each
team member is independent, how do they
know what the other members are doing?
This works because all the information
regarding the team, the members and the
tasks each member is working on is
stored locally in the dotcloud folder
and identified by the task name. This
feature is still experimental and
disabled by default. So there are going
to be some bugs in teammate handling
during this phase. In order to try it
out, we had to manually enable it. We
did this by setting the claude code CLI
flag for experimental agent teams to
one. With this CLI flag enabled, agent
teams were available for use in further
sessions. [snorts] With this flag
enabled, we were able to access the
teams feature in Claude Code. Since this
is an experimental feature, we needed to
use specific wording that tells Claude
we want to use the agent team for a
certain job. Our team has started using
this feature to parallelize code review,
letting code issues be identified and
fixed at the same time. To do this, we
asked Claude to use one team member to
find issues in the codebase and another
to fix the issues identified by the
first member. We had to be detailed in
the prompt to make it follow the right
direction. Now, if sub agents were
handling this, they would be writing a
report to some physical file to let the
other agents know what to fix. But here,
we wanted to speed up the review process
by letting this happen without the
overhead of writing to a local file.
When we gave the prompt to claude code,
the team members spawned, each
controlled by the team lead. The lead
agent gave the prompt to individual
agents, letting them know what task to
perform. Now the first code reviewer
agent started working and after
analyzing the task it shared messages
with the code fixer bug by bug. This
agent was prioritizing critical security
issues and once the code fixer received
the messages from the code reviewer it
started implementing the fixes while the
code reviewer continued looking for more
issues. Similarly they kept talking to
each other and reporting back the
changes that were implemented. Once the
critical issues were completed the two
agents moved towards fixing the medium
priority issues. The code review and
code fixing were happening
simultaneously which saved a lot of
time. The good thing about this is that
you can also assign or modify any task
for a team member. With this enabled,
you can steer the direction of the work
of that specific team member. Once the
agents were done working, control was
handed back to the main agent which is
responsible for making sure the required
changes are implemented correctly and
for shutting these agents down
gracefully, ensuring their exit does not
cause errors later on. You've probably
noticed we build a lot in these videos.
All the prompts, the code, the
templates, you know, the stuff you'd
normally have to pause and copy from the
screen. It's all in our community. This
video and every video before it, too.
Links in the description. Parallel
[snorts] finding and fixing is a really
good thing, but there are often cases
where you get issues and just can't
figure out what's causing them. In those
cases, we can use an agent team to test
multiple perspectives of the same app
and work progressively toward the bug.
This way, team members can communicate
their findings to each other and move
forward together. We asked Claude to
find a bug in the codebase and specified
using multiple team members, letting
them approach the problem from different
perspectives. It then spawned four sub
agents, each focused on a different
perspective of the same app. They
received similar prompts from the team
lead and investigated the errors based
on their specific aspect of the
application. While the main lead waited
for them to finish and then analyzed the
findings from their research. Without
teams, we would have had a single thread
which would have taken much longer. But
with these agents, the process was much
faster. The investigation completed
quickly and all of the research by the
agents was done in approximately 2 to 3
minutes which is a significant
improvement compared to linear checking
which would have easily taken 5 to 10
minutes. One thing to watch out for is
that this approach burns a lot of tokens
because each agent has its own context
window. So we need to be careful about
that. Once the agents returned their
output and were shut down, the team lead
also verified the results by checking
itself. All four agents converged on the
same bug and they correctly pointed out
the issue with a stale closure in the
use effect. This exact part was flagged
by all four agents. Also, if you are
enjoying our content, consider pressing
the hype button because it helps us
create more content like this and reach
out to more people. This agent framework
has changed how we work on long horizon
tasks because with their abilities,
agents don't have to rely on documenting
their progress only. With agent teams,
we can handle different aspects of an
application in parallel and also have a
member dedicated to handling research.
When we gave Claude the prompt, it
spawned six agents. Two were working on
research and laying the foundations
while the rest were for building the
pages. The builder agents were blocked
by the agent laying the foundation
because it was responsible for
installing required packages and making
the environment ready with all the
dependencies. Each agent received a
specific prompt defining their job. The
blocked agents kept waiting for the
unblocked signal from the team lead.
Once the research and foundations were
complete, the remaining agents were
unblocked and started implementing their
respective parts of the application side
by side. They kept communicating with
each other for consistency between each
component. The team lead kept
coordinating with the agents and once
any agent finished, the team lead sent a
shutdown message to that agent handling
its exit gracefully. This whole process
consumed around 170k tokens of the
context window. But in the end, we got
the app built exactly as we wanted, all
from a single prompt. As [snorts] we
mentioned in the video, when our team
was testing this, we came across
multiple ways to make agent teams work
better for us. And again, these best
practices are available in AIABS Pro, so
you can try them out for yourself. The
first recommendation is generally
applicable to all agents and not only
limited to the agent team feature. You
need to explicitly specify the scope of
where the agent should be working. You
can do this either by defining it in the
prompt specifying which files to look
for in order to perform the task or by
creating documents in the project
containing individual tasks as we did
for our workflow where we prepared a
proper task document for each assignment
so that the agent can work independently
and within the right scope. Another
thing to keep in mind is that each of
these agents should be working on
independent tasks from each other
because if they are editing the same
file at the same time, it would create a
conflict and might lead to overwriting
the content. Aside from this, there were
times when we found that the main agent
would get impatient if any agent takes a
long time to complete a task and start
implementing the task itself instead of
letting teammates complete it. So, it's
important to remind the main agent to
wait for teammates to complete before
proceeding. You also need to size tasks
properly. If you assign tasks that are
too small, it creates coordination
overhead. If tasks are too large, it
increases the risk of wasted effort. So,
tasks need to be balanced and
self-contained. Finally, you need to
monitor the agents work. If any agent is
not performing as expected, you can halt
its execution and give it new
instructions on what it should be doing.
Following these practices makes using
this experimental feature much more
effective. That brings us to the end of
this video. If you'd like to support the
channel and help us keep making videos
like this, you can do so by using the
super thanks button below. As always,
thank you for watching and I'll see you
in the next one.
