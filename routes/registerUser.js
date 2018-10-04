const fs = require('fs');
const md5 = require('md5');
const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:test1234@ds251902.mlab.com:51902/infoweb');
var db = mongoose.connection;

module.exports = function registerUser(requser, callback) {
  var newUser = new lib.models.users.User({
    email: requser.email,
    password: md5(requser.password),
    hash: md5(md5(requser.email)+md5(requser.password)),
    fullName: requser.fullName,
    infoweb: requser.infoweb
  });

  newUser.save(function(err) {
    if (!err) {
      console.log("User saved");
      callback({
        "body": "",
        "status": "succes"
      });
    } else {
      callback({
        "status": "error",
        "body": err
      });
    }
  });
};
