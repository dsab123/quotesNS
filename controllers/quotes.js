'use strict';

var _ = require('underscore');

exports.save = function(req, res, next) {
    console.log("inside of quotes.save!");
    next();
};  

exports.send = function(req, res, next) {
    console.log("inside of quotes.send!");
    res.json(200, { error : null });
};
