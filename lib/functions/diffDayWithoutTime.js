var TimePoint = require('../TimePoint');

/**
 * 获取两个时间之间的天数差，此函数只会对比日期部分（忽略时间），所以返回的是一个整数
 *
 * @param {number|string|Date|TimePoint} t1 时间点 1
 * @param {number|string|Date|TimePoint} t2 时间点 2
 * @returns {number} 返回两个时间点间隔的天数（整数）
 */
function diffDayWithoutTime(t1, t2) {
    var a = new TimePoint(t1);
    var b = new TimePoint(t2);

    a = a.at('12:00:00.000');
    b = b.at('12:00:00.000');

    return (b.getTime() - a.getTime()) / 86400000;
}

module.exports = diffDayWithoutTime;
