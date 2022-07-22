---
title: 编辑浏览器内容
categories: 
- JavaScript
---

```js
document.designMode = 'on';
document.body.contentEditable = true;
((tags) => {
  function remove (tag) {
    const listeners = window.getEventListeners(tag);
    if (Object.keys(listeners).length) {
      for (let eventName in listeners) {
        listeners[eventName].forEach((item, index) => {
          tag.removeEventListener(eventName, item.listener, false)
          tag.removeEventListener(eventName, item.listener, true)
        })
      }
    }
  }
  remove(document);
  (Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document)))).filter(name => name.indexOf('on') === 0).forEach(name => {
    document[name] = null;
    tags.forEach(tag => {
      remove(tag)
      tag[name] = null;
    })
  })
})(Array.from(document.getElementsByTagName('*')));
```