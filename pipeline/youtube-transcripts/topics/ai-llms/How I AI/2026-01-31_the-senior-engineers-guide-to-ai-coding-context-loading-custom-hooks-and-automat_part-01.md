---
video_id: "LvLdNkgO-N0"
title: "The senior engineer's guide to AI coding: Context loading, custom hooks, and automation"
channel: "How I AI"
topic: "ai-llms"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=LvLdNkgO-N0"
word_count: 3998
chunk: 1
total_chunks: 3
parent_video_id: "LvLdNkgO-N0"
---
There are people out there definitely
like me that really want to know the
advanced techniques that can leverage
the most powerful parts of these AI
powered coding tools. Where do you want
us to get started that you think many
people don't think [music] about in
terms of how they can use these tools?
&gt;&gt; Context and diagrams is a great place to
start. They're definitely the best way
to get AI to do what you want. So, they
have what are called mermaid diagrams.
This is a way of visualizing database
operations and it's a way of essentially
compressing your application down into
very small lines of text that show how
your application works. Now for a human
to read this, this is a big challenge.
But an AI can consume this easily. I
could even just say, "Please explain the
authentication flow." And because it
already has it in the context, it's not
going to have to do a bunch of file
reads [music] and codebase exploration
to figure this out. It's going to come
up with results much quicker.
&gt;&gt; If I gave you infinite junior to
mid-career talent who [music] is always
available, who would do the work you
would do if you had unlimited amount of
time and no meetings? What would you do
when a ticket came in? Like what would
you do?
[music]
Welcome back to How I AI. I'm Claire
Vio, product leader and AI obsessive
here on a mission to help you build
better with these new tools. Today we
have John Linquist at egghead.io
who is a super user of AI powered
engineering tools like cursor [music]
and claude code. Now, I love all you
nontechnical folks out there, but this
is an episode for the senior software
engineers who really want to understand
how they can use the power features of
some of these AI engineering tools to
really both optimize the quality of code
that they're generating, but also become
more efficient as they use their IDE,
terminal, and AI assistance to write,
check, and deploy code. This is a great
episode for any of our advanced users
out there. VPs of engineering, CTO, pay
attention. Send this to your staff,
engineers. Let's get to it. This episode
is brought to you by work OS. [music] AI
has already changed how we work. Tools
are helping teams write better code,
analyze customer data, and even handle
support tickets automatically. [music]
But there's a catch. These tools only
work well when they have deep access to
company systems. [music] Your co-pilot
needs to see your entire codebase. Your
chatbot needs to search across [music]
internal docs. And for enterprise
buyers, that raises serious security
concerns. That's why these apps face
intense IT scrutiny from day one. To
pass, they need secure authentication,
access [music] controls, audit logs, the
whole suite of enterprise features.
Building all that from scratch, [music]
it's a massive lift. That's where Work
OS comes in. Work OS gives you [music]
drop-in APIs for enterprise features so
your app can become enterprise ready and
scale [music] up market faster. Think of
it like Stripe for enterprise features.
OpenAI, Perplexity, [music] and Cursor
are already using work OS to move faster
and meet enterprise demands. Join them
and hundreds of other industry leaders
at works.com.
Start building today.
John, welcome to How I AI. I have to put
some context here which is we have done
quite a bit of coding with cursor vibe
coding episodes but a lot of what our
audience has asked for is early maturity
less technical introductions to these
tools. But there are people out there
definitely like me um and definitely
like folks that follow you that really
do know how to write great software and
want to you know as people say of course
I'm a 9x engineer but how do I become a
10x engineer with some of these tools
want to know really the advanced
techniques that can leverage the most
powerful parts of these AI powered
coding tools and get you really high
quality software. So I'm really excited
about what you're going to show us
today. And so where do you want us to
get started that you think many people
don't think about in terms of how they
can use these tools?
&gt;&gt; Yeah, I think uh context and diagrams is
a great place to start for us. Um
they're definitely the
best way to get AI to do what you want.
So um and we'll be using cloud code
throughout.
&gt;&gt; Oh, great. Okay. And so yeah, we've
we've gotten a lot of kind of markdown
files in How AI, but not a lot of
diagrams. So why don't you walk us
through
&gt;&gt; how you use those those assets to help
you code better.
&gt;&gt; Yeah. So these diagrams are all
generated from I can share a prompt with
however you want to share with the
audience um that can walk through your
codebase and generate diagrams based on
uh user actions or user interactions the
events the channels whatever happens in
your code to help the AI understand the
flow and how the pieces are connected.
Um I think Windinsurf recently came out
with something called code maps, a
similar concept. Um
essentially preloading valuable context
so that you have to remember that every
time an AI starts it has no memory, no
idea of what's going on in your
application and people try and set up
lots of rules and all the stuff around
it. Um, but they usually don't include a
lot of how does my application work and
how do the pieces fit and so you get a
lot of really bad edits because it
doesn't understand if it if it modifies
A, how does that impact B? Um, so we
want to preload a lot of that. We can do
that using diagrams. Uh, so for example,
one of these diagrams um will have I I
call they're markdown files with
diagrams in them. So they have what are
called mermaid diagrams and mermaid is a
standard format for rendering diagrams
inside of markdown. So this is a a way
of visualizing uh database operations.
And if you to zoom zoom in and look at
uh how if a record exists then do this
and that. Yes. No. And it's a a way of
essentially compressing your application
down into very small lines of text that
show how your application works. Now for
a human to read this, this is a big
challenge. Uh we need to open up this
big visual and it turns into like looks
like an image. But an AI can consume
this easily and it's like a very
compressed very um robust way of
explaining application. So we can feed
these into our application at at the
startup time. Um, and for the more
advanced pro or the larger projects you
get on, the more diagrams you'll have,
and you can kind of pick and choose
which ones to load. Um, I'm going to
load them all in. And I'm just going to
open um terminal up the editor area.
So, the way I'm going to do this, if we
look at Claude and we look at look at
its options, um, you'll see a bunch of
options. The one we're going to focus on
is called append system prompt. So in
there before we load in uh any sort of
user prompt or anything we're actually
going to say claude append system prompt
system prompt and then you can drop in
some text and we're going to drop in a
command and this command can read in
from our memory from AI/diagrams
and then this is going to read through
this is a called a glob pattern read
through all of the markdown files
essentially force them into claude once
I do this. So this is reading all the
files all the markdown files and this is
cat will kind of concatenate them all
together into a single uh text read.
&gt;&gt; Yeah. One thing I want to call out for
folks that are watching this that or or
are listening and maybe not watching is
two things. It seems like, you know, in
your in your standard repos, you're
creating a a memory um directory where
you're going to structure some of the
context and files you might want any of
these AI tools to use. And I think
everybody's like, "Oh yeah, I've created
my agents markdown file or my clawed
one." And I think you can actually
structure your um context for these
tools a lot more purposefully. And so I
think this is a really good example of
this. The other thing that I I think a
lot of people are quite lazy about is
they haven't explored the surface area
of all the system commands available in
cloud code. And so by using that help
command, you can actually see things
that not just chatting with clot code
you can do, but you can actually inject
into how claude operates. And appending
system prompt is one of those ones that
I think people probably underuse.
&gt;&gt; Yeah, absolutely. Um, it's one I use
constantly. Um, great points there. Um,
so when when I let this run, you'll
notice that there's um it's now
prompting the user to do something. And
we don't have to try and reference all
of the files, which you normally do with
AT. We don't have to try and tell it,
you know, what we're going to work on. I
could even just say, like, I use
dictation all the time. Uh, please
explain the authentication flow.
And because it already has it in the
context, it's not going to have to do a
bunch of file reads and codebase
exploration to figure this out. It's
going to come up with results much
quicker. This this does come at the cost
of a lot more context, a lot more um
tokens being used up front, but the work
that you do, the time that you spend on
these tasks is more valuable than that
to me. So, you'll notice that there were
no file reads in this. There were no um
it did not search the codebase. It
didn't do any of that stuff. It just
simply had all that in context. And now
I could take this and look through it,
start creating plans, swap over to plan
mode to how we want to uh update and um
change authentication. So
this saves again the the the trade-off
here is the cost of many tokens up front
but the value is you get a lot faster
and a lot more valuable output as the
tasks complete much faster the tasks are
much more reliable because it
understands what's going on in the
codebase.
&gt;&gt; Two things I think people should think
about with this flow. one is I've said
this in a couple episodes and and we'll
call it out again in yours is I think
that with LLM starting to become more of
a part of how we do work and feed
context and understand things like
documentation or business context. This
is the era of the the file type and I
think so many people think about
markdown and JSON files as effective
ways to inject context into LLMs. I see
a lot of course markdown files. I think
more people now write markdown than they
h than they have in many many years. And
then a lot of we've had some episodes on
using JSON for example to put realistic
or semi-realistic data into prototypes.
But we are having more and more episodes
where people are discovering
specific file types that have a specific
context structure that are really useful
for a use case. In this one, you have
mermaid diagrams, which again are hard
to parse as a human. And even if they
turn into graphics, are still hard to
parse as a human. Like I looked at that
big diagram of my eyes crossed and I
said, I don't I don't want to read this.
But to a machine, it's very effective.
We've also in some episodes talked about
um image and multimedia file formats
that not only contain image data, but
contain metadata that you can use. And
so I think this is an interesting moment
where we can all use different file
types in a more extensive way than our
kind of human brains could because the
machines are so good at using the
different component structures or syntax
of of those files. So I think that's
pretty interesting and I think mermaid
diagrams are one of those examples um of
something that can be used really well.
&gt;&gt; Yeah, absolutely. There's a lot of
research being done into how they can
compress all of this information down
into like a single image. So, if I could
take all of the diagram files and
somehow come up with an image format
that would store everything in there,
could would the trade-off on tokens be
there and would the trade-off on
understanding be there as well? Um it's
uh we we'll see if there's more file
types that emerge and I'm huge um on
video and using videos
uh Gemini being the best model for
uploading video and understanding um and
recently built a tool that can take one
of my six-hour workshops and uh process
the entire thing and take out notes and
examples and thoughts and frequently
asked questions. And so each time I
teach a workshop, I can iterate on it
and um I don't have to go like search
through the video some other way. It's
&gt;&gt; you and I will have to trade notes
because I did a very similar thing with
our episodes which is it takes a video
of our episode. It pulls out all the
learnings, all the code snippets,
screenshots where the guest and I look
cute and put it into into a blog post.
So So I agree on that. You know, the
second question I had for you though is
going back to these diagram files in
this memory directory. Where in your
development process do you find that you
generate those files? So for me, I
actually have a GitHub action that
generates files almost exactly like you
have with documentation and diagrams for
new features um of a of a specific
scope. And so I do it when a pull
request is closed and then I go back and
um update update our diagrams. I'm I'm
curious where this falls in your where
documentation like this falls into your
workflow.
&gt;&gt; Yeah, usually I think pull request is a
a good paradigm there. Uh as soon as you
have something working where you want it
to be working and then you can say okay
now this is working as expected. Please
diagram it. I think for a lot of the
projects, we already have pre-existing
um code bases that don't have diagrams.
And so that's that's been the major use
case is taking existing stuff and um
diagramming all of that so that our AI
development is accelerated, I guess, is
the buzzword. Um but yeah, if you're
starting from scratch, you definitely
just want to spike spike things out, get
it working. Um don't worry about
diagrams up front. um just use a plan
mode, build something and once it's
working, then diagram it out. And then
even with the diagrams, um they're great
to help walk you through like what did I
just build? Like I didn't look any of
this code. Uh show me diagrams of what
the code is doing. And then if the
diagrams look kind of wonky, you can
just say there there's there's tools in
there that people are working on where
you can like drag around pieces of the
diagram to say, well, I don't want this
to navigate there. I don't want this
user do that. We could I don't there's
going to be so many tools in the next
few years that emerge from all this.
&gt;&gt; Yeah. And then I will give folks just a
couple other use cases of generating
mermaid diagrams from code that are not
just about improving the efficiency of
using something like cloud code. Um I
use a lot of diagram generating out of
our repo to answer very complex security
and data flow requirements from our
customers. This is a it's a workflow
that is actually like pretty expensive
if you ask an engineer to do it which is
I have specific customer A they need a
very specific data flow diagram of this
part of our application so they can
understand the third party parts of it
again also if you're going through sock
2 compliance or any compliance like
these are these are assets that
historically have just been so tedious
to create efficiently and effectively
and now you can kind of generate them on
demand. My last question for you on this
diagram flow is do you find that you
have the AI write or you would write
documentation any differently than you
would for a human audience or do you
feel like there's enough overlap that
the content format etc can be pretty
consistent between the two?
&gt;&gt; I would say could be pretty consistent.
I I think they serve as a nice bridge
between kind of human and AI. Um
definitely think I I know people
generate documents like you'll write
code and then generate documentation
around it using AI for both steps which
is just wild but um yeah I think the
markdown is kind of the language of the
future for a lot of this um text and
then there you can do images and
everything inside of markdown files as
well. So they can kind of and the front
matter metadata. Um you'll you see
claude using that extensively for their
skills and commands.
&gt;&gt; Yep.
&gt;&gt; And everything. So um and anthropic is
pretty good at pioneering all this
stuff. So
&gt;&gt; if they're using markdown then
&gt;&gt; everybody else can.
&gt;&gt; Yeah.
&gt;&gt; Yeah. Uh again for people who want to
like pull the thread a little further uh
what what I do is yeah we generate a lot
of AI code then on poll request we
generate AI documentation internally for
engineers and for AI obviously to use
this context and then we take that code
and we generate markdown customerf
facing support documents again that
really benefit from these workflows
because then you say click button A move
to section B save this and so you can
really pull the thread on docu
documentation from one asset and I think
you're showing a place where it's really
useful from the engineering perspective
but it can start to become customerf
facing and all sorts of interesting
things.
&gt;&gt; Yeah. And you could summarize the
documents for customers. Um you could
have it build little interactive demos.
I mean there's the sky's is the limit.
Like how however much you want to
support customers there is if this is
enough then then great. If it's not then
it's an AI prompt away from
&gt;&gt; something pretty. I guess
&gt;&gt; this episode is brought to you by
[music] Times, the intelligent workflow
platform powering the world's most
important work. Business moves faster
than the systems meant to support it.
Teams are stuck with repetitive [music]
tasks, scattered tools, and hard to
reach data. AI has huge promise, but
struggles when everything underneath is
fragmented. Times [music] fixes that. It
unifies your tools, data, and processes
in one secure, flexible platform.
Blending [music] Agette AI, automation,
and human-led intervention. Teams get
their time back, workflows run smarter,
and AI [music] actually delivers real
value. Customers now automate over 1.5
billion actions every week. Times is
trusted by companies like Canva,
Coinbase, [music] Datab Bricks, GitLab,
Mars, and Reddit. Try Time Tines at
times.com/h
[music] how I AI.
Great. So, you showed us how to just
pull all of these documents into a
system prompt. You get much more um
performant use of something like Claude
Code. And this seems like a command that
you're using over and over again. And
that's something you and I talked about
before we started recording, which is
how to alias and make more efficient
your use of of different commands. So,
should we should we pop over to that or
anything else you want to show on
diagrams?
&gt;&gt; That's that's great. Let's do that. Um,
so there are a lot of uh with with on
Mac it's DSH is the default shell. Um,
on Windows I do PowerShell. So, this
look very different. Um, but depending
on what tools you use the most, you can
easily set up aliases for things like
setting the default model for for claude
or setting like if you want to do
something completely dangerously so that
once you open a new terminal, if you
just type X now, anything I type has
bypass permissions enabled. Or if I type
H, this will be Haiku. It'll be much
faster, but not quite as smart. Um or if
I type in the scenario CDI um this will
do that diagram loading um where once
you have these systems in place these
commands in place then you can just uh
kind of capture them in the smallest
like because I only because I use these
a lot I I I keep them in very short
shortcuts.
Yeah, and I can imagine you could you
could do something like this for project
specific context to so you could do like
CC dash whatever project you're working
on. You could pull in the diagrams for
just that initiative. So if you're going
back over and over again into specific
things that need specific context, this
would be just a cheap shortcut to to get
you into the mode of for example cloud
code that you want.
&gt;&gt; Yeah, absolutely.
&gt;&gt; And you showed a lot of cloud examples
here. Are there any other ones that you
think are really really useful for folks
or creative uses of this you think we
should think about?
&gt;&gt; So I tend to build any idea I come up
with. Um so for example this is one I'm
working on called sketch
and this feeds into the Gemini uh Gemini
CLI. So like what type of website do
want to do I want to build? Let's do a
store for selling uh Christmas
decorations.
And then let's make the homepage of
that. Let's make it creative and
artistic for a desktop website. We'll do
the GitHub light theme for it. No
reference image. Let's do five images
