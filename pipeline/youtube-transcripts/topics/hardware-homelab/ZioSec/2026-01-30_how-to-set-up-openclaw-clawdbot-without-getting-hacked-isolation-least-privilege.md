---
video_id: "fooZAZsBmpg"
title: "How to Set Up OpenClaw (Clawdbot) Without Getting Hacked: Isolation + Least Privilege + Firewall"
channel: "ZioSec"
topic: "hardware-homelab"
published_date: "2026-01-30"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=fooZAZsBmpg"
duration: 395
word_count: 1003
---
Today is a really exciting day. We are
onboarding our first AI employee. His
name is Jerry. He's living on this brand
new Mac Mini and he is powered by Open
Claw, formerly Cloudbot. So, we're going
to go through a complete onboarding from
a security perspective. And those of you
who have set up enterprise accounts for
other employees, this is going to look
very similar to that. And I wanted to
really take some time to talk about this
today because this list has been
floating around the internet of all of
the critical issues with open claw or
clawbot. Right? We have SSS uh brute
force issues, exposed control gateways,
we've got Telegram allow list, do not
allow list vulnerabilities, browser
hijacking, we've got password manager
extractions, Slack token theft. Um,
we've got root access without
sandboxing. Uh, we've got prompt
injections. We've got malicious skills.
And, you know, any combination of all of
these can really take what could be an
incredibly powerful assistant and um,
make you wish you never did it to begin
with. So, let's get started. Also want
to put out a disclaimer. This is not a
endall direction for a secure install.
Um, this is still really new stuff. We
are at the bleeding edge of this today
and in particular as more extensions
come out, more capabilities come out.
You really have to take those each with
its own grain of salt and understand how
that fits into the larger security
posture. So, buyer beware on this. Um,
but this is a really good spot to start
if you want to begin experimenting. All
right, let's dig in. Mac Mini box
opening.
All right, who doesn't love opening a
brand new piece of hardware? I would be
lying if I said this wasn't a big
motivation cuz we get to play with a
brand new Mac Mini.
So, here's what the setup will look
like. The Mac Mini will be on the server
and Jerry will be installed inside a
virtual machine on the server. This is
principle one, VM isolation. If anything
goes wrong, Jerry will be confined to a
virtual machine and he won't get kernel
access to the server. Principle two is
network segmentation. We'll put a
firewall on the server side and we'll
configure it to whitelist only a select
few sites we need Jerry to visit to do
his day job. Principle three is least
privilege. Jerry will be a standard user
account. No pseudo access, no separate
browser profile, no access to passwords
or sensitive files. Principle four is
authentication and authorization. Jerry
gets his own accounts. There's no
anonymous access, no shared credentials.
We're going to hook him up to his own
clawed or open AI login, his own email
account, his own GitHub account, just
like we would a human employee.
Principle five is potentially the most
important is monitoring and then
auditability. So if anything does go
wrong, we need to be able to observe it.
So we're going to log everything that
Jerry does, set up alerts on anomalies,
and then review this activity regularly.
So we're going to set up UTM for our
virtual machine environment. And I'm
going to go ahead and select Mac OS as
our operating system. That's going to
set up by itself. And while it's doing
that, we're going to load up Lulu as our
network firewall. Within Lulu, we can
decide which sites we want to block,
what traffic we want to allow, and it's
also going to give us logging on the
server side. All right, we are ready to
install MacOSS in a virtual machine for
Jerry. This is Jerry's new home. So,
we're going to go through these setup
steps here
and making sure to lock this down by
default. All right, this is going to be
Jerry.
We're going to give Jerry a password.
We are not going to set up an Apple
account. No location services.
We are not going to share anything with
Apple.
No screen time. No Siri.
Yes. Turn on file vault.
We're going to write down this recovery
key. All right. Let's install Jerry.
Browser.
Open claw.ai.
Copy this.
Pseudo.
Paste that.
Enter our password. Here
we go. We're installing Jerry. So, I
quickly ran through the command line
setup. I entered our API keys for
Claude, for um ChattBT. We got to the
UI. Right now, the UI, we can continue
setting up additional features and
additional connections. Um, but the
reality of this is the secure setup
really lives in the environment that you
put this in, right? So a virtual machine
that's isolated within its own server
and that has endtoend monitoring logging
firewall capabilities and we're giving
at least privilege right we're next step
on here is to remove the admin access
from this particular user account before
we start using and we've created our own
unique clawed loginins our own unique
open AI plugins that are specifically
attached to Jerry. So now we can track
Jerry and we can turn Jerry off if
Jerry's not doing something correctly.
The reality of this is, you know, this
open AI, it's still highly probabilistic
and it can go and hallucinate. It can
mess up the things that you're
connecting it to. So if you take these
steps and you get your virtual machine
set up, this thing can be an incredibly
powerful way for you to explore. And
until somebody comes out with a truly
hardened enterprise version, um I would
be very cautious with how you use this.
But this setup should give you a head
start in at the very least minimizing
the destruction if and when that does
occur. All right. Happy building.
