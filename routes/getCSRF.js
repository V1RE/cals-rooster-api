// Adding request package for sending http requests to infoweb
const request = require('request');
// Adding jsDOM package for modifying a backend local DOM
const jsdom = require('jsdom');

module.exports = function getCSRF(callback) {
  // Creating cookiejar to store the first part of the CSRF authentication code
  var cjar = request.jar();
  
  // Sending request to infoweb with the cookiejar attached
  request.get({
    url: config.rooster.baseUrl,
    jar: cjar
  }, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      // Create backend DOM with infoweb HTML data
      const dom = new jsdom.JSDOM(body);
      // Add jQuery to the DOM
      const $ = (require('jquery'))(dom.window);
      // Return CSRF from jQuery and send along the cookies
      callback($("input[name=csrf]").val(), cjar);
    } else {
      // Throw error if the statuscode isn't 200
      throw err;
    }
  });
}