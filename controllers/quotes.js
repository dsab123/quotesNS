'use strict';

var _ = require('underscore');
var model = require('../models/quotes');

exports.save = function(req, res, next) {
    var quotes = _.clone(req.body);

    // ensure that quotes is an array, even if only one element
    if (!_.isArray(quotes)) 
        quotes = [quotes];

    model.save(quotes, function(err) {
        console.log('in REAL model.save');

        // TODO: I need to check the return value and return a good response code
        next();
    });
};  

exports.schedule = function(req, res, next) {
    var quotes = _.clone(req.body);

    model.schedule(quotes, function(err) {
        if (err) return res.status(500).json({ error: true });
        res.status(200).json({ job: 'scheduled!' });
    });
};


