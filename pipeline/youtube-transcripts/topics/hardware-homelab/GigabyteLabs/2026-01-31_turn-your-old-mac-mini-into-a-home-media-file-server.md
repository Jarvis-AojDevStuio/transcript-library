---
video_id: "B_CCzQAixxg"
title: "Turn Your Old Mac Mini Into a Home Media & File Server!"
channel: "GigabyteLabs"
topic: "hardware-homelab"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=B_CCzQAixxg"
word_count: 2737
---
what if you could turn that old Mac Mini
in your closet into your own private
streaming service file storage and
backup system Allin one well today we're
going to do just that we'll dust off my
old Mac Mini and give it a second life
as a digital Hub all for just under 300
bucks but is the Mac Mini up to this
task let's find out Fick and go from
dust to
[Music]
Glory hi this is Brad from gigabyte Labs
so do you have an old Mac Mini in your
closet Gathering more dust than a Roomba
mine's been sitting on a shelf for
several years after I bought it to
replace an older Mac Mini but I was
disappointed with the performance of the
new one so it wasn't long before I
switched to something faster and
relegated the Mac Mini to my closet
shelf mine is the 2018 series Mac Mini
with a quadcore Intel I3 processor 8
gigs of RAM and a 256 gig SSD drive if
it wasn't the cheapest model then it was
pretty close to it it does however have
plenty of Thunderbolt and USB ports
which allows us to connect fast external
storage which is exactly what we'll need
because 256 gigs is nowhere near enough
space so here's what we'll do we'll
start by looking at two different
options for adding storage to our Mac
Mini Server then we'll share some
folders and start streaming our media
and we'll also configure it to be a time
machine backup server that we can use to
safeguard our other Macs the big
question though is that this will all be
fast enough to keep up with streaming 4K
video so we'll check the performance at
several points along the way sound good
well then let's go shopping I think it
was Benjamin Franklin who said There are
two kinds of people in this world those
who have lost data to a hard drive crash
and those who will or maybe that was
Winston
Churchill now I spent over two decades
working in it so my first impulse was to
use hard drives in a raid enclosure
which is like keeping a backup copy of
everything in case a drive crashes raid
is standard practice on servers so
that'll be the first option we look at
then we'll compare that to our second
option which is much simpler but perhaps
not quite as safe
now there are lots of different ways to
set up raid but we want to keep things
simple and inexpensive so for our first
option we're going to use Raid level one
which is simple dis
mirroring so we'll have two identical
hard drives and the raid Drive will
write to both of them simultaneously so
that we essentially have a full backup
at all times these days I wouldn't
settle for anything less than 4 tabes of
storage so we're looking to buy two 4 TB
hard drives plus a raid enclosure that
can give us good transfer speeds and I
won't keep you in suspense I'll just
show you what I ended up selecting I
ordered two Western Digital red 4 tbte
hard drives at 100 bucks a piece which
are the nas rated drives that are
slightly higher quality than the regular
consumer version Western Digital is an
excellent brand that I've used for
decades so I have no hesitations about
recommending them and I also selected
this dual Bay Drive enclosure that does
raid and has a 6 gbits per second
transfer speed there are some with
higher transfer speeds but the hard
drives we chose are only capable of 6
gbits per second so when anything above
that would be wasted plus this one came
in at just $54 so that kept the total
cost of this first option to just over
250 bucks our second option for adding
storage to our server is to skip the
redundancy of raid and simply attach a
single external solid state drive to our
server ssds are extremely reliable their
prices have become much more reasonable
and they are super fast ssds also have
the advantage of being much smaller and
quieter than the raid enclosure and
because they have no moving Parts
they're much less like to crash than a
hard drive I selected this 4 tbte
Samsung t7 SSD which is top rated on
Amazon and at $280 it cost only a few
bucks more than our first option you'll
find links to all the items we bought in
the video description it's a few days
later and the Amazon minions have
delivered their goodies so it's time to
install the two new hard drives into the
raid enclosure we just need to slide out
the two drivve
trays and insert the new hard
drives would simply snap into little
plastic pins rather than kneading
screws then we flip a couple of tiny
switches to configure the device for
raid
one now if you're not comfortable
installing these yourself you can
usually order these enclosures
pre-filled with hard drives or ssds just
keep in mind that you're paying a little
bit extra for that service so the
overall price tag might be a little bit
higher than if you buy the drive
separately and assemble it yourself like
we're doing today and the SSD drive for
our second option requires no setup at
all it's ready to use straight out of
the box hey real quick if you're
enjoying this video and learning
something today please give us a like
and consider subscribing to the channel
so with the storage ready next we need
to prop the Mac Mini to be our server I
didn't have a spare monitor to plug it
into so instead I connected the mini to
an extra HDMI port on my living room TV
and this is where I plan to keep the
server as long as it stays quiet the Mac
Mini is normally extremely quiet but the
external raid Drive could end up making
lots of noise so we'll have to wait and
see if this turns out to be a smart
place to keep it if it's too loud we can
stick it in the closet next to our Wi-Fi
router but for now we'll keep it here in
our TV stand between the dog toys and
the books I keep lying around to try and
look smart spoiler alert it is not
working the first order of business is
to configure the Mac Mini to allow
Remote Management so that we can remote
control it from another computer so
first we'll go to system settings
General sharing enable Remote Management
and then restrict access to just our
administrator
account once that's enabled we can go to
another Mac and remote control the
server with ease to do the rest of the
setup on the other Mac we'll find the
new server listed in the finder under
Network where we can click on share
screen to remote control the
server my Mac Mini had been reset to
factory settings before going into Cold
Storage so there's not much needed as
far as setup goes shows we'll want to
disable the Sleep settings set it to
restart automatically in case of a power
outage turn off any visual bells and
whistles and avoid all unnecessary
background tests on the server machine
to keep it focused on nothing but
storing our files and streaming our
media now that the Mac Mini servers up
and running let's connect the storage
and get going from here on out the setup
is the same whether we've chosen the
raid option or the SSD option so I'll
only show it once once we connect it we
may be prompted to initialize and erase
the drive or we can also find those
options by launching dis utility which
we can find using Launchpad in the other
folder we'll find our new Drive listed
under external drives be extremely
careful not to mess with the internal
drive which is normally called Macintosh
HD when we erase the external drive
we'll give the drive a name and then we
can choose to use the X fat format for
the best compatibility or we can use the
Apple file system apfs for slightly
better performance and features which is
what we'll do
here before we continue and set up folos
for sharing let's stop and take a look
at the drive performance for both of our
two options we'll use this free dis
speed test from Blackmagic which you can
find in the Mac App
Store we just choose the
drive and click Start then the app will
run a file transfer test and show us the
results for both read and write speeds
with the hard drives in the raid
enclosure we're seeing read and write
speeds of about 1 and 1 12 gbits per
second which is quite a bit lower than
the drive's advertised maximum speed of
6 gbits per second when we run the same
test with the SSD we're getting speeds
almost five times faster at 7 gbits per
second which is much closer to its
adverti speed next we'll create some
folders on the external drive and then
share them with our users now you can
make this as complex as you like but I'm
going to keep it pretty simple here and
just create three
folders
media
files and backup
once these folders are created we'll
share them by going to system settings
General
sharing enable file sharing and click
the info
button then for each of the three
folders we created we'll click the plus
button browse to select the
folder and then set
permissions I'm giving everyone access
to these folders but we could have made
some private folders and restricted them
to specific
users we also need to enable Windows
file sharing for later on so we'll do
that now too it'll require us to type in
the password for any user that we want
to allow connecting from Windows or in
our case from the media player that
we're going to use in just a bit with
the folder shared we can now access them
over the network from our other Mac when
we double click on the Mac Mini Server
in the finder It'll ask us for our Lo
login and we can save it so that we
don't have to type it in every time
we'll still probably want to keep our
important files directly on our devices
but we can offload other stuff to the
Mac Mini Server photos videos and
installers can fill up the drive quickly
so those are great candidates for files
to move to the server if you aren't
actively using them we're also going to
stop and test the performance now that
we're connected to the server from our
other Mac over Wi-Fi we can see that the
network transfer speed is far lower than
the actual Drive speeds that we measure
earlier in fact we see the same speed
over the network regardless of whether
we went with a raid drive or the SSD
option next let's talk about accessing
all those TV shows movies and music that
we've acquired over the years and copied
onto our shiny new Mac Mini Server a lot
of you have probably heard of Plex
jellyfin MB and other media servers but
we're going to skip all of that and
simply access our media files directly
from our devices now those media server
apps like Plex can be great especially
if you want to share or access your
media files while away from home and the
Mac Mini is quite capable of handling
that if that's what you're after but for
this tutorial we'll stick with just
accessing our media files directly using
a free media player called Infuse okay
it's mostly free there's a pro version
that has a few extra bells and whistles
but we can usually get by just fine with
just the regular free version Inus is
available on the Mac iPhone iPad and
Apple TV so if you live in the Apple
Universe this could be the only media
player you need once Inus is installed
we can connect to our shared media
folder and browse through our movies TV
shows and music and play them in a slick
interface that'll give us all the bells
and whistles we've come to expect from a
modern streaming service like artwork
cast information and user ratings and
reviews for Windows and Linux users
there are plenty of media players out
there such as VLC that have a lot of
similar features
here's another spot where we need to
stop and check the performance to make
sure that we're able to stream our media
4K movies in particular without any
hiccups or
slowdowns no problems found so far even
from the farthest corner of my house
where the Wi-Fi signal is the weakest
the final thing we want to set up is to
enable support for time machine backups
so that we can safely backup all our Mac
OS devices to the Mac Mini Server this
is accomplished by creating a special
backup folder and sharing it however
there's one extra step we have to take
to enable time machine to
properly in the file sharing setup on
the server we need to rightclick on the
backup share in order to get into the
advanced options screen and then check
the share As Time Machine backup
destination
option then we should be able to select
that backup share from our Mac devices
when setting up our time machine backups
as far as the performance goes we didn't
end up anywhere near the theoretical
speeds of the drives we bought but we
should still have plenty of speed to
store our files and to stream our 4K
videos anywhere in our home with our
Wi-Fi when connected directly to our Mac
Mini Server the hard disk raid Drive is
much slower than its theoretical top
speed but the solid state drive is
pretty close to its advertise
speed however when we access our files
over the network we run into the
limitations of Wi-Fi and our speed is
dramatically reduced regardless of which
Drive option we chose in the end we're
able to access our files over the
network at around 30 megabytes per
second so our Mac Mini Server certainly
isn't a speed de but it should be fast
enough to handle streaming 4K video to
our devices which only needs around 5
mbes per second s which option is the
best well they're both about the same
cost and they're both about the same
effective Speed The Raid drive with hard
diss has an extra layer of safety to it
but it's pretty big and bulky and it
does make a little bit of noise though
not enough to be a real problem but I
think that using the solid state drive
is a slightly better choice as ssds are
faster more reliable and they are
ridiculously small and portable the only
catch is that without raid we need to be
sure we have a good backup solution for
our important files whether we backup to
Dropbox Google drive or an online backup
service so there you have it we've now
got a server with 4 terab of storage and
an easy way to stream our media to all
the devices in our home and we did it
all with a tiny forgotten Mac Mini and a
shoest string budget thanks for watching
please like And subscribe to gigabyte
labs for more Tech videos like this
until next time happy streaming
m
