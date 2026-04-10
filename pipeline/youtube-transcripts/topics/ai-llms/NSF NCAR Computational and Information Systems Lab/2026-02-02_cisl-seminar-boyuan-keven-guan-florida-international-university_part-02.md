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
word_count: 3999
chunk: 2
total_chunks: 3
parent_video_id: "EKv42s8YnOM"
---
another agent will review this and the
chance the second agent will not review
the arrow
in the agent A is also 10%. Then this
audit happens that will make that 10%
tap 10% which means
combine these two agent to work together
the arrow rate job from 10% to 1% is one
10% time 10%. So mathematically we can
prove by having different agent work
collaboratively when this handoff
happens you are not prepare um transfer
the arrow rate there's no arrow
propagation but also by do a audit by
different agents it reduce the um u um
chance of making arrow significantly in
this multi- aent system
and also From the security design um
aspect um we can easily follow which
called zero trust security principle as
of list privilege like in our case we
have avita uh working as a data curating
agent story as a publication publication
agent and diva as a system attrition
agent and all this agent we just
naturally
separate them even by operating
operating system level difference and VA
is working in on a Windows server and a
a taking of a data preparation folders.
It can have access to metadata files. uh
it has own MCP server and mainly because
our um data analyst, data curator um
like a human workers they work in um
Windows machines and then story is more
like a developer roles. They work in the
Ubento server um they use CIFAS mounts
uh access to the same cy storage api.
So this is kind of the agent work mainly
with our developer who deal with more
Linux system and then div.a is more
working as a system administrator that
also work in a in a Linux environment
work with um um
production environment with Linux system
then we don't give div.a capacity for
writing code but div.a have access to
the actual production server, actual cy
storage, actual database. So if anything
that story cannot uh take care by using
APIs, it will send the information to
D.VA and D.VA will take care.
And here is the actual implementation of
this kind of collaborative way of
working between human worker and AI
agent. Um so you can see here um
something before I I go to details this
multi- aent design is not about adding
intelligence but it's more about adding
structure isolation and trust boundary
to existing workflow and the MAS
wouldn't add for sophistication
um is adding structural checkpoint where
arrow can expect it uh isolated and
challenged in each step of your
workflow. So here you can see as I
mentioned aveta on the zoom one in the
in the green label is dealing with data
preparation and story in the zone two um
with purple label is dealing with more
um oentration publication. It have a
capability as a developer to writing
code and um generate skills but is
limited to access to uh repository
servers through API and div.a is the
system administration tools. Uh in this
case specific for data versse and is uh
um pretty much you have a the actual
access through command line to the
actual production environment to
database um web server uh cy storage but
it doesn't have a capability to um
execute or generate code as a as a skill
or tools. it would just use command line
to actually access the server. So you
can see everything start with a VA to
prepare the data package uh send over to
story through the MCP. Story will check
in the package, audit the result. If
everything happen just communicate back
to um uh Anveta and then story will
continue just um um process the data
public publish to the target uh platform
in this case RJS online for um
visualization data versse for discovery
uh Pelican for OSDF data federation
and um there's like a um some except
exceptions s if the the file size is too
large for API to handle uh for the
secure purpose our API is limited to 100
megabyte uh if but in reality a lot of
single file either is stellar image file
or um there there's some video file for
underwater marine biology tracking um so
those file obviously are larger than 100
megabytes in that case um story will
send a request through MCP to D.V.A. and
D.VA will just take over that task. Um
kind of manually. What I mean by
manually is just um the AI agent will do
um a CP command to the actual server uh
instead of using scripts. So this kind
of uh uh use case or demonstration of
how does like a multi- aents working
with human collaborator to have the
current kind of convert the original
smart data pipeline to this uh multi-
aent system type of workflow um for the
MB store data publication in FIU.
Um here are just some use case. Uh
I believe I can show
this is the uh Envita I mean this is for
demonstration one but um I think it's
okay I just show this is the internal
one which have the
um the latest work have been done with
Aveta. So you can see Ameda have
complete four major task. There's like
849 data sets have been processed. 55
SKUs has been built in the library. Um
of course with a human collaborator in
the loop we we have to guarantee it's
100% uh success rate. Um otherwise it
won't be in production. So here is just
the um um the architecture with there's
a multiple roles for builder and domain
experts and different skills. Um
I won't go too much detail. Oh by the
way um this inter interface internally
built is also for auditing purpose. So
we can see was the reason written work
has been done with a date and we can we
can check the details uh if anything
there will be documents from the agent
this document generate by agent
automatically but as a human
collaborator we can always check if
anything is happen um either expected
unexpected so that's required still for
the human side and here you can see some
major milestones
uh as the time I do the uh presentation
in the um uh pelican team. um it only
done the first one which is geo portal
to data versse preparation and after
that we finished the MCP server exchange
uh has been um complete and in
production and there's a um as I
mentioned the two uh three track
framework has been applied fully and
lately we just uh made another um
complete task which is uh we in one of
the FIU research group. They're dealing
compound compound flooding. Uh and we
just take their work over and we um
finish the whole publication by using
this multi- aent platform. Um here you
can see this from their publication.
Some summarize
uh of their work. Um after publish
everything to access online we can see
um the original data has been used and
generate from their study um by
different stations and in the source
Florida and also uh geospatial
distributions
um some basic statistic of the data and
also um you can check the result pretty
quick um for either Pelican uh all the
data has a pelican endpoint and they
have um uh executive layer on the AJS
online and there's also um since has
been published to FIO data versse
instance. So I can show very quick
um like this is the master instance of
that one is automatically generated by
the agent and even with this uh detail
the um metadata. Uh one of the core
requirement for this pipeline is this
data have to be fire principle
compliant. So here you can see it
mention what is this study about? Um how
many station has it been monitoring and
also here it mention the uh
um the actual
layers that have been published in AJS
online. Um let me go with
another
yeah if we go to a specific data set is
also
list it should also yes it's here data
except yeah it's also list the um OSDF
um endpoint which are host in fio palon
region that means um I know encar also
have your own account with um Pyican OS
pool. If you need to repeat the work,
you don't need to transfer data. You can
just by following this uh endpoint and
write your own script in OS pool and do
some computation work uh federatedly.
All right, so let's go back. Um
okay so here I really want to talk about
the actual workflow that um in inside
our department you is like um what I
call like AI is a new member. So
traditionally we have developer lead
which is myself data data facilitation
lead um department manager and we used
to be the core team now with the AI
agent in the loop. Uh we just
continually collaborate with the AI
agent and also with the knowledge graph
we build with the agent. The uh AI
agents recognize the team members. um it
always check the knowledge source and it
will provide uh row specific guidance.
So on top of AI agent as a um
collaborator, it also work as a
knowledge carrier. That means
for this role in your group or in my
group like if we replace any of this
person with another person
instead of we need to provide training
in person the AI agent can give guidance
to that that person like rough training
about what you need to do some knowledge
you need to get familiar with um then
this collaboration will be like
continually improve over the time and
even you need to replace a certain human
collaborator. The AI agents will help in
that sense as providing essential
information, guidance, training to the
actual human collaborator.
And then this is the um um kind of the
summarization of the current workflow
and was the uh uh gaining from our
department. What I I emphasize the
learning is the key. You can see here
from the origin uh phase one like an
initial task we start analyze the uh the
early task which is the uh uh there is a
geological data set we are tasked to
transfer to our data versse. Um the
original step is we only be able to work
with agent scan the original data set
and we only identif identify like 6 68
files and be able to publish to data
versse. So that will take roughly a week
including a lot of detective work with
the agent for a legacy data repository.
Then after the learning period and you
can see the center column which is after
learning period we just allow the agent
AI automatically working with a larger
data repository by himself and then the
AI agent after training with the
knowledge with a skill with a constraint
agent stably finds 15k files in roughly
two hours without human interaction.
ction then we just need to like QA QC
about what is finding um and you can see
there's a big improvement about the
outcomes about the processing times um
human hours required I put zero apps for
processing but humans still required for
Q and QC um and after we do the QAQC
since um during the learning period we
do give sufficient knowledge and while
develop the tools um at the time we do
the QQC the dispatch is reach 100%
automated. Um so this is like a typical
loop of the exeation of learning in a
real world task and then the agent just
improve and execute task by itself.
Um there's some like a production
matrix. Um just on personal feeling is
is managing AI easier than human for
specific handdown task. Uh yes is is it
it it does give a a good sign upon
improvement because uh you can actually
work with the AI agent
at the same time you do the training. So
there's no like um time lost in term of
communication and it it's easier for
agent to redo certain work and generate
code to for on that. So there's some
certain metrics and also I put a
specific like example after training.
It's not like AI agent is getting better
in term of uh performance. Is it getting
faster, more accurate, but also it
getting more structured um as I show in
the box on the top and highlight is um
it's actually
it was during a late time working
session just me and the agent and I
finish something I really want to push
to um data versse and and and report is
done and then the agent actually making
a plan with different faces and remind
me hey look you are the developer role
um based on the knowledge I have
publishing to data versse is should be a
team decision so it give me a phase two
like uh decide on processing scale and
set quality uh quality threshold and
let's wait for tomorrow checking with
the team before you publish you know
that's something easily happening even
to myself but after training certain
things with agent it will take this as a
constraint and not only constrain to the
agent itself but also come back and
remind the human collaborator that look
this is the rule and the standard of the
teamwork and um you better to follow
that. So that's um what I mean by
one aspect that we need for trustworthy
agent AI as a solution in production.
All right. So um just summarize like
what we observed across agent and system
layer. Uh first of all um agent level
which I mentioned as pillar one single
agents are reliable only with structure
and pillar two system level uh good
agents still fail without isolation.
That's why we need to introduce a uh
multi- aent system. Um and um learning
over time is important. Uh improvement
comes from artifact not
retraining. What I mean by artifact is
like skill and procedure accumulate
operationally
or uh with experience and validation and
auditability are required for safer use.
Uh reliability improves without
sacrificing the adaptability. So
overall I think trustworthiness emerged
from combining agent level structure
with system level isolation not from
optimizing
either side alone.
All right. So this is pretty much what
have been done so far with uh system
level solution pillar one pillar two. Um
now there's um of course this is very
new concept. Uh I'm not saying what I'm
doing is 100% correct or accurate. Uh I
believe there's a lot of things that we
can uh discuss and there's like a open
directions. So I'm just throwing
some observation from my end for
everyone here to think about and also we
can we can discuss further. So um beyond
this due helis agent and the multi- aent
system um to be very honest there's
still some gaps um for this agent to run
by itself and to be trustworthy as a
independent worker in the whole working
environment. The gap including
exaggeration validation. Um human is
still currently
arbiturated ambiguous outcomes. Arrow
handling recovery like not all failure
are customizable as priority. So human
provide sematic judgment in normal
cases. Uh resuessment
um autonomy thresholds are not yet
standardized. So that still require like
human involved as a doorkeeper to make
sure everything delivered is 100%
accurate and workflow arration of course
like a run long runninging workflow
require roll back judgment uh that type
of things. So I will say the next
challenge is not um removing human from
the loop but we need to understand how
when and where humans could leave the
loop which has not been um standardized
at this point.
Um so this is kind of I call that
research road map even though
um my role is implement something per
for production.
Um but I do notice this require a lot of
collaborations and um um support from
different uh domains. So this is more
like a research topic. Um so at least on
my agenda in the next uh 3 to six
monthses um my focus will be
understanding um human oversight. um
trying to answer question like where and
why um human inverse uh
in revenue today. So um I need to focus
on instrument human in the loop decision
points. Uh formalize exacuration
validation and arrow classification.
Introduce risk risk aware autonomy
boundaries. Um also standardize hier
hierarch
hierarchical um rack and graph backed
memory interfaces. Um so medium ter
medium terms um let's say in in by the
end of this year um I would like to
encoding human judgment into artifact uh
which answer a question like how does
human oversight become reusable
structure including skill induction from
interaction traces human guided to agent
encoded uh SOP induction from uh
repeated human decision cross domain
evaluation like research data legal um
healthcare
um anything I could reach uh I I'm
curious like from different domain was
whatever I have implement is that like a
reusable or something
um need to be added for different domain
so that's really just from curiosity
part uh and also control the study on
artifact based learning with steady uh
study prompting
long term like one to two years um I
think by the end of 2027
there should be trust aware multi- aent
echos ecosystem
implement in the real world um
environment uh which the question like
where can humans safely step back should
be addressed um from my calendar I think
uh quantitative
Autonomy, budgets um and uh escalate
policy should be there. Uh shared skill
repository and inter agent knowledge
transfer should be established. Uh
formal evaluation of uh emergent
coordination and safety properties
should be welldeveloped. high
reliability reliability development
under uh straight governance constraints
um
should be well defined. So overall I
think this road map is not about
removing human but about making their
role explicit uh manageable and
gradually um reducible.
All right, the final is just open
questions. Um
since we are focusing on human in the
loop boundaries, uh the question will be
which decision point require uh
persistent human oversight and which can
be safely delegated to autonomous
agents. Um of course I want to hear back
from whoever working on similar
environment uh just from your experience
domain expertise
um regarding those question like
transferabilities and what assumption
does the proposed engineer knowledge
architecture transfer across domains and
where does it break down? Um what class
of safeguard are necessary for provide
var variable um guarantees for agent
behaviors in high stake set sightings
and also how should agent system balance
like continual skill acquisition with
the preservation of valid behaviors like
you wanted learning but
how you make sure that learning will not
the learning will be validate and will
not uh affect the existing stable
stableness.
So the central open question is not
about autonomy but also uh but the uh
control the transfer of responsibility
from human to agents. Um so
last part is kind of just um uh the
vision when I talk about this vision
with GBT I asked you to generate this uh
um kind of prediction of how
workflow and roles will be shipped um in
two years. So if we look back about 2023
is still um very traditional like junior
developer data engineer uh devops
specialist and now um it's not 2025
anymore um we're 2026 but when the agent
system engineer in place the role has
been shipped to AI augumented developer
I believe a lot of developer do not even
type code anymore you work with like web
coding type of uh agent it will generate
code for you uh multi- aent architect uh
LM governator um cycle AI collaborator
type of role and I'm kind of seeing in
year of 2027 there will be a trust
ccentric human AI ecosystem
um so uh the role will become
distributed trust supervisor human AI
collaborator designer AIdriven and
safety um auditor uh autonomy um policy
developer type of role
not too far ago like next year um I
believe something going to happen in
this direction um so that's pretty much
about today's talk um hope I'm not go
over too much in term of the time and
thank you for uh your time and listening
um uh any questions about my talk.
&gt;&gt; All right. Thanks, Kevin. Let's give him
a quick round of applause.
Have you gone through this process? You
know, you've learned a lot. H have there
been any areas, you know, where you've
seen, wow, that could be catastrophic if
we don't have trusted AI as you've gone
through this workflow and put in, you
know, bumpers and checks and balances.
&gt;&gt; I'll give a quick one just just at the
very beginning like I I'm trying to have
a system trader which is D.A. I just
presented um and there's uh you know
sometimes in Linux agents is struggling
with directory. So there's one time I I
think it's pretty straightforward just
to do a um auditing work with the um uh
a database uh entries and gener
statistics. So I leave it run overnight.
Uh that's like early September last
year. I'm I'm kind of very optimized
about the agenda AI. So I leave it run
overnight. So second day when I come
back uh it really surprised me like the
whole interface looks different and uh
the data looks different and I just
track back when I see is um the Aenti AI
means a slash and go to a wrong
directory and it the agent scare himself
like well everything disappear there's
no system there's no data and he just
mentioned like I must do something wrong
and I really need to fix this. Uh and
then the agent based on the wrong
directory rebuild the hill system. He
just download the uh at that time I give
too much um open capability to div.a. So
div.a which is just from GitHub download
a brand new data versse implement in
that directory create a new application
and deploy the old one implement this
one and even based on memory making up
all the data and and give a new system
similar to the old one and that's one
pretty terrifying use case that I I I
noticed that oh it cannot be like that
it's we have to do something that uh
otherwise the uh uh AI agent can do
something really cause my heart attack
for um whoever work in the production
project.
&gt;&gt; So I was uh let's say curious about how
you're using large language models to
clean data and I read your paper and it
seems like you're using LLMs to replace
bad data. So, I guess my question is, do
people contributing data sets know that
you're using LLMs to fill in data?
And um do publications who use data on
this system
disclose that it's been edited with
large language models?
&gt;&gt; Is very good question. Yes. Uh and that
that also I would say um simple short
answer that depends. Um meaning because
