'use strict';

var _ = require('underscore');
//var redis = require('../lib/redis');

exports.save = function(req, res, next) {
    console.log("inside of quotes.save!");

    // do something with redis layer?

    next();
};  

exports.send = function(req, res, next) {
    console.log("inside of quotes.send!");

    // do something with pushing the quote someewhere?
    // this will happen AFTER a scheduled delay, though...

    res.json(200, { error : null });
};
