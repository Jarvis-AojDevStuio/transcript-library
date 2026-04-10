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
chunk: 15
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
person and whenever we we click on one
of them um in this case the messages
will be decremented by two right because
in this case um is coming from the same
person right and coming from the same
person there's two Onre messages and if
I were to click this this will basically
uh remove all the onr messages for this
person and we're going to see that the
message account should be down to zero
but it's not the case because we haven't
um update our store whenever user click
on this so in this case what we're going
to do is inside of our user or in this
case message actions for the get message
thread uh we are basically getting how
many messages in this case all the
messages that are currently unre and
then we're we're going to update those
right so in this case what we can do is
uh inside here we can also just return
as well as how many messages are being
read right so in this case what we can
do is we can be able to create a
variable called the red count and then
uh what we're going to do is since we're
getting all the me messages here then
what we can do is after it's been
updated we're going to sign the read
count which is equal to the UN red
messages id. length so in this case
we're getting all the messages that
we're marking from unread to red right
and we're going to instead of passing
all the messages like this we're going
to first have yes all the messages and
then we also have the read count which
in this case is like this okay and then
just to make sure that we have initial
value is going to be red is equal to Zer
and if we were to uh to the place where
we trigger this in this case is the chat
page where we're triggering the messages
in this case we're going to make some
modification for the message list and
this is not only going to be a array of
message dto so it's going to be messages
array of message dto but we're also
going to have the
recount which is a number okay and we're
going to pass the initial messages.
messages and then what we're going to do
is we're also going to update our
message account account based on how
many messages that were read right so
first what we're going to do is we're
going to get the update on count from
the message store and just like with the
issue that we have before we're also
going to have the set red account in
this case we want we don't want to have
the uh update unre count function
trigger multiple times for our use
effect so in this case for our use
effect we're going to have the set red
count and if the current is not set then
we're going to update our unread count
by the initial messages red count and
they're going to set the set the current
count. current is equal to true so it
doesn't trigger this use effect again so
now if I were to go back to the message
table and for example if I were to
navigate to the uh the chat page what's
going to happen is that we're going to
have the message count decrement by two
so if I were to click this and you can
see here that the message count is down
to zero it shows that uh because inside
of our message action like I mentioned
mention before that we basically set the
red account by the number of uh red
account that we have marked in this case
we have successfully marked these
messages as red and we're going to
return that back to the client and here
like I mentioned for the chat page when
we're trying to get all the messages uh
we're going to pass the latest messages
here uh back to our message list and our
message list will basically update our
uh store right so and this here is where
we up up our store uh these are the
places where it listens to our store and
whenever the store value changed it also
updates their component values right so
you can see here that currently we have
zero messages that are r that are on red
if the current path name does not equal
to the chat page um then we don't have
to update our unread count because in
this case we already at this uh uh chat
page right so in this case to test it
out um I'm just going to send a new
message this is cool
and you can see that we are getting this
is cool and the current messages count
is zero all right so now what we're
going to focus on is adding the
notification when user is getting a
message they should have a message or
notification pop up on the bottom right
uh same thing for if they're getting a
like so for example if someone like the
current user for example this person
then in this case we're going to have
notification for that as well so what's
going to happen is that inside of the
components folder I have gone ahead and
create the notification toast component
and inside of this here is the uh
notification toast which in this case is
the link and we have a picture of the
profile and as well as the title and the
subtitle for the
notification and then the way how we use
it is we're going to use the react
toastify we're going to put the uh
component itself inside of the toasttify
alert and which in this case is going to
display the uh image as well well as the
title and the subtitle so if there is a
new message then in this case just the
title is going to be this person has
sent a message right in this case it
will navigate to the chat page and then
we also have the new like toast in this
case when user liked a uh a user then in
this case you can see uh we can be able
to uh navigate to that user's page and
this is going to be the image that we're
going to pass in and also uh this is
going to be the title and subtitle and
such so in this case back to the used
notification channel uh whenever the
path is not in the chat room then in
this case we can be able to trigger the
toast notification in this case we're
going to call the new uh message toast
which going to
pass the message dto so in this case
going to be the message and this should
basically trigger the notification so
here you can see Sarah is currently on
the main page
and I'm currently on Davis Davis account
and I'm going to send a message to Sarah
so here hi Sarah hi back and you can see
here that we have Davis has sent you a
new message click uh click here to view
so if I were to click here and here you
can see we navigate to the chat room
between Davis and Sarah and then for the
new like toast uh that we have here what
we're going to do is we're going to take
a look at the like action from our
server action and here you can see for
the toggle like member you can see here
the this is the target user ID and this
is the source user ID and in this case
if it's already like we're going to
delete this um data inside of our like
table if not we're going to create this
like inside of our like table so what
we're going to do is if we were to look
at our like uh model or in this case our
table we have our source and our Target
so what we're going to do is we're first
going to um find ways to notify our
client that there is going to be a new
like right for the uh Target user so
here you can see that that's what I'm
going to do I'm going to use The Pusher
server to uh trigger a uh new event
inside of this channel it's called
private for this target user and inside
of this channel uh you can see I have a
new event called like new so for this
target user there is a new like happened
and we're going to pass the person who
like this target user in this case is
going to be the source person right so
um obviously we need the source member
data so in this case one way we can do
this is we can take the user ID and get
it or we can be able to select the
source member data from our like table
and here you can see that's exactly that
so we have the select in this case we're
selecting The Source member and for the
source member we're selecting the name
image and the user ID and once we have
that we're going to pass this to our
event data so you can see we have our
name image and the user ID so this so
these are basically these person or the
member data uh who liked our current
Target user ID or who liked our current
Target user so uh back to our client we
can be able to uh uh receive or
subscribe to this event and going to
push that notification so back to the uh
notification hook that we created so the
use notification Channel you can see
here that uh for notification we so far
we have the new message right uh in this
case what we can also do is we can be
able to subscribe to likes so if there's
a new like we're also going to uh push
that here and then here you can see
inside of the use notification Channel
you can see I have created the handon
you like and basically put it inside of
a use callback so it doesn't trigger to
uh or multiple uh toast alerts and here
you can see it takes just the data and
data has name image and the user ID and
then we're going to pass it to the new
like toast and then we're going to uh
bind it with our channel so that's what
it looks like so you can see here we add
the new like um as well as unbind the
new like if we unmount the use effect
okay so that's basically what it looks
like now and let's go back to our client
and try to test it out so I have unlike
Davis and Davis is currently let's see
so let's go to mattress currently uh
Davis is on the mattress page and in
this case if Sarah is going to click on
the like like button we're basically
expecting that uh Davis is going to get
a notification here and again uh for the
new like toast it's going to navigate to
that members page so uh I'm going to
perform this
like and you can see that we have a
notification saying that uh you have
been liked by Sarah and click here to
view the profile so if I click here you
can see that we're on the uh this
person's profile page so that's pretty
much for the section and what we're
going to do is we're just going to wrap
it up and in this case uh for this
section we learn about The Pusher
realtime communication and we learn
about the sustance State Management so
I'm just going to commit all these
changes and just to push it to our
commit and of course you can also do it
in the command line as well and here you
can see for our commit history for match
me you can see we have our lesson eight
all right before we continue if you find
this video helpful please make sure to
like this video and also comment down
below if you have any questions or any
suggestions for the video and if you do
want want to receive more videos like
this please make sure to subscribe to
this channel your subscription means a
lot to this channel thank you very much
and let's continue welcome to lesson 9
where we're going to focus on adding
sorting filtering and paging to our
application so so far what we have our
inside of application is where we have
display the members and the messages so
in this case we're going to add
passation and filtering to this and the
main benefits of doing this is that if
our application start to scale where we
have more users are using our
application like 100,000 or 1 million
users then in this case it will be ideal
for us to return a certain amount of
users return back to the clients and if
user want to request more then user can
be able to use passation to be able to
request more and this will be able to
improve our skillability for our
database so in this case you can see
here that user can be able to filter by
gender right so if they only want to
search for females then in this case
they can be able to get all the females
here in this case user can be able to uh
search by age range or uh people who
have photo or doesn't have photo and
they can also order by the last active
or the newest members and the other part
of what we're going to do is to add
passation so like I mentioned we're
going to add paging so here you can see
we can be able to select different pages
for example we can be able to navigate
to page two or navigate to page four and
we can also be able to control our page
size so how many amount of members we
want to display on our page so we can be
able to display six members on our page
or we can be able to display 12 members
on our page and if our current data
datase does not have 12 then we're just
going to display the enough members to
fill the page and that's basically our
page size here and if we were to zoom in
here you can see that we're going to add
our sorting and filtering and pagination
for the members but we're also going to
do this for the message page as well but
if we were to zoom in here you can see
that for sorting um the way how we're
going to do this is we're going to use
the Prisma RM to add the sorting by or
sorry the order bu and also filtering
we're going to use the wear Clause from
the Prisma orm and then for in terms of
pagination we're going to use offset
pagination where we can be able to
offset certain amount of records for the
members page but in terms of messaging
we're going to use the cursor passion
and we're going to talk about the
difference between cursor passation and
offset passation later in this video
because we're going to expect a lot of
messages sent between users so in this
case we want to do some pation for that
and in this case if we were to look at
our applications uh this is going to be
our message page and we could have a lot
of messages display here then in this
case user can be able to click on this
cursor pation which in this case a
button to trigger the cursor pagination
to load more messages for our UI so in
this case let's say we're going to
display five messages and user click
onto loow more then in this case we're
going to display two more messages
appended at the back of the list right
so this will basically reduce the load
for our database so that's going to be
our main focus for this lesson and of
course the code for this lesson is in
the repository so feel free to find the
code commits for the coresponding lesson
all right so now we're going to do is
we're going to um basically adding the
filter for our UI as well as our
passation so we're not going to focus on
the functionality first we're going to
just basically adding the UI for now and
then we're going to implement the
functionality later so the UR Library we
going to use for the slider is in this
case is from the slider from neui
library we're also going to use the
select from the nsui as well okay so
then we're going to do is inside of our
Cod base I'm just going to create a
component called filters which in this
case the filter is going to be inside
inside of the nap bar and then inside
here we're going to have the uh
components here all right so first what
we're going to do is we're going to
define the order bu list and as well as
the gender list so user can be able to
select either of those options for the
order BU as well as either of these
options for the gender and then what
we're going to do is we're going to also
create a filters wrapper so in this case
we're going to check to see if the
current path name is equal to members if
it is then we're going to return the
filters if now we're just going to
return null and for the filters wrapper
we're going to put it inside of the top
navigation so I'm just going to put this
inside of a uh fragment component and
I'm going to put the filter wrapper so
we're just going to put the filter
wrapper at the very bottom of the
navigation and if we were to come to
here you can see here we have our
filters right so now let's Implement our
filters here so here you can see I have
just gone ahead and basically add The
Styling for for the uh filter and this
what the result looks like so you can
see we have our results to show the
number of members and we also have the
gender where user can be able to select
either the male or the female version
and you can see we can be able to also
have the age range as well as a toggle
for the photo and we can also be able to
select the order by either the last
active or the late uh the newest members
and this is what the code look like so
here you can see we have our results and
we also have our gender list and in this
case we have icon uh because we have the
icons here so so for each of the objects
we're going to display the icon as well
as their value uh as well as we have the
slider so you can see the minimum is 18
and the maximum is 100 and we also have
a default value we can also set a color
and such right so there's no
functionality yet but we're just
basically adding the UI and then we also
have the toggle to switch either wiiz
photo or no photos and then we also have
the select to either select either of
those uh options so for the select here
you can see so for the select these are
the options right so we have either last
active or the newest members and there
is a value for each of them so if we
were to look at the schema. Prisma right
and you can see here that for the member
table we have the created and also the
updated so basically uh if users select
for example the latest active then it's
going to the value is going to be the
update so we're going to uh order by the
update property for the members table
and same thing for the created Property
okay so then we're going to do is we're
going to add the pagination for our
components so inside of the components
folder I'm just going to go ahead and
create a component called pation
component and the reason why we add a
component at the end because uh the
components from the nesi here
uh is basically called passation so if
we were to look at the passion here the
code is basically importing pation from
Nui so we cannot have the same name so
then first we're going to create our
components called pation component and
for the Pion AG component you can see
here that I have gone ahead and
basically add the UI and this what the
UI look like you can see here that I
added the Pion H from nuui and I put the
result here and then here is basically
going to be the page size
and let's say we have 3 6 12 um
obviously we don't have the
functionality added yet so then what we
do is we just add the page components
inside of the members page so inside of
the members page you can see here I put
the members in a fragment and inside the
at the very bottom I basically add the
passation here okay so if I were to
navigate back to our components this
what it looks like so here you can see
we have our preview and here we have our
page in this casee and here you can see
we have our page nation and we have a
little animation when we navigate to
different pages and here's also the page
size but the page size here um we're
just going to give it a styling and then
here inside of the global CSS I have
gone ahead and basically add the page
size box for this uh class name uh just
to look slightly similar to what we have
here and so now the user can be able to
choose the page size they want when they
are uh basically filtering or browsing
through the members here okay but
obviously there's no functionality added
still so to add the functionality for
our filter and passation what we're
going to do is we're basically going to
use the query parameter for our
