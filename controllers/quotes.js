'use strict';

var _ = require('underscore');
var model = require('../models/quotes');

exports.save = function(req, res, next) {
    var quotes = _.clone(req.body);
    model.save(quotes, function(err) {

        next();

    });


};  

exports.send = function(req, res, next) {
    var quotes = _.clone(req.body);

    model.send(quotes, function(err) {
        if (err) return res.json(500, { error: true });
        res.json(200, { job: 'scheduled!' });
    });
};
