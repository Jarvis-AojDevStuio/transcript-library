---
video_id: "EKv42s8YnOM"
title: "CISL Seminar – Boyuan (Keven) Guan (Florida International University)"
channel: "NSF NCAR Computational and Information Systems Lab"
topic: "ai-llms"
published_date: "2026-02-02"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=EKv42s8YnOM"
duration: 3733
word_count: 3998
chunk: 1
total_chunks: 3
parent_video_id: "EKv42s8YnOM"
---
All right, everybody. Thanks uh for
joining today's Sizzle seminar. Um we
have a virtual speaker today um that's
dialed in to the seminar and um so we're
pleased to have him here with us today.
The topic is Agentic AI in action
building reliable multi- aent systems
for research data workflows. And uh
joining us today is Kevin Guan uh who's
the lead developer and research
scientist at the organization Florida
International University. uh he works
with the GIS center as well as the FIU
libraries and he's a research scientist
and lead developer at the GIS center
within FIU libraries and his work sits
at the intersection of agenic AI uh
research data management and largecale
cyber infrastructure and he focuses on
building reliable production grade
multi- aent systems that coordinate
large large language models with
persistent memory governance rules and
executable workflows. Um, so I've been
working on a project uh with the
integration of ENCAR's data services
with the Open Science Data Federation
and that's how we were introduced uh to
Kevin's work at FYU and I found it of
interest especially to those of us that
deal with data curation and just if you
have any interest in how a aentic AI
workflows and coding works in general I
think this should be of interest. So
thanks so much for uh joining us today
Kevin.
&gt;&gt; Thank you. Thank you for the opening and
introduction. Uh good afternoon
everyone. Um um he already introduced uh
uh this is Boyan Kevin Guan from FIUJS
center. Um today's topic I slightly
chain a little bit. Um so I going to
focus on trustworthy agent AI from
production failure to engineer
solutions. Um just to start with um I
would like to have one of this opening
slides to talk about trustworthy agent
AI system which must be reliable,
auditable and the governance under real
world constraints. Uh it it's not just
capable. Um in that sense um today I'm
going to focus on pretty much two
dimensions of how I build a system
solution to maintain um a trustworth
trustworthy agent AI. So pillar one is
about reliable agents which is agent
level trust. Uh I got to focus on how do
we make a single agent reliable over
time. uh including explicitity explicit
behaviors uh structure domain knowledge
reusable auditable skills controlled
learning adaptions um the solution we
call that dual helix plus threetrack
architecture and pillar two is about
reliable systems which is a system trust
um how do we prevent failure from uh
cascading crowds different agents uh
which is solution including row
separation privilege isolation audit the
handoff uh human in the loop boundaries
um which is the solution in that sense
is a multi- aent system
here's the outline about today's talk I
going to cover the motivation um like
when a genti fails in production and
also going to cover uh two following
section about pillar one uh reliable
agents and pillar two reliable systems
and then the last session will the kind
of open discussion, open directions um
for um in general multi- aent system
agent solution for research data
research data management. So I can start
with the motivation part. Uh I'll
briefly just introduce what's this uh
product in in uh MA store about um to
starting with MA store is uh SFounded
products. Um the main purpose is it give
a um we we we set a pretty uh universal
level storage. Uh currently we're
hosting 2.7 pabats um dedicated
um serve as a universal storage for
research data management. On top of that
we do have different components for
computation, data federation,
visualization um and also for discover.
Uh each of the system consists of uh uh
FIO HPC center branding as Raptor uh
Pelican and OS pool taking care of the
data federation AJS online um for
geospatial data visualization and data
vers for discovery. The problem is uh
when we present this platform to the
research group in FIU
um it's hard for them to kind of move
forward with a platform like that. Um
it's not their like a daily work to
learn how each component works. It is is
the learning curve is there. Um and
we're trying to go with like a
traditional data pipeline way with
scripts. However, when when we deal with
um currently we're dealing with over 30
research groups in FIU,
um their data schema, data format, uh
metadata and domain knowledge are
varies a lot which make the traditional
scripting type of um I'll say rulebased
system not work. you you need you need
to like customize each of them for each
group or each data set. And then we try
just purely AI agent um dump everything
to a chat GD type of solution is still
not working and uh is not stable and
then we come up with this type of um
smart data pipeline. Um we implement
this pipeline at the early stage of
2025.
Um and we kind of retire that by
September 2025. Um just by looking at
this chart um you can see from the left
side the input will be sort of data lake
and it's still following a traditional
data pipeline way and the way we bring
the uh large language model as a role
here is we are we're we're just
replacing a a note with a large language
model uses capability of reasoning
generating code and and auto smartly
choosing the decision and with a a
curated tool set. So this is kind of a
um
it's not say a tradition but I'll say
like a a a beginning stage how we use
genai
as a t task executor to replace a
traditional uh deterministic tick
system. And then when we implement that
into production, we notice some failure
mode. Um, first and foremost, of course,
I believe a lot of people have here must
experience that whenever you have a
genai component in your system, um,
you're dealing with, uh, inconsistent in
production. Um
the output is non-deterministic
which means if you give a identical
input it does not guarantee identical
actions and in reality the same task and
same agent it will give it will not
necessarily give any
certain same result that's generate
problems and also is there is generally
like a run-to- run variations uh the
first run it works and it might pass
your test with many runs but still when
in in production the second or third run
might just give you a h hallucination or
refural or just formatting errors. So
the root cause is whenever you deal with
um or or or you bring in a larger
language model into your workflow um the
large language by itself is um stateless
exaggeration and a also each language
model have a limited context window by
deal by use that context window for
different task um it cause context drift
as the conversational history grows the
model attention maximum lose focus on
original constraints. So that's caused a
problem and there's no explicit explicit
governance. This is kind of like a the
nature of language model.
Then uh I believe some of you have
already tried existing method which like
uh prompt engineer fas prompts even you
can build a rack system to give
different um reference um for the
language model to check.
We have tried the same thing and we also
build like we call that three track um
um um framework to do the contact
engineer. However, at time we tried
that, we noticed there's sort of sweet
spot. Um, when you bring the uh genai as
a component for your system. Um, so
that's something I'll say that's
something new when you think about this
paradigm shift from traditional
rulebased system to a genai type of
system because um, language by itself is
based on probability. Um we can try as
much as we do in our case I show in this
chart. Um some of tasks like intention
analysis, data cleaning,
um data schema awareness with a um the
the AI agent we build um with all the
method we have been applied we can reach
a correctness to 90%. which is pretty
good. And we know that we can push
forward. We can push it to 95, 98, 99.
But trade-off is the more you're pushing
the number to go higher, you lose the
intelligence. Uh eventually you you can
go 100%. Which means you just end up
with a chatbot. um with everything
define in the back end as a dictionary
like a rubase. Um the the the language
model will check your vocabulary or
dictionary and and do everything
mechanic. Then um back to the question,
what's the point? You you want use a a
language model. you you still want keep
a certain level of intelligence and and
um selfawareness
conscious and make decision for you
right um then I'll say there's a
engineering constraint and a trade-off
um you need to keep the balance in our
case um a good agent in our workflow is
the agent with roughly like 90% of uh
accuracy um that's kind of comfort zone
is pretty good and stable but it also
keeps some of flexibility to deal with
your question with its own knowledge
base its own um sort of reasoning
capability and then
by having that in consideration it give
another problem which is why a single
agent smart data pipeline will break in
production because the arrow propagation
the security um uh uh coupling and also
independent verification is still there.
Um here is just high level abstraction
from the left side of our um smart data
pipeline. It it just go with ingest of
data, cleaning, normalization, metadata
generation and publication. So several
steps and there there of course there's
like sub task in each task. So roughly
there's like 20 to 30 steps micro steps
for a language model to take over and
here very simple math is if you ask a
let's say just the best agent we have
developed so far with so so far with 90%
accuracy the arrow is just just pass
forward in each steps um which is the
formula is here is 90% to the power of n
representing the steps. That means just
roughly after 10 steps the accuracy drop
to uh 34%. Which means if you keep going
with your single agent pipeline
mathematically we can prove it will make
mistake almost like for sure eventually.
So that's like the system level. Um when
you have a single agent in the pipeline
it will not deliver um stability or
trustworthy solution for your own
workflow. Then the production failure
just reveal like two distinct problem.
One is agent that are naturally
unreliable individually and then system
that are unreliable even with good
agent.
That's kind of the problem we find in
production implementation and the
motivation for build the the the current
system we're using. And this next
section we'll start I will start
covering which is the pillar one the
reliable agent um also known as the
agent level trust. here is just um if we
zoom in just to the agent level trust um
we can focus on failure modes of uh RM
based agent in long run system um in
that sense u I will kind of cateorize
that into exaggeration nondeterminis
determinism
under context drifting uh on bounding
action space without governance
constraints attention degression and
knowledge fra uh fragmentation, absence
of persistent and structure memories and
also objective marupia and local
optimization bias. I think the first
four is kind of common and the last one
if you're not get a chance to actually
work with agents um in your daily work
routine um you may confuse what is what
I mean by objective myupia and local opt
optimization bias. So I give kind of a
uh example on the right. I know the the
text might be too small to read. So the
condition is um on a specific
kind of typical day work I'm kind of
build a graph database and um I notice
graph database have some problem like
missing links or mislin between
different nodes um roughly there are I
think 150 or 140 some nodes so I just
ask my agent that hey look there's a
graph database is pre-built and there's
some missing links and uh misreation
between the nodes. I want you to read
each nose, understand what's this node
for, rebuild the link among different
nodes. Um for me, it's kind of I kind of
know that within the context window of
the task, um the agent should be able to
just fix that. So I leave it running and
I just step off for dinner and and come
back in two hours. Uh what happened when
I come back? I I do see the result.
There's a visualization of my graph
database. I can see everything is
connected. There's no mislink. Uh but I
also noticed that the the whole graph um
shrink a lot. It's not 140 or 50
anymore. It's like roughly 50 to 60
nodes only. So uh obviously something
wrong. So I I kind of go back to see um
the lock been print by the agent while
it's is kind of working on this. And
it's pretty interesting when I see the
lock um as you see on the on the side I
put there um the agent is is is taking
the task and start talking to itself is
that wow the the graph has 147 broken
links. the original graph are full of
cross reference between task but they
are using different IT format and and
that doesn't match which is correct
which is the root cause for the problem
and then the agent kind of starting
analysis problem and giving himself two
options option one is let me fix all the
broken reference 13 147 of them which is
tedious and then the agent give himself
Option two, which is just show the
internal connection within each graph
and ignore cross link for now. Which
means um
it do zoom into this specific request
which is get rid of missing links but it
kind of ignore the original request
which is fix the graph database missing
links problems. Then that's how I see
when I come back in two hours the agent
just just show me a smaller group of
graph with everything well connected but
get rid of all the notes which is very
risky in production. I mean later I'm
just saying oh no no no don't don't do
that just just create a rule for
yourself always check with me if you
there's like multi- option for each
task. So this is like a typical case
agent can go wrong when the object
marupia and local optimization bias
happens just for a single task.
And then
when we know this is kind of like the uh
failure mode, we want to build a system
like a aenti AI agent that has
persistent memories um externalized
memory that give documents graph
artifact. So it will not lose memory and
it the the agent should have structured
two exaggeration with state tracking and
validation and also the agent should be
able to inexplicit or reactive planning
capability within a single interaction.
And then the agent should have expertise
which is domain specific competence with
v curated knowledge and reusable skills
and also which is very important like
what saved me in the in the previous
slides is um everything produced by
agent there should be a way we can audit
so we can we can know like right away
something go wrong and we can check. So
this is kind of the design purpose in a
in a single agent level how we can
deliver a trust versus uh trustworthy
um agendic AI solution.
um to formalize um this is kind of core
components. Domain knowledge which
answer question like what is the data
versse which GS database are store in
shared infrastructure
behavior and rules something like
require human confirmation before
destructive action like I just show a
slice before um the skill exeuation
uh which is like a deploy front end
service retrieve credentials copy
artifacts to production uh and then of
course you need actual tools like a
Python scripts, uh gcripts, postgrace,
uh email service that the agent can
execute uh upon
and then here is the actual framework
which I call that three track
engineering knowledge architecture. Um
you guys think this part of the the um
actionable framework for context
engineering. So track one behavior like
the governance layer which can define uh
communication protocol
code quality standards uh safety and
authorization rules. Um track two is a
domain knowledge uh which is a sematic
layer. Um that kind of include the
system architecture core concept uh
components relations and track three is
the actual skills which is step-by-step
procedures
uh preconditions and access check uh of
course require scripts and environmental
variables.
And when we implement that into systems
um pretty much your system will look at
this like three components on the top is
there just whatever solid um large
language model you choose can be GPD4 5
uh cloud sonnet uh jam 3.0 O 3 O Pro. Um
even you can you can go with uh open-
source family like Llama um whatever you
choose. And then
the the center box is the expansion of
the language large language model with
the
context engineering framework we just
introduced with three tracks. uh you
kind of connect the language model to
your behavior rules the skill where you
just define and also the knowledge then
whenever the language model just
executed
by the knowledge you provide and also it
will be bounded to the behavior rules.
So it will what I mean by bounded is
when they see like multiple option the
language language model should know let
me stop and check with a human
collaborator before I I make something
wrong and then the output will be a
reliable domain AI agent uh with
consistence outcome expertise for domain
knowledge self-involving and high
quality skills to make actions so there
are two arrow I don't um mention here
one is this system is just quickly adapt
to
evolution in the whole genai industrial
that means on the top whenever there's a
new language model appears and
appear to be more suitable for the
domain case you can easily replace that
and on boarding time with this um
knowledge graph or knowledge
architecture will be very quick. I mean
less than two minutes to read this
information. And then another arrow in
the bottom which is the learning
capability which is also a key win
factor for this framework is uh whatever
your agent AI agent learn from um
practical actions.
um the agent should just learn from
there and also contribute back to either
a new rules of action or new skills or
new beh uh knowledge. So as the identity
AI agent work with the real world task
it will just enhance this uh knowledge
graph expand from um the out ofbox
language model. So it's kind of real
self-learning agent.
And then um
here just show like how I kind of train
this AI agents to be able to link
everything. So is a graph-based
retrieval and memory structure that
generalize pre um the existing graph
rack approach beyond entities is
relation knowledge to operational and
governance artifacts. So the agents
working memory is not just facts but
also procedures policies and how they
relate when something break that we can
see why. So here you can see I put some
screen capture um which is kind of the
auditable tool and visualization to show
the result of the uh the training
process. At the beginning when you just
just throw in those knowledge uh skills
and um behavior rules, it's just just um
scatter dots in the database and little
by little in the training it will
connect the dots and that will be
functioning as a a mind navigation for
the agent AI to um read information and
follow that. So here I will show
the actual graph. You can see here
um this is the actual graph. You can see
the visualization of the brain of the
Genty AI just for the domain um
knowledge part. So here you can see just
for one I will say data versse to RJS
online
trans transformation
this is a skill and this skill has a
subs skill which is data data versse
schema validation and by using data vers
API but also the green dot dot means
knowledge. So you can see um then by
executive skills it guided by um the
production gflow and it have other um
our departmental um documents guiding
this the skills and also um there's a
constraint called cursor workflow g so
this is kind of uh we do use cursor as
uh like a human AI uh wipe coding
interface. So there's a certain rules
that you have to go with different
branch of the uh cursor g. So the you
can see the the blue dot is a
constraint. So when the agent executed
tools, it will know oh I need to follow
this certain commit um workflow to make
a standard for other user in the group
to use. So this is kind of a
virtualization of how um this knowledge
graph with three tracks interlock each
other um and related and kind of guide
aenti AI to work in a stable way.
All right. So this is pretty much how I
build the
um the agenda AI agent in the agent
level to make it kind of stable and
reach that number 90% roughly for each
task in our center
and then I'll talk about like a system
trust uh with multi- aent system
here is uh why multi- aent system works
um why it can solve arrow preparation
um security coupling and the lack of
individual verification continue with
the same thing I mentioned earlier about
the arrow propagation thing with a
single agent API. So you can you can see
that I kind of expand that through
single agent smart data pipeline to
multi- aent with auditable handoff. Um
so you can see see that it's not just
adding isolation agent by doing
converting a single agent pipeline to
multi- aent the kind of magical thing
happen magic uh automatically is when
you have agent A handling injects and
agent B handling cleaning works instead
of transferring model uh the arrows by
itself. There there is a handoff between
agent A to agent B. When this handoff
happening, naturally the the the next
agent will do audit. It will it will
review whatever generated by agent A
before it will take action. What's that
mean? back to the the the the simple
mathematical app proof that uh 90% to
the power of n different steps when this
handoff and audit happen that means you
have agent A has 10%
probability to make mistake and then
