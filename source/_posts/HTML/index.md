---
title: HTML基础知识
categories: 
- HTML
---

### getElementById 和 querySelector

querySelector中的选择器标识符不能以数字、两个连字符或一个连字符后跟一个数字开头。而getElementById则可以

```js
// querySelector的替代方式
const myId = 22;
document.querySelector(`[id="${myId}"]`)
```

[参考](https://stackoverflow.com/questions/37270787/uncaught-syntaxerror-failed-to-execute-queryselector-on-document)

