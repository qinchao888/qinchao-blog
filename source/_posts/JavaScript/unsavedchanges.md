---
title: 未保存提示
categories: 
- JavaScript
---

### 离开或刷新网页是提示当前页面未保存

```js
window.onbeforeunload = function (e) {
  e.returnValue = undefined; // 离开或刷新触发浏览器提示
  e.returnValue = null; // 刷新触发浏览器提示
  e.returnValue = ''; // 离开或刷新触发浏览器提示(从Firefox 4、 Chrome 51、Opera 38 和Safari 9.1开始，通用确认信息代替事件返回的字符串，即自定义字符串并不会生效)
}

window.onbeforeunload = function (e) {} // 不触发
```

[参考](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowEventHandlers/onbeforeunload)