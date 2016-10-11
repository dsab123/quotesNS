'use strict';
    
var router = require('express').Router();

router.get('/mypath/myentity', function(req, res) {
	// Do stuff here
	res.status(200);
    res.send('Everything worked out fine');
    res.end();
});
 
module.exports = router;
