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
chunk: 12
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
suggestions for the video and if you do
want to receive more videos like this
please make sure to subscribe to this
channel your subscription means a lot to
this channel thank you very much and
let's continue all right welcome to
lesson 8 where we're going to learn
about how to add realtime communication
to our application so so far what we
have learned is to send message between
users so in this case the other user
have to refresh the page to be able to
receive it and in this case if we were
to add real-time feature to it then in
this case what's going to happen is
we're going to utilize a tool called
Pusher to establish this Channel and the
tier that we're going to using is a free
tier so you can see here that it
supports 200k messages per day and 100
concurrent connections and of course if
we do need more concurrent Connections
in this case there is a pay tier for
this in terms of Pusher we're using
websockets underneath it so in this case
we're basically using websockets to send
messages and in terms of websockets and
you can see here that some browsers that
are not supported but you can see that
most browser are supported with the
websockets so in this case the way how
it works is that if user 2 wants to send
a message to user one then in this case
it's going to um send a message through
our web application and first we're
going to trigger the sent message action
and first obviously we're going to save
the message to our database to keep a
record of it and the other part is that
we're going to um publish this event or
publish this message to our channel that
we create then here in this case in case
anyone who subscribed to this channel
can be able to receive events or
messages so in this case the user one is
subscribed to this channel then in this
case user one can be able to receive
this event or message to their web
application so that's basically how
real-time communication works and in
terms of Pusher there's three types of
channels one is public where anyone who
can be able to subscribe to this Channel
and the other one is a private Channel
where the authenticated user can be able
to subscribe to it and the other one is
a presence Channel where some ilar to a
private Channel but the channel will be
able to register the user information so
that other members can be able to know
who is online so in this case we're
going to utilize all those three Channel
features inside of our application and
just to give you an overview of what our
system will look like by the end of this
lesson here it is and we're going to
utilize a tool called zusen which is a
state management tool to basically be
able to sort our frontend data in a
centralized state so this is what it
looks like so you can see here we're
going to use a state management to
basically subscribe to all the events
that are being published and subscribed
inside of our Pusher channels and here
you can see we have a centralized state
or in this case a zus and State
Management to be able to subscribe to
any events coming from our Pusher
channels any new events will be stored
inside of the state and in this case
because we have our messages and our
chat page two different pages can be
able to read from our state to consume
the messages data and that's going to be
what we're going to focus on first by
adding a public channel so in this case
we're going to achieve a real-time
communication in the message page as
well as the chat page and the other
feature that we're going to add is the
dat red Fe feature in this case user can
be able to see when the message was read
by the other user in this case it's
going to be utilizing the public Channel
feature that we have created and the
other feature is the presence channel so
you can see here that we also have a
green dots showing at the top of each
profile to show that who is online and
we can be able to see it here so if the
current user is not online it will not
show here the green dots but if the
current person is on online for example
like this current person is online then
sorry the the the Green Dot we here so
it will show the green dots at beside
the age here so it shows the user is
online so we're going to display the
presence of each user inside of our
application and the last part is the
private channel so here you can see we
have a notification and it is real time
so whenever a user liked a person or
sends a message to this current user
then in this case the current user will
receive a real-time notification in the
bottom right corner and again in terms
of what features that those channels
going to be applied to like I said uh
the public channel is going to apply for
chat and messaging and private channel
is going to apply for the notification
real time notifications and then we also
have the presence Channel which will be
applied for the member presence so
member can be able to see who's online
who's not so that's pretty much the
features that we're going to add and
sorry about the lines here it's Crossing
it's a little messy but you get an idea
they're trying to communicate to a
centralized State Management and this
state management will basically
subscribe to the events from our Pusher
channels and this way we can can be able
to consume this data anywhere inside of
our application and we can be able to
view all our state management changes
using a Redux Dev tool now even though
this is not Redux but we can still be
able to use the Redux Dev tool inside of
your browser extension and any actions
or any states changes you can be able to
see it in the Redux Dev tool extension
and we're going to talk about how we can
use this later of this lesson so that's
going to be a big lesson ahead and
hopefully that we can be able to stick
through this and like always if there's
any parts in this lesson where it's a
little bit complicated or it doesn't
make any sense you want to look at the
source code well feel free to check the
commit history for its corresponding
lesson here so it's going to be lesson
eight realtime communication plus zustan
State Management tool all right so first
what we're going to do is we're going to
create Pusher so inside of the
pusher.com you can see that it is a free
tier we're using so we're using the
sendbox free tier and you can see that
this is the amount of messages that we
can send per day and these are the uh
concurrent connections so in this case
we're going to click on sign up and you
can be able to either sign up using
GitHub or Gmail so we're going to sign
up using Gmail for now and once you sign
up uh it's asking for the app name so I
basically name it called match me app
and I select the location and then here
you can see this is the overview and
then if we were to navigate to the app
Keys uh you can see this is the
application key that we have for this
application all right so then what we're
going to do is we're going to install
Pusher inside of our application so
first we're going to install Pusher on
our server side and then we're going to
install Pusher JS and you can see that
this is a client application we can be
able to use inside of our Nest
application so we're going to install
both and you can see that we hav
successfully installed this inside of
our package.json so inside of this
example we're going to have the public
app key which is this key right here
this is going to be a public key and
then we have our app ID as well as our
app secret so this is going to be our
example
so I have updated this inside of the
environment variable file and because on
our free tier we have limitation of 100
concurrent connections and so that we
want to make sure that we don't exceed
that so to do so inside of our lip
folder I'm just going to create a file
called pusher. JS and it's going to be
very similar to how we did it in for our
Prisma uh we want to make sure that when
we hop reloading we're using the same
connection that we have already created
and we want to create a Singleton of The
Pusher instance throughout our
application so here inside of the
pusher. TS and inside of this you can
see I have import The Pusher client and
the server and here you can see I have
declar a global and inside of this I can
only use VAR variable so here I have The
Pusher server instance as well as the
client instance so here basically once
we set up the connections we're going to
assign the instance to the server as
well as the client and notice here that
it has given me a error so it says that
the string or undefined is not
assignable to typ string so in this case
just going to add a exclamation mark at
the end to tell that this is not going
to be null in typescript so we're going
to add this for the key as well as a
secret and also here for the public key
as well so here uh you can see once we
have this we're going to be able to use
it through our application all right so
to create a realtime communication we
have to have a channel and for each
Channel we have to have a channel ID so
the channel ID uh we're going to do is
we're going to take the user ID from the
both users and combine them form a
channel ID so that anyone who subscribed
to this channel will be able to uh
receive real-time communication so then
what we're going to do is we're going to
navigate to our UIL folder or U file
we're going to add a function called
create chat ID and then what we do is we
create a chat ID based on their order so
it's going to be B hyen A or it's going
to be a hyen b so we're going to use a
hyphen to join both IDs so we can be
able to get a unique ID for the channels
all right so what we're going to do is
we're going to take a look at our
message action and inside of our message
action uh for creating a message when we
create a message we're going to make
sure that we're sending the same message
to our channel so that any user who
subscrib to this channel will receive
this message so what we're going to do
is we also want to make sure that when
we create a message you can see that
this is the type message uh we also need
to select the user and or the sender or
the recipient data so it's going to be
very similar to what we have here so
when we have the select you can see
we're selecting in these uh properties
to include when we return to our user so
we also need to select that but we don't
want to write the same code twice so in
this case what we're going to do is at
the very bottom I'm just going to create
a message select and we can be able to
use this and here you can see we have
our message select and which is
identical to what we have here so what
we're going to do is I'm going to uh
have this assigned to the message select
that I have created at the bottom
so this will make our Cod a lot more
cleaner and also this one right here so
and in here we're going to replace that
with the message select for the get
message by container as well as delete
message and for delete message we don't
have that so we're not going to include
this so up here for the create message
uh we're going to include it for the
select and here you can see we have
included a lot more properties then the
return type so first we're going to
change this to the message dto okay and
we're going to uh import list from the
types and then we're going to convert
the message to this message D that we
have mentioned above and we're going to
pass it here and this should make our
air go away and then because we're going
to send this message to our Channel as
well so I'm just going to create a
variable for this so we're going to call
it message dto and is equal
[Music]
to this and then we're going
to pass the message dto as the return
type as the return value and then here
you can see I have import The Pusher
server from the pusher. TS which is the
one that we created because we want to
use a single instance of the pushers
server instance and here you can see uh
we're basically using The Pusher server
to trigger a event and this trigger
takes the channel ID and it also takes
the events and we're using the create
channel ID from our UIL function that we
just create and here you can see we have
our data and this is the data that we
sent to our channel so once we create
this action uh and then we're going to
navigate to our message page to
subscribe this change so here inside of
our chat page you can see here that uh
we have our body and this body is how we
iterate all the messages that we receive
from our server actions so I'm just
going to create a new component inside
of chat called message list all right so
here you can see on the left I have gone
ahead and create the message list
component which takes the initial
message Mees as well as the current user
ID and then we're going to pass the
initial messages to the use State and
here you can see we're going to use the
messages here and render all the
messages using the message box component
to render all the messages and because
in the future we're going to use this
component to subscribe to all the
messages and that's why we're using the
set messages here so just to make sure
that everything works I'm just going to
first delete this
body and we're going to call of the
message
list and then we're going to pass the uh
initial
messages and then we're going to pass
the current user ID as the user
[Music]
ID okay so now if I were to refresh you
can see we still uh let's say if I were
to click on this person for the chat you
can see we have successfully rendered
all the messages and because we're going
to use this component to uh subscribe to
The Pusher Channel what we're going to
do is we're also going to pass the
channel ID so what we're going to do is
we're going to pass the channel ID here
and we're just going to call it the chat
ID and here we're going to call the
create chat ID uh to get our current
chat ID for between the those two users
and here we're going to uh create a chat
ID which is a string and it's going to
be a string and this is our chat ID okay
so now we can be able to use this chat
ID to be able to connect our Channel so
what we're going to do is we're going to
first create a use effect and we're
going to first call our Pusher to
subscribe to this channel so what we're
going to do is we're going to import
Pusher client from our pusher. TS and
then we're going to subscribe this
Channel and this is going to be the
channel ID or the chat ID and we also
going to bind our event so what we're
going to do is we're going to navigate
to the message actions and if we were to
look at the message action this is the
event name that we use to push or in
this case to publish events right to
send events inside of our Channel and
we're going to use the same event name
that we're going to bind with so this is
going to be the event name and we have
our message and then once we bind this
obviously we can be able to uh listen
for any new messages from this event and
if we unmount this component we want to
make sure that we stop our subscription
so in this case what we can do we can
just say Channel
that unbind this of course and we also
want to make sure our channel is
unsubscribed and this is going to be
depend on the chat ID okay and that's
the dependency for the use effect and of
course we're going to import this from
react and now if I were
to and I'm just going to remove this for
now so if we were to open our console
and if we were to filter by the
websocket request you can see we have
three of them and you can see that these
are all made to Pusher two of them made
to Pusher and one of them is
establishing the connection so and here
you can see we first have a event to
subscribe and this is the channel ID
which joined by a hyphen and we also
have a subscription succeeded so it
tells us that the subscription has has
been established so now what we're going
to do is we're going to adding the
functionality to set the message so
after we are able to set the connection
for our Pusher Channel we're going to
going to do is inside of this function
we're going to append the message inside
of our message state so here you can see
I have gone ahead and basically create a
function uh called handle new message so
we take a new message called which is a
type message dto and we set the message
here pass the previous state which is
here we're just going to add the new
message at the end of the list and we're
basically using a use callback so that
this function will not be recreated
every time when this component renders
this will basic basically optimize the
performance and that's what we're going
to do and we're also going to pass this
function reference to the unbind so that
it disconnects the connection for this
event so now you can see we pretty much
set the connection so every new message
are sent to this channel we're able to
pick it up and be able to uh update our
state so that our messages will be
updated inside of our page so now if we
were to look at our user currently we're
on the Saras account and I'm also logged
in as Todd So currently they are seeing
the same latest messages and if one
person decide to send a message for
example
hello and with refresh you can see that
a new message has been pop up here on
Todd account and if I were to send this
message again and you can see that new
message is sent back all right perfect
so now what we're going to focus on is
making sure that the read functionality
is added so when user sent a message and
if the other person read it for example
in in this case is Sarah so if the other
person have read the current message
that we sent then we're going to mention
when it was read right so so far we have
the functionality of If the message was
read or not and if we were to look at
the message action for the get message
thread for example when the other user
in this case Todd when they look at the
chat this get message thread request
will be triggered and we look at all the
messages and then we're going to update
the dat that was read which is going to
be the current time so in this case what
we're going to do is we're going to take
all the messages that we are going to
make Market as red we're going to take
those IDs and we're going to push those
message IDs to our channel so that the
channel will be able to cat those
messages IDs and be able to update it
inside of our client browser all right
so here you can see I just gone ahead
and basically create the unread message
IDs and we take all the messages that we
have and then we filter them to see if
the day red is equal to null and the
recipient user ID is equal to the user
ID which is the current user ID and the
sender is equal to the recipient ID
right and then we're going to get all
the IDS for those messages where the
date red is null and then what we do is
we're going to publish this event so
like I mentioned again for Pusher uh the
trigger function it has the channel and
the event and the data so this is the
data that we're going to push and our
client is going to receive or subscribe
to this event and notice the name is
going to be messages red right so above
we have created a message R and here is
going to be messages read and here you
can see inside of our message list
component you can see I have gone ahead
