---
title: gulp
categories: 
- Gulp
---

```js
const argv = require('yargs').argv;
console.log(argv.target); // gadget

// 执行
npx gulp dev --target gadget
```

### parallel 和 series

1. parallel: 并行执行
2. series: 串行执行

两者都需要使用task注册任务，或者使用exports导出

```js
// gulpfile.js

// 方式一
const { series } = require('gulp');

exports.build = series(fn1, fn2);

// gulp build

// 方式二
const gulp, { series } = require('gulp');
gulp.task('build', series(fn1, fn2));
```