'use strict';

var _ = require('underscore');
var model = require('../models/channels');

/** creates the channel 
 */
exports.create = function(req, res, next) {
    var channel = _.clone(req.body);

    var channelName = channel.channel;

    console.log('channel is: ' + channelName);
    
    model.create(channelName, function(err) {

        console.log('err from model is: ' + err);

        if (err) {
            console.log('before returning json');
            return res.status(err).json({ msg: "channel already exists!"});
        } else
            return res.status(200).json({ msg: "channel created!"});
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
