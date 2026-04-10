---
video_id: "HqlJjX9uIuk"
title: "Build a Complete Next.js 14 App (Auth + Prisma + Realtime + Image Upload) — Full Course"
channel: "Eric Tech"
topic: "software-engineering"
published_date: "2026-01-31"
ingested_date: "2026-01-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=HqlJjX9uIuk"
word_count: 3993
chunk: 17
total_chunks: 24
parent_video_id: "HqlJjX9uIuk"
chunking: "needed"
---
this changed we're just going to call
the select with photo and then we also
have the select keys so in this case
we're not going to listen from the
search parameters you can see we're just
going to uh pass the order by as these
uh selected keys and then we also have
put the select order for the UN
selection change and then we just
basically iterate all the options that
we have right and of course for the age
range almost forgot we're going to put
the uh age range going to put the age
range for the default value now what we
can do is we can be able to remove those
uh deleted unused Imports and you can
see here that we have the age range so
you user can be able to select the age
range here and they can be able to
change the range and they can also be
able to select the gender so if I want
to select only female here we have only
the females version and if I want to
select males only you can see we don't
have males right and we can also be able
to uh change the order by so if I want
to change to newest members right so
it's order by the created date so
obviously you can see here that we don't
have the functionality to change the
page right so the page here uh we don't
have that fun fality yet so just like
before uh whenever user is changing the
page we will also need to reflect that
on our search so again this will be also
managed by the use filter and user can
be able to change the page and it should
reflect the uh search parameter here so
what we're going to do is inside of
types I have gone ahead and basically
create the paging progams which in this
case has the page number and the page
size and then I also have the paging
result and you can see here we have the
total page and the total counts so we're
going to use this to create our store
all right so here for the uh use pation
store. TSX you can see here that I have
gone ahead and created this file and
inside of the store you can see we have
the pation which is a type of page
paging result and you can see here that
these are the initial values that we
have and then we also have the set page
uh set set Pat Nations which in this
case it takes the total count first
going to calculate the total Pages by
getting the total count divided by the
total or in this case the page size and
then we also have the total count here
then we also have the set page which in
this case it takes the page number as a
number and then you can see here that we
just set the page number uh inside of
our state and then we also have the set
page size which in this case it takes
the size and it's going to set the size
here and then we also set the total
Pages based on the size and then we want
to make sure that we change or update
our total Pages here as well and for the
name of the store is going to be the
page ination store demo that we can be
able to look inside of the Redux step
tool so what we can do is inside of the
use filters now we can be able to add
the use pation store inside here so what
I'm going to do first is I'm going to
define the use pation store and as well
as these values and what we do is if the
page size or the page number changes we
want to make sure that the search
parameter cat catches this change so I'm
just going to add those two as
dependencies for this use effect and
we're going to return this this total
count as the return value for this hook
and because there could be a situation
where users select for example currently
they're on page three and they're
changing the filters uh in this case
what we need to do is we need to be able
to whenever they change the filter and
the page is currently not on page one
then we need to navigate back to page
one so if the user changed the filter
and there's only one uh page of result
then in this case page three will not be
relevant so what we need to do is we
basically need to uh navigate get back
to page one whenever user changed the
filter okay so inside here we're just
going to create another use effect so
whenever the value here for the search
it changes then we're going to set the
page to the first page okay okay so then
what we're going to do is inside of our
filters component so since we already
have added these things uh inside of the
use filter we're just going to make sure
that it also has the total count so then
we're going to do is we're going to
import a total count for the used filter
and we're just going to add it for the
search results here so it's going to be
the total filter value for the results
so now what we're going to do is we're
going to take a look at the passation
component that we have
defined earlier for this component here
because right now we're basically
setting a static values so we're going
to change that so what's going to happen
is first we're going to um get the total
count from the parent components and if
we were to look at the paging here we're
just going to pass the total counts and
this is going to be the value that we're
going to send back from the server side
so we're going to pass the total count
to the total count here and we want to
make sure that we set it inside of our
store so then what we're going to do is
we're going to first get our store and
as well as the set passation function uh
and then we're going to add the use
effect here so whenever the total count
from here changes then going to set the
page ination uh with the new total count
that we sent back from our server and
then we're going to calculate the result
text so here we have the start which in
this case is really based on the page
number so if the page number is one then
we're starting at the first item if the
page size is 12 and the page number is
two then we're starting at the 13th item
right and then we also have the N here
so the nend basically really depends on
the minimum out of those two so if the
total count is less then it's going to
be the total count so uh we're going to
get the results text and here is our
start and here is our end and here is
our total count and since we're adding
the use effect here we also need to make
sure that this component is a client
component so we're going to add the use
client above so now we can be able to
put those values as well as functions to
the page ination components so we have
our total Pages page number and the set
page here and then here we're just going
to put the actual page size if it's
equal to the size uh that we have here
then we're going to have the background
color and of course uh here I'm just
going to also add the unclick so if it's
clicked then we're going to set the page
size based on the size that we have okay
so if I were to come back to our
application you can see that currently
we're getting nine results and you can
see here it's showing not one to n
results and currently there's only one
page and I can also be able to change
the page size so let's say if I want to
change to uh page size of three so we're
basically displaying uh three items in
one page and you can see here is showing
one to three items in the current page
of the nine results that we have right
and then if I were to click on page two
and you can see here we have the fourth
item and the sixth item and then we also
can be able to go to the last page right
and then there's could be a possibility
for the page six so if I were to click
on page six it would navigate me to the
first page and here we're displaying the
first to the six pages okay and then
here you can see if I were to change the
filter it also navigate me back to the
first page and like I mentioned before
uh if we were to use the fil if we take
a look at the use filter here I have
mentioned that we added the use effect
so whenever the filter value changes it
will set the page back to the first one
all right so now you can see so far we
have all the functionality added to our
application and what we're going to
focus now is we're going to take a look
at how to um do some cleanups so here
you can see if I were to uh select the
filter and we're selecting something
that is outside of our data range then
in this case we're getting uh nothing
right in this case we don't have
anything displayed on our page so what
we're going to do is inside of our
members page uh if there is no items or
if there's no members we're going to
display a elements saying that there is
no item exist right just to make our UI
look more better so inside of the
components I'm going to create a new
component called MP State and in this
case it shows that there is no results
for this filter please select a
different filter okay and what we're
going to do is inside of the members
page I'm just going to say that if the
members.
length is equal to zero then in this
case we can just return the Mt state
that we mentioned
and let's say if we were to select a
filter where there is something within
our data range and you can see here we
still have data and if I were to select
between age of 29 to 100 you can see we
still have data and if we were to go
here you can see there's no data for
this filter all right so so far what we
have learned is the offset page ination
so the offset pagination leverage the
offset and the limit command from SQL to
pinate our data so for example here you
can see we have our client
in this case it sends a request along
with the page size and the page number
and to the server and the server will
basically passionate our data using the
offset and limit and here you can see
this is our select so first uh in this
case we're going to uh limit the page
size in this case we're going to get the
next 10 items and in this case here
we're offsetting the 20 item so we're
going to take the items after the 20th
item and because we're going to skip the
last 20 items so that's why we're going
to have a offset here so we're going to
offset 20 item and we're going to take
the next item after the 20th item and
here you can see we return the data back
to our client along with our paging
status so the advantage of using this is
that it can be able to allow user to uh
view the total number of pages and they
can be able to go to a specific Page by
passing a page number and the con for
this is that the data could be
inconsistent so there could be a
situation where the previous page or
previous item uh is deleted then data
will be shifted forward causing some
results to be skipped or there could be
a situ ation where the previous page is
added to cause the data to shift
backwards and the other pation that we
can do is the cursor passation so cursor
passation utilize a pointer to reference
a specific uh database record so for
example here if we were to look at this
uh diagram and client sends our data to
our server along with the cursor and the
page size so the cursor will basically
be the reference to our uh database
record and we're going to take the next
10 items including the cursor item so
what we're going to do is we're going to
first find that cursor and here we're
going to basically take the 11 items
including the uh cursor item here that
we have and return back to our clients
and the next cursor will basically be
the 11's item so notice here that we're
returning 11 but we want 10 items right
and the reason why is 11 because uh on
the 11th item that's going to be the
nest cursor and that's the nest cursor
that we're going to return back to our
client so here you can see we first uh
sorted by a descending order for a
property that's sequential so for
example this ID is a sequential ID so
it's incremented by one every time when
we add it and here you can see for the
advantage for using the cursor passation
is that the stable pation window so we
can be able to fetch a stable reference
point and the addition deletion of
Records will not be affect the pation
window and the cons for this is that the
cursor pnation doesn't allow clients to
jump to a specific page and cursor must
come from a unique and sequential column
for example Tim stamp in this case we're
going to have a ID that's not sequential
but we do have a created time that's
sequential right so you can see here
that we have a time stamp that is added
based on the created time right and
we're going to have the nest three items
return back to our clients along with
the nest cursor which is this one right
here and if there is a nest cursor then
we know that there's more data to load
then we're going to uh send the nest
cursor along with the uh limit back to
our server and the nextest server we're
going to take the nest three items along
with the nest cursor which is this one
right here okay and let's say if there
is no more data to load for example
we're on the last three pages or in this
case the last three items then in this
case there is no Cur Nest cursor that
we're going to return back to our client
for the client to load more data right
so back to our uh codebase uh what we're
going to do is we're going to take a
look at our message actions so inside of
the message actions uh what we're going
to do is inside here we have a function
called give message by container which
we're basically getting all the messages
that we show here for all the inbox or
the outbox right so you can see here
that based on either it's outbox or
inbox we're going to find all the
messages and display and return it back
to our client obviously at this moment
right now you can see that it's okay
there's not a lot of messages but in the
future uh we could have a possibility
that we could have a lot of messages so
in this case we want to reduce the load
for our server so that um it doesn't
return all the messages all in once so
what we're going to do is we're first
going to add a additional parameter to
our uh get message by container function
so we're going to call a cursor and it's
going to be a type string now I'm just
going to make this cursor to be optional
so here basically it's going to be a
daytime string uh that we're going to
pass to our server so that it's going to
so that it knows uh where we're going to
return data after okay and then we also
need to add the additional property for
the limit so in this case I'm just going
to do limit I'm going to set the limit
to be uh size of two and of course we
can also be able to pass any items or
any values uh we want when we call all
this uh get message by container actions
so then what we do is we can be able to
pass our cursor into the search
conditions and we're going to say that
if the created time right so if the
created time is uh after the cursor time
then we're going to get all the records
and we're going to set the limit to only
two so what we're going to do is we're
going to check to see if the cursor is
exist if it is then we're going to uh
return the creit uh for the property in
this case it's going to be uh less than
or greater than since we're going to uh
create sorted by order by the descending
order uh based on the created time and
in this case we're going to get all the
record that are less than or equal to
the current cursor time otherwise it's
just going to be an empty object and the
next thing we're going to do is we're
going to specify the take in this case
it's going to be limit plus one so if
limit is two then plus one is going to
be three so we're going to get the last
item to make sure that this is is going
to be our Nest cursor and if there is a
last item right if there is an
additional item um that that we can be
able to take uh from our current
position inside of our records and then
what we do is we're going to get our
Nest cursor so you can see here if the
messages count that we have is greater
than the limit if it is then we're going
to remove the last item and we're going
to make the last item in this case the
additional item that we have to be the
nextest cursor and we're not necessarily
returning that last item plus one item
that we specified we're just going to
use that item as the N cursor if there
is a one and obviously if the uh message
that length uh is not greater than the
limits then we're going to just specify
that the nest cursor is going to be
undefined and lastly we're just going to
return uh the messages
so so here we have the messages to
return which equal to this and for the
actual return value we're going to put
the
messages uh to equal to the
[Music]
message and N cursor is going to be n
cursor so I'm going to change this to
just
messages okay so then what we do is
inside of the use messages which is a
hook that interact with our uh message
store and what we're going to do is
we're going to first uh pass the nest
cursor and then what I'm going to do is
I'm going to store The Nest cursor in a
use reference so that if the nest cursor
value changes it doesn't cause the
rerender of the components so then what
we're going to do is we're also going to
add the loading more and set loading
more so whenever the uh function is
triggered then we want to show that
there is a loading indicator uh that we
are basically rendering or in this case
uh fetching our server to get more data
right so in this case I'm just going to
pass the loading more back to our client
so that we can be able to uh have a
spinner whenever we need to load more
we're going to show the spinner so then
we do is based on the current cursor
value uh if the current cursor exists
then we're going to set the loadings
more to true and we're going to first
going to uh get inside of our get
message by container which in this case
we're getting the messages and we pass
the cursor to our uh server action to
get all the messages as well as as the
nest cursor and then we're going to set
the message here and as well as the
cursor here and then we're going to set
the loading more to be false and we can
be able to return the load more function
to our client who use this hook and can
be able to trigger the loading more for
the message uh container component so
here I'm just going to return low more
as the function and then we can also be
able to um add the has more so if the
cursor reference. current if we do have
more then in this case it's is going to
be true if not we're just going to have
false okay so it is just here to check
to see if it's true or false that we
have the value of the cursor reference.
current and for the members page here uh
here is not just going to be messages if
we were to scroll down you can see we
return the messages as well as Nest
cursor so we're going to put messages as
well as the nest cursor okay and then we
can be able to pass the nest cursor to
the message table so we're going to say
this is going to be Nest cursor and
inside of the message table we will need
to change the props to take the nest
