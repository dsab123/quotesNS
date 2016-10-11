/* jshint node:true */

var json = require('express-json');
var path = require('path');

var express = require('express');
var app = express();
//var quotes = require('./controllers/quotes');
var routes = require('./routes/myRoutes');

app.use(json());
app.use('/', routes);

/* 
// add more get routes for when I make a SPA to view lists of quotes
app.get('/mypath/myentity', function(req, res) {
	res.status(200).send("did it pass!?!?").end();
});

app.post('/quote', quotes.save, quotes.send);
*/

app.listen(8000, function() {
    console.log("Server listening on port 8000.");
});

