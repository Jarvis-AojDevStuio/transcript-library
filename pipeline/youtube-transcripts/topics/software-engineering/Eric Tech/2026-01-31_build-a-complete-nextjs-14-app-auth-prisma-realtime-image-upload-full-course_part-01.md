---
video_id: "HqlJjX9uIuk"
title: "Build a Complete Next.js 14 App (Auth + Prisma + Realtime + Image Upload) — Full Course"
channel: "Eric Tech"
topic: "software-engineering"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=HqlJjX9uIuk"
word_count: 3998
chunk: 1
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
welcome to building a full stack web
application with net js14 my name is
Eric and I'm going to be your instructor
for this course in this course we're
going to build a featur rich application
from scratch using some of the most
popular tools and libraries in the
modern web development ecosystem so in
this course we're going to use the
following tools and libraries so by
default we're going to use nestjs
framework to build our web application
and we also going to use Prisma to
communicate to our database as a omm
object relation mapper and then we also
going to use tawin CSS for styling DOD
for form validation zustan for State
Management clowner for image upload and
image storage NES off. JS for
authentication passation and filtering
and sorting as well as Pusher for for
realtime websocket communication and the
prerequisites for this course is that to
have a solid fundamental for HTML
JavaScript and CSS and also have some
knowledge with react as well as
typescript will be also ideal all right
so let me give you a demo of what we're
building inside of our application so in
this course we're going to build a
dating application and here you can see
we're on the homepage of this
application you can click on the login
to navigate to the login page and once I
enter the EM password I click on login
and once I log to the application and
here you can see we can be able to view
all the members and if I only want to
filter by Fe modes in this case I can be
able to deselect the mail option and
here you can see we have total five
females and I can also be a to filter by
age range so if I only want people who
are less than for example 32
I can be able to do so and I can also be
able to send real-time communication
between users so one account using my
and the other user is using Sarah and
here you can see currently we are able
to see that Sarah is currently active
and having the green indicator shows
here and also for Sarah account we do
see that mile is also active as well so
if I were to send a like so if I were to
click the like for mile on the Sarah
account I can be able to receive the
notification and uh if I were to click
on the list page and I can be able to
see the members that like me and I do
see that Sarah liked me and I can be
able to like Sarah back and here you can
see we do have notification showing on
the Sarah's account and if we were to
click on the mutual likes you can see
that Sarah do exist in the list and we
can be able to click on the Sarah's
profile click on the chat and send a
message in real time and here you can
see mil sends a message to Sarah saying
hi Sarah and I can also be able to check
the messages page to be able to see all
the messages that Sarah received now if
I were to send a another message to
Sarah and here you can see Sarah receive
this message in the messages page and I
can also be able to add a profile in the
miles page and I can also be able to
upload a photos right so currently here
you can see I'm going to upload a photo
on my desktop and this is going to be
just a demo photo and here you can see
the status is currently awaiting for
approval what I'm going to do is I'm
going to log in into admin account and
I'm going to click on Photo moderation
and I can be able to either approve or
reject the photo so so I'm going to
approve this photo and if I were to
refresh on Miles edit profile page and I
can be able to see that the photo is
approved and I can also be able to set
the photo as the main photo of this
current profile so if I were to click on
the star you can see the profile has
changed and if I were to navigate to the
members list and I do see the profile
has changed as well and then user can
also be able to register their account
and by filling out their email and
password as well as their profile
information and then they will receive
an email to to confirm or verify their
accounts through email here and if I
were to click on this link and you can
see the account is verified and user can
also be able to choose social login so
I'm going to use Google to log in and I
can be able to choose a Gmail account to
sign in with Google and here I'm just
going to fill the basic profile
information and once I submit choose the
account to continue again because I have
multiple accounts and here you can see I
have successfully logged in here you can
see I can be able to view all the
members so pretty much that's all the
features that we're going to add in this
project so now why you should take this
course is this course for you now the
reason number one is that this course
have diagrams role maps for every lesson
we progress for any changes that we made
for example like our database changes we
going to demonstrate the relationships
for each tables so you have a clear
illustration on what change we're going
to make for our database as well as our
entire system so let's say if we're
going to add Pusher to our database or
let's say if we're going to add
authentication how does the this fits
into the bigger picture how does our
front end interact with this feature how
does it interact with our server how
does our server interact with our
database right we're going to have a
diagram to show where we are while we
progress our course so it's very clear
on what we're doing and where we are so
that it's not just going to be here's
the code that I'm writing and here's the
feuture that we're adding it's not as
that so you get a y view of what we're
developing in each step of the way and
the other reason why you should take
this course is there there's going to be
more diagrams and simplifications
throughout all of the key learning
points for example if we're going to
learn about pushers then how does Pusher
work how does it fit into our
application if we're going to learn
about Prisma then how does Prisma work
how does it communicate to our database
how is react different from nestjs how
does cloud Nary works or the image
upload process work how does NES off JS
authenticate users and manage our
sessions even how does middleware works
or even how does the caching Works in
SGS these are some complicated things
and we're going to answer all of those
questions in this course in a clear
simplified and visualized way through
diagrams through drawings so that it
will make it a lot easier for you to
understand and the last reason is the
source code is completely available for
this course and there is going to be
commits for each of the lessons we're
going through and the repository is
completely accessible and the last thing
we need to talk about is what you need
before you start a course the minimum
requirement is having a computer with
operating system using Mac windows or
Linux and also having an IDE installed
we're going to use Visual Studio code
but it is completely fine to have any ID
you like and also having no JS installed
and also the other thing is Redux Dev
tool which is going to be a state
management tool to view our state for a
client application and lastly we also
need to have the browser so I'm going to
use Firefox for the entire course but
feel free to use Google Chrome or any
other browsers you like all right before
we continue if you find this video
helpful please make sure to like this
video and also comment down below if you
have any questions or any suggestions
for the video and if you do want to
receive more videos like this please
make sure to subscribe to this channel
your subscription means a lot to this
channel thank you very much and let's
continue all right welcome to lesson one
in this lesson we're going to focus on
setting up our basic application for our
nestjs project so in this lesson we're
going to take a look at how to first set
up our njs project but first introduce
njs framework and how is it different
compared to react and then we're going
to create our njs application using the
njs documentation and then we're also
going to set up our table CSS for
styling and then we're going to install
the nesi library as well as react icons
to decorate our application and then
we're going to leverage the nestjs
routing feature to be able to add routes
to our application and here is all the
routes we're going to add in this lesson
so in the beginning we're going to have
the members messages list where members
can be able to view all the likes and
then we also have our authentication
page where user can be able to register
their accounts as well as their log in
their account and the goal of this
lesson is to basically add in those
routes so the user can be able to
navigate to those R and view the page
and then we're going to focus on is to
add the Navar so user can be able to
click on each of those links to navigate
to each of those pages and lastly I'm
also going to add the changes to Source
control so that you can be able to view
all the changes for each lesson let's
take a look at what is njs so if we were
to look at the documentation here it is
a react framework for the web and if we
were to click on get started you can see
that it is a react framework for
building full stack web applications so
it is really just a framework that
builds on top of react and provides
additional features and optimizations
and we're going to learn more about
these features in the upcoming lessons
and here's how react different from this
GS so if we were to look at this uh
diagram here here we have a client
application that built by react and the
way how it works is that we first have
to get the HTML plain HTML from our
server and this is what it looks like so
we have our plain HTML and we have our
script and this is the source and the
source points to the source app.js and
then we're going to send another request
to our server to get our JavaScript code
and our JavaScript code is also going to
send another request to our server to
get the members data so that we can be
able to display all our data and our
components in our client browser and
here you can see that with react we are
making three calls to our server to get
three different things for our client
applications but with nestjs it will be
completely different nestjs will
basically return both the HTML and the
server data to our client and then it's
going to get our JavaScript and then
compile this inside of of our client
browser so we can be able to reduce the
numbers of calls to our server and we
can also be able to make it more SEO
friendly because here in our react you
can see that we're only returning a
plain HTML without any data inside but
here you can see that we do have the
data and return with the HTML so that
the search engine can be able to crawl
the HTML to find the data they need to
rank the page to its corresponding
Search terms and this will also reduce
the page load time because we're only
making a few calls to our server to get
both the server and data and another
request to get our JavaScript code
whereas react we're making total of
three calls to our servers to give three
different things and that's pretty much
the main difference here and there's
also additional features that come with
njs like pre-built routings and be able
to create our nestjs API functions
caching styling and such and we're going
to learn more about nestjs in the
upcoming sessions to build this amazing
nestjs project all right first we're
going to take a look at how to create
our nestjs project so first we're going
to navigate to nestjs dorg to to get
started with the installation and we're
going to install nodejs for version 18
and later and to install this we're
going to run the MPX command to create
our node.js application and it's going
to ask us a series of questions so we're
just going to copy this come here run
this and it's asking us to create okay
to proceed so we're going to name our
project called match me and we're going
to say yes for typescript yes for ES
lint yes for tawin CSS and we're going
to use the source directory and and
we're going to use the app router
default from njs and the only thing that
we're going to say no to which is the
import alas so we're going to say no to
that and it's going to install this
inside of our code directory and once we
have successfully installed our
application we can be able to CD into
match me and if we want to start our
application we're going to be able to
run mpm run Dev and this will start our
application on Local Host 3000 so if we
were to navigate to this you can see
here that on the left we do have our
Local Host 3000 and this is what we have
inside of our local application and you
can see here that we can be able to
start editing on the page. TSX so which
is here and you can see that whatever we
change here will affect here so if I
were to remove this and just say hello
if I were to save this and refresh you
can see that we do have the text changed
on our homepage and inside of this
folder we have the layout and the page
so the layout is basically going to be
the parent component for the page and
you can see that for this layout you can
see that takes the children uh it's
going to display the children inside of
the body tag now here inside of the
layout. TSX you can see that we also
have the metadata uh we can be able to
change the page title to something that
we want so in this case if we were to
change the page title to for example
like match me uh we can be able to
refresh and you can see the page title
changed and of course we can also be
able to change the description if we
need it so here you can see we on our
page we have a dark background as well
as we have the content display in the
middle so in this case if you want to
remove the default uh styling that we
have then we can be able to jump to
Global CSS and we're just going to
remove the styling that we defined here
so we have to define the uh Roots the
body we also have the styling for
different screen size so in this case
we're just going to remove this styling
and if we remove this you can see that
we have the text displayed in the center
still and the background changed to
White and if we were to jump to our
homepage if we were to remove this uh
for the main tag and just display the
div and you can see that we have our
hello display at the top left of our
page so you can see here now we
basically remov The Styling so pretty
much everything that we need to get
started for our development and because
here you can see we're basically using
the Tailwind CSS for styling so here you
can see if I were to change this so if I
were to add a H1 tag for this you can
see the text didn't change but if I were
to add a class name for the twin CSS you
can see that we do have the styling
change in this case we're going to
specify the text 3x large and if we were
to change this you can see the text gets
bigger so it also highlights The Styling
for the class name and here you can see
for the text 3x large it changed the
font size and the line height so and the
other thing that we want to take a look
at is the Tailwind config typescript so
here you can see inside of the config
object we have the content so this
basically specify where we are going to
apply the Tailwind CSS so you can see
that anything that's inside of the
source SL Pages or Source SL components
or Source SL application folder we're
going to apply this tawin CSS and if
there's anything that we're going to add
a new file out set of these path then
we're going to specify inside of the
content array and then for the theme
here we're just going to remove it
because we're not going to use the
background that we specify here so that
we can be able to keep it as simple as
possible all right so after we create
our nestjs project now we're going to
focus on is to install the nesu library
as well as react icon Library so because
of this tutorial we're going to focus
more on the development of the actual
project we're not going to focus too
much on the UI side of things The
Styling so we're going to use a UI
Library called Nest UI so to do so we're
just going to click on the get started
from the uh NES u.org so we're going to
click on the installation part on the
side Naf bar and here you can see it
asks for the requirements so we're going
to have the react 18 and we can be able
to look at these versions inside of the
package.json and you can see that we do
have react 18 above as well as tawin CSS
so you can see that we have tilin CSS
here for the 3.4 later and then we
obviously we don't have the framer
motion and then to install this we're
going to scroll down to the manual
install since we already have the njs
application installed so here you can
see because we don't have the framer
motion we're going to npm install the
framer motion as well as the nuui orc
react so we're going to click on this
and then come back to here and if we
were to clean this and install those two
pack packages and you can see that those
two package have installed and you can
see that we can be able to see this
inside of our package.json inside of our
dependencies so after we have installed
the packages inside of our application
what we're going to do is we're going to
take a look at the next step which is
the hosted dependencies so this is uh
required if you're using the mmpm so
since we're not using that we can skip
this for now and then we also have the
tawin CSS setup so in this case inside
of our twin config.sys
so this is going to be the path for our
Nest UI package so basically tell tell
when CSS where to look so for nest UI
Library package so here you can see we
basically add this inside of our content
and then we're also going to added the
dark mode and the
plugins so we're going to do this and
then we're going to import the nesi from
the nesi slorg and if we were to look at
our nextest step which is the provider
setup so it is essential to add the NES
UI provider to our root application so
the root application for n application
here is going to be the layout. TSX so
here is going to be our layout we're
going to add a provider here so
obviously we can be able to add the nsui
provider here but I'm going to do it
differently I'm going to add a new
component called providers where we're
going to add all the providers inside so
to do so we're going to um come to the
source folder and we're going to create
a new folder called components and
basically this components folder will
contains all the reusable components
that we can be able to use through our
application so inside of the components
folder we're just going to say provider
. TSX and inside of the provider here
you can see we basically pass the
children which is a react node and then
we're just going to return the children
and here you can see we have our Nest UI
provider wrap around the children and
then what we're going to do is we're
going to import this into the layout so
come to the layout. TSX you can see here
that basically what we did here is we're
going to import the providers from the
at components SL providers which is what
we had to find here instead of the
provider or the components folder
and then here we're basically going to
use it and wrap the children around the
provider so this children will basically
have the uh NES UI provider uh
functionality wrap around so this is
basically how we're going to use that so
the next part is we're going to add the
react icon so we can able to add icons
inside of our application if we click on
the mpm package and if we were to run
the mpm install react icons all right so
