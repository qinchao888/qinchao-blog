---
title: charles使用
categories: 
- Tools
---

## charles无法代理localhost

解决方案：将localhost修改为localhost.charlesproxy.com

1. mac电脑修改hosts文件，

```sh
> sudo nano /etc/hosts
# 新增如下信息
127.0.0.1       localhost.charlesproxy.com
```

<img src="../../images/charles/charles-proxysetting.png" width="200">

<img src="../../images/charles/charles-proxysetting-mac.png" width="200">
