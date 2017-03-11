# 使用小技巧

## 获取当前时间

不指定时间（`option.time`）即可获取当前时间，然后指定输出格式（`option.type`，默认输出格式为 `yyyy-mm-dd hh:mm:ss`），你便可以获得当前时间, 示例如下：


```js
var time = chatime.get();
```

!> 默认获得的时间值类型是`String`, 其默认格式是`yyyy-mm-dd hh:mm`, 可以通过指定`option.type` 来更改获取的时间格式。

```js
var time = chatime.get({
	type: 'mm-dd hh:mm:ss'
});
```


<br/>

## 获取时间戳格式

由于时间戳分13位和10位的区别，因此在输出时间戳时，需要指定时间戳的格式，`option.type = "ms"`将会获得13位的时间戳，`option.type = "s"`将会获得10位的时间戳。

```js
var time = chatime.get({
	type: 'ms'
});
```