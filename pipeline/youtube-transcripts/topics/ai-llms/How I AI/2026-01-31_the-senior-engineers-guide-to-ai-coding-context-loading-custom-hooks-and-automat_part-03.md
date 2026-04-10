---
video_id: "LvLdNkgO-N0"
title: "The senior engineer's guide to AI coding: Context loading, custom hooks, and automation"
channel: "How I AI"
topic: "ai-llms"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=LvLdNkgO-N0"
word_count: 2407
chunk: 3
total_chunks: 3
parent_video_id: "LvLdNkgO-N0"
---
there's so many use cases for IDE where
um there there's a recent cloud tool
where it has a IDE integration where it
can check the diagnostics from the IDE
and you'll see that with VS Code as well
like the extensions you put into an IDE
can be fed back into the agent. So
there's a whole robust extensions
ecosystem from idees because people
build on top of these things their own
workflows. And I don't think we've quite
reached like we build our own CLIs from
AI. I don't see a lot of people building
their own cursor extensions or VS Code
extensions which are very possible and
you could feed those errors and warnings
and
company rules and everything um in very
complex ways back into the agents. Um so
that that will happen as well. And I
think for
one IDE to stand out above the other
they have to separate themselves like
cursor is doing with their agent mode.
Um they have to make something unique
and user friendly that once like people
are not going to give you a bunch of
time to convince them. uh you're going
to have to open the agent and you're
going to have to like see that click on
browser mode and it's going to have to
launch your dev server and you're going
to have to click on the element and say
I want this to look uh uh with more pink
or purple or whatever and then um and
then they want that to just work. um
you'll see any sort of friction or
frustration from any AI tool anybody
puts out there um is is just instant uh
dismissal from so many people like
there's just the bar for quality is so
high in the AI landscape because
everyone can build anything that you
have to focus on the UX you have to make
that experience better than everyone
else and that's where you you can see
the cursor making the bold moves of
like, okay, let's go full on agents.
Like, you have to make those leaps.
&gt;&gt; Yeah, I I agree. And, you know, just
talking about this skepticism and high
bar, what I love about this episode that
we recorded today is it's really most
relevant for software engineers with
more experience, who are shipping
highquality code, and who want to write
production level code more efficiently
using some of these tools. It's this is
not, you know, I hope you all hung out
and listened to it, but it's not for our
vibe coders and our non-technical folks.
Um, and so what would you tell kind of
senior principal software engineers,
engineering leaders? I get asked this a
lot about how do I sell the value
proposition of these tools into very
skeptical organizations and what are as
a more advanced software engineer the
things that have just changed your life
in the last year say you should never go
back to doing it this way kind of how do
you how do you make that pitch that
&gt;&gt; the the first thing that jumps to mind
is anytime an issue is opened like you
can set up streamlined workflows that
someone opens an issue and you can have
claude automatically tackle it. You can
set up triggers for linear, GitHub,
whatever that once something happens,
you can get that first pass to see,
okay, can we at least find this without
doing any work? Can we at least
get that initial uh review in there of
what's going on so that
once we jump into the task I mean for my
entire career someone throws an issue at
you spend the first you know probably
day or two orienting yourself to like
okay I didn't write this code this is
legacy from let's you get blame let's do
all this stuff like all of that busy
drudgery that you're going through to
even get started on the issue. Um, it
can wipe out so much of that. It can
find who touched the files, who did
this, like if if you have the diagram
set up, what are the risks, the impacts,
are there potential security things? Are
there like it it's so great at surfacing
um the you don't know what you don't
know sort of scenarios where you hire so
many contractors, you hire so many
people who uh are new to these things
and then you throw them into these tasks
and they just don't know like they
haven't spent time with the codebase and
then um you ask them to fix these things
they just have zero idea what sort of
impact their changes going to have. The
AIS can surface a lot of that and they
can just be like, "Okay, we need to be
super careful. This is, you know, in
production and um this is cost going to
cost us money if this goes wrong. Just
tell me everything I need to look at."
Like find every single debug path. Find
every single um uh every why has this
file changed over the course of history.
Like write a summary of everybody who's
touched this file so I can know why this
function is the way it is. like there's
just so much work that is just not
writing code. Um, and all the
exploration work is just so much easier
to just say like everything I just said
over the past, you know, 30 seconds is a
prompt, which I could have just
dictated, right? Um, and you just have
to walk up to your computer and say, "I
have this issue. Like, guide me through
all this stuff." And um it's just
it blows my mind that people be hesitant
for those sorts of tools. I I understand
if they're like, "Okay, maybe some of
the code isn't perfect. We still have to
do code reviews. We still have to like
check for quality. We still have to run
our tools to validate things." But if
you're not using it to do to like
inspect and investigate and write
orientation and all that stuff, then
like you're really missing out.
like in in the enterprise space.
&gt;&gt; Yeah. And on the other end, if you're
not using it to document, so the next
time somebody has to do that
investigation, you have a little bit of
an easier time, um you're al also
missing out. So I do think on that that
front and the back end. And what I often
tell people is a good way to think about
how to design your AI workflows is do
not think in a task level orientation
like I'm going to write code. I say,
think about if I gave you infinite
junior to mid-career talent who is
always available, who would do the work
you would do if you had unlimited amount
of time and no meetings. What would you
do when a ticket came in? Like, what
would you do? And you'd say, well, I'd
go trace who wrote the code. I would go
figure out the history. I would make
myself a really good tech spec. I would
call out the risks. I would publish this
in a way that my team could review it. I
would have a senior engineer look at it
and give me some really hard feedback.
All of that could just become a prompt
and then you know but so many people are
just constrained by their time and and
cognitive capacity and so they just go
well I'm going to read the issue and I
bounce around in the code a little bit
and I guess I'm going to start coding.
And so, um, you can kind of get to this
model of
optimal, not perfect, but like optimal
workflow and then figure out how you can
prompt or build workflows or hooks that
would replicate that at least in an 80%
way. Um, which is a lot better than not
doing it.
&gt;&gt; And something as simple as the commit
messages are so much better than they
used to be because developers didn't
have to write them. I
&gt;&gt; so much better
&gt;&gt; for for people who are new to
programming. Um, commit messages used to
be like second attempt or like please
work swear words like
&gt;&gt; my my favorite one is just like 17 FS
like or like trying this, trying that,
trying this other thing.
&gt;&gt; Yeah. Not these work plz.
&gt;&gt; Yes.
Yeah. You know, if anybody wants to vibe
code a product, I always thought that
startups would want a printed book of
all their first years commit messages
&gt;&gt; with like calling out the really funny
ones. Oh, if somebody wants to vibe code
a little uh GitHub API powered print uh
business, I'm sure you could get a
couple startups to print those out.
Okay, last question. Yeah,
&gt;&gt; this is probably challenging for you
because you do a lot of dictation. So,
you're probably actually pretty polite
to AI given you would have to say
frustrating things to it if you wanted
to be mean. But when our our little
friend Claude is going off the rails or
you're really not getting what you want,
what is your prompting reset
start over technique? Have you found any
any tricks that work particularly well?
Yeah, it's it's really the um take the
conversation, export it. A lot of them
have the export commands.
um drop the conversation with some of
the code files into the um into chat GPT
pro 5 or whatever it's called or Gemini
uh deep think I believe is the and have
it have them do a second set of eyes on
it and then kind of start over rather
than like if if things go off the rails
and
you can't fix it in about maybe one
prompt of like where you see what's
going wrong and just revert to the
previous commit and kind of start over
because there there there's always this
underlying the AI is trying to go
somewhere and you want it to go over
here and you keep on telling it to to
join on your path but it still wants to
like get somewhere else that you don't
quite understand. And so starting over
from uh ground zero and like revising
your original prompt is better than like
trying to steer it to where you are when
you've like drifted so far away. Um and
that has to do it's so different with
every model. It's so different with
every prompt and all the context and
project that it's like it can't give you
like the here's instructions that work
every time. But like starting over works
every time. tossing a second set of eyes
on the entire conversation where that AI
isn't
uh isn't invested in that conversation.
It's instead critiquing the
conversation. Um th those are my my two
&gt;&gt; I think that second um that second
workflow is so funny because I I think
as somebody who's been a manager and a
leader so many times sometimes I feel
like I'm the reasoning model being
brought in to mediate the the
misunderstanding between two smart but
misalign misaligned resources and so
it's really funny to hear the idea okay
like I am having a debate with my AI
let's bring in like the third party.
Let's mediate this conversation, have an
objective set of eyes to see where we
maybe are misunderstanding each other or
going wrong and then reset and start
start over. So again, I think you know
this is the moment for folks with a lot
of organizational and social skill
thinking um to apply this to how you
might design some of these flows um for
for AI even though there are um beep
boop machines that we're really using.
&gt;&gt; Yeah. And and I would say kind of last
thought on that is the recent planning
modes that have been released with cloud
code and cursor and all of them have
eliminated a vast majority of that of
that drift.
&gt;&gt; Um so they've been fantastic releases
which I strongly recommend for anything
&gt;&gt; beyond like a small file change.
Planning is awesome.
&gt;&gt; Yeah, I love I love those features too.
Okay, well John, this has been great.
Where can we find you and how can we be
helpful?
&gt;&gt; Yeah, I'm on eggghhead.io.
um that is I have tons of courses on AI
tooling. I teach workshops through
egghead.io. I send a newsletter out
every week called AI dev essentials. Um
you can find me on X and other platforms
as well under my name. And that's it. I
love to talk with anyone about all this
stuff. Um my workshops are fun and we
talk go way deeper into this super
advanced stuff. So yeah.
&gt;&gt; Great. and then maybe some of us can
shop your possibly to be created
Christmas and holiday decoration site.
So you let us know
&gt;&gt; back on then
&gt;&gt; you let us know if that goes live. We'll
drop into the show notes. Thank you so
much for joining us and sharing your
workflows.
&gt;&gt; Thanks Claire.
&gt;&gt; Thanks so much for [music] watching. If
you enjoyed this show, please like and
subscribe here on YouTube or even better
leave us a comment with your thoughts.
You can also find this podcast [music]
on Apple Podcasts, Spotify, or your
favorite podcast app. Please consider
leaving us a rating and review, which
will help others find the [music] show.
You can see all our episodes and learn
more about the show at howiipod.com.
See you next time.
