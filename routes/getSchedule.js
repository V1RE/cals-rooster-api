// Adding request package
const request = require('request');

// Function for getting HTML data of schedule selected week
module.exports = function getSchedule(username, password, week, csrf, cjar, callback) {
  // Sending post request with login data, csrf code + cookies and the week
  request.post({
    url: config.rooster.baseUrl,
    jar: cjar,
    form: {
      csrf: csrf,
      user: username,
      paswoord: password,
      login: "loginform",
      weeknummer: week
    }
  }, function(err, res, body) {
    if (!err) {
      // Sends HTML data back
      callback(body);
    } else {
      // Throws error
      throw err;
    }
  });
};
