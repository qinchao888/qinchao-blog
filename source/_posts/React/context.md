---
title: React的Context
categories: 
- React
---

## Context

1. 作用：提供了组件间共享值的方式，不必通过props层层传递
2. 缺点：Provider中的value的变更（浅比较）会导致所有Consumer中的组件重渲染。

### 创建Context

```ts
const MyContext = React.createContext(defaultValue);
// 组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效
```

### 提供值

注：value设置为undefined不会使defaultValue生效

```js
// 当 value 值发生变化时，内部所有消费组件都会重新渲染
<MyContext.Provider value={/* 某个值 */}>
```

### 消费值

方式一：

```js
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

方式二：在class组件中使用

挂载在 class 上的 contextType 属性可以赋值为由 React.createContext() 创建的 Context 对象。此属性可以让你使用 this.context 来获取最近 Context 上的值。你可以在任何生命周期中访问到它，包括 render 函数中。

```js
// 方式一
class MyClass extends React.Component {
  componentDidMount () {
    const value = this.context;
  }
  //...
}

MyClass.contextType = MyContext;

// 方式二，支持static语法
class MyClass extends React.Component {
  static contextType = MyContext;

  componentDidMount () {
    const value = this.context;
  }
  //...
}
```

方式三：hooks使用

```js
const value = useContext(MyContext); // 当value值更新时，该 Hook 会触发重渲染
// 注：调用了 useContext 的组件总会在 context 值变化时重新渲染。
```

### 更新值

```js
const ThemeContext = React.createContext({
  theme: Theme.dark,
  changeTheme: () => {},
});

// 提供
state = {
  theme: Theme.light,
  changeTheme: this.changeTheme,
}

changeTheme = () => {
  this.setState(state => ({
    theme:
      state.theme === Theme.dark
        ? Theme.light
        : Theme.dark,
  }));
};

<ThemeContext.Provider value={this.state}>
  <Content />
</ThemeContext.Provider>

// 消费
<ThemeContext.Consumer>
  {({theme, changeTheme}) => (
    <button
      onClick={changeTheme}
      style={{backgroundColor: theme.background}}>
      Change Theme
    </button>
  )}
</ThemeContext.Consumer>
```

### devtools

```js
// devtools中名称展示
MyContext.displayName = 'MyDisplayName';
```

## 减少context值变化触发重渲染

1. 拆分context，对不需要重复渲染的那个模块仅使用对应的那部分Context
2. 增加一个中间组件，将渲染的组件使用memo缓存起来
3. 将组件的render返回值使用useMemo包裹

```js
// 方式一
function Button() {
  let theme = useContext(ThemeContext);
  // The rest of your rendering logic
  return <ExpensiveTree className={theme} />;
}

// 方式二
function Button() {
  let appContextValue = useContext(AppContext);
  let theme = appContextValue.theme; // Your "selector"
  return <ThemedButton theme={theme} />
}

const ThemedButton = memo(({ theme }) => {
  // The rest of your rendering logic
  return <ExpensiveTree className={theme} />;
});

// 方式三
function Button() {
  let appContextValue = useContext(AppContext);
  let theme = appContextValue.theme; // Your "selector"

  return useMemo(() => {
    // The rest of your rendering logic
    return <ExpensiveTree className={theme} />;
  }, [theme])
}
```

[详见](https://github.com/facebook/react/issues/15156)



## 组件组合

可以用来减少props的层层传递的数量

```js
<Level1 name={name} age={age} />
// 渲染出
<Level2 name={name} age={age} />
// 渲染出
<Level3 name={name} age={age} />
// 渲染出
<div>{name}: {age}</div>
```

```js
// 替代方案
const Level1 = (props) => {
  const { name, age } = props;
  const com = (<div>{name}: {age}</div>)
  return (<Level2 com={com} />);
}

<Level2 com={com} />
<Level3 com={com} />
// 渲染出
{ props.com }
```