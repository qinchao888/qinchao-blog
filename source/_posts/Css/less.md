---
title: less
categories: 
- Css
---

### :global

使用 :global 声明的类名不会被编译成哈希字符串

```less
// index.module.less
.container {
  :global {
    .title {
      color: red;
    }
  }
}

// 编译后
.container--1vUTO .title {
  color: red;
}
```


```less
/* 定义单个选择器 */
:global(.ud__form__item__control) {
  padding-right: 30px;
}

/* 定义多个选择器 */
:global {
  .ud__form__item__control, .ud__form__item__label {
    padding-right: 30px;
  }
}
```

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

### :local

使用 :local 声明的类名会被编译成哈希字符串


### 生成指定的样式

```less
.spaces() {
  0: 0px;
  5: 5px;
  6: 6px;
  8: 8px;
  10: 10px;
  20: 20px;
  30: 30px;
  32: 32px;
  40: 40px;
}
.directions() {
  left: l;
  right: r;
  top: t;
  bottom: b;
}
.names() {
  padding: p;
  margin: m;
}

// standard spacers
// example: .mb-30, .pb-30
each(.names(), .(@nv, @nk) {
  each(.directions() .(@dv, @dk) {
    each(.spaces(), .(@sv, @sk) {
      .@{nv}@{dv}-@{sk} {
        @{nk}-@{dk}: @sv!important;
      }
    });
  });
});
```

### @import 和 @import (reference)

reference: use a Less file but do not output it

```json
"scripts": {
  "build": "lessc style.less style.css"
}
```

```less
/* source.less */
@body-color: red;

p {
  color: skyblue;
}

div {
  color: pink;
}
```

```less
/* style.less */
@import './source.less';

body {
  color: @body-color;
}

p {
  color: red;
}

/* 编译后 style.css */
p {
  color: skyblue;
}
div {
  color: pink;
}
body {
  color: red;
}
p {
  color: red;
}
```

```less
/* style.less */
@import (reference) './source.less';

body {
  color: @body-color;
}

p {
  color: red;
}

/* 编译后 style.css */
body {
  color: red;
}
p {
  color: red;
}
```
[参考](https://less.bootcss.com/features/#import-at-rules)
