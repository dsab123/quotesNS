/* jshint node:true */

var express = require('express');
var app = express();

var json = require('express-json');

var routes = require('./routes');

app.use(json());

// this is the global route handler
app.use('/', routes);

/*
app.post('/quote', quotes.save, quotes.send);
*/

app.listen(8000, function() {
    console.log("Server listening on port 8000.");
});

