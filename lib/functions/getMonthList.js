var TimePoint = require('../TimePoint');
var parse = require('./parse');
var diff = require('./diff');

/**
 * 获取两个日期之间的月份列表
 *
 * @param {number|string|Date|TimePoint} start
 * @param {number|string|Date|TimePoint} end
 * @returns {TimePoint[]} 返回一个日期字符串数组
 */
function getMonthList(start, end) {
    var t1 = parse(start).at('12:00:00.000').getFirstDay();
    var t2 = parse(end).at('12:00:00.000').getFirstDay();
    var d = diff(t1, t2);
    var monthList = [];
    var text;
    var month;
    var lastMonth;

    if (d > 0) {
        month = t1;
        lastMonth = t2.format('YYYY-MM');
        do {
            monthList.push(month);
            text = month.format('YYYY-MM');
            month = month.nextMonth();
        } while (text !== lastMonth);
    } else if (d === 0) {
        monthList.push(t1);
    }

    return monthList;
}

module.exports = getMonthList;
