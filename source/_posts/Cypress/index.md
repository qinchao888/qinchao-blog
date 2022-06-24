---
title: Cypress
categories: 
- Cypress
---

cypress version 10.1.0

### 元素操作

```js
// 元素存在
cy.get('[data-test-id="test"]').should('exist')

//元素不存在
cy.get('[data-test-id="test"]').should('not.exist')
```
