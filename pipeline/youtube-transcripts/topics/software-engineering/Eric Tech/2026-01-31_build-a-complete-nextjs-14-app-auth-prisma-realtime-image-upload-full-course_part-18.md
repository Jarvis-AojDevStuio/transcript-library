---
video_id: "HqlJjX9uIuk"
title: "Build a Complete Next.js 14 App (Auth + Prisma + Realtime + Image Upload) — Full Course"
channel: "Eric Tech"
topic: "software-engineering"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=HqlJjX9uIuk"
word_count: 3997
chunk: 18
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
cursor and the nest cursor here is going
to be optional so it's a type of string
and we're going to uh specify the nest
cursor here so now what we can do is
inside of the message table we can be
able to pass the N cursor to our use
messages hook and in this case if we
were to look at this hook it uh return
us the loading more uh as well as the
it return us the low more loading more
as well as has more so we're going to
utilize those uh three return properties
uh inside of our components so uh then
inside of our application we you can see
here we have a c and this is the table
right so what we're going to do is we're
going to put this uh because I'm going
to add a uh button at the bottom so
we're just going to put this inside of
div so here you can see we have our card
because we already at the uh Flex here
so we're just going to put the class
name here inside of our table to show
the overl auto and and after the table
you can see I added a div and inside
here you can see we have a button and
basically if user click on this uh if
there is more then it's going to be
enabled and we're going to uh trigger
the load more function that we def find
inside of our use messages which is this
one right here the low more and we're
going to trigger uh the server action
call and set the messages as well as the
nest cursor okay so that's pretty much
uh if there is no more then we're going
to display there are no more messages to
click and the button will be disabled
okay so now if I were to refresh our
application uh you can see we have a
button here uh and you can see here that
we have two messages sh uh and then if I
were to click here you can see we can be
able to load more and we can be able to
load more here and that is something
that we have to fix because it just
keeps showing the nest next two elements
but it doesn't show the previous two
elements or the previous rest of
elements so if we were to come to our
use messages and if we were to take a
look at the use message store and you
can see that when we set the message we
basically uh you can see here that when
we calling the low more uh we basically
set the messages but in this case what
we need to do is we also need to to uh
put the uh current messages that we have
and basically append it at the back so
then inside of our store I'm just going
to modify our set function in this case
it takes the new messages so you can see
here that we're going to join our values
so we have our stay down messages which
is our previous messages as well as our
current messages and then we're going to
put it inside of our map and you can
simply just do things like this and it
works fine but currently because we're
in a developer mode there could be a
situation where we have H module reload
so we need to make sure that we have
unique values so not only we're going to
join the data that we have for all the
messages uh we're also going to uh
filter by the unique value that's why
we're using a map and for map where we
can be able to guarantee to have a
unique values and here you can see for
the map we're going to have the uh
message the ID is the key and the
message is the value and then we're
going to get the values for the map into
an array and we're going to return this
as the new messages value for our
message store so now you can see if I
were to come back to our
application uh by default we have two
values right two elements and if I were
to click here you can see we have new uh
two elements showing which appended at
the back of the array and you can see
the dates are sorted in a descending
order right and just to make sure that
it is right if we were to look at the
messages here uh we do see hi back this
is cool unre messages right unre
messages new message here and we also
have hi Sarah so hi Sarah this is TD
right hi Sarah so seems like the
messages are in order and of course one
thing that I forgot to do is inside of
the message store uh we set the message
here and in this case you can see that
we basically pend the messages at the
end of the list but here when we we do
the reset we are basically putting a
empty array uh in this case we are going
to have the empty array added at the
back of the list which is not something
that we want so what we're going to do
is we're going to uh Define a new method
called reset and we're just going to uh
set the reset here and whenever we
unmount the components we're going to
trigger the reset here all right so I'm
just going to add the reset here and
this is going to be reset
messages and then here I'm just and here
I'm just going to trigger the
reset reset messages and then if I were
to come back to our application and
refresh so here if I were to come back
to here you can see we have completely
different messages here so if I were to
continue to load more until there's
nothing left right for example hi back
and if I were to come to our lbox you
can see that here we only have the lbox
messages okay and I can be able to load
more and here you can see everything
works fine all right so to wrap up this
lesson uh what we're going to do is
we're just going to commit all these
changes for this lesson and in this case
we have added the passation and
filtering inside of this lesson so I'm
going to commit these changes and push
it to the
commit and if we were to come back to
the repo for the match me you can see
that we do have lesson 9 which is adding
the pagination and filtering so again if
there's any uh part in lesson where I
just talk too fast or skip any parts uh
feel free to look at the commits history
for this lesson and you can be able to
find some useful stuff all right before
we continue if you find this video
helpful please make sure to like this
video and also comment down below if you
have any questions or any suggestions
for the video and if you do want to
receive more videos like this please
make sure to subscribe to this channel
your subscription means a lot to this
channel thank you very much and let's
continue all right welcome to lesson 10
where we're going to focus on continue
to expand our features for our
medication so in this case what we're
going to do first is we're going to add
a registration wizard form so in this
case we're going to have a form where
user can be able to fill their genders
date of birth description location and
such and then what we're going to do is
we're going to set up our email service
called resent which is going to be a
email service that we can use to send
our verification link to the user and
user can be able to use that link to
verify themsel user can be able to
receive the email and after user click
on the link it will navigate to this
verification page and user will be able
to verify the email and be able to log
in and use the application and the other
part we're going to add is the forgot
password and user can be able to enter
their email for the forgot password and
the user will receive the reset password
Link in their email and then they can be
able to click it and be able to reset
their password so after the password is
reset they can be able to navigate to
the login page and login and be able to
use the application so that's basically
what we're going to focus on for this
lesson and again the code for this
lesson is going to be in the C commits
here so feel free to check the Cod
commits for the corresponding lesson all
right so before we go any further um So
currently you can see here that uh if we
were to log out of our application and
let's say if we were to refresh and you
can see here that we're getting a 401
unauthorized error that's because our
Pusher channel is try to subscribe to it
even though that we already logged out
and if we were to look at the uh request
really quick we can see that this is
from the presence match me and if we
were to look at the code here for the
providers inside of providers we have
the use presence Channel and here is our
presence match me okay so we're trying
to subscribe to this channel even though
that we're logging out so to solve this
problem what we can do is we can be able
to pass a user ID to our uh hook use
pres hook and in this case it takes the
user ID as a string and it can be
optional okay so we're going to check to
see if the uh user ID exists if not we
we're just going to return we're just
not going to trigger this use effect at
all okay and then back to the providers
uh you can see here that we're basically
pass the user ID and then for the user
ID here we're just going to have either
string or null uh and then for the
providers we basically pass user ID and
the user ID is from our parents which in
this case is from the layout and the
layout is getting the user ID from our
session right so in this case you can
see that we passed the user ID here so
if the user ID exists then we still have
a user in our session and if not we're
just not going to subscribe at all right
so if I were to navigate back to our
application and refresh again uh you can
see that we don't have that air anymore
and since the user ID is part of the use
effect I'm just going to also add use
user ID as the dependency here so now
let's work on the register part of our
application so you can see here that
currently I'm on the register page and
so far what we have is just the name
email and password right but obviously
we want additional information and if we
were to look at our database we have a
lot of information that we require from
the user if we were to look at the
schema. Prisma and you can see here that
we were going to get the users or the
members for example date of birth gender
and such right so in this case uh what
we're going to do is inside of our
cobase we're going to come to our
register
schema and here you you can see so far
we have name email and password and
inside of the register schema you can
see I've have gone ahead and basically
create a new uh schema which is called
profile schema that we can be able to
have the user to enter for example their
gender description their location as
well as their date of birth and here uh
notice that for the data birth uh we're
basically using an additional validation
which is called refine and if we were to
look at the Zod documentation and you
can see that it provides a custom
validation logic which is called
refinements we can be able to create
additional validation for a code for
example if the field is a string and we
can be able to continue to refine it by
specifying that we want the string to be
for example uh less than this amount of
characters right or in this case what
we're going to do is we're going to
first get the date and then we're going
to calculate the age of based on the
date of birth that we have already
defined inside of our U folder and you
can see here that we have the calculate
age which we have been using this uh
inside of many places inside of our
application so which in this case it
takes the date of birth and it's also
going to take the current time and we're
going to calculate the difference in
years and then we just check to see if
it's greater than or equal to 18 if it
is then we can be able to uh continue
otherwise we're just going to display
the air message so then what we're going
to do is if we were to go to the
register form. TSX component you can see
that this is what we have so far right
so we have our car header as well as our
car body this is our form data which is
exactly what we have here okay we have
our header we have our body of the form
and you can see here that we basically
have these inputs uh display and inside
of the form so my plan is basically
going to take this form elements and be
able to refactor this into a separate
component called user form so my plan is
that we're going to have a user form to
basically fill the register schema that
we have already and then we also going
to create a new component called profile
schema to fill the profile or the member
uh information and then we're going to
make the register form component to be a
centralized place to navigate to either
the user form or the member form and in
this case we're going to have some kind
of like a wizard that user can be able
to navigate back and forth for the form
and once they fill both the user and the
member form they can be able to submit
their registration so in this case um I
have gone ahead and basically create a
new file called user details form inside
of the register folder and we can simply
just pass the register schema methods to
this function but what we're going to do
is we're going to use the form uh use uh
use form context from the react hook
form so in this case what we need to do
is we're going to wrap this component in
a form provider and pass the uh methods
from our register schema use form into
that uh form provider so that it has
these methods that this function have
access to or this component have access
to so uh in this case I'm going to
delete what we have already so far so
accept the submit button so this is
going to be uh a button that will that
will exist inside of the register form
so whenever after we finish the user
form as well as the member form user can
be able to click this to uh proceed so
I'm going to remove this and I'm going
to import the user detail form here and
be able to add it inside of our
application so this is going to be the
user details form
and then for the form provider because
we are going to pass um our Uh current
register form data right our methods to
the use form context is going to be a
single value so so in this case I'm
going to create a uh value here and
deconstruct that later so I'm just going
to call it the
register uh uh form
[Music]
methods and in here I'm just going to de
constru this so it's going to be const
and it equals to the register form
methods and I'm going to use this
variable and deconstruct that and pass
it to our form
providers so that the context will have
the values that we have here okay and
then uh we're going to make sure that we
remove those unused values because we
have already used them here right so I'm
going to delete all unused data and save
this uh also maybe maybe remove some
unused stuff here as well so the input
one here because we already defined the
input here and now if I were to come
back to our application you can see that
our register form still look the same so
if I were to just click on register you
can see we have errors and I can click
on Eric uh for
example
email.com and you can see here that we
have the password
right everything looks fine and if I
were to just enter just one password
okay you can see that it says the
password must be at least six characters
so it looks fine for testing purpose if
I were to come in this out and I can
also be able to console log uh the data
part and if I were to come to our
console and I if I were to uh pass in a
different uh uh password here so if I
were to submit you can see this is our
uh data here right so this is what we
have when user click triggered the
unsubmit function so uh now what we're
going to do is uh since the register
schema here if we were to look uh we
only have the uh register schema
included so in this case what we can do
is we can also be able to include the
profile schema for the register schema
as well so I'm just going to say the end
type of the profile uh schema so now if
we were to cover to the uh register
schema here you can see that it has all
those fields right so name email
password gender description and such and
because we also going to have a wizard
that user can be able to click on a
different step of the form then in this
case we're going to have a steps schema
so in this case we have the register
schema and the profile schema here so
I'm just going to update import here and
also provide a state to keep track of
which Step we're on so in this case by
default we have a step zero or in this
case uh in index zero which is uh the
register page right so the first page is
going to be the register and then we
have the profile page right and then
here we have the current validation
schema so that's going to be uh step
schema at this current index so in this
case it's going to be the register uh
schema so and then inside of the
register form I'm going to create a
function uh called the get step content
so it pass the current step number and
based on the number we're going to
either going to return this component or
this component or by default we have a
unknown step right and then here we also
have the go back and go Nest so user can
be able to go back to the previous page
or they can go next to the next page and
if the current uh step is equal to the
last page or the last step then we can B
basically just trigger the unsubmit
which is what we have here so notice
here that I have removed the uh data
here so I'm just going to get the values
from our form and be able to Trigg
trigger the unsubmit and then we also
have the set active step so so in this
case we can be able to increment our
current uh step by one so in this case
we basically move on to the next step
and then in terms of the profile details
form I have gone ahead and basically
also create that so here you can see I
have basically uh have the gender list
and these are the all the options that
we have so first we have our gender and
we also have our date of birth and
description City Country location and
such and we bind that with the register
schema that we have so you can see here
that uh for the form providers the
register form methods right so this is
the register schema which includes all
the all of those things so we have
already binded those things already and
that's why we have the uh values here so
we can be able to get values for gender
we can be able to bind it with the
gender uh or register this input with
the gender uh scheme input and of course
most importantly we also need to display
the correct page so currently we just
basically display the user detail form
so in this case we're going to um have
the git step content to uh return us the
correct component to display so in this
case based on the current active step so
if it's on the first page obviously it's
going to be the user form if it's the
second page it's going to be the profile
details form so in this case we're going
to uh save this and if we were to take a
look at this and of course
uh if I were to just change the state
here for example one in this case we
have something like this right where in
this case user can be able to enter
their gender uh their description City
Country and such and if I were to say
that a different page for example like
step step uh two for example then in
this case we have an unknown step so
here I'm going to do exactly that so
here you can see here we have our
register button and I'm going to replace
that with our nest and previous button
here so here you can see I have gone
