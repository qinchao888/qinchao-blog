---
title: decorator
categories: 
- JavaScript
---

## decorator语法

需要配置：babel-plugin-transform-decorators-legacy

```js
function log(target) { // 函数调用前后打印log
  const desc = Object.getOwnPropertyDescriptors(target.prototype);
  for (const key of Object.keys(desc)) {
    if (key === 'constructor') {
      continue;
    }
    const func = desc[key].value;
    if (typeof func === 'function') {
      Object.defineProperty(target.prototype, key, {
        value(...args) {
          console.log('before' + key);
          const ret = func.apply(this, args);
          console.log('after' + key);
          return ret;
        }
      })
    }
  }
}

function readonly(target, key, descriptor) {
  descriptor.writable = false; // 只读
}

function validate(target, key, descriptor) { // 检查函数参数是否是数值类型
  const func = descriptor.value;
  descriptor.value = function (...args) {
    for (let num of args) {
      if (typeof num !== 'number') {
        throw new Error(`"${num}" is not a number`);
      }
    }
    return func.apply(this, args);
  }
}

@log
class Numberic  {
  @readonly PI = 3.1415926;

  @validate
  add(...nums) {
    return nums.reduce((total, val) => total + val, 0);
  }
}
```