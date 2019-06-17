var isLeapYear = require('./isLeapYear');
var lastDayMap = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * 查询指定月份的最后一天。
 *
 * @param {number} year 表示年份的整数。
 * @param {number} month 表示月份的整数，范围为 1 到 12。
 * @returns {number} 返回指定月份的最后一天，可能的值有 28、29、30、31。
 */
function lastDayOfTheMonth(year, month) {
    year = parseInt(year, 10);
    year = isNaN(year) ? 0 : year;

    month = parseInt(month, 10);
    month = isNaN(month) ? 0 : (month - 1);

    if (month === 1) {
        return isLeapYear(year) ? 29 : 28;
    } else {
        return lastDayMap[month];
    }
}

module.exports = lastDayOfTheMonth;
