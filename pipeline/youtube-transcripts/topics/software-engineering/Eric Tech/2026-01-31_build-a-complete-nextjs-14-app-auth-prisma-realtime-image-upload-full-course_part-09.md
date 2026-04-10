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
chunk: 9
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
here I just basically just add some
additional description for this person
and now if I were to update our profile
and if we were to look at our data you
can see that this is our data right so
now the form has this functionality to
submit our data so what we're going to
do is inside of our action folder we
create a user action TTS so basically
the way how the function works is that
we first uh use our schema to validate
the data that we passed in if it's
validated then we're going to proceed if
the data is not validated we're going to
send the error back to our client and
then we're going to deconstruct our data
uh and because we're going to need the
name update uh Boolean if the name is
also updated we're going to also update
the user table uh since the name is also
used in the user table as well right so
we first find the user ID and then we're
going to update the user uh table and
then we're going to also update Our
member table so we find the member based
on the user ID and then we're going to
up the name description City and Country
and then we're going to return us the uh
success and then return the updated
member back to the client and if there's
anything wrong in this process we're
going to to cach the air and then be
able to return the air message back to
our uh client so to use this function
we're going to use it inside of our edit
form components so inside of our
onsubmit function we're going to call
this uh user action that we Define so
the update member profile function so
we're going to import this from our user
actions we're going to make this as an
insync function and to use the update
member profile function that we created
inside of our user actions what we're
going to do is inside of our edit form
components and I have gone ahead and
basically made a change for unsubmit
function and this function basically you
can see here we check to see if name is
updated which which is a Boolean to see
if the name from our data is different
from the member. name if it's updated
we're going to uh say true if not we're
going to say false right and then once
we uh have the Boolean we're going to
pass it to the update member profile
function pass data and the name updated
and then we have the results so we're if
the uh profile have be have been updated
successfully we're going to trigger a
toast success alert saying that the
profile is updated and then we're going
to reset our form with the updated data
if not we're going to basically iterate
all the air message and try to display
the air message on the console so notice
here that uh we're using this else block
many places so for example if we were to
look at the register form you can see
that we're also using this AIR block uh
to iterate all the air message and set
the air right so in this case what we
can do is if we were to navigate to our
util file what we can do is we can able
to refactor this logic into a function
so what we're going to do is inside of
our util file we're going to create a
function to refactor this logic so you
can see here that I just went ahead and
basically complete this form and this
form basically has a generic type of T
field values which extends from the
field values from the react hook form
and the reason why we have a generic
type here is because that each form
going to have a different field values
so we're going to use this for our set
error so that you can see here that this
use form set err which is the type from
the react hook form and this is the type
for that right so we also have the air
response which is the object of air and
the are it could be a string or an array
of Zod issue from Zod right so inside
here uh just the same logic that we seen
inside of many forms that we create uh
we're going to see if it's an array if
it's array we're going to at the air
response and basically uh use the path
which in this case uh from the react
hook form so basically if we were to
hover this you can see that the type
which collects all path through a type
so in this case this is going to be a
path of this which is a field value and
we're going to uh set the air for that
right otherwise we're just going to set
the server erir in the form so now if
you were to test our changes uh you can
see here that if I were to just comment
out the resolvers here and we're going
to make sure that the server also uh
handles these form validation so now if
I were to for example remove the country
and try to update it says that the
country is required so we can definitely
see that it definitely validates our
form data inside of our server action
here so inside of the edit form what
we're going to do is we're going to
change this back to our using the
resolvers and what we're going to do is
is we're going to refresh this so we're
just going to change the name to you sah
instead and we're going to click on the
update profile and you can see that our
profile is updated and you can see that
we do have the name changed uh here as
well and of course if we were to go to
our studio and we can be able to see
that there is Sarah right here if I were
to refresh you can see that Sarah is
just Sarah now right we just Chang the
name to Sarah our user table has also uh
changed as well so if I were to ref
refesh you can see also change to Sarah
all right so now we're going to do is
we're going to create our photo page uh
what we're going to do or I should say
inside of the edit folder what we're
going to do is we're going to create a
new component or a new page called the
photo so we're going to have photos SL
page. TSX and inside here we're just
going to create a simple component
called photos page so now if I were to
click on photos uh we can be able to see
photos page display on our right okay so
here you can see inside the photos page
I just also going to add the car header
and using a divider to divide the uh
header and the body and this is
basically our body which is the photoos
page and inside of our car body what
we're going to do is we're going to
first display all the images for this
user and then we're going to focus on
how we can be able to upload our image
to persist inside of our database and
then what I'm going to do is I'm going
to get the user ID from the get off user
ID function and then we're going to use
the user ID and pass it to the G member
by user ID uh from our server action to
get our member data so once we have our
member data what we're going to do is
we're going to uh call a get member
photos by user ID function to get the
photos for this user inside of our
member actions. TS I just went ahead and
basically create a uh function so it
takes the user ID and we're going to
first find a user and we're only going
to select the photos for this member and
here you can see for this object we only
have the photos array or null and then
if it's null we're just going to return
null if not we're just going to only
return the array of photos back to the
client and once we have the photos we're
going to do basically pass the photos to
a member's photo components so of course
I also just went ahead and designed this
member photos components if we were to
click into this this would looks like
this component takes the array of photos
and a Boolean for editing and also the
main image URL so you can see here that
we basically first iterate the photos
array and for each image we're going to
first render the image and then we're
going to display the icons so if it's
editing right then we're going to have
the start button so this is our SP start
button if the current Ur photo URL is
equal to the main image URL then we're
going to have the uh start button
displayed or in this case is start and
we also have the delete button so you
can see the bin here in a red and user
can be able to click on this button to
delete this photo right so we have the
unset as Main function for this current
photo as main image for this profile uh
we can also be able to click on the
undelete function to delete this image
and if we were to look at this function
you can see that we haven't defined it
yet so if user click on one of those you
can see it pretty much just uh comes
along the function is triggered right so
what we're going to do is we're going to
Define this logic later and in this case
we're not going to worry about this for
now instead we're going to focus on how
we can be able to store our images and
our cloud storage in this case we're
going to use cloud Nary so this is going
to be a uh API where we can be able to
upload our image and we can be able to
call the API to retrieve the images uh
that we store inside of our cloud naring
and here you can see we can be able to
store V image video and all that kind of
things uh there is a free plan so if we
were to look at a free tier no credit
card is required and for the free tier
we have 25,000 monthly Transformations
or the manage storage or the monthly net
view bandwidth it's more than enough for
our usage so in this case what we're
going to do is we're going to sign up
and create the account
so here you can see I have already went
ahead and created the account and it
also tells you how to set up the uh
cloudinary for our application so since
we're using the cloud Nar sjs there is a
documentation here so it tells you how
we can be able to install this and the
environment variable that we're going to
set inside of our application so if we
were to set using this environment
variable we don't have to call it
anywhere we can be able to just use Nest
Cloud Nary and the cloud Nary will
basically follow or use the environment
variable that we set follow the exact
environment variable name here and you
can see here that we can be able to add
an image using the clld image from this
Cloud Nary and we can be able to pass
the source the alt text and such and to
configure this we need to have an active
culinary account with the account we can
be able to set it inside of our
environment variable file so we
basically have the nest public Cloud
Nary name the key as well as the secrets
so if we were to navigate to our Cloud n
dashboard this is going to be the cloud
name we're going to copy this and we're
going to set the cloud name here
and then if we were to go to the API key
this is going to be our key so we're
going to click on the key and this is
our
key and this is going to be our password
and once we fill this up what we're
going to do is we're going to follow the
guide to install the nest
cloudinary so we're going to open our
terminal and we're going to install the
nest cloudinary inside of our
application and then what we're going to
do is we're going to click on setting
and go to our up upload presets and
inside of our preset we're going to edit
this and here we're just going to change
the name to for example application's
name match me demo and we're just going
to put this in a folder called match me
demo and in the future we might have
multiple folders so in this case we're
just going to create a asset folder for
this and after we save our settings this
is what it looks like so we have the
override is true the used file name is
true use unique file name is also true
right so this is the settings that we
have for the match me Demo presets and
because we have in The Nest Cloud Nary
which we can be able to use in the
client side we also have to use cloud
Nary in the server side so in case if
we're going to delete a photo or be able
to uh manipulate this photo in the
server side in this case what we're
going to do is we're going to also
install the cloud Nary uh just to use it
inside of our server s so once we
install the cloud Nary this is the
version that we're using what we're
going to do is inside of our application
so in my case we're going to have the
live folder I'm going to create a file
called the cloud Nary TTS and inside of
that I basically configured this so that
we can be able to use it inside of our
server side all right so now we're going
to do is we're going to focus on how
we're can be able to add the upload
image feature to our application so what
we're going to do is we're going to have
the user upload the image to our client
and our client first we're going to pass
the pram design which contains the
source as well as the Tim stamp to our
server and our server will basically
return a signature which is act like a
token that the client can use to
basically upload the image to our Cloud
Nary so here you can see I just went
ahead and basically create the signature
endpoint inside of our API folder and
inside of that I have the request and
the request has the prams to sign inside
of the request body and here I'm using
the cloud that we defined here and we're
going to call the API sign request
function pass the param sign as well as
the clowner API signature that we Define
inside of our environment variable and
it's going to return us the signature
and we're going to pass the signature as
a response. Json uh back to our uh
client so the client we are going to
consume it inside of our uh edit page
for our photos and inside of that I
create a component called member photo
upload and inside of this I have this
function so basically what happened is
that after we have the signature or the
image is uploaded we're going to uh pass
the result to this function Prem and
we're going to log it for now and the
core logic here is inside of the image
upload button so inside of that I you
can see here that I'm using the cloud
Nary upload button from The Nest Cloud
Nary and we're basically going to
specify the signature endpoint which is
this so what happen is that user is
going to upload the image it's going to
call this endpoint to get the signature
it's going to trigger the unsuccess
function which is from our props and
here you can see we also have the
ability to specify the options in this
case we're specifying how much files
work we can be able to upload in this
case the maximum is only one and we also
specify the upload presets and adding
some styling and here is the text for
our upload button so to test it out you
can see here on the left we have our
browser and I have just clear the
console and the network we're going to
click on the upload New Image uh button
and here is the cloudinary widgets so
what we're going to do is we can be able
to upload the image or we can be able to
upload the image from our browser and
also take image from our computer or uh
upload an image from Google Drive
drawbox and such so what we're going to
do is we're going to upload an image
from my computer so I'm just going to
upload an any image here and inside of
our Network you can see here we have two
requests one is the sign image endpoint
and the other one is the cloudinary
upload and here you can see for the sign
image it takes the param to sign which
is the request that we sent to our
endpoint and this is the response we're
getting back which is a signature so we
send the signature back as a Tok to to
our client so that we can be able to use
that token to uh upload the image to our
Clary and here you can see this is the
response right for the uh upload so if
we were to look at the endpoint this
this is the api. cl.com upload and point
and here is our response so we have the
public ID asset ID and such so here you
can see we have the signature the image
type so we basically save the image
inside of this asset folder and here is
the URL so we if we were to so if we
were to copy this open a new
tab and paste the image here you can see
this is the image that we just upload it
and we can also be able to visit our
Cloud ner Management console so if we
were to click on the folders and click
on the uh match me Demo folder that we
Define and if we were to refresh you can
see that we do have one asset uh
uploaded into our folder all right so
now we're going to take a look at is how
we can be able to persist data inside of
our database and here you can see the
way how it works is that once the cloud
Nary sent back the public ID and the
secure URL you can see on the left in
the console you can see here we
basically log the secure URL as well as
the public ID uh once we have this sent
back to our client we're going to
basically call a server action to
persist this data inside of our database
so what we're going to do is inside of
our application we're going to go into
our actions so instead of the user
actions uh what I did here is I go ahead
and create a function called add image
which takes the URL and the public ID
which I just mentioned and we're going
to get the current user ID and here you
can see uh we're going to use the Prisma
to First find the member based on the
user ID and then we're going to uh
update the data so here you can see
inside of the member for the photos
we're going to basically create a photo
passing the URL and the public ID and
this not only create a uh photo object
inside of the photo table but it also
add this relation to to this member so
um if we uh successfully update the
member we're going to return the update
member back to our response uh if
there's an error we're going to catch
the error and throw the air so now what
we're going to do is inside of the
member photo upload component we're
going to uh change make changes for our
unad image function so that we can be
able to add the image to our database
and here you can see I basically just
went ahead and defined this so based on
the results if it has the info and the
info is an object
right then what we're going to do is
we're going to call the server action
that we defined for the ad image pass
the URL as well as the public ID and
we're going to add the image into our
database and once the database is
persisted we obviously want to make sure
that the component or our page is uh in
sync so the image should be uh displayed
right after the other one so we're going
to upload the image in this case we're
going to upload a cooking image and
after it successfully uploaded you can
see we have an image display on the
right and if we were to look at our
studio uh for our member we can also be
able to search for Sarah and if we were
to scroll to the right we can be able to
see that there is two photos for Sarah
so if we were to click on this you can
see that those are the two photos so we
have the public ID as well as the URL
all right so what we're going to do now
is we're going to focus on some styling
so here you can see I just also upload
some images like the golf one and also
the Arts one so here you can see that we
have images where we have the portrait
or landscape image in this case what we
want to do is we want to have a fix size
image so what we can do instead is we
can be able to use the cloudinary image
