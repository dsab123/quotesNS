var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var channels; //controller
var model;

describe("Channels Model:", function() {

    var redis = {};


    // mocks
    mockery.registerMock(redis, '../lib/redis');
    mockery.registerMock(channels, '../controller/channels');

    // register allowed modules
    mockery.registerAllowables(['underscore']);

    // code under test
//    model = require('../models/channels');

    it("returns nothing", function() {
        console.log('sanity test yo');
    });

});
