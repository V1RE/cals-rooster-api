const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const path = require('path');

global.config = require(__dirname + '/config/config.json');
global.appRoot = path.resolve(__dirname);
global.lib = require('./lib.js');

var app = express();
var api = require('./routes/routes.js');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api', api);

app.listen(config.server.port, function () {
  console.log("Server running on http://127.0.0.1:" + config.server.port);
});