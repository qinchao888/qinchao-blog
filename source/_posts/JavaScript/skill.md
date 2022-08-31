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