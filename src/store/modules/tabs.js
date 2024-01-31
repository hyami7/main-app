import { defineStore } from 'pinia';
import { store } from '@/store/index';
import { Local } from '@/utils/storage';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from '@/router/index';
import { TAB_STORE } from '@/utils/constants';

const state = {
  // tab
  tabs: [],
  routeViews: [],

  // 菜单搜索
  searchMenuText: '',
  isSearchMenu: false,

  // keepalive
  activeKey: '',
  keepaliveList: [],
};

export const useTabsStore = defineStore({
  id: 'tabs',
  state: () => state,
  getters: {},
  actions: {
    // tab
    setTabs(tabs) {
      this.tabs = tabs;
      // 关闭tab时清除keepalive
      this.setKeepaliveList(tabs.map((x) => x.name));
    },
    addTabs(tab) {
      const target = this.tabs.find((item) => item.name === tab.name);
      if (target) return;
      this.tabs.push(tab);
    },
    setRouteViews(menus) {
      this.routeViews = menus;
    },

    // 菜单搜索
    setSearchMenuText(val) {
      this.searchMenuText = val;
    },
    setIsSearchMenu(bool) {
      this.isSearchMenu = bool;
    },

    // keepalive
    setActiveKey(path) {
      this.activeKey = path;
    },
    addKeepaliveList(menu) {
      const target = this.keepaliveList.find((x) => x === menu.name);
      if (target) return;
      this.keepaliveList.push(menu.name);
    },
    setKeepaliveList(list) {
      this.keepaliveList = list;
    },

    /**
     * 关闭tab方法 同时去掉 keepalive 缓存
     * @param {*} route 不传默认为当前路由
     * @description 关闭的 tab 索引大于0 则取前面
     * 否则取关闭 tab 的索引
     * tabs 数据清空则取第一个
     */
    closeTab(route) {
      route = route || router.currentRoute?.value || {};
      let mIndex = 0;
      const newTabs = this.tabs.filter((x, i) => {
        if (x.name === route.name) {
          mIndex = i;
          return false;
        }
        return true;
      });
      this.setTabs(newTabs);
      if (this.tabs.length >= 1) {
        if (mIndex > 0) {
          router.push(this.tabs[mIndex - 1]);
        } else {
          router.push(this.tabs[mIndex]);
        }
      } else {
        router.push(this.tabs[0]);
      }
    },

    /**
     * 刷新 tab 方法
     * @param {*} route 不传默认为当前路由
     * 先去掉 keepalive 数组项与 activeKey 再还原
     */
    async refreshTab(route) {
      route = route || router.currentRoute?.value || {};
      this.setKeepaliveList(this.keepaliveList.filter((x) => x !== route.name));
      this.setActiveKey('');
      await router.push(route);
      this.setActiveKey(route.path);
      this.addKeepaliveList(route);
    },
  },
  persist: {
    key: TAB_STORE,
  },
});

// 在组件setup函数外使用
export function useTabsStoreWithOut() {
  return useTabsStore(store);
}
