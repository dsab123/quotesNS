/* jshint node:true */

var express = require('express');
var app = express();

var json = require('express-json');
var bodyParser = require('body-parser');

var routes = require('./routes');
var winston = require('./lib/winston');


// this be the json parser joint 
app.use(bodyParser.json());

// this be the logger joint
app.use(winston.log);

// this is the global route handler
app.use('/', routes);

app.listen(8000, function() {
    console.log("Server listening on port 8000.");
});

