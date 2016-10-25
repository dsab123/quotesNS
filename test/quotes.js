var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var routes = require('../routes');
var quotes;// = require('../controllers/quotes');
var underscore = require('underscore');
var model = require('../models/quotes');

describe("Quotes Controller: ", function() {
    var next = function() {
    }

    // the reason this is commented out is because
    // this should be called by the code under test, not 
    // provided by the test framework!
/*    var model = {
        save: function(badges, err) {
                  next();
              },
        send: function(badges, err) {
             
        }
    }; 
*/

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

    beforeEach(function() {
        mockery.resetCache();
        mockery.registerAllowable(model);
        mockery.registerAllowable(quotes);
        mockery.registerAllowable(underscore);
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });

        mockery.registerMock('../models/quotes', model);
        
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

