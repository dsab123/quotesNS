var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var quotes; //controller

describe("Quotes Model: ", function() {
    // the mock functions
    var controller = {
        save: function(badges, err) {
                  console.log("in mock model.save");
              },
        send: function(badges, err) {
              console.log("in mock model.save");
          }
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

    beforeEach(function() {
        // mockery settings
        mockery.resetCache();
        mockery.enable({
            warnOnReplace: true,
            warnOnUnregistered: true,
            useCleanCache: true
        });

        // mock the model, which the controller interacts with a lot
        mockery.registerMock('../lib/redis', redis);
        //mockery.registerMock('../controllers/quotes', controller);

        // the code under test
        model = require('../models/quotes');
    });

    afterEach(function() {
        mockery.deregisterAll();

        redis.fake_array = [];
    });


    describe("model.save", function() {

        it("should push all quotes in array to redis mock", function() {
            var quotes_array =              
            [
                {
                    "channel": "Delighting In the Trinity",
                    "type": "book",
                    "page": 1,
                    "quote": "Jesus, the Son of God, the firstborn of creation, ..."
                },
                {  
                    "channel": "Delighting In the Trinity2",
                    "type": "book",
                    "page": 10,
                    "quote": "Jesus, the Son of God, the firstborn of creation, ..."
                },
                {
                    "channel": "Delighting In the Trinity3",
                    "type": "book",
                    "page": 100,
                    "quote": "Jesus, the Son of God, the firstborn of creation, ..."
                 },
                 {
                    "channel": "Delighting In the Trinity4",
                    "type": "book",
                    "page": 1000,
                    "quote": "Jesus, the Son of God, the firstborn of creation, ..."
                 }
            ];

            // not sure if I should be mocking like this...
            var callback = function(err) {
                if (err) return callback(err, null);
                if (quotes_array.length == 0)
                    return;            

                model.save(quotes_array, callback);
            };

            model.save(quotes_array, callback); 

            expect(redis.fake_array.length).to.equal(4);
        });

        it("should NOT push anything to redis mock", function() {
            var spy = redis.lpush = sinon.spy(); 

            model.save(
             [],
             function() {
                //console.log("inside models.save unit test");
             }); 
          
            expect(spy.calledOnce).to.equal(false); 
        });
    });

    describe("model.send", function() {
        /*
        it("should ", function() {
        });
        */
    });

});

