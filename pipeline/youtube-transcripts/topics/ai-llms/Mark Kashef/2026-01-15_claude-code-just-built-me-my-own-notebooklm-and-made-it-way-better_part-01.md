---
video_id: "3bGdg9hTvws"
title: "Claude Code Just Built Me My Own NotebookLM (and made it way better)"
channel: "Mark Kashef"
topic: "ai-llms"
published_date: "2026-01-15"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=3bGdg9hTvws"
duration: 2539
word_count: 3994
chunk: 1
total_chunks: 3
parent_video_id: "3bGdg9hTvws"
---
A lot of people love Notebook LM, but if
you've watched this channel for a while,
then you'll notice that I've never
covered it. Although it's a cool tool,
as an AI power user, I always have this
need to tinker and customize everything
behind the curtain. And I always like to
be able to tap into the knowledge or
resources of whatever platform I'm
building on from APIs, MCP servers, so I
can get more leverage in other
applications. So instead of waiting for
the notebook LM team to build their
product exactly the way that I wanted
it, I took matters into my own hands.
[music] With the help of Cloud Code, I
made my own notebook LM but on steroids.
Meaning I was able to replicate every
existing functionality that already is
out there on top of that be able to add
things like an MCP server, an API, and a
lot of other hidden features that people
have been asking for for months. But let
me tell you, this was not
straightforward. So, in this video, I'm
going to walk you through my version of
the tool, the exact design thinking
principles I applied, the architecture
decisions, and everything that you need
to see to be able to replicate this on
your own. And even if you're not
technical, trust me, you're going to
want to watch this whole video. It's on
the longer side, but I can guarantee
that you're going to learn a ton. So,
with that, let's get into it. So, this
is my version of Notebook LM Reimagined.
And if you can see the home screen here,
you have the ability to go back to
pre-existing notebooks. So, just like
you would with the normal notebook LM,
you can go to create a new notebook
right here. Add some form of emoji. I'll
call this demo. And we'll click on
create notebook. And then this will
spawn, as you will be familiar with, all
the features that you like on top of
some new ones. So, you have the ability
to create a multi-person podcast, one of
the more famous features of Notebook LM,
the ability to create videos, to do deep
research, to upload sources, and have
those sources autorag. and then from
those sources create different
flashcards, quizzes, all the things that
you love and know about Notebookm if
you've used the product. But instead of
me yapping about it, let me show you. So
let's go to one of our existing ones
called AI research notes. So you'll see
here if I drag this over, this has a
text about machine learning. So if I go
to something like the audio podcast and
I go to brief summary and I click on
something like generate here, this will
go and generate audio. I'll walk you
through exactly what it's generating
from where shortly, but this will take
around 10 to 15 seconds for the brief
version and come back with the famous
multi-person podcast. And when we get
back a response, we get something like
this where you can see a script back and
forth between Alex and Sam. And if we
click on this, you should be able to
hear the back and forth conversation.
&gt;&gt; Hey Sam, welcome back to the podcast.
Today, I wanted to dive into a term we
hear all the time, but maybe don't fully
get. machine learning.
&gt;&gt; Oh, perfect. I feel like it's
everywhere. My streaming service uses
it. My phone uses it.
&gt;&gt; You get the idea. So, the audio podcast
works all fine. On the video side, you
can generate an explainer video,
documentary, presentation. Here's the
history where you can pull up prior
videos. I'll just mute this right here.
Or yeah, let me give that a shot. I'll
just put this on no volume. You can see
generate small micro videos to longer
videos. And then just like the rest, you
have the ability to do deep research,
fast research using Gemini's actual
APIs. If we go to view right here,
you'll be able to see prior versions of
the research such as this very
sophisticated query I sent. Why is
machine learning so cool? Comes back
comes back with sources. There's fast
mode. There's deep mode. On the study
materials, this section took quite a
while, but you can click on flashcards,
quiz, study guide. If I click on flash
cards, it will ask me do you want basic,
intermediate or advanced? Any specific
focus area number of items. So I can say
like give me 15. Let's do the intro to
machine learning course. We'll click on
generate. It will go and actually put
together the flash cards. And when it's
ready, it will pop it up at the left
hand side or the right hand side of the
screen. And you'll see I can just go
through all of my cards. I can expand
the screen. I can download them. I can
use keyboard shortcuts to go through all
the functionality that you'd want. And
then if you want a mind map, then we can
upload even more resources here if we
want. And then when we generate the mind
map again, we can customize it to our
needs. When it's ready to go, it will
use behind the scenes basically mermaid
to allow us to pop this up, zoom in,
look at all the relationships, and very
similar to what you'd see elsewhere. And
then you'd go to let's say quiz put this
together. If you say basic and click on
generate and you get an interactive quiz
that you can go through. Go to the next
question. I'm going to yolo this
response. Okay. Clearly I'm incompetent.
So I will go to FAQ now. Click on
generate. This will also seemingly
[snorts] work the same way. This will
pop up on the right hand side of the
screen. And you get the idea. So you'll
see all these FAQs generated. And the
beauty is everything's really fast. And
the reason why it's fast is the way we
built it. Just to end off things like
data tables, reports, slide decks. If I
click on slide deck, this will not just
create a normal slide by slide
breakdown, but it will also allow you to
download it as a PowerPoint file. And
you can see right here we have slide by
slide, agendas, and bullets. And if we
want, we can click on download as
PowerPoint. This right now the way I've
configured it is not to be overly
beautiful but it works and it's well
structured and it gives you the
foundation of actually building all
this. So it even renders the markdown.
And beyond that we do have things like
infographics which will use the nano
banana API. We can pick an infographic
or digital illustration style. Let's say
yeah let's do digital illustration.
We'll do colorful colorful and bold.
We'll click on generate and then this
will ping basically the API responsible
for generating images and it will come
back with the payload. And there we go.
We get not one but four different images
that we can download at the same time,
expand, go through one by one and it's
very colored. I definitely didn't know
it was going to be this colorful, but it
works. But beyond that, there's more.
Obviously, I don't want you to think I'm
full of it. So, let's actually send over
a request to see how it works. If I do
something like summarize the key points,
this will take whatever's in the sources
and come back with a response grounded
in what those sources say. So you'll see
right here it says machine learning is a
subset of AI that allows systems to
learn and improve from experience. It
has the direct sources. You can click on
the sources, go to the original source,
and if there is a specific snippet, it
should show it here. You can always go
back to different chat histories to go
through your conversations or do
something that's harder to do on the
normal Notebook LM, which is downloading
it in whatever way you want. So, if you
want to download the entire set of
assets, chats, etc. from your personal
notebook LM, then this will export it as
a zip, and you'll be able to navigate
through all the resources. And you can
see right here, it's a 10 megabyte file.
It takes through all the history, all
the images, everything that you've done.
And the best part is you control
everything. But wait again, there's
more. There's much more. You have the
ability to go to settings and then add a
system behavior where notebook can take
the persona of a simple explainer, a
critical reviewer. You can have
different preferences on response
length, uh, tone, inline style, etc. And
then the part that I really built this
for, which is the ability to go to your
home screen, go to your settings, and
then go to the API request builder. Then
you can pick whatever operation you
want. Whether it's chatting directly
with the notebook via API, listing the
sources, generating the multi-person
podcast audio externally, generating the
video, deep research, flashcards,
everything you can imagine. And the cool
part is if we go into any this is an
example of me pinging this exact same
resource asking the following question.
So the question I asked here is what are
the key insights from this document? I
can just change this to say what is this
document
about and then we will execute this
step. This will ping our API that's
actually hosted on a real server and
come back with a response. Is it machine
learning? Yes, it is. It says this
document provides an intro to machine
learning. So there it works and you can
see the citations right here. You can
see the suggested questions that come
after the input tokens as well as the
model used, which in this case is the
Gemini 2.5 flash model. You can use
whatever you want. I just happen to make
certain decisions based on familiarity
with the response patterns of certain
models versus others. And if you want to
use this anywhere else, I made it so
that it creates an HTTP request for
NADN, for make, for Zapier, and all you
have to do is crank out your own API key
for your own service and then hit it
from wherever you want. And for whatever
reason, if you want to be able to share
the same infrastructure with your team,
a colleague, a partner, this is an
accountbased system, meaning you can log
in, log out, create different accounts,
and each account will persist all the
notebooks and assets of those notebooks
within that account. And lastly, the
most important feature, the theme. Right
now, it's on the boring purple, but you
can go to my favorite midnight blue or
the cool crimson. change your
experience, change your environment, and
go from there. So, now that I've proven
to you that I've recreated and added on
top of an existing platform, all from
scratch using Cloud Code, let's get down
to brass tax as to how I actually put it
together. So, to bring this to reality
with Claude Code, all we had to use was
Superbase, Versel, the Gemini API, and I
added one more API on top of it for the
video gen because the Veo 3 models from
Gemini are eyewateringly expensive. so
expensive that I accidentally spent a
hundred bucks just trying to iterate and
build the app. But theoretically, I
designed it this way because all of
these tools have a fairly generous free
tier if you just want to take the
barebones cloud code plan, the barebones
superbase plan, and the barebones versel
and Gemini pay as you go models.
Theoretically, you could make this GPDR
sock 2 compliant by swapping out all the
services with, let's say, Amazon Bedrock
to use the cloud models or to use Gemini
on Vertex on their cloud. Or you could
switch it up to run on local models if
you want. And like you saw, there are
three core ways to interact with my
version of the app, which is not just
the web app that you know and love, but
the API as well as anywhere else like
Nitn or Zapier. And just in case you're
not imagining big enough, up until now,
doing rag and naden has been possible. A
lot of people use Superbase, the Gemini
file search. This is probably one of the
most convenient and cool ways to have a
rag externally since it's all done at
the browser level. Now, the TLDDR of the
app is that it's built on what's called
Nex.js and it sends requests to Versel,
which is not only hosting the actual
platform itself, but on top of that,
it's hosting all of the different API
endpoints. And if you don't know what an
API endpoint is, it stands for an
application programming interface, which
means that you can just hit the back end
of a service. So in case that doesn't
really register, whenever you use
something like Gemini or Chat GBT on the
front end and you say make me an image
or make me a video of a monkey running,
that behind the scenes is calling
different tools and services. Those
services are the video generators, the
image generators, the audio generators,
etc. And then when you make that
request, it goes and does the dirty work
behind the curtains and brings you back
the result. So what makes builds like
this powerful and all kinds of things
that you can do in cloud code is now we
live in a world where everything is
modular. You can have the foundation
built the way you want. Then you can
port in whatever services that you want
that you feel are best for whatever
you're trying to do. And to store and
support the app, we have Superbase
storing everything in the database. We
have Gemini responsible for the majority
of the rag since it's quick, it's
efficient, and most importantly, it's
cheap. And then when it comes to storing
everything, so you can download
everything at once and export your
entire notebook. This is all being
stored at the Superbase level in
Superbase file storage. So diving deeper
in the nitty-gritty, we have cloud code
where we're building basically our
version like we said of notebook LM. We
have Gemini texttospech API for the back
and forth podcast. We're using the
Alibaba video model. I use this one
because it's 10 times cheaper, if not
more, than the Gemini 3.1 latest model.
We have, like I said before, Superbase,
which is amazing as a vector database
for authentication. And then we're using
Versel, like I said, for deployment. And
then we're using fast API. This is a
framework that lets you create these
services that I referred to before that
you can hit from any other application.
And if you're a bit more curious on
this, give me a second. Now, the app as
a whole has 50 API endpoints. And these
endpoints include the ability to talk
to, create, list all the notebooks, the
sources, go directly to chat with an
existing notebook, and create all the
assets that I showed you before. And
obviously, I'm not the one who built
this myself. I'm the one who told
Claude, "Okay, let's build the
functionality. Let's use this service,
and then let's create a way that I could
access said service or create said asset
from said service externally." And if we
go back to the app, you'll see that at
the right hand side of the settings tab,
I created this API documentation tab
where you can click on everything from
chat to global chat to audio overviews,
video overviews, the study materials. It
will show you each and every way that
you can interact with this service. And
in case you're not technical, the
biggest TLDDR of TLDDRs, when you see
the word post here, this just means that
you're sending something to the service
and you want to get back some form of
response. A get basically means that you
are trying to retrieve what's available.
So if you're asking what notebooks do I
have, what are their names? This is
where doing a get request would make
sense. Patching is really for updating,
which you would rarely use, and deletion
is deleting. What happens when you send
a query or request? Well, behind the
scenes, you ask question. Your question
goes to the back end that I've now shown
you. This goes through, sees the
research papers, any YouTube videos,
anything you've added to the sources. It
sends the context and the question to
Gemini to the file search API and it
comes back with a response with
citations. Now, to get to the point
where you can actually ask the question,
you obviously have to upload a file. So
when you upload a file, it goes to
superbase storage and then it gets
synced and sent to the Gemini files API.
This basically does rag on the fly. Now
you can use whatever rag you want, but
for my purposes since I'm already using
Gemini in quite a few areas, I just use
the file search API as well. And
primarily because I'm lazy because that
API already supports things like PDFs,
DOCX files, text files. So I didn't want
to have to go the next natural step and
teach Superbase exactly how to handle
those files and how to rag them. I want
to take the path of least resistance. So
what happens is when the user sends a
query, that query goes and pings the
Gemini file search API which has its own
versions of these notebooks. It then
goes through the chunks associated with
those notebooks to find the most
semantically similar the closest match
to the vector coming in. So the query
how does X work turns into a vector.
That vector is then sent to the file
search API to look for the closest
matching vectors and then you get the
response along with the citations
associated with said response. And the
key trick here is because notebook LM
allows you to ask a question to all the
sources in the notebook, we had to make
sure that when we send a question from
the user interface, it goes and queries
and checks all the knowledge sources in
that UI. And this is really where the
devil in the details come in where
having something like Claude Code as
your companion can help push you through
all of these conceptual barriers. Now,
how did I make the audio overview
podcasting work? Am I a prodigal genius?
Absolutely not. What I did do is take
advantage of the fact that Gemini has a
texttospech API that allows for
multisspeaker. So step one is when we
send the request, it looks at the
sources that we have. It then injects
the context of that source and creates a
script with Gemini 2.5 Pro. You can use
whatever you want. It then creates the
text to speech in multisspeaker mode
using Gemini text to speech which I
think also uses 2.5 as the base and then
it creates a MP3 audio file that we
render on the user interface itself. And
like we said before we have a deep dive
version, a brief summary version and
then we have a debate where they just go
at it for the video. Even using the
Alibaba model at scale, especially if
you want to do like a 10-second video or
five of them, it'll still cost you
three, four, five bucks, but it's way
cheaper than Veo, which will cost you an
arm and a leg. So, the way this one
works is, again, we use 2.5 Pro to
create the description of the scenes.
Now, it's 5 seconds or 10 seconds, so we
don't have too many scenes here. And
then it goes and sends it to the Atlas
cloud. That's where the Juan 2.5 model
from Alibaba is hosted. Again, you can
swap this out for whatever API you want.
All you'd have to do is give the
documentation of that API, throw it into
cloud, say go and swap one for this
other one, pun intended, and then go
from there. And then unlike before we
had a MP3, this result output would be
an MP4. And to render it on screen, this
is why this is stored in superbase
storage and allows you to share it as
well. On the deep research side, like we
said before, you could send whatever
query you want. So you could say, who is
Mark Kashef? And I could say research.
This will go and do its thing. And
behind the scenes, this is what it's
doing. It has the Gemini 2.0 flash fast
mode. You could update this to the
latest model, Gemini 3. Whatever you
want. This is just super cheap, and I
wanted to prove out the concept more so
than worry about the quality, per se, or
you could use the Gemini 2.5 Pro deep
research mode, which is marketkedly more
expensive. So, be careful with that one,
too. Behind the scenes, do you as the
user send a query? That query is sent to
the backend. That backend then sends it
to the Gemini API to generate a report,
generate citations associated with that
and pull that from the API and then pull
that over to Subbabase and then display
that on your user interface at the end.
And this is where you see the response
back in chat when you come back with a
response. Now the study materials, how
did we take care of these? So the
flashcards, the quiz, all of these I had
to target one functionality at a time.
That's the key thing with vibe coding
that a lot of people miss, especially
when they talk about all these loosey
goosey frameworks to oneshot a whole
app. You don't oneshot this. You build
this incrementally, one feature at a
time. As you build each feature,
technically each feature is a separate
chat because each one needed a little
back and forth to perfect the way it
behaves, the way it works, which API
it's using, how fast it was, how it
rendered on screen. These are all
details that matter. Which is why when
people go on X or YouTube and say, "I
can build this whole thing in like 10
minutes with one mega prompt and run
Claude autonomously on its own." Odds
are you won't get the level of detail or
output or quality that you're looking
for. So for the study materials
generation, we're using 2.0 Flash across
