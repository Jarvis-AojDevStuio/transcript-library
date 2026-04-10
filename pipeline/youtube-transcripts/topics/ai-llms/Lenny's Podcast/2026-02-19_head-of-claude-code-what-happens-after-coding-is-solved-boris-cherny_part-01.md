---
video_id: "We7BZVKbCVw"
title: "Head of Claude Code: What happens after coding is solved | Boris Cherny"
channel: "Lenny's Podcast"
topic: "ai-llms"
published_date: "2026-02-19"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=We7BZVKbCVw"
duration: 5265
word_count: 3997
chunk: 1
total_chunks: 6
parent_video_id: "We7BZVKbCVw"
---
100% of my code is written by quad code.
I have not edited a single line by hand
since November. Every day I ship 10, 20,
30 p requests. So at the moment I have
like five agents running while we're
recording this.
&gt;&gt; Yeah. Yeah. Do you miss writing code?
&gt;&gt; I have never enjoyed coding as much as I
do today because I don't have to deal
with all the minutia. Productivity per
engineer has increased 200%.
&gt;&gt; There's always this question, should I
learn to code? In a year or two, it's
not going to matter. Coding is largely
solved. I imagine a world where everyone
is able to program. Anyone can just
build software anytime. What's the next
big shift to how software is written?
&gt;&gt; Quad is starting to come up with ideas.
It's looking through feedback. It's
looking at bug reports. It's looking at
telemetry for bug fixes and things to
ship a little more like a co-orker or
something like that.
&gt;&gt; A lot of people listening to this are
product managers and they're probably
sweating. I think by the end of the
year, everyone's going to be a product
manager and everyone codes. The title
software engineer is going to start to
go away. It's just going to be replaced
by builder and it's going to be painful
for a lot of people.
Today my guest is Boris Churnney, head
of Claude Code at Anthropic. It is hard
to describe the impact that Claude Code
has had on the world. Around the time
this episode comes out will be the
one-year anniversary of Claude Code. And
in that short time, it has completely
transformed the job of a software
engineer and it is now starting to
transform the jobs of many other
functions in tech which we talk about.
Cloud code itself is also a massive
driver of anthropic overall growth over
the past year. They just raised a round
at over $350 billion. And as Boris
mentions, the growth of Claude Code
itself is still accelerating. Just in
the past month, their daily active users
has doubled. Boris is also just a really
interesting, thoughtful, deepinking
human. And during this conversation, we
discover we were born in the same city
in Ukraine. That is so funny. I had no
idea. A huge thank you to Ben Man, Jenny
Wen, and Mike Griger for suggesting
topics for this conversation. Don't
forget to check out lennisprodpass.com
for an incredible set of deals available
exclusively to Lenny's newsletter
subscribers. Let's get into it after a
short word from our wonderful sponsors.
Today's episode is brought to you by DX,
the developer intelligence platform
designed by leading researchers. To
thrive in the AI era, organizations need
to adapt quickly. But many organization
leaders struggle to answer pressing
questions like which tools are working?
How are they being used? What's actually
driving value? DX provides the data and
insights that leaders need to navigate
this shift. With DX, companies like
Dropbox, Booking.com, Adion, and
Intercom get a deep understanding of how
AI is providing value to their
developers and what impact AI is having
on engineering productivity. To learn
more, visit DX's website at
getdx.com/lenny.
That's getdx.com/lenny.
Applications break in all kinds of ways.
Crashes, slowdowns, regressions, and the
stuff that you only see once real users
show up. Sentry catches it all. See what
happened where, and why, down to the
commit that introduced the error, the
developer who shipped it, and the exact
line of code all in one connected view.
I've definitely tried the five tabs and
Slack thread approach to debugging. This
is better. Sentry shows you how the
request moved, what ran, what slowed
down, and what users saw. Seir, Sentry's
AI debugging agent, takes it from there.
It uses all of that Sentry context to
tell you the root cause, suggest a fix,
and even opens a PR for you. It also
reviews your PR and flags any breaking
changes with fixes ready to go. Try
Sentry and SER for free at
centry.io/lenny
and use code Lenny for $100 in Sentry
credits. That's s n t r y.io/lenny.
Boris, thank you so much for being here
and welcome to the podcast.
&gt;&gt; Yeah, thanks for having me on.
&gt;&gt; I want to start with a a spicy question.
About 6 months ago, I don't know if
people even remember this, you actually
left Anthropic. You joined Curser and
then two weeks later, you went back to
Anthropic. What happened there? I don't
think I've ever heard the actual story.
It's the fastest job change that I've
ever had.
Um, I joined Cursor because I'm a big
fan of the product and honestly I met
the team and I was just really
impressed. Uh, they're an awesome team.
Uh, I still I still think they're
awesome and they're just building really
cool stuff and kind of they they saw
where AI coding was going I think before
a lot of people did. So the idea of
building good product was just very
exciting for me. I think as soon as I
got there, what I started to realize is
what I really missed about Ant was the
mission. And that's actually what
originally drove me to Ant also cuz uh
but before I joined Anthropic, I was,
you know, I was working in big tech and
then I was at some point I wanted to
work at a at a lab to just help shape
the future of this crazy thing that that
we're building in some way. And the
thing that drew me to anthropic was the
mission. And it was, you know, it's all
about safety. And when you talk to
people at Enthropic, just like find
someone in the hallway, if you ask them
why they're here, the answer is always
going to be safety. Um, and so this kind
of like missiondrivenness just really
really resonated with me. And I just
know personally it's something I need in
order to be happy. Um, and I that's just
a thing that I really missed. And I
found that, you know, whatever the work
might be, no matter how exciting, even
if it's building a really cool product,
it's just not really a substitute for
that. Um, so for me it was actually u it
was pretty obvious that that I was
missing that pretty quick.
&gt;&gt; Okay. So let me follow the thread of
just coming back to anthropic and the
work you've done there. This podcast is
going to come out around the year
anniversary of launching cloud code. So
I'm going to spend a little time just
reflecting on the impact that you've
had. There's um this report that
recently came out that I'm sure you saw
by semi analysis that showed that 4% of
all GitHub commits are authored by cloud
code now. and they predicted it'll be a
fifth of all code commits on GitHub by
the end of the year. The way they put it
is while we blinked, AI consumed all
software development.
The day that we're recording this,
Spotify just put out this uh headline
that their best developers haven't
written a line of code since December
thanks to AI. More and more of the most
advanced senior engineers, including
you, are sharing the fact that you don't
write code anymore, that it's all AI
generated. and many aren't even looking
at code anymore is how far we've gotten
in large part thanks to this little
project that you started and that your
team has scaled over the past year. I'm
curious just to hear your reflections on
on this past year and the impact that
your work has had. These numbers are
just totally crazy, right? Like four 4%
of all commits in the world is just way
more than I imagined and like like you
said, it still feels like the starting
point. Um these are also just public
commits. So we actually think if you
look at private repositories, it's quite
a bit higher than that. And I I think
the craziest thing for me isn't even the
number that we're at right now, but the
pace at which we're growing because if
you look at Quad Code's growth rate kind
of across any metric, it's continuing to
accelerate. Um so it's not just going
up, it's going up faster and faster.
When I first started Quad Code, it was
just going to be a like it was just
supposed to be a little hack. Um you
know we we broadly knew at Enthropic
that we wanted to get a we wanted to
ship some kind of coding product and you
know for enthropic for a long time we
were building the models in this way
that kind of fit our mental model of the
way that we build safe hi where the
model starts by being really good at
coding then it gets really good at tool
use then it gets really good at computer
use roughly this is like the trajectory
uh and you know we've been working on
this for a long time and when you look
at the team that I started on it was
called the anthropic labs team uh and
actually Mike Kger and you know Ben man
they just kicked this team off again uh
for kind of round two the team built
some pretty cool stuff so we built quad
code we built MCP we built the desktop
app so you can kind of see the seeds of
this idea you know like it's coding then
it's tool use then it's computer use and
the reason this matters for anthropic is
uh because of safety it's kind of again
just back to that AI is getting more and
more powerful it's getting more and more
capable the thing that's happened in the
last year is that for at least For
engineers, the AI doesn't just write the
code. It it's not just a conversation
partner, but it actually uses tools. It
acts in the world. Um, and I think now
with co-work, we're starting to see the
transition for non-technical folks also.
Um, for a lot of people that use
conversational AI, this might be the
first time that they're using the thing
that actually acts. It can actually use
your Gmail, it can use your Slack, it
can do all these things for you and it's
quite good at it. Um, and it's only
going to get better from here. So I
think for anthropic for a long time
there was this feeling that we wanted to
build something but it wasn't obvious
what and so uh when I joined ant I spent
one month kind of hacking and you know
built a bunch of like weird prototypes
most of them didn't ship and you know
weren't even close to shipping it was
just kind of understanding the
boundaries of what the model can do then
I spent a month doing post- training um
so to understand kind of the research
side of it and I think honestly that's
just for me as an engineer I find that
to do good work you really have to
understand the layer under the layer at
which you work. And with traditional
engineering work, you know, if you're
working on product, you want to
understand the infrastructure, the
runtime, the virtual machine, the
language kind of whatever that is, the
system that you're building on. But, uh,
yeah, if you're like if you're working
in AI, you just really have to
understand the model to some degree to
to do good work. So, I took a little
detour to do that and then I came back
and just started prototyping what
eventually became quad code. Uh, and the
very first version of it, I I have like
a there's like a video recording of the
summer because I recorded this demo and
I posted it. It was called QuadCLI back
then. And I just kind of showed off how
it used a few tools and the shocking
thing for me was that I gave it a batch
tool and uh it just was able to use that
to write code to tell me what music I'm
listening to when I asked it like what
music am I listening to? And this is the
craziest thing, right? cuz it's like
there's no we I I didn't instruct the
model to say, you know, use, you know,
this tool for this or kind of do
whatever. The model was given this tool
and I figured out how to use it to
answer this question that I had that I
wasn't even sure if it could answer.
What music am I listening to?
And so I I I started prototyping this a
little bit more. Um I made a post about
it and I announced it internally and it
got two likes. That's the that was that
was the extent of the reaction at the
time because I think people internally
you know like when you think of coding
tools you think of like you think of IDE
you think about kind of all these pretty
sophisticated environments no one
thought that this thing could be
terminal based um that's sort of a weird
way to design it and that wasn't really
the intention but uh you know from the
start I built it in a terminal because
you know for the first couple months it
was just me so it was just the easiest
way to build uh and for me this is
actually a pretty important product
lesson right is like you want to
underresource things a little bit at the
start. Then we started thinking about
what other form factors we should build
and we actually decided to stick with
the terminal for a while and the biggest
reason was the model is improving so
quickly. We felt that there wasn't
really another form factor that could
keep up with it. And honestly this was
just me kind of like struggling with
kind of like what should we build you
know like for the last year quad code
has just been all I think about. And so
just like late at night, this is just
something I was thinking about like,
okay, the model is continuing to
improve. What do we do? How can we
possibly keep up? And the terminal was
honestly just the only idea that I had.
And uh yeah, it ended up catching on
after after I released it pretty
quickly. It became a hit at Anthropic
and you know, the the daily active users
just went vertical. And really early on,
actually before I launched it, Ben man
uh nudged me to make a DAU chart and I
was like, you know, it's like kind of
early maybe, you know, should we really
do it right now? and he was like,
"Yeah." And so the the chart just went
vertical pretty immediately. Uh and then
in February, we released it externally.
Actually, something that people don't
really remember is Quad Code was not
initially a hit when we released it. It
it got a bunch of users. There was a lot
of early adopters that got it
immediately, but it actually took many
months for everyone to really understand
what this thing is. Just again, it's
like it's just so different. And when I
think about it, kind of part of the
reason quad code works is this idea of
latent demand where we bring the tool to
where people are and it makes existing
workflows a little bit easier, but also
because it's it's in a terminal. It's
like a little surprising. It's a little
alien in this way. So you have to you
have to kind of be open-minded and you
had to learn to use it. And of course
now you know quad code is available you
know in the iOS and Android quad app.
It's available in the desktop app. It's
available on the website. It's available
as IDE extensions in Slack and GitHub.
you know all these places where
engineers are it's a little more
familiar but that wasn't the starting
point
so yeah I mean at the beginning it was
kind of a surprise that this thing was
even useful and uh you know as the team
grew as the product grew as it started
to become more and more useful to people
just people around the world from you
know small startups to the biggest fang
companies started using it and they
started giving feedback and I think just
reflecting back it's been such a
humbling experience cuz we just we keep
learning from our users and just the
most exciting thing is like you know
none of us really know what we're doing.
Um and we're just trying to figure out
along with everyone else and the single
best signal for that is just feedback
from users. Um so that's just been the
best I' I've been surprised so many
times. It's incredible how fast
something can change in today's world.
You launched this a year ago and it
wasn't the first time people could use
AI to code but uh in a year the entire
profession of software engineering has
dramatically changed like there's all
these predictions oh AI is going to be
written 100% AI's code is going to be
written by AI everyone's like no that's
crazy what are you talking about now
it's like
&gt;&gt; of course it's happening exactly as they
said it's just so things move so fast
and change so fast now
&gt;&gt; yeah it's really fast back at uh back at
code with quad back in May that was like
our first uh you know like developer
conference that we did as Enthropic. Um
I did a short talk and in the Q&amp;A after
the talk people were asking what are
your predictions for the end of the year
and my prediction back in May of 2025
was by the end of the year you might not
need an ID to code anymore and we're
going to start to see engineers not
doing this and I remember the room like
audibly gasped. It was such a crazy
prediction but I think like at anthropic
like this is just the way the way we
think about things is exponentials and
this is like very deep in the DNA. Like
if you look at our co-founders like
three of them were the first three
authors on the scaling laws paper. Um so
we really just think in exponentials and
if you kind of look at the exponential
of the percent of code that was written
by quad at that point if you just trace
the line it's pretty obvious we're going
to cross 100% by the end of the year
even if it just does not match intuition
at all. Um, and so all I did was trace
the line and yeah, in November that, you
know, that happened for me personally
and that's been the case since and we're
starting to see that for a lot of
different customers too. I thought was
really interesting what you just shared
there about kind of the journey is this
kind of idea of just playing around and
seeing what happens. This came up comes
up with open claw a lot just like Peter
was playing around and just like a thing
happen. And it feels like that's a
central kind of ingredient to a lot of
the biggest innovations in AI is people
just sitting around trying stuff to
pushing the models further than most
other people.
&gt;&gt; I mean this the thing about innovation
right like you can't uh you can't force
it. There's no road map for innovation.
Um you just have to give people space.
You have to give them maybe the word is
like safety. So it's like psychological
safety that it's okay to fail. It's okay
if 80% of the ideas are bad. Um you also
have to hold them accountable a bit. So
if the idea is bad, you you know you cut
your losses, move on to the next idea
instead of investing more. Uh in the
early days of quad code, I had no idea
that this thing would be useful at all.
Cuz even in February when we released
it, it was writing maybe I don't know
like 20% of my code, not more. And even
in May, it was writing maybe 30%. I was
still using you know curtzer for most of
my code. And it only crossed 100% in
November. So it took a while. But even
from the earliest day, it just felt like
I was on to something. And I was just
spending like every night, every weekend
hockey on this. And luckily my, you
know, my wife was very supportive. Um,
but it it just felt like it was on to
something. It wasn't obvious what. And
and sometimes, you know, you find a
thread, you just have to pull on it.
&gt;&gt; So at this point, 100% of your code is
written by cloud code. Is that is that
kind of the current state of your
coding?
&gt;&gt; Yeah. So 100% of my code is written by
cloud code. Um, I am a fairly prolific
coder. Um, and this has been the case
even when I worked back at Instagram. I
was like one of the top few most
productive engineers. Um and that's
actually that's still the case uh here
at Anthropic.
&gt;&gt; Wow. Even as head of head of the team.
&gt;&gt; Yeah. Yeah. Do still do a lot of coding.
Um and so every you know every day I
ship like 10 20 30 p requests something
like that
&gt;&gt; every day.
&gt;&gt; Every day. Yeah.
&gt;&gt; Good god.
&gt;&gt; Uh 100% written by quad code. I have not
edited a single line by hand since uh
November.
And yeah, that that's been it. I do look
at the code. So I I don't think we're
kind of at the point yet where you can
be totally hands-off, especially when
there's a lot of people, you know, like
running the program. You have to make
sure that it's correct. You have to make
sure it's safe and so on. Um, and then
we also have Quad doing automatic code
review for everything. Um, so here at
Enthropic, Quad reviews 100% of poll
requests. Um, there's still layer of
like human review after it, but you kind
of like you still do want some of these
checkpoints like you still want a human
