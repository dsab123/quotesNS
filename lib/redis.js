'use strict';

// this will have to connect to a real redis db, not hosting this joint on my laptop"

var redis = require('redis');
var client = redis.createClient();

client.on('error', function(err) {
    throw err;
});

module.exports = client;
