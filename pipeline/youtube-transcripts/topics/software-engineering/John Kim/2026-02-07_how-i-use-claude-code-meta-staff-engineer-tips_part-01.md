---
video_id: "mZzhfPle9QU"
title: "How I use Claude Code (Meta Staff Engineer Tips)"
channel: "John Kim"
topic: "software-engineering"
published_date: "2026-02-07"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=mZzhfPle9QU"
duration: 2772
word_count: 4000
chunk: 1
total_chunks: 3
parent_video_id: "mZzhfPle9QU"
---
Hello. Hello there. How's it going
everybody? Today we're going to go over
my 50 cloud code tips. I've been working
with cloud code basically every day for
about 6 months now. And I feel like I've
learned a ton of things. And yes, I am
one of those engineers that are
basically not writing code anymore. I'm
still in cloud code like 12 hours a day
actively pair programming with cloud
code basically and reviewing a ton of
code. I still read every single line of
code. That's actually my biggest
bottleneck right now, the reviewing of
the code. But I thought it would be
great to show you kind of the best tips
that I've learned along the way. And
these are kind of tips that I wish I
knew when I was first getting started.
We're going to start off with some
foundation stuff like setting up very
quick setup stuff, a little bit about
like cloud.md rules, like what you
should put in, what you should think
about, and kind of some of the advanced
stuff for later. But without further
ado, let's dive into 50 cloud code tips.
So, I got my terminal here and I just
have some slides behind to uh tell you
guys what I'm doing. So, here is the
foundations that I mentioned. We're
going to cover getting started, keyboard
shortcuts, some essential like slash
commands, and a little bit of a deep
dive into the claw.md. So, let's get
started. All right. So, for tip number
one, you want to run cloud code in your
root directory of whatever project
you're working on. So, for example, I
have this Pomodoro app that I'm like
kind of been working on. So, I'll type
in like claude here. And that's
essentially how you get started. And you
really want to do this because uh later
we'll talk about this, but if you have
rule files or any kind of setup, the
initial root directory is where Claude
is going to zip up the context into that
first token. So, if you ever wonder why
you had a bunch of tokens used even
though you just opened up Cloud, this is
probably the reason why. is because
Claude's getting your project ready. All
right. So, one of the first things that
you want to do is run slashinit
like that. And what this does is claude
will go and look at your codebase and do
an analysis of your codebase and then
create that initial claw.md file in the
cloud directory of your codebase. Now,
there is like different directories that
you could source from like you could
have a global one or like this one. But
yeah, at a high level, what this is
doing right now is just it's just
looking at the codebase, looking for the
architecture and then basically it's
creating that claw.md. All right, so it
just finished. It does take some time
and as you can see, it's kind of going
and saying, oh, this is this is like a
nextjs 15 app. It's like a portfolio
site. Yeah, it's just going over
highlevel things about this particular
project. uh and then you could just
essentially hit yes to commit that to
your doclaw. So this is like really
important for new projects. So I highly
recommend you to run it. All right. So
the tip number two is that claw.md file
that we just created. It kind of runs on
a hierarchy. So if you go to
memory/memory,
you could kind of see right here that
there is a checked in memory which is
the current root directory and then
there's a user memory. This is like your
global one. So that's like in your
tilda.claw. claude/cloud.
So you could kind of choose between it,
but it's it's really there so you can
know what the core rule that the cloud
code is operating on right now. Looking
at the cloud.md that claw just created
like this is a pretty good one to get
started, right? It it just has like you
you don't want it to be too large. It's
like very small, right? I I think around
300 lines is about a decent place that
you want to aim for. And to be honest,
going larger is fine, but just remember
that every time you increase that
initial context window, you're going to
use more tokens first of all, but also
the more bloat you have in your context,
the less likely the AI will do exactly
what you're trying to do. All right, so
for structure and what you should be
thinking about putting into your cloud.
MD, I just opened another project. This
one is my anime Pomodoro. This is an iOS
app. So I wanted to show you a little
bit more examples but basically the
things I like to put is like highle
technical architecture and the
requirements you know like what is the
project like that's kind of important
and then you want to give it like some
domain context right like oh it's using
swift UI and I probably would add highle
architecture and like kind of the file
path and things like that and just some
of the highle design patterns like
you'll see like all of that should go in
here and And then one of the important
thing is kind of having your build flow
like your validation flow. And this is
like kind of where my build and
validation is. So you can see that I'll
like build the Xcode and then build the
project, make sure things compile. Just
having this loop of validation is so
amazing because the AI will just be able
to self-improve and keep going until it
fixes itself. So like if you were ever
in a situation where you just like ask
cursor to do something or ask some AI
code agent to do something and it just
doesn't work a lot of that gets resolved
when you fix the validation. And
validation, I think as a side tip, is
probably one of the most important
topics that you should really think
about when you're thinking about trying
to build good AI agentic like coding
systems or any workflows is really what
is the validation loop because that will
dramatically improve how good your AI
will be. All right, so let's go to some
keyboard shortcuts. And the reason why I
even have this entire section for this
is because if you're going to be in
cloud code all day every day, like if
you're an engineer, you're just going to
be on this workhorse for quite a while.
So you should learn how to actually use
most useful hotkeys. And there's
essentially shift tab toggle modes is
pretty useful. And that's just like
hitting shift and tab. And then you can
see right here that we're switching from
accept edits to plan mode. I actually
use plan mode quite heavily. I I think I
use plan mode almost exclusively
whenever I start a new feature. It's
rare that I start in edit mode. I always
just want to verify and double check
that my assumptions about the codebase
that I'm working on and the the
direction that I'm trying to go with is
the best option. So, I usually start in
plan mode and I spend a decent amount of
time before I go to accept and just like
start execution. All right, escape
interrupts. Let me just get something
started here. Tell me a good way to plan
a live activity for when I background
the app. Okay, so I'm going to let this
go to show you guys what escaping the
interrupts is. But you can see that
Claude is like thinking here and it's
like going through and doing things.
Sometimes if especially during plan
mode, you want to kind of like look at
this and look at the thinking and see if
it's going off track. If it is, you just
hit escape and then it interrupts. Now,
a lot of people might be like kind of
like scared to interrupt it, but you can
just like hit up and then go right back
to where you're doing or you could just
interrupt it and tell it something else.
The whole point is Claude Code has a
really good way of like dduping and
entering prompts in a nice queue. it
like it logically knows what to do. So
you don't have to be so scared to like
enter more than one prompt and also like
escaping early and interrupting and
changing course like it's actually
recommended to do that. Tip number eight
is if you ever had something like really
big or you copy pasted something and
you're like oh I don't want to delete
everything. A handy shortcut here is
just double tap escape and it'll clear
the input. There's also a vim mode if
you're into that, but I use this all the
time. Another thing is when you're on a
empty input, if you double tap escape,
you'll see that you can rewind to like a
previous point uh and then restore that
context point. This is kind of common
with clock code, but a lot of the tools
I feel like is really built to manage
your context and context engineering.
And then there's just like an agent that
is wrapped around the orchestration. But
a lot of the like slash commands and
stuff that we'll be going over, I feel
like it's it's really to manage that
context window. All right, screenshots
is obviously a pretty common thing to
do. There's a lot of ways to do it, but
you can essentially take a screenshot
and then drag it over and just drop it
in. And then obviously another good tip
is to add context. This is a cool
picture of the Clock mascot. Do
something with it. I don't know. But
yeah, so that's a really good example of
like taking a screenshot and bringing it
over. If you are doing any kind of UI
work, you'll definitely use this
workflow. I also highly recommend
finding like a Figma MCP or some form of
MCP that works really good with the
specific validation that you're trying
to do. All right, moving on to essential
commands and this is slash commands.
Before I end on the keyboard shortcuts,
there's a lot more keyboard shortcuts,
things that I don't use all the time.
And if you just go to like /help, you'll
be able to see a bunch of them. But the
ones that I covered, I use all the time
every day. So definitely just memorize
it. I think it'll be really useful. Now,
essential commands is like the slash
commands that I think you should know
about. There's way more slash commands
and you could like make your own slash
commands, but these are the ones that I
think is useful. All right, so slashcle
is basically a way to clear the context.
Now, you could actually do this by just
creating another instance of Claude,
right? That's basically the same thing.
But if you don't want to like do that,
you could just clear the context. And
this is really good if you want to start
a new feature and you're completely done
with the old task and you don't want the
old context to blow up the new context
and influence the new project that
you're doing. All right, so I just
loaded some stuff. Let's uh go into
slashcontext.
What this does is it will give you like
a visual representation of the current
context that cloud code is operating in.
Now why is this useful? So the main
reason why this is useful is because it
gives you an opportunity to reason about
the context that cloud code is making
assumptions on on your codebase. Now, I
always say context is best served fresh
and condensed. And you really want to
take a look at this from time to time.
If you ever felt like cloud code has
regressed and like things are not
working the way it is or your like cost
and usage like bill is going up, you
really want to look at this and then see
which are like the most biggest
offenders, right? You just want to like
audit it. Like MCPs are one of those
very common things that blows up your
tokens. I mean like look at all of this
Xcode related MCPS and every time it
runs it like I mean these are not a lot
because I haven't been doing that much
in this particular workflow but you
could just imagine that once I start
doing those iteration cycles this like
usage will like blow up but yeah so if
you look at this and you're like oh this
MCP is using so much then you could
remove it or just disable it for this
directory. So slash context is something
that you probably should not ignore.
Again, I think cloud code, all of the
tools is really there to manage a lot of
the context and doing really good
context engineering. So, this is a good
uh slash command. All right. So, in
terms of compaction, like if you use
cloud code at all, if you had a long
session, it will start autoco compacting
at some point. All auto compaction does
is just takes your current context
window like context that you created and
then it will just summarize it and then
it does a pretty good job. For my
projects, I usually just let the autoco
compaction work. But if you really want
to compact what you have right now, you
could just compact. But I I rarely use
this. The only time I use this is if I
want to save some version of my context
into like my local like second brain. If
you haven't seen that video, go and
check it out. But I have this second
brain concept when I work on projects
and that's where that goes. So for
slashmodels, this is like very useful. I
think if you have unlimited tokens, like
if you're doing this at work, for me, I
usually just uh default it to Opus 4.5,
but if you're very like cost sensitive
and you know certain workflows work well
in Sonnet or like I coup, then you could
just go and change that. Um, keeping at
default is fine too, but I would try to
use Opus as much as possible. All right,
so slashresentally
like lost your instance. Let's say you
created another one and then you
accidentally killed it or something like
that, right? Oh, you killed the wrong
one or something. Then when you go back
into claw code, you could do slash
resume
like so. And then it'll give you kind of
the old context and then you could like
recover your context so that you don't
lose the all the work that you did in
building up that context window. All
right. slashmcp is really about um
showing the MCPS that you have
installed. If I have to be honest, I try
very very hard to not use MCPS because I
think they blow up your context window.
So I only install ones that are needed
for that very specific project and I try
to just leverage cloud code and write
scripts and like these kind of things
manually like myself to do the
validations and things like that. But
some projects you just do need MCPs like
this Xcode one, you kind of need it. And
for other projects like my Nex.js apps,
I have like a whole set of MCPS for
that. But just be careful with MCPS. But
it's a really fantastic way to teach
Claude how to do certain things,
especially with like third-party
software and things like that. You know,
it's a protocol, right? Model context
protocol. So, it's basically used
everywhere, but again, it's known to
blow up your token usage and your
context window. So just be careful. All
right. So slashhelp is the last thing
I'm going to teach you. You know, teach
a man how to fish. So this like little
wizard here will just teach you what
they are and give you like descriptions
of everything. So just go ahead and like
try these out and just take a look and
you know explore. All right. So the next
thing is around git. So you could ask
cloud code to manage your git. I think
there's a bunch of like skills you could
download to cloud code to manage all
your git. And I think that's something
that you should do. Like I write a lot
of my summaries and test plans all using
like cloud code. Now obviously I have my
own templates that I wrote. So claude
kind of sounds more like me and is not
too verbose and things like that. So I
highly recommend you to use git as a
safety net. There is actually a rewind
feature like I think I told you where
you could restore the code and the
conversation but this is a little
confusing to me like git is just better.
I use this as like a last resort if I
didn't have git for a certain
checkpoint. So now that you know how to
just navigate around cloud code and
things like that and just kind of
highlevel important like commands and
things like that, I think it's a good
time to deep dive into the claw.md file.
I think for most people, most users,
like 80% of users, if you just have a
really good claw.md file for your
project, you could get really, really
far without learning like all the
advanced stuff. Just having a really
good rules file will save you a lot of
headaches. Let's kind of dive a little
bit deep into this. Okay. So, one of the
most important things in the claw.md
files is first of all, it's like it
actually reads top to bottom and it
keeps the priority from top to bottom. I
think that's like a very small nuance.
I'm pretty sure that's true. I think I
read that somewhere, but it Yeah. So,
you want to go top to bottom as like
important to least important. And you
want to add things that are like never
do something, but always do this. and
then have like clear snippets of
examples I think is really good and I
don't have that many on this particular
project because it's stock swift UI but
the context here is that you should
really think about how unique is your
project how many things about your
project is like homegrown and
essentially like the AI may have never
seen like remember a lot of this code is
like basically a lot of the AI like
coding is basically just an accumulation
of like the s code that the AI is
trained on. So, it might not know your
like super special DSL language that you
created or like some random archaic
patterns that your company has. And
that's where you'll be like, "Oh, why is
the AI never doing this?" So, whenever
you run into something like that, you
want to fix it manually and then you
just update your claw.md rules so that
it never does that mistake again. Think
of it as like lint files kind of. And
then when you ask claw to update the
rules, you shouldn't ever do it
manually. You should just go here into
claw and and say, "Hey, can you update
that rule for me so we never do it
again?" Something like that. Like as
simple as that will go and update your
claw.md files. You see how it's trying
to do it? Obviously, there's nothing
that I just did. So, this has nothing to
add, but yeah. Okay. it it added
something that I thought but you get the
point. All right, so this next one is
really around using like keywords to
trigger your skills. So basically I have
these like build commands inside of my
rules. So when I say hey use my Xcode
MCP to build it will try to build the
app for example. Use my Xcode MCP to
build the app.
Okay, my whisper stuff is like failing a
little bit, but maybe it'll get the gist
of it from build the app. And as you can
see, it's it's asking if I can use the
XCO build MCP. So that's kind of the
high level of like using skills and like
trigger words to be able to trigger
certain behavior. This next one is
something called like compound
engineering. That's like kind of a new
term that is being discussed, but it's
essentially to take your claw.md and
start like committing it into the
codebase. Now, obviously, you need to
get rid of anything that's like generic
for your code like file path and things
like that. And you also want to be
mindful of how large this file becomes,
right? Because like I said, every time
someone hits claude in that directory or
claude is trying to read that directory,
it will load that claw.md file. So you
don't want to blow up other people's
context windows. So you really want to
be have this be like a high bar when
you're committing it. But the nice thing
is once that's in, you essentially make
that AI coding experience better for
your teammates. But you just need to
make sure that whatever you're landing
is actually helping. There's a lot of
school of thoughts around this right
now. I don't think it's like completely
solved, but there's got to be some form
of evaluations here. And a lot of people
are just using like vibes. So, you just
like test it for like a few weeks and
then you just try to land it and then
ask for feedback essentially. So,
dangerously skip is essentially like
claw code in yolo mode. Um, you know,
like just basically if you use claw
code, it will ask you to accept a bunch
of stuff. It could get really annoying.
So a lot of people they use you know
claude and then dash dangerously skip.
Okay. So it's dash dangerously skip
permissions. And when you run this cloud
code will no longer ask you essentially
to accept that. I think it will
completely just ignore it except for
like anything you put into your slash
permissions which we'll talk about. But
you only really want to do this in in
environments that you can kind of throw
away and you're doing specific work that
is not like super dangerous. Like if
you're going to start touching the OS
and stuff like that, you could really
