var uuid = require('node-uuid');

exports.fake_cache = [];

exports.create = function() {
    console.log("from mock createClient()");
    // don't need to do anything here
    return {
        on: function(cause, callback) {
            console.log("from mock redis.on");
            // don't need to do anything here
        }   
    };  
};

exports.lpush = function(channel, quote, callback) {
    exports.fake_cache.push({'channel': channel, 'quote': quote});

    callback(null, uuid.v4());
};

exports.exists = function(channel, callback) {
    var ret = 0;

    this.fake_cache.forEach(function(key) {
        console.log('key: ' + key.channel + '; channel: ' + channel);

        if (key.channel == channel)
            ret = 1;
    });

    return callback(null, ret);
};

exports.clearRedisMock = function() {
    exports.fake_cache = [];
};

exports.llen = function(channel) {
    var num = 0;

    this.fake_cache.forEach(function(key) {
        if (key.channel == channel)
            num++;
    });
   
    return num; 
}

exports.lrange = function(channel) {
    console.log('hkeys called');
    



}
