/**
 * 检查指定年份是不是闰年
 *
 * @param {number} year 年份
 * @returns {boolean} 如果是闰年则返回 true，否则返回 false
 */
function isLeapYear(year) {
    year = parseInt(year, 10);
    year = isNaN(year) ? 0 : year;

    if (year % 100 === 0) {
        return year % 400 === 0;
    } else {
        return year % 4 === 0;
    }
}

module.exports = isLeapYear;
