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
// function组件用法1
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

// function组件用法2
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
