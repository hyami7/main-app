<script setup>
import appMenu from './components/menu/appMenu';
import toggleSideBar from './components/menu/toggleSideBar';
import headerOptions from './components/header';
import { useUserStore } from '@/store/modules/user';
import { useTabsStore } from '@/store/modules/tabs';
import { useRouter } from 'vue-router';
import { handleAdminRoute, getFirstRoute, routePush } from '@/utils/router';
import { onMounted } from 'vue';
import tabs from './components/tabs/tab';
import mainView from './components/mainView';
import { initWaterMark } from '@/utils/watermark';
import microApps from '@/microApps/apps';

const userStore = useUserStore();
const tabsStore = useTabsStore();
const router = useRouter();

handleAdminRoute(userStore.user.menus[0].tree, router);
// 跳转到第一个菜单
let firstRoute = getFirstRoute(tabsStore.routeViews, router);
if (firstRoute) {
  routePush(firstRoute.path, router);
}

const handleApps = async (app) => {
  userStore.setCurrentApp(app);
  router.push({ name: app.name })
};

onMounted(() => {
  initWaterMark(userStore.user.username);
  userStore.currentApp && handleApps(userStore.currentApp);
});
</script>

<template>
  <el-container class="main-layout">
    <el-header class="main-layout__header">
      <div class="main-layout__header--logo">
        <img src="@/assets/images/home/logo@2x.png" alt="logo" />
      </div>

      <div class="main-layout__header--micro">
        <el-tag @click="userStore.setCurrentApp(null), router.push('/')">首页</el-tag>
        <el-tag @click="handleApps(app)" v-for="app in microApps" :key="app.name">
          {{ app.name }}
        </el-tag>
      </div>

      <div class="main-layout__header--btns">
        <headerOptions />
      </div>
    </el-header>
    <el-container>
      <el-aside class="main-layout__aside" width="var(--main-side-width)">
        <el-scrollbar style="height: calc(100vh - var(--main-header-height) - var(--main-side-collapse-height))">
          <appMenu class="main-layout__aside--menu" />
        </el-scrollbar>
        <div class="main-layout__aside--collapse">
          <toggleSideBar />
        </div>
      </el-aside>
      <el-main>
        <tabs />
        <mainView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
@include B(layout) {
  width: 100%;
  height: 100%;

  @include e(header) {
    display: flex;
    align-items: center;
    background-color: var(--main-header-bg);
    padding: 0;
    height: var(--main-header-height);
    border-bottom: 1px solid var(--smain-color-info-light-8);

    @include m(logo) {
      display: flex;
      align-items: center;
      width: var(--main-side-width);
      height: 100%;

      img {
        width: 100%;
      }
    }

    @include m(micro) {
      display: flex;
      gap: 8px;
    }

    @include m(btns) {
      margin: 0 8px 0 auto;
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 18px;
    }
  }

  @include e(aside) {
    overflow: hidden;
    position: relative;
    width: auto;
    background: var(--main-side-bg);

    @include m(menu) {
      height: 100%;
    }

    @include m(collapse) {
      cursor: pointer;
      height: var(--main-side-collapse-height);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 18px;
      color: #fff;
      background: transparent;

      i {
        width: 100%;
      }
    }
  }

  .smain-menu {
    border: none;
  }

  .smain-main {
    padding: 0;
  }
}
</style>
