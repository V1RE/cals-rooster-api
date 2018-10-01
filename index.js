// Adding packages
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const path = require('path');

// Define globals for easier use troughout the project
global.config = require(__dirname + '/config/config.json');
global.appRoot = path.resolve(__dirname);
global.lib = require('./lib.js');

// Setting up Express webserver
var app = express();
var api = require('./routes/routes.js');

// Adds bodyParser middleware for JSON request data
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Sets te routes to use '/api' as endpoint
app.use('/api', api);

// Starting server on user defined port
app.listen(config.server.port, function() {
  console.log("Server running on http://127.0.0.1:" + config.server.port);
});