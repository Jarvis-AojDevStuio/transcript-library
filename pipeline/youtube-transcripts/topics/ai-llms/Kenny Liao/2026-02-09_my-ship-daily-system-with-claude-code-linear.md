---
video_id: "jsI18Htgf8k"
title: "My 'Ship Daily' System with Claude Code & Linear"
channel: "Kenny Liao"
topic: "ai-llms"
published_date: "2026-02-09"
ingested_date: "2026-02-10"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=jsI18Htgf8k"
duration: 1317
word_count: 3466
---
Today I'm going to share with you my
cloud code plus linear system that is
saving me hours every single day and
helping me ship faster. This is a graph
of my GitHub contributions over the last
year and you can clearly see that in the
last couple of months over here on the
right. I have been shipping a lot more.
Now some of this activity is for
projects that I use to teach on this
channel and some is even for open-
source tools that I've shared with you
all. But the majority of these
contributions are actually for a product
that I have in production for which I've
been fixing more bugs, adding new
features, and implementing customer
requests. I want to be clear that
shipping faster isn't the real end goal
here. In my case, it's that I have to
walk clawed code through the same
process over and over to implement a new
feature or bug fix, and that takes me
hours every single day. So, what
actually matters to me is freeing up
more of my time by not having to babysit
Cloud Code through this whole process
and instead using that time to work on
creating more content on YouTube, for
example. Let me walk you through my
workflow, which is helping me do just
that. Now, I like using linear for
product management, and I generally
prefer to have AI meet me where I'm at
rather than trying to invent a new
process or workflow in order to use AI.
I think this greatly reduces the
friction to get started as well as the
time it takes to see results. So, this
is what my typical process looks like
for resolving a linear issue. Typically,
it's going to start with planning with
cloud code where we're going to have
some back and forth fleshing out the
idea and once everything is well defined
and we've covered for example all of the
architecture decisions, the design
decisions, any edge cases, then I'll go
ahead and accept the plan and let Claude
implement it. Once Cloud Code is done
with the implementation, then I'll tell
Claude to go ahead commit, push, and
then open a PR on GitHub. Once the PR is
open, I'll use a slash command for
executing a PR review. And typically
I'll do that by opening a new cloud code
to save the context window for my main
agent or I'll just tell the main agent
to spin up a sub agent to execute the
slash command and run the PR review.
Once the review is complete, I'll again
spin up either a new cloud code session
or tell Claude to use a sub agent to
address all of the issues that were
brought up in the PR review. And then
once everything is fixed, I'll tell
Claude to commit, push, and add a
comment to the PR summarizing all of the
issues that were addressed on GitHub.
That is again going to trigger another
review. This time it is a re-review just
to validate that all of the fixes were
implemented correctly and that no new
issues arose. But if there are more
issues that are brought up in this
re-review process, then we're just going
to come back to this step where again
we're going to spin up another sub agent
to fix all of the remaining issues and
then go through the commit and push
process. But if everything looks good in
that re-review and everything was
addressed, then the PR is basically
ready for merging and release into
production. And I'll tell Claude to go
ahead and update the linear issue just
to add a comment on any findings or
learnings that are important for
posterity. So things that we want to
record that we'll be able to reference
later on. So this is the process for
resolving a linear issue completely. And
ideally, I want claude code to be able
to resolve linear issues following this
entire process end to end without
requiring me at any of these steps. And
the thing is besides this planning step
up here, everything else in this process
is executed in the exact same way and
order every single time. So, it's
perfect for automation. But the one
thing I never recommend outsourcing to
AI is the plan step, which is often
going to require you making certain
strategic or creative decisions.
Decisions that likely have a direct
impact on the customer experience for my
app and the problem I'm solving for my
customers. And I think this is really
the key to leveraging AI as a multiplier
for your output without losing the
actual value that you create. No one
knows your business, your domain, your
product vision, your problem better than
you, including any AI, right? No matter
how much context you give AI, it will
never have as much context as what's in
your brain. So what it's good for is
researching, automating a process,
compressing information, and giving you
different perspectives. And those are
the things that I would focus on
outsourcing to AI. Very quickly before
we dive in, all of the prompts that I
share here will be available in my new
Substack newsletter called the AI
Launchpad. Every Tuesday, I'll be
sharing practical AI tips and techniques
for automating repetitive work so that
you can focus on solving higher leverage
problems. It is now and will always be
free. So if you're interested, you can
sign up at the launchpad.substack.com.
The link will be in the description as
well. In linear, the basic unit of work
is an issue. It defines a problem to
solve and that can be for example a bug
or a new feature. So here in my linear
project you can see examples of issues
at different stages. They typically get
added to the backlog first and then
we'll move through these different
statuses as they get worked on. So, if
we click into one of these as an
example, you'll have your title and then
the description of the issue. And
typically, you want your issues to be
narrow in scope. The way I like to think
about it now in the context of AI is
that it's narrow enough of a task that
it can be accomplished within a single
context window. This issue for example
has a brief summary of what the issue
is, the current versus the expected
behavior, acceptance criteria, the scope
for the issue, and some root cause
analysis. So to create linear issues, I
use slash commands which follow a
specified template depending on the
issue type. All I have to do is explain
my initial problem and it'll walk me
through a quick process to refine the
issue until it's well defined with
little to no ambiguity.
That's important for an agent to be able
to solve it end to end without requiring
additional input from me. So let's take
a look at this example for creating a
general linear issue. At the top, we
have a goal, which is to create an issue
that an AI coding agent can pick up and
implement without needing to ask
clarifying questions. So, all of that
has to be done upfront when we're in the
planning phase. So you can see we have
some principles that should always be
followed and then a standard workflow
which has four steps which is
understanding what the user wants what
exactly is the problem drafting the
issue reviewing it with the user to sign
off and then creating it in linear. In
addition to the workflow we then have a
standard template that we want to use
for every issue. This is just generally
for any type of issue. But then we have
some issue specific sections that we
add. For example, if it's a bug for
bugs, we want to add steps to reproduce
and a root cause analysis. And then we
have some examples of what makes good
and bad titles, acceptance criteria,
scope boundaries, etc. and an example of
how to create the issue using the MCP
tool. So besides creating issues from
scratch with my slash command, if they
are created from another source like
Sentry, then I have some other slash
commands to enhance those issues and
just make sure that they all follow that
same principle where they're well
defined and there's no ambiguity so an
agent can just start working on it.
After issues, the next level of work
organization in linear are projects.
Projects are useful for grouping
multiple related issues. So let's say
you want to implement payments into your
app. You'd have to create a Stripe
account, a database table to store your
subscription data for each customer, add
a pricing page, and set up Stripe
integration into your front end, like a
checkout page. In that example, your
project would be setting up payments and
all of the tasks that we just described
would be your individual issues. So here
in my linear workspace, you can see
other examples of projects that I've
implemented. Here's an example of a
project where I wanted to implement an
image library feature in the app. So you
can see we have a highle goal. There is
another level of organization within
projects where you can group issues
within a project into smaller groups
called milestones. And that just gives
you another level of organization. But
milestones aren't a fundamental concept
like issues and projects. So I'm not
going to get too much into them. Let's
walk through the slash command that I
use to create these projects. And
similarly, you can get the full command
on Substack. So here's the slash command
for creating projects. Again, we have
some overarching principles that we want
to always be followed, including how to
keep projects tightly defined and then
breaking them out into multiple projects
if there are too many acceptance
criteria or the scope is just too big.
For projects, we have a six-step
workflow where we're going to use that
existing slash command to create the
individual linear issues. And then
similarly, we have a general template
that we like to use with our projects
and an example at the bottom of how to
create the project using the MCP tool.
Now, what's really nice about this
system is that in linear you can
actually define what issues are blocked
by other issues. So, going back to the
payments example, you need to create the
database table first before you make
changes in the app to check the
subscription data. And so, the front-end
issue would be blocked by the database
migration that you need to run first. So
this is natively supported in linear.
It's really nice because claude can take
advantage of that when planning these
more complex projects with many steps.
Now coming back to the workflow, the
first step for claude is to understand
this initiative. What is the actual
problem that we're solving? What is the
end state? And we're telling it to
clarify any ambiguities with the user.
So, I'll typically spend, like I said, 5
to 10 minutes planning out a project
with Claude, getting it dialed in, and
allow it to ask questions to determine
any ambiguities or edge cases, etc. Now,
almost inevitably, details will slip
through the cracks sometimes, and that's
okay because you can always create a
follow-up issue to fix those changes. So
coming back to this example in linear
where we have our image library project
up here I can click on issues and you
see for this project we had six issues
across these three different milestones.
Once we have our project completely set
up and all of the issues really well
defined the next step is to create a
repeatable process or workflow to
essentially automate everything after
this planning step. So all of these
steps where claude can just resolve the
issue end to end. This is where the real
time savings comes in. So this is the
slash command that I use to actually
resolve each issue. There's a couple of
important parts I want to highlight. One
is that we're going to use sub aents
throughout this and that's going to keep
the context window for our main cloud
code from filling up. So typically when
I use this slash command, cloud code
will go to work for 10 to 30 minutes at
a time and the context window won't fill
up at all because we're going to use sub
aents throughout this. So the first step
is going to be to get the issued details
using MCP. It's then going to generate a
new branch following this convention of
using the linear issue in the name. And
this is going to automatically link it.
So whenever we open a PR, it'll
automatically move through those
statuses from being in the backlog to in
progress or in review. And then we're
going to have it call a new plan agent.
And this plan agent is going to create a
plan using testdriven development. And
that means it's going to take care of
first writing all of the tests required
for these changes to make sure that
nothing breaks. So we have an example of
how it should do that. Then after that,
we're going to call another general
agent to implement the plan, which is of
course going to involve calling a lot of
tools. Then we're going to commit and
push the changes. Update the linear
issue with any relevant information or
findings. Start a background task to
monitor the PR checks. And then if any
checks fail, call a new general agent to
fix the failures. Commit the changes and
push and then add a comment to the PR
summarizing the changes. As a final
step, the main claude must read the
complete PR review and if there are any
issues or recommendations, it has to
call another general agent to again
address all of those issues, even minor
ones, and then finally clean up all of
the background tasks once everything is
complete. This is just following the
process that we saw in the diagram. So I
wanted to show you a demo of running the
slash command to resolve an issue end to
end. And I have this existing issue in
my backlog where in my app which is a
messaging app for sales agents, we don't
have status tracking for the different
message delivery statuses. So we don't
know if a message was sent, if it was
delivered successfully, etc. in the app
itself. So this is my app. You can see
in these message bubbles that we don't
have red receipts and so this issue is
to add those delivery status indicators
to the different messages. So this would
be a huge improvement to the sales
agents that are using my app. And so I'm
going to head over to cloud code and run
the slash command. And I'm just going to
give it the issue ID, which should be
69.
And we'll go ahead and kick that off.
And what we should see right away is all
of the tasks being added to the to-do
list. This is probably going to be
running for a while. I'll just let it go
and then we'll see once it gets closer
to opening the PR and uh going through
the review checks. We'll check back in
and see how long that takes.
So, it's been about 16 minutes and it
looks like Claude already opened the PR
and now it's just waiting for all of the
checks on the PR to run. So, those are
happening through GitHub actions. Here
is the PR that Claude opened. We can see
all of the checks running here,
including the Claude code review. Oh,
looks like it just posted. We can see
that some issues were raised. So, here
are some critical issues. There's a race
condition uh among some other issues. So
this is where it's really important to
run a good review process on these
changes because a lot of issues and
errors will get caught before releasing
to production. Now we're already using a
test-driven development approach to
implementing the fixes. So there should
be good test coverage, but still
sometimes things are missed. So it's
good to have a second agent looking at
the changes. So if we go back to cloud
code now, it should see that there were
some issues raised in the PR in a sec
and then it should call that additional
agent to fix all of those issues. So
we'll go ahead and wait for this to wrap
up.
Okay, so Claude just wrapped up the rest
of the process. You can see it worked
for 26 minutes total and it used about
73,000
tokens which is not bad. There's still
plenty of context window left and again
that's because we were leveraging those
sub aents. So pretty context efficient
in terms of preserving the main context
window. It looks like all of the checks
eventually passed. So it did address the
issues that were raised in the PR
review. There were five of them, so
quite a bit, but they were all
addressed. And then let's go and check
out the fix here on GitHub. So that was
the original review. And then we see
this commit where it made the changes to
address the issues that were raised. And
then it adds this summary comment of all
the things it fixed. And then we get our
follow-up review, which is going to then
check and make sure that this was
actually all done, which it looks like
it was. Finally, we get our approve
verdict. So, this is now ready to be
approved. So, once the rest of these
checks pass, then we should be good to
roll this out into production. So, I'm
going to go ahead and merge this pull
request
and I'll go ahead and release this into
production so we can see the updated
changes. All right, so I'm back on the
app and I just refreshed the page and
you can see that we have red receipts.
So, the fix was implemented. It's out in
production and we can roll on to the
next issue.
So with this simple two-step process
where I plan and create a project with
issues, I spend 5 to 10 minutes planning
the project and then for each issue I
spend less than a minute as you saw to
run the slash command and then at the
end review the PR and merge it. So I
went from having to interact with cloud
code every few minutes as you saw in the
diagram to giving one slash command and
then coming back to a ready to ship PR
after 20 or 30 minutes. The next step to
improve this and remove myself from
these final manual steps is to make it
where I don't have to run the slash
command myself since obviously that's a
repetitive task and I really don't need
to be doing that. So that way I could
simply review the full project once it's
implemented. Review those final PRs once
all of the changes for all of the issues
have been implemented. And that's when
you start getting into the realm of
Ralph loops and moltbot uh where they
can just run continuously. But that'll
have to wait for the next video. That is
going to do it for today's video. I hope
you found the video useful. If you did,
don't forget to give it a thumbs up and
subscribe for more content like this.
You can sign up for my newsletter on
Substack where I'll be sharing more
weekly insights to help you unlock
yourself with AI. And as always, thank
you so much for watching and I'll see
you in the next one.
&gt;&gt; [music]
