// Adding packages
const moment = require('moment');
const path = require('path');
const fs = require('fs');

// Setting locale to the netherlands for recognition of dutch abbreviations of days
moment.locale("nl");

// Function for getting a specific item in an array
function getArrayItem(array, query, match) {
  return array[array.findIndex(function(arrayItem) {
    return arrayItem[query] == match;
  })];
}

// Function for getting the path to a file from the poreject root
function getRoot(uri) {
  return path.join(appRoot, uri);
}

// Gets users from users.json
function getUsers(callback) {
  fs.readFile(lib.getRoot("db/users.json"), function(err, body) {
    if (!err) {
      // Returns all users as a JSON array
      callback(JSON.parse(body));
    } else {
      // Throws an error if the file couldn't be opened (possibly due to insufficient permissions)
      throw err;
    }
  });
}

// Writes to users.json based on input array
function setUsers(users, callback) {
  // Writes to file
  fs.writeFile(lib.getRoot("db/users.json"), JSON.stringify(users), function(err, body) {
    if (err) {
      // Sends back an error
      callback({
        "status": "error",
        "body": err
      });
    } else {
      // Sends back a sign of succes
      callback({
        "body": "",
        "status": "succes"
      });
    }
  });
}

// Exports functions as part of module 'lib'
module.exports.getArrayItem = getArrayItem;
module.exports.getRoot = getRoot;
module.exports.getUsers = getUsers;
module.exports.setUsers = setUsers;