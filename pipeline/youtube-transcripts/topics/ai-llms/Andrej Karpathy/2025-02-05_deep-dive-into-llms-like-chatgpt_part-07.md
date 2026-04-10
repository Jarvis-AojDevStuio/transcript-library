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
word_count: 4000
chunk: 7
total_chunks: 11
parent_video_id: "7xTGNNLPyMI"
---
counting it's not the models mental
arithmetic doing the counting so it's
again a simple example of um models need
tokens to think don't rely on their
mental arithmetic and um that's why also
the models are not very good at counting
if you need them to do counting tasks
always ask them to lean on the tool now
the models also have many other little
cognitive deficits here and there and
these are kind of like sharp edges of
the technology to be kind of aware of
over time so as an example the models
are not very good with all kinds of
spelling related tasks they're not very
good at it and I told you that we would
loop back around to tokenization and the
reason to do for this is that the models
they don't see the characters they see
tokens and they their entire world is
about tokens which are these little text
chunks and so they don't see characters
like our eyes do and so very simple
character level tasks often fail so for
example uh I'm giving it a string
ubiquitous and I'm asking it to print
only every third character starting with
the first one so we start with U and
then we should go every third so every
so 1 2 3 Q should be next and then Etc
so this I see is not correct and again
my hypothesis is that this is again
Dental arithmetic here is failing number
one a little bit but number two I think
the the more important issue here is
that if you go to Tik
tokenizer and you look at ubiquitous we
see that it is three tokens right so you
and I see ubiquitous and we can easily
access the individual letters because we
kind of see them and when we have it in
the working memory of our visual sort of
field we can really easily index into
every third letter and I can do that
task but the models don't have access to
the individual letters they see this as
these three tokens and uh remember these
models are trained from scratch on the
internet and all these token uh
basically the model has to discover how
many of all these different letters are
packed into all these different tokens
and the reason we even use tokens is
mostly for efficiency uh but I think a
lot of people areed interested to delete
tokens entirely like we should really
have character level or bite level
models it's just that that would create
very long sequences and people don't
know how to deal with that right now so
while we have the token World any kind
of spelling tasks are not actually
expected to work super well so because I
know that spelling is not a strong suit
because of tokenization I can again Ask
it to lean On Tools so I can just say
use code and I would again expect this
to work because the task of copy pasting
ubiquitous into the python interpreter
is much easier and then we're leaning on
python interpreter to manipulate the
characters of this string so when I say
use
code
ubiquitous yes it indexes into every
third character and the actual truth is
u2s
uqs uh which looks correct to me so um
again an example of spelling related
tasks not working very well a very
famous example of that recently is how
many R are there in strawberry and this
went viral many times and basically the
models now get it correct they say there
are three Rs in Strawberry but for a
very long time all the state-of-the-art
models would insist that there are only
two RS in strawberry and this caused a
lot of you know Ruckus because is that a
word I think so because um it just kind
of like why are the models so brilliant
and they can solve math Olympiad
questions but they can't like count RS
in strawberry and the answer for that
again is I've got built up to it kind of
slowly but number one the models don't
see characters they see tokens and
number two they are not very good at
counting and so here we are combining
the difficulty of seeing the characters
with the difficulty of counting and
that's why the models struggled with
this even though I think by now honestly
I think open I may have hardcoded the
answer here or I'm not sure what they
did but um uh but this specific query
now works
so models are not very good at spelling
and there there's a bunch of other
little sharp edges and I don't want to
go into all of them I just want to show
you a few examples of things to be aware
of and uh when you're using these models
in practice I don't actually want to
have a comprehensive analysis here of
all the ways that the models are kind of
like falling short I just want to make
the point that there are some Jagged
edges here and there and we've discussed
a few of them and a few of them make
sense but some of them also will just
not make as much sense and they're kind
of like you're left scratching your head
even if you understand in- depth how
these models work and and good example
of that recently is the following uh the
models are not very good at very simple
questions like this and uh this is
shocking to a lot of people because
these math uh these problems can solve
complex math problems they can answer
PhD grade physics chemistry biology
questions much better than I can but
sometimes they fall short in like super
simple problems like this so here we go
9.11 is bigger than 9.9 and it justifies
it in some way but obviously and then at
the end okay it actually it flips its
decision later so um I don't believe
that this is very reproducible sometimes
it flips around its answer sometimes
gets it right sometimes get it get it
wrong uh let's try
again okay even though it might look
larger okay so here it doesn't even
correct itself in the end if you ask
many times sometimes it gets it right
too but how is it that the model can do
so great at Olympiad grade problems but
then fail on very simple problems like
this and uh I think this one is as I
mentioned a little bit of a head
scratcher it turns out that a bunch of
people studied this in depth and I
haven't actually read the paper uh but
what I was told by this team was that
when you scrutinize the activations
inside the neural network when you look
at some of the features and what what
features turn on or off and what neurons
turn on or off uh a bunch of neurons
inside the neural network light up that
are usually associated with Bible verses
U and so I think the model is kind of
like reminded that these almost look
like Bible verse markers and in a bip
verse setting 9.11 would come after 99.9
and so basically the model somehow finds
it like cognitively very distracting
that in Bible verses 9.11 would be
greater um even though here it's
actually trying to justify it and come
up to the answer with a math it still
ends up with the wrong answer here so it
basically just doesn't fully make sense
and it's not fully understood and um
there's a few Jagged issues like that so
that's why treat this as a as what it is
which is a St stochastic system that is
really magical but that you can't also
fully trust and you want to use it as a
tool not as something that you kind of
like letter rip on a problem and
copypaste the results okay so we have
now covered two major stages of training
of large language models we saw that in
the first stage this is called the
pre-training stage we are basically
training on internet documents and when
you train a language model on internet
documents you get what's called a base
model and it's basically an internet
document simulator right now we saw that
this is an interesting artifact and uh
this takes many months to train on
thousands of computers and it's kind of
a lossy compression of the internet and
it's extremely interesting but it's not
directly useful because we don't want to
sample internet documents we want to ask
questions of an AI and have it respond
to our questions so for that we need an
assistant and we saw that we can
actually construct an assistant in the
process of a post
training and specifically in the process
of supervised fine-tuning as we call
it so in this stage we saw that it's
algorithmically identical to
pre-training nothing is going to change
the only thing that changes is the data
set so instead of Internet documents we
now want to create and curate a very
nice data set of conversations so we
want Millions conversations on all kinds
of diverse topics between a human and an
assistant and fundamentally these
conversations are created by humans so
humans write the prompts and humans
write the ideal response responses and
they do that based on labeling
documentations now in the modern stack
it's not actually done fully and
manually by humans right they actually
now have a lot of help from these tools
so we can use language models um to help
us create these data sets and that's
done extensively but fundamentally it's
all still coming from Human curation at
the end so we create these conversations
that now becomes our data set we fine
tune on it or continue training on it
and we get an assistant and then we kind
of shifted gears and started talking
about some of the kind of cognitive
implications of what this assistant is
like and we saw that for example the
assistant will hallucinate if you don't
take some sort of mitigations towards it
so we saw that hallucinations would be
common and then we looked at some of the
mitigations of those hallucinations and
then we saw that the models are quite
impressive and can do a lot of stuff in
their head but we saw that they can also
Lean On Tools to become better so for
example we can lo lean on a web search
in order to hallucinate less and to
maybe bring up some more um recent
information or something like that or we
can lean on tools like code interpreter
so the code can so the llm can write
some code and actually run it and see
the
results so these are some of the topics
we looked at so far um now what I'd like
to do is I'd like to cover the last and
major stage of this Pipeline and that is
reinforcement learning so reinforcement
learning is still kind of thought to be
under the umbrella of posttraining uh
but it is the last third major stage and
it's a different way of training
language models and usually follows as
this third step so inside companies like
open AI you will start here and these
are all separate teams so there's a team
doing data for pre-training and a team
doing training for pre-training and then
there's a team doing all the
conversation generation in a in a
different team that is kind of doing the
supervis fine tuning and there will be a
team for the reinforcement learning as
well so it's kind of like a handoff of
these models you get your base model the
then you find you need to be an
assistant and then you go into
reinforcement learning which we'll talk
about uh
now so that's kind of like the major
flow and so let's now focus on
reinforcement learning the last major
stage of training and let me first
actually motivate it and why we would
want to do reinforcement learning and
what it looks like on a high level so I
would now like to try to motivate the
reinforcement learning stage and what it
corresponds to with something that
you're probably familiar with and that
is basically going to school so just
like you went to school to become um
really good at something we want to take
large language models through school and
really what we're doing is um we're um
we have a few paradigms of ways of uh
giving them knowledge or transferring
skills so in particular when we're
working with textbooks in school you'll
see that there are three major kind of
uh pieces of information in these
textbooks three classes of information
the first thing you'll see is you'll see
a lot of exposition um and by the way
this is a totally random book I pulled
from the internet I I think it's some
kind of an organic chemistry or
something I'm not sure uh but the
important thing is that you'll see that
most of the text most of it is kind of
just like the meat of it is exposition
it's kind of like background knowledge
Etc as you are reading through the words
of this Exposition you can think of that
roughly as training on that data so um
and that's why when you're reading
through this stuff this background
knowledge and this all this context
information it's kind of equivalent to
pre-training so it's it's where we build
sort of like a knowledge base of this
data and get a sense of the topic the
next major kind of information that you
will see is these uh problems and with
their worked Solutions so basically a
human expert in this case uh the author
of this book has given us not just a
problem but has also worked through the
solution and the solution is basically
like equivalent to having like this
ideal response for an assistant so it's
basically the expert is showing us how
to solve the problem in it's uh kind of
like um in its full form so as we are
reading the solution we are basically
training on the expert data and then
later we can try to imitate the expert
um and basically um that's that roughly
correspond to having the sft model
that's what it would be doing so
basically we've already done
pre-training and we've already covered
this um imitation of experts and how
they solve these problems and the third
stage of reinforcement learning is
basically the practice problems so
sometimes you'll see this is just a
single practice problem here but of
course there will be usually many
practice problems at the end of each
chapter in any textbook and practice
problems of course we know are critical
for learning because what are they
getting you to do they're getting you to
practice uh to practice yourself and
discover ways of solving these problems
yourself and so what you get in a
practice problem is you get a problem
description but you're not given the
solution but you are given the final
answer answer usually in the answer key
of the textbook and so you know the
final answer that you're trying to get
to and you have the problem statement
but you don't have the solution you are
trying to practice the solution you're
trying out many different things and
you're seeing what gets you to the final
solution the best and so you're
discovering how to solve these problems
so and in the process of that you're
relying on number one the background
information which comes from
pre-training and number two maybe a
little bit of imitation of human experts
and you can probably try similar kinds
of solutions and so on so we've done
this and this and now in this section
we're going to try to practice and so
we're going to be given prompts we're
going to be given Solutions U sorry the
final answers but we're not going to be
given expert Solutions we have to
practice and try stuff out and that's
what reinforcement learning is about
okay so let's go back to the problem
that we worked with previously just so
we have a concrete example to talk
through as we explore sort of the topic
here so um I'm here in the Teck
tokenizer because I'd also like to well
I get a text box which is useful but
number two I want to remind you again
that we're always working with
onedimensional token sequences and so um
I actually like prefer this view because
this is like the native view of the llm
if that makes sense like this is what it
actually sees it sees token IDs right
okay so Emily buys three apples and two
oranges each orange is $2 the total cost
of all the fruit is $13 what is the cost
of each apple
and what I'd like to what I like you to
appreciate here is these are like four
possible candidate Solutions as an
example and they all reach the answer
three now what I'd like you to
appreciate at this point is that if I am
the human data labeler that is creating
a conversation to be entered into the
training set I don't actually really
know which of these
conversations to um to add to the data
set some of these conversations kind of
set up a system equations some of them
sort of like just talk through it in
English and some of them just kind of
like skip right through to the
solution um if you look at chbt for
example and you give it this question it
defines a system of variables and it
kind of like does this little thing what
we have to appreciate and uh
differentiate between though is um the
first purpose of a solution is to reach
the right answer of course we want to
get the final answer three that is the
that is the important purpose here but
there's kind of like a secondary purpose
as well where here we are also just kind
of trying to make it like nice uh for
the human because we're kind of assuming
that the person wants to see the
solution they want to see the
intermediate steps we want to present it
nicely Etc so there are two separate
things going on here number one is the
presentation for the human but number
two we're trying to actually get the
right answer um so let's for the moment
focus on just reaching the final answer
if we're only care if we only care about
the final answer then which of these is
the optimal or the best prompt um sorry
the best solution for the llm to reach
the right
answer um and what I'm trying to get at
is we don't know me as a human labeler I
would not know which one of these is
best so as an example we saw earlier on
when we looked at
um the token sequences here and the
mental arithmetic and reasoning we saw
that for each token we can only spend
basically a finite number of finite
amount of compute here that is not very
large or you should think about it that
way way and so we can't actually make
too big of a leap in any one token is is
maybe the way to think about it so as an
example in this one what's really nice
about it is that it's very few tokens so
it's going to take us very short amount
of time to get to the answer but right
here when we're doing 30 - 4 IDE 3
equals right in this token here we're
actually asking for a lot of computation
to happen on that single individual
token and so maybe this is a bad example
to give to the llm because it's kind of
incentivizing it to skip through the
calculations very quickly and it's going
to actually make up mistakes make
mistakes in this mental arithmetic uh so
maybe it would work better to like
spread out the spread it out more maybe
it would be better to set it up as an
equation maybe it would be better to
talk through it we fundamentally don't
know and we don't know because what is
easy for you or I as or as human
labelers what's easy for us or hard for
us is different than what's easy or hard
for the llm it cognition is different um
and the token sequences are kind of like
different hard for it and so some of the
token sequences here that are trivial
for me might be um very too much of a
leap for the llm so right here this
token would be way too hard but
conversely many of the tokens that I'm
creating here might be just trivial to
the llm and we're just wasting tokens
like why waste all these tokens when
this is all trivial so if the only thing
we care care about is the final answer
and we're separating out the issue of
the presentation to the human um then we
don't actually really know how to
annotate this example we don't know what
solution to get to the llm because we
are not the
llm and it's clear here in the case of
like the math example but this is
actually like a very pervasive issue
like for our knowledge is not lm's
knowledge like the llm actually has a
ton of knowledge of PhD in math and
physics chemistry and whatnot so in many
ways it actually knows more than I do
and I'm I'm potentially not utilizing
that knowledge in its problem solving
but conversely I might be injecting a
bunch of knowledge in my solutions that
the LM doesn't know in its parameters
and then those are like sudden leaps
that are very confusing to the model and
so our cognitions are different and I
don't really know what to put here if
all we care about is the reaching the
final solution and doing it economically
ideally and so long story short we are
not in a good position to create these
uh token sequences for the LM and
they're useful by imitation to
initialize the system but we really want
the llm to discover the token sequences
that work for it we need to find it
needs to find for itself what token
sequence reliably gets to the answer
given the prompt and it needs to
discover that in the process of
reinforcement learning and of trial and
error so let's see how this example
would work like in reinforcement
