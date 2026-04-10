---
video_id: "7xTGNNLPyMI"
title: "Deep Dive into LLMs like ChatGPT"
channel: "Andrej Karpathy"
topic: "ai-llms"
published_date: "2025-02-05"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=7xTGNNLPyMI"
duration: 12683
word_count: 3990
chunk: 8
total_chunks: 11
parent_video_id: "7xTGNNLPyMI"
---
learning
okay so we're now back in the huging
face inference playground and uh that
just allows me to very easily call uh
different kinds of models so as an
example here on the top right I chose
the Gemma 2 2 billion parameter model so
two billion is very very small so this
is a tiny model but it's okay so we're
going to give it um the way that
reinforcement learning will basically
work is actually quite quite simple um
we need to try many different kinds of
solutions and we want to see which
Solutions work well or not
so we're basically going to take the
prompt we're going to run the
model and the model generates a solution
and then we're going to inspect the
solution and we know that the correct
answer for this one is $3 and so indeed
the model gets it correct it says it's
$3 so this is correct so that's just one
attempt at DIS solution so now we're
going to delete this and we're going to
rerun it again let's try a second
attempt so the model solves it in a bit
slightly different way right every
single attempt will be a different
generation because these models are
stochastic systems remember that at
every single token here we have a
probability distribution and we're
sampling from that distribution so we
end up kind kind of going down slightly
different paths and so this is a second
solution that also ends in the correct
answer now we're going to delete that
let's go a third
time okay so again slightly different
solution but also gets it
correct now we can actually repeat this
uh many times and so in practice you
might actually sample thousand of
independent Solutions or even like
million solutions for just a single
prompt um and some of them will be
correct and some of them will not be
very correct and basically what we want
to do is we want to encourage the
solutions that lead to correct answers
so let's take a look at what that looks
like so if we come back over here here's
kind of like a cartoon diagram of what
this is looking like we have a prompt
and then we tried many different
solutions in
parallel and some of the solutions um
might go well so they get the right
answer which is in green and some of the
solutions might go poorly and may not
reach the right answer which is red now
this problem here unfortunately is not
the best example because it's a trivial
prompt and as we saw uh even like a two
billion parameter model always gets it
right so it's not the best example in
that sense but let's just exercise some
imagination here and let's just suppose
that the um green ones are good and the
red ones are
bad okay so we generated 15 Solutions
only four of them got the right answer
and so now what we want to do is
basically we want to encourage the kinds
of solutions that lead to right answers
so whatever token sequences happened in
these red Solutions obviously something
went wrong along the way somewhere and
uh this was not a good path to take
through the solution and whatever token
sequences there were in these Green
Solutions well things went uh pretty
well in this situation and so we want to
do more things like it in prompts like
this and the way we encourage this kind
of a behavior in the future is we
basically train on these sequences um
but these training sequencies now are
not coming from expert human annotators
there's no human who decided that this
is the correct solution this solution
came from the model itself so the model
is practicing here it's tried out a few
Solutions four of them seem to have
worked and now the model will kind of
like train on them and this corresponds
to a student basically looking at their
Solutions and being like okay well this
one worked really well so this is this
is how I should be solving these kinds
of problems and uh here in this example
there are many different ways to
actually like really tweak the
methodology a little bit here but just
to give the core idea across maybe it's
simplest to just think about take the
taking the single best solution out of
these four uh like say this one that's
why it was yellow uh so this is the the
solution that not only led to the right
answer but may maybe had some other nice
properties maybe it was the shortest one
or it looked nicest in some ways or uh
there's other criteria you could think
of as an example but we're going to
decide that this the top solution we're
going to train on it and then uh the
model will be slightly more likely once
you do the parameter update to take this
path in this kind of a setting in the
future but you have to remember that
we're going to run many different
diverse prompts across lots of math
problems and physics problems and
whatever wherever there might be so tens
of thousands of prompts maybe have in
mind there's thousands of solutions
prompt and so this is all happening kind
of like at the same time and as we're
iterating this process the model is
discovering for itself what kinds of
token sequences lead it to correct
answers it's not coming from a human
annotator the the model is kind of like
playing in this playground and it knows
what it's trying to get to and it's
discovering sequences that work for it
uh these are sequences that don't make
any mental leaps uh they they seem to
work reliably and statistically and uh
fully utilize the knowledge of the model
as it has it and so uh this is the
process of reinforcement
learning it's basically a guess and
check we're going to guess many
different types of solutions we're going
to check them and we're going to do more
of what worked in the future and that is
uh reinforcement learning so in the
context of what came before we see now
that the sft model the supervised fine
tuning model it's still helpful because
it still kind of like initializes the
model a little bit into to the vicinity
of the correct Solutions so it's kind of
like a initialization of um of the model
in the sense that it kind of gets the
model to you know take Solutions like
write out Solutions and maybe it has an
understanding of setting up a system of
equations or maybe it kind of like talks
through a solution so it gets you into
the vicinity of correct Solutions but
reinforcement learning is where
everything gets dialed in we really
discover the solutions that work for the
model get the right answers we encourage
them and then the model just kind of
like gets better over time time okay so
that is the high Lev process for how we
train large language models in short we
train them kind of very similar to how
we train children and basically the only
difference is that children go through
chapters of books and they do all these
different types of training exercises um
kind of within the chapter of each book
but instead when we train AIS it's
almost like we kind of do it stage by
stage depending on the type of that
stage so first what we do is we do
pre-training which as we saw is
equivalent to uh basically reading all
the expository material so we look at
all the textbooks at the same time and
we read all the exposition and we try to
build a knowledge base the second thing
then is we go into the sft stage which
is really looking at all the fixed uh
sort of like solutions from Human
Experts of all the different kinds of
worked Solutions across all the
textbooks and we just kind of get an sft
model which is able to imitate the
experts but does so kind of blindly it
just kind of like does its best guess
uh kind of just like trying to mimic
statistically the expert behavior and so
that's what you get when you look at all
the work Solutions and then finally in
the last stage we do all the practice
problems in the RL stage across all the
textbooks we only do the practice
problems and that's how we get the RL
model so on a high level the way we
train llms is very much equivalent uh to
the process that we train uh that we use
for training of children the next point
I would like to make is that actually
these first two stat ages pre-training
and surprise fine-tuning they've been
around for years and they are very
standard and everyone does them all the
different llm providers it is this last
stage the RL training that is a lot more
early in its process of development and
is not standard yet in the field and so
um this stage is a lot more kind of
early and nent and the reason for that
is because I actually skipped over a ton
of little details here in this process
the high level idea is very simple it's
trial and there learning but there's a
ton of details and little math
mathematical kind of like nuances to
exactly how you pick the solutions that
are the best and how much you train on
them and what is the prompt distribution
and how to set up the training run such
that this actually works so there's a
lot of little details and knobs to the
core idea that is very very simple and
so getting the details right here uh is
not trivial and so a lot of companies
like for example open and other LM
providers have experimented internally
with reinforcement learning fine tuning
for llms for a while but they've not
talked about it publicly
um it's all kind of done inside the
company and so that's why the paper from
Deep seek that came out very very
recently was such a big deal because
this is a paper from this company called
DC Kai in China and this paper really
talked very publicly about reinforcement
learning fine training for large
language models and how incredibly
important it is for large language
models and how it brings out a lot of
reasoning capabilities in the models
we'll go into this in a second so this
paper reinvigorated the public interest
of using RL for llms and gave a lot of
the um sort of n-r details that are
needed to reproduce their results and
actually get the stage to work for large
langage models so let me take you
briefly through this uh deep seek R1
paper and what happens when you actually
correctly apply RL to language models
and what that looks like and what that
gives you so the first thing I'll scroll
to is this uh kind of figure two here
where we are looking at the Improvement
in how the models are solving
mathematical problems so this is the
accuracy of solving mathematical
problems on the a accuracy and then we
can go to the web page and we can see
the kinds of problems that are actually
in these um these the kinds of math
problems that are being measured here so
these are simple math problems you can
um pause the video if you like but these
are the kinds of problems that basically
the models are being asked to solve and
you can see that in the beginning
they're not doing very well but then as
you update the model with this many
thousands of steps their accuracy kind
of continues to climb so the models are
improving and they're solving these
problems with a higher accuracy
as you do this trial and error on a
large data set of these kinds of
problems and the models are discovering
how to solve math problems but even more
incredible than the quantitative kind of
results of solving these problems with a
higher accuracy is the qualitative means
by which the model achieves these
results so when we scroll down uh one of
the figures here that is kind of
interesting is that later on in the
optimization the model seems to be uh
using average length per response uh
goes up up so the model seems to be
using more tokens to get its higher
accuracy results so it's learning to
create very very long Solutions why are
these Solutions very long we can look at
them qualitatively here so basically
what they discover is that the model
solution get very very long partially
because so here's a question and here's
kind of the answer from the model what
the model learns to do um and this is an
immerging property of new optimization
it just discovers that this is good for
problem solving is it starts to do stuff
like this wait wait wait that's Nota
moment I can flag here let's reevaluate
this step by step to identify the
correct sum can be so what is the model
doing here right the model is basically
re-evaluating steps it has learned that
it works better for accuracy to try out
lots of ideas try something from
different perspectives retrace reframe
backtrack is doing a lot of the things
that you and I are doing in the process
of problem solving for mathematical
questions but it's rediscovering what
happens in your head not what you put
down on the solution and there is no
human who can hardcode this stuff in the
ideal assistant response this is only
something that can be discovered in the
process of reinforcement learning
because you wouldn't know what to put
here this just turns out to work for the
model and it improves its accuracy in
problem solving so the model learns what
we call these chains of thought in your
head and it's an emergent property of
the optim of the optimization and that's
what's bloating up the response length
but that's also what's increasing the
accuracy of the problem problem solving
so what's incredible here is basically
the model is discovering ways to think
it's learning what I like to call
cognitive strategies of how you
manipulate a problem and how you
approach it from different perspectives
how you pull in some analogies or do
different kinds of things like that and
how you kind of uh try out many
different things over time uh check a
result from different perspectives and
how you kind of uh solve problems but
here it's kind of discovered by the RL
so extremely incredible to see this
emerge in the optimization without
having to hardcode it anywhere the only
thing we've given it are the correct
answers and this comes out from trying
to just solve them correctly which is
incredible
um now let's go back to actually the
problem that we've been working with and
let's take a look at what it would look
like uh for uh for this kind of a model
what we call reasoning or thinking model
to solve that problem okay so recall
that this is the problem we've been
working with and when I pasted it into
chat GPT 40 I'm getting this kind of a
response let's take a look at what
happens when you give this same query to
what's called a reasoning or a thinking
model this is a model that was trained
with reinforcement learning so this
model described in this paper DC car1 is
available on chat. dec.com uh so this is
kind of like the company uh that
developed is hosting it you have to make
sure that the Deep think button is
turned on to get the R1 model as it's
called we can paste it here and run
it and so let's take a look at what
happens now and what is the output of
the model okay so here's it says so this
is previously what we get using
basically what's an sft approach a
supervised funing approach this is like
mimicking an expert solution this is
what we get from the RL model okay let
me try to figure this out so Emily buys
three apples and two oranges each orange
cost $2 total is 13 I need to find out
blah blah blah so here you you um as
you're reading this you can't escape
thinking that this model is
thinking um is definitely pursuing the
solution solution it deres that it must
cost $3 and then it says wait a second
let me check my math again to be sure
and then it tries it from a slightly
different perspective and then it says
yep all that checks out I think that's
the answer I don't see any mistakes let
me see if there's another way to
approach the problem maybe setting up an
equation let's let the cost of one apple
be $8 then blah blah blah yep same
answer so definitely each apple is $3
all right confident that that's correct
and then what it does once it sort of um
did the thinking process is it writes up
the nice solution for the human and so
this is now considering so this is more
about the correctness aspect and this is
more about the presentation aspect where
it kind of like writes it out nicely and
uh boxes in the correct answer at the
bottom and so what's incredible about
this is we get this like thinking
process of the model and this is what's
coming from the reinforcement learning
process this is what's bloating up the
length of the token sequences they're
doing thinking and they're trying
different ways this is what's giving you
higher accuracy in problem
solving and this is where we are seeing
these aha moments and these different
strategies and these um ideas for how
you can make sure that you're getting
the correct
answer the last point I wanted to make
is some people are a little bit nervous
about putting you know very sensitive
data into chat.com because this is a
Chinese company so people don't um
people are a little bit careful and Cy
with that a little bit um deep seek R1
is a model that was released by this
company so this is an open source model
or open weights model it is available
for anyone to download and use you will
not be able to like run it in its full
um sort of the full model in full
Precision you won't run that on a
MacBook but uh or like a local device
because this is a fairly large model but
many companies are hosting the full
largest model one of those companies
that I like to use is called
together. so when you go to together.
you sign up and you go to playgrounds
you can can select here in the chat deep
seek R1 and there's many different kinds
of other models that you can select here
these are all state-of-the-art models so
this is kind of similar to the hugging
face inference playground that we've
been playing with so far but together. a
will usually host all the
state-of-the-art models so select DT
car1 um you can try to ignore a lot of
these I think the default settings will
often be okay and we can put in this and
because the model was released by Deep
seek what you're getting here should be
basically equivalent to what you're
getting here now because of the
randomness in the sampling we're going
to get something slightly different uh
but in principle this should be uh
identical in terms of the power of the
model and you should be able to see the
same things quantitatively and
qualitatively uh but uh this model is
coming from kind of a an American
company so that's deep seek and that's
the what's called a reasoning
model now when I go back to chat uh let
me go to chat here okay so the models
that you're going to see in the drop
down here some of them like 01 03 mini
O3 mini High Etc they are talking about
uses Advanced reasoning now what this is
referring to uses Advanced reasoning is
it's referring to the fact that it was
trained by reinforcement learning with
techniques very similar to those of deep
C car1 per public statements of opening
ey employees uh so these are thinking
models trained with RL and these models
like GPT 4 or GPT 4 40 mini that you're
getting in the free tier you should
think of them as mostly sft models
supervised fine tuning models they don't
actually do this like thinking as as you
see in the RL models and even though
there's a little bit of reinforcement
learning involved with these models and
I'll go that into that in a second these
are mostly sft models I think you should
think about it that way so in the same
way as what we saw here we can pick one
of the thinking models like say 03 mini
high and these models by the way might
not be available to you unless you pay a
Chachi PT subscription of either $20 per
month or $200 per month for some of the
top models so we can pick a thinking
model and run now what's going to happen
here is it's going to say reasoning and
it's going to start to do stuff like
this and um what we're seeing here is
not exactly the stuff we're seeing here
so even though under the hood the model
produces these kinds of uh kind of
chains of thought opening ey chooses to
not show the exact chains of thought in
the web interface it shows little
summaries of that of those chains of
thought and open kind of does this I
think partly because uh they are worried
about what's called the distillation
risk that is that someone could come in
and actually try to imitate those
reasoning traces and recover a lot of
the reasoning performance by just
imitating the reasoning uh chains of
thought and so they kind of hide them
and they only show little summaries of
them so you're not getting exactly what
you would get in deep seek as with
respect to the reasoning itself and then
they write up the
solution so these are kind of like
equivalent even though we're not seeing
the full under the hood details now in
terms of the performance uh these models
and deep seek models are currently rly
