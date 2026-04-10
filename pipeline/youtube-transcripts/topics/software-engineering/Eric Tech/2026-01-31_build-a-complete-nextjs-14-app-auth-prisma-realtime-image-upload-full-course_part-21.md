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
chunk: 21
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
we test it you can see inside our user
table we don't have this uh account and
we don't have this user and if we were
to look at our account table you can see
we don't have any accounts or any
providers listed here so in this case
what we're going to do is we're going to
navigate to our login page and try to
log in using GitHub so if we were to
click on GitHub here and here you can
see it will basically redirect us to our
github.com for the oof authorized page
and in this case I'm going to click on
AU
authorize and here you can see it
navigates me to the members page and if
you were to navigate to our Prisma
studio and refresh for the users you can
see we have a new record of a user added
inside of our user table and if you were
to look at our account here you can see
we have a new account and here is the
account provider which is GitHub and
here is the provider account ID okay so
in this case uh if we were to look at
our members table however we only have
these records we don't have the new
member added and that's because we
didn't add a new record inside of our
members page and if we were to look at
our application and here you can see
we're getting an error so if we were to
click on this error you can see we're
getting a invalid Prisma member updates
because this user does not have a member
or in this case does not have a record
of member inside of the member table and
because inside of our application inside
of our providers and inside of our
providers we have the used presence
channels and because inside of our use
presence Channel hook uh we're basically
calling the update last active which
will basically update uh updated date uh
inside of their member record and that's
why you see this error inside of our
application because we don't have a
member for this user and we're trying to
update this member record uh for their
updated date so that's why we're getting
a runtime error now to solve this
because inside of our table we have a
record or in this case a property called
um profile complete complete uh so if
the user have completed profile then in
this case it's going to be true if it's
uh haven't completed their profile then
in this case it's going to be false
inside of the user table so in this case
if it's false then we can be able to
have the user to complete their profile
first before they can be able to trigger
things like update last active and such
so to do so if we were to look at our
homepage and if we were to take a look
at our session data here you can see we
have our uh user as well as the
expiration date and we're getting the
user data inside of our session here so
if we were to look at our off. and here
you can see we have our callbacks and
here is basically how we get our session
and we're getting our token before our
session so if we were to look at the
documentation for the JT call back and
you can see it's a call back whenever
the Json web token is created and here
inside of the Callback you see we have
access to user account profile uh is new
user and such and we can be able to use
it to check to see if the current user
has completed their profile if it's not
then we're going to mark it inside of
our session so in this case I'm going to
create a new callback called JWT and in
this case I'm going to open our terminal
and if we were to look at our console
here you can see we are getting the user
data and you can see here that we have
profile complete which equal to false so
in this case I'm going to set the token.
profile complete is equal to the
userprofile complete and I'm going to
pass this to the session. user. profile
complete as well so I'm using the token
to pass this variable ible or this value
to the session and if we were to uh log
out and log back in again and you can
see here that we have profile complete
is equal to false for this user and now
back to the off. we're now going to
focus on fixing the type for this air
here so here we have our type air and
you can see here the profile complete
property does not exist on type user and
adapt user so in this case to fix this
uh we're going to use something called
the module mentation in typescript and
here simply we're basically try to merge
the types uh so for example let's say if
we have a class food and interface food
and here you can see we have a property
called cheese and bacon and if we were
to create a instance of the class food
and you can see that the food variable
contains both the bacon and cheese even
though that cheese was declared in only
the food class and this is because the
interface here was merged with this
class right here so in this case we're
just going to aument this uh in this
case inside of our application inside of
our source for the types I'm going to
create a new file for the NES off and
here is what we got so inside of the
types folder I have gone ahead and
create a new file called NES off. D.S
and this is going to be the type so
we're going to declare the module for
nest off and here is going to be the
user which in this case contains the
profile complete as a Boolean as well as
our session and here we're going to get
our default session from Nest off and
we're going to have the user for the
profile complete join with the default
session. user so this will have the
additional profile complete property
inside of the session. user and then for
the next off gity token I also have add
the profile complete property for the
GWT so if we were to look at our off. s
you can see here that for the token user
as well as our session we don't have
that air type anymore so since we have
the profile complete inside of our
session what we're going to focus on now
is that if the profile complete is false
then we're not going to trigger the used
presence hook so inside of the layout.
TSX you can see here I have basically
created a new variable called profile
complete which basically came from the
session and we're going to pass it to
the providers and inside our providers
we're going to have the profile complete
and we're going to pass it to both the
use presence Channel and the use
notification Channel Hooks and here you
can see we're going to have the profile
complete and we'll check to see if the
uh user ID is null or if it's profile
complete is false uh if it's false then
we're just going to return otherwise
we're going to continue and then same
for the use notification channels if the
user ID is null or the profile complete
is false uh then we're just going to
return otherwise we're going to continue
right and of course we're going to add
the profile complete for the
dependencies for both the use
notification Channel as well as the use
presence channel here and if we were to
navigate to our application you can see
we don't have any error anymore and if
we were to navigate back to our main
page this is what we have for our
session data right for profile complete
it's going to be false and if we were to
refresh our page you can see that we did
not trigger the uh Channel subscription
so obviously since the current user has
not completed profile then in this case
we shouldn't allow the user to navigate
to any of those pages like members list
or messages right so in this case what
we want to do is we want to use utilize
the middleware that we have created and
to be able to navigate a user to a for
example a complete profile page for the
user to complete their profile before
they can be able to um access to other
pages right so in this case what we're
going to do is inside of the middleware
we're going to check to see if the
current user profile has has not been
completed so if it has not been
completed we're going to redirect them
to a different page so in this case what
we're going to do is we're going to use
the request. off and inside of it we
have the user and then user has the
profile complete property so in this
case we have the is profile complete so
in this case what we're going to do is
we're going to check to see if the
current user is logged in and it has uh
the profile complete is false and the
nest URL path or in this case the path
that we're going to redirect to uh that
we're going to uh navigate to is doesn't
equal to the complete profile uh then
we're going to return in this case we're
going to redirect the user to the
complete profile page obviously we
haven't created this page yet but you
can see here that if the the condition
satisfies uh we will basically redirect
user to this so in this case I'm going
to create a uh page called complete
profile page and inside of it we have
some text so uh if I were to navigate to
our application and if the user navigate
to match me for example and in this case
we're getting redirected to the complete
profile so if I were to log out and try
to log back in again and usually it will
redirect me to the members page but in
this this case it will redirect me using
the middleware to the uh profile or the
complete profile page so now we're going
to focus on is basically complete our
complete profile page so inside of this
folder I have complete a component
called complete profile form which is
very similar to we did inside of the
register uh schema or register page
sorry and in this here you can see we
have the profile schema for the form and
here we have the handle submit which
will come back to this and here is
basically our form so you can see here
we have our car wrapper the this is the
car title and such and we have our
header icon and this is our body so you
can see we have our form providers and
we are going to reuse the pro uh profile
form component that we Define inside of
the profile red details form and here is
where we're going to display all the
server errors and such and then here is
basically our button so after user
finish the form they can be able to
click on the submit button which will
basically trigger the handle submit and
it's going to pass the form data to the
onsubmit function and here you can see
we have the uh form data which is a type
of profile schema and here you can see
we're passing this data to a server
action and This Server action is going
to be complete social login profile
which is uh located inside of the off
action and here is basically the uh
function here and we basically take the
profile schema and we're going to get
our current user session if the current
user exists
uh then we're going to continue
otherwise we're going to say that user
has not found uh user not found and then
what we're going to do is we're going to
first find the user and then update the
current user data so first we're going
to do is we're going to uh update our
profile complete for this user to be
true and then we're going to create a
member record for this user and in this
case we're going to create a member
record inside of the member table and
because we update the current user
profile complete to be true uh we also
have to update the token so in this case
what we're going to do is uh we're going
to return the provider as the result
data so that we can be able to sign in
again using the uh NES off so that we
can be able to get a new token and
therefore it's going to update our
session to mark that the current user
profile complete is true so in this case
the off action here you can see uh we're
going to return the provider right we're
selecting the provider from the accounts
and and for each accounts uh we have a
provider right so we're selecting just
the first one and return it okay and
here you can see we're just going to
pass the data to the signin and it will
redirect the user to the members page
after the sign in has been completed so
in this case what we're going to do is
we're going to import the complete
profile form component to the complete
profile page and then if we were to
navigate to our uh application you can
see we have the the form here for the
complete profile so in this case I'm
going to complete the profile here and
I'm going to fill some information and
click on submit and here you can see it
will redirect us to the members page and
we if we were to click on the uh main
page here you can see the profile
complete is marked as true okay and if
we were to look at our uh Studio here
and if we were to
refresh you can see the profile complete
is marked as true and if we were to take
a look at the profile here or sorry the
member here you can see we have a new
record added for the this test account
right all right so now we're going to
focus on is the Google o off here so
what we're going to do first is we're
going to navigate to Google developer
console and if you haven't created the
account just go ahead and create the
account and here you can see we're
currently on the Google developer
console so in this case we're going to
create a name in this case we're going
to call it match me and we're just going
to create and after the project has been
completed I'm just going to select the
project and inside here I'm just going
to go to the API and services and here
we have the O off consent screen and I'm
just going to click on this so in this
case what we're going to do is we're
going to select the external and here
you can see it's available for any test
user with a Google account so uh we're
going to have the app to start in a
testing mode and it will be available to
users that we add to the list of the
test users so we're going to click on
Create and here we're going to give it
the app name and here we're going to add
the user support email I'm going to skip
this I'm going to add it on my own and
then we don't have a logo right now so
we're going to skip this and here is the
app domain we don't have it so we're
going to skip that as well and for the
developer contact info I'm just going to
use this email address to um add it here
and here I'm just going to save and
continue and then here for the Scopes
we're not going to add any Scopes here
so we're going to save and continue and
then for the test users here if there's
any users that we want to add here we
can be able to add it here and in this
case we're just going to save and
continue so after we edit the app
registration we're going to back to our
dashboard and then what we're going to
do is we're going to click on
credentials and inside credentials we
have the uh getting the O off client ID
and the secrets so we're going to click
on this and in this case we're going to
say it's going to be web application and
the name is going to be called match me
and here we're just going to add a URL
which is locost 3000 and for the uh
authorize redirect Ur uh that's going to
be our call back so in this case I have
mentioned here that we can be able to
see see it inside of our API off
providers so for Google here is going to
be the call back URL here we're going to
copy this and I'm going to paste it here
after we add the redirect your eyes
we're going to click on Create and we
will get a client ID and a secret and
we're going to add inside of our
environment variable and once I get the
ID and secrets I'm going to add inside
of the environment variable and for the
uh example here this is what the key
look like so the Google client ID and
Google client secrets and just for
reference on where we using it here is
the off. config.txt
and you can see we also have a new
record for the account account for the
Google provider so if we were to
navigate to the application and I'm
going to enter some data here and I'm
going to click on submit and because
we're going to trigger a sign in again
so in this case I'm going to click on
the same user to sign in and I'm going
to click on continue and here you can
see we're currently successfully
navigated to the members page so pretty
much that's going to be our ooff section
for adding the GitHub and Google
authentication so what I'm going to do
is I'm going to close all of this and
try to commit all these changes so I'm
going to commit this and I'm going to do
get push okay all right before we
continue if you find this video helpful
please make sure to like this video and
also comment down below if you have any
questions or any suggestions for the
video and if you do want to receive more
videos like this please make sure to
subscribe to this channel your
subscription means a lot to this channel
thank you very much and let's continue
all right welcome to the last lesson
where we're going to add row access to
our application so what we're going to
do is we're going to create a admin roll
where admin can be able to approve the
photos of a user and this is what's
going to happen so whenever the user
uploads a photo it's going to be in the
status of awaiting approval the admin is
going to log into the application uh
they can be able to approve or reject a
photo and let's say if the admin
moderator approves this photo then the
user can be able to see the photo being
approved and other users can be able to
view this member's photos Okay so that's
going to be the functionality that we
going to add so it's going to be the
focus for this lesson and the code for
this will be in the source code so feel
free to look at that as well all right
so now we're going to focus on is
basically adding roles to our
application so inside of our schema.
Prisma uh you can see here that for
users we're going to add a role so user
can have the admin or just a regular
user so in this case at the very bottom
I'm just going to create a enum and this
enum will basically contains two roles
so far so we have the admin and the
member and then up here for the user I'm
just going to create a new property
called roll and this property has a type
role and by default every time when user
create a new record of user uh default
value will be member and of course after
we update our user table what we're
going to do is we're also going to
update our C data so inside of our C.S
you can see here that we have seated uh
some regular members for testing purpose
we're also going to seed a admin user so
in this case what we're going to do is
here we have seed members I'm also going
to create a new function I'm going to
call this seed admins and here you can
see I've created the seed admin and this
basically creates a admin user and you
can see the name is admin and for the
password it's just regular password same
as what we have for C members and notice
here that we got an error for the role
because we haven't update our Prisma
client and in this case we're just going
to finish this up so in this case we're
going to say await seed admin to call
the admin function to generate a admin
user and this admin user does not have a
member so in this case the members will
not be able to see the admin from the
members list so in this case we're going
to type npx Prisma generate to update
our Prisma client and this should allow
us to create role for the user so after
we make the change in the schema. Prisma
we can be able to reset our data and see
our data again so I'm going to do this
