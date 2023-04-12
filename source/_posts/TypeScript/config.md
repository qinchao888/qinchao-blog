---
title: TypeScript配置
categories: 
- TypeScript
---

### tsc

1. 不带任何输入文件的情况下调用tsc，编译器会从当前目录开始去查找tsconfig.json文件，逐级向上搜索父目录。
2. 不带任何输入文件的情况下调用tsc，且使用命令行参数--project（或-p）指定一个包含tsconfig.json文件的目录。
3. 当命令行上指定了输入文件时，tsconfig.json文件会被忽略

```sh
# 初始化生成一个tsconfig.json文件
tsc --init

# 指定文件名称时，tsconfig.json配置不会生效
tsc a.ts

# tsconfig.json配置生效
tsc

# tsconfig.json配置生效
tsc -p ./
```

### ts-node

直接在命令行使用ts-node编译ts文件，查看输出结果


```ts
// a.ts
const aa: number = 10
console.log(aa)
```

```sh
# 需要安装 ts-node 和 @types/node
> npm i ts-node -g
> npm i @types/node -D

# 执行
> ts-node a.ts
10
```

### tsconfig.json

```json
{
  "include": [ // 指定哪些文件被编译，**: 表示任意目录，*: 表示任意文件
    "src/**/*"
  ],

  // 指定哪些文件不需要被编译
  // 默认值：["node_modules", "bower_components", "jspm_packages"]
  "exclude": [ 
    "src/test/**/*"
  ],

  // 定义被继承的配置文件
  "extends": "./configs/base", // 会自动包含./configs/base.json中的所有配置信息

  // 指定被编译的文件列表，只有编译很少的文件时用到
  "files": [
    "a.ts",
    "b.ts"
  ],

  // 编译器选项
  "compilerOptions": {
    "target": "es2015", // 指定ts被编译为es的版本，es3|es5|es6|es2015|es2016|es2017|es2018|es2019|es2020|esnext

    /*
    "CommonJS", "AMD", "System", "UMD", "ES6", "ES2015", "ES2020", "ESNext", "None",
    其中 ES6 和 ES2015是一致的，一般使用es2015
    */
    "module": "commonjs", // 指定要使用的模块化的规范

    // 用来指定项目中要使用的库
    "lib": ["dom"], // 例如：在node环境中运行，没有dom，此时需要指定dom，一般来说在浏览器环境不需要指定lib

    // 指定编译后文件所在的目录
    "outDir": "./dist",

    // 将代码合并为一个文件(所有被编译的文件都会被合并到一个文件中)
    // 注意：Only 'amd' and 'system' modules are supported alongside --outFile
    "outFile": "./dist/output.js",

    // 是否对js文件进行编译，默认为false，即不编译
    "allowJs": false,

    // 是否检查js代码是否符合代码规范，默认为false
    "checkJs": false,

    // 是否移除注释
    "removeComments": false,

    // 不生成编译后的文件，默认为false(一般用在：只使用ts检查语法，不生成编译后的文件)
    "noEmit": false,

    // 当有错误时不生成编译后的文件
    "noEmitOnError": false,

    // 编译后的文件是否使用严格模式，默认false
    "alwaysStrict": false, // 如果ts文件中使用了import或export等语法将自动开启严格模式，此时编译后的代码没有添加"use strict";

    // 不允许隐式的any类型
    "noImplicitAny": false, // 开启tslint编写代码时错误将自动显示出来

    // 不允许不明确类型的this
    "noImplicitThis": false,

    // 严格的检查空值
    "strictNullChecks": false,

    // 所有严格检查的总开关
    "strict": false,
  }
}
```

```ts
function fn() {
  console.log(this); // "noImplicitThis": false
}

function fn(a, b) { // "noImplicitAny": false,
  return a + b;
}

// "strictNullChecks": false,
const box = document.getElementById('box');
box?.addEventListener('click', function () {}); // box可能为null，所以写成box?.
```