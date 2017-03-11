# Chat模式

`Chat模式`是本插件的核心功能，开启chat模式只需要设定`type='chat'`, 如下：


```js
var option = {
    time: dateElement,
    type: 'chat'
};
var time = chatime.get(option);
```
然后根据你所给定的时间，你就可能得到类似于这样的`chatime`：

```mardown
现在
100毫秒前
4分钟前
3小时前
昨天 18:30
前天 08:30
星期一 08:30
上周三 08:30
星期一
```


当然，`chatime`的时间格式是可以配置的，请参见：[option.config](zh-CN/API?id=optionconfig)

