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
word_count: 3998
chunk: 1
total_chunks: 3
parent_video_id: "sTdz6PZoAnw"
---
All right,
welcome to day seven of Missing Semester.
Today we're going to talk about agentic coding,
so continuing some of the topics on AI-powered development that we were covering in the Development Environment and Tools lecture last week.
So last time in that lecture we talked about some AI-assisted coding like autocomplete and inline chat.
Today we're going to be talking about something that I think is much more sophisticated and new,
a different form factor than what existed,
say,
five years ago.
which is coding agents.
And
I think right at the start of this lecture,
I'm going to show you a demo of how these things work,
and then we'll talk about how they work under the hood,
and then talk about basics,
and then more advanced topics.
So that's the plan for today.
So for the initial demo,
I'm going to actually continue with the example we were doing during the development environment and tools lecture.
So recall,
I'll actually bring up the code here on the screen.
So recall that we were working on this little script to...
Oh,
it's not what I wanted.
One second,
I need to do a little bit of setup.
Okay,
so recall that we were working on this script to download a page from the course website and extract all the links from it.
And this is where we're at.
So pretty simple little Python script.
And suppose we wanted to take this script we hacked together and turn it into a slightly nicer command line program.
Maybe we want to do things like add some argument parsing,
make this a page we want to fetch the contents from,
a command line argument,
things like that.
So we can ask a coding agent to just do this entire task for us end-to-end.
And so in today's lecture,
I'm going to use Claude Code,
which is one particular coding agent.
There are a bunch of other tools out there.
We have a recommended software section at the bottom of today's lecture notes.
And they're both command line coding agents,
which I at least personally prefer to use at this time.
There's also coding agents built into IDEs.
So if you're using something like VS Code or Cursor,
you can access roughly the same type of functionality within the IDE.
And so here I've started up Claude Code.
I just opened up a terminal in my directory where I have my code,
and I type.
Claude, and this brings up this command line interface to Claude Code.
And a coding agent is basically just a conversational AI model with access to some tools that will help it write code.
So if you've used something like ChatGPT before,
this is like roughly ChatGPT,
except the AI model can do things like read and write files and execute shell commands on your computer.
And then sometimes these models are specially tuned to be able to be particularly effective at writing software.
And so
I have this dl.py script in this directory,
and I can go ahead and just give natural language input to the coding agent and say something like,
turn the script I wrote...
here,
I typoed this on purpose,
I'll just leave it that way.
Turn the script I wrote,
dl.py,
into a proper command line program,
use argparse for argument parsing,
and maybe I wanted to make it nicer in some other ways like some things I'm missing here
Oh,
I guess I have type annotations here,
but I can say,
like,
make sure it has proper type annotations,
check that it works using mypy.
So I want to check the type annotations,
make sure it passes type checking.
So I can give it a command like this,
and then it starts thinking.
And then let me just explain its output.
So it gives some textual output,
like ChatGPT can say text back to you.
But then it can also invoke tools.
So this model decided to read the file dl.py.
That's a reasonable way to get started with this task.
And this is a pretty easy task.
So it just updates this dl.py and in one shot writes all the code.
So I can go in here and see what changes it's made.
As we can see,
it's written some more functions.
And now it has this main function that has the command line argument parsing and stuff.
So it's just done the entire task I asked it to do.
And it's continuing to follow my instructions.
So recall that I told it to make sure it has type annotations and that the type checker says that everything is good.
And so here it's trying to invoke the next command.
So it's using the shell and invoking mypy and giving it as an argument the path to the script.
And one thing we noticed here,
when it was editing files,
it didn't ask me for permissions.
It just went ahead and edited stuff.
That's because I have my coding agent configured in this way.
Because I find that if you need to,
if it's asking for permissions for every single little change it makes to files,
it's kind of annoying.
I want it to be able to operate more autonomously.
And generally,
I track everything in Git.
So I can let the coding agent make a whole bunch of changes and then review them at once later.
But for other tools that the coding agent wants to invoke,
like bash,
I want to make sure I'm actually checking every single command that it runs and making sure that it's safe.
We won't get into the details of agent security today,
but there are some security concerns if you let these things run fully autonomously.
And they might do things like invoke a command that you don't want it to invoke.
It might say delete a file that you care about or much more dangerous things than that.
At least I personally recommend that you run them in this mode where you have to approve individual tool calls that can do things like mutate your computer state.
So I've approved that tool call.
The agent harness ran the tool.
It gave the results back to the AI model.
The model said that everything looks good.
And then it's deciding to continue along and wants to run the script and make sure it seems to be working.
So it's doing some more things here.
And there we go.
It has completed the task I asked it to complete.
So that's what an AI...
Yeah,
question?
Yeah,
so the question is,
like,
this is using some hosted AI service in the background.
Can you limit how much money you're spending?
The answer is,
yeah,
yes,
you can.
It depends on the tool exactly what the configuration knobs are.
Generally,
you can select which AI model you want to use and then like higher capacity models,
which might be better at solving harder tasks,
will be more expensive.
And then smaller and faster models will be cheaper.
So that's one control you have.
And certain services actually slightly limit spend.
Like you can say,
I want to spend at most,
whatever,
$10 this month.
Yeah.
So the question is,
do I limit spending?
At least personally,
I don't.
I keep an eye on the usage.
So in Claude Code,
for example,
there's a slash cost command.
And this thing we've done so far has cost us about 19 cents.
So I'll keep an eye on this and make sure things are not getting too unreasonable.
I think if you're a student,
one decent way to get started might be go for one of the subscription plans that's $20 a month,
and then they have some amount of usage included with that.
And then if you're going above that amount of usage and think about how you're using AI.
I know that
In a lot of companies,
people are finding these tools are loved by engineers and increase productivity enough that compared to the cost of the engineer's time,
the tool cost is relatively low.
And so I know a lot of people who are spending a lot,
like several hundred dollars a month in AI usage,
but it's fine for their purposes.
Yeah,
question.
Yeah.
Coding agents cost money and they also require internet to first approximation,
yes.
You can also use coding agents that run locally and use models that run on your own laptop.
There are trade-offs there.
You have to use much lower capacity models unless you have...
You basically have to use much lower capacity models than the one I'm using in this demo,
for example.
And then they might work okay for simple tasks,
but for harder things,
they don't really work that well.
And
I think for practically today,
it makes sense to use one of the hosted models and pay for it.
Yeah,
the question is about subscription versus pay once.
I think they're all subscription because inference costs just depend on usage.
And then the pricing models vary and you can Google them and find it.
I think we don't want to spend too much time in this lecture talking about pricing.
We're going to talk about what are coding agents conceptually,
how to use them effectively,
and so on.
Cool.
So in this example,
I've shown you a very high level overview of it.
demonstration of using a coding agent,
show it how we can talk to the tool.
Here it did everything correctly.
So I just did this one shot thing.
I gave it an instruction.
It did a bunch of stuff,
including calling tools,
looking at the results,
calling more tools,
depending on what happened.
And eventually just coming back to me and saying,
okay,
I did the thing you asked for,
and the end.
You can also do multi-turn interactions with these things.
I can actually remove the type annotations,
and it will keep going.
It has the context from the rest of the previous conversation,
and I can send a follow-up messages like this.
And now this is a kind of silly thing.
It's kind of making our program worse.
But it did the thing.
More practically,
you would iterate on the thing you're working on.
If you were working on a feature where you didn't exactly know what the spec of the feature should be,
you might give it some rough description.
It does a thing.
Then you judge the results.
It's like,
oh,
actually,
I want you to tweak it in this way or that way.
And you can use these tools in this iterative manner.
Another thing you can do is if the coding agent goes wrong,
either if it does the wrong thing and gets confused,
or if you see it going off the rails and it's kind of thinking a lot or calling tools in a nonsensical way,
you can even interrupt it,
like with Control-C,
for example,
in this tool I'm using,
and then give it a follow-up message.
So if it was calling,
say,
the wrong tool,
like maybe I had mypy installed in some funny location and it couldn't find it,
I could just interrupt it and be like,
actually,
mypy is here.
Call it this way.
for example.
So any questions about that?
Yeah.
So the question is,
can you hard code things like don't touch this file or don't touch this part of the file?
In the particular tool I'm using,
I think you can't hard code not being able to touch a particular part of a file.
The way I would approach something like that practically,
I think it's just like keep track of everything in Git,
see what it changes.
like if it changes a thing you didn't want to change,
revert it.
You can also give it natural language instructions.
Like you can say,
remove all the type annotations except for in this function or like don't change this chunk of the code.
And it generally does a decent job of respecting those instructions.
Yeah.
So the question is,
do I have experience with test-driven development using the agent?
And the answer is yes.
I think we will get to that a little bit bit later in the lecture.
TLDR is a pretty good way to use these tools.
Either write the test yourself and then tell the agent to do the thing,
like implement the feature such that it passes the tests,
or you can even use the coding agent to help you write the test to begin with,
and then you can ask it to implement the feature that passes the tests.
These things work really well with feedback loops.
So if you can set them up so that it's like,
okay,
maybe you have some code that doesn't compile,
or some code that doesn't type check,
or something like that,
you can say,
here's the error,
here's what you can run to reproduce the error,
and keep working at it until you fix it.
And that works well with test-driven development as well.
Okay,
so we're going to talk a lot more about practically how to use these tools in different use cases and stuff.
But one topic I wanted to cover today was talking a little bit about how the underlying AI models and also how these agent harnesses work.
Now,
this is like a very deep area of research.
I'm obviously not going to cover this topic in its entirety in whatever.
the 10 minutes I'm planning on spending on it.
I could spend an entire semester going into in-depth on the topic,
but I think I'm going to try to cover it at just the right level of abstraction such that you learn the aspects of these tools you need in order to be able to use them effectively.
So I'm not going to teach you how to re-implement one of these things on your own,
but I will try to share a little bit about how they work so that you understand what they're good at and their limitations and why people have implemented certain features and agent harnesses and topics like that.
So
AI coding agents consist of roughly,
I'd break them down into two main parts.
There's an underlying language model,
and then wrapping that language model is an agent harness.
And so
I don't know how much background everybody has on language models.
Maybe raise your hand if you've used ChatGPT or any kind of AI language model before.
Okay,
great.
Okay,
so most of the hands went up.
Language models,
or sometimes called large language models,
can be thought of as modeling a probability distribution of completion strings.
Let's call those y.
Modeling completion strings as a function of prompt strings,
which we'll call x.
So completions,
completions y,
and prompts x.
So it's just this.
conditional generative model that will tell us,
given a particular input,
a sequence of strings,
what is the probability distribution over output strings that correspond to that sequence of inputs.
And then when we use these models,
and then so we can say like model this as a distribution,
I'll write it as pi theta,
this parameterized distribution of completions y given prompts x.
And then when we use these things,
we sample from this distribution,
You can sample strings y hat from this pi theta given inputs.
And that is it.
That's all an AI language model is.
And there's a lot of work that goes into finding a good probability distribution that does something useful.
But then in practice,
how you use them is you give them a bunch of text or strings or tokens as input.
And then they give you back a bunch of text as output.
And then everything else is built on top of that core primitive.
One other detail to note here is that in practice these things have a limited context window.
And basically that means that the length of this string and the length of the string have bounds.
All right,
so then building on top of this...
Like how does something like ChatGPT work?
Like how does conversational chat work?
I think you could probably imagine how you could use this for single turn chat.
Like you give it a question here and you get an answer here.
Like how would you do follow-up questions?
Any ideas?
If you wanted multi-turn chat.
So the way these things work is they use turn markers and you give your entire conversation history as the input to the model and it gives you the next thing,
the model's output.
as the output from the probability distribution.
So you might give it as an input something like the user says,
I don't know,
like can't write out long questions on the blackboard,
but like what is one plus one?
And then the assistant might say,
so in the first query,
when you sample from the probability distribution,
like this is your first X,
and then this thing is your first Y hat.
And then if you want to ask a follow-up question,
So I'm writing a dependent query here on purpose.
Like what if you replaced the ones with twos?
So this query on its own is not super meaningful.
You need the context to be able to answer this thing correctly.
And so the way a conversational chat app handles something like this is that it will sample Oh.
from the large language model again with this whole thing as being the prompt with some special encoding of these things as turn markers.
So the user said this,
the language model output was this,
now the user said this,
and that will generate the next thing.
So this will be your next output.
Okay,
so we've gone from this primitive of large language models,
which you can think of as a probability distribution to
how you use them for multi-turn chat.
And next we will talk about how you build something like an agent harness,
building on top of that idea.
So any questions about that so far?
Cool.
So one more idea you can add is,
like here we added turn markers.
Now we can add some special interpretation of the outputs from the LLM.
And we can say the model can output things like assistant and then some text.
But we can also have outputs that are like call a tool.
So we will train a language model such that it can output requests to do things on your machine.
So it might be...
So an example of this is something like the things we gave up here.
An example of a tool call might be a request to run,
I don't know,
like mypy,
dl.py.
And then we will have some code that wraps the language model,
kind of like in our conversational chat app,
we had this thing which would build our follow-up inputs by
concatenating together the entire message history,
we will have an agent harness,
also sometimes called scaffolding,
which will interpret these outputs.
So this is a y-hat from the LLM.
It'll interpret these outputs.
It will actually execute them on the machine and then feed them back into the language model as a subsequent input.
So it will do the thing.
And then maybe there's all this textual output from the mypy tool.
Like it says like checking dl.py,
blah,
blah.
Maybe it says like error line one,
expected int,
blah,
blah.
And you will take all this output and actually just stick it in as another input to the LLM.
So this forms a subsequent component of the X that you'll feed into the LLM.
Yeah,
question?
So the question is,
what exactly is the agent harness?
It does a number of things.
It will implement the aspect of the code,
which runs calls to the LLM in a loop,
takes the outputs.
If there are tool calls,
it will actually dispatch the tool call.
It will actually execute this thing on your machine.
It will get the text that this thing produces and feed it back to the language model and have it produce another output.
And so...
Yeah,
so those are the two main things it does.
So roughly,
agent harnesses will take in your user input,
then in a for loop,
call the agent.
If it requests a tool call,
it will execute the tool,
feed the input back into the language model,
have it generate another completion.
If it's another tool call,
it will execute the tool,
feed back the results to the language model and produce another completion and so on until the language model outputs textual output for the user,
at which point...
it will say like okay I'm done, control's back to the user and then you can proceed and so you'll have tool implementations like you might have in your coding agent tools like bash so you can have your agent execute
bash scripts you might have things like file edit like file read write and so on and together those combination of tools
lets the underlying AI model actually make changes to things on your machine and like develop code in some intelligent way.
Doing things like being able to run tests,
see what happens when you run the test,
and take that into account when deciding what actions to take in the future.
Oh,
is there a question in the back?
Okay.
So these are the main primitives.
Like there's a language model that's modeling a probability distribution over strings or tokens at the heart.
And then there's this.
agent harness that will call the LLM in a loop,
do repeated samplings,
and also dispatch requests to execute tools,
actually run them and feed the results back to the language model to drive things forward.
Usually when you type in a query,
it'll run a bunch of tools and kind of under the hood,
it's sampling from this language model many,
many times.
Yeah,
question?
Yeah,
so the question is,
is there a well-understood interface between the agent harness and the underlying language model so that you can have them interop?
And yes,
there are some commonly used interfaces.
It's not perfectly standardized and everybody's using the same thing,
but there's a good amount of interop these days.
So for example,
there are open source agent harnesses like OpenCode,
and then you can have them work with different underlying language models.
They can work with the Anthropic models and they can work with the OpenAI models and so on.
Yeah,
question.
Yeah,
so you're pointing out that the language model is this probabilistic thing and the agent harness is probably like the code you write in the harness itself is deterministic,
like how do these things relate?
So they relate through sampling.
When the agent harness calls to the LLM,
it's sampling an output string and then doing things based on that.
