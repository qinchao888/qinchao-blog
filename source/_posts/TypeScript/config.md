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