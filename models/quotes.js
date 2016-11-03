var redis = require('../lib/redis');
var schedule = require('node-schedule');

/**
 * Create new channel
 * @param {String} channel
 * @param {Function} callback
 */

exports.createChannel = function(channel, callback) {
    // is this possible?
};

/**
 * Save quotes to database
 * @param {Array} quotes
 * @param {Function} callback
 *
 */

exports.save = function(quotes, callback) {
    if (quotes.length == 0) return callback(null, null);
    
    // do something with redis; lpush or pubsub or what?
    // each quote should have the channel name embedded in it
    var quote = quotes.pop();

    // this is where I'd do some sort of validation
    this.validate(quote);
   
    // what do I do if the channel doesn't exist?
    // call channel.createChannel, right?
    redis.lpush(quote.channel, quote.quote, function(err) {
        if (err) return callback(err, null);
        exports.save(quotes, callback);
    }); 

    return callback(null, null);
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
        quote.page != null && 
        quote.type != null && 
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

    console.log('this has been scheduled for 1 minute');
    callback(null, null);
};
