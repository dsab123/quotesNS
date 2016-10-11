'use strict';

var chai  = require("chai");
var expect = chai.expect;
var mockery = require("mockery");
var expressRouteFake = require('express-route-fake');

var routes; // have to require this after regsitering the mocks because of the changes mockery makes to the node module cache

var quotes; 

describe("quotes.send tests -- ", function() {
	var res;
    var req;

	beforeEach(function() {
		req = {};
		res = {
            resData: {
                status: 0,
                response: ''
            },
			status: function(statusCode) {
                console.log('inside status');
				res.resData.status = statusCode;
			},
            send: function(response) {
                console.log('inside send');
                res.resData.response = response;
            },
            end: function() { }
		};

		mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

		mockery.resetCache();
		expressRouteFake.reset();
		
		mockery.registerMock('express', expressRouteFake);
		quotes = require('../controllers/quotes');
		routes = require('../routes');
	});
	
	afterEach(function() {
		mockery.deregisterAll();
		mockery.disable();
	});
	
	
	it ("is a sanity test for the get path", function() {
		//expect(quotes.send(null, null, null).to.equal({ error : null }));
 	    var routeAction = expressRouteFake.getRouteAction('get', '/mypath/myentity');

		routeAction(req, res);

		expect(res.resData.status).to.equal(200);
	});

    it ("is a sanity test for the post \\quote path", function() {
        var routeAction = expressRouteFake.getRouteAction('post', '/quote');

        routeAction(req, res);

        expect(res.resData.status).to.equal(200);
    });
});

