

[![chatime 1.0.0](https://img.shields.io/badge/chatime-1.0.0-brightgreen.svg)](https://github.com/toxichl/chatime)  [![](https://img.shields.io/packagist/l/doctrine/orm.svg)]() [![download](https://img.shields.io/badge/downloads-6KB-brightgreen.svg)]() [![download](https://img.shields.io/badge/language-zh%20%26%20en-ff69b4.svg)]() 

# chatime

> This is a javascript plug-in that allows you to generate chat-time

## What's chat-time

Chat-time is a date format that is often used in social chat software (such as Twitter, Weibo, facebook, etc.) and is often presented in this format: **18:13 yesterday**, **2 minutes ago**, **Sunday 22：10**, and so on.

## Easy to use



import a date, which can be a **String**, a timestamp（**Number**）, a time object（**Date**）, or an **Array** containing the above base elements.
```bash
var time = chatime.get( {
    time:  new Date().getTime() - 1000 * 120,
    type:  'chat',
} )
```
Then specify the output format, it can be formatted string similar to **"yyyy-mm-dd hh: mm"**, and **"ms"** or **"s"** (this outputs timestamp), it apparently can be **"chat"** which is the main goal of this plug-in.

Then you can get the date format you want:

```bash
2 minutes ago
```

## Basic Supported formats
The supported formats are as follows：
```bash
yyyy
yyyy-mm
yyyy-mm-dd
mm-dd
hh:mm
hh:mm:ss
yyyy-mm-dd hh:mm
yyyy-mm-dd hh:mm:ss
mm-dd hh:mm
mm-dd hh:mm:ss
```
eamaple：
```bash
var normalTime = chatime.get( {
    time: [ '12-24 18:18:18', 1234567890000 ],
    type: 'mm-dd hh:mm:ss',
} )
```

This call technique is a major upgrade in v1.0.0 version and its design ideas originated in the AngularJS filter (Date) , but have their own innovation, we can ignore the case (month in AngularJS must be written in MM), you can omit the separation (Delimiters default to `"-"`).

## Language support

English and Chinese, and you can also configure the format you want to modify with the `config.lang / config.langSet`, see the demo for more details.

## Get the time now

Do not specify the time, and specify the type (or not), you can get the current time.

## Timestamp

Since the timestamp has 10 bits and 13 bits, it is necessary to specify the type of the timestamp when obtaining the timestamp, where `"ms"` represents the 13-bit time stamp, `"s"` represents the 10-bit timestamp.

---

**chatime** - GitHub © [toxichl](https://github.com/toxichl), Released under the [MIT]() License.<br>
