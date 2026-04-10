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
chunk: 6
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
so what we're going to do is we're going
to install the TS node inside of our dev
dependencies then we can be able to run
TS node to run our C.S file now so once
we have that we're going to run MPX
Prisma DBC then we're going to call this
command to seed our data so once we run
this the seed command has been executed
and then if we were to refresh our
database you can see that we have data
records added inside of our member
photos as well as user so if we were to
click to the user and these are all the
data that we have added from the members
data and one thing good about the Prisma
studio is that we can be able to also
see the relationship so here you can see
for the user uh if I were to click on
the account you can see that this so so
far this uh user have no relationship
with any account but for member it does
so if you were to click on the member
you can see that it tells you which
member This Record is related to right
and uh you can also change it here here
if it's needed uh and and then for the
members uh we can also be able to see
the relationship for the user and then
for each uh member we also have a
relationship with the photo record so if
I were to click this uh we know that
where this photo is referenced to so now
if we back to the uh the application if
we were to log out and try to log in to
one of those users for example if I were
log into this person and the password
just password
and here you can see we have already uh
logged in as this person and notice that
the profile image have been changed to a
avatar and by the way the images are
stored inside of the public folder and
images here we have the all the images
for the corresponding user so now what
we're going to focus on is how we can be
able to render the data inside of our
members page so here in the uh actions
folder I just go ahead and create a
member action and the action is
basically called get get members and
basically what we do is we're going to
get this uh current user right so from
the session and what we do is that we're
going to get the Prisma uh and then
we're going to find all the members
where the current member is not a
current user so we're trying to find all
the members and exclude the current user
so once we find that we're going to
return that if there's an error we're
going to throw the error so basically
once we we have this we can be able to
call it inside of our members
page so we're going to me navigate to
our members page and here we're just
going to change what we have inside of
our TSX and here you can see I basically
called the G member server action and I
basically render all the members inside
of our members page and then here you
can see I just gone ahead and basically
uh call the G members um to get the
members and then if the members is uh
exists then we're going to map through
all the members and print all the names
so now we're going to do is we're going
to focus on how to add styling to our
members page so that we can display all
the members on our page so to do so
we're just going to create a new
component called member
card and this component will dis pass a
card component that display the member
so then here you can see I basically
gotone ahead and add the member card and
this member card basically takes the
prop for member which you can be able to
find it is from the Prisma client and
then what we do is import the card card
folder image from the nest UI library
and then basically using this card
components uh from the card library to
display the card and then we have our
image which is coming from the uh UI
library and then we are using the member
data so you can see we're using the
member. ID for the reference so we can
be able to reference or navigate to a
individual page and we can also have the
uh the member. name and the member image
as well as the uh calculate age so we
can be able to pass the date of birth
which pass to a UIL function to
calculate the uh the AG so notice that
we're using is pressible so basically if
we pass the is pressible prop to the
card it R it will be rendered as a
button so if we were to click this it
looks like a button right so you can see
that it is really responsible flexible
so you can so that you can see that it
is really uh flexible here so that if we
press it you can see that it act like a
Buton right here so that's basically the
member card now if we were to add
navigate to the page members page uh
we're just going to import the member
card and ask some styling here and here
you can see I basically CLI G ahead and
ask some styling for the grid and then
for the members I basically import the
member card component that we just went
about and then here you can see I passed
the member data as well as the key so
now if we were to refresh the page so
now you can see that after we refresh
our page we can be able to see all the
uh member card display on the page so
notice here that the text is kind of
displayed or Blended to the background
so what we can do is either we can be
able to change the TCH text color or we
can be able to add some background uh
color to the text so that we can be able
to see the text more easily so what
we're going to do is we're going to add
a background gradient uh or dark
gradient to our background image and if
I were to save this and you can see that
we can be able to see our text more
clearly now and notice here that we
basically set this to a button and uh we
have a link to it notice that for each
of profile it is a link so it reference
to their specific members page right so
members slth member ID if I were to
click this um basically we're not
getting anywhere we will get a 404
because we haven't defined that page yet
so we're going to Define that Nest but
before that I'm also going to talk about
um the calculate age so we passed the
members. of birth right and this
calculate AG is lives in the uh UT
folder or or I should say the utel file
and then here we basically I also gone
ahead and basically installed the date
uh hyphen FNS and there's a difference
in years so we basically pass the
current date as well as the members uh
date of birth and this will basically
function will calculate the uh
difference so we'll calculate the
numbers of years in difference right so
basically you can see we have 32 33 32
years old and such right so these are
all the members and to create the
individual members page so we're going
to do first is we're going to create a
folder called user ID uh with a square
bracket so that this will basically be
the members slash the user ID right and
then we're going to create a page for
that so it's going to be page. TSX and
here you can see inside of the user
folder user ID folder we have a page.
TSX and now we're just going to create
the page itself so we're going to name
this component called member detail page
and then notice here that um I just go
ahead and basically put the type for the
prems so the Prem will take the user ID
which we specify here so notice here
that this is the user ID which if it's
navigate to the members slash the user
ID we will be able to catch that and we
can be able to get a Prem for that right
so here we're just going to display the
user ID onto the page so we have the
user ID and we're going to display this
on the page and now if I were to click
on one of the user for example this
person
you can see that we have the user ID
displayed on the
page and if I were to click on a
different person you can see a different
user ID display on the page and because
we're going to display the user detail
on this page what we're going to do is
we're going to go to the member actions
again and basically going to add
additional function to get a specific
member so what we're going to do is
we're going to take the user ID and then
we're just going to find that inside of
our Prisma to find this member and based
on their user ID and if we find it we'
return it if not we're just going to
conso log the air so once we save this
we're going to navate navigate back to
the member uh member page right member
detail page we're going to use the
server action to uh retrieve the member
detail and here you can see I basically
just uh called the get member by user ID
uh server of action and get the member
base and we pass the pm. user ID in it
and then once we get the member uh if
it's not found we can actually be able
to redirect to the not found page from
this navigation and then we're just
going to display the member data so in
this case I'm just going to display the
member. name and here you can see we
have the Davis right the name display on
the page so if I go to the members again
and select for example Mile and here you
can see we have the person's name
display on the page and let's say if I
change the ID to something else for
example I delete some characters and
this will navigate me to a p P that is
not found because we're not able to find
this user right so in this case we're
getting a null we're going to navigate
to a not found page and then what we're
going to do is we're going to focus on
creating the cbar for our member so
inside of our uh members page we're
going to say member sidebar. TSX and
because we're going to use the member
sidebar inside of the members detail
page uh we're going to create a layout
and we're going to have the sidebar
display on the side and then the actual
member detail page display in the main
content and the the reason why we have
the member Side by outside because we're
going to reuse it elsewhere so in this
case we're going to uh inside of the
user ID folder we're going to create a
layout component and here you can see I
just go ahead and design the layout and
the layout basically takes the children
and the prams right so just like how we
take the page it also takes the param as
well but it also has the chosen chos is
going to be our page TSX inside of the
user ID first we're going to do is we're
going to get the member detail and then
if the member does not exist we're going
to navigate to not found page and then
we're going to design a grid right and
then this is basically the card and the
card will have the children which is
basically what we have uh defined inside
of the page. TSX so if I were to change
this to something like this is the
member detail page we will be able to
see here on this section because this is
the members detail page and uh if we
were to look at the layout you can see
that this is what we did right and on
the left side we have the member sidebar
and the sidebar here we I just went
ahead and also Cod it up as well so
basically this is just a navigation uh
for the members detail so user can be
able to see the members profile basic
information as well as the profile
photos and chats right so we're going to
design those things later and you can
see that for the navigation links uh we
have the profile which is the base link
right so it's going to be the members uh
Slash the member. ID the user ID uh and
then we also and then we also have the
photos so that's going to be the base
path slash the photos so if I were to
click this it will be the members and
the ID slash the photos right so then we
also have the chat so it's going to be
the base link or the base path SL chat
and then here you can see we also have
the card so we have the image and then
we also have a car body for the cbard so
to design the member Details page uh
what we're going to do is I basically
gotone ahead and just go to the add the
car header which is a profile and we
added divider and the car body which is
the member description so if I were to
click on one of the person you can see
that if I were to well well we're on the
profile page and you can see that this
is the members description right so this
is the header and this is the C descript
deson and now what we're going to do is
we're going to design the photos so if I
click on the photos you can see that it
is 404 so we're going to design that and
to design the photos I believe the route
is navigate to the photos so what we're
going to do is inside of the user ID
we're going to create a folder called
photos and we're going to have the page.
TSX so inside of the page. TSX we're
going to create the RFC so that's going
to be our page so here we have our page
for the photos and then for our photo
what we're going to do is we're going to
add a function inside of our server
action to fetch our uh user photo right
because these are links so if user have
the link they just navigate to that link
directly without navigating through the
our page then we have to have each page
to call a server action to fetch their
own data right so what we're going to do
is uh we're going to add a function
function to get the members photos so
notice here that we basically select the
photo as true so basically what it means
is that it only give us the photos so if
I were to hover the member you can see
that we only have the member object and
inside of the member object we have the
photos array so if it's n we're just
going to return all uh if not we're just
going to return the member. photos and
we're going to map each of them as the
photo array and here inside of the
photos page um I you can see that I just
gone ahead and add added the photos page
as well and then basically I have the
car header and the car body and the
header is the photos right and the body
is the list of photos where we're going
to display the photos inside of the car
body and we're going to call the game
member photo by user ID once we have the
photos we're going to map each of the
photo and we're going to display the
photo on our page and lastly we're also
going to add our chat page so inside of
the uh user ID we're also going to
create a folder called chat and inside
of that we have the page. TSX and inside
of this we're going to have the chat
which simply just going to be just a car
header and the car body so if I were to
click on the chat you can see that we
have the chat the header as well as the
message and if we were to click on the
photos this is our photo this is our
profile right and such we can be able to
go back we can be able to click on a
user and you can see that we can be able
to navigate each of the links links each
of the sub link or each of the site site
navigation easily so now what we're
going to do is we're going to try to add
a loading inside of our application so
when user navigate to different links we
should be able to see like a loading on
our user uh level right so obviously we
can be able to add it in many levels but
in this case we're just going to add it
inside of the uh members details level
so whenever we navigate to different
like for example profile we should be
able to uh see a loading so inside of
the user ID folder we're just going to
create the loading. TSX so this loading.
TSX basically what happened is that
every time when there's loading uh we're
going to have the loading uh component
displayed uh on our page so njs will
basically know how to do that and here
you can see inside of the loading
component I basically add the spinner
from The Nest UI and here you can see
this is our spinner component so we're
just basically adding the spinner and
then we basically have the uh div
classify the position so here you can
see these are the position right so
that's pretty much it and if we were to
navigate to our page
refresh uh maybe we don't see it now but
you can see that we have see the loading
a little bit display on the center and
here you can see we also have our
loading display in the center as well so
if we were to navigate to the air
handling page inside of njs
documentation you can see that we have
the air boundaries so njs uses the air
boundaries to handle uncut exceptions so
if we have any exceptions throw inside
of the child components it would display
a fallback UI instead of the componentry
that just crashed right so here you can
see we can be able to create a air
boundary by adding a air. TSX or jsx if
you're using the NES nestjs uh reactjs
version of that uh we can be able to add
the air. TSX file inside a route segment
and Export a react components so what
we're going to do is that inside of our
roof app we're going to create a
component called air. TSX and inside of
that I basically give some styling so
what we're going to do is we're going to
manually trigger this air so for example
let's say in the members page we're
calling the G member uh by user ID for
example so here you can see inside of
the G member by user ID what we're going
to do is we're going to mainly throw the
air and then we're going to also throw
the air in the catch as well so not just
logging but also be able to throw the
air so if we were to click on the member
detail page uh you can see uh we're
going to get an air and we're going to
navigate to the airor component so if I
were to look at the air components this
will basically R render inside of our
app so if I click this you can see that
we have an air and this is our air we
have the air message we can be able to
click here to try again so you can see
here that click here try again will
basically call the reset and this will
basically reset so if we were to look
here we can be able to also reset or
retry our uh segment so we can be able
to try to render the segment right so
you can see that pretty much we
basically built our members page so we
have the members detail we can be able
to see the photos we have we have the
loading and we also have our chat and we
can be able to navigate back and uh user
can be able to uh click on any of those
profile and see the memb detail you can
see that the grid will also shrink as
well so that's pretty much it for the
section and we're just going to commit
these changes we're going to do get add
so for this lesson pretty much add the
member and photo model with the members
page so we're going to commit this and
we're going to do get push and this will
push all the changes that we have so now
we should be able to see all the changes
inside of our G history so if we were to
click this you can see that these are
all the changes that we have made all
right so that's pretty much it for this
section we basically focus on adding the
member Details page on this section
by first adding the member and the photo
table inside of our Prisma schema and
then we also take a look at how to see
data inside of our database and then we
were also able to get the dynamic routes
to get the user ID for the member page
to fetch the member data and display the
member on our member detail page and
then we also take a look at how to use
the njs layout page to basically add
