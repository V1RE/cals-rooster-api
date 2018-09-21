const moment = require('moment');
const path = require('path');
const fs = require('fs');

moment.locale("nl");

function getArrayItem(array, query, match) {
  return array[array.findIndex(function (arrayItem) {
    return arrayItem[query] == match;
  })];
}

function getRoot(uri) {
  return path.join(appRoot, uri);
}

function getUsers(callback) {
  fs.readFile(lib.getRoot("db/users.json"), function (err, body) {
    if (!err) {
      callback(JSON.parse(body));
    } else {
      throw err;
    }
  });
}

function setUsers(users, callback) {
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
}

module.exports.getArrayItem = getArrayItem;
module.exports.getRoot = getRoot;
module.exports.getUsers = getUsers;
module.exports.setUsers = setUsers;