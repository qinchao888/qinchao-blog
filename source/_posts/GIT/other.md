---
title: GIT总结
categories: 
- GIT
---

### @@的含义

```sh
@@ -1,6 +1,4 @@

-: 表示旧的
+: 表示新的

-1,6: 表示旧的从第一行开始，共有6行
+1,4: 表示新的从第一行开始，共有4行（表明旧的中有两行被删除了）
```

### bug

在使用 git add -p 时，使用 s选项 split hunks 后无法再使用 e 选项编辑subhunk的内容