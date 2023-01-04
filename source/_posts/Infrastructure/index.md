---
title: 项目基础
categories: 
- project
---

### 需要具备的内容

#### 框架

如：react

#### 路由

1. 如：react-router-dom
2. 全局路由监测（编辑页面切换路由或刷新或后退时的未保存提示）

#### 组件库

#### store

如：react的context或mobx或redux等

#### 埋点

#### 错误上报

#### 国际化

全局语言的设置

#### 构建工具

如：webpack


### antd

#### 产物

1. es：对应esModule版本
2. lib：对应cjs版本
3. dist：编译后的所有内容，如antd.js ,antd.css等

### 按需加载

利用 babel-plugin-import 插件，在babel-loader编译阶段对源代码中的import语法进行转化，通过编译后能直接引入到组件对应的css与js文件实现按需加载。

```tsx
//源代码
import { Button } from 'antd'
//使用babel-plugin-import后，在babel-loader编译阶段会被改为
var _button = require('antd/lib/button');
require('antd/lib/button/style.js');
```

全局样式：Antd的每个组件的样式入口文件中都引入了style/core/global.less文件，所以引入antd的任何组件全局样式都会被加载进来

```js
// webpack.config.js
// antd按需加载配置
{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: paths.appSrc,
  use: [
    {
      loader: require.resolve('babel-loader'),
      options: {
        customize: require.resolve(
          'babel-preset-react-app/webpack-overrides',
        ),
        plugins: [
          // ...
          [
            'import',
            {
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: true,
            },
          ],
        ],
      },
    },
  ],
},
```

[参考](https://juejin.cn/post/7007063477541928973)
