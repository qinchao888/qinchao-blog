---
title: Webpack配置
categories: 
- Webpack
---

## bail

设置为true时，打包过程中出现错误将迫使 webpack 退出其打包过程

## devtool

1. inline：sourcemap内联到文件中，文件体积很大
2. hidden：会生成.map文件，但是打包后的代码中没有sourceMappingURL
3. eval：用eval 包裹每个模块打包后代码以及对应生成的sourcemap，因为 eval 中为字符串形式，所以当源码变动时rebuild的速度更快
4. nosources：sourcemap中不包含 sourcesContent 内容，因此调试时只能看到文件信息和行信息，无法看到源码。
5. cheap-[module-]：sourcemap的代码定位只会定位到源码所在的行，不会定位至具体的列，所以构建速度有所提升。如果只用 cheap ，显示的是 loader 编译之后的源代码，加上 module 后会显示编译之前的源代码。

hidden-source-map: 会生成.map文件，但是打包后的代码中没有sourceMappingURL，即请求代码时浏览器不会加载.map文件，控制台中看不到源代码。常用于错误收集等场景，前端最终不保留.map文件。

推荐设置：
1. production: hidden-source-map
2. development: eval-cheap-module-source-map

注：If the default webpack minimizer has been overridden (such as to customise the terser-webpack-plugin options), make sure to configure its replacement with sourceMap: true to enable SourceMap support.

```js
optimization: {
  minimize: isEnvProduction,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2,
          drop_console: isEnvProduction,
        },
        mangle: {
          safari10: true,
        },
        keep_classnames: isEnvProductionProfile,
        keep_fnames: isEnvProductionProfile,
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
        sourceMap: true, // 此处需要开启sourcemap
      },
    }),
  ],
}
```

[参考](https://juejin.cn/post/6960941899616092167)

## devServer

### compress

true：开启gzip压缩

### contentBase和contentBasePublicPath

本地资源的访问地址

### historyApiFallback

单页应用一般只有一个index.html文件，导航的跳转都是基于HTML5 History API，当用户在越过index.html 页面直接访问这个地址或是通过浏览器的刷新按钮重新获取时，就会出现404问题。

作用：改变请求的地址，指向到默认的index.html

## output

### pathinfo

在输出的bundle中是否包含所属模块信息的注释，默认值production为false，development为true

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    pathinfo: true, // 包含注释
    filename: '[name].bundle.js',
    clean: true,
  },
  optimization: {
    minimizer: [
      /** 
       * 默认注释会输出到单独的文件：main.bundle.js.LICENSE.txt 中
       * 配置后将输出到：main.bundle.js 中
       */
      new TerserPlugin({
        extractComments: false,
      }
    )],
  },
}
```

### assetModuleFilename

静态资源打包后的名称，一般是图片、icon等

```js
module.exports = {
  output: {
    assetModuleFilename: 'static/media/[name].[hash][ext]',
  }
}
/**
 * 注意1：此hash非webpack每次项目构建的hash，它是由file-loader根据文件内容计算出来的
 * 注意2：此处设置的是 [hash][ext] 而不是 [hash].[ext]，正常情况下设置的应该是 [hash].[ext]，只有此处或设置了type: 'asset'时设置比较特殊
 */


// 单独配置打包后的名称
{
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: imageInlineSizeLimit,
    },
  },
  generator: {
    filename: 'static/media/[name].[hash:8].[ext]',
  },
},
```

### devtoolModuleFilenameTemplate

用于设置sourcemap中.map文件中数组sources的值

## optimization

### runtimeChunk

将包含chunks映射关系的list单独从app.js里提取出来。从app.js中分离出的chunk在app.js内容发生变更时不会随之变化，从而缓存不会失效。每次变更runtimeChunk的hash都会变更

```js
runtimeChunk: {
  name: (entrypoint) => `runtime-${entrypoint.name}`,
},
```

### splitChunks

作用：提取公共代码，防止代码被重复打包

```js
splitChunks: {
  chunks: 'all',
  name: false,
  maxInitialRequests: Infinity,
  minSize: 1000000, // 大于1M拆分为单独chunk
  cacheGroups: {
    defaultVendors: {
      test: /[\\/]node_modules[\\/]/,
    },
  },
},
```

```js
// webpack5.x
cacheGroups: {
  defaultVendors: {
    test: /[\\/]node_modules[\\/]/,
    priority: -10,
    reuseExistingChunk: true,
  },
  default: {
    minChunks: 2,
    priority: -20,
    reuseExistingChunk: true,
  },
},

/**
 * 缓存组默认有两个
 * 一个处理node_modules中的npm包，名称：defaultVendors
 * 一个处理chunk中被复用次数大于两次的module，名称：default
 */
```
#### splitChunks.name

boolean = false function (module, chunks, cacheGroupKey) => string string，生产环境推荐设置为false

1. cacheGroupKey，按缓存组的 key 来分。比如 vendors 或 default，这时，分离的块的名字就是 key 的值，缓存组中的全部模块都被合并到一起。
2. chunks，按所被依赖的 chunks 来分。
3. module，按模块来分。这是最小粒度的分包。会拆分成大量的js文件

## resolve

### extensions

后缀名解析

### fallback

webpack5中在node环境下path是可以使用的，但是在浏览器环境下则不行，原因：其不再提供内置的path、process等polyfill，需要手动添加。

```js
{
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  }
}
// 例：content-disposition包中就需要使用path
// 不设置fallback则会编译失败
var basename = require('path').basename
```


## stats

用来控制webpack打包后输出的打包结果信息

1. normal: 默认值，标准输出
2. errors-only: 	只在发生错误时输出

## target

browserslist：用来查询需要支持的浏览器列表，用于给babel、postcss等转换代码时做参考，判断是否需要降级处理