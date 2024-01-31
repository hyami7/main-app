## 安装
```
npm i
```

## 运行
```
npm run dev
```

## 打包
```
npm run build
```

## Git 提交规范
 - feat 增加新功能
 - fix 修复问题/BUG
 - style 代码风格相关无影响运行结果的
 - perf 优化/性能提升
 - refactor 重构
 - revert 撤销修改
 - test 测试相关
 - docs 文档/注释
 - chore 依赖更新/脚手架配置修改等
 - workflow 工作流改进
 - ci 持续集成
 - types 类型定义文件更改
 - wip 开发中

## 作为子应用嵌入

#### 安装 vite 所需依赖

```cmd
npm install vite-plugin-qiankun
```

#### 修改 vite.config 配置文件
```js
import qiankun from "vite-plugin-qiankun";
import { name } from "./package.json";

export default defineConfig((mode) => {
  return {
    main: VITE_BASE_PATH,
    plugins: [
      vue(),
      qiankun(name, {
        useDevMode: true,
      }),
    ],
    server: {
      origin: '//localhost:1818',
      headers: {
       "Access-Control-Allow-Origin": "*",
      },
    },
  };
});
```

#### 修改 main.js 根节点挂载
```js

import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

let app;

function render(props) {
  const { container } = props;
  app = createApp(App);
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  const element = container
    ? container.querySelector("#main-app")
    : document.getElementById("main-app");

  app.use(ElementPlus, { zIndex: 3000, locale: zhCn });
  app.use(router);
  app.use(store);
  app.mount(element);
}

renderWithQiankun({
  mount(props) {
    localStorage.setItem("inQianKun", qiankunWindow.__POWERED_BY_QIANKUN__);
    render(props);
  },
  bootstrap() {
    console.log("main-app bootstrap");
  },
  unmount(props) {
    console.log("main-app unmount");
    app.unmount();
  },
  update(props) {
    console.log("main-app update");
    console.log(props);
  },
});
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
```

#### 修改路由基准路径
```js
// history
let baseUrl = import.meta.env.PROD ? "/main-app/" : "";
const router = createRouter({
  history: createWebHashHistory(baseUrl),
  routes: staticRoutes,
});

// hash 由于 hash 不支持 main 基准路径 所以需要在路由中添加
// static.js
const pathPrefix = qiankunWindow.__POWERED_BY_QIANKUN__ ? "/main-app" : "";
/*
 * 后台基础静态路由
 */
const baseRoute = {
  path: pathPrefix + "/admin",
  name: "admin",
  component: () => import("@/layout/AppLayout.vue"),
  children: [
    {
      path: pathPrefix + "/admin/dashboard/index",
      name: "dashboard",
      component: () => import("@/views/dashboard/index.vue"),
      meta: {
        title: "控制台",
      },
    },
  ],
};

// /utils/router.js
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";
const routePrefix = qiankunWindow.__POWERED_BY_QIANKUN__ ? "/main-app" : "";

// 修改 function handleMenuRule 中的 
menuRule.push({
  id: routes[key].id,
  path: routePrefix + currentPath,
  name: routes[key].name,
  component: "/src/views/" + routes[key].path + ".vue",
  meta: {
    title: routes[key].title,
    icon: "fa " + routes[key].icon,
    keepalive: routes[key].keepalive,
    type: routes[key].type,
    menuType: routes[key].menuType,
    keepalive: routes[key].cacheSupported == 1 ? routes[key].name : "",
  },
  children: children,
});
```

#### 修改请求基准路径 用于主应用请求转发
```js
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";

let baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
if (qiankunWindow.__POWERED_BY_QIANKUN__) baseURL += "/main-appapi";
const request = axios.create({
  baseURL: baseURL,
});
```

#### 修改 icon 请求路径
```js
// /utils/iconfont.js
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";
const routePrefix = qiankunWindow.__POWERED_BY_QIANKUN__
  ? import.meta.env.VITE_AXIOS_BASE_URL
  : "";

const cssUrls = [routePrefix + "/fontAwesome/font-awesome.min.css"];

```

#### 修改 layout 隐藏其他布局组件
```js
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";
const isQiankun = qiankunWindow.__POWERED_BY_QIANKUN__

<el-header class="main-layout__header" v-if="!isQiankun">
<el-aside class="main-layout__aside" width="200px" v-if="!isQiankun">
<tabs v-if="!isQiankun" />
```

## 修改主应用配置

#### 添加子应用信息
```js
// 修改 micro-app.js 文件 添加子应用配置
{
  name: "main-app",
  entry: import.meta.env.VITE_SKLF_BASEAPP,
  activeRule: "/main-app",
  container: "#subapp1-container",
},
```

#### 添加对应路由
```js
{
  path: "/main-app/:page*",
  name: "main-app",
  component: MyPage,
}
```

### 修改主应用 vite.config 配置文件 代理子应用请求
```js
proxy: {
  "/main-appapi": {
    target: "http://localhost:8080",
    rewrite: (path) => path.replace(/^\/main-appapi/, ""),
  },
},
```