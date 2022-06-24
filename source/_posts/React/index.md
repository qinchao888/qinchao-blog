---
title: React基础知识
categories: 
- React
---

### ReactDOM.render 和 ReactDOM.createPortal的区别

1.ReactDOM.render(element, container[, callback])

element：React元素
container：dom元素
callback：回调函数，该回调将在组件被渲染或更新之后被执行

2.ReactDOM.createPortal(child, container)

child：React元素
container：dom元素

区别：使用render渲染元素，点击元素时事件不会冒泡到根元素上，而使用createPortal渲染元素，点击元素时，包裹该元素的父级元素可以捕获到该点击事件。