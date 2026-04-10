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
chunk: 22
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
first okay so then after we restart our
Prisma studio and you can see that we
have a new user called admin and you can
see here that the uh role that the
current user is in a admin role okay and
of course this uh user does not have a
member so if we were to look at members
here and you don't you don't see a admin
member all right so now we're going to
do is inside of the off. TS we're also
going to update our session with the
user rle so in this case for the token
here we're going to have the roll which
in this case equals to the user. roll
and we're just going to ignore the type
for now we're going to come back to
adjusted and then here we're going to uh
adjust our session so the session. user
roll uh is equal to the token. roll okay
and so to fix this inside of the types
here we're going to go to the nest off.
D.S uh you can see here that I have add
the RO which is a type string and then
for session roll is a type string and
then same for the J JWT tokens well and
then here just like what we did before
uh we're going to cast that the rle is a
string okay so now let's restart our
application so now I'm just going to log
in as admin so in this case for the
Prisma studio for the user uh we have
admin test.com so we're going to type in
the admin test.com and then the password
is just password
and we're going to click on login and
here we have to fill the form uh in this
case we don't have to because the admin
will not have a member so if we were to
navigate to the main page here you can
see we have a ro which is equal to admin
here and if I were to log out and try to
log in using just a regular user and if
we were to log in and click on the main
page here you can see the role is member
so we do see that difference for the
role is either member or admin and in
terms of the role here I cast it as a
string but we can also be able to cast
using a roll enum that we have already
created inside of the schema. Prisma so
in this case I'm just going to put uh
enum roll for this type here and then
here inside of the uh I believe is off.
TS here um I'm going to cast it as using
a Edom so we have a roll okay and this
is from the Prisma client and of course
for the nest off. D.S we're going to
make sure to add the correct type for
the roll which is from the Prisma client
all right so now you can see we have the
role in place that user can be able to
differentiate the role of the current
user for example admin or member so in
this case what we can do is we can be
able to conditionally render Things
based on their current user role so if
it's an admin we can be able to render
different set of a nav links and such so
in this case we're going to navigate to
the top navigation and here you can see
inside of our top nav we have our
members lists and messages so in this
case we're going to conditionally render
these things based on the current user
role so in this case we're going to have
a member list and then here for the
admin links uh we have the admin
moderation which in this case admin can
be able to moderate the photos that's
being uploaded from the members and in
this case we can be able to render this
based on a condition and since up here
we have our session data so in this case
we can be able to get the links that
we're going to render so in this case
based on the current user role if it's
admin we're going to render the admin
links otherwise we're going to render
the members links and then here inside
of the Navar content uh I'm going to
change this I'm going to basically
iterate all the links and going to
return a nav link okay so if I were to
save this and come back here you can see
that we have only the photo moderation
for the admin that user that the admin
can be able to click to and if I were to
log out and try to log in using a test
account for example and here you can see
this is what the uh nav links looks like
for the members so now we're going to
focus on is basically create creting
this photo moderation page and also
going to prevent the admin to complete
this profile here so in this case what
we're going to do is inside of our
source for the app folder we're going to
create a new page called the admin and
we're going to call it the
moderation and we have the page. TSX and
then here inside of a page we're going
to have the photo moderation page and
then for the return I'm just going to
change it to photo moderation page and
of course if I were to currently
navigate to the photo moderation you can
see that we're getting navigated back to
the comp complete profile and that's
because our middleware so if we were to
look at our middleware here you can see
here that if the current profile is not
completed which you know the current
admin has the profile complete which is
marked as false and then what's going to
happen is that it's going to navigate to
the complete profile so in this case
inside of the middleware what we're
going to do first is we're going to
first check to see if the current user
is an admin so what we're going to do is
we're going to have the request. off
which in this case has the user and the
user has the property of role so we're
we're going to check to see if it's
equal to admin uh or what we can do is
we can be able to say roll from the
Prisma client. admin uh if it's equal to
admin if it is then in this case uh it's
going to be true otherwise it's going to
be false and then once we have the is
admin we're also going to check to see
if the current user is trying to
navigate to the admin route so we're
going to say is admin route which is
equal to Nest URL and we check to see if
the uh the the URL that we're going to
navigate to start with the admin and
then uh because here you can see if it's
a public then we're just going to allow
user to navigate to that next page then
here uh it's going to be the same thing
so if the current user is a admin so
then in this case we're going to uh
allow the user to navigate or in this
case allow the admin to navigate to
where they want to navigate to and then
what we're going to do is we're going to
see if the current user is not an admin
and we're trying and the user is trying
to navigate to an admin route now we're
going to prevent the user to do so then
we're going to redirect the user to just
the homepage and this should phasically
fix the error since the current user is
an admin and they want to go to the
photo moderation and obviously they
haven't completed profile but they will
not never get to here because if it's
admin then they can be able to go to any
page they want so now if I were to
refresh the page and try to navigate to
the uh fold moderation and you can see
here that we are successfully navigated
to the photo moderation page for the
admin user
and I'm also going to log out and try to
log in again using for example a
different user and here if I were to
navigate to the admin moderation as a
non-admin user so if I were to click
this you can see that we are navigated
to the homepage okay so you can see the
feature works okay so now we're going to
focus on is to build our folder
moderation page so before we do so uh
we're also going to come to our schema
and we're going to add a additional
property for the photo so since the
photo uh we're going to moderate so it's
either they're going to be approved or
not approved so in this case I'm just
going to add is approved uh which by
default is false when user upload a new
photo only the admin or the moderator
can be able to change the value for the
photo so we're going to save this and
inside of the seed um function for the
members and for the seed members by
default we're going to set the photo to
be true so here I'm just going to say
the is approved is true and of course we
also have to update our Prisma client so
in this case what we're going to do is
we're going to stop our application and
our uh studio and we're going to run MPX
Prisma generates to update our Prisma
client and if we were to reset our
database and try to seed our data again
you can see that the is approved here is
set to true and then what we're going to
do is inside of the user action we're
going to throw the error if the photo is
not approved so if it's not approved
we're going to say that the only
approved photo can be set as the main
image and then we're going to Flo the
error and then and the uh client
application will be able to catch it so
here on the member photos for the onset
main uh I have modified the function and
here you can see when we call the set
main image function if we got an error
so then in this case we're going to add
a toast alert to notify the user that
there's an error and eventually we're
just going to set the loading to false
okay so if we were to test it out on our
application and I'm just going to
restart our application here and in this
case if I were to upload a new photo for
example this one and obviously uh if we
were to look at the Prisma studio and if
we were to look at a photo uh we have a
new photo that set is uh is prove is
false and if I were to set this as the
main photo and you can see that we get
an error saying that only approve photo
can be set to the main image here okay
so you can see that we are uh preventing
user to set photo as a main image if the
admin not approve that so I'm going to
change this to true and save the changes
inside right database and I'm going to
try this again so I'm going to click
this as the main image and here you can
see we changed the profile to be the
main image here and what we're going to
do is inside of the member photos
component we also going to Mark a photo
that's not approved to look a little
different than the one that are approved
so then what we're going to do is we're
just going to add some styling so for
the member image inside of the photo
here so if we do have a public ID we're
going to display this image otherwise
we're going to display a regular image
and here we're going to add opacity of
40 when the photo is not approved and
below this I also add a label so it's
going to be absolute so it's going to be
inside of the image and it's at the
bottom here and we are going to add a
text saying that it's awaiting for
approval so if we were to navigate to
our application and you can see here
that we are adding the opacity and also
a label saying that is a waiting for
approval so then we're going to do is
we're going to make some modification
for the git member photos by user ID and
currently you can see it takes the user
ID and then we're going to find this
current member based on the user ID and
then select photos as true and then
we're going to return the photos uh for
this member right but in this case um if
there are non-approved photos then we're
not going to be able to have the user to
see it unless the user ID that we want
to view is equal to the current user ID
so what we're going to do first is we're
going to get the current user ID from
the get off user ID and then we're going
to check to see if the current user ID
is equal to the user ID that we want to
view and if it is then we're going to
get get all the photos
doesn't matter if it's approved or not
if not we're just going to get all the
photos that are only approved as true
and then we're going to return the
photos to the client so in this case you
can see if I were to log out and try to
log in a different user and you can see
that we're only getting this photo and
the one that is not approved will not be
able to see it and if I were to
manipulate the data inside of our
database to mark this as true and save
the change and if I were to come back
here you can see that I have two photos
right in this this case this one is
approved that's why we're able to see it
so then what we're going to do is inside
of our actions I'm going to create a new
file called the admin action. TS and
inside here we're can be able to have
the admin to reject a photo or approve a
photo as well as get all the list of the
non-approved photos and inside of our
off actions we're also going to create a
new server action called get user roll
in this case we're going to take the
session and try to get the role if the
RO uh does not exist then in this case
not roll then we're going to throw the
air otherwise we're just going to return
the roll and then inside of the admin
actions I'm going to go ahead and
basically create a new function called
get improved uh photos and here you can
see we're going to use that function
inside of our off actions for the git
user role to get a current roll and if
it's admin uh and if it's not admin
we're just going to throw the error to
say that it's forbidden and we're
basically going to return all the photos
that is not approved and if there's any
errors we're just going to throw the
error and now inside of the photo
moderation page I'm going to get the
non-approved photos and I'm going to
display the photos inside of our page
I'm just going to add the uh member
photos and be able to display the member
photos for the photos that are waiting
for moderation and in this case uh if we
were to navigate to the admin page and
I'm just going to set this photo to be
false and save the changes and I'm going
to log in as admin and if I were to
navigate to the photo moderation you can
see we do have photos that are waiting
for approval uh listed here and then
what we're going to do is inside of the
member image I'm also going to have the
uh admin to have the ability to uh
reject or approve an image so here we
have the approve and here we have the
reject and if we were to navigate to our
application you can see that we got an
error because async away is not yet
supported in client components since
this is a client component we're not
going to be able to use the off uh
function to get our session and from our
session we're going to get our rle so
we're not going to do this so we're
going to seek for other ways to do this
and if we were to look at the off JS
documentation you can see that ofj is
universal and the documentation is
trying to get us to use the off function
instead of these hooks right especially
the use session hook and you can see
here that use session hook can be used
in a client component and in this case
if we want to use a use session hook
what we can do is inside of our
application and what we're going to do
is inside of our providers we're going
to add a session provider and in this
case we can be able to use the use
session hook inside of our um
applications so in this case we're going
to import the session Provider from The
Nest off react and then we're going to
wrap our application around our session
provider inside of our source we have a
folder called Hooks and here I'm just
going to create a new hook called use
roll which in this case we're going to
use the use session from n off and we're
going to get our session and we're going
to return the rle here so if we were to
navigate back to the uh member image
here
we're instead of using a session here
I'm just going to remove it and we're
going to use the use roll and we can be
able to use this roll to check to see if
it's currently uh equal to the admin and
in this case what we're going to do is
we're also going to remove the um
opacity as well as the text saying the
um awaiting for approval since we're
currently under the awaiting for
approval moderation so what I'm going to
do is I'm going to also add row not
equal to the um admin so
roll. admin then we can be able to
display this uh awaiting approval and
then here up here we're also going to
disable the opacity so in this case
we're going to say photo is approval is
false as well as the r uh does not equal
to admin so we're going to say roll.
admin um in this case if it's not admin
um we're going to display the opacity if
it is admin we're going to uh basically
show that the full image view so for
example this one right here so you can
see we don't have the waiting approval
and the image opacity is clear and now
the admin can be able to either approve
or reject the photo based on the
moderation and here because we're using
a client session and the client session
could be undefined and here what we're
going to do is we're going to Define a
variable called is admin check to see if
the row is equal to the admin in text
and then here we're just going to update
it here so if it's not admin we're just
not going to this display the opacity as
well as the awaiting proval text and
then if it is admin we're just going to
display the uh button here right so
we're going to have the success and the
danger here so if I were to navigate to
our application and I uploaded more
photos and you can see here that we have
cooking we have a photo of golf and user
can be able to click on the uh check
mark or the reject button here obviously
we haven't implement the functionality
for those so we're going to do this next
so then inside of the admin actions
we're going to implement this and inside
here I'm just going to add the approval
photo and this is the one what we have
so in this case it takes the photo ID as
a string and then we're going to first
get the roll for the current user and
then we check to see if it's not an
admin if it's not an admin then in this
case the regular member cannot be able
to trigger this action so we're going to
say forgot or forbidden and then what
we're going to do is we're going to
first find the photo and then we're
going to include the member as well as
the user so what we're going to do is if
this photo does not have a member or the
user then in this case we cannot
approach with this photo right in this
case this photo does not belong to
anyone so then we're going to do is
we're going to take this photo and we're
going to check to see if the current
user um does not have a profile image if
the current user does not have a profile
image we're going to set the image is
equal to the current image here and
we're also going to check to see if the
current member does not have a main
image if the current member does not
have a main image we're going to set the
current photo as the main image here and
then what we do is we check to see if
the object that we have for the user
update is empty if it's empty we're
going to continue otherwise we're just
going to update our user photo with the
