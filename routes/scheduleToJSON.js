const jsdom = require('jsdom');
const moment = require('moment');

module.exports = function scheduleToJSON(data, callback) {
  const dom = new jsdom.JSDOM(data);
  const $ = (require('jquery'))(dom.window);
  var weeknum = $("option[selected='selected']").val();
  var events = [];
  $(".container").each(function (i) {
    var curevent = $(this).attr("id").substring(3).split(",");
    var curnobr = $(this).find(".nobr").html().split("<br>");
    var event = {
      start: moment()
        .day(curevent[3])
        .week(weeknum)
        .startOf("day")
        .hour(curevent[0].split(":")[0])
        .minute(curevent[0].split(":")[1])
        .format('YYYY-M-D-H-m').split("-"),
      end: moment()
        .day(curevent[3])
        .week(weeknum)
        .startOf("day")
        .hour(curevent[1].split(":")[0])
        .minute(curevent[1].split(":")[1])
        .format('YYYY-M-D-H-m').split("-"),
      title: curnobr[1],
      description: curnobr[1] + " door " + curnobr[0] + " in " + curnobr[2],
      location: curnobr[2],
      alarms: [{
        action: 'display',
        trigger: {
          minutes: 5,
          before: true
        }
      }]
    };
    events[events.length] = event;
  });
  callback(events);
};
