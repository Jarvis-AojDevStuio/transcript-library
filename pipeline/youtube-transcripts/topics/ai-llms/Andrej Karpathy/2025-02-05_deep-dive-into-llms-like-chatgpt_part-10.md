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
word_count: 3993
chunk: 10
total_chunks: 11
parent_video_id: "7xTGNNLPyMI"
---
human assist as a human labeler um
supposed to give the ideal response in
these cases it requires creative human
writing to do that and so rhf kind of
sidesteps this because we get um we get
to ask people a significantly easier
question as a data labelers they're not
asked to write poems directly they're
just given five poems from the model and
they're just asked to order them and so
that's just a much easier task for a
human labeler to do and so what I think
this allows you to do basically is it um
it kind of like allows a lot more higher
accuracy data because we're not asking
people to do the generation task which
can be extremely difficult like we're
not asking them to do creative writing
we're just trying to get them to
distinguish between creative writings
and uh find the ones that are best and
that is the signal that humans are
providing just the ordering and that is
their input into the system and then the
system in rhf just discovers the kinds
of responses that would be graded well
by humans and so that step of
indirection allows the models to become
a bit better so that is the upside of
our LF it allows us to run RL it
empirically results in better models and
it allows uh people to contribute their
supervision uh even without having to do
extremely difficult tasks um in the case
of writing ideal responses unfortunately
our HF also comes with significant
downsides and so um the main one is that
basically we are doing reinforcement
learning not with respect to humans and
actual human judgment but with respect
to a lossy simulation of humans right
and this lossy simulation could be
misleading because it's just a it's just
a simulation right it's just a language
model that's kind of outputting scores
and it might not perfectly reflect the
opinion of an actual human with an
actual brain in all the possible
different cases so that's number one
which is actually something even more
subtle and devious going on that uh
really
dramatically holds back our LF as a
technique that we can really scale to
significantly um kind of Smart Systems
and that is that reinforcement learning
is extremely good at discovering a way
to game the model to game the simulation
so this reward model that we're
constructing here that gives the course
these models are Transformers these
Transformers are massive neurals they
have billions of parameters and they
imitate humans but they do so in a kind
of like a simulation way now the problem
is that these are massive complicated
systems right there's a billion
parameters here that are outputting a
single
score it turns out that there are ways
to gain these models you can find kinds
of inputs that were not part of their
training set and these inputs
inexplicably get very high scores but in
a fake way so very often what you find
if you run our lch for very long so for
example if we do 1,000 updates which is
like say a lot of updates you might
expect that your jokes are getting
better and that you're getting like real
bangers about Pelicans but that's not
EXA exactly what happens what happens is
that uh in the first few hundred steps
the jokes about Pelicans are probably
improving a little bit and then they
actually dramatically fall off the cliff
and you start to get extremely
nonsensical results like for example you
start to get um the top joke about
Pelicans starts to be the
and this makes no sense right like when
you look at it why should this be a top
joke but when you take the the and you
plug it into your reward model you'd
expect score of zero but actually the
reward model loves this as a joke it
will tell you that the the the theth is
a score of 1. Z this is a top joke and
this makes no sense right but it's
because these models are just
simulations of humans and they're
massive neural lots and you can find
inputs at the bottom that kind of like
get into the part of the input space
that kind of gives you nonsensical
results these examples are what's called
adversarial examples and I'm not going
to go into the topic too much but these
are adversarial inputs to the model they
are specific little inputs that kind of
go between the nooks and crannies of the
model and give nonsensical results at
the top now here's what you might
imagine doing you say okay the the the
is obviously not score of one um it's
obviously a low score so let's take the
the the the the let's add it to the data
set and give it an ordering that is
extremely bad like a score of five and
indeed your model will learn that the D
should have a very low score and it will
give it score of zero the problem is
that there will always be basically
infinite number of nonsensical
adversarial examples hiding in the model
if you iterate this process many times
and you keep adding nonsensical stuff to
your reward model and giving it very low
scores you can you'll never win the game
uh you can do this many many rounds and
reinforcement learning if you run it
long enough will always find a way to
gain the model it will discover
adversarial examples it will get get
really high scores uh with nonsensical
results and fundamentally this is
because our scoring function is a giant
neural nut and RL is extremely good at
finding just the ways to trick it uh so
long story short you always run rhf put
for maybe a few hundred updates the
model is getting better and then you
have to crop it and you are done you
can't run too much against this reward
model because the optimization will
start to game it and you basically crop
it and you call it and you ship it um
and uh you can improve the reward model
but you kind of like come across these
situations eventually at some point so
rhf basically what I usually say is that
RF is not RL and what I mean by that is
I mean RF is RL obviously but it's not
RL in the magical sense this is not RL
that you can run
indefinitely these kinds of problems
like where you are getting con correct
answer you cannot gain this as easily
you either got the correct answer or you
didn't and the scoring function is much
much simpler you're just looking at the
boxed area and seeing if the result is
correct so it's very difficult to gain
these functions but uh gaming a reward
model is possible now in these
verifiable domains you can run RL
indefinitely you could run for tens of
thousands hundreds of thousands of steps
and discover all kinds of really crazy
strategies that we might not even ever
think about of Performing really well
for all these problems in the game of Go
there's no way to to beat to basically
game uh the winning of a game or the
losing of a game we have a perfect
simulator we know all the different uh
where all the stones are placed and we
can calculate uh whether someone has won
or not there's no way to gain that and
so you can do RL indefinitely and you
can eventually be beat even leol but
with models like this which are gameable
you cannot repeat this process
indefinitely so I kind of see rhf as not
real RL because the reward function is
gameable so it's kind of more like in
the realm of like little fine-tuning
it's a little it's a little Improvement
but it's not something that is
fundamentally set up correctly where you
can insert more compute run for longer
and get much better and magical results
so it's it's uh it's not RL in that
sense it's not RL in the sense that it
lacks magic um it can find you in your
model and get a better performance and
indeed if we go back to chat GPT the GPT
40 model has gone through rhf because it
works well but it's just not RL in the
same sense rlf is like a little fine
tune that slightly improves your model
is maybe like the way I would think
about it okay so that's most of the
technical content that I wanted to cover
I took you through the three major
stages and paradigms of training these
models pre-training supervised fine
tuning and reinforcement learning and I
showed you that they Loosely correspond
to the process we already use for
teaching children and so in particular
we talked about pre-training being sort
of like the basic knowledge acquisition
of reading Exposition supervised fine
tuning being the process of looking at
lots and lots of worked examples and
imitating experts and practice problems
the only difference is that we now have
to effectively write textbooks for llms
and AIS across all the disciplines of
human knowledge and also in all the
cases where we actually would like them
to work like code and math and you know
basically all the other disciplines so
we're in the process of writing
textbooks for them refining all the
algorithms that I've presented on the
high level and then of course doing a
really really good job at the execution
of training these models at scale and
efficiently so in particular I didn't go
into too many details but these are
extremely large and complicated
distributed uh sort of
um jobs that have to run over tens of
thousands or even hundreds of thousands
of gpus and the engineering that goes
into this is really at the stateof the
art of what's possible with computers at
that scale so I didn't cover that aspect
too much
but um this is very kind of serious and
they were underlying all these very
simple algorithms
ultimately now I also talked about sort
of like the theory of mind a little bit
of these models and the thing I want you
to take away is that these models are
really good but they're extremely useful
as tools for your work you shouldn't uh
sort of trust them fully and I showed
you some examples of that even though we
have mitigations for hallucinations the
models are not perfect and they will
hallucinate still it's gotten better
over time and it will continue to get
better but they can
hallucinate in other words in in
addition to that I covered kind of like
what I call the Swiss cheese uh sort of
model of llm capabilities that you
should have in your mind the models are
incredibly good across so many different
disciplines but then fail randomly
almost in some unique cases so for
example what is bigger 9.11 or 9.9 like
the model doesn't know but
simultaneously it can turn around and
solve Olympiad questions and so this is
a hole in the Swiss cheese and there are
many of them and you don't want to trip
over them so don't um treat these models
as infallible models check their work
use them as tools use them for
inspiration use them for the first draft
but uh work with them as tools and be
ultimately respons responsible for the
you know product of your
work and that's roughly what I wanted to
talk about this is how they're trained
and this is what they are let's now turn
to what are some of the future
capabilities of these models uh probably
what's coming down the pipe and also
where can you find these models I have a
few blow points on some of the things
that you can expect coming down the pipe
the first thing you'll notice is that
the models will very rapidly become
multimodal everything I talked about
above concerned text but very soon we'll
have llms that can not just handle text
but they can also operate natively and
very easily over audio so they can hear
and speak and also images so they can
see and paint and we're already seeing
the beginnings of all of this uh but
this will be all done natively inside
inside the language model and this will
enable kind of like natural
conversations and roughly speaking the
reason that this is actually no
different from everything we've covered
above is that as a baseline you can
tokenize audio and images and apply the
exact same approaches of everything that
we've talked about above so it's not a
fundamental change it's just uh it's
just a to we have to add some tokens so
as an example for tokenizing audio we
can look at slices of the spectrogram of
the audio signal and we can tokenize
that and just add more tokens that
suddenly represent audio and just add
them into the context windows and train
on them just like above the same for
images we can use patches and we can
separately tokenize patches and then
what is an image an image is just a
sequence of tokens and this actually
kind of works and there's a lot of early
work in this direction and so we can
just create streams of tokens that are
representing audio images as well as
text and interpers them and handle them
all simultaneously in a single model so
that's one example of multimodality
uh second something that people are very
interested in
is currently most of the work is that
we're handing individual tasks to the
models on kind of like a silver platter
like please solve this task for me and
the model sort of like does this little
task but it's up to us to still sort of
like organize a coherent execution of
tasks to perform jobs and the models are
not yet at the capability required to do
this in a coherent error correcting way
over long periods of time so they're not
able to fully string together tasks to
perform these longer running jobs but
they're getting there and this is
improving uh over time but uh probably
what's going to happen here is we're
going to start to see what's called
agents which perform tasks over time and
you you supervise them and you watch
their work and they come up to once in a
while report progress and so on so we're
going to see more long running agents uh
tasks that don't just take you know a
few seconds of response but many tens of
seconds or even minutes or hours over
time uh but these uh models are not
infallible as we talked about above so
all of this will require supervision so
for example in factories people talk
about the human to robot ratio uh for
automation I think we're going to see
something similar in the digital space
where we are going to be talking about
human to agent ratios where humans
becomes a lot more supervisors of agent
tasks um in the digital
domain uh next um I think everything is
going to become a lot more pervasive and
invisible so it's kind of like
integrated into the tools and everywhere
um and in addition kind of like computer
using so right now these models aren't
able to take actions on your behalf but
I think this is a separate bullet point
um if you saw chpt launch the operator
then uh that's one early example of that
where you can actually hand off control
to the model to perform you know
keyboard and mouse actions on your
behalf so that's also something that
that I think is very interesting the
last point I have here is just a general
comment that there's still a lot of
research to potentially do in this
domain main one example of that uh is
something along the lines of test time
training so remember that everything
we've done above and that we talked
about has two major stages there's first
the training stage where we tune the
parameters of the model to perform the
tasks well once we get the parameters we
fix them and then we deploy the model
for inference from there the model is
fixed it doesn't change anymore it
doesn't learn from all the stuff that
it's doing a test time it's a fixed um
number of parameters and the only thing
that is changing is now the token inside
the context windows and so the only type
of learning or test time learning that
the model has access to is the in
context learning of its uh kind of like
uh dynamically adjustable context window
depending on like what it's doing at
test time so but I think this is still
different from humans who actually are
able to like actually learn uh depending
on what they're doing especially when
you sleep for example like your brain is
updating your parameters or something
like that right so there's no kind of
equivalent of that currently in these
models and tools so there's a lot of
like um more wonky ideas I think that
are to be explored still and uh in
particular I think this will be
necessary because the context window is
a finite and precious resource and
especially once we start to tackle very
long running multimodal tasks and we're
putting in videos and these token
windows will basically start to grow
extremely large like not thousands or
even hundreds of thousands but
significantly beyond that and the only
trick uh the only kind of trick we have
Avail to us right now is to make the
context Windows longer but I think that
that approach by itself will will not
will not scale to actual long running
tasks that are multimodal over time and
so I think new ideas are needed in some
of those disciplines um in some of those
kind of cases in the main where these
tasks are going to require very long
contexts so those are some examples of
some of the things you can um expect
coming down the pipe let's now turn to
where you can actually uh kind of keep
track of this progress and um you know
be up to date with the latest and grest
of what's happening in the field so I
would say the three resources that I
have consistently used to stay up to
date are number one El Marina uh so let
me show you El
Marina this is basically an llm leader
board and it ranks all the top models
and the ranking is based on human
comparisons so humans prompt these
models and they get to judge which one
gives a better answer they don't know
which model is which they're just
looking at which model is the better
answer and you can calculate a ranking
and then you get some results and so
what you can hear is what you can see
here is the different organizations like
Google Gemini for example that produce
these models when you click on any one
of these it takes you to the place where
that model is
hosted and then here we see Google is
currently on top with open AI right
behind here we see deep seek in position
number three now the reason this is a
big deal is the last column here you see
license deep seek is an MIT license
model it's open weights anyone can use
these weights uh anyone can download
them anyone can host their own version
of Deep seek and they can use it in what
whatever way they like and so it's not a
proprietary model that you don't have
access to it's it's basically an open
weight release and so this is kind of
unprecedented that a model this strong
was released with open weights so pretty
cool from the team next up we have a few
more models from Google and open Ai and
then when you continue to scroll down
you start to see some other Usual
Suspects so xai here anthropic with son
it uh here at number
14 and
um then
meta with llama over here so llama
similar to deep seek is an open weights
model and so uh but it's down here as
opposed to up here now I will say that
this leaderboard was really good for a
long time I do think that in the last
few months it's become a little bit
gamed um and I don't trust it as much as
I used to I think um just empirically I
feel like a lot of people for example
are using a Sonet from anthropic and
that it's a really good model so but
that's all the way down here um in
number 14 and conversely I think not as
many people are using Gemini but it's
racking really really high uh so I think
use this as a first pass uh but uh sort
of try out a few of the models for your
tasks and see which one performs better
the second thing that I would point to
is the uh AI news uh newsletter so AI
news is not very creatively named but it
is a very good newsletter produced by
swix and friends so thank you for
maintaining it
and it's been very helpful to me because
it is extremely comprehensive so if you
go to archives uh you see that it's
produced almost every other day and um
it is very comprehensive and some of it
is written by humans and curated by
humans but a lot of it is constructed
automatically with llms so you'll see
that these are very comprehensive and
you're probably not missing anything
major if you go through it of course
you're probably not going to go through
it because it's so long but I do think
that these summaries all the way up top
are quite good and I think have some
human oversight uh so this has been very
helpful to me and the last thing I would
point to is just X and Twitter uh a lot
of um AI happens on X and so I would
just follow people who you like and
trust and get all your latest and
greatest uh on X as well so those are
the major places that have worked for me
over time and finally a few words on
where you can find the models and where
can you use them so the first one I
would say is for any of the biggest
proprietary models you just have to go
to the website of that LM provider so
for example for open a that's uh chat
I believe actually works now uh so
that's for open
