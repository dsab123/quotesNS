var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var quotes; //controller

// Tests
describe("Quotes Model: ", function() {
    var page, controller, req, res, redis, schedule;

    afterEach(function() {
        mockery.deregisterAll();

        redis.fake_array = [];
    });

    // factory methods for easy testing and less brittle tests
    function getValidQuote() {
        var quote = new Object(); 

        quote.channel = "Delighting In the Trinity",
        quote.type = "book",
        quote.page = page,
        quote.quote = "Jesus, the Son of God, the firstborn of creation, ..."

        // this is terrible logic -- put this somewhere else later
        page = page + 1;

        return quote;
    };

    // has no actual quote
    function getInvalidQuote() {
        var quote = new Object(); 

        quote.channel = "Delighting In the Trinity";

        return quote;
    };


    beforeEach(function() {
        // counter for page number in factory methods (below)
        page = 0;

        // the mock functions
        controller = {
            create: function(badges, err) {
                console.log("in mock model.create");
            },
            schedule: function(badges, err) {
                console.log("in mock model.create");
            }
        };

        req = {
            body: {}
        };

        res = {
            resData: {
                status: 0,
                response: ''
            },
            json: function(object) {
                res.resData.response = object;
            },
            status: function(statusCode) {
                res.resData.status = statusCode;
            }
        };

        redis = {
            fake_array : [],
            createClient: function() {
                console.log("from mock createClient()");
                // don't need to do anything here
                return {
                    on: function(cause, callback) {
                        console.log("from mock redis.on");
                        // don't need to do anything here
                    } 
                };
            }, 

            lpush : function(channel, quote, callback) {
                this.fake_array.push({ channel, quote});
            }
        };

        schedule = {
            cron_string: '',
            scheduleJob: function(schedule, callback) {
                this.cron_string = schedule;
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
        mockery.registerMock('../lib/redis', redis);
        mockery.registerMock('node-schedule', schedule);

        // register allowed modules
        mockery.registerAllowables(['underscore']);
        mockery.registerAllowable('../models/quotes');

        // the code under test
        model = require('../models/quotes');
    });


    describe("model.create", function() {

        it("should push all quotes in array to redis mock", function() {
            var quotes_array = [getValidQuote(), getValidQuote(), getValidQuote(), getValidQuote()];

            // not sure if I should be mocking like this...
            var callback = function(err) {
                if (err) return callback(err, null);
                if (quotes_array.length == 0)
                    return;            

                model.create(quotes_array, callback);
            };

            model.create(quotes_array, callback); 

            expect(redis.fake_array.length).to.equal(4);
        });

        it("should NOT push elements from an empty array to redis mock", function() {
            var spy = redis.lpush = sinon.spy(); 

            model.create(
                [],
                function() {
                    //console.log("inside models.create unit test");
                }); 

                expect(spy.calledOnce).to.equal(false); 
        });

        it("should return false for duplicate quotes", function() {
            // push a valid quote, then try to push it again and check the return
            // value of the second call
            var spy = redis.lpush = sinon.spy();
            var quote = getValidQuote();

            model.create([quote], function(err) {
            });

            model.create([quote], function(err, data) {
                console.log('return value: ' + data);
            });

            expect(spy.calledOnce).to.equal(true);

        });


    });

    describe("model.validate", function() {
        it("should return true for this valid quote object", function() {
            var valid_quote = getValidQuote(); 

            expect(model.validate(valid_quote)).to.equal(true);
        });

        it("should return false for an invalid quote object", function() {
            var invalid_quote = getInvalidQuote();

            expect(model.validate(invalid_quote)).to.equal(false);
        });

        it("should return false for a null quote object", function() {
            var null_quote = null;

            expect(model.validate(null_quote)).to.equal(false);
        });
    });

    describe("model.schedule", function() {

        it("should verify that an event was scheduled", function() {
            model.schedule([getValidQuote(), getValidQuote()], function() {
                //console.log('from passed-in function in unit test');
            });

            // mock the scheduler and check calledOnce
        });

    });
});

