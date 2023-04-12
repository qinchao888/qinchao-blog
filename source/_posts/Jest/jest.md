---
title: Jest
categories: 
- Jest
---

[匹配器完整文档](https://jestjs.io/zh-Hans/docs/expect)

### toBe 和 toEqual

1. toBe: 值相等
2. toEqual: 用于判断对象或数组的值相等（递归判断）
3. 判断数值时，toBe 等价于 toEqual
4. 不等于使用: .not.toBe

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).toEqual(4);
});

test('object assignment', () => {
  const data = {one: 1, two: 2};
  expect(data).toEqual({one: 1, two: 2});
});
```

### null、undefined、false 的判断

1. toBeNull: 匹配null
2. toBeUndefined: 匹配undefined
3. toBeDefined: 与toBeUndefined相反
4. toBeTruthy: 匹配任何if语句为真
5. toBeFalsy: 匹配任何if语句为假

### 比较运算

1. toBeGreaterThan: >
2. toBeGreaterThanOrEqual: >=
3. toBeLessThan: <
4. toBeLessThanOrEqual: <=
5. 浮点型判断使用：toBeCloseTo

```js
test('0.1 + 0.2', () => {
  expect(0.1 + 0.2).toBeCloseTo(0.3);
});
```

### 正则

1. not.toMatch()
2. toMatch()

```js
test('match', () => {
  expect('this str is match').toMatch(/this/)
})

test('not match', () => {
  expect('this str not match').not.toMatch(/notmatch/)
})
```

### 其他

1. toContain: 检查一个数组或可迭代对象是否包含某个特定项
2. toThrow: 判断函数调用时是否抛错

```js
const array = ['a', 'b', 'c']

test('contain', () => {
  expect(array).toContain('a');
  expect(new Set(array)).toContain('b')
})
```

```js
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);
});
```

### 自定义匹配器

expect.extend

```js
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

test('numeric ranges', () => {
  expect(100).toBeWithinRange(90, 110);
  expect(101).not.toBeWithinRange(0, 100);
  expect({apples: 6, bananas: 3}).toEqual({
    apples: expect.toBeWithinRange(1, 10),
    bananas: expect.not.toBeWithinRange(11, 20),
  });
});
```

### getByText

匹配的内容有且只有一个时通过匹配，否则报错。

1. 隐式类型判断：screen.getByText('Search:');
2. 显式类型判断：expect(screen.getByText('Search:')).toBeInTheDocument();

```js
// 精确匹配
await waitFor(() => screen.getByText('我是内容一'));

// 模糊匹配
awiat waitFor(() => screen.getByText(/我是内容/));
```

### waitFor

检测的内容可以是由接口返回时，即是一个Promise，使用waitFor。

### jest.clearAllMocks()、jest.resetAllMocks()、jest.restoreAllMocks()

1. jest.clearAllMocks()：重置time，即调用次数，toHaveBeenCalledTimes
2. jest.resetAllMocks()：重置返回值为undefined
3. jest.restoreAllMocks()：绑定的spies是original implementation，而非mockReturnValue指定的值。

[参考](https://stackoverflow.com/questions/58151010/difference-between-resetallmocks-resetmodules-resetmoduleregistry-restoreallm)