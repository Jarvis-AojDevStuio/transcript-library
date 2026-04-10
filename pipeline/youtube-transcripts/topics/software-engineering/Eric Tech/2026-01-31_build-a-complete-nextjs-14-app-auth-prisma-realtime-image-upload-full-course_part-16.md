---
video_id: "HqlJjX9uIuk"
title: "Build a Complete Next.js 14 App (Auth + Prisma + Realtime + Image Upload) — Full Course"
channel: "Eric Tech"
topic: "software-engineering"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=HqlJjX9uIuk"
word_count: 3998
chunk: 16
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
application so what happen is that when
user uh enter in this case for example
when they navigate to different pages or
when they toggle uh for example with
photo or no photos or uh select
different age ranges uh then in this
case we're going to add this inside of
our query parameters so for example if
user is navigating to page one then
we're going to to send the request to
our server action along with the query
parameters and if user is going to
toggle to page two for example then
we're going to basically um update our
query parameter and that's going to also
rerender our component with the latest
query parameter for example in this case
which with page two value and it's going
to send it to member actions and it's
going to return the latest data or the
updated data back to our clients right
so what we're going to do is so inside
of the members page what we can do is we
can be able to add the functionality for
the search parameters so every time when
the search parameter changes it will
basically rerender this page or render
this component and we can be able to
pass the search parameter value to our
git memb uh server action to fetch the
correct data so inside of the index I'm
just going to go ahead and Define a new
type called search filters which in this
case has the age range gender order by
wiiz photo right
so that's going to be the type for the
search parameter and here inside of the
filters components you can see here that
I have gone ahead and basically add the
handle age select function which in this
case it takes the value which is a
number array so in this case it's going
to be our slider so the slider is going
to provide us the minimum and the
maximum value which in this case is
going to be inside of an array and then
what we do is we have getting the search
Prem from the use search prems here and
then we also have the the router and the
path name so first we're going to pass
the search prms inside of a URL search
prems which will give us the prms so
that we can be able to uh manipulate the
value that we have inside so we're going
to say the prams do set the for the age
range to be the value that we have so
we're going to convert the array to a
string and then we're going to put the
router to replace we're going to take
the path name as well as the current
prms values that we set and we're going
to pass it here so what goes after the
question mark is our search parameters
so what we're going to do is we're going
to come to our slider and we're going to
add this functionality here so there is
a unchange and also unchange end so
unchange end basically means that
whenever we stop the slider it's going
to trigger this unchanged function it's
going to be different from the unchanged
function that we have and then for this
function it takes the
values and then it's going to trigger
the
handle uh age select and the uh values
here is going to be a number array so
we're going to cast it here just for
testing purpose and then what we're
going to do is for the default value
we're going to change it to the for
example the range is going to be between
19 to let's say 50 and you can see here
if I were to navigate to our application
currently we're uh in the range of
between 19 to 50 and if I were to uh for
example slide our slider right so if I
were to let go at 82 for example you can
see here that the search parameter that
we have has been changed so that's the
age range that we have and if I were to
test out this one you can see 40 uh to
82 okay so the next thing we're going to
do is we're basically going to pass the
search parameters to our git member
server actions uh so here you can see um
I have done exactly that so first thing
first I have basically changed the type
here to get member uh prems so if we
were to look at the index here instead
of using the user filters I'm just going
to use a g uh member prams which make uh
all the properties here to be optional
so the each of those query parameters
are optional so here inside of the
member actions uh I have gone ahead and
basically modify the gim member uh
function here so here you can see it
basically takes the G member prems and
it's going to return us a pageat
response for the member is because it's
going to return us the total count so
we're going to add this for our pageat
response and for the prms here you can
see we have a default value for each of
those properties and then what we do is
we're going to parse all of our inputs
so for our range here you can see is
basically a string separated by comma so
what we're going to do is we're going to
create a function called GE age range
which pass the string is going to give
us the actual date range inside out of
the age range here and then we're also
going to get our gender as well as the
page and the limit and then we're going
to calculate the skip so in this case
how many elements we're going to skip
before we're going to start uh return
the members data so the way how skip
work is here you can see for a passation
right then in this case we're going to
skip those three items and we're going
to start taking the item after the first
three and then we're going to take those
query parameter values and we're going
to Define our search select so here you
can see we have our member select in
this case we have our where clause and
then we're going to add these uh filters
inside of our search and again we also
have to exclude the current user so
we're getting the user from the current
get off user ID and then what we're
going to do is we're going to get our
member counts based on our current
filter and be able to do our order BU as
well as our passation so then uh we can
be able to return the data so in this
case for the items we have the members
and for the total count here it's just
going to be count because in the future
we might be able to use the passation
for something else uh that's why we have
the items here and in this case it's
going to be a generic type okay and back
to our client you can see here that we
still have our members and still pass
the members to the members card and
because we have the functionality inside
of our filters we can be able to uh
manipulate our search prams and here you
can see if we were to increase our
search range we get all the members and
if I were to slowly decrease or change
the search range we see that we do have
all the members who are uh in the range
between uh 30 to 94 so if I were shorten
this range to 32 and you can see that
these are the people um in the range
between 30 to 32 okay so next thing
we're going to focus on is basically
adding the functionality for the order
bu so user can be able to select the
last active or the newest members so to
do so I inside of the filters components
I have gone ahead and basically add a
function called handle order select and
in this case you can see here um is
basically a value of selections and this
selection is basically from the NES UI
and you can see here that uh basically
the type here is either going to be a
all as a string or a set with a key so
set is basically a uh collection of
unique values so uh in this case you can
see here that the value is going to be
either a string or for all or is going
to be a set of keys so in this case
because we're interested in the set of
keys so we first have to check to see if
the set is instance of if the value is
an instance of a set uh and then what
we're going to do is we're going to get
the prems just like what we have here
we're going to get the prams we're going
to set for the order bu for the value
that we have so in this case that's how
we going to get a value uh for the set
so here you can see because the
selection we can be able to only select
the single value so in this case we're
just going to get the uh just the nest
value here that we have inside of our
set and then what we do is we're just
going to use the router L replace like
what we have here and don't worry about
the code here we're just going to uh
worry about getting the functionality
right and then we're going to refactor
everything here uh and then what we do
is we can be able to put our or in this
case add this functionality inside here
for the select component here you can
see here I have passed the select keys
uh in this case it has to be a uh either
all or in this case or a set so uh what
we do is we can be able to Define an
instance of a set and pass an array uh
for the values for the initial values
and then in this case it's going to be
the search parameters. get the order by
for the search parameter value or it's
going to be the updated so if we were to
look at the members action and by
default you can see the order by is uh
order by the updated so for the order by
in this case when we filter it's going
to be ordered by the sending order based
on the members updated value right so in
this case uh we going to put the set
here and then for the on selection
change uh whenever this change is going
to trigger the handle order select which
is the function that we defined up here
okay so uh here if I were to navigate
back to our application I'm just going
to refresh a little bit and don't worry
about the range is different than the uh
the search parameter here because we
basically set a default value and it
doesn't really match with the value that
we have for the search parameters so
we're going to change that later so for
the order bu if I were to change this
for example to the newest member then in
this case it's basically going to be
sorted by the latest members uh or
newest members that we have all right so
next thing we're going to focus on is be
able to add the functionality whenever
user logged into this application
uh we should update the update property
so if we were to take a look at the
Prisma studio uh for the member you can
see here that for each member here
currently mon sra's account and whenever
user is logged into our application we
should be able to update uh this
property here so what we're going to do
is inside of our application I have gone
ahead and inside of the members function
I have add a new function called the
update last active so it takes the
current user ID and we're basically
going to update the current user ID's uh
updated property to the latest date
which in this case is going to be new
date and then inside of the used
presence Channel whenever users
subscribe to their presence then in this
case we can be able to update that
current user with their last active date
and then currently you can see here that
Sarah is currently at active last active
was at this date and now if I were to
come back to the application refresh the
page um this should basically update the
value here so so if I were to just
refresh and you can see here that it
changed to September 28th which is uh a
different date than before and then what
I'm going to do is I'm going to log into
a different user so for example mile so
if I were to sort by the last active
here and you can see that Sarah is the
uh top one for the most active so since
we have already logged into to mile here
and if I were to come back to the
application and if I were to find mile
for the account for the member sorry and
for my here uh updated was at September
28 which is also uh same as what we have
for Sarah as well okay so then what
we're going to do is we're going to
focus on adding the functionality for
adding the gender uh for the selection
so here you can see I have gone ahead
already and added the gender selection
so user can be able to select either for
example deselect the male and deselect
the female for example they can also
select just male or or just female right
uh they can select all of them so female
and male as well so we can be able to
add this feature for the gender
selection so the way how I add this is
you can see here that I have first
created a variable called select gender
so first what we do is we're going to
get our uh value from our search
parameters so then what we do is we
create a function to toggle or handle
the gender selection so it takes the
selected value and then what we do is
we're going to get our parameters and
then we can be able to see if the
selected gender is included in the
select gender so if it's already so for
the selected list if it's included for
this right so if this value is already
included inside of the selected gender
uh then we're going to remove that from
our list right so in this case for our
parameter. set we're going to filter out
the gender select value so for the
selective gender we're going to remove
that using the filter function and then
if it's not from the selected gender
then we're just going to to add it
inside of our gender list then what
we're going to do is we're going to use
router. replace to replace the current
uh router with the new parameters that
we have right and then lastly we're
going to put the selected gender into
the uh gender list here so you can see
here is a list of uh buttons and for
each button we have an icon and here you
can see I have added a variant so
basically if it's uh selected we're
going to have solid if not we're just
going to have light and then we also
have the unclick so if it uh if user
click on this button it will basically
trigger the handle gender select with
the current uh value for this uh gender
right and again for the members page you
can see here that uh whenever the search
parameter changes we're just going to
pass the newest uh or latest search
parameter value to the game members
function and by default we have male and
female selected and separated by comma
and whenever we have the gender value
we're just going to get this selected
gender and just pass the gender selected
gender into a wear condition here all
right so now we're going to do is we
want to make sure that our search filter
is persisted for our state so then when
we navigate to different pages for
example messages or lists and when we
come back to it the result will still be
the same and we also have to make sure
that we can be able to persist paging or
pattion State Management so in this case
what we can do is inside of our
application inside of the hooks we're
going to create our store to State St
store our filter store and also as well
as a paging and we also want to make
sure that we are going to clean up the
uh filters component here cuz you can
see here there is a lot of Logics uh
that we have for filter so we're going
to put these things uh inside of a hook
and we can just return these values or
the functions uh from the hook and be
able to use it inside of the components
so to do so first thing we're going to
do is we're going to create a use filter
store from the hooks folder and inside
of here you can see see here we have the
filters which is the user filters that
we Define inside of our types and then
we also have the set filters which in
this case it takes the filter name so
the filter property inside of the user
filter type and we're also going to uh
take a value and we're going to set the
value for this uh property okay and then
here you can see this is the use filter
store which in this case we're using a
Dev tool so that we can be able to
inspect it inside of the react Redux Dev
tool so here is the initial values that
we have for our filter store and you can
see here this is the set filter function
and then inside of the hooks folder
we're going to create a hook to uh
interact with this store and also be
able to uh refactor the logic that we
have for the filter components so if we
were to look at the filter components
you can see that these Logics uh in this
case they're going to interact with the
store and we're going to move them into
a hook so then here inside of the hooks
folder you can see I have gone ahead and
create a use filter uh hook and inside
of this hook you can see I have
refactored all these logic into this
single hook which here you can see it
contains the order by list and the
gender list that we have mentioned uh
from our filter component and then we
also have our handle age select which in
this case we just set the filters uh
from the use filter store that we Define
here right so the set filters here and
then we also have the handle order
select and just like what we have before
we're just going to uh set the filters
based on the value that we have inside
of our set and then we also have the
handle gender select which check to see
if the value that we select is inside of
the gender list and the gender is from
our filters so if it is then we're going
to remove that from our gender list
otherwise we're just going to add a
value to our gender list okay and then
we also have the handle with photo
toggle so this is a new one so we
basically just going to toggle if we
want to include a photo or don't include
a photo right so if we clicked it if
it's checked then in this case it's
going to be true if not we're just going
to have false right so that's going to
be the four uh functionality that we're
going to or return to our client so that
user can be able to Bine those inputs
with those actions right so here you can
see for the select age we have this
select gender we have this select order
we have this select with photo we have
this right and then here is our filters
so our filters is basically our store
values and then we also have the order
list and the gender list okay so that's
what we're going to return and we want
to also take a look at the use effect
here so whenever the uh value changes
right whenever we State value changes we
also want to make sure that we change
our search parameter because for these
things here for these actions here we
basically is just changing what we have
inside of our store so uh whenever the
store value changes we also want to make
sure that the search parameter is also
reflected okay so then what we're going
to do is inside of the filters component
we're just going to remove the these
things and we're just going to return
the use filters return value so use
filters okay and we're just going to
import this from our Hooks and we're
just going to return those values that
we want so it's going to be the order by
list the gender list as well as the
select age select gender select order as
well as select with photo and lastly we
also have our filters okay and then for
our filters obviously we have a lot of
values so we're just going to
deconstruct our filters property so for
the filters we have the gender age range
and the order by with photo so we're
just going to add it here okay so pretty
much we have everything and then we're
just going to uh make sure that the
functionality here is included okay so
then what we're going to do is uh inside
of our uh gender select we're just going
to say gender do uh includes to see if
it's includ this value and then for the
uh action here or the function uh we're
going to have the select gender as the
handle gender select and then we also
have the handle age select so we're
going to have the select H as the value
here so for the switcher so whatever
