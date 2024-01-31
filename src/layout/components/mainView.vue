<template>
  <div class="main-main" :style="mainPadding">
    <el-scrollbar ref="mainScrollbarRef" class="main-main__scroll">
      <router-view v-slot="{ Component }">
        <transition name="slide-right" mode="out-in">
          <keep-alive :include="tabsStore.keepaliveList">
            <component :is="Component" :key="tabsStore.activeKey" />
          </keep-alive>
        </transition>
      </router-view>
    </el-scrollbar>
  </div>
</template>

<!--
  keepalive不生效 
  1./utils/router.js 中的 keepalive 配置是否设置
  2.路由导入对应文件的 name 是否设置
-->

<script setup>
import { watch, computed } from 'vue';
import { useTabsStore } from '@/store/modules/tabs';
import { useRoute } from 'vue-router';
import microApps from '@/microApps/apps';

const route = useRoute();
const tabsStore = useTabsStore();

const mainPadding = computed(() => {
  const target = microApps.find((x) => x.name === route.name);
  if (target) return '';
  return `padding: var(--main-padding-16)`;
});

watch(
  () => route.path,
  () => {
    tabsStore.setActiveKey(route.path);
    tabsStore.addKeepaliveList(route);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
@include B(main) {
  height: calc(100vh - var(--main-header-height) - var(--main-tab-height));
  width: 100%;
  box-sizing: border-box;
  // padding: var(--main-padding-16); // 内容边距由子应用控制
  overflow: hidden;

  background-color: var(--main-default-bg);

  @include e(scroll) {
    width: 100%;
    height: 100%;
  }
}
</style>
