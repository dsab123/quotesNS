'use strict';
    
var router = require('express').Router();
var quotes = require('./controllers/quotes');


router.get('/mypath/myentity', function(req, res) {
	res.status(200);
    res.send('Everything worked out fine');
    res.end();
});

/*
router.post('/quote', function(req, res) {
	res.status(200);
    res.send('Everything worked out fine for POST');
    res.end();

});
*/

router.post('/quote', quotes.save, quotes.send); 

module.exports = router;
