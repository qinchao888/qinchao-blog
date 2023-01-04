---
title: less
categories: 
- Css
---


### :global和:local

```less
:global {
  :local(.child).parent {
    color: red;
  }
}

/* 编译后 */
.index--child--1HzEb.parent {
  color: red
}
```