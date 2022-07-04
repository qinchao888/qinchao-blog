---
title: Cypress
categories: 
- Cypress
---

cypress version 10.1.0

[官方文档](https://docs.cypress.io/api/commands/and)

### command

```sh
# 打开窗口，可自己选择想要运行的文件，修改代码后自动执行
> npx cypress open

# 运行单个文件，不会监听代码的变更
> npx cypress run --spec cypress/e2e/test.cy.ts --browser chrome --headed --no-exit
```

### 函数

#### before 和 beforeEach 和 after

before：在第一个用例(it)之前运行

beforeEach：在每个it执行前都会执行一次。

after：在所有用例执行后运行

```js
// 基础示例
describe('module', () => {

  before(() => {
    console.log('before do something');
  });

  beforeEach(() => {
    console.log('before each do something')
  });

  describe('test1', () => {
    it('check something', () => {
      // ....
    })
  });

  describe('test2', () => {
    it('check something', () => {
      // ....
    })
  });
})
```

#### describe

描述块，其内部定义的beforeEach函数只对其内部的it作用

### 元素操作

```js
// 元素存在
cy.get('test').should('exist');

//元素不存在
cy.get('test').should('not.exist');

// 元素不可点击
cy.get('test').should('be.disabled');

// 元素可点击
cy.get('test').should('not.be.disabled');

// 元素可见
cy.get('test').should('be.visible');

// 元素不可见
cy.get('test').should('be.hidden');

// 元素数量
cy.find('test').should('have.length', 1);

// 第几个元素
cy.get('tbody>tr').eq(0); // 第0个元素

// 第一个元素
cy.get('tbody>tr').first();

// 最后一个元素
cy.get('tbody>tr').last();

// 下一个元素
cy.get('li').next();

// 其下的所有元素
cy.get('li').nextAll();

// 其下的所有元素，直到指定的元素（不包含）为止
cy.get('#veggies').nextUntil('#nuts');

// 上一个元素
cy.get('.active').prev();

// 其上的所有元素
cy.get('.third').prevAll();

// 其上的所有元素，直到指定的元素（不包含）为止
cy.get('#nuts').prevUntil('#veggies');

// 相邻元素
cy.get('td').siblings();

// 过滤元素
cy.get('ul').find('li').filter('.active'); // 具有active类名的li元素
cy.get('li').filter(':contains("Services")'; // filter by text
cy.get('li').not('.active'); // 无active类名的li元素

// 元素的父元素
// <tr><td>My first client</td></tr>
cy.contains('My first client').parent('tr');

// 元素所有的父元素
cy.get('li.active').parents();

// 元素所有的父元素，直至指定元素（不包含）为止
cy.get('.active').parentsUntil('.nav');

// 元素的子元素
cy.get('ul').children(); // 所有的li元素
cy.get('ul').children('.active'); // 具有active类名的li元素

// 元素本身或离得最近的祖先元素
cy.get('td').closest('tr');

// Scopes all subsequent cy commands to within this element.
cy.get('form').within(($form) => {
  cy.get('input[name="email"]').type('john.doe@email.com');
  cy.get('input[name="password"]').type('password');
  cy.root().submit(); // cy.root()即为cy.get('form')

  // temporarily escape the .within context，脱离上下文
  cy.root().closest('.example').find('#name').type('Joe');
});

// 元素别名
beforeEach(() => {
  cy.get('button[type=submit]').as('submitBtn');
});

it('disables on click', () => {
  cy.get('@submitBtn').should('be.disabled');
});
```

### 表单元素操作

```js
// 设置值
cy.get('[data-test-id="textarea"]').type('this is textarea value');

// 检测值
cy.get('[data-test-id="textarea"]').should('have.value', 'this is textarea value');

// 检测文本：select
cy.get('select#name option:selected').should('have.text', 'Peter')

// 是否勾选
cy.get('input[type="checkbox"]').should('be.checked');

// 勾选
cy.get('[type="checkbox"]').check();
cy.get('[type="radio"]').check();
// 勾选指定值的元素
cy.get('[type="radio"]').check('this is radio value')
// 勾选多个指定值的元素
cy.get('form input').check(['this is input value', 'this is radio value'])

// 取消勾选
cy.get('[type="checkbox"]').uncheck();

// 是否被选中：select
cy.get('option:first').should('be.selected');

// 是否聚焦
cy.get('input').should('have.focus');

// 聚焦
cy.get('input').focus();

// 失焦
cy.get('input').blur();

// 已聚焦的元素
cy.focused();

// 清除input或textarea元素值
cy.get('input').clear();

// select
// Select the option with the text apples
cy.get('select').select('apples').should('have.value', '456');
// Select the option with the value "456"
cy.get('select').select('456').should('have.value', '456');
// Select the option with index 0
cy.get('select').select(0).should('have.value', '456');
// 多选
cy.get('select').select(['apples', 'bananas']).invoke('val').should('deep.equal', ['456', '458']);
```

### 属性值检测

```js
// css check
// 判断test元素是否存在css属性cursor: not-allowed
cy.get('[data-test-id="test"]').should('have.css', 'cursor').and('equal', 'not-allowed')

// class check
cy.get('div').should('have.class', 'wrapper');

// id check
cy.get('div').should('have.id', 'wrapper');

// attr check
cy.get('a').should('have.attr', 'href'); 
```

### 内容检测

```js
// 对象属性检测
cy.wrap({ foo: 'bar' }).should('have.property', 'foo').and('eq', 'bar') ;

// 文本
cy.contains('test content');
cy.get('tr').eq(2).should('contain', 'Canada')

// 忽略大小写
cy.get('textarea').clear().type('Capital Sentence').contains('capital sentence', { matchCase: false });

// 节点内容是否为空
cy.get('test').should('be.empty');

// 包含字符
cy.wrap('content').and('include', 'con');

// 不包含字符
cy.wrap('content').and('not.include', 'can');
```

### 页面

```js
cy.go('back');
cy.go('forward');
cy.go(-1);
cy.go(1);
cy.reload();

// url
cy.url();

// url中#及其后的内容
cy.hash()

// location
cy.visit('http://localhost:8000/app/index.html?q=dan#/users/123/edit')
cy.location().should((loc) => {
  expect(loc.hash).to.eq('#/users/123/edit')
  expect(loc.host).to.eq('localhost:8000')
  expect(loc.hostname).to.eq('localhost')
  expect(loc.href).to.eq(
    'http://localhost:8000/app/index.html?q=dan#/users/123/edit'
  )
  expect(loc.origin).to.eq('http://localhost:8000')
  expect(loc.pathname).to.eq('/app/index.html')
  expect(loc.port).to.eq('8000')
  expect(loc.protocol).to.eq('http:')
  expect(loc.search).to.eq('?q=dan')
  expect(loc.toString()).to.eq(
    'http://localhost:8000/app/index.html?q=brian#/users/123/edit'
  )
});

// 视口大小
cy.viewport(550, 750); // Set viewport to 550px x 750px
cy.viewport('ipad-2'); // 768	x 1024
```

### 比较

```js
cy.get('ul li').its('length').should('be.gt', 2);
```

### 正则

```js
cy.wrap({ name: 'abc' }).should('have.property', 'name').and('match', /bc/);
```

### 定时器

```js
cy.clock();
cy.tick(1000);
```

### 其他

```js
// debug
cy.debug();

// document
cy.document();

// window
cy.window();

// end：终止当前链
cy.contains('User: Cheryl')
  .click()
  .end() // yield null
  .contains('User: Charles')
  .click() // contains looks for content in document now

// its：Get a property's value on the previously yielded subject.
cy.wrap({ width: '50' }).its('width')

// log
cy.log('info');

// scollIntoView
cy.get('button#checkout').scrollIntoView().should('be.visible');

// shadow dom
cy.get('.shadow-host').shadow().find('.my-button').click();

// spread：数组变成参数
cy.wait(['@getUsers', '@getActivities', '@getComments']).spread(
  (getUsers, getActivities, getComments) => {
    // each interception is now an individual argument
  }
);

// title
cy.title().should('eq', 'this is title');
```

### 接口

#### 本地mock数据

1. 注意：as命令是异步的，需要在其他的异步命令中获取数据，如在then中
2. fixture中使用this获取到as别名的数据
3. All intercepts are automatically cleared before every test.

```js
cy.intercept('/api/test**', { fixture: 'test.json' }).as(
  'getTestData'
);
cy.wait(['@getTestData']);
```

```js
beforeEach(() => {
  cy.fixture('users-admins.json').as('admins');
});

it('the users fixture is bound to this.admins', function () { // 注意不要使用箭头函数
  cy.log(`There are ${this.admins.length} administrators.`);
});
```

```js
// 通过设置请求的alias来设置别名
cy.intercept('POST', '/graphql', (req) => {
  if (req.body.hasOwnProperty('query') && req.body.query.includes('mutation')) {
    req.alias = 'gqlMutation'
  }
})

// assert that a matching request has been made
cy.wait('@gqlMutation')
```

```js
// 请求结果的检测
cy.wait('@someRoute').its('request.body').should('include', 'user')

// 操作请求结果
cy.intercept('/integrations', (req) => {
  // req.continue() with a callback will send the request to
  // the destination server
  req.continue((res) => {
    // 'res' represents the real destination response
    // you can manipulate 'res' before it's sent to the browser
  })
})
```

#### 异步数据

cypress中的then类似于Promise，但是不能当做Promise使用，即在内部使用 new Promise 等将或报错，只能使用链式的方式。

```js
/* @typescript-eslint/no-invalid-this: off */

cy.fixture('test.json').as('testData');
cy.fixture('user.json').then(function (res) {
  res.data.test = this.testData;
  const cya = cy.intercept('GET', 'api/user', res);
  if (config.as) {
    cya.as(config.as);
  }
});
```

### 示例

#### 元素遍历

```ts
cy.get('p')
  .should('not.be.empty')
  .and(($p: JQuery<HTMLParagraphElement>) => {
    expect($p).to.have.length(3);

    expect($p.first()).to.contain('Hello World');

    const classes: JQuery<string> = $p.map((i, el: HTMLParagraphElement) => {
      const jEl: JQuery<HTMLParagraphElement> = Cypress.$(el);
      return jEl.attr('class');
    });

    const classList: string[] = classes.get();
    expect(classList).to.deep.eq(['text-primary', 'text-danger', 'text-default']);
  });

cy.get('ul>li').each(($el, index, $list) => {
  // $el is a wrapped jQuery element
  if ($el.someMethod() === 'something') {
    // wrap this element so we can
    // use cypress commands on it
    cy.wrap($el).click()
  } else {
    // do something else
  }
})
```

#### play mp3

```js
cy.fixture('audio/sound.mp3', 'base64').then((mp3) => {
  const uri = 'data:audio/mp3;base64,' + mp3
  const audio = new Audio(uri)

  audio.play()
})
```

### get和find的区别

The cy.get command always starts its search from the cy.root element. In most cases, it is the document element, unless used inside the .within() command. The .find command starts its search from the current subject.

```html
<div class="test-title">cy.get vs .find</div>
<section id="comparison">
  <div class="feature">Both are querying commands</div>
</section>
```

```js
cy.get('#comparison')
  .get('div')
  // finds the div.test-title outside the #comparison
  // and the div.feature inside
  .should('have.class', 'test-title')
  .and('have.class', 'feature')
cy.get('#comparison')
  .find('div')
  // the search is limited to the tree at #comparison element
  // so it finds div.feature only
  .should('have.length', 1)
  .and('have.class', 'feature')
```