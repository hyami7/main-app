<template>
  <el-menu
    active-text-color="var(--main-side-active-fcolor)"
    background-color="var(--main-side-bg)"
    text-color="var(--main-side-fcolor)"
    router
    :collapse="userStore.isCollapse"
    popper-effect="dark"
    :default-active="tabsStore.activeKey"
    :default-openeds="openMenuState.openMenus"
    v-if="openMenuState.isOpen"
  >
    <MenuTree :menus="menus" />
  </el-menu>
</template>

<script setup>
import MenuTree from './menuTree';
import { useUserStore } from '@/store/modules/user';
import { useTabsStore } from '@/store/modules/tabs';
import { computed, nextTick, reactive } from 'vue';
import cloneDeep from 'lodash-es/cloneDeep';

const tabsStore = useTabsStore();
const userStore = useUserStore();
const openMenuState = reactive({
  isOpen: true,
  openMenus: [],
});

const handleSearchMenus = (arr, keyword) => {
  return arr.filter((m) => {
    m.meta.active = false;
    if (m.meta.title && m.meta.title.includes(keyword)) {
      m.meta.search = m.meta.title.replaceAll(keyword, `<span style="color:red;font-weight: bold;">${keyword}</span>`);
      if (m.meta.search) {
        m.meta.active = true;
      }
    }
    if (m.children && m.children.length) {
      m.children = handleSearchMenus(m.children, keyword);
      if (m.children.length) m.meta.active = true;
    }
    return m.meta.active;
  });
};

const getAllPaths = (menu, paths = []) => {
  if (!menu || menu.length === 0) {
    return paths;
  }
  for (const item of menu) {
    paths.push(item.path);
    if (item.children && item.children.length > 0) {
      getAllPaths(item.children, paths);
    }
  }
  return paths;
};

const menus = computed(() => {
  if (!tabsStore.searchMenuText) return tabsStore.routeViews;

  let newRouteViews = cloneDeep(tabsStore.routeViews);
  newRouteViews = handleSearchMenus(newRouteViews, tabsStore.searchMenuText);
  openMenuState.openMenus = getAllPaths(newRouteViews);
  openMenuState.isOpen = false;
  nextTick(() => {
    openMenuState.isOpen = true;
  });
  return newRouteViews;
});
</script>

<style lang="scss" scoped>
.smain-menu {
  border: none;
}
.smain-menu:not(.smain-menu--collapse) {
  width: var(--main-side-width);
  min-height: 400px;
}
</style>
