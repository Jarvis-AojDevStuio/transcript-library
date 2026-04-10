---
video_id: "zjkBMFhNj_g"
title: "[1hr Talk] Intro to Large Language Models"
channel: "Andrej Karpathy"
topic: "ai-llms"
published_date: "2023-11-23"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=zjkBMFhNj_g"
duration: 3588
word_count: 3993
chunk: 1
total_chunks: 4
parent_video_id: "zjkBMFhNj_g"
---
hi everyone so recently I gave a
30-minute talk on large language models
just kind of like an intro talk um
unfortunately that talk was not recorded
but a lot of people came to me after the
talk and they told me that uh they
really liked the talk so I would just I
thought I would just re-record it and
basically put it up on YouTube so here
we go the busy person's intro to large
language models director Scott okay so
let's begin first of all what is a large
language model really well a large
language model is just two files right
um there will be two files in this
hypothetical directory so for example
working with a specific example of the
Llama 270b model this is a large
language model released by meta Ai and
this is basically the Llama series of
language models the second iteration of
it and this is the 70 billion parameter
model of uh of this series so there's
multiple models uh belonging to the
Llama 2 Series uh 7 billion um 13
billion 34 billion and 70 billion is the
biggest one now many people like this
model specifically because it is
probably today the most powerful open
weights model so basically the weights
and the architecture and a paper was all
released by meta so anyone can work with
this model very easily uh by themselves
uh this is unlike many other language
models that you might be familiar with
for example if you're using chat GPT or
something like that uh the model
architecture was never released it is
owned by open aai and you're allowed to
use the language model through a web
interface but you don't have actually
access to that model so in this case the
Llama 270b model is really just two
files on your file system the parameters
file and the Run uh some kind of a code
that runs those
parameters so the parameters are
basically the weights or the parameters
of this neural network that is the
language model we'll go into that in a
bit because this is a 70 billion
parameter model uh every one of those
parameters is stored as 2 bytes and so
therefore the parameters file here is
140 gigabytes and it's two bytes because
this is a float 16 uh number as the data
type now in addition to these parameters
that's just like a large list of
parameters uh for that neural network
you also need something that runs that
neural network and this piece of code is
implemented in our run file now this
could be a C file or a python file or
any other programming language really uh
it can be written any arbitrary language
but C is sort of like a very simple
language just to give you a sense and uh
it would only require about 500 lines of
C with no other dependencies to
implement the the uh neural network
architecture uh and that uses basically
the parameters to run the model so it's
only these two files you can take these
two files and you can take your MacBook
and this is a fully self-contained
package this is everything that's
necessary you don't need any
connectivity to the internet or anything
else you can take these two files you
compile your C code you get a binary
that you can point at the parameters and
you can talk to this language model so
for example you can send it text like
for example write a poem about the
company scale Ai and this language model
will start generating text and in this
case it will follow the directions and
give you a poem about scale AI now the
reason that I'm picking on scale AI here
and you're going to see that throughout
the talk is because the event that I
originally presented uh this talk with
was run by scale Ai and so I'm picking
on them throughout uh throughout the
slides a little bit just in an effort to
make it
concrete so this is how we can run the
model just requires two files just
requires a MacBook I'm slightly cheating
here because this was not actually in
terms of the speed of this uh video here
this was not running a 70 billion
parameter model it was only running a 7
billion parameter Model A 70b would be
running about 10 times slower but I
wanted to give you an idea of uh sort of
just the text generation and what that
looks like so not a lot is necessary to
run the model this is a very small
package but the computational complexity
really comes in when we'd like to get
those parameters so how do we get the
parameters and where are they from uh
because whatever is in the run. C file
um the neural network architecture and
sort of the forward pass of that Network
everything is algorithmically understood
and open and and so on but the magic
really is in the parameters and how do
we obtain them so to obtain the
parameters um basically the model
training as we call it is a lot more
involved than model inference which is
the part that I showed you earlier so
model inference is just running it on
your MacBook model training is a
competition very involved process
process so basically what we're doing
can best be sort of understood as kind
of a compression of a good chunk of
Internet so because llama 270b is an
open source model we know quite a bit
about how it was trained because meta
released that information in paper so
these are some of the numbers of what's
involved you basically take a chunk of
the internet that is roughly you should
be thinking 10 terab of text this
typically comes from like a crawl of the
internet so just imagine uh just
collecting tons of text from all kinds
of different websites and collecting it
together so you take a large cheun of
internet then you procure a GPU cluster
um and uh these are very specialized
computers intended for very heavy
computational workloads like training of
neural networks you need about 6,000
gpus and you would run this for about 12
days uh to get a llama 270b and this
would cost you about $2 million and what
this is doing is basically it is
compressing this uh large chunk of text
into what you can think of as a kind of
a zip file so these parameters that I
showed you in an earlier slide are best
kind of thought of as like a zip file of
the internet and in this case what would
come out are these parameters 140 GB so
you can see that the compression ratio
here is roughly like 100x uh roughly
speaking but this is not exactly a zip
file because a zip file is lossless
compression What's Happening Here is a
lossy compression we're just kind of
like getting a kind of a Gestalt of the
text that we trained on we don't have an
identical copy of it in these parameters
and so it's kind of like a lossy
compression you can think about it that
way the one more thing to point out here
is these numbers here are actually by
today's standards in terms of
state-of-the-art rookie numbers uh so if
you want to think about state-of-the-art
neural networks like say what you might
use in chpt or Claude or Bard or
something like that uh these numbers are
off by factor of 10 or more so you would
just go in then you just like start
multiplying um by quite a bit more and
that's why these training runs today are
many tens or even potentially hundreds
of millions of dollars very large
clusters very large data sets and this
process here is very involved to get
those parameters once you have those
parameters running the neural network is
fairly computationally
cheap okay so what is this neural
network really doing right I mentioned
that there are these parameters um this
neural network basically is just trying
to predict the next word in a sequence
you can think about it that way so you
can feed in a sequence of words for
example C set on a this feeds into a
neural net and these parameters are
dispersed throughout this neural network
and there's neurons and they're
connected to each other and they all
fire in a certain way you can think
about it that way um and out comes a
prediction for what word comes next so
for example in this case this neural
network might predict that in this
context of for Words the next word will
probably be a Matt with say 97%
probability so this is fundamentally the
problem that the neural network is
performing and this you can show
mathematically that there's a very close
relationship between prediction and
compression which is why I sort of
allude to this neural network as a kind
of training it is kind of like a
compression of the internet um because
if you can predict uh sort of the next
word very accurately uh you can use that
to compress the data set so it's just a
next word prediction neural network you
give it some words it gives you the next
word now the reason that what you get
out of the training is actually quite a
magical artifact is
that basically the next word predition
task you might think is a very simple
objective but it's actually a pretty
powerful objective because it forces you
to learn a lot about the world inside
the parameters of the neural network so
here I took a random web page um at the
time when I was making this talk I just
grabbed it from the main page of
Wikipedia and it was uh about Ruth
Handler and so think about being the
neural network and you're given some
amount of words and trying to predict
the next word in a sequence well in this
case I'm highlighting here in red some
of the words that would contain a lot of
information and so for example in in if
your objective is to predict the next
word presumably your parameters have to
learn a lot of this knowledge you have
to know about Ruth and Handler and when
she was born and when she died uh who
she was uh what she's done and so on and
so in the task of next word prediction
you're learning a ton about the world
and all this knowledge is being
compressed into the weights uh the
parameters
now how do we actually use these neural
networks well once we've trained them I
showed you that the model inference um
is a very simple process we basically
generate uh what comes next we sample
from the model so we pick a word um and
then we continue feeding it back in and
get the next word and continue feeding
that back in so we can iterate this
process and this network then dreams
internet documents so for example if we
just run the neural network or as we say
perform inference uh we would get sort
of like web page dreams you can almost
think about it that way right because
this network was trained on web pages
and then you can sort of like Let it
Loose so on the left we have some kind
of a Java code dream it looks like in
the middle we have some kind of a what
looks like almost like an Amazon product
dream um and on the right we have
something that almost looks like
Wikipedia article focusing for a bit on
the middle one as an example the title
the author the ISBN number everything
else this is all just totally made up by
the network uh the network is dreaming
text uh from the distribution that it
was trained on it's it's just mimicking
these documents but this is all kind of
like hallucinated so for example the
ISBN number this number probably I would
guess almost certainly does not exist uh
the model Network just knows that what
comes after ISB and colon is some kind
of a number of roughly this length and
it's got all these digits and it just
like puts it in it just kind of like
puts in whatever looks reasonable so
it's parting the training data set
Distribution on the right the black nose
days I looked at up and it is actually a
kind of fish um and what's Happening
Here is this text verbatim is not found
in a training set documents but this
information if you actually look it up
is actually roughly correct with respect
to this fish and so the network has
knowledge about this fish it knows a lot
about this fish it's not going to
exactly parrot the documents that it saw
in the training set but again it's some
kind of a l some kind of a lossy
compression of the internet it kind of
remembers the gal it kind of knows the
knowledge and it just kind of like goes
and it creates the form it creates kind
of like the correct form and fills it
with some of its knowledge and you're
never 100% sure if what it comes up with
is as we call hallucination or like an
incorrect answer or like a correct
answer necessarily so some of the stuff
could be memorized and some of it is not
memorized and you don't exactly know
which is which um but for the most part
this is just kind of like hallucinating
or like dreaming internet text from its
data distribution okay let's now switch
gears to how does this network work how
does it actually perform this next word
prediction task what goes on inside it
well this is where things complicate a
little bit this is kind of like the
schematic diagram of the neural network
um if we kind of like zoom in into the
toy diagram of this neural net this is
what we call the Transformer neural
network architecture and this is kind of
like a diagram of it now what's
remarkable about these neural nuts is we
actually understand uh in full detail
the architecture we know exactly what
mathematical operations happen at all
the different stages of it uh the
problem is that these 100 billion
parameters are dispersed throughout the
entire neural network work and so
basically these buildon parameters uh of
billions of parameters are throughout
the neural nut and all we know is how to
adjust these parameters iteratively to
make the network as a whole better at
the next word prediction task so we know
how to optimize these parameters we know
how to adjust them over time to get a
better next word prediction but we don't
actually really know what these 100
billion parameters are doing we can
measure that it's getting better at the
next word prediction but we don't know
how these parameters collaborate to
actually perform that
um we have some kind of models that you
can try to think through on a high level
for what the network might be doing so
we kind of understand that they build
and maintain some kind of a knowledge
database but even this knowledge
database is very strange and imperfect
and weird uh so a recent viral example
is what we call the reversal course uh
so as an example if you go to chat GPT
and you talk to GPT 4 the best language
model currently available you say who is
Tom Cruz's mother it will tell you it's
merily feifer which is correct but if
you say who is merely Fifer's son it
will tell you it doesn't know so this
knowledge is weird and it's kind of
one-dimensional and you have to sort of
like this knowledge isn't just like
stored and can be accessed in all the
different ways you have sort of like ask
it from a certain direction almost um
and so that's really weird and strange
and fundamentally we don't really know
because all you can kind of measure is
whether it works or not and with what
probability so long story short think of
llms as kind of like most mostly
inscrutable artifacts they're not
similar to anything else you might might
built in an engineering discipline like
they're not like a car where we sort of
understand all the parts um there are
these neural Nets that come from a long
process of optimization and so we don't
currently understand exactly how they
work although there's a field called
interpretability or or mechanistic
interpretability trying to kind of go in
and try to figure out like what all the
parts of this neural net are doing and
you can do that to some extent but not
fully right now U but right now we kind
of what treat them mostly As empirical
artifacts we can give them
some inputs and we can measure the
outputs we can basically measure their
behavior we can look at the text that
they generate in many different
situations and so uh I think this
requires basically correspondingly
sophisticated evaluations to work with
these models because they're mostly
empirical so now let's go to how we
actually obtain an assistant so far
we've only talked about these internet
document generators right um and so
that's the first stage of training we
call that stage pre-training we're now
moving to the second stage of training
which we call fine-tuning and this is
where we obtain what we call an
assistant model because we don't
actually really just want a document
generators that's not very helpful for
many tasks we want um to give questions
to something and we want it to generate
answers based on those questions so we
really want an assistant model instead
and the way you obtain these assistant
models is fundamentally uh through the
following process we basically keep the
optimization identical so the training
will be the same it's just the next word
prediction task but we're going to s
swap out the data set on which we are
training so it used to be that we are
trying to uh train on internet documents
we're going to now swap it out for data
sets that we collect manually and the
way we collect them is by using lots of
people so typically a company will hire
people and they will give them labeling
instructions and they will ask people to
come up with questions and then write
answers for them so here's an example of
a single example um that might basically
make it into your training set so
there's a user and uh it says something
like can you write a short introduction
about the relevance of the term
monopsony in economics and so on and
then there's assistant and again the
person fills in what the ideal response
should be and the ideal response and how
that is specified and what it should
look like all just comes from labeling
documentations that we provide these
people and the engineers at a company
like open or anthropic or whatever else
will come up with these labeling
documentations
now the pre-training stage is about a
large quantity of text but potentially
low quality because it just comes from
the internet and there's tens of or
hundreds of terabyte Tech off it and
it's not all very high qu uh qu quality
but in this second stage uh we prefer
quality over quantity so we may have
many fewer documents for example 100,000
but all these documents now are
conversations and they should be very
high quality conversations and
fundamentally people create them based
on abling instructions so we swap out
the data set now and we train on these
Q&amp;A documents we uh and this process is
called fine tuning once you do this you
obtain what we call an assistant model
so this assistant model now subscribes
to the form of its new training
documents so for example if you give it
a question like can you help me with
this code it seems like there's a bug
print Hello World um even though this
question specifically was not part of
the training Set uh the model after its
fine-tuning
understands that it should answer in the
style of a helpful assistant to these
kinds of questions and it will do that
so it will sample word by word again
from left to right from top to bottom
all these words that are the response to
this query and so it's kind of
remarkable and also kind of empirical
and not fully understood that these
models are able to sort of like change
their formatting into now being helpful
assistants because they've seen so many
documents of it in the fine chaining
stage but they're still able to access
and somehow utilize all the knowledge
that was built up during the first stage
the pre-training stage so roughly
speaking pre-training stage is um
training on trains on a ton of internet
and it's about knowledge and the fine
truning stage is about what we call
alignment it's about uh sort of giving
um it's a it's about like changing the
formatting from internet documents to
question and answer documents in kind of
like a helpful assistant
manner so roughly speaking here are the
two major parts of obtaining something
like chpt there's the stage one
pre-training and stage two fine-tuning
in the pre-training stage you get a ton
of text from the internet you need a
cluster of gpus so these are special
purpose uh sort of uh computers for
these kinds of um parel processing
workloads this is not just things that
you can buy and Best Buy uh these are
very expensive computers and then you
compress the text into this neural
network into the parameters of it uh
typically this could be a few uh sort of
millions of dollars um
and then this gives you the base model
because this is a very computationally
expensive part this only happens inside
companies maybe once a year or once
after multiple months because this is
kind of like very expens very expensive
to actually perform once you have the
base model you enter the fing stage
which is computationally a lot cheaper
in this stage you write out some
labeling instru instructions that
basically specify how your assistant
should behave then you hire people um so
for example scale AI is a company that
actually would um uh would work with you
to actually um basically create
documents according to your labeling
instructions you collect 100,000 um as
an example high quality ideal Q&amp;A
responses and then you would fine-tune
the base model on this data this is a
lot cheaper this would only potentially
