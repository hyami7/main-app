<template>
  <div @click="showDrawer = true">
    <el-icon>
      <Setting />
    </el-icon>

    <el-drawer v-model="showDrawer" title="主题">
      <el-descriptions title="整体风格" :column="5">
        <el-descriptions-item v-for="theme in themeStyle" :key="theme.value">
          <el-tooltip :content="theme.label" placement="top">
            <div class="style-checbox-item" :class="{ active: theme.value }" @click="setNavTheme(theme.value)">
              {{ theme.label }}
            </div>
          </el-tooltip>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="主题色" width="60px" :column="9">
        <el-descriptions-item v-for="item in themeColors" :key="item.key">
          <div class="style-checbox-item">
            <el-tooltip :content="item.title">
              <el-tag :color="item.value" @click="setThemeColor({ primaryColor: item.value })">
                <span :style="{ visibility: item.value, color: '#fff' }"> ✔ </span>
              </el-tag>
            </el-tooltip>
          </div>
        </el-descriptions-item>
        <el-descriptions-item key="custom">
          <div class="style-checbox-item">
            <el-tooltip content="自定义">
              <div>
                <el-color-picker v-model="customColor" />
              </div>
            </el-tooltip>
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="导航模式" :column="5">
        <el-descriptions-item v-for="item in layouts" :key="item.value">
          <div class="style-checbox-item" :class="{ active: item.value }" @click="setLayout(item.value)">
            {{ item.label }}
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { themeStyle, themeColors, layouts } from './theme-contant.js';
let showDrawer = ref(false);
const defaultColor = document.documentElement.style.getPropertyValue('--main-side-active-bg');
const customColor = ref(defaultColor);
const setNavTheme = () => {};
</script>

<style lang="scss" scoped>
.style-checbox-item {
  text-align: center;
  cursor: pointer;
}
.smain-descriptions__content {
  @extend .flex-center !optional;
}
</style>
