---
title: 包管理工具
categories: 
- package
---

## npm

### 基础用法

```sh
# 安装指定版本的包
npm install package@version -D
# -S 等价于 --save，安装至dependencies，-D 等价于 --save-dev，安装至devDependencies

# 查看最新版本
npm view package version

# 查看所有版本
npm view package versions

# 更新版本
npm update package -D # 根据版本标识更新，若package.json为^，则无法更新大版本，只能通过npm install重新安装最新版本

# 查看哪些包有更新（npm v6.x）
npm outdated

# 指定别名
npm i aliasname@npm:package # 例：npm i lodash2@npm:loadsh@2.2.1

# 查看全局安装的包
npm list -g --depth 0
```

### 包版本

x.y.z: 第一个数字是主版本、第二个数字是次版本、第三个数字是补丁版本

```js
`^`：只会执行不更改最左边非零数字的更新。 如果写入的是 ^0.13.0，则当运行 npm update 时，
可以更新到 0.13.1、0.13.2 等，但不能更新到 0.14.0 或更高版本。 如果写入的是 ^1.13.0，
则当运行 npm update 时，可以更新到 1.13.1、1.14.0 等，但不能更新到 2.0.0 或更高版本。
`~`：如果写入的是 〜0.13.0，则当运行 npm update 时，会更新到补丁版本：即 0.13.1 可以，但 0.14.0 不可以。
`>`：接受高于指定版本的任何版本。
`>=`：接受等于或高于指定版本的任何版本。
`<=`：接受等于或低于指定版本的任何版本。
`<`：接受低于指定版本的任何版本。
`=`：接受确切的版本。
`-`：接受一定范围的版本。例如：2.1.0 - 2.6.2。
`||`：组合集合。例如 < 2.1 || > 2.6。
```

### npm执行的原理

1. 每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。
2. 在这个新建的Shell中会将当前目录的node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。因此可以直接使用命令名称来调用，而无需指定具体的路径

## yarn