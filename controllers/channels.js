'use strict';

var _ = require('underscore');
var model = require('../models/channels');

/** creates the channel 
 */
exports.create = function(req, res, next) {
    if (req.body == null)
        return res.status(400).json({msg: "req body is empty"});

    var channel = _.clone(req.body);

    var channelName = channel.channel;

    // validate that the channel is well-formed
    if (exports.validateChannel(channel) == false)  
        return res.status(400).json({msg: "channel not in valid format!"});

    model.create(channel, function(err) {
        if (err) {
            return res.status(err.status).json(err);
        } else
            return res.status(200).json({msg: "channel created!"});
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
