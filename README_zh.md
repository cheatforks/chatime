[![chatime 1.0.0](https://img.shields.io/badge/chatime-1.0.0-brightgreen.svg)](https://github.com/toxichl/chatime)  [![](https://img.shields.io/packagist/l/doctrine/orm.svg)]() [![download](https://img.shields.io/badge/downloads-6KB-brightgreen.svg)]() [![download](https://img.shields.io/badge/language-zh%20%26%20en-ff69b4.svg)]() 

![chatime][1]

# chatime

> 一个简单实用的chatime时间处理插件，拥有你需要的时间处理功能。

<br/>

## 什么是chat-time

chat-time是一种常常用在社交聊天软件（如推特、微博、facebook）中格式化的日期格式，他们的时间格式往往不固定，而通常以这种格式呈现：`昨天18:13`、`2分钟前`、`星期五 22:10`，等等。

<br/>

## 简单使用

输入一个日期，它可以是字符串、时间戳、时间对象，或者是包含上述基础元素的数组。

接着指定输出格式，它可以是类似于`“yyyy-mm-dd hh:mm”`这样的格式字符串，也可是是`“ms”`或`“s”`（用于输出时间戳），也可以是`“chat”`，这也是驱动本插件产生的业务需求。
```
var option = {
    time: dateElement,
    type: 'yyyy-mm-dd hh:mm'
};

var time = chatime.get(option);
```

然后你就能获得你想要的日期格式了。

<br/>

## 基础格式
当然，基础的时间格式化不能少，以下是插件支持的日期格式，特别强调，可以忽略大小写和分隔符：


- yyyy 
- yyyy-mm
- yyyy-mm-dd
- mm-dd
- hh:mm
- hh:mm:ss
- yyyy-mm-dd hh:mm
- yyyy-mm-dd hh:mm:ss
- mm-dd hh:mm
- mm-dd hh:mm:ss

示例：
```bash
var normalTime = chatime.get( {
    time: [ '12-24 18:18:18', 1234567890000 ],
    type: 'mm-dd hh:mm:ss',
} )
```

这个使用方式是 v1.0.0 版本的重大提升（在0.0.x版本中，关于日期格式的选择还停留在对应关系上）
实现这种调用的思路来源于 [AngularJS 1.x][2] 的过滤器（$filter Date）,但又有自己的创新，调用时可以忽略大小写和空格（在AngularJS 1.x中，月份必须大写），也可以省略分隔符（`"-"`）。
也就是说，`yyyy-mm-dd hh:mm:ss` 也可以写成这样：
```
yyyymmdd hhmmss
yyyyMMdd hh:mm:ss
yyyy-mm-dd hhMMss
```
如此一来，调用的时候只需要关心最终的日期格式就行了。

<br/>

## 语言支持

目前插件内置中英双语两种语言，你也可以通过 `option.config.lang / option.config.langSet` 来配置日期格式，查看demo可以查看更多详情。

<br/>

## 获取当前时间

不指定时间（`option.time`）即可获取当前时间，然后指定输出格式（`option.type`，默认输出格式为 yyyy-mm-dd hh:mm:ss），你便可以获得当前时间。

<br/>

## 时间戳格式

由于时间戳分13位和10位的区别，因此在输出时间戳时，需要指定时间戳的格式，`option.type = "ms"`将会获得13位的时间戳，`option.type = "s"`将会获得10位的时间戳。

<br/>

## API

### chatime.get(option)


> option.time : `<String> <Number> <Date> <Array>`    


定义待转换的时间，若为字符串，必须符合基础格式要求，分隔符可以为`-`或`/`，若为Number，长度必须为10位或13位，若为时间对象，其数组元素必须符合上述要求才能得到正常输出结果。

> option.type : `<String> `

定义输出时间的格式，可以是`'chat'`,则输出`chatime`, 也可以是`ms`、`'s'`,则输出13位或10位时间戳，也可以是上述的基础日期格式，并忽略分隔符、大小写。

> option.config.lang : `<String>`

用于切换`'chat'`模式输出的语言，中文为`'zh'`,英文为`'en'`。

> option.config.langSet : `<Object>`

用来自定义`'chat'`模式输出的语言，对象中的具体属性见下表：

选项 | 说明 | 显示结果
---|---|---
now | 现在这一刻，精度为ms，默认值为`现在`| 现在
lostms | 距离现在一秒内生效，定义距离现在的毫秒数，默认值为`毫秒前`  | 100毫秒前
lostMinute | 距离现在一小时内生效，定义距离现在的分钟数，默认值为`分钟前` |4分钟前
lostHour | 距离现在一天内生效，定义距离现在的小时数，默认值为 `小时前` |3小时前
yesterday | 距离现在24小时到48小时生效，定义昨天的表述，默认值为`昨天` | 昨天 18:30
theDayBefore | 距离现在48小时到72小时生效，定义前天的表述，默认值为`前天`  | 前天 08:30
thisWeek | 距离现在3天到7天生效，定义本周内除了今天、昨天、前天外的天数的表述，默认值为`星期`  | 星期一 08:30
lastWeek | 距离现在7天到14天生效，定义上周天数的表述，默认值为`上周`  | 上周三 08:30
weekDes | 定义星期的表达，默认值为`['一', '二', '三', '四', '五', '六', '日']` | 星期一

说明：
1. `'chat'`模式下，一年外的默认显示格式为`yyyy-mm-dd hh:mm`，一年以内的默认格式为`mm-dd hh:mm`，一年以内，距离现在14天以内的时间格式遵循上表。
2. 上述所有选项都是可选的。若只定义一项，则生效一项，其余选项采用默认值；

<br/>

### chatime.newDate(input)
获取时间对象，或者包含时间对象的数组。
> input : `<String> <Number> <Date> <Array>`

<br/>

### chatime.getDiff(start, end, type)

获取两个时间对象之间的差值。

> start \| end : `<Date>`

指定开始日期和结束日期，注意这个方法只支持时间对象输入，可以结合 `chatime.newDate` 使用。

<br/>
> type : `<String>`

指定获取的具体差值形式

可选项 | 说明 
:---:|:---: 
'year' | 获得年份差
'month' | 获得月份差
'day' | 获得天数差
'hour' | 获得小时差
'minute' | 获得分钟差
'millisecond' | 获得毫秒差
'all' | 获得包含所有上述所有差值的对象

<br/>

## 最后

1. 如果有其他的本插件无法满足的时间/日期处理需求，可以 [发邮件](https://github.com/toxichl) 给我，或者提issue;
2. 预告下一个项目，一个使用 ` ionic / cordova / Angular 1.x` 开发APP时的代码模板，开发的缘由是这种开发模式有一个缺点，就是在不同的控制器中将会有较多重复的逻辑，封装一套通用可行的控制器代码模板可以极大地促进`ionic SPA`的开发，欢迎关注，谢谢。

---

**chatime** - GitHub © [toxichl](https://github.com/toxichl), Released under the [MIT]() License.<br>


  [1]: https://raw.githubusercontent.com/toxichl/chatime/master/img/chatime-poster.jpg
  [2]: https://angularjs.org/
