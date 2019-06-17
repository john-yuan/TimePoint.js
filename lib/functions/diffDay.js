var TimePoint = require('../TimePoint');
var diff = require('./diff');

/**
 * 获取两个时间之间的天数数差（t2 - t1），注意这个函数的返回值可能是小数（如 1.5），如果希望返回的天数为整数，请使用
 * `timepoint.diffDayWithoutTime(t1, t2)`
 *
 * @param {number|string|Date|TimePoint} t1 时间点 1
 * @param {number|string|Date|TimePoint} t2 时间点 2
 * @returns {number} 返回两个时间点之间的天数数差
 */
function diffDay(t1, t2) {
    return diff(t1, t2) / 86400000;
}

module.exports = diffDay;
