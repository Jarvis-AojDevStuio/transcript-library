---
video_id: "5dTjU2BPPis"
title: "Keep Using Your Local Claude Code Session from Any Device | Huge Unlock!"
channel: "JeredBlu"
topic: "ai-llms"
published_date: "2026-01-28"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=5dTjU2BPPis"
duration: 480
word_count: 2118
---
So, in this video, I'm going to share
with you guys a huge workflow
enhancement, a huge productivity hack
that I've been using. It's so simple.
It's not hypy. And we're not talking
about Cloudbot. Not yet. We'll get to
that later. What it is is how to
continue working with Claude Code or
Codeex CLI or Gemini CLI from your
phone, from your iPad or your tablet or
some other computer. And here's the
bottom line. I prefer to use terminal
coding agents. I feel they give us a lot
more control over what's happening
better than the VS Code extension or the
cursor extension or the mobile apps or
the web apps. Those are great. But when
I'm coding or when I'm building
something, the terminal is just better.
So what happens is I'll be working on
something in the terminal probably using
a specri development framework. Right
now I'm using GSD. I really really like
it and I can't keep my computer open all
the time, but I want it to keep working.
And when you're using longunning agents
or longunning tasks in the terminal, it
doesn't really help when you move to
your phone or your iPad through the
native apps at least. You don't get
access to your slash commands. You don't
get access to your git. You don't get
access to your MCB servers. And it's
actually really easy to continue from
your phone or your iPad or your tablet
or whatever. And it uses three very
common technologies, really easy to set
up, free, safe, and you should know
about these technologies anyways. And
those are T-Mox, Tailscale, and Termius.
This is the most replaceable part.
Terminus is just an SSH client for your
phone. There are tons of them. Tails
scale makes a secure remote connection
between all of your devices. There's a
lot of use cases here. And T-Mox is a
terminal multiplexer. There are so many
features here. There's so many
customizations. I'm not going to get
into any of it. All we need are for
these things to be installed and
connected. And then you could just leave
your computer wherever it is. Let it
keep running and log to your phone or
whatever else and see where it's at. If
you need to prompt it more, if you have
to give feedback, the bottom line is you
don't lose your momentum. And obviously
it's not perfect for all scenarios, but
if you're coding with Cloud Code or
Codeex, you know what I'm talking about
here. Oh yeah, and the other thing that
I did is I added a hook that sends me a
notification over Slack when Claude
needs my attention. And this is
obviously also useful even when you're
not away from home. If you left your
computer and Claud's doing something and
needs your permission or needs feedback,
it's good to get that notification also
to your phone. Let me just show you how
it works. I'm just showing you what I'm
working on right here. This is a new
journaling app that pretty much combines
all the good things about all the
journaling apps that I use, makes it
private, and I'm building it here in
Cloud Code with GSD. It finished an
iteration. It's telling me what to test
and it's waiting for my approval. So on
my iPad, I just got a notification of
Slack. It says, "Claude needs you.
Claude needs me. Remember that." So I
click here. I opened it up. It kicked me
out of the terminal here because it's
better to only have one terminal session
at a time. It's the same terminal
session, but we see exactly where we
are. And this obviously works on iPhone
and any other computer or device you
have set up with tail scale essentially.
So if I wanted to keep working on it, I
can just keep working on it from here
from my iPad or from my phone wherever.
So, just to pull it back over here,
we're just going to do t-mox attach- t
Lego and detach from the other user from
the other terminal. We're going to press
that. Kicks me off the iPad. Here we are
back exactly where we were. So, as you
see, we're able to run a terminal from
multiple computers. And basically what
T-Max does is it allows you to keep
working in the background even if you
close your terminal and pick up from any
other terminal we want. And by the way,
there's so much you can do with T-Mox. I
suggest checking out this video by Yuron
Bean. He did a great video on how to
customize T-Mox. But right now, I'm just
showing you the basic feature. If you
start T-Mux, you can detach from it, run
in the background, and pick it up from
other computers or devices, even if you
go offline. It's really, really
powerful. To get T-Mux on your computer,
if you're running a Mac, you just run
brew install T-Mox. It's that simple.
Then what you would do is you would go
into your directory where you're
working. In this case, we're in a
directory called test 11. I want to
start up T-Mux before I start up cloud
code or Codex. And essentially, you can
think of it as a wrapper around your
terminal. So, you have all these layers.
So you have T-Mox, you got cloud code,
you got your file system, you got
terminal, and then you have tail scale
that allows you to talk to your computer
from anywhere. So we're just going to do
t-mox new- s. And as you see here, it
looks the same. You see this little
green bar at the bottom. Now we're in
T-Max. Now, if we just wanted to start
up Claude Code, because we're still in
the same directory, we just type in
claude. And there you have it. Regular
terminal, T-Max at the bottom. You see
Claude running. Oh, this is actually
really cool as well. I have to do a
video on this. This is the new Claude
code tasks where the tasks persist in
the file system, not as a to-do list and
a markdown file in your project. Really
cool. I'll do one on that, but besides
the point. So now if I want to access
this T-Max session from my iPad, I'm
connected to my computer already via
tail scale. So I just do T-Mox attach-
t-d.
Boom. It's gone from here. We see the
whole thing on here. So let's get that
back. T-Max attach- T- HD. Okay. Okay,
so we covered T-Mux and how to use it.
So now let's go over tail scale. Like I
said, there's many use cases.
Essentially, the way we're using it here
is kind of like a VPN, but not the VPN
you're thinking of. It's a VPN in its
basic sense and essentially it creates a
private network between your devices
without having to do too much config.
And it's free and it's safe. It's very
trusted. It's been around for a long
time. You download the app for your Mac
or your PC and on your phone. You create
a login and it walks you through the
whole thing. And if you haven't done so
already, you should probably enable SSH
on your computer. You just go to remote
sharing. and we turn on remote login
that enables SSH. So once you've created
account and have tail scale installed on
one device, you go install another
devices, you log in through each app and
you'll connect the device and every
device gets its own unique IP. I'm not
going to share mine with you here, but
you get the idea. So now your iPhone has
a direct connection to your Mac for
example and that connection allows you
to use the terminal and pick up other
terminal sessions like our cloud code
session. And again, this works for
Codeex and Gemini for all of them. We're
just essentially giving ourselves access
to our own computers that are still
running from our devices. Lastly, we
have the SSH client on our phones or our
iPads. Just like terminal, once you have
tail scale set up, you just set up a new
host. You give it the IP address you got
from Tailscale. You put in your username
and password and a few other
configurations if you decide to set them
up and then you're able to just access
it. So, I'm really fun person. And while
I was there, I was able to keep working
on my project and that was really cool.
I didn't have to think that it was
waiting on me to get home to keep
working on. I was able to do what I
needed from my phone with cloud code in
the CLI. so powerful. I'm sure you know
what I'm talking about if you're running
Cloud Code or Codex or any of these
tools, how frustrating it is to
downgrade to the mobile app. So, where
does Cloudbot come into all of this?
Well, let me start with this. You should
definitely run Claudebot on a different
computer. You should not run it on your
main machine with your file system with
access to all your credit cards and all
your loginins. It's cool, but it is a
recipe for disaster because it is prone
to prompt injections. The credentials
are stored in plain text. if it decides
to go download something, get malware or
whatever, you could be exposed really
quickly. So, the solution is to use a
separate machine with an isolated scoped
permission environment. That doesn't
mean go buy a new computer. You can do
this with an older computer lying
around. You just have to wipe it or even
a VPS like Digital Ocean or Hostinger.
The idea is just to have it in an
isolated environment that is always
running. So, many people are going out
and buying Mac minis because Apple
products are better and they can run
local models. But, let's stop right
there. You don't need such a powerful
device to run Cloudbot because at the
end of the day, you will be running it
via the API. I love running local
models, but they do not compare to
frontier models like Claude or GPD5.
They just don't. Local models are great,
but the local models that are that great
will not run on this device. Besides the
novelty factor of being able to run
Claudebot with local models, I don't
think anyone's going to do it cuz it's
so slow. I've tried it. Maybe it'll get
better, but I don't think you need a Mac
Mini for this. So, why do I have one?
Well, the beauty of Claudebot is that
it's always on and it's always running
and it's in its own isolated sandbox if
you do it right. And when I'm traveling
or I'm going to meetings, I have to
close my computer and stop working. That
means Claude Code stops working. So, it
got me thinking, well, having a
dedicated powerful enough computer to
run all these things plus maybe a little
bit of Cloudbot is beneficial because
now I can start cloud code sessions on a
dedicated device that's always on,
always running. It doesn't need to close
when I'm traveling. I could just keep
using Tailscale and T-Mox to start my
projects there and work on them from
anywhere, even from my laptop, while
this is consistently running. That's the
justification. So, I hope you found this
video helpful or insightful. If you have
any questions or feedback, drop it in
the comments below. If you haven't done
so already, subscribe to the channel. It
really helps me grow. Thank you guys for
watching and have a great day. And by
the way, what do you think about my new
glasses?
