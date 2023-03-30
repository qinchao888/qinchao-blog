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

### useReducer

使用场景：当state特别多时，并且相互依赖时使用。可以使代码逻辑更加清晰。

1. reducer函数每次返回的是一个新的state
2. react在比较oldState和newState的时候是使用Object.is函数，即对于不同对象则触发更新
3. 使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数，每次render时，回调函数都会变化，会触发子组件更新，除非使用 useCallback，而 dispatch 则不会触发子组件更新。

```tsx
// 示例
const initState = {
  count: 0,
}

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'increment':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'decrement':
      return {
        ...state,
        count: state.count - 1,
      }
    case 'target':
      return {
        ...state,
        count: payload.count,
      }
    default:
      return state
  }
}

const Test: FC = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  const { count } = state
  
  return (
    <>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'target', payload: { count: 5 }})}>设置为5</button>
      <div>{count}</div>
    </>
  )
}
```

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