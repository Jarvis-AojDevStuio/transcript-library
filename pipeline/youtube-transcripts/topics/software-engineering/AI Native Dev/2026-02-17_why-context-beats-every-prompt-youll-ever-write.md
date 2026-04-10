---
video_id: "z6mgrQCg1NM"
title: "Why Context Beats Every Prompt You'll Ever Write"
channel: "AI Native Dev"
topic: "software-engineering"
published_date: "2026-02-17"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=z6mgrQCg1NM"
duration: 1835
word_count: 6388
---
The big question is agentic development
just coding faster with agents or is
there a bigger more fundamental paradigm
shift that we need to make with our
software development today. We think
there is a new development paradigm in
agentic development. The primary
challenges in agentic development are
one is it's nondeterministic. The second
is that it revolves around intent not
code. The third is that agentic
development is faster than anything
we've seen before. And that means that
we can't rely on noticing when things go
sideways.
&gt;&gt; What is the solution to this?
&gt;&gt; I do think that the hammer that we have
is context. LM eventually are just
stateless machines that we pass a bunch
of context to and they calculate their
weights and they figure out what the
next words are. An easy way to
understand this is to think about
humans. What are your tools for managing
a team communication? So alongside
talking about it, we actually have been
building products around this and we
have a platform from a business
perspective. Think of it as an agent
enablement platform on boards agents
onto your environment with all those
policies and practices and then it helps
continuously educate them continuously
improve the context.
&gt;&gt; When we use something like context what
is the key to using context and making
agentic development successful. The
first thing you need to do is you need
to
[music]
&gt;&gt; Before we jump into this episode, I
wanted to let you know that this podcast
is for developers building with AI at
the core. So whether that's exploring
the latest tools, the workflows, or the
best practices, this podcast's for you.
A really quick ask, 90% of people who
are listening to this haven't yet
subscribed. So, if this content has
helped you build smarter, hit that
subscribe button and maybe a like. All
right, back to the episode. Hello and
welcome to another episode of the AI
Native Dev. My name is Simon Maple. I'm
the co-host for today. Joining me, Guy
Pagani. Indeed, you're a slightly less
frequent recently co-host here.
&gt;&gt; That's true. We've been together a
little bit more recently. Um, so why
don't we take a step back and actually
zoom out a little bit. In this episode,
we're going to be asking the big
question. Is agentic development just
coding faster with agents or is there a
bigger more fundamental paradigm shift
that we need to make with our software
development? Today we're going to be
asking the questions is do I just need
to learn how to talk to agents better or
are there greater things that we need to
learn in the practices of agentic
development? I think agentic development
I mean it's clearly powerful right and
we've spoken a lot and we'll probably
speak more you know on how how the daily
practices uh have changed um but I think
there is also the broader kind of
agentic development as a team practice
uh and over there there are a whole set
of um uh fundamental changes uh and
challenges that come along with them um
I would say the primary challenges in
agentic development are one is it's
nondeterministic And so we're all too
used to we we run a build. If it
compiled once, it'll compile twice. Yes,
there's the it works on my computer
versus not, but uh otherwise it's fairly
deterministic. So that creates a whole
new set of considerations about how do
we develop software when repeatable
processes are so hard to make. Um the
second is that it revolves around intent
not code. You know, we said that from
the ve very beginning, you know, that
software development will become
specentric not ccentric and that code
will become disposable. uh that felt
more controversial a couple years ago
than it does today. It's still not
something that everybody will agree
with, but I think it is very clear that
it software development anchors on
intent on what you want built on your
constraints. Uh and so that's another
primary change or challenge that that we
face on on what are these kind of
nuggets of intent? How do we enforce it?
How do we express ourselves? A lot of
human analogies. And then the third is
maybe just a multiplication u and that
is uh agentic development is faster than
anything we've seen before. Uh and we've
had a version of this when DevOps came
about where we said well wow it's moving
so fast and all of our uh kind of human
processes of how do we identify a
problem and intervene right how do we
prevent it uh all of those uh broke
apart uh when DevOps came about and we
had to introduce these continuous
processes. Now we see another one or two
orders of magnitude acceleration. Uh and
that means that that we can't rely on
noticing when things go sideways on um
intervening and changing it at that
time. It's hard for other people to
supervise uh one person's work because a
single person a single developer can be
so productive. And so I'd say those are
the three primary kind of uh deltas or
challenges that agentic development
introduces that we have to think about
how do we adapt to and how do we change
the way we develop uh to to deal with.
&gt;&gt; Yeah. And it's interesting like a lot of
them not new to today things like the
non-determinism the intent and so forth
these are these are things that we're
talking about from the very very start.
What else have you heard in kind of like
conversations? So I know you've been
speaking with so many people at uh
events as well as for users and
customers. What other things have you
have you learned?
&gt;&gt; Yeah, I think um it it's so hard to
reduce these things to the three. So
like if those are the three primary
elements, I'd say the other the next
three, you know, that I would highlight
are um one is that uh LLM and agents
have a bias for reimplementation versus
reuse. So that is something we battle
with all the time. It's interesting
because in some cases reuse is less
important because creating software is
cheaper than ever before. But there are
still various cases in which if instead
of calling the relevant function of a
library the LLM has chosen or an agent
has chosen to reimplement it now you
can't upgrade or fix that functionality.
It's new bugs. You know it's there's
reasons we do reuse of software. So I'd
say that's a bias that we need to deal
with. Some humans have that as well. So
maybe not uh not quite uh unusual but
it's very uh it's very significant. Um
uh the second is that there's agents are
constantly a little bit outdated you
know by the very definition of how
they're built. Their knowledge is at
least a few months old from the the time
the last model was trained.
&gt;&gt; Uh and so that is another challenge we
always have to sort of think about how
do we deal with and then um I I think of
LLM and agents as cheap than expensive.
uh they are they are cheap in the sense
that you can build things so much faster
and with so much less human effort uh
than uh than before and that is cheap
but then once you start using them you
know now Opus 46 runs with its fast mode
that is you know two and a half times
the speed at six times the cost you know
and already at the top model it's
amazing it adds up uh and so it's gone
from a great way to save money to okay
this is now also a significant spend and
intro produces questions on how do you
manage spend? We knew how to do that
with humans and with uh hiring locations
and a variety. What's the right way to
do that with agents? Um so all of those
and and I'm sure even these six are not
a comprehensive list, but I think I
think it's a useful starting point.
&gt;&gt; So there's a lot of problems there, guy.
What what is the solution to this? I'm
guessing you're going to say something
about context. [laughter]
Well, you know, now that you put this in
context, it is uh so yes, I think there
are a lot of challenges over there and
some of them are human and we need to
deal with them. But I do think that the
the hammer that we have as we look at
all these uh nails or nail like uh
problems is context. Uh and the reason
for that is that LLMs eventually are um
just sort of stateless machines that we
pass a bunch of context to, you know,
and they calculate their weights and
they figure out what the next words are.
uh and so managing what are the words
that come in, what is the information
that comes in uh is really our primary
tool. It is both our uh human means of
alignment. Those are the words the
institutional knowledge preservation uh
and how do we uh make sure that we work
as a team and as an ecosystem and they
are the way in which you communicate and
convey things to uh to the MLMs. I guess
an easy way to understand this is is to
think about humans. What are your tools
for managing a team?
&gt;&gt; Communication.
&gt;&gt; No, that that's uh that's really, you
know, how you can work with it. You
know, how do you uh uh in incentivize
behavior as in you know, what do you
respond to and how do you respond to it?
And uh I think a lot of those analogies
really uh come down to to context. And
so I think the core competency in
agentic development is context
management. Uh and there are a lot of
types of context. There are rules that
you are you know kind of explicitly and
uh uh aggressively pushing. Uh there are
skills that you are hinting and making
available to the agent to try and pull
down. there are docs that is uh
information that is available for the
agents to find and use uh at its time
and I'm sure there will be other
variations of how do you uh drive the
agents to consume and load the right
context and and then you have to think
for yourself when you think about the
development paradigm how do you manage
that context
&gt;&gt; and that's actually to keep that
parallel with humans and people it's
really interesting because you know
rules for example things that are
mandatory for an agent to to learn.
These are very similar to the the rules
that we have to abide by whether they're
you know organizational rules or or
development rules which we want to
follow. Uh docs for example could be
reference docs. A developer doesn't keep
all of that in their mind but as and
when they need to learn something they
they know where to go and then they can
learn that. So so realistically it's
kind of like a little bit like
onboarding these agents with amounts of
knowledge and intelligence or you know
those types of things. You wouldn't
expect a human to do that without
without this type of knowledge. Um so so
I guess when we when we use something
like context what are the what is the
key to to using context and making
agentic development successful
&gt;&gt; is you need to write down what it is
that you want the agent to do right
consider you know you have a you have a
team you know people have different
opinions uh consider uh that there's a
lot of institutional knowledge you have
to write those down you should
absolutely use agents to help you write
that content and and refine it but you
need to review it and understand what is
written Um again think about a team and
think about aligning between the team.
At some point you need to talk through
the possibilities and choose which ones
you want. The second bit is you have to
evaluate how well do the agents listen.
Uh agents vary in the type of content
and the type of you know length and
verbosity that they would need to be
able to apply changes. They uh it's
really the models that vary not the
agents. uh but even so some are tuned to
use more tools some are uh smaller
models that need more explicit
instruction some are very big models
that you know lean into intelligence so
you know we've discussed many of these
things on this uh on this podcast uh and
you really have to after you've defined
it optimize the way you say things once
again human analogies work very well you
can communicate some things better or
worse and it depends on your audience um
the the third is you have to then kind
of communicate it out or like broadcast
this to the broader set. Understand
that, make sure that the agents that
need to hear your words hear those
words. And then lastly, you want to
observe what happens in the real world.
If if evaluations are more like your uh
tests before you roll something out,
right? They're more the the focus
audience, you know, that you've tested
your message with, uh the observation is
really actually, you know, polling to
see what happened after. uh and just
like we've learned from DevOps and that
you know in the in the nondeterministic
systems that are our runtime servers and
that you can't just anticipate whether
they will go down or not. You have to
monitor them and respond. Similarly,
agents aren't you know nondeterministic
creatures. Uh and you have to assess
okay are they actually working the way I
expect them to learn from that and come
back. So these notions of like define
and capture, evaluate, communicate or or
distribute or broadcast, you know, your
your uh your context uh and then observe
what happened and rinse repeat.
&gt;&gt; And this isn't something that you
quickly run, you know, back to back and
then kind of like learn from straight
away. This this happens in our existing
workflow at different times, right? You
get different loops that can kind of
help you with this feedback. Uh where
would you say each of those fit in with
the today's development workflow? Yeah,
there definitely are various places in
which you'd apply, you know, these
different steps. Uh I I think especially
for a developer audience, the most
useful thing to imagine is the DevOps
loop. Uh we're all familiar with that
sort of infinite loop.
&gt;&gt; You always keep going back to that loop,
right?
&gt;&gt; You might say it's infinite.
&gt;&gt; Yeah, it is infinite.
&gt;&gt; Returning to it. Uh and so uh clearly
the the DevOps loop you know has you
know more dev on the side on the left
side and more ops on the right side but
really you can start at any point
depending on kind of what your current
situation is. So you can think that on
the on the more dev side of it the left
side you can think about analyzing your
current situation. So uh you know what
do you already know about your code base
about you know what has happened about
people's desired. So that's a little bit
of that define capture. So you analyze
that then you generate the right
documentation and then you evaluate that
and you can continue with that loop as
much as you can you know as much as you
feel is needed. So you've evaluated
you've seen whether it's good you know
maybe you've learned something so you
come back you analyze those results you
generate again so you repeat that as
much as you uh uh as you think is right
and then once you're ready once your
context is good then you go on to more
the upside which is you distribute
similar to deploying you leverage. So
you actually kind of execute you run the
context uh non-trivial effort over there
right you have to think about activation
there's a lot of complexity over there
and then you observe uh coming back to
running system uh and so this type of
infinite loop continues again again you
observe you now have more information
you might modify your synthetic tests to
represent the real world again and that
might imply some problems you identify
therefore you regenerate the context and
so on and so forth and in that in that
infinite inite loop. Uh I I I think
there are the classic uh needs and sort
of tools that you need that are similar
to those that we have in development.
There are some builds time interactive
sort of development time systems. There
are some tests like the evaluations that
we need to put at uh certain points in
time. You might not have a comprehensive
test but they need to be sufficiently
representative of reality so you don't
regress you know with the different
changes. Uh and then in the runtime you
need things that are more scalable. you
might sample behavior versus, you know,
tackle all of it. You need statistically
successful uh behavior. You might not
need perfection. Um so I think you need
that type of looping and and this is uh
I guess what we would think of as the uh
as the context development life cycle,
right? As uh as it evolves uh that
complements the SDLC.
&gt;&gt; Absolutely. It's it's it's funny how we
keep going back to that that figure of
eight, right? But I think what what's
most interesting is we use the right
tools at the right time. And so for
example, evaluate as you were mentioning
the the the eval that we use there,
they're fast because we're able to do it
with the data that we have at that right
time. Uh they're not necessarily going
to be the most precise given all the
data that we have, but it's that
feedback that then that then adds back
into that eval to actually provide us
with the data that we know that actually
this is a correct eval or actually we
need to update this eval in this way.
And so that that kind of like gets us
that uh more close to that perfection.
&gt;&gt; Yeah. Correct. And and we have like
we're familiar with that from tests,
right? We have unit tests, we have
integration tests, we have end to end
tests and they are increasingly uh
expensive to run, you know, and harder
to run. And so we we use sort of smaller
scope indications. So maybe we evaluate
our pieces of context frequently. Every
time we change some some policy
instruction or some documentation about
a library, you might want to evaluate
that every time. uh but other types of
systems like maybe evaluating uh a repos
context sort of say well there are there
are a lot of bits of context in this
repository on it can agents handle that
I want to run an evaluation for that I
want to uh draw conclusions about how
how well does it work and and what can I
do to improve it so those might be more
expensive you might run them more like
end to end test right every every now
and then but not regularly so I don't
know if the onetoone analogies of unit
test integration tests uh uh end to end
tests will will work but I think there
will be a version of kind of lightweight
evaluations and local evaluations that
expand into broader system ones.
&gt;&gt; Yeah, absolutely. It gets us closer to
where we need to be to to to tune.
&gt;&gt; Exactly. I think the very first guest we
had uh on the podcast was uh Dez from
Intercom. Uh and he talked about uh how
at the time even for the agents they had
built in uh it was before coding agents
were really a thing. Uh they had their
regression test evaluations for their
agent to know if it's doing the right
thing. Then they had their torture test.
Uh you know was the comprehensive the
comprehensive ones and so they didn't
run the torture test for every change
you know to their prompts. They ran it
when the new model comes along. And I
think as we as we use agents to
understand our unique environments in
development, we kind of need to develop
our regression evals and our torture
evals, you know, for uh for agents as
they enter our development environments.
&gt;&gt; Yeah. Still the best name tests by the
way that I've
&gt;&gt; torture test. Yeah. Much better than end
to end.
&gt;&gt; Yeah, that's true. Very true. Let's get
deeper into context and maybe talk about
use cases of context. What people want
to use context for. What would you say?
&gt;&gt; Yeah, I think that's probably the part
that has evolved the most. uh and we had
to see it in in kind of the real world.
Uh I'd say today I see three types of
context. I know I'm sort of keep
repeating things in three to to ingrain
into the corporate world. Uh but I feel
there are these sort of three uh uh
types of context that we see development
teams and organizations roll out. Uh one
is more uh policy or best practice uh
related context. So this might be a
security policy you're disseminating or
uh a choice of uh uh what is goods
design over here or uh sometimes
constraints around uh financial like how
much to optimize for budget versus for
uh uh speed or something like that. So
those are often times wrapped in skills
or in some other document. They're not
tied to a specific piece of code
&gt;&gt; and fairly reusable across an
organization
&gt;&gt; and they should be you can have actually
what what we see in enterprises is we
see that they are hierarchal. You might
have uh just like with any policy, you
have just like you would communicate to
humans, you might have something that is
companywide and then there might be a
slight override within a business unit
and maybe an even more specific override
uh in maybe uh a specific application or
specific team. And so they they might
augment inherit from one another, right,
to the uh to the Java fans uh in our in
our audience. And so so you have those.
So in those cases, you want to create
create the words, right? Write it down.
You know, that is the core of it. You
want to evaluate how well would agents
listen? And in this case, it's very
important to define what does good look
like because you might say, here's a
policy to say, write something, you
know, make sure my code is secure. Well,
that's a very broad definition. Be
specific, you know, get a little bit
more uh detailed. And often times the
evaluations are the ones that indicate,
you know, what do you mean by uh by the
word that you that you say? Uh and so
you want to evaluate it uh and then you
can optimize to that evaluation. If you
didn't invest in the evaluations, you're
going to optimize for the wrong thing.
So be mindful. Once you have that, you
want to distribute that and make sure
the right agents are getting the right
information and that they update that
over time. And of course, observe
behavior. So that's kind of one strand,
right? That's the the kind of policy uh
path. The second one that we see is
documenting your internal platform. U
that's maybe the most common, which is I
have libraries of my own in my
organization. I have my billing system.
I have my uh uh kind of a technical
cloud infrastructure that I am uh uh
that I'm using that all my applications
need to be deployed on. There's no
reason for the agent to know any of the
stuff. It shouldn't all being well.
&gt;&gt; There's no if it didn't leak into the
weights of it in some of the first waves
of the LLMs. Uh it doesn't know about
it. It's not in its weight. And so you
have to inform the agent about that.
Mhm.
&gt;&gt; Yes. Technically, the agent can
sometimes go out and try and find it
amidst the codebase and extract that
out. That's uh errorprone, expensive,
very inefficient because you're going to
need this information again. And if it
gets something wrong, you don't well,
how do you find out? Because often times
the consumer of the platform is not the
one that actually has built the
platform. And so this notion of a
central roll out of uh the knowledge of
your ecosystem of your technology uh is
is very very common. Once again you want
to generate the documentation. In this
case you typically have a source of
truth which is the actual code of that
platform examples of usage of it. So
that generation can often times be quite
automated. You want to evaluate it to
know that modifications to it do not
regress. You want to roll that out uh
and make it available to anybody
consuming the platform. And then you
want to observe that behavior and evolve
it. Importantly for this one also you
have to maintain it because your library
your platform will change over time. You
now need regular processes to update
that. Then the last one I would say is
uh is more application context or in
repo context. So this is the case where
increasingly people understand that with
agentic development you have to be uh uh
somewhat disciplined around capturing
the definition of what your app does.
You know what is the functionality here
because otherwise if you ask the agent
to make a change and it went sideways.
You you don't know uh uh like where did
it go wrong. There was never a
definition of what right is. Uh so you
have to have some definition of what
correct is. You have to have some
documentation uh and uh and those get
captured. But again, just like software
rots, context will rot. So over time, if
you created those docs, but you're not
methodical about knowing that it's good,
that it hasn't regressed, that it stayed
up to speed as things changed. So what
we see over there is actually a flow
that starts with evaluation. So you have
uh your your first question is can
agents handle my codebase? Maybe if it's
small enough and it's written very well,
they can handle the codebase fine. You
don't need any additional content. But
as the systems grow, you need uh uh you
they would need more support to be able
to effectively
&gt;&gt; the challenges that you kind of like
outlined at the very start
&gt;&gt; amplify as you as that codebase and the
team grows
&gt;&gt; precisely as the team grows the codebase
grows the kind of the complexity the
subtlety of some decisions and so I'd
say this flow starts with an evaluation
it starts with take the repository go
back in history extract out some uh set
of representative commits or pull
requests that that show typical work in
this repository uh and turn those into
evaluation scenarios. Uh and that is by
the way already very interesting to see
well how well can agents develop here
and out of those you can say okay seeing
the failures that they've had what type
of context changes might I need over
here what can I add what can I remove
you will find that there are some
documents that you have that are just
not necessary the agent totally gets it
doesn't need it uh so you're just
wasting context space and then you'd
find there other cases in which the
agent is is failing it doesn't
understand some type system it keeps
airing on uh uh on you know some
specific piece of the code and so for
those you can create context once you
have that evaluation you do that
optimization you come back to make sure
that context is available observe real
world scenarios and keep that context
fresh as it moves
&gt;&gt; and and that's the that's the important
thing keep it fresh because this is a
point in time of how this project looks
today in six months time in one year's
time
&gt;&gt; it's going to look differently and you
need to keep that up to date this is an
evolving process continuous process that
needs to continually update
&gt;&gt; yeah yeah and I'd say like The weight on
each of these different steps changes
from team to team, from application to
application. There might be some cases
in which uh observing for instance is is
sufficient for you like your team is is
very nimble, very fast moving, the
application is sufficiently small that
you feel like it's okay for you to
observe and identify context failures,
create some new context and roll it out
without evaluating, without tests,
right? And you might be you might be
fine with that for a while. uh because
evaluations or creating tests are uh you
know is an effort. Um but I think as
we've seen with tests, you're gonna
regret that decision at some point you
know as a as a system goes because it
means every time you make a context
change you you have no way of knowing
whether you've just introduced a
problem. It means when a new uh uh uh
platform comes along a new model or if
you want to run it on something cheaper
you have no means of knowing whether
that system would work. The only way
that you have to do that is to roll it
out and hope for the best uh and see how
people respond uh or even observe the
logs. And so I think the different
emphasis on do you want to lead with
evaluation, lead with observation, lead
with generation, you know, lead with
optimization. All of these things uh
they are choices and they're okay and
they will vary from time to time but I
think they all repeat in various orders
in these sort of three use cases of kind
of policy dissemination or sort of
practice dissemination platform
documentation and um kind of application
context.
&gt;&gt; Yep. So we talk about this a lot and so
alongside talking about it we actually
have been uh building products around
this uh for quite a few months now uh
and working with with partners and
building it out uh and we have a
platform we from a business perspective
think of it as an agent enablement
platform. So it's a platform that helps
agents, you know, be enabled,
successful. Uh it on boards agents onto
your environment with all those policies
and practices and then it helps
continuously educate them, continuously
uh uh improve the context. And so we
have that on a technical level. It's
more of a context development and
distribution platform. So we give you
that sort of CDLC and like dubious
dubious choice of acronym of it.
&gt;&gt; Just drop a new acronym in there.
&gt;&gt; Yeah, the context development life
cycle. Not sure we're going to use that.
uh but uh but we we enable this context
development life cycle. We help you uh
you know generate context, evaluate that
context, extract evaluation scenarios
from existing knowledge, help you of
course run them, observe. So we do all
of that uh sequence so you can develop
and own your context. Uh and then we of
course help you distribute. You've sort
of seen that we are uh the package
manager for skills. Uh we are you know
we support and you know enable skills
within organizations as well but also
externally. And so we we're very kind of
committed to making these types of
evaluation services and context
distribution available for the so the
open source context as well. Uh and so
we help you do both of those. And in
general coming back maybe to the root of
it we think there is a new development
paradigm uh in agentic development. It
is uh it is substantially different than
uh what we've seen in software and it
doesn't actually replace the SDLC. it
integrates into the SDLC in various
places. Uh and we think that context is
needed in many places. For instance, we
see uh the same uh skill or the same
tile which is our kind of package of
context uh get consumed while someone is
locally developing and trying to you
know get the agent to succeed. we see
that very same tile be used in code
review uh when you are deploying it or
maybe in incident uh review when it
tries to understand what has happened
and it needs some information about uh
how the system operates. the same
context is applied across different
agents across uh different models and
and so we think context is uh a separate
asset that you want to develop and your
SDLC will uh right now is very very
critical but over the years it'll become
closer to a build system. It'll become a
very critical system uh in in within
your your platform and one that you
should invest in but one that is uh kind
of run by bots used by bots mostly like
it is not uh it is set up and configured
but most of the activity within it is
done by automated workflows. Um, so
we're excited to be the sort of new
agent enablement platform, maybe CDLC
platform. We'll sort of uh we'll see.
And you'll see us use the word skills in
our kind of communications a lot. You
know, we think context is broader than
skills, but skills are very helpful term
right now as people think about a unit
of context that they move around. And so
we embrace that. We think terminology
will probably shift, you know, three or
four more times, you know, as the world
uh moves around. Uh, and that's not our
focus. uh
&gt;&gt; maybe in and out of C CDLC maybe.
&gt;&gt; Yeah, maybe CDLC is premature because it
knows it's C is going to be the word
there. We started our journey with
specs. Uh and we it's the same thing you
know it doesn't really matter what it's
called. Uh and so we are emphasizing the
term skills although skills are really
just a subset of the context that we
support. Uh but really are committed to
this notion of you know whether it's
skills or it's context or it's tiles or
it's specs. uh we help you create it, we
help you own it, we help you develop it
over time and we think that will become
the core competency for a software
development organization.
&gt;&gt; Awesome. And if you're interested to
learn more, why don't you head over to
tesle.io where you can actually do a lot
of selfserve. You can go ahead and uh
discover, you can use, download and use.
can even publish uh your own context
skills and tiles in uh and if you wanted
to learn more uh maybe you have a more
complex larger environment that you're
trying to use context uh to enable why
don't you reach out at contact tesla.io
but for now thank you very much guy that
was really enlightening about about how
the space has evolved and changed and
and and how Tesla is positioned in that.
&gt;&gt; Yep. Thanks Simon and you know again a
good opportunity to say thanks for the
amazing team that we have that's been
building all this thing and I'm just
here sharing a bunch of their wisdom and
hard work but and thank you to the
amazing users and early customers that
have helped to shape a bunch of these
practices and truly are shaping the
future of software development. So
looking forward to uh hearing from more
of you amazing people and organizations
uh as you reach out.
&gt;&gt; Thanks very much and tune in to the next
episode.
