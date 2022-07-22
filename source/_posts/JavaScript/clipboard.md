---
title: 复制内容
categories: 
- JavaScript
---

### 复制canvas图片和文本

```tsx
/**
 * 注：
 * 1. 此方法具有兼容性问题，部分浏览器和低版本浏览器不支持
 * 2. Chrome 浏览器规定，只有 HTTPS 协议或localhost的页面才能使用navigator.clipboard这个API
 * 3. safari中只有https环境才能使用
*/
// 复制canvas图片
export const copyCanvasImg = async (canvasEl: HTMLCanvasElement) => {
  if (window.ClipboardItem && navigator.clipboard.write) {
    const blob: Blob = await new Promise((resolve) => {
      canvasEl.toBlob(resolve);
    });
    await navigator.clipboard.write([new window.ClipboardItem({ [blob.type]: blob })]);
    alert('复制成功！');
  } else {
    alert('复制失败！');
  }
};

// 复制文本
export const copyText = async (text: string) => {
  if (navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    alert('复制成功！');
  } else {
    alert('复制失败！');
  }
};
```

```tsx
import React, { useEffect, useRef } from 'react';

const CopyCanvasImgDemo: React.FC<{}> = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    drawImg()
  }, []);

  const drawImg = () => {
    const context = canvasRef.current.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = require('../../images/test.jpeg');
    img.onload = () => {
      context.drawImage(img, 0, 0, 300, 300);
    }
  };

  const copyImg = async () => {
    await copyCanvasImg(canvasRef.current);
  };

  return (
    <div>
      <canvas ref={canvasRef} id="canvas" width="300" height="300"></canvas>
      <button onClick={copyImg}>复制图片</button>
    </div>
  )
}

export default CopyCanvasImgDemo;
```

### 使用document.execCommand('copy')实现复制

注：由于安全性问题，document.execCommand已废弃，建议使用navigator.clipboard替代

```js
// 此动作不可自动执行，必须存在页面交互才可
const copy = (node: HTMLElement) => {
  const selection = document.getSelection();
  const range = document.createRange();
  range.selectNodeContents(node); // 选择整个节点及其子节点
  // range.selectNode(node); // 选择子节点
  selection.removeAllRanges(); // 此操作必须执行，否则将复制失败
  selection.addRange(range);
  const successful = document.execCommand('copy'); // 
  if (successful) {
    alert('复制成功！');
  } else {
    alert('复制失败！');
  }
};
```

### 其它

clipboardData: 操作剪贴板中的数据

```js
window.clipboardData
event.clipboardData
```

相关的npm包：copy-to-clipboard

[参考文档1](https://www.ruanyifeng.com/blog/2021/01/clipboard-api.html)

[参考文档2](https://cloud.tencent.com/developer/article/1780940)
