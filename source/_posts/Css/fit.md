---
title: rem适配
categories: 
- Css
---

### rem适配

[参考](https://github.com/amfe/lib-flexible)

一般设置rem时需要根据设计稿的px进行计算，将其转化为rem，转化方式一般为：calc(val * 10 / 375)

如：200px -> calc(200rem * 10 / 375) 或 calc(200 * 10 / 375 * 1rem)，注：* 和 / 时calc中可以不保留空格，但是在进行 + - 时，数值间必须保留空格

在less中使用javascript

```js
// webpack.config.js
// webpack5.0
{
  loader: 'less-loader',
  options: {
    lessOptions: {
      javascriptEnabled: true
    }
  }
}
```

```less
.remMixin() {
  @functions: ~`(function() {
    this.rem = function(size) {
      return size * 10 / 375 + 'rem';
    }
  })()`;
}

.remMixin();

/* 使用 */
.width {
  width: ~`rem(375)`;
}
```