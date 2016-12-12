var redis = require('../lib/redis');
var schedule = require('node-schedule');

// what I refer to here as a 'channel', redis refers to as a 
// 'key'

exports.create = function(channel, callback) {
    // check if channel exists
    redis.exists(channel, function(err, reply) {

        console.log('reply from redis is: ' + reply);

        // if channel already exists
        // not sure about creating the error object here...
        if (reply == 1)  
            return callback({status: 409, msg: "the channel already exists!"});

        // here is where I'd add the UUID creation

        // create the channel
        redis.lpush(channel, '', function(err) {
            if (err)
                console.log('there was an error!: ' + err);

            return callback(null);
        });
    });
};
