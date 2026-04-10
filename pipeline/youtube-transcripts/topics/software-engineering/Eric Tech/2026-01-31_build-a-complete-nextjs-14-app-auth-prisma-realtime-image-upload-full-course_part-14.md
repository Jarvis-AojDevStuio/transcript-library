---
video_id: "HqlJjX9uIuk"
title: "Build a Complete Next.js 14 App (Auth + Prisma + Realtime + Image Upload) — Full Course"
channel: "Eric Tech"
topic: "software-engineering"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=HqlJjX9uIuk"
word_count: 3996
chunk: 14
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
navigate to our uh page and you can see
that we're using a flex column to
display the item and if I were to
navigate to uh this person David you can
see that we also see Sarah is also
active it shows right here and we can be
able to easily see who's online now all
right so now we're going to focus on is
adding the uh notification feature where
when we navigate to for example the
message uh or the matches when user for
example one of the user Todd sends us a
message then we can be able to have a
alert to pop up to show that oh there's
another new message sent by Todd right
or if we're currently on the message
page and when Todd sends us a new
message or a different person sends us
new message uh we can be able to uh see
the change right away on the messages
page so to do so what we can do is we
can be able to use the private channel
in Pusher so Pusher has this private
Channel which is restricted and needs
authorization just like how we did it
for the Pres channels and the private
Channel must have a prefix of the
private hyphen and the private Channel
subscription must be authorized so we
can be able to use the same uh endpoint
that we authorize for the Pres presence
channel for the private channels as well
uh so the first thing we're going to do
is inside of the message action we're
going to publish a event to this private
channel so we're going to use private
hyphen as private Channel and this is
going to be the channel name so it's
going to be the private hyphen recipient
user ID and then this is the event name
and this is the message that we're
publishing to and the reason why we do
this is because we want the recipient
which is in this case the recipient user
ID the recipient account be notified if
there is a message sent to this person
and just to go over the authorization
part again inside of our lip folder for
our pusher. TS you can see here for the
channel authorization we have create the
endpoint for the API Pusher off whenever
we need authorization it will call this
endpoint and we can be able to find it
inside of our API folder there is a
pusher off that I have mentioned
previously so you can see here that we
have a function we have a post function
which it takes a requ EST and we try to
authorize the current user and send the
off response back to the client once the
current user is authorized then we can
pretty much continue so because
currently we also want to add a feature
where user are on the messages page when
there's new message sent this will get
appended on the very top automatically
without refresh and that's going to be
listening to the event that we subscribe
to so what happened is that when the
server action push a new message
whenever we create a new message uh is
going to push the events to our client
and the client will basically pick up
this new message and add it to our store
so we need a centralized store to keep
track of that and the reason why we need
a centralized store is that because not
only we have to display here we also
have to display in the popup as well so
if there is a new message at it inside
of our uh or in this case we receive a
new message in our event we also will
get added to our store so that when user
uh on this page they don't have to ref
ref fresh they can be able to
automatically get that so what we're
going to do is inside of our hooks
folder uh you can see I have created a
use message store and in this case you
can see uh this is the state so this we
have store a list of messages and we
also have the unread count which is just
some number and we can be able to add a
message remove a message set a list of
messages and you can see the type is a
message dto and we also have update un
red account which in this case we're
updating this uh State value here and we
can be able to use it inside of our use
notification channels and you can see
here I just gone ahead and create a use
notification Channel hook which in this
case it takes the user ID and what we do
is again we also use a channel ref so
that we don't um repeatedly create a new
subscription for this private Channel
subscription right so first what we do
is uh we will take the user ID if the
user ID is doesn't not exist then we
obviously going to return obviously we
have to uh do it inside of the use
effect we cannot just optionally or
conditionally render or conditionally
mount a use effect so we have to just do
it here if the user ID is not here we
just return and then we check to see if
the channel reference has been created
if not we're going to subscribe to this
private Channel and then we're going to
bind the current message with the handle
new message function here which is this
one right here so it takes a new message
and then we're going to handle the new
message so if the current uh path name
is in the message and the container is
equal to for example inbox uh then we're
going to add a message and update the
unread count so that uh when user
navigate to this page for example the
inbox then they should be able to see
the new message added here right and uh
they can be able to see automatically
without refreshing and we also have to
update the unread count by one in this
case where they can be able to see that
oh there's a new new message uh we have
not read and then else if if the current
path name does not equal to the current
member chat we're just going to update
the uh unread count by one and obviously
in the future we also going to add the
notification feature so if it's not in
the chat page we can also be able to uh
notify the current user that there is a
new message so for example if the
current user is already on this chat
page then there's no point for adding a
notification in this case we can just
simply update the unread message account
and do nothing else because here if you
look at the message list we have already
subscribed to the message new so if
there's any new message um gets pushed
or published to this event then we're
going to catch it inside of the message
list which is what we have here then it
will automatically um update our chat so
like I mentioned before we bind the new
message here and handle the new message
here so if there's a new message added
then we're going to set the messages for
the message State and by simply uh
append the new message at the end of the
uh message State here just to continue
where we left off so back to the use
notification Channel you can see here
that for the handle new messages uh
these are all the dependencies for this
used call back and we just pass that to
the new message red and then here like
always if we need to unmount our use
effect then we also want to make sure we
cancel our unsubscription
we also want to make sure we cancel or
unmount unbind and unsubscribe our
subscription and then what we're going
to do is we're going to also add the use
notification Channel hook to our
providers so that we can be able to make
our hook Works inside of our application
which in this case it takes the user ID
from our layout so in this case our
layout um we're going to get the user ID
from our session and it could be null or
it could be a string and then we're
going to pass it to the providers and
the providers will basically pass it to
the user notification channel so now
just to test everything is working uh
you can see here that I'm currently on
Sarah and if I were to go to for example
Todd and try to send a message for
example hi Sarah I sent this message and
you can see that we have the new message
added or shows right away inside of our
messages table and we can be able to see
a new message added because our message
table is listening to our uh store and
if we were to look at our Redux store
for the history for the actions you can
see that when there's a message event
pushed uh we are able to catch that
event and we're able to add this new
message event so if we were to look at
this message you can see that this is
the new message that we're getting which
is called hi Sarah and the recipient is
Sarah in this case we're receiving that
and add it to our state and if we were
to look at our state you can see that hi
Sarah is appear at the very top in this
case the most latest message getting
received so now we're going to focus on
is basically doing some refactorings for
our message table so what we're going to
do is inside of our message table I'm
going to extract some logic into two
separate components so one is a uh
message table cell component which is
responsible for rendering just the
message table cell and we also have
another uh hook which is called use
message hook and this will basically it
takes all the functions all the actions
that we're going to trigger inside of
the message table into a single hook so
here is what the result looks like so
inside of the message table you can see
here that I have uh extract all the
Logics into a single uh use messages
hook which takes the initial messages
and we can be able to use those values
and functions and pass it to our message
table component and then for the message
table you can see here that I also have
extract the uh table cell component into
its own components by passing its
required properties just like what we
had before we're going to have those
variables defined and then we have the
use effect to set the initial messages
and here you can see it takes the
messages from our parent component which
is the messages page and we send
requests to the server to get all the
messages and then here you can see we
set the initial messages to our store
and then we Define our handle delete
messages you can see that's what we have
before and then we also have the handle
Ro select which is the same as what we
have before as well which in this case
it takes the key it redirect to the
desire page and will basically return
those things in an object and then
that's basically the use message and
then for the message table cell you can
see that these are the props it takes in
and then here you can see is the same
logic that we have before for the
message table we're just rendering the
uh table cell based on the column key
all right so now you can see if I were
to uh refresh our page on our
application and currently I'm logged in
a Sarah you can see that everything
works for the Avatar name the message
date delete action and you you can see
we still get redirected to any routes we
collect you can see we redirect to uh
Todd the chat room between Todd and
Sarah and we can also be able to delete
a message so for example if I were to
delete the high Sara one you can see
that it deletes right away and if we
were to click on the lbox you can see we
still have all the message uh shows here
and if I were to click on the uh tods
account you can see we still have all
those messages here as well okay so
everything uh looks exactly the same and
because currently inside of the used
notification channel uh we basically
bind our handle new messages which is
this one right here with the uh new uh
message new event so any new message
added will be basically added to our uh
message store and here inside of the
message table you can see that inside of
the use messages hook we're basically
using the use message store which we're
basically reading the messages from our
store right so in this case uh what
we're going to do is we're going to also
test to see when we send a message for
example I'm on S account and I'm going
to send a message to Todd and if Todd is
on the uh messages page Todd should be
able to see the message without
refreshing the page right so for example
I'm currently on Sarah and I'm going to
send a message for example hi there for
example and here you can see the message
has already been sent and if I were to
navigate to the inbox you can see that
um I do see see a new message pop up
from the uh messages page right without
refreshing the page and you might be
wondering why there is a bold or the
text looks different uh for the new
message here and that's because inside
of our message table if we were to look
at the table cell and here you can see
for this class name we have added the
styling so if the current message is not
read and is currently inbox uh then
we're going to Mark the current message
as font semi bold if not we're just
going to have empty string so basically
that's why you see a bold text on the
new message here all right so last part
we're going to work on is basically just
updating the unread message count so
we're going to update the unread message
count here as well as inside of our
Navar so in this case uh user can be
able to see you know how many messages
that this person uh have not read right
cuz currently this number is currently
hardcoded inside of our codebase so if
we were to look at the sidebar for the
the uh message sidebar you can see that
the account here is pretty much
hardcoded to number two so in this case
we're going to change this and since we
already have this feature you can see
here inside of the message store um we
have already uh had this variable called
unre account in this case what we're
going to do is inside of our message
action we're we're going to uh create a
function to call um or calculate how
many unread message counts that the
current user have and then we're going
to call it inside of our application and
update our store so that inside so that
uh so once we have the data updated
inside of our store we can be able to
use that data inside of multiple places
inside of our application so to do so
inside of the message action I'm just
going to create a new function in this
case it's going to be called the get
unread message count we're going to get
the current user and then we're going to
try to see all the messages that the
current user have not read right so
where the they read is null and the
recipient deleted is false so the person
have not delet or in this case the
current user is the recipient and the
current user have not deleted this
message then in this case we're going to
filter out those messages and return it
back and you can see here that it's just
going to be a single number it's going
to be a count and then inside of our
providers back to our providers we're
going to uh get the unread message count
from our store and then we're going to
put it inside of a use call back and if
the user ID is not equal to null then
we're going to get call to get uh unre
message count from our uh server action
from our message actions here and then
we're going to get our count and update
our set UNR message count function uh in
this case we're going to update our M
message store for the unread account uh
once we have the update here we're going
to um make some changes inside of our
sidebar as well as our nav link and then
inside of the nav link what we're going
to do is we're going to update our
component which in this case it takes
the unread count from our message store
and then we're going to see if the
current uh reference is equal to the
messages if it is we're going to include
the uned account in a bracket and here
you can see we just basically add some
stalling and then now let's move on and
also add the uh message sidebar so let's
take a look at the message
sidebar and here is where we're going to
update as well so in this case uh we're
going to basically uh import the message
store and get the UNR message account
and then we're just going to display
this inside here and this should be all
so now if we were to refresh you can see
that okay we have a account here and if
we were to navigate back back to Todd we
do see that here as well so let's say if
I were to send a message for example hi
Sarah
again are you here for
example and you can see we have one
message that is unread so now if we were
to refresh you can see that currently we
have zero unre messages and zero unre
messages here so then in this case uh if
I'm going to send a message for example
hi Sarah this is Todd for example and
you can see here we have a message here
and also a message uh in this case we
have unre message count by one and of
course if I were to for example refresh
the page and you can see notice that we
have the uh uh the unread message count
by two and that's an issue that we have
to fix and you can see if we were to
examine the actions for this uh why is
the case and you can see here initially
uh we have the uh data set and when we
refresh you can see the data is reset
and we have all data um added back in
again for the messages uh to our store
and then notice here that we also update
our unread count by one and because
we're using a use effect inside of our
application and it will basically gets
retriggered so you can see here that we
also update our read count by another
one so in this case uh if we were to
look at our providers and you can see
here that this is where the issue is in
this case we're going to prevent this
use effect being triggered again so what
we're going to do is we can be able to
use a use ref and we check to see if the
use ref uh is not set if it's not set uh
then we're going to call this function
if it is set we're not going to call it
so we only want to trigger this function
only once uh so here you can see I have
added the is unread account set and
initially we said the false and then
what we do is is if the current for this
reference it does not exist or in this
case is false uh then we're going to set
it's true and if it's true then we're
not going to call this or in this case
we're not going to call this uh unread
message account function again right so
now if I were to navigate back to our
functions and you can see we only have
this action trigger only once and now
you can see we only have one message
that is unread okay so then we're going
to focus on is when user deleting a for
example a unre message we also want to
update the account here so luckily
enough we have already done something
like this inside of the use messages
hook and inside of here you can see here
that uh if we are removing a message for
example if we removing a message if the
date is unread and in this case we're
also going to update the unread count
but in this case we also want to make
sure that the current message is not a
uh outbox message right because for
example if we were to delete a outbox
message uh we should not reflect on the
count here because this count is only
for the inbox messages so if uh if it's
uh date is unread and of course and the
currently is not a albox and we can be
able to decrement the unre count by one
so just to test it out you can see if I
were to delete this for example you can
see that we have the number decrement by
One automatically and of course if I
were to delete a message for example
that is not on red then in this case
we're not expecting the number to change
and you can see it doesn't change at all
right so then what we're going to focus
on is when we have a new message for
example new
message from Todd for example and when
we click on this message we want to be
able to see the count decrement by the
number of messages that I currently unre
so for example if I say another one for
example uh unread
message for example if we have two unre
message so let's say we are currently
have two unre messages from the same
