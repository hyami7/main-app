<template>
  <transition name="smain-zoom-in-center">
    <div
      class="smain-popper is-pure is-light smain-dropdown__popper ba-contextmenu"
      :style="`top: ${state.axis.y + 5}px;left: ${state.axis.x - 14}px;width:145px`"
      :key="Math.random()"
      v-show="state.show"
      aria-hidden="false"
      data-popper-placement="bottom"
    >
      <ul class="smain-dropdown-menu">
        <template v-for="(item, idx) in props.items" :key="idx">
          <li class="smain-dropdown-menu__item" :class="item.disabled ? 'is-disabled' : ''" tabindex="-1" @click="onContextmenuItem(item)">
            <span :class="item.icon" style="margin-right: 8px"></span>
            <span>{{ item.label }}</span>
          </li>
        </template>
      </ul>
      <span class="smain-popper__arrow" :style="{ left: `${state.arrowAxis}px` }"></span>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, reactive, toRaw } from 'vue';
import { useEventListener } from '@vueuse/core';
const props = defineProps({
  width: Number | String,
  items: Array,
});

const emits = defineEmits();

const state = reactive({
  show: false,
  axis: {
    x: 0,
    y: 0,
  },
  menu: undefined,
  arrowAxis: 10,
});

const onShowContextmenu = (menu, axis) => {
  state.menu = menu;
  state.axis = axis;
  state.show = true;
};

const onContextmenuItem = (item) => {
  if (item.disabled) return;
  item.menu = toRaw(state.menu);
  emits('contextmenuItemClick', item);
};

const onHideContextmenu = () => {
  if (state && state.show) state.show = false;
};
defineExpose({
  onShowContextmenu,
  onHideContextmenu,
});

onMounted(() => {
  useEventListener(document, 'click', onHideContextmenu);
});
</script>

<style scoped>
.ba-contextmenu {
  z-index: 9999;
}

.smain-popper,
.smain-popper.is-light .smain-popper__arrow::before {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: none;
}

.smain-dropdown-menu__item {
  padding: 8px 20px;
  user-select: none;
}

.smain-dropdown-menu__item .icon {
  margin-right: 5px;
}
</style>
