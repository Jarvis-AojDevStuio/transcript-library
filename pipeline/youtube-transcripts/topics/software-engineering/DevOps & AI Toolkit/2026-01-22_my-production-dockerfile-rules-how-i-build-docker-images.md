---
video_id: "ueTe-VQaD7c"
title: "My Production Dockerfile Rules: How I Build Docker Images"
channel: "DevOps & AI Toolkit"
topic: "software-engineering"
published_date: "2026-01-22"
ingested_date: "2026-03-02"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=ueTe-VQaD7c"
duration: 1059
word_count: 2590
---
Most Docker files I see in production
are security nightmares waiting to
happen. Running is rooted using latest
tags copying entire directories
including secrets and images bloated
with debugging tools that attackers
love. They love it. Here's the thing.
Writing a good Docker file is not hard.
It's just that nobody taught you the
rules. Today I'm going to show you every
best practice you need to build
production ready container images. We
will cover image selection, build
optimization, security hardening, and
maintainability. And at the end, I will
show you how AI can apply all those
rules automatically automatically. Let's
start with the foundation. Choosing the
right base image. Speaking of production
ready containers, building them right is
one thing, but testing the code that
goes into them is another challenge
entirely. You write your code, you build
the image, you push it, you wait for
deployment, and then you discover
something doesn't work with real
dependencies. That cycle is painfully
slow. And that's that's where the
sponsor of this video comes in. Mirror D
from Metal Bear. Mirror D lets
developers run local code in the context
of a cloud environment without deploying
anything. Your code runs locally but
connects to real databases, message cues
and services. And the result feedback in
seconds instead of waiting for build and
deployment pipelines. For individual
developers, the open-source version
works great. It's amazing. But when
teams share environments, coordination
becomes critical. The team and
enterprise plans add Q splitting,
database branching, and traffic
filtering, enabling multiple developers
to work on the same workload
simultaneously without collisions. So
check out metalbear.com or click the
link in the description somewhere down
there. And big thanks to mirror for
sponsoring this video. Now let's get
back to the Docker file best practices.
The first rule is simple. use minimal
base images. Containers are not virtual
machines. They already run on top of the
host operating system and they're
sharing its kernel. You don't need Ubunt
or Debian inside your containers. All
you need are the runtime dependencies
your application requires nothing more.
So forget about full distribution
images. Instead reach for Alpine, slim
variants, distr
images. Every package you don't include
is a package that cannot have
vulnerabilities. Smaller images mean a
smaller attack surface, faster pools,
and less storage. So, here's a general
rule of thumb. If you're working with
compiled languages like Go and Rust, DRS
or Scratch images are your best bet
since you can compile everything into a
static binary with no runtime
dependencies. for interpreted languages
like NodeJS or Python, you will need the
runtime you do. So, Alpine or slim
variants make more sense. So, let's take
a look at the Docker file I'm using. I'm
using Alpine as my base. Now, to be
clear, there are arguably better options
like chain guard images which are
absolutely amazing, but the free version
fails with one of the rules we will
cover later. So, Alpine in this demo it
is. The second rule is to use
multi-stage builds. The idea is to
separate your build dependencies from
your runtime. Why does it matter? Well,
because the tools you need to compile or
build your application are not, and I
repeat, are not the tools you need to
run it. Node modules for building
compilers, dev dependencies, none, none,
none of that belongs in your production
image. It bloats the image and it
increases the attack surface for no good
reason. So here's how it works. The
first stage uses node Alpine to install
dependencies and to build the
application. And the second stage is
just engineext alpine. It copies only
the built files from the first stage and
service them. All those node modules,
all those build tools, even the source
code, they're gone. Gone. The final
image contains only what's needed to
run. Now the third rule, well derive the
version from your project. Don't just
pick a random version for your base
image. Your project already defines what
version it needs. So use that as your
source of truth. Why? Because you want
your container to run the same version
your project was designed for.
Mismatched versions lead to subal bugs
that are pain to debug. Over there we
can see that the package JSON specifies
node 20 or higher in the engines field
and over here in docker file we can see
that it uses node 20 alpine the version
matches for go projects you would check
go mode for python you would check pi
project toml or python version the point
is do not guess do not guess derive now
let's talk about how to optimize the
build process itself
The first optimization rule is about
layer caching. Docker caches each layer
and when something changes, it
invalidates that layer and everything
after it. Now, why does that matter?
Because if you copy your source code
before installing dependencies, every
code change forces a pull dependency
reinstall. That's slow and that's
wasteful. And the fix, the fix is
simple. Put the things that change
readily at the top and the things that
change often at the bottom. Base image
first, then dependency manifests, then
configuration and finally source code.
Now over there, notice the order. The
package JSON and package lock JSON come
first. These define dependencies and
they rarely change. Configuration files
come next. Source code comes last
because that's what changes most
frequently. Now when you change your
code, Docker reuses the cached layers
for everything above it. Next, combine
run commands. Each run instruction
creates a new layer. Fewer layers
generally means a smaller image. This
example shows chands
chained together. It's not the most
exciting demonstration, but this image
doesn't need package installation. So
that's what I got. Now, here's where
combining commands actually matters.
Cleaning caches. If you install packages
in one run command and you clean the
cache in another, the cache still exists
in the earlier layer. You saved nothing.
The cleanup must happen in the same
layer as the installation. Now, you see
how npmci and npm cache clean are in the
same run command. That's the pattern.
Install and clean in one shot. So the
cache never makes it into any layer.
Okay. Next, explicit copy. Never use
copy dot dot. The consequences depend on
where you use it. In the final stage, it
copies everything into your image,
including secrets and get directories
and files you don't need. That's a
security and that's a size problem. In
earlier stages, those files will not end
up in the final image, but you're still
slowing down your build and hurting
layer caching. Any file change
invalidates that layer, even files you
don't care about. So, be explicit about
what you copy. So, yes, it's more
verbose, but you know exactly what's
going into each stage. Finally,
production dependencies only. If your
runtime image needs dependencies,
install only what's required to run, not
what's required to build or test. For
NodeJS, that means npmci omit dev. For
Python, separate your requirements
files. Dev dependencies have no
business, no business in a production
container. Okay. Now, let's talk about
security.
First rule, nonroot user, never never
ever ever run containers as root. Why?
Because if an attacker breaks into your
container, they shouldn't get root
privileges on top of it. Create a
dedicated user and run your application
as that user. Over there, we create a
group and user with UID 10,0001. Why
that number? UIDs below 10,000 are often
reserved for system users. Starting at
10,0001 avoids conflicts. Next, pin
image versions. Never use latest. Never.
Why? Because latest changes without
warning. Your build might work today and
break tomorrow because someone pushed a
new version. Worse, you cannot reproduce
builds reliably.
Ideally, you would pin an exact version
like node 2011 Alpine 319, but that
increases maintenance since you need to
review, test, and merge updates
constantly. So using something like Node
20 Alpine is a middle ground. You get
major version locked but you still
receive patches automatically. Now
remember when I mentioned chain guard
images earlier this is the rule they
fail. Their free tier only offers the
latest tag and the problem over there is
that I am too cheap to pay for it for a
demo. But but but but but you should
consider them for production. You really
should. Next official images. Use docker
official images or verified publishers.
Why? Because random images from unknown
publishers could contain anything.
Malware, crypto miners, back doors, you
name it. Official images are maintained,
scanned, and trusted. In this specific
case, both Node and EngineX are Docker
official images. So, we're good probably
more likely. Now, a few more rules that
all boil down to the same principle.
Keep it minimal. No secrets in image.
never embeds credentials, API keys or
passwords in your Docker file or ENV
instructions. Images get pushed to
registries, cached on build servers, and
pulled by who knows how many systems.
Secrets in images are secrets exposed.
Next, no pseudo. If you need root access
for something, use a separate build
stage or switch user explicitly.
Installing pseudo in a container is
asking for trouble. Then we have minimal
packages. Only install what your
application actually needs to run. Every
extra package is extra tax surface and
extra bytes. If you do end up using
upget, always use no installer
recommends. Otherwise, you will get a
bunch of optional packages you never
asked for. Then there is copy or add.
Always use copy unless you specifically
need ads t extraction features. And
never never ever ever use ad with URLs.
It's unpredictable and can introduce
security risks. Finally, no debugging
tools. Don't install curl, wget, vim, or
netcut in production images. Why?
Because attackers love that. They love
those tools. They love it. If they get
into your container, you just handed
them everything they need to explore
your network to download more malware or
to exfiltrate data. But what if you need
to debug something in production?
Well, use ephemeral debug containers.
Let's say I need to run dig to debug a
DNS issue in my container. Look at that.
The tool isn't there. It's not there.
And that's good. That's exactly what we
want. Now, let's use an ephemeral debug
container instead. Mhm. Now, it works.
The netshot image has all the networking
tools you would ever need. It attaches
temporarily to your pod. You do your
debugging and when you're done, it's
gone. Your production image stays clean.
And here goes one more security rule.
Executables owned by root. Application
binaries should be owned by root but
executed by a nonroot user. Why? If an
attacker compromises your application,
they cannot modify the binaries to
persist their access. The files are read
only to them. Now, let's wrap up with
some maintenability best practices.
First, sort arguments. When you have
multi-line package lists, alphabetize
them. And why, you might ask? Because it
makes diffs cleaner, reviews easier, and
merge conflicts less likely. It's a
small thing, tiny thing, but it adds up.
Next, use vertier. Never use run cd to
change directories. So, why not cd?
because it only affects that single run
command. The next instruction over there
starts back at the default directory. V
work sets the directory for all
subsequent instructions and makes your
docker file easier to read. So what's
next? Oh yeah, exit form for cmd. Always
use JSON array format for your command
destruction. So why does this matter?
The exit form runs your process
directly. So it receives signals
properly. If you use the shell form like
command engineext-g demo demonov your
process runs as a child of bsh.
When kubernetes or docker sends a sik
term to stop your container the shell
receives it not your application. Your
app never never ever ever gets the
chance to shut down gracefully. Finally
two rules about documentation. Comment
on obvious decisions. explain why you
made certain choices but not what the
command does. Anyone can read that
you're installing a package. What they
cannot figure out is why you pinned it
to that specific version or why you're
using a particular flag. And yeah, add
OCI labels. Labels like or open
containers image source and version and
description help with image management.
When you're staring at a list of images
trying to figure out what they are and
where they came from, labels save you.
And that covers the best practices. But
remembering all those rules and applying
them consistently is tedious. So let's
see how AI can tell.
All these best practices are baked into
a prompt available at Deopsci toolkit.
You give it a project and it generates a
productionready Docker file following
every rule we just covered. So let's see
it in action. I will open CL code with
the MCP configuration that includes the
Docker file generation prompt. And then
it analyzes things. It works and works
and works. Let's speed up through it.
And there we go. The AI analyzed all the
relevant files in the project. package
JSON for dependencies and node version
docus configts for the framework source
directories and everything else that
might provide information needed to
generate the docker file. It figured out
that this is a static site that needs
engineext to serve the built files and
now it generates the docker file. There
we go. Multi-stage build, alpine base,
layer caching, non-root user, pinned
versions, all the best practices applied
automatically, automatically. It also
generated a Docker ignore file. And look
at that over there. It excludes node
modules, build artifacts, secrets, and
git files. And now it builds the image
and validates that everything works.
There we go. It built the image. It ran
a container to verify everything works.
It checked the logs and it cleaned up
taffer itself. 106 megabytes for the
final image. And that's that's not bad.
That's that's quite okay for considering
it's a NodeJS application. And that's
it. From project analysis to a
production ready docker file in seconds
following all the best practices we
covered. And those practices are worth
remembering. For base images, use
minimal images like Alpine or DRS. Use
multi-stage builds and derive versions
from your project files. For builds,
order layers so that rarely changing
content comes first. Combine run
commands. Be explicit about what you
copy and only only only install
production dependencies. For security,
never run as root pin versions. Use
official images. Keep secrets out and
skip debugging tools. For
maintenability, use work there. reuse
exec form uh for cmd and add OCI labels.
Now I know that's a lot to keep track
of, but now you don't have to use the AI
prompt at the OCI toolkit and let it
handle the details. Your containers will
be smaller, faster, and more secure.
Thank you for watching. See you in the
next one. Cheers.
