---
title: 复制canvas图片
categories: 
- JavaScript
---

```tsx
import React, { useEffect, useRef } from 'react';

/**
 * 注：
 * 1. 此方法具有兼容性问题，部分浏览器和低版本浏览器不支持
 * 2. Chrome 浏览器规定，只有 HTTPS 协议的页面才能使用navigator.clipboard这个API
*/
const copyCanvasImgToClipboard = async (canvasEl: HTMLCanvasElement) => {
  if (window.ClipboardItem && navigator.clipboard.write) {
    const blob: Blob = await new Promise((resolve) => canvasEl.toBlob(resolve));
    await navigator.clipboard.write([new window.ClipboardItem({ [blob.type]: blob })])
  } else {
    throw new Error('clipboard not support');
  }
};


const CopyCanvasImgDemo: React.FC<{}> = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    drawImg()
  }, []);

  const drawImg = () => {
    const context = canvasRef.current.getContext('2d');
    var img = new Image();
    img.src = require('../../images/test.jpeg');
    img.onload = () => {
      context.drawImage(img, 0, 0, 300, 300);
    }
  };

  const copyImg = async () => {
    try {
      await copyCanvasImgToClipboard(canvasRef.current);
      alert('复制成功！');
    } catch (err) {
      alert('复制失败！');
    }
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