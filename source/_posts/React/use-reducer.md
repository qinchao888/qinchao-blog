---
title: useReducer
categories: 
- React
---

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
