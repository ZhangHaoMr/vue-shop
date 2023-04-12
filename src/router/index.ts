import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { getToken } from '@/composables/auth';

import { showLoading, hideLoading } from '@/composables/util';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/home.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/views/main.vue'),
        meta: {
          title: '后台首页'
        }
      }
    ]
  },
  {
    path: '/login',
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

router.beforeEach((to, from, next) => {
  showLoading();
  if (getToken()) {
    if (to.path === '/login') {
      next('/');
    } else {
      next();
    }
  } else {
    if (to.path === '/login') {
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
