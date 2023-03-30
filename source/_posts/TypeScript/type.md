---
title: TypeScript类型
categories: 
- TypeScript
---

## 枚举

### 常量枚举

常量枚举与普通枚举的区别：常量枚举不会为枚举类型编译成任何JavaScript

```ts
// 常量枚举
const enum Color {
  RED,
  PINK,
  BLUE,
}

const color: Color[] = [Color.RED, Color.PINK, Color.BLUE];
console.log(color); //[0, 1, 2]

// 编译后
"use strict";
const color = [0 /* Color.RED */, 1 /* Color.PINK */, 2 /* Color.BLUE */];
console.log(color); //[0, 1, 2]
```

```ts
// 普通枚举
enum Color {
  RED,
  PINK,
  BLUE,
}

const color: Color[] = [Color.RED, Color.PINK, Color.BLUE];
console.log(color); //[0, 1, 2]

// 编译后
"use strict";
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["PINK"] = 1] = "PINK";
    Color[Color["BLUE"] = 2] = "BLUE";
})(Color || (Color = {}));
const color = [Color.RED, Color.PINK, Color.BLUE];
console.log(color); //[0, 1, 2]
```

## null和undefined

1. 默认情况下null和undefined是任何类型的子类型，即可以赋值给其他类型
2. 开启了strictNullChecks后，null和undefined无法赋值给其他类型的变量。（undefined可以赋值给void类型的变量）

```ts
let a: string = 'a'
a = null // ok
a = undefined // ok

// enable strictNullChecks
let a: string = 'a'
a = null // error
a = undefined // error
let b: void
b = null // error
b = undefined // ok
```

## void

主要用于函数上，表明函数的返回值是undefined

## never

表示的是那些永不存在的值的类型，一般用于函数永远不存在返回值（内部抛出异常或代码死循环）

## unknown

1. 与 any 一样，所有类型都可以分配给unknown
2. 只能将 unknown 类型的变量赋值给 any 和 unknown
3. 相比any，unknown更安全。迫使我们执行额外的类型检查来对变量执行操作，即可以使用类型断言的方式表明当前操作的数据类型

```ts
const obj: unknown = {
  a: 11
}

const val1 = (obj as {a: number}).a // ok
const val2 = obj.a // error
```