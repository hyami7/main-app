<template>
  <el-dropdown>
    <div>
      <el-avatar :size="18" icon="UserFilled" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="userStore.logout"> 退出登录 </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();
</script>

<style lang="scss" scoped></style>
