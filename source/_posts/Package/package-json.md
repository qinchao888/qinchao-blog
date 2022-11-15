---
title: package.json配置详解
categories: 
- package
---

### peerDependencies(对等依赖)

1. peerDependencies的目的是提示项目中安装满足插件peerDependencies所指定依赖的包，使用时使用的是项目中统一安装的npm包，解决插件与依赖包不一致的问题。如果项目内没有这些包，则会在控制台报黄色警告。
2. dependencies 和 devDependencies 会被 npm 自动安装，而peerDependencies不会(npm4~6版本)
3. npm7之后，所有peerDependency会自动安装，但是如果某个包的peerDependency和项目中同样包的版本冲突，npm7会自动报错


```js
// project
{
  "dependencies": {
    "packageA": "1.x"
  }
}

// packageA
{
  "peerDependencies": {
    "packageB": "1.x"
  }
}

// 因此：project中需要将packageB也作为依赖项，即：
{
  "dependencies": {
    "packageA": "1.x",
    "packageB": "1.x"
  }
}
```

### bin

作用：在使用npm或yarn安装包时，如果文件中有bin字段，就会在node_modules下的.bin目录中复制当前安装包中bin字段中指定的文件。从而在调用执行文件时可以不带路径，直接使用命令名来执行对应的执行文件。

#### 设置软链

1. 创建一个项目node-test，执行npm init -y
2. package.json添加内容："bin": "./bin/index.js"（此时以name属性作为命令名称）

```json
{
  "name": "node-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "bin": "./bin/index.js",
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

3. 添加内容（需要设置#!/usr/bin/env node表明其是一个可执行文件）

```js
#!/usr/bin/env node

console.log(process.argv)
```
4. 设置软链到全局：npm link（在当前目录下执行）
5. 命令行输入：node-test 即可看到对应的内容

```sh
# 设置软链
npm link [<@scope>/]<pkg>[@<version>]

# 查看当前设置的软链
npm list -g --depth=0 # node-test@1.0.0 -> /Users/****/node-test

# 取消软链
npm unlink
```


