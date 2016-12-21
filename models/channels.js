var redis = require('../lib/redis');
var uuid = require('node-uuid');
var scheduler = require('./lib/scheduler');

// what I refer to here as a 'channel', redis refers to as a 
// 'key'

exports.create = function(channel, callback) {
    var channelName = channel.channel;

    // check if channel exists
    redis.exists(channelName, function(err, reply) {
        // if channel already exists
        // i'm not using the error object!
        if (reply == 1)  
            return callback({status: 409, msg: "the channel already exists!"});

        // here is where I'd add the UUID creation
        channel.uuid = uuid.v4(); 

        // create the channel
        redis.lpush(channelName, 'N/A', function(err) {
            if (err)
                console.log('there was an error!: ' + err);

            return callback(null, channel.uuid);
        });
    });
};

// this code is all trash
exports.schedule = function(channelName, channelFrequency) {
    // check if channel exists
    redis.exists(channelName, function(err, reply) {
        if (reply != 1) 
            return callback({status: 409, msg: "the channel does not exist!"});
    });

    // iterate through channel with generator
    let index = 0;
    const frequencyInSeconds = channelFrequency*1000;
    setInterval(() => {
        let quote = getNextQuote(channelName, index);

    }, frequencyInSeconds);

    // no idea how to return multiple responses... need to read more

    return callback({status: 200, msg: quote});
};

// DON'T EXPORT THIS FUNCTION
exports.getNextQuote = function*(channelName, index) {
    // get next element?
    // redis.lindex(channelName, index);
    redis.lindex(channelName, index);
    yield;
};


