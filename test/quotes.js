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
        send: function(badges, err) {
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
        console.log("in beforeEach");

        // mockery settings
        mockery.resetCache();
        mockery.enable({
            warnOnReplace: true,
            warnOnUnregistered: false,
            useCleanCache: true
        });

        // mocks!
        mockery.registerMock('../models/quotes', model);

        // the code under test
        quotes = require('../controllers/quotes');
    });

    describe("quotes.save", function() {

        it("should interact with the model", function() {
            var spy = model.save = sinon.spy();

            quotes.save(req, res, next);
            expect(spy.calledOnce).to.equal(true);
        });
    });

    describe("quotes.send", function() {

        it("should interact with the model", function() {
            var spy = model.send = sinon.spy();

            quotes.send(req, res, next);
            expect(spy.calledOnce).to.equal(true);
        });
    });

});

