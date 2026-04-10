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
chunk: 8
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
data for this tab we displayed this data
right and we can be able to see it here
and here you can see we just passed the
tabs to the items and for each of these
items what we're going to do is we're
going to pass the item key as well as
item label and then inside of it we will
basically display a list of members if
there's no members we're going to say no
members for this filter right so
obviously if I were to dislike this
person and if I click on Mutual likes
you can see that this uh we will see the
no members for this filter right which
is this text right here and then we also
uh going to display the list of members
here so you can see for each members
we're going to use the member card
component that we Define later in the
past so we use this component inside of
the mattress so inside of mattress we
use this component and we use the same
component here inside of the list tab so
now I'm just going to like this person
back and if I were to come back to lists
and click on Mutual likes you can see
this person also liked us as well so
it's going to be a mutual like and now
let's take a look at the handle tab
change so you notice here that this is a
key so I import this key from react and
basically the way how it works is that
it's a value which uniquely identifies
node among other among items in the
array so this can be a string number or
an integer right so you can see that
this is the key and this key is the tab
key that we defined here so which is a
string and what we do is that we get a
prams from our search and then we set
the prams for this key value right so
the key value is going to be type we're
going to set the value for type to be
key. string which is this key right here
and then we replace that with our
current router and if you were to uh
show you if I were to trigger this which
is coming from tabs un selection change
so if I were to change the selection you
can see that we are getting different
data right we're getting data
differently from the routes so it
changed Type To Source targets mutual
and such right for example if I want to
add loading to different navigations in
this case especially for a query prams
because in the past uh if I were to
select a user so here we're basically
changing the routes right so it's SL
photos SL chats we can be able to add
loading in our
nestjs but if we're on our lists and you
can see here that we're using a query
parameter right or search params then in
this case uh we will need to add loading
manually so to do so what we can do is
we can be able to introduce something
called use transition Hook from react so
what I'm going to do is I'm going to
import use transition from react so if
this start transition happen or or
triggered then is pending will be true
if the uh start transition uh is done or
the function is completed then the is
pending will be false right so we know
that we can be able to use this to add
our loading components so what we're
going to do is inside of handle tab
change we're going to put this inside of
a star transition and this star
transition takes a function so we're
going to put everything that we Define
here inside a star transition
so what's going to happen is that if
this function triggered star transition
will also be triggered and is true or is
pending is going to be true so we can be
able to use this inside of our
components so here you can see I just
goone ahead and basically add the is
pending so if it's pending then we're
going to display the loading component
if not we're going to display what we
have already which is just rendering all
the member card and for loading
component basically is simply a spinner
from react or NES UI library and you can
see here that if I were to navigate to
different tabs you can see that we have
a little bit of loading at display at
the center of our page if I were to
click on Mutual likes you can also see
the loading there so in this case we can
be able to customize our transition
adding our loading feature inside of our
application to make our UI better so
just for testing purpose so I'm just
going to navigate to the mattress and in
this case I can be able to like multiple
people right and now you can see 1 2 3 4
five six so total of six likes and if I
were to go to lists and you can see that
I have liked six members and if I were
to try to log into one of those member
for example Davis and if I were to log
to Davis you can see I click on list and
this is the person that I liked and this
person and this member also liked me and
this is the mutual like all right so now
what we're going to do is we're going to
commit all these changes so we're going
to do get add and we're going to do get
commit and for the commit we're just
going to say lesson five add like
fature and we're just going to say get
push to push our changes and now we
should be able to see the changes here
appear on our left so if I were to
refresh you can see we have our commit
history for lesson five so if there's
any part in this uh section where I went
a little too fast feel free to check the
source code of this so that's it for
this session I'm very glad that you made
this far and uh you might notice that I
changed the theme of this Google doc to
a dark theme so let me comment down
below if you like the dark theme or the
light theme so um I'm still try to
decide for that and to summarize this
lesson we basically add the light
feature and the things that we
accomplished in the section is to update
our Prisma schema for a like table by
adding a many to many relationship and
we also add the like actions inside of
our application and be able to use it to
add a like toggle feature in the UI as
well as adding a feature to view all the
likes as well as adding a used
transition hook for triggering the
manual loading when we navigate to
different tabs in our like list and
lastly we also test our like feature and
commit the changes to our source control
and up next we're going to take a look
at how to add a upload feature where
user can be able to upload an image to
our database all right before we
continue if you find this video helpful
please make sure to like this video and
also comment down below if you have any
questions or any suggestions for the
video and if you do want to receive more
videos like this please make sure to
subscribe to this channel your
subscription means a lot to this channel
thank you very much and let's continue
all right welcome to lesson six where
we're going to add the upload image
feature so so far what we have is we
have authentication our different routes
our list where we can be able to view
all the likes and all the members and
here you can see user can navigate to
different members and be able to view
their images and we are going to add the
image upload feature so user can be able
to upload more photos of themselves onto
our platform and we're going to use a
tool called Cloud Nary to store our
images in the cloud so the way how it
works is that user is going to upload a
photo to our application we're going to
pass the image information to our API
and our API would return a signature
which is our key to our application so
that we can be able to take this key and
the image to our cloudinary to validate
that this key is accurate and knows
where to store this image and as
returned cloudinary is going to return
us the public ID and the secret URL
which is going to be the image URL that
we can be able to display the image into
our application and take those
information and store that inside of our
database so by the end of it we're just
going to store the ID of the image from
our Cloud Nary as well as our secure URL
which is the image URL that we can be
able to display inside of our
application and to delete the image
we're going to also do both ways so
we're going to delete it inside of our
database for those two informations and
as well as take the public ID and the
secure URL to find that image in our
Cloud n to delete it and this is what
the result look like so when user
navigates to the edit photos page they
can click on the upload new photo then
we will have a cloud Nary widget popup
to allow to upload a new photo and we
can also be able to view all the photos
uh inside of our application and we can
also be able to view the photos that we
upload inside of our Cloud Nary as well
so that's going to be the overview of
this lesson so feel free to take a look
at the commit history for this
corresponding lesson so now what we're
going to do is we're going to be able to
add a feature for upload image so user
can be able to upload image can be able
to change their image and such and the
location where we're going to add this
is when user navigate to the edit page
for the members uh they can be able to
upload their image so in this case we
haven't added this Sprout yet so what
we're going to do is we're going to go
to the members and inside of the members
tab we're going to create a uh new one
called edit and instead of edit we're
going to have the page.
TSX and here we're just going to say uh
this is going to be an edit
[Music]
page and if we were to save this you can
see we have the edit page display on the
left just to be specific I'm just going
to rename this to uh member edit page so
the way how the uh member edit page is
going to look very similar to the
profile page and we're just going to
change the nav link here to be a little
different so for example we can change
it to something like edit profile and
here we're going to change to the uh
upload photos right we have defined the
member sidebar right here which is
outside of the uh edit and the user ID
folder so in this case we can be able to
use the same component for the member
sidebar simply we can just copy the
layout from the user ID and just paste
it here for now and then we're just
going to make some modifications here so
first we're going to remove the user
pram from the uh parameters because
we're just going to use the current user
ID so we're just going to get the
current user ID by using the get off
user ID function from our server action
and then uh we're going to of course
we're going to use the member sidebar
and passing the member and then here's
our children which is very similar so
the grid here is very going to be very
similar to what we have here and then
inside of the layout what we're going to
do is well is going to pass the uh
navigation links to the member sidebar
because so far you can see that we
defined the nav links inside of the
sidebar which in this case uh we are
going to reuse this component so we're
going to put this logic outside of the
component so what we're going to do is
uh we're going to Define here and then
we're going to basically pass the na
link obviously we haven't uh defined the
property for this so we're going to put
the nav links inside here and in the
member sidebar components we're going to
find the na
link and obviously have done this
already for us so is an array of object
where each object has name and the hre
and then here we're also going to define
the uh nav links here and then we're
going to Define this logic outside so if
we click here we notice that there is
another uh layout in the user ID page so
we're going to make this change so we're
going to define the links here and we're
going to pass the nav links to
here okay save and then here for the
member sidebar we can we can be able to
use nav links inside of our application
and then for the member edit page we can
just be able to add a car header and
divider and the car body right so very
similar to what we have in the uh
members page so now inside of the uh
member edit page what we did here is I
add the car header as well as the
divider and the car body so now you can
see if I were to navigate to the members
edit page uh this is what it looks like
so it's very similar to the uh profile
page where we have the profile name the
basic information and then we can be
able to click on different links so we
have the edit profile page and for edit
profile page this is what we have right
so we have the edit page here defined
inside the C body and then we can be
able to upload the photos we haven't
defined this route yet so now we're
going to do is we're going to first add
add the edit profile page form so that
we can be so user can be able to come
here and edit their basic profile
information and to get started we're
going to create a component called edit
uh form so this is going to be Capital
because it's not a page so it's going to
be edit form.
TSX and we have the edit form okay so
that's going to be our edit form and
then we're just going to use that inside
of our uh edit page for the user ID so
inside of the edit form comp component
what we're going to do is we're going to
define the props first so this is the
props for this component we're going to
take the member as a type member and
notice here that this type member is
from the Prisma client and if we were to
hover here you can see that we have the
ID user ID name and such right so for
this form we're basically just going to
edit the name and the description City
and Country obviously we can be able to
change other things but for now we're
just going to change the just uh user
can be able to change the name
description City and Country so what
we're going to do is we're going to take
the member from our props and then we're
going to uh fill this data filled our
form with our existing member data so
first we're going to create our form and
uh to create our form what we're going
to do is inside of our uh live folder
we're going to create our schema so here
you can see I've gone ahead and just
created the member edit schema is only
specific for this form so I have the uh
name description City and Country and
just some basic validation message here
and then here I also cast a type for the
form data so for this form schema uh
this is the type for that so what we're
going to do is inside of the edit we're
going to use the use form Hook from
react all right so here you can see I
just gotone ahead and basically added
some uh variables that this form is
going to return for us so you can see
the register handle submit and such
we're going to use inside of our form
and here is our use form and we have uh
cast a type for this form which is
member edit schema which is what we
Define inside of our me member edit
schema. TS and here we also use the Z
resolver so that we can be able to add
our form validation uh functionality so
now we're going to do is we're going to
add our inputs and test our
functionalities so what we're going to
do first is we're going to first Define
our onsubmit function so for on Summit
function we're going to take the data
then we're just going to console log the
data in our console and then inside of
our TSX we're going to use this unsubmit
function here inside of our TSX what
we're going to do is we're going to
define the form tag and then for the
unsubmit we're going to call the handle
submit from our use form and we're going
to call trigger the unsubmit uh function
that we defined here so this function is
going to log our data but eventually
what we're going to do is we're going to
send it to our uh server persist our
data inside of our database so what
we're going to do inside of a form is
we're going to create those inputs so up
here we're going to import the button
input and text area and and then inside
here just like how we Define our login
uh or register page we are going to use
the input and each input has a label or
has a and also has a name so it's going
to registered uh using the function that
we have here so we're going to tell the
form that this is going to be this
property right so it's going to be the
name property this is going to be the
description property and or the
description input or the name input and
such and the value is going to be the
member. value which is what we have
inside of our uh default value here or
in inside of our props so this is going
to be the member. data if there's an
eror for this field then we're going to
have the is invalids true if not we're
going to have false and if it is then
we're going to also display the message
for the for this field and uh we also
have the uh input for City and Country
and here is the area where we're going
to display any server errors and here at
the bottom we have the button to update
our profile so this is just a simple UI
doesn't have any functionality uh it
doesn't call the server so what we're
going to do is inside of our page which
in this case is going to be the member
edit we're going to uh put this here
inside here so here inside of the member
edit page uh what we're going to do is
we're also going to pass the member to
the edit form uh component so we're
going to get the user ID from our
current authenticated user and then
we're going to get a member from our
server action and then we're going to
see if it's member exist if not we're
going to redirect to the not found page
if it is then we're going to pass it to
the edit form and then once we have the
data you can see that on the right on
the left we have our air which in this
case we also have to make sure that this
is a uh client component so we're going
to say that this is use
[Music]
client and we're going to tell that this
is a client component because we're
using the uh use form so in this case
you can see we have our data display on
the left and notice here that because
we're using default value here uh we
don't really change the form State we're
basically just initialize our form input
values here when we render this
component so what we're going to do is
inside uh of our component I also have
onee and create a use effect so in this
case when we runer this component this
use effect will be triggered and we have
our dependencies here so because using
member and reset we're going to add
those two properties inside of our
dependencies for our use effect and
inside of our use effect uh when this
component uh rendered uh we're going to
have this function called and if the
member exists we're going to reset our
form data so what's going to happen is
that we're going to take the form data
that we have inside of our props So This
Is Our member uh we're going to
basically set those uh form state or
form data to the data from our our props
so just to test it out uh what we're
going to do is you can see here we can
be able to add more items into our form
and you can see that we have our button
uh enabled and if I don't touch anything
or here you can see this are just
default form data right then in this
case our button is disabled because we
haven't changed anything inside of our
edit profile so what we're going to do
is I'm going to make some changes so
