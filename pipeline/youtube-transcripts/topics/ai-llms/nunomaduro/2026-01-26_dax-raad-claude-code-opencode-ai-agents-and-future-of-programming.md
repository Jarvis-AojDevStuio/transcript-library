---
video_id: "kKGeOE641b0"
title: "DAX RAAD: Claude Code, OpenCode, AI Agents, and Future of Programming"
channel: "nunomaduro"
topic: "ai-llms"
published_date: "2026-01-26"
ingested_date: "2026-02-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=kKGeOE641b0"
duration: 1823
word_count: 7368
---
When we saw that the anthropic block
happen on Thursday night, I messaged
OpenAI right away being like, "Hey, you
guys have a shot tomorrow to counter
position and like a lot of people are
going to be mad at anthropic, you guys
have a chance to like do the opposite
and get a lot of goodwill." What's up
everyone? It's Nuno here. It would mean
the world to me if you could subscribe
to this channel. I love PHP. I love you
all and enjoy the video. Today we're
talking with Dax Red, the creator of
Open Code. In case you don't know, open
code is this open source AI coding agent
that helps you write code for your
terminal or your IDE or from the DEX
more recently. For this developers who
haven't done any agenting coding yet or
for someone who have seen cloud code
from far away uh cloud code CLI, what is
open code and why should they try it?
&gt;&gt; Yeah, so um open code is just us
experimenting with using LMS for coding
and figuring out what kind of workflows.
We obviously didn't invent this concept.
There had been a bunch of different
iterations on it. uh cloud code is
probably the the biggest most popular
one. Um the idea behind it was oh it's
you know you can strip it down to a very
simple terminal application and it can
you can prompt the agent there and it
can do work and you can review it. Um we
basically took cloud code and did an
open source version of it and to this
day we like follow a lot of cloud codes
features. The difference is well one
ours is open source two we're not locked
to a specific provider. and cloud code
you use anthropic models with open code
you can use whatever models uh wherever
you have access to them you can plug it
in whether it's directly paying for it
or through github copilot or through
your chat gbt pro subscription you can
use that with open code uh and the other
major difference is we have tried really
really hard on the terminal interface
there is a lot that you can do in
terminals that a lot of people just are
not aware of because it's very esoteric
technology for some whatever stupid
reason we have a weird amount of
experience with it uh so we try to see
how far can we push things in the
terminal UI. Um, and we're really just
getting started. I think what's there
right now is the floor. We have a lot
more a lot more planned as well.
&gt;&gt; Dude, I'm going to be honest, man. That
terminal experience that terminal UI was
the thing that pulled me in into open
code, you know. I'm super fan of
terminals in general. Like I have built
tools for the terminal too and I love
the terminal, you know. And um the first
thought that came to me was like how is
possible like a company like Enthropic
for example with a massive evaluation
managed to ship a worst experience on a
terminal than you guys
&gt;&gt; you know so that was my first reaction
to it. So I want to ask you like if you
can share a little bit some of the tools
you are using behind this and h how what
makes open code so great on the terminal
like why is it that great? Yeah. So
right now if you uh want to build a
really fancy terminal app um well not
right now historically if you want to
build a really fancy terminal app and
you're in the JavaScript ecosystem which
was a constraints that claude the cloud
code team was operating under there was
a library called ink which let you use
React to like build the terminal UI. So
you can kind of like build things in
like the nice way that React lets you
build things and then but instead of
rendering to web it renders to the to
the terminal. The thing is this library
really I would say was more like a proof
of concept but again so few people know
how any of the terminal stuff works. It
just became stuff that a lot of people
ended up using. Um and it's but it's not
like it was never like that serious of
an effort. I think it was more proof of
concept that kind of grew into something
more but it's very limited in terms of
performance capability etc. So I think
the cloud code team picked that I don't
think particularly intentionally. I
think they were trying to like
experiment with this idea that they had
and it ended up hitting ended up growing
massively like you know probably you
know millions of people that that have
used it. Uh and now it's like has the
weight of the product was really simple
originally and maybe it was okay to use
this kind of crappy framework. Um so I
don't I don't want to call it crappy.
It's just that it's like it just wasn't
that it wasn't it's not that capable. Um
&gt;&gt; and now there's like a lot more features
that they want to put in there. a lot
more people using it across different
terminals, operating systems, etc. And
that framework they're building on top
of um isn't really working well. We took
a different approach. We were like,
let's just invest upfront in building
the ultimate terminal framework. Uh so
we built something called Open TUI,
which is a Zigg library that lets you uh
that kind of implements all of the
complex terminal UI concepts. everything
from like a layout engine to like you
know tracking mouse clicks and knowing
when two elements are like intersecting
uh compositing so you can have the
opacity you can have the colors blending
together so all the low-level like stuff
you're kind of used to in the browser
like you can you know create blocks and
arrange them and do all that um that's
what's in open and then um that's
maintained by uh someone on our team
called Sebastian he kind of he's he
started building even before we knew
each other he was he built it on his own
for something we fortunately crossed
pads we decided to like kind of fully
fund it. um he's amazing that project is
amazing and we surface that low-level
zig library as a react with react
bindings or with sawjs bindings and we
personally use an open code we use a
slejs bindings so it lets us build
really crazy stuff like in open code
there's like opacity like we have
dialogues that pop up and stuff behind
the dialogues like dim dim out um we
have like really comprehensive syntax
highlighting we can do all kinds of
interesting stuff but still it's a
simple interface like we're just using
solidjs and building components in the
same way you you'd be doing it on web.
So that that foundation lets us do um a
lot of stuff like there's no ceiling
more or less or like we we can hit the
ceiling what's possible in a terminal I
would say. Um cloud code's foundation is
they don't have that. So they have a a
bit more a bit more challenge. There's
one other thing I will say um there's
some upsides to the cloud code approach.
Uh so open code is a full screen 2
experience like takes over your whole
screen and it like
&gt;&gt; right
&gt;&gt; it basically ignores like your native
terminal stuff. So that means we have to
reimplement stuff like scrolling uh
selection copy paste. Um we don't do an
amazing job with that yet. We do an okay
job but we have to reimplement a lot of
stuff that your terminal does natively.
Uh cloud code is not a full screen
experience. So it's just it's just
writing to stuff to scroll back. Um so
stuff like scroll like your native
scroll works better like your terminals
native copy paste works better. Um but
again they there is a different
limitation with that like they can't do
a lot of things in that mode whereas for
us we can eventually get as good get
very close to the native experience with
with most of stuff. It's just a matter
of work.
&gt;&gt; No I think I think it's
&gt;&gt; Mhm. I think it's fantastic and honestly
you feel it even more when you go back
to cloth code CLI you know it's not when
you start with open code it's when you
are in open code for a month and then
you go back for cloth code CLI and I was
like oh my god I feel like I have you
know go back in time literally but uh
you know the terminal is awesome I asked
to say dude and you know I think like
when I'm streaming about open code and
I've been done that a lot recently um a
lot of people just asked me all right uh
what are you using to use cloth code uh
currently and I said I'm I'm using the
API and they said something like all
right so how the hell are they you doing
money you know so I have one question
for you if you're okay on sharing it
what exactly is currently the the
business model behind open code where
the money comes from to literally just
pay all this open source work because
you just mentioned is open source so how
exactly you know who pays the bills here
[laughter]
&gt;&gt; yeah yeah so the open source model is
not very well understood a lot of people
try to start companies around it most of
them fail uh people call I I think I saw
Aaron Budman, the founder of Zero, he uh
he called it like a double miracle
business because you need to first have
the miracle of having an amazing open
source product that a lot of people use.
Like it can't be a few people. It's got
to be like if you're going to do the
open source thing, you're shooting for
the whole entire market. Um that's the
point of doing an open source thing. So
you you need that miracle. Then you need
another miracle where you need a
completely separate product that sits on
top of it that uh you know people people
can pay for. And you never want to make
the mistake of turning the that primary
open source product into a paid product
or like removing features from there and
making it paid because that just
eventually kills that kills it. Like the
whole point of open source is you're
trying to build something that as many
people in the world can use as possible.
You know, there's 30 to 50 million
developers in the world. There's no
reason all of them can't at least try
open code. Uh we never want to make it
so that anything gets in their way of
doing that. So for us, uh this with open
code, it's actually pretty simple. Um if
a large company and a lot of large
companies are doing this uh they are
rolling out open code to a thousand
developers there's a set of just
logistical problems that they have um
they can tell every single developer to
go download open code but then each of
them needs like an anthropic API key
they don't want to go issue an anthropic
key for each developer and then they
like quit and they have to disable the
key or the key gets like you know all
that like management stuff um so they
just need like a control plane where
they can set up things once set up the
API key once integrate with their
internal off when they when the end
developer runs open code, it'll like log
in through that. They'll get temporary
credentials, all of that. Uh they can
set budget limits like you can only
spend $500 a month. They can see
analytics. Um so that product is what uh
we charge for it. It sort of exists like
we have some initial um customers that
that are using it. Uh it's not fully
there yet. Um but that's that's how
we'll make money. So with open source,
it's it's always a pyramid, right?
There's a pyramid. It's a good pyramid,
not a pyramid scheme. Um the [laughter]
bottom of your pyramid, the base is the
end developer, like the data developer
that's choosing to use open code. Maybe
they're not paying you. They have no
intention of paying you. But the top is
where the enterprise is. Uh and that's
that's where you make all your money.
But the size of the top is a function of
how big the base is. So if you have 1
million users versus 30 million users,
that's what impacts how much money you
can make at the top. So, we're very
focused on just making this a really
great tool that's adopted by a lot of
people because that's what caused uh
enterprise imbalance and that's where we
we make money. Um, that's our primary
setup right now. Um, this might change
over time. Like our inference business
is actually growing quite a bit and we
never really intended to make much money
there, but it's turning out to start to
make money. So, yeah,
&gt;&gt; we we are going to talk about the we are
going to talk about the long-term plans
of Open Code at the end of the
interview. But meanwhile, I want to ask
you something cuz it always comes on my
streams again. Uh people when they go to
the open code open code website, they
see the word zen, but they go to the
GitHub repo, they see anomaly. So wonder
if you could um you know uh kind of
briefly explain a little bit what is
anomaly, what is Zand and um in terms of
structure that powers this open code
project.
&gt;&gt; Yep. Gotcha. It's a little confusing. So
uh our corporate company name is called
Anomaly. We're not new. We've been
around for a very long time. been doing
stuff at open source for a very long
time. Open code is one of our products.
Given how big it's gotten, it's like our
is our main focus. Um, but the team
behind it is the anomaly team. We're
about a team of 10 now. Open code Zen is
so like I said, Open Code is designed to
use with anything. Bring your own
provider.
&gt;&gt; Configure however you want. We're not
trying to make you use anything
specific. But for people that want like
a nice out of the box experience, they
don't want to go sign up for Anthropic
manually or to Open AI instead of all
their keys. Uh we have a single service
you can sign up for, open code zen. Um
and that gives you access to all the
best coding models uh at at really
competitive pricing as well. Um so
that's like an optional thing you can
choose to sign up for and use with open
code. Unlike cloth code, basically open
code supports multiple models, multiple
providers, but recently enthropic uh
which is one of those providers had a
few restrictions which little impacted
open code. Um so I want to ask you if
you could walk us through like share
your perspective. Why do you think
entropic uh made this move and if you if
do you think if this move was directly
targeting open code or or open code was
just side effect of this? What can you
share? What is the story behind this?
&gt;&gt; Yeah, so um in the market there are some
interesting uh pricing things that
exist, right? So uh Anthropic came out
with this $200 a month subscription plan
where you pay that fixed amount and you
get quite a lot of inference behind it.
There's some limits, but they're like
really really generous, like une
uneconomically generous. Uh, as like
they're not like for that direct $200
plan, um, you are getting quite a lot of
money out of it. Uh, from very early on,
Open Code had uh an O plug-in system, so
you could bring in um additional
providers that Open Code doesn't
natively understand. And there is a very
popular Anthropic plugin that lets you
use your Claude Mac subscription uh with
Anthropic. this has always been against
their terms of service. This is not
something that they like officially
endorsed. Um, but you know, like a a
good chunk of people enjoyed using open
code with that. Um, it's not the
majority of our users. It's not like uh
a large amount, but given we're at a
million active users, even 10% is, you
know, 100,000 people, right? The
anthropic of course is creating that
plan to get you to use cloud code so
that you like to use cloud code so that
your team starts to use cloud code so
that they can send they can sell your
team an enterprise contract which is not
a subscription it's like there's there's
seatbased pricing and there's pay as you
go token pricing so that's where they
make a good amount of money. Um so like
their idea is try to get people to use
it with the max subscription you know
eventually trickle down to their team
and that's where they make their money.
That's their funnel. Um, so you can see
why if people are using Cloud Code,
Cloud Max with a different uh tool,
maybe they're not super happy about that
because that's that's not how like like
their plan works or their that's what
that's not how their strategy works. Um,
so at some point uh couple weeks ago,
they attempted to block uh Open Code
users or initially it was like a it
seemed like a gener generic block.
Eventually it became like an open code
specific block. They were trying to like
find anyone that was an open code user
and and block them. Uh there's a lot of
confusion around this. So it one, it's
their company, right? They can enforce
their terms however they want. It's not
immoral. It's not bad. Uh they have
their strategy. They need to they need
to like make sure it works. They can
they're totally allowed to block people
legally. An end user is allowed to work
around that block. There's nothing
illegal about you being like, I'm paying
for the service. I can access it however
I want. Totally extremely well protected
by law. Lots of cases uh historical
cases around this. You're allowed to
access it however you want. the
company's allowed to block you however
they want. So it's like a fair, you
know, onetoone situation. So of course
given our massive open source community,
any block they try to put out within 15
20 minutes, someone found a workaround.
Um, so I think right now it like
currently works. Like they tried to
block it, it it still works. Uh, it's
extremely hard for them to block it
because they can't block it in a way
that breaks old cloud code client. So
like it's like a cat and mouse thing. Um
so we had known that this was going to
be something that they tried at some
point given we understood their
underlying strategy. Um we have the
opposite strategy right like the entire
idea is I don't believe you need to be
so loyal to a model that you need to use
that you should have to use the model
and all the other tooling and set up all
your workflows around cloud code
specifically which just makes it really
hard to switch to a different model if
um you know OpenAI or someone else comes
out with something more compelling.
Anthropic knows that that will happen or
they're at risk of that happening. So,
they want to get you fully into their
ecosystem as possible. We don't have
that approach. We have a different
approach. Um, but we knew that, you
know, we're counterpositioned this way.
So, they would kind of try to like push
uh, you know, try like block this kind
of thing. Um, so we've been working for
months like talking to other LM
providers and trying to get it trying to
get them to officially support open
code. Um, I think a lot of people saw
this and thought, "Oh, this all happened
after anthropic blocked it, but we had
been working with GitHub for a while."
So, GitHub now officially supports open
code. Um, when we saw the open the
anthropic block happen on Thursday
night, I messaged OpenAI right away
being like, "Hey, you guys have a shot
tomorrow to counter position and like a
lot of people are going to be mad at
Anthropic. You guys have a chance to
like do the opposite and get a lot of
goodwill." And they jumped on the
opportunity and they moved really
quickly. So, now your chatgbt pro
subscription can be used with open code.
Um, and we've announced and then GitLab
as well. We have a few other big players
that are going to officially support
open code in the next couple weeks. Um,
so at this point the positioning is, you
know, Anthropic fully trying to do the
full stack, fully vertically integrated
thing. Rest of market, they're trying to
just provide the LM and let you use
whatever end tools you want to use. But
yeah, this obviously upset a lot of
people.
&gt;&gt; Oh, it did. I was one of them honestly.
So, [laughter] and uh and since that
moment, I actually started using the API
directly, meaning the, you know, via API
key. And my it was just my budget went
for $500 in two weeks just for a cloth
opus 4.5 you know uh which is not crazy
but it might be crazy it might be a
little bit you know so in in a month
will be a thousand so um changing a
little bit of topics here recently you
introduced open code black we have a a
question from the chat which is when the
next batch of black accounts will be
activated and maybe you can explain a
little bit what open code black is.
Yeah. So given like we saw uh Anthropic
offering this $200 plan and they have
like a $20, $100, $200 plan. We have
been very curious to understand the data
usage behind these. Like the average $20
user, how much do they use? Average 100,
how much they use, average 200, how much
do they use? Um to see if can we offer
something similar. Of course, we're
never going to be able to offer the same
amount of limits that Anthropic can.
They have one, a lot more money, and
two, they have a pricing advantage
because it's their own model. But what
we can offer is is a subscription that
lets you use many models. So you can use
uh GBT models and you can use cloud
models. There's a really good reason to
use both. I use both day-to-day. Um some
people don't care about that. Some
people just want to use one which makes
sense just go use the provider
subscription plan. But we wanted to see
can we offer something that is
compelling at those price points. So
we're rolling it out slowly more more
one because of capacity reason and two
like we need to understand usage
patterns and figure out what limits are.
Um we're going to roll out a batch
today. Um, so a bunch of people will get
access today. Uh, and yeah, we're gonna
take it from there. Realistically, like
we don't know if this something we're
going to do long term. For us, this is
more about like answering these
questions of like what kind of system
can you create around this stuff. Um, it
might be unsustainable. Uh, you know, as
we scale, we can get discounts that
other people can't get can't get access
to. So that kind of helps us. But yeah,
it's like a whole like math. It's a very
basic math problem. you were mentioning
now um understanding all these models
and I just told you that you know cloud
cop cloud opus 4.5 went expensive for me
especially with this API key I want to
ask you like uh your workflow like I'm
literally curious what is your favorite
model what is your workflow combo right
now um which model you use for planning
for execution do you have a crazy sub
agent system what is your setup at the
minute
&gt;&gt; yeah I mean I've talked about this
before I feel like I invented a
skateboard and I'm like okay at using it
and then someone else dude who does like
all this crazy stuff that I didn't even
know was possible. So even though I like
make open code, that doesn't mean that
I'm like the craziest user of it. Um I
use it vanilla, very simple, very basic.
Uh when open 4.5 came out, I think like
a lot of people, I started using it
because it was uh I wouldn't say that
much smarter than previous versions, but
it was just like polished. Like it did
the right thing I asked it to do. It
didn't go crazy. Um like the errors were
were very low. So I started getting
really into Opus. Um, more lately I've
been trying to get better at using uh
GPT 5.2 codecs. Um, given one, OpenAI is
not officially supporting Open Code.
Two, they've made several announcements
about how they're going to make it a lot
faster. That's my number one issue with
Codeex. It's it's a little too slow for
the type of work I want to do. Um, but
yeah, so for me, I over time I've been I
think like everyone I've been increasing
the size of task I've been giving to
these things. Um, but yeah, I'll flip
between Opus and and Codeex 5.2. Um,
I'll maybe have some parallel going.
Nothing too crazy. I think generally I
really only have one at a time. With
Codeex, you're kind of encouraged to do
more in parallel because it it is slow.
But yeah, like I think those are two
models that I use currently. I'm hoping
we improve our codec support and Codex
gets better and maybe I can go fully in
on on the codec stuff. That's kind of
where I'm looking at right now. But I
know very competitive market. Lots of
things changing. 2026 is going to be the
year of open source models. We're going
to see some crazy drops. So that might
also change things.
&gt;&gt; [laughter]
&gt;&gt; what is that feature or that capability
that you haven't shipped yet because
it's hard or too controversial but you
would love to have it at open code.
&gt;&gt; So I think the next major thing in uh in
the open code 2I at least is a review
page or a review screen. So right now I
think a lot of us have the flow of we
prompt it we let it run and it's made a
bunch of changes. Now we need to like
look over the changes and you can use
your editor you can do like a git diff
you can like you know see what what's
happened but we can provide something in
app that's native so it's probably going
to be another screen that you can flip
to and you can see all the changes that
happened in the session the files that
changed um ideally you can like select
sections and then give it back to
feedback to the LM so you can prompt it
again so that's uh I think I think every
app in this category is going to have
something like that like cursor kind of
already has something like that so we're
going to bring this into the terminal
it's an example of something that you
know like cloud code couldn't do this
because their terminal setup is more
minimal. We can do something pretty
pretty advanced here.
&gt;&gt; So that's exactly how is open code by
the way. I use open code on the left and
I have this GitHub UI on the right which
allows me to review the produced code
and I honestly think that will be that
will be just a default ID for everyone
in the next 3 four months uh cuz uh
people want to just you know chat with
AI and AI will produce code but you also
want to review it at the same time.
That's the true flow of aentic coding in
my opinion. Um and you know we started
with no autocomp completion at all
decades ago. Then two went to autocomp
completion with bad ids like PHP Storm
and Jet Brains. Now we have terminal
agents on the CLI but we now also see
this desktop UIs that are literally
spawning tasks see the outcome validate
the code. Uh I want to ask you if you
think personally that this will be the
perfect ID experience in the next 12
months for everyone or do you think it's
going even further than this? Yeah. So
we we are also building open code
desktop which is our experimentation
with what does a dedicated open code
desktop app look like. Um and it's not
an editor like it doesn't let you edit
files. It's not meant to replace your
editor. Um
&gt;&gt; so yeah it's just really narrowing in on
this prompt review loop make it really
good to review. And I think the
direction we're also going in is um the
next iteration of open code's core is
it's going to be able to orchestrate um
agents across many like environments. So
you can have agents running in different
git work trees. You can have agents
running in a remote sandbox. You can
have like a lot of stuff going on. And
the desktop app might have to turn there
might be a screen in desktop app that
lets you um like coordinate all these
different things. We can kind of plan
out work, you know, kick it off to 10
agents, have them all working and kind
of like see everything and review stuff.
Um that is very different than an
editor. It's very different than
something like cursor. That's very
different than like the GitHub uh UI. So
we're I don't think that's something
that every single person's going to use,
but we are we are experimenting with
that. But uh yeah, I think there is
definitely room for what does a desktop
app, what does a guey actually look like
now that maybe editing for some people
is uh not the primary thing.
&gt;&gt; I honestly feel like if you can have
that review experience on a terminal,
that will just be perfect for me. I
don't want anything else. That will be
that will be it the the peak of
productivity for Nuno for sure. Huh.
Within two years from now, where do you
think open code will be? What is the
perfect outcome? Like if you could snap
your fingers and just have the future
open of open code in two years from now
an anomaly in Zen and XYZ like what
would be the perfect outcome for this
story?
&gt;&gt; Yeah, I think I'd love to have open code
be available in every single form that
it can exist. So we have the TUI, we
have a desktop app. I'd love to have a
mobile app. I want to make sure our
editor integrations are very good.
They're not very good right now.
&gt;&gt; Um open code's meant to be embedded.
It's like there's a reusable core. So it
needs it should get embedded in every
possible place that it can. Um so that
that's what I'm I'm hoping we can have
like a very compelling offering in that
way. And I also want to make sure that
you know working with teams is really
great. Uh so we barely done much teams
features. U the other thing that's also
been surprising is the open code SDK has
a ton of usage. It's also something that
we haven't put that much effort into. So
I'd love to polish up the open code SDK,
make it so you can programmatically call
it uh script things like stuff in your
CI. U people are doing all kinds of
crazy stuff with with the SDK. Um, so
yeah, our scope is like super wide and I
just love to have full coverage of it.
Um, I don't know what coding is going to
look like in 2 years. I try not to like
be like obsessed with, oh, in two years,
you know, it's going to be like this and
all engineers like I'm like really tired
of that conversation. Just taking it a
day at a time. And uh, yeah, it's it's
made coding more and more fun for me.
So, I'm I'm happy with that. I'm always
take that time.
&gt;&gt; Dude, you just when you said mobile, it
just remind me of Taylor. Like literally
the other day a dude was telling me,
"Would it been wouldn't it be cool like
being on a [&nbsp;__&nbsp;] in on the umbrella
having a cocktail and just literally
asking tasks to my mobile phone."
&gt;&gt; Jesus Christ. Jesus Christ. [laughter]
&gt;&gt; Um, dude, you said that you you try to
not guess the future. I have a question
on that one because recently I've been,
you know, we all have Twitter and you
know how Twitter is. I don't know how
your timeline looks like at the minute,
but my timeline I feel I'm getting
bombarded with literally a every [&nbsp;__&nbsp;]
single day stuff about AI. You know,
there is open code that did that. that
is shachi you know shachi pt that did
that and there is cloud code who now can
do way more stuff and that is this new
model which is way better than doing
this and the other model that can do
much better and we are all screwed again
and it's just so sometimes it's a little
bit frustrating and I get scared even
and if I get scared and I have like a
job at Laravel and I have a YouTube
channel in XYZ I cannot even imagine a
junior developer coming to the scene you
know [clears throat]
so I want to ask you like uh do you
thoughts on this? What how what do you
think junior developers should adapt,
learn differently? Like what do you
think? Like what would be your advice
advice for junior developers?
&gt;&gt; I I have a hard time cuz I think about
how I use these things. I think about
they've definitely gotten so much better
than they were years ago. But there's a
whole class of things that hasn't
changed. Like I am still spending so
much brain power. I feel like more brain
power than ever thinking about like what
should we we we be working on? How
should it be built? I still feel like I
mean a lot of people are taking the
route of oh [snorts] you know the like
code is no longer something you need to
look at. It is like compiler artifact.
It's like the AI generates the AI
iterates on the AI does whatever. You
don't have to look at it. You're just
directing it what features you want. I
haven't seen that at all. Like I think
um I just don't think people have worked
on stuff for super long with in this
form because AI makes a huge mess. It
like never writes the exact code that is
exactly what I want. And if I'm just
continuing to do that every single day,
it starts to get worse. Like it it can't
deal with a bad codebase either. Like
yeah, it's it's less annoying for a you
can like tell the AI to go fix a bad
codebase versus you having to go into
it. That is nice, but it's also just
better not to have a bad codebase. And I
think um a lot of the stuff that is
historically been true of like what
makes a maintainable codebase, what's
readable, what is well organized. I
mean, if you think about I don't know
why people talk about the agent like has
no preference. It definitely has a
preference, right? You think about
what's good for a human. When you open a
new project, a good file structure,
right? There's like highle concepts.
Things are organized into right folders.
You can kind of guess what's in in the
folders based off of how they're named.
&gt;&gt; If you want to add a new feature, you
can kind of immediately have a sense of
where it should go. If you're looking
for an existing feature, you kind of
have a sense of where it is. Those are
all great things to do in a codebase for
a human. The agent works the exact same
way. It like does a glob on your file
system and sees the folders. the better
those are organized, the better it can
find stuff. Um, so people treating this
thing like, oh, codebase quality is no
longer a thing that matters. I don't
think that's true. In fact, when I
started using coding agents, it actually
had the opposite effect for me. There
was a bunch of uh inconsistencies in our
codebase that weren't a huge deal cuz
I'm like, a human can like understand
that there's old code. We don't do stuff
the way we used to do in the old code
anymore and like we do stuff in this new
way
&gt;&gt; and we haven't the old stuff, but it's
fine. Yeah. Yeah, but the agent sees the
old stuff and it's like, "Oh yeah, I'm
going to do stuff like that." And it
motivated me to clean up my codebase a
ton because the more the more clean it
was, the the the better the agent
performed and I got the full value out
of it. So, if you are a junior, yes, all
this stuff is there. To be honest, I
don't I try not to give too much advice
for junior engineers cuz this is like a
new different world than I was. Like
whatever made sense when I was a junior.
I don't I don't know. I I can't really
tell what people are doing with
nowadays. I don't really have that much
advice. But personally, I think being a
good programmer is still extremely
valuable. Um, we are getting a ton out
of AI. We're all pretty decent
programmers and I think that is related.
So, I still think it can hurt to to be
good at programming and I think it's
easier than ever to get good at
programming because you can you have
this amazing tutor that's available that
I didn't have that nobody else had, you
know, 10 years ago. Um, so in a lot of
ways, you do have a a good opportunity.
&gt;&gt; Now, I think I think your answer was
top-notch. I would just add that you
know what I typically see on my streams
that quote quality is now more important
than ever. If you have a nice starter
kit in your project with really nice
conventions, AI will just follow. If you
have coded a feature in the perfect way,
AI will just mimic that feature for the
new feature you are requesting. And
things like type coverage, code
coverage, uh strict typing, all that
stuff is now even more important than
ever because they are going to guide the
AI producing uh code quality. Literally,
this is true for PHP, for JavaScript,
for TypeScript, for whatever language
you are using. One last game for you
before you go. I really appreciate, by
the way, all the interviews so far. And
we're going to close this with a rapid
fire game. I'm going to throw to you
five rapid fire questions and you have
to answer super fast. And you cannot say
it depends or I don't know. You just
have to pick you have to pick an answer
and fast. And just as an example, if I
were to ask you, do you prefer PHP or
JavaScript? You probably would answer
instantly JavaScript. Okay, you ready?
&gt;&gt; Yeah.
&gt;&gt; All right, let's go. JavaScript or
TypeScript?
&gt;&gt; TypeScript.
&gt;&gt; Laravel or Rails?
&gt;&gt; Laravel.
&gt;&gt; From 1 to 10, how bad is working with
David Hill? 10 is super bad. One is
good.
&gt;&gt; Like a seven.
[laughter]
&gt;&gt; Question number four. Did Verscel ever
try to hire you?
&gt;&gt; Yes.
&gt;&gt; Every single guest man I have here
answers yes on that one. [laughter] Last
question. So I just made the pull
request to OpenAI to add Lavel Pint as a
PHP formatter. Yes or no? If I send you
the link after this interview, will you
just press the merge button?
&gt;&gt; We will merge it.
&gt;&gt; Here we go. Chat, thank you so much for
joining me. Dax chat, if you enjoyed
this conversation, please don't forget
hit the like, subscribe, and tell me in
the comments what do you think about
open cord open code in the work they are
doing. Bam bam boom Dex, that was
awesome, man. Thank you so much.
