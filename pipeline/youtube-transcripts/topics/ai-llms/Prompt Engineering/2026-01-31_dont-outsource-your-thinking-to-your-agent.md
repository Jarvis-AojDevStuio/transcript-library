---
video_id: "NjjEkmP2C8k"
title: ""Don’t Outsource Your Thinking" to your Agent"
channel: "Prompt Engineering"
topic: "ai-llms"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=NjjEkmP2C8k"
word_count: 1871
---
When it comes to coding agent, here's
something that nobody talks about. They
can definitely make you faster in code
production, but they can also make you
worse. And the difference comes down to
how you use them. After using coding
agents for every day for the last year
or so, I want to share some of my own
learnings and those by the community.
The most important takeaway is going to
be do not outsource your thinking. Now
the hype around coding agents like clot
code is real. So Enthropic says that 90%
of clot code is written by clot code
itself and you could argue that the
productivity gains are not fake. You can
literally do weeks of work in days and
hours of work in minutes. Now but here's
the other side. I have personally seen
code bases written by AI that looks like
they were worked on by 10 independent
developers who were not talking to each
other. And the issues that we normally
see is there are duplicate logic,
inconsistent naming, no architecture
whatsoever. And this happens if you let
AI run unsupervised. Now, this video is
going to be all about how do we get the
good without the bad stuff from AI. I
will be referring to a number of
different blog posts but here is the
core argument. You cannot outsource your
thinking.
Everything else flows from this. Now
what exactly does this mean? In simple
words, bad prompts where the model has
to make a lot of assumption of what
exactly you want is outsourcing your
thinking to the model and better prompts
are about learning to learn. So when you
are interacting with the system, you
should try to build this new skill where
you are learning to learn, not just
getting answers from the coding agent.
And in the rest of the video, we're
going to be focusing on specific lessons
that I have come across. So the very
first one is context rot is real. Now
context rot happens when you have a lot
of irrelevant information in your
context and it stops helping and starts
hurting. So as a result of this the
model starts forgetting long list of
things. It will start ignoring half of
your questions and the model is not
really able to figure out which part to
pay attention to and which not to. So
you need to be very intentional with
this. If you start seeing the model is
forgetting, just restart the session
again or use the catchup command in
cloud code. This is going to help the
agent to refocus their attention. Now,
lesson two, plan first and then code
later. So, here's the workflow that
actually works in practice. When you
start a new session, brainstorm with
your agent. Let it ask questions.
Compile that into a specs document. And
after that, make sure you generate a
step-by-step plan which breaks the task
into smaller tasks. Now, then and only
then start coding. Now, this definitely
is going to feel slow, but it's actually
faster because as a user and the coding
agent, as a developer are going to be
exactly on the same footing, and you
want to make sure you reduce the
ambiguity in requirements that the agent
is supposed to build. Now, why does this
work? Without a plan, you simply get
slob. You and the agent cannot think
through something that does not exist.
And with a plan, you can carry the
context forward. And if you need to
restart, just use the clear command. But
at least you will have the plan that
survives and the agent is going to be
able to restart from that. The next
lesson is about incremental development.
Small chunks beat big prompts. Normally
the big mistake is that you ask the
coding agent to build you a whole
feature. It usually tries it and will
result in a mess. You want to follow
testdriven development. Ask for step
number one. Code it, test it and then
move on to step number two. Now the good
thing is that these LLMs and coding
agents have created contained tasks. So
you need to work with that. Now, this
one might be a bit controversial, but
think of yourself as a team lead or
technical manager. Even if you don't
know programming, in order to get the
most out of these coding agents, you
need to get better at development
yourself. I'm not talking about the
syntax, but best programming practices.
Here's a quote from Simon Wilson. Think
of an LLM, pair programmer, as an
overconfident and prone to mistakes. It
writes bug with complete conviction. So
you need to treat every snippet like it
came from a junior developer. You need
to read it, run it, test it. And that's
one of the way you can avoid slop. That
also means you will need to put a lot of
effort. So review every plan before
execution. Interrupt your coding agent
when it's drifting.
Never merge a code that you can't
explain. And I would recommend to hold
yourself responsible and accountable for
every piece of line that is written by
the AI agent that you're using. Lesson
five, you need to get better at
testdriven development. Because without
those, your agents are completely blind.
They don't know what they're writing
because without tests, your coding agent
assume everything is working fine. And I
really like this quote. Nobody gets
promoted for writing unit tests, but
unit tests never don't save your life.
Lesson six, ground your model and make
good use of cloud.md or agent.md. Now,
you want to make sure you are very
intentional about what is in your cloud.
MD or agent.md
because this is going to be the
onboarding document for your AI agent.
It can include things like project
style, what are the different gotchas
and how you want it to think about
things. So when you are starting a new
project or you are working in an
existing codebase, just run in /init.
This will autogenerate one for you. The
way you want to use it is that if you
run into any issues, you want to
document those. And this is extremely
helpful especially if you're working on
a multi-session project where for every
session your agent is going to look at
your cloud.mmd or agent.mmd and get a
really good sense of the current state
of your project. So keep in mind this is
not just for setup. You also want to
document the issues and resolutions for
those specific bugs. So it's going to be
a living document that is going to be
updated while you're working on your
project. Lesson seven, sub aents are not
always the solution. So you need to know
when not to use agents. For example, do
not use them for explorative work. If
something is not working, you can't just
ask them figure out why it's slow
because there is no clear done criteria
or state. So it's potentially a bad fit
for a sub agent. Also going back to the
main theme, do not outsource your
thinking. Architectural decisions need
judgment, not just iterations. So it's
probably a bad fit for it. And if there
is anything security critical, that
definitely needs human eyes because
passing tests is not equal to secure
code. Think about this way. At least
right now, AI is really good at
implementation. is not good at designing
yet. Now, that could change pretty
quickly. We never know. Now, be careful
with the way you use multi-agent
systems. So, for example, if you have 10
different sub aents, that also means you
have 10 different failure sources. So,
in theory, sub aents can be good for
separation of concerns. But in practice,
it can become extremely cumbersome
because when it breaks, you're debugging
a combinatorial explosion. Lesson nine,
git is your safety net. Now, most
developers are aware of this, but they
don't use it often enough. So, the one
thing that you want to do a month if
you're using a coding agent, you need to
commit often. regularly commit your work
because if things go sideways, you can
easily roll back to a previous
checkpoint and have a working version.
Small commits also help you in debugging
because bigger commits are going to be a
nightmare for debugging purposes. But
here's the thing, never commit what you
cannot explain. Now, most of us are
using a single agentic coding system
like cloud code, maybe Gemini, and
everybody has their favorite. But you
want to get used to using multiple
different models for your development
flow because each one of these models
have different strengths and weaknesses.
So have Claude write the code, ask
Gemini to review it or maybe if you like
Codeex, that is your agent to review
your PR. Now why this works? It's the
same reason you don't review your own
PR. Second model catches blind spots
that were ignored by the first model.
And I would even argue that you want to
look for a different model provider when
you are reviewing a PR. So for example,
if you did development with anthropic
model, then use OpenAI or Gemini model
for reviewing the PR. So what does this
all add up to? If you have really solid
fundamentals, the AI will actually
multiply your output. But if you don't,
it multiplies confusion. you need to be
extremely intentional when it comes to
AI development and it's really this
virtuous cycle that we have seen with
every other system that we have used in
the past. So better fundamentals gives
you better AI results which results in
more learning and even better
fundamentals. So make sure not only to
use these AI agents as tools for
development but also tools for learning
and in the process you're going to get
really better at how to prompt the
system to get better outcomes. Now here
are the key takeaways. Don't outsource
thinking learn to learn. You want to
plan first. This is the way you should
be designing. Do not let the AI write a
single line of code without planning
first and treat yourself as a senior
engineer or a technical manager. You
need to stay in the loop and for any
complex system tests and git are your
safety nets. Use them often and make
sure you provide enough context to your
model by grounding them with the context
in cloud.md or agent.md.
And the final point, secret isn't in the
prompts, it's actually in the process.
So plan, think, collaborate, teach
context, and learn in the process. Here
are some of the resources that I used
during the preparation of this
presentation. Do let me know your own
workflows and your thoughts and I'll see
you in the next
