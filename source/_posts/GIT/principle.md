---
title: GIT原理
categories: 
- GIT
---

### .git

add 文件后在 .git/object 文件夹下将多出一个文件夹


```sh
# 路径形如：.git/objects/8b/aef1b4abc478178b004d62031cf7fe6db6f903
> git cat-file -t 8bae
blob
> git cat-file -p 8bae # 查看add的具体内容
this is a test text
```

### 类型

1. blob: 存储内容
2. tree: 存储一个目录结构，以及每一个文件（或者子文件夹）的权限、类型、对应的身份证（SHA1值）、以及文件名。
3. commit: 存储的是一个提交信息，包括对应目录结构的快照tree的哈希值，提交的作者等信息。

### 分区

1. 工作区
2. 暂存区（Index 索引区域），里面的代码会在下一次commit被提交到Git仓库。
3. Git仓库

[参考](https://www.jiqizhixin.com/articles/2019-12-20)
