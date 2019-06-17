var TimePoint = require('../TimePoint');

/**
 * 解析时间，并用此时间创建一个 `TimePoint` 实例。
 *
 * @param {string|number|Date|TimePoint} [time] 可选的时间，如果未指定，默认为系统当前时间。
 * @returns {TimePoint} 返回一个 `TimePoint` 实例。
 */
function parse(time) {
    return new TimePoint(time);
}

module.exports = parse;
