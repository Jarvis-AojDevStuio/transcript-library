---
video_id: "u2xcbJNhZIY"
title: "The Exact Claude Setup That Writes My Documents Automatically"
channel: "Dylan Davis"
topic: "ai-llms"
published_date: "2026-01-20"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=u2xcbJNhZIY"
duration: 1005
word_count: 4398
---
I haven't written a proposal from
scratch in probably 5 months. Now I just
drop my call transcripts into Claude. It
then gives me back a polished proposal
in about 30 seconds. And it matches my
exact style every single time. So in
this video, I'm going to walk you
through that three-step system that I
built that makes this happen. We'll use
proposals as the example, but it's
important to note that this works for
any document you're creating from
conversations such as contracts, SOPs,
follow-up emails, really any type of
document. So, let me show you how I
built it. This use case, being able to
take a conversation and turn it into a
document or an action, is probably one
of the lowest hanging fruits that I've
seen with any of my clients. And it's
the beginning of where real businesses
start to see leverage through AI
automation. As I mentioned previously,
this is not just for proposals. You can
do this process for all types of
document creation. So, in this example,
I'm going to walk you through proposals,
but you could do this for contracts,
SOPs, follow-up email campaigns, any
type of reporting. And the process is
simple. There's three primary steps. The
first step is figuring out what good
looks like and then reverse engineering
that. So, we already have documents that
we use with our clients, our prospects,
and our employees. In this step, the
goal is to reverse engineer those
documents that are already good, setting
it as a benchmark, so in the future, we
can embed that into an AI. After we've
extracted out what the good looks like,
we're going to then embed this into a
skill so the aesthetics of our reports
look perfect. And then after this, we're
going to embed that into a project so we
can use this on a reoccurring basis. And
all we need to give this project is a
transcript. And that's the simple flow.
The first step is starting with what
looks good. So this is going to be the
document that we're already using. So
you already have contracts you send to
clients. You already have SOPs you give
to employees. You already have proposals
you send off to prospects. All of these
define what good looks like. Now what we
need to do is we need to extract out of
that the structure, the styling, the
fonts, the spacing, all the things that
make the aesthetics the aesthetics for
our documents. So we can ensure that
when an AI writes it on our behalf,
they're not just writing it in a good
way, but they're making it look like
it's on brand. And this is where skills
come into play. It's important to note
that we're going to use Claude in this
case because skills are still only
native to Claude. But like I said in
previous videos, I can almost guarantee
in the next couple of months, Chatbt and
Gemini will both adopt this specific
feature and they'll have it there as
well. All right. So, if you're enjoying
this, you're probably going to enjoy two
other things. First off, Blow is a
30-day AI insight series, completely
free. You'll get 30 insights in your
inbox how you can apply AI to your
business and your work. The second thing
is if you'd like to work with me, Blow a
series of offerings to see if there's a
good fit between the two of us, such as
a private AI community for business
owners and leaders or one-on-one AI
coaching. With that being said, let's
get back into the video. Let's look at
the prompt of how we can extract out of
the document what good looks like. And
actually, as you can see, this is a very
basic prompt. It's not rocket science.
just a few lines. So at the very
beginning, we're asking the AI to
methodically reverse engineer the
document we've given it to ensure that
we can recreate that document going
forward with an AI. Now, two things I'll
call out here. I've mentioned
methodically and I mentioned reverse
engineer. These are two terms that I've
seen that works more effectively with AI
when doing this specific process. So I
recommend using those terms in your
prompt. After that, we're explicit about
what we wanted to extract, but we're
also giving it some wiggle room because
we're saying extract everything. So if
there's something that I've not
mentioned below, the AI is going to take
the power to do what it needs to do to
pull out whatever else I couldn't think
of. And that at the very end, we're
being specific about the fact that this
needs to be pixel perfect. Again, this
is another term that I found that works
well with AI in this specific process, a
reverse engineering a document to get
out something that we can recreate on a
consistent basis. So this is our basic
prompt. Let me actually show you what
this looks like inside of Claude. Now
we're inside of Claude and this is the
exact conversation I just had with an
AI. So what I did is I dropped in an
example. So, this is a template of a
specific type of document that I wanted
to mimic. And in this case, it's a uh
synthetic or fictional proposal that I
would send to a client. So, you can see
it has a very specific style to it.
Certain colors, certain spacings, a
little symbol here in the middle, and
then also when you scroll through here,
you'll see there's a very specific
aesthetic to this proposal. Now, what we
want to do is we want to reverse
engineer that. So, I gave it the
aesthetic both in a PDF format and a
DOCX format. That's important. I want to
give the AI as many file formats as
possible for it to be successful in
reverse engineering the aesthetics of
the file. So that's why I've given it
those two. I then pasted in the prompt
that I just showed you and then it went
off and worked for about I think 10
minutes. Yeah, 10 or 15 minutes. And at
the very end, it has its breakdown of
the spec. So it broke down everything
that's included inside of that document.
So that's the first step. We're reverse
engineering what good looks like. After
we reverse engineered the document and
we have the aesthetics, we want to embed
that into a skill. And that's where
we're going to lock this in permanently
for a skill that we can call on a
reoccurring basis. Now, a cloud skill,
all that is is a bunch of prompts inside
of a folder that the AI can call at any
given time. And the way that we're going
to create a skill is very simple. In
that same thread of that conversation,
we're going to put in a prompt like
this. Again, not rocket science, just a
few lines. So, here we're saying now
after everything that you've learned in
that same thread, I want you to use the
skills creator to create a skill. And
then I'm stating when this skill is
called, it's important that the output
should match exactly a pixel for pixel
perfect match of the original document
that we've based this learning off of.
Now, before you run this prompt, we need
to ensure that skills are turned on
inside of Claude. And the way that we
can do this is by going to our settings.
So, if you click your little profile
here, you then go to settings, you'll
land on a page kind of like this in
general. You then want to go to
capabilities. Under capabilities, you
want to then scroll down to the point
where you get to skills. And here at
skills, you want to make sure that this
is turned on. And also, if you go to
example skills in this toggle here, if I
scroll down, you'll see there's a skill
here called a skill creator. So, this is
a skill that creates skills. I know,
very meta. We want to make sure that
this is switched on so we can use it in
the prompt that I just showed you. So,
assuming you have this turned on, let me
go back to the chat so I can show you
what it looks like. And then right here
is the prompt that I just showed you.
So, I copy and pasted it into that same
thread. So, this is the extraction where
it extracted everything methodically.
And after it extracted it, I I pasted in
that specific prompt. And it's going to
then use the skills creator to create a
dedicated skill. So anytime I call that
skill and it creates a proposal for me,
it's going to be a pixel perfect match
to what my original document was. And if
I scroll through here, this took
probably 5 to 10 minutes again. And at
the very end, it has a skill here. So
it's important to know that you can
select this button here and it says copy
to your skills. When you copy your
skills, it's automatically going to save
that to my skills section. So I can use
it anytime I want. And if you want to
share this with other people, all you
have to do is download this, send it to
them, and they can just upload it into
their skills platform as well. And if I
quickly go back to my capabilities, you
can see that I've already selected copy
to my skills because right here I have
the proposal creator for gradient labs,
my company. And that's the second step,
which is embedding that learning into a
skill so we can use it on a recurring
basis. The third and final step is
putting this all into a cloud project.
So anytime that we come to it, all we
have to do is drop in a transcript and
everything is done for us. And to do
that, there's a few different components
we want to combine. So, first is we have
reference files. So, these are going to
be files that the AI can reference if we
need them. This is optional, but in this
case, I'd recommend if you're having it
draft a proposal, a report, a contract,
whatever else. It should have
inspirational files to reference. So,
either previous proposals you drafted
that have the same exact structure and
tone that you expect to have the AI
draft, or it could have maybe some of
your core offerings that you have. So,
when it drafts a proposal for you, it's
pulling from the specific offerings that
you already provide your clients, or a
few other documents that it could
reference for inspiration. Once we've
added those, we then want to draft our
system prompt. So, we're going to spend
most of our time here to ensure that
we're telling the AI exactly what to do
and how to do it. And then finally,
inside of that system prompt, we're also
going to call the skill so we ensure
that the aesthetics of the report that
we get back is perfectly like we would
like it to be. So, those are the three
pieces that we really need there. Before
you draft your prompt, I always
recommend writing a base prompt. So, the
base prompt is something very basic and
after that, you can then extend it and
really add superpowers to it by using a
prompt improver. So both Anthropic and
OpenAI both offer prompt improvers where
once you provided a base prompt, they're
automatically going to inject all the
best practices for prompt engineering
their models and give you back a much
better prompt that you can get higher
quality responses from the AI in. But
before we get to that, we have to use
the WW framework. And that's how you
write your base prompt. You want to
answer three questions. What, why, and
how. First, we have the what, which is
simply explaining to the AI what we want
it to do. Second, we have the why, which
is telling the AI why we're doing this
in the first place. And the reason it's
important is that often times there's a
lot of stuff in our head that we can't
communicate effectively. But if we tell
the AI why we're doing this in the first
place, it can start to infer from that
other things that we may have forgotten
to say that could give us a higher
quality response from the AI. And then
finally, we have the how, which is all
around constraints. So if there's very
specific things that matter to you when
this report's drafted, you can add that
here, such as maybe the output format,
the structure, the file type, etc. And
those are the three questions we want to
answer. And what I'll show you is a base
prompt that I drafted for this before I
improved it with the anthropic prompt
improver. I won't run through
everything, but I'll walk you through
kind of the sections and why I added
what. So, at the very top, we're
answering that first W. So, this is
going to be the what. We're first giving
it a persona saying you're an expert
proposal writer. Then, we're giving it a
task saying that you're going to receive
a meeting transcript and then it's your
job to then draft a proposal based off
of that. I then state that it's going to
have some examples that I can reference
inside of its knowledge base. And then
most importantly, I'm saying then I need
you to use this very specific claude
skill to ensure that the report that you
provide back to me is aesthetically
pixel perfect. Now here I've said X
within parenthesis. This is actually for
me going to be the name of the skill.
And the same thing should be for you. So
if you copy and paste this prompt and
use it for your own project, which you
can because I'll share the presentation.
So you can copy and paste the prompt.
You want to fill that in with a skill
name that you have. So for me it's
gradient- proposal. For you it might be
something else. So make sure you're
naming the skill effectively here. So
that's the first portion of the what.
Down here, I'm talking more about some
of the what, but also some of the why.
And I'm including some context around my
offering. So I'm saying here are the
offerings that I have to offer. And I
also mention in here as well that I'll
give you a more detailed breakdown
inside of a markdown file that's within
your knowledge base. So noting to the AI
that this is just a one-s sentence
summary or actually two sentences for
two offerings. And then I want you to
look at these. And then after you look
at those, you can also go to this file
as well to get more understanding of
what the offerings are. And then finally
down here I'm giving it more of a how.
So this is around the structure of what
it should give me back when it comes to
the proposal itself. Saying that it
needs to have these six components
inside of the proposal when it gives it
back to me. And then finally another how
is stating that I want this very
specific file type given back to me with
the pixel perfect aesthetic so I can
then just download it and use it. And if
you're not aware, this specific file
type is for word documents. So that's
our base prompt. But we can run this
through a prompt improver and get back a
much more effective prompt to get higher
quality responses from our AIS. And the
way that you're going to do that if
you're going to use Claude specifically
is you're going to go to uh actually
it's a new URL now. It's
platform.cloud.com.
And in here you're going to drop in your
prompt the base prompt and you're going
to say generate. So let me actually go
back because I've already generated this
for myself. You can see once you land on
this page, let me close this too. You're
going to have these options. You can go
generate prompt here and that's where
you paste in that base prompt. So the
base prompt that I just walked you
through over here. I'll copy and paste
this in there.
I'll select generate. But then actually
before I select generate, I'm going to
paste that in. And I want to check this
box here that says is this prompt being
used by a thinking model. Since we're
using a reasoning model opus 4.5 with
extended thinking on, we're going to say
generate and make sure that's checked.
And then you just wait for a few seconds
and then it regenerates that prompt in a
more effective way. So, instead of
walking you through this, I'm going to
go to the one that it's already
generated for me, and I won't walk
through the entire prompt because it is
a similar prompt to what I've just
walked you through. I'll just call it
the areas that are new based off the
prompt improver. So, first off, you can
see that it's saying that you're an
expert proposal writer with the emphasis
that it's writing for this specific
company. In addition to that, it added
these two sentences here calling out
explicitly what it needs to look for
inside the knowledge base, including
previous proposals as well as the
offerings associated to this company.
And then if I scroll through here,
you'll see that the format of the prompt
itself has changed. So it's added these
headers here. So these headers are
allowing the AI to know what each
segment of the prompt is dedicated to.
So it knows that this is kind of the
opener for the prompt. Here it knows
that this is associated to the offering
because of the header. Here it knows
that this is associated to the proposal
structure. And you can see that it added
it in here a variety of ways. So it
knows what part is which when it looks
at it. And the last two things I'll call
out here is if you scroll down here a
bit, you'll see that there's a segment
called scratchpad. So this is oftentimes
this will be included when you use a
prompt improver from Claude. Reason
being is that Claude's models, they do a
pretty good job at actually thinking
internally and critiquing itself as it
works to ensure that it's meeting your
expectations. And it's using the scratch
pad as a way to think internally before
it responds back to you. And then right
after this, if I keep going, you'll see
that it added a format requirement
section and then added the cloud skill
like I mentioned previously. So that's
our improved prompt and now we're ready
to actually embed this into the project
and use it. So let me go to the project
and show you what that looks like. So
here, let me close this for a second. So
here at the very top, all I did was I
pasted in I I typed in this one line,
draft a proposal from the below
transcript. That's it. I then pasted in
a transcript, pushed enter, and then the
AI gave me back a proposal that looks
identical to the template I provided
previously. So, it is a pixel for pixel
perfect match to my expectations. And I
actually have it here already opened
inside of Google Drive. And you can see
this tab here is the template. This tab
is the output. And if I go back and
forth between the two, and I've already
checked this pretty thoroughly, it's
identical to the template I provided.
So, it's doing the job as expected. And
please note that this is all fictional
and synthetic data. It's not a real
client. So, that's the end result. Let
me quickly show you how to create this
project in the first place. So, if I go
back here, you can see this is the
starting project. But if I wanted to
create one from scratch, I would go over
here to the project section. I would
click projects. I would se I would
select new. And then here I would name
it. So here we'll just name it test. And
then we'll do create project. This is
going to create the base project. Then
we want to add a few files. The files I
want to add here for my specific use
case are going to be my core offerings
as well as the the template that the AI
is going to be basing its references off
of. And that's exactly what you can see
in the one that I've already drafted. So
here we have the offerings that I offer
as well as the template that it's going
to reference it's writing off of. And
then in the instructions, these are the
exact instructions I just showed you in
the presentation. I just copied and
pasted them in here. I updated the skill
to call the right skill when it needed
to be called. And then we got that
output back that I just showed you. And
that's how it works. But I want to leave
you with one thing. So anytime you use
an AI, there's a good chance that the
first shot you get back from the AI is
not going to be perfect. And that's
where one of the most important skills
when it comes to any client that I work
with, if they have this skill or this
mentality, they're going to get very
good at using AI and they're going to
create serious leverage within their
business. And that's persistence and
being able to test effectively. And I
want to emphasize the importance of
testing here. And the reason being is
that often times we humans, we have a
certain expectation when we start using
AI. We say this is what good looks like.
And when we start using AI, it's really
over here. So there's a huge gap between
what good looks like in our eyes and
what AI is giving back to us. And our
job as AI native employees, leaders, and
business owners is to get better at
adjusting the AI over time by giving it
better context, giving it better system
prompts, etc., etc., iterating over
time. And as you iterate, eventually the
AI starts to get closer and closer and
closer to what good looks like for a
human. And eventually these start to
converge. And once they converge is when
you can actually outsource that specific
task to AI completely. And again, as I
said at the beginning of the video,
that's where real leverage begins to
occur within a business. So, it's
important to note that you should have
high quality testing and persistence
when using these different AIs. Now, as
a quick recap, as we've stated
previously, we're going to start with
reverse engineering a document that
already is good for us. So, it's a
contract, it's an SOP, it's a proposal,
whatever else. And we're going to
reverse engineer the aesthetics of that
first thing with an AI. It needs to be a
strong AI, too. After we've done this,
we're going to then embed those
learnings into a skill specifically
within Claude. So we can call it at any
time and get the pixel perfect match
aesthetic back from the AI. And then
we're going to embed that skill inside
of a project that has a series of files,
system prompts, etc. So we can come to
it and all we have to do is drop in a
transcript and it's going to then give
back to us the document that we care
about. And that's it. So as a reminder,
two quick things. First off, Blow is a
30-day AI insight series, completely
free. You'll get 30 insights in your
inbox. I can apply AI to your business
and your work. The second thing is if
you'd like to work with me, blower a
series of offerings, see if there's a
good fit between the two of us. Now, you
know how to turn one call into a
polished proposal. But what if you have
50 calls and you want to go across all
those calls to find patterns across
them? Most people drop all of those
files into an AI all at once and then it
breaks. I made a video that shows you
how to process huge amounts of data
without the AI losing track. You can
check it out right here. So go ahead,
click that video and figure out how to
give AI unlimited memory.
