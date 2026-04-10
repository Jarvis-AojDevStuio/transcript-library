---
video_id: "HqlJjX9uIuk"
title: "Build a Complete Next.js 14 App (Auth + Prisma + Realtime + Image Upload) — Full Course"
channel: "Eric Tech"
topic: "software-engineering"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=HqlJjX9uIuk"
word_count: 3997
chunk: 2
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
once we have this installed what we're
going to do now is we're going to start
our application again so we're going to
say mpm run Dev and this will start in
Local Host 3000 and if we will refresh
let's see if there's anything changes
okay so you can see that we still have
hello so now if we were to add a button
from The Nest UI uh we're going to say
click me and if we were to refresh you
can see that we have our button here so
we can also be able to change the color
and the variants here inside of our
button so here you can see we changed
the color to Danger so you can see the
color change to red
and then for the variant we also change
to border and then we can also be able
to add a start content so here you can
see we can also be able to add a
paragraph so you can see that we have a
Content at the start of the button and
we can also be able to add a uh icon
which in this case if we were to say
smile for example this one if I want to
refresh you can see that we have a smile
icon at the front of the button all
right so after we install the nest UI
library and the react icons and add it
inside of our application what we're
going to focus on now is to to take a
look at the njs routing so since we're
using the nestjs app routing basically
what it means is that we're going to
create a routing based on the file and
folders so here you can see inside of
the app we are basically on the homepage
so page. TSX will basically display the
homepage of the main route if we want to
specify a different route we're just
going to create a new folder for let's
say for example members is going to be
the route and then we're just going to
say the page. TSX so basically when user
navigates to the members members route
we're going to display this page. TSX so
if I were to create a page members page
navigates to the members and you can see
here we have our members page component
display on our page and we can also be
able to navigate to different routes so
since we have our members route and our
homepage route we can now be able to add
navigation so we can be able to navigate
to different routes so here you can see
inside of our homepage I added the I
make the button as a link from the NES
UI library and then we also have the
href which navigates to the/ member
members page and then inside of the
members I also create a link which will
navigate to the homepage which has the H
poting to the homepage route so if we
were to test this if I were to click
this you can see that we navigate to the
members page and if I click on the go
back home you can see that we navigate
back to the homepage and of course we
can also be able to add stuff inside of
our rot layout so here you can see we
added the high there inside of the uh
layout from the app folder and here you
can see we have the hide there display
on our page and it's really effective if
you want to add like navigation or
something that's common throughout all
the routes so we can also be able to do
so inside of the sub routes so inside a
sub route if we want to add another
layout for example I can also do so by
specify the layout. TSX and the name
have to be exactly the same so in this
case if we were to do so and adding
something like
layout then in this case if I were to
navigate to this page you can see that
we have layout display here um inside of
our application obviously we have to
import the children to have the children
display on the members like the children
components so in this case it's just for
a demonstration purpose that layout also
works in the sub routes as well all
right so after we learned about how the
njs routing works now we're going to
focus on utilizing that and be able to
add a nav bar using the njs routing so
now we're going to do is we're going to
delete this layout since we're not going
to use it and what we're going to do is
we're going to focus on how we can be
able to add navigation inside of our
applications so what we're going to do
first is that inside of the components
we're going to create a new file inside
of the Navar so we're going to call it
Navar folder and then inside of the
folder we have a topnav so we're going
to call it topnav TSX and we have our
top navigation components so for this
learning tutorial we're just try to keep
it simple so I just gone ahead and add
some styling to our top navigations so
here you can see this is what the
navigation look like we have our logo we
have our midsection and we have our
right section right and this is exactly
that so we have our top bar which has
the full width and this the color for
the transient and then we also have the
class name for the text so here you can
see we also have our navbar brand which
is our logo and you can see we have our
icon from react icon and then here is
basically the text and then here you can
see we have some uh links in the middle
so this is the nap part content which
justify in the center which is what we
see here and you can see that these are
these uh items that we have uh we have
the matches which navigate to the
members and then we also have the
messages and then we also have the list
so these are the three of them on the
right you can see we also have the
logins so the login and the register so
basically you can see um obviously if we
were to click around it doesn't really
work because these Pages we haven't
created other than the members in this
case what we're going to do is we're
going to add those pages inside of our
app folder so what we're going to do is
we're going to create a new one call
lists
SL page.
TSX and we're going to use the snippet
we're going to call it the list page and
now if we were to click on the list you
can see that we have our list page
displayed on our page and now we're
going to create our other items like the
messages so for messages it's going to
be messages page. TSX going to call a
messages page and if we were to click on
messages you can see that we have
messages page so then we're going to add
add the routes for the login and the
register so to do so we're going to
create a new folder called off inside of
the app folder and inside of that we're
going to have our login SL page. TSX and
here you can see we have the off folder
and the off folder has the login and the
register and to navigate login and you
can see that we have our login page and
then here inside of the top nav bar you
can see that um I basically specify the
slash login and slash SL register so if
I to click on this you can see that the
page is not found if I were to specify
slof SL login uh you can see that if I
click on this you can see that we are
navigated to the login page but let's
say we don't want to have Nest the route
here um in this case we just want to
have the off folder as just the folder
itself rather than the self route then
in this case what we can do is we can be
able to wrap the folder name around a
parenthesis in this case we can still be
able to navigate to the login uh without
specify the off uh we're naviga to the
login page no problem and if we were to
click on register you can see that we
navigate to the register and the other
part we're going to talk about is the
nav link that I created inside of the
Navar component so we're using this nav
link component inside of the top nav
section so you can see here those three
those three links we're using the nav
link component and we can be able to see
it here so here you can see for the
members we are basically passing the uh
hre and the labels and same thing for
the list and messages so once we have
the href we're going to see if it's
equal to the path name so we're using
the used path name from the uh Nest
navigation and we need to basically tell
nestjs that this is a client application
so we're using the so on the top of the
file we're using the use client to tell
that this is a client application and
once we have the path name we're going
to see if it's equal to the HF if it is
then we're going to have the active and
you can see that once it's active it is
yellow it's showing yellow on the link
and here you can see we have to specify
this this is a link from DNS link and
then we specify this is the H and then
the label so you can see here that if we
were to click on messages it displayed
the messages since we cons log the path
name inside here all right so that's
pretty much all for adding a top nav bar
as well as adding a sub routes and such
so what we're going to do now is we're
going to commit all these changes all
right so what we're going to do now is
we're going to commit these changes and
add it to the match me repository which
you can can be able to find it in the
link below so what we're going to do is
we're going to add those changes you can
obviously do this in a commit line I'm
going to commit this and then either you
can be able to push it here or you can
be able to do in command lines so I'm
going to do get push and if we were to
refresh you can see that I do have the
changes here so basically as the lesson
progress we will basically add the
commits here and you can be able to find
each lesson's commit in the commits
history here all right so that's pretty
much all for this section we have take a
look at how to create a nestjs project
take a look at the nestjs intro and also
create the nestjs application as well as
take a look at the Tailwind CSS setup
and then we also take a look at the nest
library and the react icons and add it
inside of our application then we also
went over how to uh use njs routing and
also creating our sub routes as well and
having our page to be named as page. TSX
inside of a designated route folder and
then we also add a top nav bar which in
this case user can be able to navigate
to different part of our application uh
using the nav bar and then lastly we
also commit all the changes into a
source control so that we can have a
backup for all the changes that we make
and up nextest we're going to take a
look at authentication using Nest off or
in this case is called the offg so let's
take a look at the nest all right before
we continue if you find this video
helpful please make sure to like this
video and also comment down below if you
have any questions or any suggestions
for the video and if you do want to
receive more videos like this please
make sure make sure to subscribe to this
channel your subscription means a lot to
this channel thank you very much and
let's continue all right welcome to
lesson two which is about adding login
and register form so in the previous
lesson we learned about how to add
routes and using the njs routing and two
of those routes are register and login
and that's what going to be our main
focus of this lesson we're now going to
focus on the functionality side of
things where user can be able to
authenticate themselves or register
their accounts but we're just going to
focus on just adding the form
specifically we're going to use tools
like like the react hook form where we
can be able to handle our form more
easily using a hook format and of course
we can also be able to use the
validation that come with the react hook
form but in because we're using a
typescript we can be able to use
something called Zod which we can be
able to create a typescript schema for
our form validation and this schema can
be able to use anywhere inside of our
application and it's for example like
server actions and such which will make
it easier for our development and as a
result this is what the application will
look like by the end of this lesson
we're going going to have a simple login
form where user can be able to enter the
email password and click on the submit
to see the uh to view our form data and
same thing for register where user can
be able to enter the register
information once the user click on
register they can be able to be to view
our form data and for this learning I do
have a repository for this so feel free
to view the commits for each lesson all
right so first what we're going to do is
we're going to focus on how to add a
login form inside of our application so
that user can be able to enter their
email password and valid themselves so
here you can see we're on the uh login
page and you can see that we have the
login page display on the page so what
we're going to do now is we're going to
create a new component called login
form. TSX so for this component it will
have the form we're going to create a
form inside of this component and
basically display this form inside of
the login page
component and here you can see we have
our login form text display on the page
so now we're going to focus on adding
this compon on it with details and here
you can see I just went ahead and
basically making our login form look
like a form so I basically using a uh
card from the nest UI as well as the
button and the input and if we were to
look at the login form this is what I
added so I have imported the button call
a card car body car header and input
from the N UI and then you can see I'm
also adding a icon for the lock and then
these are the text that we have
displayed so here is our car head which
you can see we have the login so this is
login with the icon as well as this the
paragraph and then here you can see for
the C body I have added the input email
password and a button which is a uh
default color for the login so what
we're going to do is we're going to
install some packages so we're going to
um cancel this and then what we're going
to do is we're going to install the
react hook form and Zod and the hook
form for the resolvers so so we're
basically going going to use the react
hook form to build our form and use Zod
which is a typescript first schema
validation to validate our form data and
then we're going to install the hook
form resolvers uh for the form
validation resolvers so we're just going
to go ahead and install this okay so
once we have this installed you can also
see that inside of our package.json that
this has been installed so after we have
this installed we're going to use the
use form and the submit Handler from the
react hook form so we're going to import
it here and then what we're going to do
is we're going to for each of the input
we're going to specify the name so in
this case for the email we're going to
say this is the register and of course
we're going to also add the register and
the handle submit uh before the return
function here so you can see that we
have our submit form so we're going to
worry about the type later so we have
our register so this is going to be the
email and this is going to be the
password so we have our password and
then for our login which is going to be
a type submit and then right above the
form we're going to add the submit here
and then we're going to define the
unsubmit which we're just going to
simply console log the data and we're
just going to put it for any for now so
if user going to submit the input the
password when they click on the button
uh it would basically trigger the handle
submit which will basically trigger the
unsubmit function which takes the data
for the form data and we basically
console lock that so now if we were to
run our application again you can see
that we're getting an error so to
resolve this we're going to add the used
client above the file to tell that this
is a client application and now if we
were to type something for the password
and the email if we were to click on the
login you can see that we have an object
displayed at the console below all right
so as of now so you can see here if I
were to not enter the email and click on
the enter you can see that we don't have
any validations right so you can see
that you can be able to still enter a
input where the email is empty so to
avoid this we can be able to use the
validation for the react hook form so if
we were to do so you can see we can
specify that this is required so you can
see that we can be able to set the
required true and if I just enter the
password you can see that we don't have
any data output that's that means that
this form has an error so we need to
display the error on our form so here
for the use form there is a form state
so here you can see we can be able to
add the form State and inside the form
state from the react hook form if we
were to look at the form State you can
see that we can see is valid and we can
also be able to see the errors for each
deals so we can use that so here if we
were to come back and if we were to say
it's valid and
erors and here we can also be able to
set a message so we can say that email
is required and then for password we can
do the same password is required and we
can also be able to set a minimum length
so we can be able to set so the length
it must be uh minimum of eight
characters and if it's less than that so
we will display the password must be at
least a character law so if I were to
enter something on the page you can see
that we do not have anything display on
the console because we got an error on
our form so to do so we're going to say
that here is
valid we can be able to see if the air.
email is true if it is then in this case
we're going to display the air message
and we're going to display the air
message here and uh same thing for the
password so we're going to say it's
valid for the password and the air
message we're going to do the same thing
and then for the button here we're going
to say is disabled is equal to is valid
is false so if it's not valid then we're
going to disable the the button so here
you can see we have our button disabled
and if we were to enter something like
Eric whatever uh and then the password
you can see that we have changed the
button to be enabled so if we were to
click on this you can see that we have
our data output and if we don't have
this for example one of the form is
empty you can see that we have email is
required and if the password is empty
then password is is required and if it's
less than eight characters you can see
that the airor displayed that password
must be at least eight characters long
and you can see the button is still
disabled here so this is how we can be
able to add validations uh for the react
hook form but obviously this is not
really pretty because here you can see
we have data as any right we have to
create our custom type for message you
can see that we don't know if this is a
string or anything else so we don't have
we don't know exactly the type of the
email is so we can be able to Define
this using Zod and here you can see in
the folder for the source we're going to
create a new folder called lib which
contains all the functionalities that
we're going to share among the
components or the application that we
