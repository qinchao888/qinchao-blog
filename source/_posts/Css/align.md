---
title: Css常用的对齐技巧
categories: 
- Css
---

### 图标与多行内容中的第一行内容垂直居中对齐


```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .wrapper {
      width: 300px;
      display: inline-flex;
      align-items: flex-start;
      border: 1px solid red;
    }
    .icon-wrap {
      display: inline-flex;
      align-items: center;
      line-height: 24px;
    }
    .icon {
      flex-shrink:0;
      width: 17px;
      height: 17px;
      line-height: 24px;
    }
    .title-wrap {
      word-break: break-word;
      font-size: 15px;
      line-height: 24px;
    }
    .notice-msg {
      color: #1f2329;
    }
    .notice-title {
      color: #245bdb;
    }
    .hidden {
      width: 0;
      overflow: hidden;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="icon-wrap">
      <span class="icon" style="background:url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2023c6.075%200%2011-4.925%2011-11S18.075%201%2012%201%201%205.925%201%2012s4.925%2011%2011%2011Z%22%20fill%3D%22%233370ff%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M13%207.5a1%201%200%201%200-2%200%201%201%200%200%200%202%200Zm-2%204v4h-.5a1%201%200%201%200%200%202h3a1%201%200%201%200%200-2H13c0-.667%200-1.333.002-2%200-1.001.002-2.002%200-3.004a.998.998%200%200%200-.998-.996H11a1%201%200%201%200%200%202Z%22%20fill%3D%22%23fff%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E') no-repeat;background-size:100% 100%;"></span>
      <span class="hidden">1</span>
    </div>
    <div class="title-wrap">
      <span class="notice-msg">【提示信息】：</span>
      <span class="notice-title">我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</span>
    </div>
  </span>
</html>
```