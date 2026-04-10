---
video_id: "fG95XsBO5U4"
title: "Why MCP is dead & How I vibe now"
channel: "AI Jason"
topic: "ai-llms"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=fG95XsBO5U4"
word_count: 2094
---
[Music]
Many people didn't know you can actually
use simple open source tools to reduce
more than 70% of token consumptions for
your coding agents and extend it
capability in much more scalable way. So
every MCP server you add comes with this
bundle of different tools and each tool
comes with this JSON schema and all
those information is part of context no
matter whether the task that agent is
doing at moment is relevant or not. So
it just unnecessary eats up loads of
context window. A much more scalable and
easy to use method in my opinion is this
combination of skills plus CRI tool. It
allows you extend your agent capability
to hundreds different integrations with
only minimum amount of token
consumptions. In my experimentation,
some of them can lead to more than 70%
of token consumption reductions. And
this is what I want to take you through
today with step-by-step process of how
you can do it and special agent skills
to enable that. But before we dive into
that, entropy released cloud code works
which is special version of cloud code
that aim to automate not just coding but
knowledge works. It gave us sneak peek
of how white collar work going to be
done in future. But many of us are still
probably early stage experimenting it or
figuring out what's the best way to
unleash it full power. That's why I want
to introduce you to this free research
and material HubSpot provided. They did
a whole bunch of experimentations across
all the capabilities cloud co-work is
providing and test across hundreds of
use cases in real world. So they figure
out 12 advanced prompts and use case
that is programmatically useful across
things like automatically analyze
content performance data and propose new
trends to create common business
documents like job description SOP email
sequence as well as getting cloud
co-work continuously organize your file
system for business and even automated
competitive intelligence reports that
can be scheduled every week and each one
comes with a readytouse prompt that will
trigger a predefined cloud co-work
process. So if you're interested in
understanding what the real paradigm
shift cloud co-work is going to provide,
I highly recommend you go take a look. I
put a link in the description below for
you to download this resource for free
and thanks HubSpot for sponsoring this
video. Now let's get back to how can you
use skill plus CRI to replace MCPS. So
agent skill concept has been introduced
end of last year but it start getting
extremely popular past few weeks and the
concept is simple. You basically create
a skill.m MD which including a snippet
of prompt that it will be injected to
the agent when the skill is retrieved
plus the list of resource the agent can
use to complete the tasks. Every time
when you load up a skill it only add a
minimum amount of token in the context
window. Basically cloud code only has
this one tool called SQL and inside this
two description it has a section of
available skills. So you can see that
every single skill you add only
additional 10 to 50 tokens. That means
with the amount of token that is taken
from MCP tools in this screenshot, you
can easily add about 4,000 different
SKUs, which is more than anything you
will possibly need. So when agent
execute skill, the prompt you load up
here will be added to the context. And
based on those context, you can include
instruction about how to utilize the
rest of resource to get either
additional relevant context or execute
some predefined scripts. And we already
see a whole bunch of developers moving
towards the skew based setup that is
creating a much more token efficient
agent. One very popular example is
actually manis. So manis actually did a
whole bunch of knowledge sharing about
how they do context engineering and one
of the key things they did is that they
break down all the agent tools into
different levels. Their fundamental
tools that is always useful like read,
write, edit file capability, things like
that will be always loaded as normal
tools. But for the rest of less frequent
tools, they're most likely put under a
command line that agent can run to
execute. For example, if you add an MCP
to Manis, the MCP is never exposed to
Manis. Instead, Manis agent has this
manus MCP CRI tool the agent can call to
execute MCP and they just add a little
prompt snip to tell agent what type of
MCP it can run. So that when agent need
to use this tool, it can just run the
command line to run MCP instead. And
because it is CRI, it can also run other
useful commands to get more detail and
debug if there's any error. And because
it's CRI, agent out ofbox can do more
complicated actions like piping multiple
different actions together in one go
with some default system function like
wait for a certain amount of time and
even do more complicated action like
passing result A to result B long as it
understand the output schema well. And
this is just such a more powerful and
token efficient way to extend agent's
capability. And to showcase why this way
better, I just quickly go through this
one example. So we all want cloud code
to be able to use a browser test
application or review design. The
browser tool like playride or even cloud
code's own chrome mcp is very
complicated because it will load up a
whole bunch of different tools for agent
to open a tab click on something drag
something typing something and that can
easily take at least 2% of context
window which in this case left only
125,000 effective context window that
agent can use like in this example I use
chrome dev2p to do the UI test of super
design platform and after finish a basic
UI has like this it consume a bunch of
token and in the end it has 87,000 token
left but on the other side with agent
browser what they did is that they
didn't introduce a MCP tools instead
they build a CRI package which is
command that both you and agent can run
to do all sorts of different browser
actions so it can just run those command
line take actions and get context back
and it did a lot of different
optimizations to making sure the
information it return really help agent
understand the page structure what kind
of interactive elements are. So the
content it return here is also a lot
more token efficient compared with other
browser MCP tools and more importantly
because this is CRI there it can be run
directly in terminal all we need to do
is just adding this agent browser skew
that clearly list out how to use this
CRI tool. So with this approach the
effective context window you will get is
already bigger than what you will get
otherwise with MCP tools and all agent
need to do just load up this context and
start running those command line and get
result back and with this specific
example using agent browser with the
same task when it finish it got 117,000
token left that is 70% less token
consumptions and as I mentioned before
this bash plus CRI tool just provides so
much more freedom about how agent can
execute tasks. So one thing I think
really everyone should be doing is
migrate off your MCP to a skill instead.
But to do that you need a way to run MCP
tools through CRI and this is where I
found this open-source MCP CRI called
MCP portter. It allows you to run MCP
directly through command line and it has
all the helper function the agent need
to get more information about tools
within this MCP server like specific
schema that you need to use. So this
basically allow us to do what manus has
manually implemented on their site but
for your coding agent and this is
exactly what I did here. So instead of
having also different MCPS for each MCP
I will just add one skew file. For
example, for context 7 MCPS, I can
directly run this MPX MC porter called
context 7 resolve library ID which is
specific function inside contact 7 MCP
server and passing on the parameters
like this. And if I run this results
will be directly returned back in a
markdown format. And instead of adding
the context 7 MCP tool, I can just add
this one skill.md file for contact 7
where I put in the description about
when to retrieve the skills as well as
detailed description about available
tools it can call. That's why my cloud
code doesn't have any MCP to added.
Instead, it just consume a few hundreds
token for all different skills that I've
added here. And I'm sure I can actually
reduce that token even further by
simplify descriptions. But it's already
much better and can achieve all the
critical actions that we need. Like if I
prompted help me find the latest docu AI
SDK using context 7, it will
automatically load up the skill and
start executing those different command
line to run the MCP. So you can start
immediately save whole bunch of token by
converting your MCP into a skew together
with MC Porter. And I've already started
this process of converting all my MCP
over to SKUs. I even created this one
skill called add new MCPS where I have
this instruction to tell it how to use
this MCP portter how it should install
test MCP server and create a relevant
skills for example I can just add any
MCP paste in cloud code and tell it help
me add a new MCP skill then it will load
up those contexts start adding the MCP
to config and check whether the MCP has
been installed properly create a folder
for Excel skill which detailing all the
functions that agent can call to use
this Excel MCP. The best thing is after
adding this new skills, it only add a
few new tokens into the contact window.
So this example of how you can get all
extended capability from MCP into
skills. So you can extend agents
capability much further without worrying
about the performance and agent context
window blow up. If you haven't done
this, I highly recommend you go and have
a try. If you're interested, I also put
a full instruction of the add new MCP
skill in AI builder club. So you can
just copy and use. I have put the link
in the description below for you to join
yesterday and I adopt a similar methods
in a recent integration that I'm
building between super design and cloud
code. So many of you probably know I am
building this platform called super
design which is agent that allow you to
vive design many different options for
your products and we recently built this
super design skills which allow cloud
code to directly calling specialized
design agent and review a design in
infinite camera. In this case, we didn't
go for MCP tool. Instead, we just build
a CRI that cloud code can call by itself
and still doing super powerful things to
add a new design to this Canva and
retrieve different design prompts from
the prompt library to enhance the design
output. Setup is extremely simple. You
just need to install the package by
doing mpm install-g superdesign/ci
at the latest and then call superdesign
login which will pop up this screen to
allow you to authorize and in the end
you can do mpx skills at superdesign
dev/s superdesign skew so that you can
add to any coding agent that you're
using as a skew all we need to do just/s
superdesign and prompt it load up the
instructions contextually and start
experimenting with different design
directions all those complicated
functions are done just through the skew
and CRI itself. So I highly recommend
you go and have a check. I hope you
enjoy this video.
