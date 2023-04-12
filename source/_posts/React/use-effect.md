---
title: useEffect
categories: 
- React
---

[参考](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

1. React中每次state的变更都会触发重新渲染，每次组件重新渲染，组件内容的状态都是独立的，即在第一次渲染时使用setTimeout输出的状态的值是不受第二次渲染改变的状态的值的影响。例：

```js
function Counter() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count); // 3
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}
/** 
 * 操作步骤
 * 1. 点击增加counter到3
 * 2. 点击一下 “Show alert”
 * 3. 点击增加 counter到5并且在定时器回调触发前完成
*/
```

2. 在任意一次渲染中，props和state是始终保持不变的。当然需要在我们都同意应该避免直接修改state这个前提下。通过调用setSomething(newObj)的方式去生成一个新的对象而不是直接修改它是更好的选择，因为这样能保证之前渲染中的state不会被污染。

3. React会记住你提供的effect函数，并且会在每次更改作用于DOM并让浏览器绘制屏幕后去调用它。

4. 有时候你可能想在effect的回调函数里读取最新的值而不是捕获的值。最简单的实现方法是使用refs。

5. React只会在浏览器绘制后运行effects。这使得你的应用更流畅因为大多数effects并不会阻塞屏幕的更新。Effect的清除同样被延迟了。上一次的effect会在重新渲染后被清除


### 依赖项的正确使用

```js
const StudyDemo = () => {
  const [count, setCount] = useState(0);
  
    // 情形1：
    // count值只会变更一次，因为依赖项为[]，只会执行一次，而count值每次都是0，所以每次执行的都是setCount(0 + 1)
    // useEffect(() => {
    //   const id = setInterval(() => {
    //     setCount(count + 1);
    //   }, 1000);
    //   return () => clearInterval(id);
    // }, []);

    // 情形2：
    // 添加了依赖项count，可以正常运行，缺点：每次定时器都需要重建和销毁
    // useEffect(() => {
    //   const id = setInterval(() => {
    //     setCount(count + 1);
    //   }, 1000);
    //   return () => clearInterval(id);
    // }, [count]);
  
    // 情形3（推荐）：
    // 只会执行一次，不需要关注count值，只需告诉react去递增状态，即执行c => c + 1。
    useEffect(() => {
      const id = setInterval(() => {
        setCount(c => c + 1);
      }, 1000);
      return () => clearInterval(id);
    }, []);

    return <h1>{count}</h1>;
};
```