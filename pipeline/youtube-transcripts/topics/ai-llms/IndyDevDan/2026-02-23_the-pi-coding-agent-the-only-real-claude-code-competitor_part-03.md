---
video_id: "f8cfH5XX-XU"
title: "The Pi Coding Agent: The ONLY REAL Claude Code COMPETITOR"
channel: "IndyDevDan"
topic: "ai-llms"
published_date: "2026-02-23"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=f8cfH5XX-XU"
duration: 3096
word_count: 3424
chunk: 3
total_chunks: 3
parent_video_id: "f8cfH5XX-XU"
---
right? And so, we did that with the
damage control extension. Okay? This is
where things get really interesting. And
if you're still watching, you know, I
want to thank you by really showcasing
how far and how much you can push this.
We're going to run this agent chain and
instead of an agent team, check this
out. So, I'm going to type chain and
let's run a scout workflow. This is a
triple scout recon workflow. So, I have
three scout agents chained together.
This is an agent chain, also known as an
agent pipeline. Use your team. Look for
all of the commands, skills, and agents
list in bullet point and state their
purpose. Check this out. So, I'm going
to run a agent chain. This is really
where things go parabolic. I'm
specializing everything here. Okay, so I
have a three agent execution workflow.
It's going to run a scouter, another
scouter, and then another scouter. Okay,
so this might seem really simple and
kind of like redundant, but you know,
you can put together any agent you want
to. And you know, we talk about this on
the channel a lot. To scale your impact,
you scale your compute. Imagine you
create a plan. And and you know, we
don't need to talk about this. We can
actually just do it. Okay. So, I'm going
to copy this again. Fire up a new
version of this. So, we'll select a
plan, build, review team. And so, you
can see we have three unique agents
chained together. user team plan out a
new minimal yet unique PI agent. Right
away, our primary agent is going to do a
little research to understand what's
going on here. Then it's going to kick
off its agent team. And so this is very
powerful. We have the orchestrator
working on the top level and then it's
going to dial its work into its team.
You can imagine what's happening here,
right? The planner is going to execute,
create a plan for the work. The builder
is going to build it and the reviewer is
going to review what was built and make
sure that it's right. You know, once
again, this is just one of, you know,
quite literally infinite agentic
workflows, right? Infinite pipelines,
infinite chains of agents that you can
build. Okay. And so you can see our
three scouter team is done. If we scroll
up here, you can see that it's broken
down where our agents are. It's broken
down some of our skills tools. So, it
thinks that skills are tools. We didn't
properly explain that. And we have
commands and extension hooks, right? Not
great. We probably want to throw a
smarter model at this problem and give
it some more improved setup context. But
the idea here is the same, right? I had
three scatter agents run back to backto
back over the output of the previous
agent. Okay, agent chain, also known as
an agent pipeline. And if you're a
tactical agent to coding member, this
probably looks or starting to smell
familiar to you. We are a few steps away
from having this being an ADW, an AI
developer workflow. I'll leave that
concept inside the course. Let's just
keep moving here. And we can see that
our planner is finished and our builder
is running. Okay, so we're going to let
this agent cook. It is running a
pipeline of agents, not just an agent
prompting a pipeline. We have an
orchestrator agent preparing the prompt
and then firing off to the team. And
then you can see the build is finished.
Now the reviewer is going to run get
status. We can see that it created some
type of totem extension. No idea what
that is or if that's going to be
valuable. All right, so that's tier two,
right? you can fully orchestrate your
agents. Very powerful. We have to give
credit where it's due. So, this was
created by Mario Zechner. He's a
prolific engineer. I've been following
his work for a while. You know, if we go
on to um GitHub here, I sponsored, you
know, just three engineers and Mario is
one of them for his great work on Pi.
All right. So, big shout out Mario. I
think he's shouted out the channel
before. Not sure, but he has just
created a great great piece of software.
And you might not know this, but this is
the agent coding tool that powers
openclaw, previously maltbot, previously
clawbot. This tool is very very capable
and as you can see it is customizable to
the core. All right, so there are many
many reasons to choose this tool over
another. Big shout out Mario doing great
work and you know you can see he's been
building a lot recently with the release
of this great tool. So tools MCP
servers. Let me just quickly go through
the kind of highle ideas here. One
interesting part about PI kind of
continuing on that trend is that it does
not have MCP support. I think Mario
realized relatively early that you can
just call the skill via a script or a
CLI. All right, so it kind of skipped
that step. It skipped that growing phase
that cloud code went through. Tool
override. This is another cool
capability. You can override the default
tools. Edit, write, bash, all of them
can be overwritten. MCP support not
there. Tool observability available in
both. And of course default tools, we've
covered that. multi- aent orchestration
as you saw this is all there cloud code
has a lot of this built in but it does
not have Asian chains or Asian pipelines
it does have Asian teams pi doesn't have
any of it but once again you can build
it and I hope this theme you know I've
kind of repeated this theme a million
times now you can do anything you want
with pi and it solves that like main
problem of the agent harness for you
like the the main agent loop is done
it's complete and then it just gives you
a full playground to operate on
everything else right the best parts of
the agent hooks and events. Uh, this is
kind of interesting. They both have a
whole set of events. Some of them are in
line, some of them are not. I'm going to
leave a ton of resources for you in the
description. And one of them will be a
full kind of breakdown of all the hooks
and events. And you know, it really
comes down to this, right? Like what is
customizable about these tools, right?
Let's just be super clear about this,
right? This is why PI is so powerful.
You can customize a system prompt. You
can use over 25 hooks. You can update
the footer, aka the status line. You can
change the themes. You can pick any
model you want. You can pass in your own
CLI flags. Okay? You can register tools
not just in programmatic mode, but
inside of your inloop agent coding tool.
All right? You can't do this in cloud
code, right? You have to give it a skill
or an MCP. Custom editor mode. Don't
really care about that. But if you're a
Vimm guy, supports there. Key bindings,
right? You can register custom key
bindings. As you saw, we we were cycling
through themes. And permission by
default is just YOLO mode. This is not
for engineers that do not know what
they're doing. All right. Customization.
As discussed, cloud code has some
minimal customization, but PI just takes
it all to the next level. They both
support message queuing. I consider this
a, you know, table stake feature. So,
they both have it, which is great.
So, the last agent I want to cover here
is really an idea. And the idea is you
want to be building agents that build
agents. You want to be working on that
meta level so that you can quickly build
out your solutions. Okay. So, if we look
for Pi Pi, you can see here that I have
a meta agent. And so, I'm going to kick
this off. What you'll see is that I have
broken down the capabilities of PI into
their own agent expert. So, we're
combining a lot of ideas we've talked
about on the channel. You know, we've
talked about agent experts. We have an
entire lesson on it inside of Agentic
Horizon. Link in the description for
that. This is taking multi-agent
orchestration to that next powerful
level where you have custom agents that
your orchestrator agent is composing and
controlling. Let me just showcase uh how
powerful this can be. So I'm just going
to say prompt all eight experts. Have
them concisely state their purpose. And
so when we fire this off, you can see
that my primary agent prompted all eight
agents in parallel. And so these are
pre-existing agents that have a precise
purpose to explain how to build and
create new PI agents. This is a meta PI
agent. And I've delegated all of the
special, you know, unique parts about PI
into their own dedicated agents. This is
a piece of the future of agentic
engineering. One agent is not enough.
You want to be stacking these. And once
again, here's that theme of
specialization. Okay, these generic
agents are generic agents. If you want
to survive the SAS onslaught, you better
be building specialized solutions that
solve problems better than anyone else
can. Again, that boils down to your
tools and the limitations you have
around your tools. You can imagine as
soon as I started spinning up all of
these agents to create this demo for
you, I stopped around agent four or five
and I said, "Click where I am. I'm
building agents once again in a
different specialized format, right?
Building PI agents. Let me create a meta
agent to generate these to spec with the
right customizations. Okay. And so
that's what I have here. I have built a
PI agent that can query experts,
subdomain experts, pull together all the
information it needs, and then the
primary agent will actually make the
edit. Okay, I'm out of time here. I'm
going to link this in the description
for you to dig into yourself. You'll
have full access to this codebase. All
the kind of juiciness is in extensions
directory. And if we just hop into one
of these, you can see that we have, you
know, the till done is a, you know, some
700 line TypeScript file that breaks
down exactly how this works. And if we
just do a quick collapse here, you can
get the gist of it. We registered a new
command till done. We registered a tool
for the agent, right? So we can call
this whenever it wants to, we have an on
input hook that we're catching on. We
have another hook on agent end on tool
call session, so on and so forth. Right?
You can really see that in order to
build these powerful PI agents, you just
want to understand structure and then
you can template it for your agents to
deliver these results for you on repeat
at scale. But as I mentioned, you know,
as you know, a kind of additional theme
on the channel, knowing what your agent
is doing is engineering. Okay, not
knowing is vibe coding. All right, I
want to keep emphasizing that on the
channel. I want to upgrade all the vibe
coders. You know, however many vibe
coders are watching, shout to you for
really trying to dig deeper and
understand things at a deeper level. And
for every engineer watching, don't fall
into the vibes. Stay sharp with your
engineering. Understand what you're
having your agents do. Agentic
engineering means knowing what your
agent is doing so that you don't have to
look. If you're vibe coding, it means
you're not looking and you have no idea
what your agent is doing. Okay? Big big
difference between the two. I don't want
to sound uh super harsh here. All right?
There are areas where cloud code shines.
Where cloud code really shines is the
enterprise platform adoption. If you're
a big company, if you're a big team, you
have to use cloud code. PI agent is
really only experimental, right? Use it
inside of your products in very specific
ways. Don't deploy this across your
entire enterprise, right? Cloud code has
much better support for that. They're
winning on the enterprise level. And
this is what you should expect, right?
PI agents literally built by one guy in
open source. Let's let's wrap this all
up. Who is PI agent for? You probably
have the gist by now. If you want full
control over the agent harness, system
prop tools, event loop, use PI. If cloud
code does what you need and you don't
need more, use cloud code. There's
nothing wrong with that. But know that
you will be limited by what this tool
offers and you'll have to be fine with
some more lock in. So pi is great if you
want to use any model out the box. If
you want a hedge against cloud code, if
you don't want to get locked in,
definitely use pi. Cloud code is great
for those out of the box, you know,
simple customizations. If you need to
use a stable agent that doesn't break
with changes, you know, frankly, both
these these tools change quite a bit.
But with Pi, you know, an open source
tool, you can just pin the version. You
can fork it, pin it, and it's done.
That's the gift of open source. If you
want maximum customizability, again, you
want Pi. On the other hand, if you're a
big team, if you're an enterprise, you
need to use Cloud Code. They have all
the enterprise features. There's no
debate here if you're an enterprise. All
right? You know, PI's for you if you've
outgrown and you've kind of mastered all
the outofthebox features and you want to
push agents further. The kind of meta
theme I think about all the time is is
that you can't get ahead of the curve by
doing what everyone else is doing. The
fact of the matter is is that cloud code
is now a mainstream tool for engineers,
for PMs, for designers, for all types
now, right? As I mentioned, cloud code
has gotten, you know, a curse, the curse
of success, the curse of growth almost
in a cancer-like way. Now, it must grow,
right? It's a huge profit point for
Anthropic. With that, of course, comes a
lot of great things, but it also comes
with massive trade-offs. Let's talk
strategy here, right? I'm not against
cloud code. I still use it. I use it
every single day. But I am starting to
hedge against cloud code with a tool
like Pi. So, my strategy here is simple.
Bet big on the leader, which is clearly
cloud code, but hedge with open source
with a highly customizable solution. All
right. There are a lot of open source
options out there. I think Pi is the
most customizable. Comment down below if
I'm wrong. if you think there's another
tool that is more customizable than what
you've seen here. We're just kind of
scratching all the ways you can
customize and take these ideas further.
All right, so that's my strategy, right?
Um, right now it's something like 80%
cloud code and then I'm starting to hand
off 20% to PI for that deeper level
experimental nextG agent coding. It's
nice to have a quick tool where I can
rapidly prototype ideas and get ROI for
building out specific agent teams and
reusing a great paradigm, you know, a
great set of teams. You probably want to
do it a specific way and PI lets you do
just that. Zooming all the way out here,
I've built a dedicated agent coding tool
that helps me generate new PI agents.
Okay, so notice that, right? We've
zoomed all the way out. The agent coding
path looks something like this. You
start with a base agent. You improve it
to a better agent. You become proficient
with your context engineering and your
prompt engineering. Then you customize
those agents and that's where a lot of
value is. And then you add an
orchestrator agent to help you control,
manipulate, CRUD all the specialized
agents that you've built, right? Most
engineers, you know, most builders are
using cloud code for that. Just out of
the box cloud code. But you can take
that much further. That orchestrator is
very, very powerful. And we're back on
that key theme, that kind of edge of
agentic engineering. You want to be
orchestrating this, right? The big
question is how much can you scale this?
How much can you push, you know, useful
agents, specialized agents doing useful
work with your orchestrator? Because at
some level, you just can't be in five,
10 terminals, you know, in loop,
outloop, web version, local version. Um,
at some level you need something like
this to kind of guide that entire
experience. That's the strategy. Pi for
control for deep customization and
experimental nextgen agent decoding. All
right, I think in ands not ors I
recommend you do the same. Use the right
tool for the job at the right price.
Don't limit yourself. As engineers, we
are limited by our tools. So experiment
with this. Give it some time. I have an
entire codebase ready for you. Link in
the description. Just experiment a
little bit. Play with it a little bit.
Just see what you could do. And maybe
your engineering mind is going to go off
and it's going to think, okay, I know a
problem. I can apply a custom agentic
coding tool to that will give us
outsized results. But you'll never find
that if you don't just play with it, if
you don't give it a shot because you'll
be constantly limited by what you're
seeing everyone else do and the normal
distribution of tools that everyone's
using, right? Which right now is cloud
code. We're in the age of slop. We're in
the age of agents. We're going to be
experiencing a lot of the same thing
generated by these agents everywhere.
Specialization doesn't stop at the model
agent or orchestration level. You can
customize your Aenta coding tool. That's
the big idea I wanted to connect with
you here on today. I'll be sharing some
additional private code bases where we
push these ideas to the edge for
tactical agentic coding and agentic
horizon members. So, if you're
interested, check out my take on how you
can scale far beyond the norm with
powerful agentic engineering. The whole
goal is to build code bases and run
teams of agents so powerful your
codebase runs itself. All right. So, if
you're interested in that, if you want
to get an additional edge, check that
out. Link in the description. I've had
thousands of engineers run through both
these courses now. And the value in
there is immense. For everyone else,
I'll leave the link in the description
for this PI codebase where we break down
all of these different ways to customize
the Pi agent. Keep expanding outside the
normal mainstream agent coding
experience. There are no winners yet.
There are only experimenters, thinkers,
builders and then everyone following
them. No matter what, stay focused and
keep building.
