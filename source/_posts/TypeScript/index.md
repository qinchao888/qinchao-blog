---
title: TypeScript常用语法
categories: 
- TypeScript
---

### keyof 和 key in

key in 用于取联合类型的值

keyof 是取 对象的键，可以是interface，也可以是type

```ts
interface Person {
  name: string;
  age: number;
}

type Info = keyof Person;
/*
type Info = 'name' | 'age'
*/

type Animal = 'dog' | 'cat' | 'bird';

type Test1 = {
  [key in Animal]: {
    weight: string;
    age: number;
  };
};

/*
type Test1 = {
  dog: {
    weight: string;
    age: number;
  };
  cat: {
    weight: string;
    age: number;
  };
  bird: {
    weight: string;
    age: number;
  };
};
不可使用interface，否则报错：A mapped type may not declare properties or methods
*/

type Test2 = {
  [key in keyof Person]: string[];
};

/*
type Test2 = {
  name: string[];
  age: string[];
};
*/

type TestType = {
  a: string;
  b: number;
};

type T = keyof TestType;

/*
type T = 'a' | 'b'
*/
```

### JSON.stringify

```ts
interface IObj {
  name: string;
  age: number;
}

/**
 * JSON.stringify中的对象无法被识别，因为It's a runtime issue, and type checking is for compile time
 * 所以需要手动指定JSON.parse后的对象的类型，即便JSON.stringify中的对象中的类型存在问题也无法被识别
 */
const obj: IObj = JSON.parse(JSON.stringify({name: '111', age: 2}));
const { name, age } = obj;
```

### document.querySelector

指定类型

```ts
const testEl = document.querySelector<HTMLDivElement>('.test'); // 不指定时类型为HTMLElement
```