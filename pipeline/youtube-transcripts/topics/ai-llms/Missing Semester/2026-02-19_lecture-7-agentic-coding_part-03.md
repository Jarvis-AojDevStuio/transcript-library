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
word_count: 3437
chunk: 3
total_chunks: 3
parent_video_id: "sTdz6PZoAnw"
---
Like say you're working on a particular project and you have a particular way you want the agent to do code review for pull requests people send to your project.
Because like,
oh here are project guidelines and oh your review should focus on code quality and it should also focus on correctness,
but don't worry about security because security is less relevant in this project.
You might...
find yourself frequently giving this prompt as an input to your language model or to your coding agent.
And so usually these things have some functionality where you can just save a whole prompt,
just like a bunch of text,
and invoke it more easily later so you don't have to have a text file somewhere where you copy-paste from it into the coding agent.
Another feature that I think is really useful is parallel agents.
In some coding agent harnesses,
this is actually a built-in feature.
In other cases,
this is just a workflow that you can follow.
But as we've seen,
even in the examples we've gone through today,
even fairly simple things,
these models can take a couple of minutes to think and work.
If you give them much more advanced features to work on,
I've seen situations where the model goes off and works on a code base for 20 minutes,
30 minutes.
You don't want to just sit there and stare at it while it's doing that.
What you can do is actually just boot up multiple copies of agents.
Like you might have.
a bug you want to fix,
and also a feature you want to write,
and also another feature you want to write.
And you can do all of these in parallel.
So even in this lecture,
I actually had different agents running.
In this case,
it was on different repositories.
I had one Claude working on making the course website retro,
while I had another Claude working on fixing a bug in my code base.
But one particular tool that's really useful when you want to have multiple agents running on the same code base is something called git worktrees.
So if you just boot up multiple Claudes,
for example,
on the same directory,
and they're editing files,
they're going to conflict with each other,
right?
So what's really handy is you have completely isolated copies of your code base.
And if you're working in a Git repo,
Git Worktree is a really useful tool for doing that.
So
Git Worktree lets you create separate checkouts.
So I'm just gonna like
Git Worktree.
I'm not gonna explain this whole command in detail to you can do Git help Worktree to see the details.
What this command does is it creates this new directory for me and also a new branch at the same place where I currently am here.
And so now I can boot up one Claude in here and go here.
And here's an entire other copy of my repository.
And I can boot up another Claude there and I can give them different tasks to do.
I can commit these things to their separate branches and I can merge them all together later when I'm done.
So parallel agents and git worktrees go really well together.
There's this other thing I think someone earlier was asking about,
like is there standardized protocol to connect together agent harnesses and
LLMs? Kind of related to that,
there's a standardized protocol called Model Context Protocol,
which is for connecting agent harnesses with tools.
So there are various open source things and also some like hosted things,
where you can,
for example,
connect your coding agent to Notion.
So then you can just talk to Claude and be like,
oh,
here's a URL for a Notion doc.
Like,
fill it in,
like,
read the stuff in there,
like,
improve the implementation plan I've written in there,
and then,
like,
implement the feature in my code base.
So you can read and write to Notion,
for example,
with the Notion MCP connector.
So this is just a way to connect your coding agent harness to other tools.
And then there are a bunch of features.
in coding agents that are related to context management.
So recall that we mentioned that the underlying AI models have a limited context window.
Generally,
the models have some fixed window.
It might be like,
oh,
this model only supports inputs up to 100,000 tokens or something like that.
And then in practice,
if you give a ton of input to a model,
even if it's technically within the context window,
it's just a harder task for the model to deal with all of that input.
So you get these things like having a polluted or like...
a polluted context.
And so if you can effectively manage what you're giving as input to the underlying AI model,
it'll generally perform better.
And so some things that these agent harnesses support is basics like clearing the context window.
Normally when we chat,
we're just appending more and more messages to our message history.
And with coding agents,
we also have all our tool calls and the resulting outputs from those tool calls as getting appended to our message history,
or also known as context.
And so if we're working on one task in our coding agent,
and then we want to do something else that's unrelated to what we were doing before,
you can actually kill the agent and start it again.
Or they generally have a command just clear the context window.
So you're starting fresh.
Another handy thing that these things can generally do is rewind the conversation.
So say you were chatting with the agent,
and then you asked it to do something,
and you changed your mind.
One way you could handle that is by interrupting the agent and just giving it a follow-up instruction.
But then all the stuff it's done so far since your last message is in the context window now,
and it's confusing and not very useful to have it there.
And so instead,
these agent harnesses generally have a command you can use to basically pop messages off the end of the message history and just go back in time.
So it's like,
pretend the stuff never happened,
delete it from the context.
And again,
that'll help you keep a smaller context window to keep your LLM more focused.
Any questions about these?
Another feature related to context management that these things support is compaction.
So how do you do things like support unlimited length conversations if your underlying AI model has a fixed context window?
Generally,
the way that works both in conversational chat tools like ChatGPT and in coding agent harnesses like Claude Code is that once your conversation history grows really long,
the agent will either automatically or on demand
compress the stuff in the prefix of the history,
and that'll shrink the context window.
And so I could even,
if some of these sessions open,
in Claude Code,
for example,
I can call the slash compact command.
And that actually just uses an LLM to take my message history and summarize it into a smaller message history.
And that replaces the prefix of my context with the summary.
And that lets me keep conversing with my agent.
Generally,
these tools will do this automatically,
but if you found that you've been talking with the agent for a while and the context is getting too long for it to perform effectively,
you can call this manually.
And so we can see here,
for example,
this will actually show us what this compacted context is.
And we're not going to look at this in detail right now,
but I recommend you try running a coding agent,
have a little bit of back and forth,
have it call some tools,
and then compact the history and just look at what the LLM summary looks like.
The next thing kind of related to context management is something called LLMs.txt.
So the underlying AI models used in coding agents are fixed or frozen in time,
and they get updated from time to time.
But at any given moment,
the model is frozen and it's trained on some data that existed at the time the model was trained,
but it's not necessarily up to date on everything that's happened since.
So generally,
language models have something called a knowledge cutoff.
And then if you ask your coding agent,
for example,
to implement a feature using a library that came out yesterday,
the model will know nothing about that library.
And so how do you handle that?
And so the way you handle that is that at inference time,
you give to the model in the model context information about the library.
And so there's a...
These language models can generally fetch code from the internet.
And so
I don't have a library in mind at the moment,
but I can be like,
fetch missing.csail.mit.edu and give me a summary of the class schedule.
So you could be like,
here's a URL for a library I want to use,
read the library documentation,
and then write some code that does xyz.
And it'll fetch the website.
among the set of tools that this coding agent has as a web fetch tool,
and it will get that into its context window,
and now it can do things based on that information.
And so where llms.txt comes in is that llms.txt is a proposed standard for formatting information for LLMs.
Normally when these coding agents fetch things from a website,
and this can be set up in a number of ways,
but if you were to say fetch the raw HTML and give all that to the agent and to the underlying LLM,
HTML is pretty verbose and there's a bunch of information there that's not that useful to the model.
In this case,
all the styling information or our analytics or things like that are not things that are relevant to what this model is trying to do.
And so LLMs.txt is a standard to have plain text files that are meant to be consumed by LLMs at inference time.
And a lot of libraries,
especially the more AI-related ones or the more forward-thinking ones,
will publish an LLMs.txt.
And so we can look at an example here.
Like here's the pydantic ai llms.txt,
and we see that this is way more usable than if the model were to fetch the contents of this page in HTML.
And in particular,
it's way more compact,
so you're using less of your context,
and the model's able to perform better.
There's another kind of standard-ish thing called agents.md.
And this is a file that you put in your Git repository or in your project where the setup is that whenever you boot up the coding agent,
it will read the entire contents of this file.
For Claude,
this is a claude.md file.
If you want to see an example,
we actually have one in the lecture notes or in the repository for this class.
Here's our agent.md file.
And so if you find yourself needing to give your coding agent instructions on how to do basic things in your repository,
like when you boot these things up without anything else in their context,
if the context starts out entirely empty,
it knows nothing about your repository,
right?
So if you have certain practices you follow,
or it's like,
oh,
run this command to run the type checker,
run this command to run the unit test,
and so on.
Instead of having to supply that information to the coding agent every time you boot it up,
This is,
you can.
This is kind of related to reusable prompts too,
but this is like every time you boot up your coding agent,
just dump this into the prefix of the context.
So these things are really useful for repositories you're working on for a long time with coding agents.
Another concept that these agent harnesses support related to context management is something called skills.
So things like agent.md came first and skills was almost a follow up to this.
So one thing people found was this really helpful to dump a whole bunch of information in here so that whenever you boot up your coding agent,
it knows everything it needs to about your project.
But there's also a downside here.
If you have a really big Agents.md,
you're filling up a large chunk of your context window for your underlying LLM before you're even getting started talking to it.
And so people found that in these Agent.md files,
there was information about a whole bunch of different topics,
but at any given time,
a coding agent might not need all that information in its context.
And so there's this neat trick to add one level of indirection.
So instead of supplying all the information upfront in Agents.md,
you can say like,
Here's an overview of the different things you can look at.
Like see this document for our development practices and like code quality standards.
See this document for like how to run the tests.
See this document for how you should write documentation and so on.
So you have that small amount of information supplied to the agent up front.
And then in basically a separate file that the agent can open up and look at and load into its context window on demand,
roughly as a tool call,
you have all the follow-up information on each of the topics.
And I think the final topic I want to talk about in terms of context management in coding agents is the concept of sub-agents.
And so it's like,
if you have one agent,
why don't you have more than one agent?
And why might you want something like that?
Well,
it's in part related to context management.
If you have a coding agent that's trying to do some task and it can identify a sub-task to do,
instead of doing that all kind of in line in the same coding agent,
if it can spawn up a different agent.
and give it as a prompt just like the subtask you want it to do,
then it can go do its thing,
finish,
and then return control back to the parent agent.
And then the parent agent's context is not polluted with all the details of what the subagent did.
That might sound a little bit abstract,
but these things are...
You can write your own subagents for these coding agents,
and they're also used in implementing components of these agents sometimes.
So,
for example,
some coding agents implement the WebFetch tool.
actually as a sub-agent.
So when the parent agent wants to fetch contents of a web page,
and as we mentioned earlier,
loading the entire HTML contents of a web page into the context window of a language model might not be the best idea because there's a lot of stuff there.
But instead,
if you can spin up another agent,
tell it,
fetch this website,
and summarize this aspect of it for me,
then it'll filter out just the relevant information.
And then that relevant information will be put into the context of the parent agent.
And that way you keep your context window smaller.
This also enables some nice things like these agents generally have support for parallel tool calls and parallel subagents.
So maybe there's several things you want to do in parallel.
Like maybe you've written a subagent that has a really great prompt for doing code review.
And maybe you've written another subagent that has a really great prompt for fixing issues related to type checking.
And maybe you work on a feature and then you spin off both of these subagents in parallel.
This is something that Claude Code,
for example,
can do.
And then they'll both do their thing at the same time.
And then when they're both done,
the parent agent can continue.
And so this can also speed you up.
So yeah,
I just talked through these things instead of giving demos of each of them.
I think in the lecture notes we have a couple more concrete examples of these things,
but at a high level we wanted to familiarize you with the concepts,
and then you can either go through this on your own or follow our exercises,
which will walk you through a bunch of these,
to really learn how to use these in practice.
So any questions about these more advanced features of coding agents?
Yeah,
so the question is when a language model starts in compaction,
is the general advice to let it do compaction or open up a new session?
I think this is one of the many things that's like,
it's a little bit more of an art than a science.
I think if you're continuing along the same thread,
like the LLM summarization that produces the compacted context is pretty decent.
So if you're still working on the same thing,
like just keep going.
If you're doing something unrelated,
like clear the context instead of just keeping a bunch of useless context around,
even if it's a summary.
Cool.
And then just as a final note before we wrap up,
just wanted to say these tools are really powerful,
but AI is not magic and AI tools can make mistakes.
They're,
I think,
hopefully to some degree demystified LLMs a little bit.
They're just these probabilistic models that,
given a bunch of input tokens,
give you the conditional probability on the things that come next.
That's all they are.
And there's a bunch of clever techniques that go into training a good pi theta there.
But yeah,
LLMs are not intelligent in the same way that humans are.
And so,
yeah,
make sure you review any output from your AI in terms of looking for correctness and security bugs.
Like,
at least in my personal usage,
I've had many situations where the AI generates some code that looks reasonable at first glance.
And it's just subtly wrong.
And it takes a lot of time to find the bug.
And sometimes verifying code can actually be harder than just writing the correct code yourself.
So for,
like,
really critical things,
oftentimes I will just do the thing myself instead of even trying to call an AI tool to do the task.
There are also many other things that can go wrong,
as I'm sure you'll experience if you start using these tools.
Like the AI can just like go off the rails,
go down rabbit holes.
It can like try to gaslight you.
Sometimes it'll like be wrong.
But if you try to tell it it's wrong,
it'll just like keep insisting that it's right.
And you can get really confused.
It can get stuck in debugging spirals.
So it'll be trying to fix code,
run the test.
It'll fix the code,
run the test,
and it's like fail every time.
It'll make your code worse and worse.
So you kind of do have to keep an eye on these things.
And so,
yeah,
a lot of potential downsides and things to be aware of.
And at a high level,
I think it's still valuable to have computer science and programming skills yourself.
We're far from the point where computer scientists are obsolete.
But at the same time,
these are really powerful tools and worth learning.
So that is all I have for you today on agentic coding.
And I highly recommend you go through some of the exercises on this topic to learn how to use these powerful tools in practice.
See you all tomorrow.
