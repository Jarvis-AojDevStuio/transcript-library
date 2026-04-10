---
video_id: "xHnlzAPD9QI"
title: "Automate tasks with the Codex app"
channel: "OpenAI"
topic: "ai-llms"
published_date: "2026-02-03"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=xHnlzAPD9QI"
duration: 275
word_count: 1011
---
So there there's a lot about the job
that isn't actually that fun that I have
now um automated away almost entirely.
Um and so I'll show you a few of those
here in our automations tab. And we've
got a bunch running now, but we can run
down a few of these cuz I I kind of have
set up a few different types of
automation. And the first type is just
sort of information. I'm asking Codex to
look at the last day of commits into
this section of our monor repo and
basically like group them. tell me who
worked on what um what got done, what do
I need to know about and so I I wake up
in the morning with almost like a you
know if you've used JTBt Pulse it's it's
like a personalized pulse that I walk I
open the app in the morning and sitting
there is like here's what happened
yesterday in the codebase um which is
you know super super useful. So I have
one called upskill
&gt;&gt; and what upskill does is it looks at the
last day of skill usage. So it says,
hey, you know, skills are really useful,
but sometimes they take a little bit of
tinkering to get right. And so it looks
at Codex usage throughout the past day
and detects if any skills like if Codex
had any trouble with skills or if any of
the scripts um didn't work correctly or
if like something could be sped up and
it makes improvements to the skills. So
it's upskilling like overnight like I'm
going to sleep, I wake up, Codex is
smarter in the morning based on what
we're trying to do here. Similarly,
update agents MD like this I just have
run every I don't know 6 hours and it
just looks at what we've been doing and
if there's any like disagreements or
misunderstandings that I've found with
CEX or things where things took longer
to communicate than or I use some
shorthands that Codex wasn't familiar
with it will just add that to the
personalization so that next time um
things can just be quicker. I've got a
few others that are integrated deeply uh
into our other tools. And so one of them
is Sentry. This is kind of a different
type of automation um where it's going
to go through on whatever schedule,
whatever cadence and it picks off one of
the top sentry issues. So that could be
like a performance regression or a crash
or um you know an error that's being
thrown in in the app and it like goes
through all of the information that we
have about it, the logs, um every you
know the maps, everything that Sentry
has. It looks codebase and it it picks
something to fix basically. Um, and
automations have memory so it remembers
what it tried to solve last time. And so
you're not going to get a PR like
solving the number one issue, you know,
every hour, right? Um, but it's really
good because what this, you know, what
this type of automation does is it
allows us to focus on what is going to
make the Codex app great to use and and
useful and joyful and all of the things
that like, you know, bugs and things
that fall through cracks that like
aren't quite as fun to figure out. At
least for me, I know some people uh love
it. Um, that stuff can happen kind of
behind the scenes, right? And so it's
really common that you run into merge
conflicts when you try to merge your
thing and like you find you know you you
iterate on your approach and and you've
got like different types of people
giving reviews and then you're you're
finally ready to merge something and
there's a conflict or CI is failing for
you know some small reason you got to
kind of dive into that and so um I don't
like dealing with any of that. Um not
maybe you know
&gt;&gt; most people probably don't
&gt;&gt; some people love doing that and they
work on CI tools um but I have a green
PRs uh automation here that uses some of
our skills. So we use build kai we use
github um and so what this does is it
checks if I have a um any open PRs and I
usually have like at any given time
between 10 and 20 PRs these days open at
a time because of the codeex app um a
separate problem. Um, and this is going
to go through and it's going to say
like, do any have CI failures because of
like, you know, something lint that like
linted wrong or like didn't get get
caught in the pre- push. Um, or maybe
it's going to merge conflict because
someone is like also changing it because
we're rushing to, you know, finish up a
project or something like that. Um, and
this is going to go through and it's
going to make sure that all my PR is a
green. It's going to update the base
branch. that's going to intelligently
resolve merge conflicts by looking at
like what have people been trying to do.
So it's not just a factual like you know
I'm going to clean up the like conflict
markers. It it can look at oh like Joey
was putting in this feature so we
changed this block for this reason. I'm
trying to do this. I'm changing it and
it's a conflict and like kind of knows
how to do that. And so that's a very
long way of saying my PRs are always
green.
