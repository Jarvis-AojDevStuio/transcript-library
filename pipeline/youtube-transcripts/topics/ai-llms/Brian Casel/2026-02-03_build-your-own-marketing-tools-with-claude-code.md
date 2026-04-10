---
video_id: "9pIMaCbPc0Q"
title: "Build your own marketing tools with Claude Code"
channel: "Brian Casel"
topic: "ai-llms"
published_date: "2026-02-03"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=9pIMaCbPc0Q"
duration: 1204
word_count: 4494
---
And I'm so lazy now that I will make it
type things I know how to do. Like I
[laughter] I don't like how do I
&gt;&gt; totally like this this came up. What if
you can use your builder skills to
create marketing tools that actually
work the way you want? That's what my
friend Colleen Schnettler is doing.
She's a Ruby on Rails developer who got
so frustrated with generic AI powered
LinkedIn tools that she built her own in
two days. That's the kind of leverage we
have as builders right now. So Colleen
joined me for this episode of Builder
Stories. It's a series here on the
channel where fellow builders show us
how they're building with AI. So,
Colleen has worked at ClickFunnels.
She's shipped countless side projects.
She runs a SAS called Simple File
Upload. And now she's launching a new
technical marketing consulting business
that leverages AI in a really
interesting way, which you'll hear
about. What makes Colleen interesting is
she's building her own tools for that
consulting practice, and she's tried
every AI powered LinkedIn tool on the
market. She's hated them all and decided
to just build her own in two days. So
today she's going to show us that voice
toote LinkedIn system and how she uses
the compound engineering framework from
every to plan and build features and her
process for reviewing AI generated code
because she still doesn't trust it
completely. By the way, if you're new to
the channel, I'm Brian Castle. I help
builders stay ahead in this AI
transition and I send a weekly
newsletter called the builder briefing.
5 minutes every Friday on what's working
right now. You can grab yours for free
by going to buildermethods.com. All
right, let's get into it.
&gt;&gt; Yeah, so I started I'm one of those
people who taught myself how to code
nights and weekends while working a
decidedly mediocre job in a different
field. And so I'm you know I learned to
code I guess what is now the
oldfashioned way which was blogs and
tutorials and just trying things to see
what worked. But I didn't get into kind
of the maker or builder space until a
few years ago. I kind of worked at a
very traditional Ruby on Rails job for
the first half of my software career.
&gt;&gt; Okay, cool. I mean, when I was first
learning to code, I always felt like I I
wasn't a true develop. I I started out
as an employed front-end developer,
HTML, CSS, and design stuff, but then
later on once I learned Ruby on Rails, I
was never actually hired anywhere. So, I
always felt like sort of like a hack
when I'm like building [laughter] with
with Ruby on Rails, you know. But that's
so so you know you come from the Rails
background and you and you did that
professionally for for a while. Uh can
you take it like maybe a little bit more
like history of like what kind of like
products did you work on? What what kind
of businesses were you in over the over
the years?
&gt;&gt; Yeah, so I started as an independent
developer and I worked for a very small
consultancy and at the time we were
pretty um we had a niche kind of in the
academic space. So we were building apps
for academics like like very specific
things for the research things like that
and turns out they don't typically have
a ton of money so that was kind of a
rocky place to be [laughter]
and then I started working for a company
that does a very cruddy they did a very
cruddy scheduling app small company
great team great company but it was very
like kind of by the book I don't I don't
know I mean I don't want to say boring
but boring is the word I'm looking
[laughter] for. I was
&gt;&gt; I mean that's sort of like the nature of
of Ruby on Rails too, right? It's like
that's the whole point, right? Very
conventional, right?
&gt;&gt; Yeah.
&gt;&gt; Yeah. Cool.
&gt;&gt; So, I did that and then I did I worked
for Clickfunnels for a while, which was
very exciting because we were rebuilding
that. Yeah. We were rebuilding the
product. So that was a whole very that
was a very exciting time and that still
all of that was before we were really
hit with AI and then I always really I
mean the dream of software to me the
whole reason I got into software was to
have outsized results
&gt;&gt; was to I mean you can't it it was to
build something like bigger than me
bigger than trading my time for money
like that was the whole reason from the
beginning I got into this field
&gt;&gt; and so I have shipped so so many side
projects over the years, but I think
that's really where my heart is is like
building a product that I can turn into
a business.
&gt;&gt; So, Colleen, like many of us, have tried
all the paid AI LinkedIn tools and hated
every single one of them. Too generic,
too robotic. So, she's building her own.
So, the idea is simple. She captures
ideas throughout the day as voice notes
using Super Whisper. Her custom app
watches that folder, reads the
transcripts, and generates LinkedIn
posts automatically. So, watch how she's
turned a morning podcast insight into a
draft post in seconds.
&gt;&gt; Yes. So, let me give you a little
context. I am going to be doing a lot of
LinkedIn, a big LinkedIn push for my new
consulting business shortly. And so, I
have tried all the paid AI LinkedIn
tools and I hate them all. So, I'm just
going to build my own cuz I'm a
developer so I can do that. So, what I'm
working on right now is I am building
something. I use Super Whisper. Hello,
Super Whisper. like so. And um
&gt;&gt; I've been going back and forth super
whisper and whisper flow. I just
switched back to Whisper Flow. I don't
know. I don't know why I just keep
&gt;&gt; um you know that goes into my you know
my file system somewhere. And so I'm
building this system that will basically
check that folder for new voice notes.
And then you can see this generate right
here. Generate new LinkedIn posts from
my voice notes from my local machine.
And I like that because that's just easy
for me to go like voice to LinkedIn. All
of this I I've built with like with
Claude. Um so I'm literally working on
this right now.
&gt;&gt; Okay. I mean I I definitely want to like
break apart your whole workflow of how
you build, but I I want to just hear
about this tool because I I I [laughter]
think I want to use it. Um
&gt;&gt; so yeah, like just tell tell us about
this tool. So So voice note and I'm
imagining just like any new idea that
that comes up. I was act I was just
thinking about this for myself recently.
I was like I have all these ideas for
like tweets or LinkedIn posts like
throughout the day and I'm usually just
too lazy to actually go and post it.
&gt;&gt; Exactly.
&gt;&gt; So is that the idea like you can just
collect all these ideas maybe you'll end
up publishing like 20% of them but
&gt;&gt; Exactly. So if you look at So perfect
way to That's exactly right. So here's a
perfect example. This is like a real
thing that happened to me. Someone this
morning in Slack because I have all my
founder friends in Slack sent me this
snippet from Lenny's podcast with Molly
Graham. I don't know if you you listen
to it or into it. So, I made this voice
note as I'm responding to him. I just
voice noted it and I said, "I'm obsessed
with this new podcast." In the first 8
minutes, Molly Graham says things like,
"I only do jobs I'm highly unqualified
for." And so, I kind of captured my
thoughts cuz that's very, you know, I'm
like, "Oh, this is something I want to
talk about because this is how I work
and this has worked so well for me." And
so, I just captured this, you know, as a
voice note and I know, so it's just a
way to capture, right? So, I captured
it. I know I want to post about it. And
then it automatically made me this
LinkedIn post. And it might be terrible,
right? But it's a first step, right?
It's a way to capture ideas for
LinkedIn.
&gt;&gt; Now, let's look at how Colleen actually
builds features like this. She's using
the compound engineering framework from
every. It's a set of slash commands for
cloud code that creates structured
plans, executes them, and reviews the
results through specialized sub aents.
So, she recently added a full chat
interface to her LinkedIn tool in one
session. So, here's how she actually
planned that.
&gt;&gt; So, I thought I'd show you some things.
So, here's an example of something I did
yesterday. And I want to show you this
because I think this is really cool.
&gt;&gt; So, yesterday I used clawed code to make
this plan and I used Typora. So, this
was the plan.
So, just yesterday I added this add AI
chat window for LinkedIn post editing.
And so this is the plan it made me and
then I executed this plan and I
submitted the PR. So now I want to do a
review of the PR before I merge it into
main.
&gt;&gt; Wait, I I just want to pause here. So
the the plan was was that created
&gt;&gt; in plan mode in cloud code or you just
add ask cloud to like write up a
document?
&gt;&gt; So I use this is where it gets
interesting I think. So, I use
this compound engineering plugin by
every
&gt;&gt; Mhm.
&gt;&gt; and I use their workflows plan. So, all
I did is I added workflowflow plan and I
added kind of I was like, hey, I want to
be able to chat with these LinkedIn
posts because they're not very good the
first time they go through. So, they
create this document. They So, Claude
creates this document
&gt;&gt; as a plan document. So I didn't use plan
mode specifically like I didn't toggle
over to plan mode. I just used the
workflows plan review.
&gt;&gt; Very cool. Nice. Okay. So yeah. So you
have the plan sort of documented there.
&gt;&gt; Yeah. So like what I would do next. So I
documented the plan. I executed the plan
which now we're going to review it.
&gt;&gt; So
&gt;&gt; Oh wait, wait a minute. Wait a minute.
So So I I just want to like step through
it a little bit. So So you you've got
the like how deep was the plan or how
much scope is included in that one plan?
Are we building like one view or a whole
part of the app or what is that?
&gt;&gt; Let's look at it. Okay, I came in and I
asked AI to add LinkedIn post chat. So,
this is what I basically what I gave it
right here. Add a split screen chat
interface to the LinkedIn post show page
where users can discuss and refine their
post with AI assistance. The chat window
appears on the left with the editable
post on the right. So this is this was
my prompt I think almost verbatim.
&gt;&gt; And I mean just looking at that even I
mean even though that happens on like
one screen that that's still pretty
complex, right? Like you're going to
have like a back and forth interaction
with a chat interface and it needs to
like edit something on the right like
that. This is a pretty significant
feature to just build, right?
&gt;&gt; Oh yeah, this is a huge feature to build
in my opinion. So it it got a few things
wrong. So the things that I so I like to
make if I'm going to do a big feature
like this. So adding a chat feature is a
big feature, right? It's not like change
the color of a button or do you know
whatever. So I like to read these plans
and it got a few things wrong the first
time. It's since been edited with the
data model. Um and then it kind of gave
me key design decisions and then it
gives me and then it goes into the
details of how it's actually going to do
it.
&gt;&gt; Nice. So you know you're you're taking
like a very like spec driven approach
here. Is this how you like always work
on like do you follow the same sort of
process on about everything or or like
does it vary depending on what you're
building? Yeah, I mean I'm the same way
like small or or just like refining
something or fixing something that's
just a basic prompt but but yeah,
anything bigger I'm doing something like
this either like a big spec or plan mode
or something.
&gt;&gt; I just assume that the actual, you know,
it basically tells you what it's going
to do. I just kind of look at it high
level.
&gt;&gt; You know, Colleen barely opens her IDE
anymore and that's becoming a running
theme now. But she's not blindly
trusting AI's output either. Watch how
she runs multiple Cloud Code instances
in parallel, and she'll bounce to GPT5
when Claude gets stuck. And she still
manually clicks through every feature in
the browser before merging because there
is still a feel to an app that AI can
easily miss. And I tend to agree with
that. So, what are we what are we
cooking up here in
&gt;&gt; So, we're still cooking over here in
case for those paying attention at home,
it's still [laughter] going.
So I ran these 11 agents. So you can see
security sentinel, architect,
strategist. These are all just in the
plug-in because this is such a big
feature. And
&gt;&gt; that's from the the system from from
every the compound.
&gt;&gt; This is a system compound engineering
from every
&gt;&gt; and like just for those who are are
trying to follow along here, this is
like those are sub agents that are built
into your cloud code system.
&gt;&gt; Yeah. And this is free, right? Like you
can just install this from the
marketplace. And I just I think I landed
on this one because it feels the
simplest. Like I said, Dave's thing has
like 50 slash commands and I don't need
that level of complication in my life.
So these guys, they offer more, but I
think their basic workflow is like four,
like plan, do, review, be done. So you
can see it's creating to-do files for
all the findings. I'll create them in
parallel for efficiency. So it made me
in this folder. I'm gonna have a to-dos.
Yeah. And it's still it's still cooking.
So,
&gt;&gt; so I mean are you only in the terminal?
Are you ever opening up the codebase
even just to look at the file folder
structure or anything like that?
&gt;&gt; Not anymore. Not unless something breaks
or something feels wrong. Um, which is
so squishy, right? Something feels
wrong, but you know what I mean? Like
kind of that developer intuition that
like something is wrong here. So
sometimes like if Claw gets stuck on
something and we're going back and
forth, then I will just open Windsurf
and do it. Like honestly, I'll just open
it and I think I have it defaulted here
to GPT5 I think is my default. Oops.
Yeah. So, I keep it defaulted to GPT5.
Um, here you can see. Okay, you can see
where I got stuck. Hold on. Let me let
me Okay, so for example, I am scanning
all of the files in my Super Whisper
folder right now. And then it's opening
the meta.json, and it's looking for this
two LinkedIn keyphrase. And I'm like,
this is fine now when I have a 100
files, but when I have 10,000 files,
this is going to be a problem. So Claude
was kind of like missing that nuance. So
I opened up here and you can see we're
talking about scaling here with GPT5
just to compare what the two models are
going to tell me.
&gt;&gt; You know, it's interesting. So I I use
cursor still and even when I'm using
cloud code, I'm I'm using it in the
terminal in cursor
&gt;&gt; here. Oh, cool.
&gt;&gt; Yeah. Okay.
&gt;&gt; Yeah. Essentially, I mean that that's
Windsurf, right? But um
&gt;&gt; yeah, this is Windsurf. Yeah, I mean,
you know, works much the same way. So, I
I'll have cloud code in the terminal in
cursor and then I do have cursors agent
in the right side like you have there
and I go back and forth. So, most of my
work is happening in cloud code and I'm
just letting it cook on on most things.
&gt;&gt; Okay.
&gt;&gt; But but when I want to have like the
quick back and forth, like the quick
like, oh, just tweak this button or we
need to troubleshoot this thing. What's
what's going on with that? I I find the
the cursor agent chat to be
&gt;&gt; it's a better interfa it's just a better
interface to to read and go back and
forth with and so even there I I'll
still use Opus 4.5 sometimes I'm using
cursor's composer model which is like
their new it's made
&gt;&gt; yeah and it's it's great because it's so
fast like it just turns around changes
like instantly.
&gt;&gt; Oh that's cool. Okay.
&gt;&gt; So that's that's it. So I like that like
rapid fire in the in the right side and
then I'll just use like cloud code as
like the workhorse just go build a lot
of stuff you know.
&gt;&gt; That's cool.
&gt;&gt; All right. So kind of as as we I mean I
know I know that it's still working
there but like what would be your next
step in this process?
&gt;&gt; I would just let this
&gt;&gt; Yeah. I'm just going to like what I
would actually do is now I have other
things on my mind about this project
like other things I'm thinking of. So, I
would open a second window and start
working on something else because this
is going to take a while because So, let
me I guess we have time.
&gt;&gt; How many do you do? Like how much
multitasking um are you managing? Just
two.
&gt;&gt; Two. Just two. I hear the stories of
people who are doing 10 and I'm like I
don't know. I don't know how you can
keep that context.
&gt;&gt; Yeah. Totally. Yeah.
&gt;&gt; Like I just don't know. So, I'm I'm max
two. So, this is still making me a
summary of what it thinks. Oh, okay. So,
want to run playright browser on
affected pages. Okay. So, here's all my
stuff. So, I'm going to look at this
like this kind of stuff, especially what
they say critical. I'm going to look at
this with my own eyeballs. Like, I'm
actually going to take time to be like,
is this a real problem?
&gt;&gt; So, I won't do that right now on the
call. But how I would review this is I
would actually look through all of these
to see what I actually care about.
Usually, it's pretty obvious what I care
about and what's easy to fix. But I
don't usually let it go fix them all. I
almost never say go fix them all. I
usually go through them one by one.
&gt;&gt; Okay,
&gt;&gt; nice.
&gt;&gt; And then I'd go over here. Let's say
that's still running. And I go back into
and I would, you know, spin up another
instance of Claude over here. And I'm
going to I'm going to talk to it real
quick. I want these LinkedIn post to
follow my specific framework. I'm going
to post my framework here. Each post
should be characterized as one of the
three things. educational. Okay. And
then I'm going to go into my like
LinkedIn thing. So this is like how
Colleen LinkedIn's, right? So I have
this experience. Oh, here it is. So I
have these three bucket.
&gt;&gt; So this this page in in notion is
&gt;&gt; this is my personal like thought my
personal thoughts, you know.
&gt;&gt; Wait, is this is this like content or is
this like your LinkedIn strategy? Like
how you
&gt;&gt; This is Colleen's LinkedIn personal
brand strategy.
&gt;&gt; Okay. Oh, wow. Nice.
&gt;&gt; So I have all these notes here. I have
like all of these 15, you know, I have
what? All these subject lines, but I
have this kind of thing. Okay, let's do
I'm just trying to give you an example
of like one of the things I'm going to
do. Let's just pick these. So, I like
this framework. Teach me, help me,
inspire me, show me. Yes, these are like
templates like frame like like
structures for LinkedIn posts
&gt;&gt; that right that that like the content
that you that you dictate but then like
structure into postable things should
follow these these templates
essentially.
&gt;&gt; Exactly. And so these are my kind of
like brain dump into notion thoughts as
I'm thinking about like I'm going to
start this consulting business. What do
I want my LinkedIn feed to look like?
Like what kind of content am I putting
out there? And I like this this kind of
idea which is teach me educational help
me specifically do it inspire me tell me
an inspirational story and then show me
has worked really well for me in the
past. So I'm going to take this like
kind of my you know just random thoughts
and this is actually what I would do is
I would dump it here. Each uh let's do
this. each post should be characterized
and let's just like have it think about
and so I'd have it think about that like
should I have each post as it generates
a post should I have it tag it as it
generates the post should I have it go
into a framework oh see it's so smart
doesn't it just like make you happy you
know
&gt;&gt; claw [laughter]
&gt;&gt; so I mean at this point is this is it
going to s sort of help you brainstorm
the next iteration or is this like like
feedback on the last thing that it built
&gt;&gt; I'm not Sure. Like I'm just making this
up as I go. Right. [laughter]
&gt;&gt; Lead the way. Cloud. Let's go.
&gt;&gt; Just making it up. [gasps] No, I think
what I want to do as I the the goal for
this product or even just like it's an
internal thing for me right now. But as
I'm doing this marketing consulting, I'm
going to help people do their LinkedIn,
right? So it's not just going to be me.
And so the goal would be you don't have
five teach me posts in a row, right? So
as I start to really get into scheduling
these LinkedIn posts and building them
out, it's going to be what have we done
and what should we do? like how can I
take this voice note? Is it an inspire
me? Is it a show me? Like how will I
categorize it? And how can I turn it
into that kind of post?
&gt;&gt; Three things I'm taking away from my
conversation here with Colleen. First,
build your own tools. She tried every
LinkedIn automation product and they
were all too generic. Two days later,
she had a custom voice note to post
system tailored to her exact workflow.
And that's the builder advantage. You
can make exactly what you need. Second
is specs still matter, but keep them
light. Colleen creates plans before big
features, but she doesn't read every
single line. She skims at a high level,
trusts that Claude can execute, and then
she'll review the output. So, the plan
is just the guardrail. Third is trust
the feel. Even with all this automation,
she still opens up the browser, clicks
through everything herself. There's
something about the way that an app
feels that AI can't quite capture yet,
and human review isn't going away. So,
if you want to hear more of Colleen's
story, the full unedited conversation is
available to Builder Methods Pro members
along with our community courses,
project ride alongs, and our live
workshops. You can check it out by going
to buildermethods.com/pro.
Thanks for watching. Let's keep
building.
