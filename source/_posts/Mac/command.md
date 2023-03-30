---
title: Mac常用命令
categories: 
- Mac
---

## echo

```sh
echo aaa > a.txt # 向文件a.txt中写入内容aaa（会覆盖源文件内容）
echo aaa >> a.txt # 向文件a.txt中追加内容aaa
```

## wc

```sh
# 统计文件数量
ls | wc -l

# 统计每个文件及所有文件的总行数
ls | xargs wc -l

# 统计指定类型的文件及其所有文件的总行数（会自动过滤掉gitignore的文件）
git ls-files | grep -Ev '(.(png|jpg|svg)$|(package-lock.json))' | xargs wc -l
```

## xargs

由于很多命令不支持|管道来传递参数，因此需要使用xargs来传递参数，一般和管道符|一起使用

```sh
# 统计当前目录下的js文件的行数及总行数
find . -type f -name '*.js' -print | xargs wc -l
# 同上，xargs -0表示将\0 作为分隔符，配合 find 的 -print0 一起使用
find . -type f -name '*.js' -print0 | xargs -0 wc -l

# 统计当前目录下的js文件及其总大小，并按照从小到大排序
ls | grep -E '.js$' | xargs ls -hSr | xargs du -ch

# 批量替换目录及子目录下的less文件名为module.less
git ls-files '*.less' | sed 's/.less//' | xargs -I '{}' mv '{}.less' '{}.module.less'
```
