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
      console.log(moment().week());
      console.log(moment().add(1, 'w').week());
      getCSRF(function(csrf, cjar) {
        getSchedule(user.infoweb.username, user.infoweb.password, req.body.week = moment().week(), csrf, cjar, function(data) {
          scheduleToJSON(data, function (events) {
            getSchedule(user.infoweb.username, user.infoweb.password, req.body.week = moment().add(1, 'week').week(), csrf, cjar, function(data1) {
              scheduleToJSON(data1, function (events1) {
                getSchedule(user.infoweb.username, user.infoweb.password, req.body.week = moment().add(2, 'week').week(), csrf, cjar, function(data2) {
                  scheduleToJSON(data2, function (events2) {
                    getSchedule(user.infoweb.username, user.infoweb.password, req.body.week = moment().add(3, 'week').week(), csrf, cjar, function(data3) {
                      scheduleToJSON(data3, function (events3) {
                        console.log(JSON.stringify(events.concat(events1, events2, events3)));
                        JSONToICS(events.concat(events1, events2, events3), user, function (output) {
                          res.send(output);
                        });
                      });
                    });
                  });
                });
              });
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
