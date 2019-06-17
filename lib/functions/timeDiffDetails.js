var diff = require('./diff');
var parseTimeDiff = require('./parseTimeDiff');
/**
 * @typedef {Object.<string, *>} TimeDiffDetails
 * @property {number} d 时间差中的天数
 * @property {number} h 时间差中的小时数
 * @property {number} m 时间差中的分钟数
 * @property {number} s 时间差中的秒数
 * @property {number} S 时间差中的毫秒数
 * @property {number} n 时间差的符号，`1` 代表整数，`-1` 代表负数
 * @property {(template: string) => string} format 一个用于格式化当前时间差详细信息的函数
 */

/**
 * 获取时间差的详细信息
 *
 * @param {number|string|Date|TimePoint} t1 时间点 1
 * @param {number|string|Date|TimePoint} t2 时间点 2
 * @returns {TimeDiffDetails} 返回时间差之间的详细信息
 */
function timeDiffDetails(t1, t2) {
    return parseTimeDiff(diff(t1, t2));
}

module.exports = timeDiffDetails;
