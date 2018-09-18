const request = require('request');

module.exports = function getSchedule(username, password, week, csrf, cjar, callback) {
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
  }, function (err, res, body) {
    console.log(body);
    callback(body);
  });
}