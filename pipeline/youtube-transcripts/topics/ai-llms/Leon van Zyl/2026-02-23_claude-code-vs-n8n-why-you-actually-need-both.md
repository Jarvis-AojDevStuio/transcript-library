---
video_id: "CQeKmG1o85E"
title: "Claude Code vs n8n? Why You Actually Need BOTH!"
channel: "Leon van Zyl"
topic: "ai-llms"
published_date: "2026-02-23"
ingested_date: "2026-02-24"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=CQeKmG1o85E"
duration: 959
word_count: 3012
---
With all the hype around agentic coding
tools like claude code and cursor,
people are asking is inn still relevant?
Why would you drag and drop workflows
together if you can simply vibe code the
entire thing? As a professional software
engineer and educator here on YouTube, I
use cloth code every single day. And the
truth is N8N is still a valuable part of
my daily workflow. These two tools
together is an insane combination. And
in this video, I'll show you how I use
them side by side. From exposing NAN
workflows as MCP servers to receiving
notifications on my phone when Cloud
Code completes its work. If you're
building anything with Claw Code or N8N,
you definitely don't want to miss this.
N8N makes it really simple to rapidly
build out a prototype. Take this
workflow for example. This generates a
short video script. It then uses Sora 2
to generate the video and then then
automatically uploads the video to
YouTube. I created this workflow in less
than 5 minutes using N8N. This makes N8
the perfect platform for rapidly
prototyping an idea and once we've
proved that it works, we can easily move
this into a separate application and
there's different ways of doing that as
well which we'll explore in this video.
Right? So in N8 just created this video
using Sora 2 and the video was uploaded
to YouTube and we can see that video on
the YouTube channel as well complete
with a title and description and this
was all created within a few minutes.
Now, of course, we can simply run this
on a job which will automatically
generate a video and then upload it to
YouTube on a daily basis or we could
also build an application around this
workflow, something maybe with a UI and
user authentication, anything we want.
And there are many ways that we can use
cloud code to do exactly that. The one
technique is to simply download this
workflow. Then back in our cloud code
project, I'll just create a new folder
called docs. Then we'll add that N8N
workflow to docs. I'm just going to
rename this to N8N. And what we can do
then is simply pull in this workflow and
say, "Hey there." So we're starting off
with an N8 workflow. I actually want to
convert this workflow into a Nex.js
application. It correctly identified
that there are two triggers, one manual
and one it runs every day at 4 p.m.
There's also a script generator that
uses GPD5 to generate a humorous
8-second micro documentary script with
structured output and that will return
the script, the title and description.
We also have the video generation step
which uses OpenAI Sora 2 to create a
short in a vertical format from the
script and then it also uploads the
video to YouTube and of course our
project is currently empty. So C is
going to ask us a few questions like
what do we want to do? What kind of
NexJS app do we want a web UI where we
can trigger generations and see results
or a headless API backend that
replicates the automation pipeline? So
this is really where we can flesh out
our app idea with claude code. And after
answering these questions, claude code
will now convert our N8 to end workflow
into an actual application that we can
deploy along with user authentication
anything we want. Just to be clear, that
technique will not use the N8N workflow
at all. It's going to build its own
solution that mimics this behavior,
which might be exactly what you want.
Maybe you're using open router with the
AI SDK or the cloud code agent SDK. Who
knows? But that's a great way to take
this proof of concept and to build a
standalone application which you can
deploy to production. But what if you
wanted to build a beautiful UI that
simply invokes your N8 workflow? Well,
that's really easy as well. In this
example, we can actually add another
trigger. So, we could simply add a web
hook trigger connected to this very
first node. Then we can grab this URL
and in cl code we can simply do
something like please create a web app
that generates Sora 2 videos and
automatically uploads them to YouTube.
Now for the backend logic we will
actually use an N8N workflow. Here's the
N8N web hook and then we can paste in
our web hook URL and now we can get
cloud code to build the UI for our
application again with any user
authentication and anything we want and
the actual complexity of the
application. So all of the sort of
backend logic will remain in N8N. So
we're kind of using N8N as our backend
infrastructure and the great thing about
this approach is we can actually go to
executions and we can see all our
previous executions as well. And from
here, we can even debug any issues. And
we can restart these workflows as well.
This can be really useful if you're
building super complex workflows that
might upload a video, but also send an
email and also update Slack. I mean, you
can really go as wild as you want. You
know, we can have our YouTube note. We
can also add Slack integration. We can
maybe send WhatsApp messages, anything
we want. But from our UI perspective,
it's simply a button to generate the
video and all of the complexity is
handled in N8N. One of the most popular
use cases of N8N and probably the
easiest way to make a site income is to
build customer support chat bots for
business websites. This means we can add
this chat bubble to any website and now
we have a chatbot with knowledge about
this business. So we could ask what are
the current specials and this agent will
have access to the menu or any
information related to this business for
example the current specials and you
will also notice this chat bubble does
have the same theme and style of the
main website in makes it really easy to
customize these chat bots and setting up
a workflow like this could not be any
easier. We simply have an AI agent node.
We're using Open Router for the AI
inference. We have conversation memory
and of course access to the restaurant's
information. It's even able to make
reservations as well. If you want a
step-by-step tutorial on building this
agent and embedding it into any website,
you can simply watch this video over
here. I'll link to it in the description
of this video. But you might be
wondering how this is related to Claude
code at all. Well, this chatbot has this
when chat message receive trigger. And
if we open this, we get these
instructions for embedding these
chatbots into websites. So this gives us
access to this N8N chat widget with a
lot of technical details on adding it to
a website. So if you don't want to deal
with with trying to embed this yourself
and creating the custom styling, which
can be quite a challenge as well if you
look at all of the customization going
on here. Really, all you have to do is
copy this article. You can send it to
claude code and do something like hey
please can you embed this chatbot widget
into my website and also adjust the
colors accordingly to match the
website's brand something like that. So
obviously you want cla code to be open
in your website's project and it will do
all the customization for you. Here's
another really popular use case. You can
expose any workflow or tool as an MCP
server from N8N. And trust me N8N
supports a lot of different platforms.
There's like hundreds if not thousands
of integrations here. For example, the
Gmail node which allows us to create
drafts or read emails or send emails.
For this demo, what we can do is
actually use a data table. This is a
database that's built into N8N. And
these are really easy to set up. So, let
me show you. If we go to data tables, we
can easily create a new data table like
this to-do table. And we can specify any
columns we want like the title, the
status, the category, whatever we want.
We can easily add or remove columns as
well. And we can manually add or remove
records. It's really that simple. So
let's say we wanted to expose our to-dos
to our cla code instance. So that way we
can ask cl code what our daily to-dos
are, even add to-dos, update them,
whatever we want. All we have to do is
create a new workflow. Then let's search
for MCP and the MCP server trigger. We
can add authentication if we want. I'm
simply going to rename this to let's
just call this N8N to-dos. We'll get
back to this node in a second. And now
we can add any of those integrations to
this node. So for our example, we'll
search for our data table. Now we can
specify any operation. Let's do get.
Then from this list, let's select
to-dos. And that's really it. Now we
have an MCP server that can retrieve our
to-dos. I'm just going to rename this
one to get to-dos. Maybe we can add
another one like data table. And for the
operation, let's leave it on insert.
Let's select to-dos. And let's rename
this to add to-dos. Cool. So now we can
actually just publish this workflow.
Back in this note, let's grab the
production URL. Then I'll just exit out
of claude code for a second. And now we
can run claude mcp at d- d-transport
sse-
s for scope project. Then we can give
the server any name we want like nadn
todos. Let's paste in that URL like so.
And that created this mcp.json
file. And if you want you can simply
create this file yourself. It's probably
easier than that command. So now that
that's done what we can do is run
claude. And now if we go to MCP we can
see our N8N to-dos which is
authenticated and connected. And if we
go to view tools we can see the two
tools that we added. So you can add as
many workflows as you want with as many
tools as you want. So you can get claude
code to send emails, update Slack.
There's just so many different options
here. Let's try this. Please retrieve my
to-dos. And look at that. It's going to
call our N8N to-dos tool, which is
perfect. And we get the results by
bread, call mom, and by dog food. And if
we go to our data table in N8, we can
see those to-dos as well. If you've ever
used cloud code, I'm sure that you know
exactly how long it can take for the
agent to complete certain tasks,
sometimes going on for 20 or 30 minutes.
And I don't want to sit around and
babysit the agent. Now we can use N8 to
send that notification to any platform
we want really. It could be Slack, it
could be an email, WhatsApp message,
Telegram, you name it. Now setting this
up is really easy. So we can simply
create a new workflow. Let's call it
Claude Code notifications.
And I'm just going to use Telegram for
this one. In fact, I've got an entire
video showing you exactly how to set up
all of this. So I'll link to that video
in the description. Now, in order for
NMN to reliably communicate to Telegram,
you will need to run NMN in the cloud.
Now, of course, you could just pay for
their service. So, if you go to pricing,
you will see that this is actually 24
per month. So, what I would recommend
instead is to use Hostinger. This gives
you 64% off Nate self-hosting. So, you
can self-host in it for as little as $5
per month. All you have to do is select
your plan, select your period from 1
month, 12 months, or 24 months. It
really doesn't matter. What you need to
do is select N8N at the bottom of the
screen over here under applications.
Then you can get an additional 10% off
if you use the code Leon. And just like
that, you're getting Nitin for even
cheaper. Simply continue with the
checkout process. Then from your
dashboard, simply click on manage app.
And now you have access to your very own
NAN instance at a fraction of the cost.
All right. So once we've set up our very
simple workflow that exposes a web hook,
then I'm only grabbing certain messages
from cla code. I don't necessarily want
to receive everything and I'm sending a
message to my telegram account. Then
back in cloud code, we can use a
built-in feature called hooks. So if we
run the command hooks, we have access to
a whole bunch of hooks that get
triggered while cla code is running like
notifications as well as stop. So I'll
go with stop. add new hook and for the
command I actually don't know. So I'll
just say no yet. Let's run this. We'll
start it at project level and that
should be it. So now in our port
settings file we can see the hook that
we just configured. So now we have to
replace this command with a call to our
actual N8N webbook. So I'm simply going
to copy my webbook URL and then I'll let
Cla go do all of the hard work. So let's
pull in the settings file. Hey there. I
needed to complete the setup of this web
hook. The idea is that we want to
receive notifications from claude code
once the agent completes work. So
effectively we want to receive the final
message produced by claude code. Then we
want to send that message to an N8N web
hook. And here's the URL to the web
hook. Then I'll just paste that in. So
there is documentation related to using
hooks and claw code. So I'm actually
going to just copy this URL. And then
here's the link to the Claude Hooks
documentation. And that's really it.
Let's send this. And within a second or
two, we should receive notifications
from Claude code on Telegram. So Claude
created this Python file that calls this
N8N webbook. And it's passing this
payload to N8N. And of course, we can
tell it exactly what to include in the
payload. And now when we send a message
to Claude, we should receive a message
to Telegram once Claude completes, which
we do. So, your messages can be
customized to look however you want. I'm
simply including the project folder
along with the event that was triggered
and the final message. How cool is that?
So, I can let Claude cook. I can go off
and do whatever I want. And once Claude
is done, I'll receive a message. So, as
a little bonus round, here's another way
that you can use Claude with N8N. This
is not necessarily Claude Code specific,
but of course, you can use Claude code
to do this as well. You can expose N8N
as an MCP server itself which means that
claude or claude code can remotely
access your workflows and it can create
workflows, edit them, execute them, etc.
So that way you don't even have to
expose a web hook at all. Claude will
just have access to your workflow. But
here's a really silly way to use it as
well. If you install the Claude browser
extension, of course, we can change the
model. And in this extension we can say
please create an NAN workflow with a
chat trigger node with an AI agent node
with memory. You can use open AI for the
inference and for the system prompt make
the agent respond like a pirate. So even
if you don't know how to use nadn just
fire off claude in the browser and it
will just create the workflow for you.
And by the way I'm not touching
anything. This is simply clawed using
the browser to create this workflow for
us. It can even troubleshoot issues
itself. So from my perspective, it's not
really a debate on whether you should
use claw code or nadn. My answer is use
both. They both have their place,
especially when building complex
solutions. If you would like to improve
your skills in cla code or nin, then
definitely consider joining my school
community, Agentic Labs. We have a
vibrant community of like-minded people
who build real solutions using all of
these different AI tools. And we also
have structured classrooms for both N8N
and Claude Code. And we also have weekly
Q&amp;A sessions. If you join now, you will
lock in your subscription at $7 a month,
even when the price is increased. I hope
to see you there. And YouTube thinks
you'll enjoy this next video. So, I'll
see you in the next one. Thank you for
watching. Bye-bye.
