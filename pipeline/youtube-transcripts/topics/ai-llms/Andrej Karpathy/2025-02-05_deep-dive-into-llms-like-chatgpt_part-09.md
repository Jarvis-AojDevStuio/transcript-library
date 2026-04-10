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
word_count: 3994
chunk: 9
total_chunks: 11
parent_video_id: "7xTGNNLPyMI"
---
on par I would say it's kind of hard to
tell because of the evaluations but if
you're paying $200 per month to open AI
some of these models I believe are
currently they basically still look
better uh but deep seek R1 for now is
still a very solid choice for a thinking
model that would be available to you um
sort of um either on this website or any
other website because the model is open
weights you can just download it so
that's thinking models so what is the
summary so far well we've talked about
reinforcement learning and the fact that
thinking emerges in the process of the
optimization on when we basically run RL
on many math uh and kind of code
problems that have verifiable Solutions
so there's like an answer three
Etc now these thinking models you can
access in for example deep seek or any
inference provider like together. a and
choosing deep seek over there these
thinking models are also available uh in
chpt under any of the 01 or O3
models but these GPT 4 R models Etc
they're not thinking models you should
think of them as mostly sft models now
if you are um if you have a prompt that
requires Advanced reasoning and so on
you should probably use some of the
thinking models or at least try them out
but empirically for a lot of my use when
you're asking a simpler question there's
like a knowledge based question or
something like that this might be
Overkill like there's no need to think
30 seconds about some factual question
so for that I will uh sometimes default
to just GPT 40 so empirically about 80
90% of my use is just gp4
and when I come across a very difficult
problem like in math and code Etc I will
reach for the thinking models but then I
have to wait a bit longer because
they're thinking um so you can access
these on chat on deep seek also I wanted
to point out that um AI studio.
go.com even though it looks really busy
really ugly because Google's just unable
to do this kind of stuff well it's like
what is happening but if you choose
model and you choose here Gemini 2.0
flash thinking experimental 01 21 if you
choose that one that's also a a kind of
early experiment experimental of a
thinking model by Google so we can go
here and we can give it the same problem
and click run and this is also a
thinking problem a thinking model that
will also do something
similar and comes out with the right
answer here so basically Gemini also
offers a thinking model anthropic
currently does not offer a thinking
model but basically this is kind of like
the frontier development of these llms I
think RL is kind of like this new
exciting stage but getting the details
right is difficult and that's why all
these models and thinking models are
currently experimental as of 2025 very
early 2025 um but this is kind of like
the frontier development of pushing the
performance on these very difficult
problems using reasoning that is
emerging in these optimizations one more
connection that I wanted to bring up is
that the discovery that reinforcement
learning is extremely powerful way of
learning is not new to the field of AI
and one place what we've already seen
this demonstrated is in the game of Go
and famously Deep Mind developed the
system alphago and you can watch a movie
about it um where the system is learning
to play the game of go against top human
players and um when we go to the paper
underlying alphago so in this paper when
we scroll
down we actually find a really
interesting
plot um that I think uh is kind of
familiar uh to us and we're kind of like
we discovering in the more open domain
of arbitrary problem solving instead of
on the closed specific domain of the
game of Go but basically what they saw
and we're going to see this in llms as
well as this becomes more mature is this
is the ELO rating of playing game of Go
and this is leas dull an extremely
strong human player and here what they
are comparing is the strength of a model
learned trained by supervised learning
and a model trained by reinforcement
learning so the supervised learning
model is imitating human expert players
so if you just get a huge amount of
games played by expert players in the
game of Go and you try to imitate them
you are going to get better but then you
top out and you never quite get better
than some of the top top top players of
in the game of Go like LEL so you're
never going to reach there because
you're just imitating human players you
can't fundamentally go beyond a human
player if you're just imitating human
players but in a process of
reinforcement learning is significantly
more powerful in reinforcement learning
for a game of Go it means that the
system is playing moves that empirically
and statistically lead to win to winning
the game and so alphago is a system
where it kind of plays against it itself
and it's using reinforcement learning to
create
rollouts so it's the exact same diagram
here but there's no prompt it's just uh
because there's no prompt it's just a
fixed game of Go but it's trying out
lots of solutions it's trying out lots
of plays and then the games that lead to
a win instead of a specific answer are
reinforced they're they're made stronger
and so um the system is learning
basically the sequences of actions that
empirically and statistically lead to
winning the game and reinforcement
learning is not going to be constrained
by human performance and reinforcement
learning can do significantly better and
overcome even the top players like Lisa
Dole and so uh probably they could have
run this longer and they just chose to
crop it at some point because this costs
money but this is very powerful
demonstration of reinforcement learning
and we're only starting to kind of see
hints of this diagram in larger language
models for reasoning problems so we're
not going to get too far by just
imitating experts we need to go beyond
that set up these like little game
environments and get let let the system
discover reasoning traces or like ways
of solving problems uh that are unique
and that uh just basically work
well now on this aspect of uniqueness
notice that when you're doing
reinforcement learning nothing prevents
you from veering off the distribution of
how humans are playing the game and so
when we go back to uh this alphao search
here one of the suggested modifications
is called move 37 and move 37 in alphao
is referring to a specific point in time
where alphago basically played a move
that uh no human expert would play uh so
the probability of this move uh to be
played by a human player was evaluated
to be about 1 in 10th ,000 so it's a
very rare move but in retrospect it was
a brilliant move so alphago in the
process of reinforcement learning
discovered kind of like a strategy of
playing that was unknown to humans and
but is in retrospect uh brilliant I
recommend this YouTube video um leis do
versus alphao move 37 reactions and
Analysis and this is kind of what it
looked like when alphao played this
move
value that's a very that's a very
surprising move I thought I thought it
was I thought it was a
mistake when I see this move anyway so
basically people are kind of freaking
out because it's a it's a move that a
human would not play that alphago played
because in its training uh this move
seemed to be a good idea it just happens
not to be a kind of thing that a humans
would would do and so that is again the
power of reinforcement learning and in
principle we can actually see the
equivalence of that if we continue
scaling this Paradigm in language models
and what that looks like is kind of
unknown so so um what does it mean to
solve problems in such a way that uh
even humans would not be able to get how
can you be better at reasoning or
thinking than humans how can you go
beyond just uh a thinking human like
maybe it means discovering analogies
that humans would not be able to uh
create or maybe it's like a new thinking
strategy it's kind of hard to think
through uh maybe it's a holy new
language that actually is not even
English maybe it discovers its own
language that is a lot better at
thinking um because the model is
unconstrained to even like stick with
English uh so maybe it takes a different
language to think in or it discovers its
own language so in principle the
behavior of the system is a lot less
defined it is open to do whatever works
and it is open to also slowly Drift from
the distribution of its training data
which is English but all of that can
only be done if we have a very large
diverse set of problems in which the
these strategy can be refined and
perfected and so that is a lot of the
frontier LM research that's going on
right now is trying to kind of create
those kinds of prompt distributions that
are large and diverse these are all kind
of like game environments in which the
llms can practice their thinking and uh
it's kind of like writing you know these
practice problems we have to create
practice problems for all of domains of
knowledge and if we have practice
problems and tons of them the models
will be able to reinforcement learning
reinforcement learn on them and kind of
uh create these kinds of uh diagrams but
in the domain of open thinking instead
of a closed domain like game of Go
there's one more section within
reinforcement learning that I wanted to
cover and that is that of learning in
unverifiable domains so so far all of
the problems that we've looked at are in
what's called verifiable domains that is
any candidate solution we can score very
easily against a concrete answer so for
example answer is three and we can very
easily score these Solutions against the
answer of three
either we require the models to like box
in their answers and then we just check
for equality of whatever is in the box
with the answer or you can also use uh
kind of what's called an llm judge so
the llm judge looks at a solution and it
gets the answer and just basically
scores the solution for whether it's
consistent with the answer or not and
llms uh empirically are good enough at
the current capability that they can do
this fairly reliably so we can apply
those kinds of techniques as well in any
case we have a concrete answer and we're
just checking Solutions again against it
and we can do this automatically with no
kind of humans in the loop the problem
is that we can't apply the strategy in
what's called unverifiable domains so
usually these are for example creative
writing tasks like write a joke about
Pelicans or write a poem or summarize a
paragraph or something like that in
these kinds of domains it becomes harder
to score our different solutions to this
problem so for example writing a joke
about Pelicans we can generate lots of
different uh jokes of course that's fine
for example we can go to chbt and we can
get it to uh generate a joke about
Pelicans uh so much stuff in their beaks
because they don't bellan in
backpacks what
okay we can uh we can try something else
why don't Pelicans ever pay for their
drinks because they always B it to
someone else haha okay so these models
are not obviously not very good at humor
actually I think it's pretty fascinating
because I think humor is secretly very
difficult and the model have the
capability I think anyway in any case
you could imagine creating lots of jokes
the problem that we are facing is how do
we score them now in principle we could
of course get a human to look at all
these jokes just like I did right now
the problem with that is if you are
doing reinforcement learning you're
going to be doing many thousands of
updates and for each update you want to
be looking at say thousands of prompts
and for each prompt you want to be
potentially looking at looking at
hundred or thousands of different kinds
of generations and so there's just like
way too many of these to look at and so
um in principle you could have a human
inspect all of them and score them and
decide that okay maybe this one is funny
and uh maybe this one is funny and this
one is funny and we could train on them
to get the model to become slightly
better at jokes um in the context of
pelicans at least um the problem is that
it's just like way too much human time
this is an unscalable strategy we need
some kind of an automatic strategy for
doing this and one sort of solution to
this was proposed in this paper
uh that introduced what's called
reinforcement learning from Human
feedback and so this was a paper from
open at the time and many of these
people are now um co-founders in
anthropic um and this kind of proposed a
approach for uh basically doing
reinforcement learning in unverifiable
domains so let's take a look at how that
works so this is the cartoon diagram of
the core ideas involved so as I
mentioned the native approach is if we
just set Infinity human time we could
just run RL in these domains just fine
so for example we can run RL as usual if
I have Infinity humans I would I just
want to do and these are just cartoon
numbers I want to do 1,000 updates where
each update will be on 1,000 prompts and
in for each prompt we're going to have
1,000 roll outs that we're scoring so we
can run RL with this kind of a setup the
problem is in the process of doing this
I will need to run one I will need to
ask a human to evaluate a joke a total
of 1 billion times and so that's a lot
of people looking at really terrible
jokes so we don't want to do that so
instead we want to take the arlef
approach so um in our Rel of approach we
are kind of like the the core trick is
that of indirection so we're going to
involve humans just a little bit and the
way we cheat is that we basically train
a whole separate neural network that we
call a reward model and this neural
network will kind of like imitate human
scores so we're going to ask humans to
score um roll
we're going to then imitate human scores
using a neural network and this neural
network will become a kind of simulator
of human
preferences and now that we have a
neural network simulator we can do RL
against it so instead of asking a real
human we're asking a simulated human for
their score of a joke as an example and
so once we have a simulator we're often
racist because we can query it as many
times as we want to and it's all whole
automatic process and we can now do
reinforcement learning with respect to
the simulator and the simulator as you
might expect is not going to be a
perfect human but if it's at least
statistically similar to human judgment
then you might expect that this will do
something and in practice indeed uh it
does so once we have a simulator we can
do RL and everything works great so let
me show you a cartoon diagram a little
bit of what this process looks like
although the details are not 100 like
super important it's just a core idea of
how this works so here I have a cartoon
diagram of a hypothetical example of
what training the reward model would
look like so we have a prompt like write
a joke about picans and then here we
have five separate roll outs so these
are all five different jokes just like
this one now the first thing we're going
to do is we are going to ask a human to
uh order these jokes from the best to
worst so this is uh so here this human
thought that this joke is the best the
funniest so number one joke this is
number two joke number three joke four
and five so this is the worst joke
we're asking humans to order instead of
give scores directly because it's a bit
of an easier task it's easier for a
human to give an ordering than to give
precise scores now that is now the
supervision for the model so the human
has ordered them and that is kind of
like their contribution to the training
process but now separately what we're
going to do is we're going to ask a
reward model uh about its scoring of
these jokes now the reward model is a
whole separate neural network completely
separate neural net um and it's also
probably a transform
uh but it's not a language model in the
sense that it generates diverse language
Etc it's just a scoring model so the
reward model will take as an input The
Prompt number one and number two a
candidate joke so um those are the two
inputs that go into the reward model so
here for example the reward model would
be taken this prompt and this joke now
the output of a reward model is a single
number and this number is thought of as
a score and it can range for example
from Z to one so zero would be the worst
score and one would be the best score so
here are some examples of what a
hypothetical reward model at some stage
in the training process would give uh s
scoring to these jokes so 0.1 is a very
low score 08 is a really high score and
so on and so now um we compare the
scores given by the reward model with uh
the ordering given by the human and
there's a precise mathematical way to
actually calculate this uh basically set
up a loss function and calculate a kind
of like a correspondence here and uh
update a model based on it but I just
want to give you the intuition which is
that as an example here for this second
joke the the human thought that it was
the funniest and the model kind of
agreed right 08 is a relatively high
score but this score should have been
even higher right so after an update we
would expect that maybe this score
should have been will actually grow
after an update of the network to be
like say 081 or
something um for this one here they
actually are in a massive disagreement
because the human thought that this was
number two but here the the score is
only 0.1 and so this score needs to be
much higher so after an update on top of
this um kind of a supervision this might
grow a lot more like maybe it's 0.15 or
something like
that um and then here the human thought
that this one was the worst joke but
here the model actually gave it a fairly
High number so you might expect that
after the update uh this would come down
to maybe 3 3.5 or something like that so
basically we're doing what we did before
we're slightly nudging the predictions
from the models using a neural network
training
process and we're trying to make the
reward model scores be consistent with
human
ordering and so um as we update the
reward model on human data it becomes
better and better simulator of the
scores and orders uh that humans provide
and then becomes kind of like the the
neural the simulator of human
preferences which we can then do RL
against but critically we're not asking
humans one billion times to look at a
joke we're maybe looking at th000
prompts and five roll outs each so maybe
5,000 jokes that humans have to look at
in total and they just give the ordering
and then we're training the model to be
consistent with that ordering and I'm
skipping over the mathematical details
but I just want you to understand a high
level idea that uh this reward model is
do is basically giving us this scour and
we have a way of training it to be
consistent with human orderings
and that's how rhf works okay so that is
the rough idea we basically train
simulators of humans and RL with respect
to those
simulators now I want to talk about
first the upside of reinforcement
learning from Human
feedback the first thing is that this
allows us to run reinforcement learning
which we know is incredibly powerful
kind of set of techniques and it allows
us to do it in arbitrary domains and
including the ones that are unverifiable
so things like summarization and poem
writing joke writing or any other
creative writing really uh in domains
outside of math and code
Etc now empirically what we see when we
actually apply rhf is that this is a way
to improve the performance of the model
and uh I have a top answer for why that
might be but I don't actually know that
it is like super well established on
like why this is you can empirically
observe that when you do rhf correctly
the models you get are just like a
little bit better um but as to why is I
think like not as clear so here's my
best guess my best guess is that this is
possibly mostly due to the discriminator
generator
Gap what that means is that in many
cases it is significantly easier to
discriminate than to generate for humans
so in particular an example of this is
um in when we do supervised fine-tuning
right
sft we're asking humans to generate the
ideal assistant response and in many
cases here um as I've shown it uh the
ideal response is very simple to write
but in many cases might not be so for
example in summarization or poem writing
or joke writing like how are you as a
