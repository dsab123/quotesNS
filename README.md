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
