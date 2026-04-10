---
video_id: "3NzCBIcIqD0"
title: "10 CLI Tools I'm using alongside Claude Code | Starmorph AI"
channel: "StarMorph AI"
topic: "software-engineering"
published_date: "2026-02-22"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=3NzCBIcIqD0"
duration: 591
word_count: 1793
---
Hey everyone, thank you for watching
Starf. In this video, I want to go over
10 CLI tools that I've been using
recently alongside Claude Code as I've
been spending more time in the terminal.
So, let's go ahead and jump in. So, the
first tool that I want to show you is
called Lazy Git. And what this CLI
allows us to do is monitor the current
git repo that we're in, which is really
nice when you have cloud code running
because as Claude is making changes to
your codebase, you can see them pop up
here. So it's a little overwhelming at
first this UI, but we have these hotkeys
here to go to these four or five
different views.
So I can look at the overall status of
Lazy Git. This is my favorite view, the
files view, where you can see here that
I have one file that's been changed. So,
Claude just made this change, and then I
can go in here and get a quick view on
what Cloud changed. You can also manage
your branches and look at commit history
and what you have stashed. So, this is a
nice little tool to monitor Git progress
as you work with cloud code. The next
tool I want to mention is called Glow.
And what Glow is, it's a markdown reader
in the CLI. So, as you know, Claude
works with a lot of markdown files, and
sometimes you want to be able to read
them on the command line. So, if you
type glow and then I choose one of these
markdown files, it will print this out
to the command line to the terminal. And
it also adds some formatting that doing
something like cat might not have. So,
this is a way to quickly read some
markdown documents. If I want to do a
little more in-depth view, then I'll
probably use NVIM, Neo Vim.
And then I can have hotkeys for things
such as jumping to each header,
which is pretty nice, or going to the
top of the page or the bottom of the
page. So this gives you a little bit
more control on reading and editing
markdown documents, but it also can
take, you know, more time to ramp up on
the Vim
hotkeys and everything there. So Glow is
great just as a simple tool for reading
markdown exports that come from Claude
or reading cloud.md files and things
like that. The next tool that I want to
show you is called LM Fit. I just
discovered this recently and it's kind
of cool. What LMFIT does is it prints
this table out and it shows you what
hardware you're currently running on and
what models you could locally run on
your computer. And it ranks them on
different things like the score that
they make, how much memory of your
machine it's going to use, how many
parameters the model is, and then you
can also click into a model and look at
more details of this model.
One thing I've noticed about this is I
do think that it's not going on my full
system memory, but just what I have
available. I need to confirm that, but
it looks like it's only calculating this
based on what I currently have
available. So, I should probably close
everything and then look at this again.
But pretty cool interface here. Similar
to that, I found another CLI tool called
models.
And this prints out another table, but
this one has a list of a bunch of
different AI model providers. And you
can take a look at what models they have
available and then a pricing chart of
how much they're charging for tokens,
how much context you have, and some
other model details here.
API URL. So, this is a quick way to look
at different model data. I actually
didn't know this, but it looks like they
have a tab for agents.
as well. Okay. So, they also have
another tab for agents where it looks
like they have change logs for different
agents
to see what's changing. And then we also
have
a table here of different benchmarks
and how models did on these benchmarks.
So, pretty cool CLI to get a quick view
in the terminal of different model
details.
The next tool that I want to show you is
called Tap Room. And what Tap Room does
is if you're familiar with Homebrew, the
package manager for Mac, then Tap Room
shows you all of the brew packages or
flasks and formula that you have
installed on your machine. So, actually,
you can not only view the ones on your
machine, but right here, we're just
viewing the
casks that exist. And if I click I, then
it will take me to the ones that I have
installed. And this is a really nice way
to just sometimes you forget what
packages you install. So this is a nice
way to see what you have on your machine
and find new things that you might want
to install as well and get a reminder of
what packages are here. So I've been
enjoying using this.
And then the next CLI tool I want to
show you is called Ranger. Ranger is a
file
browser explorer in the CLI. And if
you're working on a Linux machine or
something like that and you don't have
Finder or you don't have a UI for
browsing files, this can be really
helpful to get around on the machine.
The next tool that I want to show you is
called Z Oxide. So instead of doing CD
and then writing out the full path,
Zoxide has a smart history that
accumulates more knowledge of how you CD
into directories. And then you can do
like a fuzzy search on it. So for
example, if I go to my home directory
and then I type Zmuse, it's going to
know that I often go to the Pixelmuse
GitHub repo and it's going to take me
right there. Even though I was on my
home directory, it knew that I wanted to
go to this full path. So that's just
really convenient and nice. I use that
all the time, like plenty of times a day
because it's just easier than CD and
writing out the whole path. It actually
saves like a lot of time just adding up
over time. The next CLI tool I want to
show you, this is another one that if
you're running cloud code in something
like a Linux VM, you might want to view
the system processes and just get an
overall view on what's happening on that
machine. So for this, we can use BTOP.
And BTOP makes this really nice view. I
like to keep this up when I'm sshing
into Linux to just see what's going on
in the system. You get an overview of
what's happening with the memory,
different system processes that are
running, and then your CPUs. And you can
configure this as well. So, if I go in
here and I take out net, it's going to
remove this bandwidth chart in the
bottom left. And you can customize what
you want your view to look like in BTOP.
So this is a great way to just get an
overall macro view and kind of analytics
as things are happening on your machine.
Maybe you're spinning up cloud code, you
want to see how much memory it's taking,
things like that. So that's BTOP.
Similar to Btop, there's another package
called Mactop
specific to people on Mac. And yeah,
this is going to show you just another
view of a little more hardware centric
on what's happening on your system.
The next tool I want to show you is
another convenient one. It's called
Shaffa. And if I go here into the public
directory
and I type shafa and then an image,
it will render that image in the CLI. So
this is nice. Just a nice convenience to
have to be able to check images while
you're working with different files in
the CLI. Or you could have Claude show
you images in the CLI while you're
having Claude work with them. I made an
alias for this. So I can just type image
and then the image and then it renders
it on the screen.
Similar to that, another tool I want to
show you is called CSV lens.
I made a CSV
and this is a TUI for viewing CSV files.
There's one for and Postgress and
things like that.
Okay. And then the last one, and you
might have already seen this a little
bit, is this tool called Eza. Eza is a
alternative to ls with improved options.
I actually have ls
aliased to Eza. So that's why when I
type ls, you see that I have this grid.
So you can see here in the command, we
enabled icons, grid, and grouping
directories first. And that's why I have
this nice detailed ls where it's in
multiple rows. I have nice icons which
can help you just find files when you're
looking at a large amount of files that
Claude is producing or across multiple
machines. These little details add up.
When you have 10 terminal screens open
and you're on five VMs, it really helps
to have things colorcoded and organized
so you know what you're looking at.
having multiple windows that are colored
differently or it tells you I've been
setting up a lot of conveniences like
that to help me work with cloud
orchestration at a larger scale. So that
is why I have Eza hooked up. I think I
could keep going on different terminal
tools, but these are some of the cool
ones I've been running into. So I'm
going to end this video here. If you
want me to go specifically into any part
of this, please let me know in the
comments and I could make one video
about one of these tools. Definitely
like working with Envim and everything.
So yeah, this was just a dive into some
of the CLI tools I've been playing with.
I hope you found this video useful.
Thank you for watching and I'll see you
in the next video.
