---
video_id: "l94A53kIUB0"
title: "Forget Ralph Loops: The New GSD Framework for Claude Code"
channel: "Eric Tech"
topic: "software-engineering"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=l94A53kIUB0"
word_count: 4950
---
If you're using claw code to building
web applications, then you got to check
out GSD, which is a open- source spec
driven development framework that
specialize in orchestrating different
sub aents here to complete the projects
follow the spec driven development
framework. Now unlike the traditional
specdriven development framework that we
did on our channel like BMA method, spec
kits, taskmaster and so many more. All
the traditional specri development
frameworks had to follow a strict rule
where everything had to be done in one
single context window. For example,
planning, research, developments,
verifications, all needs to be done in
one single context window. But that come
with a really important problem is the
context swad. Which means that the
higher token consumption in one single
context window, the lower the accuracy.
And the solution to this is using sub
aents here to basically delegate the
planning, research, developments,
verifications all in its own sub agents
where each sub agent here will have his
own fresh context to complete the task
one by one. and GST here will basically
become an orchestrator that orchestrate
those sub agents following the
specdriven developments here by guiding
the AI here to take from a rough idea
into a productionready applications step
by step which means that yes we're going
to consume more tokens but the amount of
accuracy that we're going to get here is
going to be a lot higher compared to
using everything in just one single
context so that's why in this video I'm
going to show you exactly how you can be
able to set up your GSD framework on
your claw code by showing you how you
can be able to take an idea and building
on top your existing applications or new
applications how you can be able to
shape the idea idea that you're trying
to build by using the research agents,
planner agents that it has. And once we
shape our idea, we can be able to move
on to the implementations where we have
it own executor here to execute the task
with parallel agents running at the same
time. And each agent here has its own
fresh context windows and also commits
every task that it completes and also
every time when it completes a task, it
also spin up another agent here to
verify the task against the goals that
it completes. And most importantly, once
we complete one phase of the task, I'm
going to show you exactly how we can be
able to loop through each phase that we
have like discuss, plan, execuse, and
also verify step by step, loop by loop
until we have the entire milestone
complete all autonomously without using
Ralph loop. So pretty much that's what
we're going to cover in this video. And
if you're interested, let's get into it.
All right, so before we jump in, a quick
intro for those who are new here. My
name is Eric. I have spent years as a
senior software engineer at companies
like Amazon, AWS, and Microsoft. And I
have started this YouTube channel to
share everything I have learned along
the way from AI and coding to
automations, web 3, career developments,
and more. All broken down into practical
tutorials that you can actually follow.
So, if you're ready to level up, make
sure to check out my YouTube channel and
hit that subscribe button. Now, let's
get back to the video. All right. So,
first thing first we're going to do here
is to navigate to GSD repository. Here
you can see it tells you exactly how you
can install this onto your local
machine. So, I'm just going to copy this
command right here. Navigate back to the
terminal for my current projects. And
I'm just going to type in this command
here to install this onto my local
projects. So, I'm just going to say yes,
installed this. And here you can see
we're just going to choose either we're
going to use claw code, open code, or
both. So, I'm just going to choose just
one for now for using claw code for this
demonstration. And here it says where
should you like to install this? I would
like to have this installed for globally
for all projects available here. Okay.
And then after we have this chosen here
you can see GSD includes a status line
showing the model name, current task and
also the context window usage. So should
we use the keep existing one or should
we replace that with the GSD status
line? Well, I actually have not seen the
GSD status line yet. So I'm just going
to choose number two right here. And
basically let's take a look at what the
GSD status line look like. And uh I'm
just going to open my clock session. And
right here you can see this is the
status line currently for the GSD. And
of course if you don't like that version
of the status line, you want to use my
version of it, you can also check out my
video right here, which I'll show you
exactly how you can customize your
status line to look exactly like this.
But of course, if you want to stick with
the GSD status line, you can go ahead
with that option. So what we're going to
do here is once we have our GST
installed, we simply just do GSD. You
can see that we have all the custom
commands right here inside of our claw
code terminal. All right. So once we
have GSD installed, the next thing we're
going to do here is try to initialize
our projects. Now if you're starting a
new project, you simply just going to do
GSD new projects. But if you already
have existing projects, what we're going
to do here is to run this command right
here first. And it spins up like
multiple sub agent here to analyze the
stack architectures, conventions, and
concerns. And then we can do that
command right here to know the entire
codebase and questions based on what
you're trying to add and plan to design
our application here. So in this case
I'm just going to do this command first.
Basically try to map the entire codebase
and right here you can see that it's
going to spin up four parallel codebase
mapwork agents. Basically try to map the
entire codebase here. Try to understand
the entire tech stack the architecture
conventions concerns everything. Try to
analyze everything for application here.
So in this case, let's wait for a bit
until it fully completes this for the
mapper for the agents running in
parallel. All right. So now you can see
the mapper here has complete to analyze
the entire codebase. And now what we can
do here is I'm just going to reset my
clock session because the current
context window is kind of like halfway,
right? So I'm just going to uh terminate
this and be able to clear terminal uh
rerun the clock session. So we're
starting from zero now after we have
mapped the entire thing. But don't worry
because the map were already saved in a
state. So you can actually be able to
see planning folder. You can see that
inside of that planning there's a
codebase. So we'll basically summarize
everything that we have in our
applications like the architectures the
concerns right the conventions the
integrations everything all and store
inside of this folder right here so that
we're not losing track of our current
state of our mapping. All right so once
we've done the mapping for the entire
codebase now it's time to initialize our
project. What's going to happen here is
that it will basically ask me some
serious questions on understanding
what's my idea, what are some new
features we're going to add and then
it's going to spit up multiple parallel
sub aent here to investigate the domain
that we're trying to build and also it
will help you to extract some
requirements as well as the road map on
exactly what are the phases that we need
to basically make this happen. Right? So
that's what I'm going to do here is I'm
just going to copy this command and
paste it here and then it's basically
going to try to initialize our current
project here. So right here you can see
this is a brown fear project which has
existing codebase and with a codebase
map already in place get repository
exists and also no planning for the
project MD yet. So it's going to ask me
a question. So I see that you have
existing projects with a codebase
already mapped looking at a cloud MD
file. I can see that the business
context and then it's going to ask me
what do you want me to build next? Okay.
So because I already have a feature in
mind for what we're going to build which
is building a dashboard for the admin
system where this is basically a very
short MD file that I drafted using AI
here to basically build a minimum admin
panel which is a new tab on the existing
dashboard sidebar which provides
essential tools for managing users and
handling support issues at launch and
basically you can see that there's some
features that I was asking for and the
MVP features the UX mockups frameworks
and all those kind of things right very
detailed you can see I highly recommend
you guys to basically use AI here with
cloud to basically look through the
applications try to and draft a plan on
exactly what you're trying to build
right at least the UIX changes or at
least you know what are the feature we
want to include so that we can have a
clear plan on exactly what we're going
to have clock here to implement now
obviously I can take this plan and
basically have clock to implement this
but I want to actually have GSD here to
take over and try to do some
investigation or research right by
spinning up multiple sub agent here to
research on our behalf and breaking this
big task right here into smaller task
that's easier to implement. So in this
case I am just going to open my terminal
and basically going to say that this is
what we actually going to build. So I'm
just going to reference this file right
here and here I'm just going to say I'm
planning on building this nest and then
I'm just going to enter this nest and
I'm just going to enter this and let GSD
here to basically help us do the
planning. So here you can see it's going
to read through this backlog item that
we're looking to implement for this
application. And here you can see that
it's going to trigger the user question
here to ask me some serious questions
here to confirm on the exact spec. So it
says that this specs includes all four
features, right? Like user list,
credits, tiers, impersonations, building
them all together or prioritize a subset
for first iterations. So you can see
here that it started breaking this big
giant four feature right into smaller
features at first. So I'm just going to
say well let's start with you know some
simpler feature like the user list the
credits right so I'm just going to say
yes let's do that and how do you want to
verify the admin panel is working
correctly well for now because this
project is really new I mostly do manual
testing but you can see that it's asking
for test coverage like we can do
integration testing like okay we're
adding API route test for the endpoints
we're also testing the full coverage
which includes like unit test
integration test and end to end testing
well I'm just going to focus on the
manual testing only first and later we
can be able to increase the test
coverage. So, I'm just going to say yes
for the manual testing for now and
submit the answer right here. And let's
just take a look at what GSD here is
going to do. And right here, you can see
it's going to continue prompting with my
question here. So, when do you need the
admin panel live? Because in our current
application, I have a business analyst
doc or for the timeline planning
mentioning about January 30th for the
actual launch date. So, you can see that
it's asking me for the first question
here, needed before the V2 launch, which
is January 30th. So I'm just going to
say yes, I will definitely have wanted
to have this before January 30th. And
then it's asking if we wanted to proceed
with the project, the MD file. Well, I
want to still keep explore and ask more
questions. All right, so one of the
question that I asked is basically try
to find out what are some gaps that
we're missing for our spec and what
we're going to do, right? So you can see
that I spin a multiple sub agent here to
do the research for security, UX and
also the best practice as well as
technical implementation gaps that we
might be missing for our current spec.
So right here you can see that this is
the entire table which basically covers
the entire gaps like for example no
admin middleware protections right
cookie missings and also rate limiting
is in memory and also the uh admin
actions for the user on delete and also
is admin function is broken for other
users. So we want to make sure that we
address those gaps for the current
projects that we're going to implement.
And right here you can see that these
are the list of fix that is suggesting
us to be be able to fix it. Right? So
what we can do here is that we can be
able to you know look over this and take
a look to see if those gaps make sense
right and once it does then we can be
able to go ahead and be able to create
our you know project.md file and go
ahead with the implementation. So you
can see that it's going to prompt me
with some questions the research found
the critical security gaps. How do you
want me to handle this? Well, I'm just
going to say fix the critical ones. Uh,
which is my recommendation. And I'm just
going to enter this and have clock here
to basically try to make sure our plan,
our spec doesn't miss anything before we
move on to the project.md file. So once
everything's good, we can now be able to
create our project MD file. I'm just
going to say yes. Let's move to the
project.md file. And right here you can
see clock code is going to create the
project MD file for this entire project.
So in this case, let's wait for a bit
until it fully completes this. Before we
jump into the next section, I want to
give a quick shout out to today's
sponsor, Testbrite. Testrite is an AI
agent built specifically for software
testing. And with the release of the
Testrite MCP, you can now use it
directly inside your coding IDE. So,
cursor, wind surf, cloud code, and more.
Setup is super simple. You just add the
configuration in your MCP settings and
you're good to go. What I really like
about Testbrite is that it doesn't
blindly run tests. It first reads
through your entire codebase,
understands the documentation, and
validates the results your AI agents
produce. It automatically generates a
test plan from your PRD, creates test
cases, ensures proper test coverage, and
all of that without any manual input.
From there, it executes the test and
sends detailed reports back to you,
clearly showing what's broken and what
needs attention. Most coding agents
today average around 42% accuracy. But
with Testbrite MCP, teams have been able
to boost feature delivery accuracy up to
93%. So if you're interested in checking
it out, you can watch the video I made
on it or click the link in the
description below for more details. Back
to the video. All right, so once we done
our project go and also creating our
project MD file, then here you can see
we're prompted with the mode. So we can
either use the yolo mode here which will
basically auto approve and just execute,
right? Or we can also make it more
interactive. So every time when it
finish a step, we can be able to confirm
the changes that it made and be able to
move on. So I'm just going to go with
yolo mode here and try to go hands off
and try to have it to complete
everything. And here I'm just going to
click on enter here for yolo mode. And
here's asking me for the depth. So how
throw for the planning to be either we
can do a quick one for shipping fast
like three to five phases or we have one
to three plans each or we can go with
the more standard way which is more
balanced scope which we have five to
eight phases and each phase might have
like three to five plans each. Well, in
this case, I'm just going to go with the
standard one, which is more balanced for
the scope. We're not looking to ship
something really fast. We're looking for
something that's more balanced for the
scope. In this case, I'm just going to
click on number two. All right. So, now
I'm just going to submit the answer
here. All right. So, and as results
here, you can see that we're prompted
with the execution. So, either we want
to run the plan in parallel, which
basically means that independent plans
run simultaneously, or we can be able to
execute one after the other. Now my
recommendation is if the time is not an
issue then I will highly recommend you
do it with the sequential because we
will try to tackle with one plan one
after the other rather than in parallel
because let's say in parallel you run
out of credits you might be stuck with
both task incompleted. While if you have
sequential, you're going to have some
task completed and maybe after you run
out of credits, well, at least you can
be able to, you know, wait or be able to
come back tomorrow once you have your
credits and be able to continue execute
the task one after the other, right? Or
at least your project is not half
completed for all the plans, right? So,
I'm just going to go with sequential
here because I wanted to take it one
step at a time. And then in terms of git
tracking, are we going to commit the
planning doc to git? And yes, I would
definitely want to keep track of our
plenty docs to the git. So, I'm going to
say yes to that as well and click on
submit. All right. All right. So then it
has asked me some additional questions
on do we want to do research before
planning. I also said yes to this. And
verify plans will achieve your goal
before uh before the execution and I
also said yes to that. And then in terms
of the verifier so verify the work
satisfies the requirements after each
phase and I will say yes to that as
well. And also the model preference. So
I'm just going to say most quality ones.
So opus for research and road map for
higher cost and deeper analysis. All
right. So what happened here is that you
can see it has put all those
configurations inside of the config.json
and this is the file for the
configurations and we can literally just
modify the configuration.json file for
anything that we want to change in
future. Now follow that without making
this video too long. GSD here move us to
the research. Basically you can see GSD
here spin up the research synthesizer
here which will basically first spin up
multiple sub agents try to do some
research and once the full researcher
here has uh complete then it will
basically synthesize all the research
that has done and try to see how we can
be able to create our own research
report based on the project that we're
trying to develop and once we agree with
those things then GSD here has moving on
to creating the road map on exactly what
we're going to do for this entire
project step by step all right so now
you can see it has generated the entire
road map which has five phase phases and
36 requirements are mapped for all the
v1 requirements are covered. So for
example the database the schema the back
end and then trying to cover the user
experience here. So it's asking does
this romax structure looks looks good to
you and you can be able to look into it
and to see if there's anything missing
and if everything looks good I'm just
going to say approve and start to make
the change. All right so once our
project is initialized here you can see
this is the entire MVP for the artifacts
that it creates. So it's all inside of
the planning folder, right? So all five
phases and all 36 requirements are ready
to build. So next thing up, if we're
okay with it, we're going to start with
phase one, start with phase one one by
one. And then once you create a plan for
phase one, here you can see also have
spend up multiple sub agent here to
create the plan for phase two, phase
three all in one, right? So you can have
all the sub aent here to clear create a
new plan or create a plan for each phase
that we have. Right? Once you create a
phase, what you can do now is basically
move on to implementation. Now like we
mentioned right we wanted to run this
sequentially with a fresh context and I
don't want it to have it to finish one
plan and ask me to verify right I wanted
to have it to complete everything after
that then we can be able to verify
everything right I don't want it to
verify at each phase I want to verify
after all phases are completed then what
you can do here is you can communicate
this to claude and say that okay I want
to execute the GSD phases sequentially
with a fresh context and here is
basically what it's going to do is
execute each phase one by one with a
fresh session context for each line and
basically you can see that what's going
to happen is it's going to execute a
fresh sub agents using the GST executor
and then each agent here gets 200k clean
context so that doesn't mix with the
previous plan that the other sub aent
completes and then what's going to
happen here is that it's going to
execute the entire uh 13 plans all
autonomously using GSD so we have our
database schema our backend our UI
credit management and also the auto log
viewer okay so everything all in one
execute one by one and here I'm just
going clear the context and bypass
permissions and execute this one by one.
All right, so now you can see that it's
going to execute the phase one here of
the admin dashboard for implementation
and let's wait for a bit until
everything is fully implemented. All
right, so after we have all the phases
are implemented using GSD, here is what
the result look like. So right here you
can see I'm in the admin tab and here
we're at the users management tab. So
here we can be able to view all the
users that we have in our current
platforms. I can be able to search a
user. For example, if I were to type in
test and here you can see we have the
first result showing right here. And
let's say if I were to remove this and
here you can see it's going to show the
entire list again. I can also filter by
the tiers. So what are the people that
are using the free tiers? I can be able
to see that and I can be able to see the
credit usage when they last signed up
and also be able to adjust the credits.
Right? So I can be able to view the
account details which you can see here
or I can also be able to adjust the
credits which you can see here. Okay. I
can be able to adjust the advance, be
able to set the credit uh be able to set
the custom credit limits and also the
corrected usage as well as give it a
reason. And here in the auto log, we can
actually keep track of that. So for
example, let's say if I were to select
all tiers and currently I'm logged in as
this user right here set as admin. And
let's say if I were to click on this and
try to adjust the credits. Let's say if
I'm going to increase this credit amount
for example into 50 credits, right? So
from what we have now which is 510
credits all the way to 560 credits and
all we have to do here below is just
going to add a reason for example I'm
just going to add test and basically
that's the reason here and I'm just
going to apply the adjustment and what's
happened here you can see we have a
notification showing that we have
increased it from 510 to 560 and also
trigger the rerender for that component
and you can see on the table here we
also reflect that as well from 510 to
also 560 which is what we have now.
Okay, so we can verify that the feature
here is fully working. We can also be
able to look at the admin analytics part
where we can be able to see the
analytics for all the things that we
have your applications. You can see when
it was last updated as well as all the
stats that we have our applications like
total users, pay users as well as
different tiers, different credit usage
as well as the most active users. So
also we can be able to see the auto logs
which basically means that all the
events all the actions that we took for
making adjustments on the user credits.
We can actually see this right here
inside of the autolog. For example,
adjust credits, sync the credits and
also who are the target users and what
are the details that we did. We can be
able to see that inside of the autolog
trial. So pretty much that's how you can
be able to use GSD here to follow the
specific development here to complete a
feature. Now, if you do found out in
this video, please make sure to like
this video. And of course, if you're
curious about how I'd be able to cause
this component here to rerender after
the credit is applied without refreshing
the page, well, the short answer is that
I was using Zusten, which is a state
management here to basically centralize
the state of our entire application. So
that whenever a one part of the
component updates, then it will trigger
the updates as well in this current
state. So, if you're curious about how
you can be able to add that state
management in your current applications,
well, highly recommend you check out
this 7-hour course which I made on how
you can be able to build a complete uh
productionready NestJS applications that
is scalable and step by step. So, with
that being said, if you found value in
this video, please make sure to like
this video, consider subscribe because
in the future I will share all the
lessons and techniques that you can use
to basically build a productionready
application by using AI here to code to
build a production ready applications
just like this. So, with that being
said, I'll see you in the next
