'use strict';

var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var nodemock = require('nodemock');

var model;
var channels;

describe("Channels Controller: ", function() {
    var req_channel_already_created = {
        body: {
            channel:'channel_already_created'
        }
    };

    var req_new_channel = {
        body: {
            channel:'new_channel'
        }
    };

    // these aren't requests, just channel objects
    var new_valid_book_channel = {
            channel:'new_channel',
            type: 'book',
            author: 'fake name'
    };

    var new_invalid_book_channel = {
            channel:'new_channel',
            type: 'book'
    };

    var res = {
        statusCode: 0,

        json: function(status, obj) {
            this.statusCode = status;
        }
    };

    function next() {
        console.log('in mock next()');
    }

    var model = {
        create: function(channel, callback) {
            var channelName = channel.body;

            if (channel == 'channel_already_created') {
                return callback({status: 409, msg: "the channel already exists!"});
            } else if (channel == 'new_channel') {
                return callback(null);
            }
        }   
    };

    beforeEach(function() {
        mockery.resetCache();
        mockery.enable({
            warnOnReplace: true,
            warnOnUnregistered: true,
            useCleanCache: true
        });

        // mock the model
        mockery.registerMock('../models/channels', model);

        // allow registered modules
        mockery.registerAllowables(['underscore']);
        mockery.registerAllowable('../controllers/channels');

        // the code under test
        channels = require('../controllers/channels');
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();

        res.statusCode = 0;
    });

    describe("channels.create", function() {
        // THIS TEST BREAKS THE MODEL MOCK; FIND OUT WHY TODO TOMORROW
        it("should interact with the model", function() {
//            var spy = model.create = sinon.spy();

            // not checking the return value here, just checking on the spy
//            channels.create(req_new_channel, res, next);

//            expect(spy.calledOnce).to.equal(true);
        });

        it("should return 409 status code if the channel is already created", function() {
            channels.create(req_channel_already_created, res, next);           
            expect(res.statusCode).to.equal(409);
        });

        it("should return 200 status code if channel is created successfully", function() {
            channels.create(req_new_channel, res, next);           
            expect(res.statusCode).to.equal(200);
        });

        it("should pass validation that a 'book' channel has an author", function() {
            expect(channels.validateChannel(new_valid_book_channel)).to.equal(true);
        });

        it("should fail validation that a 'book' channel doesn't has an author", function() {
            expect(channels.validateChannel(new_invalid_book_channel)).to.equal(false);
        });
});

});
