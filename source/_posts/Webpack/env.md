---
title: Webpack环境变量
categories: 
- Webpack
---

## process.env.NODE_ENV

在node进程中存在一个全局变量process，其中process.env包含着系统环境的一些信息，而NODE_ENV则是用户自定义的一个变量，用来标识当前运行的环境。

### 命令行配置环境变量

```sh
# windows
set NODE_ENV # 查看值
set NODE_ENV=production # 设置值
set NODE_ENV= # 删除环境变量

# mac
echo $NODE_ENV # 查看值
export NODE_ENV=production # 设置值
unset NODE_ENV # 删除环境变量
env # 查看所有的环境变量
export -p # 查看所有的环境变量
```

注：当使用npm install –production或者注明NODE_ENV为production时，只会下载dependencies中的模块


### webpack配置

webpack.DefinePlugin的作用：在编译时进行字符串替换。即将运行时代码中的process.env.NODE_ENV全部替换成对应的值。

```js
// webpack.config.js
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
})
/**
 * 'process.env.NODE_ENV': JSON.stringify('production')
 * 即：需要使用 "'production'"这个写法，需要多加一层引号，
 * 因为DefinePlugin会直接把引号内的值作为内容进行替换，如果不加，则变成了一个变量，引发错误
 */
```

```json
// package.json
"scripts": {
  "start": "NODE_ENV=development webpack serve --config ./webpack.config.js",
  "build": "NODE_ENV=production webpack --config ./webpack.config.js"
}
```

```js
// 例:
// webpack.config.js
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
})
// index.js
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
// 编译后
console.log("process.env.NODE_ENV","production")
```
### cross-env

为了解决windows不支持NODE_ENV=development这种设置方式

```json
// package.json
"scripts": {
  "start": "cross-env NODE_ENV=development webpack serve --config ./webpack.config.js",
  "build": "cross-env NODE_ENV=production webpack --config ./webpack.config.js"
}
```

### 使用.env文件配置环境变量

使用dotenv插件来加载.env配置文件，本质上是读取文件内容，将值设置到process.env上

当需要使用变量时，此时使用dotenv-expand插件即可，会自动解析为已声明的环境变量的值

```js
// .env
TEST="this is a test env"
VALUE=$TEST

// test.js
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(dotenv.config())
console.log(process.env)

// node test.js
{
  TEST: 'this is a test env',
  VALUE: 'this is a test env'
}
```

```js
const dotenv = require('dotenv')
const env = dotenv.config()
console.log(env)
// { parsed: { TEST: 'this is a test env', VALUE: '$TEST' } }

const dotenvExpand = require('dotenv-expand')
const dotenv = {
  parsed: {
    PASSWORD: '123456'
  }
}
const env = dotenvExpand.expand(dotenv)
console.log(env)
// { parsed: { PASSWORD: '123456' } }
```

[参考链接1](https://www.jianshu.com/p/f4638f5df1c7)