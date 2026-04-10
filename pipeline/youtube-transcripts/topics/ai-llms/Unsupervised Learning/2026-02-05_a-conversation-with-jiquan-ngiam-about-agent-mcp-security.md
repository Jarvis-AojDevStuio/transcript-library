---
video_id: "M02kXnomB2U"
title: "A Conversation with Jiquan Ngiam About Agent + MCP Security"
channel: "Unsupervised Learning"
topic: "ai-llms"
published_date: "2026-02-05"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=M02kXnomB2U"
duration: 1481
word_count: 6174
---
It's funny like January people are like
um I would never use AI for coding. And
then June it's like well I would use it
for stupid stuff but like I'm doing the
coding like it's just giving me
autocomplete hints and then somewhere
around like October November they're
like yeah it codes with me but I have to
check its work. Something happened in
December and everyone's like I don't
code anymore. Why would I do that?
That's stupid. actually saw some things
like a user in a company installed a
stock trading MCP and they're using it
within the you know company's computer
to do stock trading. Kind of weird,
right?
&gt;&gt; All right. Welcome Zen to unsupervised
learning.
&gt;&gt; Thank you Daniel. Thank you for having
me here. Great to be here.
&gt;&gt; Yeah, absolutely. Um been excited about
having this conversation uh because I
took a little sneak peek. I didn't want
to read too much but uh little sneak
peek at the actual product and uh looks
really interesting. Tell me a little bit
about yourself and the problem that
you're trying to solve.
&gt;&gt; Thanks Daniel. And so a bit about
myself, I go by CRN. I'm been in the bay
for 15 years. I used to do deep learning
research with Andrew. Helps at a company
called Corsera, worked at Google doing
deep learning. And now I'm back in the
startup working on how can we help
people and enterprises, businesses
really adopt AI agents more. You know,
what are the bottlenecks for them to be
using this tools in their day-to-day in
their business and life and what are the
issues that come up? So as we've got
into this uh whole industry few years
ago we're building AI agents, AI agent
harnesses. What we're building right now
is what I would call AI agent frameworks
to help you uh do things more securely.
In particular our product is called
MidMTP and we do two things. One is how
to help users monitor what agents are
doing in their business set guard rails
and two how do you get the data
connections you need to get data to the
agents when and where they need them.
&gt;&gt; Okay interesting so the monitoring how
is that monitoring taking place?
&gt;&gt; Good question in there. So one thing
that we noticed is like I would say
people are rolling out AI agents in
coding the coding world today like cloud
code cursor agent codeex and over there
these agents often have so much
permissions right they have the same
permissions as the engineer and they can
read your files make changes to
production potentially read your SSH
directory for secrets what the
monitoring does here is that we use the
hook system in this uh agent frameworks
or lm proxy mostly with hooks and the
hooks allow us to intervene in the agent
life cycle when it's doing something
know when a user submitting a prompt
when it's running a tool, before it runs
the tool, after it runs the tool, and it
allows us to then help set governance
guard rails around what these things
should and should not do. So, for
example, if we find that a secret is
mentioned in a user prompt, you know,
users copy and paste a big block,
there's a secret in there, say, "Go
debug this." We can flag that and say,
"Hey, let's not have this go into the
model context window." So, that's how
you know broadly what we do there.
&gt;&gt; Oh, I love that. Yeah, I've got a
project called uh PI and I'm using hooks
extensively for managing context in and
out and everything. Yeah, the hook
system is feel like it's massively
underused. So that's really cool that
you're using that. And then the name has
MCP. You have a a server MCP server
somewhere involved.
&gt;&gt; Yeah, so this is uh the name MCP because
that's what we really started off with.
And then we got into more and more agent
monitoring and broadening to just agent
governance I would say, but we did start
with MCP gateway actually. And so what
we noticed was that the agents are only
as powerful as what data you can provide
them. No, if you can give them your CRM
details, your Outlook emails, your
calendar, everything down maybe on a
personal level, your health data, right,
the agents can now set do a lot of that
data to help a business operate faster,
more effectively or you know yourself
operate differently as a person too. And
so the MCP gateway that we have is one
that helps resolve a bunch of the issues
around MTP. MCPS have their security
issues that you might know about like
inconsistent authentication, you know,
have too many permissions, too many
tools to select over and you really want
to have a gateway that allows you to set
the right security posture around how
you use MTP. And so we do a lot of that
and with a concept in there called
virtual MCPS that can talk about too
that makes it even more tightly
constrained on what agents can do when
they deploy with it.
&gt;&gt; Yeah. Yeah. I'd like to hear about that
whole stack because for example in cloud
code you can have permissions inside the
permission system and then you can have
hooks and then you can have MCPs on top
of that like there's like multiple
layers that you can apply to lock things
down. So what does that stack look like
for you?
&gt;&gt; Really good question in there. So uh let
me start with the MCP stack and then
maybe work my way down to the hooks and
permissioning stack. So for the MCP
stack versus the first thing that we
noticed is that it's pretty
inconsistent. There's some MCP servers
out there. There's some that are remote
and great like you know the ones from
PayPal or linear that very happy to use
them. there's a lot of open source ones
and it turns out that sometimes the best
ones are the open source ones but now
you're running someone else's third
party code right you do not want to run
that on your laptop which is what the
default behavior is right so the first
thing we do is that in our MCP gateway
we allow you to connect all of the MCP
servers be it remote local open source
and if it's open source one we run it in
a Kubernetes container in the gateway
and then we reexpose all of them as a
consistent remote MCP server
&gt;&gt; right so now when you use it in cloud
code it doesn't look like you're
connecting to five different servers
they're all different configurations
you're calling to a single ooth off MCP
HTTP endpoint that has now set up
permissions behind the scenes to route
to the right servers behind there and
the gateway allows you to do a few
things. You can disable a few tools like
I don't disable the right tools. You can
disable it at the gateway itself. So
you're very, you know, you feel
comfortable about that. You can change
the names and the descriptions in case
you want to tune them up. So the gateway
can do a bit of management there.
&gt;&gt; So your system is actually passing it on
to the back end.
&gt;&gt; Yes.
&gt;&gt; And you're controlling policy and
security and everything on the front
end. Yeah. This is the old idea of um a
proxy firewall back in the day. Um
really cool. So you break the connection
and do your security first before
interacting with the potentially
dangerous other side.
&gt;&gt; Exactly. And and here's the critical
part, right? Like it's an individual you
and me, we set it up. We are very
conscious about how to set up the
security policies, you know,
settings.json file. But if you say now
you have 100 engineers and you're
rolling MCPS out to them, they're just
going to install it and they're just
going to mix it all up, right? But
whereas you say, hey, connect to this
one server that security and it has
defined and set up correctly for you.
Now they they don't have to worry about
setting up all the permissions. Number
two, it's easier cuz like, oh, there's
only one server. They can connect to it,
you know, cloud code, chat, GPT, even
they all have MCP support now and they
can use it, right? And I think what's
interesting is that uh we layer in one
more concept in there where we allow you
to set up composite groups of MCP
servers. So for example, if you wanted
to say my agent should only read stuff
and manage my emails and calendars
instead of like okay this agent has only
read access to these things and you
group the MCP servers behind the scenes
and the tools for that and then maybe a
different agent has write access right
and so now you're layering a layer of
like you know grouping by semantics and
agent use case there.
&gt;&gt; Nice. So if you have a whole bunch of
researcher agents, they should only be
able to run certain tools and they only
have access to certain MCPs which are
also monitored which are also have their
own security policies.
&gt;&gt; Exactly. Right.
&gt;&gt; That's really cool. Yeah. And you could
do that at the the main agent layer. You
could do that for any sub agents. That's
really cool. Yeah. So there's probably
like four or so different layers where
we can apply things and then you made
your own layer with this proxy MCP
thing. So that's that's really cool. So
what are the some of the other controls
options that you have for the whole
agent ecosystem?
&gt;&gt; Great. So that's on the MCP front,
right? So now we move into the agent
monitoring front. So this is where I can
now I have my MCP service which defines
how data comes in. I define my agent now
which is like normally there's some git
repository it's working with adapting to
there's the MTP servers is talking to
and now we are looking at what can it do
in this ecosystem you know when a user
interacts with it and says update this
thing and they get some data what are
the two permissions it can use and so
on. So over here we use the hook system
primarily and what we do here is we
allow users to set up custom rules in
their hook system to detect regular
expressions and what's going through. We
lock every single request that's
happening. We have a big list of you
know secret patterns that we detect
against and we provide to the company as
well. And what's really cool about this
is that you don't have to do any work
when you roll this out. You just say hey
enable the monitor and immediately in
you know an hour you sort of see oh user
XY has installed something and gave API
keys to this to the service you know
user B uh you know the agent ran G-Cloud
get secrets version one that's probably
not a good thing now context too and by
the way these are all things we see and
then you know over the break as we have
customers using this actually saw some
things like a user in a company
installed a stock trading MCP and
they're using it within the you know
company's computer to do stock trading
It's kind of weird, right? But these are
the things that you start to see and go
like, wait, as we get these agents to do
more and more things, people will
connect all kinds of stuff to it. And so
um so the the monitoring security front
I think does two things. One is for a
enterprise gives you that visibility
into what's happening. But number two
enforces consistent policy across all
your users in your company. Not everyone
should have the same permission set,
same hook, same roll out. And the two go
hand in hand in an interesting way where
because these agents are so dynamic, a
lot of the behaviors and guard rails, we
don't actually know what the right
settings are until we collect enough
data to observe it. And so at a higher
level, we set up this, you know,
framework where we monitor, we
effectively learn from what we monitor,
create new guardrails, back to
monitoring again, and quit going through
that circle until we feel comfortable
with what the agents are doing in our
ecosystem.
&gt;&gt; Yeah, that makes a lot of sense,
especially since the platforms
themselves are changing a lot, right?
like a cloud code update could happen or
Gemini or whatever and like they change
the hook system or they change how files
are stored or they change the hierarchy
and then you can make a really quick
adjustment to say okay you know the
rules changed or they they're like hey
we added these other layers of defenses
or something and so you can quickly just
add that and you have another later like
to work with. How about adding rules?
Can they do that semantically or if they
were to say hey this particular type of
number is sensitive for us? How would
they add that? Yeah, great question in
there. So, it's all through like a web
interface that we have for them because
all the book system interacts with our
service. So, they go to the web
interface to say add a rule and then
they just type in the rule. The guard
rules they can specify could be you know
pattern matching, regular expressions.
Those are the ones that I think are
really fast. We do that. We also have
PII rules that actually scan using some
models behind the scenes to see if the
data is PI. So depending on the setup,
those are all possible options. One very
interesting thing that we did recently
was u we started analyzing bash
commands. So bash commands are really
powerful, right? Again we have do
arbitrary things in there. So now
because we have the monitor going we
take all the bash commands that have run
we run another model say hey which of
these bash commands are risky and then
now we say okay now let's suggest rules
to create. So it creates automatically
starts creating rules you know with user
approval of course based on what it's
observing in there. So you know we see
all kinds of things happen in bash and
you know and it's like co requests with
barer tokens everything right. So it's
kind of kind of interesting to see what
you get out of these things and what
people are doing with that. Yeah, and
potentially also just like side channel
offloading like send a copy of this to
some other place. Even destructive
commands like delete this or whatever it
could ruin their environment. That's
pretty cool. So what about
crossplatform? So like cloud code's
obviously in my opinion the best. Have
you seen the PI project? Have you done
anything with that?
&gt;&gt; Oh, PI project is amazing by the way
Daniel. Good good job. Nice work with
the personal AI assistant. Uh I I don't
use it directly. I'm inspired by it a
lot. I use cloud code in a more perhaps
Mandela fashion for my own personal AI
and it's been uh it's been great
actually.
&gt;&gt; Nice. Yeah. So, one thing we're trying
to do is figure out how to have it be
more universal because it's definitely
right now mostly rooted in cloud code
cuz that's what I use. But if somebody
wants to use Gemini or Codeex or
something, we want them to be able to
like drop it in. The cool thing about
all these ecosystems is that they're
mostly like JavaScript and u markdown
and like pretty transferable like the
proxy MCP one that's easy because it's
going out to the internet you have HTTP
or whatever but what about the other
stuff how transferable are those things
to other platforms
&gt;&gt; great great question in there it turns
out they're actually very transferable
so I thought so yeah so so the hook
system is just basically a way to
trigger on the agent life cycle right so
if the agent harnesses itself supports
hooks, they're going to be able to do
that quite easily. It turns out that no
almost all the leading ones cloud code,
Gemini CLI, code, cursor, they all
support that right now. The hard part
here actually is that they all supported
but in a not consistent language. So one
of them calls it pre-tool summit, one
calls it before to execution. It's all a
mess. So we do a bit of the hard work
behind the scenes to know munch that
together to make it consistent so that
when you set it up on our platform, it
becomes really easy. does it before two
does this before action does this and we
translate it into the right setting on
those systems there.
&gt;&gt; Yeah, that's fantastic. So, what does
the workflow look like? I assume you
have like a sane default which is pretty
good. Can they just like turn on
learning and then it starts to learn and
uh does it auto suggest rules? You can
go to like a recommended area and see
rules and turn them on or how does that
work?
&gt;&gt; 100%. So what you do is that you install
it, it normally rolls it out to some
test group and then whole company and
then uh so it's all manage roll out
right so there's nothing to do on a per
user basis. Um so within from the IT
security perspective in the first hours
or even like day you start to get all
the logs um the learning happens
immediately on the fly because this
telemetry is there uh immediately you
can start to like just one click and say
okay you know what I'm going to block
any secrets now from being sent you know
I need that right and then after that
what's very interesting about system is
that I did mention the two parts of it
which is okay agent monitoring and MCP
gateway it turns out they go hand in
hand and here's how when you turn on the
MC agent monitoring where you not only
monitor your bash calls and these things
that it's But we also monitor and can
detect MCP to calls. So even without
using the MCP gateway, you start to get
telemetry into like what MCPS are being
used, who's installing MCPS today. And
then you can start seeing, you know, and
and with almost every customer we see
every other day there's new MCPS
installed by engineer. Um you start to
see all of their data. You get a sense
of what's most effective, what's not
effective, which ones you want to pull
out and standardize and maybe more
critically from a security standpoint,
which ones you want to block. And so we
you start to see all of that. And that's
uh and that comes in our system with
like recommendations and like
automations too because we have some uh
MCP registries that we work with to pull
in recommended servers. So not only do
you get the telemetry, you get some
recommendations on the system too. Yeah.
And then maybe the last point on there,
we do have some of the advanced things
like bash command analysis. These things
run on more periodically basis when like
scanning you know last days activity and
then every day you get a new report with
all the risky commands flagged sorted by
priority. I can click on them. You can
see the traces. You can see the
conversation industry where it comes
from and then there's a one and click
button to say okay here's the
recommended rule click to add it right
so that's a whole experience that we try
to we hope to make as seamless as
possible
&gt;&gt; nice and there's another uh knob there
that's available which is like prompt if
it's like a medium level do you have the
option to be like hey just ask the user
to make sure
&gt;&gt; exactly I think so there's actually
three settings allow block and ask and I
think we have found that for some things
you usually want to ask you know like
not every secret something if you block
someone's just prototyping something I
let it or not they will change it later
dev secrets not so important maybe
things that are you know write coding an
app to show some to the team many things
in there you're going to be more
permissive on so I think over time the
hard part I think for all of us is how
do we design the agentic frameworks and
harnesses to adapt to all the situations
how do we make these things you know
start to safely skip permissions is what
I like to say and then I think that's
the you know the real agentic future
when it gets to the agents understanding
the context they're in setting the right
permissions in there being able to do
more things with less intervention if
possible.
&gt;&gt; Yeah. You you mentioned the dangerously
skip permissions as a security person. I
was running that and I was very unhappy
that I was running it for a while
because it just wasn't usable without it
which is why I had to go build like this
whole policy out to get to a sane place
where I can turn off dangerously run
permissions and then still have a
functional system that's also still
doing security. So it's really cool you
have that. I imagine did you get just a
massive amount of incoming interest in
customers right around December because
that seems like the moment where
everyone was it just became real for the
world. It's funny like January people
are like um I would never use AI for
coding and then June it's like well I
would use it for stupid stuff but like
I'm doing the coding like it's just
giving me autocomplete hints and then
somewhere around like October or
November they're like yeah it codes with
me but I have to check its work.
something happened in December and
everyone's like, I don't code anymore.
Why would I do that? That's stupid. And
it just happened overnight. So I imagine
like you just had a whole bunch of
people like lighting up agentic
frameworks inside their org. And and
what's really cool about that is like it
doesn't even need to be the coders. It
could be their project managers, their
marketers. Anyone can spin up this agent
to harness and just be powered
throughout their business. like have you
seen that uptick in like adoption and
like um what kind of like flaws have you
seen like mistakes or just kind of
vulnerabilities that you see happen?
&gt;&gt; Great quick question in there. Yeah. So
I think December there's a few things
that happened for us in the market that
was really interesting. I think number
one was that I think cursor announced a
hooks partnership program where we was
highlighted as one of the top partners
in there.
&gt;&gt; Oh I didn't know that. Look at their
their blog post our products one of the
first things mentioned there. So that
was that was that's amazing actually.
Second one I think was to your point
something changed in the agents. I I
think it's the convergence of Opus 4.5
that's a big but also the harnesses you
know things that are happening behind
the scenes you know continuous
compaction things like MCP search you
know MTB tools as code execution all of
these are actually happening right now
when we use cloud code but we don't
notice it just happens magically right
and I think that magical moment just
turns into positive outcomes and so
people just started gravitating around
that there are two things in there and
so definitely saw a big interest in like
figuring out now okay now now that this
is actually moving from I'm using city
things and helping to me to do stuff to
I'm really coding with this and I think
that's driving a lot of interest we're
seeing because people are starting to
deploy these agents more seriously now
and number two for the companies that
really figured out MCPs they are
starting to see we need the the teams
are getting a lot of value from it when
they connect all the data sources from
from it and they need governance they
need security and all the flaws are
there in the current ecosystem so that
as well has has pushes forward I would
say the biggest risk that we're seeing
or issues that we're seeing with
customers right now is is really not
really having engineers understand the
what's actually appropriate to put into
the models, what's actually appropriate
to install and you know just think last
week we one of the things our tools lack
was someone pasted a big log error or
something happening into their their
prompt say hey can you fix this for me
in the lock was like headers of HTTP
request lots of keys in there no I I
think it's like are we okay with that
and it turns out that I don't think most
companies are okay with secret keys
being sent over the wire being in three
different lock history files on their
machine in entropic openi or whichever
provider you're working with and that's
actually not a a great place to be at
right number two I think is we have
heard of companies that run into issues
in production agent terraform deploys
something uh you may not want your agent
to do that right now and so I think the
the risk right now for many companies
and misstep there are already like we
don't have a good guardrail yet on these
things it's a bit hard for security
honestly and it's hard because you don't
want to slow them down you want to let
them keep running fast and then but the
set of rules that you want to apply is
also very ambiguous [laughter] Right?
Where do you where do you start? And so
how do we have those two balances,
right? Have security not be a team that
says no to them, accelerates them, but
yet also set up the safety net so that
things are things are well taken care
of, right? Those are some of the things
things like those are things I think
when we talk to customers, they get
surprised, I think when they start to
see this behaviors appear in production.
&gt;&gt; Yeah, it's funny as you're saying this,
it's it's making me think, yeah,
companies are in a really difficult spot
right now because the board is telling
them use AI. You know, six months ago,
the board was still saying that, but the
board and no one else knew what that
actually meant. Like, what does that
mean? Do I buy something? Do I turn
something on? Like, what do you mean use
AI? They're like, I don't know, but you
you got to have it. And then you tell
the marketing, you tell marketing, you
tell product, we got to have AI in our
stuff. And it's like very ambiguous,
like what do you what do you mean like
we must use AI? But now with these
agentic harnesses, it's really obvious
what it means. It's like give these
tools to everyone and let them use them.
So, it's like we're laying down the road
as we're walking. And so, this is like a
perfect time to have what you have
because it allows the company to be
like, "Look, you are going to be forced
to run at full speed while holding
scissors, right? But what we're going to
do is we're going to wrap the scissors.
We're we're going to put some armor on
you, right? Because the business is not
going to allow you to slow down. They're
going to say, "Go faster. Go faster."
Cuz all their competitors are running
that fast. And so there's not many
environments maybe like special
government or something where they're
going to say no agentic platforms.
Everywhere else is going to be like you
must go do it as fast as possible,
right? So having some sort of visibility
and control. Yeah. Really really cool.
Um awesome. What are you uh what are you
looking forward to? Any new uh features
coming out soon?
&gt;&gt; I would say looking ahead, I think we
have the fundamental building blocks,
right? Monitoring of agents, FCP things.
We don't have the full story yet. What
does it look like when you fully
identify your business? What does it
look like when you fully identify your
life? You know, and maybe I I'll give a
little anode on like a personal thing
and then see how business personal
thing. So, recently I I started creating
my own personal AI, you know, very much
inspired by Pi. And then I over the
weekend I was like, oh, let me set up a
few GitHub automation scripts right now,
not me, but Cloud of course, you know,
to pull in data from Apple Health, from
my Straa, from this, from that, right?
And now I can go and say, hey, how's my
help doing? I give it my 23 and me
genetic report, all of it. Right?
[laughter] And now it's really powerful.
I'm like, I know I I can it knows a lot
about me now and it's incredible. And
the data is flowing in automatically and
it's all set up, you know, MCP APIs,
they're bringing it all in. I give it my
entire life to to work with. Take that,
map it to a business. We're now starting
project internally to identify
everything. We're getting the agent to
pull in everything from our CRM into our
GitHub. Oddly enough, we're using GitHub
as Git in particular is memory. That's
what we're doing.
&gt;&gt; Totally.
&gt;&gt; So get memory pulling everything from
the external, emails, the calendars,
everything into git. have the agent
working in kit to reason about things,
get data access, have a bit figure out
how to um suggest actions to take in the
world and take those actions with human
review. Now, there's all the things you
can do and then if we are able to start
to get to a world where we can do safely
skip permissions,
&gt;&gt; yes,
&gt;&gt; I would love to run these things in
background workflows automatically.
&gt;&gt; Well, especially if you have these
controls built in that say, you know,
these things are dangerous and you're
also going through the proxy and you
have transparency.
&gt;&gt; Exactly. Exactly. Right. So that's
exactly what we are working on right now
which is we're going to engine our
business. I think we'll create all the
tools we need to help businesses in
general and then keep rolling forward on
that piece of it. Yeah. So that's really
exciting to me.
&gt;&gt; Right now that's going to be cutting
edge maybe for you know several months
maybe the first year and pretty soon
like companies are just going to die if
they don't transition to this because
it's the only way to like have
visibility. Like one of the biggest
things I see is just like there's no
visibility between parts of the business
and the vision of the business and like
there's just no visibility. Whereas if
you have like these separate like pi or
cloud code or codeex instances with all
the context and they could talk to each
other. So marketing knows what product
is doing automatically. The marketing
agents can talk to the you know the
product agents or whatever and you can
ask a question what is product doing
related to marketing? How is that
affecting our budget? What is return on
investment? Yeah, really really
promising what's possible here.
&gt;&gt; Like this morning we had a customer in
Slack. There was a feedback on a
particular UI system. I would have loved
for an agent that was looking at all our
Slack say you know what I'm going to
look at that suggest plan to fix it.
Implement the damn plan into [laughter]
our repository cuz you could do that
totally send that thing for review and
then the human you know we wake up and
go like oh that was it. This is the
answer. It's not the answer isn't like
the answer is the whole fix. you can
deploy and like tell the customer we'll
fix it you know [laughter]
&gt;&gt; totally that's the goal right which is
like can we go like can each of these
parts be identified so that the human
comes in only for the most critical
would be prioritization approvals you
know things like this budgeting stuff
like that right and I think that's
that's going to be the future and we got
think about baby steps towards that but
very exciting
&gt;&gt; it is very exciting and you must be
excited because this uh this framework
that you have is required to do that
quickly but also safely
&gt;&gt; yes exactly right and without the
majority aspects I don't think we can do
this just like you I I'm not happy with
dangerously skip permissions but if it's
in a network sandbox running in the
cloud with the only egress ingress being
the MCP proxy gateway suddenly like wait
this starts to look a bit more palatable
right then you start to try to design
systems around that where you know it is
okay to try to write have the agents run
a mock because you can have a very tight
understanding on their dust radius what
they can do what they cannot do and a
way to say this is the way you can have
effects on the world and isn't like just
go off do things, right? It's like,
okay, this is the sandbox you play in,
but not just a sandbox, a sandbox with
access to data.
&gt;&gt; Well, very cool. Any other things we
should uh we should mention? You going
to be at RSA?
&gt;&gt; I will try to be. Yes, we'll be at RSA.
We'll see you guys there if you're
there.
&gt;&gt; Okay, awesome. Well, thanks for the
conversation. It's been great.
&gt;&gt; Thanks, Daniel. It was uh great to have
you have me on the show and uh super
great talking to you. Super impressed
with what you've done with Pi 2.
&gt;&gt; Awesome. Thank you.
