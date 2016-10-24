var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var routes = require('../routes');
var quotes;// = require('../controllers/quotes');


describe("Quotes Controller", function() {
    var next = function() {
        console.log('next!');
    }

    var model = {
        save: function(badges, err) {
                  console.log('badges.save from mock!');
                  next();
              }
    }; 


    var req = {
        body: {}
    };
    var res = {};

    beforeEach(function() {
        console.log('in beforeEach!');

        mockery.resetCache();
        mockery.registerAllowable(model);
        mockery.enable({ useCleanCache: true });
        mockery.registerMock('../models/quotes', model);
        
        quotes = require('../controllers/quotes');
    });

    describe("quotes.save", function() {

        it("should call next()", function() {
            var spy = next = sinon.spy();

            quotes.save(req, res, next);
            expect(spy.calledOnce).to.equal(true);
        });

        it("should interact with the model", function() {
            var spy = model.save = sinon.spy();

            quotes.save(req, res, next);
            expect(spy.calledOnce).to.equal(true);
        });

    });
});

