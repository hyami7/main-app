// router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { staticRoutes } from '@/router/static';
import { useUserStore } from '@/store/modules/user';
import { loading } from '@/utils/loading';

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

router.beforeEach((to, from, next) => {
  nprogress.start();
  if (!window.existLoading) {
    loading.show();
    window.existLoading = true;
  }

  const userStore = useUserStore();
  if (!userStore.user && to.name != 'login') {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
    return;
  }

  next();
});

router.afterEach((to, from) => {
  if (window.existLoading) {
    loading.hide();
  }
  nprogress.done();
});

export default router;

// 定义一个resetRouter 方法，在退出登录后或token过期后 需要重新登录时，调用即可
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}
