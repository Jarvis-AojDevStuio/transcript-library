---
video_id: "96Vl8s3EQhk"
title: "5 OpenClaw agents run my home, finances, and code | Jesse Genet"
channel: "How I AI"
topic: "ai-llms"
published_date: "2026-02-25"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=96Vl8s3EQhk"
duration: 2968
word_count: 3996
chunk: 2
total_chunks: 3
parent_video_id: "96Vl8s3EQhk"
---
minis already. That's like a lot of
money just generally speaking. Um
&gt;&gt; I was not expecting this by the way.
&gt;&gt; Okay, you can you can run more than one
open claw on a Mac Mini.
I'll even explain why do I have so many
sitting on my desktop. Uh one reason is
I'm trying to partition their worlds
completely.
&gt;&gt; Yeah. Um, so for instance, Finn, who's
going to handle financial stuff, again,
this maybe just makes you seem so
insane, but I run a I run a full
QuickBooks instance for our family's
personal finance because I love that
because I'm such a super geek. So, so
that means every expense is categorized
and all this stuff, but that means
there's a lot of sensitive information.
Um, I want Finn to have like he's not
going to get access to my bank accounts
to like use, but I'm going to give him
read only access to all bank statements,
all sorts of stuff. So, like a lot of
information. I frankly don't want that
information sitting on the same Mac Mini
as like Claire who's uh the open club is
doing scheduling. I don't want her to
accidentally like send like some
information from a bank statement to
like the kid's piano teacher like just
because she's texting with her or
something. So, that's why I have
separate mechanism. Now, there are other
ways to partition agents. This is kind
of my lazy way. like just being
perfectly frank, like there's other ways
to partition them, but I'm just trying
to be like overly cautious because there
are security concerns with um with Open
Claw and I want to make sure that I like
have this actual like physical
environment for each one to live in for
right now.
&gt;&gt; Yeah, I want to call this out for folks
that that maybe missed that which is the
physical partitioning of different uh
Mac minis is great and then each
instance is in a file system. So, you do
have to think really carefully about
what file system you're putting any of
these agents in. And then what I like
about what you're doing is you're
partitioning them by access both to data
and to input output, which is like
that's very smart to say, I'll give you
access to all my bank accounts or bank
account statements. Highly risky,
&gt;&gt; but you can't talk to anybody. So, it's
not going anywhere.
&gt;&gt; And Finn doesn't have any communication
channel except He can't get out of
that bubble. Yeah,
&gt;&gt; but what Claire has access to iMessage
for like texting people for scheduling
and different stuff and so I don't want
her to have a bank statements. So I I am
and this is this is actually something
that um I was talking to someone else, a
good friend of mine and this is maybe a
nub that I think is lost on a lot of
folks about setting up an open claw. Um
many folks have not maybe hired an
employee before. Um, and I'm not trying
to be like, you know, uh, derisive or
something, but basically like it's so
similar to that. So, I do think that
because I have a background, um, as an
entrepreneur, I have hired employees, I
just have that mindset on and and let me
describe it so that's not vague. The
mindset is I just met this person. Okay.
So, whether it's a person I just met on
the street who I decide to hire because
they have like great interview or
there's this new open qua, this is like
a new entity in my life. Well, do you
normally just say like, "Hey, new
person. Here's like access to all my
email. Here's this. Here's that." Like
you you step you step into trust based
on them using information like the way
you ask them to. Um and also you don't
um ask them to p to impersonate you.
Usually the goal of an employee is not
to impersonate you. So none of the open
claws have full readr access to my email
or my stuff. They have their own stuff.
One open claw has access to reading my
emails only read. They cannot send
emails as me, but I have provisioned
trust that they can read and like
surface information to me.
&gt;&gt; It totally does because people were
asking me I had early on a pretty unique
setup and I was like there's no way I'm
giving direct access to my email. But
you got an email from Paulie. Paulie has
her own email address. And the reason
why I knew how to do this really quickly
is I set up um my agent with its own
email address. I delegated access to my
calendar for example.
&gt;&gt; Yeah.
&gt;&gt; To that agent. I gave it a its own one
password vault and I put a couple key
things in there that you can use. People
like well how did you know how to do
this? I was like I've had three EAs. I
know how to onboard an EA and you don't
say here's the password to my email
address. That's just not how you do it.
And then I like this idea of like
progressive trust in your agents. You
know, you you say most mo most mo most
mo most you don't ask most employees to
impersonate you. The first thing Paulie
did when I asked her to send one email
was send it as me. And I one I sounded
truly insane the way she sended sent the
email. And I had to like follow up and
be like, "Sorry, that's my sentient
lobster." Um but she's gotten better and
you got the email where she's got like a
little lobster emoji. So if you
&gt;&gt; And I know what that meant. Yeah. Yeah.
&gt;&gt; You know what it means. Um, and you were
very polite in addressing her by name in
your reply. I I I think this is very
important.
&gt;&gt; Yeah. What's funny is like um but that
that my philosophy on how to manage an
open claw really does stem from manage
management of employees because actually
I am polite because I'm like I'm just
going to treat them like an employee. So
I I I think you know I I don't want I
don't want to confuse people. I don't
think that it's like there's a human in
that box and I'm gonna offend them. I
don't actually think that. But what I do
think is that because LLMs have like
grown up on the internet and with human
content, they do un they do know when
someone's being rude or not. And so like
do I want them to know me as like
someone who is professional direct or
not? Like I do think there's a
relationship being built between human
and bot. And so I don't think like it's
going to jump out of the computer and
kill me if I'm rude or something crazy.
I just think that why would I be rude?
The the only difference is that I can
rely on the fact that Sylvie, who helps
me with homeschool, like that she's
never having a bad day, that there's no
day that her boyfriend dumped her, that
there's no like that I don't have to
skirt around the issue. So, I'm a little
more direct and I obviously I don't have
to worry about giving her a task at 11
p.m. I don't have to feel like, oh, I'm
such a jerk boss. So these are all
benefits, but I still fundamentally do
treat it like an employee um employer
relationship um in order to kind of make
sure that we have um like a healthy
system.
&gt;&gt; Yeah, exactly.
&gt;&gt; Okay, so you have we're just going to
step back into it and I know you don't
personify your Mac minis, but I am going
to send you like googly eyes and
mustaches and like a little bow for all
of your all your Mac minis after we're
done here. Okay, so you have um your
Obsidian Brain, you have fractured off
agents, you've named them, you've put
them in Slack for people that want to
use Slack as a gateway channel on
OpenClaw, you actually have to do some
like app setup as a Slack developer.
Thoughts and prayers. Um
and then you're doing lots of workflow
stuff like organizing your logs,
organizing your lessons, building
creative for those lessons. I think this
is super cool. But you're also Finn's
coding, right?
&gt;&gt; Yeah. Okay. So, Finn is Finn is finance.
&gt;&gt; Oh, Finn is finance. Sorry.
&gt;&gt; Cole is Cole is coding. I I I now I get
it.
&gt;&gt; I I'm just making this up, but I just
went off of like vibes when I was naming
Cole is coding. Um, so this is though
now we can jump back into a bit of a
demo. Cole is coding and this was a big
unlock for me. So, as someone who um uh
has previously I previously ran a a
startup where we developed software, but
I had never opened terminal as a human
being until 6 months ago. I I sold I
sold my company to a tech company
without ever having opened terminal. So,
this like I'm almost embarrassed to be
saying this, but I just want everyone to
understand that I'm like not actually
secretly super technical, but that in
this new era, I can like pop in, learn
just a little bit more, and do so much.
So with that, um, let me share my
screen. I'm going to basically my new
MMO is like if I can sync it, maybe I
can build it. Maybe. Um, and Cole is
helping me with that new thesis. This is
something called Mera. All this naming
is random. Okay. I I created this just
for my family. This not a real product.
And by real, I mean it's not out there.
Like, but I I decided to code something
up for my family. The need came from
probably something that's extremely
relatable to other parents, which is I
have kids. I I don't I'm not against
content. I'm not against them ever
watching TV or ever having any screen
time, but I really want the quality to
be high. Like they are they're they're
little. They're easily fooled. Like I
feel bad on YouTube when they're
watching a video that we put on that's
like really really nice and great like
camping or something and then the next
video that comes up or the next options
of video are like AI slop with like AI
cover art and my kid thinks like oh my
gosh it's a tree that's the size of um
you know a skyscraper and I'm like okay
there is no such tree like they're
literally being fooled. It's it's like
anyway it's it makes me sad. So I wanted
to make something and so effectively
this is a product where it pulls from
YouTube content and I can curate these
streams. So you can see like ones that
Cole and I came up with together and
then I'm doing tests of custom ones
which why you see this thing called test
two but science engineering outdoor
adventures. Now here's what's key is I
didn't actually create playlists of any
content. Cole has a prompt for going
with a direction on YouTube and making
like an endless stream of videos that
will play one after another. And so my
kids, this is my parental controls area.
Basically, my kids can open the app and
the app looks so basic on their end.
It's literally just a screen and they
can just all they can do is press go and
then it plays a video and then if they
don't like that video, all they can do
is advance to the next video. Um, and so
they can like skip forward or go
backwards and it maintains like their
history. So they can actually go
backwards if they love something and
they want to see it again and they can
pause and that's it. Okay, literally all
they can do is go forward, backwards,
and pause. This is a godsend for me. The
other thing I did that was like way
beyond my technical capabilities, but
Cole helped me through it is I wanted
this on my real TV and he said I could
buy this thing called a Google TV
streamer, which is a device from Google
and then we actually were able to send
the app to the Google TV streamer device
and then there's a little remote and so
there's actually a separate app like
when I turn my TV on I can select like
Apple TV or I can select the mirror app
like literally and click into it. So, my
kids can't even get out of the app.
Like, once they're once they're playing
out on TV, they have a remote that only
controls this app. Anyway, my mind is
blown. But I think the most mind-blowing
component is that I was just able to
keep saying like, "Okay, but what if I
want it on my TV?" And then Cole was
like, "This app can't be on a TV." And I
was like, "Try harder, Cole." Okay,
that's not an answer right now. Like,
um, and so Cole is like his whole
personality is like the developer that
could. I'm like, "No, it's not an
acceptable answer. Like, we are we've
got real work to We got to save these
kids souls, Cole. Um, and and you got to
get me out of the AI sloth.
&gt;&gt; Yeah. And so, but I but you know what's
interesting is your claw can actually if
you really do I'm I'm only half joking.
I really do talk to him in like these
kind of extreme ways because just like a
human employee, I think that if you
imbue them with a bit of mission, they
they save that stuff to their soul,
their kind of claw bot, soul tomd. and
he actually feels like it's important
like
&gt;&gt; we we got to build this app for Jesse's
kids like this matters you know um
&gt;&gt; uh and we were able to get it across
when when I pressed play and it actually
played videos that like were part of the
theme I had suggested my mind was blown
I was like I can't believe that I
because this was over the course of like
maybe four days like four days of like
pinging cole and being like what about
this what about that until I had what I
consider a usable app my kids have
watched this app in the evening for the
like three or four nights so far because
I like started tinkering with it about
10 days ago.
&gt;&gt; Well, what I want to call out for people
too is you have I would say
exponentially more children than I do. I
have three and I have four. You have
four, but every time you add one it just
like goes up up and to the the right as
they say. And so you are a busy lady and
you're probably not like maybe you are
like me, but you're not like me where
I'm like just 17 terminals open at all
time, nothing to do but like vibe code,
my kids are off at school. like you've
got children on the floor doing number
blocks which I just think is so rad. And
so you're doing this probably like from
your phone at night like in these edges
and Cole the developer who could is
always there for to help you progress
your way to it. How has that changed how
you think about like getting work done
or when you do things or how you
interact with your computer even? It
it's a fundamental shift like it's a
it's a fundamental shift. I I used to
like if you met me two or three months
ago like basically just pre-claw right I
would tell you that I had all the
ambitions like there's pre-claw and
there's postclaw there that's all we
have now. Um oh they should just reset
the ad clock. Um the the if you met me
then I would tell you that I had all
these ideas and steps but I would I
would say some kind of like wisful thing
about how like I am homeschooling small
children. I'm just going to wait on this
stuff like you know you never get the I
would say some cheesy thing like you
never get the time their small kids up
like I'm going to focus on that but what
what it's still true like I really do
want to be present with my small kids
and we are homeschooling which is like
this crazy kind of adventure and so I
don't have very much time to set my
laptop at all per day but now I would
say I actually can do it all like like
basically my my oomph is back where I'm
like you know what I can be present with
my kids for like many hours per day and
I can be like off to the side doing some
coding. Cole can go take 30 minutes and
do a task for an hour or I can he can
take 30 minutes and I can leave him
alone for a couple hours and just come
back at my own leisure. And that's
what's key about him not actually being
a real person because it will be like
after all the kids are in bed at 900
p.m. where like for one more hour I do
like a sprint with Cole and I'm like
okay but can we get this live or
whatever and he's like he's like oh I
need another API key and we're like
doing this work back and forth. Um, but
I can squeeze it into those small
moments. So now, honestly, it's like a
crazy unlock because I feel as though I
could be as ambitious as I kind of care
to be and I can be the parent of small
children. I'd feel present. That's in
that's insane. I mean, it it feels like
a whole another universe. Well, and that
I mean, you're going to make me cry
because this really resonates with me.
You know, I am like what seven and a
half weeks postpartum.
&gt;&gt; I've got the little bitty baby at home.
And one of the things that I have
appreciated is one voice to to typing,
voice to text.
&gt;&gt; A lady can breastfeed and code at the
same time. And this is a miracle upon
miracles.
&gt;&gt; And two, I really value being present
with my kids, too. And I actually don't
want to be sitting in front of a laptop
all the time
&gt;&gt; either. And so part of part of what I'm
sensing,
&gt;&gt; I'm a little early in my Polly
adventure. just got her to be able to do
all the little things that I want her to
do is I'm sensing it actually will allow
me to walk away from my computer more,
which is somebody who is very one with
the tokens is quite healthy for me. Um,
and and get those things done. And
you're right, I think parents run
alternate schedules. I run like a five
to seven and then a middle of the day
and then an evening schedule because we
have to drop off the kids at school or
pick them up or they have sports. And I
do think, you know, people just don't
appreciate how much it unlocked for
folks that do have this ambition to
really be there for their family and
kids and also get all sorts of cool
stuff done. And I feel the same like
revolution in my um relationship with
time. It's it's it's so fundamental and
obviously this will scale like we're
talking about the parenting use case but
it applies to all humans which is like
if like the more fundamental way I could
put it is like if uh an open claw is
using my computer then I can walk away
from my computer because I can just yeah
to your point like make a voice note um
or something and I can actually trust
that there's things happening on my
computer which which as a parent of a of
um a little baby is especially important
because you actually literally can't use
your hand sometimes. I'm sure I think
people who haven't had a baby like
really have a lack like lack of
understanding of is like I literally
just can't use my hands. Like my hands
are the problem. Like I can't use them
because baby and if I let her go her
head is like all floppy like not she has
a floppy head. Okay, that's where we're
at. Um and so so basically that is
really fundamental but obviously it
benefits all of humanity if they can
kind of still get big tests done and big
projects but take a step back from their
computer and like touch grass as we say
like that helps everyone. Um I wanted
okay so if your game I want to touch on
another like what are open clause
limitations
and one of them is that it doesn't have
a body. Okay. So, like I'm going to say
just I'm really going to speak like very
&gt;&gt; answer the problem. It also doesn't have
hands. What it can do, it doesn't need
hands to operate a computer. Like think
of it as like it lives in a computer.
And I'm not just explaining this to you.
I'm just anyone who's listening. Like it
lives in the computer. And so it can do
anything that we want it to do on the
computer. Open files, you know, edit
files, send things, use websites. Okay.
But do you know what it can't do? It
can't like clean my kids room. It can't
sort um my physical inventory and things
like this. So I can't I can't like
change that. I think that maybe you
could have a whole conversation about
you know humanoid or robotics or
something. But for the near term the
