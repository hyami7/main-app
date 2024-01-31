<template>
  <div id="app-base" style="width: 100%; height: 100%">openbank</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { loadMicroApp } from 'qiankun';
const userStore = useUserStore();
let app = null;
onMounted(() => {
  console.log(JSON.stringify(userStore.currentApp));
  if (!userStore.currentApp) return;
  app = loadMicroApp(userStore.currentApp);
});
onUnmounted(() => {
  console.log('app-base onUmmounted');
  app.unmount();
  app = null;
});
</script>

<style lang="scss" scoped></style>
