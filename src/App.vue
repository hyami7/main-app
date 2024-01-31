<!-- App.vue -->
<template>
  <el-config-provider :z-index="3000" namespace="smain">
    <!-- 路由渲染出口 -->
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { setTitleFromRoute } from '@/utils/common';
import iconfontInit from '@/utils/iconfont';

const route = useRoute();
onMounted(() => {
  iconfontInit();
});
// 监听路由变化时更新浏览器标题
watch(
  () => route.path,
  () => {
    setTitleFromRoute();
  }
);
</script>
