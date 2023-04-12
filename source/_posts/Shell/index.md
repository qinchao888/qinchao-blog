---
title: 常用Shell命令
categories: 
- Shell
---

### 基础

```sh
#!/bin/sh # 指解释此脚本的shell路径为/bin/sh，如果没有声明，则脚本将在默认的shell中执行

set -e # 返回值非0脚本退出，如：当访问一个不存在的文件时，脚本将会退出，而不是继续执行，从而出现一些意外的情况

sh test.sh p1 p2
$1 # shell的第一个参数，此处为p1
$2 # shell的第二个参数，此处为p2
$# # shell参数个数，此处为2

mkdir -p dir1/dir2 # 递归创建文件夹
```

### 使用 - 或 :- 

当值未设置时使用默认值，否则使用当前值

```sh
#!/bin/bash
#echo hi

a="value"
b=${a-"default"} # 也可使用:-，即：等价于：b=${a:-"default"}
echo $b
unset a
c=${a-"default"}
echo $c
```

### 环境变量

```sh
# linux use
. /etc/profile # is the same as source /etc/profile
```

### /usr/bin/env

#!/usr/bin/env node：其中的/usr/bin/env告诉系统在PATH环境变量中查找node来执行脚本文件

```sh
env | grep PATH # 查看PATH路径
which node # 查看node的安装路径
```

### 判断

shell中没有布尔值

```sh
a=true
b='true'
if [ "$a" = true ]
# if [ "$a" = 'true' ]
# if [ "$b" = true ]
# if [ "$b" = 'true' ]
then
  echo true
else
  echo false
fi
# 上述四种情况返回的均为true
```

#### 字符串空和非空判断

```sh
# -n：当串的长度大于0时为真(串非空)
a=''
if [ ! -n "$a" ] # 字符串为空
then
  echo 'yes'
else
  echo 'no'
fi
# yes　　　　　 

b='b'
if [ -n "$b" ] # 字符串非空
then
  echo 'yes'
else
  echo 'no'
fi
# yes

a=''
if [ $a ]; then # 字符串非空
  a=10
fi
echo $a # ''

# -z string
# True if the length of string is zero.
a=''
if [ -z $a ]; then # 为空字符串
  a=10
fi
echo $a # 10


a=''
if [ "$a" = '' ]; then # 为空字符串
  a=10
fi
echo $a # 10

a=''
if [ X"$a" = X ]; then # 为空字符串
  a=10
fi
echo $a # 10
```