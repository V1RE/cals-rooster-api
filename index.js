// Adding packages
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

// Define globals for easier use troughout the project
global.appRoot = path.resolve(__dirname);
global.config = require(__dirname + '/config/config.json');
global.lib = require('./lib.js');

// Setting up Express webserver
var api = require('./routes/routes.js');
var app = express();

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
