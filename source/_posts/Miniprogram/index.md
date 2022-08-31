---
title: 小程序
categories: 
- miniprogram
---

### scroll-view中设置sticky无效

解决办法：给scroll-view的子元素包裹一层view

```js
<scroll-view scroll-y>
  <view>
    <view></view> // 设置sticky的元素
  </view>
</scroll-view>
```

### rich-text渲染svg小图片

将图片作为元素的backgroud进行设置

1. 先获取svg的html代码
2. 使用encodeURIComponent对齐进行编码
3. 拼接：data:image/svg+xml

```html
<!-- svg -->
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Z" fill="#3370ff"></path>
  <path d="M13 7.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-2 4v4h-.5a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2H13c0-.667 0-1.333.002-2 0-1.001.002-2.002 0-3.004a.998.998 0 0 0-.998-.996H11a1 1 0 1 0 0 2Z" fill="#fff"></path>
</svg>
```

```html
<!-- 示例 -->
<span class="icon" style="background:url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2023c6.075%200%2011-4.925%2011-11S18.075%201%2012%201%201%205.925%201%2012s4.925%2011%2011%2011Z%22%20fill%3D%22%233370ff%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M13%207.5a1%201%200%201%200-2%200%201%201%200%200%200%202%200Zm-2%204v4h-.5a1%201%200%201%200%200%202h3a1%201%200%201%200%200-2H13c0-.667%200-1.333.002-2%200-1.001.002-2.002%200-3.004a.998.998%200%200%200-.998-.996H11a1%201%200%201%200%200%202Z%22%20fill%3D%22%23fff%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E') no-repeat;background-size:100% 100%;"></span>
```