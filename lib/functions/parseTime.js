var now = require('./now');
var trim = require('./trim');
var parseMs = require('./parseMs');
var TimePoint = require('../TimePoint');

/**
 * 解析时间，返回时间的数字表示形式。
 *
 * @param {string|number|Date|TimePoint} [time] 需要解析的时间，如果未指定，默认为系统当前时间。
 * @returns {number} 返回解析后的时间的数字表示（毫秒数）。
 */
function parseTime(time) {
    var type = typeof time;

    // 检查是不是日期字符串
    // 1. '1538366400000'
    // 2. '2018-10-01 12:00:00' 或 '2018-10-1 12:0:0'
    // 3. '2018/10/01 12:00:00' 或 '2018/10/1 12:0:0'
    // 4. '2018-10-01' 或 '2018/10/01'
    if (type === 'string') {
        var num = 0;
        var isNumberString = false;

        // 移除首尾空白字符
        time = trim(time);

        // 检查是不是数字字符串，比如：'1538366400000'
        if (/^[0-9]+$/.test(time)) {
            num = parseInt(time, 10);
            isNumberString = !isNaN(num);
        }

        if (isNumberString) {
            time = num;
        } else {
            time = time.replace(/[Tt\-\:\.\/]/g, ' ');
            time = trim(time);
            time = time.split(/\s+/);

            var year = parseInt(time[0], 10);
            var month = parseInt(time[1], 10);
            var day = parseInt(time[2], 10);
            var hour = parseInt(time[3], 10);
            var minute = parseInt(time[4], 10);
            var second = parseInt(time[5], 10);
            var ms = parseMs(time[6]);

            var date = new Date(0);

            if (!isNaN(year)) {
                date.setFullYear(year);
            }

            if (!isNaN(month)) {
                date.setMonth(month - 1);
            }

            if (!isNaN(day)) {
                date.setDate(day);
            }

            if (!isNaN(hour)) {
                date.setHours(hour);
            }

            if (!isNaN(minute)) {
                date.setMinutes(minute);
            }

            if (!isNaN(second)) {
                date.setSeconds(second);
            }

            if (!isNaN(ms)) {
                date.setMilliseconds(ms);
            }

            time = date.getTime();
        }
    // 如果类型为数字则什么都不做
    } else if (type === 'number') {
        // 什么都不做
    // 检查是不是 Date 对象
    } else if (time instanceof Date) {
        try {
            time = time.getTime();
        } catch (e) {
            time = 0;
        }
    // 检查是不是 TimePoint 对象
    } else if (time && typeof time.time === 'number') {
        time = time.time;
    // 如果以上都不是则返回当前时间
    } else {
        time = now();
    }

    return isNaN(time) ? now() : time;
}

module.exports = parseTime;
