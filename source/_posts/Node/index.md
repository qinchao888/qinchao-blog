---
title: Node基础用法
categories: 
- Node
---

## fs

### 输出日志

```js
// flags: 'a' 表示打开文件进行追加。 如果文件不存在，则创建该文件。
const logFile = fs.createWriteStream('out.log', { flags: 'a' });
logFile.write(util.format.apply(null, ['内容1', '内容2']]) + '\n');
```

## path

### path.resolve 和 path.join 的区别

对于../的解析都类似有cmd，即：指向上一级目录

1. path.join：连接路径
2. path.resolve：从右至左遇到第一个绝对路径解析停止。如果处理完所有的path片段还没有生成绝对路径，则使用当前工作目录

```js
console.log(path.join('/a', '/b', '/c')) // /a/b/c
console.log(path.join('a', '/b', 'c'))  //  a/b/c
console.log(path.join('a', '/b', '..', 'c')) // a/c

console.log(path.resolve('/a', '/b', '/c')) // /c
console.log(path.resolve('a', '/b', 'c')) // /b/c
console.log(path.resolve('a', '/b', '', 'c')) // /b/c （空字符串被忽略）
console.log(path.resolve('a', '/b', '..', 'c')) // /c
console.log(path.resolve('a', '/b', '../', 'c')) // /c（../回到b目录，而b目录前带有/，所以直接返回了/c）
console.log(path.resolve('a', 'b', '..', 'c')) // /Users/node-test/a/c
console.log(path.resolve('a', 'b', 'c')) // /Users/node-test/a/b/c
console.log(path.resolve('a', '../b', 'c')) // /Users/node-test/b/c
console.log(path.resolve('a', './b', 'c')) // /Users/node-test/a/b/c
console.log(path.resolve('a', 'b', '../c', 'd')) // /Users/node-test/a/c/d
console.log(path.resolve()) // /Users/node-test
```