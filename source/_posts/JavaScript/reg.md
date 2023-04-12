---
title: 正则
categories: 
- JavaScript
---

[在线工具](https://regexper.com/)

### 断言

1. ?: 非捕获分组
2. ?= 正向先行断言，主要用于匹配x并且仅当x后面跟着y
3. ?! 负向先行断言，主要用于匹配x并且仅当x后面不跟着y
4. ?<= 正向后行断言（不兼容safari），主要用于匹配x并且仅当x前面跟着y
5. ?<! 负向后行断言，主要用于匹配x并且仅当x前面不跟着y

可以理解为都是用来匹配一个位置，因此括号中的内容并不会出现在匹配的结果中

```js
// ?: 非捕获分组 和 捕获分组，即和()的区别在于它只使用括号最原始的功能，即不再api中引用，也不在正则里反向引用
var str = 'abcd'
str.match(/(ab)/) // ['ab', 'ab', index: 0, input: 'abcd', groups: undefined]
str.match(/(?:ab)/) // ['ab', index: 0, input: 'abcd', groups: undefined]

// 千分位分隔符
str.replace(/(?!^)(?=(\d{3})+$)/g, ',')
// 或
str.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
```