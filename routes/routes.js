const express = require('express');
const moment = require('moment');
const md5 = require('md5');
const getCSRF = require('./getCSRF');
const getSchedule = require('./getSchedule');
const JSONToICS = require('./JSONToICS');
const scheduleToJSON = require('./scheduleToJSON');
const registerUser = require('./registerUser');
const getUsers = require('./getUsers');

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
  getUsers(function(users) {
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