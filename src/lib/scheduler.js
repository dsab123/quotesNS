var redis = require('redis');

// somehow create event name dynamically on a per-schedule basis?

// idea:
// request from channels.schedule for 'replay' of quotes from channel every X mins/days
// create event for this schedule
// have a template listener on hand, build off of it to create listener for events on this schedule
// use setInterval (does this work for minutes) to emit events

  
// THIS WILL BE MOVED INSIDE OF THE CHANNELS MODEL, SINCE I DON'T WANT TO BE 
// REDIS-ING IN TWO DIFFERENT PLACES AT ONCE; THIS BREAKS MVC PATTERN

var getNextQuote = function*(channelName, index) {
    // get next element?
    // redis.lindex(channelName, index);
    redis.lindex(channelName, index);
    yield;
};

module.exports = getNextQuote();

