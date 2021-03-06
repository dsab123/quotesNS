'use strict';
    
var router = require('express').Router();
var quotes = require('./controllers/quotes');
var channels = require('./controllers/channels');

router.post('/quote', quotes.create); //, quotes.schedule); 

router.post('/createChannel', channels.create);

router.post('/scheduleChannel', channels.schedule);


// once I get to these
/*
router.post('/editChannel', channels.edit);
router.post('/deleteChannel', channels.delete);
router.post('/scheduleChannel', channels.schedule);
*/

module.exports = router;
