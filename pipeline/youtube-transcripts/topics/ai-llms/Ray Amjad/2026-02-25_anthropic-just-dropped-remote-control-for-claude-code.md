---
video_id: "y3xzYwxQuHc"
title: "Anthropic Just Dropped Remote Control for Claude Code"
channel: "Ray Amjad"
topic: "ai-llms"
published_date: "2026-02-25"
ingested_date: "2026-02-25"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=y3xzYwxQuHc"
duration: 596
word_count: 2352
---
Okay, so a few hours ago, Enropic
released a brand new feature which many
people are calling Enropek's own version
of OpenClaw. OpenClaw for grown-ups and
now saying they don't even need to use
OpenClaw or Cloudbot anymore because
they can just replicate the same thing
inside of cloud code. And this new
feature is being able to control cloud
code running locally on your machine
from your phone or another device. Now,
you could have kind of done this before
by using T-mok Toscale and also Terminus
on your phone. And I've covered that
before in my Cloud Code master class,
but that was like kind of a hassle to
do. And this update makes it much
simpler because now you can just use a
cloud code app, kind of like a messaging
app. Now, let's go for an example of how
you can use this. Now, you want to go to
a folder. I'm going to go to my ray OS
folder, which contains all my life stuff
that I manage with cloud code and then
do claude RC or cloud remote control.
Press enter and then that will spin up
an instance of cloud code. So the very
first time you run it, you may see
something like this where you have to
enable it. And that opens a secure
connection from your computer to
Anthropic servers. Now I'm actually
going to run this in dangerously skip
permissions instead. So let me stop
that. Do claud dangerously skip
permissions so it can do more things on
my computer. And what I can do is do /
remote control to enable it for this
session. And if I want to enable it for
every single session that I run in the
future as well, I can do /config. Search
for remote control and it says enable
remote control for all sessions. I'm
going to change this to yes or true and
then press escape. And now remote
control will be available for every
session of cloud code that I run in the
future. So anyways, let's make sure that
we have the cloud app installed. Open it
up. Log into our account. Then go to the
codes tab on the left hand side and then
find our session. Can you go to my
Google Drive folder and then figure out
where the raw MP4 file is and then edit
the video with the uh video editor
skill? So, as soon as I send that
message, you can see it now appears on
my computer. So, it's first going to go
to my Google Drive, but I should have
been a bit more specific because I have
Google Drive set up locally. And
recently, I actually made a brand new
skill for Cloud Code to edit my videos
for me. So, this video that you're
watching right now has been edited by
Cloud Code, but it's only like 95%
perfect. cuz I still have to like clean
up some loose ends myself. Um, but yeah,
now you can see it's now downloading the
video that I want edited. And whilst
that's happening, I'm going to start a
brand new session. So, I could also be
coding on projects, for example, like I
have this projects right over here. And
then I can remote control this session
since I already had it enabled before.
It's already enabled. So, I can go back.
Can you make the Mac OS release and bump
up the minor version? And yeah, that
command sends off to my computer and it
will work normally. Now the nice thing
is that every time there is a permission
that your computer requires because
you're not in dangerously skip
permissions for example you can allow it
and that is one of the benefits over
using T-Mox and Terminus for this
because it was like quite fiddly to
allow it from your phone. Now one of the
benefits about this is that you have
access to all your cloud code config
from your phone. So whatever skills you
have set up MCP servers and so forth. So
if I run claude RC then I can trigger
plan mode and also the exit MCP server
that I have enabled from my phone. So,
let me go to the session over here.
Switch over to plan mode. And if I press
enter, you can see it's now using the
exit MCP server that I have set up on my
computer. Now, this means that you can
have MCP server set up for background
research tasks, for example. And then
you can just be triggering the use of
them from your phone. And now we can see
that planning mode is asking us some
questions that we can enter in from our
phone. So, I can just say like hello,
press submit, and I can answer a lot of
questions that way. So that can be
pretty helpful for just making plans on
the go because you can go out for lunch
and then continue working on your
application. And now going back here, we
can see Claude Code is still editing
that video for us. So let's talk about
the most important thing here which is
security. You don't want to be on bypass
permissions or dangerously skip
permissions all the time because that
can get quite dangerous especially if
it's connected to internet. Now your
version of cloud code which has remote
control enabled is connected securely
via Entropic's own servers to your phone
or to another machine. So if I wanted
to, I could go to the claw AI website
from end of a machine and then I can see
that I have this remote session right
now, which is the same session that is
happening on my phone. And this other
remote session is the one that is
editing the video for us. But if I was
kind of worried about it accidentally
being prompt injected by searching
online or deleting a file, I could
either do one of two things. Either use
the Cloud Code sandbox or have Claude
Code running on a remote server
somewhere. So I'll show you how you can
install Claude Code on a remote server.
So you can have it run dangerously skip
permissions over there and do like web
research for you and stuff like that
without worrying about it accidentally
deleting your files or doing unintended
things on your computer. So I'm going to
log into my Herznet account and then
just quickly set up a server for myself
here. So you can do create server,
choose the cheapest one, which is $349 a
month. Choose
choose Germany over here. Create my SSH
key and add that here. And then call the
server cloud code and press create and
buy. And now what I can do is SSH into
that server. Copy over the install
command for cloud code. Go back to
server. Press enter. And then after it's
installed, I can do claude, press enter.
But I actually have to copy over this
command to fix the bash. Do claude. Sign
in with my Enropic subscription. And
then finally, I can run T-Mox on the
server. Run claude inside of T-Mo. Yes,
I accept. Do/ remote control.
Enable remote control for the session.
And then I can detach from this terminal
session safely and have it running on
the cloud. So if I press CtrlB and then
type in colon detach, press enter. Then
I can go back to my phone's version of
cloud code. And then I can see I have
this interactive session. And then I can
chat with it and say stuff like
searching online tell me about cloud
code. So I could install my MCP servers
onto this server and then have it
continuously work for me in the
background on different tasks and not
have to worry about my computer being on
all the time. So I can do research with
different MCP servers, make reports for
me, and even if it did get prompt
injected, any damage that it does would
be limited to the server that it's
currently on. Now, another way of doing
this is you can use sandboxing in cloud
code and have your remote control
sessions run through that sandbox. So I
cover much more about sandboxing in my
master cloud code class that will be
linked down below if you're interested.
But to give you a brief overview, if you
make a folder like this and inside of
your settings.local local JSON file. You
type in something like this. Sandbox
enabled, true. Permissions, default
mode, don't ask. I can give it a list of
websites I can just go to and do
research on. And then I can deny any
tools such as editing or writing tools
for example and bash tools. And if I
start a remote session of cloud code
here by doing claude RC, I can go to a
session which is in the sandbox research
environment here and then say go on
archive and find me the latest AI papers
and summarize five that look interesting
to you. You can see it can go on archive
and not ask me for permissions because
that is allowed over here. And then
after pulling in the papers, it gave me
some interesting summaries of them. So
if I told it to fetch
mastercloudcode.com,
then you can see that it won't work
because that URL has been blocked. But
one of the problems can be that it may
still decide to go on the website via a
curl command, which can be dangerous.
But in this case, it does not have
access to bash tool. So it won't be able
to do that. Now, one of the ways to make
this structure and more secure is to use
a proxy. So, for example, I would want
it to be able to do color requests, but
I want to deny the web fetch tool and
the web search tool because those would
bypass a proxy. And then I should set up
a network port over here. So, that is
HTTP proxy port. And then you want to
make a proxy that looks kind of like
this. So, you can get cloud code to
write you one. And you want to make sure
that api.fropic.com
is allowed because that allows for the
remote connection because if you don't,
you may run into some problems. Now if I
enable the proxy by doing node proxy.js
then do claude rc dangerously skip
permissions and then I can test out the
proxy to make sure that it works by
trying to go to my personal domain. So
that should fail because uh like it's
not allowed by the proxy. So you can see
on the computer it says http get
blocked. But if I tell it to like do
mastercloudcode.com instead then that
should work just fine because that is
allowed by the proxy. So you can see
pass successfully via the proxy and then
it loaded in the page. So this is
another way that you can make sure that
you're using remote control securely
with dangerously skip permissions. So
you could have like research agents that
are only allowed to go on a set of
websites for example. You can also block
a lot of permissions to prevent anything
bad happening on your computer. And it's
like really easy to customize. Now one
of the big differences from OpenClaw is
that it's more passive and less
proactive. So you can get openclaw to
like search online at a scheduled
interval for you and then send you
messages. Here it's more like passive.
So you give it and tell it to do
something. It does it for a while. But
given how popular it's gotten, I imagine
that Claude Code or the Enthropic team
will slowly be adding them over time
because it seems they kind of have an
interest in the space. One feature that
I would really like to see is basically
the ability to connect hooks to
notifications on your phone. So
currently you can have cloud code send
you notifications on your computer using
like Apple script or something. But
ifropic allowed for those notifications
to be sent to your phone if you're
remote controlling I think that would
make it even more powerful. But yeah,
I'm sure they will be adding a lot more
to it over time to improve it. Now it
may be the case that you no longer need
to use openclaw because this satisfies a
lot of use cases for you. And I know for
me personally because I usually manage
everything in my Ray OS folder. The fact
that I can now use this remotely from my
phone means that I can just have it
running all the time and then just be
giving prompts to my ROS folder to like
draft emails, download files, do some
video editing and a bunch of other
things as well whilst using my Cloud
Code subscription to save on money. Now,
Cloud Code has finished editing that
video. So, I'm going to get it to edit
this video and then finally upload it.
Anyways, I'm sure will be making much
more improvements here over time because
they seem to be shipping a new update
like almost every single day. And if you
do want to get my own thoughts about it
and ways in which I'm using it, then you
can sign up to my newsletter which will
be linked down below. You do get access
to a bunch of bonus free videos as well
that you won't find here on the YouTube
