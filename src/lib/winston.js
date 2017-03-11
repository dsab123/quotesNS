var winston = require('winston');

exports.log = function(req, res, next) {
    winston.log('info', req.body);
    next();
};
