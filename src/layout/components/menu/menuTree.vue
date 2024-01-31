<template>
  <div v-for="(menu, i) in props.menus">
    <div v-if="menu.children && menu.children.length > 0">
      <el-sub-menu :index="menu.path" :key="menu.id" expand-close-icon="CaretRight" expand-open-icon="CaretBottom">
        <template #title>
          <i :class="['icon', menu.meta?.icon]" />
          <span v-if="!userStore.isCollapse" v-html="menu.meta?.title ? menu.meta?.search || menu.meta?.title : 'noTitle'"></span>
        </template>
        <menuTree v-if="menu.children && menu.children.length" :menus="menu.children" />
      </el-sub-menu>
    </div>
    <template v-else>
      <el-menu-item :index="menu.path" :key="menu.title" @click="onClickedMenu(menu)">
        <i :class="['icon', menu.meta?.icon]" />
        <template #title>
          <span v-html="menu.meta?.title ? menu.meta?.search || menu.meta?.title : 'noTitle'"></span>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>
<script setup>
import { onClickMenu } from '@/utils/router';
import { useRouter } from 'vue-router';
import menuTree from './menuTree';
import { useUserStore } from '@/store/modules/user';
import { useTabsStore } from '@/store/modules/tabs';

const userStore = useUserStore();
const tabsStore = useTabsStore();
const router = useRouter();
const props = defineProps(['menus']);
const onClickedMenu = (menu) => {
  onClickMenu(menu, router);
};
</script>

<style lang="scss" scoped></style>
