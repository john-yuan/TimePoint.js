var TimePoint = require('../TimePoint');

/**
 * 获取两个时间之间的毫秒差（t2 - t1）
 *
 * @param {number|string|Date|TimePoint} t1 时间点 1
 * @param {number|string|Date|TimePoint} t2 时间点 2
 * @returns {number} 返回两个时间点之间的毫秒差
 */
function diff(t1, t2) {
    var a = new TimePoint(t1);
    var b = new TimePoint(t2);

    return b.getTime() - a.getTime();
}

module.exports = diff;
