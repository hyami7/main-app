import { useUserStore } from '@/store/modules/user';
import { useTitle } from '@vueuse/core';
import { nextTick } from 'vue';
import router from '@/router/index';

/**
 * 根据路由 meta.title 设置浏览器标题
 */
export function setTitleFromRoute() {
  if (typeof router.currentRoute.value.meta.title != 'string') {
    return;
  }
  nextTick(() => {
    let webTitle = router.currentRoute.value.meta.title || '';
    const title = useTitle();
    const userStore = useUserStore();
    title.value = `${webTitle}${userStore.siteName ? ' - ' + userStore.siteName : ''}`;
  });
}

/**
 * 加载网络css文件
 * @param url css资源url
 */
export function loadCss(url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.crossOrigin = 'anonymous';
  document.getElementsByTagName('head')[0].appendChild(link);
}

/**
 * 加载网络js文件
 * @param url js资源url
 */
export function loadJs(url) {
  const link = document.createElement('script');
  link.src = url;
  document.body.appendChild(link);
}
