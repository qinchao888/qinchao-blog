---
title: export和import
categories: 
- JavaScript
---

```js
// 导出默认内容

// a.js
const a = 10
const b = 10
export {
  a as default,
  a,
  b,
}

// b.js
import s, { a, b } from './a'
// 此处的 s 的值即为 a 的值
```

```js
// test.js
const TEST = 'test';
export default TEST;

// 从另一个文件中导出
export { default as TEST } from './test';
```
[导出规范](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-export-from.md)