---
title: nvm
categories: 
- package
---

### 常用命令

```sh
nvm install version # 安装指定版本的node
nvm current # 当前使用的版本
nvm use version # 使用指定版本的node
nvm list # 查看已安装的node版本
```

### 配置

在.nvmrc中可以配置node版本，执行 nvm use时 将使用.nvmrc中指定的node版本

```
// .nvmrc
lts/erbium
```

erbium为node的版本代号

```
lts/* -> lts/gallium (-> N/A)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.17.0 (-> N/A)
lts/dubnium -> v10.24.1 (-> N/A)
lts/erbium -> v12.22.8
lts/fermium -> v14.18.2 (-> N/A)
lts/gallium -> v16.13.1 (-> N/A)
```