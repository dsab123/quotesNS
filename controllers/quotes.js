'use strict';

var _ = require('underscore');
var model = require('../models/quotes');

exports.save = function(req, res, next) {
    model.save('', function(err) {
        // should actually do something here...
        next();
        
    });


};  

exports.send = function(req, res, next) {

    // do something with pushing the quote someewhere?
    // this will happen AFTER a scheduled delay, though...
    model.send('', function(err) {
        res.json(200, { error : null });
    });
};
