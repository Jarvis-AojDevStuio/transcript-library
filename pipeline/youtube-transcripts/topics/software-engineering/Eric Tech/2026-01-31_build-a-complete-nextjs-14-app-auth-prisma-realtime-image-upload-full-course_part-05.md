---
video_id: "HqlJjX9uIuk"
title: "Build a Complete Next.js 14 App (Auth + Prisma + Realtime + Image Upload) — Full Course"
channel: "Eric Tech"
topic: "software-engineering"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=HqlJjX9uIuk"
word_count: 3990
chunk: 5
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
session right you can see that we have
our name email and image not and also
the expires which is what we have
display on the page so what we're going
to do is that we can be able to modify
our session so what I'm going to do is
I'm going to get the session. user. ID
is equal to the Token the sub and of
course we also need to make sure that uh
the session contains those information
first check to see if the ID exists as
well as the user if it exists then we're
going to uh set the user. ID is equal to
token. sub which is the user ID so here
you can see if I were to save this and
this is the ID that we retrieved from
the token do sub so that's basically our
purpose uh and we can be able to call
Ser our actions using the ID that we
provide so now we're going to take a
look at is how we can be able to uh
decorate our UI so we're going to first
start with our drop down so here you can
see this is our drop down where user
click on a button it will have the drop
down display at the bottom so what we're
going to do is we're going to add a
drop- down menu inside of our top
navigation so if we were to navigate to
our Navar for the top
navigation uh you can see that this is
what we have right we're going to add a
drop down menu here we're just going to
create a new component called the user
manual. TSX and then what I'm going to
do is that I'm going to import the off
where we can be able to get our session
and of course uh we can be able to make
this as async so it's going to be a
async component and once we have our
session uh we can be able to check if we
do have our session for the user we can
be able to display the user menu here if
not we're just going to display the
regular login and register so to do so I
have a turnning condition where if the
user exists then we're going to display
the user manual if not we're going to
display the buttons so we're just going
to uh import the user menu and basically
pass the user uh session. user which is
the user object to the user menu
components and you can see that for the
user menu I just went ahead and add the
drop down so for props it takes the user
uh it's coming from the session at user
from n off and then we have our drop
down right so this is our drop down and
uh we also have have our drop down
trigger so basically it's going to be an
avatar so if the user has the image from
the user. image then we're going to use
that if not we're just going to use the
user.png and you notice here that I
basically add a user.png inside of the
images so here you can see this is the
image uh it's just a unknown user
profile so that's basically the drop
down trigger and then we also have the
manual right so you can see here that uh
we also have our drop down selection so
these are the items so for the selection
we will basically display the signin as
the username and we also display nav
link to added the user and also button
to trigger the log out functionality and
the functionality here uh I also have
implement this so inside of the off
actions uh we will basically trigger the
sign out from off so like I mentioned in
the past that so we can be able to only
trigger the sign out in server function
we can't do it inside of the client
component and if we were to do it in a
client component we will have to use the
use server and text so in this case if
we were to add it here
uh we can be able to just directly call
the server action that we created so in
this case inside of our user menu right
so we can just call this and uh we can
be able to log out the user so if I were
to sign in again so if I were to click
on sign in and you can see that we have
our profile or our drop down at the top
right so we first have our uh drop down
trigger which is a Navar or a avatar and
once we click on this you can see that
it shows sign in ask this person and we
can either click on edit the profile or
log out right so if we were to click on
the edit profile it will navigate to a
page of the edit obviously we haven't
implemented that yet but you can see
that we can also be able to click on the
log out as well right so if we were log
out you can see that we don't have the
token displayed on our storage so if I
were to navigate to our cookies we don't
have the session token here anymore so
of course we can also be able to add
middleware inside of our Nest
application so ins side here for our
routing uh you can see that the
middleware it basically allows to run
code before a request is sent or before
the uh request is uh completed as well
as we can also modify the response by
rewriting the response that get sent
back from the request so we can be able
to modify the request or response
headers or the responding data or
payload so in this case to do so we have
to be a little more specific for the
file name so it have to be middleware so
inside of the source fold folder I will
create a file called middleware and
basically njs will tell that this is a
middleware and the goal for this
middleware is that we can be able to
have this protect the route so that if
the user is logged in uh they can be
able to navigate to the members and they
don't have to go to the login or the the
register page and that's the goal so
first we're going to create a routes
file and this routes will basically
contains all the public routes as well
as our off routes and here you can see I
have basically created this middleware
so uh what happen is that we have our
request which is the nest URL so the
nest URL that we're going to about to
navigate to so um if the request. off it
is logged in so we have this
functionality to check to see if the off
is exist if it is then we're going to
say that this is logged in right so then
what we're going to do is that because
we have display the uh routes so these
are the public routes these are the off
routes and what we're going to do is
that for the public routes if it
contains this then it is a public route
if the uh if the nest do Nest url. paath
name contains inside of the off routes
then this is a off routes uh then we're
just going to let it go we're just going
to n let it navigate to the public
routes if it is a off routes then what
we're going to do is that we check to
see if it's logged in if it is logged in
then users still want to navigate to the
authentication route like the login the
register that we're just going to force
it to navigate to or redirect to the
members page and then uh if not then
we're just going to let it go we're just
going to let it navigate to the uh login
page or the register page and then also
if the uh if it is not logged in and is
not public then we have to force it to
navigate to the login page right so if
the user is trying to access the member
page and they're not logged in and the
members is not a public route and we're
just going to you know force it to
navigate or redirect to the login page
if those condition doesn't pass then
obviously we're just going to let it
navigate to wherever they want to
navigate to right so in this case uh if
I were to click on login you can see we
have our login page if I were to click
on the uh matches you can see that it
redirect to the login uh so if I were to
click this you can see that uh we
redirect to the public page because we
are allowed to navigate to the public
page but if I were to try to navigate to
uh for example these pages right so
these are not public pages so in this
case it will navigate to this page right
for the login because we haven't logged
in and these are not public page because
we didn't specify that these are public
page and let's say if I were to click on
register you can see that it's fine so
now if we were to log in to the members
page and now if I were to click on the
uh this page you can see that we still
have data here right we still can be
able to navigate to the public page uh
we still can be able to navigate to the
members page the list page and so on and
notice here that uh the top right of the
nap bar didn't change so if I were to
just refresh you can see that we do have
this changed so what I'm going to do is
inside of the sign login
form after this is done we're just also
going to do the
router. refresh so this will also make
sure that the changes is in sync and
let's say if I just want to navigate to
the login page you can see that it
redirect me to the members page so it
basically tells that we cannot go to the
off page right because we're already
logged in and we can still go to the
public page of course because it is
public so notice that here we also have
a config and inside of the config we
have a matcher so basically we are going
to tell the middleware that we're going
to run this middleware if it match this
regular expression right so this regular
expression can be a list so we can have
multiple expressions and what does this
expression does so the regular
expression here it basically match any
URL path that does not start with the/
API or the uh Nest static or any images
or files or for example like fav icons
and such so if those routes start with
these things then this middleware will
not run all right so last part of the
section is we're going to commit these
changes so if there's any part in this
section where I I went a little too fast
you can feel free to take a look at the
source code so what I'm going to do is
I'm going to use the CLI so I'm just
going to say command uh get add to add
all these
changes and I'm going to do get commit
specify the message this is going to be
lesson three we learn about adding the
user authentication and I commit these
Chang es and then I run a git push and
this will push our changes and we should
be able to see it inside of our G
history uh all right so that's pretty
much it for this lesson I know it's a
big lesson we learned a lot of things in
this lesson uh around the ad user
authentication so let's summarize
everything so pretty much we first add
the um off JS and the Prisma RM and set
up our postgress database then we take a
look at how to configure our Prisma into
our application and also add the nestjs
server action to register a new user and
be able to save the user data inside of
our database then we also take a look at
how to add the air handling for our
register for our forms and also be able
to integrate our server action with our
signin user features and then we also
take a look at how to add the alert
feature so that user can be able to get
alerted after they sign in so that we
can be able to see if the user is logged
in or not and we also use the nest off
callbacks to get the session user ID so
that we can be able to use the user ID
through our application and then we also
take a look at how to add the drop down
menu to the top nap bar and also adding
the nestjs middleware to add the
protected routes and lastly we can make
all those changes to the source control
all right before we continue if you find
this video helpful please make sure to
like this video and also comment down
below if you have any questions or any
suggestions for the video and if you do
want to receive more videos like this
please make sure to subscribe to this
channel your subscription means a lot to
this channel thank you very much and
let's continue all right welcome to
Lesson Four where we're going to add the
member list as well as the member
Details page so so far what we have is
we have a user table and the accounts
table inside of our database and what
we're going to do is inside of this
lessons we're going to make a change to
our database schema so that we have the
members table as well as the photos
table and the members table will have
additional information about the user
and each member can have a photo so in
this case it's going to be a one to many
relationship so where each member can
have multiple photos and we're going to
worry about upload photo feature in the
later lessons but we're going to focus
on now is to set up our data schema to
prepare for other features getting added
to our application and just a recap of
what happened so far is that we have
added the routes for each of those pages
as well as register and login and also
added the uh authentication feature for
user to authenticate themselves using
the NES ofj as well as Prisma to
retrieve data from our database and be
able to validate the user and for this
lesson specifically we're going to first
uh build our members page so that user
can be able to see all the members that
we have inside of our application and
user can also be able to click on any
those users and we're going to use a
feature from nestjs called Dynamic
routes where we can be able to specify
the user ID here so any user ID that we
passed in for the parameter here is
going to be a user ID that we can be
able to retrieve the data from our
database and we can be able to build our
profile page our photos as well as our
chats and here you can see these are the
sub routes for the dynamic routes here
and we're basically going to retrieve
the data from our database by creating a
new server action called member actions
which will basically communicate to our
database through Prisma so that's what
we're going to build for this lesson and
of course there's also some other things
like the load indicators or adding the
custom air page that we're going to
focus on later of this lesson and the
code changes for this lesson will be in
the commit history so feel free to look
at that all right so now what we're
going to do is we're going to make some
changes inside of our schema. Prisma so
here you can see what we have so far is
that we have our user and the accounts
table so the accounts table can have the
account provider uh access token and
such right and user can be able to have
multiple accounts so user can be able to
have multiple uh security providers for
example they can log in with Google they
can log in with Facebook and such right
but that we're going to do is we're
going to also expand our our database to
have the members and photos so user can
have just one member and each member can
have multiple things including the
photos so here you can see I just gotone
ahead and basically add those changes so
for user I have added the member and for
each member you can see that we have the
user ID basically have the member
details like gender date of birth such
and for the relationship here we only
have one to one relation so we have one
user per member and you can see that the
field that we're uh using is the user ID
which reference to the ID from the user
table and then we're using and we're
basically specify that this is going to
be a undelete Cascade which basically
means that if the uh user has been
deleted then the member table related to
that user will also be deleted as well
and then we also have our photo so photo
you can see here we have one member can
have multiple photos and each photo can
only have one member right so in this
case this is one to many relationship so
the photo has the ID as well as the URL
and also has the public ID for the image
cloud provider and then for the photo
you can see we also have the member ID
as well as the relationship so so it is
going to be a one to many relationship
so basically uh the fields that we're
matching is the member ID which match to
the ID from the member table it's also
Cascade as well so basically if the user
is deleted it will delete the
corresponding members and if the member
is deleted it would delete also the
corresponding photos which is basically
what the Cascade means so you can see
this is basically what our database
schema look like right now uh again we
have one user per member and each member
can have multiple photos and each user
can have multiple accounts so far you
can see inside of our studio we only
have the user and account so we're going
to sync this changes so we're going to
open our new terminal we're just going
to run MPX Prisma
generate and then once we have generate
this and then what we're going to do is
we're going to push the changes to our
database so we're going to run npx
Prisma DB push so now you can see that
our database is now in sync with our
Prisma schema so now if I were to
refresh and if I were to open a new one
and try to search for a different model
for example member or let me just
restart this because we have to restart
this again so if I were to close this
and if I were to refresh you can see
that we have the account member photo
user so these are all the models that we
have all right so right now you can see
that we don't have any data inside of
our database and one way we can do this
is we can be able to go to our studio
and manually create those data inside of
each tables so this is going to be a
long process but what we can do is we
can be able to write a function to
programmatically to uh insert these data
inside our database to have our
application to work with um I basically
goone ahead and create this file called
members. dat and this fun uh and this
file you can see is basically an array
of object where each object has the data
information for the user so what we're
going to do is we're going to use this
to insert data inside of our database
and here you can see I have gone ahead
and created another file called C.S and
this we're basically going to insert the
members data inside of our database and
here you can see we basically iterate
the members data and then we're going to
uh call the Prisma that user that
creates to create the following data and
for each data you can see we also have
the member because the user um also has
a relationship with the member and the
member also has a relationship with the
photo so we're going to define a
relationship here and here you can see
we have the email password so here you
can see we're just going to use a simple
password just for development purpose
and then here we have the member and for
member we're just going to Define all
the information that we have defined
from the members. DAT and then here we
also have the image or the photos and
notice here that the image here is
defined not just only from the user
level but also from the members level as
well and the reason why is that because
we can't be able to use this image
without join the other table We join the
photos table and then after we have
defined the seed members function we're
we're just going to uh put it inside of
the main function and then in the main
function uh we're just going to call it
and then we're going to call the main
function and then if there is any errors
we're just going to log it and exess the
process and then finally we're just
going to uh disconnect our Prisma client
all right so once we have defined those
two files what we're going to do is
we're going to Define how we can be able
to call it so here you can see we're
going to use the TS node to basically
call the Prisma SL the C.S file right
because the C.S is in the Prisma folder
