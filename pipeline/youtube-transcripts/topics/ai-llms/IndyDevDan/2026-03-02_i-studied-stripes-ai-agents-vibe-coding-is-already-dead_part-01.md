---
video_id: "V5A1IU8VVp4"
title: "I Studied Stripe's AI Agents... Vibe Coding Is Already Dead"
channel: "IndyDevDan"
topic: "ai-llms"
published_date: "2026-03-02"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=V5A1IU8VVp4"
duration: 2431
word_count: 3998
chunk: 1
total_chunks: 3
parent_video_id: "V5A1IU8VVp4"
---
Are you vibe coding or are you a gentic
engineering? The difference is massive.
Keep that question in mind as you look
at one of the best engineering teams on
the planet to determine if they're vibe
coding or agentic engineering. Stripe
engineers are shipping 1,300 pull
requests every single week. Get this.
There is zero human written code and
they're doing it right. Imagine what
will happen to their insane numbers of
1.9 trillion in total volume up 34%
which is the equivalent to 1.6 of global
GDP. Stripe's doing 1 billion this year
and they power all of the best companies
that you and I use and you yourself
might be running on Stripe as well. What
happens when Stripe multiplies all this
with agents? And not just agents, what
happens when they multiply it with their
custom end-to-end solution they're
calling minions, fully unattended coding
agents that start from a Slack message
and end in a production ready PR. This
is Stripe's oneshot endto-end coding
agent. To me, the minions aren't even
the interesting part here. The
interesting stat here to me is that
their agents operate a code base with
millions of lines of code operating a
uncommon stack with a number of
homegrown libraries that are unique to
Stripe and therefore unknown to LLMs. On
top of that, the stakes that Stripe
operates in are extremely high. The code
they write moves over 1 trillion per
year of payment volume. They have a
number of real world dependencies,
regulatory and compliance obligations
that their code must honor. Now, here's
a simple important question for you. Do
you think Stripe can afford to vibe
code? I personally have written millions
of lines of code with agents and without
agents. I've been building with agents
since it was first possible way, way
back in the day when we were using GPT
3.5 Turbo. Many engineers don't even
know that model exists or once existed.
So allow me to clarify these terms a
little bit. Aentic engineering is
knowing what will happen in your system
so well you don't need to look. Vibe
coding is not knowing and not looking.
It's very clear stripe engineers are
agentic engineering. And in this video
we'll break down stripes aentic layer so
you can take the best pieces and add it
to your agentic systems. Vibe coding is
the lowest hanging fruit. When you
agentic engineer systems just like
Stripe has, from the prompt to your
skills to your custom agents to your
agent harness all the way up through
your tech stack, you capitalize on the
greatest opportunity for engineers to
ever exist. Agents,
let's look at their agendic system at a
high level so that we can analyze the
key pieces of their system. If these
components interest you, definitely
stick around. We're going to be breaking
down Stripe's key components. And as we
do this, you'll see what you have and
what you're missing. All right. So, the
first thing is the API layer. They have
a way to communicate to their agents. As
you'll see, they have many ways to do
this. Then they have a warm devbox pool.
What is this? This is an agent sandbox,
a space to place their agent. Fantastic.
They then have the agent harness. Stripe
built their agent harness. They forked
it from a tool we'll cover in a second
here. And then they have this blueprint
engine, the marriage of the old world
and the new world, code and agents. This
is super super important. This single
piece has given Stripe a massive edge.
You'll see why in a second. All right.
Then we have the rules file. How did
they manage the context problem? Agents
cannot read their 100 million line of
code codebase. So how do they solve that
problem? We'll then talk about the meta
layer of their tool shed. You can
imagine they have hundreds of tools and
tens of services that they want their
agents to operate with. How do they
solve that problem? They built a tool
shed. All right. Then of course they
have a way to validate all their agents
work. This is a critical validation
layer that they can use to give their
agents feedback and to validate that
they're not breaking existing working
features that's helping them generate
and maintain that movement of that $1
trillion. All right, so we're talking
about real stakes that the Stripe
engineers are facing. All right, this is
not a green field rapid prototype
application. All right, these are
serious stakes with real world
consequences. And then of course you
need a place to review your agents work.
They're using GitHub PRs. Everyone's
using GitHub PRS. This is the standard.
Nothing new here. All right. But these
are the critical pieces. We're going to
walk through these piece by piece and
understand how they put these together
to build their Agentic layer. Let's go
ahead and start with their minions. So
what is Stripe's take on agentic coding?
Let's find out. Aentic coding has gone
from new and exciting to table stakes.
Unattended coding agents have gone from
possibility to reality. You know, Stripe
engineers know what they're talking
about because this is true. If you are
not agentic coding, the gap between you
and the agent coding team within a week,
within a month is going to be
astronomical. Okay? It's going to be
exponential. This is the last moment to
hop on the train. Stripe minions are
Stripe's homegrown coding agents.
They're fully unattended, built to
oneshot tasks. Thousands of pull
requests merge each week. So one week
goes by, Stripe engineers merge a
thousand pull requests. Let's just
really understand that scale. All right.
And as I mentioned, they contain no
human written code. They realize you
have to stop coding to get the real
scale, to get the real power out of
these agents. You work on the agents,
not the application. Right? This is a
weird mindset shift that you need to
make if you're going to be building with
agents. Now, interesting to note here,
our developers can still plan and
collaborate with traditional agent
decoding tools, Claude and Cursor. But
in a world where one of our most
constrained resources is developer
attention, the agents allow for
parallelization of tasks. This is super
super super critical. All right, they
realize that the most important resource
and really any software company's most
important resource is your developers
time. It's your developer attention. And
when you maximize the leverage your
developers get, you can do crazy things
like this. They see their engineers
spinning up multiple minions in parallel
and able to solve multiple problems at
the same time in different conditions.
All right, so this is fantastic. So the
first thing we need to figure out is why
they built the minions in the first
place. Why did they build it themselves?
What's the point of this? Isn't cloud
code good enough? Vibe coding a
prototype from scratch is fundamentally
different from contributing to Stripe's
codebase. Okay, interesting. Say more.
Stress codebase encompasses hundreds of
millions of code across a few large
repositories. Okay. Written in Ruby,
uncommon stack, homegrown libraries,
LLMs don't have it baked in, right? It's
not in the models training data. Stakes
are high. Stripe moves over 1 trillion
per year in payment volume. As
mentioned, they have real world
dependencies and compliance obligations.
LLM agents are really great at building
from scratch when there are no
constraints on the system. However,
iterating on any codebase of scale,
complexity, and maturity is inherently
much harder. Very, very true. Engineers
build sophisticated models to make
changes inside their large repo. This is
huge. And we talk about this on the
channel all the time. Specialization is
how you win. When you're building a
great product, it is literally a
specialized solution to a specialized
problem. So, why would you stop at your
tooling? Your tooling and your code must
also be specialized. So, this is why
they built their own custom agent. It's
because they're solving specific
problems in specific ways better than
anyone. And again, this is a theme we
talk about on the channel all the time.
Specialization is your advantage. And in
last week's video, we talked about the
PI coding agent because there are many
coding agents, but this one is mine. We
emphasized this very idea. You can
customize your prompt. You can customize
your skills. You can customize your
custom agents and you can specialize
your agent harness. The more you're
specializing, the more you're building
specific solutions to specific problems,
the bigger your edge is. And the more
you distance yourself from the out-
of-the-box experiences that a lot of
agentic coding tools are driving
everyone toward, the better off you're
going to be. So, Stripe built minions to
solve their specific problem and to
operate their large code base better
than anyone. Makes sense, right? Big
shout out to everyone who shared that
video. That one went absolutely viral
and for a good reason. Engineers are
realizing that we don't want to be super
locked in to a single tool like cloud
code or cursor or codeex or whatever.
Every tool is going to have a problem,
but the tool that won't have a problem
is the one you customize to solve your
specific problems better than anyone.
There are many coding agents, but this
one is mine. I love this slogan. Let's
see how Stripe customized their minions.
So, what is it like to use a minion?
Right away, we jump into another
critical idea. There are several entry
points for minions. They're designed to
integrate as ergonomically as possible
where Stripe engineers are. All right,
so they use a CLI, a web interface, and
they have Slack. Already they have three
points of contact for kicking off their
API, I assume, right? They they have a
separate application which kicks off
their agents, right? Their pool of
agents, but they have multiple ways to
interface with that primary service.
Very important. And so we can see here,
you know, here's a clear example of an
engineer in Stripe using that at symbol
at devbox and then they write their
prompt to the agent, right? Makes sense.
Nothing new there. Okay. And so we can
see here they have a custom UI that they
built, right? They have an interface to
allow them to interface with their
custom agent. So you know on the left
you can see kind of a typical view. We
have that log of tools and the thought
process that their agents go through.
And then on the right we can see that
they have all the modified files. So
they can see very very quickly what's
going on with that agent. And then of
course in the top right here they have
their actions. All right, so create pull
request. And I'm sure they have some
prompt interface here as well. So nice
and simple, very concise. You can see
that they're just surfacing the most
important information. And this hints at
another key aspect of your agents and
your agentic system. You need to be able
to observe what's going on. Once a task
has been completed, a minion will create
a branch, pushes it to CI, and prepares
a pull request following Stripe's PR
template. And then they're going to
request another review from a Stripe
engineer. And they can also iterate. So
this is a classic end of process setup.
When you're a genta coding, you show up
at the beginning and the end during
planning and during review and ideally
not once in the middle. All right? And
that is what creates an outloop agent
coding system. You just write the prompt
and you just do the review. There's
inloop agent coding and then there's
outloop agent coding. All right? We'll
circle back to that idea in a second. So
how do their minions actually work? A
minion starts in an isolated developer
environment or a dev box. Fascinating.
So, this is a concept we've talked about
on the channel. They're giving their
agents their own environment to operate
in, right? Which is the same type of
machine that Stripes engineers write on.
This is a simple yet powerful idea. If
you want your agent to do what you can,
you must give it the tools and the
environment that you have. So, Stripe
realizes this. They reuse their
developer setup for their agents. They
give them everything that the engineer
has. Super super powerful idea here.
Dead boxes are pre-warmed, so one can be
spun up in 10 seconds. Love that. Uh,
not very fast, but for the machine that
they're booting up, which I think
they'll mention in a moment, that is
very fast. They're booting up full-on
AWS EC2 instances. All right, with
Stripe's code and services preloaded,
they're isolated. This is a safe space
to place their agent. And they do this
so that they can run minions on dev
boxes without human permission checks.
Of course, this also gives you
parallelization without the overhead of
something like Git Work trees, which
just falls apart at certain scales. All
right, after some time, the Git Work
trees just fall apart. You're going to
need your own dedicated device. I have a
Mac Mini here as a local personal kind
of private device. But recently, I also
just said, "Screw it. I'm going to need
more scale." And I started spinning up
entire dev boxes for my agents on, you
know, use your favorite cloud hosting
tool, GCP, AWS, and some of the other
ephemeral agent sandbox tools like E2B,
modal, so on so forth. But this is a
really big idea, right? Um, the more
autonomy you give your agents and the
more you set up their environment to be
yours, the more they can act and perform
as you would. The core agent loop runs
on a fork of blocks coding agent, goose.
One of the first widely used coding
agents, which they forked early on. So
shout out Goose. They took this and they
customized the orchestration flow in an
opinionated way to interle agent loops
and deterministic code. Huge huge huge
idea here and they're going to expand on
this even more in a moment here with one
of the big ideas they talk about later
which is their blueprint engine. Okay,
so this is a huge huge huge idea. Let me
just emphasize this. You want to be
interle agent loop with deterministic
code and what type of operations right
we're talking get liners and most
importantly testing. Okay, this lets
your agents, your system operate with
feedback. And this gives you the best of
both worlds. You get the deterministic
world and the non-deterministic
reasoning creativity world. And they
explicitly say that here they run a mix
of creativity of the agent with
asurances that they'll always complete
stripe specific steps like llinters. So
here we have stripe agentic engineering
determinism with agents. All right. So a
couple additional things to note here.
connected to MCP. They use cursor and
clawed code and some conditions. They
operate agent rule files. We'll talk
about that more in a second. This solves
the large context problem for Stripe.
All agent rules are conditionally
applied based on subdirectories. Super
important. They have MCP as I mentioned.
They have this tool shed idea which is
basically a meta tool to help them
select one or more of their 400 MCP
tools. Okay. A really big piece of why
this blog post is so incredible, you
know, shout out to the Stripe engineers,
shout out to Alistar Gray, is the fact
that they're operating at such a massive
scale, at such success, and they're
still gaining massive value from their
agents and from their agentic layer that
they're building. All right, managers
are built with a goal of oneshotting,
but if they don't, the key is to give
them feedback. Key key idea. Two more
ideas here. We seek to shift feedback
left when thinking about developer
productivity. The best thing for humans
and agents is basically you want the
issues to happen earlier rather than
later, right? On the engineers's device,
on the agents device as early in the
process as possible. All right? And then
if local testing doesn't catch anything,
they have a whole suite of tests over 3
million tests that run upon push. Key
idea here, they figured out a way to
selectively run tests on push. All
right? And they're choosing from many of
3 million tests. Okay? And this is going
to, as you can imagine, offer feedback
to their agentic system. Now, here's
something that I would critique Stripe
on a little bit here. Due to the cost
constraints, they only let their minion
run at most two rounds of CI. All right,
so you can imagine at this scale that
they have to just limit this for it to
be costefficient. This is where I would
push back a little bit. We'll talk about
that later, but this is a interesting
thing here, right? So, they basically
limited the rounds of feedback for their
minion to just two. This is part one of
their blog. Let's look at part two and
dig into some of the details of some of
these key nodes, right? Specifically,
their agent sandbox and their powerful
blueprint engine because their blueprint
engine sits at the center of how they
operate their strike minions at scale.
So, here's part two, dev boxes hot and
ready. So for maximum effectiveness,
their minion agents requires a cloud
developer environment that's
paralyzable, predictable, and isolated.
So this is very clearly an agent
sandbox. Okay, it gives them a place to
operate at scale with full autonomy. And
if something goes wrong, if they destroy
something, the agent can't cause as much
damage as they could if they were
operating your device or god forbid a
device connected to the production
system. And I completely agree.
Containerization, get work trees,
they're great, but they have hard limits
and it's hard to really really scale
without giving each agent their own
device, right? Again, if you want your
agent to perform like you, give them the
tools that you have. All right. What
else can we learn about Stripes Devbox
here? So, very cool. Stripes Devbox is a
full-on computer, right? It's an EC2
instance and it contains their source
code and services under development.
Very, very cool. Many engineers use one
dev box per tasks and this means that
every engineer might have half a dozen
running at a time. Check out how awesome
this is, right? They're allowing their
engineers to scale their impact by
allowing parallelization of their agents
and every agent has their own sandbox.
Okay, so a question I would ask them is,
do their minions have access to
additional minion sub agents or not even
sub agents, other primary agents that
are specialized across their code base?
Very cool stuff here. This is again part
of their agentic system, right? It's
giving and servicing scale very very
quickly so that engineers can knock out
more problems than ever before. All
right, we want it to feel effortless to
spin up new dev boxes. Right, ready in
10 seconds. Hot and ready. So fantastic.
The raw pieces of engineering should
feel effortless. You want to be building
systems that allow you to move at the
agentic speed, the speed of agents.
Something kind of funny happened to me
the other day while I was reading this
blog. Actually, I'll throw the image on
the screen. I had to save it. The
agentic speed is just insane. Your
agents can process information much,
much faster than you can. I was reading
through this blog, you know, took me
maybe, you know, 20 minutes to read
through part one and part two, take
notes on this. I also spun up a cloud
code agent to read the blog alongside
me. It read the whole thing, of course,
in what was it, 5 seconds. And so I just
had like a really funny interaction
where uh you know I was shocked and then
you know I said something and the agent
literally said nothing. It was the first
time I've ever had my agent respond with
nothing. It was just a really
interesting interaction point. And and
this is the agentic speed, right? It's
this multiplied by every single agent
you can spin up. Your agents can read,
they can code, they can engineer at
agentic speed. So you need to build the
system that allows you to tap into that.
And you can see here Stripe is doing
that with their powerful dev boxes that
spin up in just 10 seconds and it
somehow sets up their entire gigantic
repository. Millions of lines of code,
tens and thousands, probably hundreds of
thousands of files. All right. And you
know, props to Stripe. We built out dev
boxes for the needs of human engineers
long before LLM coding agents. As it
turns out, parallelism, predictability,
isolation were very, very good
properties for engineers as well as
agents. Fantastic. We're almost at the
blueprint, which is a really, really big
idea. But let's talk about their agent a
little bit more, right? So, they built
this on their own. They forked Goose.
Let me be clear about that. They forked
Goose and then they customized it to
work within Stripe's LLM infrastructure.
Okay? So, you can imagine they have
custom prompts, custom skills, custom
agents, and then they customize the
agent harness. All right? And again,
this was the big idea we talked about in
last week's video. I'll leave that
linked in the description for you if
you're interested. Customizing your
Aentic harness gives you a massive edge.
You can do it your way. You can build it
to fit the needs of your specific
problem. Okay, once again, I want to
beat this idea over the head.
Specialization is the advantage of every
engineer. Now, you can build specialized
solutions, specialized developer tools
to help you solve your problems at the
agentic speed. Okay, the speed of
agents, not the speed of humans. And so
they focus their use on the needs of
minions rather than human supervised
tools. And this is another big idea we
need to double click into. That's the
use case well filled by third-party
tools such as cursor and claw code.
Okay, which are made readily available
for our engineers. So a couple things
here. They're not limiting, they're not
forcing their engineers to use any
specific tooling. That's a terrible idea
in general. But what they are doing is
building two types of agent coding
tools. Inloop and outloop. I've talked
about this on the channel before. This
is a critical idea to get right if you
want to do more with your agentic
engineering. When you are in loop
