### branch

```sh
git branch -d feat # 删除本地分支
git push origin --delete feat # 删除远程分支
git branch -a # 查看分支
```

git checkout -- src/test # 清除src/test文件夹下的改动
### reset

```sh
git reset --soft commitId # 撤销commit，回到暂存区（add是的状态）
git reset . # 撤销至工作区（未add时的状态）
git reset filename # 撤销指定文件的add至工作区
```


### git log

```sh
git log --graph --oneline # 查看链路
```

### git revert

git revert -m 数值

1. -m 选项接收的参数是一个数字，数字取值为 1 和 2，也就是 Merge 行里面列出来的第一个还是第二个，其含义用来保留某个分支
2. git revert 后revert的代码将无法再次合入，需要通过再次revert revert那次的commit才可以恢复代码

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