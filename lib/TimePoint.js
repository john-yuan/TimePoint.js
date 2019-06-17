var tpl = require('./functions/tpl');
var trim = require('./functions/trim');
var parseMs = require('./functions/parseMs');
var parseTime = require('./functions/parseTime');
var lastDayOfTheMonth = require('./functions/lastDayOfTheMonth');

// 时间单位常量
var DAY = 86400000;
var HOUR = 3600000;
var MINUTE = 60000;
var SECOND = 1000;

/**
 * @class
 * @param {string|number|Date|TimePoint} [time] 需要解析的时间，如果未指定，默认为系统当前时间。
 */
function TimePoint(time) {
    this.time = parseTime(time);
}

/**
 * 解析当前时间，并返回时间组件的映射表。
 *
 * @returns {Object.<string, *>} 返回时间组件映射表。
 */
TimePoint.prototype.map = function () {
    var date = new Date(this.getTime());
    var YYYY = date.getFullYear();
    var YY   = (YYYY + '').substr(-2);
    var M    = date.getMonth() + 1;
    var MM   = M < 10 ? ('0' + M) : M;
    var D    = date.getDate();
    var DD   = D < 10 ? ('0' + D) : D;
    var H    = date.getHours();
    var HH   = H < 10 ? ('0' + H) : H;
    var m    = date.getMinutes();
    var mm   = m < 10 ? ('0' + m) : m;
    var s    = date.getSeconds();
    var ss   = s < 10 ? ('0' + s) : s;
    var S    = date.getMilliseconds();
    var SS   = S < 10 ? ('0' + S) : S;
    var SSS  = S < 100 ? ('0' + SS) : S;

    SSS = '' + SSS;
    S = SSS.substr(0, 1);
    SS = SSS.substr(0, 2);

    return {
        YYYY: '' + YYYY,
        YY: '' + YY,
        M: '' + M,
        MM: '' + MM,
        D: '' + D,
        DD: '' + DD,
        H: '' + H,
        HH: '' + HH,
        m: '' + m,
        mm: '' + mm,
        s: '' + s,
        ss: '' + ss,
        S: S,
        SS: SS,
        SSS: SSS
    };
};

/**
 * 格式化当前时间，如果参数类型不是字符串，则使用默认参数 `YYYY-MM-DD HH:mm:ss`。
 *
 * @param {string} [format='YYYY-MM-DD HH:mm:ss'] 可选的时间模板字符串，默认值为 `YYYY-MM-DD HH:mm:ss`。
 * @returns {string} 返回格式化后的日期文本。
 */
TimePoint.prototype.format = function (format) {
    if (typeof format !== 'string') {
        format = 'YYYY-MM-DD HH:mm:ss';
    }

    var map = this.map();

    format = format.replace(/YYYY/g, map.YYYY);
    format = format.replace(/YY/g, map.YY);
    format = format.replace(/MM/g, map.MM);
    format = format.replace(/M/g, map.M);
    format = format.replace(/DD/g, map.DD);
    format = format.replace(/D/g, map.D);
    format = format.replace(/HH/g, map.HH);
    format = format.replace(/H/g, map.H);
    format = format.replace(/mm/g, map.mm);
    format = format.replace(/m/g, map.m);
    format = format.replace(/ss/g, map.ss);
    format = format.replace(/s/g, map.s);
    format = format.replace(/SSS/g, map.SSS);
    format = format.replace(/SS/g, map.SS);
    format = format.replace(/S/g, map.S);

    return format;
};

/**
 * 获取当前时间点所对应的时间毫秒数。
 *
 * @returns {number} 返回当前时间点所对应的时间毫秒数。
 */
TimePoint.prototype.getTime = function () {
    return this.time;
};

/**
 * 获取当前时间点所对应的 `Date` 实例，每次调用这个方法都会返回一个新的 `Date` 实例。
 *
 * @returns {Date} 返回当前实例所对应的 `Date` 实例。
 */
TimePoint.prototype.getDate = function () {
    return new Date(this.time);
};

/**
 * 获取当前时间点对应月份中的最后一天。
 *
 * @returns {number} 返回当前时间点对应月份中的最后一天，可能的值有 28、29、30 或 31。
 */
TimePoint.prototype.lastDayOfThisMonth = function () {
    var date = this.getDate();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;

    return lastDayOfTheMonth(year, month);
};

/**
 * 获取当前月份第一天对应的 `TimePoint` 对象。
 *
 * @returns {TimePoint} 返回当前月份第一天对应的 `TimePoint` 对象，每次都返回一个新的实例。
 */
TimePoint.prototype.getFirstDay = function () {
    var text = this.format('YYYY-MM-01 HH:mm:ss.SSS');

    return new TimePoint(text);
};

/**
 * 获取当前月份最后一天对应的 `TimePoint` 对象。
 *
 * @returns {TimePoint} 返回当前月份最后一天对应的 `TimePoint` 对象，每次都返回一个新的实例。
 */
TimePoint.prototype.getLastDay = function () {
    var lastDay = this.lastDayOfThisMonth();
    var text = this.format('YYYY-MM-' + lastDay + ' HH:mm:ss.SSS');

    return new TimePoint(text);
};

/**
 * 克隆当前 `TimePoint` 对象。
 *
 * @returns {TimePoint} 返回一个新的 `TimePoint` 实例。
 */
TimePoint.prototype.clone = function () {
    return new TimePoint(this.getTime());
};

/**
 * 克隆当前 `TimePoint` 对象，`clone` 方法的别名。
 *
 * @returns {TimePoint} 返回一个新的 `TimePoint` 实例。
 */
TimePoint.prototype.copy = function () {
    return new TimePoint(this.getTime());
};

/**
 * 移除当前时间点的毫秒部分，并返回一个新的 `TimePoint` 实例。
 *
 * @returns {TimePoint} 一个新的 `TimePoint` 实例。
 */
TimePoint.prototype.clearMs = function () {
    var date = this.getDate();

    date.setMilliseconds(0);

    return new TimePoint(date.getTime());
};

/**
 * 添加毫秒数，并返回一个新的 `TimePoint` 实例。
 *
 * @param {number} ms 需要添加的毫秒数，可以为负数。
 * @returns {TimePoint} 返回一个新的 `TimePoint` 实例。
 */
TimePoint.prototype.addMs = function (ms) {
    ms = parseInt(ms, 10);
    ms = isNaN(ms) ? 0 : ms;
    return new TimePoint(this.getTime() + ms);
};

/**
 * 添加秒数，并返回一个新的 `TimePoint` 实例。
 *
 * @param {number} sec 需要添加的秒数，可以为负数。
 * @returns {TimePoint} 返回一个新的 `TimePoint` 实例。
 */
TimePoint.prototype.addSec = function (sec) {
    sec = parseInt(sec, 10);
    sec = isNaN(sec) ? 0 : sec;
    return new TimePoint(this.getTime() + (sec * SECOND));
};

/**
 * 添加分钟数，并返回一个新的 `TimePoint` 实例。
 *
 * @param {number} min 需要添加的分钟数，可以为负数。
 * @returns {TimePoint} 返回一个新的 `TimePoint` 实例。
 */
TimePoint.prototype.addMin = function (min) {
    min = parseInt(min, 10);
    min = isNaN(min) ? 0 : min;
    return new TimePoint(this.getTime() + (min * MINUTE));
};

/**
 * 添加小时数，并返回一个新的 `TimePoint` 实例。
 *
 * @param {number} hour 需要添加的小时数，可以为负数。
 * @returns {TimePoint} 返回一个新的 `TimePoint` 实例。
 */
TimePoint.prototype.addHour = function (hour) {
    hour = parseInt(hour, 10);
    hour = isNaN(hour) ? 0 : hour;
    return new TimePoint(this.getTime() + (hour * HOUR));
};

/**
 * 添加天数，并返回一个新的 `TimePoint` 实例。
 *
 * @param {number} day 需要添加的天数，可以为负数。
 * @returns {TimePoint} 返回一个新的 `TimePoint` 实例。
 */
TimePoint.prototype.addDay = function (day) {
    day = parseInt(day, 10);
    day = isNaN(day) ? 0 : day;
    return new TimePoint(this.getTime() + (day * DAY));
};

/**
 * 获取下一天，并返回一个新的 `TimePoint` 实例。
 *
 * @returns {TimePoint} 返回一个新的 `TimePoint` 实例。
 */
TimePoint.prototype.nextDay = function () {
    return this.addDay(1);
};

/**
 * 获取前一天，并返回一个新的 `TimePoint` 实例。
 *
 * @returns {TimePoint} 返回一个新的 `TimePoint` 实例。
 */
TimePoint.prototype.prevDay = function () {
    return this.addDay(-1);
};

/**
 * 根据当前时间点创建指定时间的 `TimePoint` 实例，此函数会返回一个新的 `TimePoint` 实例。
 *
 * 此函数会保留当前日期的年、月、日部分，并根据传入的值设置时、分、秒、毫秒，没有传入的部分会被设置为 0。
 *
 * @example timePoint.at('12:00:00.000')
 * @param {string} time 指定的时间点，范围为 `00:00:00.000` 到 `23:59:59.999`。
 * @returns {TimePoint} 返回一个新的 `TimePoint` 实例。
 */
TimePoint.prototype.at = function (time) {
    var date = this.getDate();

    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    time = ('' + (time || 0));
    time = time.replace(/[\.\:]/g, ' ');
    time = trim(time);
    time = time.split(/\s+/);

    var hour = parseInt(time[0], 10);
    var minute = parseInt(time[1], 10);
    var second = parseInt(time[2], 10);
    var ms = parseMs(time[3]);

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

    return new TimePoint(date.getTime());
};

/**
 * `format` 方法的别名。如果参数类型不是字符串，则使用默认参数 `YYYY-MM-DD HH:mm:ss`。
 *
 * @param {string} [format='YYYY-MM-DD HH:mm:ss'] 可选的时间模板字符串，默认值为 `YYYY-MM-DD HH:mm:ss`。
 * @returns {string} 返回格式化后的日期文本。
 */
TimePoint.prototype.toString = function (format) {
    return this.format(format);
};

/**
 * 使用模板引擎格式化日期字符串，如果参数类型不是字符串，则使用默认参数 `{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}`。
 *
 * @param {string} [template='{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}'] 可选的时间模板字符串，默认值为 `{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}`。
 * @returns {string} 返回格式化后的日期文本。
 */
TimePoint.prototype.template = function (template) {
    if (typeof template !== 'string') {
        template = '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}';
    }
    return tpl(template, this.map());
};

/**
 * 获取上个月 1 号的时间点。
 *
 * @returns {TimePoint} 返回上个月 1 号的时间点
 */
TimePoint.prototype.prevMonth = function () {
    var firstDay = this.getFirstDay();
    var time = firstDay.getTime() - 86400000;

    return new TimePoint(time).getFirstDay();
};

/**
 * 获取下个月 1 号的时间点。
 *
 * @returns {TimePoint} 返回下个月 1 号的时间点
 */
TimePoint.prototype.nextMonth = function () {
    var lastDay = this.getLastDay();
    var time = lastDay.getTime() + 86400000;

    return new TimePoint(time);
};

module.exports = TimePoint;
