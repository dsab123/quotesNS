'use strict';

var _ = require('underscore');
var model = require('../models/quotes');

exports.save = function(req, res, next) {
    console.log("inside of quotes.save!");

    // do something with redis layer?
    model.save('', function(err) {
        console.log('inside models.save anon function');
        next();
        
    });


};  

exports.send = function(req, res, next) {
    console.log("inside of quotes.send!");

    // do something with pushing the quote someewhere?
    // this will happen AFTER a scheduled delay, though...

    res.json(200, { error : null });
};
