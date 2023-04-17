import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { getToken } from '@/composables/auth';
import { asyncRoutes } from './asyncRoutes';

import { showLoading, hideLoading } from '@/composables/util';
import store from '@/store';

// 静态路由表
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'admin',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '404'
    }
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

// 路由鉴权
router.beforeEach((to, from, next) => {
  showLoading();
  if (getToken()) {
    if (to.path === '/login') {
      next('/');
    } else {
      next();
    }
    // addRoutes(store.state.menus);
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  }
  const title = to.meta.title
    ? to.meta.title + '-' + '九月云后台'
    : '九月云后台';
  document.title = title;
});

// 后置守卫
router.afterEach(() => {
  // 关闭loading
  hideLoading();
});

// 动态添加
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addRoutes(menus: any) {
  console.log(menus);
  // 定义一个变量，用来保存是否添加新的路由
  let hasNewRoutes = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findRoute = (arr: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    arr.forEach((item: any) => {
      // console.log(item);
      const a = asyncRoutes.find((it) => it.path === item.desc);
      if (a && !router.hasRoute(a.path)) {
        router.addRoute('admin', a);
        hasNewRoutes = true;
      }
      if (item.child && item.child.length > 0) {
        findRoute(item.child);
      }
    });
  };
  findRoute(menus);
  return hasNewRoutes;
}
addRoutes(store.state.menus);

export default router;
