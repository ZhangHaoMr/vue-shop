import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import 'windi.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import perimssion from './perimssion/perimssion';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(perimssion);
app.use(router);
app.use(store);

// console.log(store);
import 'nprogress/nprogress.css';

app.mount('#app');
