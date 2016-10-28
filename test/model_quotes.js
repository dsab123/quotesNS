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
        array : {},
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
            array.push({ channel, quote});
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
        mockery.registerMock('../controllers/quotes', controller);
        mockery.registerMock('../lib/redis', redis);

        // the code under test
        model = require('../models/quotes');
    });

    describe("model.save", function() {

        it("should push all quotes in array to redis mock", function() {
           model.save(
              [{ 
                "channel": "Delighting In the Trinity", 
                "type": "book", 
                "page": 1, 
                "quote": "Jesus, the Son of God, the firstborn of creation, ..."
              }],
             function() {
                console.log("inside models.save unit test");
             }); 

            console.log(redis.array);
            expect(redis.array.length).to.equal(1);
        });

        it("should push none of the quotes in the empty array to redis mock", function() {
        
        });
    });

    describe("model.send", function() {
        /*
        it("should ", function() {
        });
        */
    });

});

