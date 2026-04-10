---
video_id: "Yb9IyTOh0xg"
title: "“Anyone can cook”: How v0 is bringing git workflows to vibe-coding | Guillermo Rauch (Vercel CEO)"
channel: "How I AI"
topic: "ai-llms"
published_date: "2026-02-04"
ingested_date: "2026-02-04"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=Yb9IyTOh0xg"
duration: 2616
word_count: 4000
chunk: 1
total_chunks: 3
parent_video_id: "Yb9IyTOh0xg"
---
I'll say one thing about VIP coding.
It's really easy to go from zero to one.
I think we've all seen the demos of I
prom thing and it's cool. I think what's
harder is to iterate on a project at
scale and to deploy changes safely.
Every marketer ever sells to change this
page at some point and the old way was
one of two ways. One is what I called
you had to petition to the government.
You had to go to engineers and say,
"Engineers, can you please add a logo
over here or whatnot or pray that the
CMS was perfectly wired up for any
ambition or dream or idea you had. So
now they can just open this page in VZ
and prompt anything that they want.
&gt;&gt; It reduces the friction of getting
something live really, really low. the
humiliation ritual of prioritization
goes away and you can actually focus
your time on defending the merits of an
idea on the actual idea as opposed to
the hypothesis of the idea that then has
to be implemented. And so I think it
changes the speed of companies in a
really significant way.
So this is truly a first time vibe
podcast that we're doing together and I
wanted to introduce myself. I'm Claire
Vo. of a product leader and obsessed
with AI and I have a podcast, How I AI,
where I teach people how to build better
with all these new tools, including ones
that we're going to see today. And I'm
really excited to have you here, G.
First, we're just going to get to the
the thing that everybody's wondering
about. What is your most favorite
feature that you released this week on
VZero?
&gt;&gt; Well, I'll tell you the hottest thing in
AI today is skills. Everyone is excited
about the fact that we can now augment
agents and AI applications and agentic
engineering with skills like skills that
the model doesn't yet have. And so we
launched skills.sh
and the beautiful thing about what we'll
show you today is that Vzero can
seriously go from prototype all the way
to production. So we're able to conceive
changes to things like skills.sh. I'm
going to show you really quickly.
Skills.sh SH is a new you can think of
it as like npm. It's a hub an open
ecosystem of skills and it's pretty
dramatic what's happening to this site.
So you can see that we now have 34,000
skills submitted by the community and
this website has gone viral all over the
internet. It's hosted on Verscell but
the most exciting part to me is that it
was conceived in Bzero.
&gt;&gt; I have a quick question for the
audience. How many of you have installed
a skill in the last week?
&gt;&gt; Oh wow.
&gt;&gt; Okay. A lot of people
&gt;&gt; skill build.
&gt;&gt; Um, how many of you have the top three
installed?
&gt;&gt; Actually, top
&gt;&gt; it's very heavy at the top. Right. It's
like
&gt;&gt; these are ripping.
&gt;&gt; Oh, no. I have top seven. Okay. Yeah, I
have the top seven installed right now.
Um, this is a really great resource. So,
for folks that are maybe watching this
later or haven't been familiar with
skills, skills is now this standard that
a lot of these agentic frameworks are
using. to help you repurpose and reuse
best practices, step-by-step flows. And
so, for example, I use this Remotion
best practices one um to let me import
components and regularly create videos
really, really quickly. And I would not
have been able to do this without the
expertise that's been packaged in these
best practices that were installed with
one line um using skills.sh. I think
it's also worth noting maybe to peel the
covers of how Versel builds products.
&gt;&gt; Yep.
&gt;&gt; Skills out a stage was a thing that was
just conceived at the moment of
inspiration. We started prompting, hey,
wouldn't it be cool
&gt;&gt; if this thing took shape?
&gt;&gt; Would we discussed for example what it
should look like? We we've been calling
this style terminal core because it
looks a little bit like this is my
contribution to the project. I was like,
hey, wouldn't it be cool if we make the
top of the website look like a terminal?
And so the the the process itself of
building this was very much prompt
driven I'll say like chatting in Slack
and saying hey wouldn't it be nice if we
had a hub for this just very iterative
very collaborative between the team
members at Verscell and what's really
cool about this again is it's really
fast so it takes advantage of all the
versel infrastructure primitives even
though it has 35,000 of the skills like
if I start like like hardcore scrolling
this and then pick a random one. All
right, Swift Taylor Swift. You're going
to see like the page transitions are are
swift to UI. Okay, but uh like all the
page transitions are instant production
grade. He needed to scale. There were
going to be a lot of eyes on this thing.
&gt;&gt; Okay. So, I think we want to get to our
first workflow for how AI and you just
want to show us how you either develop
this or how you and the team improve
this over time using the tool.
&gt;&gt; I'll say one thing about VIP coding.
It's really easy to go from zero to one.
Like I think we've all seen the demos of
I prom thing and it's cool and I think
what's harder is to iterate on a project
at scale and to deploy changes safely.
In in the case of how we work on versel
products, we always work on branches and
we take advantage of branch previews and
then we code review and then we merge
them. So what we're basically going to
be showing you today is how we brought
those ideas of hardcore
heavyduty
production grade engineering to visit.
So I'm here I'm binding that same
project that you just saw skills.sh
which is piped into is basically backed
by git the engineer who built this
pushed some code three hours ago and you
have this new button within v 0ero which
is a new branch. So what this is showing
you is that B 0 is making the git flow
of creating branches a first class
citizen of the product. So I'm going to
create a branch
and basically this is going to give me
the same sort of like chat experience
you're used to. But notice here at the
top I get this beautiful new convention
of project slash branch. Right? So I
have the v 0/rouchg
branch. And here within the preview,
you're going to notice that just like if
you had cloned the project to your local
device, we both have a full full scale
uh VS Code editor as well as the real
project running within VZ. One thing I
want to pause and notice because I just
have a laser eye for product is I love
that you use the convention that all of
us with engineering teams use on our git
branches which is who's the contributor
slash what's the feature and so what I
think this is really interesting you
know we're going to talk about how you
actually use these tools to build but I
also think there's a flip side of how
you design great um AI products and
agentic products and I still like the
small design tweaks that make something
like a vzero feel like a collaborative
teammate on your
So I for all the engineers out there, I
noticed I noticed that little
convention.
&gt;&gt; So I and what you're going to see in the
design philosophy of the product is that
we really wanted to embed those little
details of what makes a real engineering
workflow come to life, but in a really
easy way, right? Like at the end of the
day, I didn't have to go to a terminal
or boot up GitHub desktop and branch
manually. Like it's the stone age. I
just press a button and now I have a
branch running. So the main idea here is
that within this preview I have the full
skills.sh project running. It downloaded
dependencies. It installed the exact
versions of Nex.js and every dependency
uh within the project. I have it all
running here. I have it obviously within
a staging or dev sort of environment.
And now you know I I could navigate it
like uh I could navigate the production
website. I could explore it. I could,
you know, use all the capabilities that
Vzero uh brings to the table, but I
figured let's actually build a feature
that we could ship to prod.
&gt;&gt; Yeah. And one thing I want to pause on
what you I think glossed over a little
bit, which is the fact that you have
this VS Code instance, the fact that you
have all your dependencies installed,
the fact that this is running both with
code and a preview. For anybody who's
less technical out there, and maybe a
lot of your users that are using
vzero.app app are less technical. This
even like downloading VS Code, getting
your local environment set up, like I
spent this morning with my designer
installing homebrew like like it just
wasn't on her laptop. And so
&gt;&gt; it's nightmare feel.
&gt;&gt; It's nightmare. And so if you're trying
to step from this like vibe coding
prototype in web experience into feeling
more like a software engineer without
having to have Claire handhold you
through like brew install, this gets you
like halfway there. And so I think
there's also this learning aspect of it
I want to make sure people don't miss.
But let's get into building something
obvious.
&gt;&gt; So one another part of our product
development process is really listening
to community and listening to customers.
So people have been asking for a lot of
different tools so that we could guide
them towards knowing if a skill is high
quality, vetted, verified because
there's so many skills. At last we
checked there were 500 skills being
added every hour. And so one of the
ideas that we came up with is like could
we add um a rating system. So let's add
a fivestarbased
rating system for the skills. Uh put it
on the sidebar.
Um be mindful. So I'll also give you
like a little bit of my real time
consciousness on if I were talking to an
engineer and say like what could go
wrong if we accept ratings from the
internet. One of the things that can go
wrong if you accept ratings from is
abuse. So let's say let's tell VZ be
mindful that uh we should rate limit or
prevent abuse on the scores that we
receive. And again, for me, it's all
about thinking from a production
readiness point of view when I think
about the new VZO and make it make sense
within the style of this skills website.
&gt;&gt; What I love about what you're showing us
is you have this very very high
sophistication prompt here, which is
make it make sense. So, we have three
three incomplete sentences on a
production app serving thousands,
millions of people. and you're going to
fire it off. And while you do this, one
of the things I want to just call out
that I think you know why this feature
is maybe important right now is I don't
know if you've heard there's like this
crustation crawling all over everybody's
MacBook minis and skills can be a a
prompt injected vector for things. And
so as you're trying to make sure that
this becomes the centralized hub for
discovering skills, which I think it's
starting to be, it is upon you to kind
of make sure that the quality is there,
at least you have the right thing um
right things in place so people can make
the decision to follow with your
analogy. This is a little bit like we're
vibe coding on top github.com or
npmjs.com. It's like a really really big
deal.
&gt;&gt; All right. So I was going to walk you
through what Vzero is doing which of
course if you've used V 0ero before we
everyone does the whole like talk over
the thinking trace because agents are
not the fastest but I do want to point
out a few things that are really
important. So um D0 is all about
leveraging the integration and
marketplace capabilities of RCEL. So in
this case it knows what the data source
is of this project right we're storing
data in reddis by app stash obviously
it's going to go through the whole file
system it's going to try to interpret my
requirements this is already like really
nice to see that it's not inventing a
new way to store the data like it's
actually paying attention to the data
that I use
um and so we'll take a look at uh again
here like it actually gave me something
that
meets my requirements right? Like it
fits within the design style. I can
submit a rating. It is stores the
rating. So I have now my fivestar one
rating. I guess I'm going to
&gt;&gt; It's terminal core
monace font.
&gt;&gt; Um let's refresh the page to see that
persistence actually works. Beautiful.
There's a tiny bit of layout shift that
triggers my neurosis. So we'll tell it,
hey, when we don't have data, make sure
there's no layout shift. By the way, for
those of you that are like less
neurotic, I guess. So, it bothered me
that when we refreshed the page, when we
didn't have data, like it jittered the
sidebar a little bit. So, we're just
going to have the zero.
&gt;&gt; So, while we're uh jibber jabbering
while the it's thinking, which I have to
get very good at as a podcast. So, I
will call out that I have observed a
Verscell internal hackathon and I have
seen this man screenshot like rounded
corners that are not right and just put
them in the chat with like a question
mark. And so it's it's yeah it it speaks
to my um
&gt;&gt; my very attention to detail heart that
you saw you saw that did it work.
&gt;&gt; Yeah. Yeah. No, I'm fairly satisfied
like the Yeah.
&gt;&gt; The skeleton was stable.
&gt;&gt; Yeah. Yeah.
&gt;&gt; Uh zero layout shift. So let's continue
with the we we talked about this uh
hardcore
uh engineering workflow like if if we
were making a change like this on skills
age again receiving hundreds of skills
per hour with lots of visitors we first
want to make sure that things work right
and right now you you can think of this
as a very capable dev environment we're
booting up the NexJS dev server in a
virtual machine it's it's it's basically
very true to the actual end result. In
fact, thank you to the Nex.js engineers
who sweated all of the details of
mirroring to the best of their ability
the dev environment and the production
environment. But there is another layer
of assurance that we can get, right,
which is so if you're more familiar with
the g like the GitHub world, the GitHub
side of things, you know that when you
push a new PR to GitHub, the this
beautiful Versel bot comes to sort of
save the day, right? you know that it
builds what you what you're changing and
then it previews it. Not only that, but
notice that Vzero really cooks. Vzero is
making me look so good here because I
haven't written a PR description in like
25 years 84 years. So Vzero produced a
PR described it um and then the magic of
our cell is coming in right so it's
giving me that uh preview. So I'm going
to I'm going to open it here. I'm going
to say visit preview. I I'm just again
I'm going to be a software engineer for
a second. Can we appreciate how quickly
that preview branch deployed?
&gt;&gt; Well, don't trigger me because it can be
10 times quicker. But yeah, I'm proud of
it.
&gt;&gt; Explain.
&gt;&gt; Now I have a production-like
environment. So when you see this URL
ending onverell.sh
is our enterprise versell environment.
That's why it had the 17 steps of
logging in. Um but this is basically
running on the production grade CDN on
the production grade rendering
infrastructure hosting infrastructure
etc. So now when I'm seeing that you
know rating there I have pretty pretty
good confidence. I was like yeah this is
shippable.
&gt;&gt; Okay so I have to ask a couple questions
about the you know inside the house view
of this. Is this how you all are
shipping code or is this a big chunk of
how you're shipping code to this? Is it
100%? How are you actually using this
for production?
&gt;&gt; So it's really interesting. We when we
cook on a on a project or a product
internally, we hold ourselves to the
same sort of high bar as if you had
launched a product externally because
you want to make sure that people are
actually adopting it, right? And so
before before we started chatting and
I'm going to give you a glimpse of again
the behind the scenes of Verscell, uh
we've talked a lot publicly about our
data analyst agent D0. Yes, we're very
creative with with names. We take the
first initial and we add a zero. So this
is our data uh AI powered assistant and
I was actually asking it um I said um
Vzero this is me by the way uh tell me
about PR's merged with Vzero in the
recent weeks tell me about its growth so
again PR's merged with DZ is a totally
novel thing and DZ cooked thank you DZ
it said PRs merged via DZ have seen
explosive growth in the last week wow
explo explosive growth.
&gt;&gt; I have to appreciate whoever prompt
managed this one because it did not put
the explosion of OG in there, which I
think would also trigger G.
&gt;&gt; All right, we should uh Yeah. Uh trigger
warning. Starting from near zero in
early January, the feature hit 3200 PR
submerged per day by January 2829, which
is basically today. An extraordinary
100x. The bots, the AIS do like to like
like Yeah. like sweet sweet tacas. But
um it's it's pretty amazing. So this is
in very very very early uh preview,
right? Like we we're just letting people
in. But I mean this is just such a
beautiful workflow. I mean imagine
triggering a task like this from your
phone, from Slack, from vzero.app.
Another convenience that we're adding is
that you can take a a U GitHub repo like
this and I can go to the homepage and
then I can paste it. And so now I could
import something that I already have and
create a chat from it. So anytime I have
an idea for a realworld project and
product that has in production, I can
now prompt. So I estimate that this is
going to change fundamentally how we
work, right? Uh it's also very visual in
nature which is really cool. Obviously,
there's a lot of ways of like getting
preview getting uh changes made by
agents today out out there in the world.
These everyone's very excited about what
what AI can do, but this is actually
showing me the the actual results and
like things that are going to happen.
So, I I grade this really high for the
kind of products that we build at VCell
and uh I expect this to continue to have
a lot of traction.
&gt;&gt; So, I have to ask you sort of
operationally, how do you imagine
companies do this? And one of the things
I'm thinking is I was chatting with
Caroline who interrupted you all and say
we're said we're going to start the
podcast and she said last night I was
prepping for this demo and I vzero coded
something and somebody saw it and was
like well that's a good idea you should
just merge it and ship it like do you
imagine or inside the company who's
shipping code how are you enabling that
as a CEO how does the culture support it
how does it not
&gt;&gt; until now everyone could cook right
everyone could create a prototype a new
design a suggestion. In fact, uh, moment
of vulnerability because I haven't
really even opened this in a while, but
like, uh, let's see if I have I probably
created a bunch of things that I've been
suggesting to the teams that we could
look at, right? Um, ignore this one for
a second, but um, so anytime I have an
idea on how to improve the product, I
nowadays create a Vzero. Now the
difference is that until I had this
mechanism to hand it off as a pull
request to the engineering team then I
was kind of like playing in La La Lands.
I was like in out there in this like
prototype world and now we have a common
foundation and a common substrate so
that if you have an idea whether you
work in marketing like marketers always
want to change the website like imagine
like go to verscell.com I'll show you a
page that is actually quite uh fun at
versell so our enterprise page every
marketer of versell wants to change this
page at some point right and the old way
was to one of one of two ways. One is
what I called you had to petition to the
government. You had to go to engineers
and say engineers please can you can you
please add a logo over here or whatnot
or pray that the CMS was perfectly wired
up for any ambition or dream or idea you
had. So now they can just open this page
in VZ and prompt anything that they
want. But it would be somewhat
irresponsible to just ship it, right? So
with the Git workflow and opening a PR
and being able to preview it, we can all
build confidence that it's going to be a
good change, roll it back if needed, and
and again, this is a website that's it's
