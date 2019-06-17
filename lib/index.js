var TimePoint = require('./TimePoint');
var at = require('./functions/at');
var diff = require('./functions/diff');
var diffDay = require('./functions/diffDay');
var diffDayWithoutTime = require('./functions/diffDayWithoutTime');
var diffHour = require('./functions/diffHour');
var diffMinute = require('./functions/diffMinute');
var diffSec = require('./functions/diffSec');
var getDateList = require('./functions/getDateList');
var getMonthList = require('./functions/getMonthList');
var isLeapYear = require('./functions/isLeapYear');
var lastDayOfTheMonth = require('./functions/lastDayOfTheMonth');
var now = require('./functions/now');
var parse = require('./functions/parse');
var parseTimeDiff = require('./functions/parseTimeDiff');
var timeDiffDetails = require('./functions/timeDiffDetails');

var timepoint = {
    TimePoint: TimePoint,
    at: at,
    diff: diff,
    diffDay: diffDay,
    diffDayWithoutTime: diffDayWithoutTime,
    diffHour: diffHour,
    diffMinute: diffMinute,
    diffSec: diffSec,
    getDateList: getDateList,
    getMonthList: getMonthList,
    isLeapYear: isLeapYear,
    lastDayOfTheMonth: lastDayOfTheMonth,
    now: now,
    parse: parse,
    parseTimeDiff: parseTimeDiff,
    timeDiffDetails: timeDiffDetails
};

module.exports = timepoint;
