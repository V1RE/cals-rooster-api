const request = require('request');
const jsdom = require('jsdom');

module.exports = function getCSRF(callback) {
  var cjar = request.jar();
  request.get({
    url: config.rooster.baseUrl,
    jar: cjar
  }, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      const dom = new jsdom.JSDOM(body);
      const $ = (require('jquery'))(dom.window);
      callback($("input[name=csrf]").val(), cjar);
    } else {
      throw err;
    }
  });
}