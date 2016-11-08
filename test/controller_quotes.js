'use strict';

var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var quotes;

describe("Quotes Controller: ", function() {
    // the mock functions
    var next = function() {
        console.log("in mock next()");
    }

    var model = {
        save: function(badges, err) {
                  console.log("in mock model.save");
              },
        schedule: function(badges, err) {
              console.log("in mock model.save");
          },
    };

    var req = {
        body: {}
    };

    var res = {
        resData: {
                     status: 0,
                     response: ''
                 },
        json: function(statusCode, object) {
                  res.resData.status = statusCode;
                  res.resData.response = object;
              }
    };

    var redis = {
        createClient: function() {
                          console.log("from mock createClient()");
                          // don't need to do anything here
                          return {
                              on: function(cause, callback) {
                                      console.log("from mock redis.on");
                                      // don't need to do anything here
                                  } 
                          };
                      }
    };

    beforeEach(function() {
        // mockery settings
        mockery.resetCache();
        mockery.enable({
            warnOnReplace: true,
            warnOnUnregistered: true,
            useCleanCache: true
        });

        // mock the model, which the controller interacts with a lot
        mockery.registerMock('../models/quotes', model);

        // register the allowables
        mockery.registerAllowables(['underscore']);
        mockery.registerAllowable('../controllers/quotes');

        // the code under test
        quotes = require('../controllers/quotes');
    });

    afterEach(function() {
        mockery.deregisterAll();
    });


    describe("quotes.save", function() {

        it("should call model.save", function() {
            var spy = model.save = sinon.spy();

            quotes.save(req, res, next);
            expect(spy.calledOnce).to.equal(true);
        });
    });

    describe("quotes.schedule", function() {

        it("should call model.schedule", function() {
            var spy = model.schedule = sinon.spy();

            quotes.schedule(req, res, next);
            expect(spy.calledOnce).to.equal(true);
        });
    });

});

