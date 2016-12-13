var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

var emitter = new EventEmitter();

// somehow create event name dynamically on a per-schedule basis?

// idea:
// request from channels.schedule for 'replay' of quotes from channel every X mins/days
// create event for this schedule
// have a template listener on hand, build off of it to create listener for events on this schedule
// use setInterval (does this work for minutes) to emit events

