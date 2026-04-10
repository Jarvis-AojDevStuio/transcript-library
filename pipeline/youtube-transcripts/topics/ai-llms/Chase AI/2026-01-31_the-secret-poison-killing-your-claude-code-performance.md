---
video_id: "-xHprsdG4ME"
title: "The Secret Poison Killing Your Claude Code Performance"
channel: "Chase AI"
topic: "ai-llms"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=-xHprsdG4ME"
word_count: 2497
---
With every message you send, your LLM
gets just a little bit worse. And this
isn't just anecdotal evidence. This has
been shown in study after study after
study. All of which tell the same story
of context rot being the secret poison
that's killing your performance. But
what exactly is context rot? And more
importantly, what can we actually do to
mitigate it? So the idea of context rot
is actually pretty simple. the more we
fill the context window of our
particular AI system, aka the longer we
interact with it, the worse it performs
in a given session. Now, the particular
study we're looking at right now is the
Chroma study. This came out this
previous summer. I highly suggest you
take a look at it. I'll put a link to it
in the description. And if you head to
this page, they will also have a link to
their YouTube video. It's only like 7
minutes long where they do a really good
job of explaining sort of their
methodology behind all the tests and
what they figured out. And what they
figured out is exactly what I told you.
The more we shove into a particular
system, the worse it performs. And this
graph, and there are many of them,
really drives that home. And what you're
seeing here is four of the top models,
Claw, GBT, Quinn, and Gemini, attempting
to perform a task while they are given
more and more input tokens. aka their
context window is filled up more and
more and more and as you see their
performance tanks over time. Now these
are obviously slightly older models than
what we have available to us now but
this problem has not been solved and
it's very alarming. Just look at this
drop off. It's insane. So with this in
mind, what can you, the average end user
actually do to kind of battle this
issue? Well, first we really need to
understand how context windows work. And
to understand context windows, we first
need to have a quick conversation about
tokens. Now, tokens are the currency of
large language models. And context
windows are the budget of every single
AI model. Now, every model has a
different budget. They have a different
size context window. Opus, for example,
from Claude has 200,000 tokens. Gemini
is up to 2 million tokens. And there's
models out there with even more than
that. But, as you'll see, bigger isn't
always better. But for today's
conversation, we're just going to
pretending that we are Opus 4.5 and we
have 200,000 tokens to spend. Now, what
are tokens? Well, for you, all you
really need to understand is that one
token is equal to one word. One word is
equal to one token. There's a lot of
complicated math involved, but for 99%
of the population, that's as much as
they need to know. And to illustrate all
this, we have an example conversation
with Claude. And there's three things
we're going to be keeping track of.
input tokens, output tokens in our
actual context window. Okay, so three
things. Now, like I said before, every
word is equal to a token. So at the
beginning of the conversation, when I
say hi claude, that's two tokens and
those two tokens are first going to be
part of that input. So right off the
bat, I send two tokens. Two goes to
anthropic. It comes back with a
response. Hi, how are you today? So
that's, you know, six tokens. So it
output six tokens. What does that put
our context window at? That puts it at
eight, right? Easy enough. Eight tokens
out of 200,000. We are sitting pretty.
We've barely filled up any of it. Now
it's time for my response. So I say, I'm
doing well. Explain context windows to
me. Eight tokens. So what is my input?
Is it eight tokens? No, it's not. It's
actually a lot more than that. Because
when you send follow-on messages past
your first one, I'm not just sending
this message. I'm actually sending that
message plus the entire previous
conversation.
So it's the new message plus the entire
context window. So my new input that I'm
sending to it is in fact 8 + 8 giving me
an input of 16. Claude then responds
with an output which is you know let's
just say for the sake of this example it
responded with 100 tokens. What is the
output going to be? Well the output is
its own thing. It doesn't output the
entire context window back to us. So the
output in this case is 100 which then
brings our context window to what? Well
the context window becomes the input
plus the output which brings us to 116.
See how this works? And this dynamic
continues for the entire conversation.
So just to illustrate this point, let's
say we had a hundred more messages back
and forth with Claude. And let's say our
context window is now up to 50,000. So
up here we have our context window.
We've already filled up a quarter of it.
Now let's say I give it a new message
saying, "Hey, can you explain context
windows again?" So let's just say that's
six tokens. So what's the input? Input
would be 50,000 plus six. All right. And
let's say Claude comes back with a
rather lengthy response. Let's say it
comes back with a 5,000 token length
response. What does that mean? Well,
that means the output would be 5K. And
our total context window would in fact
now be what? 55,000.
So context window would now be 55. And
now we filled up a little bit more. So
that's how tokens in the context window
works. Every input is not just your
particular message. It's that message
plus everything that came before it.
Now, like everything, it gets a little
more complicated in reality. There's
things like cache memory, but as the
user, this is how you have to think
about it. But it's not just your back
and forth messages that fill up the
window. Here's an example of an actual
context window from Claude Code itself.
And you will see that messages, right?
Those back and forth only takes up one
portion of the entire window. What else
goes in there? Well, you have things
like system prompts and tools and very
importantly MCP tools. And we'll talk
about this a little bit more, but MCP
tools can be huge and take up a huge
portion of your context window. So, if
we went back to this conversation in
reality, you know, did we have just two
input tokens here at the beginning? No.
Actually, we had a whole bunch of stuff
that was already there. You know, we had
the system prompt, we had system tools.
So your first message in fact wasn't two
tokens. It was probably 5,000 in two
tokens. So there's a lot of things that
are fighting to grab the context window.
Now let's bring this back to the idea of
context rot. We have all these tools,
all these messages fighting for real
estate in our context window. Yet at the
same time past a certain point, our
LLM's effectiveness is going to drop
significantly. There's no exact number.
It's roughly rule of thumb 100,000
120,000 tokens and that doesn't really
change whether they have a 2 million
context window or a 200,000 context
window which is why the size of the
window doesn't really matter because
again pass this point 100 120 there's no
exact number
it just stops working as well. So those
are the things we have in mind that's
context raw. Context rot is saying,
"Hey, once we get past this number,
right, once we start filling up past
here, well, you're not going to do so
good." So, at this point, we understand
what context rot is, right? The
effectiveness going down over time. And
we have a pretty good idea of how this
window fills up, right? Our messages,
our prompts, our tools, how inputs and
outputs work. Now, is the important
part, which is like, okay, what the heck
do we do about this? How can we actually
stay in this, you know, sort of
goldilock zone while at the same time
still giving our system enough context
for it to actually complete tasks? Now,
the first and most important weapon that
you can employ in your battle against
context rot is task management. Now,
what do I mean by that? I mean giving
the large language model, giving claude
code, giving whatever discrete specific
tasks that it needs to execute. not
being vague, not telling it, hey, I want
you to create this SAS product that's,
you know, a project management uh tool
for content creators. That's too much,
right? That's too much context and too
many ideas it needs to hold in its tiny
little context window to actually
execute things properly. Instead, we
need to take your idea and break it down
into its smallest parts possible and
then have it execute those specific
tasks. Now, what does that look like
when we're talking about agentic coding
tools like Claude Code? Well, that means
having a proper PRD. That means not
showing up with just an idea and letting
it go to work. That means having your
idea, taking it into plan mode, and
having a significant back and forth till
you break it down into its discrete
pieces. That's what we're looking at
here, right? It was a PRD, a cambban
board for board for video creators. I
kind of talked about this in my previous
video. And what do you see? Well, you
have the idea, right? canban board for
video creators. But then we break it
down into its individual specific tasks
it needs to do because if I tell it,
hey, set up the board, it's too much,
right? We want to get as small as
possible. Think of, you know, again, oh,
I want to build a website. No, I want to
build a landing page. No, I want to
build a a contact form. No, I want to
build the specific logic that makes sure
the email they put in is legit, right?
break it down to its smallest individual
piece. And by doing so, it will use less
context to execute the task. Now, the
second weapon we have at our disposal is
session management. When talking about a
chatbot, let's imagine I've been talking
with Claude for hours and hours in the
same exact chat. Well, session
management means asking Claude, "Hey,
create a summary of everything I've
talked about so I can head to a new
chat." And then I would just open up a
new window, open up a new chat, dump
that summary in, and now it kind of
knows what I've been talking about, but
we have all the context window available
to again, which means we'll get better
outputs. Now, Claude Code and a lot of
coding tools take this same approach
with the idea of an autocompact feature.
So, you'll see here Claude Code in their
attempt to fight context rot has the
autocompact feature. That means as we
fill up all these tokens once I hit, you
know, the 150 145 155 uh token number,
it's then going to start a new session
and it's going to ask Claude in this
session to say, "Hey, create a summary
of everything we've done." So, it can go
into a new session with a new window
with an idea of where we're at. So, we
don't just start from scratch. Now, we
can also do this manually inside of
cloud code by either asking for the
summary ourselves or just doing, you
know, slashcle and starting a new
session again. And frankly, those two
ideas alone, having specific tasks for
your AI to accomplish in one session and
actively managing the sessions
themselves is pretty much a 90%
solution. And when we look at things
like the Ralph loop or the GSD
framework, you know, two scaffolding
sort of mechanisms around agentic
coding, that's exactly what these things
do, right? Let's take the Ralph loop for
example. What does it do? It takes your
PRD, it takes a specific tasks and then
it attacks it one task at a time and
starts a new session every single
attempt. GSD kind of does the same
thing. It takes your idea, turns it into
a PRD, breaks the PRD into atomic tasks
and launches sub agents and sub aents
have their own context window to again
complete said tasks. So what are both of
these things doing? Right? They're
managing context via new sessions or sub
agents. And they're giving AI only one
specific task to complete in any one
session. What does that mean? It means
less context rot because it's going to
be using less context overall to
complete the problems, therefore giving
you better outputs. And with that in
mind, I would highly suggest checking
out the Ralph GitHub and the GSD GitHub
to get a better idea of how these
systems work. I'll also link videos in
the description where I talk about both
of them so you can kind of see these
models in action. And the very last
point I will make on all this has to do
with MCPs. Obviously, when MCPS kind of
came onto the scene a year ago, everyone
was going nuts. Everyone wanted to throw
30 MCPs and create agents with them.
Understand MCPS are super super heavy.
Anthroic themselves came out with this
article November 4th pretty much saying
MCPs are are way too bloated and there's
other ways we can actually sort of use
their functionality. So this isn't to
say never use MCPs. This is saying use
MCPs sparingly and don't just have them
on within your session if you don't need
them. So that's where I'm going to leave
you. Make sure to check out the GSD
video if you want to see these context
mitigation techniques in action. And as
always, let me know what you thought
about it. Check out the free school for
tons of free AI resources.
