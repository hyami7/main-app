<template>
  <el-icon @click="handleCollapse">
    <Fold v-if="collapseIcon" />
    <Expand v-else />
  </el-icon>
</template>

<script setup>
import { useUserStore } from '@/store/modules/user';
import { computed } from 'vue';
const userStore = useUserStore();

const collapseIcon = computed(() => {
  return !userStore.isCollapse;
});

const handleCollapse = () => {
  userStore.setIsCollapse(!userStore.isCollapse);
};
</script>

<style lang="scss" scoped></style>
