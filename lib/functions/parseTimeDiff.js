var tpl = require('./tpl');

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
 * 解析时间差
 *
 * @param {number} diff 事间差（毫秒）
 * @returns {TimeDiffDetails} 返回时间差详细信息
 */
function parseTimeDiff(diff) {
    diff = parseInt(diff, 10);
    diff = isNaN(diff) ? 0 : diff;

    var sign = 0;

    if (diff > 0) {
        sign = 1;
    } else if (diff < 0) {
        sign = -1;
        diff = -diff;
    }

    var day = Math.floor(diff / DAY);

    diff = diff - day * DAY;

    var hour = Math.floor(diff / HOUR);

    diff = diff - hour * HOUR;

    var min = Math.floor(diff / MINUTE);

    diff = diff - min * MINUTE;

    var sec = Math.floor(diff / SECOND);

    diff = diff - sec * SECOND;

    var ms = diff;

    return {
        d: day,
        h: hour,
        m: min,
        s: sec,
        S: ms,
        n: sign,
        /**
         * 格式化
         *
         * @param {string} template 模板字符串
         * @returns {string}
         */
        format: function (template) {
            return tpl(template, this);
        }
    };
}

module.exports = parseTimeDiff;
