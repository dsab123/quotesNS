var redis = require('../lib/redis');
var schedule = require('node-schedule');

// what I refer to here as a 'channel', redis refers to as a 
// 'key'

exports.create = function(channel, callback) {
    // validate channel name
    //  what kind of restrictions?
    var sanitizedChannel = this.validate(channel);

    // check if channel exists
    redis.exists(channel, function(err, reply) {
        if (reply == 1) { 
            // if channel already exists
            return callback(null, 201);
        } else {
            // create the channel
            redis.lpush(channel, '', function(err) {
                console.log('there was an error!: ' + err);
            });
        }
    });
};


exports.validate = function(channel) {
    if (channel == null)
        return false;

    // I guess I have no other restrictions on channel names..
    return true;
};
