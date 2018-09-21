const md5 = require('md5');
const fs = require('fs');

module.exports = function registerUser(requser, callback) {
  lib.getUsers(function (users) {
    user = lib.getArrayItem(users, "email", requser.email);
    if (user) {
      callback({
        "message": "E-mailadres is al in gebruik",
        "status": "error"
      });
    } else if (requser.email && requser.password && requser.infoweb.password && requser.infoweb.username) {
      newuser = {
        "_id": md5(md5(requser.email)+md5(requser.password)),
        "email": requser.email,
        "password": md5(requser.password),
        "infoweb": {
          "username": requser.infoweb.username,
          "password": requser.infoweb.password
        }
      }
      users[users.length] = newuser
      lib.setUsers(users, function (output) {
        callback(output)
      });
    } else {
      callback({
        "status": "error",
        "body": "Please fill in the required fields"
      });
    }
  });
}