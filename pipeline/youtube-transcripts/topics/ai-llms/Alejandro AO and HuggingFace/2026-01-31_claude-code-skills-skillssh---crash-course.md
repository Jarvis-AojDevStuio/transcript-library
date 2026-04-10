---
video_id: "rcRS8-7OgBo"
title: "Claude Code Skills & skills.sh - Crash Course"
channel: "Alejandro AO and HuggingFace"
topic: "ai-llms"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=rcRS8-7OgBo"
word_count: 4071
---
Good morning everyone. How's it going?
Welcome back to the channel. Today we're
going to be covering skills for AI
agents. And the idea is that this is the
only video that you're going to need in
order to understand everything related
to skills. Okay. So, what we're going to
be covering is what are agent skills and
skills.sh, which is the new CLI by
Versel to manage and install skills.
We're going to see a demo of some of the
greatest skills that are out there so
far. We're going to show you how to
create your own skills. We're going to
show you how to share your skills. And
we're going to show you some best
practices when building your skills. And
if we have time, we're also going to
cover a little bit about marketplaces
and plugins by Antropic, which is
another more sophisticated way to share
your skills. And just as a sneak peek of
what we're going to be doing, I'm going
to show you how you can turn a website
that looks like this into a website that
looks much less uh like AI slop built by
Claude using a scale. So let's get right
into it.
Okay. So first of all, what are skills?
Now skills actually started in back in
October of 2025 when Anthropic introduce
clot code agent skills. And this was a
new way to share procedural knowledge
for agents. And it's a very
straightforward and very simple thing.
In short, skills are essentially just
markdown files with very straightforward
instructions about something very
specific. And in order to show you, let
me just open this very quick skill right
here, which is called skill creator.
It's a skill developed by Enthropic,
which teaches uh clot code or any other
AI agent how to create a skill in
itself. And as you can see, it is
essentially just a markdown file with
very clear instructions about how this
works. And up right here at the top, if
you see the row format of this skill,
you can see that it has a YAML header
with a name and a description parameter.
Now, these parameters are very important
because these are the only thing that
the agent sees in context before
actually loading the skill. And that's
essentially all that skill is a very
clear markdown file with very
specialized instructions. And that's
what was introduced officially in
October of last year. Now since then in
December of this year we got the open
standard which was very quickly adopted
by most of the AI agent builders in the
world by OpenAI Codex by Microsoft by
GitHub by cursor everybody was adopting
skills as a way to create portable
capabilities for their agents and that's
when agent skills the open standard
actually came out and after that just a
few days ago actually Verscell
introduced skills.sh,
which is a CLI tool that allows you to
manage and install skills very, very
easily, which is the one that we're
actually going to be using to share with
you how this works. But let me just go
back to one of the skills to show you a
little bit more about how it works.
Actually, the skill I want to show you
is this one right here. It's going to be
front and design. And as you can see,
it's a very straightforward skill. that
contains just a very straightforward
markdown file with a very short set of
descriptions and instructions on how to
build a good front end. And this is what
we're going to be using. So, we're going
to be loading it. There are multiple
ways to add a skill to your specific uh
agent. But in this case, I'm going to
show you the easiest one, which is the
with the uh skill CLI that I just showed
you before. And the way that we're going
to be doing this is that I'm going to be
showing this with two different pages.
So here I have a landing page that is uh
like just very straightforward and very
dumb, very dull. And we're going to be
improving the design using cloud code.
And so in order to do that, I'm just
going to go right here and open CL code
again. But in this case, what I'm going
to do is I'm going to run clot on two
different instances. So the first one
I'm going to load claude code right here
without the scale and I'm going to ask
it to fix the UI of this landing page.
Okay. So I'm just going to copy this
very straightforward uh prompt which
basically just says that fix the style
of the UI of the landing page here. Make
it look modern and appealing. Include
some additional sections with
placeholder text if the text is not
available. Include a FAQ pricing section
with three PL pricing plans, a nice
hero, a few sections that cover
different features, and a CTA email form
so that the user can sign up to the
newsletter. And I'm going to send it
right here. Just to be clear, right
here, I'm going to be sending it without
a skill. Okay. So, there you go. And on
the other side, what I'm going to do is
I'm going to going to load the same
landing page, but this time with a
scale. So, what I'm going to do right
here is I'm going to be using the npx
CLI as I told you before. And the way to
do that is very straightforward. You
just do npx scales add and then the
owner and the repo. So, I'm just going
to copy this right here. Just going to
paste it right here. And from here, what
I'm going to do is I'm going to come
back right here to the skills from
Enthropic that I told you before. Just
going to copy the owner and the name of
the repo. And let me just paste it right
here. It's going to ask me if I want to
install the package. Of course, I want
to say yes. And there we go. We can
select the skill that we want to use. In
my case, as I told you before, it is
front end design. I'm going to enable it
for all detected agents.
And I'm going to install it in the
project scope, not my global scope. And
then I'm going to use the sim link. And
then just proceed to the installation.
And now my skill is installed. If I go
to clot and I do /kills, I will see my
front end design skill right here. So
what I'm going to do is I'm going to
copy and paste the exact same prompt
right here. But this clot instance does
have a skill for front-end design. So,
let's see how it does. And here it's
asking me to accept the changes that it
wants to do.
And there we go. On the left, we have
the first one that is already finished.
It finished with without the scale. And
it does look a little bit better than it
was before. It looks very professional,
but it still looks a little bit like it
was made by AI. And let's see how this
one on the side um ends up once it's
finished.
And there we go. So now it's finished.
Here we have the super cool design.
Actually, I do think it's way better
than this one on the on the left. It
does look much more professional and mo
much less like AI slop. And as you saw,
the only thing that we did was use the
front-end design skill. Uh so we went
from this AI slop kind of website to
this much more professional kind of
website.
All right. So now that you understand
better how the skills work and how you
can install them, you can go back right
here to skills.sh.
And you can see that here there are a
there's a list of a lot of very
different skills. All of them are very
popular and all of them are for very
different things here. For example, you
can have the skill for remote for
editing videos with uh cloud code or
your AI agent. You also have other web
design guidelines from Verscell. You
have the find skills skill from
Verscell. You have an agent browser. You
have SEO audit. You have a bunch of
different skills that are pretty useful.
So feel free to take them out and to
experiment with them. Now this right
here is probably for another video. I'm
going to actually be making a complete
video about this. But uh just so you
keep in keep this in mind and keep this
as an example of what you can do with
this cured hogenface. We have a set of
very powerful skills in this repository.
So if you want to take a look at it, you
just go to hug and face uh skills
repository right here and then you go
right here to skills and you will see a
list of the skills available. And from
here I want to show you for example the
model trainer skill which is a new one
and it literally teaches your AI agent
to train or fine-tune a model from
scratch with a data set that you can
also use the data set from uh from
hugging face. So, as you can see right
here, we have the skill.md file, which
specifies how to do all of the
fine-tuning and the training with TRL.
And then right here, you have all the
additional references in case your agent
requires more specialized instruction
for its specific task. So, for example,
the TCO guide, etc. And right here, you
also have the scripts that the agent
will run when the task requires it. So,
for example, a data set inspector, the
estimate coast um script, a trend gpo
example, etc. So, you have a bunch of
different things right here that are
going to be quite useful for your agent.
So, now let's actually take a look at
building our own skill. And in this
case, I'm going to be building a skill
for one of my personal projects, which
is for video editing. So, let's take a
look at it.
All right. So, as you can see right
here, I have created a new repository
where we're going to be creating the
skills. Now, the skill that we're going
to be creating, we're going to be
creating it to share it with other
people. Uh, creating the skill right
here will not necessarily load it into
our agent. We're just going to be kind
of working on a coding project, but not
necessarily executing the coding project
ourselves. So um what we're going to do
first uh whenever you want to initialize
a repository or a skill that you want to
share in the repository where you want
to build it you're going to have to
create a new uh directory called skills.
And from here you're going to want to
create the actual scale that you want.
Now in order to create the skill uh
we're going to want to use the npx
scales CLI that we had already started
using. So, [snorts] if we do skills
right here, help, you're going to see
that you have a bunch of different
commands available. You can either
search for other skills available. You
can initialize a skill, which is the one
that we're going to be doing, and you
can add a new skill, which is what we
have already done before. So, in this
example, we're going to do npx skills
initialize, and we're going to call it
video editing. But very important,
remember that this has to be inside my
skills directory. Okay, just going to
initialize it like that.
And there we go. Inside skills, we have
my new skills.mmd skill MD uh inside my
video editing directory. Okay. So now
this right here is already a skill that
I can start sharing. And alongside it, I
can add uh scripts, references,
additional markdown files, um templates,
etc. that I can link to from this skill.
Okay. But uh in this example, I'm just
going to be creating a very
straightforward one. And now what I'm
going to do is I'm going to install the
skill creator skill to teach Claude how
to actually create a skill. Okay. So
let's do that. In order to do that, I'm
going to use it right here. Remember
that if you go to skills.sh,
you have Wait, if you go to skills.sh
right here, you have a bunch of
different skills that you can use. One
of which is the skills creator by
Anthropic. So this one was developed by
the creator of the skills themselves.
And you're going to just copy the nice
simple copy paste um line right here.
And what I'm going to do just show you.
You can see that it opens the
interactive installer. You can either
install it for all possible agents which
is going to create a bunch of different
uh hidden folders right here. But in my
case, I just want it for cloud code. If
you have already done that, you can you
will see this little option right here,
which is same as last time. In my uh if
you don't see that, you just go right
here and select which agents you want.
In my case, it is only cloud code. So,
I'm going to enter this scope. In this
case, I want it to be uh um restricted
to this project. I don't want all my
projects to be able to use this scale.
So, I'm just going to select that. I'm
going to use copy to all agent since
there's only one. So, I'm just going to
go for that. Now, let's proceed to it.
And there you go. So, as you can see,
that has created my clot uh hidden
directory with my skills. And inside of
it, we have the skill creator uh skill,
which basically has the instructions on
how to create a skill written by
anthropic right here. And now I can
actually ask cloud code to create a
skill inside this file right here for
whatever I want. Okay. So let's open
this back right here. And now that this
thing is installed, let me just show you
that I actually have it available. If I
do skills available, you can see that
the project skills we have skill
creator. Okay. And this is the one that
we're going to be using. So let's
actually have it create this skill. So
in order to create the skill, what we're
going to do is first of all the skill
that we want to create is a skill for
this CLI. So I actually use a CLI tool
to edit most of my videos. So I
basically [snorts] remove the silences,
remove all of the uh enhance the audio,
maybe clip some stuff, uh enhance uh the
videos, and then concatenate the clips,
etc. uh and all of that I do that I do
it with a very straightforward CLI tool
that I coded in the past few months. And
what this does is it essentially allows
me to use these commands right here. So
video tool pipeline video tool video uh
transcribe or video tool video
timestamps to generate the timestamps of
my video. And I can already use it, but
I want to teach Claude to use it. So I
can just copy this URL, go right here
and ask it.
and I'm going to paste the URL of my
GitHub repository so that it is able to
actually read my code. Now, something
very interesting about this is notice
that my skill is completely contained
inside a skills directory. So, I can
have a bunch of different things right
here. I could actually be doing inside
the GitHub, inside the actual repository
of the CLI, just add the skill to teach
my agents how to use the CLI contained
in that same directory, which is
actually what I have already done. I'm
going to show you uh in just a moment.
But let's just execute this and see how
it does.
And there we go. We have the scale that
is already created. And you can see that
it was created right here. and it was
created by cloud code which is of course
great and um ideally my cloud code is
already able to install it and use the
CLI tool user wants to browse a video
installation how to install the CLI tool
how to configure it how to process
videos how to concatenate them etc so
this is already very useful let's just
save this and uh push it to a repository
Sorry.
All right. Now, right there, I just
showed you how to create a skill from
scratch, but actually I'm just going to
show you how the actual skill looks like
in production. So, right here, I have
the skill actually not in its own
repository, but in the repository of the
same CLI that it is teaching the agent
how to use. And that is convenient in my
case because the skill is completely
dependent on this tool, which makes it
much easier to update the skill whenever
my tool is updated because they're all
in the same repository. And I can just
have Claude update the skill if I update
the CLI too. So remember that the entire
set of skills that you're going to have
in your repository is going to live
inside the skills directory. And inside
of here I have my skill which is video
tool. And right here I have actually
added a few extra files. So I have my
main skill.mmd file with the
description. Remember the description is
very important to describe to claude or
to your agent what uh this um skill
actually does so that it can actually
load it into context if it is necessary.
And here is the description. And I also
have a few workflows right here that are
quite useful and I have some templates
because I also use it to generate
descriptions and to generate SEO
keywords and social media posts etc.
Okay.
So as you can see this is what a skill
looks like and it is inside ski the
skills directory and this is exactly the
same as what is happening for example at
anthropic they have their skills
repository but within it they have the
skills directory with all the skills
just like I showed you. So right here
they have their for example the front
end design with with the skill.md file.
Uh here for example let me show you the
one from hugging face. As you can see
right here, if I go to my uh repository
at hogenface, you can see that this is
the entire repository where all the
skills are located, but all the skills
actually live inside this skills
repository right here. And this is very
uh useful because this is actually a
plugin like an actual plugin that you
would have to add as a marketplace to
cloud code if that is what you wanted to
do. But in this case, I'm just using it
as a skills uh repository. And here if
we go inside skills you have all the
skills available which for example you
have the model trainer which I already
showed you with the [snorts] skill.mmd
scripts and that's all. So now now that
I have uploaded this skill right here I
can actually install it in cloud code.
If I just remove this right here and I
do npx and I add this scale right here
it's going to ask me which one I want.
So I wanted to uh use cloud code. I want
it to be in this project and I want it
to be a sim link.
And uh there we go. So I can just say
yes. And there you go. So now it has
effectively installed my skill. Let me
just open that. Actually open this again
just to show you. Here we have inside my
agents. Here we have my video tool skill
which is the one that I just cloned from
my repository from up here. Okay, so
that is how you create your own skills
and how you share them with skills.sh
which is likely the most I mean the
easiest way to create your a your skills
for your agents. So definitely take a
look at it, try it out. If you have
workflows that you find yourself doing
over and over in cloud code or your own
uh AI coding assistant like Codeex, etc.
Uh feel free to just create your skill
for it. And at first it will most likely
not work. You're going to have to work
iteratively on that skill until you
achieve a state where you can actually
just delegate to Claude the whole thing.
That's how this works. you have to teach
Claude also the edge cases to make sure
that it handles them well. Add them to
the skill. Uh always remember to use the
skill that I showed you which is skill
creator. And uh there you go. Now you
know how to create skills, where skills
come from, what they actually are and
how to share them.
And last but not least, let's talk about
the best practices right here. So always
remember that you can start by using the
existing skills to actually get a hang
of them. Also create your own custom
skills which you have very specific
workflows that you want cloud code or
your own agent to learn how to do. Share
the useful ones with the community so
that they can also take advantage of
them. Use global installs for tools that
you're probably going to want to be
using over different projects. So for
example, skill creator can be a good one
or front-end design if you're a
front-end designer. and use project
installs if this is a skill that you're
going to want to use only for the
project that you're currently working
on. And uh there you go. Remember also
to generate log files once you have
validated that your skill works
correctly so that you don't accidentally
start using a skill that you did not
validate. And there you go. Just
remember that in order to use skills,
the skills CLI by Versel actually makes
it very easy and very straightforward to
uh initialize new skills and to load
skills from other repositories uh that
are already out there on GitHub. Also
remember that in order to create your
skills, all you have to do is create a
skill directory inside the skills
directory of your repository. And in it,
you're going to have to add your scale.m
MD file, which is going to be the entry
point of your agent for that scale. And
then all the additional resources that
are going to be linked to from this
skill.md.
And your agent is going to figure out
all the rest by using the skill creator
uh skill. So there you go. Thank you
very much for watching and I'll see you
in the next one.
