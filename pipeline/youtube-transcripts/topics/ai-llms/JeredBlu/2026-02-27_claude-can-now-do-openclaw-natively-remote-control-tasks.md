---
video_id: "Sg74Di2Yc88"
title: "Claude Can Now Do "OpenClaw" Natively (Remote Control + Tasks)"
channel: "JeredBlu"
topic: "ai-llms"
published_date: "2026-02-27"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=Sg74Di2Yc88"
duration: 520
word_count: 2153
---
We took the new cloud code features, the
new co-work features and made our own
version open cloud that uses our already
existing MCB servers, our skills, our
sub agents, running scheduled tasks that
we could access from our phone whenever
we want, using all the tools and all of
our knowledge and then saving it all to
memory. In my opinion, it's a safer,
more efficient implementation. They
could run locally on your computer with
cloud code and cloud code work without
the fear of being banned and with way
less security and efficiency concerns.
In the last few days, Anthropic has
released two new features that paired
with other previous features completely
replace the need for Cloudbot in a much
more secure, efficient, and native
workflow. I've only been playing with
this for the last day, and it's not
perfect, but I just want to show you how
we could replicate pretty much
everything that Cloudbot was good at
within Cloud Code and Cloud Co-work
together. And I'm sure in the coming
days, this will get even better, either
by enthropic unifying all these features
or other people doing it even better.
And in my opinion, what was great about
OpenClaw was you had this always on
agent that was always ready to respond
to you via multiple channels at any
time. He always had access to a
computer, so he could perform actions
and tasks on your behalf, either via
tools or MCP or CLI commands or maybe
even clicking in a browser. And it was
also able to do things on cron jobs,
meaning schedule tasks over time, be it
repeating a certain task or updating
memory. And my biggest problem with
Cloudbot was how hard it was to set up,
how unefficient it was, how expensive it
was, not being able to use it with a
cloud subscription, and the list goes
on. But Anthropic just released two
major features that when you pair it
with other features like MCPs and skills
and sub agents, it makes cloud code or
cloud co-work in my opinion a safer,
more efficient way of running something
like OpenClaw. And those two features
are one, the new remote control feature
for cloud code, which essentially allows
you to keep chatting with a local cloud
code instance that's running here on
your computer when you're away from
home. And by the way, I actually did a
video on how to do this with Cloud Code,
with codeex, with open code via T-Mox
and Tailcale and Termius. But remote
control allows you to do the whole thing
within Claude. Meaning you start an
instance of Cloud Code, you do / remote
control, and then you can open Cloud
Code on your phone and keep chatting
with that same instance. It essentially
mirrors what's going on your computer to
your phone. The difference between this
and the previous version of cloud code
on your phone or the cloud code web is
that in those instances you're running
cla code or codecs in a web instance. It
doesn't have access to tools. It doesn't
have access to your file system. Those
exist in secure sandboxes on Anthropics
or OpenAI servers. But here you're just
mirroring what's happening on your
computer to your phone or some other
browser that has access to the session.
And I'll show you that in a second. But
the second thing they added was
scheduled tasks to co-work which allow
you to plan tasks that happen on a
hourly, a daily, a weekly or a manual
scheduled basis. And those tasks can
look at the same file system. They can
use tools. You can choose which model it
uses and it's overall very powerful. Now
what ties all this together is Cloud
Code's automemory. I did a video on this
a few weeks ago. Essentially, instead of
storing memory in your cloud.MD file or
some memory MCP like cloud mam or basic
memory, cloud code can now store certain
things in its own persistent memory
outside of your project. It can record
learnings and patterns and insights, but
you could prompt it and tell it to
memorize more. So, when we pair all
these things together, we have an always
on agent that has access to a file
system, that has access to MCB servers,
that has access to the CLI, it has
ability to run cron jobs, to run
scheduled tasks, and has the centralized
memory. And before you come at me, no,
it's not perfect. So, let me just show
you what I set up here. First of all,
this is running on my Mac Mini. This is
what I originally bought for OpenClaw,
and now I'm using it for always on
development. The reason I'm telling you
this is that just like with OpenClaw,
you need a device or you need a machine
that's always running. This can be a Mac
Mini. This can be another computer. This
can be a VPS as well. But for this
system to work, you need a machine
that's always on. Now, I created a new
directory. I call it betterclaw. Come at
me. I set mine up way more basic than
OpenClaw. I have a memory directory
where I can store some local memory. I
have a logs directory where I store
session memory. I have basic information
where I have information about different
projects, facts about me and the
different domains that I cover with
better claw. In mycloud folder, I have a
few things. I have the skills that I
gave to this agent. I also have specific
sub agents I created, the adversarial
research agent, the CRM operations
agent, and the YouTube video producer
agent. They could all store memories in
agent memory. I just want to show you
the MCP I has connected right now. The
global MCP servers I have on this
machine are just Xcode and Xcode build
MCP. Then these are the MCB servers that
are connected to my cloud.AI where
bright is the one I install everywhere.
Canva, Fireflies, Gmail, Google
Calendar, my Calcom MCP, Netlefi, NAN,
Stripe, To-Doist, etc. And when I finish
editing this video, I'm going to connect
my own personal MCPS, my local ones like
my YouTube Studio, YouTube Analytics
one, for example. And more than that, if
we do /plugins, we can see that I also
installed my marketplace plugins, which
has my PRD skill, which has my agent
skill evaluator skill, and my MCP
evaluator skill. So I could have claude
code build out my PRD or my MCP
evaluator directly here but from my
phone. So the first thing I want to show
you is first we want to turn on remote
control. So you do SL remote control. So
now it says remote control is active. So
if I were to access this on my phone,
you see the top one, it just says
interactive session Mac. It's just a
blank session. So I'm just going to
dictate to it do research on Nano Banana
2. So I'm just going to paste that in
there. Boom. Send it off. You'll see on
the screen as well. So from claude on my
phone, it's remote controlling into the
session. Now it's going to use the
adversarial research sub agent to
research Nano Banana 2 using the bright
data tools. So I'm just going to let it
do everything. By the way, it also shows
me the permissions it asks for here on
my phone. So it just all came out on my
phone. You can see it all here. Bottom
line is Cloud Code is running on my
computer. I'm able to interact and see
the whole thing from my phone. I'm able
to trigger sub agents and skills and
MCPs on my computer directly from my
phone. have it do all the work here and
send it back to me on my phone. One
thing I should mention is for this to
work, you always have to have a session
of cloud code open in the terminal. If
it's closed, then it won't run on your
phone. And by the way, same thing goes
for cloud co-work, which I'm going to
show you in a minute for recurring
tasks. You have to have cloud desktop
always open. If not, the recurring tasks
won't run. Now, the good news is you
could have cloud code open, the
terminal, and cloud code work open both
simultaneously. They just have to be
running. One other thing I want to show
you about remote control is you could
set it up to always be on. So the way
you do this is you do /config and you go
down all the way to enable remote
control for all sessions. I suggest
turning this on that way whenever you're
running cloud code session in whatever
context you'll be able to pick it up
from your phone or from a different
browser. It's a lot easier than the T-m
tail scale term solution especially cuz
it's a lot easier to respond and approve
permissions. The only downside right now
is slash commands. They don't work that
well but I'm sure it's going to be
improved soon. Now you might want to
build recurring tasks. So I'm going to
show you the schedule task feature. So,
if you open up Claude and you go to
co-work, you have a new option here
called scheduled. So, you click into
scheduled and you see scheduled tasks.
Now, you can create a scheduled task by
filling out this form, giving a name, a
description, a prompt, tell it which
model to use, a folder to work with, and
a frequency. Now, the folder to work
with is the most important part because
we want to point it to the same exact
folder that Claude Code is looking at.
So, you can set it all up here, but a
better way of doing it, in my opinion,
is starting a new chat. So, I just
dictated here, create a schedule task
that looks at my YouTube analytics every
day at 6 a.m., analyzes it based on past
metrics, and suggests new videos and
concepts. So, you press let's go, and
co-work will start building the schedule
task. And what I like about this is it
will ask me clarifying questions, and
help build out a better schedule task
than I would have done myself by just
filling in the form. So, we can see here
it's using its create schedule task
skill. It created a better prompt than I
would have done on one shot. We're going
to press schedule. And just like that,
Claude Co-work created its own scheduled
task that will run every day at 6 a.m.
Use the MCB server that I created to
give it access to my YouTube analytics.
Then it will write the report and save
it to memory. But the difference is this
was all made from Claude in Cloud
Co-work and then it reports back to my
better claw setup, which by the way also
consolidate the memory from the day. I'm
then able to interact with it directly
from my phone from the Cloud app. It's
able to use my sub agents, my skills,
and my MCB servers also on demand here
on my computer. And again everything
gets saved to memory. So essentially now
we have two separate agents. We have the
claude co-work agent looking at
betterclaw and we have cla code always
open to betterclaw. We will interact
with cloud code from here. And then
cloud co-work will work on betterclaw
from cloud desktop. So this is just a
proof of concept. This is just what I've
been doing for the last day. I don't
know where this will go. This is just
something I put together over a few
hours of playing with these new
features. In my opinion, it's a safer,
more efficient implementation of
OpenClaw that you can run locally on
your computer with cloud code and cloud
code work without the fear of being
banned and with way less security and
efficiency concerns. So, I hope you
found this video helpful or insightful.
I actually hope that someone takes this
to the next level and makes it even
better. If you haven't done so already,
subscribe to the channel. It really
helps me grow. Thank you guys for
watching and have a great
