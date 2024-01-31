import { defineStore } from 'pinia';
import { store } from '@/store/index';
import { Local } from '@/utils/storage';
import { USER, CURRENT_APP } from '@/utils/constants';
import { ElMessage, ElMessageBox } from 'element-plus';
import { logout } from '@/api/common';
import { useRouter } from 'vue-router';

const state = {
  siteName: 'main',
  isCollapse: false,
  user: Local.get(USER),
  currentApp: Local.get(CURRENT_APP),
  appMenus: [],
};

export const useUserStore = defineStore({
  id: 'user',
  state: () => state,
  getters: {},
  actions: {
    setIsCollapse(payload) {
      this.isCollapse = payload;
    },
    setUser(payload) {
      this.user = payload;
      Local.set(USER, this.user);
    },
    setCurrentApp(app) {
      this.currentApp = app;
      Local.set(CURRENT_APP, app);
    },
    setAppMenus(menus) {
      this.appMenus = menus;
    },
    logout() {
      ElMessageBox.confirm('确认退出吗？', {})
        .then(async () => {
          await logout();
          ElMessage.success('退出成功！');
          this.setUser(null);
          const router = useRouter();
          router.push({ name: 'login' });
        })
        .catch(() => {});
    },
  },
});

// 在组件setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
