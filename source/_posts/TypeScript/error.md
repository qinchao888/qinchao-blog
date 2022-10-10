---
title: TypeScript常见问题
categories: 
- TypeScript
---

### 版本升级

从3.x升级至4.x

```ts
// 4.x中以下代码声明正常，而3.x将会报错
export declare type Test = [
  win: Window,
  document: Document,
  XMLHttpRequest: typeof XMLHttpRequest,
  MutationObserver: typeof MutationObserver,
  performance: Performance
]
```