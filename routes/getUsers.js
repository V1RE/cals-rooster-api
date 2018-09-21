const fs = require('fs');

module.exports = function getUsers(callback) {
  fs.readFile(lib.getRoot("db/users.json"), function (err, body) {
    if (!err) {
      callback(JSON.parse(body));
    } else {
      throw err;
    }
  });
}