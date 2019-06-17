# TimePoint.js

[![Build Status](https://travis-ci.org/john-yuan/TimePoint.js.svg?branch=master)](https://travis-ci.org/john-yuan/TimePoint.js)

TimePoint 是一个时间工具类，用于简化时间的解析和格式化操作，并提供常用的时间计算函数。TimePoint 类被有意设计为状态不可变的（Immutable），这意味着一个 TimePoint 实例被创建之后，无论调用什么方法，它本身的状态都不会被改变。

## 安装

```bash
npm i timepoint
```

## 目录

> API 小结中列出的 API 均可用，此文档正在完善中。

* [示例](#示例)
    * [示例一：时间计算操作](#示例一时间计算操作)
    * [示例二：时间的解析及格式化](#示例二时间的解析及格式化)
    * [示例三：查询指定月份的最后一天为多少号](#示例三查询指定月份的最后一天为多少号)
    * [示例四：计算时间距离](#示例四计算时间距离)
* [API](#api)
    * [TimePoint.parse([time])](#timepointparsetime)
    * [TimePoint.now()](#timepointnow)
    * TimePoint.at(time)
    * TimePoint.timeDiff(start, end)
    * TimePoint.secDiff(start, end)
    * TimePoint.minDiff(start, end)
    * TimePoint.hourDiff(start, end)
    * TimePoint.dayDiff(start, end)
    * TimePoint.dayDiffWithoutTime(start, end)
    * TimePoint.timeDiffDetail(start, end)
    * TimePoint.parseTimeDiff(diff)
    * TimePoint.isLeapYear(year)
    * TimePoint.lastDayOfTheMonth(year, month)
    * TimePoint.parseTime([time])
    * TimePoint.getDateList(start, end)
    * TimePoint.getMonthList(start, end)
    * TimePoint.tpl(template, data)
    * [TimePoint.prototype.getTime()](#timepointprototypegettime)
    * [TimePoint.prototype.getDate()](#timepointprototypegetdate)
    * [TimePoint.prototype.lastDayOfThisMonth()](#timepointprototypelastdayofthismonth)
    * [TimePoint.prototype.toFirstDayOfThisMonth()](#timepointprototypetofirstdayofthismonth)
    * [TimePoint.prototype.toLastDayOfThisMonth()](#timepointprototypetolastdayofthismonth)
    * [TimePoint.prototype.clone()](#timepointprototypeclone)
    * [TimePoint.prototype.copy()](#timepointprototypecopy)
    * [TimePoint.prototype.clearMs()](#timepointprototypeclearms)
    * [TimePoint.prototype.addMs(ms)](#timepointprototypeaddmsms)
    * TimePoint.prototype.addSec(sec)
    * TimePoint.prototype.addMin(min)
    * TimePoint.prototype.addHour(hour)
    * TimePoint.prototype.addDay(day)
    * TimePoint.prototype.nextDay()
    * TimePoint.prototype.prevDay()
    * TimePoint.prototype.at(time)
    * TimePoint.prototype.map()
    * TimePoint.prototype.format([format])
    * TimePoint.prototype.toString([format])
    * TimePoint.prototype.template(template)
* [附录](#附录)
    * [一、日期模板映射表](#一日期模板映射表)
    * [二、时间差值模板映射表](#二时间差值模板映射表)
* [License](#license)

## 示例

### 示例一：时间计算操作

问：小明所在的公司加班费为50元/小时。有一天可怜的小明从晚上 19:00 开始加班，一直到第二天凌晨 02:30 才下班。求小明的加班费为多少？

答：

```js
var start = TimePoint.at('19:00');          // 开始时间为 19:00
var end = start.nextDay().at('02:30');      // 结束时间为第二天 02:30
var hours = TimePoint.hourDiff(start, end); // 7.5
var salary = hours * 50;                    // 375

console.log('小明的加班费为: ' + salary + '元');
```

### 示例二：时间的解析及格式化

在项目的开发中，我们经常会遇到格式化时间字符串的需求。例如，我们可能需要将：

```
2018-10-01 09:30:00
```

或者其对应的毫秒数：

```
1538357400000
```

转换为：

```
2018年10月1日 09:30
```

那么我可以使用下面的代码完成这个转换：

```js
var t1 = TimePoint.parse('2018-10-01 09:30:00'); // 解析时间字符串
var t2 = TimePoint.parse(1538357400000);         // 或者解析时间对应的毫秒数

console.log(t1.format('YYYY年M月D日 hh:mm')); // 2018年10月1日 09:30
console.log(t2.format('YYYY年M月D日 hh:mm')); // 2018年10月1日 09:30
```

需要说明的是：

```js
TimePoint.prototype.format([format])
```

是一个简单的日期格式化函数，能满足大部分场景下的需求。但是如果你的格式较为复杂，请使用：

```js
TimePoint.prototype.template([template])
```

函数进行模板渲染。示例如下：

```js
var t3 = TimePoint.parse('2018-10-01 09:30:00');
var text = t3.template('模板引擎使用 \\{YYYY\\} 表示年份，比如当前年份为：{YYYY}');

console.log(text); // 模板引擎使用 {YYYY} 表示年份，比如当前年份为：2018
```

[点击此处](#一日期模板映射表)查看日期模板映射表。

### 示例三：查询指定月份的最后一天为多少号

问：2020年2月的最后一天是28号还是29号？

答：

```js
var lastDay1 = TimePoint.parse('2020-02').lastDayOfThisMonth(); // 解法1
var lastDay2 = TimePoint.lastDayOfTheMonth(2020, 2);            // 解法2

console.log(lastDay1); // 29
console.log(lastDay2); // 29
```

### 示例四：计算时间距离

问：假设现在是2018年10月1日10点21分32秒，那么现在距离双11还有多长时间？

答：

```js
var t1 = TimePoint.parse('2018-10-01 10:21:32');
var t2 = TimePoint.parse('2018-11-11 00:00:00');
var diff = TimePoint.timeDiffDetail(t1, t2);
var text = diff.template('距离双11还有{d}天{h}小时{m}分{s}秒');

console.log(text); // 距离双11还有40天13小时38分28秒
```

[点击此处](#二时间差值模板映射表)查看时间差值模板映射表。

## API

### TimePoint.parse([time])

解析时间方法，可以解析数字、字符串、Date 以及 TimePoint 类型的时间。

* `time` {number|string|Date|TimePoint} 需要解析的时间，默认为 null，表示当前时间
* Returns: {TimePoint} 返回一个 TimePoint 实例

1. 当没有传递 `time`，或者 `time` 值为 `null` 或者 `undefined` 时，则以当前时间创建实例：

```js
var t = TimePoint.parse();

console.log(t.format()); // 系统当前时间
```

2. 当 `time` 的类型为 `number` 时，则以此数字为时间创建实例：

```js
var t = TimePoint.parse(60000);

console.log(t.getTime()); // 60000
```

3. 当 `time` 的类型为 `string` 时，解析规则如下：

```js
// 标准的时间字符串
var t1 = TimePoint.parse('2018-10-01 09:30:00');
var t2 = TimePoint.parse('2018-10-01T09:30:00');
var t3 = TimePoint.parse('2018/10/01 09:30:00');

// 没有前置 0 的时间字符串
var t4 = TimePoint.parse('2018-10-1 9:30');
var t5 = TimePoint.parse('2018-10-1T9:30');
var t6 = TimePoint.parse('2018/10/1 9:30');

console.log(t1.getTime() === t2.getTime()); // true
console.log(t1.getTime() === t3.getTime()); // true
console.log(t1.getTime() === t4.getTime()); // true
console.log(t1.getTime() === t5.getTime()); // true
console.log(t1.getTime() === t6.getTime()); // true

// 解析月份
var t7  = TimePoint.parse('2018-01');
var t8  = TimePoint.parse('2018/01');
var t9  = TimePoint.parse('2018-1');
var t10 = TimePoint.parse('2018/1');

console.log(t7.format()); // 2018-01-01 00:00:00
console.log(t7.getTime() === t8.getTime()); // true
console.log(t7.getTime() === t9.getTime()); // true
console.log(t7.getTime() === t10.getTime()); // true

// 对于没有传入的日期部分，其默认值会被设置为 new Date(0) 对应的值
var t11 = TimePoint.parse('2018-06');
var t12 = TimePoint.parse('2018-06-02');
var t13 = TimePoint.parse('2018-06-02 10');
var t14 = TimePoint.parse('2018-06-02 10:30');
var t15 = TimePoint.parse('2018-06-02 10:30:30');

console.log(t11.format()); // 2018-06-01 08:00:00（此处系统时区为 GMT+8）
console.log(t12.format()); // 2018-06-02 08:00:00（此处系统时区为 GMT+8）
console.log(t13.format()); // 2018-06-02 10:00:00
console.log(t14.format()); // 2018-06-02 10:30:00
console.log(t15.format()); // 2018-06-02 10:30:30

// 解析时间，包含毫秒数。以下三个时间完全相等，毫秒数都为 100
var t16 = TimePoint.parse('2018-10-01 12:00:00.1');
var t17 = TimePoint.parse('2018-10-01 12:00:00.10');
var t18 = TimePoint.parse('2018-10-01 12:00:00.100');

console.log(t16.getTime()); // 1538366400100
console.log(t16.getTime() === t17.getTime()); // true
console.log(t16.getTime() === t18.getTime()); // true

// 如果需要将毫秒数设置为 1，请使用以下代码
var t19 = TimePoint.parse('2018-10-01 12:00:00.001');
console.log(t19.getTime()); // 1538366400001

// 当字符串为全数字组成时，该字符串会被当做 number 类型处理
var t20 = TimePoint.parse('1538366400000');
var t21 = TimePoint.parse(1538366400000);

console.log(t20.getTime() === t21.getTime()); // true

// 也正是由于上述原因，我们不能初始化年份
var t22 = TimePoint.parse('2018'); // 注意：此处并不代表 2018 年！

console.log(t22.getTime() === 2018); // true
console.log(t22.getDate().getFullYear() !== 2018); // true
```

4. 当 `time` 类型为 `Date` 时，则以该日期对象对应的毫秒数创建实例：

```js
var d = new Date();
var t = TimePoint.parse(d);

console.log(d.getTime() === t.getTime()); // true
```

5. 当 `time` 类型为 `TimePoint` 时，则以该 `TimePoint` 对象对应的毫秒数创建实例：

```js
var t1 = TimePoint.parse();
var t2 = TimePoint.parse(t1);

console.log(t1.getTime() === t2.getTime()); // true
```

### TimePoint.now()

* Returns: {number} 返回当前系统时间的毫秒数

### TimePoint.prototype.getTime()

* Returns: {number} 返回当前时间点对应的毫秒数

```js
var t = TimePoint.parse('2018-10-01 09:30:00');
var time = t.getTime();

console.log(time); // 1538357400000
```

### TimePoint.prototype.getDate()

* Returns: {Date} 获取当前 TimePoint 对应的 Date 对象，每次返回一个新的 Date 实例

```js
var t = TimePoint.parse();
var d1 = t.getDate();
var d2 = t.getDate();

console.log(d1 !== d2); // true
console.log(d1 instanceof Date); // true
console.log(d1.getTime() === t.getTime()); // true
console.log(d1.getTime() === d2.getTime()); // true
```

### TimePoint.prototype.lastDayOfThisMonth()

* Returns: {number} 返回当前时间所在月份的最后一天的号数

```js
var t1 = TimePoint.parse('2018-08');
var t2 = TimePoint.parse('2019-02');
var t3 = TimePoint.parse('2020-02');

console.log(t1.lastDayOfThisMonth()); // 31
console.log(t2.lastDayOfThisMonth()); // 28
console.log(t3.lastDayOfThisMonth()); // 29
```

### TimePoint.prototype.toFirstDayOfThisMonth()

* Returns: {TimePoint} 获取当前日期所在月份第一天对应的 TimePoint 实例

```js
var t1 = TimePoint.parse('2018-09-15 09:30:25.456');
var firstDay = t1.toFirstDayOfThisMonth();

// 2018/09/15 09:30:25.456
t1.format('YYYY/MM/DD hh:mm:ss.SSS');
// 2018/09/01 09:30:25.456
firstDay.format('YYYY/MM/DD hh:mm:ss.SSS');
```

### TimePoint.prototype.toLastDayOfThisMonth()

* Returns: {TimePoint} 获取当前日期所在月份最后一天对应的 TimePoint 实例

```js
var t1 = TimePoint.parse('2018-09-15 09:30:25.456');
var lastDay = t1.toLastDayOfThisMonth();

// 2018/09/15 09:30:25.456
t1.format('YYYY/MM/DD hh:mm:ss.SSS');
// 2018/09/30 09:30:25.456
lastDay.format('YYYY/MM/DD hh:mm:ss.SSS');
```

### TimePoint.prototype.clone()

克隆当前 TimePoint 对象。

* Returns: {TimePoint} 返回一个 TimePoint 实例

```js
var t1 = TimePoint.parse();
var t2 = t1.clone();

console.log(t1.getTime() === t2.getTime()); // true
console.log(t2 instanceof TimePoint); // true
```

### TimePoint.prototype.copy()

此方法为 TimePoint.prototype.clone() 方法的别名。

* Returns: {TimePoint} 返回一个 TimePoint 实例

### TimePoint.prototype.clearMs()

移除当前 TimePoint 的毫秒部分，并以此为初始值构造一个新的 TimePoint 实例。

* Returns: {TimePoint} 返回一个 TimePoint 实例

```js
var t1 = TimePoint.parse(1538366400456);
var t2 = t1.clearMs();

console.log(t1.getTime()); // 1538366400456
console.log(t2.getTime()); // 1538366400000
```

### TimePoint.prototype.addMs(ms)

在当前时间上增加指定的毫秒数（可以为负数），并以此结果为初始只创建一个新的 TimePoint 实例。

* `ms` {number} 需要添加的毫秒数，可以为负整数、0、正整数
* Returns: {TimePoint} 返回一个 TimePoint 实例

```js
var t1 = TimePoint.parse(236);
var t2 = t1.addMs(100);
var t3 = t1.addMs(-100);

console.log(t1.getTime()); // 236
console.log(t2.getTime()); // 336
console.log(t3.getTime()); // 136
```

## 附录

### 一、日期模板映射表

| key  | 类型    | 示例值    | 说明
|------|--------|----------|-----------------------------------
| YYYY | string | 2018     | 四位数字表示的年份
| YY   | string | 18       | 两位数字表示的年份
| MM   | string | 01, 12   | 两位数字表示的月份
| M    | string | 1, 12    | 一位数字表示的月份
| DD   | string | 01, 24   | 两位数字表示的日期
| D    | string | 1, 24    | 一位数字表示的日期
| hh   | string | 00, 23   | 两位数字表示的小时
| h    | string | 0, 23    | 一位数字表示的小时
| mm   | string | 00, 59   | 两位数字表示的分钟
| m    | string | 0, 59    | 一位数字表示的分钟
| ss   | string | 00, 59   | 两位数字表示的秒钟
| s    | string | 0, 59    | 一位数字表示的秒钟
| S    | string | 0, 9     | 一个精度的毫秒表示，范围为：[0, 9]
| SS   | string | 00, 99   | 两个精度的毫秒表示，范围为：[00, 99]
| SSS  | string | 000, 999 | 三个精度的毫秒表示，范围为：[000, 999]

### 二、时间差值模板映射表

| key  | 类型    | 范围         | 说明
|------|--------|--------------|-------------------------------------------
| d    | number | [0, +∞)      | 天数
| h    | number | [0, 23)      | 小时数
| m    | number | [0, 59)      | 分钟数
| s    | number | [0, 59)      | 秒数
| S    | number | [0, 999)     | 毫秒数
| n    | number | { -1, 0, 1 } | 表示传入的时间差值的符号：负(-1)，相等(0)，正(1)

## License

[MIT License](LICENSE)
