---
video_id: "w59QWE1CzMg"
title: "My Mac Is A Home Server Now And Yours Can Be One Too"
channel: "Jimmy Tries World"
topic: "hardware-homelab"
published_date: "2026-01-24"
ingested_date: "2026-02-27"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=w59QWE1CzMg"
duration: 1572
word_count: 6035
---
You just upgraded your Mac and now you
have two. But that doesn't mean this old
one is bad. It's just not as fast and
only slightly dented from those few
times that you dropped it. So I took
this old Mac and turned it into a NAS
Google Photos alternative media
streaming service and smart home
consolidator. So why are we doing this
in the first place? Well, three main
reasons. Self-hosting or running
network-based applications on your own
devices is a great way to begin
tinkering. Access functionality that you
didn't know your existing devices
already had. And you can also use it to
start weaning yourself off relying on
subscription services that we can all
agree we all pay too much for. And on
the plus side, N series Apple Silicon
Maxs are so power efficient, making them
great little machines for this type of
thing. Okay, maybe there's a fourth
reason, too. Having a server in your
home just sounds so freaking cool. Like
you're important or something. So that's
why I turned my M4 Mac Mini into a
server. Slow down, Jimmy. That's a
pretty new machine. What if I'm running
something older? Will I have the same
experience? You're absolutely right.
That's just what I'm personally using as
my own server. But for this video and to
demonstrate how this still works really,
really well with an older machine and
without exposing my entire networking
setup, I'll turn this older M1 MacBook
Air into a home server, too. Now, you
can also do this with older Intel Macs,
but I do think the sweet spot is with
the M1 Max because they can be had for
super cheap and the Mac Minis have
pretty much every port you'd want to use
or when they're on sale, you can splurge
a little bit more to get an M4 Mac Mini.
You can also do these very same things
with a Linux machine or Windows, but the
steps are going to be a little bit
different depending on what you're
doing. But for this video, it's going to
primarily focus on the Mac as a server.
All right, now I'm going to drop a
little bit of bad news. Regardless of
what Mac you do decide to choose, you'll
run into some limitations of even trying
to turn a Mac into a server that I want
to address so that you have a smooth
experience for yourself. So, when you
boot up a Mac, you get greeted with the
dreaded login screen. The thing is,
without getting past this screen, the
Mac doesn't start all its login items.
So none of your apps will boot up until
you log into the machine. This also
includes things like remote desktop
software. So you're not able to boot
this up remotely if something goes
wrong. So if a power outage happens or a
software update that reboots the system
is needed, it makes it super annoying to
troubleshoot because this means you have
to be directly connected to this device,
making headless Mac setups like with a
Mac Mini or a Mac Studio kind of suck.
But there are different ways to fix this
depending on the type of Mac you're
using. For desktops, a UPS or
uninterruptible power supply would help
with random power outages and keep the
system on during short outages and help
you shut down all your stuff safely
during long ones. Just keep in mind that
the batteries in UPS's do need to be
replaced every few years since a lot of
the budget friendly ones are heavy lead
acid batteries. You'll also need a way
to log in from this screen and you can
cheat that a bit with an IP KVM. I
personally use one by Jet KVM, but
there's a few other options out there
that do basically the same thing. These
things plug directly into your Mac or PC
and act as its display, mouse, and
keyboard as if it was actually plugged
into those accessories, but it's all
accessible on your web browser when
you're on the same network. So, you can
access the computer even at this dreaded
login screen in recovery mode or even
BIOS's on Windows PCs. And all this from
your web browser. And the benefit of
using a headless Mac Mini or a headless
Mac Studio is that these things can
literally live anywhere like in a media
cabinet without taking up a ton of
space. And since they look decent, they
feel like they belong wherever you
decide to put them. But what if you're
turning a MacBook into a server, though?
It's a bit oddly shaped and probably
doesn't fit as neatly into different
places. But you basically get a built-in
UPS already. The battery. Regardless of
which platform you're using, we need to
turn off automatic sleeping and need to
make sure that the MacBook is plugged in
so that the MacBook stays alive. An
IPKVM could also still be useful for
initially logging in. MacBooks don't
come with a lot of ports, so you'll need
a USBC dongle to add all the different
ports you might want to use with this
server. I'd recommend one with Ethernet,
USBA, USBC, and HDMI, as well as some SD
card slots. So, regardless of form
factor that you decide to choose,
there's going to be some compromises,
but also some workarounds to make up for
it. But what about upgrading the other
devices in our lives and making sure
they all stay charged? And you can do
just that with today's sponsor, Anker,
and their Anker Prime 300 W power bank.
and Anker Prime 160 watt charger. The
26K 300 watt power bank is a
top-of-the-line power bank with a large
capacity of 26,250
milliamp hours. It can support up to 19
hours of video conferencing on an M4
MacBook Pro and 4 days of video
streaming on an iPhone 16 Pro Max. And
it has industryleading 300 watts of
output. I didn't stutter. 300 watts of
total charging output to its three ports
with each of the USBC ports capable of
140 watts of charging. It also recharges
itself super fast when you plug the
power bank into two USBC chargers up to
a total of 250 watts, netting you 50% in
just to 13 minutes. That's the same time
it takes you to go brew yourself a cup
of coffee. It's the maximum capacity
allowed on airlines, so it can travel
with you, too. and all your charging
details are viewable on the smart
display or through the Ankor app, so
you'll always know exactly what the
status of your power bank is. Then, on
the other hand, the Anker Prime 160 watt
charger is the world's most compact 160
watt charger. It has three USBC ports
that can each individually provide 140
watts of power, but a total of 160 watts
across all three ports. It uses Anker's
GAN Prime 2.0, which is five different
technologies built into it, including
Power IQ 5.0 0 to support dynamic power
distribution across the three ports.
Active Shield 4.0 that runs millions of
temperature checks throughout the day.
In summary, it's pretty feature- packed.
Just look how small it is compared to
Apple's 140 watt charger. And just like
the Prime Power Bank, the Prime charger
also has a display to help you keep
track of your charging details and
matches perfectly with the same design
language as the Prime Power Bank. So, if
you're interested in the Anker Prime
power bank or Anker Prime 160 watt
charger, check out the link in the video
description below. And thanks again to
Anker for sponsoring this portion of the
video. Okay, so what if we don't want to
go through just throwing money at a
problem, rightfully so, you shouldn't
have to. You can actually configure your
Mac to automatically turn on during a
power outage and to auto log in every
time the computer boots up. This solves
getting past that login screen on boot
up automatically. But keep in mind that
the auto login requires disabling file
vault, the drive encryption feature on
the Mac. This basically bypasses any
lines of defense of getting into that
Mac if a suspicious person has physical
access to it because if they do, they
can do basically whatever they want to
it and the account connected to it. It's
a pretty low chance, but it's not a zero
chance. You just never know what kind of
suspicious actors are around you. A UPS
and KVM is safer, but the auto login is
so nice and less handholdy. It's cheaper
and it's dead simple to get up and
running. Also, for every app you
install, make sure to have them start on
login so that you don't need to manually
start them up every time the device
reboots. And one final tip before we dig
too deep into this. While you can use
Wi-Fi for your Mac server and it will
work fine if you have a good Wi-Fi
connection, consider plugging the Mac
into Ethernet. This will give you the
most stable connection and will give you
the best experience overall. Okay, so
now that we have a baseline setup that
works even if power outages happen,
let's talk about the type of apps you
can run on your Mac that would make your
whole life a lot easier. We can separate
this into two categories. Features that
are already built into Mac OS that you
can just turn on with a flick of a
switch and third party apps that are
amazing but require a lot more tinkering
to set up properly. This isn't going to
be an entire list of things that you can
do, but these are ones that I personally
use or think might be useful for you to
look into as well. So, let's start off
with one that everyone knows and is
super easy to set up. AirDrop. We all
know what AirDrop is. It's available on
every single Apple device that you
pretty much own. And you can actually
use the AirDrop function between your
Apple device to quickly send a copy of
important files directly to the Mac,
giving you a nice backup that's stored
on your Mac server. Since Airdrop
automatically saves all incoming files
directly to the downloads folder, if you
don't mind tinkering just a tiny little
bit, you can take this step a bit
further and write a script using
Automator on Mac OS to move certain file
types to specific folders on that
server. You can get really detailed and
organized with this, like sending PDFs
to one folder and photos to another.
Maybe you store it on a external drive
that's connected to the Mac server. The
options are limitless. But if you're not
strictly an Apple user, you may want
something much more robust than just an
AirDrop machine and one that works with
Windows and Linux, too. So, to solve
this, you can actually turn your Mac
into a miniature NAS. In Mac OS 26,
under settings, general, and sharing,
there's a file sharing toggle that you
can turn on and then set parameters for.
You can even use this to include folders
on external hard drives. So now you can
make use of the storage on your Mac or
plug in any drives that you have laying
around to use as a NAS. This is super
convenient if all you need is a dead
simple NAS setup to make a shared drive
across your entire home. You could even
grab those external hard drive
enclosures, plug it into your Mac
server, create user accounts for other
users you want to give access to, and
voila, a barebones simple to use NAS.
But one last cool function I want to
mention that you can use with this mini
NAS that we just created with file
sharing. We can also use that same
external drive as a time machine
location for other Macs on your network.
So you're able to create backup
snapshots of all your other Macs
directly to this location. In my
opinion, you can never have too many
backups, just lack the space or money
for all those backups. That same sharing
tab also has a bunch of other cool stuff
that I haven't personally tried in
detail, but these can be super helpful
to you, too. Like media sharing to turn
your Mac into a media server. Content
caching to speed updates on all your
other Macs by pulling available update
info from the Mac. And printer sharing
to turn any random printer that you own
into a wireless printer that can be used
across the network. There are some
really neat stuff here that I could see
someone spending a few hours tinkering
with. I've just personally not used
them. Okay, so that's what's built
directly into Mac OS. But it gets really
cool when we move on to thirdparty apps
that either expand upon those features
or just give you a ton of new features.
Let's start with probably the most
common one, Plex. Plex is a way to
organize and access all the media that
you own in an easy to use UI. It also
grabs the metadata of all your files to
match it with all the relevant
information about that show or movie.
Basically, it's like your own media
streaming service with all the content
you have on that computer. obtained
legally, of course. Plex Media Server is
super easy to install. Just literally go
to their website and download it. You'll
have to make an account, tell the server
where your files are, and then download
the app on anything you want to watch
your stuff on, like your phone, tablet,
laptop, smart TV OS, and then log in.
That's it. All of your media is now
available to stream from within your
home. The Plex app is available on
basically every major platform that I
can think of, and by default, it really
only works on devices that's on the same
network as the Plex server. But there
are ways to open it up to be used
outside of your home, too. But we'll
talk about that a little bit more later.
Then there's one of my favorite tools,
Sync Thing. Sync Thing lets you select
folders on one device and sync them with
a folder on another device that also has
Sync Thing installed, making sure that
they, like the name implies, keep their
files in those folders in sync with each
other. It's a super functional tool, and
you can do a lot with it. You can even
do things like a three-way sync between
three different computers. Keep your NAS
in sync for redundant backup. Make one
device only receive syncs instead of
syncing items from that device to other
devices. There are so many options with
this tool and it's my go-to tool in
making sure everything across computers
and NAS sync the way that I like it.
It's like Google Drive sync or one drive
sync if you ever tried those, but on
storage that you own and not on a
subscription plan. But full disclosure,
it does take like an hour or two to just
figure out and understand what the heck
this app does and get it up and running.
It's not the easiest app for people just
getting into it, but trust me, it's
worth it and becomes pretty hands-off
once you get it completely sorted out
and configured properly. Once I had it
fully set up, it just slowly chips away
at my sync tasks in the background
without any intervention from me. That's
all I ever needed. Once you have Sync
Thing set up, all you have to do is
designate a folder on the server's Sync
Thing instance as a shared folder and
add the other device as a remote device.
From there, switch over to the other
devices Sync Thing instance and choose
what folder to pair with the one you
chose on that server. Then they'll sync
their files, making sure both sides
contain all the files that the other one
has. I cannot stress this enough. Please
play with the settings to really find
exactly how you want them to sync and
the way that they work. Okay, so maybe
like me, you're really into smart home
tech. Maybe you have a few Google Homes,
some smart lights, some smart TVs, some
cameras, locks, whatever. Then you've
probably also encountered the same thing
I have, which is what happens when you
end up owning too many smart accessories
that just don't talk to each other. Your
smart home setup truthfully isn't smart.
It's kind of dumb. If only there was a
way to make them all communicate with
each other no matter what. Well, that's
what Home Assistant tries to accomplish.
It's I know another smart home platform
like Google Home, Smart Things, and
Alexa, but unlike those platforms, it's
able to take devices that only work on
specific platforms and make them work
with all your other platforms, too. So,
you can actually either use Home
Assistant as its own platform with
everything consolidated there, or use it
as a middleman that makes all of your
devices work on your favorite platform.
As always, this does require a bit of
tinkering and playing around to get it
exactly the way you want it. And if you
are trying to make it your main smart
home platform, expect to spend a ton of
time messing with it. Trust me, this is
a rabbit hole all on its own and one you
want a lot of time to get this up and
running right. There's even a mobile app
just like other smart home platforms to
control or configure devices from your
mobile device, too. Now, there are two
ways to go about Home Assistant besides
getting their own hardware. You can
install it in a VM on your server or
through a Docker container on your
server. Both are pretty easy to do, but
the VM or virtual machine version, Home
Assistant OS, lets you get a bit more
functionality with local backups and the
ability to add in thirdparty add-ons.
And that's my preferred route. If you
don't know what virtual machines are,
it's kind of like running an OS within
an OS using VM software like Virtual
Box, VMware, Parallels, or UTM, and it
just runs that OS in another window.
From there, use the link provided by
Home Assistant, and you can start
connecting your different smart home
devices and get to tinkering with it.
Now, I think it's a good time to talk
about what Docker is because so far,
every third-party app that we talked
about has had a dedicated app that you
can just download and wow, setup is so
easy. But all the apps that I talked
about also have Docker versions. Docker
becomes kind of unavoidable if you're
looking to do some really cool stuff.
Docker is an open source program where
you can just run programs in dedicated
little containers. So, this is their own
little instances without the need to
have VMs running in the background. This
keeps everything quick to set up and all
in one place to turn things on and off
as you need it. But if you have minimal
knowledge of Docker and Terminal where
you have to write commands, it is very
daunting and requires a little bit of
learning to get your first container up
and running properly. So you'll be a lot
more hands-on. And be prepared for this
because if that's the route you want to
go down, you're going to be spending a
lot of time with it because the next few
apps that I'm bringing up are strictly
Docker apps. So I'd skip ahead to the
time stamp right here if you don't want
to hear about it. Okay, this is an app I
truthfully absolutely love, but I don't
think it's 100% there yet, and that's
Image. Image is a Google Photos
alternative with many of the same
features that you would expect out of
Google Photos, except it runs on your
own machine. There's face detection,
albums, geo tags, an app that you can
upload through, and a pretty simple to
understand UI. My biggest issues with
Image is that it's currently Docker
container only to install and there's
some funkiness with it from time to
time, but overall it is relatively
stable. Image is something I still use
in conjunction with Google or Apple
Photos because it's just nice to have
another backup of something that's
sentimentally important like photos, but
Image genuinely has gone really good
really fast. So, my opinion on this app
may change in a few years, especially if
they make it as easy to download and
mess with as like Plex or Home
Assistant. But if you're very
comfortable with Docker and don't mind
maintaining things yourself, I'd suggest
checking it out. It's pretty good and
very feature- packed already. But there
are so much more that we don't have time
to talk about, like Adguard Home to
remove ads across all of your devices on
that network. Channels DVR to turn TV
channels into live streamable content.
And I highly recommend looking into what
might be useful to you. Because while I
think I got good taste in apps, you may
feel completely different and want to
use completely different applications.
And that's okay. I'll leave a link in
the video description to a site that has
a list of a ton of them for all kinds of
use cases. Okay, cool. We have all these
different apps. Now, now what? Well,
you'll want a way to keep track of all
of them. And the way I like to do this
is through another self-hosted app for
Docker called homepage. The name makes
it obvious, but this creates a
userdefined homepage for whatever the
heck you want on there. So, you can set
it up to link it to your Plex server
setup, your Sync Think setup, a NAS, or
even links to pages on the internet.
Mine is pretty bare bones since this is
a demo page, but people have made some
really cool stuff with it. But of
course, just like with everything else,
it requires a bit of tinkering to get it
exactly how you want it. But if you're
just doing something simple, you can get
something up and running super quick.
Homepage has great resources on their
site on how to get started, too. Okay,
so all the apps that we talked about in
this video are self-hosted apps that are
running locally on your Mac, but are
still accessible to anything else that's
connected to the same Wi-Fi or your
local network. But you know what, Jimmy?
I'm not a coder. I'm not a programmer.
I'm not like a super computer guy. How
do I access these apps? Fair enough. I'm
not a coder or programmer either. It's
not like Docker creates an app icon for
you, right, on your computer when you've
created container. So, how then? Well,
pretty much all the third party apps we
talked about can be accessed with an IP
address and a port number. An IP address
is like a regular real life mailing
address. It tells you where something is
located so that data can be sent to the
right location. Every device connected
to your network, whether that be through
Wi-Fi or Ethernet, will have an IP
address associated with it. But of
course, oftent times in the real world,
addresses lead to buildings with
different units in them, like
apartments, condos, or different
offices. And IP addresses are exactly
the same way. They have port numbers at
the end of them that lead to specific
functions. So, remember all those
different apps that we installed? Each
of them are accessible by typing in your
Mac server's IP address alongside their
associated port number onto your
browser's address bar. This takes you
directly to that app or services page to
do whatever the heck you're doing. All
this is within your network. So just
because we typed it onto our web browser
does not mean that it's all online for
the world to see your embarrassing
photos. It's just using your web browser
as a way to access what's on your home
network. So you can do a bit of an
experiment if you want. Just use your
phone's data plan and try accessing
these addresses when you're not
connected to your home network. it would
just outright fail. So, what I like to
do is set up these IP addresses and
ports [music] as links and homepage.
That way, I can just quickly navigate to
the different service that I'm trying to
open up. This way, I don't have to
always constantly remind myself or type
out the different IP addresses and port
numbers. You can, however, set up custom
internal domains as well, but that's a
completely different topic altogether,
but they are very convenient. Okay, so
now that we have access to the Mac
servers apps, we still need a way to
access the Mac itself when we don't have
physical access to it. We can do that
with something like an IP KVM like the
Jet KVM that I mentioned at the
beginning of the video. But having a
remote desktop app installed on the
server as a backup would be great, too.
I personally like Jump Desktop. It runs
smoothly even on not so great
connections. I used to use Jump Desktop
a lot, especially while I was editing
YouTube videos by remoting into my
desktop Max at home from an iPad that
was well like in a hotel room and it
felt like I was at home. Video and audio
playback on it is stable even on slower
hotel Wi-Fi and the picture quality
isn't always the sharpest, but damn,
it's stable. That's probably the nicest,
greatest compliment I can give it. It is
a onetime payment and well worth it. And
I have tried free alternatives, but just
couldn't find anything as stable or as
reliable as Jump Desktop. and as fast
for my own needs. However, so far the
only issues I've encountered with it is
I can't seem to get it set up right on a
MacBook that's closed and connected to
only power, but it works fine if the
MacBook is left open or when it's closed
and connected to a monitor and power.
So, honestly, pick your favorite flavor
of remote desktop, test it out, and then
pick whatever works out best for you for
the type of setup that you got going on.
It's not one sizefits-all here. And with
that, we now have a nice little Mac
server that we can use to run different
apps and maintain all from inside of our
home network. Wait a minute, inside the
home. What about outside the home? What
if I'm traveling and staying at a
family's place or a hotel? What if I
want access from my phone using cellular
data? Those aren't my home network. How
am I going to access my storage or back
up my photos? There's two really good
ways to approach this. The first option
is to set up a VPN server like
WireGuard. This is typically installed
on your router itself and does require a
little bit of work and fiddling with
your network's firewall, so it's not fun
if you're not the most tech-savvy. This
basically turns your home network into a
VPN that you can connect to from a
device that's outside of your house.
It's kind of scary and a bit of a pain
because messing with your network's
firewall at home could potentially be a
dangerous game, and you don't want to
leave an opening for bad actors to come
in because you're exposing a small
little hole in your home network to the
internet. Some routers will have this
feature built directly into them like
with Ubiquiti or ASUS making your life
just so much easier with less room for
error. But then there's the second round
and that's with tail scale. Tail scale
creates separate VPN tunnels based on
WireGuard for all the devices that have
it installed under a single account and
then assigns it a tail scale IP address.
This is in addition to the IP address
that your device already has. So if you
have your Mac server on tail scale and
your laptop on tail scale, regardless of
what network they're connected to, they
are able to see each other and talk to
each other. And now while they have
these separate assigned tail scale IP
addresses, the port numbers for each of
the apps that you use will still be
exactly the same just now using the tail
scale IP address for that device. This
is what I do for my NAS to access them
from outside my house. A traditional VPN
gives your devices access to the entire
network. While tail scale limits the
communicating devices down to just those
with tailscale installed while allowing
those devices with tail scale installed
to still be accessed by and access other
devices on that same network. So that
Mac server connected to tail scale can
still be accessed at home using the
regular IP address while I can also
connect to it from a completely
different location with tail scale on my
laptop or phone through its tail scale
IP address. That being said, there are
good reasons why you would choose one
over the other. Just for example, some
apps like Sync Thing and Image can start
using the tail scale IP alongside the
regular IP right off the bat. But some
of the other apps need to be updated to
acknowledge that Tailkill IP like
setting it to the custom server access
URL in Plex, configuring allowed network
hosts in homepage or installing the tail
skill add-on for Home Assistant. So make
sure you look into your own app's
specific needs and the updates you'll
need to make if you go that route.
WireGuard typically provides a faster
connection and doesn't rely on tail
scale servers at all. It's 100%
self-hosted and you don't need to
reconfigure apps to account for a second
IP address. For me personally, I use
both depending on the situation. And
lastly, to finish everything off, make
sure every app that you installed is set
up to automatically start when you log
into the Mac. Most can be configured to
do this in their settings, but some,
like starting a VM, did require me to
make a quick little automator script to
attach it to my login items. This saves
you time from needing to open up every
single app when your machine logs in.
It's a nice little finishing touch to
everything because now everything's a
bit more automated without requiring
manual intervention. Okay, I've had all
these apps set up for myself for a while
now. How has it been for me? The Mac
server project has been holding up
great. It's nice knowing that I can take
a Mac that I wasn't using much anymore
and give it new life, a new purpose. I
now basically have a way to back up my
Mac, sync my files, run a media server,
back up my photos, all in a quick but
still easy to view way, and a way to
consolidate and manage my smart home,
too. All these apps and the server
itself can be accessed when at home or
I'm away. Having it all in my Mac, all
in one device made me realize that this
is really close to what I consider my
endgame. I don't know what else I need
this thing to do because it's already
doing everything I need it to and doing
it well at that. And at least for this
video, I've been running this M1 Air
server for a while, too. And that's been
quite stable for a home environment with
no dips in performance either. Though, I
think having more RAM than the default 8
GB would be beneficial since running all
these apps does get close to maxing it
out. And the M1 MacBook Air also gets
quite warm while active. Like I said
throughout this video, at the end of the
day, this is a project and that means
it's something I had to spend time
setting up and spend time even now
occasionally maintaining it or tweaking
some settings to optimize the entire
setup. Whether I like it or not, and
it's usually not, this might be fun for
some people who love playing with this
stuff or could be a huge pain and a
headache for people who just want
something to just work and this just
becomes another chore for them to do.
And that's why the subscription
alternative of these self-hosted
services are just so popular. They're
convenient and just so much easier to
use and set up. You don't need like a
freaking degree to know all this mumbo
jumbo. But I can't argue with the actual
results of all the time spent tinkering
and getting it right. It's pretty nice
once it's all up and running. And just
knowing you control the whole thing
without being charged by a company to
just exist is a great feeling. And I
don't think you'd regret trying to do
this either. It just takes a bit of
time. So, I hope your own journey is
just as fun. Just make sure you maintain
it, too. Well, that's how I got my own
Mac server set up. I try to make this
video as easy as possible for anyone
watching this to follow along without
making this just a giant step-by-step
tutorial of how to implement all of it
because your overall setup or even your
system you might use might be completely
different from mine. But, you know, I
want to know what you personally think.
Are you thinking of taking one of your
old Macs and giving it a new life? Are
you thinking of turning it into a
server? What are you planning on doing
with it? Because these M series Max are
just so good. You can make them do some
pretty cool stuff. Let me know what you
think in the comment section below. And
I'll see you all next time. Bye.
