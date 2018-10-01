// Adding 'ics' package for exporting JSON data as .ics data
const ics = require('ics');

// Function which turns JSON data into ics data
module.exports = function JSONToICS(events, callback) {
  ics.createEvents(events, function(err, output) {
    if (!err) {
      console.log(output);
      // Sends ics data back to user
      callback(output);
    } else {
      // Throw error
      throw err;
    }
  });
}