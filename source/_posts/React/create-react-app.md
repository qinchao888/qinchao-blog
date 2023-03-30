---
title: create-react-app
categories: 
- React
---

## start.js分析

### unhandledRejection

```js
/**
 * 触发时机
 *  Promise 被 reject 且没有 reject 处理器的时候，会触unhandledRejection
*/
process.on('unhandledRejection', err => {
  throw err;
});
```

### clearConsole

清空命令行

```js
// https://github.com/facebook/create-react-app/blob/main/packages/react-dev-utils/clearConsole.js
function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
  );
}
```

###  其他

```js
process.stdout.isTTY // 确定Node.js是否在终端上下文中运行

process.exit(0) // 正常运行程序并退出程序
process.exit(1) // 非正常运行导致退出程序，Uncaught Fatal Exception
```

## env.js分析

```js
// 在 nodejs 中，require('xxx') 的背后逻辑首先会在 require.cache 中查找，如果缓存已经存在就返回缓存的模块，否则再去查找路径并实际加载，并加入缓存。
// 保证其他模块引用paths文件时，该文件中能重新执行，获取到最新的process.env的值
delete require.cache[require.resolve('./paths')];
```

```js
// 例
// a.js
console.log('this is a')

// b.js
console.log('this is b')
delete require.cache[require.resolve('./a.js')]
require('./a.js')

// index.js
require('./a.js')
require('./b.js')

/**
 * 没有delete时返回：
 *  this is a
 *  this is b
 * 
 * 有delete时返回：
 *  this is a
 *  this is b
 *  this is a
 */
```

## webpackDevServer.config.js分析

### historyApiFallback

单页应用一般只有一个index.html文件，导航的跳转都是基于HTML5 History API，当用户在越过index.html 页面直接访问这个地址或是通过浏览器的刷新按钮重新获取时，就会出现404问题。

作用：改变请求的地址，指向到默认的index.html

### compress

开启gzip压缩

### static

```js
static: {
  directory: paths.appPublic, // 静态资源所在目录
  publicPath: [paths.publicUrl], // 设置静态资源访问的路径
  watch: true, // default value is true，file changes will trigger a full page reload
},
```

## webpack.config.js分支

```js
output: {
  // 默认值production为false，development为true，表示
  pathinfo: isEnvDevelopment,
}
// 静态资源打包后的名称，一般是图片、icon等
assetModuleFilename: 'static/media/[name].[hash][ext]',

// 用于设置sourcemap中.map文件中数组sources的值
devtoolModuleFilenameTemplate
```

### filename和chunkFilename的区别

1. filename 指列在 entry 中，打包后输出的文件的名称
2. chunkFilename 指未列在 entry 中，却又需要被打包出来的文件的名称
