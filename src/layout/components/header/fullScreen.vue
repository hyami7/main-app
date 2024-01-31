<template>
  <div @click="toggle">
    <el-icon>
      <FullScreen />
    </el-icon>
  </div>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core';

const props = defineProps({
  target: HTMLElement,
});
const { toggle } = props.target ? useFullscreen(props.target) : useFullscreen();
</script>

<style lang="scss" scoped></style>
