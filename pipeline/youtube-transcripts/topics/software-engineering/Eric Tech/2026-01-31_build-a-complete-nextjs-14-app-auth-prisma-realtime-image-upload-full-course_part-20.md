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
chunk: 20
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
at recent. deev and if we were to hover
this you can see that we have the verify
email and then we have the token at the
very bottom okay so we do know that this
will redirect us to the verify email
part but we obviously haven't created
the verify email page yet so we're going
to do so so to basically create verify
token page what we're going to do is
inside of the off folder I have gone
ahead and create a verify email page and
this will takes a search parameter and
in the search parameter has the token
string and we're going to pass this
token to the verify email function and
inside of the off action I have gone
ahead and also create this verify email
function as well so you can see here
that uh it takes the token and we're
going to get token by token and inside
of the tokens uh file just like how we
did it for the email we're going to get
token by token and and what we're going
to do is once we get our token we're
going to check to see if the token
exists if doesn't we're going to send
the invalid token back and then we're
going to check to see if the token has
been expired and if it is expired then
we're going to send the air back and
then we're going to get our existing
user from our email and then we're going
to check to see if the user uh exists if
it doesn't we're going to send the air
back otherwise we're just going to
update our user table and mark the email
verify to be the current date and then
we're going to delete the current token
from our token table since the current
user has been already verified and then
we're going to return success back to
the client so back to our uh page here
so once we get our result we're going to
display the result using a result
message component So based on the status
here either we're going to display a
check mark or we're going to have a
exclamation triangle to say that it's
not successful and we're also going to
display the message here and of course
we also have to add the verify email in
the off routes as well so that user can
be able to add access so now if I were
to navigate to our email here if I were
to click on the verify email and you can
see here that we have successfully
verified and if we were to look at our
token table you can see that we don't
have any token anymore because it has
been deleted and for the user here I
just blocked out the email but you can
see here that for this record uh for
this user you can see that we have the
email verified added on this date okay
so you can see that currently we have
successfully verified this user so now
what I'm going to do is let's say if I
go back to this page and let's say if
user you know decide to click on this uh
email again right which in this case it
navigates to this link so if I were to
refresh on this page and you can see
here that we have a invalid token
because this token is no longer exist
inside of our token table and just to
make sure that we cover all the edge
cases here uh let's say if we have one
that has been expired so I have already
deleted This Record inside of our
database and let's go to our register
and create a new user so we're going to
log into to the same email that I have
provided before okay and then I'm going
to submit this so now you can see that I
have received the new email uh sent from
resend and now if I were to go to the
Token database you can see that I have a
new token added and of course again I
blocked out the email uh and here you
can see that here is the token and I'm
just going to set the expirations here
to be for example uh to be past 48 or 24
hours here okay so I'm going to save
this and now if I were to click on the
verify email here and this should
mention that the token has expired so
you can see here that if we were to look
at the logic here if has been expired
then we're just going to return the
airor back let's also take a look at the
if the existing user has uh missing so
if we were to navigate to the user table
and if I were to delete this record then
I'm also going to change the token here
to become within the expiration time
period which is what we have before so
if I were to save this and now if I were
to click on the verify email
again and we should see that user have
now found because we have already delete
this user record inside of our user
table so pretty much here you can see we
have tested all the edge cases for the
verify emo function okay so now we're
going to focus on is basically adding
the reset password here so inside of the
email in token similar logic we're going
to send an email to this uh user saying
that we should reset the email right or
reset the password so in the off actions
I have also uh gone ahead and add a new
action called generate reset password
email which in this case it takes email
in this case we check to see if the
current user exists if doesn't we're
just going to send the air back
otherwise we're just going to uh
generate the token and send the passord
reset email okay so uh if we we're to
navigate to the login here so this is
our login form and we're going to add
the forgot password here so below the
login here uh what we're going to do is
I'm going to add a additional Link in
this case it's called forgot password
and it's going to navigate to the forgot
password page so I'm going to come to
our uh app here and I'm going to create
a new page called forgot password inside
of the off folder so then inside of the
off folder I have gone ahead and create
a forgot password folder and inside here
we have our forgot password page which
in this case it renders the forgot
password form so this is our form and
it's very simple you can see here that
we're using the use form uh and here in
this case we are going to only have just
one single field which is the email
field and after the user have entered
the input email we're just going to have
the submit button and user can be able
to click on this and here's our on
submit function So based on the field
value data we're then we're going to
pass the email to our generate reset
password email function and then we're
going to set the result uh into the
state so that we can be able to display
the result at the bottom or the footer
of the card and because this is a new
route so I also added the forgot
password for the authentication route
all right so now if we were to navigate
to our forgot password page and now if
we were to enter the email to reset and
here you can see the email has not been
found because inside of our database I
have gone ahead and delete this email
address and remove this user so what
we're going to do is we're going to
navigate to the register page and we're
going to register this user so I'm going
to enter the name here and email as well
as the password and also um I'm going to
enter the profile here and then I'm
going to click on submit and here you
can see we have successfully registered
so if we were to look at our database
and if we were to look at our token you
can see here that we have a token record
added for verification and if we were to
refresh here you can see we have a new
user and it doesn't show that the email
has been verified and we do see the uh
notification saying that to verify your
email address right so uh in this case
we're not going to do this for now
because we have done this before and
what I'm going to do is inside of our
application I'm just going to go ahead
and try to forgot the password so here
we're just going to test out the forgot
password functionality this should find
the email and send email for the forgot
password so if I were to click on the
send reset email and here you can see it
says the password reset email has been
sent please check emails and here you
can see I have a request for the
password reset and if we were to look at
our database for the token records we
went from verification to password reset
so now we're going to do is we're going
to add the reset password page and then
we're going to test this out so to get
started first what we're going to do is
inside of the LI folder for the schemas
we're going to create a new schema for
the reset password which in this case
we're going to have the new password as
well as confirm password and after user
have entered both the uh new password
and confirm password we're going to
confirm if they are the same if not
we're just going to uh send the error to
request them to enter the same password
so in this case I have gone ahead and
basically create a new file called
forgot password schema and here we're
going to use Zod to validate our form
and here for our form we only have the
password and confirm password in this
case they are both a minimum of six
characters and here we're going to use
refine for this entire do object to
refine to see if the current data do
password is equal to the confirmed
password if it is uh then we're going to
continue if not we're just going to send
the message air back and then we're
going to display the air Message In the
confirm password field so then we're
going to do is we're going to create a
reset password function in this case I
have gone ahead and do so inside of the
off actions and here it takes the
password and also the token so if the
token is missing then obviously we're
just going to return the error and
because this token is from the search
parameters from our uh uh reset password
Link in this case if it's missing then
obviously we're just going to get an air
and set it send it back to the client
and then we're going to get our token uh
from our token record and if it is not a
valid token then we're just going to
send the invalid token air and then here
we're also going to do more additional
uh validation like check to see if the
token has been expired if it has been
expired then we're just going to send
the air message back and we also check
to see if the current user exists right
so if the current user has not been
found then we're going to return the
airor message back to the client and
then here is where the uh actual Logic
for changing the password so here we're
going to uh hash the password and find
the correct user and be able to update
the password hash and then since we have
already update the password for this
user we can be able to delete this token
inside of our token table and then we
can be able to send a success status
back to our client saying that the
password has been successfully updated
and user can be able to try to log in
again and inside here I have created a
new folder called reset password and
here we have a component called reset
password form which is very similar to
what we have for the forgot password and
here inside of the reset password form
you can see here we have the form here
and we have two inputs so one is the
password and the other one is the uh
confirmed password which is similar to
what we have the
for the reset password schema and then
after user have entered these data they
can be able to click on the uh submit
button which will basically trigger the
unsubmit function which takes the uh
form data which is the reset password
schema data and then it will basically
pass the password as well as the token
from our search parameter to our reset
password function uh and then we're
going to store the data inside of the
result here and then for the type here
is going to be an object with a status
of either success or airor and and then
here the data type is going to be just a
string okay and in this case uh we're
going to display the result in the
footer of the card here and then I'm
just going to add the reset password for
the off routes okay so now if we were to
navigate to our application and if we
were to click on the reset password uh
we should be able to see a uh reset
password page which in this case we are
going to enter the new password and the
confirm password so in this case I'm
just going to enter a new password and
I'm going to click on reset and here you
can see we have successfully reset our
password so now if we were to click on
the login page and if I were to enter
the new password again and it says that
please verify your email before logging
in so in this case uh we're going to
verify the email first okay so it says
that the ver email has been verified and
we're going to log in again and here you
can see we are successfully logged in to
our application all right so now we're
going to commit all these changes so in
this lesson so far we learned about
adding the register brizard where user
can be able to fill the user and the
profile information and as well as the
account verification and the password
reset features so we're just going to
commit these changes and in this case
we're going to push these changes to our
GitHub histories so in this case we're
going to say get push and we're just
going to push the changes and if we were
to look at our uh G repost and refresh
and here you can see we have a new
commit all right before we continue if
you find this video helpful please make
sure to like this video and also comment
down below if you have any questions or
or any suggestions for the video and if
you do want to receive more videos like
this please make sure to subscribe to
this channel your subscription means a
lot to this channel thank you very much
and let's continue all right welcome to
lesson 11 great job for making this Mar
so uh this lesson is very optional if
you don't want to add the OA side of
things where we're going to add a GitHub
or Google providers for the logins so if
user click on this they can be able to
log to our application either through
their Google account or GitHub accounts
as long as you have those things you can
be able to log in and that's the feature
that we're going to add and let's say if
user did not have account for this
application then we're going to navigate
the user to the register page where they
can be able to fill out their member
details like their gender um description
and such right so that's basically what
we're going to focus on for this lesson
and just to give you a snapshot of what
it looks like so if I were to click on
the Google here uh it would navigate me
to the Google signin and you can be able
to see that I can be able to choose the
account that I want to use to sign in
with Google and the other option is
using GitHub so I also have a GitHub
accounts so if I were to click on the
GitHub here and I can be able to choose
the accounts that I can be able to log
in with and of course the code commit
for this lesson is in the code commit
history so feel free to take a look at
the code for this lesson all right so to
implement this um first we're going to
focus on the UI so here you can see
inside of the login folder I have gone
ahead and create a new file called
sociall login. TSX and inside of this
component you can see here that we have
displayed the buttons so so far we're
just going to use the Google and GitHub
for the providers and in this case we
have the name and the icons and we're
going to iterate the providers here to
display the buttons and here we have our
unclick action in this case which will
trigger the unclick here so the
providers is either going to be Google
or GitHub and it's going to trigger the
signin uh function from our NES off and
if we were to look at the NES off JS uh
documentation for the signin o off and
here you can see we can be able to pass
authentication providers for example
Google and it will basically redirect to
the providers that we provide for the
signin page and user will basically
authenticate themselves using that
provider and of course we can also be
able to specify a call back URL to
specify which URL the user will redirect
to after signing in so here you can see
for the sign in we passed a object and
in this case object has a property
called call back URL which we're passing
the route in this case is going to be
the members and after user signing in
they can be will to redirect to this
route so in this case you can see we
have Google and GitHub and I have add
the social Lo in in the login form so
inside of the login form at the very
bottom before the forgot password I just
add the social login component here and
in order to use GitHub and Google to
authenticate our users uh we also need
to add them into our providers inside of
our off.
config.sys we are going to pass the
client and secret to each of the
providers and I'm going to talk about
how we can be able to get the client ID
and the secrets later and then for the
credentials here you can see I made a
small change and here you can see I add
a check to see if the user. password
hash exists and if we were to look at
the user here for the password hash it
could be a string or null so if it is
null then we don't need to pass the
user. password to the compare function
since it is expecting a string so we're
going to check to see if the user.
password hash is null if it is then
we're just going to return null so in
this case we're going to get those
values so I'm going to first get the
GitHub one first so inside of a GitHub
I'm using a test account and if we were
to navigate to settings and then if we
were to scroll down to developer
settings and then here we can be able to
go to the ooff apps so in this case
we're just going to go ahead and click
on the new ooff app and here we're just
going to give it a application name so
here I'm just going to call it match me
app for the time being here we're just
going to use HTTP uh Local
Host 3000 and then we're also going to
provide a authorization called back here
L and if we were to look at our
application for the API SL off/
providers it basically tells us the call
back URL so here you can see this is our
call back URL that we can copy and this
is going to be the one for GitHub so I'm
just going to copy this one and then
we're not going to enable the device
flow so we're just going to register our
application and here you can see we got
our client ID as well as our client
Secrets but we have to generate our
client Secrets first so after we logged
in and here is our client secrets so in
this case we're just going to uh copy
the client ID and the secrets and add it
inside of our environment variable so in
this case you can see we're just going
to add the GitHub client ID and the
secret to our environment variable now
this is obviously just an example and
the real key and the secret will be
stored inside of the EMV file so this is
just an example okay so once we have our
ID in secrets we can be able to test it
but before we test it um I just just
want to draw the attention that because
we're using a social login uh we're not
going to have a password entered when
user going to enter using a social login
because they're just going to log in
using their uh social login so like we
did in the past that we set the password
hash to be notable and that's why you
see here inside of our off config that
we're setting it to be notable then in
this case we're going to check to see if
the password hash exists and here before
