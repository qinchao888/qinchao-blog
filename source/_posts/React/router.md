---
title: react-router使用
categories: 
- React
---

routerv6的用法

## Route

以下两种写法等价

```js
<Routes>
  <Route path="/aa" element={<Layout />}>
    <Route path="a" element={<A />} /> {/* 不可使用/a */}
    <Route path="b" element={<B />} />
  </Route>
</Routes>

<Routes>
  <Route path="/aa" element={<Layout />}>
    <Route path="/aa/a" element={<A />} />
    <Route path="/aa/b" element={<B />} />
  </Route>
</Routes>
```

## Link和NavLink的区别

Link：默认路由时不会刷新浏览器，而a链接会刷新

### relative="path"

Link中默认设置的 .. 是按照路由层次，而不是按照path，即下例中 test/aa/bb 的上一层是 /，设置了relative="path"后上一层变成了test/aa。

```js
import { Route, Routes, BrowserRouter, Outlet, NavLink, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <p>this is layout</p>
      <Outlet />
    </div>
  );
};

const Test1 = () => <p>this is test1</p>;

const Test2 = () => (
  <>
    <p>this is test2</p>
    <Link to=".." relative="path">
      Cancel
    </Link>
  </>
);

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <ul>
          <li><NavLink to='/'>首页</NavLink></li>
          <li><NavLink to='/test/aa'>aa</NavLink></li>
          <li><NavLink to='/test/aa/bb'>bb</NavLink></li>
        </ul>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="test/aa" element={<Test1 />} />
            <Route path="test/aa/bb" element={<Test2 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
```