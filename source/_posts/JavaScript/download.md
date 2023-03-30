---
title: 下载内容
categories: 
- JavaScript
---

### 下载文件

```ts
import contentDisposition from 'content-disposition'

export const downloadFile = async (url: string, sourceFileName: string) => {
  let fileName = sourceFileName

  // 从content-disposition解析出filename，其由后端指定
  const disposition = res.headers.get('content-disposition')
  if (disposition && !fileName) {
    const fileObj = contentDisposition.parse(disposition)
    fileName = decodeURIComponent(fileObj.parameters?.filename) ?? ''
  }

  const blob = await res.blob()
  const el = document.createElement('a')
  const downloadUrl = window.URL.createObjectURL(blob)
  el.download = fileName
  el.style.display = 'none'
  el.href = downloadUrl
  document.body.appendChild(el)
  el.click()
  document.body.removeChild(el) // 或 el.remove()
  window.URL.revokeObjectURL(downloadUrl)
}
```
