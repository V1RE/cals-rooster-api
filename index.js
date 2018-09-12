const express = require('express');
const bodyParser = require('body-parser');
const lib = require('./lib.js');
const moment = require('moment');
const mongoose = require('mongoose');

var app = express();
var config = require('./config.json');
var api = express.Router();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
mongoose.connect(config.database.mongoUri);

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
  var userSchema = new mongoose.Schema({
    infowebUsername: String,
    infowebPassword: String,
    infowebName: String,
    hash: String
  });

  var User = mongoose.model('User', userSchema);

  var nielsUser = new User({
    infowebUsername: "12345",
    infowebPassword: "test",
    infowebName: "Niels",
    hash: "8e87ea066c367359ca0e129f79bff09bc470941047c243307f3a7bc8a0d1c068"
  });

  nielsUser.save(function (err) {
    if (err) {
      console.error(err);
      
    }

    console.log("ok");
    
  });
});

// [
//   {
//     "infowebusername": "12345",
//     "infowebpassword": "abcd",
//     "magisterpassword": "abcd",
//     "infowebName": "Niels",
//     "magisterEnabled": true,
//     "magisterName": "Niels Mentink",
//     "uuid": "8e87ea066c367359ca0e129f79bff09bc470941047c243307f3a7bc8a0d1c068"
//   }
// ]

app.use('/api', api);

app.listen(config.server.port, function () {
  console.log("Server running on http://127.0.0.1:" + config.server.port);
});