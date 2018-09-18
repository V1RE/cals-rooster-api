const moment = require('moment');
const path = require('path');

moment.locale("nl");

function getArrayItem(array, query, match) {
  return array[array.findIndex(function (arrayItem) {
    return arrayItem[query] == match;
  })];
}

function getRoot(uri) {
  return path.join(appRoot, uri);
}

module.exports.getArrayItem = getArrayItem;
module.exports.getRoot = getRoot;