---
title: TypeScript常用语法
categories: 
- TypeScript
---

## 基础

1. 类型注解：用来约束函数或变量，指定变量的类型，函数参数类型，函数返回值类型等。
2. ts错误，编译时仍旧能生成编译后的代码，只是ts会提示警告。
3. type：类型别名

```ts
// 数组的定义方式
// 方式一
let list: number[] = [1, 2, 3];

// 方式二
let list: Array<number> = [1, 2, 3];
```

```ts
// 类型谓词
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}
```

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

```ts
// 使用key in指定多个可选类型
interface Data {
    name: string;
    value: string;
}

type PersonType = {
  [key in
    | 'name'
    | 'age'
    | 'year'
  ]?: Data
}
/*
等价于：
type PersonType = {
  name?: Data | undefined;
  age?: Data | undefined;
  year?: Data | undefined;
}
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

### filter(Boolean)

```ts
// 不能推断出真实的数据类型
var s = [1, null, false].filter(Boolean) // var s: (number | boolean | null)[]

// 解决办法
s.filter((val): val is number => Boolean(val)) // var s: number[]
```

### is 和 as

is：类型保护

as：类型断言

### declare

用于声明全局变量

```ts
// index.d.ts
export declare const Status: ['small', 'normal', 'large'];
export interface Props {
  status: typeof Status[number]; // "small" | "normal" | "large"
}

// index.ts
export const Status = ['small', 'normal', 'large'] as const
export interface Props {
  status: typeof Status[number]; // "small" | "normal" | "large"
}
```

### keyof typeof 的理解

用法：一般用于指定类型为对象的属性名。 先用typeof将对象转化成typescript类型，在使用keyof表示值是转化后的对象的key。

```typescript
// 例1：
var obj = {
  a: 11,
  b: 'aa',
}

/*
type obj = {
    a: number;
    b: string;
}
*/
type objType = typeof obj;

type objKeyType = keyof typeof obj; // type s = "a" | "b"

// 例2：
const IconMaps = {
  avatar: '',
  close: 10,
};

type IconName = keyof typeof IconMaps; // type IconName = "avatar" | "close"
```

```ts
const a = 'Year';
const obj = {
  Name: 'name',
  Age: 'age',
};
var s: string = obj[a as keyof typeof obj || 'Age']
```

```ts
type Mapish = { [k: string]: boolean }; // 此处的k可以为number或string，如果是number，js会自动将其转化为string类型。
type M = keyof Mapish; // type M = string | number
```

### 类型断言

语法：

1. 变量 as 类型
2. <类型>变量

```ts
// 写法一
let strLength: number = (<string>someValue).length;

// 写法二（jsx中只能使用as语法）
let strLength: number = (someValue as string).length;
```

```ts
ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
// 或者
ReactDOM.render(<App />, document.getElementById('root')!)
// !写法表示会从前面的表达式中移除null和undefined，即：非空断言

type T = null | undefined | string;
var s = null;
var t: T = s!; // Variable 's' implicitly has an 'any' type，即：此时的t类型只能是string类型
```

### Object类型

1. 允许赋值为任意类型的变量
2. 调用的方法只能是Object类型上存在的方法

```ts
let o: Object = 4; // ok
o.test(); // Property 'test' does not exist on type 'Object'.
```

### enum

枚举，双向映射

```ts
enum Test {
  a,
  b,
}

console.log(Test.a, Test.b, Test[Test.a], Test[Test.b]); // 0 1 a b

```

```ts
// 枚举成员可以是纯数值,纯字符串,混合三种情况
enum data {
  a = 'string',
  b = 1
}

console.log(data['a'], data[data['a']], data['b'], data[data['b']]) // string undefined 1 b

// 如果枚举成员是字符串，并不能用字符串值拿到键位值，因为字符串赋值之后不进行反向映射
```

### Record

规范对象的属性名和属性值类型

```ts
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
```

### 接口

1. 同一个变量interface可以重复声明，而type不行。
2. 接口可以在定义类的时候限制类的结构。
3. 接口中所有的属性都不能有实际的值，接口只定义对象的结构，而不考虑实际的值。接口中所有的方法都是抽象方法。


```ts
type myType = {
  name: string;
  age: number;
}

interface myInterface {
  name: string;
  age: number;
}
interface myInterface {
  gender: string;
}

const obj: myInterface = {
  name: 'hello',
  age: 12,
  gender: '男'
}

// 定义类时，可以使类去实现一个接口。即满足接口的要求
interface myInterface2 {
  name: string;
  sayHello(): void;
}

class MyClass implements myInterface2 {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHello() {
    console.log('hello');
  }
}
```

```ts
// 可选属性
interface Person {
  name?: string;
  age?: number;
}

// 只读属性
interface Person {
  readonly name: string;
}
let person: Person = { name: 'a' };
person.name = 'b'; // Cannot assign to 'name' because it is a read-only property

// ReadonlyArray
// 剔除了所有可变方法，保证数组不能再变更
let arr: ReadonlyArray<number> = [1, 2, 3, 4];
// 使用类型断言重写(可编辑)
let newArr = arr as number[];

// 索引签名只读
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let arr: ReadonlyStringArray = ['a', 'b']
arr[0] = 'c' // Index signature in type 'ReadonlyStringArray' only permits
```

readonly和const：作为变量使用const，作为对象的只读属性使用readonly。

#### 传递interface中未定义的属性

```ts
interface Person {
  name: string;
}

let person: Person = { name: 'a', age: 10 }; 
// Type '{ name: string; age: number; }' is not assignable to type 'Person'.

// 方式一：使用类型断言绕过检查
let person = { name: 'a', age: 10 } as Person;

// 方式二：添加一个字符串索引签名
interface Person {
  name: string;
  age: number;
  [propName: string]: any;
}

// 注意此处不能写成：原因：age属性无法满足即是number又是string类型
interface Person {
  name: string;
  age: number;
  [propName: string]: string;
}

// 方式三：利用重新赋值的方式绕过检查
let person1 = { name: 'a', age: 10, hobby: 1 }; 
let person2: Person = person1;
```

#### interface定义函数

```ts
interface Func {
  (name: string, age: number): string;
}

let myFunc: Func = function (n: string, a: number) {
  return `name: ${n} and age: ${a}`;
}
// 函数的参数名不需要与接口里定义的名字相匹配，只要求对应位置上的参数类型兼容
```

#### 索引签名

```ts
interface StringArray {
  [index: number]: string;
}

let arr: StringArray = ['a', 'b']; // 表示使用index获取的值是string类型
```

#### implements

接口只描述类中的公共部分，不会检查类的私有成员和constructor部分。

```ts
interface ClockInterface {
  time: Date;
}

class Clock implements ClockInterface {
  time: Date;
}
```

#### 接口继承类

当创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）

[参考](https://typescript.bootcss.com/interfaces.html)


### 类

1. 在TypeScript里，成员都默认为public。修饰的属性可以在任意位置访问（修改）。
2. 当成员被标记为private时，修饰的属性只能在类内部进行修改。通过在类中添加方法使得私有属性可以被外部访问。
3. protected可以再子类中访问，但是不能通过子类的实例访问。当一个constructor被标识为protected时，该类将不能被实例化。

```ts
class Test {
  protected constructor () {}
}

new Test() // Constructor of class 'Test' is protected and only accessible within the class declaration
```

```ts
// ts中的setter和getter
class Person {
  _name: string;
  _age: number;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  get name() { // new Person().name获取时触发
    return this._name;
  }

  set name(value: string) { // new Person().name赋值时触发
    this._name = value;
  }
}
```

```ts
class P {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// 等价于

class P {
  constructor(public name: string, public age: number) {}
}
```

#### 抽象类

1. 抽象类做为其它派生类的基类使用，一般不会直接被实例化。（派生类：子类，基类：父类）
2. 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现

```ts
abstract class Parent {
  abstract test(): void;
}

class Child extends Parent {
  test(): void {

  }
}
```

### 函数

```js
// 完整的写法
let fn: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y
}

// 一边指定了类型，另一边没有类型
let fn = function (x: number, y: number): number {
  return x + y;
}

// 一边指定了类型，另一边没有类型
let fn: (x: number, y: number) => number = function (x, y) {
  return x + y;
}

// 函数参数带默认值（写法等同于可选参数?）
let fn: (x: string, y?: string) => string = function (x: string, y = 'a'): string {
  return x + y
}

// rest参数
let fn: (x: string, ...rest: string[]) => string = function (x: string, ...rest: string[]): string {
  return x + rest.join('')
}
```

#### 重载

根据传入不同的参数而返回不同类型的数据

```ts
// 注意：此处只有两个重载
function fn(x: {v1: string; v2: string}[]): string;
function fn(x: number): number;
function fn(x): any {
  if (typeof x === 'object') {
    return Object.keys(x).join('')
  } else {
    return x
  }
} 

fn([{v1: 'a', v2: 'b'}])
fn(11)
```

### 泛型

1. 在定义函数或类时，如果遇到类型不明确就可以使用泛型。
2. 泛型的类型只有在函数运行时才能决定。

```js
function fn<T>(a: T): T { // <T> 表示定义，只有定义了才可以使用

}
fn(10); // 不指定泛型，TS可以自动对类型进行推断
fn<string>('hello'); // 指定泛型

// 使用多个泛型
function fn<T, K>(a: T, b: K): T { 
  return a;
}

interface Inter {
  length: number;
}
// T extends Inter 表示 T 必须是 Inter 的一个实现类（子类）
function fn<T extends Inter>(a: T): number {
  return a.length;
}
fn('123');
fn(123); // Argument of type 'number' is not assignable to parameter of type 'Inter'
```

创建可重用的组件

```ts
// 如：定义一个函数，传入什么类型的数据就返回什么类型的数据
function fn<T>(arg: T): T {
  return arg;
}

// 使用
// 方式一
let res = fn<string>('string value');

// 方式二
let res = fn('string value'); // 利用类型推论，编译器自动确定T的类型

// 参数为数组并且数组中的值为T
function fn<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}
// 或
function fn<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);
  return arg;
}
```

```ts
// 泛型接口
interface FnInterface {
  <T>(arg: T): T;
}

function fn<T>(arg: T): T {
  return arg
}

let f: FnInterface = fn;

// 把泛型参数当做接口参数（清楚的知道泛型的类型）
interface FnInterface<T> {
  (arg: T): T;
}

function fn<T>(arg: T): T {
  return arg
}

let f: FnInterface<number> = fn;

// 泛型类，泛型类指的是实例部分的类型
class MyTest<T> {
  name: T;
  fn: (name: T) => T;
}

let test = new MyTest<string>();
test.name = 'a';
test.fn = function (name) {
  return name
}
```

#### 泛型约束

```ts
// 使用extends使泛型T可以使用length属性
interface LengthInterface {
  length: number;
}

function fn<T extends LengthInterface>(args: T): T {
  console.log(args.length) // 可以使用length属性
  return args
}
```

```ts
// 确保key是T类型的一个key值，即：确保一个属性名是在当前对象上
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

```ts
// 使用泛型创建工厂函数
function create<T>(c: {new(): T; }): T {
  return new c();
}

// 或
function create<T>(c: new() => T): T {
  return new c();
}
```


### 基础类型

```ts
// 字面量
let a: 10; // a的值只能为10

// 联合类型
let a: 'male' | 'female'; // a的值可以是male或female
a = 'male';
a = 'female';

let a: boolean | string; // a的类型可以为boolean或string

/* any表示任意类型，设置any表示对该变量关闭了ts的类型检测 */
let a: any;

// 声明变量如果不指定类型，那么ts解析器会自动判断变量类型为any（隐式的any）
let a;

/* unknown表示未知类型的值 */
let a: unknown;

/* void表示空，以函数为例表示函数没有返回值 */
function fn(): void {}

/* never表示没有值，即永远不会返回结果 */
function fn(): never {
  throw new Error('this is error');
}

/* object */
let a: {name: string, age?: number}; // 属性名后加一个?表示是可选属性
a = {name: 'hello', age: 20};

// [propName: string]: any表示属性名为字符串类型，并且值为任意类型
let a: {name: string, [propName: string]: any};

/* function */
let a = (a: number, b: number) => number;

/* array */
let arr: string[];
// 或
let arr: Array<string>;

/* 元组tuple: 固定长度的数组 */
let arr: [string, string];

/* 枚举enum */
enum Gender {
  Male, // 0
  Female, // 1
};
/*
等价于
enum Gender {
  Male = 0,
  Female = 1,
};
*/
let p: {name: string, gender: Gender};
p = {name: 'hello', gender: Gender.Male};

// & 表示且
let p: {name: string} & {age: number}; // p既有name属性也有age属性
p = {name: 'hello', age: 18};

// 类型别名
type myType = string;
let m: myType;

type myType = 1 | 2 | 3 | 4 | 5;
let a: myType;
let b: myType;

/* abstract */
/**
 * 抽象类：不能用来创建实例，只能用来被子类继承
 * 抽象方法：定义一个方法的结构，没有方法体，且必须被子类实现
 * 抽象方法只能定义在抽象类中
*/
abstract class Animal {
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  abstract sayHello: void;
}

/* interface: 接口 */

```

### unknown 和 any 的区别

```ts
let a;
a = true;
let b: string;
b = a; // 不会报错，即any类型的值赋值给其他类型的变量时，会影响到其他变量的类型检测

let a: unknown;
a = 'hello';
let b: string;
b = a; // Type 'unknown' is not assignable to type

// unknown其实就是一个类型安全的any
// unknown类型的变量不能直接赋值给其他变量

// 报错的解决方案
let a: unknown;
a = 'hello';
let b: string;

// 方式一
if (typeof a === 'string') { // 显式的判断类型
  b = a;
}

// 方式二
b = a as string; // 类型断言，告诉解析器变量的实际类型

// 或
b = <string>a;
```


### Record

```ts
type AttrType = 'warning' | 'info';

type ValueType = 'blue' | 'red';

const obj: Record<AttrType, ValueType> = {
  warning: 'blue',
  info: 'blue',
}
```

### Omit

```ts
type Props = {
  name: string;
  size: number;
  value: string;
}

interface NewProps extends Omit<Props, 'value'> { // 从props中删除value属性，并使用自己定义的value类型
  value: number | string;
}

let t: NewProps = {
  name: 'a',
  size: 20,
  value: 1 // 可以为string或number类型
};
```

### 将字符串数组转为联合类型

```ts
// 方式一
const arr = ['a', 'b', 'c'] as const;
type Type = typeof arr[number]; // type Type = "a" | "b" | "c"
// [参考](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html)

// 方式二
declare const arr: ['a', 'b', 'c'];
type Type = typeof arr[number]; // type Type = "a" | "b" | "c"
```