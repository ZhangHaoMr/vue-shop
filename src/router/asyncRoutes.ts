import type { RouteRecordRaw } from 'vue-router';

// 动态路由表
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/main.vue'),
    meta: {
      title: '后台首页'
    }
  },
  {
    path: '/category/list',
    component: () => import('@/pages/category/list.vue'),
    meta: {
      title: '分类管理'
    }
  },
  {
    path: '/goods/list',
    component: () => import('@/pages/goods/list.vue'),
    meta: {
      title: '商品管理'
    }
  },
  {
    path: '/skus/list',
    component: () => import('@/pages/skus/list.vue'),
    meta: {
      title: '规则管理'
    }
  },
  {
    path: '/user/list',
    component: () => import('@/pages/user/list.vue'),
    meta: {
      title: '用户管理'
    }
  },
  {
    path: '/user/level',
    component: () => import('@/pages/user/level.vue'),
    meta: {
      title: '会员等级'
    }
  },
  {
    path: '/order/list',
    component: () => import('@/pages/order/list.vue'),
    meta: {
      title: '订单管理'
    }
  },
  {
    path: '/comment/list',
    component: () => import('@/pages/comment/list.vue'),
    meta: {
      title: '评论管理'
    }
  },
  {
    path: '/coupon/list',
    component: () => import('@/pages/coupon/list.vue'),
    meta: {
      title: '优惠券管理'
    }
  },
  {
    path: '/image/list',
    component: () => import('@/pages/image.vue'),
    meta: {
      title: '图库管理'
    }
  },
  {
    path: '/notice/list',
    component: () => import('@/pages/notice/list.vue'),
    meta: {
      title: '公告管理'
    }
  },
  {
    path: '/distribution/index',
    component: () => import('@/pages/distribution/index.vue'),
    meta: {
      title: '分销员管理'
    }
  },
  {
    path: '/distribution/setting',
    component: () => import('@/pages/distribution/setting.vue'),
    meta: {
      title: '分销设置'
    }
  },
  {
    path: '/setting/base',
    component: () => import('@/pages/set/base.vue'),
    meta: {
      title: '基础设置'
    }
  },
  {
    path: '/setting/buy',
    component: () => import('@/pages/set/buy.vue'),
    meta: {
      title: '交易设置'
    }
  },
  {
    path: '/setting/ship',
    component: () => import('@/pages/set/ship.vue'),
    meta: {
      title: '物流设置'
    }
  },
  {
    path: '/manager/list',
    component: () => import('@/pages/manager.vue'),
    meta: {
      title: '管理员管理'
    }
  },
  {
    path: '/access/list',
    component: () => import('@/pages/access.vue'),
    meta: {
      title: '权限管理'
    }
  },
  {
    path: '/role/list',
    component: () => import('@/pages/role.vue'),
    meta: {
      title: '角色管理'
    }
  }
];
