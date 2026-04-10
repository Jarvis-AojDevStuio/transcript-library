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
chunk: 19
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
ahead and did that so if it's not the
index zero then we're going to show the
back button where user can be able to
navigate back to the previous step and
here we also have the continue button or
the submit button so if the current step
is equal to the last step then we're
going to have the submit if not we're
going to have the continue here and
notice here for the this button right
here is a type submit so every time when
we click on Nest it will trigger this
unsubmit function so this unsubmit
function is currently called the
unsubmit function that we have defined
up here which is a server call to our uh
to our server to save our data inside of
our database right but in this case
we're going to have to trigger the unest
function here so that if it's uh not on
the last page then we're just going to
move our current page step or in this
case our current step to be the next
step so uh in this case I'm going to
we're going to change the unsubmit here
to unest so then what I'm going to do is
I'm going to enter some data and
obviously here you can see we also have
our gender dat of birth description
right and here you can see the button is
changed to a submit button City Country
click on submit here and this will
basically trigger the unsubmit so then
in this case I'm going to add the
console lot get values here for the
unsubmit so whenever we trigger the
submit here is going to print the values
that we have inside of our form so if I
were to click this you can see here that
these are the values that we have right
we have City Country date of birth
description and such okay so now you can
see we have our wizard setup and of
course we can also go back and you can
see the datas are also persisted all
right so now we're going to take a look
at is the server action so whenever
users actually submit this form then in
this case we are going to make the
change inside of our register uh server
action to make sure that the uh the data
is actually persisted inside of our data
base so we're going to navigate to the
off actions here and here inside of here
we have a function called register user
and currently you can see here that it
takes the name email password as well as
description gender and such but uh for
the register schema here so you can see
here that we only validate data that we
passed in uh validate it against the
register schema so in this case it
doesn't uh have all the schema that we
have so what we're going to do is inside
of the register schema we're going to uh
create a new one so in this case we're
going to call it the combined register
schema which in this case zot has this
functionality called n which we're
combining the two schema together so
inside of the off actions um instead of
the register schema I'm just going to
use the combined register schema that we
defined so now if we were to take a look
at the data object you can see that it
it contains all the properties uh
between the register and and the uh
profile schema so then what we can do is
we can be able to deconstruct our data
so we have our gender
description um what else do we have
let's see so we have the City Country
data birth and such right so City
Country data birth so then after we
deconstruct our values we can be able to
um add the member data for our profiles
and because the date of birth here is a
date and date of birth here that we have
is a string so we're going to convert it
into a date that's why we do it here for
the conversion so now if we were to
navigate back to our uh application so
if we were to look at the register form
here uh we can be able to uncommon
this and try to pass the data so for the
G values is going to be the values here
and we also going to include the set
error okay here I'm just going to uncom
the resolvers here and uh we're going to
pass the current validation schema to
the Val Zod resolver and of course we're
going to import the resolvers here and
we also have our handle form server
errors as well so now if I were to
navigate back and let's say if I were to
enter some data and let's say if I
change the date here to be something
like
2016 uh October 10th right and you can
see here that we are getting an air
message saying that you must be at least
18 to use this uh to use this
application and let's say if I were to
change this
to uh 2001 okay and if I were to submit
this uh and click on the console you can
see here that we have us user register
successful and just and just to confirm
so you can see here that Kevin is
already created inside of our database
so let's say if I were to uh submit this
action again and here you can see we're
getting user already exists so in this
case we need to find ways to uh display
this air Message inside of our form so
what I'm going to do is I'm going to
navigate back to our application and if
there is an error we already set the
error inside of our handle form server
errors right and you can see here that
these uh this function does exactly that
we have done that before so then what
I'm going to do is uh inside of our form
State we're going to get the errors and
then uh if we have our server errors
we're going to display our server error
messages onto our application so if I
were to save this and try to enter the
data again so Kevin Kevin
email.com so if I were to submit this
again you can see that the uh user
already exists so in this case we are
getting the air Message displayed above
the action buttons here so then what we
need to focus on is basically after user
sign up their uh information they should
be able to navigate to a page telling
them that they have successfully uh
created their accounts so here inside of
our register
uh in a success folder I have created a
new page called the register success
page and this page simply basically
tells the user that the user have
successfully registered their uh account
and this page uses a component called
car wrapper and we are likely going to
re use this car wrapper component uh
very often here so we basically have our
header text just like how we have our
car header and our body right so we have
our header and our subheader text and
then here is our body and which in this
case delivers a message and then we also
have a footer which in this case has a
button and here for the action we have
our action label is to go to login and
then it will basically uh navigate the
user to the login page and then we also
have the header and the header text as
well and then inside of the register
form um basically uh whenever user
trigger the unsubmit it will basically
navigate to the register success so if I
were to register a new user for example
let's say we have Oliver
Oliver email.com and then if I were to
submit this and it went successful um
and you can see that it is successful
but it doesn't really navigate me to the
success page and the reason why it
happened is because you can see here
inside of our routes it doesn't include
the uh Slash register SL suuccess so
inside of our middleware you can see
that we have done this before is that if
it's not a public and it's not logged in
and it will basically navigate to the
login page so what we need to do is we
need to uh add the register here so I'm
going to say slash register SL sucess
okay and this will basically uh go
through here so if it's not logged in
then it's going to uh continue to that
page which is the success page so now
I'm just going to restart our server and
navigate to our application and let's
click on register okay so this time I'm
just going to enter a name and in this
case if I were to click on submit so now
you can see we are navigate to the
register success so you can see that it
says that you have it successfully
registered and click here to click to
navigate to the login so if I were to
click this and you can see here we're
back to the login page okay so now we're
going to focus on is basically adding
the verification part for our uh
application so when user register their
account we want to verify that they're a
real user so in this case what I have
done is inside of the Prisma um schema I
have gone ahead and create a new table
called token and inside of this table
you can see here that I have created a
ID email token um as well as expires and
in this case we're going to email the
token to that user to verify or either
verify or reset their password so we're
going to store this inside our database
and there could be two types of token so
one is verification and the other one is
password reset because we have already
made the change for our Prisma schema
right and you can see here we added a
property called profile complete by
default is false and in this case we H
um the table doesn't have this property
yet so in this case we're going to um
reset our data and also in our C.S we're
going to add this new property of the
profile complete to the user table so
what I'm going to do is I'm going to run
npx Prisma generate and this will
generate all the changes that I have
made and now if I were to come up here
and try to type on profile complete and
by default we're just going to said it
to True okay uh these these are just the
like I mentioned these are just the test
users so we said it to true but um in
the demo purpose like when we're doing
testings um when user first create their
account obviously the profile is false
because they haven't completing setting
up their profile like the images and
such right so we're just going to set
the true for all those uh dummy users
right so uh what I'm going to do is I'm
going to stop the uh
uh application running and then U
because we're going to reset our
database so what I'm going to do first
is I'm going to run the MPX Prisma
migrate reset and this will basically
reset our database and we are going to
skip the seed so we're going to see this
after so we can skip this for now and in
this case we're going to reset our data
so we're going to say yes and since
we're in a development environment we
can be able to reset our data but
obviously in a production mode we are
not able to do so because these are
customer data and then I'm just going to
run uh MPX Prisma generate and
everything works fine and then what
we're going to do and since our current
database doesn't have schema or tables
we're going to run npx uh Prisma DB push
and this will push all the tables and
schemas that we have created into our
database so if I were to push this and
here you can see our database is sync
with our Prisma uh schema right so then
we can be to seed our data into our uh
database and just like what we did
before we're going to run Prisma uh DB
seed to seed our data running the seed
member function which in this case seeds
all the data right and this will seed
all the data into our database so our
data has been seeded and again this is
the command that we uh created in the
past called seed which in this case it
compiles the Prisma do or/ C.S so now
let's take a look at our Prisma Studio
so if I were to run the MPX Prisma
studio and navigate to Local Host uh
5555 and you can see we have our uh
message table is clear so we don't have
any messages we don't have any uh likes
because these datas Are all uh reset
right and you can see that these are all
the users data and and for the users
table you can see that for the profile
complete they're all marked as true
right and if we were to look at the
members table you can see that we also
have our members table as well and then
I'm just going to start our application
mpm runev and then uh just to add
something additional to our read me here
so you can see here I have add the
definition for those two commands that I
have just mentioned one is to reset our
database and by rolling back all
migrations and applying them again from
scratch and the other one is MPX Prisma
DB seed which in this case seed are uh
data script and by running this this
will basically trigger the uh seed
command here which is what we have
defined here okay so uh if I were to
navigate back to our application and
this time I'm just going to log in as
Davis
okay and inside Davis you can see here
we are able to still see all the users
so next thing we're going to do is we're
going to uh send the token to the user
to verify themsel right but before we
send the token we need to generate the
token so inside of the lip folder I'm
going to create a new file called token.
TS and inside here here we have a
function called generate token which in
this case takes email as well as the
token type which in this case can either
be verification or password reset and
we're going to use the uh crypto which
came from the node uh which came
installed from node.js and we're going
to use the random bytes to get a token
that is a length of 48 uh characters and
we're using the hexad decimal to uh
convert into a string and then we're
going to uh set the expirations we're
going to uh have the token to expire in
24 hours and then we're also going to
check to see inside of our token table
that the current email already have a
token if it does then we're going to
delete this token and generate a new one
if not we're just going to go ahead and
generate a new token for this email
right and then you can see this is email
token expiries and the type okay so
that's all that's all the properties we
need to create a token record so then
what we're going to do is inside of the
off actions
uh when user are registered themselves
what we're going to do is we're also
going to create a verification token and
we're also going to send the token
verification token to that user
obviously we haven't uh implemented this
feature yet but in this case we're just
going to add a comment here and do this
later so too send the verification token
okay and then after they register let's
say if they jump straight towards the
signin in this case we also going to
prevent them to do so because they
haven't verified thems so then we're
going to do is inside of the signning
user I'm just going to create a existing
user which in this case we're going to
get the email from the input and get
user by the email and if the user or the
user email it does not exist then we're
going to say that we have a invalid
credentials um otherwise we're going to
check to see if the current users. email
verified is equal to false so if it's
false that means that the current user
have not verified their email address
then in this case we're going to uh
generate a new token and we're of course
we're going to have a to-do here to send
the verification token and also we're
going to return the air message saying
now please verify your email before
logging in so let's focus on the send
verification token part so we're going
to find ways to send the token to our
user in this case one way we can do it
is we can be able to use a no mailler
but in this case uh there could be
limitations on how many emails we can
send per day so in this case we're going
to use res.com which is a email service
that can allow us to send an email the
good thing is that we don't have to
register an email to send we can just
use a for example something at resent
dodev or for example then we can just
send the email to the customer okay and
here you can see allow us to include the
subject the HTML uh for the uh content
so to do so um we are using the free
tier so you can see that for free tier
this is amount of emails that we can
send per month and and 100 emails per
day and then we do uh it does support
one domain and then we do have like
schedule emails and such so we're going
to use the free tier for now for our
testing purpose um in this case what
we're going to do first is we're going
to install resend package from mpm so
I'm just going to uh stop our server and
try to install the resend package so
after it has been installed uh what
we're going to do is inside of the lip
folder I have got ahead and create a new
file called
mail.tn of the recent package and here
you can see I have gone ahead and
basically create a new environment
variable called resend API key so inside
of the mv. example this is what we have
and this is just an example so if you
getting the API key from the resent make
sure to basically uh add it here inside
of the DMV file and basically this is
going to be the resent API key so to
basically create our API key what we're
going to do is inside of our rent.com we
have a page called on boarding and if we
were to navigate to this here you can
see we can be able to add an API key so
what we're going to do is we're going to
copy this and we're going going to uh be
able to make the change for our resent
API key and once we make this change and
what we're going to do is we're going to
send an email just for testing and here
we're just going to click on send email
and you can see that we have send email
so if we were to check our inbox and if
we were to check our inbox here you can
see we have a uh message from onboarding
at resend. deev so this is going to be
the message that we uh receive from the
recent un boarding so once we change our
API key inside of our environment
variable we're also going to restart our
server so we're going to run npm runev
again and restart our application so
once you have the reset API key we're
going to come to our
mail.tn to to verify their email and
obviously we have not created the
verified email page yet but you can see
here that for the query parameter we
have our token and we assign the token
value to this and then here we're going
to use the resend. emails. send to send
the email and here we're basically using
an email that's provided from meend and
in this case uh we are allowed to send
100 email per day as a freeter and here
we're basically going to pass the uh
Target email here for the recipient and
we also have our subject and also our
email content and then over here in the
off actions what I'm going to do is I'm
going to trick trigger this send
verification email parts so since we
already have the token as well as the
email so we can basically just say await
and we're going to pass the email here
so here I'm just going to deconstruct
this so we have our token as well as our
email so I'm going to pass we have our
email and token okay so that's going to
be the send uh verification email parts
and then for the register part we also
need to change that as well so here we
also want to send the verification token
so in this case what we're going to do
is we're going to have our verification
token. email and also verification
token. token okay so that's going to
trigger the send verification email part
after we get our token so now if I were
to register a new user if I were to
enter the email for my created account
so this email have to be the uh email
that you create the recent account so
I'm going to enter that as well as a
password okay so then I'm going to
submit
and hopefully this should send a email
okay and here you can see we have a
email verification and you can see here
that we have received email from testing
