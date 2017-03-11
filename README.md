[![chatime 1.0.0](https://img.shields.io/badge/chatime-1.0.0-brightgreen.svg)](https://github.com/toxichl/chatime)  [![](https://img.shields.io/packagist/l/doctrine/orm.svg)]() [![download](https://img.shields.io/badge/downloads-6KB-brightgreen.svg)]() [![download](https://img.shields.io/badge/language-zh%20%26%20en-ff69b4.svg)]() 


---
# 2017-3-11 Update

The document has been updated: [Document](https://toxichl.github.io/chatime)

---

![chatime][1]

# chatime

>  A simple and practical javascript plug-in for **chat-time** processing , which has the features you need to processing time.

<br/>
## What is chat-time

Chat-time is a date format that is often used in social chat software (such as Twitter, Weibo, facebook, etc.) and is often presented in this format: **18:13 yesterday**, **2 minutes ago**, **Sunday 22：10**, and so on.

<br/>

## Quick Start

import a date, which can be a **String**, a timestamp（**Number**）, a time object（**Date**）, or an **Array** containing the above base elements.

Then specify the output format, it can be formatted string similar to **"yyyy-mm-dd hh: mm"**, and **"ms"** or **"s"** (this outputs timestamp), it apparently can be **"chat"** which is the main business needs of producing this plug-in.


```
var option = {
    time: dateElement,
    type: 'yyyy-mm-dd hh:mm'
};

var time = chatime.get(option);
```

Then you can get the formatted date you want.

<br/>

## Basic Supported formats

Of course, the basic format of the time can not be less, the following is the date format supportted：

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

example：
```bash
var normalTime = chatime.get( {
    time: [ '12-24 18:18:18', 1234567890000 ],
    type: 'mm-dd hh:mm:ss',
} )
```

This usage is a major upgrade to v1.0.0 (in the 0.0.x version, the selection of the date format is still in the corresponding relationship)

The idea behind this call comes from the AngularJS 1.x filter ($filter Date), but with its own innovation, the case can be ignored and spaces (in AngularJS 1.x, the month must be uppercase), and The delimiter ("-") can be omitted.

In other words, yyyy-mm-dd hh: mm: ss can also be written like this:
```
yyyymmdd hhmmss
yyyyMMdd hh:mm:ss
yyyy-mm-dd hhMMss
```
As a result, the used time only need to care about the final date format.

<br/>

## Language support

The current plug-in built-in bilingual two languages, you can also configure the date format through `option.config.lang / option.config.langSet`, view the demo API or DEMO for more details.

<br/>

## Get the current time

You can get the current time by not specifying the time (`option.time`) and then specifying the output format (` option.type`, the default output format is `yyyy-mm-dd hh: mm: ss`).

<br/>

## Timestamp format

Since timestamps are separated by 13 bits and 10 bits, a timestamp format is required when outputting timestamps. `Option.type =" ms "` will get a timestamp of 13 bits, `option.type =" s "` will get a 10-bit timestamp.

<br/>

## API

### chatime.get(option)


> option.time : `<String> <Number> <Date> <Array>`    


Define the time to be converted, if `string`, must meet the basic format requirements, delimiters can be `-` or `/`, if `Number`, the length must be 10 or 13 bits, if the `Date object`, the array element Must meet the above requirements in order to get the normal output.

> option.type : `<String> `

The type can be `'chat'`, which outputs `chatime`, it can also be `'ms'`, `'s'`, which outputs 13-bit or 10-bit timestamp, it apparently can be the above base date format, which ignores delimiters and capitalization.

> option.config.lang : `<String>`

used to switch the `'chat'` mode, `'zh'` corresponds to Chinese, and `'zh'` to English.

> option.config.langSet : `<Object>`

used to customize `chat'` mode output, the specific attributes in the object table below:

Option | Description | Displays the result
---|---|---
now | At this moment, the precision is ms, the default value is `now` | now
lostms | Put into effect when within a second up to now  , the definition of the number of milliseconds up to now.，The default is `milliseconds ago` | 100 milliseconds ago
lostMinute | Put into effect when within a minute up to now  , the definition of the number of minutes up to now.，The default is `minutes ago` |4 minutes ago
lostHour | Put into effect when within a hour up to now  , the definition of the number of hours up to now.，The default is ` hours ago` |3 hours ago
yesterday | Put into effect when whthin 24 hours to 48 hours up to now , the definition of yesterday's statement, the default value is `yesterday` |  yesterday 18:30
theDayBefore | Put into effect when whthin 48 hours to 72 hours up to now , the definition of  the day before's statement, the default value is `yesterday`  |  the day before 08:30
thisWeek | Put into effect when whthin 3 days to 7 days up to now , the definition of  this week's statement, the default value is `''` (Displays the full name of the week)  | Sunday 08:30 
lastWeek | Put into effect when whthin 7 days to 14 days up to now , the definition of  last week's statement, the default value is `last` (Displays the full name of the week)  | last Sunday 08:30 
weekDes | defines the statement of the week. The default is`['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']` | Sunday

Description:
1. if `'chat'` mode, the default format displays Beyond one year is ` yyyy-mm-dd hh: mm`, Within one year is  `mm-dd hh: mm`, within one year, and within 14 days follows the table above.
2. All of the above options are optional. If only one item is defined, it will be effective, and the other options will be default values.

<br/>
### chatime.newDate(input)
Get a time object, or an array containing time objects.
> input : `<String> <Number> <Date> <Array>`

<br/>

### chatime.getDiff(start, end, type)

Get the difference between two time objects.

> start \| end : `<Date>`

Specify the start date and end date, pay attention to this method only supports time object input, can be combined with `chatime.newDate()` use.
<br/>
> type : `<String>`

Specify the exact form of difference to be obtained

Option | Description 
:---:|:---: 
'year' | Gets the years difference
'month' | Get the months difference
'day' | Get the days difference
'hour' | Get the hours difference
'minute' | Get the minutes difference
'millisecond' | Get the milliseconds difference
'all' | Get an object that contains all of the above differences

<br/>

## In the end

1.  If there are other time / date processing requirements that can not be met by this plugin, you can [send mail](https://github.com/toxichl) to me, or mention the issue;
2. Notice the next project，a code template for the development of APP that uses ` ionic / cordova / Angular 1.x` ，The reason is that this development model has a drawback is that in different controllers will have more repetitive logic, packaging a common set of feasible controller code template can greatly promote the development of the [ionic SPA][2], welcome attention, Thank you.

---

**chatime** - GitHub © [toxichl](https://github.com/toxichl), Released under the [MIT]() License.<br>


  [1]: https://raw.githubusercontent.com/toxichl/chatime/master/img/chatime-poster.jpg
  [2]: http://ionicframework.com/angularjs.org/
