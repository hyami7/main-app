<template>
  <el-input
    v-model="tabsStore.searchMenuText"
    @change="(val) => tabsStore.setSearchMenuText(val)"
    style="width: 120px"
    v-show="tabsStore.isSearchMenu"
    @blur="tabsStore.setIsSearchMenu(false)"
    placeholder="请输入"
    ref="inputRef"
  ></el-input>
  <div @click="handleSearch">
    <el-icon>
      <Search />
    </el-icon>
  </div>

  <message />

  <fullScreen />

  <userInfo />

  <setting />
</template>

<script setup>
import fullScreen from './fullScreen';
import setting from './setting';
import userInfo from './userInfo';
import message from './message';
import { ref } from 'vue';
import { useTabsStore } from '@/store/modules/tabs';
const tabsStore = useTabsStore();
const inputRef = ref(null);
const handleSearch = () => {
  tabsStore.setIsSearchMenu(!tabsStore.isSearchMenu);
  if (tabsStore.isSearchMenu) {
    inputRef.value.focus();
  }
};
</script>

<style lang="scss" scoped>
* {
  padding: 8px;
}

div {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 8px;
}
</style>
