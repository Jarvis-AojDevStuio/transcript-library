---
video_id: "7kdDLp-SOsU"
title: "MedGemma 1.5: Google's Open-Source Medical AI with 3D Imaging (Tutorial)"
channel: "Alejandro AO"
topic: "ai-llms"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=7kdDLp-SOsU"
word_count: 1903
---
So, Google just released Medjma 1.5,
their new state-of-the-art model for
medical tasks, and it's also a very
small modeling with 4 billion
parameters, as we're going to see in a
moment. In today's video, we're going to
be taking a look at what is Medima 1.5,
why it is important, and we're also
going to have a very nice hands-on
tutorial right here with a very cool
notebook that you can also find in the
description where we're going to compare
it to some other models. And we're also
going to be using it to interpret chest
X-rays and CT scans and also to extract
medical information from medical
documents. So, let's get right into it.
Okay, so what is Magma 1.5? It is an
open-source multimodel medical model
from Google and it comes in two sizes.
It comes in a 4 billion parameter size
and also in a 27 billion parameter size
and it is completely free to use for
both research and commercial use which
is very useful and it was of course
released only last week on January 13th.
Now, if you want to take a look at the
actual model, feel free to go to hugging
face right here and you will find the
Medma release collection right here,
which is the one in which you will find
all of the Medjema models. As you can
see right here, you have the latest
model, which is the Medimma 1.5 on 4
billion parameters, and you also have
this other models, which are the 27
Villion parameters and the 4 billion
parameters for version one. However, the
one on which we're going to be focusing
on today is this one right here, which
is of course the latest version of the
model. And of course, 4 billions
parameters is insane because this means
that this model is capable of running on
pretty much any consumer hardware that
you can think of. So, let's take a look
at what is actually new about this
model. The version one was already
pretty good at image interpretation and
data extraction. However, something new
about the version 1.5 is that it is also
very good at interpretation of 3D and
volutric images which was previously
only possible on proprietary models. And
as we will see in just a moment in the
benchmarks, it ranks very very closely
to state-of-the-art over trillion
parameter models and all of this of
course running locally. So this is
incredible. Let's actually take a look
at the benchmarks and start coding with
it. Okay, so the first thing to do is
we're going to be running this in a
Collab notebook. Of course, feel free to
run this locally if you prefer. Uh in my
case, I'm going to be running it on
Collab. And in order to actually benefit
from a GPU, I'm going to go right here,
change runtime type. And remember to
select T4 GPU to actually have the
faster completions from this model. Once
you have done that, then you can
actually start continue with this uh
notebook right here. So the first thing
to see right here are the benchmarks. So
on the on the left side we have the
benchmark for text task performance and
it is measuring two benchmarks, the
METQA and the EHRQA which are basically
just questions like the ones that you
would find in a medical school exam. So
questions like this one. So a 71year-old
black woman comes to physician blah blah
blah and then the model has to give the
correct answers and and what has
happened is that we have validated this
model against this benchmark and the
results are that the new version of the
model which is medmaima 1.5 shows some
significant increase and improvement
compared to the previous version of meta
which was metimma 1 and right here on
the side we have the medical imaging
performance which is huge the
improvement. It is crazy. As you can
see, we have the Met Gemma 1.5 in dark
blue and the previous version in light
blue right here. As you can see, it is
just much better at image interpretation
and classification. Also something to
keep in mind is that of course in this
benchmarks usually you would have in the
highest ranks the state-of-the-art
proprietary models or open source models
as well but mostly over a trillion
parameter models which are of course
models that you would have to run in the
cloud which means that the your medical
data would have to go to the cloud of
this providers in the case of this model
right here and you have a 4 billion
parameter model that runs locally with
all your data in your computer. Now,
let's take a look at the actual
installation and how to run this model.
Okay, so let's actually go into the demo
right here. So, as you can see, we're
going to be installing the dependencies
that we need. We're going to be using
transformers to run this model. And then
after that, we're going to be prompted
to get our hugenface token. In case
you're not familiar with how to get it,
remember that all you have to do is go
right here to your hugging face account,
go to access tokens, create a new token,
and give it access to all the contents
of public and gated repos that you can
access. Get the token and then just
paste it when you're prompted to get it
from here. Once that is done, we're
going to be using the pipeline functions
to actually run this model. And remember
that we're going to be loading this
model locally. In this case, remember
that I'm running this on a T4 GPU. And
just remember that you're going to need
about 8 GB to run this model. And the
first download may take a few minutes.
So, just keep that in mind. And let's
actually start running the whole thing.
In order to actually showcase the
project and this model, I have two
different images that you can test in
this notebook. Feel free to test this
with both images. But here, the first
image is a rather healthy X-ray. And the
second image, which is the one that I
have right here, is a way less healthy
X-ray. And this is the one that I'm
going to be using. And as you can see
also, the quality is a little bit lower.
So, this is going to allow us to also
test for lower quality images. Uh, but
feel free to test with both of these.
And of course, if you want a more
complete data set of X-rays of lungs,
you can also find it right here on the
NIH chest X-rays. Okay? And this is a
very famous data set with over 100,000
chest X-ray images from more than 30,000
unique page patients. So there you go.
Uh so let's continue with this. We're
going to be using this one right here as
we as we mentioned before. And the first
task for this model is to just generate
a general description of the image. So
we're going to be sending the image just
like regular image right here. And the
text is going to be describe this chest
X-ray. What do you see? Now remember
this is a 4 billion parameter and it's
all running locally right here. And as
you can see we have a noticeable opacity
or increased density in the right lung.
This could indicate a consolidation like
pneumonia, fluid collection or another
abnormality. The left lung appears
relatively clear. The heart size appears
normal etc. So as you can see it's I
mean for a general description it's
already pretty informative.
And the task two is going to be disease
classification. This one right here is
going to be a little bit more targeted.
So we're going to be asking it are there
any signs of pneumonia cardomegaly or
plural eusion in this x-ray provide a
detailed analysis and of course we're
going to be sending the image as well.
So let's take a look at it. And there we
go. So we have the result based on the
chest X-ray images. Here is a detailed
analysis. We see a presence of
pneumonia. There are some patchy
opacities in the right lung particularly
in the right lower lobe. This could
suggest pneumonia. However, it's
difficult to definitely diagnose
pneumonia from the single image jar jar.
As you can see, I mean for a 4 billion
parameters that is running locally, this
is all this is amazing. And you can of
course run this in your machine and no
data would go to your inference
providers. Let's go to the third task
right here, which is anatomical
localization. So, identify anatomical
structures and their locations. And
we're going to be using the same image
again. So identify and describe the
location of the heart, lungs, and any
abnormalities in this X-ray. So let's
take a look at that. And there we go. We
see that the heart is located in the
center of the chest, slightly to the
left. It appears to be of normal size.
The lungs occupy the majority of the
chest cavity. There appears to be some
increased opacity in the right lung. As
we mentioned before, we have the
abnormalities, which is of course the
right lung opacity. The most notable
abnormality is the opacity. This could
be due to several factors including
pneumonia, pul pulmonary edema, plural
eusion and other pathologies. And of
course something to keep in mind about
this whole thing is that even though
this model is very good and it runs
locally, it is still very important to
have a professional interpret the
results from these classifications as
well. So just to summarize, the model
capabilities are that Medimma 1.5 is
very good at medical image
classification. As we saw already, we
haven't tested it, but I suggest that
you try it out. Uh 3D volutric images,
is unique to this version, and it works
great. We also have it is also great at
anatomical structure identification,
medical QA, and knowledge retrieval. It
is great also for document understanding
and data extraction. So, for example, if
you have some medical documents and you
want to extract some specific data from
them, this is probably the model that
you want. And of course on the
performance highlights, we see a much
better model than the previous version.
And the fine-tuned version has an 80%
accuracy compared to a 70% on GPT4,
which is crazy because GPT4 is an almost
two trillion parameter model. So that
for a 4 billion parameter model that is
running locally with all your data
completely private is a huge thing. And
thank you very much for watching. I'll
see you next time.
