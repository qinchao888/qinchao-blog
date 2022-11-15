---
title: React路由监测
categories: 
- React
---

### Prompt

#### 方式一

版本：react-router-dom v5

作用：监听页面路由的变化或浏览器刷新或浏览器返回

```tsx
import React, { useEffect } from 'react'
import { Prompt, useHistory } from 'react-router-dom'
import * as H from 'history'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const PromptModal = () => {
  
  // todo: 获取和更新state
  // const { hasUnsavedChanges, updateState } = ...

  const history = useHistory()

  // 离开或刷新浏览器时触发默认提示
  useEffect(() => {
    window.onbeforeunload = hasUnsavedChanges
      ? (e) => {
          e.preventDefault()
          e.returnValue = ''
        }
      : noop

    return () => {
      window.onbeforeunload = noop
    }
  }, [hasUnsavedChanges])

  // 切换路由时的弹框提示
  const handlePrompt = (location: H.Location, action: H.Action) => {
    if (!hasUnsavedChanges) {
      return true
    }
    Modal.confirm({
      title: '当前内容未保存，确认退出吗？',
      onOk: () => {
        // todo: 更新state中的hasUnsavedChanges值
        // updateState({
        //   hasUnsavedChanges: false,
        // })
        const path = location.pathname + location.search
        // hasUnsavedChanges状态更新为异步，为防止此处切换路由时再次触发handlePrompt，故使用setTimeout
        setTimeout(() => {
          history[action.toLocaleLowerCase()](path)
        })
      }
    })
    return false
  }

  return <Prompt when={hasUnsavedChanges} message={handlePrompt} />
}

export default PromptModal
```

#### 方式二

使用getUserConfirmation

```tsx
// App.tsx
<BrowserRouter getUserConfirmation={getUserConfirmation}>
  ...
</BrowserRouter>

// 此处可能无法操作globalState，原因：state尚未完成初始化
const getUserConfirmation = (
  message: string,
  callback: (ok: boolean) => void,
) => {
  Modal.confirm({
    title: message,
    onOk: () => {
      callback(true)
    },
    onCancel: () => {
      callback(false)
    }
  })
}

// prompt.tsx
<Prompt message="当前内容未保存，确认退出吗？" />
```