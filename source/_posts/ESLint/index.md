---
title: ESLint
categories: 
- ESLint
---

## vscode配置使用eslint

1. 安装 ESLint 插件
2. Settings中配置ESLint的auto fix on save，设置为on即可
3. 在项目下新建.eslintrc文件，自定义配置一些rules
4. 在项目下新建.eslintignore文件，忽略某些文件或文件夹的校验


## create-react-app

### 项目中配置了新的eslint规则，但是命令行依旧输出一堆的warning

原因：create-react-app 中配置了 eslint-loader，先前运行时输出的warning会被缓存起来，如果配置新的rules，此时warning将依旧存在

解决办法：删除node_modules/.cache/eslint-loader

注意：配置新的rules后需要重启项目
