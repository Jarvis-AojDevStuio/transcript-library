---
video_id: "qnVyY0zicF0"
title: "Stop Paying for AI Transcription Services"
channel: "Yvar Birx"
topic: "ai-llms"
published_date: "2026-02-15"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=qnVyY0zicF0"
duration: 211
word_count: 740
---
What's going on, guys? Uh, I've been
trying to get hired as a developer, and
since nobody wants to hire me as a
developer, I have made a decision that
if I can't be hired as a developer, no
one will be.
&gt;&gt; I'm just kidding, guys. Lately, I've
been seeing a lot of transcription
services pop up, though. You know, like
upload your podcast, auto captions,
meeting summaries. They're kind of just
like popping up, you know, like weeds.
And so I kind of kept thinking, how hard
can it be to make this stuff? I mean,
you got people paying like $10 a month
to use it. And so I'm just thinking, if
people are paying for this, but there's
so many services that it almost seems
like it's very easy to do, maybe people
shouldn't be paying at all. It it turns
out all you really need is a CPU. In
order to transcribe audio, all you
really have to do is use OpenAI's
Whisper. The technology has already been
developed and it's actually something
that's licensed under the MIT license.
So, what I've set up here is a folder
with uh audio and models. Now, under
models, there's nothing yet. And under
um under audio, I have set up a test
wave. And in this wave, it's me saying
the words, "Hello, this is a test. So,
all I have to do now is decide what
model to use. Now, I'm going to use I'm
going to use the GGML small model
because it's not too big and it's not
too small and the results are actually
very good. So, I'm going to download
this model uh into the models folder.
And once that's done, all I have to do
now is download the repository for
Whisper and build the program. We can do
this by simply cloning the repo. And
then we can go into the Whisper
directory and type make. And once
Whisper has been built, I can already
start using the CLI. I can do this by
calling the whisper CLI from the build
folder and then linking it to the models
that I have here and then the audio test
file. And you can see that the result of
it tells you that between zero and 2
seconds there is the text hello this is
a test and that's it. No API keys, no
subscriptions and no external services
getting your data. It just works. And so
why are we actually paying for these
services? Well, that's really it. We're
paying for the beautiful package that is
the interface that allows us to upload
the file and view the output of it. So
technically, I could just call this from
within ASP.NET
and start charging people on a monthly
basis. I mean, you can really just do it
any way you like. You can even do it in
Python, right? Like all of this stuff is
just a program running on your computer
and then you're selling it to other
people to run the program. So if you
wanted to make money today, there you
go. The real problem that this
highlights is that most AI startups are
actually just making SAS services around
open source models. They're not really
trying to do anything innovative or uh
interesting, but it does work. You do
get money for it. And so, you really
start to question whether you should be
doing the same instead of complaining
about it on the internet. But hey,
that's up to you to decide. Uh I
wouldn't go out there and pay for any of
these services. And when somebody comes
up to you and says, "Hey, uh, I would
like to help you integrate AI into your
workflows, uh, just know that they're
basically just doing asset flips, but
then with models." Here's to prove that
it actually works. I'm currently
generating live transcriptions for the
video you just watched. And I'm going to
use Chad GPT to summarize this to make a
video title, description, and a series
of tags. Obviously, I don't even need to
use ChatgPT for this. I can just host my
own model using LM Studio.
