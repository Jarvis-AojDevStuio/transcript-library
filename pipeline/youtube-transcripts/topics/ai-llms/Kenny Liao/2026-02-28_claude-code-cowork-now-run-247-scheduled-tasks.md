---
video_id: "I1NdVZ6l5CQ"
title: "Claude Code & Cowork Now Run 24/7 — Scheduled Tasks"
channel: "Kenny Liao"
topic: "ai-llms"
published_date: "2026-02-28"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=I1NdVZ6l5CQ"
duration: 1107
word_count: 3247
---
A lot of us have a dream of fully
autonomous agents that do things for us
while we sleep or are out running
errands. And I think it's why projects
like Open Claw have so much appeal.
Anthropic just released scheduled tasks
in Claude Co-work. And I think it takes
us one step closer to full autonomy with
AI agents. Now, I typically like to stay
off of the AI hype train and focus more
on genuine value that I think will
continue being important years from now.
Things like agent skills, for example.
But I really do think that scheduled
tasks is one of those features that is
really going to change how we work with
AI agents. If you don't really use
co-work and you're more of a cloud code
user like I am, scheduled tasks aren't
available in cloud code. I'm not sure if
they'll become available sometime in the
future, but anyway, I'm going to share
with you a plugin that I built that is
going to give you all of the same
capabilities for scheduling tasks in
Cloud Code. And it's something I've been
using to automate a lot of really useful
workflows, which I'm excited to share
with you right now. So, let me first
share with you a few demos of what's
possible with scheduled tasks, and then
I'll show you how to use it in Cloud
Co-work and also in Cloud Code using
this plugin. Probably the most
straightforward use case of this is
having some kind of daily summary or
brief. So I have a few here and these
are ultimately just prompts that Claude
will run on the schedule that you give
it. We can take a look at the daily
business brief. You can see what the
prompt is. I want it to check my Google
calendar for today's meetings and
summarize my schedule for both today and
tomorrow so I can see what's coming up
ahead. Check all my unread emails and
categorize them. and then summarize them
by priority and then check to see if
there were any sentry errors overnight
in my production server. So these are
just specific things I wanted to already
have ready waiting for me when I start
my day in the morning. And you can see
on the left I have some scheduled tasks
that have already ran these last few
days. So if I click on for example the
daily news brief for this morning, I can
click on this report that was generated
and this is for my daily AI news brief.
So I'm going to get a report of all the
trending AI news. And this is really
nice to not have to even open cloud code
or trigger a slash command or a skill,
but just have this be ready for me when
I open up my computer and just be able
to read what is the top news right now.
Cloud Sonnet 5 spotted in the wild. I
hope so. But yeah, having daily briefs
or reports are one really useful use
case and it's super easy to set them up.
Here's another example of a weekly
scheduled task that Cloud Code set up
using the plug-in I'm going to share
with you where every week on Monday
morning, this report is generated and it
pulls all of the transactions data from
my Stripe account. So, it's able to get
a pulse on my business, run an analysis,
and again, this is just going to be
waiting for me. Another use case I'm
really excited about which I just
started this morning is I have an idea
bank for notes that I want to publish to
Substack which are just kind of like
tweets on X and I have a scheduled task
that runs every morning using specific
skills for cloud code to write in my
voice and following best practices for
writing Substack notes. It'll use those
skills and it'll write three notes from
the idea bank that I have and then put
them into this staging area for me. This
runs now automatically every morning so
that I always have notes ready to be
posted. So I can just come over here and
copy this text directly and then go over
to Substack and it's ready to post just
like that. But you could even automate
this as part of the scheduled task which
I have before where because I have
playright MCP and cloud is able to
control the browser, it can actually go
as far as scheduling three separate
tasks to post each individual note at
different times in the day. So you could
automate that entire flow. Right now,
I'm keeping it with the staging area
because I actually want to review them
and uh just make any tweaks that I want
before actually posting them. But you
can see how incredibly powerful this is.
Finally, one other use case which I'm
also really excited about is the ability
to just brain dump into a specific file
throughout the day. So, I'll usually
record things in here with voice like
something I learned or a fact I want to
share with people on Substack or YouTube
or maybe I have an idea for a YouTube
video, etc. I'll just voice record it
into this brain dump and this file will
grow throughout the day. And I have a
scheduled task that runs every night,
which I'll show you here. And you can
see the prompt for this workflow. But
essentially, it's going to read the
brain dump and then it's going to parse
all of the different line items in the
brain dump and then organize them into
the appropriate destination files. And
that includes the context system for my
personal assistant. So, if I head over
to my user level.cloud cloud folder.
Here you can see I have a core context
system and I have a bunch of files in
here like identity, preferences,
projects, relationships, even personal
stuff. And the scheduled task will
organize all of that brain dump into
these core context files. So it keeps my
personal assistant up to date
consistently and I don't have to worry
about this anymore. I don't have to plug
it in using hooks every time I talk to
Claude. Now it just runs on an automated
schedule without me ever noticing it in
the background. So those are actual use
cases that I'm using it for and I feel
like I'm barely scratching the surface.
Honestly, I'm excited to automate so
much more with scheduled tasks. But here
are some examples of the best use cases
that Enthropic actually recommends. So
like we covered earlier, you could do
daily briefings or weekly reports. You
could also do recurring research. So if
you need to do competitor research, for
example, I really like this idea of file
organization. So if you have a folder
where you just tend to dump files and
you want something to always keep it
organized, then you can do that with
scheduled tasks. And then if you are
working with a team, you can send team
updates either through email or Slack or
Discord. So hopefully that gives you a
good idea of all the things you can do
with this new feature. Now I'm going to
show you how to do it first in Cloud
Co-work and then in Cloud Code using the
plugin. If you're enjoying this content,
consider subscribing to my newsletter on
Substack where I share actionable AI
tips and techniques every week as well
as more in-depth tutorials.
To get started, you're going to want to
update your Claude desktop app. And I'm
on Mac. I'm currently on version
1.1.4498.
And scheduled tasks are available to me.
I read online someone complaining that
it wasn't yet available on Windows. I
can't validate if that's true, but if
it's not available for you on Windows,
then you can definitely check out my
plugin after this, which should work in
cloud code across all platforms.
Once your app is updated, you're going
to see a new menu item on the sidebar
here. So, you can open the sidebar on
the left and then you'll see the
scheduled menu. So when you click on
that, you will probably not have any
tasks here, but any scheduled tasks will
show up here. You can also invoke it
using a slash command in cloud co-work,
which is slash schedule. And here's the
caveat about running scheduled tasks in
co-work. Both your computer and this app
have to be running for the scheduled
task to actually succeed. So if your
computer is off then the task won't run
but also if your computer is on and you
don't have this claude app open then the
task also won't run. Claude co-work will
attempt to run those tasks the next time
you open up the app. So it'll have that
backlog of missed tasks and it'll try to
run them the next time you open the app.
But again that's not guaranteed.
So that is one drawback of scheduled
tasks in co-work. If you use the plugin
in cloud code, you won't have the
problem of having to have the app open
because it's ran natively on your
computer. So it doesn't depend on the
cloud app itself. But anyway, to create
a new task, you can just click on this
button. And essentially what a task is
is just a prompt. And there's a lot of
ways you can construct this prompt. If
we look at this example of a daily
briefing, the prompt is check my Google
calendar for today's meetings and
summarize my unread emails. Highlight
anything urgent. So you can give just a
straight prompt like that. But you can
also invoke specific slashcomands or
skills or specify certain MCP servers.
And that's because this is built into
cloud co-work. It's using cloud code
under the hood. So, however you have
your cloud code configured, it's going
to be able to use all of those skills
and MCP servers that you have. So, here
as a simple example, I'm creating an
email brief where I want Claude to
organize all of my unread emails for the
day and give me a highle summary with
emails ranked by priority. The nice
thing is you can also choose the model
that you want to run it on. So for a
task like this, you probably don't need
Opus and you can save some usage by
using Sonnet 4.6. You can also select
the folder that you want to work in
since this is using cloud co-work which
spins up a VM on your local system based
on your working directory. And then at
the very bottom is where you're going to
specify the frequency. We can set it up
hourly, daily, weekday, or weekly. You
can also set it to manual, which
essentially just becomes a slash
command. For example, for this one, I
can set it to daily, and then choose the
time that I want to run it at, which is
9:00 a.m. You can pretty much set any
kind of schedule that you want here.
Once you're done, you can hit save, and
then you'll see your new scheduled task
here, and you can click into it if later
on you want to read what the actual
instructions were. You can edit it here
and adjust the prompt. And you can also
run it now. And I recommend doing this
for all of your new scheduled tasks to
test them and just make sure that it
actually works so that it's ready to go
when you want it to run on an automated
schedule. So I can click run now and we
can view it here. You'll notice that it
gets added to this new section for
scheduled. So now you can see this task
is kicking off and because I'm connected
to my MCP servers in cloud code, it's
able to access all of my emails. Notice
at the bottom also that we have sonnet
4.6 just like we set up inside of the
task. So this is just going to be your
normal claude co-work now running the
prompt that we gave it. Here we can see
my email brief with the emails organized
by priority and a highle overview.
We have some feedback for one of my
products and then new subscriber to the
newsletter and then some lower priority
stuff. So, if you're someone that gets a
lot of emails for your business, you can
imagine how incredibly useful this would
be to have this brief every single
morning and all of the urgent matters
surface to you right away with this
highle summary. Now, if you want the
ability to schedule tasks just like in
Cloud Co-work, but do it in Cloud Code,
which is my preferred way, then you can
head over to the AI Launchpad
Marketplace. It's a free marketplace
that I have on GitHub, and you can
install the plugin I'm about to show
you. So, this plug-in is going to have
several scripts for actually creating
the scheduled tasks, and it's also going
to be packaged into this skill to make
it really easy for cloud code to know
how to create these scheduled tasks. And
it's basically going to be using the
built-in cron tools in your operating
system. Because it's a skill, you can
just tell Claude that you want to
schedule a task, and it should know that
it has this newuler that it can use. So,
for example,
create a new scheduled task that runs
every night at 10 p.m. that looks at my
project and finds any unused files or
trash files, deprecated files, etc. that
can be cleaned up to keep the project
concise or any files that are out of
place and should be reorganized and then
creates a report and saves it to
docs/plans.
No action should be taken. This is just
to create the report on the suggested
cleanup for the project. It's
automatically going to recognize that it
needs to use this plugin to create the
scheduled task. Cloud is actually going
to run it by you and then just make sure
that everything looks correct before
creating the scheduled task. It checked
to make sure that this folder actually
exists and then it sees that there are
some existing tasks. So, it wants to add
this new one which is going to be
nightly project cleanup report every day
10 p.m. Yeah, that's right. recurring
frequency and there's a timeout. So
these things are kind of for safety so
that it's not just running forever and
then it can actually give it specific
permissions only the needed permissions
to keep the actions more safe rather
than just giving it for example bypass
all permissions. And it can also specify
if you have outputs for the scheduled
task. For example, if you're going to
generate a report like we are in this
case, you can specify the output
directory here. So it's telling me that
the prompt is going to have Claude scan
the full project, compare it against
claude.md for structure conventions,
identify unused files, etc., and then
write a report to the docs plans. And
I'll just say yes. So you can see my
task got created and I got this popup
that a bash background activity was
started. So that's normal because it is
using bash to create these background
tasks. There's also going to be a
desktop notification in the same way
when the task gets completed. So you'll
actually be notified in the morning or
whenever your task is scheduled and
you'll know that it successfully ran.
And once you install the plugin, you can
run it from any project, which means
that in any project, you can go to
yourcloud folder. And within that
projectscloud
folder, you're going to have this new
folder created called scheduler. And in
here is where you're going to have all
of the files for scheduled tasks. So
you're going to have a registry JSON,
which is a single JSON file that tracks
all of your tasks. This is for my daily
AI news brief. And here you can see the
prompt for this. You can also see what
the schedule is here, the working
directory, the output directory, etc.
For the nightly brain dump, we have
these specific tools that we're
allowing.
Finally, here at the bottom, we have our
new nightly project cleanup report. So
you can always come in here and see what
tasks you have or you can just ask
Claude, which is typically what I do,
what are our active tasks, and it'll
summarize basically this registry JSON
for you. And then in this folder, you're
also going to have three other
directories. One is logs, which is just
going to have a log for every single job
that's ran. If you ever want to see what
actually happened or if there was an
error or anything, then you can click
into one of these logs and you'll see
everything that was ran. You also have
results. So if you don't specify a
output directory for running something,
then the output from any job will just
default to this results folder and this
will be organized by day. So you don't
need to specify an output directory
unless you want these things being saved
to a specific place in which case you
can just tell Claude in that initial
prompt. Finally, you have this wrappers
folder which is the actual script that
Claude generates to run this scheduled
task. And this isn't super important,
but if you wanted to look at what it
actually generates underneath the hood,
this is basically it. And here you can
see for the daily Substack note, this is
the prompt that we're passing to Claude.
And it's basically running Claude in
bash with this input prompt.
If you made it this far, I want to thank
you so much for watching this video. I
hope you got a lot out of it. And if you
did, please hit the like and subscribe
for more content like this. And if you
are interested in moving towards more
autonomous workflows, then check out
these two videos on your screen for
resolving linear issues end to end and
also working with agent teams to tackle
bigger problems. Thanks again so much
for watching and I'll see you in the
next one.
&gt;&gt; [music]
