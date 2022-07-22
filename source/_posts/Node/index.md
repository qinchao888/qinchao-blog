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