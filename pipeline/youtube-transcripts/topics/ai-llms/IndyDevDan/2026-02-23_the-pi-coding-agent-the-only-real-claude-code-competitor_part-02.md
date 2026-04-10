---
video_id: "f8cfH5XX-XU"
title: "The Pi Coding Agent: The ONLY REAL Claude Code COMPETITOR"
channel: "IndyDevDan"
topic: "ai-llms"
published_date: "2026-02-23"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=f8cfH5XX-XU"
duration: 3096
word_count: 3994
chunk: 2
total_chunks: 3
parent_video_id: "f8cfH5XX-XU"
---
sub aent one. And now let's continue
running sub aent 3. And I want to say
expand into four sentence description.
And obviously like these aren't actually
useful prompts. I just want to show off
the capabilities of customizing your own
PI agent. Okay. So there we go. Sub
agent number three. You can see it's on
turn two and it's expanding its
response. Okay, so we have our own sub
agent system. We build this in a single
extension. Remember I just stacked these
others. Uh we also have the theme
cyclinger. So I can come in here X and
we can cycle our theme. Drop a like,
drop a comment, subscribe. Make sure
you're plugged into the signal. I hope
you can see the vision here. It's not
just about customizing the prompt or the
system prompt or a specific agent,
right? Or a skill, right? That's great.
Frankly, that's all table stakes. Now,
if you want to expand what you can do,
if you really want to differentiate your
agentic engineering and frankly just
your engineering, you want to be able to
customize everything surrounding your
agentic engineering experience. All
right? And so that means having control
of the agent harness. Let me be super
clear about this. I love cloud code. I'm
going to keep using it. In a moment
here, we'll talk about strategy about
how to decide which one to use and when
to use each tool. But if you want to go
beyond, you cannot be doing and you
cannot be using the tools that everyone
else is using. Right? It's called, you
know, the middle of a distribution for a
reason, right? Everyone's using cloud
code now, okay? Uh that unique value is
is, you know, still there. There's a lot
of capability there. We're going to keep
covering on the channel. But I also want
to start pushing you in some new
directions here for your engineering
work. Make sure you like, comment,
subscribe so that the algorithm knows
you're interested in continuing to push
your limits by pushing the tools you
use, right? Because every engineer is
limited based on the tools they use. And
so when we're done with our sub agents,
we can of course come in here and sub uh
clear. And now we're fresh. And we can
of course just type / new. This is a
built-in PI tool or PI command. And that
will reset the session. Okay. So great
stuff. Uh very very clean, minimalistic
UI. You know, you can see here I like
being in the flow. I don't want to see
all this extra information. So there's
one more here before I want to go back
to like comparing these tools together.
All right. Now, this is a big one. So I
want to clear out. Going to run this.
And you'll see here we have a new
extension that I'm calling till done. So
not to do, not to done. This is till
done. Okay. So let me show you what this
thing can do. I'll just type ls. And
you'll notice something really
interesting here right away. So ls wants
me to ls. You can't do an ls. So so I
blocked ls from running. My agent must
add a to-do item in the list before it
runs ls. So check this out. It's going
to finish up here and let's scroll back
up. We have a till done list, not a
to-do list. This is a till done. My
agent must work until this work is done.
And you can see here I've added my own
custom rules to this. Okay? And so if
you're starting to think about, you
know, Ralph Wiggum or you're starting to
think about agentic loops and you're
starting to think about adding
determinism to your agents via hooks or
full-on code that wraps your agents,
you're on the right track. That's
exactly what we're doing here. I block
my agent using hooks. Of course, PI has
a very extensive hook system we'll break
down in a second. But you can see here
ls was blocked and it needs to create a
task list and add an item to the task
list before doing that. Then it must
manage the task, execute on the task and
then mark it as done. Okay. And so now
you can see here in my footer, I've
updated my footer. I've customized my
Genta coding tool to be a tillone agent.
Okay. This thing is going to run till
it's done. What do I mean by that? Let
me show you a more concrete example. All
right, so here's what I'm going to do.
create trees.mmd. And you know what?
Actually, what I'm going to do here is
I'm going to make our model dumber
because I want to show you that
controlling the harness can make up for
a lot of model mistakes, right? Even the
top tier models. But let's go and dumb
this model down. Uh right now we're
running Sonic 4.6. I'm going to go ahead
and look for that haiku. An okay model,
but we're definitely talking about
bottom tier intelligence. All right,
that bottom third. Now, so here's what I
want. Here's my micro task. create
tree.mmd that maps out all the files in
this codebase in a tree structure just
file names don't read any files right I
don't want this to take forever so I'm
going to kick this off and now the till
done is going to uh be the primary mode
of operation okay and so my agent must
have items in the to-do list and it must
complete the item so it's already done
this right so create treed with codebase
structure very good right we can now you
know load tree.md you can see that this
is a net new file I have not committed
this. And we have a great tree. All
right. So, fantastic. Let's push this a
little further. For each TypeScript
file, read it and add a one-s sentence
summary to the tree file. Create a to-do
item for each file. So, now I'm going to
leverage this to-do list. And you can
see my agent wants to create a new list.
In order for it to move on to this next
set of tasks, it has to ask me. This is
part of the agentic workflow that I've
set up with this extension. So, I'm
going to go ahead and hit yes. There we
go. And now it's going to create 16
tasks and start working through them
piece by piece. And so our Haik coup
agent doing a bunch of work, doing it
very quickly, and saving us cash. Keep
in mind, this could have been any agent.
I could have picked the new GLM5. I
could have picked Minmax 2.5. I could
have picked Gemini 3 Flash, right? There
are many models that could do this work.
And now you can see it's going to update
it. It's read all these files. And now
it's going to incrementally toggle all
the items and mark them done. First in
progress, and then done. There we go.
And now any task that isn't complete,
the agent has to work through and mark
complete. And so you can see here that
it's it's cutting some corners here. I'm
going to accept this. It's trying to
clear the list. Uh any agent that wants
to clear the list has to run it by the
engineer. All right. So this is a great
tool for inloop agentic coding. So I'm
just going to go ahead and said yes. It
did the job. And so the tool served its
purpose. So our till done list, you
know, got these descriptions added for
every single.ts. You can see all there's
all thets files. Fantastic. Another
great part about the till done list is
that if a task is not complete, right?
Kind of as you saw here, if a task is
not complete, the agent is prompted to
keep going. So very very powerful tool.
You can see that I'm customizing the
agent coding experience, right? The
whole thing. And I'm plugging into the
right hooks, right? I'm building out new
UIs to aid and drive the experience
forward. We had some choice dialogues
along the way. So I'm just painting the
picture of how powerful this can be for
you. Now that's the tier one kind of
basics of PI. Let's go ahead and talk
about the agent harness. Let's compare
PI to cloud code. We of course know open
source versus closed source. PI agent
comes with just 200 tokens. Cloud code
super opinionated. It's got a lot of
best practices in there. We have a big
difference in default tools here. If we
hop back to an instance here and if I
run list tools, I'm going to fire off
this custom slash command. You can see
here that it has to create a new till
done. Perfect. And then it's going to
update that to in progress. And I was
going to write it out to a tools.mmd. So
this is just a reusable prompt that I
have and use to get the tools out of the
agent. This tool is very limited. You
can see here that our PI agent has just
four tools. Read, write, edit, bash.
Okay. And then it has that tool that
that custom tool that I created here in
task management. So you can see, you
know, the the under workings of that
tool here. And just with this, I created
my own task management system. All
right. So the customizability is all
there but you know notice this just four
tools this agent is operating with half
the tools of cloud code out of the box.
All right and so once again you know you
can see that uh this thing is very bare
minimum. Okay default permissions as
mentioned PI runs in YOLO mode out of
the box hooks. Um this is how you tap
into the life cycle of the agent as you
would expect. Pi has a lot more plug-in
points. Claude has a lot of the
essential ones, which is great, but this
means you get more control over every
little thing that happens. All right.
And then modes, we talked about this,
right? There's no real mode in Pi. It's
just yolo mode. It's just do whatever
you want. This is where, you know, with
PI agent, you really will want to know
what you're doing. That's why I think
this is a tool for advanced, you know,
mid senior plus level engineers where
cloud code lets you really break things
down. It has a lot of opinionated
defaults for operating. And you know, if
you've been with the channel, you know
that I always operate in bypass
permissions mode, which is also known as
just YOLO mode. And so, customizability,
once again, is a big deal. Uh, Cloud
Code, to be super fair, lets you
customize things to a decent degree. But
PI agent just takes it to the next
level. You can customize basically
everything. Models, uh, this is pretty
straightforward, right? You basically
get access to every model when you use
PI. We know that, you know, again, Cloud
Code is a product. They want you to use
their models. All right? right? They
want you to do it their way. PI agent
doesn't care. Use whatever you want.
OOTH login, you know, you know that you
can use the API key or your Pro or Mac
subscription. Uh PI agent lets you use
any one that's available. If there's a
way to use your Chatt Plus, GitHub
copilot or Gemini CLI plan, PI agent
actually supports that, right? Cost
licensing, same kind of deal. We can
just kind of run through this. Open
source proprietary subscription costs
bring your own. They both has a /cost
command. This is exactly what you would
expect, right? And this is one of the
big problems that people are having with
cloud code. Um, they're really locking
down the usage of their plan. You can
really only use their plan on cloud code
or the API keys. All right. I'll have
engineers DM me about this, like asking
for validation on this. I've always said
that they would shut that down and that
they would close that. Um, I'm surprised
they left the uh O key on the plans open
for so long, but here we are. They
finally shut it down. You know, it's all
API keys or dedicated plans. Nothing
more to say here. So, this is where
things get interesting. Context
engineering and prompt engineering. As
you know, cloud.md is the default memory
file for cloud code. PI agent uses
agents.md and falls back on cloud. All
right. Skills both fully support skills.
Skills are industry standard now for
agent coding. Everyone supports it. It's
all about where you place them for that
quick auto pickup. Commands, same deal.
Sub aents. This is where things get
interesting. As you saw, cloud code has
native support via the task tool. Pi
does not have support. That's why you
saw we have to build that in ourself. PI
is a minimal agent decoding agent built
for you to customize it. Task list
to-dos. Once again, as you saw, we built
that in ourselves. We did it manually,
while Cloud Code has the built-in uh
task list. Now, it's not called to-do
anymore. Multi- aent capability. We just
saw it. We just covered this in a
previous video. Cloud Code now has
multi- aent capabilities where you can
deploy teams of agents to work together
and communicate through a centralized
message bus. PI does not have any of
that. All right. Uh but as you saw and
you know not to give it away you can
build this yourself here in a PI agent
system prompt you can overwrite the
system prompt in cloud code. Um with PI
agent you can do the same. So uh this is
really a tie but Enthropic doesn't
really want to share their system prompt
although it you know it's not super
super hard to get but the system prompts
are of course customizable. This is a
key part of the core 4 context model
prompt tools. If you cannot customize
the system prompt you can't use the
tool. All right so this is pretty
wellnown. There are no limitations
around this. They both have compact
features. When you're running out of
context window, nothing new there. All
right, programmatic and SDK. So, they
both have great support for programmatic
mode. As mentioned, if the tool does not
have programmatic mode, throw it out the
window right away. You must be able to
build Outloop a Gentic coding tools with
the agent harness. Okay, so they both
have support for this. The big
difference here is that if you're using
Pi, they have a TypeScript SDK that you
kind of have to use to get true
customization. You can run agents
directly via bash on both sides, but um
cloud code wins on the SDK support here.
They both have export functionality.
Nothing new there. And we know that on
costs you must use the API key for the
cloud code programmatic mode. And that's
the exact same with PI agents or uh if
the model provider plan supports it, you
can use that.
All right. Now, let's move on to our
tier 2 PI agents. Now, this is where
things get really interesting. With PI,
you can build in multi- aent
orchestration into the experience of the
tool. All right, so what do I mean by
that? Let's hop back to our just file
and let's move to our second group here.
All right, so let me show you an agent
team. All right, so let's reset. Open up
a brand new version here. And this is
really cool. What you're seeing here is
an agent team. We have a scout agent, a
planner agent, builder, reviewer,
documenter, red team. All right. So,
you're probably used to some versions,
some number of these agents. Let's kick
this off and let me just like show you
how powerful this is. So, this is an
arbitrary agent team. And I'll do this
scout find all TS files. Instead of my
primary agent doing anything, it has a
team of agents that helps them do the
work. So, this is another version of
multi- aent orchestration. If we scroll
up here, you can see our primary agent
didn't do any work. It doesn't need to.
It has agents to do that work on their
behalf. Dispatch agent ran. Our scouter
found all the TS files and it returned
it to our primary agent. Okay, very very
powerful. Let me get out of haiku mode
here. Um get out of the haiku model and
let's hop back to that powerful. Let's
go and do like a flash, right? Let's do
um Gemini 3 flash here. So we can do
something like this, right? We'll have
the builder move the tree.md h3s moved
right after the tree file as a bullet
point. We're prompting our primary agent
to run the builder agent. But you'll
notice here that it used the scouter
first to find this stuff. And so it's
running scouter prompts. And then after
the scout runs, after it finds the
information, it's then going to dispatch
the builder agent to finish the work.
There's the builder. The builder is
taking the input from the primary agent
that the primary agent got from the
scouter. And now it's doing the job,
right? It's updating the tree.md file.
You know, you can see here in a very
very kind of simple way, we're using
multiple agents to drive toward a single
outcome. All right. So now, if we look
at our tree, you can see that it's added
the description right next to it. You
know, there's a simple version of what
multi- aent orchestration looks like.
You can see the scouter is running again
just to validate that that looks good.
Check this out. Right? We had two agents
in this agent team run. And so this is
where things get really powerful.
Instead of having a whole set of random
agents that you can run, instead of
running ad hoc agents, you really want
to be specializing. This is a big theme
we talk about on the channel like
specialization is the advantage. Now
everyone is going to be running that
normal distribution of just junk that
comes out of these models. When you give
it your prompt and when you build your
own custom agent decoding tool on top of
it that's where you really get
differentiated results. Now we can do
something else with this. If we type /
aent team you can see here we can select
a team. This is a default team that just
loaded. If we hit agent teams, you can
see here I have different teams of
agents. I'll click on the plan build
team. And now you can see I have a
planner, I have a builder, and I have a
reviewer. And this all comes from a
teams file where you can see I just have
a simple YAML configuration for all the
teams that puts together unique
combinations of my available agents. So,
you know, remember, let me make this
super clear, right? PI does not have sub
agent support. So, how am I getting
multi- aent orchestration? I'm building
it myself, right? I customize it. This
is all coming from this one extension
here. Okay. And of course, I have the
theme cyclinger. I'm just stacking that
on pretty much on every one of these.
So, control X. And so, you can see
there, I'm just cycling through all the
themes. My agents are getting
customized. Just love the customization
here, right? Let's go and look at the
system select. All right. So, let's tone
things down a notch from our multi- aent
setup. And let's fire this up. So,
system select. What does this do? This
allows you to select the system prompt
of any one of your agents. As mentioned,
cloud code is a great tool. It has a lot
of great defaults, but real engineering
work and building solutions for your
users and customers requires being
specific. It requires specialization so
that you can create unique experiences
and unique outcomes. So, you want to
boil that ideology all the way down to
your tooling. So, here we have a custom
slice of pie where we can type slash uh
and then slashsystem. And when I hit
enter here, you can see I can now become
any one of my agents. Remember before I
mentioned we had that browser agent
headless browser support using the
Playright CLI. We covered agent browser
automation in our previous video. I'll
link that in the description if you're
interested. But now I've updated the
system prompt of this tool. Okay. Now
I'll just say go to whatever. Let's
let's find something to go to here.
Let's go to pi.dev dev summarize the
value prop of this tool. This agent is a
browser agent. You can see it fired off
the Playright browser skill right away.
And now it's running playright via the
player CLI. You can see some of the
results there. And there's the response,
right? So this agent fully operated a
browser and dug into the capabilities of
this agent. Now again, the key part here
is that I can change the primary focus
of my agent whenever I want to. All
right. And notice what's happening here.
You can stack your extensions. Very,
very powerful, very important. These are
composable, customizable units of your
own agent. really really powerful stuff
here. You can imagine that my real uh
you know primary version of pi I build
the extensions in isolation and then I
stack up features that I want in
different conditions. I am really
against this one agent, one model, you
know, one tool solution to do
everything. It's not really how you
create real results, right? A lot of
situations require specialization. Let's
move on to to damage control. What is
damage control? Of course, inside of PI,
you have access to all of the available
hooks. In the past, we've talked about
building a damage control skill to
prevent your agents from doing dangerous
things like this. RM-rf.claude.
Let's get rid of claude completely. We
can't because we have hooks blocking it.
Just a quick showcase. You can block any
command you want. You can control any
piece of pie that you want to. All
