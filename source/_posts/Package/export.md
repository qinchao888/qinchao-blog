---
title: 导入和导出
categories: 
- package
---

```js
// test.js
const a = 10
export {
  a as default, // 将a作为默认值导出
}

// 导入
const a = require('./test').default
// 或者
import a from './test'
```