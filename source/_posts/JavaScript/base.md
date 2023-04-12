---
title: 基础知识
categories: 
- JavaScript
---

### 对象属性的无序

不混用数值类型和字符串类型，在chrome和safari中使按照数值类型的key升序排列。

```js
var obj = {
  name: 'abc',
  3: 'ccc',
  age: 23,
  class: 'first',
  hobby: 'basketball'
};
console.log(Object.keys(obj));
// ["3", "name", "age", "class", "hobby"]
```

Property order is predictable in JavaScript objects since ES2015:

1. 数字或者字符串类型的数字当作key时，输出是按照升序排序的
2. 普通的字符串类型的key，就按照定义的顺序输出
3. Symbols也是和字符串类型的规则一样
4. 如果是三种类型的key都有，那么顺序是 1 -> 2 -> 3

[参考](https://juejin.cn/post/6932494622661083150)

### 继承

```js
function Animal() {}
function Dog () {}

// 继承
// 实现 dog instanceof Animal
// 等价于实现 dog.__proto__...__proto__ = Animal.prototype
Dog.prototype = Object.create(Animal.prototype)


Object.defineProperties(Animal.prototype, {
  name: {
    value() {
      return 'Animal';
    },
  },
  say: {
    value() {
      return `I'm ${this.name()}`;
    }
  }
})

Dog.prototype = Object.create(Animal.prototype)
console.log(new Dog().say()) // I'm Animal

// 现在实现 new Dog().say() 输出的是 I'm Dog
Dog.prototype = Object.create(Animal.prototype, {
  constructor: { // 注意此处的contructor的指向
    value: Dog,
    enumerable: false,
  }, 
  name: {
    value() {
      return 'Dog';
    }
  }
})
console.log(new Dog().say()) // I'm Dog
```