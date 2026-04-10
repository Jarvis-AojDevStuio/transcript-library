---
video_id: "We7BZVKbCVw"
title: "Head of Claude Code: What happens after coding is solved | Boris Cherny"
channel: "Lenny's Podcast"
topic: "ai-llms"
published_date: "2026-02-19"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=We7BZVKbCVw"
duration: 5265
word_count: 3997
chunk: 2
total_chunks: 6
parent_video_id: "We7BZVKbCVw"
---
looking at the code. um unless it's like
pure prototype code that you know it's
not going to run it's not going to run
anywhere it's just a prototype.
&gt;&gt; What's kind of the next frontier? So at
this point 100% of your code is being
written by AI. This is clearly where
everyone is going in software
engineering. That felt like a crazy
milestone. Now it's just like of course
this is the world now. What's what's
kind of the next big shift to how
software is written that either your
team's already operating in or you think
will head towards? I think something
that's happening right now is Quad is
starting to come up with ideas. Um so
Quad is looking through feedback. It's
uh looking at bug reports. It's looking
at um you know like telemetry and and
things like this and it's starting to
come up with ideas for bug fixes and
things to ship. So it's just starting to
get a little more um you know like a
little more like a co-orker or something
like that. I think the second thing is
we're starting to branch out of coding a
little bit. So I think at this point
it's safe to say that coding is largely
solved. At least for the kind of
programming that I do, it's just a
solved problem because quad can do it.
And so now we're starting to think about
okay like what's next? What's beyond
this? There's a lot of things that are
kind of adjacent to coding. Um and I
think this is going to be coming. But
also just you know general tasks, you
know, like I use co-work every day now
to do all sorts of things that are just
not related to coding at all and just to
do it automatically. Like for example, I
had to pay a parking ticket the other
day. I just had co-work do it. um all of
my project management for the team uh
co-work does all of it. It's like
syncing stuff between spreadsheets and
messaging people on Slack and email and
all this kind of stuff. So I think the
frontier is something like this and I I
don't think it's coding because I think
coding is you know it's pretty much
solved and over the next few months I
think what we're going to see is just
across the industry it's going to become
increasingly solved you know for every
kind of codebase every tech stack that
people work on.
&gt;&gt; This idea of helping you come up with
what to work on is so interesting. A lot
of people listening to this are product
managers and they're probably sweating.
How do you use Claude for this? Do you
just talk to it? Is there anything
clever you've come up with to help you
use it to come up with what to build?
&gt;&gt; Honestly, the simplest thing is like
open quad code or co-work and point it
at a Slack thread. Um, you know, like
for us, we have this channel that that's
all the internal feedback about Quad
Code. Since we first released it, even
in like 2024 internally, it's just been
this fire hose of feedback. Um, and it's
the best. And like in the early days,
what I would do is anytime that someone
sends feedback, I would just go in and I
would fix every single thing as fast as
I possibly could. So like within a
minute, within 5 minutes or whatever.
And this just really fast feedback
cycle, it encourages people to give more
and more feedback. It's just so
important cuz it makes them feel heard
cuz you know like usually when you use a
product, you give feedback, it just goes
into a black hole somewhere and then you
don't give feedback again. So if you
make people feel heard, then they want
to contribute and they want to help make
the thing better. Um, and so now I kind
of do the same thing, but Quad honestly
does a lot of the work. So I pointed at
the channel and it's like, "Okay, here's
a few things that I can do. I just put
up a couple PRs. Want to take a look at
that one?" I'm like, "Yeah." Have you
noticed that it is getting much better
at this? Because this is kind of the
holy grail, right? Now it's like, "Cool,
building solved." Code review became
kind of the next bottleneck. All these
PRs, who's going to review them all? The
next big open question is just like,
okay, now we need to now now humans are
necessary for figuring out what to
build, what to prioritize. And you're
saying that that's where claude code is
starting to help you. Has it has it
gotten a lot better with like say Opus
46 or what's been the trajectory there?
&gt;&gt; Yeah. Yeah, it's improved a lot. Um I
think some of it is kind of like
training that we do specific to coding.
Um so you know obviously you know best
coding model in the world and you know
it's getting better and better like 4.6
is just incredible but also actually a
lot of the training that we do outside
of coding translates pretty well too. So
there is this kind of like transfer
where you teach the model to do you know
X and it kind of gets better at Y. Um
yeah and the the gains have just been
insane like at anthropic over the last
year like since we introduced quad code
we probably I don't know the exact
number we probably like 4x the
engineering team or something like this
but productivity per engineer has
increased 200%.
in terms of like pull requests and like
this number is just crazy for anyone
that actually works in the space and
works on deaf productivity because back
in a previous life I was at Meta and you
know one of my responsibilities was code
quality for the company. So this is like
the all of our code bases that was my
responsibility like Facebook, Instagram,
WhatsApp all this stuff. Um and a lot of
that was about productivity because if
you make the code higher quality then
engineers are more productive and things
that we saw is you know in a year with
hundreds of engineers working on it you
would see a gain of like a few
percentage points of productivity
something like this. Um and so nowadays
seeing these gains of just hundreds of
percentage points it's is just
absolutely insane. What's also insane is
just how normalized this has all been
like we hear these numbers like of
course AI is doing this to us. It's just
it's so unprecedented the amount of
change that is happening to software
development to building products to just
this the world of tech. It's just like
so easy to get used to it. But it's
important to recognize this is crazy.
This is something like I have to remind
myself once in a while. There's sort of
like a downside of this because the
model changes so well there's actually
like there's many kind of downsides that
that we could talk about but I think one
of them on a personal level is the model
changes so often that I sometimes get
stuck in this like old way of of
thinking about it and I even find that
like new people on the team or even new
grads that join do stuff in a more kind
of like AGI forward way than I do. So
like sometimes for example I I I had
this case like a couple months ago where
there was a memory leak and so like what
this is is you know like quad code the
memory usage is going up and at some
point it crashes. This is like a very
common kind of engineering problem that
you know every engineer has debugged a
thousand times and traditionally the way
that you do it is you take a heap
snapshot you put it into a special
debugger you kind of figure out what's
going on you know use these special
tools to see what's happening. Um, and I
was doing this and I was kind of like
looking through these traces and trying
to figure out what was going on. And the
engineer that was newer on the team just
uh had Quad Code do it and was like,
"Hey Quad, it seems like there's a leak.
Can you figure it out?" And so like Quad
Code did exactly the same thing that I
was doing. It it took the heap snapshot.
It wrote a little tool for itself so it
can kind of like analyze it itself. Um,
it was sort of like a just in time
program. Uh, and it found the issue and
put up a pull request faster than I
could. So it's it's something where like
for those of us that have been using the
model for a long time, you still have to
kind of transport yourself to the
current moment and not get stuck back in
an old model because it's not sonnet 3.5
anymore. The new models are just
completely completely different. Uh and
just this this mindset shift is is very
different. I hear you have these very
specific principles that you've codified
for your team that when people join you
you kind of walk them through them. I
believe one of them is what's better
than doing something having Claude do
it. And it feels like that's exactly
what you describe with this memory leak
is just like you almost forgot that
principle of like okay let me see if
Claude can solve this for me. There's
this uh there's this interesting thing
that happens also when you um when you
underfund everything a little bit uh
because then people are kind of forced
to clify and this is something that we
see. So you know for work where
sometimes we just put like one engineer
on a project and the way that they're
able to ship really quickly because they
want to ship quickly. This is like an
intrinsic motivation that comes from
within is just wanting to do a good job.
One if you have a good idea you just
really want to get it out there. No one
has to force you to do that. That comes
from you. Um and and so if you have
claude, you can just use that to
automate a lot of work. Uh and that
that's kind of what we see over and
over. So I think that's kind of like one
principle is underfunding things a
little bit. I think another principle is
just encouraging people to go faster. So
if you can do something today, you
should just do it today. And this is
something we we really really encourage
on the team. Early on it was really
important because it was just me and so
our only advantage was speed.
that's the only way that we could ship a
product that would compete in this very
crowded coding market. But nowadays,
it's still very much a principle we have
on the team. And if you want to go
faster, a really good way to do that is
to just have Claude do more stuff. Um,
so he it just very much encourages that.
This idea of underfunding, it's so
interesting because in general there's
this feeling like AI is going to allow
you to not have as many employees, not
have as many engineers. And so it's not
only you can be more productive. What
you're saying is that you will actually
do better if you underfund. It's not
just that AI can make you faster. It's
you will get more out of the AI tooling
if you have fewer people working on
something. Yeah. If you if you hire
great engineers, they'll figure out how
to do it. And uh especially if you
empower them to do it. This is something
I actually talk talk a lot about with uh
you know with like CTO's and kind of all
sorts of companies. My advice generally
is don't try to optimize. Don't don't
try to cost cut at the beginning. Start
by just giving engineers as many tokens
as possible. And now now you're starting
to see companies like you know at
Anthropic we have you know everyone can
use a lot of tokens. We're starting to
see this come up as like a perk at some
companies. Like if you join you get
unlimited tokens. This is a thing I very
much encourage because um it makes
people free to try these ideas that
would have been too crazy and then if
there's an idea that works then you can
figure out how to scale it and that's
the point to kind of optimize and to
cost cut figure out like you know maybe
you can do it with haiku or with sonnet
instead of opus or whatever but at the
beginning you just want to throw a lot
of tokens at it and see if the idea
works and give engineers the freedom to
do that. So the advice here is uh just
be be loose with your tokens with this
the cost on on using these models.
People hearing this may be like of
course he works at Anthropic. He wants
us to use as many tokens as possible.
But you're what you're saying here is
the the most interesting innovative
ideas will come out of someone just kind
of taking it to the max and seeing
what's possible.
&gt;&gt; Yeah. And I and I think the reality is
like at small scale like you know you're
not going to get like a giant bill or
anything like this. Like if it's an
individual engineer experimenting, it's
the token cost is still probably
relatively low relative to their salary
or you know other costs of running the
business. So it it's actually like not
not a huge cost as the thing scales up.
So like let's say you know they build
something awesome and then it takes a
huge amount of tokens and then the cost
becomes pretty big. That's the point at
which you want to optimize it. But don't
don't do that too early.
&gt;&gt; Have you seen companies where their uh
token cost is higher than their salary?
Is that a trend you think we're going to
find and see?
&gt;&gt; You know, at Anthropic, we're starting
to see some engineers that are spending,
you know, like hundreds of thousands a
month in in tokens. Um, so we're
starting to see this a little bit. Um,
there's some companies that are we're
starting to see similar things. Yeah.
&gt;&gt; Going back to coding, do you miss
writing code? Is this something you're
kind of sad about that this is no longer
a thing you will do as a software
engineer? It's funny for me, you know,
like when when I learned engineering,
for me it was very practical. I learned
engineering so I could build stuff
and for me I was I was selftaught, you
know, like I studied economics in
school, but um I didn't study CS, but I
I taught myself engineering kind of
early on. I was programming in like
middle school and from the very
beginning it was very practical. So I
actually like I learned to code so that
I can cheat on a math test. That was
like the first thing we had these like
graphing calculators and you know I just
programmed the answer into
&gt;&gt; TI83.
&gt;&gt; T83 plus. Yeah. Yeah. Exactly.
&gt;&gt; Plus. Yeah. So like I programmed the
answers in and then the next like math
test whatever like the next year that it
was just like too hard. Like I couldn't
program all the answers in because I
didn't know what the questions were. And
so I had to write like a little solver
so that it it was a program that would
just like solve these like uh you know
these al algebra questions or whatever.
And then I figured out you can get a
little cable, you can give the program
to the rest of the class and then the
whole class gets A's. But then we all
got caught and the teacher told us to
knock it off. But from the very
beginning it's it's always just been
very practical for me where programming
is a way to build a thing. It's not the
end in itself.
At some point I personally fell into the
rabbit hole of kind of like the the
beauty of of programming. Um so like I I
wrote a book about TypeScript. Um, I
started the actually at the time it was
the world's biggest uh, TypeScript
meetup just because I fell in love with
the language itself. Uh, and I kind of
got in deep into like functional
programming and and all this stuff. I
think a lot of coders they get
distracted by this. For me, it was
always sort of um they there is a beauty
to programming and especially to
functional programming. There's a beauty
to type systems. Um, there there's a
certain kind of like this like buzz that
you get like when you solve like a
really a really complicated uh math
problem. It's kind of similar when you
kind of balance the types or you know
the program is just like really
beautiful but it's really not the end of
it. Um I think for me coding is very
much a tool and it's a way to do things.
Uh that said not everyone feels this
way. So for example you know like
there's one engineer uh on the team Lena
who you know was still writing C++ on
the weekends by hand because you know
for her she just really enjoys writing
C++ by hand. And so everyone is
different and I think even as this field
changes, even as everything changes,
there's always space to do this, there's
always space to enjoy the art um and to
and and to kind of do do things by hand
uh if you want.
&gt;&gt; Do you worry about your skills atrophing
as an engineer? Is that something you
worry about or is it just like, you
know, this is just the way it's going to
go?
&gt;&gt; I think it's just the way that that it
happens. I I don't worry about it too
much personally. I think for me like
programming is on is on a continuum and
you know like way back in the day you
know like software actually is like
relatively new right like if you look at
the way programs are written today like
using software that's running on a
virtual machine or something this has
been the way that we've been writing
programs since probably the 1960s so you
know it's been you know like 60 years or
something like that. Before that it was
punch cards. Before that it was
switches. Before that it was hardware.
And before that it was just you know
like literally pen and paper. It was
like a room a room full of people that
were doing math on on paper. And so, you
know, programming has always changed in
this way. In some ways, you still want
to understand the layer under the layer
because it helps you be a better
engineer. And I think this will be the
case maybe for the next year or so. Um,
but I think pretty soon it just won't
really matter. It's just going to be
kind of like the the assembly code wring
running under the programmer or
something like this.
uh at an emotional level, you know, I I
feel like I've always had to learn new
things. And as a programmer, it's
actually not it doesn't feel that new
because there's always new frameworks,
there's always new languages. It's just
something that we're quite comfortable
with in the field. But at the same time,
I you know, this isn't true for
everyone. And I think for some people,
they're going to feel a greater sense
of, I don't know, maybe like loss or
nostalgia or atrophy or something like
this. I don't know if you saw this, but
Elon was saying that uh why isn't the AI
just writing binary straight to binary?
Uh because what's the point of all this,
you know, programming abstraction in the
end?
&gt;&gt; Yeah, it's a good question. I mean, it
totally can do that if you wanted to.
&gt;&gt; Oh, man. So, what I'm hearing here is in
terms there's always this question,
should I learn to code? Should people in
school learn to code? Uh what I heard
from you is your take is in like a year
or two, you don't really need to. My
take is I think for for people that are
using um there that are using quad code
that are using agents to code today you
still have to understand the layer under
but yeah in a year or two it's not going
to matter. I I was thinking about um
what is the right like historical analog
for this cuz like like somehow we have
to situate this thing in history and and
kind of figure out when have we gone
through similar transitions. What's the
right kind of mental model for this? I
think the thing that's come closest for
me is the printing press. And so you
know if you look at Europe in uh you
know like in the in the mid the mid400s
literacy was actually very low. Uh there
was sub 1% of the population it was
scribes that uh you know they were the
ones that did all the writing. They they
were the ones that did all the reading.
They were employed by like lords and
kings that often were not literate
themselves. And so you know it was their
job of this very tiny percent of the
population to do this. And at some point
the you know Gutenberg and and the
printing press came along and there was
this crazy stat that in the 50 years
after the printing press was uh built
there was more printed material created
than in the c in the in the thousand
years before
and so the the volume of printed
material just went way up. Uh the cost
went way down. It went down something
like 100x over the next 50 years. And if
you look at literacy, you know, it
actually took a while because learning
