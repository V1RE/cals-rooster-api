const express = require('express');
const fs = require('fs');
// const config = require('../config/config.json');
const lib = require('../lib');
const getCSRF = require('./getCSRF');
const getSchedule = require('./getSchedule');
const JSONToICS = require('./JSONToICS');
const scheduleToJSON = require('./scheduleToJSON');
const registerUser = require('./registerUser');

var api = express.Router();

api.get('/rooster/', function (req, res) {
  getCSRF(function(csrf, cjar) {
    getSchedule(req.query.u, req.query.p, req.query.w, csrf, cjar, function(data) {
      scheduleToJSON(data, function (events) {
        JSONToICS(events, function (output) {
          res.send(output);
          console.log(req.body);
        });
      });
    });
  });
});

api.post('/rooster/', function (req, res) {
  getCSRF(function(csrf, cjar) {
    getSchedule(req.body.username, req.body.password, req.body.week, csrf, cjar, function(data) {
      scheduleToJSON(data, function (events) {
        JSONToICS(events, function (output) {
          res.send(output);
          console.log(req.body);
        });
      });
    });
  });
});

api.post('/register/', function (req, res) {
  registerUser(req.body, function (output) {
    res.json(output);
  });
});

module.exports = api;