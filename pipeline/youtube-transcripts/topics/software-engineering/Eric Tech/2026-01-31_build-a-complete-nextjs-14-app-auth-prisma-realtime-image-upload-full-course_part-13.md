---
video_id: "HqlJjX9uIuk"
title: "Build a Complete Next.js 14 App (Auth + Prisma + Realtime + Image Upload) — Full Course"
channel: "Eric Tech"
topic: "software-engineering"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=HqlJjX9uIuk"
word_count: 4000
chunk: 13
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
and basically create a use callback
function and we're going to modify our
current messages so we take the previous
state and then for each message that we
have if the current message contains
inside of the message IDs then what
we're going to do is we're going to
modify the current message date red and
we're going to format it to the current
date otherwise we're not going to modify
anything thing so here you can see
inside of our use effect I have gone
ahead and basically have the messages
read and here you can see we have binded
the messages read with this function and
here you can see inside of our use
effect we use the same event name that
we Define here inside of our message
actions and you can see we're going to
bind this event and we also have added
the unbind as well so if the component
unmounts we're going to make sure that
we disconnect this event and then here
if we were to look at our application
uh if we were to refresh we want to make
sure that we change this so if we were
to go back to our message list and for
each message we have our message box so
we want to make sure that we dynamically
change this based on when the message
was read so back to our util file so
what we're going to do is we're going to
create a function to dynamically change
that so here you can see I have created
a function called time ago which takes
the date as a string and we're going to
get use the format distance from day.
FNS and basically we takes the two dates
so it's going to be take the date one
and Daye two so dat number one and the
base date right and it's going to return
a distance between the given dates in
words so we're going to also add the
plus of go with a space in between and
return that as the function return value
so back to the message box we're going
to change this and add a time ago and
pass the current message. they read and
if we were to go back and you can see
that we have a date tells us when the
message was read you can see that this
was read 3 days ago 2 hours ago if we
were to come back to the Todd account
you can see that uh this one 39 minutes
ago this one 3 days ago right so we do
have dates uh mentioned on the top of
the message header all right so now
we're going to focus on is when user
navigate to the matches they should be
able to see who is online and who is not
right so we should be able to have the
presence of each users's display on each
profile and so far we have used channels
which in this case is a public channel
so anyone who knows the ID of the
channel can subscribe to that and what
we're going to do is we're going to use
the presence Channel which which is
built on top of the private channels and
they let you register user information
on subscription so let other members of
the channel know who's online and we
have to look at the private Channel and
you can see that they basically
introduce a mechanism to allow you to uh
authenticate the user before it is
connected to the channel so what we're
going to do is inside of our application
to add this authentication route uh what
we're going to do is we're going to
first navigate to the pusher. TS and
here you can see we also have the
ability to add the authenticate endpoint
so we're going to use the channel
authorization and we can be able to use
the channel author ization to
authenticate the user and we specify the
endpoint so when we're trying to connect
have the user connect to this private
Channel or the presence Channel they're
going to hit this endpoint to
authenticate themselves and then it's
going to uh get connected if it's
successful for the authorization so here
we're going to specify the endpoint it's
going to be API SL Pusher hyphen off and
we have the transport which is using a
Ajax
transport and then here we're going to
create this authentication route so if
inside of our app we have our API and
API we're going to create a folder
called Pusher
slof and inside of that we're going to
have route.
TS so that's going to be our route right
and inside of this route we basically
first uh see if the current user is
authenticated if it's not authenticated
we're not we're not going to uh continue
we're just going to return the
unauthorized response and then we're
going to get our body from our request.
form data and then inside of this
because it is using a git method to get
all the datas so we have to specify the
name correctly and inside of our body we
first get our socket ID channel and data
and then for the data we're going to
have user ID and then we're going to uh
pass that to our authorized Channel and
this will return us a channel authorized
response which contains the off Channel
data and the share Secret
and we're going to return this to our
Nest response once we have our Channel
authorization uh set up so what we're
going to do is we're also going to think
about how we going to store who is
online because if you were to look at
our application we're going to display
the presence here for the matches but
also if we were to look at each user
members page we also have to display
here and then we also have probably
might want to display whose presence on
the uh the messages or the list of
messages here right
uh or the list of me for the list of
members here or for the members who
liked me or also the mutual likes here
so there are going to be a lot of places
where we're going to display uh who is
present and who is not so we're going to
have a central store to store uh who is
present and who's not so react come with
the use context which we can use and we
can be able to store the data there or
we can be able to use something like
Redux which I have been using in the
past or moex but in this case we're
going to try something new we're going
to use zustan or zustan uh to store our
data so in this case uh we're going to
look at the zean document and you can
see that the installation is very simple
and the feature and the usage is also
very simple as well you can see we can
be able to create a simple store by
mentioning the state here and the
actions will also be inside of the same
object and here we can be able to uh
define the properties and all the
actions inside of the same object and to
bind our component with it and we can
just call the use store and basically uh
filter out which data we want to display
on our page and we can also be able to
filter out which function that we want
to call inside of our page so it's going
to be a very simple store that we can be
able to use inside of our application so
to do so uh what we're going to do is
we're going to first mpm install zustan
or zustan and we're going to
first clear our terminal we're going to
mpm install zust then
and if we were to just I'm just going to
close all these pages and get the
package.json and you can see that we
here we have the zustan here or zustan
and this is the version that we're using
okay so once we have that uh we're going
to basically create our store using the
create method from zustan and then here
you can see inside of this folder I have
gone ahead and create a file called use
presence
store. so inside of this file you can
see I have defined a type called present
State and inside of this I have the
members ID which is a strain array and
this basically contains all the members
right that has that is currently present
and we can be able to add a member that
is present or remove a member that is
not present or we can also be able to
set all the members that are currently
present and here is how we Define the
presence State and we basically called
the use presence store and we're using
Create from zustan and basically pass
this is going to be the type uh which is
presence State and then we're going to
uh Define the type here and here you can
see we have the members ID which by
default it's going to be empty array and
then we can be able to add the current
members ID or we can be able to remove
it by using the filter function and then
we can also be able to set all the IDS
so it takes the IDS and then set the IDS
for the member's ID and we can also be
able to use the dev tools from zus and
middleware and we can be able to examine
all the actions inside of our browser
console and you can see that we can also
be able to give it a name so in this
case the name of this store is called
The Presence store demo right so in this
case uh whenever we trigger an action we
can be able to see it inside of our
browser for this store name all right so
once we create the used presence store
what we're going to do is we're going to
use it through our application so inside
of our hooks folder I have gone ahead
and create a hook called use presence
Channel and inside of here I have gone
ahead first create the set ad remove
function from our Ed present store and
once we create the set ad remove we can
be able to use it to connect to our
events and here you can see I have
connect the channel reference and we're
using a use ref to basically assign our
current subscription so inside of our
use effect we first check to see if our
Channel reference has been defined if
it's not defined we're first going to
subscribe to this presence Channel then
we're going to bind those events with
each of those actions and here you can
see when we bind those events it takes
the members and each of those members uh
is a type from The Pusher JS and if we
were to look at the members type this is
the type so you can see here for the
members it has members count me my ID
and such and we can also be able to use
those functions inside of the members
class so here uh it takes the members
and we basically pass each of those
members to our handle set members to our
store so that we know who is connected
inside of our estate and then we can
also be able to add a member so if there
is a me new member added we're going to
basically add the current member. ID to
our handle ad member and for remove we
also be able to take a member. ID and we
can be able to remove that from our
member State and then we also have the
unmount so after this uh Hook is
unmounted we're going to unsubscribe and
also un unbind all those events so once
we Define the use presence Channel what
we can do is we can be able to use it
inside of our application so inside of
our app we can be able to use it inside
of our providers so inside of here I'm
just going to call the use presence
Channel and we're going to import this
from the used presence Channel all right
so basically this will be called in AO
level and if we were to come back to our
application and it has been telling us
that uh you're importing a component
that needs use effect and it only works
in client components so what we can do
is we can be able to uh mark this
providers as a client component all
right so here you can see inside of our
Network request uh we can be able to
filter by websocket and you can see here
that this is a request made to The
Pusher and here is the connection
established and once we have our
establishments we also can be able to
see which channel we are connected to so
so here is our presence Mash me which is
defined inside of our use presence
Channel and then you can see we have our
subscription so it has been succeeded as
well and currently we have one ID that's
connected and we can also be able to
look at our Redux and for Redux you can
see initially we don't have anything
inside of our store and if we were to
click here you can see that uh we have
added a new member ID to our member's ID
which is our store which is our presence
store which is here and of course you
can be able to install the Redux
extension from the Redux on the on your
browser so just search for Redux Dev
tool extension on your browser either
Chrome or Firefox and you can be able to
install that and because we also provide
the name for our store you can see here
it's called present store demo we can
also click here and also select other
store that we have created here if I
were to log in as a new user and and if
we were to look at our state you can see
that uh we have a new member added to
our state and if we were to just to look
at our state you can see that we have
two users added and let's say if I
navigate away from this to navigate to
Google for
example CA and you can see that we have
another action shows that this user has
been removed from our present state or
present store
and if we were to look at our state you
can see that we only have one user add
it and you can see that we only have one
user add it and we can also see the
exact action that we did so difference
so you can see that we have removed this
user and just to confirm and this is the
user ID and this is the current user ID
that's active right all right so what we
need to do is we need to be able to add
the functionality where user can be able
to see who is online on the top of their
member card all right so inside of our
application to show who's active or not
what we're going to do is inside of our
components folder I have gone ahead and
create a presence. component and inside
here you can see it takes the prop for
the member and we first get all the
members ID that is currently present
inside of our store so we take the state
and then we're going to say state.
members ID as the members ID and we're
going to deconstruct this object which
is the members ID that we assign here
and then we're going to check to see if
the current member. user ID contains
inside of the members ID array so we
check the index of it if it's negative
one then we know that it's offline if
it's not negative one we know that it's
online so if it's offline then we're
going to return null if it is online
then we're going to display the dots on
our member card and then inside of our
member card you can see here inside of
this prevent link action div you can see
here I have added the uh presence dot
component and and I have at the position
that it is absolute and is at the top
left so if I were to navigate to the
page and currently you can see Todd is
active and we can see that Todd is
active at the very top here so it has a
Green Dot flashing shows that this
person's active and here you can see we
can also be able to navigate to Todd and
see that this person is also active as
well and let's say if I navigate to a
different page for example google.com or
google.ca and you can see that this
person is no longer active and it does
not show that and if I were to navigate
back to this page and you can see that
we have a Green Dot showing at the top
left of the member card so now we're
going to do is we're going to also add
the presence functionality elsewhere
instead of our page so one example or
one place that I could think of is here
for the message list where we display
all the list of messages sender and we
can be able to add like a presence icon
at the top right and we can be able to
utilize the badge component from the NES
UI Library so here you can see this is a
preview of it where if we have a profile
and here you can see on the top right it
has a badge and we can be able to just
put our Avatar inside of the badge from
the neui library specify the content
specify the color and we can be able to
show something like this so what we're
going to do is inside of our message
table this is where we're going to
display the Avatar which you can see
here this is the all the avatars for
this me message table and it Al has the
name so what we're going to do is we're
going to create a new component inside
of the components folder all right so
inside of the components folder you can
see here I have created a presence
Avatar component which takes the user ID
as well as the image source and depends
on if the user is null because it might
be a time where the user also delete
their uh account or making sure that the
user ID can be notable and inside of
this component it takes the user ID and
the source which is the image image
source link and then we also have the uh
use presence store which getting all the
members ID and then we check to see if
the user ID is within the members ID
array so if it's not online uh it's
going to not show the color uh if it's
online then we're going to show the
green circle uh at the very top okay and
here is our Avatar so back to the
message table we can be able to replace
this Avatar okay so here you can see I
have made the change and basically
import the presence Avatar and pass the
current user ID so if it's outbox which
means that we have all the recipient IDs
and we're going to pass the user
recipient ID if it's inbox then we're
going to pass the sender user ID and
same thing for the source as well so if
I were to navigate to here you can see
that uh it shows at the very top that it
is currently uh active so Todd is
currently active and if I were to
navigate to something else like
google.ca and you can see here that we
have all the users or in this case the
senders are inactive in this case Todd
is inactive so we don't see that green
circle at the very top and just for
testing purpose so here you can see uh
we have Todd is active and currently
we're now logged in as Davis so you can
see here Davis is inactive so let's
click on for example Todd and we also
want to show that uh if the current user
is active in the chat so I'm going to
also make the change change for the
Avatar here so back to our code uh if we
were to look at the message box so
inside of our chat we have our me
message box so here you can see we have
our Avatar so what we can do is we can
be able to change this to use the
presence Avatar so here you can see I
just passed the message. render image
and this presence Avatar is going to
check the source if the source is null
then we're going to display this so in
this case uh we just have to pass the
message sender image and then we also
have the user ID and if we were to
navigate to here okay so now if I were
to refresh this you can see currently we
have a avatar and above that we have our
badge which in this case it shows that
the current user is active right and it
also shows here as well for the uh for
the current user that is also active
okay so then we're going to do is we're
going to also add the uh presence to the
current profile sidebar so in case if we
have a situation where the current user
is for example Davis where the Davis you
can see here that uh this person haven't
sent any message yet but we also want to
know if the current user is active so we
can be able to add a active here on the
sidebar so I'm just going to copy the
Davis uh email which is this one and I'm
just going to log out of this user and
click on login Davis password word okay
so obviously it shows who is active and
now I want to show that current user is
either active or not so what we can do
is inside of the member sidebar we can
be able to make some slight change to
add it inside here and here you can see
I've also add the presence dot inside of
our member sidebar so if I were to
