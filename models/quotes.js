var redis = require('../lib/redis');

/**
 * Save quotes to database
 * @param {Array} quotes
 * @param {Function} callback
 *
 */

exports.save = function(quotes, callback) {
    var quote = quotes.pop();
    // do something with redis; lpush or pubsub or what?
};
