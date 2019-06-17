var TimePoint = require('../TimePoint');
var parse = require('./parse');
var diff = require('./diff');

/**
 * 获取两个日期之间的日期列表
 *
 * @example
 * // returns ["2018-10-21", "2018-10-22", "2018-10-23"]
 * TimePoint.getDateList('2018-10-21', '2018-10-23')
 *
 * @param {number|string|Date|TimePoint} start
 * @param {number|string|Date|TimePoint} end
 * @returns {TimePoint[]} 返回一个日期字符串数组
 */
function getDateList(start, end) {
    var t1 = parse(start).at('12:00:00.000');
    var t2 = parse(end).at('12:00:00.000');
    var d = diff(t1, t2);
    var dateList = [];
    var text;
    var date;
    var lastDate;

    if (d > 0) {
        date = t1;
        lastDate = t2.format('YYYY-MM-DD');
        do {
            dateList.push(date);
            text = date.format('YYYY-MM-DD');
            date = date.nextDay();
        } while (text !== lastDate);
    } else if (d === 0) {
        dateList.push(t1);
    }

    return dateList;
}

module.exports = getDateList;
