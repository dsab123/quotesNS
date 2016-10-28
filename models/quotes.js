var redis = require('../lib/redis');

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
    //validate(quote);
    
    redis.lpush(quote.channel, quote.quote, function(err) {
        if (err) return callback(err, null);
        exports.save(quotes, callback);
    }); 

    return callback(null, null);
};

// not implemented yet
exports.send = function(quotes, callback) {
    return callback(null, null);
};
