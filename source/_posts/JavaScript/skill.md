---
title: 开发技巧
categories: 
- JavaScript
---

### 使用clip隐藏定位元素

```js
el.style.position = 'fixed';
el.style.top = 0;
el.style.clip = 'rect(0, 0, 0, 0)';
```

### 剔除html元素的换行和空格

```js
htmlText.replace(/>\s+</g, '><').replace(/\r|\n|\r\n/g, '').trim();
```

### 缓存对象

```js
const cacheObj = (cache => thing => {
  const str = Object.prototype.toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

cacheObj({}) // 'object'
cacheObj(new FormData()) // 'formdata'
```