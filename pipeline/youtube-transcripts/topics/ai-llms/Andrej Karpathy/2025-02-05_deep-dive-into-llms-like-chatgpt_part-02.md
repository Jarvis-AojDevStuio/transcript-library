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
word_count: 3996
chunk: 2
total_chunks: 11
parent_video_id: "7xTGNNLPyMI"
---
setting but in practice these uh um
modern neural networks will have
billions of these uh parameters and in
the beginning these parameters are
completely randomly set now with a
random setting of parameters you might
expect that this uh this neural network
would make random predictions and it
does in the beginning it's totally
random predictions but it's through this
process of iteratively updating the
network uh as and we call that process
training a neural network so uh that the
setting of these parameters gets
adjusted such that the outputs of our
neural network becomes consistent with
the patterns seen in our training
set so think of these parameters as kind
of like knobs on a DJ set and as you're
twiddling these knobs you're getting
different uh predictions for every
possible uh token sequence input and
training in neural network just means
discovering a setting of parameters that
seems to be consistent with the
statistics of the training
set now let me just give you an example
what this giant mathematical expression
looks like just to give you a sense and
modern networks are massive expressions
with trillions of terms probably but let
me just show you a simple example here
it would look something like this I mean
these are the kinds of Expressions just
to show you that it's not very scary we
have inputs x uh like X1 x2 in this case
two example inputs and they get mixed up
with the weights of the network w0 W1 2
3 Etc and this mixing is simple things
like multiplication addition addition
exponentiation division Etc and it is
the subject of neural network
architecture research to design
effective mathematical Expressions uh
that have a lot of uh kind of convenient
characteristics they are expressive
they're optimizable they're paralyzable
Etc and so but uh at the end of the day
these are these are not complex
expressions and basically they mix up
the inputs with the parameters to make
predictions and we're optimizing uh the
parameters of this neural network so
that the predictions come out consistent
with the training set now I would like
to show you an actual production grade
example of what these neural networks
look like so for that I encourage you to
go to this website that has a very nice
visualization of one of these
networks so this is what you will find
on this website and this neural network
here that is used in production settings
has this special kind of structure this
network is called the Transformer and
this particular one as an example has 8
5,000 roughly
parameters now here on the top we take
the inputs which are the token
sequences and then information flows
through the neural network until the
output which here are the logit softmax
but these are the predictions for what
comes next what token comes
next and then here there's a sequence of
Transformations and all these
intermediate values that get produced
inside this mathematical expression s it
is sort of predicting what comes next so
as an example these tokens are embedded
into kind of like this distributed
representation as it's called so every
possible token has kind of like a vector
that represents it inside the neural
network so first we embed the tokens and
then those values uh kind of like flow
through this diagram and these are all
very simple mathematical Expressions
individually so we have layer norms and
Matrix multiplications and uh soft Maxes
and so on so here kind of like the
attention block of this Transformer and
then information kind of flows through
into the multi-layer perceptron block
and so on and all these numbers here
these are the intermediate values of the
expression and uh you can almost think
of these as kind of like the firing
rates of these synthetic neurons but I
would caution you to uh not um kind of
think of it too much like neurons
because these are extremely simple
neurons compared to the neurons you
would find in your brain your biological
neurons are very complex dynamical
processes that have memory and so on
there's no memory in this expression
it's a fixed mathematical expression
from input to Output with no memory it's
just a
stateless so these are very simple
neurons in comparison to biological
neurons but you can still kind of
loosely think of this as like a
synthetic piece of uh brain tissue if
you if you like uh to think about it
that way so information flows through
all these neurons fire until we get to
the predictions now I'm not actually
going to dwell too much on the precise
kind of like mathematical details of all
these Transformations honestly I don't
think it's that important to get into
what's really important to understand is
that this is a mathematical function it
is uh parameterized by some fixed set of
parameters like say 85,000 of them and
it is a way of transforming inputs into
outputs and as we twiddle the parameters
we are getting uh different kinds of
predictions and then we need to find a
good setting of these parameters so that
the predictions uh sort of match up with
the patterns seen in training set
so that's the Transformer okay so I've
shown you the internals of the neural
network and we talked a bit about the
process of training it I want to cover
one more major stage of working with
these networks and that is the stage
called inference so in inference what
we're doing is we're generating new data
from the model and so uh we want to
basically see what kind of patterns it
has internalized in the parameters of
its Network so to generate from the
model is relatively straightforward
we start with some tokens that are
basically your prefix like what you want
to start with so say we want to start
with the token 91 well we feed it into
the
network and remember that the network
gives us probabilities right it gives us
this probability Vector here so what we
can do now is we can basically flip a
biased coin so um we can sample uh
basically a token based on this
probability distribution so the tokens
that are given High probability by the
model are more likely to be sampled when
you flip this biased coin you can think
of it that way so we sample from the
distribution to get a single unique
token so for example token 860 comes
next uh so 860 in this case when we're
generating from model could come next
now 860 is a relatively likely token it
might not be the only possible token in
this case there could be many other
tokens that could have been sampled but
we could see that 86c is a relatively
likely token as an example and indeed in
our training examp example here 860 does
follow 91 so let's now say that we um
continue the process so after 91 there's
a60 we append it and we again ask what
is the third token let's sample and
let's just say that it's 287 exactly as
here let's do that again we come back in
now we have a sequence of three and we
ask what is the likely fourth token and
we sample from that and get this one and
now let's say we do it one more time we
take those four we sample and we get
this one and this
13659 uh this is not actually uh 3962 as
we had before so this token is the token
article uh instead so viewing a single
article and so in this case we didn't
exactly reproduce the sequence that we
saw here in the training data so keep in
mind that these systems are stochastic
they have um we're sampling and we're
flipping coins and sometimes we lock out
and we reproduce some like small chunk
of the text and training set but
sometimes we're uh we're getting a token
that was not verbatim part of any of the
documents in the training data so we're
going to get sort of like remixes of the
data that we saw in the training because
at every step of the way we can flip and
get a slightly different token and then
once that token makes it in if you
sample the next one and so on you very
quickly uh start to generate token
streams that are very different from the
token streams that UR
in the training documents so
statistically they will have similar
properties but um they are not identical
to your training data they're kind of
like inspired by the training data and
so in this case we got a slightly
different sequence and why would we get
article you might imagine that article
is a relatively likely token in the
context of bar viewing single Etc and
you can imagine that the word article
followed this context window somewhere
in the training documents uh to some
extent and we just happen to sample it
here at that stage so basically
inference is just uh predicting from
these distributions one at a time we
continue feeding back tokens and getting
the next one and we uh we're always
flipping these coins and depending on
how lucky or unlucky we get um we might
get very different kinds of patterns
depending on how we sample from these
probability distributions so that's
inference so in most common scenarios uh
basically downloading the internet and
tokenizing it is is a pre-processing
step you do that a single time and then
uh once you have your token sequence we
can start training networks and in
Practical cases you would try to train
many different networks of different
kinds of uh settings and different kinds
of arrangements and different kinds of
sizes and so you''ll be doing a lot of
neural network training and um then once
you have a neural network and you train
it and you have some specific set of
parameters that you're happy with um
then you can take the model and you can
do inference and you can actually uh
generate data from the model and when
you're on chat GPT and you're talking
with a model uh that model is trained
and has been trained by open aai many
months ago probably and they have a
specific set of Weights that work well
and when you're talking to the model all
of that is just inference there's no
more training those parameters are held
fixed and you're just talking to the
model sort of uh you're giving it some
of the tokens and it's kind of
completing token sequences and that's
what you're seeing uh generated when you
actually use the model on CH GPT so that
model then just does inference alone so
let's now look at an example of training
an inference that is kind of concrete
and gives you a sense of what this
actually looks like uh when these models
are trained now the example that I would
like to work with and that I'm
particularly fond of is that of opening
eyes gpt2 so GPT uh stands for
generatively pre-trained Transformer and
this is the second iteration of the GPT
series by open AI when you are talking
to chat GPT today the model that is
underlying all of the magic of that
interaction is GPT 4 so the fourth
iteration of that series now gpt2 was
published in 2019 by openi in this paper
that I have right here and the reason I
like gpt2 is that it is the first time
that a recognizably modern stack came
together so um all of the pieces of gpd2
are recognizable today by modern
standards it's just everything has
gotten bigger now I'm not going to be
able to go into the full details of this
paper of course because it is a
technical publication but some of the
details that I would like to highlight
are as follows gpt2 was a Transformer
neural network just like you were just
like the neural networks you would work
with today it was it had 1.6 billion
parameters right so these are the
parameters that we looked at here it
would have 1.6 billion of them today
modern Transformers would have a lot
closer to a trillion or several hundred
billion
probably the maximum context length here
was 1,24 tokens so it is when we are
sampling chunks of Windows of tokens
from the data set we're never taking
more than 1,24 tokens and so when you
are trying to predict the next token in
a sequence you will never have more than
1,24 tokens uh kind of in your context
in order to make that prediction now
this is also tiny by modern standards
today the token uh the context lengths
would be a lot closer to um couple
hundred thousand or maybe even a million
and so you have a lot more context a lot
more tokens in history history and you
can make a lot better prediction about
the next token in the sequence in that
way and finally gpt2 was trained on
approximately 100 billion tokens and
this is also fairly small by modern
standards as I mentioned the fine web
data set that we looked at here the fine
web data set has 15 trillion tokens uh
so 100 billion is is quite
small
now uh I actually tried to reproduce uh
gpt2 for fun as part of this project
called lm. C so you can see my rup of
doing that in this post on GitHub under
the lm. C repository so in particular
the cost of training gpd2 in 2019 what
was estimated to be approximately
$40,000 but today you can do
significantly better than that and in
particular here it took about one day
and about
$600 uh but this wasn't even trying too
hard I think you could really bring this
down to about $100 today now why is it
that the costs have come down so much
well number one these data sets have
gotten a lot better and the way we
filter them extract them and prepare
them has gotten a lot more refined and
so the data set is of just a lot higher
quality so that's one thing but really
the biggest difference is that our
computers have gotten much faster in
terms of the hardware and we're going to
look at that in a second and also the
software for uh running these models and
really squeezing out all all the speed
from the hardware as it is possible uh
that software has also gotten much
better as as everyone has focused on
these models and try to run them very
very
quickly now I'm not going to be able to
go into the full detail of this gpd2
reproduction and this is a long
technical post but I would like to still
give you an intuitive sense for what it
looks like to actually train one of
these models as a researcher like what
are you looking at and what does it look
like what does it feel like so let me
give you a sense of that a little bit
okay so this is what it looks like let
me slide this
over so what I'm doing here is I'm
training a gpt2 model right now
and um what's happening here is that
every single line here like this one is
one update to the model so remember how
here we are um basically making the
prediction better for every one of these
tokens and we are updating these weights
or parameters of the neural net so here
every single line is One update to the
neural network where we change its
parameters by a little bit so that it is
better at predicting next token and
sequence in particular every single line
here is improving the prediction on 1
million tokens in the training set so
we've basically taken 1 million tokens
out of this data set and we've tried to
improve the prediction of that token as
coming next in a sequence on all 1
million of them
simultaneously and at every single one
of these steps we are making an update
to the network for that now the number
to watch closely is this number called
loss and the loss is a single number
that is telling you how well your neural
network is performing right now and it
is created so that low loss is good so
you'll see that the loss is decreasing
as we make more updates to the neural
nut which corresponds to making better
predictions on the next token in a
sequence and so the loss is the number
that you are watching as a neural
network researcher and you are kind of
waiting you're twiddling your thumbs uh
you're drinking coffee and you're making
sure that this looks good so that with
every update your loss is improving and
the network is getting better at
prediction now here you see that we are
processing 1 million tokens per update
each update takes about 7 Seconds
roughly and here we are going to process
a total of 32,000 steps of
optimization so 32,000 steps with 1
million tokens each is about 33 billion
tokens that we are going to process and
we're currently only about 420 step 20
out of 32,000 so we are still only a bit
more than 1% done because I've only been
running this for 10 or 15 minutes or
something like
that now every 20 steps I have
configured this optimization to do
inference so what you're seeing here is
the model is predicting the next token
in a sequence and so you sort of start
it randomly and then you continue
plugging in the tokens so we're running
this inference step and this is the
model sort of predicting the next token
in the sequence and every time you see
something appear that's a new
token um so let's just look at this and
you can see that this is not yet very
coherent and keep in mind that this is
only 1% of the way through training and
so the model is not yet very good at
predicting the next token in the
sequence so what comes out is actually
kind of a little bit of gibberish right
but it still has a little bit of like
local coherence so since she is mine
it's a part of the information should
discuss my father great companions
Gordon showed me sitting over at and Etc
so I know it doesn't look very good but
let's actually scroll up and see what it
looked like when I started the
optimization so all the way here at
step
one so after 20 steps of optimization
you see that what we're getting here is
looks completely random and of course
that's because the model has only had 20
updates to its parameters and so it's
giving you random text because it's a
random Network and so you can see that
at least in comparison to this model is
starting to do much better and indeed if
we waited the entire 32,000 steps the
model will have improved the point that
it's actually uh generating fairly
coherent English uh and the tokens
stream correctly um and uh they they
kind of make up English a a lot
better
um so this has to run for about a day or
two more now and so uh at this stage we
just make sure that the loss is
decreasing everything is looking good um
and we just have to wait
and now um let me turn now to the um
story of the computation that's required
because of course I'm not running this
optimization on my laptop that would be
way too expensive uh because we have to
run this neural network and we have to
improve it and we have we need all this
data and so on so you can't run this too
well on your computer uh because the
network is just too large uh so all of
this is running on the computer that is
out there in the cloud and I want to
basically address the compute side of
the store of training these models and
what that looks like so let's take a
look okay so the computer that I'm
running this optimization on is this 8X
h100 node so there are eight h100s in a
single node or a single computer now I
am renting this computer and it is
somewhere in the cloud I'm not sure
where it is physically actually the
place I like to rent from is called
Lambda but there are many other
companies who provide this service so
when you scroll down you can see that uh
they have some on demand pricing for
um sort of computers that have these uh
h100s which are gpus and I'm going to
show you what they look like in a second
but on demand 8times Nvidia h100 uh
GPU this machine comes for $3 per GPU
per hour for example so you can rent
these and then you get a machine in a
cloud and you can uh go in and you can
train these
models and these uh gpus they look like
this so this is one h100 GPU uh this is
kind of what it looks like and you slot
this into your computer and gpus are
this uh perfect fit for training your
networks because they are very
computationally expensive but they
display a lot of parallelism in the
computation so you can have many
independent workers kind of um working
all at the same time in solving uh the
matrix multiplication that's under the
hood of training these neural
networks so this is just one of these
h100s but actually you would put them
you would put multiple of them together
so you could stack eight of them into a
single node and then you can stack
multiple nodes into an entire data
center or an entire system
so when we look at a data
center can't spell when we look at a
data center we start to see things that
look like this right so we have one GPU
goes to eight gpus goes to a single
system goes to many systems and so these
are the bigger data centers and there of
course would be much much more expensive
um and what's happening is that all the
big tech companies really desire these
gpus so they can train all these
language models because they are so
powerful and that has is fundamentally
what has driven the stock price of
Nvidia to be $3.4 trillion today as an
example and why Nvidia has kind of
exploded so this is the Gold Rush the
Gold Rush is getting the gpus getting
enough of them so they can all
collaborate to perform this optimization
and they're what are they all doing
