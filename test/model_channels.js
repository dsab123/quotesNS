var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var uuid = require('node-uuid');
var model; // controller

// mock libs
var redis = require('./redis-mock');

describe("Channels Model:", function() {

    afterEach(function() {
        mockery.deregisterAll();

       // redis.fake_array = [];
        redis.clearRedisMock();
    });

    // helper methods
    function getValidChannel() {
        return {
            channel: "channel",
            type: "book"
        };
    }

    beforeEach(function() {
        mockery.resetCache();
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: true,
            useCleanCache: true
        });

        // mocks
        mockery.registerMock('../lib/redis', redis);

        // register allowed modules
        mockery.registerAllowable('node-uuid');
        mockery.registerAllowable('crypto');
        mockery.registerAllowable('../src/models/channels');

        // code under test
        model = require('../src/models/channels');
    });
    
    describe("model.create", function() {
        it("should verify that a valid UUID was added to the channel object", function() {
            var channel = getValidChannel();

            model.create(channel, function(err, data) {
                if (err)
                    fail('there was an error returned from model.create');

                // data returned by model.create contains the UUID; not sure which one to check against
                expect(channel.uuid).to.not.equal(undefined);
            });
        });

        it("should reject duplicate channel creations with a 409 status code", function() {
            var channel = getValidChannel();

            model.create(channel, function(err, data) {
                // don't do anything
            });

            model.create(channel, function(err, data) {
                if (!err)
                    fail('an error should have been thrown for attempted duplicate channel creation'); 

                expect(err.status).to.equal(409);
            });

        });
    });
});
