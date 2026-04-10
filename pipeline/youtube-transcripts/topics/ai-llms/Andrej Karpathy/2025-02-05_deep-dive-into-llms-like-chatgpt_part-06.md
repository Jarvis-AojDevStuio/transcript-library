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
chunk: 6
total_chunks: 11
parent_video_id: "7xTGNNLPyMI"
---
about briefly is that of the knowledge
of self so what I see very often on the
internet is that people do something
like this they ask llms something like
what model are you and who built you and
um basically this uh question is a
little bit nonsensical and the reason I
say that is that as I try to kind of
explain with some of the underhood
fundamentals this thing is not a person
right it doesn't have a persistent
existence in any way it sort of boots up
processes tokens and shuts off and it
does that for every single person it
just kind of builds up a context window
of conversation and then everything gets
deleted and so this this entity is kind
of like restarted from scratch every
single conversation if that makes sense
it has no persistent self it has no
sense of self it's a token tumbler and
uh it follows the statistical
regularities of its training set so it
doesn't really make sense to ask it who
are you what build you Etc and by
default if you do what I described and
just by default and from nowhere you're
going to get some pretty random answers
so for example let's uh pick on Falcon
which is a fairly old model and let's
see what it tells
us uh so it's evading the question uh
talented engineers and developers here
it says I was built by open AI based on
the gpt3 model it's totally making stuff
up now the fact that it's built by open
AI here I think a lot of people would
take this as evidence that this model
was somehow trained on open AI data or
something like that I don't actually
think that that's necessarily true the
reason for that is
that if you don't explicitly program the
model to answer these kinds of questions
then what you're going to get is its
statistical best guess at the answer and
this model had a um sft data mixture of
conversations and during the
fine-tuning um the model sort of
understands as it's training on this
data that it's taking on this
personality of this like helpful
assistant and it doesn't know how to it
doesn't actually it wasn't told exactly
what label to apply to self it just kind
of is taking on this uh this uh Persona
of a helpful assistant and remember that
the pre-training stage took the
documents from the entire internet and
Chach and open AI are very prominent in
these documents and so I think what's
actually likely to be happening here is
that this is just its hallucinated label
for what it is this is its self-identity
is that it's chat GPT by open Ai and
it's only saying that because there's a
ton of data on the internet of um
answers like this that are actually
coming from open from chasht and So
that's its label for what it is now you
can override this as a developer if you
have a llm model you can actually
override it and there are a few ways to
do that so for example let me show you
there's this MMO model from Allen Ai and
um this is one llm it's not a top tier
LM or anything like that but I like it
because it is fully open source so the
paper for Almo and everything else is
completely fully open source which is
nice um so here we are looking at its
sft mixture so this is the data mixture
of um the fine tuning so this is the
conversations data it right and so the
way that they are solving it for Theo
model is we see that there's a bunch of
stuff in the mixture and there's a total
of 1 million conversations here but here
we have alot to hardcoded if we go there
we see that this is 240
conversations and look at these 240
conversations they're hardcoded tell me
about yourself says user and then the
assistant says I'm and open language
model developed by AI to Allen Institute
of artificial intelligence Etc I'm here
to help blah blah blah what is your name
uh Theo project so these are all kinds
of like cooked up hardcoded questions
abouto 2 and the correct answers to give
in these cases if you take 240 questions
like this or conversations put them into
your training set and fine tune with it
then the model will actually be expected
to parot this stuff later if you don't
give it this then it's probably a Chach
by open
Ai and um there's one more way to
sometimes do this is
that basically um in these conversations
and you have terms between human and
assistant sometimes there's a special
message called system message at the
very beginning of the conversation so
it's not just between human and
assistant there's a system and in the
system message you can actually hardcode
and remind the model that hey you are a
model developed by open Ai and your name
is chashi pt40 and you were trained on
this date and your knowledge cut off is
this and basically it kind of like
documents the model a little bit and
then this is inserted into to your
conversations so when you go on chpt you
see a blank page but actually the system
message is kind of like hidden in there
and those tokens are in the context
window and so those are the two ways to
kind of um program the models to talk
about themselves either it's done
through uh data like this or it's done
through system message and things like
that basically invisible tokens that are
in the context window and remind the
model of its identity but it's all just
kind of like cooked up and bolted on in
some in some way it's not actually like
really deeply there in any real sense as
it would before a human I want to now
continue to the next section which deals
with the computational capabilities or
like I should say the native
computational capabilities of these
models in problem solving scenarios and
so in particular we have to be very
careful with these models when we
construct our examples of conversations
and there's a lot of sharp edges here
that are kind of like elucidative is
that a word uh they're kind of like
interesting to look at when we consider
how these models think so um consider
the following prompt from a human and
supposed that basically that we are
building out a conversation to enter
into our training set of conversations
so we're going to train the model on
this we're teaching you how to basically
solve simple math problems so the prompt
is Emily buys three apples and two
oranges each orange cost $2 the total
cost is 13 what is the cost of apples
very simple math question now there are
two answers here on the left and on the
right they are both correct answers they
both say that the answer is three which
is correct but one of these two is a
significant ific anly better answer for
the assistant than the other like if I
was Data labeler and I was creating one
of these one of these would be uh a
really terrible answer for the assistant
and the other would be okay and so I'd
like you to potentially pause the video
Even and think through why one of these
two is significantly better answer uh
than the other and um if you use the
wrong one your model will actually be uh
really bad at math potentially and it
would have uh bad outcomes and this is
something that you would be careful with
in your life labeling documentations
when you are training people uh to
create the ideal responses for the
assistant okay so the key to this
question is to realize and remember that
when the models are training and also
inferencing they are working in
onedimensional sequence of tokens from
left to right and this is the picture
that I often have in my mind I imagine
basically the token sequence evolving
from left to right and to always produce
the next token in a sequence we are
feeding all these tokens into the neural
network and this neural network then is
the probabilities for the next token and
sequence right so this picture here is
the exact same picture we saw uh before
up here and this comes from the web demo
that I showed you before right so this
is the calculation that basically takes
the input tokens here on the top and uh
performs these operations of all these
neurons and uh gives you the answer for
the probabilities of what comes next now
the important thing to realize is that
roughly
speaking uh there's basically a finite
number of layers of computation that
happened here so for example this model
here has only one two three layers of
what's called detention and uh MLP here
um maybe um typical modern
state-of-the-art Network would have more
like say 100 layers or something like
that but there's only 100 layers of
computation or something like that to go
from the previous token sequence to the
probabilities for the next token and so
there's a finite amount of computation
that happens here for every single token
and you should think of this as a very
small amount of computation and this
amount of computation is almost roughly
fixed uh for every single token in this
sequence um the that's not actually
fully true because the more tokens you
feed in uh the the more expensive uh
this forward pass will be of this neural
network but not by much so you should
think of this uh and I think as a good
model to have in mind this is a fixed
amount of compute that's going to happen
in this box for every single one of
these tokens and this amount of compute
Cann possibly be too big because there's
not that many layers that are sort of
going from the top to bottom here
there's not that that much
computationally that will happen here
and so you can't imagine the model to to
basically do arbitrary computation in a
single forward pass to get a single
token and so what that means is that we
actually have to distribute our
reasoning and our computation across
many tokens because every single token
is only spending a finite amount of
computation on it and so we kind of want
to distribute the computation across
many tokens and we can't have too much
computation or expect too much
computation out of of the model in any
single individual token because there's
only so much computation that happens
per token okay roughly fixed amount of
computation here
so that's why this answer here is
significantly worse and the reason for
that is Imagine going from left to right
here um and I copy pasted it right here
the answer is three Etc imagine the
model having to go from left to right
emitting these tokens one at a time it
has to say or we're expecting to say the
answer is space dollar sign and then
right here we're expecting it to
basically cram all of the computation of
this problem into this single token it
has to emit the correct answer three and
then once we've emitted the answer three
we're expecting it to say all these
tokens but at this point we've already
prod produced the answer and it's
already in the context window for all
these tokens that follow so anything
here is just um kind of post Hawk
justification of why this is the answer
um because the answer is already created
it's already in the token window so it's
it's not actually being calculated here
um and so if you are answering the
question directly and immediately you
are training the model to to try to
basically guess the answer in a single
token and that is just not going to work
because of the finite amount of
computation that happens per token
that's why this answer on the right is
significantly better because we are
Distributing this computation across the
answer we're actually getting the model
to sort of slowly come to the answer
from the left to right we're getting
intermediate results we're saying okay
the total cost of oranges is four so 30
- 4 is 9 and so we're creating
intermediate calculations and each one
of these calculations is by itself not
that expensive and so we're actually
basically kind of guessing a little bit
the difficulty that the model is capable
of in any single one of these individual
tokens and there can never be too much
work in any one of these tokens
computationally because then the model
won't be able to do that later at test
time and so we're teaching the model
here to spread out its reasoning and to
spread out its computation over the
tokens and in this way it only has very
simple problems in each token and they
can add up and then by the time it's
near the end it has all the previous
results in its working memory and it's
much easier for it to determine that the
answer is and here it is three so this
is a significantly better label for our
computation this would be really bad and
is teaching the model to try to do all
the computation in a single token and
it's really
bad so uh that's kind of like an
interesting thing to keep in mind is in
your
prompts uh usually don't have to think
about it explicitly because uh the
people at open AI have labelers and so
on that actually worry about this and
they make sure that the answers are
spread out and so actually open AI will
kind of like do the right thing so when
I ask this question for chat GPT it's
actually going to go very slowly it's
going to be like okay let's define our
variables set up the equation
and it's kind of creating all these
intermediate results these are not for
you these are for the model if the model
is not creating these intermediate
results for itself it's not going to be
able to reach three I also wanted to
show you that it's possible to be a bit
mean to the model uh we can just ask for
things so as an example I said I gave it
the exact same uh prompt and I said
answer the question in a single token
just immediately give me the answer
nothing else and it turns out that for
this simple um prompt here it actually
was able to do it in single go so it
just created a single I think this is
two tokens right uh because the dollar
sign is its own token so basically this
model didn't give me a single token it
gave me two tokens but it still produced
the correct answer and it did that in a
single forward pass of the
network now that's because the numbers
here I think are very simple and so I
made it a bit more difficult to be a bit
mean to the model so I said Emily buys
23 apples and 177 oranges and then I
just made the numbers a bit bigger and
I'm just making it harder for the model
I'm asking it to more computation in a
single token and so I said the same
thing and here it gave me five and five
is actually not correct so the model
failed to do all of this calculation in
a single forward pass of the network it
failed to go from the input tokens and
then in a single forward pass of the
network single go through the network it
couldn't produce the result and then I
said okay now don't worry about the the
token limit and just solve the problem
as usual and then it goes all the
intermediate results it simplifies and
every one of these intermediate results
here and intermediate calculations is
much easier for the model and um it sort
of it's not too much work per token all
of the tokens here are correct and it
arises the solution which is seven and I
just couldn't squeeze all of this work
it couldn't squeeze that into a single
forward passive Network so I think
that's kind of just a cute example and
something to kind of like think about
and I think it's kind of again just
elucidative in terms of how these uh
models work the last thing that I would
say on this topic is that if I was in
practi is trying to actually solve this
in my day-to-day life I might actually
not uh trust that the model that all the
intermediate calculations correctly here
so actually probably what I do is
something like this I would come here
and I would say use code and uh that's
because code is one of the possible
tools that chachy PD can use and instead
of it having to do mental arithmetic
like this mental arithmetic here I don't
fully trust it and especially if the
numbers get really big there's no
guarantee that the model will do this
correctly any one of these intermediates
steps might in principle fail we're
using neural networks to do mental
arithmetic uh kind of like you doing
mental arithmetic in your brain it might
just like uh screw up some of the
intermediate results it's actually kind
of amazing that it can even do this kind
of mental arithmetic I don't think I
could do this in my head but basically
the model is kind of like doing it in
its head and I don't trust that so I
wanted to use tools so you can say stuff
like use
code and uh I'm not sure what happened
there use
code and so um like I mentioned there's
a special tool and the uh the model can
write code and I can inspect that this
code is correct and then uh it's not
relying on its mental arithmetic it is
using the python interpreter which is a
very simple programming language to
basically uh write out the code that
calculates the result and I would
personally trust this a lot more because
this came out of a Python program which
I think has a lot more correctness
guarantees than the mental arithmetic of
a language model uh so just um another
kind of uh potential hint that if you
have these kinds of problems uh you may
want to basically just uh ask the model
to use the code interpreter and just
like we saw with the web search the
model has special uh kind of tokens for
calling uh like it will not actually
generate these tokens from the language
model it will write the program and then
it actually sends that program to a
different sort of part of the computer
that actually just runs that program and
brings back the result and then the
model gets access to that result and can
tell you that okay the cost of each
apple is seven
um so that's another kind of tool and I
would use this in practice for yourself
and it's um yeah it's just uh less error
prone I would say so that's why I called
this section models need tokens to think
distribute your competition across many
tokens ask models to create intermediate
results or whenever you can lean on
tools and Tool use instead of allowing
the models to do all of the stuff in
their memory so if they try to do it all
in their memory I don't fully trust it
and prefer to use tools whenever
possible I want to show you one more
example of where this actually comes up
and that's in counting so models
actually are not very good at counting
for the exact same reason you're asking
for way too much in a single individual
token so let me show you a simple
example of that um how many dots are
below and then I just put in a bunch of
dots and Chach says there are and then
it just tries to solve the problem in a
single token so in a single token it has
to count the number of dots in its
context window
um and it has to do that in the single
forward pass of a network and a single
forward pass of a network as we talked
about there's not that much computation
that can happen there just think of that
as being like very little competation
that happens there so if I just look at
what the model sees let's go to the LM
go to tokenizer it sees uh
this how many dots are below and then it
turns out that these dots here this
group of I think 20 dots is a single
token and then this group of whatever it
is is another token and then for some
reason they break up as this so I don't
actually this has to do with the details
of the tokenizer but it turns out that
these um the model basically sees the
token ID this this this and so on and
then from these token IDs it's expected
to count the number and spoiler alert is
not 161 it's actually I believe
177 so here's what we can do instead uh
we can say use code and you might expect
that like why should this work and it's
actually kind of subtle and kind of
interesting so when I say use code I
actually expect this to work let's see
okay 177 is correct so what happens here
is I've actually it doesn't look like it
but I've broken down the problem into a
problems that are easier for the model I
know that the model can't count it can't
do mental counting but I know that the
model is actually pretty good at doing
copy pasting so what I'm doing here is
when I say use code it creates a string
in Python for this and the task of
basically copy pasting my input here to
here is very simple because for the
model um it sees this string of uh it
sees it as just these four tokens or
whatever it is so it's very simple for
the model to copy paste those token IDs
and um kind of unpack them into Dots
here and so it creates this string and
then it calls python routine. count and
then it comes up with the correct answer
so the python interpreter is doing the
