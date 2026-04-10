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
word_count: 3992
chunk: 5
total_chunks: 6
parent_video_id: "We7BZVKbCVw"
---
Is it just like okay, it's like almost
good enough and that's a sign that it'll
probably get better at that thing. Is
there any advice there?
&gt;&gt; I think that's a good way to do it.
Like, you know, obviously within an AI
lab, we get to see the specific ways
that it gets better.
&gt;&gt; So, it's a it's a little unfair, but we
we also we try to talk about this. So,
you know, like one of the ways that it's
going to get better is it's going to get
better and better at using tools and
using computers.
This is a bet that I would make. Uh,
another one is it's going to get better
and better for long for running for long
periods of time. And this is a place,
you know, like there's all sorts of
studies about this, but if you just
trace the trajectory or, you know, maybe
even like for my own experience when I
used Sonnet 3.5 back, you know, a year
ago, it could run for maybe 15 or 30
seconds before before it started going
off the rails and you just really had to
hold its hand through any kind of
complicated task. But nowadays with Opus
4.6, fix, you know, on average it'll run
maybe 10, 30, 20, 30 minutes unattended
and I'll just like start another quad
and have it do something else. And you
know, like I said, I always have a bunch
of quads running. Uh, and they can also
run for hours or even days at a time. I
think there are some examples where they
ran for many weeks. And so I think over
time this is going to become more and
more normal where the models are running
for a very very long period of time and
you you don't have to sit there and
babysit them anymore.
&gt;&gt; So we just talked about tips for
building AI products. Any tips for
someone just using cloud code say for
the first time or just someone already
using cloud code that wants to get
better? What are like a couple pro tips
that you could share?
&gt;&gt; I will give a caveat which is there's no
one right way to use quad code. So I I
can share some tips but honestly this is
a dev tool. Developers are all
different. Developers have different
preferences. They have different
environments. So there's just so many
ways to use these tools. There's no one
right way. Um you you sort of have to
find your own path. Luckily you can ask
Quad Code. Uh it's able to make
recommendations. It can edit your
settings. It kind of knows about itself.
So, it can help it can help with that. A
few tips that generally I find pretty
useful. So, number one is just use the
most capable model. Um, currently that's
Opus 4.6. I have maximum effort enabled
always. The thing that happens is
sometimes people try to use a less
expensive model like sonnet or something
like this. But because it's less
intelligent, it actually takes more
tokens in the end to do the same task.
Um, and so it's actually not obvious
that it's cheaper if you use a less
expensive model. often it's actually
cheaper and less token intensive if you
use the most capable model because it
can just do the same thing much faster
with less correction, less uh less
handholding and so on. So that's the
first tip is just use the best model.
The second one is use plan mode. I start
almost all of my tasks in plan mode,
maybe like 80%. And plan mode is
actually really simple. All it is is we
inject one sentence into the model's
prompt to say please don't write any
code yet. That's it. like there's
there's actually like nothing fancy
going on. It's just the simplest thing.
&gt;&gt; Um, and so for people that are in the
terminal, it's just shift tab twice and
that gets you into plan mode. Uh, for
people in the desktop app, there's a
little button. On web, there's a little
button. It's coming pretty soon to
mobile also. Uh, and we just launched it
for the SWAC integration, too. Uh, so
plan mode is the second one. And uh,
essentially the model would just go back
and forth with you. Once the plan looks
good, then you let the model execute. I
auto accept edits after that because if
the plan looks good, it's just going to
oneshot it. It'll get it right the first
time almost every time with Opus 4.6.
And then maybe the third tip is just
play around with different interfaces. I
think a lot of people when they think
about cloud code, they think about a
terminal. Um, and you know, of course,
we support every terminal. We support
like Mac, Windows, you know, like
whatever terminal you might use, it
works perfectly. But we actually support
a lot of other form factors too like you
know, we have like iOS and Android apps.
We have a desktop app. There's uh you
know the Slack integration. There's all
sorts of things that we support. So I
would just like play around with these.
And again it's like every engineer is
different. Everyone that's building is
different. Just find the thing that
feels right to you and and use that. You
don't have to use a terminal. It's the
same quad agent running everywhere.
&gt;&gt; Amazing. Okay. Just a couple more
questions to round things out. What's
your take on Codeex? How do you feel
about that product? How do you feel
about where they're going? Just kind of
competing in this very competitive space
uh in coding agents. Yeah, I actually
haven't really used it, but uh I I think
I did use it maybe when it came out. It
looked a lot like Quad Code to me, so
that was kind of flattering. It's I
think it's actually good, you know, to
have more competition cuz people should
get to choose and hopefully it forces
all of us to like do a even better job.
Honestly, for our team though, we're
just focused on solving the problems
that users have. Um so for us, you know,
we don't spend a lot of time looking at
competing products. We don't really try
the other products. I you know you kind
of you want to be aware of them. You
want to know they exist but for me I
just I love talking to users. I love
making the product better. Um I I love
just acting on on feedback. So it's
really just about building a building a
good product.
&gt;&gt; Maybe a last question. So I talked to
Ben man co-founder of Anthropic. What
what to talk to you about. He had a
bunch of suggestions which I've
integrated throughout our chat. One
question he had for you is what's your
plan post AGI?
What do you think you're going to be
doing? What's your life like once we hit
AGI? whatever that means.
&gt;&gt; So before I joined Anthropic, um I was
actually living in rural Japan and it
was like a totally different lifestyle.
Um I was like the only engineer in the
town. I was the only English speaker in
the town. It was just like a totally
different vibe. Like a couple times a
week I would like bike to the farmers
market. Uh and you know you like bike by
like rice patties and stuff. It was just
like a totally different speed than just
complete opposite of San Francisco. One
of the things that I really liked is a
way that we got to know our neighbors
and we kind of built friendships is by
trading like pickles.
So in that in the town where we lived,
it was actually like everyone made like
miso. Everyone made pickles. Uh and so I
actually got like decently good at
making miso. Um and you know I made a
bunch of batches and um this is
something that I still make. Uh miso is
this interesting thing where it teaches
you to think on these longtime skills.
That's just very different than
engineering cuz like uh you know like a
batch of white miso takes like at least
three months to make and a red miso is
like you know 2 3 4 years. You just have
to be very patient. You kind of mix it
up and then you just like wet it sit.
You have to be very very patient.
&gt;&gt; So I the thing that I love about it is
just thinking in these longtime skills.
Uh, and yeah, I think postGI or if I
wasn't at anthropic, I'd probably be
making miso.
&gt;&gt; I love this answer. Uh, Ben asked me to
ask you about what's the deal with you
and miso and so I love that you answered
it. Okay, so the future the future might
be just going deep into miso, getting
really good at get making miso. Uh,
amazing. Uh, Boris, this was incredible.
I feel like we're we're brothers now
from Ukraine. Uh before we get to a very
exciting lightning round, is there
anything else that you wanted to share?
Is there anything you want to leave
listeners with? Anything you want uh you
want to double down on?
&gt;&gt; Yeah, I I think I would just like
underscore, you know, like for for
anthropic since the beginning, this idea
of like starting at coding, then getting
to tool use, then getting to computer
use has just been the way that we think
about things. And we this is the way
that we know the models are going to
develop or, you know, the way that we
want to build our models. And it's also
the way that we get to learn about
safety, study it, and improve it the
most. So, you know, everything that's
happening right now around, you know,
just like Quad Code becoming this huge,
you know, multi-billion dollar business
and, you know, like now all of my
friends use Quad Code and they just text
me about it all the time. Uh, so just
like, you know, this thing getting kind
of big and in some ways it's a total
surprise because this isn't kind of the
we didn't know that it would be this
product. We didn't know that it would
start in a terminal or anything like
this. But in some ways, it's just
totally unsurprising because this has
been our belief as a company for for a
long time. At the same time, it just
feels still very early, you know, like
most of the world still does not use
quad code. Most of the world still does
not use AI. So, it just feels like this
is 1% done and there's so much more to
go.
&gt;&gt; Yeah. Man, that's insane to think seeing
the numbers that are coming out. You
guys just raised a bazillion dollars. Uh
I think Cloud Code alone is making$2
billion dollars in revenue. you think
Anthropic, I think the number you guys
put out, you're making 15 billion in
revenue. It's uh insane to just think
this is how early it still is and just
the numbers we're seeing.
&gt;&gt; Yeah. Yeah. Yeah. It's crazy. And and I
mean like the the way that Quad Code has
kept growing is honestly just the users.
Like we so many people use it. They're
so passionate about it. They fall in
love with the product and then they tell
us about stuff that doesn't work, stuff
that they want. And so like the only
reason that it keeps improving is
because everyone is using it. Everyone
is talking about it. Everyone keeps
giving feedback and this is just the
single most important thing and you know
for me this is the way that I love to
spend my day is just talking to users
and making it better for them
&gt;&gt; and making me so
&gt;&gt; and making me so well the you know the
miso is like not super involved it just
you just got to wait you just got to
wait
&gt;&gt; well Boris with that we've reached our
very exciting lightning round I've got
five questions for you are you ready
&gt;&gt; let's do it first question what are two
or three books that you find yourself
recommending most to other people
&gt;&gt; I I'm a greeter. Uh I would start with
the technical book one is it it is
functional programming in Scola. This is
the single best technical book I've ever
read. It's very weird because you're
probably not going to use Scola and I
don't know how much this matters in the
future now but there's this just
elegance to functional programming and
thinking in types and this is just the
way that I code and the way that I can't
stop thinking about coding. So you know
you could think of it as a historical
artifact. You could think of it as
something that will level you up.
&gt;&gt; I love this neverbeforementioned book.
My favorite.
&gt;&gt; Oh, amazing. Amazing. Uh, okay. Second
one is uh Accelerondo by Straws. This is
probably, you know, like my my big genre
is uh is sci-fi. Uh like probably sci-fi
and fiction. Accelerondo is just this
incredible book and it it it's just so
fast-paced. The pace gets faster and
faster and faster. And I just feel like
it captures the essence of this moment
that we're in more than any other book
that I've read. Just the speed of it.
And it starts as a liftoff is starting
to happen and you know starting to
approach the singularity and it ends
with like this like collective lobster
consciousness orbiting Jupiter. Um and
you know this happens over like the span
of a few decades or something. So the
the pace is just incredible. I I really
love it. Maybe I'll I'll do one more
book. Uh the wandering earth uh
wandering earth by uh sishlu. So he's
the guy that did uh three body problem.
I think a lot of people know him for
that. I actually I think your body
problem was awesome, but I actually
liked his short stories even more. So,
Wandering Earth is one of the short
story collections and it just has some
really really amazing stories and it
it's also just quite interesting to see
uh Chinese sci-fi because it has a very
different perspective than Western
sci-fi and kind of the way that um at
least he as a writer thinks about it.
So, it's just really really interesting
to read and just beautifully written.
It's so interesting how sci-fi has
prepared us to think about where things
are going. Just like it creates these
mounts to models of like okay I see I've
read about this sort of world. Yeah. I
think I think for me this is like the
reason that I joined anthropic actually
cuz uh you know like like I said I was
living in this rural place. I was
thinking these longtime skills because
everything is just so slow out there at
least compared to SF. Um and just like
all the things that you do are based
around the seasons and it's based around
this food that takes many many months.
That's the way that kind of like social
events are organized. That's the way you
kind of organize your time. You like you
go to the farmers market and it's like
it's pimmen season and you know that
because there's like 20 pimmen vendors
and then the next week the season is
done and it's like grape season and you
kind of see this. So it's like these
kind of longtime skills and I was also
reading a bunch of sci-fi at the time
and just like being in this moment I was
like you know just thinking about these
long time scales. I know how this thing
can go and I just I felt like I had to
contribute to it going a little bit
better and that's actually why I ended
up at Ant and Ben man was also a big
part of that too.
&gt;&gt; I feel like I want to do a whole podcast
just talking about your time in Japan
and the journey of Boris through Japan
to anthropic but we'll keep it we'll
keep it short. Uh I'll quickly recommend
a sci-fi book to you if you haven't read
it. Have you read Fire Upon the Deep?
&gt;&gt; Uh this is Ving, right? Yeah. It's
great.
&gt;&gt; Yes. Okay. That one's like it's like so
interesting from a AI AGI perspective.
Uh so few people have read that so um I
myself
&gt;&gt; Yeah. It's like a lot.
&gt;&gt; Yeah. Yeah. Yeah. I like Deepness in the
Sky also. I think those sequels, right?
Or
&gt;&gt; Yeah.
&gt;&gt; Yeah. Yeah. Yeah. I think so.
&gt;&gt; Yeah. It's very long and like complex to
get into but so good. Okay. We'll keep
going through a lightning round. Uh do
you have a favorite recent movie or TV
show you really enjoyed?
&gt;&gt; So, I actually don't really watch TV or
movies. I just don't really have time
these days. Um, I did watch I I I'm
going to bring up another sishloo, but
the three body problem series on Netflix
I I really loved. Um, I thought that was
like a great rendition of the book
series.
&gt;&gt; So, the common pattern across uh AI
leaders is no time to watch TV or
movies, which I completely understand.
Uh, is there a favorite product you've
recently discovered that you really
love?
&gt;&gt; I'm going to like chill a little bit and
just say co-work cuz this is
legitimately the the one product that's
been pretty life-changing for me. uh
just because I I have it running all the
time and uh the the Chrome integration
in particular is just really excellent.
Uh so it's been like it paid a traffic
fine for me. It like canceled a couple
subscriptions for me. Uh just like the
amount of like tedious work it gets out
of the way is awesome. I I also don't
know if it's a product, but maybe I'll
I'll uh also another podcast that I
really love obviously besides uh besides
Venny is
&gt;&gt; obviously
&gt;&gt; Yeah, it's uh it's the acquired uh
podcast by Ben Ben and David.
&gt;&gt; Uh it's it's just like super it's super
awesome. Um, I feel like the way that
they get into like business history and
bring it alive is is really really good.
And I would start with a Nintendo
episode if uh if you haven't listened to
it.
&gt;&gt; Great tip uh with co-work just so people
understand if they haven't tried this
like basically you type something you
want to get done and it can launch
Chrome and just do things for you. I saw
one of the someone went on pat leave
from anthropic and he had it fill out
these like medical forms for him. these
like really annoying PDFs where it just
like loads up the browser, logs in,
fills them out, and bits them.
&gt;&gt; Yeah, exactly. Exactly. And and it
actually just kind of works. Like we
tried this experiment like a year ago
and it didn't really work cuz the model
wasn't ready, but now now it actually
just works. And it's amazing. I think a
lot of people just don't really
understand what this is because they
haven't used agent before. And it it
just feels very very similar to me to
quad code a year ago. Um but like I
said, it's just growing much faster than
quad code did in the early days. So, I
think it's starting to it's starting to
break through a bit.
&gt;&gt; And there's also this Chrome extension
that you mentioned that you could just
use stand alone that sits in Chrome and
you could just talk to Claude uh looking
at your screen at your browser and have
it do stuff, have it tell you about what
you're looking at, summarize what you're
looking at, things like that.
&gt;&gt; Exactly. Exactly. For for people that
are like just starting to use co-work,
the thing I recommend is so you download
the Quad Desktop app, you go to the
co-work tab. It's right next to the code
tab. Um the thing that I recommend doing
is like start by having it use a tool.
So like clean up your desktop or like
summarize your email or something like
this or you know like respond to the top
three emails like it actually just
responds to emails for me now too. The
second thing is connect tools. So like
if you connect like if you say look at
my top emails and then send slack
messages or you know like put them in a
spreadsheet or something or for example
like I use it for all my project
management. So we have a single
spreadsheet for the whole team. there's
like a row per engineer. Every week
everyone fills out a status and every
Monday co-work just goes through and it
messages every engineer on Slack that
hasn't filled out their status and so I
don't have to do this anymore. And this
is just one prompt. It'll do everything.
And then the third thing is just run a
bunch of quads in parallel. So we can
co-work you can have as many tasks
running as you want. So it's like start
one task, you know, I have this project
management thing running, then I'll have
it do something else, then something
else and I'll kick these off and then I
just go get a coffee while it runs.
There's a post I'll link to that shares
a bunch of ways people use uh what was
previously cloud code and now just you
could do through code work because a lot
of this is just like oh wow I hadn't
thought I could use it for that and once
you see like these examples I think are
what people need to hear of just like oh
wow I didn't know I could do that
&gt;&gt; so
&gt;&gt; yeah I think a lot of this was also
