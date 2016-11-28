'use strict';

var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var _ = require('underscore');
var quotes;

describe("Quotes Controller: ", function() {
    var req, res, model, next;

    beforeEach(function() {

        // the mock functions
        model = {
            ret: false,
            save: function(badges, err) {
                if (!_.isArray(badges)) {
                    console.log("badges is not an array");
                    this.ret = false;
                } else {
                    this.ret = true;
                }
            },
            schedule: function(badges, err) {
                console.log("in mock model.schedule");
            },
        };

        req = {
            body: {}
        };

        res = {
            resData: {
                status: 0,
                response: ''
            },
            json: function(statusCode, object) {
                res.resData.status = statusCode;
                res.resData.response = object;
            }
        };


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

        it("should wrap a single quote in an array before sending it to the model", function() {
            // create a quote, put it in req
            // call quotes.save on it
            // verify that the model.save returns true
            req.body = {
                channel: "fake channel",
                quote: "this is a quote"
            };

            quotes.save(req, res, next);

            expect(model.ret).to.equal(true); 
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

