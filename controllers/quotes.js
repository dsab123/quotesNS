'use strict';

var _ = require('underscore');
var model = require('../models/quotes');

exports.create = function(req, res, next) {
    if (req.body == null || _.isEmpty(req.body)) 
       return res.status(400).json({status: 400, msg: "req body is empty"}); 

    var quotes = _.clone(req.body);

    // ensure that quotes is an array, even if only one element
    if (!_.isArray(quotes)) 
        quotes = [quotes];

    model.create(quotes, function(err, data) {
        if (err) 
            return res.status(err.status).json(err);

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


