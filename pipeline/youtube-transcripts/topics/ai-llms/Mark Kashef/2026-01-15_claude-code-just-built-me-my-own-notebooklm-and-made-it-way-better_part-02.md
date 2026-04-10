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
word_count: 3995
chunk: 2
total_chunks: 3
parent_video_id: "3bGdg9hTvws"
---
the board. And starting off with flash
cards, by default, we're generating 10
flash cards. And once we have all the
content and the raw content, assuming
that there's a custom AI personality, it
will take that into account, which is
why this whole interoperability of the
app is important. If we set a notebook
setting for it to be more authoritative
or simple, that should be injected in
most of the features outputs. So then if
there is a custom personality, that's
injected into the prompt. And then we
get the flash cards and then usage
stats. Basically if you pass or fail
guessing it, it will document that and
then store that in superbase. So all
these functionalities here are basically
doing the same thing where it injects
all the context in memory within the
context of creating the flashcards or
the quiz and it sends it to different
system prompts. The one for quiz will
say go and make x amount of questions
and answers based on all this material.
It will then inject all that material
inside. Meaning there is an upper bound
the way I built it for how many sources
you can add because Gemini as of today
has a million context window. If you
have I don't know 500 pages or 700 pages
you will start to hit the limit of said
context. Now are there ways around that
especially engineering ways? Absolutely.
I wanted to build a foundation and give
you the foundation so you can do
whatever you want with it. Now the
second last set of features are the
creative outputs which is again the data
table export reports slide decks and
infographics. And the way this works
behind the scenes is you have the core
sources and then you have the Gemini API
and then we are always outputting the
source output as a JSON and then from
that JSON we transform it to whatever
the end state needs to be. This applies
to the PowerPoint and the report
primarily because those need to be
transformed from JSON into a PowerPoint
file and a DOCX file. The infographic
from Gemini comes back as a JPEG which
we render on screen as a PNG. So you
don't really have to worry about that.
And the data table renders as an Excel
CSV file. So phase 2 is taking that data
and I chose to use free JavaScript
libraries to create DOCX files in
PowerPoint. But here's where you could
add your own flavor to use a cloud skill
like the PowerPoint skill or the Excel
skill and use the API associated with
that to be able to really make them
beautiful and powerful. And last but not
least, once it's stored in Subbase, we
want to make sure that we can actually
autod download it from the browser
itself. And if you're non-technical,
this is what's happening behind the
screen. User clicks generate. This
creates the slide deck that comes back
as title, sections, and slides in the
JSON itself, just data. And then we
store that in superbase and then we go
and create the PowerPoint files and docx
files and CSV files from that as a
result in a format that you can download
onto your computer. As you can see here,
there are multiple passes to go from
click to output. And last but not least,
when you want to configure the settings
of the notebook to be simple explainer,
critical reviewer, you want to set the
preferences, a lot of this is prompt
manipulation. So if you go to this part
of the screen, no persona is just
business as usual. Critical reviewer
questions assumptions, finds weaknesses,
basically pushes back on you. Simple
explainer, self-explanatory. Technical
expert is going to be more on the
technical side of things. Creative
thinker probably what I would choose.
And then custom is where you can write
your own custom instructions that apply
to the response that you get back from
the Gemini file API. So the output
preferences once again are pass through
parameters in the system prompt. So when
we go to here anytime you trigger an API
call this will build the persona
instructions and then it will inject the
persona instructions within any API call
we make to Gemini so that when we ask a
question we're always injecting this in
the payload of the API call to that
service. So so long as these custom
instructions persist this keeps getting
injected. So, that's an overview of the
app from an architecture standpoint.
Now, I'll go through an example of what
a PRD or a product requirements document
might look like to be able to accomplish
and build this for yourself. And on top
of that, I'll walk through some starter
prompts for each type of functionality
that you might want to be able to think
about. And I'll make available to you
along with all of this, a whole care
package in the second link in the
description below. Now, to make this as
straightforward as possible for you to
take some of these files and recreate
the whole process and really make it
your own, what I did is initially to
create the V1, V2, V5000 of this
project, I went to Perplexity Pro,
specifically the labs feature. I like
labs because you can ask it to go look
for the latest documentation on a series
of different software or APIs and then
tell it optimize and create a markdown
file that is also optimized for the
latest version of Claude Code. So while
it goes and researches the requirements
of the APIs and services that you need,
it's all grounded also in the latest
version of cloud code. So it takes that
into account when putting together that
prompt. But naturally, I had to make
many iterations to get to the point of
the demo that I've been showing you. So
what I asked it to do is a bit of a
retroactive exercise, which I honestly
recommend for all of you, whatever it is
you end up building. So, it's one thing
to write an initial plan, but it's
another thing to finish exactly what you
set out to finish, and then you go back
and tell Claude Code something along
these lines. Go through all the code
that you've put together and all the
features that we've implemented ever
since this initial plan. And then you
can tag your initial plan. And the best
part of this is that over time as you
build different projects, every single
time you do this mega reverse prompting
on the project, you not only learn what
you could have done better in the
planning, but even if you're not
technical, you'll start to learn these
concepts by osmosis. So, if we take a
look at this vision document, obviously
there's a lot here, but you'll notice
the way it's designed is it's using
something called asi art. And as art is
right here where it creates these tables
and these diagrams. So instead of
actually having a mermaid diagram, this
is written in markdown. So Claude can
actually read this by the way. So if you
have a way to communicate how a system
should flow, this in my opinion is one
of the mega hacks that you can do to
convey that to the AI. So in here we
start off saying for Claude, this is how
to use this document. This document is a
three-part specification for building
notebook LM reimagined. Before starting,
ask the user to set up these
prerequisites. So I made this for you so
that if you are less technical this will
ideally hold your hand and tell you okay
go and make a superbase project go and
get the authentication token so you can
use the superbase MCP to make life
easier. Go and set up Versell because
Verscell is where you're going to host
the platform as well as all the API
endpoints that we'll hit externally if
you want to be able to use it from
Nenm.com or Zapier. I also tell it read
the documents in this order. So, first
the vision document, two the project
spec, and three the implementation
guide. Now, one thing that's heavily
underrated is talking to Claude like an
actual human. So, it's one thing to give
it specs. I see people just give it a
grocery list of things to build over
time, but it's a completely other thing
to tell it this is why I want you to
build this, like this is the inspiration
behind it. If you can explain the
context very deep into a project, you'll
be surprised. it might do something
thoughtful that you didn't expect
because it understands the core
foundation of the direction and where
you want to go. So it's one thing to say
I want to build a clone of this app
where I can autorag a series of sources
and then do all these following features
versus say I wish that I could give this
product the ability to interact with it
external from just the browserbased
platform. So here we go through the
design principles. So API first always
meaning every single functionality that
you make make sure that you're thinking
at the back of your head how you can
make this accessible externally and then
in this case you can use whatever
database you want for a lot of vibe
coders I usually recommend superbase
because it's MCP is good enough when
you're building the MVP that it can take
control take control of building all the
tables adjusting the tables and building
the edge functions that you need and
then as we go through this is the
architecture overview so I'm giving an
example of how we want to be able to
interact with the back end. And this is
the series of gaps that it filled. So
these are all the API endpoints that
it's going through and it tells you API
notebooks, sources, chat, audio, video.
So this makes it abundantly clear
exactly what the end state of this API
should look like. And then you have the
services we'll use, what we're building,
and all the features and sub features.
And then I tell it what we don't want.
So in this case, I didn't want to build
this to run locally. I wanted to build
it so I could run it in the cloud. But
you could totally make a version of this
that's like an open notebook LM where
you could make it run on everything
that's on your desktop. And then it goes
through what the user experience should
look like from a developer standpoint
for no code users for Gemini different
model references. So here's where we're
mapping all the models to the features.
So you'll see right here, if we want a
fast chat, then we'll use Gemini 2.0
Flash. You could use three, you could
use 2.5, whatever you want. For text to
speech, we're telling it to use this
specific model for typical operation
costs. This was helped quite a bit
initially with perplexity labs because
it went and searched all the cost of
these services. The philosophy, so this
is what notebookm is and then notebookm
reimagined is here's our platform, build
whatever you want. So basically build a
solid ground that's modular enough that
any one of you can hook up whatever
services or swap whatever services that
you're looking for. And then we go
through and we tell it next steps and
this is also underrated at the end of
the document to tell it what is the next
step since there's some recency bias
there. So this will exit the first
document and then let's remove this go
to this project spec. This will go
through a table of contents through what
the MCP setup should look like. How we
should use AI studio in terms of the
APIs and all the models that we need to
use. The Verscell setup. Again, I use
the Versell MCP to make my life a little
bit easier. You go, you create the
account, you hook up the MCP with one
line. If you don't know how to do the
oneline setup, all you can do is go to
something like a perplexity and say, can
you give me the onelined installation
command that I can use to install the
versel MCP and then give me any
extraneous links that I would need to go
grab whatever tokens or whatever
parameters I need to fill in that one
line. So, we can make it a oneshot
operation. So this tells whatever
research platform you want to go and
look through the documentation to come
back with that command and ideally it
should write in caps what you need to
swap out. So these are nine times out of
10 actual API keys or tokens. So you can
see here it tells you to grab your uh
versel token and it tells you this is
the command that you paste. It would be
this whole thing right here and then you
would sub the token from here that we
grab. and it tells you what you need to
fill in, where you can fill it in from,
and the format you need to fill it in,
and then you should be good to go from
there. So, you copy that once you have
those credentials. You put it in your
cloud code. It won't work right away.
You'll have to restart cloud code or put
a brand new session in place, then do
/mcp, and then make sure that it's
there. And beyond that, we get a glimpse
of the system architecture, the
directory structure. This is really
advanced. This basically is telling it
how to organize everything. Again, much
easier to be retroactive than proactive.
But once you see this, again, especially
if you're not a technical person, you
can start to see the logic of how the AI
likes to categorize different, in this
case, Python scripts, which are a proxy,
a direct proxy for functionality. So,
when it comes to routers, you'll see
that all of these endpoints like
creating the notebook, the sources, the
chat audio, all of them are under this
routers folder. So, you can start to see
how even the front end is organized. So
even if you have never been able to
appreciate this as a non-technical
person, you can start to really learn
from how this is applied. These next
section tell it how to interact with the
superbase MCP. You can override these
features. This is the way that I built
my table. You can make it your own. And
then the rest of this are a series of
specs that you can read because again
I'll be giving this to you. And last but
not least, we have the implementation
guide which basically tells it what the
prerequisites are if you want to get
started. I made it so that it encourages
you to use the Superbase MCP and the
Versell MCP if you want to use different
services. Completely up to your heart's
desire. And then asks you for a Gemini
API key. And lastly, it asks you if
you're interested in video, if you want
to go to Atlas Cloud since it has a much
cheaper video model. It's not as good as
Gemini Veo, but infinitely cheaper. You
can swap in whatever you want. And then
this goes through again a series of
specs for all the superbase stuff that
needs to be built. the implementation
order. Again, if you are a developer and
you understand what you're looking for,
this is where you'd want to either
ignore this, remove this, swap it in for
what you think would be useful, then the
rest of this gives the rest of the
foundation it needs to do what it needs
to do. And most importantly, it gives it
this checklist. Because the context
window of cloud code maxes out so often,
especially when you're using an MCP
where it's taking tons of tokens to
write tables, get feedback, and search,
it's good to have this checklist where
it's not just a checklist for
checklist's sake. You make it literally
check off everything it finishes. And
this is helpful because even as you
compact conversations, if it's checked
off phase one and a part of phase three,
like up until here, you'll be able to
tell it go and refer back to the
implementation guide and pick up where
you left off. And then it should see
that these are the remaining ones for
phase 2 and then go from there. So now
that we've seen the demo, we have a
decent understanding high level of how
everything works. We've seen the project
requirements documents that you'd need
to go on this journey. What are some
good best practices for prompting? Once
again, I got you covered. So all you'd
have to do is theoretically take those
three files, the implementation guide,
the vision document, and the other one.
Take that and put it into a blank slate
brand new cloud code folder. And you
could use this in whatever ID of choice.
You could use cursor, you could use
anti-gravity. And then you would do
slashinitialize. Slash initialize will
just push claude to read those specs and
those guides and create a summary to
itself called claude MD. Once we have
cloudmd, then you can run a prompt
similar to this where you can say
execute the implementation plan in
cloudmd from start to finish. You have
full autonomy to set up superbase with
the uh superbase mcp. Now, I tell it
this because Claude will usually warn
you. If you're already paying for
Superbase, then it will say this will
cost you 10 bucks. If you're a brand new
user, it's one of your first couple
databases. I believe it is free. They
have a decently generous free tier. And
then it tells it to create the front-end
scaffolding. Basically, build the
framing of the house before you put in
the furniture and build everything else.
Build the foundation, implement the core
features, test by interacting with local
host. One thing you can also say is now
that we have an updated version of cloud
code where it can use claude in Chrome,
meaning it uses this extension, you'll
see right here to interact with local
host, you can make it go and check its
own work. So essentially, you let it run
for a more autonomous period of time to
go through look at your specs, compare
what it sees on screen, and this will
save you a lot of back and forth. And
one very important thing that most
people don't care about, especially if
you're not a dev, is tell it to commit
progress incrementally. Ideally, it
shouldn't take you too much time,
install GitHub, make an account, install
the app on cloud so that you can create
a project, and incrementally keep
committing things as you progress
because things will break. And sometimes
you'll get to a point where 80% of the
stuff you want is there, but it's been
built wrong. So, the last 20% isn't even
possible. So the more that you have
checkpoints, the higher the likelihood
that you'll be able to rewind, go back
in time, and then build the right way.
For the database and backend, you can
say design and implement the database
schema for insert X feature. And these
are the requirements. Create tables with
proper foreign keys and indexes. If you
don't know what these words mean in
plain English, a foreign key allows you
to create relationships between
different tables. Because if you have
one table for the notebook and one table
for the audio related to something you
created for that notebook, ideally there
should be some relationship between them
so that they if you have an API call
you're trying to make if you're trying
to marry them in some way that it is
possible. The rest of these are slightly
more technical but again this will be
all available to you so you can read
through it after. And then next are
feature requests. So let's say you want
to add newer features and the ones that
I've added myself. You could say
implement feature name with the
following requirements and you could
write a user story. So this is where you
can take on the hat as a product person
and say as a user I want to do X action
so that you get Y benefit. Again the
more human context you can give the
higher the likelihood they will do a
good job. Another thing is if you can
open brand new sessions for each feature
like I said before ideally each session
should be one core feature of the app.
You shouldn't set up authentication and
then go and make the UI pretty and then
go and add audio mode all in the same
chat. The context will bleed, things
will mix, things won't work, or things
will take infinitely longer than they
have to. Now, UI-wise, you can bring in
Gemini as a second set of eyes because
it's better at UI. For me, I just brute
forced Claude code to become better. I
would still say it's not beautiful. Uh,
you could continue and make it better,
but you can say this component feels
cluttered. Simplify the layout. The
loading states are jarring. And if you
don't know what a loading state is,
pretty much when you go through the
different parts of the app, notice here
how it's loading fairly quickly. If I go
to settings and I go to API
documentation, it is almost
instantaneous. When I load a brand new
source, it is pretty quick. It wasn't
quick for most of this build. It was
actually very slow. And sometimes it
would show different parts like it's
called a skeleton. It shows the skeleton
of the page while it loads because it's
taking so much time. So if you choose to
embark on building something like this,
then once you have the 8020, you want to
start really focusing on the 20, which
is why is this taking 10 seconds to
load? Why is this showing weird
components on the page while it loads?
It's probably indicative of something
bigger or a bigger problem in the app
itself. Now, when it comes to quality
control, you can spin up a separate
session that goes and looks through the
codebase and make sure that the
important things are working that all
the API endpoints return real data.
Sometimes Cloud will do this really
naughty thing and create something with
fake data. So, it will say, "Oh, I'm
done the feature." But it's actually
lying to your face. It just put fake
data in that place. And that happened
with video where it said, "Okay, I know
