var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var uuid = require('node-uuid');
var model; // controller


describe("Channels Model:", function() {
    var redis;

    afterEach(function() {
        mockery.deregisterAll();

        redis.fake_array = [];
    });

    // helper methods
    function getValidChannel() {
        return {
            channel: "channel",
            type: "book"
        };
    }

    beforeEach(function() {
        redis = { 
            fake_array : [], 
            create: function() {
                console.log("from mock createClient()");
                // don't need to do anything here
                return {
                    on: function(cause, callback) {
                        console.log("from mock redis.on");
                        // don't need to do anything here
                    }   
                };  
            },  

            lpush : function(channel, quote, callback) {
                this.fake_array.push({channel, quote});

                console.log('inside lpush!');

                callback(null, uuid.v4());
            },

            exists: function(channel, callback) {
                console.log('channel is: ' + channel);
                return callback(null, 1);
            }   
        };      

        mockery.resetCache();
        mockery.enable({
            warnOnReplace: true,
            warnOnUnregistered: true,
            useCleanCache: true
        });

        // mocks
        mockery.registerMock('../lib/redis', redis);

        // register allowed modules
        mockery.registerAllowable('node-uuid');
        mockery.registerAllowable('crypto');
        mockery.registerAllowable('../models/channels');

        // code under test
        model = require('../models/channels');
    });
    
    describe("model.create", function() {

        it("returns nothing", function() {
            console.log('sanity test yo');
        });

        it("should verify that a UUID was added to the channel object", function() {
            var channel = getValidChannel();

            model.create(channel, function(err, data) {
                console.log("in callback: da UUID: " + channel.uuid);
                expect(channel.uuid).to.not.equal(undefined);
            });
        });
    });
});
