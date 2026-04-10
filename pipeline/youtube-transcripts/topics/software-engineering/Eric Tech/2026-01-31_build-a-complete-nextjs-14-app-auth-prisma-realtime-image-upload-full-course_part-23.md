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
chunk: 23
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
photo that we have and then we're also
going to update Our member as well as
the member's images so here you can see
we're going to um deconstruct the member
update and we're also going to update
our current photo as approved okay and
if there's any errors we're going to
throw the error and we also going to
implement the reject photo which in this
case it takes a photo um object so in
this case the photo object is coming
from the Prisma client and then first
we're going to check the role if it's
admin and then we're going to send a
request to Cloud Nary to destroy this
photo and then we're going to also
destroy this photo inside of our photo
table and if there's any errors we're
going to throw the air all right so now
we can do is we can go back to member
image for components and we can be able
to put the approval image and the reject
image here so then we're going to do is
we're going to implement the approval
function so here it takes the photo
image and then we're going to um
basically trigger the approved photo uh
server action and we're going to refresh
our page after this is done done and
same for the reject as well and here at
the bottom here I also have added the
approve on click as well as the reject
onclick as well and of course um if the
photo is null then we're just going to
return null here okay so this will
prevent the typescript error here so in
this case we have the full functionality
so let's test it out so I have added a
additional photo just for testing um I
have created a new user using GitHub
approval so let's test this first so if
I were to reject this and you can see
here it is removed from the fold
moderation and if I were so since this
is not real time so in this case I have
to refresh but obviously you can be able
to add a real time functionality here
and we have add this before so in this
case if I were to refresh our page you
can see that the photo that I just
uploaded has disappeared right and if I
were to take a look at our Prisma studio
for the photo
uh you can see that we only have those
two photos that we see up here okay and
let's say inside of our database I'm
just going to remove the uh profile
image here so for this user I'm going to
remove the image and I'm going to click
on Save and I'm also going to remove the
um image from the member page as well or
the memb table so in this case if I were
to refresh our page you can see that we
have no profile for this user and in
this case I'm going to upload a new
photo
again so in this case I'm going to
upload a new photo and here you can see
is waiting for approval and since this
user does not have a profile so if I
were to be the admin and I refresh the
page and approve this image in this case
and you can see this image has become
the main profile for both the member and
the user so if I were to refresh and you
can see we have the image set as the
profile image
uh for both the user and the member okay
so that works and let's try to test out
a feature so now if I were to click on
the
matches and also for example visit this
person and photos you can see I only see
this one photo and if I were to approve
one photo for example the golf one and
refresh on this member you can see that
the golf one exists for this
member and if I were to reject on this
one and it also works so if I I were to
refresh you can see that it does not
appear on this members page and you can
see now there's no photos for approval
so now you can see that everything works
and I'm going to commit all these
changes for this lesson so in this case
I'm going to commit the changes and run
get push to push the changes and of
course if I were to come back to this
and here you can see um we have a new
commit added for the at roll access
feature all right before we continue if
you find this video helpful please make
sure to like this video and also comment
down below if you have any questions or
any suggestions for the video and if you
do want to receive more videos like this
please make sure to subscribe to this
channel your subscription means a lot to
this channel thank you very much and
let's continue all right welcome to the
last lesson where we're going to deploy
our nestjs application to versel so in
this case what we're going to do is
we're going to first clean up our
application and be able to fix our build
issues and once we have successfully
fixed our Nest build issues then we can
be able to set up our versale for the
nestjs app deployment so what we're
going to do is is we're going to uh
connect our gear repository to verell
adding the necessary variables and then
we can just go ahead and deploy our njs
application to ver sell and also going
to update our production oaf for the
GitHub and the Google so if you skip
this step that's completely fine you
don't have to worry about this but after
that we're just going to test our
application one more time make sure
everything's working and that's pretty
much it for the entire tutorial and of
course all the commits for this lesson
will be in the co- repository so feel
free to follow those all right so now
let's make some final changes before we
deploy so here I'm on the current
homepage and here we getting our session
display on our page so we're just going
to make it simple and just display the
welcome match me so in this case inside
of our homepage uh I have gone ahead and
basically add the title of the welcome
match me and based on the user session
if the current user has been logged in
then we're just going to uh have the
continue button where user can be able
to navigate to members otherwise we're
just going to have a bunch of links in
this case we have sign in and register
okay so if I were to navigate to our
homepage you can see we have welcome
match me app and in this case we're
logged in so we can be able to click on
continue which will navigate to the uh
members page and if I were to log out
and in this case you can see we have
sign in and register and I'll just
change it to login since we have the
login on the top so we're just going to
have login and register and the other
part we're going to change is this uh
message here so what we're going to do
is if there is messages we're going to
display what we have here otherwise
we're just not going to display the zero
here okay so if it's zero messages
there's no point for display the account
so what we're going to do is inside of
our top navigation and inside of our top
navigation you can see we have nav link
and here is where we display the unre
count so what we're going to do is if
the uh onr count is greater than zero
then we're going to display this so in
this case you can see uh we don't have
any unre counts then we don't have to
display the uh bracket zero here and
because we know that those profs are
protected so if I were to log out and
click on one of those links it will
basically navigate me to the login page
so what we want to do is we want to
disable those nav links if the user has
not logged in so what we're going to do
is inside of the top navigation uh what
we're going to do is if the current user
session is logged in then we're going to
display the top navigation links
otherwise we're not going to display
those so in this case we're going to say
that um session exist then we're going
to display the nav links and here you
can see we have that disappeared since
the user has not been logged in okay so
now we're going to focus on is the
loading indicator so in this case you
can see if we were to log in and
navigate to the members page you do see
that there's a loading indicator shows
at the first when we try to render our
members page so but the thing is that if
we were to navigate to other Pages for
example list messages you can see that
we don't have this loading indicators so
in this case what we can do is inside of
our application because we have to find
the loading indicator inside of the
member section here for loading so every
time when we navigate to the/ members
then in this case the loading indicator
will be displayed so in this case we're
going to move this loading component
outside of the uh members so we're going
to move it to the app level and it's
saying are you sure you want to move the
loading TSX into app level and we're
going to say yes okay so then if we were
to navigate to different pages for
example list you can see we have a load
indicator shows while we're navigating
to any Pages we want for example
messages we do have loading indicator
and if we were to navigate back to metc
you can see that we also do have loading
cater here as well okay so the next
thing we're going to focus on is
basically look at if there any local
host 3,000 references inside of our
application so inside of our source
we're going to search for logo host and
you can see that we do have one inside
of our mail. so here you can see that we
do have a link that basically uh
reference to the Lo 3000 so because
we're going to deploy this in this case
we're going to have the base URL defined
inside of our environment variable so in
this case if we were to change it we
just have to change it inside of the
environment variable so I'm going to
inside of the em. example I'm also going
to create a new environment variable
called Nest public Bas URL and I'm going
to uh use it inside of the M.T so then
we're going to have the base URL defined
and we're going to replace it with what
we have here so this is going to be our
base URL
and then we're going to change it what
we have up below as
well so if we were to search it again
for the Local Host you can see that we
don't have any more and then I'm going
to also add this inside of our EMV file
as well and once we remove all the
references what we're going to focus on
now is to test out our builds to see if
it's successful so if we were to look at
our package of Json so far we have been
using is the mpm runev which is
basically run our application in
development mode and what we're going to
do is we're going to run this command
and because when we deploy this we're
going to have our application build so
we want to make sure that build has been
successful so instead of mpm run Dev
we're going to run mpm run build and now
you can see our build has complete but
if we were to scroll up you can see that
we do have some errors so you can see
here we have Dynamic server usage route
list could not be rendered statically
because it used headers and we also if
we were to scroll up you can see that we
have more errors for the
lists and also the admin moderation and
here we also have the token. TS file
which using crypto and is also not
supported in the edge runtime so we're
going to fix this first so inside our
token. TS we have the random bites from
crypto and we're using the random bites
to generate the token so what we're
going to do is we're going to replace it
to using the crypto web API to generate
our token so to do so I have gone ahead
and create a function called get token
and here you can see we create a onsign
8 by array with a length of 48 length
and then we're using the crypto from the
web API so in this case we don't have to
use the random bytes here or the crypto
here so in this case this is coming from
the global variable and using the crypto
to fill our array buffer with a random
values and what we do is basically
converting our array buffer into a
hexadecimal array and then eventually
into a string so if we were to look at
the heximal so this is our numbers and
we're converting it into hex decimal so
if it's Z it's going to be 0 1 is going
to be 0 1
and then here you can see we have 256
which is in this case 100 right so you
you can see here that we take every bite
and we convert it into heximal and then
we're going to limit it down to only two
characters and then we're going to
eventually join the array into an into
one single string so in this case it's
going to be our token and here for the
token here we're just going to replace
it to get token which will return us the
token value and then if we were to look
at the other area we have which is the
ab mod a route and you can see that we
couldnot be rendered statically because
it used headers so if we were to look at
the uh admin
moderation page and you can see here for
this server action for the git
unapproved photos we're using the git
user Ro and you can see here we're
getting data from our section which is
from our runtime and we cannot be able
to statically pre-render this component
because the server action here requires
data from our runtime so in this case
what we have to do is we we have to tell
njs that we want to force this page to
render in a dynamic way so to get around
this inside of our application we're
going to tell njs that this is a dynamic
content so in this case we have a
variable called Dynamic and the value is
going to be Force Dynamic which will
basically tell njs that this is a
dynamic content which will be served in
a dynamic way and then we also have the
list which cannot be served statically
because of headers so if we were to look
at the lists and we're going to also add
the uh Force dynamic as well so now if
we were to clear this and run the build
again and if we were to look at our
build result you can see that everything
is compiled successful and there is no
any errors all right so now let's focus
on deploying our application and we're
going to use the service cover cell
which is a platform that creates njs and
here you can see we have different plans
for the uh deployment so you can see
here we have hobby which is free so in
this case you can see does not require a
credit card
so in this case for just the testing
purpose we're just going to use the free
version which has everything that we
need and you can see we have the
automated cic pipeline serverless comput
as well as also database and we can also
be able to import our repository and
deploy our application so what we're
going to do is we're going to create our
account and I have already done so so if
you have created the account with verel
and this is what the uh overview or the
dashboard looks like and here you can
see we can be able to add a repo from
our G providers but before we do so
we're going to click on storage to
create our database and we're going to
have two different database so one is
the database that we have for
development and the other one that we
have is for production and here you can
see we have the option to create the
postgress database which we have been
using for our development uh process so
we're going to click on Create and we're
going to click on accept and we're going
to give it a name for the database and
then we can also be able to specify the
region and in this case I'm just going
to specify the USA Washington DC and
we're going to click on create so once
we have our database created you can see
we have our quick start to connect to
our database and you can see we also
have the environment. loo which is our
envirment variables for our database so
now if we were to come back to our
overview and click on import
project and you can see here it gives
the option to sign with a GitHub
provider uh but before we do so we're
going to also update our changes so you
can see here that we have some changes
that we added and we're going to update
those and before we do so we also have
to take a look at the package.json and
what we're going to do is inside of our
package.json I'm also going to add
additional command C sell build because
we have created a new database inside of
our cell and basically create a new
migration and deploy it and then we're
going to uh seed our database with the
data that we have inside of our seed. TS
and then we're going to run our Nest
build which will build our application
so in this case we're pre-publishing our
app and in this case we're going to add
all the the changes Commit This and
we're going to push the changes okay and
if we were to refresh our commits you
can see that we do have one added for
the lesson 13 so now if we were to click
on the new project here and we're going
to continue with GitHub and it says to
install the GitHub application for the
accounts you wish to import from to
continue and we're going to click on
this and we're going to install and in
this case we're going to select the
match me here so we're going to click on
import Here and Now is where we can be
able to configure it and here we can be
able to give the project name which is
match me and the framework is nestjs and
here for the environment variables this
is where we're going to add all the
environment variables that we Define
inside of our Dov so what I'm going to
do is I'm going to copy this and paste
it here and then here you can see I just
basically copy it and paste it here for
the environment variables and you can
see here that for database URL this is
going to be the database URL that we
have for the postgress that we Define
for the development so what we're going
to do is we're going going to click on
the
storage and we have our database here
and here we're just going to copy the
postgress URL here CU we're using the
production one so I'm going to do so and
then here I have basically gone ahead
and update our database URL and then if
we were to scroll down you can see we
also have our Nest public base URL which
in this case it points to the Local Host
3000 but obviously we don't know the
base URL yet so in this case what we're
going to do is we're going to leave it
like this and then we're going to come
back and edit it later so then we're
going to click on deploy and this might
take a minute or two and you can check
the progress here for development and
here is the bill log and we can be able
to see the logs here all right so now
you can see our project has deployed
successful and you can see we can be
able to click on this link to be able to
view our application and this is our mat
me application and now if we were to
take a look at our project you can see
we have our project here and if we were
to look at our storage for the match me
demo and come coming down to the data
here if we were to choose a table for
example user you can see that these are
our user data so you can see that our
data has been seated into our
application so if we were to um logged
in into one of our test account for
example and in this case we click on
login and we're going to log in using
the password that we generate and you
can see here we are logged in into our
test application and you can see these
are the users that we SE it into our app
so then what we're going to do is we're
going to
uh copy our domains and if we were to
come to our environment variable so
click on the environment variable here
uh we have these ones so we're going to
change our Nest public base URL to from
Local Host 3000 to the one that we have
