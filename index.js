const express = require('express');
const bodyParser = require('body-parser');
const lib = require('./app.js');
const moment = require('moment');

var app = express();
var config = require('./config.json');
var api = express.Router();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

api.get('/', function (req, res) {
  lib.getCSRF(function(csrf, j) {
    lib.getSchedule("115626", "test", "37", csrf, j, function(data) {
      lib.scheduleToICS(data, function (events) {
        res.send(events);
      });
    });
  });
});

app.use('/api', api);

app.listen(config.server.port, function () {
  console.log("Server running on http://127.0.0.1:" + config.server.port);

});