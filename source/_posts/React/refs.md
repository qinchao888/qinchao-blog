---
title: ref使用
categories: 
- React
---

### class组件

使用React.createRef创建，使用 .current 属性访问

ref 的值根据节点的类型而有所不同：

1. 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
2. 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
3. 你不能在函数组件上使用 ref 属性，因为他们没有实例。可以使用 forwardRef 或 将该组件转化为 class组件。

[摘自](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#gatsby-focus-wrapper)

#### 例1

```tsx
interface ITestProps {
  // ...
}
interface ITestState {
  // ...
}

class Test extends React.Component<ITestProps, ITestState> {

  myRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount () {
    console.log('ref', this.myRef.current); // <div>1111</div>
  }

  render () {
    return (
      <div ref={this.myRef}>1111</div>
    )
  }
}
```

#### 例2

```tsx
import React from 'react'

interface IChildCProps {
  name: string;
}

class ChildC extends React.Component<IChildCProps, {}> {
  constructor (props: IChildCProps) {
    super(props);
  }

  render () {
    return (
      <div className="child-c">this is child Class Component</div>
    )
  }
}

class RefDemo extends React.Component {
  myRef: React.RefObject<ChildC> = React.createRef();

  componentDidMount () {
    console.log('ref', this.myRef.current); // ChildC的实例：ChildC {props: {…}, context: {…}, refs: {…}, updater: {…}, _reactInternals: FiberNode, …}
    console.log('name', this.myRef.current?.props.name); // childc
  }

  render () {
    return (
      <div>
        <ChildC ref={this.myRef} name="childc" />
      </div>
    )
  }
}
```

#### 例3

```tsx
import React from 'react'

interface IChildFCProps {
  ref: React.Ref<HTMLDivElement>;
}
  
const ChildFC: React.FC<IChildFCProps> = (props) => {
  return (
    <div className="child-fc">this is child Function Component</div>
  )
};

class RefDemo extends React.Component {
  myRef: React.RefObject<any> = React.createRef();

  render () {
    return (
      <div>
        <ChildFC ref={this.myRef} />
        {/* Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()? */}
      </div>
    )
  }
}

export default RefDemo;
```

#### 例4

```tsx
import React from 'react'

interface IChildFProps {
  ref: React.Ref<HTMLDivElement>;
}

const ChildF: React.FC<IChildFProps> = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <div ref={ref} className="child-f">this is child Function Component</div>
  )
});

class RefDemo extends React.Component {
  myRef: React.RefObject<any> = React.createRef();

  componentDidMount () {
    console.log('ref', this.myRef.current); // <div className="child-f">this is child Function Component</div>
  }

  render () {
    return (
      <div>
        <ChildF ref={this.myRef} />
      </div>
    )
  }
}

export default RefDemo;
```

#### 回调 refs

```jsx
// 字符串类型的ref（存在性能问题，已过时）
class Demo extends React.Component {
  handleBlur =  () => {
    console.log(this)
    const inputEl = this.refs.input
    console.log(inputEl)
  }
  render () {
    return (
      <div>
        <input onBlur={this.handleBlur} type="text" ref="input" />
      </div>
    )
  }
}

// 回调函数ref
class Demo extends React.Component {
  handleBlur =  () => {
    console.log(this.inputEl)
  }
  render () {
    return (
      <div>
        <input onBlur={this.handleBlur} type="text" ref={e => this.inputEl = e} />
      </div>
    )
  }
}

// class的绑定函数
class Demo extends React.Component {
  saveInput = (e) => {
    this.inputEl = e
  }
  render () {
    return (
      <div>
        <input onBlur={this.handleBlur} type="text" ref={this.saveInput} />
      </div>
    )
  }
}
```

回调函数ref：初始渲染时会执行一次，重新render时会触发两次，一次传递的是null，一次传递的是当前元素节点，传递null的目的是为了清空之前的节点。如果使用class的绑定函数则只会在初始渲染时执行一次。（内联回调函数使用的更多）

### 函数式组件

使用 useRef 创建

```tsx
import React, { useEffect, useRef } from 'react'

const RefDemo: React.FC<{}> = () => {

  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('ref', myRef.current); // <div>this is React Function Component</div>

  }, []);

  return (
    <div ref={myRef}>this is React Function Component</div>
  );
};

export default RefDemo;
```