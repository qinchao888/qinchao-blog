---
title: JSON.stringify处理循环引用
categories: 
- JavaScript
---

对象中存在循环引用时，使用JSON.stringify处理默认是会报错的。

```js
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value)=> {
    console.log('key', key, 'value', value)
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

/**
 * 一个更加安全的 stringify，可以解决循环依赖的问题
 * @param value
 */
const stringify = (value) => JSON.stringify(value, getCircularReplacer());


const a = {s: 22}
const b = {m: 33, a}
a.b = b
const obj = {
  a,
  b,
  c: 11,
}
console.log(stringify(obj)) // {"a":{"s":22,"b":{"m":33}},"c":11}
console.log(JSON.stringify(obj)) // Uncaught TypeError: Converting circular structure to JSON
```

### WeakSet

特点：

1. 不重复的值的集合
2. 成员只能是对象
3. WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
4. 不可遍历，因为WeakSet 内部的成员数量是受垃圾回收机制是否运行的影响。运行前后成员的个数可能是不一致的。