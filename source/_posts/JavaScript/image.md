---
title: 图片操作
categories: 
- JavaScript
---

### 获取图片宽高和存储大小

```js
// 获取图片宽高
const getImageSize = (imgUrl) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const { width, height } = img
      resolve({
        width,
        height,
      })
    }
    img.src = imgUrl
  })
}

// 获取图片大小
const getImageFileSize = (imgUrl) => {
  return new Promise(async (resolve) => {
    const res = await axios.get(imgUrl)
    const contentLength = res.headers['content-length']
    const size = `${parseFloat((contentLength / 1024 / 1024).toFixed(2))}MB`
    resolve(size)
  })
}

getImageSize(imgUrl).then(({ width, height}) => {
  console.log(`width: ${width}, height: ${height}px`)
})

getImageFileSize(imgUrl).then((size) => {
  console.log(`size: ${size}`)
})
```