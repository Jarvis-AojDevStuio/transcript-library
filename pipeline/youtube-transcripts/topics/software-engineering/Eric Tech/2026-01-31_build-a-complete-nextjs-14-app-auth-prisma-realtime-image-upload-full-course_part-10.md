---
video_id: "HqlJjX9uIuk"
title: "Build a Complete Next.js 14 App (Auth + Prisma + Realtime + Image Upload) — Full Course"
channel: "Eric Tech"
topic: "software-engineering"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=HqlJjX9uIuk"
word_count: 3999
chunk: 10
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
from nest cloudinary and we pass the
photo from the props and if the photo
has the public ID then we know that this
is a cloud image then we can be able to
display the cloud Nary image from using
the cloud Nary image and we Define a
fixed width and then here we also have a
gravity so so basically we specify that
we're only want to focus on display the
face within the size that we Define and
then we give it a styling and then if
the image is not from cloud Nary then
we're just going to render it using the
uh neui so now if we were to save so now
if we were to navigate back to our
browser you can see that all the images
are in a square shape all right so now
we're going to do is we're going to
focus on adding the feature for the star
and a bin method so in this case user
can be able to click on the start in
this case we'll reflect the current
image as well as the image on the
sidebar and also it will reflect image
on the top right nav bar so in this case
user can also be able to delete an image
so in this case what we can do is inside
of the user action I have gone ahead and
basically created a function called set
main image and this uh function will
takes a follow so basically we first get
a user ID and then what we're going to
do is we're going to update the image in
two places one is in the user table and
the other one is in the the member table
and if you were to look at the schema
you can see here that for the user table
we have the image property for the
member we also have the image property
as well so this image property will
basically simplify the current image for
the user or the member so in this case
what we're going to do is we're going to
update two places and we're going to
return the most updated member data back
to the client and then here I also go
ahead and basically create a function
called delete photo which takes the
photo and first we get the user ID and
then we also going to destroy this
inside of our Cloud Nary base so it
doesn't waste any cloud storage and then
what we do is uh we're going to find a
current member based on the current user
ID and we're going to delete this photo
based on this photo ID so inside of the
member photos component uh I have
basically added the unet main function
so basically when user click on the
start it will trigger the onset main
function which pass the photo so if the
current photo is already the main photo
then we're not going to do anything if
not we're going to set the loading to
true so I also added the loading so if
it's loading we're going to set the
current photo ID as well as the type
Main and is loading is true and then
we're going to add loading to that
section and then we're going to send a
request to our server action to set the
current photo as the main image and then
we're going to use the router that
refresh to make sure the current page
will reflect our changes and then we're
going to set the loading to false and
then we also have the UND delete which
in this case it takes the photo and if
the current URL is equal to the main
image then in this case we're not going
to do anything so we're not going to
delete any any image if the current
photo is equal to the main image URL and
then we're going to set the image to
true and the type is to delete and we
also going to send a request to our
server action to delete this photo then
we're going to refresh to make sure our
page reflect the change and we're going
to set the loading to false so the
basically the way how it works is that
here you can see inside of edit uh we
have loading if the loading is loading
and the loading is equal to the current
fold ID then we're going to have loading
is true for our start button and same
thing for our delete and again the
delete here we basically have a spinner
if it's loading instead of the asual
icons and then one thing we have to
change before we move forward is that
the session here so notice for our top
navigation right so our top navigation
is this one right here so this entire
top navigation so so far we basically
getting the image and the user data from
our session right so if we were to look
at our uh side menu and these are all
from our session data so the session
token will have all the user data and we
basically pass the user to our uh
navigation or our user menu so in this
case if we were to update update our
photo we have to basically log out and
log back in to have the new session
token which contains the latest user
data so in this case what we can do is
is instead of doing that what we're
going to do is we're going to call the G
user info for nav uh and inside of the
user action I create this function which
which basically gets the uh current user
name and the image only and return this
back to the clients and then what
happened then is we have the user info
and the user info will have the name and
the image and we pass the latest
information back to our user menu and
for the user menu here I basically made
a change for the props so in this case
it basically uh takes so basically for
this object it only has the name and the
image or it could be null and here you
can see we basically pass the latest
name and the image to our Avatar and as
well as we also have to update the name
for the drop down so that's pretty much
it uh let's test it out for our
application so now if we were to click
on this for the main image you can see
that we have loading and then the
profile has been changed to a different
image and I can click on this one and
you can see that it changed to the main
profile and I can also delete an image
so if I were to delete this image you
can see that it's been deleted and if we
were to look at our uh
cloudinary right for the match me and
you can see that so far we only have two
images so far and if I were to delete
one more image for example this one
right here and now you can see if I were
to refresh uh we only have this one
single image inside of our Cloud n
storage all right so lastly what we're
going to do is we're going to commit
these changes and for our source path so
far we are on less than six and in this
case we're basically focus on adding the
image feature to our application so in
this case we're just going to say add
upload image feature for the section
ction so I'm going to commit all these
changes and you can also be able to
click on here to push or you can also do
this in a command line and here you can
see inside of a repository this is the
lesson six all right before we continue
if you find this video helpful please
make sure to like this video and also
comment down below if you have any
questions or any suggestions for the
video and if you do want to receive more
videos like this please make sure to
subscribe to this channel your
subscription means a lot to this channel
thank you very much and let's continue
all right welcome to lesson 7 where we
going to add the messaging feature so so
far we have done is adding the
authentication to authenticate the user
adding list page to view all the likes
as well as adding the members page where
user can be able to view a member
details and be able to uh view the
members photos and such but one thing
that we have't add is the messaging
feature so we're going to do this in
this lesson so you can see we're going
to create our message actions to
basically interact with our Prisma
database for the message tables so
similar to what we've done with the like
tables where we have a manyu to maintain
relationship between the members we're
going to do the same thing for the
messages table so in this case user can
be able to send a message and each
record will contains a sender and the
recipient and that's going to be our
first step to set up our messaging
feature then we're going to focus on
creating our message Chat form and user
can be able to send a message and
trigger a message send action and they
can also be able to view all the message
threats and be able to view all the
messages that are sent from our inbox
and our lbox and display all the
messages here and also in our chat page
and then we also have the functionality
to see all the inbox messages as well as
the lbox messages and the lbox messages
are messages that the current user sent
and the inbox messages are the messages
that the current user received so that's
basically the difference and that's
pretty much it for this lesson we're not
going to focus on the real-time
communication that's going to be the
next lesson we're just going to build
the basic feature by sending met the
message deleting the message be to view
the message and such and in the next
lesson we're going to f focus on the
live realtime communication part and of
course the code changes for this lesson
is in the commit history so feel free to
look at this all right so now we're
going to focus on is adding the message
feature to our application so in this
case user can be able to send many
messages to each other right so in this
case we're going to have a many to many
relationship where each member can be
able to send messages to many members so
in this case it's going to be just like
the like table where the message will
have the sender and the recipient ID and
we're going to Define this many to many
relationship using a message table so
what we're going to do is inside of our
code we have the schema. Prisma and
inside of this I have go ahead and
basically create a message model and
this message model has the sender ID and
the recipient ID as well as the
relationship and here you can see for
the sender or the recipient it will
basically has the sender ID as the
fields or the recipient ID as the field
for the recipient and then we also have
the reference for for the user ID from
the member table and then here you can
see we set the undelete to null so
basically what it means is that if the
member is deleted this will not delete
the record for the message the message
will still exist so what we're going to
do is we're going to first run the MPX
Prisma generate and this will basically
generate the Prisma client for US based
on the changes that we made for our
schema and then we're going to push our
changes to our database so we're going
to run the MPX Prisma DB push and then
after this is done what we're going to
do is we're going to run the the uh MPX
Prisma Studio to check all the changes
that we have made so now if we were to
refresh and you can see here that we
also have the message table and if we
were to look at the member table so for
example member and for each member here
you can see we also have the sender
message and the recipient message so one
thing that I forgot to talk about is the
schema. Prisma I also made a change for
the member where here we're basically
adding the relationship so the uh each
member has the sender messages and also
the recipient messages all right so next
thing we're going to do is we're going
to open our schema inside of our
application and we're going to uh update
our schema so inside of our lift folder
we have a schemas folder and inside of
that I have gone ahead and create the
message schema and basically we just
have the simple text for the message so
now what we're going to do is we're
going to navigate to the chat page
component and here you can see we have
our car header and the body and you can
see that we have been using this for
many times times and if we were to
navigate to here you can see we have our
chats we have our photos for this person
and we also have our profile which in
this case this card content or this uh
uh member page content it has basically
the same um format right so in this case
what we can do is we can be able to uh
create a reusable component to basically
have the C body the divider the uh the
content in the future maybe we could
have a a footer right so what we're
going to do is inside of the component I
have gone ahead and create a new
component called car inner wrapper and
this takes the header body and the
footer and this will basically make our
components more reusable right so inside
of our member page we have been using
the car header divider and body and we
can be able to put it inside here so
that here we have our header here is a
divider here is our body and here is our
footer if we have a footer right so now
what we're going to do is uh we're going
to just basically use this compon
component inside here so we're just
going to say this car
wrapper we're going to import it and
we're just going to mention this is the
header so the header is just going to be
chat and the body which in this case is
going to be just just going to be chat
goes here then for and then here we're
just going to remove this so now if I
were to navigate
here so now if word navigate to the chat
we still have the same right so now
we're going to make sure the profile
photos they're all using this so and not
only that we're also going to make sure
the edit page as well we also using the
same format so here we're just going to
uh use this
component so we have the car inner
wrapper just to make our component more
reusable and we're going to have the uh
edit profile as the header and the body
is going to be just
this so we're going to have
[Music]
the and we're just going to remove
this as well as the fragments here just
to make it reusable and we can be able
to remove the unused
Imports as well as
here and then same thing for this
one okay so pretty much that's all the
changes that we're going to make and if
we were to take a look at the source
control these are all the changes that I
have gone ahead and made for the member
uh chat page photos page as well as the
edit photos components and such so if we
were to navigate back and refresh you
can see that we still have the same
changes right for the profile
description for the photos and for the
chats we still have the same layout so
then what we're going to do is we're
going to focus on building our chat here
so inside of our application we're going
to build a component called chat form
which I go ahead and basically create
this component and for this component
basically what it does is that it has a
form and this form has an input and a
button to submit the form and then it
also has a section to display all the
errors and here you can see this is the
message schema that we defined and we're
going to use that to create our form and
we have a register for each field and we
have our handle submit and then we have
our form state right and here we're
going to use that inside of our chat
page so instead of chat goes here we're
going to use the component itself and
now if I were to refresh we should be
able to see our chat here and we can be
able to type a message and submit a uh
chat so if I were to open our terminal
and if I were to click on this you can
see that this is the text and now we're
going to basically going to focus on
adding the functionality so inside of
these message actions I have gone ahead
and create a server action called create
message it takes the recipient user ID
as well as the message data so first
what we do is we know that the current
user is the sender so we're going to get
the current user ID which is our sender
ID and then first we're going to
validate data if it's not successful
we're going to send the air back and
then we're going to get the text and
we're going to put text as well as the
recipient user us ID and the sender user
ID as the uh sender ID for the message
record and after the message is created
we're going to send the message back
with the status success so inside of our
chat form you can see here for our
unsubmit function I have gone ahead and
use the create message server action and
pass the user ID and data and this will
return us the result and if there's an
error we're going to handle the error if
not we're going to reset and refresh the
page so that our application will be
sync with the message that we sent so
because we want to display the message
in the body what we're going to do is
we're going to make sure that the form
is in the pholder so inside of our
application we're going to go to its
component's parent and be able to set
the footer as this and the body will
still be the same so the body let's say
welcome to chat for example right so in
this case we have the footer body and
now if we were to navigate to our uh
application you can see that this is our
footer and this is our body so our body
will basically contains all the message
that we sent so now we're going to focus
on is we're going to add the messages
here so that we can be able to send a
message and this should render all the
message that we sent so here what I'm
going to do is I'm going to send a
message so I'm just going to say hi for
example Todd right and we're going to
send this message and we are going to
look at our Prisma studio for our
message records and you can see that we
do have a message sent this is the
member ID right so we are sent from our
uh person called Sarah and the recipient
is called Todd uh so now what we're
going to do is we're going to go to our
server action to create a function to
render all the messages so inside here
I'm just going to create a new function
and inside of this function you can see
it takes the recipient ID and then it
gets the current user ID as the sender
and we also have the messages so these
are all the messages so here we have our
Weir clause and we're trying to select
all the messages either the current user
is the recipient or the sender with the
current recipient user ID and then we're
going to order all the messages by a
sending order and then we're only going
to select these properties so we're
going to select the ID text and such and
for the sender we're only going to
select the user ID name and the image
and after that's done we're going to uh
return all the messages back to our
client so now if I were to go back to
our form chat or its parent component
and I'm just going to make this as a
async function because we're going to
call that server action and render all
the messages all right so then inside of
the chat page you can see here I goone
ahead and basically get the user ID from
the prems so this user ID is the
recipient ID and we're basically going
to pass it to the get message threads
and then we're going to log this inside
of our console and here you can see
inside our console we have the message
array and this is our message object and
for this message you can see we have our
text date as well as sender and
recipient so in this case we're going to
make some modification to the object
that we're going to return so that the
application will be able to use the uh
modified version of the data to display
the data onto our application more
easily all right so to give you an idea
of what the data look like after the
transformation so here on the left is
what we have before so this is our
message data and you can see here that
for this message array uh for each
message we have a Nesta object right so
in this object it has a nest object of
sender and the recipient and also you
