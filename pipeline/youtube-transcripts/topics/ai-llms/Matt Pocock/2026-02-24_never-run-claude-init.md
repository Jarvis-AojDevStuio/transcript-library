---
video_id: "9tmsq-Gvx6g"
title: "Never Run claude /init"
channel: "Matt Pocock"
topic: "ai-llms"
published_date: "2026-02-24"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=9tmsq-Gvx6g"
duration: 637
word_count: 2401
---
If you're running claw code or really
any coding agent, there will be some
kind of init command. This promises to
initialize a new claw.md file or maybe
an agents.md file with codebased
documentation. I am going to recommend
that you never ever run this. And if you
find a claw.md file or an agent.mmd file
that you think has been created by an
agent, delete it. The file that this
creates will burn tokens, will distract
the agent, and will go out of date
faster than a pair on a hot day. This
paper evaluating agents.mmd are
repository level context files helpful
for coding agents. This actually put
this to the test and what they found was
we conclude that unnecessary
requirements from context files make
tasks harder and human written context
files describe only minimal
requirements. We'll get to what this
means and what you should actually use
claw.md files for in this video. If you
dig this kind of thing, then you should
check out my newsletter where I post my
new agent skills as I come up with them
and test them. And I'm also working on a
Claude code course which is going to be
an absolute banger. But let's actually
test this out and run in it inside my
work repository to see what happens. As
a bit of background, this is a fairly
large repo. It has a whole bunch of
package.json scripts, a whole bunch of
dependencies. It's a React router
application with an effect backend,
which is my favorite stack these days.
And there is currently no claw.md file
in here. But let's initialize one and
let's see what happens. We can see, by
the way, it's doing a explore step here.
And it's using sonet 4.6 for the
explore. So what this is doing is it's
calling a sub agent. I'm making that sub
agent explore the codebase and that sub
aent is going to report a summary back
to the orchestrator agent, the parent
agent. It's reading a bunch of files
here, doing a bunch of searches and just
getting an overall sense of the
codebase. Now this explore step is going
to be something that the LLM does or the
agent does every single time you do a
piece of work. It needs to explore the
codebase before it can feel confident
making changes to it. In fact, you can
think of there as being a few main tasks
that the agent does or a few main ways
that the agent uses up its context
window. The first chunk of usage is
going to be the system prompt. So,
anything that's inside the agent that it
has access to on every single request.
This would be things like, you know, MCP
servers and maybe uh any system tools
are going to be in here too. And
anything that you put in your claw.md is
going to make this bigger and bigger and
bigger. And if I just shift these up
here a little bit more, you can see
there's a little bit less available in
the context window for the other steps.
The other steps are exploration. So
exploring the codebase, understanding
what's there. Then we've got the actual
implementation, doing the thing, writing
the files. Then we've got testing,
running any feedback loops, unit tests,
any debugging goes in here, too. This
can absolutely balloon if something goes
wrong during implementation. Now, most
of these phases are fairly flexible. If
it's a very simple implementation, it
might only be very small like this. If
it doesn't need much testing, it might
be very small like this. But the thing
that's not flexible at all is going to
be the system prompt because that is
hardwired the moment that the uh agent
starts its work. So everything that you
can do to reduce this initial prompt
here to make this smaller is going to
first of all give you more space to do
your actual work, but it's also going to
reduce your costs. So for me personally,
I think of this as getting this the
lowest I can is the best possible
outcome. But when might you want to add
some information in the request that
helps the LM? Well, a common piece of
advice is if you notice something that
the AI agent is doing that you don't
like, then you put it in here. In other
words, if it tries to use the wrong
package installer or something, it uses
npm instead of pmpm, you can put it
inside claw.md and it will remember for
next time. Or if it's using a specific
pattern in React or something that you
don't like, then you can put it in
agents.mmd and it won't uh do it
anymore. So even if you're not running
claude in it, then it should like this
probably will grow over time and that is
a little bit annoying because this
little chunk here is global and that is
a killer because not all of it is going
to be relevant to every single request
that your agent makes. And so yeah, the
stuff you added in there about React is
going to be worth it there. This first
session might be like a front-end
session or something, but the next one
might be a purely API database session
where the stuff you added about React is
going to be completely useless. Even
more, you might have another session
that's just purely about documentation.
So, whenever you add something to
claw.md, you should be thinking about
all of these different use cases that
agents can have in your codebase because
anything you put into this global scope
here will affect everything you do and
cost you tokens every time you do
anything. So, with that in mind, let's
see the lovely init file that Claude
created for us. This file provides
guidance to Claude code when working
with code in this repository. Wow, what
a brilliant intro. Who is this for?
Like, what is going on here? Why would
you even print this? This is going to
cost me tokens on every single request,
Claude. It then gives us the commands.
Okay, these are unbelievably trivial to
discover. You literally just go into
package.json and they're all right
there. If you need to discover what
commands are available, you can actually
look at the source of truth, right? You
don't need this extra documentation. And
again, this is costing tokens on every
request. So, kill this. Don't like that
at all. Now, the architecture section.
Full stack React router SSR app for
managing course video publishing
workflows. React 19 with React compiler
enabled. Does it need to know this on
every single request? And how easy is it
to discover? Well, what it can do is it
can see that there's a React router
config file. So, it knows that it's in a
React router project. If it needs to
look that it's serverside rendered, it
can look in this tiny file, which might
even be less uh tokens than the actual
explanation, maybe comparable. If it
needs to, for whatever reason, know that
we're using React compiler, which it
probably shouldn't, then it goes into
v.config.ts and it can just see it
there. Right. Nice. So all of that
information is trivially discoverable uh
on its own. The only thing maybe is the
purpose of the thing. But then again the
whole project is called course video
manager. So I think I can safely delete
this too. Now we get to some stuff that
is a little maybe a bit more useful. All
backend logic uses effect for dependency
injection error handling composition
services defined with uh effect
services. And I really hate it when it
references actual files here. One thing
that makes me super nervous about this
is that this will rot really really
fast. As soon as we change any of the
implementation here, then this file is
going to go out of date and it's going
to conflict with the reality in our
codebase. Now again, this is trivially
discoverable that we're using effect
because we've got effect imports all
over the place. If we look for
effect.service, then there are eight
instances of it and they're all visible
in the file system too under DB service,
drizzle service, dump service. That's
not why not what it sounds like. repo
passer service. The file system is a
really nice way to tell claude what's
going on. And if you structure your file
system correctly, you can kind of give
it an impression of the overall
architecture which is defined in the
source of truth of your code, not in
documentation which can rot away. This
one especially key services, drizzle
services, DB function services, database
dump services. If I change the name of
any of the implementations here, I have
to go back and check this out. Tagged
errors go away again. Here I have a
video editor as part of this. So clip
operations go through a single post
endpoint API clip service. This is again
trivially discoverable from the code.
There's no reason to have this on every
single request because most of like the
actions that I take won't touch this
clip service. Again routting
configuration. I'm not going to need
this on every single request. Kill it.
Complex UI features use effect reducer.
I'm not going to use this on every
single request. And you get the idea
here. Too much is global. Too much is
going to go out of date and just rot
away. And it's just too freaking long,
man. I look at this and I think about a
key idea that I always have in the back
of my mind whenever I'm talking to LLMs,
which is that LLMs have a context
window, of course, but they also have a
budget for how many instructions they
can take on at one time. We can think of
this sentence, let's say, as an
instruction to use effect for dependency
injection, error handling, and
composition. This is another instruction
inside here. Services are defined with
this. This is another instruction. Roots
execute effect via runtime live.r run
promise. LLMs really only have a
realistic instruction budget of around
300 to 400 instructions. This increases
the kind of bigger model that you use,
but even then it only caps out at like
500. So if you're adding a bunch of
instructions into your claw.md file,
most of which are not even relevant to
the task at hand. You're just hamstring
your agent before it even gets started.
But this steering, like providing this
information to the LLM, should live
somewhere because there is useful stuff
in here that I do want to steer the LLM
towards in general. For instance, like
LLM seem really reluctant to use
reducers in their front-end logic, but I
find reducers are amazing with LLMs
because you can pull them out as a
testable unit and use that testable unit
to then drive the entire UI or at least
like reasonable size chunks of that UI.
So, I would be most likely to put this
stuff into skills that the LM can
discover, but don't burn their
instruction budget immediately. But
talking about that and talking about
skills is probably the topic for another
video. So if the steering stuff belongs
in skills and if the like uh basic setup
stuff doesn't belong here at all like
package.json script and all that kind of
thing, what should you actually put in
your claw.md? Well, the only thing I
actually have in any claw.md in my
entire setup is if I go into um memory
here and I've open the memory file here,
all I've got is a single line which is
six words saying you are on WSL on
Windows. And this is really just because
it's a kind of unintuitive setup and it
has some issues when it comes to path
resolution across the Windows Linux
divide. And I found that this single
instruction here just gives it a lot of
extra context that it needs. I've also
advocated in the past kind of using this
file to steer the agent itself. For
instance, I had this one for a while in
all interactions and commit messages be
extremely concise and sacrifice grammar
for the sake of concision. Instead, I
prefer now I think this is actually
better placed inside a skill. But even
then, I'm actually not running this yet.
I really just keep the global stuff down
to a minimum. So hopefully that makes
sense why you should never ever run
Claude in it. It's going to spill a
whole load of useless crap into your
global context where it simply won't be
relevant for most of the operations that
you will need to perform and it just
loves putting in specific patterns and
files into here which will rot away as
soon as the underlying code changes. So
either that means you need to burn
tokens to keep this up to date which
just feels crazy to me or you just
delete it. Bye-bye claude.mmd. And then
you rely on the built-in explore phase,
which every single agent should be doing
now to build up the needed context just
in time before you start the
implementation. But thanks for watching,
friends. I'll be covering this in even
more depth in my upcoming course and
I've already got some stuff on this on
the newsletter. So, thanks for watching
and what should I cover next? Let me
know if you have any questions about
LLMs, about anything around this kind of
AI coding area. And either way, thanks
for watching and I will see you very
