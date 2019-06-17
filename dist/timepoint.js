(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.timepoint = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    var h    = date.getHours();
    var hh   = h < 10 ? ('0' + h) : h;
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
        h: '' + h,
        hh: '' + hh,
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
 * 格式化当前时间，如果参数类型不是字符串，则使用默认参数 `YYYY-MM-DD hh:mm:ss`。
 *
 * @param {string} [format='YYYY-MM-DD hh:mm:ss'] 可选的时间模板字符串，默认值为 `YYYY-MM-DD hh:mm:ss`。
 * @returns {string} 返回格式化后的日期文本。
 */
TimePoint.prototype.format = function (format) {
    if (typeof format !== 'string') {
        format = 'YYYY-MM-DD hh:mm:ss';
    }

    var map = this.map();

    format = format.replace(/YYYY/g, map.YYYY);
    format = format.replace(/YY/g, map.YY);
    format = format.replace(/MM/g, map.MM);
    format = format.replace(/M/g, map.M);
    format = format.replace(/DD/g, map.DD);
    format = format.replace(/D/g, map.D);
    format = format.replace(/hh/g, map.hh);
    format = format.replace(/h/g, map.h);
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
    var text = this.format('YYYY-MM-01 hh:mm:ss.SSS');

    return new TimePoint(text);
};

/**
 * 获取当前月份最后一天对应的 `TimePoint` 对象。
 *
 * @returns {TimePoint} 返回当前月份最后一天对应的 `TimePoint` 对象，每次都返回一个新的实例。
 */
TimePoint.prototype.getLastDay = function () {
    var lastDay = this.lastDayOfThisMonth();
    var text = this.format('YYYY-MM-' + lastDay + ' hh:mm:ss.SSS');

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
 * `format` 方法的别名。如果参数类型不是字符串，则使用默认参数 `YYYY-MM-DD hh:mm:ss`。
 *
 * @param {string} [format='YYYY-MM-DD hh:mm:ss'] 可选的时间模板字符串，默认值为 `YYYY-MM-DD hh:mm:ss`。
 * @returns {string} 返回格式化后的日期文本。
 */
TimePoint.prototype.toString = function (format) {
    return this.format(format);
};

/**
 * 使用模板引擎格式化日期字符串，如果参数类型不是字符串，则使用默认参数 `{YYYY}-{MM}-{DD} {hh}:{mm}:{ss}`。
 *
 * @param {string} [template='{YYYY}-{MM}-{DD} {hh}:{mm}:{ss}'] 可选的时间模板字符串，默认值为 `{YYYY}-{MM}-{DD} {hh}:{mm}:{ss}`。
 * @returns {string} 返回格式化后的日期文本。
 */
TimePoint.prototype.template = function (template) {
    if (typeof template !== 'string') {
        template = '{YYYY}-{MM}-{DD} {hh}:{mm}:{ss}';
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

},{"./functions/lastDayOfTheMonth":12,"./functions/parseMs":15,"./functions/parseTime":16,"./functions/tpl":19,"./functions/trim":20}],2:[function(require,module,exports){
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

},{"../TimePoint":1}],3:[function(require,module,exports){
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

},{"../TimePoint":1}],4:[function(require,module,exports){
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

},{"../TimePoint":1,"./diff":3}],5:[function(require,module,exports){
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

},{"../TimePoint":1}],6:[function(require,module,exports){
var TimePoint = require('../TimePoint');
var diff = require('./diff');

/**
 * 获取两个时间之间的小时数差（t2 - t1）
 *
 * @param {number|string|Date|TimePoint} t1 时间点 1
 * @param {number|string|Date|TimePoint} t2 时间点 2
 * @returns {number} 返回两个时间点之间的小时数差
 */
function diffHour(t1, t2) {
    return diff(t1, t2) / 3600000;
}

module.exports = diffHour;

},{"../TimePoint":1,"./diff":3}],7:[function(require,module,exports){
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

},{"../TimePoint":1,"./diff":3}],8:[function(require,module,exports){
var TimePoint = require('../TimePoint');
var diff = require('./diff');

/**
 * 获取两个时间之间的秒数差（t2 - t1）
 *
 * @param {number|string|Date|TimePoint} t1 时间点 1
 * @param {number|string|Date|TimePoint} t2 时间点 2
 * @returns {number} 返回两个时间点之间的秒数差
 */
function diffSec(t1, t2) {
    return diff(t1, t2) / 1000;
}

module.exports = diffSec;

},{"../TimePoint":1,"./diff":3}],9:[function(require,module,exports){
var TimePoint = require('../TimePoint');
var parse = require('./parse');
var diff = require('./diff');

/**
 * 获取两个日期之间的日期列表
 *
 * @example
 * // returns ["2018-10-21", "2018-10-22", "2018-10-23"]
 * TimePoint.getDateList('2018-10-21', '2018-10-23')
 *
 * @param {number|string|Date|TimePoint} start
 * @param {number|string|Date|TimePoint} end
 * @returns {TimePoint[]} 返回一个日期字符串数组
 */
function getDateList(start, end) {
    var t1 = parse(start).at('12:00:00.000');
    var t2 = parse(end).at('12:00:00.000');
    var d = diff(t1, t2);
    var dateList = [];
    var text;
    var date;
    var lastDate;

    if (d > 0) {
        date = t1;
        lastDate = t2.format('YYYY-MM-DD');
        do {
            dateList.push(date);
            text = date.format('YYYY-MM-DD');
            date = date.nextDay();
        } while (text !== lastDate);
    } else if (d === 0) {
        dateList.push(t1);
    }

    return dateList;
}

module.exports = getDateList;

},{"../TimePoint":1,"./diff":3,"./parse":14}],10:[function(require,module,exports){
var TimePoint = require('../TimePoint');
var parse = require('./parse');
var diff = require('./diff');

/**
 * 获取两个日期之间的月份列表
 *
 * @param {number|string|Date|TimePoint} start
 * @param {number|string|Date|TimePoint} end
 * @returns {TimePoint[]} 返回一个日期字符串数组
 */
function getMonthList(start, end) {
    var t1 = parse(start).at('12:00:00.000').getFirstDay();
    var t2 = parse(end).at('12:00:00.000').getFirstDay();
    var d = diff(t1, t2);
    var monthList = [];
    var text;
    var month;
    var lastMonth;

    if (d > 0) {
        month = t1;
        lastMonth = t2.format('YYYY-MM');
        do {
            monthList.push(month);
            text = month.format('YYYY-MM');
            month = month.nextMonth();
        } while (text !== lastMonth);
    } else if (d === 0) {
        monthList.push(t1);
    }

    return monthList;
}

module.exports = getMonthList;

},{"../TimePoint":1,"./diff":3,"./parse":14}],11:[function(require,module,exports){
/**
 * 检查指定年份是不是闰年
 *
 * @param {number} year 年份
 * @returns {boolean} 如果是闰年则返回 true，否则返回 false
 */
function isLeapYear(year) {
    year = parseInt(year, 10);
    year = isNaN(year) ? 0 : year;

    if (year % 100 === 0) {
        return year % 400 === 0;
    } else {
        return year % 4 === 0;
    }
}

module.exports = isLeapYear;

},{}],12:[function(require,module,exports){
var isLeapYear = require('./isLeapYear');
var lastDayMap = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * 查询指定月份的最后一天。
 *
 * @param {number} year 表示年份的整数。
 * @param {number} month 表示月份的整数，范围为 1 到 12。
 * @returns {number} 返回指定月份的最后一天，可能的值有 28、29、30、31。
 */
function lastDayOfTheMonth(year, month) {
    year = parseInt(year, 10);
    year = isNaN(year) ? 0 : year;

    month = parseInt(month, 10);
    month = isNaN(month) ? 0 : (month - 1);

    if (month === 1) {
        return isLeapYear(year) ? 29 : 28;
    } else {
        return lastDayMap[month];
    }
}

module.exports = lastDayOfTheMonth;

},{"./isLeapYear":11}],13:[function(require,module,exports){
/**
 * 获取系统当前时间。
 *
 * @returns {number} 返回系统当前时间。
 */
function now() {
    return new Date().getTime();
}

module.exports = now;

},{}],14:[function(require,module,exports){
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

},{"../TimePoint":1}],15:[function(require,module,exports){
/**
 * 解析毫秒字符串
 *
 * 1. '1' => 100
 * 2. '10' => 100
 * 3. '01' => 10
 * 4. '001' => 1
 * 5. '0001' => 0
 *
 * @param {string} ms
 * @returns {number}
 */
function parseMs(ms) {
    if (typeof ms === 'string') {
        while (ms.length < 3) {
            ms += '0';
        }
        ms = ms.substr(0, 3);
        return parseInt(ms, 10);
    } else {
        return 0;
    }
}

module.exports = parseMs;

},{}],16:[function(require,module,exports){
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

},{"../TimePoint":1,"./now":13,"./parseMs":15,"./trim":20}],17:[function(require,module,exports){
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

},{"./tpl":19}],18:[function(require,module,exports){
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

},{"./diff":3,"./parseTimeDiff":17}],19:[function(require,module,exports){
/**
 * 模板函数。
 *
 * @example
 * // Returns "Hello, John!"
 * tpl('Hello, {username}!', { username: 'John' });
 * @param {string} template 模板字符串。
 * @param {Object.<string, *>} data 数据对象。
 * @returns {string} 返回编译之后的文本。
 */
function tpl(template, data) {
    var str = [];
    var res = null;
    var regexp = /(^|[^\\])\{([^\{\}]*[^\\])?\}/;

    // 确保参数类型正确
    template = '' + template;
    data = data || {};

    while ( res = regexp.exec(template) ) {
        var index = res.index;
        var match = res[0];
        var prefix = res[1];
        var key = res[2];

        // 去除 key 首尾的空格
        key = (key || '').replace(/^\s+|\s+$/g, '');
        // 保存 key 之前的文本内容
        str.push( template.substr( 0, index + prefix.length ) );
        // 保存 key 对应的值
        str.push( '' + data[key] );
        // 截取剩下未使用的模板字符串
        template = template.substr( index + match.length );
        // 重置 lastIndex（IE 在非全局匹配的模式也会改变 lastIndex）
        regexp.lastIndex = 0;
    }

    // 保存 key 之后的文本内容
    str.push(template);

    // 拼接字符串并将 \{ 和 \} 替换为 { 和 }
    str = str.join('');
    str = str.replace(/\\\{/g, '{');
    str = str.replace(/\\\}/g, '}');

    return str;
}

module.exports = tpl;

},{}],20:[function(require,module,exports){
/**
 * 移除字符串首尾的空白字符。如果 `str` 不是字符串，则将其转换为字符串。如果 `str` 为 `null` 或者 `undefined`，则将其转换为空字符串。
 *
 * @param {any} str
 * @returns {string}
 */
function trim(str) {
    if (typeof str !== 'string') {
        if (str === null || str === void 0) {
            str = '';
        } else {
            str = '' + str;
        }
    }
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

module.exports = trim;

},{}],21:[function(require,module,exports){
var TimePoint = require('./TimePoint');
var at = require('./functions/at');
var diff = require('./functions/diff');
var diffDay = require('./functions/diffDay');
var diffDayWithoutTime = require('./functions/diffDayWithoutTime');
var diffHour = require('./functions/diffHour');
var diffMinute = require('./functions/diffMinute');
var diffSec = require('./functions/diffSec');
var getDateList = require('./functions/getDateList');
var getMonthList = require('./functions/getMonthList');
var isLeapYear = require('./functions/isLeapYear');
var lastDayOfTheMonth = require('./functions/lastDayOfTheMonth');
var now = require('./functions/now');
var parse = require('./functions/parse');
var parseTimeDiff = require('./functions/parseTimeDiff');
var timeDiffDetails = require('./functions/timeDiffDetails');

var timepoint = {
    TimePoint: TimePoint,
    at: at,
    diff: diff,
    diffDay: diffDay,
    diffDayWithoutTime: diffDayWithoutTime,
    diffHour: diffHour,
    diffMinute: diffMinute,
    diffSec: diffSec,
    getDateList: getDateList,
    getMonthList: getMonthList,
    isLeapYear: isLeapYear,
    lastDayOfTheMonth: lastDayOfTheMonth,
    now: now,
    parse: parse,
    parseTimeDiff: parseTimeDiff,
    timeDiffDetails: timeDiffDetails
};

module.exports = timepoint;

},{"./TimePoint":1,"./functions/at":2,"./functions/diff":3,"./functions/diffDay":4,"./functions/diffDayWithoutTime":5,"./functions/diffHour":6,"./functions/diffMinute":7,"./functions/diffSec":8,"./functions/getDateList":9,"./functions/getMonthList":10,"./functions/isLeapYear":11,"./functions/lastDayOfTheMonth":12,"./functions/now":13,"./functions/parse":14,"./functions/parseTimeDiff":17,"./functions/timeDiffDetails":18}]},{},[21])(21)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9UaW1lUG9pbnQuanMiLCJsaWIvZnVuY3Rpb25zL2F0LmpzIiwibGliL2Z1bmN0aW9ucy9kaWZmLmpzIiwibGliL2Z1bmN0aW9ucy9kaWZmRGF5LmpzIiwibGliL2Z1bmN0aW9ucy9kaWZmRGF5V2l0aG91dFRpbWUuanMiLCJsaWIvZnVuY3Rpb25zL2RpZmZIb3VyLmpzIiwibGliL2Z1bmN0aW9ucy9kaWZmTWludXRlLmpzIiwibGliL2Z1bmN0aW9ucy9kaWZmU2VjLmpzIiwibGliL2Z1bmN0aW9ucy9nZXREYXRlTGlzdC5qcyIsImxpYi9mdW5jdGlvbnMvZ2V0TW9udGhMaXN0LmpzIiwibGliL2Z1bmN0aW9ucy9pc0xlYXBZZWFyLmpzIiwibGliL2Z1bmN0aW9ucy9sYXN0RGF5T2ZUaGVNb250aC5qcyIsImxpYi9mdW5jdGlvbnMvbm93LmpzIiwibGliL2Z1bmN0aW9ucy9wYXJzZS5qcyIsImxpYi9mdW5jdGlvbnMvcGFyc2VNcy5qcyIsImxpYi9mdW5jdGlvbnMvcGFyc2VUaW1lLmpzIiwibGliL2Z1bmN0aW9ucy9wYXJzZVRpbWVEaWZmLmpzIiwibGliL2Z1bmN0aW9ucy90aW1lRGlmZkRldGFpbHMuanMiLCJsaWIvZnVuY3Rpb25zL3RwbC5qcyIsImxpYi9mdW5jdGlvbnMvdHJpbS5qcyIsImxpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ2YXIgdHBsID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvdHBsJyk7XG52YXIgdHJpbSA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3RyaW0nKTtcbnZhciBwYXJzZU1zID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvcGFyc2VNcycpO1xudmFyIHBhcnNlVGltZSA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3BhcnNlVGltZScpO1xudmFyIGxhc3REYXlPZlRoZU1vbnRoID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvbGFzdERheU9mVGhlTW9udGgnKTtcblxuLy8g5pe26Ze05Y2V5L2N5bi46YePXG52YXIgREFZID0gODY0MDAwMDA7XG52YXIgSE9VUiA9IDM2MDAwMDA7XG52YXIgTUlOVVRFID0gNjAwMDA7XG52YXIgU0VDT05EID0gMTAwMDtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxEYXRlfFRpbWVQb2ludH0gW3RpbWVdIOmcgOimgeino+aekOeahOaXtumXtO+8jOWmguaenOacquaMh+Wumu+8jOm7mOiupOS4uuezu+e7n+W9k+WJjeaXtumXtOOAglxuICovXG5mdW5jdGlvbiBUaW1lUG9pbnQodGltZSkge1xuICAgIHRoaXMudGltZSA9IHBhcnNlVGltZSh0aW1lKTtcbn1cblxuLyoqXG4gKiDop6PmnpDlvZPliY3ml7bpl7TvvIzlubbov5Tlm57ml7bpl7Tnu4Tku7bnmoTmmKDlsITooajjgIJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsICo+fSDov5Tlm57ml7bpl7Tnu4Tku7bmmKDlsITooajjgIJcbiAqL1xuVGltZVBvaW50LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSk7XG4gICAgdmFyIFlZWVkgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgdmFyIFlZICAgPSAoWVlZWSArICcnKS5zdWJzdHIoLTIpO1xuICAgIHZhciBNICAgID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICB2YXIgTU0gICA9IE0gPCAxMCA/ICgnMCcgKyBNKSA6IE07XG4gICAgdmFyIEQgICAgPSBkYXRlLmdldERhdGUoKTtcbiAgICB2YXIgREQgICA9IEQgPCAxMCA/ICgnMCcgKyBEKSA6IEQ7XG4gICAgdmFyIGggICAgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgdmFyIGhoICAgPSBoIDwgMTAgPyAoJzAnICsgaCkgOiBoO1xuICAgIHZhciBtICAgID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgdmFyIG1tICAgPSBtIDwgMTAgPyAoJzAnICsgbSkgOiBtO1xuICAgIHZhciBzICAgID0gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgdmFyIHNzICAgPSBzIDwgMTAgPyAoJzAnICsgcykgOiBzO1xuICAgIHZhciBTICAgID0gZGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcbiAgICB2YXIgU1MgICA9IFMgPCAxMCA/ICgnMCcgKyBTKSA6IFM7XG4gICAgdmFyIFNTUyAgPSBTIDwgMTAwID8gKCcwJyArIFNTKSA6IFM7XG5cbiAgICBTU1MgPSAnJyArIFNTUztcbiAgICBTID0gU1NTLnN1YnN0cigwLCAxKTtcbiAgICBTUyA9IFNTUy5zdWJzdHIoMCwgMik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBZWVlZOiAnJyArIFlZWVksXG4gICAgICAgIFlZOiAnJyArIFlZLFxuICAgICAgICBNOiAnJyArIE0sXG4gICAgICAgIE1NOiAnJyArIE1NLFxuICAgICAgICBEOiAnJyArIEQsXG4gICAgICAgIEREOiAnJyArIERELFxuICAgICAgICBoOiAnJyArIGgsXG4gICAgICAgIGhoOiAnJyArIGhoLFxuICAgICAgICBtOiAnJyArIG0sXG4gICAgICAgIG1tOiAnJyArIG1tLFxuICAgICAgICBzOiAnJyArIHMsXG4gICAgICAgIHNzOiAnJyArIHNzLFxuICAgICAgICBTOiBTLFxuICAgICAgICBTUzogU1MsXG4gICAgICAgIFNTUzogU1NTXG4gICAgfTtcbn07XG5cbi8qKlxuICog5qC85byP5YyW5b2T5YmN5pe26Ze077yM5aaC5p6c5Y+C5pWw57G75Z6L5LiN5piv5a2X56ym5Liy77yM5YiZ5L2/55So6buY6K6k5Y+C5pWwIGBZWVlZLU1NLUREIGhoOm1tOnNzYOOAglxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZm9ybWF0PSdZWVlZLU1NLUREIGhoOm1tOnNzJ10g5Y+v6YCJ55qE5pe26Ze05qih5p2/5a2X56ym5Liy77yM6buY6K6k5YC85Li6IGBZWVlZLU1NLUREIGhoOm1tOnNzYOOAglxuICogQHJldHVybnMge3N0cmluZ30g6L+U5Zue5qC85byP5YyW5ZCO55qE5pel5pyf5paH5pys44CCXG4gKi9cblRpbWVQb2ludC5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIGlmICh0eXBlb2YgZm9ybWF0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICBmb3JtYXQgPSAnWVlZWS1NTS1ERCBoaDptbTpzcyc7XG4gICAgfVxuXG4gICAgdmFyIG1hcCA9IHRoaXMubWFwKCk7XG5cbiAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvWVlZWS9nLCBtYXAuWVlZWSk7XG4gICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoL1lZL2csIG1hcC5ZWSk7XG4gICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoL01NL2csIG1hcC5NTSk7XG4gICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoL00vZywgbWFwLk0pO1xuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKC9ERC9nLCBtYXAuREQpO1xuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKC9EL2csIG1hcC5EKTtcbiAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvaGgvZywgbWFwLmhoKTtcbiAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvaC9nLCBtYXAuaCk7XG4gICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoL21tL2csIG1hcC5tbSk7XG4gICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoL20vZywgbWFwLm0pO1xuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKC9zcy9nLCBtYXAuc3MpO1xuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKC9zL2csIG1hcC5zKTtcbiAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvU1NTL2csIG1hcC5TU1MpO1xuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKC9TUy9nLCBtYXAuU1MpO1xuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKC9TL2csIG1hcC5TKTtcblxuICAgIHJldHVybiBmb3JtYXQ7XG59O1xuXG4vKipcbiAqIOiOt+WPluW9k+WJjeaXtumXtOeCueaJgOWvueW6lOeahOaXtumXtOavq+enkuaVsOOAglxuICpcbiAqIEByZXR1cm5zIHtudW1iZXJ9IOi/lOWbnuW9k+WJjeaXtumXtOeCueaJgOWvueW6lOeahOaXtumXtOavq+enkuaVsOOAglxuICovXG5UaW1lUG9pbnQucHJvdG90eXBlLmdldFRpbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGltZTtcbn07XG5cbi8qKlxuICog6I635Y+W5b2T5YmN5pe26Ze054K55omA5a+55bqU55qEIGBEYXRlYCDlrp7kvovvvIzmr4/mrKHosIPnlKjov5nkuKrmlrnms5Xpg73kvJrov5Tlm57kuIDkuKrmlrDnmoQgYERhdGVgIOWunuS+i+OAglxuICpcbiAqIEByZXR1cm5zIHtEYXRlfSDov5Tlm57lvZPliY3lrp7kvovmiYDlr7nlupTnmoQgYERhdGVgIOWunuS+i+OAglxuICovXG5UaW1lUG9pbnQucHJvdG90eXBlLmdldERhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMudGltZSk7XG59O1xuXG4vKipcbiAqIOiOt+WPluW9k+WJjeaXtumXtOeCueWvueW6lOaciOS7veS4reeahOacgOWQjuS4gOWkqeOAglxuICpcbiAqIEByZXR1cm5zIHtudW1iZXJ9IOi/lOWbnuW9k+WJjeaXtumXtOeCueWvueW6lOaciOS7veS4reeahOacgOWQjuS4gOWkqe+8jOWPr+iDveeahOWAvOaciSAyOOOAgTI544CBMzAg5oiWIDMx44CCXG4gKi9cblRpbWVQb2ludC5wcm90b3R5cGUubGFzdERheU9mVGhpc01vbnRoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBkYXRlID0gdGhpcy5nZXREYXRlKCk7XG4gICAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcblxuICAgIHJldHVybiBsYXN0RGF5T2ZUaGVNb250aCh5ZWFyLCBtb250aCk7XG59O1xuXG4vKipcbiAqIOiOt+WPluW9k+WJjeaciOS7veesrOS4gOWkqeWvueW6lOeahCBgVGltZVBvaW50YCDlr7nosaHjgIJcbiAqXG4gKiBAcmV0dXJucyB7VGltZVBvaW50fSDov5Tlm57lvZPliY3mnIjku73nrKzkuIDlpKnlr7nlupTnmoQgYFRpbWVQb2ludGAg5a+56LGh77yM5q+P5qyh6YO96L+U5Zue5LiA5Liq5paw55qE5a6e5L6L44CCXG4gKi9cblRpbWVQb2ludC5wcm90b3R5cGUuZ2V0Rmlyc3REYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRleHQgPSB0aGlzLmZvcm1hdCgnWVlZWS1NTS0wMSBoaDptbTpzcy5TU1MnKTtcblxuICAgIHJldHVybiBuZXcgVGltZVBvaW50KHRleHQpO1xufTtcblxuLyoqXG4gKiDojrflj5blvZPliY3mnIjku73mnIDlkI7kuIDlpKnlr7nlupTnmoQgYFRpbWVQb2ludGAg5a+56LGh44CCXG4gKlxuICogQHJldHVybnMge1RpbWVQb2ludH0g6L+U5Zue5b2T5YmN5pyI5Lu95pyA5ZCO5LiA5aSp5a+55bqU55qEIGBUaW1lUG9pbnRgIOWvueixoe+8jOavj+asoemDvei/lOWbnuS4gOS4quaWsOeahOWunuS+i+OAglxuICovXG5UaW1lUG9pbnQucHJvdG90eXBlLmdldExhc3REYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxhc3REYXkgPSB0aGlzLmxhc3REYXlPZlRoaXNNb250aCgpO1xuICAgIHZhciB0ZXh0ID0gdGhpcy5mb3JtYXQoJ1lZWVktTU0tJyArIGxhc3REYXkgKyAnIGhoOm1tOnNzLlNTUycpO1xuXG4gICAgcmV0dXJuIG5ldyBUaW1lUG9pbnQodGV4dCk7XG59O1xuXG4vKipcbiAqIOWFi+mahuW9k+WJjSBgVGltZVBvaW50YCDlr7nosaHjgIJcbiAqXG4gKiBAcmV0dXJucyB7VGltZVBvaW50fSDov5Tlm57kuIDkuKrmlrDnmoQgYFRpbWVQb2ludGAg5a6e5L6L44CCXG4gKi9cblRpbWVQb2ludC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lUG9pbnQodGhpcy5nZXRUaW1lKCkpO1xufTtcblxuLyoqXG4gKiDlhYvpmoblvZPliY0gYFRpbWVQb2ludGAg5a+56LGh77yMYGNsb25lYCDmlrnms5XnmoTliKvlkI3jgIJcbiAqXG4gKiBAcmV0dXJucyB7VGltZVBvaW50fSDov5Tlm57kuIDkuKrmlrDnmoQgYFRpbWVQb2ludGAg5a6e5L6L44CCXG4gKi9cblRpbWVQb2ludC5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVQb2ludCh0aGlzLmdldFRpbWUoKSk7XG59O1xuXG4vKipcbiAqIOenu+mZpOW9k+WJjeaXtumXtOeCueeahOavq+enkumDqOWIhu+8jOW5tui/lOWbnuS4gOS4quaWsOeahCBgVGltZVBvaW50YCDlrp7kvovjgIJcbiAqXG4gKiBAcmV0dXJucyB7VGltZVBvaW50fSDkuIDkuKrmlrDnmoQgYFRpbWVQb2ludGAg5a6e5L6L44CCXG4gKi9cblRpbWVQb2ludC5wcm90b3R5cGUuY2xlYXJNcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGF0ZSA9IHRoaXMuZ2V0RGF0ZSgpO1xuXG4gICAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoMCk7XG5cbiAgICByZXR1cm4gbmV3IFRpbWVQb2ludChkYXRlLmdldFRpbWUoKSk7XG59O1xuXG4vKipcbiAqIOa3u+WKoOavq+enkuaVsO+8jOW5tui/lOWbnuS4gOS4quaWsOeahCBgVGltZVBvaW50YCDlrp7kvovjgIJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbXMg6ZyA6KaB5re75Yqg55qE5q+r56eS5pWw77yM5Y+v5Lul5Li66LSf5pWw44CCXG4gKiBAcmV0dXJucyB7VGltZVBvaW50fSDov5Tlm57kuIDkuKrmlrDnmoQgYFRpbWVQb2ludGAg5a6e5L6L44CCXG4gKi9cblRpbWVQb2ludC5wcm90b3R5cGUuYWRkTXMgPSBmdW5jdGlvbiAobXMpIHtcbiAgICBtcyA9IHBhcnNlSW50KG1zLCAxMCk7XG4gICAgbXMgPSBpc05hTihtcykgPyAwIDogbXM7XG4gICAgcmV0dXJuIG5ldyBUaW1lUG9pbnQodGhpcy5nZXRUaW1lKCkgKyBtcyk7XG59O1xuXG4vKipcbiAqIOa3u+WKoOenkuaVsO+8jOW5tui/lOWbnuS4gOS4quaWsOeahCBgVGltZVBvaW50YCDlrp7kvovjgIJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2VjIOmcgOimgea3u+WKoOeahOenkuaVsO+8jOWPr+S7peS4uui0n+aVsOOAglxuICogQHJldHVybnMge1RpbWVQb2ludH0g6L+U5Zue5LiA5Liq5paw55qEIGBUaW1lUG9pbnRgIOWunuS+i+OAglxuICovXG5UaW1lUG9pbnQucHJvdG90eXBlLmFkZFNlYyA9IGZ1bmN0aW9uIChzZWMpIHtcbiAgICBzZWMgPSBwYXJzZUludChzZWMsIDEwKTtcbiAgICBzZWMgPSBpc05hTihzZWMpID8gMCA6IHNlYztcbiAgICByZXR1cm4gbmV3IFRpbWVQb2ludCh0aGlzLmdldFRpbWUoKSArIChzZWMgKiBTRUNPTkQpKTtcbn07XG5cbi8qKlxuICog5re75Yqg5YiG6ZKf5pWw77yM5bm26L+U5Zue5LiA5Liq5paw55qEIGBUaW1lUG9pbnRgIOWunuS+i+OAglxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaW4g6ZyA6KaB5re75Yqg55qE5YiG6ZKf5pWw77yM5Y+v5Lul5Li66LSf5pWw44CCXG4gKiBAcmV0dXJucyB7VGltZVBvaW50fSDov5Tlm57kuIDkuKrmlrDnmoQgYFRpbWVQb2ludGAg5a6e5L6L44CCXG4gKi9cblRpbWVQb2ludC5wcm90b3R5cGUuYWRkTWluID0gZnVuY3Rpb24gKG1pbikge1xuICAgIG1pbiA9IHBhcnNlSW50KG1pbiwgMTApO1xuICAgIG1pbiA9IGlzTmFOKG1pbikgPyAwIDogbWluO1xuICAgIHJldHVybiBuZXcgVGltZVBvaW50KHRoaXMuZ2V0VGltZSgpICsgKG1pbiAqIE1JTlVURSkpO1xufTtcblxuLyoqXG4gKiDmt7vliqDlsI/ml7bmlbDvvIzlubbov5Tlm57kuIDkuKrmlrDnmoQgYFRpbWVQb2ludGAg5a6e5L6L44CCXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGhvdXIg6ZyA6KaB5re75Yqg55qE5bCP5pe25pWw77yM5Y+v5Lul5Li66LSf5pWw44CCXG4gKiBAcmV0dXJucyB7VGltZVBvaW50fSDov5Tlm57kuIDkuKrmlrDnmoQgYFRpbWVQb2ludGAg5a6e5L6L44CCXG4gKi9cblRpbWVQb2ludC5wcm90b3R5cGUuYWRkSG91ciA9IGZ1bmN0aW9uIChob3VyKSB7XG4gICAgaG91ciA9IHBhcnNlSW50KGhvdXIsIDEwKTtcbiAgICBob3VyID0gaXNOYU4oaG91cikgPyAwIDogaG91cjtcbiAgICByZXR1cm4gbmV3IFRpbWVQb2ludCh0aGlzLmdldFRpbWUoKSArIChob3VyICogSE9VUikpO1xufTtcblxuLyoqXG4gKiDmt7vliqDlpKnmlbDvvIzlubbov5Tlm57kuIDkuKrmlrDnmoQgYFRpbWVQb2ludGAg5a6e5L6L44CCXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGRheSDpnIDopoHmt7vliqDnmoTlpKnmlbDvvIzlj6/ku6XkuLrotJ/mlbDjgIJcbiAqIEByZXR1cm5zIHtUaW1lUG9pbnR9IOi/lOWbnuS4gOS4quaWsOeahCBgVGltZVBvaW50YCDlrp7kvovjgIJcbiAqL1xuVGltZVBvaW50LnByb3RvdHlwZS5hZGREYXkgPSBmdW5jdGlvbiAoZGF5KSB7XG4gICAgZGF5ID0gcGFyc2VJbnQoZGF5LCAxMCk7XG4gICAgZGF5ID0gaXNOYU4oZGF5KSA/IDAgOiBkYXk7XG4gICAgcmV0dXJuIG5ldyBUaW1lUG9pbnQodGhpcy5nZXRUaW1lKCkgKyAoZGF5ICogREFZKSk7XG59O1xuXG4vKipcbiAqIOiOt+WPluS4i+S4gOWkqe+8jOW5tui/lOWbnuS4gOS4quaWsOeahCBgVGltZVBvaW50YCDlrp7kvovjgIJcbiAqXG4gKiBAcmV0dXJucyB7VGltZVBvaW50fSDov5Tlm57kuIDkuKrmlrDnmoQgYFRpbWVQb2ludGAg5a6e5L6L44CCXG4gKi9cblRpbWVQb2ludC5wcm90b3R5cGUubmV4dERheSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5hZGREYXkoMSk7XG59O1xuXG4vKipcbiAqIOiOt+WPluWJjeS4gOWkqe+8jOW5tui/lOWbnuS4gOS4quaWsOeahCBgVGltZVBvaW50YCDlrp7kvovjgIJcbiAqXG4gKiBAcmV0dXJucyB7VGltZVBvaW50fSDov5Tlm57kuIDkuKrmlrDnmoQgYFRpbWVQb2ludGAg5a6e5L6L44CCXG4gKi9cblRpbWVQb2ludC5wcm90b3R5cGUucHJldkRheSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5hZGREYXkoLTEpO1xufTtcblxuLyoqXG4gKiDmoLnmja7lvZPliY3ml7bpl7TngrnliJvlu7rmjIflrprml7bpl7TnmoQgYFRpbWVQb2ludGAg5a6e5L6L77yM5q2k5Ye95pWw5Lya6L+U5Zue5LiA5Liq5paw55qEIGBUaW1lUG9pbnRgIOWunuS+i+OAglxuICpcbiAqIOatpOWHveaVsOS8muS/neeVmeW9k+WJjeaXpeacn+eahOW5tOOAgeaciOOAgeaXpemDqOWIhu+8jOW5tuagueaNruS8oOWFpeeahOWAvOiuvue9ruaXtuOAgeWIhuOAgeenkuOAgeavq+enku+8jOayoeacieS8oOWFpeeahOmDqOWIhuS8muiiq+iuvue9ruS4uiAw44CCXG4gKlxuICogQGV4YW1wbGUgdGltZVBvaW50LmF0KCcxMjowMDowMC4wMDAnKVxuICogQHBhcmFtIHtzdHJpbmd9IHRpbWUg5oyH5a6a55qE5pe26Ze054K577yM6IyD5Zu05Li6IGAwMDowMDowMC4wMDBgIOWIsCBgMjM6NTk6NTkuOTk5YOOAglxuICogQHJldHVybnMge1RpbWVQb2ludH0g6L+U5Zue5LiA5Liq5paw55qEIGBUaW1lUG9pbnRgIOWunuS+i+OAglxuICovXG5UaW1lUG9pbnQucHJvdG90eXBlLmF0ID0gZnVuY3Rpb24gKHRpbWUpIHtcbiAgICB2YXIgZGF0ZSA9IHRoaXMuZ2V0RGF0ZSgpO1xuXG4gICAgZGF0ZS5zZXRIb3VycygwKTtcbiAgICBkYXRlLnNldE1pbnV0ZXMoMCk7XG4gICAgZGF0ZS5zZXRTZWNvbmRzKDApO1xuICAgIGRhdGUuc2V0TWlsbGlzZWNvbmRzKDApO1xuXG4gICAgdGltZSA9ICgnJyArICh0aW1lIHx8IDApKTtcbiAgICB0aW1lID0gdGltZS5yZXBsYWNlKC9bXFwuXFw6XS9nLCAnICcpO1xuICAgIHRpbWUgPSB0cmltKHRpbWUpO1xuICAgIHRpbWUgPSB0aW1lLnNwbGl0KC9cXHMrLyk7XG5cbiAgICB2YXIgaG91ciA9IHBhcnNlSW50KHRpbWVbMF0sIDEwKTtcbiAgICB2YXIgbWludXRlID0gcGFyc2VJbnQodGltZVsxXSwgMTApO1xuICAgIHZhciBzZWNvbmQgPSBwYXJzZUludCh0aW1lWzJdLCAxMCk7XG4gICAgdmFyIG1zID0gcGFyc2VNcyh0aW1lWzNdKTtcblxuICAgIGlmICghaXNOYU4oaG91cikpIHtcbiAgICAgICAgZGF0ZS5zZXRIb3Vycyhob3VyKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzTmFOKG1pbnV0ZSkpIHtcbiAgICAgICAgZGF0ZS5zZXRNaW51dGVzKG1pbnV0ZSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc05hTihzZWNvbmQpKSB7XG4gICAgICAgIGRhdGUuc2V0U2Vjb25kcyhzZWNvbmQpO1xuICAgIH1cblxuICAgIGlmICghaXNOYU4obXMpKSB7XG4gICAgICAgIGRhdGUuc2V0TWlsbGlzZWNvbmRzKG1zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFRpbWVQb2ludChkYXRlLmdldFRpbWUoKSk7XG59O1xuXG4vKipcbiAqIGBmb3JtYXRgIOaWueazleeahOWIq+WQjeOAguWmguaenOWPguaVsOexu+Wei+S4jeaYr+Wtl+espuS4su+8jOWImeS9v+eUqOm7mOiupOWPguaVsCBgWVlZWS1NTS1ERCBoaDptbTpzc2DjgIJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gW2Zvcm1hdD0nWVlZWS1NTS1ERCBoaDptbTpzcyddIOWPr+mAieeahOaXtumXtOaooeadv+Wtl+espuS4su+8jOm7mOiupOWAvOS4uiBgWVlZWS1NTS1ERCBoaDptbTpzc2DjgIJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IOi/lOWbnuagvOW8j+WMluWQjueahOaXpeacn+aWh+acrOOAglxuICovXG5UaW1lUG9pbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIHJldHVybiB0aGlzLmZvcm1hdChmb3JtYXQpO1xufTtcblxuLyoqXG4gKiDkvb/nlKjmqKHmnb/lvJXmk47moLzlvI/ljJbml6XmnJ/lrZfnrKbkuLLvvIzlpoLmnpzlj4LmlbDnsbvlnovkuI3mmK/lrZfnrKbkuLLvvIzliJnkvb/nlKjpu5jorqTlj4LmlbAgYHtZWVlZfS17TU19LXtERH0ge2hofTp7bW19Ontzc31g44CCXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IFt0ZW1wbGF0ZT0ne1lZWVl9LXtNTX0te0REfSB7aGh9OnttbX06e3NzfSddIOWPr+mAieeahOaXtumXtOaooeadv+Wtl+espuS4su+8jOm7mOiupOWAvOS4uiBge1lZWVl9LXtNTX0te0REfSB7aGh9OnttbX06e3NzfWDjgIJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IOi/lOWbnuagvOW8j+WMluWQjueahOaXpeacn+aWh+acrOOAglxuICovXG5UaW1lUG9pbnQucHJvdG90eXBlLnRlbXBsYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlKSB7XG4gICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGVtcGxhdGUgPSAne1lZWVl9LXtNTX0te0REfSB7aGh9OnttbX06e3NzfSc7XG4gICAgfVxuICAgIHJldHVybiB0cGwodGVtcGxhdGUsIHRoaXMubWFwKCkpO1xufTtcblxuLyoqXG4gKiDojrflj5bkuIrkuKrmnIggMSDlj7fnmoTml7bpl7TngrnjgIJcbiAqXG4gKiBAcmV0dXJucyB7VGltZVBvaW50fSDov5Tlm57kuIrkuKrmnIggMSDlj7fnmoTml7bpl7TngrlcbiAqL1xuVGltZVBvaW50LnByb3RvdHlwZS5wcmV2TW9udGggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZpcnN0RGF5ID0gdGhpcy5nZXRGaXJzdERheSgpO1xuICAgIHZhciB0aW1lID0gZmlyc3REYXkuZ2V0VGltZSgpIC0gODY0MDAwMDA7XG5cbiAgICByZXR1cm4gbmV3IFRpbWVQb2ludCh0aW1lKS5nZXRGaXJzdERheSgpO1xufTtcblxuLyoqXG4gKiDojrflj5bkuIvkuKrmnIggMSDlj7fnmoTml7bpl7TngrnjgIJcbiAqXG4gKiBAcmV0dXJucyB7VGltZVBvaW50fSDov5Tlm57kuIvkuKrmnIggMSDlj7fnmoTml7bpl7TngrlcbiAqL1xuVGltZVBvaW50LnByb3RvdHlwZS5uZXh0TW9udGggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxhc3REYXkgPSB0aGlzLmdldExhc3REYXkoKTtcbiAgICB2YXIgdGltZSA9IGxhc3REYXkuZ2V0VGltZSgpICsgODY0MDAwMDA7XG5cbiAgICByZXR1cm4gbmV3IFRpbWVQb2ludCh0aW1lKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGltZVBvaW50O1xuIiwidmFyIFRpbWVQb2ludCA9IHJlcXVpcmUoJy4uL1RpbWVQb2ludCcpO1xuXG4vKipcbiAqIOiOt+WPluS7iuWkqeeahOafkOS4quaXtumXtOeCueWvueW6lOeahCBgVGltZVBvaW50YCDlrp7kvovjgIJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGltZSDmjIflrprnmoTml7bpl7TngrnvvIzojIPlm7TkuLogYDAwOjAwOjAwLjAwMGAg5YiwIGAyMzo1OTo1OS45OTlg44CCXG4gKiBAcmV0dXJucyB7VGltZVBvaW50fSDov5Tlm57kuIDkuKogYFRpbWVQb2ludGAg5a6e5L6L44CCXG4gKi9cbmZ1bmN0aW9uIGF0KHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVQb2ludCgpLmF0KHRpbWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGF0O1xuIiwidmFyIFRpbWVQb2ludCA9IHJlcXVpcmUoJy4uL1RpbWVQb2ludCcpO1xuXG4vKipcbiAqIOiOt+WPluS4pOS4quaXtumXtOS5i+mXtOeahOavq+enkuW3ru+8iHQyIC0gdDHvvIlcbiAqXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8RGF0ZXxUaW1lUG9pbnR9IHQxIOaXtumXtOeCuSAxXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8RGF0ZXxUaW1lUG9pbnR9IHQyIOaXtumXtOeCuSAyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSDov5Tlm57kuKTkuKrml7bpl7TngrnkuYvpl7TnmoTmr6vnp5Llt65cbiAqL1xuZnVuY3Rpb24gZGlmZih0MSwgdDIpIHtcbiAgICB2YXIgYSA9IG5ldyBUaW1lUG9pbnQodDEpO1xuICAgIHZhciBiID0gbmV3IFRpbWVQb2ludCh0Mik7XG5cbiAgICByZXR1cm4gYi5nZXRUaW1lKCkgLSBhLmdldFRpbWUoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmO1xuIiwidmFyIFRpbWVQb2ludCA9IHJlcXVpcmUoJy4uL1RpbWVQb2ludCcpO1xudmFyIGRpZmYgPSByZXF1aXJlKCcuL2RpZmYnKTtcblxuLyoqXG4gKiDojrflj5bkuKTkuKrml7bpl7TkuYvpl7TnmoTlpKnmlbDmlbDlt67vvIh0MiAtIHQx77yJ77yM5rOo5oSP6L+Z5Liq5Ye95pWw55qE6L+U5Zue5YC85Y+v6IO95piv5bCP5pWw77yI5aaCIDEuNe+8ie+8jOWmguaenOW4jOacm+i/lOWbnueahOWkqeaVsOS4uuaVtOaVsO+8jOivt+S9v+eUqFxuICogYHRpbWVwb2ludC5kaWZmRGF5V2l0aG91dFRpbWUodDEsIHQyKWBcbiAqXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8RGF0ZXxUaW1lUG9pbnR9IHQxIOaXtumXtOeCuSAxXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8RGF0ZXxUaW1lUG9pbnR9IHQyIOaXtumXtOeCuSAyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSDov5Tlm57kuKTkuKrml7bpl7TngrnkuYvpl7TnmoTlpKnmlbDmlbDlt65cbiAqL1xuZnVuY3Rpb24gZGlmZkRheSh0MSwgdDIpIHtcbiAgICByZXR1cm4gZGlmZih0MSwgdDIpIC8gODY0MDAwMDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZkRheTtcbiIsInZhciBUaW1lUG9pbnQgPSByZXF1aXJlKCcuLi9UaW1lUG9pbnQnKTtcblxuLyoqXG4gKiDojrflj5bkuKTkuKrml7bpl7TkuYvpl7TnmoTlpKnmlbDlt67vvIzmraTlh73mlbDlj6rkvJrlr7nmr5Tml6XmnJ/pg6jliIbvvIjlv73nlaXml7bpl7TvvInvvIzmiYDku6Xov5Tlm57nmoTmmK/kuIDkuKrmlbTmlbBcbiAqXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8RGF0ZXxUaW1lUG9pbnR9IHQxIOaXtumXtOeCuSAxXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8RGF0ZXxUaW1lUG9pbnR9IHQyIOaXtumXtOeCuSAyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSDov5Tlm57kuKTkuKrml7bpl7Tngrnpl7TpmpTnmoTlpKnmlbDvvIjmlbTmlbDvvIlcbiAqL1xuZnVuY3Rpb24gZGlmZkRheVdpdGhvdXRUaW1lKHQxLCB0Mikge1xuICAgIHZhciBhID0gbmV3IFRpbWVQb2ludCh0MSk7XG4gICAgdmFyIGIgPSBuZXcgVGltZVBvaW50KHQyKTtcblxuICAgIGEgPSBhLmF0KCcxMjowMDowMC4wMDAnKTtcbiAgICBiID0gYi5hdCgnMTI6MDA6MDAuMDAwJyk7XG5cbiAgICByZXR1cm4gKGIuZ2V0VGltZSgpIC0gYS5nZXRUaW1lKCkpIC8gODY0MDAwMDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZkRheVdpdGhvdXRUaW1lO1xuIiwidmFyIFRpbWVQb2ludCA9IHJlcXVpcmUoJy4uL1RpbWVQb2ludCcpO1xudmFyIGRpZmYgPSByZXF1aXJlKCcuL2RpZmYnKTtcblxuLyoqXG4gKiDojrflj5bkuKTkuKrml7bpl7TkuYvpl7TnmoTlsI/ml7bmlbDlt67vvIh0MiAtIHQx77yJXG4gKlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfERhdGV8VGltZVBvaW50fSB0MSDml7bpl7TngrkgMVxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfERhdGV8VGltZVBvaW50fSB0MiDml7bpl7TngrkgMlxuICogQHJldHVybnMge251bWJlcn0g6L+U5Zue5Lik5Liq5pe26Ze054K55LmL6Ze055qE5bCP5pe25pWw5beuXG4gKi9cbmZ1bmN0aW9uIGRpZmZIb3VyKHQxLCB0Mikge1xuICAgIHJldHVybiBkaWZmKHQxLCB0MikgLyAzNjAwMDAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZIb3VyO1xuIiwidmFyIFRpbWVQb2ludCA9IHJlcXVpcmUoJy4uL1RpbWVQb2ludCcpO1xudmFyIGRpZmYgPSByZXF1aXJlKCcuL2RpZmYnKTtcblxuLyoqXG4gKiDojrflj5bkuKTkuKrml7bpl7TkuYvpl7TnmoTliIbpkp/mlbDlt67vvIh0MiAtIHQx77yJXG4gKlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfERhdGV8VGltZVBvaW50fSB0MSDml7bpl7TngrkgMVxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfERhdGV8VGltZVBvaW50fSB0MiDml7bpl7TngrkgMlxuICogQHJldHVybnMge251bWJlcn0g6L+U5Zue5Lik5Liq5pe26Ze054K55LmL6Ze055qE5YiG6ZKf5pWw5beuXG4gKi9cbmZ1bmN0aW9uIGRpZmZNaW51dGUodDEsIHQyKSB7XG4gICAgcmV0dXJuIGRpZmYodDEsIHQyKSAvIDYwMDAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZNaW51dGU7XG4iLCJ2YXIgVGltZVBvaW50ID0gcmVxdWlyZSgnLi4vVGltZVBvaW50Jyk7XG52YXIgZGlmZiA9IHJlcXVpcmUoJy4vZGlmZicpO1xuXG4vKipcbiAqIOiOt+WPluS4pOS4quaXtumXtOS5i+mXtOeahOenkuaVsOW3ru+8iHQyIC0gdDHvvIlcbiAqXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8RGF0ZXxUaW1lUG9pbnR9IHQxIOaXtumXtOeCuSAxXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8RGF0ZXxUaW1lUG9pbnR9IHQyIOaXtumXtOeCuSAyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSDov5Tlm57kuKTkuKrml7bpl7TngrnkuYvpl7TnmoTnp5LmlbDlt65cbiAqL1xuZnVuY3Rpb24gZGlmZlNlYyh0MSwgdDIpIHtcbiAgICByZXR1cm4gZGlmZih0MSwgdDIpIC8gMTAwMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmU2VjO1xuIiwidmFyIFRpbWVQb2ludCA9IHJlcXVpcmUoJy4uL1RpbWVQb2ludCcpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xudmFyIGRpZmYgPSByZXF1aXJlKCcuL2RpZmYnKTtcblxuLyoqXG4gKiDojrflj5bkuKTkuKrml6XmnJ/kuYvpl7TnmoTml6XmnJ/liJfooahcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gcmV0dXJucyBbXCIyMDE4LTEwLTIxXCIsIFwiMjAxOC0xMC0yMlwiLCBcIjIwMTgtMTAtMjNcIl1cbiAqIFRpbWVQb2ludC5nZXREYXRlTGlzdCgnMjAxOC0xMC0yMScsICcyMDE4LTEwLTIzJylcbiAqXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8RGF0ZXxUaW1lUG9pbnR9IHN0YXJ0XG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8RGF0ZXxUaW1lUG9pbnR9IGVuZFxuICogQHJldHVybnMge1RpbWVQb2ludFtdfSDov5Tlm57kuIDkuKrml6XmnJ/lrZfnrKbkuLLmlbDnu4RcbiAqL1xuZnVuY3Rpb24gZ2V0RGF0ZUxpc3Qoc3RhcnQsIGVuZCkge1xuICAgIHZhciB0MSA9IHBhcnNlKHN0YXJ0KS5hdCgnMTI6MDA6MDAuMDAwJyk7XG4gICAgdmFyIHQyID0gcGFyc2UoZW5kKS5hdCgnMTI6MDA6MDAuMDAwJyk7XG4gICAgdmFyIGQgPSBkaWZmKHQxLCB0Mik7XG4gICAgdmFyIGRhdGVMaXN0ID0gW107XG4gICAgdmFyIHRleHQ7XG4gICAgdmFyIGRhdGU7XG4gICAgdmFyIGxhc3REYXRlO1xuXG4gICAgaWYgKGQgPiAwKSB7XG4gICAgICAgIGRhdGUgPSB0MTtcbiAgICAgICAgbGFzdERhdGUgPSB0Mi5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgZGF0ZUxpc3QucHVzaChkYXRlKTtcbiAgICAgICAgICAgIHRleHQgPSBkYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgICAgICAgICAgZGF0ZSA9IGRhdGUubmV4dERheSgpO1xuICAgICAgICB9IHdoaWxlICh0ZXh0ICE9PSBsYXN0RGF0ZSk7XG4gICAgfSBlbHNlIGlmIChkID09PSAwKSB7XG4gICAgICAgIGRhdGVMaXN0LnB1c2godDEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRlTGlzdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXREYXRlTGlzdDtcbiIsInZhciBUaW1lUG9pbnQgPSByZXF1aXJlKCcuLi9UaW1lUG9pbnQnKTtcbnZhciBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKTtcbnZhciBkaWZmID0gcmVxdWlyZSgnLi9kaWZmJyk7XG5cbi8qKlxuICog6I635Y+W5Lik5Liq5pel5pyf5LmL6Ze055qE5pyI5Lu95YiX6KGoXG4gKlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfERhdGV8VGltZVBvaW50fSBzdGFydFxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfERhdGV8VGltZVBvaW50fSBlbmRcbiAqIEByZXR1cm5zIHtUaW1lUG9pbnRbXX0g6L+U5Zue5LiA5Liq5pel5pyf5a2X56ym5Liy5pWw57uEXG4gKi9cbmZ1bmN0aW9uIGdldE1vbnRoTGlzdChzdGFydCwgZW5kKSB7XG4gICAgdmFyIHQxID0gcGFyc2Uoc3RhcnQpLmF0KCcxMjowMDowMC4wMDAnKS5nZXRGaXJzdERheSgpO1xuICAgIHZhciB0MiA9IHBhcnNlKGVuZCkuYXQoJzEyOjAwOjAwLjAwMCcpLmdldEZpcnN0RGF5KCk7XG4gICAgdmFyIGQgPSBkaWZmKHQxLCB0Mik7XG4gICAgdmFyIG1vbnRoTGlzdCA9IFtdO1xuICAgIHZhciB0ZXh0O1xuICAgIHZhciBtb250aDtcbiAgICB2YXIgbGFzdE1vbnRoO1xuXG4gICAgaWYgKGQgPiAwKSB7XG4gICAgICAgIG1vbnRoID0gdDE7XG4gICAgICAgIGxhc3RNb250aCA9IHQyLmZvcm1hdCgnWVlZWS1NTScpO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBtb250aExpc3QucHVzaChtb250aCk7XG4gICAgICAgICAgICB0ZXh0ID0gbW9udGguZm9ybWF0KCdZWVlZLU1NJyk7XG4gICAgICAgICAgICBtb250aCA9IG1vbnRoLm5leHRNb250aCgpO1xuICAgICAgICB9IHdoaWxlICh0ZXh0ICE9PSBsYXN0TW9udGgpO1xuICAgIH0gZWxzZSBpZiAoZCA9PT0gMCkge1xuICAgICAgICBtb250aExpc3QucHVzaCh0MSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vbnRoTGlzdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRNb250aExpc3Q7XG4iLCIvKipcbiAqIOajgOafpeaMh+WumuW5tOS7veaYr+S4jeaYr+mXsOW5tFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyIOW5tOS7vVxuICogQHJldHVybnMge2Jvb2xlYW59IOWmguaenOaYr+mXsOW5tOWImei/lOWbniB0cnVl77yM5ZCm5YiZ6L+U5ZueIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVhcFllYXIoeWVhcikge1xuICAgIHllYXIgPSBwYXJzZUludCh5ZWFyLCAxMCk7XG4gICAgeWVhciA9IGlzTmFOKHllYXIpID8gMCA6IHllYXI7XG5cbiAgICBpZiAoeWVhciAlIDEwMCA9PT0gMCkge1xuICAgICAgICByZXR1cm4geWVhciAlIDQwMCA9PT0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4geWVhciAlIDQgPT09IDA7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGVhcFllYXI7XG4iLCJ2YXIgaXNMZWFwWWVhciA9IHJlcXVpcmUoJy4vaXNMZWFwWWVhcicpO1xudmFyIGxhc3REYXlNYXAgPSBbMzEsIDAsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXTtcblxuLyoqXG4gKiDmn6Xor6LmjIflrprmnIjku73nmoTmnIDlkI7kuIDlpKnjgIJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0geWVhciDooajnpLrlubTku73nmoTmlbTmlbDjgIJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtb250aCDooajnpLrmnIjku73nmoTmlbTmlbDvvIzojIPlm7TkuLogMSDliLAgMTLjgIJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IOi/lOWbnuaMh+WumuaciOS7veeahOacgOWQjuS4gOWkqe+8jOWPr+iDveeahOWAvOaciSAyOOOAgTI544CBMzDjgIEzMeOAglxuICovXG5mdW5jdGlvbiBsYXN0RGF5T2ZUaGVNb250aCh5ZWFyLCBtb250aCkge1xuICAgIHllYXIgPSBwYXJzZUludCh5ZWFyLCAxMCk7XG4gICAgeWVhciA9IGlzTmFOKHllYXIpID8gMCA6IHllYXI7XG5cbiAgICBtb250aCA9IHBhcnNlSW50KG1vbnRoLCAxMCk7XG4gICAgbW9udGggPSBpc05hTihtb250aCkgPyAwIDogKG1vbnRoIC0gMSk7XG5cbiAgICBpZiAobW9udGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsYXN0RGF5TWFwW21vbnRoXTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGFzdERheU9mVGhlTW9udGg7XG4iLCIvKipcbiAqIOiOt+WPluezu+e7n+W9k+WJjeaXtumXtOOAglxuICpcbiAqIEByZXR1cm5zIHtudW1iZXJ9IOi/lOWbnuezu+e7n+W9k+WJjeaXtumXtOOAglxuICovXG5mdW5jdGlvbiBub3coKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vdztcbiIsInZhciBUaW1lUG9pbnQgPSByZXF1aXJlKCcuLi9UaW1lUG9pbnQnKTtcblxuLyoqXG4gKiDop6PmnpDml7bpl7TvvIzlubbnlKjmraTml7bpl7TliJvlu7rkuIDkuKogYFRpbWVQb2ludGAg5a6e5L6L44CCXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfERhdGV8VGltZVBvaW50fSBbdGltZV0g5Y+v6YCJ55qE5pe26Ze077yM5aaC5p6c5pyq5oyH5a6a77yM6buY6K6k5Li657O757uf5b2T5YmN5pe26Ze044CCXG4gKiBAcmV0dXJucyB7VGltZVBvaW50fSDov5Tlm57kuIDkuKogYFRpbWVQb2ludGAg5a6e5L6L44CCXG4gKi9cbmZ1bmN0aW9uIHBhcnNlKHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVQb2ludCh0aW1lKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZTtcbiIsIi8qKlxuICog6Kej5p6Q5q+r56eS5a2X56ym5LiyXG4gKlxuICogMS4gJzEnID0+IDEwMFxuICogMi4gJzEwJyA9PiAxMDBcbiAqIDMuICcwMScgPT4gMTBcbiAqIDQuICcwMDEnID0+IDFcbiAqIDUuICcwMDAxJyA9PiAwXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1zXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBwYXJzZU1zKG1zKSB7XG4gICAgaWYgKHR5cGVvZiBtcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgd2hpbGUgKG1zLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgIG1zICs9ICcwJztcbiAgICAgICAgfVxuICAgICAgICBtcyA9IG1zLnN1YnN0cigwLCAzKTtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KG1zLCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlTXM7XG4iLCJ2YXIgbm93ID0gcmVxdWlyZSgnLi9ub3cnKTtcbnZhciB0cmltID0gcmVxdWlyZSgnLi90cmltJyk7XG52YXIgcGFyc2VNcyA9IHJlcXVpcmUoJy4vcGFyc2VNcycpO1xudmFyIFRpbWVQb2ludCA9IHJlcXVpcmUoJy4uL1RpbWVQb2ludCcpO1xuXG4vKipcbiAqIOino+aekOaXtumXtO+8jOi/lOWbnuaXtumXtOeahOaVsOWtl+ihqOekuuW9ouW8j+OAglxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxEYXRlfFRpbWVQb2ludH0gW3RpbWVdIOmcgOimgeino+aekOeahOaXtumXtO+8jOWmguaenOacquaMh+Wumu+8jOm7mOiupOS4uuezu+e7n+W9k+WJjeaXtumXtOOAglxuICogQHJldHVybnMge251bWJlcn0g6L+U5Zue6Kej5p6Q5ZCO55qE5pe26Ze055qE5pWw5a2X6KGo56S677yI5q+r56eS5pWw77yJ44CCXG4gKi9cbmZ1bmN0aW9uIHBhcnNlVGltZSh0aW1lKSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2YgdGltZTtcblxuICAgIC8vIOajgOafpeaYr+S4jeaYr+aXpeacn+Wtl+espuS4slxuICAgIC8vIDEuICcxNTM4MzY2NDAwMDAwJ1xuICAgIC8vIDIuICcyMDE4LTEwLTAxIDEyOjAwOjAwJyDmiJYgJzIwMTgtMTAtMSAxMjowOjAnXG4gICAgLy8gMy4gJzIwMTgvMTAvMDEgMTI6MDA6MDAnIOaIliAnMjAxOC8xMC8xIDEyOjA6MCdcbiAgICAvLyA0LiAnMjAxOC0xMC0wMScg5oiWICcyMDE4LzEwLzAxJ1xuICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgbnVtID0gMDtcbiAgICAgICAgdmFyIGlzTnVtYmVyU3RyaW5nID0gZmFsc2U7XG5cbiAgICAgICAgLy8g56e76Zmk6aaW5bC+56m655m95a2X56ymXG4gICAgICAgIHRpbWUgPSB0cmltKHRpbWUpO1xuXG4gICAgICAgIC8vIOajgOafpeaYr+S4jeaYr+aVsOWtl+Wtl+espuS4su+8jOavlOWmgu+8micxNTM4MzY2NDAwMDAwJ1xuICAgICAgICBpZiAoL15bMC05XSskLy50ZXN0KHRpbWUpKSB7XG4gICAgICAgICAgICBudW0gPSBwYXJzZUludCh0aW1lLCAxMCk7XG4gICAgICAgICAgICBpc051bWJlclN0cmluZyA9ICFpc05hTihudW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTnVtYmVyU3RyaW5nKSB7XG4gICAgICAgICAgICB0aW1lID0gbnVtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGltZSA9IHRpbWUucmVwbGFjZSgvW1R0XFwtXFw6XFwuXFwvXS9nLCAnICcpO1xuICAgICAgICAgICAgdGltZSA9IHRyaW0odGltZSk7XG4gICAgICAgICAgICB0aW1lID0gdGltZS5zcGxpdCgvXFxzKy8pO1xuXG4gICAgICAgICAgICB2YXIgeWVhciA9IHBhcnNlSW50KHRpbWVbMF0sIDEwKTtcbiAgICAgICAgICAgIHZhciBtb250aCA9IHBhcnNlSW50KHRpbWVbMV0sIDEwKTtcbiAgICAgICAgICAgIHZhciBkYXkgPSBwYXJzZUludCh0aW1lWzJdLCAxMCk7XG4gICAgICAgICAgICB2YXIgaG91ciA9IHBhcnNlSW50KHRpbWVbM10sIDEwKTtcbiAgICAgICAgICAgIHZhciBtaW51dGUgPSBwYXJzZUludCh0aW1lWzRdLCAxMCk7XG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gcGFyc2VJbnQodGltZVs1XSwgMTApO1xuICAgICAgICAgICAgdmFyIG1zID0gcGFyc2VNcyh0aW1lWzZdKTtcblxuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgwKTtcblxuICAgICAgICAgICAgaWYgKCFpc05hTih5ZWFyKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0RnVsbFllYXIoeWVhcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXNOYU4obW9udGgpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRNb250aChtb250aCAtIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWlzTmFOKGRheSkpIHtcbiAgICAgICAgICAgICAgICBkYXRlLnNldERhdGUoZGF5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpc05hTihob3VyKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0SG91cnMoaG91cik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXNOYU4obWludXRlKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0TWludXRlcyhtaW51dGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWlzTmFOKHNlY29uZCkpIHtcbiAgICAgICAgICAgICAgICBkYXRlLnNldFNlY29uZHMoc2Vjb25kKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpc05hTihtcykpIHtcbiAgICAgICAgICAgICAgICBkYXRlLnNldE1pbGxpc2Vjb25kcyhtcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRpbWUgPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgfVxuICAgIC8vIOWmguaenOexu+Wei+S4uuaVsOWtl+WImeS7gOS5iOmDveS4jeWBmlxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgLy8g5LuA5LmI6YO95LiN5YGaXG4gICAgLy8g5qOA5p+l5piv5LiN5pivIERhdGUg5a+56LGhXG4gICAgfSBlbHNlIGlmICh0aW1lIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGltZSA9IHRpbWUuZ2V0VGltZSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aW1lID0gMDtcbiAgICAgICAgfVxuICAgIC8vIOajgOafpeaYr+S4jeaYryBUaW1lUG9pbnQg5a+56LGhXG4gICAgfSBlbHNlIGlmICh0aW1lICYmIHR5cGVvZiB0aW1lLnRpbWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHRpbWUgPSB0aW1lLnRpbWU7XG4gICAgLy8g5aaC5p6c5Lul5LiK6YO95LiN5piv5YiZ6L+U5Zue5b2T5YmN5pe26Ze0XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGltZSA9IG5vdygpO1xuICAgIH1cblxuICAgIHJldHVybiBpc05hTih0aW1lKSA/IG5vdygpIDogdGltZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVRpbWU7XG4iLCJ2YXIgdHBsID0gcmVxdWlyZSgnLi90cGwnKTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0LjxzdHJpbmcsICo+fSBUaW1lRGlmZkRldGFpbHNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkIOaXtumXtOW3ruS4reeahOWkqeaVsFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGgg5pe26Ze05beu5Lit55qE5bCP5pe25pWwXG4gKiBAcHJvcGVydHkge251bWJlcn0gbSDml7bpl7Tlt67kuK3nmoTliIbpkp/mlbBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzIOaXtumXtOW3ruS4reeahOenkuaVsFxuICogQHByb3BlcnR5IHtudW1iZXJ9IFMg5pe26Ze05beu5Lit55qE5q+r56eS5pWwXG4gKiBAcHJvcGVydHkge251bWJlcn0gbiDml7bpl7Tlt67nmoTnrKblj7fvvIxgMWAg5Luj6KGo5pW05pWw77yMYC0xYCDku6PooajotJ/mlbBcbiAqIEBwcm9wZXJ0eSB7KHRlbXBsYXRlOiBzdHJpbmcpID0+IHN0cmluZ30gZm9ybWF0IOS4gOS4queUqOS6juagvOW8j+WMluW9k+WJjeaXtumXtOW3ruivpue7huS/oeaBr+eahOWHveaVsFxuICovXG5cbi8qKlxuICog6Kej5p6Q5pe26Ze05beuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGRpZmYg5LqL6Ze05beu77yI5q+r56eS77yJXG4gKiBAcmV0dXJucyB7VGltZURpZmZEZXRhaWxzfSDov5Tlm57ml7bpl7Tlt67or6bnu4bkv6Hmga9cbiAqL1xuZnVuY3Rpb24gcGFyc2VUaW1lRGlmZihkaWZmKSB7XG4gICAgZGlmZiA9IHBhcnNlSW50KGRpZmYsIDEwKTtcbiAgICBkaWZmID0gaXNOYU4oZGlmZikgPyAwIDogZGlmZjtcblxuICAgIHZhciBzaWduID0gMDtcblxuICAgIGlmIChkaWZmID4gMCkge1xuICAgICAgICBzaWduID0gMTtcbiAgICB9IGVsc2UgaWYgKGRpZmYgPCAwKSB7XG4gICAgICAgIHNpZ24gPSAtMTtcbiAgICAgICAgZGlmZiA9IC1kaWZmO1xuICAgIH1cblxuICAgIHZhciBkYXkgPSBNYXRoLmZsb29yKGRpZmYgLyBEQVkpO1xuXG4gICAgZGlmZiA9IGRpZmYgLSBkYXkgKiBEQVk7XG5cbiAgICB2YXIgaG91ciA9IE1hdGguZmxvb3IoZGlmZiAvIEhPVVIpO1xuXG4gICAgZGlmZiA9IGRpZmYgLSBob3VyICogSE9VUjtcblxuICAgIHZhciBtaW4gPSBNYXRoLmZsb29yKGRpZmYgLyBNSU5VVEUpO1xuXG4gICAgZGlmZiA9IGRpZmYgLSBtaW4gKiBNSU5VVEU7XG5cbiAgICB2YXIgc2VjID0gTWF0aC5mbG9vcihkaWZmIC8gU0VDT05EKTtcblxuICAgIGRpZmYgPSBkaWZmIC0gc2VjICogU0VDT05EO1xuXG4gICAgdmFyIG1zID0gZGlmZjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGQ6IGRheSxcbiAgICAgICAgaDogaG91cixcbiAgICAgICAgbTogbWluLFxuICAgICAgICBzOiBzZWMsXG4gICAgICAgIFM6IG1zLFxuICAgICAgICBuOiBzaWduLFxuICAgICAgICAvKipcbiAgICAgICAgICog5qC85byP5YyWXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZW1wbGF0ZSDmqKHmnb/lrZfnrKbkuLJcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKHRlbXBsYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHBsKHRlbXBsYXRlLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2VUaW1lRGlmZjtcbiIsInZhciBkaWZmID0gcmVxdWlyZSgnLi9kaWZmJyk7XG52YXIgcGFyc2VUaW1lRGlmZiA9IHJlcXVpcmUoJy4vcGFyc2VUaW1lRGlmZicpO1xuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0LjxzdHJpbmcsICo+fSBUaW1lRGlmZkRldGFpbHNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkIOaXtumXtOW3ruS4reeahOWkqeaVsFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGgg5pe26Ze05beu5Lit55qE5bCP5pe25pWwXG4gKiBAcHJvcGVydHkge251bWJlcn0gbSDml7bpl7Tlt67kuK3nmoTliIbpkp/mlbBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzIOaXtumXtOW3ruS4reeahOenkuaVsFxuICogQHByb3BlcnR5IHtudW1iZXJ9IFMg5pe26Ze05beu5Lit55qE5q+r56eS5pWwXG4gKiBAcHJvcGVydHkge251bWJlcn0gbiDml7bpl7Tlt67nmoTnrKblj7fvvIxgMWAg5Luj6KGo5pW05pWw77yMYC0xYCDku6PooajotJ/mlbBcbiAqIEBwcm9wZXJ0eSB7KHRlbXBsYXRlOiBzdHJpbmcpID0+IHN0cmluZ30gZm9ybWF0IOS4gOS4queUqOS6juagvOW8j+WMluW9k+WJjeaXtumXtOW3ruivpue7huS/oeaBr+eahOWHveaVsFxuICovXG5cbi8qKlxuICog6I635Y+W5pe26Ze05beu55qE6K+m57uG5L+h5oGvXG4gKlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfERhdGV8VGltZVBvaW50fSB0MSDml7bpl7TngrkgMVxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfERhdGV8VGltZVBvaW50fSB0MiDml7bpl7TngrkgMlxuICogQHJldHVybnMge1RpbWVEaWZmRGV0YWlsc30g6L+U5Zue5pe26Ze05beu5LmL6Ze055qE6K+m57uG5L+h5oGvXG4gKi9cbmZ1bmN0aW9uIHRpbWVEaWZmRGV0YWlscyh0MSwgdDIpIHtcbiAgICByZXR1cm4gcGFyc2VUaW1lRGlmZihkaWZmKHQxLCB0MikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRpbWVEaWZmRGV0YWlscztcbiIsIi8qKlxuICog5qih5p2/5Ye95pWw44CCXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJldHVybnMgXCJIZWxsbywgSm9obiFcIlxuICogdHBsKCdIZWxsbywge3VzZXJuYW1lfSEnLCB7IHVzZXJuYW1lOiAnSm9obicgfSk7XG4gKiBAcGFyYW0ge3N0cmluZ30gdGVtcGxhdGUg5qih5p2/5a2X56ym5Liy44CCXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCAqPn0gZGF0YSDmlbDmja7lr7nosaHjgIJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IOi/lOWbnue8luivkeS5i+WQjueahOaWh+acrOOAglxuICovXG5mdW5jdGlvbiB0cGwodGVtcGxhdGUsIGRhdGEpIHtcbiAgICB2YXIgc3RyID0gW107XG4gICAgdmFyIHJlcyA9IG51bGw7XG4gICAgdmFyIHJlZ2V4cCA9IC8oXnxbXlxcXFxdKVxceyhbXlxce1xcfV0qW15cXFxcXSk/XFx9LztcblxuICAgIC8vIOehruS/neWPguaVsOexu+Wei+ato+ehrlxuICAgIHRlbXBsYXRlID0gJycgKyB0ZW1wbGF0ZTtcbiAgICBkYXRhID0gZGF0YSB8fCB7fTtcblxuICAgIHdoaWxlICggcmVzID0gcmVnZXhwLmV4ZWModGVtcGxhdGUpICkge1xuICAgICAgICB2YXIgaW5kZXggPSByZXMuaW5kZXg7XG4gICAgICAgIHZhciBtYXRjaCA9IHJlc1swXTtcbiAgICAgICAgdmFyIHByZWZpeCA9IHJlc1sxXTtcbiAgICAgICAgdmFyIGtleSA9IHJlc1syXTtcblxuICAgICAgICAvLyDljrvpmaQga2V5IOmmluWwvueahOepuuagvFxuICAgICAgICBrZXkgPSAoa2V5IHx8ICcnKS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgICAgIC8vIOS/neWtmCBrZXkg5LmL5YmN55qE5paH5pys5YaF5a65XG4gICAgICAgIHN0ci5wdXNoKCB0ZW1wbGF0ZS5zdWJzdHIoIDAsIGluZGV4ICsgcHJlZml4Lmxlbmd0aCApICk7XG4gICAgICAgIC8vIOS/neWtmCBrZXkg5a+55bqU55qE5YC8XG4gICAgICAgIHN0ci5wdXNoKCAnJyArIGRhdGFba2V5XSApO1xuICAgICAgICAvLyDmiKrlj5bliankuIvmnKrkvb/nlKjnmoTmqKHmnb/lrZfnrKbkuLJcbiAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5zdWJzdHIoIGluZGV4ICsgbWF0Y2gubGVuZ3RoICk7XG4gICAgICAgIC8vIOmHjee9riBsYXN0SW5kZXjvvIhJRSDlnKjpnZ7lhajlsYDljLnphY3nmoTmqKHlvI/kuZ/kvJrmlLnlj5ggbGFzdEluZGV477yJXG4gICAgICAgIHJlZ2V4cC5sYXN0SW5kZXggPSAwO1xuICAgIH1cblxuICAgIC8vIOS/neWtmCBrZXkg5LmL5ZCO55qE5paH5pys5YaF5a65XG4gICAgc3RyLnB1c2godGVtcGxhdGUpO1xuXG4gICAgLy8g5ou85o6l5a2X56ym5Liy5bm25bCGIFxceyDlkowgXFx9IOabv+aNouS4uiB7IOWSjCB9XG4gICAgc3RyID0gc3RyLmpvaW4oJycpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9cXFxcXFx7L2csICd7Jyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcXFxcXH0vZywgJ30nKTtcblxuICAgIHJldHVybiBzdHI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdHBsO1xuIiwiLyoqXG4gKiDnp7vpmaTlrZfnrKbkuLLpppblsL7nmoTnqbrnmb3lrZfnrKbjgILlpoLmnpwgYHN0cmAg5LiN5piv5a2X56ym5Liy77yM5YiZ5bCG5YW26L2s5o2i5Li65a2X56ym5Liy44CC5aaC5p6cIGBzdHJgIOS4uiBgbnVsbGAg5oiW6ICFIGB1bmRlZmluZWRg77yM5YiZ5bCG5YW26L2s5o2i5Li656m65a2X56ym5Liy44CCXG4gKlxuICogQHBhcmFtIHthbnl9IHN0clxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHN0ciA9PT0gbnVsbCB8fCBzdHIgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgc3RyID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHIgPSAnJyArIHN0cjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrLywgJycpLnJlcGxhY2UoL1xccyskLywgJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRyaW07XG4iLCJ2YXIgVGltZVBvaW50ID0gcmVxdWlyZSgnLi9UaW1lUG9pbnQnKTtcbnZhciBhdCA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2F0Jyk7XG52YXIgZGlmZiA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2RpZmYnKTtcbnZhciBkaWZmRGF5ID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvZGlmZkRheScpO1xudmFyIGRpZmZEYXlXaXRob3V0VGltZSA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2RpZmZEYXlXaXRob3V0VGltZScpO1xudmFyIGRpZmZIb3VyID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvZGlmZkhvdXInKTtcbnZhciBkaWZmTWludXRlID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvZGlmZk1pbnV0ZScpO1xudmFyIGRpZmZTZWMgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9kaWZmU2VjJyk7XG52YXIgZ2V0RGF0ZUxpc3QgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9nZXREYXRlTGlzdCcpO1xudmFyIGdldE1vbnRoTGlzdCA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2dldE1vbnRoTGlzdCcpO1xudmFyIGlzTGVhcFllYXIgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9pc0xlYXBZZWFyJyk7XG52YXIgbGFzdERheU9mVGhlTW9udGggPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9sYXN0RGF5T2ZUaGVNb250aCcpO1xudmFyIG5vdyA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL25vdycpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvcGFyc2UnKTtcbnZhciBwYXJzZVRpbWVEaWZmID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvcGFyc2VUaW1lRGlmZicpO1xudmFyIHRpbWVEaWZmRGV0YWlscyA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3RpbWVEaWZmRGV0YWlscycpO1xuXG52YXIgdGltZXBvaW50ID0ge1xuICAgIFRpbWVQb2ludDogVGltZVBvaW50LFxuICAgIGF0OiBhdCxcbiAgICBkaWZmOiBkaWZmLFxuICAgIGRpZmZEYXk6IGRpZmZEYXksXG4gICAgZGlmZkRheVdpdGhvdXRUaW1lOiBkaWZmRGF5V2l0aG91dFRpbWUsXG4gICAgZGlmZkhvdXI6IGRpZmZIb3VyLFxuICAgIGRpZmZNaW51dGU6IGRpZmZNaW51dGUsXG4gICAgZGlmZlNlYzogZGlmZlNlYyxcbiAgICBnZXREYXRlTGlzdDogZ2V0RGF0ZUxpc3QsXG4gICAgZ2V0TW9udGhMaXN0OiBnZXRNb250aExpc3QsXG4gICAgaXNMZWFwWWVhcjogaXNMZWFwWWVhcixcbiAgICBsYXN0RGF5T2ZUaGVNb250aDogbGFzdERheU9mVGhlTW9udGgsXG4gICAgbm93OiBub3csXG4gICAgcGFyc2U6IHBhcnNlLFxuICAgIHBhcnNlVGltZURpZmY6IHBhcnNlVGltZURpZmYsXG4gICAgdGltZURpZmZEZXRhaWxzOiB0aW1lRGlmZkRldGFpbHNcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdGltZXBvaW50O1xuIl19
