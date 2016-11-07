'use strict';

var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var nodemock = require('nodemock');
var channels;

describe("Channels Controller: ", function() {
    // mocks, stubs (using nodemock!)
    // since I'm using nodemock now, no need to create fake req, res objects 
    // simple catch-all mock for model.create
    var model = nodemock.mock('create').takes('valid_case').returns(true);
    model.mock('create').takes('channel_already_created').returns(false);

    var req = {
        body: 'channel_already_created'
    };

    var res = {
    };

    function next() {
        console.log('in mock next()');
    }

    beforeEach(function() {
        mockery.resetCache();
        mockery.enable({
            warnOnReplace: true,
            warnOnUnregistered: true,
            useCleanCache: true
        });

        // mock the 
        mockery.registerMock('../models/channels', model);

        // the code under test
        channels = require('../controllers/channels');
    });

    afterEach(function() {
        mockery.deregisterAll();
        
    });

    describe("channels.create", function() {
        it("should interact with the model", function() {
            var spy = model.create = sinon.spy();

            // not checking the return value here, just checking on the spy
            channels.create(req, res, next);

            expect(spy.calledOnce).to.equal(true);
        });
    
        it("should throw error if the channel is already created", function() {
            // later on I can test (somewhere else) about returning a 200 with info or somehthing
            channels.create(req, res, next);

            expect(model.create('channel_already_created')).to.equal(false);
        });
     
    /*
        it("should return 200 status code if channel is created successfully", function() {

        });
    */
    });

});
