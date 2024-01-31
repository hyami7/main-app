import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from '@/store/index';
import './styles/index.scss';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { start } from 'qiankun';
// 启动 qiankun
start();

let app;

function render(props) {
  const { container } = props;
  app = createApp(App);
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  const element = container ? container.querySelector('#main-app') : document.getElementById('main-app');

  app.use(ElementPlus, { zIndex: 3000, locale: zhCn });
  app.use(router);
  app.use(store);
  app.mount(element);
}
render({});
