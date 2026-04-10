---
video_id: "sTdz6PZoAnw"
title: "Lecture 7: Agentic Coding"
channel: "Missing Semester"
topic: "ai-llms"
published_date: "2026-02-19"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=sTdz6PZoAnw"
duration: 3634
word_count: 3971
chunk: 2
total_chunks: 3
parent_video_id: "sTdz6PZoAnw"
---
So you will call into the language model,
it'll output something like run this command,
and then you will run the command and continue.
Related to the non-determinism,
this language model is trained in a smart way,
but it's not intelligent in the same way that people are intelligent.
It will sometimes output things that are not quite right.
So it'll call commands that don't actually exist on your computer or use these file read-write tools.
to write incorrect code or things like that.
But in practice,
these things tend to work reasonably well.
And as you use them,
you'll build intuition for what they're good at and what they're not yet good enough to do.
Yeah.
So we already did.
Yeah.
So now that we've talked about how these things work,
We can go back and look at this example again and understand it from the lens of how things work under the hood.
So here I've booted up my agent harness.
In this particular case,
I'm using the Claude Code agent harness,
which is developed by Anthropic.
And under the hood,
it's using Anthropic's Opus 4.5 large language model.
I gave it the first query here.
So that's like the initial user query up in the top right.
The model here outputted some intermediate text.
and then decided to call a tool.
So this LLM called the read file tool with an argument dl.py.
That went to the agent harness.
It interpreted that language model output as like,
oh,
the language model is asking to call a tool.
It actually executed the file read operation on my file system,
produced that data which corresponds to the contents of the file,
and then fed that back in as additional input to the language model.
And so again,
think about the example in the top right.
This is adding more and more stuff into that X.
Like we kind of have this X that we start off with,
and we're appending more and more things to this conversation history up until the most recent message or data we're passing into the LM.
in this example.
So like the last thing sent to the LLM right here will be the contents of that file.
So then the model,
we run inference,
we sample from the model,
and now the model decides to output some more text.
It's giving me an update on what's going on.
And it also outputs a request to call another tool.
This time it's the file write tool.
And in this particular agent harness,
and I think is fairly commonly done.
the file write tool,
like there are a couple different interfaces,
and the model can actually supply a diff which is applied to the file.
So again the model emits a diff,
so it's just a chunk of text,
and then the agent harness,
in this case Claude Code,
will interpret that diff and apply it to the file on my file system.
So then it's done that,
it's outputted some more intermediate text.
Yeah there's this file update operation.
has a return value which is like it's like oh the operation was successful so that was given back to the model here we run another pass of inference the model decides to call another tool this time it's calling mypy so the type checker so then the agent harness interprets that runs the type checker produces the outputs uh from the tool so this time it's like success no issues found that gets passed back in to the model we run another pass of LLM inference and so on and there's like one more tool call here before it finally emits the like I am done with my my turn,
here's the final text output.
and control goes back to the user.
So like a whole bunch of LLM inference steps happening in here and a whole bunch of tool calls happening in here for a single user prompt,
right?
Cool,
and then just a brief note on privacy while we're talking about how these things work under the hood.
So as we talked about a little bit earlier,
these higher capacity language models,
which tend to be better at doing these complex tasks,
need pretty beefy.
hardware to run inference,
like to sample from that probability distribution.
And so these things run in the cloud for the most part.
And when you're using these things,
like unless you have some kind of special agreement with the provider,
you are sending them your data.
They may train on the data and things like that.
So if privacy is a concern,
look into the details of the terms and conditions or find some setup that works for you.
All right.
So let's spend the rest of this lecture talking a little bit about use cases.
And I think I'll try to spend...
Yeah,
question.
Yeah,
so the question is,
is Claude the LLM and the agent harness both?
The answer is there are a couple different setups.
In this case,
a component to the agent harness can be thought of as running in the Cloud along with the model,
which is definitely running in the Cloud here.
You can also find open source agent harnesses where the harness will run entirely locally,
but all the LLM inference steps will end up sending data to the Cloud for inference.
Yeah,
cool.
Okay,
so we've already given one example of how to use a coding agent.
to implement a new feature,
you can be pretty specific with how you give instructions to these things.
You can also be open-ended and iterate from there.
So for example,
I can go into the
Git repo for the class website,
the missing semester website,
and I'll boot up Claude and I can say something like,
make it look retro.
We can see what happens.
This will take a minute or two.
So we'll come back to this one.
Another great use case for coding agents is using them them to fix issues in your code.
So if you have a compiler issue,
like your code doesn't compile,
if you have a linter issue,
we'll cover linters in more detail on Friday,
but if you have a tool that checks for various types of errors in your code and it's complaining,
you can ask a coding agent to fix the issue for you.
And if you have unit tests,
or if you have a bug in your code,
one great way to at least take a first shot at solving that bug is to construct a test for the bug.
This is a great software engineering practice in general.
If there's something wrong with your code,
write a test.
So you can later use that as a regression test to make sure things don't go wrong in the future.
And then once you have a test,
you can tell the coding agent,
like,
hey,
this test is failing,
like figure out what the issue is and make the test pass.
And so as a quick demo of this,
it's a little bit hard to demo because like I want to work in a real code base and then you don't have context on the code base.
But I will,
so don't worry about all the details here,
but but we'll try to show you at a high level how things are working.
Okay.
So
I have a code base here,
don't worry about the details,
and I noticed an issue with the code.
And in this particular case,
I hand wrote a unit test for that issue.
And so if I run this test,
I'll see that the test fails.
You can also use the coding agent to try to take the initial crack at writing the test.
Like you could boot up the agent and say,
hey,
like when I use the code in this way,
like things go wrong,
can you write a test for it?
But then once you have a test that you're happy with,
you can boot up your coding agent.
and I'm going to copy paste this command.
You can boot up your coding agent and say something like,
there's a bug.
I wrote a test for it.
You can run it with this command to reproduce the issue,
fix the bug.
And then just like a human developer would do in this case,
like you'd first run the test to reproduce the bug.
And that's what the agent's doing.
So it's calling bash with this thing I gave it to run that particular test I just wrote.
And then it looks at...
the output and sees like,
yes,
this is indeed failing.
That output on its own is not super informative or it's like on its own,
not enough to fix the bug.
You need to actually read and understand the code.
So that's what the agent's doing next.
These things are actually pretty good at traversing code bases and like understanding code,
whatever understanding means for AI models.
So we can see like,
okay,
it's reading files.
It's here's another tool that it has.
It has a search tool,
which lets it search with a regex pattern for different things that match this pattern.
It's reading more files,
searching,
reading,
searching,
reading,
thinking.
And
I think in this particular case,
the bug is simple enough that it should just,
in one shot,
fix the bug.
Another thing that makes these coding agents a little bit hard to demo is that they're not the fastest things.
And this is something that a lot of people are working on.
Like,
how do you make agents that are really good and effective at what they do,
but also run faster?
Like here we're seeing,
oh,
it's been like one whole minute this thing is running.
But yeah,
it makes demos a little bit trickier.
can't fast forward this behavior because I wanted to do a live demo.
But okay,
now the model's saying,
oh,
here's what I think the bug is.
Here,
I'm going to fix it in this way.
And then it tries to,
on its own,
run the test again to see,
did I indeed fix the bug?
So we can approve that request to execute a tool.
And then we find,
oh,
the test passes now.
And then here,
the model's doing some other intelligent stuff.
Generally,
when you fix a bug in your code,
you want to make sure that the test you just wrote to catch that bug indeed passes.
But then,
you should run the rest of the test,
make sure you didn't break something else in the code base.
So then the agent's going and doing other useful things like that.
And then,
okay,
now the agent's done thinking and working,
it's made the changes to run the test,
and it's giving me a summary of what it did.
And I can even say something like commit the changes,
and it will create a git commit for me with some useful commit message and so on.
Yeah,
we can see these things are actually trained pretty well.
It's learned that it should not just make up a commit message.
You want to follow the style of the repository.
So it's actually looking at,
okay,
it's looking at git status to see what stage for commit and what's changed.
It's looking at a git diff to make sure what changes is the thing it did,
not some other changes that I'd made in the past.
And then it's looking at the git log,
like what do the recent commit messages look like,
so it can try to match the style.
And then it writes this commit message,
which actually looks pretty reasonable and says,
like,
oh,
this fixes this GitHub issue and so on.
question in the back.
Yeah,
so the question is,
does the prompt you gave the coding agent and the underlying LLM
affect the quality of the code,
how verbose the code is,
how long it takes to do the task,
and so on.
And the answer is absolutely,
yes.
It's a little bit more of an art than a science at this point to prompt LLMs well.
Also,
the underlying models are continually improving.
So it might have been the case that if you use a model from two years ago,
which nobody really uses now,
but if you use a really old model,
maybe you can still get it to complete a task like this,
but you have to be really descriptive in how to do it.
And now you can just be like,
there's a bug,
fix it,
and it'll figure things out.
But yeah,
I think there's a lot of resources.
I think we've linked some in the notes and we can link more.
A lot of resources on how to effectively prompt these tools to do various classes of tasks.
How do you get it to implement a sophisticated feature?
And there are various patterns people follow.
For silly things like this,
make my thing look retro,
all I said was make it look retro and it's going and doing the thing.
But for any of the complex,
serious feature,
you might have a really long prompt that's paragraphs and paragraphs long.
Or maybe you want to follow a software development practice closer to what people do in industry.
Maybe you want to put on your product designer hat and put on your product manager hat and write a whole PRD,
a product requirements doc,
and then you can give a huge markdown doc to a coding agent and be like,
hey,
here's a PRD.
Read it,
understand it,
make an implementation plan,
and then implement it.
So there are different advanced patterns you can follow like that to do more sophisticated things.
Yeah,
question.
[inaudible question]
Yeah,
so the question is,
if you start the coding agent in a directory,
does it see everything in that directory and subdirectories?
To first approximation,
yes.
Some of these agents also can request to see things outside of the directory.
There's a lot of,
the space is pretty new.
There are a lot of different tools out there.
And like some of these details vary between the tools.
But yeah,
basically,
yes,
you will want to operate at the level of a Git repository generally.
Cool.
So we saw this end-to-end example of...
fixing a bug given a failing test.
We can also just for fun see,
oh this is still thinking,
making our course website look retro.
All right.
Yeah,
let's not commit and push that change.
But yeah,
these things can actually be pretty useful for creative work too.
If you read the lecture notes for today,
in part just to like kind of dog food this technology,
we used Claude Code to work on a number of changes related to our course website.
We needed to do some refactoring when we pulled this lecture out from the previous development environment lecture into its own lecture.
And we just asked Claude Code to do that for us.
It did a decent job,
didn't get it perfect.
You can see the linked GitHub pull request to see what the agent did and what I had to do manually to fix things up afterwards.
It didn't carry over all the exercises and put them in quite the right place.
Some of them just disappeared and I had to restore them.
We also implemented things like...
Here,
let me get rid of these changes.
We also implemented things like our
Tufte-style sidenotes using Claude Code.
So yeah,
I think Jon didn't write a single line of that code himself.
It was all just like vibe coding with Claude Code.
And yeah,
so for this kind of creative work,
just telling the agent to do something with like some high level description and then just looking at the results and then giving it feedback to make tweaks can actually be super effective.
Like I know a lot of people who do front-end design and web design and things like that using these agents these days.
Cool.
So we're talking through use cases.
I think we have about 10 minutes left.
So I'm not going to demo every single use case that we have in our notes.
And also,
I'm sure you can come up with many more use cases beyond what we've written in our notes.
But I'll briefly talk through them.
And then I want to spend the last bit of the lecture on more advanced topics related to agents.
So some of the things that are very useful to do with coding agents include things like refactoring.
So as I mentioned,
we used Claude Code to actually refactor our lecture notes.
but you can also use these tools to refactor code.
These agents are really good at code review.
So if someone sends you a GitHub pull request,
or even if you just want to use it for yourself,
you can just ask the agent,
review this code.
Just that level of guidance is already pretty good to get useful feedback.
You can also give it more specific guidance to get a more tailored response.
So one thing I've used these tools for a lot,
and actually used them to catch some very subtle bugs,
is in situations where I've done performance optimization,
or other kind of refactoring where I wanted the code to be semantically equivalent before and after the change.
But yeah,
I was making like stylistic changes or performance improvements or things like that.
And the coding agent's actually pretty decent at reasoning about code and reasoning about deltas between code.
And it was able to point out like,
oh,
you made this change.
And like,
oh,
in this particular case,
the behavior is actually different.
And then I could go and fix that bug.
So really useful for code review.
These agents are great for codebase understanding too.
So I know like...
I know at least a decent chunk of the audience here is just getting into computer science.
You're probably working on smaller repositories right now.
But if you want to contribute to an open source project on GitHub or dive into a larger code base,
like say you're doing a UROP and you're working on your lab's code base,
these agents are really good at navigating code bases and understanding them and explaining them to you.
So you can even go into a fresh code base and just be like,
explain this code base to me.
Or if you're looking for particular things,
maybe you start a UROP and your UROP mentor says,
oh,
go work on this feature.
even to know what files to modify can take a lot of thought and understanding,
right?
But these coding agents are pretty good at helping you with that.
Another quick one I'll demo,
I'm tying this back to some of our earlier lectures.
So because these coding agents can call tools,
you can use them kind of sort of like a shell.
And so I actually use this these days because memorizing shell commands and all their flags and stuff like that can be challenging.
And instead,
you can just explain in natural language or coding agent.
how what you want it to do so like suppose I want to use a command to find all the Python files in this directory that have uh renaming imports I can say like use ag so this is a command line tool to find all Python files
that do renaming imports so this is like from something import something as something or just import something as something in Python it's just a particular pattern I'm looking for but like typing this out myself is way harder
like remembering that like ag has this --python flag or like how exactly to format regexes or things like that and so you just talk to your coding agent and have it behave like your shell.
And you can give it follow-ups like ignore the lib directory.
So this is searching for both code I wrote and code in this library directory.
So maybe I just want to search the code I wrote.
So you can give it a follow-up like that.
It'll generate the right shell command,
run it for you,
and even summarize the results for you.
So I think it's a pretty great use case.
Yeah,
question?
Yeah,
so the question is,
will you get in trouble for using these tools on school stuff?
please ask your instructor and see if it's okay to use these tools.
I think it just varies by class.
I've seen some classes that prohibit use of any AI coding tools.
So like no AI autocomplete,
no inline chat.
So not even the simpler features we talked about in that previous lecture.
And then obviously no coding agents.
And then I've seen other classes that are like,
yeah,
use whatever tools you want to use.
Yeah.
So please follow the rules.
Don't cheat on your your homework.
I also think some of these
companies,
I think like Anthropic and OpenAI and others,
have released special features or modes of their software for schoolwork.
So you can use them in a mode where they won't give you an answer,
but will act a little bit more like TAs.
Or if you just want to prioritize your own understanding,
you can ask the tool for a hint.
Even if it doesn't have a special mode for this,
you can be like,
there's a bug in the code,
don't tell me what the bug is,
but point me in the right direction.
And they kind of sort of work okay for that.
So yeah,
you can use them as a replacement TA.
Cool.
And then finally,
I think we're not going to talk about this in depth,
but you can use coding agents for what's called vibe coding.
So these things are pretty powerful tools and you can actually implement entire projects like start to finish without writing a single character of code yourself just by like chatting with your language model in English.
I think that make the site look retro is a small example of that.
Okay,
so any questions about those use cases of coding agents?
vibe coding.
Cool.
So now let's talk a little bit about more advanced functionality of these agents.
And I'm also going to tie back some of this to what we talked about earlier with how these things work under the hood.
So maybe I'll write these down on the blackboard.
A couple of features that most of these pieces of software have.
Starting from the simplest of the advanced features.
So one thing you might find yourself doing often is typing out the same command to these agents.
