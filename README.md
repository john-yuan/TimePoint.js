# TimePoint.js

[![Build Status](https://travis-ci.org/john-yuan/TimePoint.js.svg?branch=master)](https://travis-ci.org/john-yuan/TimePoint.js)

TimePoint 是一个时间工具类，用于简化时间的解析和格式化操作，并提供常用的时间计算函数。TimePoint 类被有意设计为状态不可变的（Immutable），这意味着一个 TimePoint 实例被创建之后，无论调用什么方法，它本身的状态都不会被改变。

## 安装

```bash
npm i timepoint
```

## 示例

```js
var timepoint = require('timepoint');
var date = timepoint.parse('2019-06-18 12:00:00');

// 1560830400000
console.log(date.getTime());

// 2019-06-18 12:00:00
console.log(date.toString());

// 2019年06月18日 12:00:00
console.log(date.format('YYYY年MM月DD日 HH:mm:ss'));

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
| HH   | string | 00, 23   | 两位数字表示的小时
| H    | string | 0, 23    | 一位数字表示的小时
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
