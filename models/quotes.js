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
    console.log('models.save called!');
    //var quote = quotes.pop();
    // do something with redis; lpush or pubsub or what?
};

exports.send = function(quotes, callback) {
    console.log('models.send called!');
};
