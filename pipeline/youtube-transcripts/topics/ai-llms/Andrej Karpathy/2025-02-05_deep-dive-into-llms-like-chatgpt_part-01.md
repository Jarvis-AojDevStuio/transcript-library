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
word_count: 3997
chunk: 1
total_chunks: 11
parent_video_id: "7xTGNNLPyMI"
---
hi everyone so I've wanted to make this
video for a while it is a comprehensive
but General audience introduction to
large language models like Chachi PT and
what I'm hoping to achieve in this video
is to give you kind of mental models for
thinking through what it is that this
tool is it is obviously magical and
amazing in some respects it's uh really
good at some things not very good at
other things and there's also a lot of
sharp edges to be aware of so what is
behind this text box you can put
anything in there and press enter but uh
what should we be putting there and what
are these words generated back how does
this work and what what are you talking
to exactly so I'm hoping to get at all
those topics in this video we're going
to go through the entire pipeline of how
this stuff is built but I'm going to
keep everything uh sort of accessible to
a general audience so let's take a look
at first how you build something like
chpt and along the way I'm going to talk
about um you know some of the sort of
cognitive psychological implications of
the tools okay so let's build Chachi PT
so there's going to be multiple stages
arranged sequentially the first stage is
called the pre-training stage and the
first step of the pre-training stage is
to download and process the internet now
to get a sense of what this roughly
looks like I recommend looking at this
URL here so um this company called
hugging face uh collected and created
and curated this data set called Fine
web and they go into a lot of detail on
this block post on how how they
constructed the fine web data set and
all of the major llm providers like open
AI anthropic and Google and so on will
have some equivalent internally of
something like the fine web data set so
roughly what are we trying to achieve
here we're trying to get ton of text
from the internet from publicly
available sources so we're trying to
have a huge quantity of very high
quality documents and we also want very
large diversity of documents because we
want to have a lot of knowledge inside
these models so we want large diversity
of high quality documents and we want
many many of them and achieving this is
uh quite complicated and as you can see
here takes multiple stages to do well so
let's take a look at what some of these
stages look like in a bit for now I'd
like to just like to note that for
example the fine web data set which is
fairly representative what you would see
in a production grade application
actually ends up being only about 44
terabyt of dis space um you can get a
USB stick for like a terabyte very
easily or I think this could fit on a
single hard drive almost today so this
is not a huge amount of data at the end
of the day even though the internet is
very very large we're working with text
and we're also filtering it aggressively
so we end up with about 44 terabytes in
this example so let's take a look at uh
kind of what this data looks like and
what some of these stages uh also are so
the starting point for a lot of these
efforts and something that contributes
most of the data by the end of it is
Data from common crawl so common craw is
an organization that has been basically
scouring the internet since 2007 so as
of 2024 for example common CW has
indexed 2.7 billion web
pages uh and uh they have all these
crawlers going around the internet and
what you end up doing basically is you
start with a few seed web pages and then
you follow all the links and you just
keep following links and you keep
indexing all the information and you end
up with a ton of data of the internet
over time so this is usually the
starting point for a lot of the uh for a
lot of these efforts now this common C
data is quite raw and is filtered in
many many different ways
so here they Pro they document this is
the same diagram they document a little
bit the kind of processing that happens
in these stages so the first thing here
is something called URL
filtering so what that is referring to
is that there's these block
lists of uh basically URLs that are or
domains that uh you don't want to be
getting data from so usually this
includes things like U malware websites
spam websites marketing websites uh
racist websites adult sites and things
like that so there's a ton of different
types of websites that are just
eliminated at this stage because we
don't want them in our data set um the
second part is text extraction you have
to remember that all these web pages
this is the raw HTML of these web pages
that are being saved by these crawlers
so when I go to inspect
here this is what the raw HTML actually
looks like you'll notice that it's got
all this markup uh like lists and stuff
like that and there's CSS and all this
kind of stuff so this is um computer
code almost for these web pages but what
we really want is we just want this text
right we just want the text of this web
page and we don't want the navigation
and things like that so there's a lot of
filtering and processing uh and heris
that go into uh adequately filtering for
just their uh good content of these web
pages the next stage here is language
filtering so for example fine web
filters uh using a language classifier
they try to guess what language every
single web page is in and then they only
keep web pages that have more than 65%
of English as an
example and so you can get a sense that
this is like a design decision that
different companies can uh can uh take
for themselves what fraction of all
different types of languages are we
going to include in our data set because
for example if we filter out all of the
Spanish as an example then you might
imagine that our model later will not be
very good at Spanish because it's just
never seen that much data of that
language and so different companies can
focus on multilingual performance to uh
to a different degree as an example so
fine web is quite focused on English and
so their language model if they end up
training one later will be very good at
English but not may be very good at
other
languages after language filtering
there's a few other filtering steps and
D duplication and things like that um
finishing with for example the pii
removal this is personally identifiable
information so as an example addresses
Social Security numbers and things like
that you would try to detect them and
you would try to filter out those kinds
of web pages from the the data set as
well so there's a lot of stages here and
I won't go into full detail but it is a
fairly extensive part of the
pre-processing and you end up with for
example the fine web data set so when
you click in on it uh you can see some
examples here of what this actually ends
up looking like and anyone can download
this on the huging phase web page and so
here are some examples of the final text
that ends up in the training set so this
is some article about tornadoes in
2012 um so there's some t tadoes in 2020
in 2012 and what
happened uh this next one is something
about did you know you have two little
yellow 9vt battery sized adrenal glands
in your body okay so this is some kind
of a odd medical
article so just think of these as
basically uh web pages on the internet
filtered just for the text in various
ways and now we have a ton of text 40
terabytes off it and that now is the
starting point for the next step of this
stage now I wanted to give you an
intuitive sense of where we are right
now so I took the first 200 web pages
here and remember we have tons of them
and I just take all that text and I just
put it all together concatenate it and
so this is what we end up with we just
get this just just raw text raw internet
text and there's a ton of it even in
these 200 web pages so I can continue
zooming out here and we just have this
like massive tapestry of Text data and
this text data has all these p patterns
and what we want to do now is we want to
start training neural networks on this
data so the neural networks can
internalize and model how this text
flows right so we just have this giant
texture of text and now we want to get
neural Nets that mimic it okay now
before we plug text into neural networks
we have to decide how we're going to
represent this text uh and how we're
going to feed it in now the way our
technology works for these neuron Lots
is that they expect
a one-dimensional sequence of symbols
and they want a finite set of symbols
that are possible and so we have to
decide what are the symbols and then we
have to represent our data as
one-dimensional sequence of those
symbols so right now what we have is a
onedimensional sequence of text it
starts here and it goes here and then it
comes here Etc so this is a
onedimensional sequence even though on
my monitor of course it's laid out in a
two-dimensional way but it goes from
left to right and top to bottom right so
it's a one-dimensional sequence of text
now this being computers of course
there's an underlying representation
here so if I do what's called utf8 uh
encode this text then I can get the raw
bits that correspond to this text in the
computer and that's what uh that looks
like this so it turns out that for
example this very first bar here is the
first uh eight bits as an
example so what is this thing right this
is um representation that we are looking
for uh in in a certain sense we have
exactly two possible symbols zero and
one and we have a very long sequence of
it right now as it turns out um this
sequence length is actually going to be
very finite and precious resource uh in
our neural network and we actually don't
want extremely long sequences of just
two symbols instead what we want is we
want to trade off uh this um symbol
size uh of this vocabulary as we call it
and the resulting sequence length so we
don't want just two symbols and
extremely long sequences we're going to
want more symbols and shorter sequences
okay so one naive way of compressing or
decreasing the length of our sequence
here is to basically uh consider some
group of consecutive bits for example
eight bits and group them into a single
what's called bite so because uh these
bits are either on or off if we take a
group of eight of them there turns out
to be only 256 possible combinations of
how these bits could be on or off and so
therefore we can re repesent this
sequence into a sequence of bytes
instead so this sequence of bytes will
be eight times shorter but now we have
256 possible symbols so every number
here goes from 0 to
255 now I really encourage you to think
of these not as numbers but as unique
IDs or like unique symbols so maybe it's
a bit more maybe it's better to actually
think of these to replace every one of
these with a unique Emoji you'd get
something like this so um we basically
have a sequence of emojis and there's
256 possible emojis you can think of it
that way now it turns out that in
production for state-of-the-art language
models uh you actually want to go even
Beyond this you want to continue to
shrink the length of the sequence uh
because again it is a precious resource
in return for more symbols in your
vocabulary and the way this is done is
done by running what's called The Bite
pair encoding algorithm and the way this
works is we're basically looking for
consecutive bytes or symbols that are
very common so for example turns out
that the sequence 116 followed by 32 is
quite common and occurs very frequently
so what we're going to do is we're going
to group uh this um pair into a new
symbol so we're going to Mint a symbol
with an ID 256 and we're going to
rewrite every single uh pair 11632 with
this new symbol and then can we can
iterate this algorithm as many times as
we wish and each time when we mint a new
symbol we're decreasing the length and
we're increasing the symbol size and in
practice it turns out that a pretty good
setting of um the basically the
vocabulary size turns out to be about
100,000 possible symbols so in
particular GPT 4 uses
100,
277 symbols
um and this process of converting from
raw text into these symbols or as we
call them tokens is the process called
tokenization so let's now take a look at
how gp4 performs tokenization conting
from text to tokens and from tokens back
to text and what this actually looks
like so one website I like to use to
explore these token representations is
called tick tokenizer and so come here
to the drop down and select CL 100 a
base which is the gp4 base model
tokenizer and here on the left you can
put in text and it shows you the
tokenization of that text so for example
heo space
world so hello world turns out to be
exactly two Tokens The Token hello which
is the token with ID
15339 and the token space
world that is the token 1
1917 so um hello space world now if I
was to join these two for example I'm
going to get again two tokens but it's
the token H followed by the token L
world without the
H um if I put in two Spa two spaces here
between hello and world it's again a
different uh tokenization there's a new
token 220
here okay so you can play with this and
see what happens here also keep in mind
this is not uh this is case sensitive so
if this is a capital H it is something
else or if it's uh hello world then
actually this ends up being three tokens
instead of just two
tokens yeah so you can play with this
and get an sort of like an intuitive
sense of uh what these tokens work like
we're actually going to loop around to
tokenization a bit later in the video
for now I just wanted to show you the
website and I wanted to uh show you that
this text basically at the end of the
day so for example if I take one line
here this is what GT4 will see it as so
this text will be a sequence of length
62 this is the sequence here and this is
how the chunks of text correspond to
these symbols and again there's 100,
27777 possible symbols and we now have
one-dimensional sequences of those
symbols so um yeah we're going to come
back to tokenization but that's uh for
now where we are okay so what I've done
now is I've taken this uh sequence of
text that we have here in the data set
and I have re-represented it using our
tokenizer into a sequence of tokens and
this is what that looks like now so for
example when we go back to the Fine web
data set they mentioned that not only is
this 44 terab of dis space but this is
about a 15 trillion token sequence of um
in this data set and so here these are
just some of the first uh one or two or
three or a few thousand here I think uh
tokens of this data set but there's 15
trillion here uh to keep in mind and
again keep in mind one more time that
all of these represent little text
chunks they're all just like atoms of
these sequences and the numbers here
don't make any sense they're just uh
they're just unique IDs okay so now we
get to the fun part which is the uh
neural network training and this is
where a lot of the heavy lifting happens
computationally when you're training
these neural networks so what we do here
in this this step is we want to model
the statistical relationships of how
these tokens follow each other in the
sequence so what we do is we come into
the data and we take Windows of tokens
so we take a window of tokens uh from
this data fairly
randomly and um the windows length can
range anywhere anywhere between uh zero
tokens actually all the way up to some
maximum size that we decide on uh so for
example in practice you could see a
token with Windows of say 8,000 tokens
now in principle we can use arbitrary
window lengths of tokens uh but uh
processing very long uh basically U
window sequences would just be very
computationally expensive so we just
kind of decide that say 8,000 is a good
number or 4,000 or 16,000 and we crop it
there now in this example I'm going to
be uh taking the first four tokens just
so everything fits nicely so these
tokens
we're going to take a window of four
tokens this bar view in and space single
which are these token
IDs and now what we're trying to do here
is we're trying to basically predict the
token that comes next in the sequence so
3962 comes next right so what we do now
here is that we call this the context
these four tokens are context and they
feed into a neural
network and this is the input to the
neural network
now I'm going to go into the detail of
what's inside this neural network in a
little bit for now it's important to
understand is the input and the output
of the neural net so the input are
sequences of tokens of variable length
anywhere between zero and some maximum
size like 8,000 the output now is a
prediction for what comes next so
because our vocabulary has
100277 possible tokens the neural
network is going to Output exactly that
many numbers
and all of those numbers correspond to
the probability of that token as coming
next in the sequence so it's making
guesses about what comes
next um in the beginning this neural
network is randomly initialized so um
and we're going to see in a little bit
what that means but it's a it's a it's a
random transformation so these
probabilities in the very beginning of
the training are also going to be kind
of random uh so here I have three
examples but keep in mind that there's
100,000 numbers here um so the
probability of this token space
Direction neural network is saying that
this is 4% likely right now 11799 is 2%
and then here the probility of 3962
which is post is 3% now of course we've
sampled this window from our data set so
we know what comes next we know and
that's the label we know that the
correct answer is that 3962 actually
comes next in the sequence so now what
we have is this mathematical process for
doing an update to the neural network we
have the way of tuning it and uh we're
going to go into a little bit of of
detail in a bit but basically we know
that this probability here of 3% we want
this probability to be higher and we
want the probabilities of all the other
tokens to be
lower and so we have a way of
mathematically calculating how to adjust
and update the neural network so that
the correct answer has a slightly higher
probability so if I do an update to the
neural network now the next time I Fe
this particular sequence of four tokens
into neural network the neural network
will be slightly adjusted now and it
will say Okay post is maybe 4% and case
now maybe is
1% and uh Direction could become 2% or
something like that and so we have a way
of nudging of slightly updating the
neuronet to um basically give a higher
probability to the correct token that
comes next in the sequence and now you
just have to remember that this process
happens not just for uh this um token
here where these four fed in and
predicted this one this process happens
at the same time for all of these tokens
in the entire data set and so in
practice we sample little windows little
batches of Windows and then at every
single one of these tokens we want to
adjust our neural network so that the
probability of that token becomes
slightly higher and this all happens in
parallel in large batches of these
tokens and this is the process of
training the neural network it's a
sequence of updating it so that it's
predictions match up the statistics of
what actually happens in your training
set and its probabilities become
consistent with the uh statistical
patterns of how these tokens follow each
other in the data so let's now briefly
get into the internals of these neural
networks just to give you a sense of
what's inside so neural network
internals so as I mentioned we have
these inputs uh that are sequences of
tokens in this case this is four input
tokens but this can be anywhere between
zero up to let's say 8,000 tokens in
principle this can be an infinite number
of tokens we just uh it would just be
too computationally expensive to process
an infinite number of tokens so we just
crop it at a certain length and that
becomes the maximum context length of
that uh
model now these inputs X are mixed up in
a giant mathematical expression together
with the parameters or the weights of
these neural networks so here I'm
showing six example parameters and their
