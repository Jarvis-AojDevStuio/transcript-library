---
video_id: "yANt4NysZw4"
title: "Claude Code Creator Reveals Anthropic MASTERCLASS"
channel: "George Ai"
topic: "ai-llms"
published_date: "2026-02-02"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=yANt4NysZw4"
duration: 616
word_count: 1678
---
the creator of Cloud Code just released
a masterclass lesson on the best ways
how to use cloud code and I believe that
just implementing a few of these tips
can 10x the speed and quality of your
cloud code. So on his Twitter, Boris
just posted a massive thread detailing
everything that you need to implement
into your workflow if we want cloud code
to actually work way better. So the
number one tip here is to do more in
peril. What does that mean? It's
basically saying that you need to do
multiple things at the same time. If
you're only using cloud code in one
instance, you're basically losing
efficiency. So, how do you fix this?
Spin up from three to five get work
trees at once. Each running its own quad
session in parallel. It's the single
biggest productivity unlock and a top
tip from the team. Personally, I use
multiple git checkouts, but most of the
cloud code team prefers work trees. It's
the reason that Morris code build native
support for them into the cloud desktop
app. So, some people also name their
work trees and set up shell aliases so
they can hoop between them in one
keystroke. Others have a dedicated
analysis work tree that's only for
reading logs and running big query. The
second tip it says start every complex
task in plan mode. Pour your energy into
plan so claw can oneshot the
implementation. So one person has one
claude and write the plan. Then they
spin up a second claude to review it as
a staff engineer. Another says that the
moment something goes sideways they
switch back to plan mode and replan.
Don't keep pushing. They also explicitly
tell claude to enter plan mode for
verification steps not just for the
build. So what is happening here
actually? So you need to think of as
cloud code not as just a single agent or
like a single worker working on your
code. What you actually need to do is
think of it as a massive dev team. And
the entire dev team needs to work
together to create your app, your
website, whatever you actually want for
yourself to create it. It can do it. But
don't but don't think as it's just a
straightforward thing. Think of it as a
massive dev team working on your
project. Just have somebody who's
actually working on the code. Then you
make a cloud instance and actually just
going to do the design. So if you make
different cloud instances, then what's
going to happen is that they're going to
have their own job like an entire person
just having one single job. And then
them interacting with each other is
going to make the synergy to make the
best code possible. and optimize
everything so it just looks and feels
perfect. Number three here, invest into
cloud MD after every correction and with
update your claw.md so you don't make
that mistake again. So Claude is eely
good at writing rules for itself.
Ruthlessly edit your claw.md over time.
Keep iterating until Claude's mistake
rate measurably drops. One engineer
tells Claude to maintain a note
directory for every task project update
it after every PR. Then they point
claude.m MD at it. Very very massive. A
good tip here. Number four, create your
own skills and commit them to Git. Reuse
across every project. So tips from the
team. If you do something more than once
a day, turn it into a skill or a
command. Build a tech slashcomand and
run it at the end of every session to
find and kill duplicate code. This is
for optimizing your code again. Cuz if
you have duplicate code, there's no
reason for it to be there. So set up a
slash command that syncs seven days of
Slack, G Drive, Asana, and GitHub into
one context dump. build analytics
engineer style agents that write DBT
models, review code and test change in
dev. You can actually check out this
whole post for yourself. So if you are
interested for more info number five
says cloud fixes most bugs by itself.
Here's how to do it. So this is if you
want to fix all the code bugs you're
having with cloud, you need to follow
the step here. So it says enable the
Slack MCP. Then paste the Slack bug
thread into claude and just say fix zero
context switching required or just say
go fix the failing CL test. Don't
micromanage how point claude at docker
locks to troubleshoot distributed
systems. It's surprisingly capable at
this. This is very very interesting.
This is like a simple way to actually
fix all the bugs you have in the code.
So number six here is level up your
prompting. Challenge Claude. Say, "Grill
me on these changes and don't make a PR
until I pass your test." So make Claude
be your reviewer. Or say, "Prove to me
this works and have Claude different
behavior between Maine and your future
branch." Number two here after a
mediocre fix say knowing everything you
know now scrap this and implement the
elegant solution. So when you do see the
claw and make something mediocre you
just tell it to scrap the whole thing
make it again. Use the knowledge from
this failure to make something better.
And number three here write detailed
spaces write detailed specs and reduce
ambiguity before handing off work. The
more specific you are the better the
output. So you need to specify what you
truly want. To help that, you can use
any other chatbot and just ask it to
make things more specific and just copy
that into cloud and that's it. You can
even do that in cloud for yourself if
you want. So number seven here, terminal
and environment setup. So number seven,
terminal and environment setup. The team
loves Ghosty. So multiple people like it
synchronized rendering, 24-bit color,
and proper uni-ode support for easier
cloud juggling. Use status line to
customize your status bar to always show
context usage and current git branch.
Many of us also color code and name our
terminal tabs. Sometimes using teamups
one tab per task work tree. Use voice
deduction. You speak three times faster
than you type and your prompts get way
more detailed as a result. So if you're
using Claude every single day instead of
just typing everything, you want to
speak it for two reasons. If you speak
it, you're going to speak it way way way
way faster. You can give way more
context and claude will understand you
better. The second thing is claw wants
to learn about you. It wants to learn
about you as a person. And when it does
learn about you more and more, they're
already going to know what you want from
them, what you need from them, and how
you would do something. And it's
incredible. It's absolutely incredible.
So number eight, use sub aents. So
append use sub aents to any requests
where you want claw to throw more
compute at the problem. If you want to
have more computing power added to a
specific task, then you use sub aent and
that's it. It's very simple. Offload
individual tasks to sub aents to keep
your main agents context window clean
and focused. And the third one here, it
says, "Route permissions requests to
Opus 4.5 via a hook. Let it scan for
attacks and auto approve the save ones."
You can check out the code here and the
hooks for yourself. Number nine. So use
cloud for use cloud for data and
analytics. So ask cloud code to use the
BQ CLI to pull and analyze metrics on
the fly. We have a big query skill
checked into the codebase and everyone
on the team use it for analytics and
queries directly in cloud code.
Personally, I haven't written a line of
SQL in six plus months. You don't need
SQL knowledge anymore because Claude
knows everything. This works for any
database that has a CLI or NCP or API.
Amazing. Absolutely amazing. Number 10
here, learning with Claude. A few tips
from the team to use cloud code for
learning. So enable the explanatory or
learning output style in /config to have
Claude explain the why behind its
changes. That's very interesting. This
is very cool. Have Claude generate a
visual HTML presentation explaining
unfamiliar code. It makes surprisingly
good slides. Okay, so if you want to
visualize the problems and the changes,
you can actually just make an HTML and
just check it out for yourself. Ask Claw
to draw a diagram of new protocols and
code bases to help you understand them.
This is awesome. Build a space
repetition learning skill. You explain
your understanding. Claude asks
follow-ups to fill gaps and stores the
results. You can basically make code
with Claude and learn about the code at
the same time. So the more you learn,
the more detailed questions or tasks you
can give to Claude and then Claude can
ask you back about those questions and
about your task and then you can learn
to optimize even more. So it's a loop of
optimization where you get better,
Claude gets better, and you make better
stuff. That's the insane part. You don't
need anybody anymore. [laughter] You
just need to talk to Claude all the time
and just create stuff. As you improve
your skill of using Claude, then Claude
will give you better outputs. It's
pretty simple and it can create
incredible stuff. So, hope everybody you
did enjoy this video. Don't forget to
smash that like button and subscribe.
