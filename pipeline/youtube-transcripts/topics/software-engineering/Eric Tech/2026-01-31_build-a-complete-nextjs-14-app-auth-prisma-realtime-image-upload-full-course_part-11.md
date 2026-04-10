---
video_id: "HqlJjX9uIuk"
title: "Build a Complete Next.js 14 App (Auth + Prisma + Realtime + Image Upload) — Full Course"
channel: "Eric Tech"
topic: "software-engineering"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=HqlJjX9uIuk"
word_count: 3995
chunk: 11
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
can see here for the date is basically
in a UTC time so what we're going to do
is we're going to transform this data
into something like this where we have a
date format into a string and we also
have the center data as well as the
recipient data in the same level of the
message object all right so to make this
change you can see here that I have gone
ahead and create a function called map
message to message dto and this would
takes the message and transform the data
into our desired data type and you can
see if we were to look into this
function and it takes our current data
type for the message and transform that
into our desired data type and notice
here that we're using a message with
sender recipient type and this is
something that I just create inside of
our types file and here we basically
specify that we're selecting these
properties for this type and the reason
why we do this is because for the
message action right we have select
selected the sender and the recipient
object from the message and if we were
to highlight this this is what it looks
like right we have the message object
sorry the sender object and the
recipient object but if we were to
highlight the message you can see that
it doesn't really exist inside of our
message object so in this case uh we
have to include it inside of our type so
if I were to just only use the message
from the Prisma client you will see that
the sender and the recipient would not
exist on type message and that's why we
need to cast the type for that and just
to look at the format short datetime
this is what it looks like we're using
the format function from the date FNS
and this is the format that we're going
for so now if you were to look at the
chat page and we have cons log the
message and here if we were to open our
terminal you can see that this is the
message we're getting and you can see
this is what the day look like and we
also have the sender information and the
recipient information all right so now
we're going to focus on render our chat
data in to our page so to make this
happen you can see here that on the left
I have gone ahead and create the chat
box and here for the blue ones they are
all sent by us and for the green ones
they're all sent by the recipients so
here we're on the Sarah's account and
we're messaging Todd and these are all
the messages that we sent and this is
the message that Todd sent right and you
can see that it has the name as well as
the date and the content it also tells
us that if if the message was read or
not right so here uh basically what I
changed is inside of the chat page I
have add a component called body and
inside of here I basically iterate all
the messages and I pass each message to
the message box and inside of the
message box you can see that it takes
the message dto as well as the current
user ID and then uh we basically render
the component so the way how it works is
that we're going to either have the
Avatar display on the left and then the
message content or it's going to be the
message content first and then we have
the Avatar either way we check to see if
it's not a current user sender we're
going to render the Avatar first and
then we're going to display the message
if not we're going to display the
message first and then followed by the
Avatar so here you can see for render
the Avatar uh it's very simple we're
using the avatar from the NES UI and we
pass the name as well as the URL for the
image and then we also have the render
message content so obviously there's a
lot of styling here but uh we're not
going to focus too much on that so for
the message content here you can see we
have the header and we also have the
body or the message content right so for
the header and this is what the header
looks like and here you can see we're
using basically this package to
construct our class name strings and
then and then depends on the current
user If the message was read and the
current user is not the recipient then
we're going to display that the message
was read and then we're going to have
the username and the creat at so that's
basically our render message header and
then we also have our text so after we
have our header displayed we also have a
paragraph display the message content so
that's pretty much it and this is the
styling so and you can see that uh
basically we can be able to render this
conditionally so if the current user is
sender then we're going to display this
for The Styling if the current user is
not a sender then we're going to display
this as a styling so we can be able to
uh have different styling based on a
condition right and of course uh this is
not a styling course so I'm not going to
focus too much on that and you also
notice that we also have the message and
ref so basically the way how it works is
that uh we are using the use ref for the
message and whenever this component
renders we're going to uh navigate or in
this case scroll in view to that message
and ref which is at the very end of our
message box so basically what it means
is that every time when we refresh our
page or render our component we're going
to automatically scroll to the very
bottom of the chat box so let me show
you what I mean so if I were to refresh
this you can see we have a lot of
messages and if I were to zoom in you
can see that we have a scroll bar bar
right so in case if we have multiple
messages so in this case if I were to
scroll all the way up and refresh you
can see that it automatically scroll all
the way down at the bottom every time
when the component rerenders so
basically that's what the message and
ref does so so just to show you how it
works if I were to send a message hi
todle with a smiling face and click on
send you can see we have a message a pen
at the very end and because inside of
our chat page for our chat form when we
submit a data we actually uh refresh our
page so that's why we see our latest
data reflected on our chat Page Body and
if I were to navigate to Todd account
you can see that we don't see this new
message pop up because it is not a
real-time communication and to in order
to see a new message pop up we have to
refresh our page and you can see that
new message haven't pop up at the very
bottom so now what we're going to focus
on is adding the message page so when
user navigates through the messages and
this should display all the messages for
this member all right just to give you a
demo of what it looks like so if user
navigate to the messages and currently
we're logged in as Sarah so you can see
here that we have navigate to the
messages page and on this messages page
you can see on the left we have a
selector where user can be able to to
select inbox or lbox and don't worry
about this number here this number is
just a temporary number we're going to
uh add realtime Communication in future
uh sections so in this case we're just
going to add a demo like two uh number
here just to show how many inbox uh we
have and basically inbox means that
we're the receiver and these are the
senders so you can see we have sender
and this is the sender column and that
we have Avatar and this is the name and
we also have the message column and this
message will show a preview view of the
message and we also have the date
received which shows the date of when
this message was received and we also
have an action but what we have is
delete action so we can be able to
delete a message so the way how deletion
works is that when a member deletes a
message the other member also have to
delete the message to have the member or
have to have the message fully deleted
so if we were to look at our code and
you can see that this is our message
model right so our message model has a
property called sender deleted and is
default set to false and same thing for
the recipient deleted so if we are the
sender and we send a message and if we
delete this message we set this to true
and the recipient will still see the
message unless the recipient will set
the recipient deleted also true then
this message will be fully deleted so
the message deletion works on both end
and you can see here that we can also be
able to select lbox uh these are all the
messages that we sent and you can see
that these are the list of recipients
and this is the message just and you can
see that we're using a truncate message
which basically means that if the
message is more than certain amount of
characters which we're just trying to
show a preview of the message and again
it also has the DAT sent as well as the
actions so let me give you a demo of the
deletion how it works and here you can
see if we were to click on one of the
message you can see it navigates to the
chat and we can be able to send a
message just like how I did it before
and you can see here that uh if I were
to click on lbox it also navigate me to
the chat as well right and if I were to
look at Todd it's the same thing so uh
you can see that these are the messages
that were received by us by the current
account and these are all the messages
that were sent by the current account
and I can also click on one of the chat
or the message and it will navigate me
to the chat okay and again just to show
you how it works if I were to uh say hi
back and now if I were to navigate
messages you can see that in lbox I have
sent a message to Sarah and uh if we
were to look at the Sarah's account and
click on messages you can see we have
one in the inbox obviously this is not
real time um because if I send a message
I won't be able to receive it right away
I have to refresh so I'm going to add
the Real Time Communication in the
future sections so in this case you can
see we're just basically adding the UI
for now and you can see we have the new
message sent from Todd and we are the
rece recipient so we're getting this
message back all right so just to show
you how the C Works inside of our
messages page uh component you can see
that it takes a search pram and this
search pram has the container string so
if we were to look at our component or
application uh this is our query
parameter right so this is our search
parameter and we have a container
property and this is the value so it's
going to be either inbox or or albox so
inbox or albox right and here basically
based on the in either is inbox or the
outbox we're going to uh fetch our
messages from our server actions and
once we have all the messages we're
going to display this on our page and
let's take a look at the server action
first so we have our container which is
a string we're going to get a current
user ID and then we have our condition
object so I have two way so e either you
can do it this way or you can be able to
do it this way and then based on the
container we can be able to use the lbox
condition or the inbox condition and
basically the square bracket means is
that for this property name if the
container is equal to lbox then we're
going to have sender ID if not we're
going to have recipient ID as the key or
the property name and this is going to
be the value right and then for the
remaining so it uh if the outbox is true
true then we're going to have the sender
deleted to false if not we're going to
have the recipient deleted to false and
uh you can also be able to do this way
if it's if it's more cleaner so we can
also have something like if the
container is
lbox then we're going to use the lbox
conditions uh lbox conditions otherwise
is going to be the inbox conditions and
we're just going to remove this right so
so that could be uh option and all we
need to do is we just need to move this
above here so just to make it more
cleaner so either way works so in this
case I'm just going to keep it what I
have already and here below you can see
we're going to pass the conditions on
the work clause and then we're going to
order by the descending order which
means that we're want to get all the
messages sorted by the most recent uh
and then here are the selection for all
the properties that we're going to to
select so same thing as what we have
before okay and then we're using the map
message to message dto to convert our
message type to our desired data type
and return that back to our page and
we're going to use this messages to our
message table so the uh sidebar or the
selector is very simple so we only have
the Inbox and the outbox and uh we have
the handle select So based on the prems
for this function we're going to set it
inside of our search progam so if it's
inbox we're going to set the pram to
inbox if it's outbox we're going to set
it to outbox and then uh we only have
two items so we have the Inbox and the
albox we iterate that and then each of
them has a key and then this this is the
class name so if it's uh selected then
we're going to make sure that we have
some color change um and then if it's
unclick then obviously yeah we're going
to trigger the handle select pass the
key and set the search pramps for the
container and here's the icon and here's
the label and here you can see it's
basically just for demo purpose uh this
basically shows how many messages it
will receive uh we're going to display
that in the future okay so that's it for
the sidebar and then we also have the
message table so this is going to be a
big one and you can see here that these
are the outbox columns so we have the if
we were to click on the outbox recipient
message dat sent and the actions so
these are the outbox and this is the
inbox so sender name text created that
and such so you can see this is the
inbox columns so these are the columns
and based on the container so if it's
inbox then we're going to use either of
the columns and let's take a look at the
TSX so here we have a card and we're
using the table component from the NES
UI and then we have a table header and
this is the header where we iterate all
the columns and display all the columns
here then we have our table bodies so
these are the messages for the content
and if there no content we're just going
to display no messages for this
container or this chat right it could be
anything we can change the text here and
for each item we're going to put them in
a row and for each row we're going to
have a table cell and we're going to
render the cell so you can see here this
is the item and we have the item ID and
then we pass the item to the render cell
components so let's take a look at the
render cell so this is the render cell
and it uses use call back uh Hook and
the reason why we're using use call call
back is if this component this messaged
component rerenders we don't want to
have the me render cell to render every
single time uh we only want this to be
changed or
rerender uh when these of the following
dependency changed because we're using
these dependencies or we're using these
variables inside of this hook right so
it takes the item and this is the cell
value So based on the column key we're
going to pass the we're going to get the
cell value and uh depends on the key
right if the current column is recipient
or sender name then we're going to
display an avatar and the name right so
if you look here this is the Avatar and
we also have the name followed by
that and we also have text so like I
mentioned before we're using a truncate
text so uh basically if we have a
message very long for example this one
we're going to truncate that so this is
what this function does it takes the
value which in this case our message
value and we're basically pass the
number 80 to this function we're going
to basically slice our message to that
number and then add a three dots at the
end just to show a preview of the
message then we also have the created so
we basically display the uh string to
our page because we have already cleaned
this text inside of our dto right so
inside of our message action for the map
message dto we have add a format short
daytime function here so we don't need
to do anything on our console side or on
our front end side and that's basically
created and then for the default one
which is going to be our actions so we
have a button and if the user click on
this button it will click on the handle
delete message which we pass the item or
in this case our message and this will
basically delete this item or this
message and then we also have is loading
is equal to is deleting the current
message is deleting then we're going to
have loading true and and here is our is
deleting and set deleting use state so
we have our ID for the current message
and if we were to look at set loading is
basically triggered here when this
function is triggered we're going to set
it loading or set loading to true for
this message ID and this will cause the
uh message uh delete button to be in a
loading phase and then we also going to
call the delete message pass the message
ID and pass the is outbox to true or
false uh here inside of our server
action ref once it's deleted we're going
to refresh and then we're going to set
the current message ID to just empty and
then set the Del loading to false okay
and if we were to look at the delete
message in our server action uh this is
how it works so we have our message ID
so if the current lbox is true which
means that uh current user is the sender
then we're going to have the sender
deleted and otherwise we're going to
have the recipient deleted so in this
case we're going to find the message if
the current user is a sender we're going
to have sender deleted to be true and
set that and update this inside of our
message table and then we're going to uh
find all the messages where both and
where all the message are deleted right
where the sender deleted is true and
also the recipient deleted is also true
uh either way if the recipient is equal
to the user ID or the sender is equal to
the user ID uh either way we're going to
select those and then we're going to uh
run a job to delete delete all those
messages uh usually it's going to be
just one uh in most cases where you know
if the sender has been if the recipient
has deleted this message and also here
we're calling this delete message as a
sender then in this case we're going to
find one message or in this case a
message that uh both the sender and the
recipient also deleted uh or have the
deleted properties true and then we're
going to uh call the delete menu to
delete that message uh we also have the
handle select so uh once user click on
that row to navigate to that chat right
handle row select uh we're going to take
the key and based on if it is lbox or
not uh we're going to navigate to that
chat and just to wrap up the section I'm
going to commit all these changes and
this section we basically talk about
adding the messaging feature uh inside
of our application so I'm just going to
push all the changes now and if we were
to navigate to our GitHub page you
should be able to see see all the
changes inside of this commit all right
before we continue if you find this
video helpful please make sure to like
this video and also comment down below
if you have any questions or any
