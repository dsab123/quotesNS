var redis = require('../lib/redis');
var uuid = require('node-uuid');

// what I refer to here as a 'channel', redis refers to as a 
// 'key'

exports.create = function(channel, callback) {
    var channelName = channel.channel;

    // check if channel exists
    redis.exists(channelName, function(err, reply) {
        // if channel already exists
        // not sure about creating the error object here...
        if (reply == 1)  
            return callback({status: 409, msg: "the channel already exists!"});

        // here is where I'd add the UUID creation
        channel.uuid = uuid.v4(); 

        // create the channel
        redis.lpush(channelName, '', function(err) {
            if (err)
                console.log('there was an error!: ' + err);


            return callback(null, channel.uuid);
        });
    });
};
