# 基础格式

以下是插件支持的日期格式：

```markdown
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
```

> 实现这种调用的思路来源于 `AngularJS 1.x` 的过滤器`$filter(Date)`, 但本插件的独特之处，调用时可以忽略大小写和空格，也可以省略分隔符（`"-"`）。也就是说，`yyyy-mm-dd hh:mm:ss` 也可以写成这样：


```markdown
yyyymmdd hhmmss
yyyyMMdd hh:mm:ss
yyyy-mm-dd hhMMss
```

如此一来，调用的时候只需要关心最终的日期格式就行了。