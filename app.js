/* jshint node:true */

var express = require('express');
var app = express();
var quotes = require('./controllers/quotes');

var json = require('express-json');
var path = require('path');

app.use(json());

// add more get routes for when I make a SPA to view lists of quotes
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/quote', quotes.save, quotes.send);

app.listen(8000, function() {
    console.log("Server listening on port 8000.");
});

