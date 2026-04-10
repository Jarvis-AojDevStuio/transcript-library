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
chunk: 4
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
validated and then we're going to Hash
our password so we're using the bcrypt
to Hash the password and uh if we look
here that the hash will also take the
string for the password as well as the
salt so if we increase this number to a
higher number this will basically
increase the security of our password
but obviously this also consumes more
compute power as well so 10 will be a
good number for us to take just for demo
purposes so here we also try to search
using our Prisma orm to see if there is
existing user for this email so if there
is an existing user then we're just
going to return that this user already
exists then we're just going to create
this user inside our database and notice
that we're using the hash password for
our password hash we're not actually
going to store the actual password
inside our database we're just going to
store the hash version of that password
inside of our database so if we want to
retrieve it we're just going to decode
that password and be able to validate if
it's correct and then we also have here
that uh once we have our data created
we're just going to return the user so
notice here that for our return type
we're basically casting using promise of
course because we're basically using
async away inside of our function but
the other thing we have to pay attention
to is that I also create a type for the
action result and here for the action
result we're returning the data as type
user so this is what I did so if we were
to click on the action results and here
for the action result type you can see
that we're using a generic variable so
this generic variable we can be able to
use user or uh in the future we can be
able to have message right so this is
the action result that we're going to
type that we're going to return to the
client and the type is this either we're
going to have the object like this where
the status is success with the data is
equal to the generic type that we Define
or we have a object where the status is
air and the message is or the error is
either a string or a Zod issue array so
which will basically an array of Z issue
objects and if we were to look into the
zot issue you can see that this is what
it has right so it has this uh type and
as well as the message which going to
contain inside of the air and then for
the register form so you can see here
that it also made a change so for the
unsubmit so when the user click on the
register button which will trigger the
unsubmit this function will take the
data so basically you can see here that
we're coming out the resolver from the
client side so that we can be able to
validate the data on the server side so
here you can see for the unsubmit
function the way how it works is that
once the user click on the register it
will trigger the submit onsubmit
function right and then uh because we
specify here that the handle submit will
call the onsubmit which pass the form
data to this onsubmit function and again
the register schema we can be able to
find it here that this is going to be
the schema right the rules for the form
and then here you can see uh once we
have the data we're going to pass it to
the register user which register user we
if we look here you can see this is the
off action so in the off action we have
the registered user which is the server
action that we just created so you can
see here that um once we call this
server uh action we're going to get the
result and once we have the result we're
going to check the status so if it is
successful we're going to see that the
we're going to say that the user
registered successfully and if it's an
error or if it's not successful um then
we're going to check to see if the error
is an array if it is then we're going to
iterate the array so once we iterate the
array we're going to get the error
message and we're going to get a field
so e has so basically you can see that
uh right now we didn't cast or have any
type for the eror because um we don't we
haven't defined that yet but we're going
to Define it later but you can see that
for E it has the path as well as message
so once we have the path we can be able
to construct the field name for that and
then once we uh once we find the field
name we can be able to use the set err
from the use form so you can see that
use form I added the set air uh so we
can be able to set the air Message
manually for the form so here you can
see for this field name we're going to
set a message for this right and of
course if the air is not a list of airs
then we're just going to display the air
in the message right so we're going to
say that this is a server air and we're
going to display the air results so
basically this is the way how the
unsubmit function works so here you can
see if I were to type something you can
see that we don't have any validation
because we're trying to validate the
error once we once user click on the uh
submit button right or the Reg button so
if I were to enter a name and enter a
email right and let's say if the
password there's only three characters
right so in this case what we're going
to do is we're going to click on
register and you notice here that we are
getting an airor message and it's
setting back and the air Message is
actually sent back from our server and
we can be able to see it inside of our
Network tab so you can see here that uh
if we were to look at this request and
the response is a air message so what
we're going to do is we're going to make
sure that the password is at least six
characters so we're going to
say and then if we were to click on
submit and you can see that we have user
register successful and if we were to
look at our Network tab for register you
can see this is the message that we're
getting from our response so we have our
so here you can see if we were to look
at the off actions we're sending this
status a success and the data as the
user so this is the data we have the
user ID we have the name we have the
email uh we have the password hash as
well so what we're going to do is we're
going to navigate to our Prisma studio
and if we were to refresh and you can
see that we have our data appear on our
studio console so in the past I have
showed you that we can be able to add
different providers like Google
providers and then basically what I did
here is I have gone ahead and fill out
the credentials and then for the
credentials basically it takes the
object and this object has the name as
well as the authorized function so we
basically name this credential provider
as credentials so for the authorized
function basically when user calling the
signin this function will be called and
this credential contains our form data
so basically we will use the login
schema to validate the form data once
it's validated we're going to get the
email and password and then we're going
to use the git user by email from the
server function that we created so here
if we were to look at the server
function uh it takes the email and then
we're going to search in our database to
find that user so once we find that user
we're going to return this user as the
return type for this function so once we
have our user uh we going to check to
see if the user exist if it doesn't
exist we're going to return n um if the
password is incorrect we also going to
return all so what's going to happen is
that if the user has fully validated
we're going to return the user if it's
not validated for example if the form is
invalid then we also going to return
null so basically we're going to Define
this authorized function to validate our
user uh since we're using the JWT
session strategy uh what we also need to
do is we also need to Define our secret
so you JWT can be able can be able to
sign using a secret or a public or a
private key so we're going to create
that when we are creating our JT token
so inside of the environment variable um
I'm also going to create the off secret
so I'm just going to name something like
this is very secret for example right
this can be anything so we need a some
kind of signature or some kind of uh
Secrets because the agility token has
three parts which is the header payload
and S signature and you can see here
that uh there's more descriptive
explanation but so we basically simply
create the signature or the secret to
the code our header and then inside of
our server action uh for off actions you
can see that I have also created the uh
signin user function or the uh the
function or the server action to handle
the signin so basically you can see that
we take the login schema and uh this
login schema we can be able to find it
inside of our folder for the schema and
uh this is basically takes the email and
password and you can see here that once
we have the email and password uh we're
going to call the signin function that
we Define inside of our off so if we
were to click here uh you can see that
this is our off we have exported the
sign in and sign out feature and if we
were to look at our signin you can see
that we can be able to provide the
provider obviously this is optional and
then we also can be able to provide the
options which is the form data and such
right so if we were to look at the off
actions you can see that we provide the
credentials which is what we Define
inside of our off. config which is this
provider right here right so we specify
that we're using this credential which
is the name credentials to validate or
to authorize our user and if we were to
look here uh we basically pass the form
data right so we specified the redirect
to be false so that we don't have to
redirect anything uh we can so the
result will return us a URL that we can
be able to redirect to so in this case
we're just going to um specify the
redirected false once we sign in um if
it's successful then we're going to
return the data as success uh if not
then we're going to cach the air and
basically log the air and return the air
right so you can see here that uh first
we check to see if it's off air if it is
then we're going to uh return the air
message if it's not then we're going to
say that maybe it could be a network
error or for now we're just going to say
that something else went wrong so we're
not going to get too um specific on the
air Message air message here for now
we're just going to uh layout the
foundation and we can be able to build
on top of that later so now what we're
going to do is we're going to um edit
our login form so that when user fill
our email our password and click on the
sign in which trigger the unsubmit
function uh we're going to call our
server action to validate the user and
uh because we're using the
handle a process to save the token
inside of our browser and then here you
can see I basically gone ahead and
implement the onsubmit function so you
can see here what I did here is I
basically used the sign-in user uh from
the off action the server action that we
just went about and we're going to call
that pass the data from the form and
then the result will have the status so
if the status is successful then we're
going to push and navigate to the
different routes we're going to navigate
to the members route and if it's an
error we're just going to console air
the air message and for the router we
basically use the use router Hook from
The Nest navigation and this will allow
us to um navigate to different routes
using the push function so if we were to
test this and let me just change the
name to something that we can be able to
remember inside of our database so we're
going to using the password that we
entered to create this user and once we
uh click here you can see that we
navigate to the members route and then
if we were to navigate to our browser
for the storage and if we were to select
the cookies and select the local h 3000
which is the port that we're on you can
see that we have two keys so one is the
call back URL and the other one is the
session token and this is the value for
the session token and you can see that
this is the jwd token that we have
stored we can be able to use this
session token to validate the user using
the ofj so now what we're going to do is
we're just going to make our application
look pretty so we're going to install
the react toasttify so that we can be
able to add alerts we can be able to
make our application little pretty with
the alerts like this so what we're going
to do is we're going to use the mpm
install to uh install our react
toasttify so if we were to close this
and try to uh open a new
terminal we're just going to install the
mpm install uh save react toasttify in
our Dev
dependencies and it also tell us how we
can be able to add it inside of our
application so what we're going to do is
we're going to navigate to our providers
again so this provider component will
contains all the providers for our
application so we use it inside of our
layout so that uh every time when we
adding a new providers we don't have to
add it in here uh we can just add it
inside of the providers component itself
so that we can be able to make our um
application a little more cleaner so
what we're going to do is we're going to
uh add it here so we're going to import
those things and then we're also going
to add the toasttify container and if
you were to click on the demo Mo uh you
can see that we can also be able to
change the position on on the toast
alert so you can see that we can be able
to show it on the top you can be able to
show it in the top center right we can
also be able to show it in the bottom
right so we can be able to change the
color right we can be able to make it
dark we can be able to make it different
uh we can create different styles for
the alert and we can be able to specify
that either using the toast function
what we call it or we can be able to
specify a consistent styling in the
poost um container uh components so here
basically what I did is that I I
specified the position where the alert
is going to appear we're going to have
the alert appear consistently at the
bottom right and we're also going to
hide the um progress bar uh this is
optional you don't have to hide the
progress bar so if you don't hide the
progress bar um you will still see that
there is a progress bar at the bottom
right so you can still see that so now
if we were to navigate to our login form
and here for the instead of the . air we
can be able to use the toast and we can
be able to say that this is the air
alert so now if we were to navigate to
our login page and enter a incorrect
email we're going to see that we're
going to have a invalid credentials you
can see that we have react toasttify
alert popup and on the right in this
section I also mentioned that inside of
the cookies we have the session token
stored right inside of our cookies and
this is handled using ofj and we can be
able to retrieve this token data using
the off JS functionality so if we were
to look at the new features you can see
that we have this Universal off and
basically the off function we can be
able to handle all these things right so
we can be able to read what we have
inside of our session and be able to get
the token data so what we can do is that
uh inside of the
homepage so inside of the main page um
I'm just going to make some edits to
basically read what we have inside of
our session token all right so here what
I did is I gone ahead and basically get
a session from off um and then what I
did is I checked to see if the session
exists if not we're going to display the
not sign in if it is then we're going to
basically lock data that we have so you
can see that we have the user object and
when the token expire so we're going to
talk about the expiration for this token
later on so what we're going to do first
is we're going to focus on building the
UI and once we finish building the UI
we're going to add more functionality
for our security so here you can see uh
we can also be able to click on the out
so I basically create a form and this
form has an action so this is a button
and this button is a submit type and uh
here you can see once the user click on
the button it will trigger this action
so we're basically using the sign out
functionality from the server side so in
this case uh you can see here if we were
to call the sign out function it'll
basically have to use something like a
use server to tell that this is a server
function obviously this is not a ideal
way to do it since this is a client file
and we're calling a server action or
server function inside of a client
function so we're just going to do this
for demonstration purpose I'm going to
clean this up later so what we're going
to do is uh you can see here once we
click on the sign up you can see that we
don't have the token anymore so if we
were to look at our cookie the token
have disappear so this is just the call
back URL and now if we were to log in
again you can see that we do have a
session token stored and if we were to
go to the main page we still have our
data up here but you can see that at
this moment right now we don't have the
user ID which is very critical if we
want to Cy data using the ID of the user
but we do have the it sending back so if
we were to look at our off. it also has
this functionality of call
backs and if you were to look into this
call back uh you can see that it is a
asynchronous function that that can be
used to control what happens when the
off related action is performed and
inside of this there's also a JWT as
function so so this function uh can be
able to get a token for the user um so
if we were to just take a look at this
and just print the the token inside of
our console and then we just return the
token and here you can see uh if we were
to refresh our page uh we do see that we
have the token data right so we have our
name email and then we also have our sub
which in this case is the user ID so if
we were to look at our studio and if we
were to look at this user uh you can see
that this is the ID and this is the ID
for that user as well but at this
current moment you can see that uh the
data does not display the ID or in this
case the subproperty so in this case
what we need to do is we also need to uh
get the session and here you can see if
I were to type in s you can see that it
also tells me that work I can be able to
get the user right I can be able to make
a Prisma call because this is a server
function uh we basic basically finds the
uh user by the token. sub which is the
user ID so we're not going to do that we
already have the user in our session so
what we're going to do is uh we're just
going to log the session to basically
show you and if we were to log the
session return the
session and you can see that this is our
