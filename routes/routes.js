const JSONToICS = require('./JSONToICS');
const express = require('express');
const getCSRF = require('./getCSRF');
const getSchedule = require('./getSchedule');
const md5 = require('md5');
const moment = require('moment');
const registerUser = require('./registerUser');
const scheduleToJSON = require('./scheduleToJSON');

var api = express.Router();

api.get('/rooster/:_id', function (req, res) {
  lib.getUsers(function(users) {
    user = lib.getArrayItem(users, "_id", req.params._id);
    if (!user) {
      res.json({
        "status": "error",
        "body": "This user does not exist"
      });
    } else {
      getCSRF(function(csrf, cjar) {
        getSchedule(user.infoweb.username, user.infoweb.password, req.body.week = moment().week(), csrf, cjar, function(data) {
          scheduleToJSON(data, function (events) {
            JSONToICS(events, user, function (output) {
              res.send(output);
            });
          });
        });
      });
    }
  });
});

api.post('/rooster/', function (req, res) {
  lib.getUsers(function(users) {
    user = lib.getArrayItem(users, "email", req.body.email);
    if (!user) {
      res.json({
        "status": "error",
        "body": "This user does not exist"
      });
    } else if (user.password == md5(req.body.password)) {
      getCSRF(function(csrf, cjar) {
        getSchedule(user.infoweb.username, user.infoweb.password, req.body.week = moment().week(), csrf, cjar, function(data) {
          scheduleToJSON(data, function (events) {
            JSONToICS(events, function (output) {
              res.send(output);
            });
          });
        });
      });
    } else {
      res.json({
        "status": "error",
        "body": "Wrong password"
      });
    }
  });
});

api.post('/register/', function (req, res) {
  registerUser(req.body, function (output) {
    res.json(output);
  });
});

module.exports = api;
