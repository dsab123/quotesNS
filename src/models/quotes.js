'use strict';

var redis = require('../lib/redis');
var schedule = require('node-schedule');
var _ = require('underscore');

/**
 * Create new channel
 * @param {String} channel
 * @param {Function} callback
 */

exports.createChannel = function(channel, callback) {
    // is this possible?
    // I think this should just reroute to /channel/create
};

exports.isQuoteDuplicate = function(err, list, quote) {
    if (err) return console.log(err);

    console.log('quote is: ' + quote);
    console.log('list is: ' + list.length);

    for (var i = 0, len = list.length; i < len; i++) {
        console.log("(REAL) " + i + ": " + list[i]);

        if (list[i] == quote.quote) {
            return callback({status:400, error: "this quote already exists in this channel"});
        }
    }
};

/**
 * Save quotes to database
 * @param {Array} quotes
 * @param {Function} callback
 *
 */

exports.create = function(quotes, callback) {
    if (quotes.length == 0) return callback(null, null);
    
    // need to make sure this is an array
    // what if I just wrap it in an array if its one element?
    if (!_.isArray(quotes)) {
        console.log('not array!');
        return callback({status: 400, error: "request body must be array"});
    }

    let quote = quotes.pop();

    // this is where I'd do some sort of validation
    if (this.validate(quote) == false) {
        return callback({status: 400, error: "request body is malformed"});
    }

    // TODO: what do I do if the channel doesn't exist?
    // create a new one? probably not

    // TODO: need to check if the quote already exists for this channel
    // if redis contains quote, return callback 400 or something
    // this is stupid because i could use a hash or set for this, but its been
    // so long that I need to add _some_code before refactoring
    redis.lrange(quote.channel, 0, -1, this.isQuoteDuplicate);
    //var promise = redis.lrange(quote.channel, 0, -1);
    //    promise.then(this.isQuoteDuplicate, this.handleError);

    // call channel.createChannel, right?
    redis.lpush(quote.channel, quote.quote, function(err) {
        if (err) return callback(err);
        exports.create(quotes, callback);
    }); 

    return callback(null);
};

/**
 * Validates that the model has the correct properties
 * @param {Object} quote
 */
exports.validate = function(quote) {
    if (quote == null)
        return false;

    // if it doesn't have channel, page, type, quote then its not valid
    if (quote.channel != null && 
// these following properties of the quote only apply to the 'book' channel type, thus
// not necessary
//        quote.page != null && 
//        quote.type != null && 
        quote.quote != null)
        return true;
    else
        return false;
};


/**
 * For now, this just schedules the message to be logged out on 
 * the console every minute. I have big things planned for this
 * method, big things!
 * @param {Array}
 */
exports.schedule = function(quotes, callback) {
    quotes.forEach(function(quote) {
        schedule.scheduleJob('*/1 * * * *', function() {
            console.log('quote: ' + quote.quote);
        });
    });

//    console.log('this has been scheduled for 1 minute');
    callback(null, null);
};
