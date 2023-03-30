---
title: css变量
categories: 
--- Css

### 好处

降低维护成本，有利于文件压缩

### 使用

var( <自定义属性名> [, <默认值 ]? )

1. 语法：CSS中原生的变量定义语法是：--\*，变量使用语法是：var(--\*)，名称不能包含$，[，^，(，%等字符，但是可以为中文。
2. 定义和使用只能在代码块 {} 中。
3. 变量全局使用时，可以设置在 :root 选择器上。

```css
:root {
  --color-red: red
}

body {
  background-color: var(--color-red, blue); /* 当变量 --color-red 不存在时，使用默认值 */
}
```

[参考文档](https://www.zhangxinxu.com/wordpress/2016/11/css-css3-variables-var/)
