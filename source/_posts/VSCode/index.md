---
title: VSCode配置
categories: 
- VSCode
---

### 配置code命令

command + shift + p，输入 install，选择：Install 'code' command in PATH

```sh
# 命令行输入
> code test.txt
```

### 搜索

vscode默认搜索会忽略.gitignore中指定的文件，可以设置允许搜索：command + shift + p -> setting.json -> open settings(json) -> 配置："search.useIgnoreFiles": false