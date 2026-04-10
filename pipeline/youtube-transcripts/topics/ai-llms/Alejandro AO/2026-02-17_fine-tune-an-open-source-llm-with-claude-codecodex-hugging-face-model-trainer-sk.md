---
video_id: "HGPTUc7tEq4"
title: "Fine-Tune an Open Source LLM with Claude Code/Codex (Hugging Face Model Trainer Skill)"
channel: "Alejandro AO"
topic: "ai-llms"
published_date: "2026-02-17"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=HGPTUc7tEq4"
duration: 1349
word_count: 4285
---
Good morning everyone. How's it going
today? Today we're going to be taking a
look at how to train a model for your
custom agent and that is going to be
very easy because we're going to have
codeex or cloud code do the whole thing
for us. Now, of course, fine-tuning a
language model can be a difficult task
and usually requires an expert, but not
anymore because this agents codeex and
clut code are here to help you not only
make the difficult decisions for you,
but also send the actual training jobs
to HF jobs so that you don't have to do
any of the heavy lifting yourself. So,
in today's video, we're going to first
of all select the base model that we're
going to uh train. Then we're going to
train it and then we're going to
evaluate it to make sure that it
actually um worked the fine-tuning and
we're going to be using it in a very
quick application to classify customer
service tickets and summarize them. And
we're going to do all of that for less
than $1. So let's take a look at it.
All right. So let's suppose you have an
application and your application is a
customer support uh ticketing service
and your users are going to be able to
send message to your application uh
alongside some contact info. So all of
this is going to be the input uh that's
going to go into your API and this is
going to be sent into a classifier and
the classifier is going to assign a
classification to the message of your
user. So for example, if the user sent
something like uh I would like to get a
refund or I would like to get my money
back, then the classifier would classify
it as a refund. And the classifier is
not just a simple classifier. uh
otherwise you could use a much simpler
model not a large language model but it
will actually output a complete JSON
with both the intent the confidence and
also a short summary or a short reason
why the classifier assigned that
classification to a ticket. Okay. And
after that once you have the whole thing
you're going to be able to store the
whole thing in your database. So that's
what we're going to be doing. All right.
Okay. So, the first thing that we're
going to want to do is we're going to
want to select a model that we're going
to fine-tune for our particular use
case. And in this case, I'm going to be
using Gwen 30.6b.
It is a very small model, but that is
very convenient because that's going to
also make it very affordable to
fine-tune. And we're going to be
fine-tuning it on this data set that I
have right here. It is the Biteex
customer support LLM chatbot training
data set. And it is a huge data set with
a lot of instructions right here which
are essentially just the questions from
the user or a customer. And then you
have the category of the question. And
you also have the intent that the
customer had. So for example here if the
customer said something like I need help
cancelling purchase blah blah blah you
will have right here that the intent is
to cancel the order. And you also have
the response from the LLM. Now, we're
going to be using this specific data set
to teach our very small language model
right here to give us the intent for
every single ticket that we're going to
be sending to it. So that we're going to
be able to run the entire model within
our server and not have to actually
employ a one trillion parameter model
just to classify a very quick ticket.
Okay, so that's what we're going to be
doing. And in this case, I already have
the data set loaded right here in
hugging face. But in your case, you
might be fine-tuning uh your model for
your specific use case. You may have,
for example, some feedback from your
users in your chatbot where the user
gave you a thumbs up whenever they liked
the question, sorry, an answer and a
thumbs down whenever they didn't like
it. That is super valuable data that you
can use to fine-tune your model further.
and you will be able to use this method
I'm going to show you to do exactly
that. Now, if your data is in hogface,
you also have access to the data studio
right here, which allows you to of
course explore the entire data set. You
have a very nice SQL console right here
to actually query it, but you also have
very nicely this agent that allows you
to basically chat with your database. So
here it is powered by GPT OSS120B
and uh here I for example I can ask it
which are the unique values of the
intent column in this data set and I can
just send it over and it will query the
database for me and give me the exact
values right here. So that is what you
can expect if you use the data studio
from hugging face with your data set.
And once you have selected your model
and the data set that you're going to be
using, it is time to actually start
training. But before that, let me show
you what the model actually looks like
before fine-tuning so that you can
actually see the difference.
All right. So what we're going to be
doing now is we're going to be testing
the model before actually fine-tuning
fine-tuning it. So, uh, the first thing
that you're going to want to do, of
course, is you're going to want to
initialize your virtual environment
using UV. Uh, in my case, I pretty much
always use UV and going to be installing
this dependencies right here. [snorts]
Um, here, this very straightforward cell
just basically just displays the
hardware that you're currently using
just to make sure that you're actually
using the right one. And you're going to
also authenticate with hugging face
because we're going to be of course uh
pulling the models that we're going to
be using from hugging face. So you're
going to want to have your HF token uh
right here or if you're already
authenticated using the HF CLI that is
more than enough. Um after that here I
have just copy pasted some uh very quick
configuration and parameters for my
model. So here I have the model that I
am using. Here I have the model ID of
the final model that I'm going to be uh
fine-tuning. And here I have my data set
name. And we have the text column and
the label column. So the text column is
of course the instruction that's going
to be kind of the message for my
customer. And here I have the label
column, which is the target column. Um,
and I'm going to be working with an evil
size of 60 out of 4,000 pool. And my
seed is of course the answer to
everything.
And actually what's going to happen is
that we're going to be sending this
little prompt that I have right here to
codeex or to cloud code or whichever
model you're using and it is going to do
the entire fine-tuning job for you. It's
it's crazy. It's so beautiful. So I'm
going to say fine-tune Quen 3 um 0.6B
into a customer support ticket router
using by text and then the name of my
data set. And then the task definition
is going to be that the input column is
the instruction. The target label column
is the intent. I want to keep only the
top 12 intents by frequency in the first
5,000 train rows. And the format of the
training sample in the chat style is the
user. And then the assistant message
right here is going to be the intent,
the confidence, and the reason. And all
of it in a JSON output. Now the training
strategy is going to be SFT. the max
sequence length 512. And in my case, I
have already told it which hardware I
wanted to use. But if you do not know
which hardware you want to use, you can
just ask it to suggest the best hardware
for you and to calculate the cost that
that is going to uh to give you. And of
course, codeex or cloud code is going to
calculate the cost for you for the
entire fine-tuning job so that you know
exactly how much it's going to cost you.
And then you I have also told it to save
it to this uh particular uh model ID.
And after training we're going to also
have it run evils and held out slice and
report on the accuracy the value JSON
rate the schema pass rate and the
accuracy on schema. So that's what we're
going to do. So how does the model look
like? What does the model look like
before this actual job? Let me show you.
It sounds very funny cuz um I mean here
I have just my helper functions. Feel
free to check them out in the notebook.
But here I have loaded the model using
transformers. Transformers in case
you're not familiar with it is a
wonderful library that allows you to
just run any model from hugging face in
your machine. Crazy. The team here is
also made out of geniuses. [snorts] Um
and what's going to happen is that we're
going to evaluate this model right here.
We're going to be taking out a few rows
from my evil pool, 60 rows as we I think
that's what we said before. And we're
going to be checking if the model
actually outputs the correct uh label.
And as you can see, it is of course
since it has not been fine-tuned, it is
terrible. So the accuracy is 0.2, the
value JSON rate is 0.28, schema pass
rate 0.28. It's it's just terrible
terrible stats right here. So, of
course, that makes sense because the
model has not been fine-tuned. And let
me show you now how to fine-tune it and
then we will see how this actually
changes by a lot after we have done the
finetuning. So, uh let's go into codeex
and set it up to actually uh have this
work because you're going to have to do
a couple of things before just sending
the prompt.
Okay. So, in order to actually use the
hugging face model trainer skill, you're
going to have to have a few things
first. Uh, the first thing is that
you're going to need to have a hugging
face pro account. You're also going to
have to have created a token in your
hugging face account that has right
access and that can also create jobs.
Let me show you how that works. You're
going to go right here and then you're
going to go into access tokens. You're
going to create a new token and you're
going to give it right access to
contents and then you're also going to
give it access to start and manage jobs
on your behalf. Okay? Because we're
going to be training or fine-tuning our
model using a job. Um [snorts] after
that you're also of course going to need
codeex or cloud code or any AI coding
agent that you want. And also, you're
going to be needing the HuggingFace MCP
server because that is the one that
we're going to be using to actually
trigger the jobs. And in order to do
that, all you're going to have to do is
go right here to settings. You go down
here to MCP.
And here are the instructions on how to
install it on any agent that you're
currently using. In my case, I am using
Codeex. So, I would just have to use to
run this right here in my command line
and then I would be ready to go. And of
course after that you're also going to
have to uh install the hugging face
skill. And the easiest way to install
skills in case you're not familiar with
it is using skills.sh.
So uh what we're going to do is we're
going to open just a very quick terminal
right here. And what we're going to do
is we're going to go right here and
we're going to do npx skills add. So npx
skills add. And we're going to add this
scale right here. So a good thing to do
is just to copy the hugging face and
skills. So the name of the user and the
name of the repo. You hit enter and here
you will see that it prompts you to
select which skills you want. And in
this case you just hit tab on hugging
face model trainer. You hit enter. You
select the agents that you want to
install it for. So in my case I want it
for cloud codeex and apparently also
Gemini. I'm just going to leave it like
that. And here you select whether you
want it for the project or for global
installation. So available for all of
your uh codecs or cloud code sessions.
Uh in my case I'm just going to stick to
project. I'm actually not going to hit
enter because I already have it
installed. In case you're not familiar
with how skills work and how skills
work, I have another video right here
where I explain exactly everything you
need to know about skills. And once that
is done, you're going to be able to have
your uh scale right here. So if I do
slashsklls,
I'm going to be able to see hugging face
model trainer right here, which is my
skill right here. Hugging face model
trainer. Okay. And but before you
actually start using the skill, we also
going to have to uh authenticate with
hugging face. So you're going to have to
install the hugging face CLI. And
actually you can basically just Google
HugenFace CLI. Go to the first resolver
here. And here you will have the
instructions of how to install it. And
once you have it installed, you can go
back right here to to the command line
and you're going to do HF off. And if
you have already authenticated, you can
do list and it will you will show you
exactly the tokens that it has available
and the one that is active. So in my
case, I want this one to be the active
one because this is the one that is uh
has the permissions to write uh my
repositories and also to initialize
jobs. And if you do not have that, all
you're going to have to do is hf login
and it is going to prompt you to
initialize. And if you already have your
token, you just have to do d- token and
just paste your token right here. And
that's going to initialize that session
with the specific token that you have
just created. Okay. And once that is
done, you're going to be able to just
run your agent and ask it to do what I
told you. So let's open actually codeex
and show you how to do that.
All right. So as I told you before, I am
going to be using codeex from openi in
order to run this. But feel free to use
any model that you want to use. Uh you
can of course use cloud code, you can
use gemini cli, you can use kimmy cli
etc. In my case, I'm currently using
Codex and I also like this nice little
uh user interface. So, what I'm going to
do, I'm just going to select the skill
which hugface model trainer. Remember to
have previously completed all the steps
that I mentioned in the previous part of
the video such as installing the skill,
installing your MCP server and
authenticating and also having a pro
account on hugging face. And then just
paste the prompt like this. And I'm just
going to give it full access. I'm not
going to be leaving it inside a sandbox
just to make sure that everything's
running correctly. And I'm just going to
send it. And I will be back as soon as
it is done.
And there we go. It completely finished
the job. It took a little bit over an
hour. And just for the record, in this
example, I sent a very detailed and very
straightforward uh prompt right here.
But you do not have to be that detailed,
especially if you do not really know
what you're doing. uh [snorts] just be
sure to always ask it what the final
cost is going to be before validating
the submission of the job. Uh in this
case since I declared and defined
exactly what I wanted it was very
straightforward so it just sent the job
but this uh skill also allows codeex or
cloud code to help you to define which
training method you're going to be
using. So in this case I already had
defined that I needed to do SFT. But for
example if your data set is preferences
from your users. So for example
questions uh answers that your users
found more useful than others and you
already have the data set. Uh Codex may
have suggested to you to use DPO for
example instead of SFT. And you do not
need to be an expert in any of this. Uh
Codex is here precisely to help you with
those blind spots. Um, and I also
decided uh beforehand which hardware I
wanted to use. But you can also ask
Codex which hardware it hardware it
recommends that you use for training.
And it is great for also estimating the
final cost of the entire training job so
that you can see how much it is going to
cost before you actually submit the job
to HuggingFace jobs. Okay. Um, so there
you go. Uh now that the job is
completely done, you can see right here
that it was reasoning about the whole
thing and that it uh figured out how to
use the data set to actually uh have it
fine-tune my model. And also actually uh
well it was tuning it, it gave me the
job monitor so that I could monitor it.
But just by the way, it also gives you a
very nice track to monitor the training
as well. And uh there you go. That's the
whole thing. Now, you also have an evil
that was run right here because that
what we requested, although we're going
to be evaluating by hand as well in the
notebook that I showed you before. But,
uh, here you see that the accuracy is
already way higher than what we had
before. We had 100% valid JSON rate and
100% schema pass rate. So, uh, this
model seems to be much more useful than
the one we had before. Uh let's actually
try it out in the notebook.
All right. And before we go to the next
part of the video, I just wanted to make
sure that you see this right here. So,
as you can see, this is the entire cost
of the full fun tuning job that we did
just now. As you can see, it is less
than $1. So, the total wall clock was
about 55 minutes. So, the cost is about
36 to 37 cents at 40 cents an hour,
which is crazy. I now have a completely
fine-tuned model that I can load into my
own server that I can load to my own
fast API application and now I can run
it from there without having to make an
API call to OpenAI or Enthropic anytime
that I want to make a uh classification
of my tickets. So this is crazy and all
of it for just $1. Okay. Uh let's
actually take a look at the results in
our notebook.
And there you go. As you can see right
here, I have the evaluation after the
model was fine-tuned. And as you can
see, I am loading both the base model
and my Laura. And right here, I am just
running the exact same evaluation method
that I declared before. And let's
actually see the results. As you can
see, still running on a pool of 60 rows.
We have an accuracy of 85, which is a
little bit lower than what my job at
Hogenface uh gave me, but it's still
ridiculously higher than what we had
before. Uh valid JSON rate of uh 98% and
schema pass rate of 88%, which is just
crazy high compared to what we had
before. Uh let me just show you the
delta and the comparison. As you can
see, before we had an accuracy of 20%,
now we have it at 85%. the valley JSON
rate was at 28% now it's at 98% etc. So
here are some nice uh I candy so that
you see what the results actually are of
fine-tuning your model and as you can
see I didn't even know how to perform um
DPO or SFT or anything. It did the whole
thing by itself because I basically just
asked um Codeex to fine-tune it for me.
And as you can see, I have a model that
works much better than the base model.
It is just much more powerful for my
specific use case. And as you can see,
we have that the score went from before,
which was 20% right here in accuracy to
over 80% and the valid JSON rate also
increased. And here are the deltas. So
we have a positive delta of 60% in
accuracy, a positive delta of almost 70%
in valid JSON rate, 60% in schema pass
rate and accuracy in schema. So just
just crazy good. And um there you go.
And here I actually just added a very
quick playground so that you can try it
again and see how um how the model
before and after uh behaves. So here I
have a just a very quick demo ticket.
Hi, I placed an order this morning but
selected the wrong shoe size. Can you
update the order to size 42 please
before it ships? And of course the demo
uh the expected intent is going to be
change order. And we're going to run it
first of all with the base model before
the finetuning and afterwards with the
actually fine-tuned model. And this is
just to show you the actual prompt that
is going to be sent. And as you can see,
the result is very funny. So before the
model was fine-tuned, it returned some
just weird thinking loop. It was uh yes,
I can do that. Please make sure to
update the order to size 42. The
customer is asking blah blah blah. And
it just went into an infinite loop for
some reason. Um and after the
fine-tuning, this is my answer, which is
just much much better. And of course,
exactly what we expected. So before
finetuning we have basically nothing and
uh after fine-tuning we have that the
intent was change order the schema is
okay the confidence is 99%.
And um there you go. So I hope that this
was a nice video. I know that
fine-tuning can seem a little daunting
at first, but I hope that this skill is
uh help will help you to get over that
fear and to learn how to fine-tune your
models uh by asking codeex or cloud code
any questions you have and they will
definitely help you solve them. And also
super importantly, huge shout out to
both Ben and Sean who are the creators
of this skill. I am certain that it is
going to help a lot of people get into
fine-tuning and to actually start using
open source models in their realworld
applications. As you can see, we already
have a completely fine-tuned model that
you can just run with transformers,
mount it into a fast API application and
start running it in your own server. So
there you go. Thank you very much for
watching. It has been an absolute
pleasure and let me know if you have any
questions in the comments and I will see
you next time.
