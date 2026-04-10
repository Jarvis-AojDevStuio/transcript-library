---
video_id: "sOPhVSeimtI"
title: "THIS is how to expose your apps to AI: WebMCP"
channel: "Syntax"
topic: "ai-llms"
published_date: "2026-02-16"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=sOPhVSeimtI"
duration: 1005
word_count: 3414
---
Welcome to Syntax. Today we're talking
about WebMCP. This thing is brand new.
It's a new specification and we're going
to explain what it is. We're going to
show a demo and I got a couple hot takes
about it. But essentially, WebMCP is
surfacing tools and ways to interact
with your website via your website
itself. So this is different than uh MCP
servers and this is different than MCP
UI and MCP apps. It's related. It works
in the same way, but this is a new way
to surface functionality simply just
through your website without having to
have additional servers. So let's get on
into it. My name is Wes. With me as
always is Scott. How you doing, Scott?
Hey. Uh I'm doing good. How are you
doing, man? Uh yeah, I'm I'm interested
to learn about this cuz I hear webmc my
first thing goes to ChromeDev tools MCP
or agent browser or those types of
things. I'm curious to know
&gt;&gt; about that at all.
&gt;&gt; Yeah. So that that that in itself to me
is a revelation here. So I'm excited to
learn what this thing is and how people
can take advantage of it.
&gt;&gt; Yes. All right. So all of this in
context is going to be I built a little
app called a grocery app, right? And
it's just a very simple kind of like a
conbon where you have each of your
grocery stores that you might want to go
to. And then under each of those grocery
stores, you can add, remove, and check
off food items that you want to do.
Right? So, it's pretty standard. You're
going to have, if you're building out an
app like this, you're going to have
something like add a store, add an item,
reorder items,
rename, delete item, like check off, you
know, like all the standard kind of
to-do list application stuff. Now, if
you have an application and you want to
now surface your application's
functionality to some sort of AI, you
have you kind of a couple options,
right? Like one option is you can just
build AI right into your application and
your users can do that and you sort of
like foot the bill for that. Another way
is you can create a MCP server which
surfaces all of the tools and then the
AI chat will simply just talk back and
forth via the MCP server adding,
removing and whatever. And then we also
learned, we had Keny Daws on the other
day where we have MCP UI or now what's
called MCP apps where you'll be able to
actually return and generate like maybe
you want to embed components and and
like stylized structure right into a
chat. This is different than that
because the web MCP essentially says,
okay, I have a website, I have an app,
and it it does these things. And if
someone were to to visit my my website
or if if an AI were to programmatically
open up a browser and it wants to use
your website right now, you kind of have
a couple options which is like you can
set up playright and playright will
either like dump the HTML or take the
accessibility tree um or take
screenshots of the UI and then it will
just go ahead and like use the website
as if you were a human. It would click
on buttons and and whatnot. And in my
experience, that's decent, but it's
extremely slow to actually use because
it has to like
&gt;&gt; parse all of it, figure out which
buttons it should press, etc., etc. So,
the solution to that is to for your
website to explicitly publish. These are
the things that I can do, right? So, I
have a grocery list here and I have
several different tools, right? you have
you have add item, get items, delete,
delete item, delete store, create store,
get items by store, move item, all of
these things. And that's not any
different than like an MCP server that
you would normally just publish these
things. And and the way that that works
is that you would you would publish
these tools and then you also define
what the input and output schemas are.
Meaning that like you say, hey AI,
here's a tool called add item. Here is a
description of of what it does. Um, and
then here is the input and output
schemas. This is like if you wish to
call my tool, you must provide me which
item you want to add in which store you
would like to add it to. And then I will
then return to you the following
information. Right? It's it's a nice
structured way um to talk back and forth
with with an AI. Right.
&gt;&gt; Interesting. So, uh, I I I've been
wondering about this in regards to some
projects that I've been working on. I
was thinking about working on an API for
my AI to consume for my habit tracker,
which honestly, this feels so similar to
your your to-do list, your grocery list
here.
&gt;&gt; So, this seems like that would be a
better fit for that task than creating
just what an API and an API key and then
telling the A AI how to use the API or
would you do both? you would create the
a API and then you'd create the MCP to
communicate with that API.
&gt;&gt; It depends on how you you want people to
interface with it. But if I'm looking at
the web right now, there are millions of
applications out there and in order for
an AI to interact with it right now, you
either have to like publish your own MCP
server and essentially like re-implement
a lot of your your logic as an MCP
server. What this does is it allows you
to imperatively or declaratively
just publish as part of your website
either in the HTML or in the JavaScript
and say these are the tools that you can
then use when you visit it. So watch
this example. So Chrome has published a
little Chrome extension just as one
example of of what it might look like to
interact with it. And I can simply just
go to it and say, um, I load the page up
and it says, "All right, I found all of
the tools." And then I can I hooked it
up to Gemini Flash 2.5 Flash and I I
just say, "Please add bananas to Costco
shopping list." Uh, once that done, show
me everything on my grocery list. Oh,
and can you remove then move bananas
from Costco to Whole Foods. And then I
just go ahead and send it to the AI and
it will parse what I need to do. Look at
the tools it has available to itself.
And you'll see that it added bananas to
Costco and then it went ahead and moved
it to the Whole Foods. And I can do
something like um I might go ahead and
say something like, "Please add all
items for chicken noodle soup to Whole
Foods, right?" So, it's going to go
ahead and parse that. It's going to
figure out, okay, what what do I need
for chicken noodle soup? And boom, it
went ahead and just added chicken broth,
chicken breast, egg noodles, carrots,
celery, and onion. And I can say like,
um, mark off anything with chicken. I
already have it. There we go. I spel I
spelled chicken wrong. Go ahead and send
that off.
&gt;&gt; And it should There we go. It marked off
chicken breath. Chicken broth.
&gt;&gt; Yeah.
&gt;&gt; Can I just say, man, one of the benefits
of AI is that like I can spell things
wrong and it's just like whatever.
Doesn't care.
&gt;&gt; It knows what you mean. Yeah, that's
that's actually really fantastic.
&gt;&gt; Yeah. So that is just like kind of like
a dead simple example of how this works.
And the way that
the browser is able to know what the
tools are is there there's kind of two
ways to do it. And and this is the the
documentation for um WebMCP. Essentially
what you do is you as part of publishing
your website, you simply just publish
what the tools are. And you can do that
in in two different ways. you can
imperatively declare them with
JavaScript. It's so it's it's just
window.navavigator.mmodelcontext.register
tool and you can go ahead and register
the tool with a description, the input
and the and as well as the the output
data that you get, right? However, the
other way that you can execute or sort
of declare what your tools are is with
form elements, which I thought this is
this is absolutely genius because
&gt;&gt; if your website already has like forms
or if you just want to simply
declaratively publish what something can
do, there's just a couple different
properties that you can add. So, tool
name, tool description, tool param
title, and tool param description. and
then it will just simply just parse out
the HTML elements and figure out okay
these are the things and in this case
you don't even need to publish the
schema because it can infer the schema
from your form right
&gt;&gt; uh which is which is I think is is
awesome that you can you can do it in
both ways
&gt;&gt; wow that's cool uh
&gt;&gt; I love that this this meeting of worlds
here that's neat and if you want to see
all of the errors in your application,
you'll want to check out Sentry at
centry.io/sintax.
You don't want a production application
out there that well, you have no
visibility into in case something is
blowing up and you might not even know
it. So head on over to centry.io/sax.
Again, we've been using this tool for a
long time and it totally rules. All
right, so let's talk about a couple
benefits, couple questions, and then a
couple takes I have here. So, the first
one is this sort of mixed UI approach I
really enjoy because like we had like
Keny Dods on and he says, "Yeah, like
everything's going to be like a UI
widget that's either embedded into your
chat or he talked about a several
different ways to do it." And I don't
know that every single thing is going to
want to just be a UI widget. Um
especially like you you look at like um
booking a flight or whatever.
&gt;&gt; I don't think that these people that
sell flights are simply want want to be
distilled down into like just like a
utility like you're paying a water or
electrical bill, you know, like book
book a flight. They want to provide you
with a good experience. They want to
upsell you. They want to say, "Oh, and
and not that those things can't be done
inside of a a chat interface, but
sometimes people want to actually visit
the website and and use that UI." And if
I'm able to now just use the website as
as I always have been, right? like
everything out there right now is simply
just an app in a website. But then I can
also interact with it with my natural
language, which is way better because if
I'm I'm adding chicken noodle soup here,
&gt;&gt; I'm not adding five or six different
items and dragging them into the thing.
It's way faster for me just to type,
hey, could you add X, Y, and Z? Or if
I'm in my um accounting software, I
might just paste six or seven
transactions from a credit card and say,
hey, can you add these and categorize
them all? Um, that natural language is
the best.
&gt;&gt; You could get further with that. If you
have historical grocery list, you could
say, uh, add all of the vegetables from
last week to this week, you know, and
that's something that would be harder to
do with an actual UI because you're
getting into the natural language of it.
If it wasn't a natural language, you'd
have to be building in a whole tagging
system for all of the different types of
things. you'd be getting into like so
many things to be able to even just get
that piece of functionality. Uh, I think
that's really neat.
&gt;&gt; The other thing is that like this is a
great this is way faster than like I've
used several of these like AI
interacting your browsers. Um, and they
work great when you simply just like let
them rip and then you can walk away and
do something else. But like if you're
just sitting there waiting for it to do
it because you need it, it's so slow and
there's no chance that like it was so
painful using the chat GPT browser,
whatever that was called. What is it
called? I don't even know what it was
called. It was it was it was brutally
slow. And I've used many of them in the
past and it it's just it's just way too
slow right now. So being able to
explicitly do it rather than it try to
infer it from your HTML is way better.
Like watch how fast this is. Add a new
store, a drugstore. Add lip balm. Send.
One, two, three, four, five. Five
seconds and it added a new store and
added lip balm to it. Right now, that's
pretty fast.
&gt;&gt; That's pretty cool.
&gt;&gt; Um, the other thing is that it's like
it's much more token efficient, right?
If you're if you're paying by the token
for these types of things, it's simply
just sending the tool calls along with
the possible options to the AI rather
than having to send the entire like DOM
tree or like a whole screenshot and then
have to um go through that screenshot
and figure out where the buttons are to
click.
&gt;&gt; Yeah.
&gt;&gt; Um and then finally, like this seems
just this seems ripe for rife ripe,
whatever that is for frameworks to
implement this, right? Like you already
have all of this data as part of your
application, right? you already have
your schemas, you already have your
validation, you already have your your
UI later for for mocking up what your
forms are going to be or or whatever.
Simply just taking one more step and
publishing those things that you can do
via um in in your HTML website is so
easy. And then this doesn't require
somebody else to now spin up a second
MCP server. You're not hosting anything
more than than just your website.
&gt;&gt; Yeah. No. Wow. What a what a neat API.
Yeah. No, I I just uh um I love finding
out about stuff like this and then
immediately understanding the utility as
opposed to being like, "Oh, I have no
idea when I would use this or how."
Yeah.
&gt;&gt; Couple questions I have and and this is
this is like just released yesterday.
I'm part of the early access, so
obviously this is very early and they're
trying to figure out what the spec will
be. Um but some questions I have is like
will cross apps be possible? Because one
thing Kent said when we talked about
MCPUI is he's like, "Yeah, like people
don't want to just like go to one
website and do their thing." Like you
want you want to say like, "Ah, grocery
lists. Um, go look at my calendar and
see when that dinner is and then if if I
have any dinners planned this week, add
it to my you you want things to interact
with each other." So, will cross
application stuff be possible? And and I
I assume so because this like little
sidebar here in Chrome, this is not like
the end UI for this. This is just for
you to be able to test it out and debug
it. Like what I assume will happen is
that you will be using some sort of chat
application or whatever. And very much
like the MCPI, it will simply just visit
the website, discover the tools, see
that you're logged in, and then it can
visit several websites at a time and
sort of move data between the two of
them. Yeah. Wow. Cool. Um, yeah,
headless. It probably will be headless.
I assume it will be headless at some
point. And then last thing I have here
is just like my my take. Um, and I think
that this is a great way for the web to
adapt to AI, right? Because I don't know
that you're going to get every single
person under the sun to publish an MCP
server and have it make an app with Chat
GPT and make it work. We might. We saw
it. It happened with iPhone apps, right?
Every everybody has an iPhone app now.
So, but I think that this is a very good
bridge to that space where somebody can
simply just go add a couple properties
to forms on their HTML or or publish
whatever tools they want to be available
in their JavaScript bundles and then
your website is just it's it's ready
already, right? It's similar to like
responsive design where like, oh, I just
need to change a little bit of things
and now my my website is ready for
mobile. And then the other thing is like
APIs. Like I don't know that every
website's going to want to like surface
these types of things. We saw it happen
with APIs. Like very early on every
website ever had an API and anyone could
go and use that API for free. Everybody
was building. There was like a hundred
different Twitter clients. You know, we
were making mashups. Everything was was
totally fine. And then very slowly but
surely, all of these apps were like,
"You know what?
&gt;&gt; API access sucks. We want people to come
to our site." Reddit API totally gone.
Um, the Twitter API went away and it was
like $40,000 a month or something. Now
they they just released the ability to
pay as you go and it's like 200 uh
requests for a dollar. It's still
extremely expensive. Instagram
impossible to to interact with it via an
API, right? They all of these big
companies don't want you just being
like, "Oh, sure. Would you like to use
us as a utility? Just interact with us
this way." They want you on their
platform, using it in their way so they
can sell you stuff and and make the most
money. So,
&gt;&gt; I don't know if if this is going to be
the the total end game for all of this
stuff. But I certainly think for people
who do want AI to interact with their
their applications, this is a great way
forward.
&gt;&gt; Yeah, I I think this is neat. I'm stoked
to dive in more. And uh thank you as
always, Wes. This is a great little
explainer. Yeah,
&gt;&gt; that's it. You can sign if you want to
test it yourself, um you can sign up for
the web MCP early preview. I'll leave
links in the description below. But
that's it.
&gt;&gt; Peace.
