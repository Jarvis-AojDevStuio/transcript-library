---
video_id: "uGyY2PFN8o0"
title: "M4 Mac mini - The Perfect Home Server!"
channel: "Stephen Robles"
topic: "hardware-homelab"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=uGyY2PFN8o0"
word_count: 3001
---
this is my old usted Mac Mini and here's
the new M4 Mac Mini come on I'm not
really going to throw it I'm replacing
my old Intel Mac Mini with an almost
base model M4 Mac Mini and I'm basically
shoving it in a cabinet to do a bunch of
things behind the scenes as my home
server so I'm going to show you how I
set it up for Plex Home brdge doing
things with my family iCloud accounts
give you a little background on my
networking setup and what makes that
possible and why this little machine is
really close to perfect so this is the
almost base model M4 Mac Mini the only
thing I upgraded was the SSD and I
brought it up to 512 The Mach mini that
I'm replacing which is right here had a
256 SSD and I was nearing that limit so
I just wanted to get a little more now
just to give you an idea here's the old
style Mac Mini and space gray wish the
new one came in colors I mean just look
at this concept but you can see how much
smaller the new mini is compared to the
old one and here's actually the newest
4K Apple TV if you want that comparison
as well thickness wise you can see the
old Mac mini versus new versus new Apple
TV and the new Mac Mini is the tallest
but you just cannot beat this compact
size and this is going to be perfect
when I shove it in a closet and never
look at it again and before I go plug it
in I love these two USB ports on the
front because this is mainly going to
run headless and the few times I want to
plug in a keyboard and mouse these are
going to be really convenient and on the
back I hardwire it via Ethernet I do
have some Thunderbolt accessories I want
to talk about and for the HDMI port I
was going to connect this to my receiver
but I was actually having some trouble
with that so I'm going to use this thing
which I've been using for years it's
basically a little HDMI dongle and it
makes the Mac think it's connected to a
4K display this way when you screen
share over the network or use an app
like screen I'm going to show you how I
have that set up you actually get a nice
big display rather than kind of that
smaller window so I'm going to go plug
this back in and then I'll show you how
I use it so this M4 Mac Mini is actually
going to live in the entertainment
center in my family room connected to
ethernet several USB devices including
an Elgato video capture device which
I'll get to in a second a webcam and it
lives alongside my UniFi little mini
switch here as does the Apple TV that I
just showed you and then as far as the
full Network side I have a closet here
with a ubiquity system I have a dream
machine SE another switch Plus have my
senology nass and two apcs making sure
everything stays powered up now if you
want to go back and see me like wiring
the house and doing the entire network
setup I actually have a whole playlist
called building a smart home and I
actually walk through it like from the
studs like me running cables so you can
check that out up here but once I
started up the Mac Mini and put it in
that cabinet I'm probably never going to
see it again and it was tough but I push
that power button the one time I'll
probably ever touch it now how I
normally access it is either from a Mac
either my Mac Studio here or my laptop I
just share the screen and I have a few
things that automatically open so I have
this Mac Mini to set up to Auto log in
to my account and I feel pretty secure
because it's headless there's no other
way to control it except when I share
the screen or use the screens VNC app so
you can have that set if you go to the
Apple icon and system settings then go
down to users and groups and here you
can set one to automatically log in and
I have it do it as myself also if you go
down to the lock screen settings I have
this start screen saver never because
it's not actually connected to a display
so it doesn't matter and turn display
off never again cuz I'm using that
little HDMI dongle and so this actually
doesn't matter because this thing just
never goes to sleep it is always awake
and that's kind of the biggest benefit
of having a little Mac Mini Server is my
Mac Studio my studio display I don't
want those on all the time but I can
have this little M4 Mac Mini always on
always at the ready to do whatever now I
have several login items when this Mac
starts up which I also have it under the
energy settings to start up
automatically after a power failure but
if you go down to General and then go to
login items this is where you can set
everything to automat atically open so
if it starts up after power outage
automatically logs in at myself I know
that this Mac Mini is always going to be
in this state and I open some
applications here I can't talk about
this one although I'm going to allude to
it in a second but I have Hazel for
managing files it connects to my Plex
server which is that sonology nass in my
closet that I showed you it opens screen
connect and transloader now I'm going to
start with hazel because it's a super
powerful application I run it on all my
Macs one of the reasons I love Hazel
it's this little broom icon here in the
menu bar just runs in the back
background and if you ever want to
delete an app that you didn't install
from the App Store it has a great
feature called enable app sweep and even
multi-user sweep so if you delete
something like when I accidentally
bricked my iPad Pro and deleted that
weird IM my phone app this searches your
entire library for files associated with
that app and will delete those as well
that feature alone worth the price of
admission but Hazel you can actually
create rules to move files to certain
directories or folders as they appear so
this Mac Mini has a rule where anytime a
video file hits the desktop with an mp4
orov extension it's going to move those
files to my Plex server which is why I
automatically have the Plex server
attached to this Mac Mini and I have a
folder here called YouTube which I'll
get to in a second now having a server
like this always at the ready you can
probably use Hazel to do lots of
powerful things and I want to be
figuring out some more things to do with
it I never wanted to overload this Intel
Mac Mini and I also just wasn't crazy
about having my iCloud account and stuff
sinking with this old of a Mac and being
Intel maybe that's par oid but I just
wanted Apple silicon everywhere now the
other way I'll access this Mac if I'm
not locally at my house is screens this
is an app from adovia screens connect is
super powerful you install the utility
on the Mac you want to access and then
you can have apps on your iPhone your
iPad or other Macs which lets you VNC
into those computers from anywhere you
see it automatically quickly vncs into
the computer I can use my iPhone screen
as like a trackpad I can zoom in on the
display and really use this computer
from anywhere I don't typically like
having a VNC running on my main Mech all
the time so the mech mini always on is
another way where I can Network into my
house from anywhere in the world but I'm
not keeping a ton of sensitive
information on that particular computer
now like I mentioned the one thing I
updated on this Mac is the SSD which I
like going to view show status bar and
then you can kind of check the available
space so I have under 300 Gigs available
which I feel this is going to last me a
long time again because most files just
get moved to the Plex server now kind of
my most common use case here and I'm
only going to be able to talk about it
in general terms is I use the app called
trans loader you can have trans loader
on a Mac and I have it installed on
multiple Macs and then you can have the
app on your iPhone your iPad and your
other iOS devices and transloader
basically lets you take any link or
basically anything from the share sheet
so if I was here like in YouTube I can
hit the three dots I can go over and hit
transloader then I can send this link to
any of my computers including the M4 Mac
Mini now once transloader gets that link
you can have settings here where
transloader decides what to do with it
it's here under the actions window now a
lot of the links I'm sharing are of a
particular kind and so I have those
links automatically sent to this
application and then that application
does some other things and moves it to
my Plex server now I can't tell you all
the details about what I'm doing there
but I will put a sneaky link down in the
video description if you would like to
see my whole process and talk about
those two apps in more detail so it's
down there now technically you can move
your photo library on your Mach and you
can go to photos settings and here
actually choose a different Library
location now I try to do that on my Mac
Studio and it gets a little weird saying
it's going to stop iCloud syncing and
all that and I asked the ATP guys and
they said they really like keeping their
iCloud photo library on the local SSD of
their Mac so for this one I'm actually
going to move this to my sonology
basically by going to my sonology and
copying it somewhere in my home folder
that's going to take a while but then
I'm going to point this iCloud photos
library to that library and see if it
SNS so subscribe follow along because
I'll be doing that soon and I'll let you
know how that process go goes I'm a
little nervous I'll be honest but we'll
see the other two big use cases I do
regularly is my kids have iCloud
accounts and they're in an iCloud family
but they're not attached to a Mac
because there's no family Mac so what I
like doing is actually having their
accounts logged into a Mac if I ever
need to manage it or change screen time
settings and this way it's syncing now
to an Apple silicon Mac because I found
having the Intel one as part of the
iCloud family was a little funny plus
they can also log in as their user which
comes for this second big reason my
middle son wants to do more video game
streaming for fortnite and because he
doesn't have a Mac available streaming
that and doing a video camera is really
hard so this M4 Mac Mini is going to
become a mini streaming machine now I've
used ecam to live stream before that's a
great option I'm actually going to use
Riverside to live stream cuz I can also
get high quality recordings and that'll
be saved to my Riverside account in the
cloud rather than the local Mac so it's
not going to be taking up as much SSD
space disclaimer yes I work for
Riverside but yes I also just use it for
primary Tech my video podcast which you
should totally watch it right up here
now I use Brave when I'm using Riverside
or for anything that I need a Chromium
browser for and just so you know there's
actually an iCloud passwords extension
that you can add to Brave or Chrome or
Microsoft Edge so you don't have to save
passwords to the local browser and I
typically pin it up here in the toolbar
and now I have all my iCloud passwords
synced in this browser but nothing Sav
locally to Brave it's still my iCloud
passwords so I can log into my Riverside
account again this is the M4 Mac Mini
that's by the entertainment center in
the family room of course you have to
approve all the permissions like camera
and microphone for the first time you're
doing anything and you might have seen
this in the the cabinet but I have the
Elgato hd60 that video capture device
connected to the Mac Mini that's what
I'm using one of those Thunderbolt ports
for on the back I can use it for the
camera and microphone input here so
that'll go to the live stream and it has
HDMI pass through so the audio is
automatically going to go out now
instead of using that for the mic I can
also connect a USB microphone which is
why I have that other extra USBC cable
connected to the back and then once my
son starts up his PlayStation and he's
streaming I can then add things like
twitch a YouTube channel or any rtmp
destination and then you could have a
USB microphone that Elgato cap that
Elgato capture device is right here and
the M4 Mac Mini is going to be great for
streaming that I mean the Intel 1 could
kind of handle it but I'm not going to
have any issues I know with an M4 just
doing like 1080p streaming and the great
thing about the screens VNC app is I can
set it up on his iPad where he can
actually VNC into his account here on
this Mac and start the live stream it's
annoying enough where he probably won't
do it all the time and of course it
still has all the screen time parental
controls but but it makes it possible
where he can do the streaming he can
start record it do all of that all being
powered by that tiny little machine in
the cabinet now one of the things I was
using the older Mac Mini for was
homebridge and if you're not familiar
homebridge is kind of a third-party
hacky way of getting smart home devices
that are not directly homekit compatible
into your home app now you can install
homebridge a variety of ways doing it
through home brew but I've used it a lot
in the past I used it with my old Roomba
Vacuum my viven security system and I
thought about doing it for my home
theater receiver and the Tesla that I
have CU you can actually get all of that
in the Apple home app in my experience
using homebridge multiple times in the
past it can get a little flaky the
accessories don't respond you get all
the errors because they're not
officially licensed and you have to keep
up with updating homebridge with
updating python I think it is and then
updating the plugins I've decided I just
don't want to do that and so if you have
a Mac like this in a closet homebridge
is a great option I know there's a lot
that use home assistant and that might
be a more powerful option I might look
into that but let me know down in the
comments are you going to use something
like a Mac Mini or do you use a
Raspberry Pi for homebridge or home
assistant and do you find it worth it
like what accessories actually make that
worth it let me know but if you have any
questions about this setup like hazel
transloader or more just leave comments
below this video I'd love to answer you
there don't forget to subscribe to the
channel and hit that like button I
recently went over all the updates to
Mac OS aoia 15.1 which I can actually
get apple Intelligence on this but all
the features I go over in this video
right here are actually not Apple
intelligence they're just for any Mac
that runs Mac OS aoia like iPhone
mirroring with dragon drop and more and
if you want to learn more about my smart
home I actually did an entire tour with
all my smart home devices I'm going to
be updating that tour for 2025 but you
can see the last version of it right
here over a 100 Apple homekit devices so
hope you enjoy that too thanks for
watching I'll catch you next time
