---
title: useState
categories: 
- React
---

### useState 和 setState 的区别

1. useState更新 state 变量时是替换它，而setState则是合并。

### setState

组件内调用 setState 并不会立即执行重渲染。相反，React 会先触发所有的事件处理器，然后再触发一次重渲染以进行所谓的批量更新。

```tsx
function Parent() {
  let [count, setCount] = useState(0);
  return (
    <div onClick={() => setCount(count + 1)}>
      Parent clicked {count} times
      <Child />
    </div>
  );
}

function Child() {
  let [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Child clicked {count} times
    </button>
  );
}

/**
 * click child 时，child只会渲染一次，
 * 即：渲染parent -> 渲染child
 * 而不是：渲染child -> 渲染paren -> 再渲染child，从而避免了child不必要的重复渲染
*/
```

```tsx

const [count, setCount] = useState(0);

function handleClick() { // 多次setCount，count值为1，解决办法 setCount(c => c + 1)
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}

```