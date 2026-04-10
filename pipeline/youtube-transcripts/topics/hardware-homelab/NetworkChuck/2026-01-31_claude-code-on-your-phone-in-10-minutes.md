---
video_id: "FEDiAHzS0zw"
title: "Claude Code on your phone in 10 minutes"
channel: "NetworkChuck"
topic: "hardware-homelab"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=FEDiAHzS0zw"
word_count: 2093
---
Claude Code has been blowing up. Like,
there are actually articles about Claude
Code addiction. I believe it. I've got
it. Do you have it? And I'm not here to
help you quit. I'm here to make it
worse. Because what if you didn't have
to be changed to your laptop or desktop?
What if you could use Cloud Code at the
airport, on the couch, in the shower, on
the toilet? I want to give you that
freedom. So, by the end of this video,
you're going to be coding. You're going
to be hacking from your phone with
Claude Code from literally anywhere. And
it's going to be stupid easy. Get your
coffee ready. Let's go.
But here's the thing. Clog Code is a
terminal app. That's what I love about
it. You know what device doesn't have a
terminal? Our phones. Most of us. So, we
can't use cloud code on our phones. But
what if using our phones, we could
remote in to a terminal running clock?
That's what we're going to do in this
video. Okay, here's our mission. We have
actually two goals in our mission.
Number one, get a terminal on our phone.
And number two, set up a remote terminal
that will never ever go down. So we can
always access cloud code wherever all
the time.
We'll call it our forever terminal.
For this tutorial, we're going to set up
a VPS in the cloud. We'll knock this one
out first. And the best place to set up
your forever terminal is Hostinger.
We'll go out to
hostinger.com/networkchuck.
They are the sponsor of this video and
the sponsor of my channel for a long
time. They're here to help us with our
cloud code addiction. They're even
giving you a sale right now. Now is the
best time to get your Forever Terminal.
Now, what's cool about Hostinger is they
have Cloud Code ready to go. They know
why you're here. So, we'll go to
services, VPS hosting right here in the
middle. Choose our plan. I recommend the
KVM2. It's an entire home lab in the
cloud. And you can build whatever you
want with Cloud Code on this thing. You
can run your services on this thing,
hack from this thing, whatever you want
to do. And do you have a coupon code? Of
course you do. It's network chuck. Watch
what happens. Magic. And then watch
this. for our operating system. We'll
just search for Claude. There it is.
Claude Code. Yeah, I want it. And after
you set your password and enable your
free malware scanner and take a quick
coffee break. Coffee. Actually, now's a
great time to hack that YouTube
algorithm. Have you done that yet? Hit
the like button, subscribe, notification
bell, comment. You got to hack YouTube
today. Ethically, of course.
Hey, look. It's done. And from here, you
can access the terminal just from
clicking on this button the top right.
And you're here. Type in Claude
pre-installed.
Make sure you log in. And now all we
have to do is use our phone to access
this terminal. But hold up. What are you
doing? Is this thing even secure? This
is accessible to the entire world. We
got to make sure you protect it. We got
to harden this Linux machine.
Okay. To make this sucker secure, we're
going to do three things. First, we'll
enable fail to ban. This will block
brute force attacks automatically. We'll
do pseudoappt install fail toban.
We'll make sure it's running. systemctl
status failed to ban and it's running.
Number two, we're going to enable our
firewall and only allow the ports we
need. We'll do a combo command pseudo
ufw allow 22 which is the port we use
for SSH and is how we remotely access
this terminal. And then we'll do and and
pseudo UFW enable. Now, if you're
running as root, you don't need pseudo
just to force the habit. Anyways, let's
do it. Yes, UFW status looks great.
Number three, we're going to remove
password authentication, but not right
now because the app we're going to use
to remote into this terminal will handle
that for us. So, here we go. We've
almost broke the chain.
But now, it's time for the terminal app.
Yes, there is an app for your phone that
can give you terminal access. It's
called Terus. I'm not sponsored by them.
I'm sponsored by Hostinger VPS down
below. It's just an amazing terminal.
So, I'll go to the app store, find
Terus. There it is. And by the way, you
can use this to remote into any of your
stuff. It's awesome. We'll open it up.
Oh, shiny. You don't need an account.
So, I'm going to continue without one.
You don't need to give it access to your
local network because we'll be accessing
a public VPS. Yours. And now we'll
create our first host, which is going to
be our Hostinger VPS. Now, back in
Hostinger land, if you look at the
overview of your VPS, you can use one of
two things. Either the DNS name or the
public IP address. Let's go with the DNS
name. Mine is SRV blah blah blah. Hit
continue. Label it. We'll call it client
code. And then scroll down to
credentials. Put in your username, which
will be root, and then the password you
set when you set up your VPS. And that's
it. Hit the check mark. Hit continue to
accept the unknown host. And we're in
the terminal. Let's see if it works.
Claude. And we're in.
That's just fun. Now, that's all you
have to do. Video over. I mean, not yet.
Hold on. Hold on. But you can back out
and that's going to be there forever
whenever you need it. But there are a
few things we can do to make it better.
But first, we got to harden this thing.
There's that third thing we forgot to
do. We didn't forget. We're going to do
it right now. Remove password off. We're
only going to do SSH key authentication.
So, we're going to back out of our host
and get back to the main area by hitting
that arrow at the top left. And we're
going to click on keychain and we're
going to add a new credential. Hit the
plus icon at the top right. And we'll
click on generate key. We'll just call
it my key. And hit the check mark to say
done. Then watch this. This is the
magic. We're going to hold down our
thumb on that or finger, I don't care.
Click on share and then say export to
host. Which host? Clog code. Export.
That just added the key we made to the
VPS. So now we no longer need a
password. We got the key. Let's test it
by getting back to our host. Let's hold
down the host and click on edit and
let's remove our password and save that.
Now let's see if we can connect.
We're in. I feel pretty safe now about
removing password authentication. We can
do it with one command. All this is
doing is changing your SSH configuration
in two files. This one and this one,
which is an override by hostinger, which
will take precedent. We're going to do
both files just to be safe. Oh, and then
we're also restarting SSH. Ready, set,
go. So, this should in theory deny
password authentication. Let's try it.
Yep. Public key denied. But if we get
back to our phone and try to log in,
we're in. Now, this is amazing, but we
still have one problem. What happens
when, I don't know, your phone locks or
you lose signal or your plane's taking
off? What happens to that clogged code
session you're in, the one you're
programming in? Cuz right now, it's just
going to disappear. There's a way to fix
that. It's called T-Mox.
I talked about T-Mux before. It's a
terminal multiplexer, and allows you to
keep persistent sessions. Let's install
on our server real quick. Actually,
we'll do it from our phone.
Duh. We'll do uh apt install t-m. It's
probably already installed. Yeah, it is.
Now, watch this. Here's the magic. Here
on my Hostinger VPS, I'll type in T-Mux.
And that suddenly launched a session.
And I can launch Claude
and say hello. Tell me a story.
And then back here on my phone, let me
just kill my connection. I'll go to
connections. Kill it. Ah, plane took
off. Whatever. I'm going to get back in
there. fresh session, but I can type in
t-mucks and we can do a to resume the
last session. Attach ourselves to the
most recent session. Look at that.
That's kind of weird. It's like I'm
typing. Look at that. It's typing in
both terminals and then controll
D to detach. Now, there's one gotcha
with this. And notice what I'm doing
here. I'm trying to scroll up or down,
whatever you want to say, to like look
at more stuff in my terminal, which will
happen. And I can't because T-Max
doesn't work well with Termius out of
the box unless we make one config
change. I'm going to close the session
here on my phone. We're going to add
this one line of config. Just copy and
paste this. It's a quality of life
feature for the mouse and we're adding
this to our T-Max config file. Hit
enter. Ready to go. I'll start a new
session. Call it plane.
Launch it. Tell it to do something. And
then on my phone, I'll get logged in.
Then I'll do t-mox a-t to specify my
session which was plain. Cool. Now let's
see if we can scroll up.
There it goes. And sure. Let's uh create
that scanner.
How cool is that? Now you can code and
hack from anywhere. And with Hostinger
as your VPS, you can do a bunch of
things like build a website with claude
and it runs the website and builds it
right there on the stinking host. What
you can do is now endless and you can do
it from anywhere. That's the video. I'll
catch you guys next time. Hey, you're
still here. At the end of my videos, I
do like to pray for you, my audience.
Why? Because I love you guys and I want
you to have the best life possible. So,
let's go ahead and pray. God, I ask in
your name that you bless the person on
the other side of the screen.
That you would fill their life with joy
right now, with excitement, and that
they would actually not have a addiction
to cloud code. that they would be able
to put their phones and their laptops
down to spend time with their family or
get time alone. Um, but also to empower
them to be able to do some amazing
things.
Inspire them. Bless their lives and
their careers.
Let this year be amazing for them.
Bless their families.
Guide them right now in their career. If
they're un unsure about what they're
doing, if they're confused, give them
clarity. Get them, give them excitement
right now. Give them ideas
and let them if they're anxious or
or just dealing with any kind of
depression uh around just starting this
year, God, I ask in your name that as
they're sitting here listening to this
that it will just melt away.
I ask this in your name, Jesus. Amen.
All right, guys. I'll catch youall next
time.
