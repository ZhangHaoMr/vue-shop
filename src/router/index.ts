import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

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

export default router;
