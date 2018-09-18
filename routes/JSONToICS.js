const ics = require('ics');

module.exports = function JSONToICS(events, callback) {
  ics.createEvents(events, function (err, output) {
    if (!err) {
      console.log(output);
      callback(output);
    } else {
      console.error(err);
      throw err;
    }
  });
}