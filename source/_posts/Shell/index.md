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