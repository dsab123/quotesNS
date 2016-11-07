'use strict';

var _ = require('underscore');
var model = require('../models/channels');

/** creates the channel 
 */
exports.create = function(req, res, next) {
    var channel = _.clone(req.body);
    model.create(channel, function(err) {
        next();
    });
};


/** edits the channel (not sure how yet)  
 */
exports.edit = function(req, res, next) {


};


/** deletes the channel 
 */
exports.delete = function(req, res, next) {

};


/** schedules the channel to be played back
 */
exports.schedule = function(req, res, next) {

};
