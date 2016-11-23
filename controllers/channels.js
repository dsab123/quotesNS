'use strict';

var _ = require('underscore');
var model = require('../models/channels');

/** creates the channel 
 */
exports.create = function(req, res, next) {
    var channel = _.clone(req.body);

    var channelName = channel.channel;

    // validate that the channel is well-formed
    if (exports.validateChannel(channel) == false)  
        return res.json(400, {msg: "channel not in valid format!"});

    model.create(channelName, function(err) {

        if (err) {
            return res.json(err.status, err);
        } else
            return res.json(200, {msg: "channel created!"});
    });
};



/** validates that the channel is well-formed
 */
exports.validateChannel = function(channel) {
    if (channel.channel == null && channel.channel == '')
        return false;

    // only requirement for validation: if the type is a book, it must have an author
    if (channel.type == 'book') {
        if (channel.author == null) 
            return false;
        else
            return true;
    }
    
    return true;
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
