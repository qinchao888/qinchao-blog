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

### 复制html内容

```js
const data = '<div>this is a test div</div>'
const blob = new Blob([data], {type : 'text/html'});
navigator.clipboard.write([new window.ClipboardItem({ [blob.type]: blob })])
```

注意：写入剪贴板的html内容直接粘贴时是为空的，需要粘贴在contenteditable的元素中才可以正常显示

```html
<div contenteditable style="width:300px;height:300px;background:pink;"></div>
```

[参考](https://www.stefanjudis.com/notes/a-clipboard-magic-trick-how-to-use-different-mime-types-with-the-clipboard/)

### 构造数据粘贴至table中

前提：从现有的table复制数据出来，通过getClipboardData获取数据，对其进行分析，再构造需要的html格式

```html
<!-- 示例：粘贴两列多行数据 -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button onclick="getWriteData()">获取数据</button>
</body>
<script>
const data = {
  test1: '1111',
  test2: '2222',
}

function trimHtml(html) {
  return html.replace(/>\s+</g, '><').replace(/\r|\n|\r\n/g, '').trim();
}

function writeMultipleLine(html) {
  navigator.clipboard.writeText(''); // 清空
  navigator.clipboard.write([
    new ClipboardItem({
    // 'text/plain': new Blob([text], { type: 'text/plain' }),
    'text/html': new Blob([trimHtml(html)], { type: 'text/html' }),
    })
  ]);
}

function getHTML (trStr) {
  const html = `
      <meta charset="utf-8">
      <div>
        <table>
          <colgroup>
            <col width="334">
            <col width="427">
          </colgroup>
          <tbody>
            ${trStr}
          </tbody>
        </table>
      </div>
    `
  return html
}

function getTr(key, value) {
  const template = `
    <tr>
      <td style="border: 1px solid rgb(222, 224, 227);">
        <div style="white-space: pre;">${key}
        </div>
      </td>
      <td style="border: 1px solid rgb(222, 224, 227);">
        <div style="white-space: pre;">${value}
        </div>
      </td>
    </tr>
  `;
  return template
}

function getWriteData () {
  writeMultipleLine(getHTML(Object.entries(data).map(([key, value]) => getTr(key, value)).join(''))) // 自己构造的html数据
}
</script>
</html>
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
