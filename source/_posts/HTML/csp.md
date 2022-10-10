---
title: CSP与nonce
categories: 
- HTML
---

### csp

CSP限制页面的资源，防止XSS攻击

[参考1](https://wayou.github.io/2018/08/12/Content-Security-Policy-(CSP)-%E4%BB%8B%E7%BB%8D/)
[参考2](http://www.alloyteam.com/2020/08/csp-nonce/)


### 设置nonce

```js
/* express/app.js */

const express = require('express');
const path = require('path');
// const { v4: uuidv4 } = require('uuid');
const { expressCspHeader, NONCE } = require('express-csp-header');

const app = express();
app.set('view engine', 'ejs');

// let nonce = ''

app.use('/static', express.static('public'));

app.use(expressCspHeader({
  directives: {
    'script-src': [NONCE]
  }
}));

// app.use((req, res, next) => {
//   nonce = uuidv4()
//   res.set({
//     'Content-Security-Policy': `script-src 'nonce-${nonce}'`
//   })
//   next()
// });


// app.get('/index', (req, res) => {
//   res.render('index', {
//     nonce,
//   })
// });

app.get('/index', (req, res) => {
  res.render('index', {
    nonce: req.nonce,
  })
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/index.html'))
// })

app.listen(8888, () => {
  console.log('localhost:8888')
});

```

```html
<!-- express/views/index.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script nonce="<%= nonce %>">console.log('this is test')</script>
  <script src="./static/js/a.js" nonce="<%= nonce %>"></script>
</head>
<body>
  hello world
</body>
</html>
```