---
video_id: "UbDyjIIGaxQ"
title: "You've been using AI Wrong"
channel: "NetworkChuck"
topic: "ai-llms"
published_date: "2024-05-28"
ingested_date: "2026-02-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=UbDyjIIGaxQ"
duration: 1858
word_count: 7179
---
I found a new AI tool and I am obsessed
it's completely open source and I use it
every day it's called fabric Daniel tell
me what fabric is so basically the goal
is to augment humans with AI so it's all
about reducing that friction to be able
to use AI for your problems that's
Daniel misler the creator of fabric
reducing friction so that you can use AI
to solve your problems that's the real
purpose of technology and Ai and that's
what this project fabric is helping us
do I legit use this every day and I
think you might too so in this video
we're going to break down what fabric is
is and I'll show you how to set this up
so you can start using it right now and
later in this video I'll show you how I
use fabric to access my local AI server
Terry wherever I go with a sponsor of
this video twin gate we'll talk more
about them later okay you want to see
something absolutely crazy yes Daniel I
do get your coffee ready let's do this
now before we dive too deep I want to
give you a feel for what using fabric is
kind of like like what's the use case
what would I use this for this you're
going to love watch this let's say I've
got a YouTube video this 2hour interview
that maybe I don't have time to watch so
I'll grab the link and all my command
line I'll use the tool yt-- transcript
and paste the link and this is going to
grab the transcript of that YouTube
video by the way this is a tool that's
built into fabric that alone makes this
thing amazing and then I'll pipe that
over into fabric 2hour YouTube video
here we go within moments I'm told about
David
Bumble and everything we discuss in this
video the ideas insights quotes like
this one man who said that smart guy so
within a few moments I took a 2-hour
YouTube interview and extracted all the
wisdom and insights I need to know
that's crazy right so what's happening
here what is fabric doing let's break
that down first we start off with some
kind of text in this case a YouTube
transcript it really could be anything
and then fabric will send this text in
this case our YouTube transcripts off to
your favorite AI it could be models from
open AI anthropic or even local models
with olama which again I will show you
how to access a local server from
anywhere using togate here at a bit now
looking at the command it's not just
sending the transcript by itself here
you go AI it's using this thing called
extract wisdom what is that this is the
secret sauce behind Fabric and something
you should get pretty excited about
Daniel tell us more about it what I've
done is take any piece of AI from any
platform that is interesting and usually
the language that I care about is
actually prompts right so what we
started doing is collecting all these
prompts into this concept uh called uh
patterns a set of instructions or a way
to get the AI to do what we want it to
do now this is not a New Concept prompt
engineering is a thing but this it's a
bit different different in two ways that
I am a big fan of they're open sourced
and they're crowdsourced I'll be the
first to admit that's kind of a weird
concept for a prompt but here's why it's
cool first these prompts or patterns
we'll just call them patterns from now
on have been carefully curated created
manipulated added to to do exactly what
it's designed to do to solve a problem a
very specific problem and it's everyone
including maybe you that helps create
these prompts to make them better now
let's take a look at this one in
particular cuz I love this one extract
wisdom you'll really get a feel for what
I'm talking about here and this is the
other cool part about this it's open
source so you can actually see this
system prompt normally when you're
interacting with gpts you can't see the
actual prompt being sent to the AI here
we're controlling that we're part of
that and I want to show you this one
part I think this will illustrate what
I'm talking about look at how this
prompt talks to the AI take a step back
think step by step think deeply it kind
of sounds like he's talking to this AI
like a human and that's exactly the case
even Daniel said you're basically
telling it to act like a human we don't
know why it works but just talking to
these AI like they're humans elicits a
better response better results kind of
scary do with that what you will but I
point that out to say that these prompts
have been tested time and time again
added to similar to what you would see
with open source code and this is just
one pattern look over here on the side
look at all of these that have been
created and you don't have to stop there
you can create your own which I've done
that and oh my gosh that's the secret
it's so amazing but hold on you might be
like me and think this kind of seems
just like fancy prompts what is this
thing actually doing that I can't just
do with Chad gbt I want to revisit this
idea fabric is all about reducing
friction to have ai help you solve
problems and one of the areas of
friction I didn't even realize I had was
the fact that I had to keep going out to
chat GPT open up a web interface load up
maybe a custom GPT or start having a
conversation and it didn't feel like a
lot of time but that is time it gets in
the way Fabric and this is one of the
reasons I fell in love with it is CLI
native you do everything here in the CLI
which I get may or may not excite you
but you're not limited to that Daniel
misler touches more on that what I'm
trying to do is make the un ramp to
using these things as as easy as
possible so I want to be able to use
them via voice I want to be able to use
them via command line via um like a
gooey app I want to be able to just
access them as quickly as possible so
that's like the main thrust to this
project is to collect problems collect
the Solutions in the form of these
patterns and then to have as many
on-ramps onto them as well now I'll talk
more about why I love that it's here in
the command line but it's more than just
how you interact with it think about how
you might use this to build programs
instead of going through the pain of
interfacing with AI API so that's kind
of hard to say actually it wasn't
anyways you can just use fabric now
check this out I want to show you
something I did actually yesterday I'm
trying to build my cardiovascular health
so I've started running and Rowing and I
tracked that with the app called Strava
which gets all sorts of amazing data so
I wrote a python script to interact with
their API to pull down all my data and
it looks like this a bunch of messy Json
but I created a pattern called workout
summary and it takes care of the Json
for me or I can just bake fabric right
inside my python script and that's just
a simple example this thing is crazy now
we're about to set this up but I want to
talk about one more thing it's called a
world of text and it's a concept that
I'm really adopting now thank you to
Daniel misler go ahead and tell him
Daniel about this world of text 20 years
ago I got into this guy named David
Allen who basically said never ever
store anything in your brain immediately
capture what I do now is I capture a
concept or a structure for an essay or
something I capture it immediately in a
note and now that it's text and because
I'm fairly proficient with vim and the
terminal my whole world is text and the
ability to manipulate text and I have
all my notes in text and when I record
something that's actually sound I
immediately transcribe it send it to
notion and so it's also in text so now I
have this world of text that I could use
and now I have this AI infrastructure
that manipulates text using AI to get
results that help us as humans so it's
about getting everything into a text
format so it can be used anywhere by
anything especially Ai and notice when I
run these commands like getting this
YouTube transcript it's outputting this
and markdown format so it can play nice
pretty much wherever it goes especially
my notes application obsidian now we'll
touch more on the philosophy of why I
think this is amazing and I'll show you
a few more patterns I've been working
with but now let's get you set up let's
get fabric on your computer right now
and by the way if you want to see the
full Daniel misler interview where we
talk about a ton of other stuff from
like cyber security AI scares to just
bonding over for coffee because we both
love coffee I'll have that full
interview on network Chuck Academy just
check that out anyways what do we need
honestly just a computer now as I
mentioned before this is command line
world and this is going to be a Linux
based or Unix based system but we're not
leaving out anybody here you got a Mac
it works great on Mac in fact Daniel
misler all he does is use Mac he loves
it Linux of course if you use Linux as
your main desktop you'll have a good
time and then Windows which is what I
use WSL the windows subsystem for Linux
so it'll work everywhere you have Linux
and Linux is everywhere what a time to
be alive right coffee break for that
coffee break the setup and install is
actually really really fast I'm going to
set up a new machine here in WSL on my
Windows machine you don't have to do
this unless you don't already have one
and then best practice just go ahead and
do a pseudo apt update to update your
repos and go ahead and run a pseudo AP
upgrade if you haven't already now on
Mac you don't have to do that just make
sure you have your system updates and
you'll be golden now let's install
fabric Mac Windows Linux we're all
following along right now first we'll
just copy and paste this command cloning
the fabric project from GitHub if we
type in LS there's the fabric project
right there we'll go ahead and jump in
there CD fabric then to install
everything we'll use a tool called pip X
but we'll have to install pip X first
now on Mac and windows with WSL we'll do
a pseudo AP install pip X if you're on
Mac you'll want to use a tool called
Brew brew is an amazing utility and I
think package manager that enables you
to install a ton of things and you
should have it on your Mac so install
Brew first if you don't already have it
and then with the command Brew say Brew
install pipex again that's Mac only I'll
go ahead and install pipex yep now we'll
install fabric with Pip X simply type in
PIP I've been saying pip x a lot it's
making me feel weird anyways pip X
install dot that should be It Ready set
go and done we have all these tools
installed I do have a note for me saying
that my path variables aren't correct
I'll just run this command real quick
you might have to do the same thing
pipex ensure path done and now fabric is
almost ready to go we'll just need to
run one command
fabric D- setup oh wait I got to refresh
my terminal if you're in Linux you'll do
Source TAA or Library sign whatever you
want to call that bashrc if you're on
Mac it'll be zsh RC if you're using zsh
as your default and now we should be
able to do fabric D- setup and what this
will do is ask you for a couple things
your open AI API key if you want to use
gp4 and all those other models and also
your anthropic API key to use the Cloud
models now what that means is yes you
will need an API key so if you don't
already have one go get one I'll put a
link down below showing you how to do
that I'm going to grab mine real quick
and I'll paste that there and then my
cloud API key which is the anthropic API
key and then one more thing it's going
to want your YouTube API key so when you
are going out to YouTube to pull those
transcripts from videos you can even do
comments it will use a Google YouTube
API key those are free to set up again
I'll have a link below to show you how
to do that and once you've added your
API Keys that's it now you may be
wondering Chuck why do we have to do
that or remember fabric is just a
framework it itself is not AI it will
use whatever favorite AI you have now
that does mean that if you're using open
AI or anthropic you're going to have to
pay for that usage and it's a pay as you
go thing put your credit card in there
most of the time it does end up being
cheaper than just paying for like Chad
GPT the pro but just keep that in mind
now if you don't want to pay anything
and you don't want to give any data to
anybody ever there's local llms as well
which fabric just added thank you Daniel
so if you have Ama installed or AMA
installed on a remote Server Like I Do
on Terry we can type in Fabric and do
d-list models and right here are the
available local models I'll grab a
YouTube video this one by Peter McKinnon
I've been meaning to watch I'll just
grab the summary and then with fabric
I'll do a Das Dash model to specify a
certain model in my case it'll be llama
3 colon latest then I'll do- SP to
specify the pattern which will be
extract
wisdom and just like that I'm using a
local model now if I want to use a
bigger model like llama 370b that's not
going to run on my local computer but it
will run on Terry so to connect to a
remote AI server specify remote AMA
server put the IP address in of your
remote server this is Terry specify the
model llama
370b and then your pattern now I'm not
sure about the whole Alex and Jordan
thing but that's how you do it and when
I'm away from Terry when I'm out of the
office remote somewhere I still want to
talk to him and here's how I do it when
I'm working remote out and about as I
normally do I got to make sure I can run
my fabric commands and access Terry
wherever I am right now it's not going
to work I'm getting nothing that's where
twin gate comes in my favorite way to
remotely access my stuff back at home my
office my studio everything setting up
twin gate is Pretty stinking easy easier
than standing in a field what was that
all you have to do is set up a free twin
gate account create a network and then
deploy your connector it could be a
Docker container on a Raspberry Pi in
your house or running on your sonology
Nas like I do at my home and within a
few minutes you've got remote access to
everything you want to like now lighting
strikes n I'm good Wildlife maybe what
was that but seriously wherever I go
wherever I am are hidden holes I can
remotely access my stuff back at home
including Terry my AI server twin gate
is special because they use all the
latest and greatest Technologies to make
sure your connection is fast including
quick one of the new internet protocols
that is blazingly fast and with twin
gate you can control exactly what your
people have access to all my employees I
don't want you use in Terry when you're
away from the office but you can log
into the server and work I'll allow that
so if you want to use my remote access
solution check it out link below I've
been using it for over a year and it's
my favorite way to remotely access
everything I even did it when I was in
Japan too worked great all right I'm
getting out of here now let's get a bit
more advanced and break down some fabric
stuff first you don't have to just give
it stuff like copy and paste from a
YouTube transcript or something to work
with fabric you can ask a basic question
like watch this I can Echo saying give
me a list of all ice creams flavors and
what year they originated actually I'm
pretty curious about that I'll pipe that
into Fabric and we'll break this down a
bit so so far we've been using the
command or the switch SP that's a
combined switch let's split them up so
we can talk about it so- s and- p s is
for stream and when we use that switch
we're telling it to go ahead and output
whatever the AI says as it's saying it
stream it to us P P is for specifying
the pattern so right after you put P you
put the pattern you want to use and
we'll just say the the pattern AI which
is a specific pattern just allowing us
to talk with
AI just told me no you can't do the AI
exceeds practical limits you exceed
practical limits I'm just kidding let's
try something more easy there we go now
we're talking and by the way when I use
fabric without specifying a model it
defaults to using open Ai and gp4 turbo
if you want to change that especially if
you want to stick to local models we can
do fabric D- list models to CLR models
and then do fabric D- chain
default model and then specify the model
now we can also do the command fabric
d-list just the list and it will list
all the available patterns we have right
now again so many things you can play
with now I want to show you something
crazy as Daniel mentioned before the
theme behind fabric is very well fabric
e so you got fabric then you've got
patterns if you want to run a server
which does some fun stuff I'm not going
to cover right now it's called a mill
but you can also do what's called
stitching
which allows you to stitch patterns
together so let's try this I've got this
article this long read about that
YouTuber poppy do you remember her is
she's still around she's crazy it's
super long read I'm just going to copy
and paste everything and put this into
fabric PB paste Fabric and by the way I
know you're probably wondering Chuck how
are you doing that what is this PB paste
thing this is built in by default into
Macs so if you have a Mac just enjoy it
on WSL and Linux it's harder to do do
I'll show you how to do that here in a
minute and if I run out of time I'll
show you somewhere else anyways we'll
paste that in there and I'll use the
prompt summarize so summarize the
article and then I'll pipe that result
into another fabric command or Stitch it
and this pattern will be write essay
actually I'll do a-s so we can see that
streamed in and go now fabric while it's
doing this thing just think about what
it's doing right now first it's going to
summarize the entire article then it's
going to kick its summary over to the
right essay pattern that's powerful this
is crazy Ragan essay we can also do a
thing where we analyze the claims of the
article this is not stitching I just
want to see what happens
analyze
claims I mean this is just cool again
these prompts crowdsourced op sourced
they've been meddled with and messed
with to make them perfect and they're
not perfect I mean they're still going
to be worked on and proved you can also
do one called label and rate giving it a
quality score saying it's B tier consume
when time allows this is another
superpower of fabric and the idea and
the mentality is bringing to Ai and how
you might approach your your life we'll
talk more about that here in a minute I
don't want to dive too deep but now I
want to show you how you can create your
own patterns cuz right now we're using
what's built-in and default just there
so I'll show you how you can approach
writing a pattern and then getting it
into fabric so you can use it keeping in
mind that when you write a pattern it
remains local to you it doesn't get
uploaded to the fabric repository and
it's none of that's happening unless you
want to submit it that's up to you
everything's still private but when I
first started trying to write patterns I
didn't really know how to do it so I
would just go and like pick one of my
favorite ones extract wisdom and just
kind of uh modify it which is absolutely
a great way to do it but then I found
this there's a pattern there's a pattern
for everything see a pattern means
solving a problem there's a pattern
called improve prompt that basically
does everything for you it's crazy so
check this out we'll we'll do it real
quick we'll Echo something and say you
are we'll just try to write our on
prompt real quick but messy dirty and by
the way this is a real example of how I
wanted to and I talk to Daniel about
this how I wanted to digest sermons
better I go to church every Sunday
sometimes I'm serving in the nursery
taking care of babies and I miss the
sermon now I rarely have time to go back
and watch the sermon throughout the week
so if I could just somehow digest it
like this that'd be amazing but I wanted
to create a pattern that would look for
specific things unique to a sermon so
let's try this all right so I'll pipe
that out to fabric and I'll do the
pattern and prove prompt that's crazy
right
this is so cool so this is just live off
the cuff I'm going to take this copy it
so now I've got my instruction and I'm
going to go to the place where our
patterns live here's where they live
we'll go to CD we'll do config SL fabric
type in LS here we can see we have a
directory for patterns that's the
patterns that fabric will use and then
we have a directory called my patterns
which is what I created so go ahead and
make that for yourself right now we'll
do a make directory mkd let's call it my
super awwesome
patterns I'll jump in there and then to
create our new pattern we'll make a new
directory call it seron
Sensei is that H SP Sensei nope we'll CD
in there and we'll make a new file
called system. MD do Nano system. MD
jump in there and I'll paste the
contents of that pattern control X Y
enter to save so to summarize what we
just did we created a directory to house
our custom patterns and inside that
directory we made a new directory
creating a new pattern sermon Sensei and
we created a file called system MD which
is the system prompt the actual contents
of the pattern now the reason we created
our own super awesome special directory
is that often patterns will be updated
because again this is open sourced
crowdsourced patterns are always being
improved and if they're in the repo you
want to update your patterns so we might
do this fabric D- update and that will
update your patterns but it will
overwrite anything that doesn't belong
in there so we're keeping our custom
patterns inside my super awesome
patterns that way they're never deleted
but to make sure they can be used by
fabric when we run our commands we do
need to copy everything into the
patterns folder so we'll do that real
quick we'll simply do copy or cp-r we'll
specify our directory our home directory
symbol Tilda sl. config SL fabric SL
your directory so mine is super awesome
my super awesome patterns we'll do the
asterisk to make sure all the folders
and stuff are copied just so into our
patterns directory config fabric
patterns just like that so now if we do
fabric D- list to list our patterns I
should see sermon Sensei right there
notice I have another one called sermon
wisdom which I had previously created
now let's test out sermon Sensei I'm
going to grab the sermon from my church
one of our recent ones do YT grab that
transcript put the URL there and then
pipe that into fabric using my sermon
Sensei pattern I just created now this
is pretty cool and honestly I think it
needs some work so just like the open
source patterns in the fabric repo you
can work on your and keep iterating so
like the one I really enjoy is the one I
created sermon wisdom that I think does
a better job and that really does
demonstrate the power of a really really
good prompt I mean I love how it pulls
out quotes probably one of my favorite
things and then was killer is the
references pulling out all the scripture
things uh he mentioned in the sermon I
love that now looking back at fabric if
we type in fabric d-el we can see there
are options we haven't mentioned yet
we're not going to go over all of them
but one thing I do want to touch on is
the idea of a context I'll let Daniel
talk about that real quick
this is the latest thing that I've been
working on under config fabric we now
have a context file my context file is
about increasing human flourishing by
helping people identify articulate and
pursue their purpose in life helping
people transition to human 3.0 to be our
best selves this is like this is
literally my soul that I'm translating
into text I haven't done this yet but I
want to make a context for myself soon
now I've got two more features I want to
show you the PB paste option for Linux
users and the ability to save anything
you create with fabric to obsidian my
favorite Notes application what I use
and what I've been obsessing over for a
while now oh it's so cool I just found
this but before we get there I want to
talk more about the philosophy behind
Fabric and why it's kind of captured my
imagination and why I feel like it's
more than just a fancy prompter now to
understand that I think we need to know
a bit more about Daniel misler Daniel
misler is a hacker that's his background
that's what he did and still does and
the reason I created it is because uh I
B I basically went independent as of the
end of 22 as soon as the AI as soon as
GPT 4 launched I was working at uh Robin
Hood at the time I I built the VM
program over there before that I was at
like uh apple and a bunch of other
places and I had been in AI for like
five six years but when I saw gbd4
happen I was like okay I'm out I
basically got out and said I need to do
this fulltime so I started collecting
all this different AI stuff as I'm sure
everyone has seen and what I found after
a couple of months is like okay I've got
a million different prompts now what do
I actually do with them right what I
started doing is collecting them into an
infrastructure that I could use
personally and this is a little bit
before fabric but it it became the
content for fabric and essentially what
it turns into is these patterns here and
you can tell just by using these
patterns that this is the result of many
many iterations it does things so well
and if you've been using AI for a while
again you know what it feels like to use
a really good prompt and have your
results be so clean and almost exactly
what you were looking for or even more
than what you expected and that's so fun
now I want to get back to the idea of
human flourishing because again that is
the goal of the fabric project and
honestly like when you hear that it kind
of captures your imagination right like
you know I I love cuz like I for me I I
don't know if you're like this but the
more AI advances the more I get just a
little bit more scared of where my place
in the world might be but when I hear
about projects like fabric where it's
not about replacing humans but about
augmenting humans to help us become
better to help us think better and to
help us consume more content that's one
of the main things that Daniel uses this
tool for one of the main reasons he
created this tool is that there's so
much content being produced all the time
from YouTube videos to podcasts to
articles just staying relevant in your
in your space in your Niche takes a
tremendous amount of time time you don't
have to consume things a big part of it
is I'm using it to determine what I
should go watch Regular in fact I'm
actually building a product around that
called uh well I won't say what it's
called but I'm building a product around
that so um just because I need it in my
life essentially I'm using it as a
filter to determine what I should go
watch and then I go watch it fully and
often times I take manual notes but I I
watch or listen to it in its entirety
and then I go and take notes on it and I
it spawns thoughts so I'm not like
stepping away and disengaging I'm still
reading massive number of books right
I'm still watching the videos I'm still
uh reading the essays um what this is
helping me do is just filter out or
filter up or raise attention to the
particular stuff that I want to watch so
a big way he uses fabric is to filter
out what is good what deserves a long
watch or what doesn't what just needs to
be summarized and quickly digested and
it's so cool because he the way he
created Fabric in a lot of these promps
is he designed these prompts these
patterns in a way that is meant to mimic
the way he would approach something the
way he would watch a video and take
notes the way he would listen to a
podcast and take notes it's kind of
crazy my very first thing that I made
for fabric is the ability to emulate as
if I took slow notes on a piece of
content by hand and that's what this
emulates now a little story time the
past six months I've been on a journey
of being very particular very
intentional with what I consume how I
spend my time and writing down as many
things as I can taking good notes
processing things and that led me to my
question I asked Daniel and that's you
know if we start using things like
fabric AI tools to do the processing and
thinking for us do we lose that value so
the kudin of me the the old man of me is
like don't do the AI stuff it's going to
keep you from becoming a deep thinker
and learning how to really analyze
things but here's what Daniel said about
this yeah I I think the way to use it is
to use the the context stuff that that
um that we're starting to build now
that's already in the in the uh project
and basically Define what you're trying
to do you can Define inside of the
context I need to learn this much about
these topics uh recommend to me the best
courses to do that with and then when
you take a piece of content and it's
like overwhelming you could put it
through Fabric and essentially distill
it
down and importantly it could tell you
what not to to distill down because
there's so much advantage to um going
back to your earlier point you don't
want to take the weights out of the gym
so everything shouldn't be a summary
sometimes you have to put the hard work
in but you can use it to tell you or
advise you or recommend to you which
things you should do slow and painful
and difficult because that's where you
get the most muscle growth don't take
the weights out of the gym so he'll use
fabric to help them determine what
should be slowly watched and processed
we saw that earlier with the label and
rate pattern it tells you like oh yeah
you got to watch this right now or H you
could wait on that again it's not about
replacing humans replacing you it's
about making you better about taking
your current capabilities and using AI
to increase that at a faster rate than
you could before it's about identifying
a problem that you might have and then
creating a pattern to help you solve
that problem and all the patterns you're
seeing there that are built into fabric
are a result of okay I've got got this
problem here's a pattern that can fix it
and you can do the same thing for your
life and we talked a bit about a
feedback loop to where I may have fabric
I'll create a pattern for this that I'll
look over my my journal entries
throughout the week and then it'll tell
me you know maybe you didn't uh read
enough that week and that's why you're
feeling sad or hey you're feeling
fantastic because you ran four times
this week keep doing that it's that kind
of augmentation that I'm really excited
about and that's where I see myself
growing with fabric and I I literally
use this all the time for so many things
me and Daniel also talked about how we
both started recording conversations
like any conversation we have with a
sibling a a friend a spouse record it
then transcribe it with whisper AI which
is you can use it locally it's free and
then pipe that into fabric I actually
started doing this recently with um we
have a weekly Bible study we have a core
group of people where we meet and we
talk about our lives and things and tell
funny stories and talk about what we
were learning and going through so I
recorded that and I created a pattern
that would EXT ract the things I might
care about from those moments check this
out it's so cool so I have the recording
transcribed I'll C that and pipe it into
fabric using my GC analyzer that's what
we call our communities GC gospel
communities now I won't show you
everything in this because it's very
personal but I want to show you how cool
this is and honestly this whole fabric
project is making me rethink about the
role of AI in my life it's here like it
or not what are you going to use it for
how can you use it to help make you
better and that was like the first video
I made ever about AI chat GPT came out I
was terrified but then after processing
it a bit more I'm like you know what
this is going to make us better it's
about us it's about humans flourishing
there was a funny moment about uh there
just funny story about sleepwalking and
it found that that's so cool I just did
this one look at the funny moments here
yeah we talk about weird stuff but I
want to remember that stuff I want to be
able to go back to that search it have
that in my second brain that's a video
coming soon and again talk with Daniel
about a lot more stuff including coffee
so if you want to see that entire talk
that entire conversation you can check
the link below to network Chuck Academy
which is my new project my baby where
I'm creating it courses to help you
become awesome in it I would love for
you to join we have an amazing Community
go check it out link below now the two
more things I wanted to show you first
this PB paste thing actually you know
what I'm not going to show you right
here I'm going to make a video about it
and by the time you watch this video
that one should already be up so go here
somewhere it's going to be awesome just
go and jump there but now to the iian
save thing this is so awesome so let's
take that same discussion here from my
GC analyzer I can save that directly to
obsidian there's a command that is baked
into fabric called save just like this
and what that will do is save the
contents of whatever you're doing in
fabric to a note in obsidian creating a
new note now to make that happen we
first have to tell fabric where our
obsidian lives in our operating system
so if if you're new to obsidian obsidian
is all about just text based documents
again warl of text all it is is just a
bunch of markdown files and it's
somewhere on my hard drive to tell
fabric where that is I'll just edit an
environment file so I'll go
Nano jump into my config folder fabric
folder and there should be a file EnV
for environment variables now you can
see that's also where our API keys are
stored and here's my path to the
directory I want to store new markdown
files created by fabric with that in
place I'm going to take away the option
I don't want to stream it I'm just going
to save this to a file so I'll pipe it
out to the save command and then I'll
just name it and go and then if I jump
into my obsidian which we're going to
Shield most of this from you if I go to
my specific folder there it is auto
magically that's killer again it's all
about removing friction this is so
amazing I love this stuff let me know if
you like this too let me know if you
want me to make more videos like this
about new AI tools or just exploring how
we can improve ourselves and make
ourselves better with the help of AI I
don't know
