---
title: React基础知识
categories: 
- React
---

### ReactDOM.render 和 ReactDOM.createPortal的区别

1.ReactDOM.render(element, container[, callback])

element：React元素
container：dom元素
callback：回调函数，该回调将在组件被渲染或更新之后被执行

2.ReactDOM.createPortal(child, container)

child：React元素
container：dom元素

区别：使用render渲染元素，点击元素时事件不会冒泡到根元素上，而使用createPortal渲染元素，点击元素时，包裹该元素的父级元素可以捕获到该点击事件。

### UI更新的方式

1. setState
2. context变更
3. 调用forceUpdate，hooks中使用如下代码

```js
const [, updateState] = React.useState();
const forceUpdate = React.useCallback(() => updateState({}), []);
```

4. props的变更
5. 直接操作dom

### Suspense

一般配合 React.lazy 使用，异步加载组件时展示loading态，即异步组件未加载完成时展示fallback中的内容。本质上是通过import异步函数将组件加载完成后，在.then中设置loading为false再展示异步的组件，否则展示loading组件（可参考：npm：react-loadable）

```js
const Test = lazy(() => import('./Test'))

function App() {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <Test />
      </Suspense>
    </div>
  );
}
```