# 快速上手

1. 给定一个日期元素`dateElement`，它可以是字符串、时间戳、时间对象，或者是包含上述基础元素的数组。

2. 接着，指定输出格式，它可以是类似于`“yyyy-mm-dd hh:mm”`这样的日期格式字符串，也可是是`“ms”`或`“s”`（用于输出时间戳），也可以是`“chat”`———生成所谓的`chat time`,关于什么是`chat time`，请参见：[Chat模式](zh-CN/chatMode.md)。

```js
var option = {
    time: dateElement,
    type: 'yyyy-mm-dd hh:mm'
};

var time = chatime.get(option);
```

然后你就能获得你想要的日期格式了。