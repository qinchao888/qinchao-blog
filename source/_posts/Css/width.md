---
title: width
categories: 
- Css
---

### max-content min-content 和 fit-content的区别

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
    }
    .container {
      width: 400px;
      background: green;
    }
    .box1 {
      background: skyblue;
      width: max-content; /* 宽度以自己内容宽度为准，不受父元素宽度影响 */
    }
    .box2 {
      background: pink;
      width: min-content; /* 以单个文字所占空间为准 */
    }
    .box3 {
      background: silver;
      width: fit-content; /* 不超过父元素宽度时自己内容的最大宽度 */
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="box1">这里是测试内容这里是测试内容这里是测试内容这里是测试内容这里是测试内容</div>
    <div class="box2">
      <div>这里</div>
      <div>这里是测试内容</div>
    </div>
    <div class="box3">这里是测试内容这里是测试内容测试内容测试内容测试内容测试内容测试内容</div>
  </div>
</body>
</html>
```

![效果图](/images/css/width.png)