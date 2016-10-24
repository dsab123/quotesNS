'use strict';

var chai  = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var expressRouteFake = require('express-route-fake');

var routes; // have to require this after regsitering the mocks because of the changes mockery makes to the node module cache
var quotes; 
var req;
var res;

// setup and teardown
beforeEach(function() {
    req = {};
    res = {
        resData: {
            status: 0,
            response: ''
        },
        status: function(statusCode) {
            res.resData.status = statusCode;
        },
        send: function(response) {
            res.resData.response = response;
        },
        end: function() { }
    };

    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
    });

    console.log('in beforeEach!\n');
    mockery.resetCache();
    // the following call breaks stuff, so I don't include it!
    //expressRouteFake.reset();

    mockery.registerMock('express', expressRouteFake);
    quotes = require('../controllers/quotes');
    routes = require('../routes');
});

afterEach(function() {
    console.log('in afterEach!\n');
    mockery.deregisterAll();
    mockery.disable();
});

// Tests
describe("quotes sanity tests -- ", function() {
    it ("is a sanity test for the get path", function() {
        var routeAction = expressRouteFake.getRouteAction('get', '/mypath/myentity');

        routeAction(req, res);

        expect(res.resData.status).to.equal(200);
    });

    it ("is a sanity test for the post quote path", function() {
        var routeAction = expressRouteFake.getRouteAction('post', '/quote');

        var next = function() {
            console.log('eh, this worked?!\n');
        };

        routeAction(req, res, next);

        expect(res.resData.status).to.equal(200);
    });
});

