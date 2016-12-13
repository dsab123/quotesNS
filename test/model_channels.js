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
                this.fake_array.push({channel: quote});

                callback(null, uuid.v4());
            },

            exists: function(channel, callback) {
                var ret;

                if (this.fake_array[channel] == undefined)
                    ret = 0;
                else
                    ret = 1;

                return callback(null, ret);
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
        it("should verify that a valid UUID was added to the channel object", function() {
            var channel = getValidChannel();

            model.create(channel, function(err, data) {
                if (err)
                    fail('there was an error returned from model.create');

                expect(channel.uuid).to.not.equal(undefined);
            });
        });
    });
});
