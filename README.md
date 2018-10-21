# TimePoint

TimePoint 是一个时间工具类，用于简化时间的解析和格式化操作，并提供常用的时间计算函数。TimePoint 是不可变的（Immutable），这意味着一个 TimePoint 实例被创建之后，无论调用什么方法，它本身的状态都不会被改变。

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
var t1 = TimePoint.from('2018-10-01 09:30:00'); // 解析时间字符串
var t2 = TimePoint.from(1538357400000);         // 或者解析时间对应的毫秒数
var text = t1.format('YYYY年M月D日 hh:mm');      // 2018年10月1日 09:30
```

### 示例三：查询指定月份的最后一天为多少号

问：2020 年的 2 月的最后一天是 28 号还是 29 号？

答：

```js
var lastDay1 = TimePoint.from('2020-02').lastDayOfThisMonth(); // 解法1：29
var lastDay2 = TimePoint.lastDayInMonth(2020, 2);              // 解法2：29
```
