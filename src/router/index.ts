import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { getToken } from '@/composables/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {
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
});

export default router;
