---
title: Mobx基础用法
categories: 
- Mobx
---

当前版本："mobx": "^6.6.1", "mobx-react": "^7.5.1"

### react中引入mobx

```sh
yarn add mobx mobx-react
```

使用

```ts
// src/store/index
import { action, observable, makeObservable } from 'mobx';

export class AppStore {
  constructor() {
    makeObservable(this); // 注意: mobx>6版本时需要使用
  }

  @observable
  name: string;

  @action
  setName = () => {
    this.name = Math.random().toString();
    console.log('this.name', this.name);
  }
}

const appStore = new AppStore();
export default appStore;
```

```tsx
// Provider和inject配合使用
// App.tsx
import { RouteObject } from 'react-router';
import { useRoutes } from 'react-router-dom';
import { routes } from './router.config';
import { Provider } from 'mobx-react';
import appStore from '$store/index';

function App() {
  return (
    <Provider appStore={appStore}>
      <div>
        {useRoutes(routes as RouteObject[])}
      </div>
    </Provider>
  )
}

export default App;
```

```tsx
// class组件用法
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import appStore, { AppStore } from '$store/index';

interface IDemoProps {
  appStore?: AppStore;
}

@inject('appStore')
@observer
export default class Demo extends Component<IDemoProps> {
  render () {
    const { appStore } = this.props;
    const { name, setName } = appStore;
    return (
      <div id="container">
        <span>name: { name }</span>
        <button onClick={setName}>setName</button>
      </div>
    )
  }
}
```

```tsx
// Function组件用法1
import React from 'react';
import { observer, inject } from 'mobx-react';
import { AppStore } from '$store/index';

interface IDemoProps {
  appStore?: AppStore;
}

const Demo: React.FC<IDemoProps> = (props) => {

  const { appStore } = props;
  const { name, setName } = appStore;

  return (
    <div id="container">
      <span>name: { name }</span>
      <button onClick={setName}>setName</button>
    </div>
  )
}

export default inject('appStore')(observer(Demo));

// Function组件用法2
import React from 'react';
import { observer } from 'mobx-react';
import appStore from '$store/index';

const Demo: React.FC = () => {

  const { name, setName } = appStore;

  return (
    <div id="container">
      <span>name: { name }</span>
      <button onClick={setName}>setName</button>
    </div>
  )
}

export default observer(Demo);
```

### autorun 和 computed 的区别

1. 都是响应式的调用表达式。
2. 如果需要产生一个可以被其他observer使用的值，使用computed，如果不需要，则使用autorun，即autorun是没有返回值的。

### observable

1. observable: observable.deep的别名

2. observable.deep: 深度监听，即对象中属性的属性变化也可以被检测到

3. observable.shallow: 浅监听，即只监听一层

4. observable.ref: 不监听，只是返回一个数据

## study

### observable

```js
import { observable, isArrayLike } from 'mobx';

// 1. array、object、map
const arr = observable(['a', 'b', 'c']);
console.log(isArrayLike(arr)); // 判断是不是数组类型

const obj = observable({a: 1, b: 2});
// 如果是新增的属性使用：()进extendObservable行观测

const map = observable(new Map());
map.set('a', 1);
console.log(map.has('a')); // true

// 2. 基本数据类型使用 observable.box
var num = observable.box(10);
var str = observable.box('hello');
var bool = observable.box(true);

console.log(num.get(), str.get(), bool.get()) // 10 hello true

num.set(20);
str.set('world');
bool.set(false);

console.log(num.get(), str.get(), bool.get()) // 20 world false
```

```js
class Store {
  @observable array = [];
  @observable obj = {};
  @observable map = new Map();

  @observable num = 10;
  @observable str = 'hello';
  @observable bool = true;
}
/**
 * 此处基本数据类型不需要使用 observable.box
 * 原因：mobx为了简化，observable函数会自动识别其是被当做普通函数调用，还是当做修饰器调用，如果是当做修饰器，则会去识别变量类型，并调用对应的转化方案。
*/
```

### computed

1. 将多个可观察数据组合成一个可观察数据。
2. 可以引用普通可观察数据，也可以嵌套引用其他computed值，但不能有循环引用。

```js
var store = new Store();
var foo = computed(function () {
  return store.str + '/' + store.num;
});
console.log(foo.get()); // hello/10

// 监听数据的变化
foo.observe(function(change) {
  console.log(change); // change存储变化前后的数据，oldValue和newValue
});

store.string = 'world';
store.num = 20;
```

```js
class Store {
  @observable array = [];
  @observable obj = {};
  @observable map = new Map();

  @observable num = 10;
  @observable str = 'hello';
  @observable bool = true;

  @computed get mixed() {
    return store.str + '/' + store.num;
  }
}

var store = new Store()

autorun(() => {
  console.log(store.mixed);
})
```

### autorun

可以自动追踪所引用的可观察数据，并在数据发生变化时触发。一开始就会触发一次。

### when

1. 接收两个函数参数，参数一：根据可观察数据返回一个布尔值，当为true时执行第二个函数。
2. 参数一必须为可观察数据，不能是普通变量，如果为普通变量，参数二将不会被执行。
3. 如果参数一一开始为true，则立即执行。

```js
var store = new Store()

when(() => store.bool, () => {
  console.log('its true');
});

store.bool = true;
```

### reaction

接收两个函数参数，当第一参数的可观察数据发生变化时，执行第二个函数。

用法：没有数据时不去调用缓存的逻辑，当有数据时调用缓存。

```js
reaction(() => [store.str, store.num], arr => console.log(arr.join)('/')); // hello/10

store.str = 'world';
store.num = 20;
// world 10
// world 20
```

### action

操作了observable观测的状态的值时需要使用action，只执行查找，过滤则不需要使用。

autorun 和 reaction 存在的问题：如果依赖的值过多，每次依赖的可观察数据发生变化就会触发，多数情况下这种高频的触发是没有必要的。因此mobx提供了action，将多次变更合并成一次，从而减少autorun和reaction执行的次数。

```js
...
@action bar() {
  this.str = 'world';
  this.num = 20;
}
...

reaction(() => [store.str, store.num], arr => console.log(arr.join)('/')); // 只会执行一次
store.bar();
```

action.bound: 强制修改上下文的this为当前的对象

```js
@action.bound bar() {
  this.str = 'world';
  this.num = 20;
}

var bar = store.bar;
bar(); // hello/10
```

runInAction: 定义一个匿名的action方法，并运行。如果需要多次调用则使用action，否则使用runInAction即可。

```js
runInAction(() => {
  this.str = 'world';
  this.num = 20;
});
```

### 提升性能法则

1. 细粒度拆分组件
2. 使用专用组件处理列表
3. 尽可能晚的解构可观察数据（原因：涉及到可观察数据的地方，当数据变化时就会触发重渲染）

本质上：将可观察数据归到子组件中，只使其发生重渲染，而不必使其父组件触发重渲染。

可以使用 mobx 提供的 trace 函数观察重渲染次数以及使用 trace(true) 进行debug。