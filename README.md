#HI!

This is a little project I'm trying to put together that will publish quotes to people based on whatever channel they subscribe to.

Hereafter are jumbled thoughts running around in my head. 
You can read this, but a safer option would be to just look at this context diagram and not scroll down.

You have been forewarned.


![:( Something is broken](images/quotesNS.png "Oooh, fancy. Or ugly.")


Using Twilio for text messaging.

I thought it was basically implementing pubsub, but since mobile phones can't enter/exit a 'connected' state its not really, so I got discouraged and gave up. Then I started working on it again.

I think as I type this that I'm realizing I can still implement pubsub (because I _really_ wanna use TJ Hollowaychuk's library), but not between the mobile phone and the server, but between the server and redis!

Also, have to put my express knowledge to work before I forget all of it.

--------------
Update 11/2

There will be two main routes, /quote and /channel. The former pushes a new quote to an existing channel, the latter creates a new channel. I'm currently thinking about how to use UUIDs to get datestamps on when the quotes should be pushed from redis to the end user. So all this time spent thinking about it counts for at least 3 commits per day.

Once the quote is pushed to an existing channel (cause I haven't quite figured out the channel creation part yet), there will be some way for the user to schedule when to receive the quotes from the channel on a daily basis, like cron. To that end, I'll be using a package to generate random uuids that will go into both the channel object and the quote object. BUT WAIT! The quote is _inside_ the channel, so how does this work?

That's all for now, folks.  
