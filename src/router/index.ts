import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { getToken } from '@/composables/auth';

import { showLoading, hideLoading } from '@/composables/util';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/main',
    component: () => import('@/views/main.vue'),
    meta: {
      title: '后台首页'
    }
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {
  showLoading();
  if (getToken()) {
    if (to.path === '/login' || to.path === '/') {
      next('/main');
    } else {
      next();
    }
  } else {
    if (to.path === '/login' || to.path === '/') {
      next();
    } else {
      next('/login');
    }
  }
  const title = (to.meta.title ? to.meta.title : '') + '-' + '九月云后台';
  document.title = title;
});

router.afterEach(() => {
  hideLoading();
});

export default router;
