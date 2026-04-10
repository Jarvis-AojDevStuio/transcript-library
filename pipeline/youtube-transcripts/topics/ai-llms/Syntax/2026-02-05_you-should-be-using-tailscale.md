---
video_id: "G0sEM9ijkTE"
title: "You Should Be Using Tailscale"
channel: "Syntax"
topic: "ai-llms"
published_date: "2026-02-05"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=G0sEM9ijkTE"
duration: 1617
word_count: 5471
---
So, here's the problem. You have many
devices that you want to be able to
communicate with each other easily or
you communicate from one device to
another whether you're on the same
network or not. And you want to do so in
a secure way where you can be confident
that people aren't able to get into your
network and wreak absolute havoc. Now,
I've been looking for this flow for a
long time, specifically for my local
development process. My MacBook Pro is
great, but the battery isn't. I would
prefer to run less things directly on
this and more things on my computer in
my office. Now, I have a Mac Mini back
there that handles my dev sites just
fine. So, I've been running most
everything off of the Mac Mini lately
and then connecting Open Code through
the Mac Mini. So, Open Code is actually
running and processing on the Mac Mini,
and I've been connecting to my code via
Z remote, and that's been working really
super well. Now, you can always SSH and
do Vim if that's your style, too. But
I'm going to show you over the course of
this video how we can get that process
all going where you can have a secure
context HTTPS local dev environment
that's not even running on your laptop,
but you can access it anywhere in the
entire world from any network securely
without having to worry about opening
ports or massive configuration. And I'm
even going to show you my zed setup as
well as my open code setup. So that way
you can see exactly how I'm running my
dev processing on my computer, on my Mac
Mini, on my laptop, my phone, or
wherever it rips. So, how is this all
possible? Well, it's all possible
through something called Tail Scale.
But, uh, they're not paying me to make
this video. I have been using this and
this is the promised land for me in
terms of this setup. It's so nice and
easy. And the best part is you don't
have to pay anything for it. Now, I am
paying for a VPN add-on to Tailscale,
but you don't have to. It's nothing that
I'm showing you in this video is going
to be blocked behind a payw wall. Uh
what you'll want to do right now is
download and get Tailscale running on
every device you want connected on. I
have Tail Scale running on my laptop. I
have it running on my Mac Mini. I have
it running on my phone. I have it
running on my Synology Naz. and they're
all connected in a nice personal
network. So, while you get that download
and installed on at least two devices,
because you'll need that for this video,
or you can just follow along and see
what's possible, I'm going to tell you a
little bit about something we're cooking
up, which is MADCSS. Madcss.com outlines
the 2026 World CSS Battle Championship
happening on Syntax. So, if that sounds
interesting to you, smash subscribe.
We've been doing CSS battles on Syntax
for a long time now. and they are just
so entertaining. So, we figured why not
bring on some of the industry's best and
then two other jokers named Wes and
Scott on here to compete. We got Adam
Argyle, Josh Ku, we got Brie Hall, we
got Amy Dutton, we got Shawn Pearson, we
got Jason Langdorf and Chris Koyer. The
whole lineup is unbelievable. Adam Wan,
Mr. Tailwind himself, Cassidy Williams.
Uh, the lineup's out of control. We have
a bracket tournament where it's single
loss elimination. So, if that sounds
like fun to you, smash subscribe on the
YouTube and you'll be getting the Mad
CSS videos in your feed later this
month. Okay. So, Tail Scale, I'm
assuming that you have now gotten Tail
Scale running up if you're interested in
doing that. While you do that, let me
explain to you also a little bit about
what Tail Scale is. Now, I'm no expert
on VPNs and systems of that nature. So,
um, anybody else who wants to rip me for
this, feel free to do so in the
comments. Tail scale, what it does is it
sets up a private network using
WireGuard, uh, which is the same thing
that many VPNs use, right? And that
network allows your devices to speak to
each other on stable IP addresses. So,
typically, if I have SSH available on my
Mac Mini, I could SSH into it from my
desktop using the IP. And if I haven't
assigned a static IP to that, it might
change the IP all the time. Now I I have
all my stuff has static IP. So I I just
do the static IP. But the tail scale IP
is going to be 100 something whatever.
And that is going to be the tail scale
IP. Meaning that you could SSH to that
tail scale IP and have it just work. Now
the reason why this is different is
because let's say I'm on a different
network. Let's say I'm on a work trip
and I'm in a hotel room. I can then SSH
into that tail scale IP without exposing
the Mac Mini to the wider internet. And
the only reason it will work is because
I have tail scale running on all the
devices. Okay. So, because those devices
are all connected, it no longer matters
which network you're on because your
devices are in a private network in your
tail scale called the tail net I believe
it's called. Um, and then you could even
get domain names if you want using magic
DNS if that's a feature which we'll talk
about in this video. Okay, so that's how
it works. Now there's a lot more there
in terms of uh key exchange ACL policy
encryption device traffic uh connection
types and all that stuff not important
for this video. I think you can do your
own research in depth if you want to
learn more in depth on how tail scale
works. We're talking about the practical
setup here. Okay. So this is it. I have
all my tail scale stuff set up. Now,
what we're going to do in this video now
is I'm going to SSH into my Mac Mini.
I'm going to create a new Vit project
with spelt kit on that and I'm going to
get it up and running on Vit. I'm then
going to connect to it via Zed so we can
see and make some changes. Uh you can
use Vim if you'd like over SSH. You can
use anything you want. Use SSH and Vim
or use this feature in Zed. And I'm very
sure VS Code has a similar feature. Uh
please drop that below. Uh, if you do
I've just been on zed, so this is how
I've been doing it. Okay, after we are
able to do that and make modifications
to our web app, I want to be able to get
that app loading just fine on my MacBook
Pro, even though it's running on that
machine. And I want to do so with HTTPS
and a domain. Uh, this domain is going
to be a generated one, so not a custom
one. It's going to be done through tail
scale serve. Okay. And then after we get
that running, I'll show you my open code
setup and how I run open code on the Mac
Mini and connect to it from here, my
phone or anywhere. Okay. Now, I will
show you uh Zed and but again, like I
said, you could use SSH to do it via Vim
if you'd like. Um if you don't know
about Zed, it's a great editor. I have a
video on my personal channel about it.
Zed.dev is the place to learn about it.
It is a really fast, nice editor. Okay,
so I have Tailscale running and you can
tell it's running on each of my devices
because it's right up top here. and I
can SSH into it by just using the IP
address from the tail scale network.
Now, the IP address, I'm going to blur a
bunch of these and for no reason other
than just paranoia. I don't I don't
think there's anything wrong with uh
giving you or showing you these IPs, but
for sheer paranoia, I'm just going to
blur them. Okay. To get the actual IP
address, what you do is you head down to
network devices in your tail scale and
then you select my devices and then you
just look at these. Now, I want the Mac
Mini. All I do is click it. When you
click it, it puts the IP address in your
keychain. Uh, your keychain, no, your
clipboard, not your keychain. Let's head
to my terminal here, and I'm going to
SSH my user at the IP address that I
just copied. Now the user in this case
since it's Mac to Mac, this is the Mac
user on the main account. Okay? And it's
just my name. So in the password it's
going to prompt you to would be the same
thing that you were to enter on the Mac
when you were to log in. So I'm going to
enter my password. Hit enter. Uh it
gives me uh an issue about my Zshrc.
Yep, that happens. Uh we're going to go
ahead and we're going to do sites. We're
going to do projects. I'm change
directory to where I keep my projects.
From here, I'm going to run pnpx and
we're going to do svcre and then we're
going to call this tail scale app. Okay.
Um the if you're wondering what this is,
svcreate is how you create a new
spellkit project. If you want to have a
react app, a vit app, I highly encourage
you to just start your normal dev
process here or whatever because again,
this is just to get a a dev app going.
Okay. Okay, so what we're going to do is
we're going to say speltkit demo because
it's a nice little demo app. I'm going
to say sure typescript and then just hit
enter. We're going to say pnpm and then
once this is all done, I'm going to
change directories into the tail scale
app. And it already did our
dependencies, so I don't have to run
pnpm install or anything. But we're not
going to run the dev process just yet.
Reason being is I want to modify this. I
want to change uh the default port uh
for reasons I'll make clear in a minute.
But I think it's a good time to bring in
our text editor. If you want to use Vim,
now would be the perfect time to just
type Vim and start editing your files or
Neoim or whatever the heck you use. But
for me and other people who like to use
a text editor, I'm going to pop open
Zed. Okay. And this feature is really
neat inside of Zed. When you click open
project, you can come down here and
click open remote folder. Or you can
find that also under file open remote or
you can if you are uh you know civilized
you can do control commmando
and pop open the menu. Now the by
default there will be nothing here. So,
you'll want to click connect to SSH
server and you'll say SSH and then
whatever that exact same SSH stuff that
was working for you worked in the prior
uh like when you SSH into the Mac Mini
or wherever you're hosting this stuff or
maybe you're just on your actual local
machine here. You'll s here enter. It's
going to ask you for your password and
then it's going to allow you to navigate
to any of your projects. So, to actually
get to any of my projects here, I'm
going to click open folder. And it has
this nice little folder. It's going to
ask me for my password once more. And
then I'm going to head into sites. I'm
going to head into projects. And then
I'm going to head into Tailscale app.
Okay. So, the tail scale app that you're
seeing inside of zed right now is
running over SSH and it is connected to
my Mac Mini as you can see here. And
this because it's using that tail scale
IP address is going to allow me to
connect to this code from anywhere in
the world. So if that's if that's all
you want, you got it right. You can see
the files are right here. If I were to
edit them, you'd see them uh happening
over here too. So that part is really
great. This is how I code. Let me turn
off restricted mode here. Actually,
trust and continue. Okay, so this is how
I code. Especially things that are
running on here. I'm entering and I'm
working directly in here. The experience
is not degraded at all. I I mean maybe
if your network connection is bad. I
haven't really had a terrible experience
there. U but so far so good. Now the
thing I want to do here is in
vitconig.ts.
Now if you're a nextjs person or
whatever, you'll want to find where you
can customize the port. The only reason
I do this is because it makes sense to
me to have really solidified ports where
one app is always running on a specific
port rather than the default. Because
the way the default works is if the
default's taken, it goes to the next one
and then the next one, the next one, and
then it becomes really confusing which
port you're trying to connect to. But if
each of your projects have a port that
is self-identifying in that sort of way,
then you'll always know what you're
connecting to with that port because we
will be using these ports in our serve
as well. Uh they become important or
significant identifiers, I should say.
So let's go ahead in our V config. I'm
going to add a server. And then the
properties in here that we need right
now is just going to be port. And we can
say five. Well, let's actually let's do
speak for tail, which I believe is 7411,
right? T A L L. T A I L. Is that right?
I think it's right. Either way, we're
going to do 7411.
Okay. Uh because that makes sense to me.
Cool. So that that means that if we run
in our our SSH over here, if we run
PNPMdev, it should say that this app is
running over at localhost 7411.
So now we have the ability to modify
code in our remote app. That's great.
But how do we get that to load in the
browser? Um how do we make this so this
all works very seamlessly? Now you could
do so with just by vit host I believe
and just access it through the tail
scale IP. But I want to actually do this
with Tailscale serve because that way we
get an HTTPS and I like that. So we're
going to be doing that via Tailscale CLI
which is something that you need to
install separately from tail scale. Now
I installed mine via homebrew. So you
can install it via just brew. I believe
it's just called tail scale. Um
otherwise you'll just head to their docs
which is docs reference tail scale CLI.
You can just search for CLI in here and
it will get you here and you can install
that on your computer any way that makes
sense to you. And likewise, once you
have that installed to confirm that you
have that installed, fire up a new
session. And I'm going to have to SSH
again. And it doesn't matter where you
are in this new session, but just fire
up a new SSH in here. And we can run
tail scale- version. And then it should
output something here. My version is
192.3, which is what we're using at the
time of recording this video. If you
don't see this, you don't have Tailscale
installed on your machine. I created a
new session. I sshed into it. I ran
Tailscale version. I need to see this
before you can continue. Otherwise, head
over to their documentation and figure
it out. Now, there's another setting and
thing that you'll need to have set up
before we proceed. Now, tail scale has
some interesting stuff with magic DNS
and HTTPS that we need configured. To do
that, we want to head to our tail scale
up top here in our our settings. We want
to go to settings and then we want to go
into accounts and then admin console.
Now, admin console is I'm going to show
you this blurred out right now. Includes
a whole bunch of IPs and all of the
devices I have connected. Um, again, I
don't think there's anything that, you
know, I don't think there's anything
that could come from this. I just want
to, you know, be better safe than sorry.
Now, where you're going to want to go is
this DNS tab right here. This one right
here. If you click on that and scroll
all the way to the bottom, you will see
magic DNS. You'll want to enable magic
DNS and then HTTP certificates. You'll
want to enable HTML HTTPS certificates.
I'm very confident that if you don't
have these two things enabled and you
run the tail scale serve stuff, I'm
pretty sure it's going to yell at you
and say to enable these things, but uh
this is where you go to do so. Okay, so
all that said, I think we're ready to
start serving our site. We have the site
running at localhost 7411.
So let's go ahead and actually get this
thing served. Now we run tail scale
serve and then we're going to run hyphen
bg. Now, BG just means that this is
going to run in the background. Uh, you
don't have to use BG if you want to be
able to just start and stop this from
your term. I like to just run it in the
background. Typically, I'm just keeping
the same dev processes running all the
time, but I'm a little bit lazy there.
And then you're going to want to do
https. So, hyphen https and then it's
going to be equal to the port at which
you would like to serve this on. I would
like to serve this on the same port,
which is 7411. It doesn't have to be the
same port. It can be anything. Uh this
is the one that you will access it on
when you go to access it from the
MacBook Pro which I'm you see I'm on the
MacBook Pro but I'm sshing into the
Mini. Okay. The last property here that
you need to have is going to be the
address of the process you want to be
served. So http colon
slashlohost
this is my vit dev server is 7411.
Okay. Now, if I did all of this
correctly, and fingers crossed that I
did, I'm going to hit enter here. And
then it should give you the address at
which your new site is available. Note
the port. Now, when I visit this
address, what we should see in this
particular case is that the blocked
request, this host is not allowed to
allow this host add uh and then it gives
you what to add to server allowed hosts
in vit config. This is a vit thing. If
you're not using VIT, um you might need
to add a different setting here. My uh
understanding is that if you were using
Nex.js, it would probably give you the
correct error. I I don't think I've ever
really used Nex.js and for any amount of
time, so I don't know. Uh but for Vit
sites, it tells you exactly what to do,
which you got to love that. So, I'm
going to head back to my zed here, which
shows us uh our Vit config. Inside of
server, we're going to want to add
allowed hosts. Now, allowed host is
going to look like an array. And that
array is just going to be a bunch of
strings. Now, it said to allow this as
my host. To allow this host, add this to
your allowed hosts. So, again, it's
telling you exactly what to do. No
excuse. So, we paste this in here and
save it. Now, I could refresh this. And
guess what? Check it out. Your new
Spelkit app. Now, not only is this the
local dev server, it's also running
HTTPS in a secure context. So, if we
want to see this working, we can add in
just another quick H1 in here. Hello.
Save this. And you'll be able to see
just how instant this feels. If you were
worried or concerned about this um you
know not feeling like a local dev
experience um you can rest assured that
the moment I hit save this thing is
updating. Again I'm on a great wired
connection here uh that might not always
be the case but for the most part as you
can see the dev flow is working super
super well here. Now you may have been
thrown off by this broken image right
here. You know, I was actually pretty
thrown off by this broken image myself,
but uh visiting the the image is
actually broken. I'm not quite sure why.
When I looked into um the images folder,
the image was broken entirely. I don't
know if it's just a a faulty image that
came in when I ran SV create or if
there's a um something wrong with the SV
that threw this in here in the demo. I
honestly have not used this particular
demo in a long time because I'm usually
using a spelt kit skeleton. Either way,
maybe a little bug report there. So, as
you can see, we now have our dev process
running here. We now have our
application running here at a real URL
that I can visit. And again, the moment
I go off network, I'm headed to my uh
daughter's dance class or something, I'm
working out of the car while she's in
class, I'm still able to access this
stuff as if we were on the exact same
network. All because of tail scale.
Okay, so that's tail scale serve. That's
Z remote. The last piece of this is
going to be open code remote. Now, open
code has their own thing going on. Now I
use open code as my primary way of uh
inuh integrating with AI. Now actually
before we even do that I I will say that
we check this URL to make sure this was
correct. If you want to stop you just
run tail scale serve and then the off.
You can also run tail scale serve status
and it's going to show you everything
that's being served from your computer.
I'm going to build a little UI for
myself for this because why not, right?
Um okay. So if I want to get open code
running on here, I am actually going to
change directories into the project
folder. So projects tail scale. I don't
believe you have to. Um and it might
actually complain because I already I I
think I already do have open code um web
running. Now there's open code serve
which you can run or there is open code
web. Now if you have open code installed
on your machine, you should be able to
just run open code web. And what this is
going to do is make this available as a
available web interface locally in your
app. Okay, this isn't going to do it
though because we also need to make this
available on the tail scale network and
host it as well. So we're going to need
to change the settings. We're going to
do open code web and then we're going to
use a hyphen
MDNS
which makes it discoverable on our local
network. So, MDNS and then you can give
it a port if you'd like or it will just
use the default port of I believe 4096.
So, when I hit enter here, it's going to
give us the uh network access. It's
going to give us a number of IPs. The
local IP, the network access, and then
the one that starts with 100, the 100
whatever is your tail scale address. You
can copy that from here. And uh again,
this is all running on the Mac Mini to
make that perfectly clear. And if I
paste that in here, it opens up my Open
Code instance. Now, I'm going to click
the plus button to open a project. I'm
going to search in my sites and projects
and then find the Tailscale app right
here and then click it. Now, what this
is going to do is open up your Tailscale
app in what seems like the normal Open
Code guey. The only thing is it's
running in the browser and open code
itself the processing is happening on
the Mac mini here. So if I have a
session here I want to go ahead and say
hey uh make the background green because
I'm lazy. Okay. And this is going to go
off and it's going to do its thing. Now
now I haven't found the open code uh web
like come on codeex. I haven't found the
Open Code web uh platform to be as good
as the guey or as good as the TUI. I do
prefer a guey 2A2E. Uh but sometimes I
find myself having to refresh on this
and stuff like that. So, uh there's that
side of things. But either way, this is
it right here. No. Um did it just tell
me to set the app background? You do it,
man. uh GPT 5 point uh uh codeex
whatever is just so lazy. Why would it
tell me to do it? You're the AI. You do
it. Or did it? Oh, and it did it. Okay.
It was just telling me to adjust it.
Either way, it did it. You can see. So,
if you wanted to get this work uh flow
going in here, um you could just say
make it blue. Okay. And you could sit
and behold as your uh AI agent does all
the magical work for you. First try,
perfect without messing it up. Now, I
will say the coolest thing about any of
this is that at this point, what you can
do if you have Tailscale installed and
turned on as your phone's VPN, what you
can do now is you can head to your uh
Safari, your browser, or whatever,
without installing any additional apps.
You can head to that same link, and I'm
going to go do that right now. The exact
same IP address. And let's see if I
could do the the Tik Tocker thing here.
Um, if you can see this, you can see
that this is the exact same open code
session that I'm running off of the uh
the web version or whatever. I'm running
it off of my phone now. Meaning that uh
if I want to be truly crazy, I could
vibe code something running on the Mac
Mini for my phone for my computer. I
could put down one, pick up the other,
and it's all just going to magically
work as long as every one of these
devices is connected to tail scale. I'm
going to tell you, using this setup, I
vibe coded a feature in a crappy
personal software app from the pharmacy
line at Target yesterday, and no, I am
not proud of that, but I did it. And you
know what? People are out here
installing a bunch of uh terminal apps
and stuff into their phones. Man, this
was pretty dang smooth getting this set
up. Okay, so that is my tail scale
setup. I have my editor connected via
remote SSH. I'm able to get into my Mac
Mini or my MacBook Pro or my NAS drive
from SSH anywhere in the entire world as
long as everything is connected to
Tailscale and I'm able to run open code
on the Mac Mini. Therefore, freeing up
my MacBook Pros processing to do things
like what? Record this video, right? Uh,
many times I had stuff running on my
computer that was causing my video to be
choppy and slowing my video down. No
longer because my dev process just runs
on the Mac Mini. Now, this setup is
going to become increasingly important
to me as I run and move more things over
there. Uh, and I I really am just
continuing to do that. I have found this
to be such a nice flow. Do you have any
critiques or comments or anything that
you would change about how I'm doing any
of this? Let me know. Drop it in the
comments below. Uh the biggest concern
about security here is one potentially
accidentally using funnel instead of
serve and then opening up things to the
wider internet that you might not have
known about. Now that's a whole another
thing. Uh if you ran tail scale serve,
there's not a whole lot of concern
there, but maybe you accidentally ran
tail scale funnel because you you asked
AI to do it and didn't know what it was
doing, right? Something to consider
there. Uh the only other thing is that
your tail scale account itself becomes
compromised because let's face it if
somebody's able to log into your tail
scale account they can install their
tail scale on their machine they can log
into your account then they can access
your entire network. Granted they know
the passwords or maybe if you have keys
set up maybe that all is just working
seamlessly. So as long if they end up
knowing the passwords they could SSH or
they could get into your network
possibly. uh not not like a huge
concern, but uh you you don't want to
just throw away a garbage username and
password. Make your username and
password on the secure. A way that you
can lock that down a little bit is to
have a setting where you have to approve
new devices that are added to your tail
scale network. So, that's something
you'll probably want to do. I'm sure
there's a whole host of things that I
should be doing on this as well. If
you're a tail scale pro and I left
something off or you want to clarify
something I said, please drop it below.
I'm happy to dive deeper. As always,
this is Scott with Syntax. I'll see you
in the next one.
