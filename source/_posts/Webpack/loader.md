---
title: loader
categories: 
- loader
---

### 基础

1. 解析方式：从右至左，从下到上
2. 使用webpack配置loader相比内联方式的优点：代码量更少、出错时更容易定位#


### style-loader

1. production： 推荐使用 mini-css-extract-plugin，编译成单个css文件。
2. development：推荐使用 style-loader，将样式使用style标签插入，效率更高。

> Warning: Do not use together style-loader and mini-css-extract-plugin.


### 运用逗号操作符修改this指向

```js
(0, func)() // func函数中的this绑定到window上

const obj = {test: function () {console.log(this)}}
obj.test() // {test: ƒ}

(0, obj.test)() // Window
// 逗号运算符会从左往右求值，并返回最后一个表达式的值，(0, obj.test)()返回的是一个函数，这个函数的作用域是全局

(1 && obj.test)() // Window
```