---
title: flex
categories: 
- Css
---

### flex-direction column导致overflow auto无效

#### 只有一层display:flex，表现正常

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .wrap {
      height: 200px;
      border: 1px solid pink;
      display: flex;
      flex-direction: column;
    }
    .desc {
      flex: 1;
      overflow: auto;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div>title</div>
    <div class="desc">
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
    </div>
  </div>
</body>
</html>
```

#### 多层display:flex

本质上是受flex-direction: column的影响，导致设置flex-direction: column的子元素（非overflow:auto元素）需要设置
min-height: 0;（也可设置height，只要值非auto即可）

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .wrap {
      height: 200px;
      border: 1px solid pink;
      display: flex;
      flex-direction: column;
    }
    .box {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .desc {
      flex: 1;
      overflow: auto;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div>title</div>
    <div class="box">
      <div class="content">
        <div class="desc">
          <p>1111</p>
          <p>1111</p>
          <p>1111</p>
          <p>1111</p>
          <p>1111</p>
          <p>1111</p>
          <p>1111</p>
          <p>1111</p>
          <p>1111</p>
          <p>1111</p>
          <p>1111</p>
          <p>1111</p>
          <p>1111</p>
          <p>1111</p>
          <p>1111</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```
