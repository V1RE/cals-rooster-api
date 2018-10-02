// Adding 'ics' package for exporting JSON data as .ics data
const ics = require('ics');

// Function which turns JSON data into ics data
module.exports = function JSONToICS(events, user, callback) {
  ics.createEvents(events, function(err, output) {
    if (!err) {
      output = output.replace("X-PUBLISHED-TTL:PT1H", "X-PUBLISHED-TTL:PT30M\nX-WR-TIMEZONE:Europe/Amsterdam\nX-WR-CALNAME:Rooster van " + user.fullName + "\nX-WR-CALDESC:Infoweb rooster van " + user.fullName)
      .replace(/DTSTART/g, "DTSTART;TZID=Europe/Amsterdam")
      .replace(/DTEND/g, "DTEND;TZID=Europe/Amsterdam")
      .replace("PRODID:adamgibbons/ics", "PRODID:cals-rooster-api\/\/Niels Mentink, Yannick Mackor and Tom van Poppelen");
      console.log(output);
      // Sends ics data back to user
      callback(output);
    } else {
      // Throw error
      throw err;
    }
  });
}