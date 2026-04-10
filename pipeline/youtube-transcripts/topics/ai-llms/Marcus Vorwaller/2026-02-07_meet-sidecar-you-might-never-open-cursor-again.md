---
video_id: "5QZxWmDl_tc"
title: "Meet Sidecar: You might never open Cursor again"
channel: "Marcus Vorwaller"
topic: "ai-llms"
published_date: "2026-02-07"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=5QZxWmDl_tc"
duration: 598
word_count: 1738
---
Hi, I'm Marcus and this is Sidecar. I'm
just going to give you a quick demo of
what Sidecar can do. We're starting off
on the first screen which is called TD.
That stands for to-dos and it's a task
manager except instead of being focused
for humans like Jira or Linear, this
task manager is focused for AI agents to
be able to use effectively. There are a
ton of features here which we will not
go into all of them, but you can see
that tasks are created, agents begin
working on them. Uh they can then pick
up tasks to review and you can see
everything that's happened in the
activity log. This is actually quite an
advanced system
in terms of features, but it's a very
simple system in terms of actual
usability and agentic task management.
The next feature of Sidecar is git. So
instead of when an agent makes changes
when you're coding, instead of having to
go to cursor to view those changes, you
can just view them right here. We have a
full um diff view, you can view them
both in line and side by side. And as
you can see, everything happens
generally with shortcuts, although there
are in many cases mouse interactive
elements in the sidecar user interface
as well.
Um, right now I don't have any unstaged
changes, but if I did, I could pull
those or I could commit stage and commit
those changes. I can pull changes. I can
do other things like merging in remote
branches. I can see a graph view of my
git work tree and all kinds of other
things.
Uh, I can see get blames. Um,
many many other features. And most of
the features in Sidecar are discoverable
with the question mark shortcut and then
you can search for the thing that you
might be looking to do and you'll get a
keyboard shortcut there. And if like you
see here some of the text is hard to
read, there's a full theming system
built into Sidecar. Um, so we have
standard themes that come with it and
then 453
community themes that you can switch to
just to find the look that you might
like. Um, and themes are themable per
project or for all of Sidecar. We
haven't really talked about projects
yet, but we'll talk about projects in a
second. The third feature of Sidecar is
the files plugin. So, rather than having
to go to cursor or elsewhere to get
context for what you're working on, you
can just view the files right here in
line. And as you can see, they load
really quickly. Um, for there's a
there's a fuzzy file search that will
search across all of your files. And if
you find a markdown file,
we render the markdown nicely, so it's
easy to read here. Um, there's search
within files using the slash key and
there's global search across all files.
That's really quick. It uses rig wrap
under the surface. and you can search
for say
cursor
because there is a cursor adapter built
into sidecar.
Um the next part of sidecar is the
conversations plugin
and that's where you see all of the
conversations you've had with AI agents.
And the nice thing here is that you
don't only see the conversations you've
had with cloud code. Like you can see
here, this is a conversation with Opus.
And this one is with GPT 5.3 write in
line. We support Gemini warp
and open code and others. And we and
it's fairly straightforward to make an
adapter for other
agentic uh workflows as well. And the
this doesn't only work with
conversations that you have in the
command line with other agents. For
example, this GPT 5.3 conversation was
had inside of the codeex app. And
similarly with cursor, if you use the
cursor ID, you will see your
conversation show up here.
The next feature is workspaces.
And this has two main features. One is
basically just an inline terminal. This
is really the equivalent of if I had
just opened up a new terminal in iTerm,
but it gives me a quick way to view them
all in line. So if to to do that, I
would do in to create a new shell. Um, I
can name it whatever I'm working on.
And then I can either choose to attach
an agent initially or I can choose to
start an agent initially or I can just
uh have a shell so I can run a server or
whatever else I need to do. Here I'll
just show starting up codecs with danger
mode on. The other powerful feature in
workspaces is that you can create get
work trees
without any of the command line magic.
So I can if I want to work on a feature
that's separate from the rest of the
codebase as its own check out of the
project. I can create a new workspace or
work tree and I can name it whatever the
feature I want to name it is. So we'll
say I don't know why but Spotify
integration. We want to have Spotify
integration inside of Sidecar. We'll
base it off of the main branch. You can
pass in prompts
uh which includes tickets from TD to
work on, but in this case, we're not
going to pass in a prompt. Similarly to
how or we can just find a task here. So
if I if I already had Spotify,
I could just have it start working on
that from here. But in this case, we'll
just uh we'll just start it up with
cloud code and create it. And there. Now
we have a completely new
directory with the entire codebase in
it. And
uh you can work on this directory
separate from your main repo. And then
when you're done,
so say we added this and then the agent
went off and did it. By the way, this
view having the terminal interactive
inside of a pane, I think is fairly
unique to Sidecar. And if it if uh
Claude had made changes, we would be
able to click on the
diff tab to see what those changes were.
Currently, we don't have them. And if we
had attached a task from TD, we would be
able to see that here. Um, and then
again, if we wanted to merge this
feature back in to Sidecar, that's with
the M shortcut. You go through this
little workflow where you review the
diff. It would just show you what files
it changed. You pick which branch you're
going to merge it back into. By default,
it's the one you chose when you branched
off of it. Um, and then you either can
merge directly, or you can create a
merge request, which I won't do either
of these now. and it will allow you to
open up GitHub if you go create a merge
request and view the merge. Uh, and then
it will clean everything up for you
afterwards so you don't have to worry
about it. And if at any point any of
this fails, it's really easy to go back
in and clean it up. Like if you have a
merge that's more complex and you want
to have Claude do it for you, the
workspace will still be here um, and you
can still clean it up later. Another
feature here really quick is that you
can fetch merge requests from GitHub. So
I have one here that I created last
night on my phone with the Claude app.
I'm going to fetch that PR and load it
in. And now I can attach an agent to it
and
um
have it work with those changes. Or if I
wanted to, I could just uh
I could actually switch into this work
tree to see what the changes were. So
that's with the capital W shortcut. You
can see we have our Spotify integration
work tree that we just created. And now
we have this converting
our guides to skills work tree. And I
should be able to see the diff of
changes that happen here. I can see them
here. So I can see that there was a
commit. And then if I go to get, I can
see what the commit was. I'm I'm now
inside of this work tree. So everything
is in that context. And then I can see
how Claude did converting my markdown
file guides to I mean they our markdown
file to to markdown file
skills. Um, and then once when I'm done,
say I'm done with this Spotify
integration, I decide not to merge the
feature back in, I can just delete the
work tree, delete the local branch, and
done. Um, I'm not going to merge this in
quite yet. So, if I want to switch back
to the main branch, I go here. I'm back
on the main branch. I can still see
inside of the guides work tree. It's
clearly named. Or I can go back to the
shells that I have running off the main
branch.
I did mention projects before. So far,
we've been looking at everything in the
context of the sidec car repo. If we
wanted to look at another project, I can
do that with the at short key or by
clicking on the name of the repo here.
And I can see everything that I've been
working on and completely change context
into another project if I want. So now
I'm in night shift completely separate
project same interface same tabs um but
all within sidecar all without leaving
this one it term tab and you can see
here there's another feature for notes
which I haven't yet released so we'll
talk about that in another video so
thanks for watching hope you've enjoyed
and hope you can see some potential with
sidecar
