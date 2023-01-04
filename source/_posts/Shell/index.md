---
title: 常用Shell命令
categories: 
- Shell
---

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
```