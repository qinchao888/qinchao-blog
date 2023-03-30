---
title: Promise
categories: 
- JavaScript
---

### Promise实现阻塞

```ts
export const fn: {
  promise?: Promise<void>
  resolver?: (value: void | PromiseLike<void>) => void
} = {}

fn.promise = new Promise(resolve => {
  fn.resolver = resolve
})

// 使用
...
fn.resolver()
...

// 阻塞
await fn.promise
...
```