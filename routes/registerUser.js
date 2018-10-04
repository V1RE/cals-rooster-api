const fs = require('fs');
const md5 = require('md5');

module.exports = function registerUser(requser, callback) {
  lib.getUsers(function (users) {
    user = lib.getArrayItem(users, "email", requser.email);
    if (user) {
      callback({
        "message": "email address is already in use",
        "status": "error"
      });
    } else if (requser.password.length < 8 || requestAnimationFrame.password.length > 256) {
      callback({
        "status": "error",
        "message": "password has to contain a minimum of 8 and a maximum of 256 characters"
      });
    } else if (requser.email && requser.password && requser.infoweb.password && requser.infoweb.username && requser.fullName) {
      newuser = {
        "_id": md5(md5(requser.email)+md5(requser.password)),
        "fullName": requser.fullName,
        "email": requser.email,
        "password": md5(requser.password),
        "infoweb": {
          "username": requser.infoweb.username,
          "password": requser.infoweb.password
        }
      };
      users[users.length] = newuser;
      lib.setUsers(users, function (output) {
        callback(output);
      });
    } else {
      callback({
        "status": "error",
        "body": "Please fill in the required fields"
      });
    }
  });
};
