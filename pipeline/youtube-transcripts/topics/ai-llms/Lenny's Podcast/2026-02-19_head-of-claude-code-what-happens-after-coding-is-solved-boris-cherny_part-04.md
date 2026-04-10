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
chunk: 4
total_chunks: 6
parent_video_id: "We7BZVKbCVw"
---
model is trying to do and make that a
little bit easier.
And so when we first started building
quad code, I think a lot of the way that
people approached designing things with
LLMs is they kind of put the model in a
box and they were like, here's this
application that I want to build. Here's
the thing that I wanted to do. model,
you're going to do this one component of
it. Here's the way that you're going to
interact with these tools and APIs and
whatever. And for cloud code, we
inverted that. We said the product is
the model. We want to expose it. We want
to put the minimal scaffolding around
it. Give it the minimal set of tools.
So, it can do the things. It can decide
which tools to run. It can decide in
what order to run them in and so on. And
I I think a lot of this was just based
on kind of latent demand of what the
model wanted to do. And so, in research,
we call this being on distribution. Uh
you want to see like what the model is
trying to do. In product terms, latent
demand is just the same exact concept
but applied to a model.
&gt;&gt; You talked about co-work something that
I saw you talk about when you launched
that initially is you your team built
that in 10 days.
&gt;&gt; That's insane. Uh I it came out I think
it was like you know used by millions of
people pretty quickly something like
that being built in 10 days. Uh anything
there any stories there other than just
it was just you know we use cloud code
to build it and that's it.
&gt;&gt; Yeah it's funny. Uh cloud code like I
said when we released it was not
immediately a hit. it became a hit over
time and there was a few inflection
points. So one was you know like Opus 4
uh it just really really inflected and
then in November it inflected and it
just keeps inflecting. The growth just
keeps getting steeper and steeper and
steeper every day. But you know for the
first few months it wasn't a hit. Uh
people used it but a lot of people
couldn't figure out how to use it. They
didn't know what it was for. The model
still like wasn't very good. Co-work
when we released it was just immediately
a hit much more so than cloud code was
early on. I think a lot of the credit
honestly just goes to like Felix and and
Sam and the and Jenny and the the team
that built this. It's just an incredibly
strong team. And again, the the place co
came from is just this latent demand.
Like we saw people using quad code for
these non-technical things and we're
trying to figure out what do we do? And
so for a few months the team was
exploring they were trying all sorts of
different options and in the end someone
was just like okay what what if we just
take quad code and put it in the desktop
app and that's essentially the thing
that worked. And so over 10 days they
just completely use quad code to build
it. Uh and you know co-work is actually
there's this very sophisticated security
system that's that's built in and
essentially these guard rails to make
sure that the model kind of does the
right thing. It doesn't go off the
rails. So for example we ship an entire
virtual machine with it. And quad code
just wrote all of this code. So we just
had to think about all right how do we
make this a little bit safer a little
more self-guided for uh people that are
not engineers. It was fully implemented
with quad code. took about 10 days. We
launched it early. You know, it was
still pretty rough and it's still pretty
rough around the edges. But this is kind
of the way that we learn um both on the
product side and on the safety side is
we have to release things a little bit
earlier than we think so that we can get
the feedback so that we can talk to
users. We can understand what people
want and and that will shape where the
product goes in the future.
&gt;&gt; Yeah, I think that point is so
interesting and and it's so unique.
There's always been this idea release
early, learn from users, get feedback,
iterate. The fact that it's hard to even
know what the AI is capable of and how
people will try to use it is like is a
unique reason to start releasing things
early that'll help you as you exactly
describe this idea of what is the latent
demand in this thing that we didn't
really know. Let's put it out there and
see what people do with it.
&gt;&gt; Yeah. And in philanthropic as a safety
lab, the other dimension of that is
safety because um you know like when you
think about model safety, there's a
bunch of different ways to study it.
Sort of the lowest level is alignment
and mechanistic interpretability. So
this is when we train the model, we want
to make sure that it's safe. We at this
point have like pretty sophisticated
technology to understand what's
happening in the neurons to trace it.
And so for example like if there's a
neuron related to deception we can start
we're starting to get to the point where
we can monitor it and understand that
it's activating. Um and so this is just
this is alignment this is mechanistic
interpretability. It's like the lowest
layer. The second layer is evolves and
this is essentially a laboratory
setting. The model is in a petri dish
and you study it and you put in a
synthetic situation and just say okay
like model what do you do and are you
doing the right thing? Is it aligned? Is
it safe? And then the third layer is
seeing how the model behaves in the
wild. And as the model gets more
sophisticated, this this becomes so
important because it might look very
good on these first two layers but not
great on the third one. We released
cloud code really early because we
wanted to study safety and we actually
used it within anthropic for I think
four or 5 months or something before we
released it because we weren't really
sure like this is the first agent that
you know the first big agent that I
think folks had released at that point.
um it was definitely the first uh you
know coding agent that became broadly
used and so we weren't sure if it was
safe and so we actually had to study it
internally for a long time before we
felt good about that and even since you
know there's a lot that we've learned
about alignment there's a lot that we've
learned about safety that we've been
able to put back into the model back
into the product and for co-work it's
pretty similar uh the model's in this
new setting it's you know doing these
tasks that are not engineering tasks
it's an agent that's acting on your
behalf it looks good on alignment it
looks good on evals we try to internally
it looks good we it with a few
customers, it looks good. Now, we have
to make sure it's safe in the real
world. And so, that's why we release a
little early. That's why we call it a
research preview. Um, but yeah, it's
just it's constantly improving. Um, and
this is really the only way to to make
sure that over the long term the model
is aligned and it's doing the right
things. It's such a wild space that you
work in where there's this insane
competition and pace. At the same time,
there's this fear that if you get some
if the the you know the god can escape
and cause damage and just finding that
balance must be so challenging. What I'm
hearing is there's kind of these three
layers and I know there's like this
could be a whole podcast conversation is
how you all think about the safety piece
but just what I'm hearing is there's
these three layers you work with. Uh
there's kind of like observing the model
thinking and operating. There's tests
eval that tell you this is doing bad
things and then releasing it early. I
haven't actually heard a ton about that
first piece. That is so cool. So you
guys can there's an observability tool
that can let you peek inside the model's
brain and see how it's thinking and
where it's heading. Yeah, you should uh
you should at some point have Chris Ola
on the podcast because uh he he's just
the industry expert on this. He he
invented this field of uh we call it
mechanistic interpretability. Uh and the
the idea is uh you know like at its core
like what is your brain? Like what are
what is it? It's like it's a bunch of
neurons that are connected. And so what
you can do is like in a human brain or
animal brain you can study it at this
kind of mechanistic level to understand
what the neurons are doing. It turns out
surprisingly a lot of this does
translate to models also. So model
neurons are not the same as animal
neurons but they behave similarly in a
lot of ways. And so we've been able to
learn just a ton about the way these
neurons work, about, you know, this
layer or this neuron maps to this
concept, how particular concepts are
encoded, how the model does planning,
how it how it thinks ahead, you know,
like a long time ago, we weren't sure if
the model is just predicting the next
token or is doing something a little bit
deeper. Now, I think there's actually
quite strong evidence that it is doing
something a little bit deeper. And then
the structures that were to do this are
pretty sophisticated now where as the
models get bigger, it's not just like a
single neuron that corresponds to a
concept. A single neuron might
correspond to a dozen concepts. And if
it's activated together with other
neurons, this is called superposition.
And uh together it represents this more
sophisticated concept. And it's just
something we're learning about all the
time, you know, and philanthropic as as
we think about the way this space
evolves,
doing this in a way that is safe and
good for the world is just this is the
reason that we exist and this is the
reason that everyone is at anthropic.
Uh, everyone that is here, this is the
reason why they're here. So, a lot of
this work we actually open source. Uh,
we publish it a lot. Um and you know we
publish very freely to talk about this
just so we can inspire other labs that
are working on similar things to do it
in a way that's safe and this is
something that we've been doing for
cloud code also we call this the race to
the top uh internally and so for cloud
code for example we released an open
source sandbox and this is a sandbox
they can run the the agent in and it
just makes sure that there's certain
boundaries and it can't access like
everything on your system. Uh, and we
made that open source and it actually
works with any agent, not just quad code
because we wanted to make it really easy
for others to do the same thing. Um, so
this is just the same principle of race
to the top. Um, we we want to make sure
this thing goes well and this is just
the this is the lever that we have.
&gt;&gt; Incredible. Okay, I definitely want to
spend more time on that. I I will follow
up with this suggestion. Something else
that I've been noticing in the in the
field across engineers, product
managers, others that work with agents
is there's this kind of anxiety people
feel when their agents aren't working.
There's a sense that like, oh man, Nza
has a question, I need to answer or it's
like blocked on something or it's or I
just like I I'm like there's all this
productivity I'm losing. I can't like I
need to wake up and get it going again.
Is that something you feel? Is that
something your team feels? Do you feel
like this is a a problem we need to
track and think about? I always have a
bunch of agents running. So like at the
moment I have like five agents running
and at any moment like you know like I I
wake up and I I stored a bunch of
agents. Like the first thing I did when
I woke up is like oh man I I want I
really want to check this thing. So like
I opened up my phone quad iOS app code
tab uh you know like agent do do blah
blah blah cuz I I wrote some code
yesterday and I was like wait did did I
do this right? I was like kind of double
double guessing something and it and it
was correct. But now it's just like so
easy to do this. So I don't know, there
is this little bit of anxiety. Maybe I
personally haven't really felt it just
cuz I have agents running all the time.
Um, and I'm also just like not locked
into a terminal anymore. Maybe a third
of my code now is in the terminal, but
also a third is uh using the desktop app
and then a third is the iOS app, which
is just so surprising cuz I did not
think that this would be the way that I
code uh in even in 2026. I love that you
describe it as coding still, which is
just talking to the to cloud code to
code for you essentially. And it's
interesting that this is now like this
is now coding. Coding now is describing
what you want, not writing actual code.
&gt;&gt; I I I kind of wonder if uh the people
that used to code using punch cards or
whatever, if you show them software,
what they would have said. Isn't that
crazy? And I I remember reading
something this was maybe like very early
versions of like ACM uh like like
magazine or something where people were
saying no it's not the same thing like
this isn't this isn't really coding uh
and you know like they called it
programming I think coding is kind of a
new word
&gt;&gt; but I kind of think about this like in
the back in the you know my family is
from the Soviet Union I you know I I was
born in Ukraine um and my grandpa was
actually one of the first programmers in
the Soviet Union and he programmed using
punch cards And uh you know like he he
told my mom uh growing up told these
stories of like or she she told these
stories that when she was growing up he
would bring these punch cards home and
there was these like big stacks of punch
cards and for her she would like draw
all over them with crayons and that was
like her childhood memory but for him
that was like his experience of
programming and he actually never saw
the software transition but at some
point it did transition to software and
I think there's probably this older
generation of programmers that just
didn't take software very seriously and
they would have been like well you know
it's not really coding.
But I I think this is a field that just
has always been changing in this way.
&gt;&gt; Uh I don't think you know this, but I
was born in Ukraine also.
&gt;&gt; Oh, I don't know. Yeah. Which time?
&gt;&gt; I'm I'm from Odessa.
&gt;&gt; Oh, me too.
&gt;&gt; What?
&gt;&gt; Yeah, that's crazy.
&gt;&gt; Wow. Incredible. What a moment. Uh maybe
related in some small way.
&gt;&gt; Uh what year did your home did you leave
and your family leave?
&gt;&gt; Uh we came in 95.
&gt;&gt; Okay. We left in ' 88. a little earlier.
&gt;&gt; Oh, yeah.
&gt;&gt; What a different life that would have
been to not to not leave, huh?
&gt;&gt; Yeah. I just I feel I feel so lucky
every day that uh get get to grow up
here.
&gt;&gt; Yeah. My family anytime there's like a
toaster or a meal, they're just like to
America.
It's like, okay, enough about that. But
you get it, you know, once you start
really thinking about what life could
have been.
&gt;&gt; Yeah. Yeah. Exactly. Yeah. We do we do
the same toast, but it's still vodka.
&gt;&gt; It's still vodka. Absolutely.
Oh, man. Okay. Let me ask you a couple
more things here. You shared some really
cool tips for how to get the most out of
AI, how to build on AI, how to build
great products on AI. One tip you shared
is give your team as many tokens as they
want. Just like let them experiment. You
also shared just advice generally of
just build towards the model where the
model is going, not to where it is
today. What other advice do you have for
folks that are trying to build AI
products?
&gt;&gt; I'd probably share a few more things.
So, one is don't try to box the model
in. Um I I think a lot of people's
instinct when they build on the model is
they try to make it behave a very
particular way. They're like this is a
component of a bigger system. I I think
some examples of this are people
layering like very strict workflows on
the model for example you know to say
like you must do step one then step two
then step three and you have this like
very fancy orchestrator doing this. But
actually almost always you get better
results if you just give the model tools
you give it a goal and you let it figure
it out. I think a year ago you actually
needed a lot of the scaffolding but
nowadays you don't really need it. So,
you know, I I don't know what to call
this principle, but it's like, you know,
like ask not what the model can do for
you. Maybe maybe it's something like
this. Just think about how do you give
the model the tools to do things. Don't
try to overcurate it. Don't try to put
it into a box. Don't try to give it a
bunch of context up front. Give it a
tool so that it can get the context it
needs. You're just going to get better
results.
I think a second one is um maybe
actually like a a more even more general
version of this principle is just the
bitter lesson.
Uh and actually for the quad code team
we have a you know hopefully hopefully
um listeners have have read this but
Rich Sutton had this blog post maybe 10
years ago called the bitter lesson. Uh
and it's actually a really simple idea.
His idea was that the more general model
will always outperform the more specific
model and I think for him he was talking
about like self-driving cars and other
domains like this but actually there's
just so many corlaries to the bitter
lesson. And for me, the biggest one is
just always bet on the more general
model and you know over the long term
like don't don't try to use tiny models
for stuff. Don't try to like fine-tune.
Don't try to do any of this stuff.
There's like some applications you know
there's some reasons to do this but
almost always try to bet on the more
general model if you can if you have
that flexibility.
Um and so these workflows are
essentially a way that uh you know it's
it's not it's not a general model. It's
putting the scaffolding around it. And
in general what we see is maybe
scaffolding can improve performance
maybe 10 20% something like this but
often these gains just get wiped out
with the next model. Uh so it's almost
better to just wait for the next one.
And I think maybe this is a final
principle and something that quad code I
think got right in hindsight. From the
very beginning, we bet on building for
the model six months from now, not for
the model of today.
And for the very early versions of the
product, it just wrote so little of my
code cuz I I didn't trust it cuz, you
know, it was like sonnet 3.5, then it
was like 3.6 or forget 3 3.5 new,
whatever whatever whatever name we gave
it. Um, these models just weren't very
good at coding yet. Um, they were they
were getting there, but it was still
pretty early. So back then the model did
uh you used git for me it automated some
things but it it really wasn't doing a
huge amount of my coding and so the bet
with quad code was at some point the
model gets good enough that it can just
write a lot of the code and this is a
thing that we first started seeing with
opus 4 and sonnet 4 and opus 4 was our
first kind of ASL3 class model uh that
we released back in May and we just saw
this inflection because everyone started
to use quad code for the first time and
that was kind of when our growth really
went exponential and like I said it's
kind of it stayed there. So I think this
is some this is advice that I actually
give to to a lot of folks especially
people building startups. It's going to
be uncomfortable cuz your product market
fit won't be very good for the first 6
months but if you build for the model 6
months out when that model comes out
you're just going to hit the ground
running and the product is going to
click and and start to work. And when
you say build for the model 6 months out
what is what is it that you think people
can assume will happen? Is it just
generally it will get better at things?
