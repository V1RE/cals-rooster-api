const md5 = require('md5');
const fs = require('fs');

module.exports = function registerUser(requser, callback) {
  fs.readFile(lib.getRoot("db/users.json"), function (err, body) {
    if(!err){
      users = JSON.parse(body);
      user = lib.getArrayItem(users, "email", requser.email);
      if (user) {
        callback({
          "message": "E-mailadres is al in gebruik",
          "status": "error"
        });
      } else if (requser.email && requser.password && requser.infoweb.password && requser.infoweb.username) {
        newuser = {
          "email": requser.email,
          "password": md5(requser.password),
          "infoweb": {
            "username": requser.infoweb.username,
            "password": requser.infoweb.password
          }
        }
        users[users.length] = newuser
        fs.writeFile(lib.getRoot("db/users.json"), JSON.stringify(users), function (err, body) {
          if (err) {
            callback({
              "status": "error",
              "body": err
            });
          } else {
            callback({
              "body": "",
              "status": "succes"
            });
          }
        });
      } else {
        callback({
          "status": "error",
          "body": "Please fill in the required fields"
        });
      }
    } else {
      callback({
        "status": "error",
        "body": err
      });
    }
  });
}