---
title: Webpack基础知识
categories: 
- Webpack
---

### 基础

webpack是基于node的打包工具，本身只能处理js和json文件。而css、图片等文件则是通过loader转化成webpack可以处理的格式。

### webpack5中path无法使用

webpack 运行在 node.js，因此可以直接使用 node.js 内置的模块，如 fs、path、url 等。而 webpack 打包的 js 文件运行在浏览器上，使用 node.js 内置模块必须先安装

### module和chunk和bundle的区别

我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle

webpack处理文件时会根据文件引用关系生成 chunk 文件，webpack 会对这个 chunk 文件进行一些操作生成bundle。

[参考](https://www.cnblogs.com/skychx/p/webpack-module-chunk-bundle.html)

### filename和chunkFilename的区别

1. filename 指列在 entry 中，打包后输出的文件的名称
2. chunkFilename 指未列在 entry 中，却又需要被打包出来的文件的名称

### hash和contenthash和chunkhash的区别

作用：是否采用浏览器缓存的文件

hash: 和整个项目有关，只有项目中的某个文件发生变更，hash值就会发生变化
contenthash: 和文件的内容有关，内容发生变更，hash值变更
chunkhash: chunk的内容发生变更，hash值变更

### gzip压缩

开发环境下 devServer配置 compress即可开启

生成环境下，前端请求资源时request headers中设置 accept-encoding为gzip，当客户端请求到服务端的时候，服务器解析请求头，如果客户端支持gzip压缩，响应时对请求的资源进行压缩并返回给客户端，在 response headers 中可以看到服务端使用的压缩方式，一般为 gzip 或 br。