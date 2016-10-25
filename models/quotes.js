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
    //var quote = quotes.pop();
    // do something with redis; lpush or pubsub or what?

    return callback(null, null);
};

exports.send = function(quotes, callback) {
    return callback(null, null);
};
