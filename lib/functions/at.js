var TimePoint = require('../TimePoint');

/**
 * 获取今天的某个时间点对应的 `TimePoint` 实例。
 *
 * @param {string} time 指定的时间点，范围为 `00:00:00.000` 到 `23:59:59.999`。
 * @returns {TimePoint} 返回一个 `TimePoint` 实例。
 */
function at(time) {
    return new TimePoint().at(time);
}

module.exports = at;
