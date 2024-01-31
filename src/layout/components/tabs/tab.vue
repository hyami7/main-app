<template>
  <div class="main-navbar">
    <el-tabs v-model="state.activeTabKey">
      <el-tab-pane :name="item.path" v-for="item in tabsStore.tabs" :key="item.path">
        <template #label>
          <div class="main-navbar__item" @contextmenu.prevent="onContextmenu(item, $event)" @click="handleTab(item)">
            <span style="margin: 0 20px">
              {{ item.meta.title }}
            </span>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
    <Contextmenu ref="contextmenuRef" :items="state.contextmenuItems" @contextmenuItemClick="onContextmenuItem" />
  </div>
</template>

<script setup>
import { nextTick, reactive, ref, watch } from 'vue';
import Contextmenu from './contextmenu.vue';
import { useTabsStore } from '@/store/modules/tabs';
import { useRouter, useRoute } from 'vue-router';
const tabsStore = useTabsStore();
const route = useRoute();
const router = useRouter();
const contextmenuRef = ref(null);
const state = reactive({
  contextmenuItems: [
    { name: 'refresh', label: '重新加载', icon: 'fa fa-refresh' },
    { name: 'close', label: '关闭标签', icon: 'fa fa-times' },
    { name: 'closeOther', label: '关闭其他标签', icon: 'fa fa-minus' },
  ],
  activeTabKey: '',
});

const handleTab = (menu) => {
  router.push(menu.path);
};

const onContextmenuItem = async (item) => {
  const { name, menu } = item;
  if (!menu) return;
  switch (name) {
    case 'refresh':
      refreshTab(menu);
      break;
    case 'close':
      closeCheckTab(menu);
      break;
    case 'closeOther':
      closeOtherTab(menu);
      break;
  }
};

const refreshTab = async (menu) => {
  tabsStore.refreshTab(menu);
};

const closeCheckTab = (menu) => {
  if (menu.path === state.activeTabKey) {
    // 获得当前tab索引
    const mIndex = tabsStore.tabs.findIndex((x) => x.name === menu.name);
    // 删除当前tab
    tabsStore.setTabs(tabsStore.tabs.filter((x) => x.name !== menu.name));
    // 如果剩下tab大于1则设置选中tab为上一个 否则设置为第一个
    if (tabsStore.tabs.length > 1 && mIndex > 0) {
      state.activeTabKey = tabsStore.tabs[mIndex - 1].path;
    } else {
      state.activeTabKey = tabsStore.tabs[0].path;
    }
  } else {
    tabsStore.setTabs(tabsStore.tabs.filter((x) => x.name !== menu.name));
  }
  router.push(state.activeTabKey);
};

const closeOtherTab = (menu) => {
  const current = tabsStore.tabs.find((x) => x.name === menu.name);
  if (current) {
    // 清空其他菜单
    tabsStore.setTabs([current]);
    // 判断选择的是否是当前tab
    if (menu.path !== state.activeTabKey) {
      state.activeTabKey = menu.path;
    }
  }
  router.push(state.activeTabKey);
};

const onContextmenu = (menu, el) => {
  state.contextmenuItems[1].disabled = state.contextmenuItems[2].disabled = tabsStore.tabs.length === 1;
  if (menu.name === 'index') {
    state.contextmenuItems[1].disabled = true;
  }
  const { clientX, clientY } = el;
  contextmenuRef.value.onShowContextmenu(menu, {
    x: clientX,
    y: clientY,
  });
};

const setTabByRoute = () => {
  const target = tabsStore.routeViews.find((item) => item.name === route.name);
  if (target) {
    tabsStore.addTabs(target);
  }
};

watch(
  () => route.path,
  () => {
    state.activeTabKey = route.path;
    setTabByRoute();
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
@include B(navbar) {
  @include e(item) {
    height: var(--main-tab-height);
    line-height: var(--main-tab-height);
  }

  :deep(.smain-tabs) {
    .is-active.smain-tabs__item {
      color: var(--main-main-color);
    }
    .smain-tabs__item {
      color: var(--main-default-fcolor);
      font-weight: 400;
    }
    .smain-tabs__item,
    .smain-tabs__header {
      padding: 0;
      margin: 0;
    }
    .smain-tabs__nav-wrap::after {
      height: 0;
    }
  }
}
</style>
