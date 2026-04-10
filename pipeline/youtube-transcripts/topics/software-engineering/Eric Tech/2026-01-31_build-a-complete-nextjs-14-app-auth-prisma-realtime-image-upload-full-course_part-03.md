---
video_id: "HqlJjX9uIuk"
title: "Build a Complete Next.js 14 App (Auth + Prisma + Realtime + Image Upload) — Full Course"
channel: "Eric Tech"
topic: "software-engineering"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=HqlJjX9uIuk"
word_count: 3994
chunk: 3
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
have so here inside of the lib we're
going to define a new folder and we're
just going to call it schemas which
contains all the schemas that we're
going to Define throughout our
application and then inside the schema
we're going to create a file called
login schema because this is a
typescript file it's not going to be a
react file so what we're going to do is
we're going to import Z from Zod and
then we're going to create a login
schema so notice that this is a
lowercase login schema which basically
we're defining the validation so we
Define that this is a string and it's an
email and then for the password we're
going to make sure that it contains uh
at least minimum of six characters so
basically setting the rules for our
schema and we're basically creating a
type of the validation that we create
using the infer and here you can see we
have our login schema type that we can
be able to use in our application which
contains the email and password so in
this case what we're going to do is that
we're going to change this we're going
to say this is going to be a login
schema and we're going to import this
from the uh SCH login schema that we
defined and here for the use form we can
be able to say that this is a login
schema and here we're obviously we're
going to change it to lowercase because
here you can see we Define it as a
lowercase so we're going to change that
as well email
and then same thing for password so we
also need to add the resolver to add the
functionality of the validation so we're
going to use the Zod resolver and then
we're going to pass the login schema
from the login schema schema. TS and
this will basically add the validation
rules that we set inside here so this is
the validation rules and we're going to
use that rule for our use form so now
the form will basically follow the
validation rule that we set so if we
were to clear the console and try to
enter some data so you can see that we
have the invalid email right and then we
also if we were to type in Eric
email.com and then password for example
like this if it's like less than six
characters you can see that it shows it
must be at least six characters and if
we enter more you can see that okay we
have the button enabled so if we were to
click this you can see that we have data
showing here on the console and of
course we don't really need to have this
anymore since um this will basically
follow the validation that we set in the
resolvers so we're going to remove
this that we have defined earlier so
that's basically for the login section
and obviously we're also going to do the
same for the register so for so what
we're going to do is we're going to also
add the register schema inside the
schema folder so here we're going to say
register schema. TS and this is what
we're going to have so here we basically
Define the name the email as well as the
password so same thing it's going to be
uh very similar and then inside of the
register folder we're going to have a
register form at TSX and here you can
see I have gone ahead and create the
register form feature inside of our
application so what I'm going to do now
is I'm going to show you first on how
this works and then I'm going to go
through what I added and to test it out
so you can see that if we delete it you
can see that stream must contains at
least three characters right so if I
were to enter more than three characters
it's passed and then for email we're
going to say something like this and you
can see that it's invalid email and if
we were to add a at email.com you can
see that it is a valid email and then
password for example if it's just like
two characters then it will give us
error so it says password must be at
least six characters so in this case
we're going to enter more than six
characters and you can see that if we
were to click on this which will trigger
the unsubmit which would basically
console log the data in the console so
here you can see we have our data
display in the console and to go over
what we have here you can see that we
basically have our use form which has
the register our handle submit as well
as our form state which has the errors
is valid and is submitting so here
basically we have our resolvers which
will basically follow the validation
rule that we set and then we're going to
set the mold to untouch so basically
whenever we touch the form uh we will
basically adding that validation and
then here you can see we have our cart
header which has the uh icon and then
here is our cart box body so you can see
that we have our input for name and then
we also have our input for email and the
password and here you can see we have
the air message and if it's valid or
it's not valid and you can see that it
is binded with the registered and then
we also have the is disabled so if the
form is valid now we're going to have
the disabled to be false so pretty much
this is it for this section and learn
about how we can be able to install
react hook form as well as Zod for
validation and then we also take a look
at how to add and build our form using
the Nest UI Library we basically added
the login form as well as the registry
form and what we're going to do now is
we're going to commit these
changes and be able to get push our
changes here all right so that's pretty
much the end of the section to summarize
everything uh we basically first add a
login form and then we integrate our
login form with react hook form and then
we also add a Zod form validation to our
login form as well and then we basically
use everything that we learned to also
Implement our register form so that's
pretty much it for this section and and
then up nextest we're going to add our
user database and be able to allow user
to register their account and add their
user data into our database all right
before we continue if you find this
video helpful please make sure to like
this video and also comment down below
if you have any questions or any
suggestions for the video and if you do
want to receive more videos like this
please make sure to subscribe to this
channel your subscription means a lot to
this channel thank you very much and
let's continue all right welcome to
lesson three where we're going to focus
on adding the user authentication to our
application so in the previous couple
lessons we learned learn about how to
add different routes like members
messages list and such and we also learn
about how to add different forms for the
register and the login but in this
lesson specifically we're going to focus
on adding the authentication to that so
the user can be able to authenticate
themselves and be able to register their
account we're going to utilize a tool
called NES off. JS to authenticate a
user and we're going to use a nestjs
server action which we're going to
create our first server action called
off actions. TS to basically communicate
to our database and be able to save data
from our forms and we're also going to
use a postgress SQL database to save our
data and we're also going to configure
our Prisma to basically communicate to
our postgress database and we're also
going to touch up on other things like
airr handlings for our register forms
and we're also going to utilize The Nest
off callbacks feature to get our user
session data so that we can be able to
get our user ID and such and then we're
also going to utilize the nestjs
middleware to ADD protected routes so
the unauthenticated user cannot be able
to access rout like members messages
list and such and the source code for
this lesson is in the commits so feel
free to navigate to the commit here to
view the code for this lesson all right
in terms of the authentication part
we're going to use a tool called NES off
which is also known as an off JS so the
way how it works is we're going to have
our login page and we're going to have
users try to enter their email and
password once we submit the form our
server is going to validate this data
based on our database and if the user
exists in our database then we can be
able to validate the user and send the
cookie to the user and then the user is
basically authenticated so now if the
user sends a new like or a message to
any members then in this case our
application knows who this is because
the cookie contains the user information
and this way user doesn't have to
authenticate thems every time when they
try to perform an action like sending a
message or sending a new like and up
next we're going to learn about how we
can be able to add this to our
application to authenticate the users
and before we set up our authentication
the other part we all need to talk about
is our database so let's talk about how
we can be able to set up our database to
our application all right so it's time
to talk about how we can be able to add
our database to our application and the
way how our server is going to
communicate to our database is using a
tool called Prisma which is a database
object relation mapper or sh for which
will basically help us to translate our
code into a database query that we can
be able to write to our database and
because each database will have a
different query language so having a Cod
structured way to write our query to
communicate to our database will make it
a lot easier since we can be able to use
the same or and be able to change it to
different database and Prisma supports
many database but the one that we're
going to use is called postgress but it
also supports any other database as well
as well as no SQL database for example
mongod DV and the way how the Prisma
works is that we have to Define our
schema inside of our code and here you
can see first we Define our data source
so what provider we're going to use in
this case we're going to use the
postgress provider and the URL is
basically going to be the database URL
that we're going to create and then the
model is going to be the tables that we
have so inside our database we can have
a user table and here inside of the
table these are all the columns so we
have IDs name email password hash these
are all the columns for this table and
this is the type for the properties or
the columns and here you can see for
this property or this column uh it will
take string and the type of it is using
a ID and by default it will
automatically generate a CU ID which is
a unique ID for this column and the
other one is email here so you can see
we have a unique so basically this
column only allows unique values right
so if we have duplicate values then it
will not be able to add it to the table
so that's what the add unique means and
that's what we're going to focus on is
to add those tables for our database and
after we set up our database and
generate our tables and such Prisma also
offer Prisma clients which will
basically generate all the models in
typescript that we create for our
schemas and the other feature that come
with Prisma is Prisma migration so the
way how migration works is that we first
Define our schemas right so just like
what we mentioned we Define our database
our mod models our tables and such and
then we basically run a Prisma migrate
Dev which will basically uh create a
migration for the change that we made so
this will basically create a SQL script
and we can be able to then run this
script to apply the changes to our
database so that we don't have to
manually create those tables inside of
our database based on the schema that we
create and then here you can see it
creates a migration script uh inside of
the migration folder for a project and
then if we want to make additional
change we just then um create a another
migration right specify the name of the
migration and you can see here that each
migration has a history so we can be
able to revert back to any changes for
our database and the other tool that we
get is the Prisma studio so this tool
basically creates this console like this
uh which allow us to for example add a
record manipulate data or be able to
view the data uh we can also be able to
uh sort or filter the data or find a
data instead of our database or also
view the relations uh for the for each
tables and they can also be able to edit
changes right so you can not only just
add records but also be able to edit
changes to our database all right so
that's going to be the intro for the NES
off as well as Prisma orm so let's add
those two things together to our
application all right so next thing
we're going to do is we're going to
install the off JS so in this case you
can see that we're using the beta
version by the time when you watch this
video maybe the version might be
different uh please visit the official
documentation to properly install this
package so in this case we're going to
first install the neth off at beta
version so we're going to install the
mpm install NE off at beta version and
once we have this installed you can see
that we have this inside of our
package.json that we're using the beta
version for version five we also have
the migration so we're going to follow
this guide so first we're going to
create a configuration file so inside of
the source we're going to create a new
file called off.
TS and you can you can see that for the
authoriz off JS config authorization uh
off JS file and you can see that it
return us the off handlers sign in sign
out and here you can see we have our
providers so we're not going to use any
providers for now so we're just going to
delete it for now and then if we were to
scroll down uh we also need to create a
new file called route. TS so what we're
going to do is we're going to create a
file and we're going to call it route.
GTS and then we have have our handlers
which will basically get our get and
post and then we also have our adapters
in this case we're going to install the
database adapters so in this case we're
going to copy this command to install
the off Prisma adapter and if we were to
check out the adapter page and we can
select the Prisma since we're going to
connect Prisma you can see that we're
going to install the off Prisma adapter
as well as the Prisma client and such so
we're going to copy this
and since we already have the Prisma
adapter installed so we're going to
remove this for now and once we have
everything installed what we're going to
do is that we're also going to create a
new file called off configuration. TS so
inside of the source folder we're going
to create a file called offc
config.sys what we're going to do is
we're going to import the um off
configuration into our Nest off object
so I'm just going to copy this and here
you can see we have our off
configuration and basically we're going
to get our providers here then we also
have our adapters as well and we are
setting the session to be using the JWT
strategy so now if we were to come back
to our package.json you can see that we
have our Prisma adapter Prisma client
Nest off as well as Prisma so now what
we're going to do is we're going to set
up our Prisma RM so we're going to type
in MPX Prisma init and this will set up
our Prisma schema all right so very
close to finish our setup section so
here what we're going to do is we're
going to um use the something called
neon.pdf
[Music]
so you can see that uh if we were to
click on the pricing section there this
is the free tier and you can see this is
the storage so there's no credit cards
required so in this case we're going to
sign up in this case I'm going to go
ahead and sign up and then we're going
to enter a project name and then we're
just going to create the project and now
if we were to click on dashboard and
then navigate to the dashboard here you
can see that we have our main branch and
here you can see we have the detail
information for the connection so here
for the connection detail we're going to
select Prisma and then here you can see
this is the environment variable that
we're going to set and this is the
schema. Prisma that we're going to set
so here what we're going to do is we're
going to set our environment variable so
if we navigate through the environment
variable for the database URL we're
going to change it to what we have here
on the left all right so at this moment
you can see that we have our off. TS and
inside of this file we have a instance
of our Prisma client so every time we
start our development we're going to
create a instance of the Prisma client
So eventually in development mode we're
going to have multiple instances of
Prisma clients so to avoid multiple
instances of the Prisma client in the
development mode so inside of the lip
folder we're going to create a file
called
Prisma TTS so basically the way how it
works is that for This Global variable
which we're going to cast a type that
has the Prisma property and then we're
going to use this Global for Prisma and
then we check to see if it has this
Prisma data so if the global variable
has the Prisma property then we're going
to use it if not we're going to create a
instance of the Prisma client and
basically for logging here we're just
going to log the SE queries so once we
have our Prisma we're going to use it
through our application lastly we're
going to see if it's in a production
mode so if it's not in a production mode
we're going to set the global variable.
Prisma equal to the Prisma that we
defined here all right so once we have
our database created what we're going to
do is is we're going to find ways to
interact with our database so here you
can see um the way how it works is that
usually we have our browser right we
have our client side which communicates
to our server and our server will
communicates to our database but in this
case we can be able to implement the
nestjs 14 uh the server action
functionality so that we can be able to
create our server function and the
client can directly interact with the
server action and be able to interact
with our database so instead of the app
folder we're going to create a new
folder ER called actions we're going to
create a file called off actions. TS and
on top of this uh file we're going to
have the US server which basically tell
the D njs this is a server action which
will be stored in the server side not
from the client side so every time when
we try to retrieve our client
application the server action will not
be sent down from the server it will
basically be triggered from our client
side so here you can see I have gone
ahead and create some server actions
inside of the server or the off actions
file so basically I did here is I just
gone ahead and first install the uh the
bcrypt and also adding the type for the
bcrypt so that we can be able to create
hashes for our password so first we're
going to take a look at the registered
user so basically the way how it works
here is that we takes the data from the
client right so uh the client will
basically call the register user server
action and then what happened is that it
will basically pass the register schem
of data that we Define inside of our lip
folder right so that we don't have to
Define again inside of our server so
here you can see what happen is that we
first use the register schema to check
the data if it's validated so if it's
not validated then we're going to return
an error so there's no way for us to
basically call the server because the
only way we can do this is we can be
able to call it from the client side
instead of throw the error in server and
then what we're going to do is we're
going to deconstruct our data that's
