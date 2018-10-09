const fs = require('fs');
const md5 = require('md5');
const mongoose = require('mongoose');

module.exports = async function registerUser(requser, callback) {
  var models = require('../models')(mongoose);
  mongoose.connect('mongodb://admin:test1234@ds251902.mlab.com:51902/infoweb', function(err){
    if(!err){
      var newUser = new models.Users({
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
    } else {
      callback({
        "status": "error",
        "body": err
      });
    }
  });
};
