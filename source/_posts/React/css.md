---
title: React Css
categories: 
- React
---

## styleName

使用 react-css-modules 识别页面上设置的styleName，可配置将其解析成hash形式

### 当做组件的props传递

```tsx
import './index.less';
//...
<Test styleName="test">
// 经过 react-css-modules 编译成了一个字符串作为className传递给子组件
```

```tsx
// Test.tsx
// 使用 props.className接收组件的styleName
import React, { FC } from 'react'

interface TestProps {
  styleName?: string; // 用于识别ts
  className?: string;
}

const Test: FC<TestProps> = (props) {
  const { className } = props;

  return (
    <div className={className}>this is a test example</div>
  )
}
```