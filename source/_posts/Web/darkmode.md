---
title: darkmode的实现
categories: 
- Web
---

### 实现原理

1. 利用css变量，即 var，通过改变根元素或body元素上的属性，使其对应的var变量生效
2. 当需要设置给暗黑模式时，则只需要设置 document.documentElement.setAttribute('data-theme-mode', 'dark') 即可
3. 引入样式时需要将 light 和 dark 的样式均引入

```css
:root["data-theme-mode=dark"] {
  --bg-color: #000000;
}

:root {
  --bg-color: #ffffff;
}

/* 使用 */
.test {
  color: var(--bg-color);
}
```

### 示例

```js
// plugins/theme.js
const valueMap = {}

module.exports = {
  install: function (less, pluginManager, functions) {
    functions.add('theme-css-var', function(selector) {
      return new less.tree.Ruleset(
        [new less.tree.Selector(selector.value)],
        Object.entries(valueMap).map(([name, value]) => new less.tree.Declaration(name, value))
      )
    });
    
    functions.add('theme', function(...args) {
      const value = args[1].value
      if (args[0].name === 'var') {
        const name = args[0].args[0].value
        valueMap[name] = value
      }
      return args[0]
    });
  }
}
```

```less
/* theme/light.less */
@plugin "../plugins/theme.js";

@bg-base: theme(var(--bg-base), #ffffff);

theme-css-var(':root');

/* theme/dark.less */
@plugin "../plugins/theme.js";

@bg-base: theme(var(--bg-base), #000000);

theme-css-var(':root[data-theme-mode="dark"]');

/* index.less */
@import "./theme/light.less";
@import "./theme/dark.less";
```

```json
// package.json
{
  "scripts": {
    "build": "lessc index.less index.css"
  }
}

```
```css
/* 产物 index.css */
:root[data-theme-mode="dark"] {
  --bg-base: #000000;
}
:root {
  --bg-base: #ffffff;
}
```