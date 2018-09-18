const express = require('express');
const bodyParser = require('body-parser');
const lib = require('./lib.js');
const fs = require('fs');
const moment = require('moment');

var app = express();
var config = require('./config.json');
var api = express.Router();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

api.get('/rooster/', function (req, res) {
  lib.getCSRF(function(csrf, cjar) {
    lib.getSchedule(req.query.u, req.query.p, req.query.w, csrf, cjar, function(data) {
      lib.scheduleToJSON(data, function (events) {
        lib.JSONToICS(events, function (output) {
          res.send(output);
          console.log(req.body);
        });
      });
    });
  });
});

api.post('/rooster/', function (req, res) {
  lib.getCSRF(function(csrf, cjar) {
    lib.getSchedule(req.body.username, req.body.password, req.body.week, csrf, cjar, function(data) {
      lib.scheduleToJSON(data, function (events) {
        lib.JSONToICS(events, function (output) {
          res.send(output);
          console.log(req.body);
        });
      });
    });
  });
});

api.post('/register/', function (req, res) {
  fs.readFile("./users.json", function (err, body) {
    if(!err){
      user = lib.getArrayItem(JSON.parse(body), "email", req.body.email);
      if (user) {
        res.json(user)
      } else {
        res.send("test");
      }
    }
  })
});

app.use('/api', api);

app.listen(config.server.port, function () {
  console.log("Server running on http://127.0.0.1:" + config.server.port);
});