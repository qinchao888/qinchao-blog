---
title: 常用的npm包
categories: 
- package
---

### open和opener

自动打开浏览器

### chalk

命令行着色

### is-root

判断是否有sudo权限

```js
export default function isRoot() {
	return process.getuid && process.getuid() === 0;
}
```

### detect-port和detect-port-alt

检测可用端口，本质上也是通过开启端口服务进行检测，无法开启时端口号+1，成功则调用回调函数，传入当前成功的端口号。

注意：这两个参数使用方式有所不同，detect-port-alt为1.1.6版本，是detect-port的某个老版本的代码

### semver

一个处理version的工具
