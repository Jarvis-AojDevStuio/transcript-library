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
chunk: 7
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
different sub routes inside of the
member Details page for example things
like the profile page the photo page as
well as the chat page lastly we also
have some touch-ups by adding a loading
indicator inside of the member Details
page so the user can be able to navigate
to the proper air page when we got an
air so that's pretty much it for the
section upness we're going to take a
look at how to add like feature inside
of application so that we can have a
many to many relationships all right
before we continue if you find this
video helpful please make sure to like
this video and also comment down below
if you have any questions or any
suggestions for the video and if you do
want to receive more videos like this
please make sure to subscribe to this
channel your subscription means a lot to
this channel thank you very much and
let's continue all all right welcome to
lesson five so very appreciate that you
made this far of this lesson and so far
we have built the routes as well as the
authentication and the members page
connecting our data to our database
using Prisma and such so now what we're
going to focus on is to basically adding
the like feature so what we're going to
do is we're going to first set up our
database relationship so what we're
going to do is we're going to have a
join table which will basically be a
like table that have a many to many
relationship between the members so
we're going to have a source user ID and
the target user ID to show who liked who
inside of our tables so what we're going
to do is inside of action I'm also going
to create a like action which will
basically communicate to our Prisma to
basically add our like toggle feature
and then we're going to carry this
feature to add a view page to view all
the likes so what's going to happen is
that when user navigate to the list page
they can be able to see all the members
that they have liked and they can also
be able to view all the members that
liked the current member as well as all
the mutual likes as well and lastly
because we're using a query parameter to
navigate to different tabs here you can
see uh we're going to use something
called use transition hooked to trigger
a manual loading so because in the past
we have using different routes so if we
were to navigate to different routes for
example in the members page we can be
able to see a loading indicator we can
be able to add that component there and
be able to have the loading indicator
display when we navigate to different
pages but it's not the case for query
parameters that's why we're using a use
transition hook to add a menu loading so
that's pretty pry much it for this
lesson it's going to be very short and
the code changes for this lesson will be
in the code repository commits so feel
free to look at the commit history to
find the corresponding lesson all right
so obviously we know so far that we have
the user the accounts the members table
as well as the photos right but what
we're going to do is we're going to add
the like table where we're going to uh
user can be able to like each other
right one member can be able to like
another member so for example user can
be able to like each other right and and
each user can also be able to like other
people as well right so in this case uh
what we're going do is we're going to
build a join table so we're going to
have a like table where we have the
source and also the target so the source
will be have the uh Source user and the
relation as well as Target will also has
the uh Target user ID as well as the
target uh user relation or the member
relation actually so in this case uh
we're going to build this table and the
way how it works is that inside of the
Prisma so what we're going to do first
is we're going to create a light table
and you can see that the relation here
is basically the source and the FI is
going to be Source user ID and the
reference here will reference the user
ID uh from the member table and it's
also undelete Cascade which basically
means that uh if the user has been
deleted the following like join table
will also be deleted as well and same
thing for the Target and here for the ID
is going to be a join ID uh we're using
the double add symbol to simplify that
this going to be a ID and we're
basically saying that this is going to
be a joint ID so we have the source ID
and the target ID is a joint ID and then
of course in the member table we're also
going to define the likes so so far you
can see it automatically generate the
two likes so we have the source and the
Target right so we're going to have the
source likes and the target likes so
user can be able to have many uh likes
where the current member is liking the
other people and we can also have the
Target likes where we are basically the
Target right where other people are
liking us we're liking the current
member right so we're going to have
those two uh uh changes made on both
tables and once that's done uh if we
were to go back to the REM me I have
wrote a section called common use
commands so we're going to first
generate our Prisma client or update a
Prisma client so open our terminal we're
just going to run this command the MPX
Prisma generates and then we're going to
push our Prisma schema changes to our
database so once that's done we're going
to uh open our Prisma studio and view
our web interface so let me see if there
is one open already so we do have one
open Let's uh check it out and if I were
to restart refresh you can see that we
have a like table and you can see for
this like table we have Source uh Source
member Target Target member right so
that's pretty much it all right so the
process Now to create this like feature
is be very simple right so what we're
going to do first is we're going to uh
add this functionality inside of our
server action so once we have created
that server action we're going to call
that inside of our components so inside
of the app we have our server action and
we're going to create a
like actions TTS and before we create
anything in the like action what we're
going to do first is we're going to also
add additional function inside of off
actions to help us to get the current
off user ID so this is the current off
user ID we're going to get the session
if the user is not there uh we're going
to throw with the new error called
unauthorized right so I import this and
then inside of the like action and you
can see here I basically gone ahead and
added a function called toggle like
member so you can see here that uh what
we do is we takes the target user ID and
is like Boolean so we get the user ID if
it's true then we're going to uh Delete
the like from our join table if it's not
we're going to create it inside of our
like table right inside of our like join
table so basically uh we to delete it we
first check to see uh our current Target
ID right so the source ID and the target
ID must be the same we must find out
record first once we find it we're just
going to delete it right so notice that
in the uh schema. Prisma we have the ID
as the join ID from the source and
Target right so inside of the like
action property is going to be the
source user idore Target user ID so
that's how it works and then what we do
is we're going to uh pass the user ID
the current user ID as the source and
the target ID from the PRM so very
simple you can see that um we just
simply pass the ID we don't really need
to pass anything else right and
basically the Prisma uh will basically
Define the relation here and then after
the toggle like member I also def find
another function called Fetch current
user like IDs so basically what this
function does is that we're so first
what we do is find the record where the
source user ID is equal to the current
user and then we're going to only select
the target user ID so if I were to
highlight this you can see that it's
basically an array of object where each
object has the target user ID so what
we're going to do is we're going to
return the like IDs and we're going to
only get the target user ID so so
basically we're going getting the array
of string and if there's any errors
we're just going to console lock this
and throw the air and of course I also
have gone ahead and Define some other
functions like fetch like members so if
the type is Source basically fetch all
the source likes if it's Target we're
going to find all the target likes and
then we also have the mutual likes we're
going to find all likes where the
current user and the other member both
like each other so in this case the way
how we Define this is that for Source
very easy uh we're going to find all of
them where source idid is equal to
current user ID and we're selecting the
target member ID right in this case
we're selecting the target member
instead of the ID because in the past
like this one we're selecting just the
ID but here it's different we're
selecting the actual Target member so
we're getting the actual member data and
in this case uh that's the source likes
and for the Target likes we're going to
say that for all the record where the
current user is the Target and we're
going to select all the source member
where there are all the members that
like the current user so that's very
helpful to Define who we liked and who
liked us so for fetch Mutual likes uh
it's very simple you can see we take the
user ID of the current user and then we
find all the user we liked right so all
the user that the current Source member
liked and we only select the target user
ID and then once we get the all the like
ID right the all the IDS that we uh
liked or the source member liked uh then
what we're going to do is we're going to
find inside of Prisma where the uh
Target ID is equal to the user ID so and
we and the source user ID is is in the
like ID basically what it means is that
we're trying to find all the user who
liked us as well right so we we like
that person and that person also liked
us right and then we're only selecting
The Source member and once we get the
mutual list we're going to iterate that
and then going to return the source
member so that's pretty much it that's
pretty much all the function that we
need to complete this functionality so
what we're going to do is inside of the
component we're going to create a new
file called like button all right so
here you can see I just go ahead and
basically create this like button from
the component so that we can be able to
reuse it elsewhere so the way how it
works is that we're going to take the uh
Target ID and has like Boolean and we're
going to have the button here so we have
the icon so here you can see it's
basically a div and if it's clicked then
in this case it's going to trigger the
toggle like function and the toggle like
function which basically call the toggle
like member which was what we have
defined in the server action so
basically we take the target ID and
haslik and we're going to save that
inside of our database and obviously we
also have to refresh our change so that
we can be able to get the color change
on our heart right so if it's not light
then we're going to have the gray color
if it's lik we're going to have the
right color so inside of the member card
component we're going to pass the like
button and we're going to just set the
has uh like to be false for now and once
we uh set that we're going to navigate
to our browser and here you can see we
have the like button on the on the top
so user can be able to click this and if
we were to turn this or I should say if
I were to turn this into true let's see
what color we're getting so if I were to
refresh you can see that we have red
right so these are all the user that we
like and one thing we have to take a
look at is the responsiveness so here
you can see if I were to squeeze this or
in this case you can see that they're
all screwed into one column so what we
can do is inside of the page from the
members page
actually so in this case what we can do
is we can be able to fix this by simply
changing the grid column to two right
and also we're going to say that if it's
uh beyond the mid size then we're going
to be having the grid column three if
it's extra large we're going to have a
grid column six and the Gap is eight OB
L but here you can see if I were to
squeeze it a little bit you can see that
we're going to always have the column of
two right so that that should just work
for now obviously this is not a
responsiveness course so we're just
going to focus on getting the elements
right and obviously since we're here on
the members page what we're going to do
is we're going to also fetch all the
current likes ID for the current user so
we're going to import this and we're
also going to pass it to the member card
and then inside of the member card we're
going to add this as an additional
property here we're going to add the
like IDs and then once we have our like
IDs what we're going to do is we're
going to also uh see if the current
member user ID right is included inside
of our like IDs and if there is play the
like button if not we're going to
display the gray button so here you can
see very simple we have one person liked
pretty much uh we have the feature added
here and and then we're going to delete
this comment but notice here that if I
were to click on a user the like button
you can see that we're basically
navigate to the user profile right but
you can see that it does get liked so it
does get saved inside of our database if
we were to if we were to look at our
Prisma studio and try to refresh our
like you can see that we do have uh data
here for each of the member right so
this is Sarah uh for the Target member
is called Todd right so we have like
Todd so far and we also have liked myo
as well so if I were to click on the
member you can see that this is Sarah
and the target is Mile right so we do
have data saved inside of our database
and you can see here that what we're
going to do is we're going to prevent
this happen so what we're going to do
first is we're going to wrap this around
a div so we're going to put this inside
of a div right and basically the way how
it works is that if we have so anything
that happens inside of this div right
we're going to prevent the link action
and we're going to Define this link
action above so here we're going to
create this link prevent link action
function so so the way how it works is
that we're going to prevent the default
action so which is the redirection and
then we also have the stop propagation
basically means that it will stop
bubbling up to our parents right our
parents component in this case you can
see that we're getting an error if I
were to refresh we're still getting this
error you can see that event handler
cannot be passed to a CL client props so
in this case uh we will also need to use
as a client component so we have the
specify this is a client so now if I
were to refresh you can see that we do
have the uh page refreshed and if I were
to click on it like you can see that it
did stop uh redirecting to what we need
right so if I were to inspect this so if
I were to inspect
this you can see that this uh this is
active right is about this big so if I
were to click on anything else other
than this then we're obviously going to
get redirected to the user so you can
see that we get redirected to user but
if I were to click this you can see we
do not and we trigger the like button
right so that's pretty much how it works
and we can be able to like a member we
can be able to unlike a member so if I
were to click this you can see that we
have unliked members so far we have 1 2
three and if I were to navigate to our
studio refresh you can see we only have
three records so now we're going to do
is we're going to focus on building the
list tab so you can see we have a list
so this list basically shows us all the
members that we liked that the member
our other members liked us or the mutual
likes right so what we're going to do is
we're going to navigate to that so we're
going to navigate to the list page and
we're going to make some changes inside
of our list page so here you can see I
just gone ahead and basically create the
list page component and here you can see
for the list page component I have take
the search prams so this search pram is
basically has a property of type so you
can see here that uh basically I have
gone ahead and added this and on the
left this is what the result look like
and here you can see for the routes if I
navigate to the list and for the prams I
have the type and this is the type value
so in this case we have the source and
the Target and the mutual right this
Source Target mut ual so you can see
here if I were to na navigate here you
can see we have Target navigate here we
have mutual So based on the prams uh
we're going to get the prams and pass it
to the fetch liked members server action
and This Server action take the type and
then get the current user ID like I
mentioned before uh basically how it
works is that it will find all the
members that we liked for Target the way
how it works is that we find all the
members that liked us or liked the
current user and mutual basically means
that the member that liked us and also
we also like them so basically it's a
mutual like between the current user and
the other you other members and
basically for members uh once we get the
members we're going to display them
inside of our list tabs so this is our
tab right this is our tab component if
we change it we will display the list
change it we display a different list
right based on the uh members that we
get from our parent components so for
list tab the way how it works is we take
members and the like IDs and we're going
to display them so again we're going to
get the search prams the router the path
name so basically the path name is the
the name that we have in our current
path and then the search pram is what
happens after the question mark so we
can also be able to console lock this so
here you can see if we were to conso log
this the path name is lists and the
search prams is the type which in this
case is mutual if I were to clear this
navigate to here you can see we have
lists and the search Prem is targets and
for the tabs it's basically an array of
object and we have the ID and label
right so this is the source and this is
the target this is the mutual right and
here you can see uh let's forget about
the handle tab change function for now
let's just look at the UI uh so first we
have our outer div and then we we have
our tabs so tabs is coming from the nest
UI Library so here you can see if I were
to navigate to The Nest UI Library
documentation and here you can see this
is our entire tabs and for each of those
tabs it will basically display the data
so for photo tab we display the card
