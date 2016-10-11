'use strict';
    
va express = require('express');
var router = express.Router();

router.get('/mypath/myentity', function(req, res) {
	// Do stuff here
	res.status(200).send('Everything worked out fine').end();
});
 
module.exports = router;
