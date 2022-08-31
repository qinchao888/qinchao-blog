---
title: plugin
categories: 
- plugin
---

### @svgr/webpack

```js
// 注意：此处的写法需要禁用eslint的校验
// eslint-disable-next-line import/no-webpack-loader-syntax
import { ReactComponent as Logo } from '@svgr/webpack!../../../logo.svg';
```

将svg图片作为组件引入

svg图片需要经过 file-loader 和 @svgr/webpack loader的处理

```js
// webpack5+
// webpack.config.js
{
  test: /\.(svg)$/i,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 4 * 1024, // 4kb
    },
  },
},
```

```ts
// src/react-app-env.d.ts
// ts声明
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGProps<
  SVGSVGElement>>;
  export default content;
}
```

```js
// config/webpack.config.js
{
  test: /\.svg$/,
  use: [
    {
      loader: require.resolve('@svgr/webpack'),
      options: { icon: true }, // 将icon的单位转化为em，使其可以通过设置fontSize控制大小
    }
  ]
},
```

```tsx
// 使用
import Plus from '$assets/plus.svg';

<Plus style={{fontSize: '40px', color: 'red'}} fill="currentColor" />

// fill="currentColor"设置后，可以通过上下文的color设置icon的颜色，前提是icon图片的颜色固定，即原svg的fill="none"或fill="currentColor"
```