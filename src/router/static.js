import baseApp from '@/views/micro/baseApp';
// import baseApp from '@/views/merchant/openBank';

/*
 * 后台基础静态路由
 */
const baseRoute = {
  path: '/admin',
  name: 'admin',
  component: () => import('@/layout/AppLayout.vue'),
  children: [
    {
      path: '/admin/dashboard/index',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        title: '控制台',
      },
    },
    {
      path: '/base-app/:page*',
      name: 'base-app',
      component: baseApp,
    },
  ],
};

/*
 * 静态路由
 */
const staticRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:path(.*)*',
    redirect: '/admin/dashboard/index',
  },
];
staticRoutes.push(baseRoute);
export { staticRoutes, baseRoute };
