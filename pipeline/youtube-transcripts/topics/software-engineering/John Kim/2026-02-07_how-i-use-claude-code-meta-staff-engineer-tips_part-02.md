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
word_count: 3995
chunk: 2
total_chunks: 3
parent_video_id: "mZzhfPle9QU"
---
mess it up. I've messed up some of my
Linux machines because I was just going
too aggressive and I was just testing it
out and I was trying to set up some of
my Linux stuff using claw code and then
like I had to reflash the entire thing.
Like I said, you can use
slashpermissions here to kind of like uh
tell which ones are like you still want
to accept. So it does, you know, like
rm-rf or something like don't do that or
Yeah, just like mutations like just be
careful with mutations like deletion
mutations, right? Um, all right. The
next big one I think now that we talked
a little bit about the cloudmd rule
files, I think we should talk about
workflows because I have a very specific
way I like to work and I've actually
refactored my entire work so that it's
works with cloud code. You know, I used
to use cursor or like Android Studios
mostly and VS Code to do a lot of coding
and stuff like that. But I dropped
basically all of that and I use just
iTerms. Now, um, some people use
obviously Vim, but I think iTerms is
fine. So, I'm going to show you guys a
few things. So,
like I said, I always start with plan
mode. Let's go and like plan like a
little feature for this Pomodoro app
that I've been like kind of working on.
I don't know. I actually need to remove
a bunch of audio stuff. So, let's just
say audit my codebase and make sure that
we're removing all of the audio playback
and references to the audio of part of
the Pomodoro app. I'll always start with
plan mode and I'm like iterating with
Claude code. I'm arguing with it. I'm
having a conversation with it. You know,
Cloud Code, you're so beautiful. You're
so amazing. [laughter] No, but like I'm
really treating it as like another like
just good engineer that I'm like working
with and I never just like purely accept
the first answers that it gives to me. I
always kind of challenging it and I
spend a lot of time and put a lot of
effort at this stage of the development
because I feel like once cloud code
builds up that context and have good
execution specs, the generation of the
code is actually the easy part. And I I
do want to take a moment and talk about
like kind of the news cycle about people
saying, "Oh, like people are no longer
writing code." I think like the creator
of NO.js said like the era of like
people writing code by hand is
essentially over. And I actually truly
believe that. And the thing is I love
like being in the zone and writing code.
At least I used to. The thing is it's
really hard to get back into that mode.
It's like very different levels of
abstractions of the way you're working.
And right now I'm just doing one
instance of it. But you could imagine um
just having like multiple clawed
instances like this and and and then
you're just actively working on a bunch
of different things at the same time
because you have this like new
superpower. The new next level of
engineering is really like jumping
between clawed instances and and really
context engineering that instance and
then getting it good enough to start
executing. And I keep talking about this
like context, right? And this tip is
really around like fresh context beats
like bloated context. I think I kind of
cover this throughout this, but that's
why you want to start with plan mode.
make sure it's good and then just go and
execute instead of like having a bunch
of like try this and then try that and
then try this and then try that. Like
that will just bloat that context and
then the AI will get really confused at
some point because it it can't remember
what what part of what was good and not
good. So that's why you want to spend
the time in the beginning building up
the good context. have a good plan dog.
So, it always has something that
initially was good to reference and then
it builds little by little. All right.
So, this next one is really around um
persisting that context. Uh I have a
full video on this about like the second
brain concept. So, I'll link it here.
But the idea here is that let's say you
finished something, you could just say
save this to my local claw.md in my
projects directory. Save the work that
we just did. So you you could say
something like that and then um I I
essentially have a full workflow for
this to manage this. But yeah, you could
do that load my context from my local
projects. So once you have that second
brain concept, you could say a command
like this and it will pull that context
and then load it for your new session.
So here's a good example. I like to do a
lot of my todos inside of cloud code
itself. These are kind of the highle
things that I still need to do for this
next feature that I'm working on. So I'm
like working on a widget for this
Pomodoro app and I have like a live
activity for example and I'm also like
deleting all the music stuff because I
don't think it adds value. So I have a
bunch of stuff that I'm tracking but
because I keep all the to-dos in my
local index like that I'm lazy loading.
I don't always load it. I only lazy load
it when I ask for it. It allows me to
like context switch from project to
project without like carrying around
like complex I don't know a sauna boards
or whatever. I just keep it all in here
and it's this is this works because it's
my own project. But you can technically
do this with like an MCP with a sauna or
I don't know Jira or whatever as long as
you can whatever project management that
you can think of. All right. So, I think
we covered this a little bit, but really
think about the build cycle. Like,
obviously, if you're mobile, think about
Xcode, building the Xcode, but there's a
lot of other workflows that you could
think of. Like, for example, you could
ask Cloud Code to like let's say you're
debugging something that's like kind of
tricky, has like race conditions or
things like that. You could ask Cloud
Code to like add debug logs for example,
and then run the app and then have Cloud
Code control the emulator. You could
just ask it to do that and then like do
the actions that you're trying to do and
then read the logs through a tail log or
something and then debug that way. Or
you could use like peretto or something
like that. So for kind of performance
things you could hook into peretto mcps
do a run and then have it read the
traces and then see if it can find jenk
just from like the timings, right?
There's just so many validation loops
that you could think of. Like for web,
you could do like puppeteer and have
claude navigate it using a /chrome
command and then just actually do the
navigation or have it write just test or
have like integration end to end
integration test. You know, there's
there's a lot of things that clock could
do and it really is up to your
imagination, but it's the single most
important thing in my opinion if you
want to have a more automated loop that
like generates good code on like the
first try. So going back to the
slashmodels really just consider using
Opus if you can afford it. It's just the
best way. All of these are a little bit
slower but because the way I work is I
have multiple cloud instances. Obviously
it's like very small right in here but I
have multiple cloud instances running at
all times and then the way I work is
basically just juggling these cloud
instances. So even if one of them takes
a long time, it doesn't matter because
I'm like I gave the command and I go to
the next one. I'm building the context.
I give a command and I go to the other
one and then I give a command. So So
like you end up like still can get into
the zone, but it's like a different
style. So, I talked a little bit about
interrupting earlier, but you really
want to like look out for like
assumptions or the key words are like,
"Oh, I'm not really sure." Or you'll see
like errors happening. I'm having a hard
time like getting it to do this in this
example, but um just just know that like
when you go and look for the best ways
to delete an app. I don't know.
[laughter]
I I'm just giving it a random prompt to
try to make it go off course. But if you
see it going and making assumptions
about certain things, okay, this time it
didn't even really because it's just
new. But you should just interrupt it
like that, you know, and then and then
just course correct it. So don't worry
about course correcting. Okay, so the
next section is around power users. I I
don't really like to say power users,
but most people that I've talked to
don't really know like the differences
between a slash command or a skill.
They're they're kind of interchangeable
now. And MCPs, sub aents, you know, post
hooks, pre- hooks, like these kind of
primitives that cloud code is like known
for and kind of like invented. And we're
going to cover some of that and and how
this these are all like composable in
nature. Okay, so I call it the
composability framework, but it's I just
really wanted to highlight that these
are composable more than anything. But
there's four primitive like composable
things. All the slash commands are
technically composable with each other,
not directly each other, but anyways, so
we're going to just go over the fact
that like how these are composable.
Okay, so let's first talk about skills.
All a skill is is like you do a
workflow. So let's say that um I tell
claude go and fetch hacker news for
latest iOS news.
So let's say I tell it to go and fetch
hacker news for the latest iOS news and
then and then I tell it to save that.
Okay. and then save um a summary to my
local
uh claude.md
claw directory.
Okay, I misspelled that. But basically,
let's say that it went and found some
and then it's save it into my local
directory. Let's say I wanted to build a
skill around that. So, you just saw me
do two things. One is fetch something
from a source like hackernews and then
save that thing to my local directory.
That's technically a workflow. So all
you have to say do is save what we just
did into a new skill called fetch
hackernews. And that's basically it to
create a skill. It's basically a
recurring workflow that you can just
tell Claude to remember. And behind the
scenes, it's actually just an MD file as
you can see right here. Oops. And as you
can see here, it's literally just a
system prompt. It's an MD file, but
Claude has specific directories that is
looking for skills and will be able to
infer this next time I say go fetch
something from hackernews or use my
hackernew skill to fetch articles. Yeah.
And then commands is basically now
interchangeable. It's it's a pretty
recent change, but you can see that um
skills is written into the skills
documentary and it there's also now a
slash command called slashfetch
hackernews. This is a very recent change
from anthropic where they kind of like
combined uh commands and skills. But
yeah, so now you can just do slhacker
news and then now it'll rerun that
system prompt. For example, it added
like an additional like assumption
thing. That's pretty cool. It's not
exactly what I did, but it kind of
inferred that I would probably want
that. So, those are the little cool
things. And the thing is you could
update these anytime you want. You know,
you could just ask clot to do do
something else.
All right. So, like I said, you never
want to manually create these kind of
stuff. You want to get in the habit of
asking Claude to update and manage these
skills. So we could say why don't you
extend this fetch hacker news to fetch
Twitter or Apple news for example. Now
sometimes it won't work 100% exactly
right. Okay. So you see this it doesn't
have Twitter authentication access. So
it's trying to just do some other ways.
Yeah. Multiple sources. So you can see
how it's all updating that system
problem that we wrote, right? and then
fetch hacker news and so forth. You you
get the idea. All right. So, MCPs, I
think we covered it a little bit during
the the rules, but basically MCPs, you
just want to find MCPS like this, right?
Like they're just model contextes. But
kind of a hack is like you don't
actually need to search the web for an
MCP. You could just be like, "Find me a
good Figma MCP." you could just ask
Claude to find it for you and then most
of the time it does a good job. The only
thing is like uh sometimes it's outdated
so it'll it'll like know of one that's
like was popular a little while ago
rather than doing a web search. So you
just have to be mindful and that's why
I'm saying like for certain actions you
want to read how what it's doing and
look at the thinking and then cancel it
if you want to. And you could have
Claude also install the MCP. So you
don't have to like manage like the
configs and stuff yourself like you had
to with cursor. Yeah. So you could ask
Claude to install the MCPS. So like
right here it says go and do this,
right? But instead I could just be like
why don't you just install this for me
for example? And then it will just go
and install it for you. All right. So in
terms of sub agents, I don't know if I
have one for this. I might have like
an iOS I might have one like an iOS like
context scattering or like architecture
agent. Let me try it. So spawn a iOS
architecture
agent sub agent and do some
investigation on and on my codebase and
see if it's actually good or not.
Um, so you can build sub agents just
like you can with uh slash commands and
skills. All you do is just ask it to
make a sub agent after you do the work
once. The main reason why you want to
create a sub agent is really to do
parallel work, but also it's to protect
your context window. So like I said, one
of the key features of cloud code is to
manage your context and do context
engineering. And sub agent is a huge
way. And I think a lot of people are
using sub aents incorrectly because they
do things like this where you have like
an iOS sub agent, right? By the way,
it's not triggering the sub agent. I'll
just make one after it creates it and
show you guys what it looks like. It
like highlights it in like a different
color. But a lot of them have this like
workflow where they'll tell it to go do
something that does the context
gathering and then they ask to like
bring it back but that part that portion
of the context that's bring brings back
from the sub agent it's only like the
output it's not like how it got there so
it doesn't have the full context. So for
those kind of works I usually just keep
it within the context window because
those are the things that are really
good. use what we just did to create a
iOS architecture sub agent. But yeah, so
so often times people mistake that you
want to like have a validator agent, you
want to have like a testing agent and
all these kind of things. But I try to
keep the all the things that need that
context to do its work within the same
cloud code session because like a good
testing agent needs to know about the
code that it wrote most of the time. in
my opinion. Of course, sometimes things
could live in isolation. So, what are
really good things for sub agents is
really just like things that are atomic
in nature that you want to just have it
run as side effects and just go and do.
But yeah, so that's what I use sub
agents for. I don't use sub agents that
often. I know some people like love
using them, but one of the most common
like clowny kind of use cases that I've
seen is like CEO agent, product agent,
design agent, and stuff like that. And I
don't really believe in that particular
workflow. Like you really want to have
this concept of bringing the work to the
context rather than trying to spread out
the context that's gets created. All
right. So, and this kind of ties into it
like you want to avoid like having a lot
of instructions and overloading the
context all the time. You want to keep
your context condensed and fresh. So
that watch my video on the second brain
and you like that's it'll teach you a
lot about like lazy loading and then
having this like ongoing project domain
thing that builds over time and you want
to essentially use that as your rag
system to build like a good context and
then be able to just have fresh and good
context all the time for your AI to
execute on. All right. So, here is some
interesting like advanced workflows. And
I really think that the big game changer
in my opinion for cloud code and why I
think cloud code is just so amazing is
that you can do a lot of parallel
development. This is why I had to like
fully change how I work using like
terminal and stuff because you could run
multiple instances. And I already kind
of showed you guys this, but you could
just swap between these and just have
like multiple things running at the same
time. So I could say start working on my
live activities feature. So I could just
have that. Obviously I would do it in
plan mode, but I'm just showing you
guys. And then over here I could just
say all right let's test out this iOS
architecture and and then just spawn a
sub agent. So as you can see I'm doing
some investigation on one side and then
I'm doing live code editing. But the
thing is I could always just create
another one go to like a different
project like this and then now I could
be saying hey I want to work on a new
newsletter
for example. So I could be doing a bunch
of stuff all at the same time. So that's
like a really so understanding how to
juggle this and doing it effectively I
think is like the next step function
change and I just want to kind of shout
out it terms I think it's like really
good um because you know you could do
command D to create new instances like
this right and then you could juggle
between uh the terminals using command
um uh the left bracket and right bracket
like ignore this like slash it's like
I'm just saying, oh, it's left bracket
or right bracket like slash, right? But
yeah, so and you could do that. You
could also, if you have multiple tabs
like this, you can actually swap between
it. And at work, what I do is I rename
like what I'm doing in here. Like I'll
say local and maybe here I'll say like
remote SSH or something like that. And
then from the remote SSH, I could have
claude like running like this. And I
could spawn a more, you know, and then
and then I could just be going back and
forth here. So, it really feels like I'm
playing Starcraft to some degree, right?
And all of these I'm just doing with uh
my keyboard. And when I'm home, I'll
just like be in Whisper using Whisper,
which is like this voice little thing
that you see right here. And it just
translates speech to text really
quickly. Sometimes it's not that
accurate, but so I'm just like switching
switching and I'm just basically talking
to it, you know, just literally working
as in multiple projects all at the same
time. I think my bottleneck right now is
really how much context switching I can
do in my head. So yeah, another thing is
enabling notifications. You could tell
clock code to change the notifications,
right? Uh you could just say change the
notification to ring a little sound when
you finish execution, for example. And
then when is now it will basically ring
like a little notification and you could
do a lot of things. At one point I had
like um text to speech where it like
reads a summary of uh one of wherever it
finish it will read a summary. So I
could be like okay I got to go back to
tab two and then go do something. Um but
that was too much so I disabled it. Gig
work trees is another way to do multiple
code execution. So, one of the
bottlenecks that you'll see is if you
have these kind of like bunch of
multiple instances, you'll soon realize
if you're doing local development, you
won't be able to make code edits the
same project unless you use git work
trees. And I'll add some descriptions on
how to use git work trees. But
basically, it's it's a way to like clone
multiple instances of your codebase and
have like different forking branches.
So, you could have like you could work
on like code like executions in the same
project. Uh, slashchrome is actually a
