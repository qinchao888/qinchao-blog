---
title: GIT基础用法
categories: 
- GIT
---

### cherry-pick

#### 指定的commit应用于其他分支

```sh
# 当前分支 feat/test，commit为f，将f应用到master分支上
> git checkout master
> git cherry-pick f
```

#### 指定的commit应用于其他分支

```sh
# 当前分支 feat/test，commit记录为 A、B、C(最新)

# 将B、C应用到master分支上
> git checkout master
> git cherry-pick A..C

# 将A、B、C应用到master分支上
> git checkout master
> git cherry-pick A^..C
```

[参考](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)

### clean

清除新增的文件或新修改的代码

```sh
git clean -df # 清除未被add和commit的新增的文件和文件夹
git checkout -f # 清除未被add和commit的文件（在原文件上做改动）
```

### delete

删除分支

```sh
> git branch -D feature/temp # 删除本地分支
> git push origin -d feature/temp # 删除远程分支
```

### rebase

将master上新的提交合并到自己的分支中

```sh
> git rebase origin/master
> git add -A # 处理冲突，如果有
> git rebase --continue #  继续合并代码
> git add -A # 继续处理冲突，如果有
...
> git push -f
```

### fetch 和 pull

git pull 等价于 git fetch + git merge

git fetch：取回所有分支的更新

git merge：应用所有更新

git pull origin master：拉取远程master分支上的变更并且merge到本地的master分支上

```sh
> git checkout master # 本地的master分支
> git fetch origin master # 将origin/master上的变更拉取到本地的remotes/origin/master上
> git checkout origin/master
> git log # 可以查看到刚拉取到的新的变更
> git checkout master
> git merge origin/master # 将本地的remotes/origin/master上新的变更merge到当前的master分支上
```
