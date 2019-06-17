var TimePoint = require('../TimePoint');
var diff = require('./diff');

/**
 * 获取两个时间之间的分钟数差（t2 - t1）
 *
 * @param {number|string|Date|TimePoint} t1 时间点 1
 * @param {number|string|Date|TimePoint} t2 时间点 2
 * @returns {number} 返回两个时间点之间的分钟数差
 */
function diffMinute(t1, t2) {
    return diff(t1, t2) / 60000;
}

module.exports = diffMinute;
