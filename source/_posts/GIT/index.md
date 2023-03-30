---
title: GIT基础用法
categories: 
- GIT
---

### add

```sh
# 语法
git add [--verbose | -v] [--dry-run | -n] [--force | -f] [--interactive | -i] [--patch | -p]
[--edit | -e] [--[no-]all | --[no-]ignore-removal | [--update | -u]]
[--intent-to-add | -N] [--refresh] [--ignore-errors] [--ignore-missing] [--renormalize]
[--chmod=(+|-)x] [--] [<pathspec>...]

-A: 添加所有改动的内容
-e: 进入编辑模式
-f: 添加被ignore的文件
-i: 交互式命令（其中的revert选项表明将添加到index中的内容撤回到工作区）
-n: 啥也不做，仅展示即将发生什么
-N: 路径的项会被放置在索引中，但不包括改动的内容（对于新增的文件可以使用git diff查看到具体的内容）
-p: 交互式的添加hunks
    y: 添加所有变更
    n: 不添加
    q: 退出
    s: 多处变更时使用，将其进行拆分为更细粒度的hunk，对每一个hunk执行相应的操作。（如：只想添加某个文件中的一处改动时可使用）
    a: 配合s使用，添加剩下的hunk
    d: 配合s使用，不添加剩下的hunk
    g: 选择指定的hunk进行操作
    /: 正则检索
    j: 查看下一个未被操作的hunk（No next hunk时会停留在当前的hunk）
    J: 查看下一个hunk，包括已被操作的hunk，可对刚刚操作的hunk再次操作（No next hunk时会停留在当前的hunk）
    e: 手动编辑hunk的内容
-u: 添加改动的内容，已tracked的文件（新增的文件除外），可指定path
-v: 输出详细信息
--: 添加指定内容的文件，当文件名可能被当做命令行选项时
--no-all: 添加指定的文件，但不包含被删除的文件
```

```sh
git add a.txt # 添加a.txt文件
git add -- a.txt # 添加a.txt文件

git add -Af # 所有变动的文件包括.gitignore中指定的文件
git add -f a.txt # 添加被ignore的a.txt文件
# 添加完成后需要移除ignore的文件的追踪，否则下次修改仍会被追踪到
git rm --cached a.txt

git add *.txt # 添加所有txt文件，但是不包括被gitignore的txt文件

git add --no-all . # 添加变更的文件，但不包含删除的文件

git add [dirname] # 添加指定文件夹下所有的变更

# 示例
> git add -p c
(1/3) Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]? ?
y - stage this hunk
n - do not stage this hunk
q - quit; do not stage this hunk or any of the remaining ones
a - stage this hunk and all later hunks in the file
d - do not stage this hunk or any of the later hunks in the file
g - select a hunk to go to
/ - search for a hunk matching the given regex
j - leave this hunk undecided, see next undecided hunk
J - leave this hunk undecided, see next hunk
e - manually edit the current hunk
(1/3) Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]? s

# 示例
> ls
a.txt
> echo aaa >> a.txt
> git add -u a.txt
> git status

# 示例
> touch f
> git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	f

nothing added to commit but untracked files present (use "git add" to track)
> git clean -fn
Would remove f
> git add -N f
> git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	new file:   f

no changes added to commit (use "git add" and/or "git commit -a")
> git clean -fn # f文件无法被移除
```

### branch

git-branch - List, create, or delete branches

```sh
# 语法
git branch [--color[=<when>] | --no-color] [--show-current]
        [-v [--abbrev=<length> | --no-abbrev]]
        [--column[=<options>] | --no-column] [--sort=<key>]
        [(--merged | --no-merged) [<commit>]]
        [--contains [<commit]] [--no-contains [<commit>]]
        [--points-at <object>] [--format=<format>]
        [(-r | --remotes) | (-a | --all)]
        [--list] [<pattern>...]
git branch [--track | --no-track] [-f] <branchname> [<start-point>]
git branch (--set-upstream-to=<upstream> | -u <upstream>) [<branchname>]
git branch --unset-upstream [<branchname>]
git branch (-m | -M) [<oldbranch>] <newbranch>
git branch (-c | -C) [<oldbranch>] <newbranch>
git branch (-d | -D) [-r] <branchname>...
git branch --edit-description [<branchname>]

-d: 删除指定分支
-D: 等同于--delete --force
-f: 强制创建分支即便原分支已存在
-m: 重命名分支
-M: 强制重命名即便原分支名已存在
-c: 复制一个分支
-C: 强制复制一个分支
-i: 分支排序
-u: 修改当前分支的上游分支
--abbrev=<n>: 显示至少n位的commithash，默认为7
--no-abbrev: 显示完整的commithash
--color: 分支着色
--no-color: 关闭颜色
--column: 以列的方式显示分支列表
--contains: 列举出包含某个commit的分支
--show-current: 显示当前分支名
--no-contains: 列举出不包含某个commit的分支
--merged: 列举合入到某个commit的所有分支
--no-merged: 列举未合入到某个commit的所有分支
--points-at: 可用于列举某个commit所在的分支（commitId为最后一次提交的commitId）
```

```sh
git branch # 查看本地所有分支（当前分支高亮显示）
git branch --list # 等同于git branch
git branch -r # 查看远程分支
git branch -a # 查看所有分支
git branch -v # 查看每个分支最后一次提交记录
git branch -vv # 查看所有分支当前追踪的分支
git branch '*te*' --list # 查看包含te字符的分支名称
git branch --contains [commitId] # 包含commitId的所有分支名
git branch --no-contains [commitId] # 不包含commitId的所有分支名
git branch -m chore/test # 当前分支重命名为chore/test
git branch -m chore/test feat/test # 分支chore/test重命名为feat/test
git branch -av --abbrev=10 # 输出分支列表的详细信息及对应的10位commithash
git branch -av --no-abbrev # 输出分支列表的详细信息及完整的commithash
git branch --points-at [commitId] # 列举commitId所在的分支
git branch -d feat # 删除feat分支
git push origin --delete feat # 删除远程分支

git branch -u origin/test # 当前分支 track remote branch 修改为test分支
```

### bisect

使用二分法查找某次错误的commit

[参考](https://www.ruanyifeng.com/blog/2018/12/git-bisect.html)

### checkout

```sh
>git fetch origin develop
>git checkout -b chore/test origin/develop # 基于本地的origin/develop分支切出chore/test分支
```

### cherry-pick

```sh
-e # 可用于修改commit message
-x # cherry-pick时会添加一条cherry picked from commit ...的信息
-m parent-number # 如果原始提交是一个合并节点，来自于两个分支的合并，那么 Cherry pick 默认将失败，因为它不知道应该采用哪个分支的代码变动。parent-number从1开始
-n # 更新工作区和暂存区，不生成新的commit
-s # 在提交信息的末尾加上一行操作者信息
```

[参考](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)

```sh
git cherry-pick -e [commitId] # 修改commit message
git cherry-pick -n [commitId] # 更新工作区和暂存区，不生成新的commit
git cherry-pick ..feat/test # 应用feat/test和当前分支上相同祖先下的所有commit

# 应用单条commit
git cherry-pick [commitId]
# 应用从startCommitId~endCommitId的变更，不包括startId，包括endId
git cherry-pick [startId]..[endId] # 例：git cherry-pick 3bdcc133..8b30099c
# 应用从startCommitId~endCommitId的变更，包括startId和endId（注意需要引号）
git cherry-pick '[startId]^..[endId]' # git cherry-pick '7e177f90^..6c072f0f' 

# branch name
git cherry-pick feat/test~3..feat/test~0 # 应用feat/test分支最后的三条commit
# 等价于
git cherry-pick feat/test~3..feat/test
# 等价于
git cherry-pick 'feat/test~2^..feat/test'
```

[参考](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)

### clean

Remove untracked files from the working tree，即清除新增的文件或新修改的代码

```sh
# 语法
git clean [-d] [-f] [-i] [-n] [-q] [-e <pattern>] [-x | -X] [--] <path>...

-d: 清除指定的文件夹，需配合 -i, -n 或 -f使用
-f: 清除文件或文件夹，当Git configuration variable clean.requireForce is not set to false时配合-d使用
-i: 交互式命令
-n: 啥也不做，仅展示即将发生什么
-q: 仅报告错误，不报告成功删除的文件
-e: 过滤掉某些文件或文件夹
-x: 包含gitignore中指定的文件
-X: 仅包含gitignore中的指定的文件
```

```sh
git clean -df # 清除未被add和commit的新增的文件和文件夹
git clean -fn # 查看会发生什么
git clean -fe aa # 忽略掉aa文件的清除

# 示例
> touch a.txt b.txt
> echo a.txt > .gitignore
> git add .gitignore
> git clean -fX
Removing a.txt
> touch a.txt
> git clean -fx
Removing a.txt
Removing b.txt
```

```sh
git checkout -f # 清除暂存区和工作区（在原文件上做改动）
git checkout -- src/test # 清除src/test文件夹下的改动
```

### clone

使用 git clone 时会自动创建一个跟踪 origin/master 的 master 分支


### commit

修改message信息

```sh
git rebase -i commitId # 将需要修改的那一条commit的pick修改为edit（commitId为修改的那一条commit之前的那一条）
git commit --amend # 修改message信息
git rebase --continue

# 修改最近的那一条commit的message
git commit --amend # 修改完成后commit hash会发生变更
```

### config

注：默认git是无法追踪到文件大小写变更的，因此需要设置 git config --global core.ignorecase false 

```sh
# 设置区分大小写
git config --global core.ignorecase false 
git config --local core.ignorecase false

# 查看所有的配置以及它们所在的文件
git config --list --show-origin

# 查看所有的配置
git config --list

# 查看本地的所有配置
git config --local --list

# 查看某一项配置
git config core.ignorecase

# 设置别名
git config --global alias.ci commit # git ci 等同于 git commit
```

### delete

删除分支

```sh
> git branch -D feature/temp # 删除本地分支
> git push origin -d feature/temp # 删除远程分支
```

### diff

```sh
git diff # 当前工作区的改动
git diff --cached # 查看已add为commit的文件的改动
git diff HEAD # 工作区已track但未add文件和已add未commit的文件（新增的文件未add时无法被查看到，新增的空文件夹好像追踪不到）
git diff filename # 查看某个文件的改动
git diff –-cached filename # 查看某个暂存的文件的改动
git diff --cached --shortstat a.txt # 查看文件a.txt修改的行数
git diff sha1:filename sha2:filename # 查看版本 sha1 的文件 filename 和版本 sha2 的文件 filename 的差异
git diff topic master # 查看两个分支最新的那一条commit的差异
git diff topic...master # 查看两个分支上所有的差异
git diff --stat # 仅查看diff结果
git diff test # 查看当前目录和分支test的差异
git diff sha1 sha2 # 比较两个历史版本之间的差异

# merge时有冲突时使用
git diff --ours # 查看合并引入了什么
git diff --theirs # 查看他们有什么不同
git diff --base # 查看两边是如何改动的
```

### log

```sh
git log --graph --oneline # 查看链路
git log -p # 查看历史commit及对应的修改
git log -p -2 # 查看最近的两条commit及对应的修改
git log --stat # 查看历史commit修改的文件及修改的行数等信息
git log --shortstat # 查看某次commit修改的内容行数
git log --pretty=oneline # 显示一行
git log --pretty=short --oneline # 单行简短展示
git log --pretty=format:"%h - %an, %ar : %s" # 输出指定format格式的内容
git log -S str # 检索新增或删除指定字符串str的log记录

git log origin/master
git log remotes/origin/master
git log refs/remotes/origin/master
# 上面的三个命令作用相同，因为 Git 会把它们都扩展成 refs/remotes/origin/master

git log -g # 查看类似于 git log 输出格式的引用日志信息，包含了reflog信息
```

[参考](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2)

### mv

```sh
# 语法
git mv [-v] [-f] [-n] [-k] <source> <destination>
git mv [-v] [-f] [-n] [-k] <source> ... <destination directory>

-f: 强制重命名，无论目标文件是否存在
-n: 啥也不做，仅展示即将发生什么
-k: 跳过错误，即发生错误时也不会有任何输出
-v: 输出详细信息
```

```sh
# 示例1
>touch a.txt b.txt
>ls # a.txt b.txt
>git mv a.txt b.txt # 报错：fatal: not under version control, source=b.txt, destination=a.txt
>git add -A # 需要先执行add操作才可执行mv操作
>git mv -f a.txt b.txt # 将a.txt文件强制重命名为b.txt，即使b.txt文件存在，将会被覆盖
>ls # b.txt

# 示例2
>git mv -nf a.txt b.txt
Checking rename of 'a.txt' to 'b.txt'
Renaming a.txt to b.txt

# 示例3
# if b.txt has exist
>git mv -k a.txt b.txt # 啥也不做

# 示例4
>git mv -fv a.txt b.txt
warning: overwriting 'b.txt'
Renaming a.txt to b.txt
```

### pull

```sh
git pull # 默认是拉取所有分支的更新，并且将当前关联的远程分支的更新merge到当前分支上
```

### push

```sh
git push origin test:develop # 将本地的test分支变更推送到远程的develop分支上 
```

### rebase

好处：提交历史整洁，是一条直线，没有分叉。


```sh
# 将master上新的提交合并到自己的分支中
> git rebase origin/master
> git add -A # 处理冲突，如果有
> git rebase --continue #  继续合并代码
> git add -A # 继续处理冲突，如果有
...
> git push -f

# 可以直接将主题分支变基到目标分支上。 省去先切换到topicbranch分支，再对其执行变基命令的多个步骤。
git rebase <basebranch> <topicbranch> 

git rebase [startId] [endId] # 对(startId, endId]中的commit做变基操作
```

### remote

```sh
git remote -v # 查看远程仓库
git remote show origin # 查看remote仓库信息

git remote # origin

git remote rename origin test # 将origin重命名为test

> git remote add test git@github.com:qinchao888/git-test.git
> git remote
origin
test

git remote remove test # 移除test
```

### reset

```sh
git reset --soft commitId # 撤销commit，回到暂存区（add时的状态）
git reset # 撤销至工作区，即撤销所有已add的文件（未add时的状态）
git reset filename # 撤销指定文件的add至工作区

git reset --soft 'HEAD^' # 撤销最后一次commit，提交的内容在暂存区中
git reset 'HEAD^' # 撤销最后一次commit，提交的内容在工作区中
```

### restore

```sh
git restore --staged . # 撤销暂存区改动至工作区
git restore --staged [filename] # 将加入暂存区的文件撤回至工作区
git restore [filename] # 撤销工作区指定文件的修改
git restore . # 撤销工作区所有文件的修改
```

### revert

```sh
-e: 默认值，设置commit message
-m: 当撤销的commit为一个merge时使用，如：git revert 2b52fed -m 1，-m 后的参数为1或2，1表示保留第一个commit，2则保留第二个。
--no-edit: 使用默认的commit message
-n: 撤销指定的commit，但不生成新的commit，变动保留在暂存区中
-S: gpg sign，用于确保代码提交人为作者本人，而非可能其他人篡改的信息
-s: commit中添加一行Signed-off信息，标识当前操作人
--strategy=<strategy>: 使用指定的合并策略
```

git revert -m 数值

1. -m 选项接收的参数是一个数字，数字取值为 1 和 2，也就是 Merge 行里面列出来的第一个还是第二个，其含义用来保留某个分支
2. git revert 后revert的代码将无法再次合入，需要通过再次revert revert那次的commit才可以恢复代码

```sh
# 撤销多个commit并仅生成一个新的commit
git revert -n HEAD@{2}..HEAD@{0} # 仅回退最后两个commit，下述写法等价
git revert -n HEAD@{2}..HEAD
git revert -n 'HEAD^^..HEAD'
git revert -n 'HEAD~2..HEAD'
git revert -n 9b03..444a
git revert -n '79e9^..444a'
```

### show

```sh
git show --name-only [commit] # 某次commit变化的文件
git show [commit]:[filename] # 某次commit指定文件的改动
git show HEAD # 最近一次commit的变更
git show 'HEAD^' # 最近一次的上一次commit的变更
git show 'HEAD^^' # ^最多为两个
git show HEAD@{0} # 最近一次commit的变更
git show HEAD~0 # 最近一次commit的变更
git show -s [commit] # 查看某个commit的提交信息
git show [tagId] # 查看某个tagId对应的变更
git show [branch] # 查看某个branch对应的变更
git show [commitId] --shortstat # 查看某次commit修改的行数信息
```

### stash

默认情况下，git stash会缓存下列文件：

1. 添加到暂存区的修改（staged changes）
2. Git跟踪的但并未添加到暂存区的修改（unstaged changes）

但不会缓存以下文件：

1. 在工作目录中新的文件（untracked files）
2. 被忽略的文件（ignored files）

```sh
git stash # 默认存储已暂存和未暂存的文件，不包括未跟踪和忽略的文件
git stash -u # 包含未被追踪的文件的存储，如新增且未被add的文件
git stash -a # 包含未跟踪和忽略的文件的存储
git stash list # 查看所有stash
git stash clear # 清除

git stash drop [stashId] # 删除指定的stash内容

git stash branch [branchname] [stashId] # 创建一个新的分支并应用指定的暂存内容

git stash create 'name' # 创建一个暂存条目，返回其对象名称，常用与脚本
git stash store -m 'message' [tempStashId] # 将创建的暂存条目加入到暂存日志中

git stash show n # 等价于 git stash show stash@{n}，显示diffstat
git stash show -p [stashId] # 查看具体的内容

git stash save # 已废弃，使用 git stash push 替代

git stash -p [filename] # 暂存指定的文件，等价于 git stash push [filename]
git stash push -um '测试内容' # 暂存内容并添加描述信息

git stash push --keep-index a.txt # 添加a.txt所有的改动并且保留已添加到暂存区的a.txt改动
# 在省略push时，即使用 git stash 命令时，--keep-index将不能使用，
# 即 git stash --keep-index 是不能使用的，除非使用 git stash -p --keep-index

# 交互式添加指定文件的暂存，默认使用了 --keep-index，保留了原先文件的暂存区状态，但是新增了暂存文件的unstaged状态
# 可通过 git restore [file]剔除unstaged状态，即相当于stash中和暂存区中都保留了文件的修改
git stash --patch
# 交互式添加指定文件的暂存，并且不保留原先文件的暂存区状态
git stash --patch --no-keep-index 

# 取出最新的stash，stash记录不保留
# 需要将本地的改动先添加至暂存区，避免因冲突导致代码被 stash 覆盖
# 出现冲突时需要手动解决冲突，原stash内容仍保留在list中，解决完成后需要调用 git stash drop 删除指定的stash。
git stash pop 

# 将保留原先的index状态，即原先是在暂存区被添加到stash时，使用 --index 时文件的状态将仍保持index状态。而非unstaged状态
git stash pop --index

git stash apply # 应用最新的stash，stash记录仍保留
```

### status

```sh
git status -s # 简短的输出文件变更状态
# 新添加的未跟踪文件前面有 ?? 标记
# 新添加到暂存区中的文件前面有 A 标记
# 修改过的文件前面有 M 标记
```

### tag

```sh
git tag --list # git tag -l，查看所有的tag
git tag v1.0.0 [commitId] # 给指定的commit打tag
git tag v1.0.1 # 给最新的那条commit打tag
git tag -a v1.0.2 [commitId] -m '说明' # 添加说明信息，打标签者的信息等，git show [tagId] 时可查看
git tag -d [tagId] # 删除指定的tag

# 删除远程的tag（不删除远程tag的话，使用git pull时又会把删除的tag拉取回来）
git push origin :refs/tags/v1.0.2 # 将本地删除的改动同步至远端（需先删除本地tag）
git push origin --delete v1.0.2 # 直接删除远程的tag v1.0.2

# tag重命名
git tag -f [newTagId] [oldTagId] # 注意：oldTagId需要手动删除
git tag -d [oldTagId]

# 默认情况下，git push 命令并不会传送标签到远程仓库服务器上
git push origin [tagname] # 推送指定的tagname
git push origin --tags # 将本地的tags推送至远程（不包括删除的）
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

#### 示例

branch: release 和 feat/test

```sh
# release（默认状态）
a.txt 
|
this is release default

b.txt
|
this is release default
```

```sh
# release（修改）
m.txt
|
this is release change
```

```sh
# feat/test（修改）(branch from release)
a.txt
|
this is release default
this is feat/test change

c.txt 
|
this is feat/test default
```

操作：

```sh
> git checkout release
> git merge feat/test --no-ff
> git log

commit e0fec0044ad030af13dc6cb8def55ccc652e8f0e
Merge: 8960fd8 df607b9
Author: ...
Date:   Tue Aug 30 20:18:22 2022 +0800

    Merge branch 'feat/test' into release

commit df607b93c3057c7d5147a267965ab3cf64e2768b (feat/test)
Author: ...
Date:   Tue Aug 30 20:18:01 2022 +0800

    chore: feat/test change

commit 8960fd8e99dc2cdb54d3c44c0cfa9eda15a62ad7
Author: ...
Date:   Tue Aug 30 20:17:08 2022 +0800

    chore: release change

# 撤销feat/test分支上的修改
> git revert df607b93c3057c7d5147a267965ab3cf64e2768b
> git push # 此时release分支上只有release自己的改动，没有feat/test的修改

# 或者可以通过撤销merge时的commit来撤销改动
> git revert e0fec0044ad030af13dc6cb8def55ccc652e8f0e 8960fd8 # 保留原修改，撤销feat/test的修改

# 可以通过git show查看修改和merge时的parent commit
> git show e0fec0044ad030af13dc6cb8def55ccc652e8f0e

commit e0fec0044ad030af13dc6cb8def55ccc652e8f0e
Merge: 8960fd8 df607b9
Author: ...
Date:   Tue Aug 30 20:18:22 2022 +0800

    Merge branch 'feat/test' into release

# 查看修改信息
> git show 8960fd8

commit 8960fd8e99dc2cdb54d3c44c0cfa9eda15a62ad7
Author: ...
Date:   Tue Aug 30 20:17:08 2022 +0800

    chore: release change

diff --git a/m.txt b/m.txt
new file mode 100644
index 0000000..c33931d
--- /dev/null
+++ b/m.txt
@@ -0,0 +1 @@
+this is release change
\ No newline at end of file

# 使用git reset撤销merge
git reset --hard df607b93c3057c7d5147a267965ab3cf64e2768b # 此时8960fd8e99dc2cdb54d3c44c0cfa9eda15a62ad7上的提交时丢失的
git log --graph --oneline # 查看链路

*   e0fec00 (HEAD -> release, origin/release) Merge branch 'feat/test1' into release
|\  
| * df607b9 (feat/test1) chore: feat/test1 change
* | 8960fd8 chore: release change
|/  
* fc1a13f (chore/test1) chore: test
# 使用reset后链路变成了df607b9-fc1a13f，8960fd8在主干上，而不在df607b9所在的链路上
```

### no-fast-forward 模式

参数：--no-ff

将两个分支上各自的修改merge后形成一个新的commit，并且各自的链路上有着各自修改的commit记录。注意：此时执行reset --hard操作需要注意各自链路上的commit是否会被丢失

#### 示例

```sh
*   e0fec00（merge）
|\  
| * df607b9（featb)
* | 8960fd8
|/  
* fc1a13f（feata)
```

此时是将 feata 分支上的 8960fd8 的 commit 和 featb 分支上的 df607b9 的 commit 合并成一个新的commit e0fec00，执行 git reset --hard df607b9 后，commit 8960fd8 将会丢失。


### fast-forwrad 模式

合并后如果使用了squash后，只会有一个commit，并且 使用 git log --graph --oneline 查看时看不到原分支的commit历史，commit更加干净。如果使用了 --no-ff，则会生成两个commit，一个是squash后的commit，一个是自带的merge时的commit，保留了原分支的commit历史。

```
# master分支
> git merge develop
```

### remote

```sh
# 本地分支feat/test和remotes/origin/feat/test，当和远程分支建立链接后，前缀将会由remotes/origin/feat/test变更为heads/feat/test
% git checkout remotes/origin/feat/test
[remotes/origin/feat/test] % git log
% git push --set-upstream origin feat/test
% git checkout remotes/origin/feat/test
[heads/feat/test] % git log
# 在分支feat/test上修改内容后执行git push，变更将同步到remotes/origin/feat/test上
```

### 修改commit message

```sh
# 修改最近的一条commit message
git commit --amend --message="chore: 修改"

# 修改指定的一条commit message
git rebase -i [commitId]
# 将需要修改的那一条commit前的pick修改为edit
git commit --amend --message="chore: 修改"
git rebase --continue
```

### set-upstream

```sh
> git branch -a
feat/chore
remotes/origin/feat/chore
> git checkout -b feat/push
> git branch -a
feat/chore
feat/push
remotes/origin/feat/chore

> git push # 此时会提示需要使用--set-upstream
fatal: The current branch feat/push has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin feat/push
# 因为本地没有remotes/origin/feat/push
# 因此需要建立一个remotes/origin/feat/push分支关联当前的feat/push分支
```

### git push 和 git push origin master的区别

1. 当只关联一个远程仓库时，两者没有区别
2. 当关联多个git仓库时，则必须指定代码需要推送到哪个仓库中

### 指针

1. 创建分支本质上就是创建了一个指针，指向当前的commit对象。
2. 当前操作的分支则是使用了一个HEAD指针，来标识当前操作的是哪一个分支。
3. 每次提交新的内容，HEAD指针都会随之向前移动

下图所示，当前操作的分支是master分支

![指针示例](../../images/git/head-to-master.png)

```sh
> git checkout master # HEAD指针指向master分支
> git checkout test # HEAD指针指向了test分支
```

[参考](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%AE%80%E4%BB%8B)

### refs/heads和refs/remotes

1. refs/heads/*: 远程版本库的引用
2. refs/remotes/origin/*: 本地版本库的引用

### 拆分提交

```sh
commit C
commit A

将commit C 拆分为 commit B 和 commit C

> git rebase -i A C
#commit C前缀修改为edit
> git reset 'HEAD^' # 将改动撤回到工作区
> git add a.txt # 添加指定的文件
> git commmit -m 'add a' # 对应commit B
> git add b.txt # 添加指定的文件
> git commmit -m 'add b' # 对应commit C
> git rebase --continue
```

### 基于某个tag切出分支

```sh
git checkout -b test v1.0.0
# 或
git branch test v1.0.0
```
