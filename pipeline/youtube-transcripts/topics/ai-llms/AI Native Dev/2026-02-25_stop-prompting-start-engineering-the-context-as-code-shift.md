---
video_id: "TlC7jq4ooSM"
title: "Stop Prompting, Start Engineering: The "Context as Code" Shift"
channel: "AI Native Dev"
topic: "ai-llms"
published_date: "2026-02-25"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=TlC7jq4ooSM"
duration: 1775
word_count: 5855
---
We have effectively had general purpose
agentic development machines for 50
years. We just called them software
engineers. You never just wrote somebody
a Slack message and expected them to go
build an entire system and just like
make all the best decisions, right?
[music]
[applause]
Uh well, nice to meet everybody. My name
is Drew Knox. I'm the head of product
and design here at Tessle. Uh I'm going
to talk today about uh using skills as
like in a more professional rigorous
like software engineering mindset,
right? So before I get into this, why
should you trust me? Uh well one maybe
don't maybe uh be skeptical but uh in my
past life before leading product and
design here at Tessle uh I was a
research scientist leading the language
modeling teams at Grammarly and at a
startup that sadly has not found success
yet called Cantina. It's a social
network AI first. Um and I've done a lot
of work on developer tools and so I do a
lot of moonlighting actually writing
code. uh probably none of it as good as
the actual people on Tesla's teams. So,
[snorts] I've thought a lot about this.
I've done a lot of work on this. I'd
like to share some insights. Uh would
love questions. Would love to hear folks
like your experience, what's worked for
you. So, I'll try to save lots of time
for questions at the end. But without
further ado, you want to work on skills.
Maybe more broadly, you want to work on
context for your agents. So, I'm sure
folks have heard about context
engineering. It feels like every year
we're told that this is the year of
something. I've heard people say that
this is the year of context engineering.
Maybe it is, maybe it isn't. You want to
get into context engineering. Some of
you may have already gotten into context
engineering. As you start to work on
this, you'll probably go through the
same sort of stages of denial,
acceptance, etc. of this is amazing. I'm
getting good results to suddenly, God,
how does any of this work? Is any of
this impactful?
I thought I was an engineer. Now I feel
like I'm an artist or a librarian. uh
how do I turn this thing agents context
engineering back into the kind of
reliable predictable engineering that I
that I know and love. So how do we go
about doing that? I think the first
thing to realize uh just in case anyone
has not sort of conceptualized this the
reason we're all doing context
engineering now is because we've all
effectively become tech leads instead of
IC's right like the job in some sense is
no longer writing good code it's
ensuring that good code can be written
uh which is things that tech leads know
and love or hate already around uh you
want to be maintaining good standards
making good decisions documenting it
providing the context to the rest of
your team, setting a good quality bar
for other engineers to contribute. We're
doing that. We're just doing that for
agents now. And so what that means is
that context is in some sense our new
code. Some people might hate that I say
that. So please take it with a grain of
salt. It's a metaphor. Uh if context is
our new code though, there's things that
we expect of our code, right? We want a
way to know, are my programs correct?
are they performant? Uh how do I reuse
programs? How do I automate repetitive
tasks that are annoying? Uh and so we've
we've come to expect a lot of answers
here for code like actual code that we
write.
I won't belabor the point, but we have
all these things, right? Unit tests,
integration tests, we have analytics and
observability, all these things that
give us really good insight into how our
programs function. And the core thing
that I want to argue today is that all
of these have an analog in the world of
context engineering. And if you are sort
of diligent about uh finding a tool set
that does this, I'm going to show you
all Tessle just to illustrate the
concepts, but you don't have to use
Tessle to do any of this. These are
general concepts and patterns. Uh you
can reclaim a lot of that
predictability, a lot of that uh sort of
rigor that you've come to expect with
with code. So, how can we take all these
concepts and apply them to context?
That's the sort of TLDDR.
Before we get started, there's three
challenges that make it not a direct
comparison, right? I'm also, as I look
at this, just realizing the image that
was generated here made a fuzzy correct
symbol. Uh, I was looking at it through
a fuzzy uh display. So, I'm now
appreciating my own my own slide a bit
better. Uh, so we have three problems.
The first is that LMS are
non-deterministic, right? You can't just
run them once and say, "Oh, it worked."
Or, "Oh, it didn't work." Before I now
know my context is good, right? If you
tell an agent to do a thing, sometimes
it will, sometimes it won't. I'm sure
have felt this pain many times. Uh, the
second is that a lot of times when you
create context,
there's not one right or wrong answer,
right? If you write a style guide or if
you write a uh documentation for a
library, how do you determine that an
agent's solution did it correctly?
Right? You can't just write a unit test
and say, "Ah, we're done." Like it, you
know, it worked. So, grading output can
be a little challenging.
Uh, and finally, there's this new
problem that your programs are now
actually things that describe other
things. So, you have things in sync. So
you might update your API, you need to
update documentation to match it or you
might change a company flow in one place
and to make sure that it gets
distributed outwhere
across your organization. So sort of a
new problem uh falls into a lot of
similar automation goals that you might
might have.
So this is like a quick overview slide.
I'm going to dive into each of these. Uh
what is the analogy? And maybe I'm
trying to get a little too cute with
this, but I actually do think there is a
direct analogy for all of the uh tools
that you've come to expect in software
development life cycle. Uh so I'll
quickly run through them. The first is
that uh we have things like static
analysis in in codeland that is going to
look a little bit more like an LLM as
judge but the same idea of you want to
have a fixed set of best practices of
rules of validation of compiling all
those things you should be able to run
against your context. To give an example
of something we saw recently from a
customer using Tessle, they had added an
at sign into one of their files and
didn't realize that that was suddenly
triggering the import mechanisms for
most like agents.mmd and it was just
breaking a whole host of their context
without even realizing it. So it seems
silly but static validation still
important with your context, right? So
you want to have that set up. You want
to have linting, you want to have CI/CD
for it. uh unit tests are going to look
probably the most different now instead
of defining a a unit test that runs.
You're going to want to think through
scenarios that sort of stress test the
agent. Does it do what you want? And
then run it many times in parallel and
you're going to take statistical
averages. And so you want to see when I
add context, does it actually improve
the sort of average performance of
something? We'll get into that. That's
probably the hardest one. That's the one
where it feels a little different. It's
not going to be quite the same, but you
can still get pretty reliable like what
I did has improved. Uh integration
tests, same thing, but testing lots of
context at once. So, you're designing
scenarios that map to uh using different
kinds of context together. Uh and then
we'll get into some of the more esoteric
things that Tesla doesn't even fully
support yet, but we sort of see on our
road map and we think everybody should
be thinking about it. Uh analytics. So
how can you start actually measuring uh
agent sessions in the wild to see what's
happening? Do we have missing context?
Are things being used correctly etc. Uh
and then also getting into uh automation
like build scripts. How do you make it
so that your context is not this static
thing that grows out of date and dies
but as you update things you're getting
follow-up PRs that auto update your
context. Uh and then package manager
reuse. This has actually kind of in the
last two three weeks sort of blown up
everywhere. Things like skillsh things
like uh Tessle's context registry the
idea of like reusable units of context
is sort of come onto the scene. So I'll
talk a little bit about unique problems
with how you pick what sort of context
manager you're going to use or package
manager. I guess both work. Um okay so
review formatting and best practices.
Like I said, I'm going to use Tesla as
an example here, but I'll try to explain
all of this in a very basic like you
could build all this yourself if you
wanted. There's other tools that do a
lot of this. Uh not as well as Tessle
though, obviously. Um so this is pretty
easy. If you look at things like uh the
skills standard, so I'm going to use
skills as an example here. If you look
at the skills standard, there first of
all is a bunch of just static formatting
you can do. I believe they have a
reference CLI implementation that will
just verify your skill compiles. I I
think everybody who's writing skills
should have that in CI/CD checking that
all of your skills are kept up to date.
Like anytime a skill file changes, you
should be checking validation. You would
be stunned how many people like none of
their context is loading and they don't
even realize it. Uh so that's a big one.
But also if you look at anthropic they
have a best practices guide and it's
basically a list of things like uh so
here I have validation tesla will tell
you if your things compile uh we also
will take just anthropics best practices
uh and we just run that through lm as
judge there's a little bit more you can
do to tune the prompt to get better
results but honestly just put a prompt
that has anthropics best practices in in
it is a great starting point and get uh
information on how specific is your code
or your context, how like does it have a
good concrete case for when it should be
used. I'm sure folks have heard about
skills and how they don't activate very
often. There are concrete things you can
do without even running the skill to
know how likely is it to trigger. So,
these things are cheap, they're quick,
you can put them in CI/CD. Uh, and it's
a real it's a surprisingly large lift to
actually making your context useful to
you. uh recommend like this is just kind
of like table stakes. Everybody should
have this just like everybody should
have a format or a llinter or things
like that.
Uh bonus points, you can feed the output
of this back into an agent and ask it to
fix it. It's a pretty nice quick loop.
Uh okay, now slightly more complicated,
slightly more of like a net new concept,
right? So how do you write evals for
your context? So depending on if you're
coming from more of a software
background or more of like an ML deep
learning background, this might either
be obvious or not so obvious. Um, but
the simple thing that you can do is uh
or sorry actually before I get into
this, the thing you're trying to answer
is is my context actually helping and
how well is the agent doing at the task
that I am trying to achieve. So if I use
this as an example, right, we have some
library that we want the agent to use
and we can see how does it perform
without any context, right? We see
things like it is not good at using the
list function, right? Maybe it
implements it itself, maybe it uses a
different uh library or something like
that. Uh it's also bad at async
handling, but it's pretty good at
correct stream combination. It's pretty
good at doing zip files. I'll explain
how we measure this in a minute. You
want to understand this so that you can
then understand where do I need to apply
context to fix the problem. So there's a
couple things you might get from a view
like this. The first is you might have
written a bunch of context only to
realize agent did fine without it. Like
why are you wasting tokens on it? Uh or
you might actually write something and
realize it made performance worse
because something's gone out of date or
it's just added tokens for no reason. Um
in an ideal world you see like ah it
works better with it and I've only
applied tokens where it matters. So you
want to be able to answer questions like
that. Uh I have here on the right side
you'll notice that we have like a file
viewer here.
All you have to do to get this set up is
write some prompts, right? Like write
some realistic tasks that you want the
agent to do that requires usage of the
context that you've created and then
write a little scoring rubric for what a
good solution to that problem looks
like. The reason I say write a good
scoring rubric and not something like
write a bunch of unit tests uh is
twofold. The first is that uh unit tests
are really obnoxious to write and they
take a long time and you will quickly
find that you just don't do it if you
have to create example projects and test
suites for every single piece of context
that you want to verify.
More importantly though, I'm sure many
of you have seen that agents do
unspeakable things to get unit tests to
pass. Uh and so functional correctness
is not the only thing that you're
measuring, especially for context. A lot
of times you want to know was idiomatic
code written or did it use the library I
actually wanted it to use instead of
implementing its own solution and
there's really no way to measure this
with unit tests. It's much better to do
more agentic review or LMS judge. Uh so
what you're going to want to do uh I see
somebody taking a photo so I'll let them
take the photo. Uh what you want to do
is define we put them in markdown files
so Tesla will generate these and give
them to you. you could write them
yourself. Uh, you want to have a prompt
that runs through like build this thing.
Here are the requirements. It should
require using the context or at least
should require doing what the context
says, right? Because you actually want
to measure it with and without context
to see if the agent is just smart enough
to do it on its own.
And then importantly, you want to define
some kind of grading rubric. So here,
this is if you were to specify it for
Tessle, you'll say, what does a good
solution look like? And you want to be
pretty specific here so that you get
reliable results from an LM. So you'll
say things like the solution should use
this exact API call somewhere in the in
the method or it should implement or it
should initialize this before it
initializes that right like very
granular things that can then be checked
at the end of the solution to see was
good code written. And an important
thing to note is that once you have
these in place like this can take a bit
of upfront work. It's sort of like the
new source files that you have to care
about as an agentic developer. But say
you get about five of these per piece of
context. That's what we found is like a
pretty reliable measure. Once you have
some of these, then you can kind of reap
the benefits of it forever. Just like
unit tests, right? You can just every
time you make a change, you rerun these.
You see if it helped, if it hurt. One
[snorts] thing that's different is
oftentimes you'll rerun these without
changing the context because there is
something else that's changing which is
the agent and the model. And so a lot of
times you'll rerun. What we have found
is oftentimes you can start stripping
out your context as agents get better,
right? Like we had style guides for
Python. Claude Opus 46 writes a pretty
damn good Python. It doesn't need a
style guide anymore. Your eval can tell
you that and help you delete context
that you don't no longer need. Save
money. Don't pay the tokens. Every once
in a while there will be a regression.
There was I think it was Gemini a recent
Gemini was like kind of a smartass and
thought it didn't need to use tools and
read context and then we realized oh
we've had a regression we need to go
beef up how much we tell the agent to
use the context.
Okay, so repo eval I talked about
integration tests. I won't go too deep
into this because it's basically the
same thing, but you don't want to just
test your context in isolation. That can
help you like debug. Are you saying the
right things? Have you has your context
grown out of date? You also want to
measure realistic scenarios in your full
coding environment. All your context
installed. Uh I was just watching a talk
earlier today that described the dumb
zone which is where you've gotten too
much context in your context window uh
because of tools because of context
because of all these things where agents
just like persistently bad. So you want
to have a few coding scenarios again
like five for your repo is a fine place
to start that just represent an average
development task. And again same like a
rubric to grade the output and just run
it every once in a while. see if your
tech debt has gotten to a point where
agents don't understand how to work in
your code. Have you installed too much
context? Have you installed too many
tools? All of that. Um, this is
something that Tesla is building as
well. One thing we found that works
pretty well is like scan your previous
commits and turn some of those into
tasks. And you can even have like on a
regular cadence pick like five random
commits over the last month and just
refresh your eval suite. Uh for folks
who are in the ML environment, you'll
have things like input drift where you
want to update your tasks every once in
a while. Don't worry about it if that is
like seems like too much effort. Just
start with something and you can improve
it over time. Uh but yeah, that's a you
same idea, task scenarios, grading
rubrics, run them every once in a while,
make sure you haven't degraded things.
Okay, so this one I think is pretty
cool, but is also kind of scary, which
is you want something like analytics and
observability, right? You've written
this context, you've validated the
change before you've pushed it out to
the repo for everyone. Uh we do that in
software, but then we also still have
crash logs, we have metrics, we have
usability funnels, things like that.
This actually does exist for agents.
Just a lot of people aren't paying
attention to it. All of the agents store
all of their chat logs in files in
accessible places. And so you can write
your own scripts if you'd like. Tessle
has capability to gather these uh optin
of course because obviously it's very
sensitive information. Um you can review
those transcripts to see things like
were tools called or how often was this
piece of context used? How often does
this pattern get actually man like
actually manifest in the code? like how
often does it import a library right in
the middle of a function? And so there's
a lot of rich information here that you
could just write a quick script, ask
everyone in your team to run it once and
just aggregate a bunch of logs and just
review like common problems that you uh
might want to make new context for.
Great one is anytime the agent
apologizes. So you can just look for the
word sorry, look for the words you're
absolutely right. All of these things
are good like oh maybe we should write
something to fix that. There's a wealth
of information and I guarantee you've
got like three or four months of cursor
logs sitting on all your devs team uh
dev's machines that you could mine for
like what should we be doing different.
Uh this is my warning. I've shifted the
color because the next screen is in
light mode. It's a GitHub page. So
please prepare your eyes. Uh how do you
keep your context up to date? Uh it see
I I really tried to hit the midpoint
between black and white. So sorry. Um
there is again you can do something
pretty simple here where you can just
set up uh there's all kinds of agentic
code review tools there's cloud code web
but I think a general thing to set up in
your CI/CD if you have created context
is anytime a PR comes up have something
scan that PR and then look and say is
there any markdown file here that should
be updated right so it's not that hard
like it really works better than you'd
think it seems like a really complicated
task But because PRs tend to be so
focused, uh, agents are pretty good at
finding out where they should update. If
your PRs are too big, maybe it's a good
sign to make your PR smaller. Uh, again,
very simple. So like Tessle can automate
a lot of this where it says, "Oh, added
a new case to your logging levels here.
Update your documentation as well." This
one is probably the most important
because as your context gets out of
date, it just destroys agent
performance. So if you're going to write
context, you have to have a solution for
keeping it up to date.
agents are pretty good at doing this.
So, you don't have to do it by hand.
Don't do it by hand because you won't do
it. Uh, okay. Last thing, package
managers. I mentioned that this one's
kind of normal. You need a package
manager if you want to reuse context,
right? Like a code review skill, a uh
documentation on how to use React, best
practices, etc. So, I won't belabor this
point. Uh, there's lots of good options
out there. where skills sh is probably
the most popular though it pains me to
say that Tesla has a package manager as
well. It's not the most popular. I think
it's the best. Um I won't pitch you on
why it's the best, but it's the best. Uh
the important thing though I'm showing
here Tesla's package manager. Look, we
give you evals. We give you all this
useful information. Uh two things that
are different that you should just think
about when figuring out how to use
context. The first is that uh unlike
other package managers, a lot of context
that you're going to install is going to
be describing other package managers.
Right? So I have an example here where I
have documentation on a library that's
part of pi. Uh and it describes a
particular package at a particular
version. Uh and these are sort of like a
net new maybe not entirely new but a
it's a weird concept. And so you just
want to think about what is your
strategy for matching. If you have
documentation on a library, how do you
make sure that as you update your
library, you keep documentation
keyed to the same version, right? You
don't want to say I'm using context 7 on
the latest of React, but actually you're
pinned to like React 17 or something for
some reason. So there's lots you can do
here. You can just write again something
yourself. Like a lot of this is not
necessarily hard to do. It's just fiddly
to keep updated and keep sort of pace
with the the rate of agent change. But
think about how do you keep your context
in sync with dependencies in sync with
tools or APIs that you're using because
it's a new source of drift that you
might have to care about.
So that's it. That's my my walkthrough.
I'm happy to answer questions now or
afterwards. I think I have a few minutes
so I will turn it to questions now. I
should have had a question slide but
instead you're going to look at this.
&gt;&gt; That's all right. Uh thank you very
much.
Uh yeah, we have a few minutes for for
questions. Uh please wait for the mic if
you have a question. If you do have an
excellent question, then we have some
merch that uh Sam is modeling over
there. Either a bag or a fidget spinner
or a hat. Drew takes questions on
Tessle, but also Fast and the Furious
and improv comedy. Um first, this is
true. First question.
&gt;&gt; Thanks. Hi. Great um presentation. So
what do you see as the end state like in
12 months or even six months if you know
like claude 4.6 six is just really good
and codeex you know 5.3 and then when
you know codeex 6 comes out and claude 5
comes in Gemini 4 I mean do we need a
lot of the scaffolding or does it go
away
fantastic question I would say first
it's going to split a lot by whether or
not you're a green field or brownfield
like if you've built an app from the
ground up for agents it's going to be a
lot easier than if you're doing like an
enterprise Java app uh so that's one I
think the number number of things you
need context for will go down. So the
example I gave, Python style guide was
like all the rage six months ago. Nobody
needs it now. But describing your custom
internal logging solution, you're always
going to have to document that because
like an agent doesn't have access to it,
right? It's not in its training weights.
So there's some amount of knowledge
that'll always need to be told to the
agent.
My expectation is that eventually you
won't be proactively jamming almost any
context into an agent's window. You'll
have some kind of signposting like
progressive disclosure. The agent will
get to look at it if it deems it
necessary like a normal developer will.
And then a lot of your usage of context
will be applied at review time. So you
will create a review agent that looks
for things like did it break our style
guide? Did it reimplement something? And
it'll just be there for control. it
won't be there to sort of like educate
the agent up front. I think eval are
going to play a big part in helping you
navigate that change, right? Knowing
when it's time to move things out of the
context window into a review or just
delete it.
&gt;&gt; Yeah.
&gt;&gt; Awesome. Thank you. Next question over
here.
&gt;&gt; Uh, hi. I wanted to ask about evals. You
had max score 50 and 30. From my
experience, non-binary score doesn't
really work. Could you tell how it works
and for what agents does it work?
&gt;&gt; Uh, no. I think that's right. I think
binary is pretty much the only like we
give granularity in Tesla if you want to
do more but if you look agents pretty
much always score zero or max score. Uh
so I would say no you could get away
with zero or one and it' be about the
same.
&gt;&gt; So uh I'm an AI engineer so I want to
build solutions really fast. Would you
recommend just using OOS 4.6 to get out
an eval set very quickly and then just
use that as a baseline which is not
perfect but just have that as a starting
point or would you recommend no do a
full thorough analysis get a baseline
and then continue?
&gt;&gt; Uh so let me make sure I got that right
but like should you try really hard to
optimize what agent you're using and the
exact Yeah. Uh, personally, I'm busy. I
have a lot to do. Just start with the
best agent and then I think what I'd say
more is once you have some really
repetitive tasks, it can be worth it to
say, okay, what is like the best the
cheapest I can get away with, a lot of
times context will help you use smaller
models to do that. Um, but no, I would
say for day-to-day like your general
driver, just always crank it to the max
unless you have some reason you can't do
that. Nice one. Uh I think this might
have to be the final question because we
have another talk.
&gt;&gt; Yeah. Um my question is more towards
probably like the non-technical or
people that are not too technical. Um
&gt;&gt; when do when do you think or uh what
barometer do you think we can use to
measure uh the point in time where we
don't really need to have too
into what the agents do or what the LLMs
do? for example like um uh like you guys
have what spec driven design or acting
as like a product manager so we say you
write [clears throat] PD but you don't
have too much
&gt;&gt; um input or
now or
&gt;&gt; are we going to be at that soon?
&gt;&gt; Uh I'm going to throw out maybe a spicy
take which is that definitely we're not
there and I don't think we'll ever be
there. Uh what I mean by that is we have
effectively had generalpurpose agentic
development machines for 50 years. We
just called them software engineers. Uh
and in that case you never just wrote
somebody a slack message and expected
them to go build an entire system
completely unsupervised and just like
make all the best decisions, right?
Another way of putting this, my wife who
is like a very senior staff engineer at
Meta is like if you cloned me, I would
still code review my code, right? like I
would never accept anyone to submit
things without looking at it. So
personally I think there will always be
a place for a technical
architect, a steward, somebody who's
guiding the sort of quality of the
codebase. I think what that role is will
change over time. So right now it's a
lot of like in the weeds, very specific
decisions. It's a lot of like reviewing
code. It's mentoring and coaching people
up. And you tend to have like one PM to
5 to 10 engineers, right? I imagine
we'll get to a place where you invert
that ratio and you have one sort of like
technical steward whose job is to think
about the overall system design to be
constantly reviewing agent code to be
reviewing things that people are
building and understanding like oh this
is a consistent failure point. If we
abstract this part out, if we build a
component that agents can use, they'll
more reliably get better like oneshot
success. And then you have like five to
10 more like producty design, product
engineering people who are out sort of
exploring the frontier of your product
space and then have this one technical
steward helping them land their code and
keep things maintainable and improve
like improving them over time. Uh when
will we get to that point? That part I'm
less certain of. like it could be in 2
weeks, it could be in two years. I think
it's probably in the order of like
singledigit years certainly. Um I
wouldn't be surprised if it was like a
completely AI native green field project
starting within the next year could work
in that model. Uh but certainly for
Brownfield I think it'll be harder.
[music]
