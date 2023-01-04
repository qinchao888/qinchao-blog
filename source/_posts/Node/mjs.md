---
title: mjs文件
categories: 
- Node
---

### node配置支持es6

在nodejs中默认使用的是commonjs语法，是不支持es6语法的

如果要使用es6的import和export，有以下两种设置方式

1. 文件修改为.mjs
2. 文件依旧保持.js，package.json文件中配置 type: "module"（如果没有 type 字段，默认为 CommonJs 规范）

```js
// 示例

// 方式一
// test1.mjs
import a from './test2.mjs'
console.log('a', a)

// test2.mjs
const a = 10
export default a

// node
> node test1.mjs

// 方式二
// test1.js
import a from './test2.js'
console.log('a', a)

// test2.js
const a = 10
export default a

// package.json
{
  "type": "module"
}

// node
> node test1.js
```

### CommonJS 模块加载 ES6 模块

```js
(async () => {
  await import('./my-app.mjs');
})();
```

### ES6 模块加载 CommonJS 模块

```js
// 正确
import packageMain from 'commonjs-package';

// 报错
import { method } from 'commonjs-package';
```

[参考](https://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html)
