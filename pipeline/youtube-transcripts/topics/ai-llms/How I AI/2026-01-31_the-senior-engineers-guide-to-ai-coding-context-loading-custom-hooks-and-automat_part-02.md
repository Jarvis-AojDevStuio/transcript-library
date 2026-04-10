---
video_id: "LvLdNkgO-N0"
title: "The senior engineer's guide to AI coding: Context loading, custom hooks, and automation"
channel: "How I AI"
topic: "ai-llms"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=LvLdNkgO-N0"
word_count: 4000
chunk: 2
total_chunks: 3
parent_video_id: "LvLdNkgO-N0"
---
and go ahead and generate it. And this
is the sort of thing where um kind of
beyond
beyond the simple alias if you uh if
you've never dived into creating what's
called a CLI you can tell an AI like
listen I want to use like this is a
wrapper around um Gemini
where it will execute Gemini with
specific prompts. So you have to
remember that you have these tools on
your desktop which can do incredible
things but you can also script them and
this is a scripted way of generated
generating images based on all of these
um all these topics with or these
concepts with pre-loaded prompts and I
can say if I want to add another feature
like you can just go in there and say
please tweak the prompts or please add
this feature please do this and then
instead of um
constantly thinking of oh what was that
prompt again or was that idea I had. You
can have these little CLIs and these
little projects that are be just for
you. Um because you just like build the
tools that you need now. And um this is
just spitting out these um my my mom
lives with me and she's setting up
Christmas decorations upstairs. This is
why I'm thinking about this.
&gt;&gt; So this
&gt;&gt; Yeah, this is Gemini generating based on
the prompt we fed in based on the color
scheme. This is GitHub light Christmas
store color theme. Um, and I told it to
generate five variations of it. And then
we could take one of these images and
drop it into one of the um, drop it into
one of the AIS and say, "Let's start
building out this website. Let's break
this into sections and go from there."
And this is kind of like my uh, ideation
inspiration sort of thing that that I
use.
One reason I want to make sure people
are paying attention to this use case
which is essentially you've exposed a
command line interface to do a couple
you know script a couple workflows
around calling um nanobanana and some of
the Gemini models to um
&gt;&gt; to to do some things and there are two
benefits I think to this that are really
important. One is
building command line tools has been so
opaque and just kind of not fun for so
many people for so long. Um I've built
lots of them and how easy it is to build
a really nice command line tool is such
a treat for anybody who's ever had to
build them and make them look good.
Everybody has these cool ASKY only logos
if in their in their command line tools
which have been very tedious to make
before. So I think one thing is these
tools are just a lot easier to build.
Two, from a product builder perspective,
the reason why I like this move to these
command line tools is the constrained UI
space of the terminal actually make sure
you don't get distracted in building UI
around something as simple as this.
Right? You just had like five questions
you had to answer, a couple multi
select. You could tab through those with
your keyboard. If you were creating like
a little wizzywig walkth through web
editor thing here, I mean, one, I would
have gotten really distracted about how
it looks. Yeah.
&gt;&gt; Two, you'd have to type into, you know,
you'd have to run localhost and type
into um your your your web browser. And
so, I actually like the constrained UI
space for speed of of prototyping on
some of these ideas because you just
don't get distracted by anything but the
essential kind of toolkit. Um, and then
you can get a really cool thing out the
other end.
&gt;&gt; My only problem is I've built more tools
than I can remember and sometimes
&gt;&gt; after like where was that thing? Um,
&gt;&gt; yeah. I uh I also like what you how you
started this this little segment which
is you said you just build every idea
you have. I think that is totally the
move. While you have an idea, kick off
something, get it built, build yourself
a little throwaway repo. Um, you know,
eventually the AI can crawl it and
remind you everything that you built
before, but this is pretty cool.
&gt;&gt; And that's that's why I love dictation
because all you have to do is start up a
new terminal in a new folder and just
kind of brain dump in there and then
it'll try something and once you have
something even if it's wrong, you can
iterate on it. Yeah.
&gt;&gt; If you have nothing, you can't iterate
on nothing. And I think that's the magic
of uh even for people who who hate AI
tools. Like a sheet of paper full of
things that are wrong is much better
than a blank than than nothing because
even if it's wrong, you you recognize
it's wrong and it helps you think of
what's right and what you want to build.
&gt;&gt; Yeah, I say this a lot. It's easier to
edit than author. So, let's get the
authoring out of the way and then even
if you completely revise the whole
thing, it's a much easier starting
sprouting point to work with something.
&gt;&gt; Y
&gt;&gt; Okay. So, I think we're going to close
out and spend uh a little bit of time on
your workflow for when you're doing more
complex coding projects or features, how
you keep those really high quality using
some advanced techniques in um I think
in cloud code and cursor. So when
working on any excuse me when working on
any project um often when the AI is
generating code it'll often build out
mistakes and so even it will say it's
done you're like wait a second there
were a ton of mistakes there why did you
stop just fix it until the mistakes are
done so for example um let's say it
wrote out this code and there was this
error in here and this error is
something you'd usually catch with tools
such as TypeScript uh or maybe it's
formatting or linting or any sort of
complexity tools um that
they're code quality tools that you run
before before you think the work is
done. So you would run something like
bun type check and you would see that it
has this error but your uh claude code
and the other agents don't know that
this error exists. What Claude has and
what cursor cursor and a few others have
is the concept of hooks.
And what this can do is so inside of
claw, let's go here.
You can set up what are called hooks.
And um [snorts] I'm going to set what's
called a stop hook
and hit add new hook. And just it shows
you a bunch of examples. I'm accepting
responsibility for all this. Bunch of
warnings because it can run scripts that
aren't checked by the AI.
And I'm going to say the command for now
is just be echo, which does nothing. And
I'm going to add it to my project local
settings. And now we have this echo
hook. And this is defined
in this settings local uh.json file. And
this is for uh this is a local file for
me. If you want it to be with your team,
it' be settings.json settings.lojson is
distribute. What we're going to do is
instead of running this command,
we're going to run a custom uh claw
claude hook which I've defined inside of
claude hooks. Uh and I called it index
index.ts. You could call it stop or
whatever. So from this script which is
in this directory um I need to run this
uh install for this package because I
don't have it installed right now. So
I'm going to bun install and propic and
this is their um their clawed agent SDK.
Now in the SDK they have um what are
called hook inputs and other types you
can use so that when you're dealing with
hooks you have a lot more information.
So like on this input you have all of
this information around what the input
name is and then what the session ID is
and the current working directory
permission mode and all that and you can
use that to customize your hook. But
we're gonna but what we are going to
focus on is we're going to see step one
were their files changed uh when we
stopped. And a stop is once uh Claude
has kind of finished its conversation
and it's now waiting for you to do
something. So we're going to check are
there files changed? And we're going to
if there's files changed we're going to
say okay then let's go ahead and run
that bun type check. And if there is a
type check then we can say back to
claude we can say hey there were
typescript errors this is the report and
then send them back the output that we
showed in the terminal before and it'll
continue. Otherwise, if there were files
changed, then we can tell Claude to
please, there's a prompt way down here.
It says, "Please commit essentially. Uh,
get the files, don't commit anything,
anything sensitive, and go ahead and
commit it." So, we set up this workflow
of once a conversation is finished,
check to see if any files have changed.
If they have, you check to see if
there's any TypeScript errors, which
could be a type check or build errors or
any sort of other um code quality uh
guards you have in place. And if there
are none, then go ahead and commit. And
this saves you a lot of the overhead in
your mind of uh here's all this extra
stuff I have to do once something's
done.
&gt;&gt; Yeah. And what I want to call out for
folks that are maybe listening and not
seeing this code here is it's really
what's nice about this is it's a
combination of commands that you would
run in the terminal to to just generate
errors and see them yourselves, but then
you can feed those back into clawed code
in a more natural language way and give
natural language instructions on what to
fix or again default to some command um
that's different which is this GitHub
commit command. And so I like this
combination of kind of like structured
commands in in the terminal combined
with natural language calls back into CL
claude to then kind of put the bow on
the end of any work that this AI system
does. Is that kind of how you think
about it?
&gt;&gt; Yeah, exactly. um that the gotchas you
have to think about here are when you're
uh when you're communicating from a hook
back to Claude, you're essentially using
console log, which is one of the first
things any JavaScript developer learns
and you're sending back a JSON object.
So, it's going to find that first
console log and whatever gets back,
uh that's what it's going to see as its
uh as its input, its standard input.
So you have to be careful if you're
running commands like this. You you tell
this one, please be quiet because if
it's not quiet, then it would log back
to the console and maybe interfere with
something. Or if you want other logs or
you're debugging the script, just use
console error or any other way of
showing logs. Um otherwise, console log
turn it turns into this feeding
instructions back to the agent. So, it's
one of those gotchas that everyone falls
into when when building this out. Uh,
and just to just to demo it real quick,
um, I'll just turn on Claude
and I'll say um well, actually for this
to work correctly,
let's make sure we have everything
staged and set up so that when it does
the get check,
um, let's just generate a message.
So yeah, let's uh please create a fu.ts
file on the root of the project.
And we'll go ahead and accept this.
And you'll see that it says stop hook
returned a blocking error. And that
error returns, please fix the TypeScript
errors. And here's our prompt right here
with this block. And it says I I'll fix
a TypeScript error. So this is when it
would have stopped. It would have
stopped right here. But we hit the stop
hook. Now it sees these errors. So it's
going to go ahead and read that and
says, "Oh, I found the mismatch quote. I
fixed it." And now behind the scenes
there's a cloud running which should it
commit that fix. You make this a bit
smaller. Show our graph here. And you'll
see um this is the fix that it made was
correct the quote syntax. This is what
the little ha coup did in the
background. So the stop hook ran twice.
It ran once where it found the error and
had files changed. And then the second
time there were no more errors and so it
ran the commit. And so that saved us all
of that work of both passes. And now we
have a completed task
that has been error checked, fixed, and
then commit um and conditionally
enscripted in a way where this will be
different for every single project based
on your requirements, based on your
codebase. Um, so this is definitely
something that you have to like think
through and set up yourself. It
definitely saves so much time where you
don't have to go back in and say, "Well,
please fix this or please run this
command or please do this." When you
know part of your workflow is always the
like if these things should always run,
you might as well run them
automatically.
&gt;&gt; And something I have to say is I get so
much push back from software engineers
saying these tools don't really make me
faster. The quality isn't as good. And I
think if you make the investment as
you've shown us in, okay, well, what
things would it do to make the quality
better or what things would it do that
you can automate that would make you a
little bit faster? And you put that
effort in to understanding all the
things that these um tools can do for
you either programmatically
or through prompting. I think you can
actually see a lot of those
efficiencies. And then I want to call
out something that that you said which
is you have this local settings but you
can create settings that are shared
across your team for anybody that's
working in the repo and that's for our
engineering leaders out there or larger
engineering teams to really think about
if you haven't created these hooks for
key repos or key projects where
everybody is benefiting from this when
they're using something like clawed code
then you're missing out on some of the
scaled leverage I think of of these
tools. And so I'd love to put somebody
in charge in an engineering organization
of figuring how stuff like this can work
inside your codebase and then scaling it
out either through training or through
configuration
into all the other engineers so that
everybody's getting this baseline
quality and this baseline efficiency.
&gt;&gt; Yeah.
&gt;&gt; Amazing. Well, okay. Other than you know
type T type script errors, just pratt
off a couple other use cases. You
deleted a bunch of stuff from this hook.
So, what are the things you think that
people should bake into a stop hook like
this for cloud code?
&gt;&gt; Uh, definitely formatting. Um, I there's
there's kind of the the mindset we've
always had before of like pre-commit
hooks or pre- push hooks, things that
operate on the CI and these are a lot of
things that can be um fixed before those
are even run. So whether it's there's a
lot of tools around um with linting it
it could constrain the length of files
um there's things like uh circular
dependencies where I could check the
imports to make sure that files don't
reference each other um there's code
complexity there's tools that say does
this code look like any other code in
the codebase where um this could be
extracted into a function or something
because there's like duplicate code
throughout the codebase There's all
sorts of analytics and tools you could
run. Um
some of them probably not as often as
others because it's more expensive and
you just have to make those um decisions
based on you know the size of your team,
the size of your application. But
there's just just put into an AI prompt
of chat GBT or any of them to say what
are all make a long list of uh developer
tools people run on pre- push or uh on
pre-commit and you'll see the a huge
list of them that you could uh pick and
choose from. Well, and I'm going to take
a tiny detour for um our very patient
non-technical audience members that have
maybe listened to this, which is these
um posttool call hooks or post stop
hooks in Claude can also be used when
you're working on non-code. So, we have
so many people using claude code to
write documents to do all sorts of
things. And so you could just think
about what do I want automated after
this tool is called or what do I want
automated after Claude finishes writing
my my document. And you could think
about ways to use something like this
not even for code quality review just
for a post kind of task completion
check. So I think just the general
framework's really useful. It's
obviously highly applicable to software
development but I think people can think
of other creative use cases for this as
well.
Yeah, absolutely. The the diagramming
stuff, create an image of what we just
did and send it to my mom to show her
I'm working hard. Like anything you
want, right? It's it's the sky's is the
limit. So,
&gt;&gt; okay. So, just to wrap up, these have
been super useful use cases. I want to
call them out. One is using um
documentation and diagramming,
specifically mermaid diagrams to preload
as a system prompt in your claude code
instance so that you don't have to waste
the time of doing context discovery and
you can really make sure that that
context is preloaded. It's a little more
expensive on the token side but a lot
faster and these diagrams are much more
um easily read by machines than by
humans. So, it's a good format to get
things in. We looked at aliasing some of
your favorite Claude code instances and
settings so that you can pop into your
live dangerously mode. You can pop into
your you have all my diagrams mode. Um,
you can just pop into those with one,
you know, one one or two letters, which
I like. Uh, we got a little side preview
that we didn't call out, but just how
casually you use voice and transcription
to enter in and out of these tools. What
I like about the way you use AI is you
were just like highly efficient. You're
like, the minimum number of things I can
type the better and you're pretty fluent
in switching between voice and typing.
So, we saw we saw a little of that. uh
you encouraged us to create in
particular little command line tools to
build one-off ideas or tools. Yours was
a website design generator using Nano
Banana. And then you showed us how to
use um claude hooks and in particular a
stop hook to do some quality and other
checks on code written by these AI tools
and automate some of the processes um
that you might do as a software engineer
that you want our little AI software
engineers to do instead.
&gt;&gt; Just that in I'm looking 40 minutes. We
did it pretty fast.
&gt;&gt; Nice.
&gt;&gt; This is great. Okay. Well, I'm going to
ask you a couple lightning round
questions and then we will get you back
to your very efficient AI coding. My
first question again, you're like me. We
love cursor, we love Claude, we love VS
Code. We have all of them open. You
know, I think everybody's I think
there's interface wars happening right
now. Are are people going to love these
terminal UIs and command line tools like
Claude Code? Do people want the the IDE?
I I noticed that you're on cursor 20, so
you have the agents view, which is very
simple and abstracts away some of the
code, and you're in the editor view. I'm
going to give you two two wars. I wanted
your quick opinion right now. We won't
hold you to it, of what you think wins
for, I would say real software
engineers, you know, writing real code
out there. um the the friends that I
talk to,
you know, terminal UI, IDE or both. And
then do you do do you have any
hypothesis on I think particular in the
the VS fork world, VS Code fork world,
are there any modes or you know what do
you think how do you think people can
compete in the IDE world?
&gt;&gt; Yeah, so I think you need both. I think
you need an IDE and there are so many
use cases for the CLIs. Uh the reason
being that the CLIs have a lot of
configuration and a lot of settings
where um as you saw with the aliases, I
could launch a version of cloud that
loaded up a specific set of MCPS or a
specific set of prompts and preload a
bunch of things and do that in a single
terminal command and be very um quick
and fast with that and then set it off
in the background and just have it
running. Um, currently inside of uh
inside of a cursor or inside of any of
these um idees, there's usually a lot of
okay, open the UI, navigate to this, and
then navigate that, then switch over to
this, then switch over to that. Um, and
they try and streamline as much as
possible with slash commands and
whatnot. Um, but it's just not quite the
same. But if you have an IDE and you're
reading through the files and you're
selecting lines and you want to modify
certain bits like focused work, um
