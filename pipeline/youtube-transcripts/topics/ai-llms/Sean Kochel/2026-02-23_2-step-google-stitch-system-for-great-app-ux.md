---
video_id: "XpxDwVt3OFw"
title: "2-Step Google Stitch System For Great App UX"
channel: "Sean Kochel"
topic: "ai-llms"
published_date: "2026-02-23"
ingested_date: "2026-02-24"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=XpxDwVt3OFw"
duration: 805
word_count: 2594
---
The biggest issue with vibe coding is
that people tend to get very empty
feeling solutions to their problems. So
sad, right? Like you've got this idea
swirling around in your brain of this
awesome dope thing you want to build,
but when it comes to putting pen to
paper, you get this wet bag of a user
experience. Like you aren't even excited
about it. And if you aren't excited
about it, there ain't nobody else going
to get excited about it. Half the time
you use these tools, you get something
that blows you away and it becomes very
difficult to replicate that success. So,
it ends up feeling more like a roulette
wheel at a casino than something you can
actually do reliably every time. I've
been there myself, which is why I was
stoked to see this new release from
Google Stitch. So, after messing around
with it for a few hours, I came up with
a pretty cool system to take that idea
that's just rattling around in your
brain and turn it into something that
people would actually swipe their credit
card for. So, let me show it to you. And
so, the reason that I like this process
is because we can give a high-level idea
of what it is that we're trying to build
and get really distinctly different
approaches to how we would actually
build those things out. And so in this
first example, I'm giving it a very
basic generic prompt saying, "Hey, I
want to merge agent first interactions
with a social media content creation and
repurposing tool." And so it gave me not
three different UI approaches, but three
entirely different UX approaches. So if
we wanted to build this type of app,
there are a lot of different approaches
that we could take to how we actually
intend to solve that problem. So in one
case maybe it's some sort of canvas like
this while in another case maybe it's a
pure chatd driven interface. So that
being said let me show you how we can go
from idea to getting screens that
actually look something like this. So
when we're inside of Google Stitch
there's this new option in this drop
down here for ID8. And so the reason
that this is different from the other
functionality inside of Google Stitch is
it doesn't just take your idea and build
out a UI for it. It actually thinks
through the problem and tries to come up
with different ways of building a
solution to that problem. So if you stay
around to the end of the video, all of
these prompts that I am using will be
available for free. So I'm going to skip
through the structure of the prompts
because you can go and read that below.
What I'm going to show you is what I
actually put into it that's specific to
this app. So in this example that we're
going to move through, the concept for
the app is a spaced repetition learning
app that helps vibe coders learn to code
better through their projects. And so
the concept that I have for this is that
you would upload your GitHub repository.
It analyzes the app, find your skill
gaps, and then educates you through
those concepts to help you build better
stuff. Now providing this type of
motivational context is actually really
valuable because at any moment where the
language model or tool needs to make a
decision on its own, it knows what you
are actually trying to build and can
come up with solutions where there are
gaps more effectively. And this concept
of motivational prompting is actually
documented to work by anthropic. So the
next piece of this is like well what is
our thought about the MVP? How is a user
going to actually interact with this
thing on a high level? So, my thoughts
are outlined here. They're going to
upload the link. It analyzes it, builds
a visual representation, and then
there's going to be features that allow
people to chat with this thing and kind
of understand what's going on. And what
we get out the other side of this is a
series of features with the user story,
the acceptance criteria, and some other
information that for purposes of what
we're doing, we don't really need to
worry about. And so what we're going to
do is we are going to copy this output
of the features that we want to build
and we're going to take it to the next
step. So now what I've done here is I've
gone back into Google Stitch and I've
pasted in the first section for the
executive summary, the second for the
key features that we're actually going
to build in this exercise and then the
core functional requirements for these
features. Now, after we've put that in,
all we're going to do is hit this blue
arrow to ideulate, and it's going to go
through and it is going to start
thinking about different approaches to
solving this problem. This first stage
moves pretty quickly and it's going to
give you three different distinct
approaches that we can take to the user
experience. So, in this first version,
it's envisioning a kind of like pro tool
that's a little bit like a command line
interface or a terminal. In this second
version, it's more of like a learning
studio. So, a little bit more of like a
notion meets a linear but for curating
an educational experience. And in this
third example, it's more of a focus on
the visual representation of what you
have going on. Now, for me as a user who
sometimes struggles with this type of
stuff too, this third version, I think,
makes the most sense to me. But what we
want to do now is we want to expand out
these ideas to get a sense of what the
user experience would actually look
like. So we could have it deep dive and
build out just one of these or we could
have it build out all three. And so I
told it to build out all three
directions. And we can see it's now
doing this kind of glitchy experience
where it's building a PRD out similar to
the one we just had, but now focus
through the lenses of these different
design directions. And so now that this
process is done, we can doubleclick onto
one of these and actually scroll through
to see what it wants to build. So it's
mapping out the key user flows, what the
design system might look like, the
specific specs on each screen that it's
going to build, what the states look
like, the interactions, the key
elements, the layout of each of these
views, right? And so we're getting a
very clear understanding of what this is
going to look like and it does it for
each of the concepts that we told it to
move forward with. Now, if you're
somebody that isn't trained inside of
like a product organization and you're
just trying to use these tools to do
cool stuff, there's really two concepts
that I think are important to go down
the rabbit hole on a little bit. The
first is this idea of a mental model in
UX. And so a mental model is basically
the user's preconceived notions about
how this app should function and their
expectations interacting with it. So for
example, right now in the AI space, chat
interfaces dominate most AI
interactions. And so the mental model
that a lot of users would probably have
moving into a tool like this is
expecting to interact with it via a chat
interface. And that is why research in
this stuff is actually very important
because you need to understand how
they're used to interacting with other
applications and what their expectation
is interacting with yours. Now the
second concept is user journeys. Right?
So they have this mental model when they
approach your app. But now how do we as
the people building the thing expect
users to interact with the app to solve
those problems? And so each major flow
of interactions is a journey. So the too
long don't read of that is how are they
going to actually interact with this
thing. Now, the reason I call those two
points out is that as you read through
these things, if you are in disagreement
with your conception of what a user
should do as they're moving through the
flow of your app, this is one of the
critical points where you want to give
feedback to the system. Because if you
just allow it to do what it thinks your
app should be, then you might get
something that again feels empty to you
because it's not quite what you actually
wanted this thing to be. And so what we
can do from here is we could pick one of
these out and tell it to go build that.
Or we could tell it to proceed
generating all of the screens. So just
to demonstrate here, I will say, hey, go
build all of these screens. So that took
about 2 minutes to finish. So not that
long. And we can look through these
things now to see how the same core
concept in our minds can really manifest
in a lot of different approaches to
solving that problem. So these first
series of screens that we're looking at
were the blueprint style representation
which again was meant to be a little bit
more visual. So we can see in this case
this is where the user would input their
repository link. And so we can see in
this example how it builds out this like
interactive kind of drag and drop
representation of what is inside your
codebase actually like what is the
structure of your different backend
services. we get like a sense of what
the complexity of some of these things
might look like, which is an interesting
like kind of UX consideration. We could
include something like that. We could
see down here how we could have this
like spatial diagram where we can move
the screen around and zoom in on
different services for example. We can
pop into a specific node. And this is
pretty cool how it detects different
concepts, right? Like middleware
chaining for example. And then as a
user, I could deep dive into that
concept and explore it more and see like
what about my app is something that I
should improve if I want to do this
thing really well. So pretty cool
overall. If we move on to the next one,
now this one was meant to be more of
like the terminal IDE kind of
experience. So this is kind of
interesting how now we have this
explorer where we can see a
representation of our app just like we
would inside of something like VS Code
or cursor, but then again we're visually
representing that thing and we can deep
dive into specific components and try to
understand how they work a little bit
more. And so this one's kind of even
representing like a little bit of like a
project management board where we have
like a cue of what it is that we should
be thinking about learning, what's a
high priority learning point, what's
not. Again, kind of interesting. And
then last but not least, the one I I
think I like the aesthetics of at least
a lot more is this more like
studiooriented approach. And so this one
is definitely feeling a lot more like a
learning experience for me where it's
very clearly showing me as a user the
different like learning modules or
learning opportunities. So this is
really cool. But one of the things that
I really like about Google Stitch
specifically is that we can dive into
any of these screens if we really wanted
to and start building out more of the
interface. So, for example, I could
click into this one, which now loads it
into context down here. And I can ask it
to build out more functionality that I
would want to see how this gets
manifested again in the context of the
users's mental models that they have
approaching this thing and the journeys
that I'm expecting them to have as they
interact inside of the app. And so, I
really like the way that this thing
looks. And again, it aligns with my own
mental model of a user is expecting to
have a chat-like interface. And even
this quiz functionality that's in the
middle of this is very reminiscent of
most models having a ask user question
type of interface. So the whole feel of
this thing is already aligned with what
users expect based on where the industry
realistically is. And so another thing
that I think is a big bonus of Google
Stitch is that you can have it generate
specific numbers of iterations of that
screen. So in this case, it's building
out what three different approaches to
that problem given our mental model and
user journeys, what those approaches
could actually look like. So again, this
one's like a a straight chat interface
with a pop out sidebar. This one is more
of like a traditional LLM, just having a
chat back and forth. And then this one
is also tracking the key concepts that
you are learning as the chat is actually
progressing. So again, a lot of these
designs and experiences would really
need to be dialed in and thought through
a lot more thoroughly, but now I have a
very clear approach to how I would think
about building something like this. And
so this is a really powerful thing.
Instead of just traditional vibe coding
where you're just telling the language
model to go build something and not
really thinking about what it's
building, this type of workflow and tool
allows us to really iterate through the
concept itself and how we're thinking
about it and how that's aligning with
how our end customers might think about
it and making sure there's a connection
between those two worlds before we start
worrying about building out all of this
complex functionality that might not
even be what we wanted. it realistically
to be in the first place. Now, if your
next question is, well, this is cool,
but how do I then actually get access to
all of this inside of like my local
development environment? I will link to
a video just around my head somewhere
where I literally show you how you can
use Google Stitch's MCPS and new skills
library to clone all of the screens from
this design pixel for pixel inside of
your development environment. and it is
really good at doing it. But that is it
for this video. Again, the prompts will
be available in the description below.
