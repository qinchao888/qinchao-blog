---
title: word-break和word-wrap
categories: 
- Css
---

### word-break

1. break-all: 允许任意非CJK(Chinese/Japanese/Korean)文本间的单词断行（一行放不下时直接拆开，会溢出）
2. keep-all: 不允许CJK(Chinese/Japanese/Korean)文本中的单词换行，只能在半角空格或连字符处换行。非CJK文本的行为实际上和normal一致（只能在半角空格或连字符处换行，其他情况下一行展示，会溢出）

```css
word-break: normal|break-all|keep-all
```

### word-wrap

break-word: 允许单词内断句，首先会尝试挪到下一行，看看下一行的宽度够不够，不够的话就进行单词内的断句。

```css
word-wrap: normal|break-word;
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .box {
      margin-top: 20px;
      width: 200px;
      border: 1px solid skyblue;
    }
    .break-all {
      word-break: break-all;
    }
    .break-word {
      word-wrap: break-word;
    }
    .keep-all {
      word-break: keep-all;
    }
    .line-break {
      line-break: anywhere; /* 处理中文符号 */
    }
  </style>
</head>
<body>
  <div class="box">
    <div class="break-all">测试中文测试中文测试中文测试中文测试中文测试中文测试中文测试中文</div>
    <div class="break-all">测试中文测试中文测试中文测试中文测试中文测试中文测试中文测试中文！！！！！！！！！！！！！！！！！</div>
    <div class="line-break">测试中文测试中文测试中文测试中文测试中文测试中文测试中文测试中文！！！！！！！！！！！！！！！！！</div>
    <div class="break-all">this is english test a longlonglonglong word</div>
    <div class="break-all">thisisenglishtestalonglonglonglongwordfadfadfa</div>
  </div>
  <div class="box">
    <div class="keep-all">测试中文测试中文测试中文测试中文测试中文测试中文测试中文测试中文</div>
    <div class="keep-all">测试中文测试中文测试中文测试中文测试中文测试中文测试中文测试中文！！！！！！！！！！！！！！！！！</div>
    <div class="keep-all">this is english test a longlonglonglong word</div>
    <div class="keep-all">thisisenglishtestalonglonglonglongwordfadfadfa</div>
  </div>
  <div class="box">
    <div class="break-word">测试中文测试中文测试中文测试中文测试中文测试中文测试中文测试中文</div>
    <div class="break-word">测试中文测试中文测试中文测试中文测试中文测试中文测试中文测试中文！！！！！！！！！！！！！！！！！</div>
    <div class="break-word">this is english test a longlonglonglong wordwordwordwordwordword wordwordwordwordwordword</div>
    <div class="break-word">thisisenglishtestalonglonglonglongwordfadfadfa</div>
  </div>
  <div class="box">
    <div>测试中文测试中文测试中文测试中文测试中文测试中文测试中文测试中文</div>
    <div>测试中文测试中文测试中文测试中文测试中文测试中文测试中文测试中文！！！！！！！！！！！！！！！！！</div>
    <div>this is english test a longlonglonglong word</div>
    <div>thisisenglishtestalonglonglonglongwordfadfadfa</div>
  </div>
</body>
</html>
```

[参考](https://www.runoob.com/w3cnote/css-nowrap-break-word.html)
