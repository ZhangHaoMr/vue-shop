import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { getToken } from '@/composables/auth';
// import store from '@/store';

import { showLoading, hideLoading } from '@/composables/util';

// 静态路由表
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'admin',
    component: () => import('@/views/home.vue'),
    redirect: 'index',
    meta: {
      title: '后台首页'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/pages/main.vue'),
        meta: {
          title: '后台首页'
        }
      },
      {
        path: 'shop_goods_list',
        component: () => import('@/pages/shop_goods_list.vue'),
        meta: {
          title: '商品管理'
        }
      },
      {
        path: 'shop_category_list',
        component: () => import('@/pages/shop_category_list.vue'),
        meta: {
          title: '分类管理'
        }
      },
      {
        path: 'shop_sku_list',
        component: () => import('@/pages/shop_sku_list.vue'),
        meta: {
          title: '规则管理'
        }
      },
      {
        path: 'shop_coupon_list',
        component: () => import('@/pages/shop_coupon_list.vue'),
        meta: {
          title: '优惠券管理'
        }
      },
      {
        path: 'user_user-list_list',
        component: () => import('@/pages/shop_user-list_list.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'user_user-level_list',
        component: () => import('@/pages/shop_user-level_list.vue'),
        meta: {
          title: '会员等级'
        }
      },
      {
        path: 'shop_comment_list',
        component: () => import('@/pages/shop_comment_list.vue'),
        meta: {
          title: '评论管理'
        }
      }
    ]
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

// 动态路由表
// const asyncRoutes: RouteRecordRaw[] = [];

// 动态添加
// function addRoutes(menus: any) {
//   const findAddRoutes = (arr: any) => {
//     arr.forEach((m: any) => {
//       const item: any = asyncRoutes.find((o) => o.path === m.path);
//       if (item && !router.hasRoute(item)) {
//         router.addRoute('admin', item);
//       }

//       if (m.child && m.child.length > 0) {
//         findAddRoutes(m.child);
//       }
//     });
//   };
//   findAddRoutes(menus);
// }

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

router.afterEach(() => {
  hideLoading();
});

export default router;
