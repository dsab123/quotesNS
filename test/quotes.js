'use strict';

var routes; // have to require this after regsitering the mocks because of the changes mockery makes to the node module cache
var chai  = require("chai");
var expect = chai.expect;
var mockery = require("mockery");
var expressRouteFake = require('express-route-fake');

//describe("quotes.send tests -- ", function() {
	var res;
	beforeEach(function() {
		var req = {};
		var res = {
			status: function(statusCode) {
				status = statusCode;
			}
		};

		mockery.enable();
		mockery.resetCache();
		expressRouteFake.reset();
		
		mockery.registerMock('express', 'expressRouteFake');
		//quotes = require('../controllers/quotes');
		routes = require('../routes/myRoutes');
	});
	
	afterEach(function() {
		mockery.deregisterAll();
		mockery.disable();
	});
	
	
describe("quotes.send tests -- ", function() {
	it ("is a sanity test", function() {
		//expect(quotes.send(null, null, null).to.equal({ error : null }));
		//var routeAction = expressRouteFake.getRouteAction('get', '/mypath/myentity');
 		  var routeAction = expressRouteFake.getRouteAction('get', '/mypath/myentity');

		routeAction(req, res);

		assert(res.status == 200);
	});

});
