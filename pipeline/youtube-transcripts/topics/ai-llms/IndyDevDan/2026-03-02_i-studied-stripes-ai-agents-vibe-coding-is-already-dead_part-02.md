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
word_count: 3996
chunk: 2
total_chunks: 3
parent_video_id: "V5A1IU8VVp4"
---
agentic coding, your butts in the seat
at your desk and you're prompting back
and forth and back and forth and back
and forth. This is great for highly
specialized work. This is great for when
you're building the system that builds
the system, but this is bad for
everything else. Okay? Uh as a general
rule, I recommend to engineers now that
you spend more than 50% of your time
building the system of agents that build
your application for you. That's inloop,
right? And that's really the value prop
of inloop. You get full control. You can
see everything. It's very manual, but it
is very slow and expensive. You're using
human engineered time. Then there's
outloop agent coding. And this is what
Stripe's minions offer Stripe. Okay,
they are building an Outloop system that
operates at scale in parallel in the dev
box, right? In dedicated agent
sandboxes. This is a big big idea. Why
is that? It's because now instead of
having one engineer with one terminal or
one engineer with three terminals, you
can have one engineer with six agent
sandboxes operating and solving problems
at scale in parallel, right? And six is
just the beginning of this. The whole
idea here is that you should be handing
off more work over time to your Outloop
system. If you're building a great
agentic layer, if you're building a
great system that has agents operating
your services for you, you should slowly
be handing off more work to them. Okay?
And that saves you from the expensive
time that you'll spend. And you know,
never forget your time is your most
important resource. It is constantly
running out. Okay? Let me just be super
clear about that. But your your agentic
systems, you can clone, you can dupe,
you can parallelize these as far as your
system allows you to. All right? And
that's the lever that agentic
engineering unlocks. If you build the
system that builds the system, you get
massive, massive reasoning at scale. you
get access to intelligence that
engineers your way and at some point
better than your way. But uh that's key.
So I just wanted to to really dial into
that. Minions give Stripe engineers
access to outloop agentic coding. Very
very powerful. And so they talk about
specialization a little bit more. And
you know they're really hitting on this
this idea I just mentioned there.
Offtheshelf local coding agents are
usually optimized for workflows where
the engineer is sitting looking over his
shoulder, right? And I just call this
babysitting the agent. Minions are fully
unattended and so their agent harness
can't use humanfacing features. Okay,
they built the minion to be fully
autonomous, right? They're built so that
humans cannot interject. That's not the
point, right? The point is that they
operate on their own. Again, inloop
agent coding, outloop agentic coding.
Cloud code minions. Okay? And just to
emphasize it once again, you know, cloud
code has the ability cursor has the
cursor CLI. And of course, there are
great tools we've covered on the channel
like pi.dev dev or you can
programmatically inject these into your
Outloop systems, right? You can deploy
an agent outside the loop and have them
run on a cron job, have them run via an
API request, so on and so forth. All
right, that is where all agent engineers
must move to get massive leverage. You
can see stripes engineers using minions
to do just that. All right, so uh they
talk about permissions. Uh let's focus
on the big idea here right next to dev
boxes. The next most important thing
here for sure is their blueprint engine.
So let's talk about this thing. So what
is this? So they talk about workflows
versus agents. They talk about loops.
They talk about, you know, series of
steps, which is like the workflow. This
is what a lot of prompts and skills
actually are. They're just steps that
you want to work through. Sometimes you
have an agent that's actually doing some
intelligent reasoning, right? Loop with
tools. But you can do much better than
that. You can push a lot further. And
that's exactly what Stripe has done.
Minions are orchestrated with a
primitive we call blueprints. Blueprints
are workflows designed in code that
direct a minion run. Okay. And then they
go on to say blueprints combine the
determinism of workflows with agents
flexibility in dealing with the unknown.
What is this? Every tactical agent
coding member knows this as an ADW, an
AI developer workflow. This is the past
and the future. This is code plus your
agent. Okay, this is the highest
leverage point of agent coding is when
you put these two together. You have
step-by-step workflows that have
determinism and non-determinism put
together. In essence, a blueprint is
like a collection of Asian skills
interwoven with deterministic code so
that particular subtasks can be handled
most appropriately. Okay, there are some
things like a llinter for instance or
like a git commit or a whole number of
things, right? Running tests, creating
certain structures, creating certain
templates, certain reusable pieces,
certain hard deterministic code
pathways. There are certain pieces that
an agent would perform worse in. Adding
an agent to specific steps actually
makes the whole system worse, more
brittle, and more expensive, frankly.
So, for these steps, why would you throw
an agent at that problem? Right? The
real advantage that Stripe has
completely identified here with
blueprints is the fact that agents plus
code beats agents alone and agents plus
code beats code alone. That's the big
idea here. So, Alistar goes on to break
this concept down here. You have the
agent call here implement the task fix
the CI failures whatever but you also
have the actual nodes run configuration
lenders push changes which are fully
deterministic okay they don't invoke an
LM at all they just run code so imagine
you know some toptobottom process where
you have agent running and then you have
code running and then you have agent
running and then you have code running
right so on and so forth this is what
you want to build right it's this it's
the combination of both the agent and
your code okay because not everything
needs an agent and not Everything needs
code. Okay, very very powerful idea
here. Another advantage of creating
these blueprints of combining code plus
agents is that their blueprint machinery
makes contact engineering with sub
agents easy. Why is that? It's because
they're operating at a specific step.
And so at that step, you might constrain
the tools, you might constrain the
system prompt, right? Or you might
modify the conversation required by the
subtask at hand. Okay? And again, we're
hitting on this idea of specialization.
There are specific steps in your
engineering, in your product, in your
tool that you've uniquely implemented.
Okay? And so when you can break that
down into determinism or in a gentic
process step by step, this allows you to
specialize, right? And so, you know,
once again, what are we doing? We're
back at foundational engineering. If
you're trying to tackle a big problem,
chunk it up into small pieces. every big
problem is just a you know a few small
problems put together and then chunk
those problems into types and then give
it to code or give it to agents. Okay,
that's what their blueprint system is
effectively doing. To me, this is the
highest leverage point. This is what
makes their agentic layer, their agentic
system so powerful. It's the combination
of code and agents inside of a
repeatable format for success. Okay?
Because guess what they can do? They can
now deploy meta aentics. they can
effectively create an agent that builds
their blueprint just in the right way
and then they can validate it, right?
They I wouldn't be surprised if they had
a blueprint for creating blueprints. All
right. Anyway, let's move into context.
So, they use the rule files setup that
you know is much like claude.md or
agents.md due to the size of the
repository they can't have unconditional
job rules. So, they need a specific
solution to do this. They're using a
standardized rule format much like
cursors. All right. So this is a rule
format that looks like this. So you have
your primary directory whatever tool
you're using you know tries to claim
that name and then you have / rules and
then you have some markdown files right
but the interesting part is that you
have a markdown file with some front
matter. All right, front matter is going
to be you know MDC files are like the
most popular file format and for good
reason right so they have these rules
here where you can specify the glob
pattern in which to activate this
context or you know a specific subset of
this context and then they have rule
anatomy you can imply intelligently or
you can apply only when specific files
are being accessed. All right. And so
this gives you more control over the
context that's loaded as you're
accessing different directories
throughout your codebase. Okay. And so
this is the structure that Stripe
Minions use, right? And the big line is
right here. We almost exclusively give
minions context from files that are
scoped to specific subdirectories or
patterns automatically attached as the
agent traverses the file system. And
they're using the, you know, kind of
cursor rules to do that. And so they've
combined it with a format from cloud
code. Once again here you can see that
they're building customized agentic
solutions that best solves the problems
they're facing. Okay and they're
combining the best for the industry. I'm
not saying that you know cursor agents
or claw code agents or how they do
things is wrong. That's not the point.
There are many ways to do things. The
question is what's the best way for you
and how do you get the most leverage out
of what's available? We can see stripe
engineers doing exactly that. Last
important idea to mention here is
Stripes gathering MCPs. Right. So what
are and and how does Stripe put together
the tools? So as we all know tools are
an essential element of the core for
context model prompt tools. Tools is
what created agentic coding, right? It's
the only reason that any of this is
possible because our agents can now use
tools to take actions as we can. So how
does Stripe handle their 500 MCP tools?
Won't this immediately cause a token
explosion? Absolutely right. It totally
would. What they've done here is they've
built a tool shed. They built a
centralized internal MCP server called a
tool shed which makes it easy for Stripe
engineers to make new tools and they're
automatically discoverable in their
agentic systems. Very very powerful
stuff here. Okay. All very agentic
systems are able to use the tool shed. I
want to be super clear about this. We're
talking about meta agentics. This is
something that keeps coming up over and
over. You build prompts that create
prompts. You make agents that build
agents. You have skills that build
skills. You have tools that allow you to
select tools. Okay. The tool shed is a
tool that unlocks tools for their
agents. Okay, so these are called
metaagentics and they're a powerful way
to solve the class of problems, right?
To to solve repeat problems in the space
of agents. And you know, to be clear,
this is not new at all, right? OG
engineers watching, you've heard of like
things like meta programming, right?
Passing functions into functions. This
is not a new phenomenon, but what is new
and what's really important for you and
I to focus on when we're building out
these powerful agentic layers is to
think about when we need to build the
thing that builds the thing, right? So,
Stripe uses a tool shed to create and
connect to over 500 or nearly 500 MCP
tools. Okay? Very, very powerful. And
you can imagine they have all types of
internal and external services that they
want to connect to. And the tool shed
lets them do that. This was completely
net new to me. I had not seen a concept
like this before. I think this is really
cool. A tool shed centralized location
to load specific tools. So, you know,
big shout out to the team for uh for
building something like this. And then
lastly, you know, one of the big ideas
they talk about and that's just super
critical for engineering. Like this is
just great engineering. You just
iterate, right? All this stuff is so
new. All this stuff is moving so
quickly. You and I strip engineers.
Doesn't really matter who you are. It's
not about what you can do anymore. It's
about what you can teach your agents to
do for you. Okay? This is a big idea.
It's one of the central thesis we talk
about in tactical agentic coding in
addition to building agentic layers like
handing off work and thinking about your
agents as tools that you're templating
into and templating your engineering
into. That's the name of the game,
right? Teach your agents how to build
like you would so you can scale them to
the moon. All right, so what else do we
have here? A lot of really great ideas.
I'm curious what you think if you've
operated in code bases with more than
10,000 files. Comment down below what
would you rank Stripe's agentic layer
based on everything we've gone through
here and you know our highle
understanding of their system right they
have multiple CI entry points they have
EC2 agent sandboxes that mirror
developer environments they have their
own custom agent harness they have a
customizable blueprint engine that lets
them combine code and agents together to
outperform either they have rules file
for context engineering they have tool
shed for selecting one of 500 tools or
many of 500 tools tools. They of course
have CI for self validation and they
have GitHub PRs to review the work their
agents have done on their dedicated
agent sandboxes. All right, so rank
this. I'm super curious what you think.
Rank Stripes agentic layer out of 10.
I'm going to go ahead and give them and
and you know again if you've worked on
code bases that are larger than 10,000
files, no offense, guys, but I don't
want to hear a vibe coders opinion on
Stripe's endto-end system. But for mid
to senior level plus engineers, I'd love
to hear what you think. I'm going to
give Stripe an eight out of 10. Okay, so
very very very powerful agent layer. And
let me be super clear here. I have no
ego in this. Let me say it this way. I
cannot solve Stripe's programmable
financial infrastructure problems better
than any one of their engineers on their
team could. They own that problem in
this problem space. So that's not what
I'm saying at all. They are the experts
there for sure. My expertise is in
agentic engineering. It's in building
agentic layers. And so I only have two
notes of of feedback for them here that
I would pitch to them as potential
improvements. The first thing is this.
you know, they they identify this right
away. Why only two rounds of feedback in
their CI for their agents? Okay. And so
they say, you know, speed, completeness,
cost, time, compute, blah blah blah.
These are fair constraints and reasons
to only run two rounds. But I think this
is a mistake, frankly. Think about
yourself as an engineer. Has anyone ever
said to you, "Solve this problem. You
have two attempts."
All right? You just have two shots at
this. Uh, no. No one said that. Right?
It often takes us tens and hundreds of
times to get something right. So, I
think limiting their minions to just two
shots is potentially going to cost them
more developer time and also increase
the gap between the next learning of how
to improve their agentic system by
letting their agents run more, right?
Like, I think the learnings you get from
running five rounds of your agent is
going to be a lot more informative than
running just two. All right, but I could
be totally wrong. Again, they know their
system better than we do. All right, but
that's my first note. And my last note
here is in the language of their
minions. So, you know, they call these
end to-end agents, but you might have
noticed they have a prompt step and they
have a review step. Okay, that's two
steps. End to end is this, right? And
you take out the review, right? It's
prompt to production, P2P. Okay? And
this is something we've talked about
inside of Tactical Agentic Coding. This
is the northstar for all agentic
engineers. This is an idea, a concept
called ZTE, zero touch engineering,
prompt to production. No review, no
human in the loop. I want to be a little
critical about their language here. I
know that this is industry standard and
of course, again, of course, they're
operating on a scale most of us
engineers will never get to, but that's
what I would push Stripe to think about
next. What are the lowlevel simple
tasks? maybe some lower risk tasks,
developer tools stuff, you know, some
non-userfacing stuff and even some
userfacing stuff that they could ship
actually end to end. And the value isn't
in doing it. It's in answering the
question, what would it take for you to
run a prompt and trust that your agentic
system can deliver this to production
without human oversight, right? The
value is in the journey of the question.
So, that's that's another area where I
would just like really try to push the
Stripe engineers to that next next
level. Um, I made a prediction on this
at the end of last year in our 2026 top
2% engineering video. I think in 2026
we're going to see a blog post very
similar to this where an engineer
operating at serious scale, we're
talking tens of millions in revenue. I
predict we're going to see a blog post
where they break down their agentic
layer and talk about how they ship from
prompt to production with ZTE zero touch
engineering. So those are the only two
notes I have. Again, you know, I'm not
trying to
Stripe has some of the most cracked
engineers on the planet. This is just a
note on the agentic system and not a
note on any of their true core domain
problem because again, if you operate a
specific domain for years and years, no
one knows how to solve it better than
you do. All right, so those are my two
notes. Big shout out to the Strap
Engineering team and you know, Alistar
Gray for writing this up. This is a
great post. This really caught my eye
and I thought it would be valuable to
share with you here because it really
emphasizes that point that building a
powerful agentic layer really comes down
to owning all the pieces bottom to top.
Now there is a point in which you want
to start owning your agentic technology,
right? And again, if you're like
creating a brand new net new product,
you probably don't need to do that for a
while. You just don't have the scale for
it out of the box. It's going to work
for you for a while. But then there's
going to be a point where you're going
to need a specific solution, right? A
customized solution to solve a specific
problem. And you want to boil that all
the way down just like your application
is a is a, you know, a detailed edge
case covering solution. Your agent
should reflect that too. That's why we
covered the PI coding agent. There are
many, but this one is mine. And the
whole idea here that I want to, you
know, connect with you on is that
specialization goes all the way up the
chain, all the way into the agent
harness, all the way to your stack of
technology that you operate. So anyway,
big shout out to Stripe Engineers. This
was really fun. I like blogs like this.
You know, frankly, I'm getting a bit
tired of everyone hyperfixating on
models and prompts and skills. Like
let's let's uplevel this and talk about
the systems that have agents inside of
them that contain agents and that
contain code and that contain, you know,
modern engineering technology that puts
it all together to generate real value
for you, your team, your company, and
ultimately your users and customers,
right? Because that's where the value
really is. That's what makes all this
stuff actually matter at all. All right?
If you're still watching, first off, you
know, big thanks to you. I hope these
ideas make sense. You really want to be
thinking about the agentic layer as a
whole, not just your coding tool, not
just the models. Let's let's ease up on
the obsession on these, you know, models
and who's winning and what genera
company is more just let's focus on
solving problems by building agentic
layers with the key pieces. All right?
And Stripe has outlined a lot of them,
right? Like every agentic layer, every
product is going to run into the
problems that each one of these nodes is
a solution to. So let's pay attention to
them, right? Let's think about how these
are pieces to the puzzle of building at
scale with agents. All right? And this
is just one interpretation. Uh no one
has all the answers right now. But it's
about collecting the right context to
solving the problem of agentic
engineering. Right? And and pushing what
you can do further beyond before the
industry before the mainstream catches
up. All right. Everything we do in
engineering represents an asymmetry of
information and then technology and then
results with your product, with your
tool, with your team, so on and so
forth. All right? So, you want to be
pushing forward on this stuff. Don't let
up the gas. Stay focused on valuable
information like this blog and, you
know, me being biased, but like this
channel. I really try to focus in on
concrete signal in the industry, not
hype, not slop. There's going to be a
lot of both of those as we move week
after week. But I want this to be a
place where you, the engineer, can come
to focus and get some serious insight on
how you can continue to win in the age
of agents. If you made it to the end and
you like this content, definitely feel
