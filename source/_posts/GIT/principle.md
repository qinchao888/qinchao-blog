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

1. blob对象: 存储内容，保存着文件的快照
2. tree对象: 记录着目录结构和blob对象索引。（存储一个目录结构，以及每一个文件（或者子文件夹）的权限、类型、对应的身份证（SHA1值）、以及文件名。）
3. commit对象: 包含树对象的指针和所有提交信息。（每个提交对象会包含一个指向上次提交对象（父对象）的指针，除了第一次提交没有父对象）

### 分区

1. 工作区
2. 暂存区（Index 索引区域），里面的代码会在下一次commit被提交到Git仓库。
3. Git仓库

[参考](https://www.jiqizhixin.com/articles/2019-12-20)


### .git目录

1. config: 配置
2. info: global exclude文件，放置那些不希望被记录在 .gitignore 文件中的忽略模式（ignored patterns）
3. hooks: 包含客户端或服务端的钩子脚本（hook scripts）

重要的四个条目

4. HEAD: 指向目前被检出的分
5. index: 保存暂存区信息
6. refs: 存储指向数据（分支、远程仓库和标签等）的提交对象的指针
7. objects: 存储所有数据内容
