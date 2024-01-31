<template>
  <el-popover :placement="placement" trigger="focus" :hide-after="0" :width="state.selectorWidth" :visible="state.popoverVisible">
    <div @mouseover.stop="state.iconSelectorMouseover = true" @mouseout.stop="state.iconSelectorMouseover = false" class="icon-selector">
      <transition name="el-zoom-in-center">
        <div class="icon-selector-box">
          <div class="selector-body">
            <el-scrollbar ref="selectorScrollbarRef">
              <div v-if="renderFontIconNames.length > 0">
                <div class="icon-selector-item" :title="item" @click="onIcon(item)" v-for="(item, key) in renderFontIconNames" :key="key">
                  <i :class="'fa ' + item" />
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </transition>
    </div>
    <template #reference>
      <el-input
        v-model="state.inputValue"
        :size="size"
        :disabled="disabled"
        placeholder="搜索图标"
        ref="selectorInput"
        @focus="onInputFocus"
        @blur="onInputBlur"
        :class="'size-' + size"
      >
        <template #prepend>
          <div class="icon-prepend">
            <i :class="'fa ' + modelValue" />
            <div v-if="showIconName" class="name"></div>
          </div>
        </template>
        <template #append v-if="state.prependIcon">
          <el-button @click="onInputDelete" :icon="Delete"> </el-button>
        </template>
      </el-input>
    </template>
  </el-popover>
</template>

<script setup>
import { Delete } from '@element-plus/icons-vue';
import { reactive, ref, onMounted, nextTick, watch, computed } from 'vue';

const props = defineProps({
  size: 'default',
  disabled: false,
  title: '',
  type: 'awe',
  placement: 'bottom',
  modelValue: '',
  showIconName: false,
});

const emits = defineEmits(['change', 'update:modelValue']);

const selectorInput = ref();
const selectorScrollbarRef = ref();
const state = reactive({
  iconType: props.type,
  selectorWidth: 0,
  popoverVisible: false,
  inputFocus: false,
  iconSelectorMouseover: false,
  fontIconNames: [],
  inputValue: '',
  prependIcon: props.modelValue,
  defaultModelValue: props.modelValue || 'el-icon-Minus',
  iconKey: 0, // 给icon标签准备个key，以随时使用 h 函数重新生成元素
});

const onInputFocus = () => {
  state.inputFocus = state.popoverVisible = true;
};
const onInputBlur = () => {
  state.inputFocus = false;
  state.popoverVisible = state.iconSelectorMouseover;
};
const onInputRefresh = () => {
  state.iconKey++;
  state.prependIcon = state.defaultModelValue;
  state.inputValue = '';
  emits('update:modelValue', state.defaultModelValue);
  emits('change', state.defaultModelValue);
};
// 删除
const onInputDelete = () => {
  state.iconKey++;
  state.prependIcon = null;
  emits('change', null);
};
const onChangeTab = (name) => {
  state.iconType = name;
  state.fontIconNames = [];
  if (name == 'awe') {
    getAwesomeIconfontNames().then((res) => {
      state.fontIconNames = res.map((name) => 'fa ' + name);
    });
  }
};
const onIcon = (icon) => {
  state.iconSelectorMouseover = state.popoverVisible = false;
  state.iconKey++;
  state.prependIcon = icon;
  state.inputValue = '';
  emits('update:modelValue', icon);
  emits('change', icon);
  nextTick(() => {
    selectorInput.value.blur();
  });
};

const renderFontIconNames = computed(() => {
  if (!state.inputValue) return state.fontIconNames;

  let inputValue = state.inputValue.trim().toLowerCase();
  return state.fontIconNames.filter((icon) => {
    if (icon.toLowerCase().indexOf(inputValue) !== -1) {
      return icon;
    }
  });
});

// 获取 input 的宽度
const getInputWidth = () => {
  nextTick(() => {
    state.selectorWidth = selectorInput.value.$el.offsetWidth < 260 ? 260 : selectorInput.value.$el.offsetWidth;
  });
};

const popoverVisible = () => {
  state.popoverVisible = !!(state.inputFocus || state.iconSelectorMouseover);
};

function getStylesFromDomain(domain) {
  const sheets = [];
  const styles = document.styleSheets;
  for (const key in styles) {
    if (styles[key].href && styles[key].href.indexOf(domain) > -1) {
      sheets.push(styles[key]);
    }
  }
  return sheets;
}

function getAwesomeIconfontNames() {
  return new Promise((resolve, reject) => {
    nextTick(() => {
      const iconfonts = [];
      let cssUrl = import.meta.env.VITE_AXIOS_BASE_URL + '/fontAwesome/font-awesome.min.css';
      const sheets = getStylesFromDomain(cssUrl);
      for (const key in sheets) {
        const rules = sheets[key].cssRules;
        for (const k in rules) {
          if (rules[k].selectorText && /^\.fa-(.*)::before$/g.test(rules[k].selectorText)) {
            if (rules[k].selectorText.indexOf(', ') > -1) {
              const iconNames = rules[k].selectorText.split(', ');
              iconfonts.push(iconNames[0].substring(1, iconNames[0].length).replace(/\:\:before/, ''));
            } else {
              iconfonts.push(rules[k].selectorText.substring(1, rules[k].selectorText.length).replace(/\:\:before/, ''));
            }
          }
        }
      }

      if (iconfonts.length > 0) {
        resolve([...new Set(iconfonts)]);
      } else {
        reject('No AwesomeIcon style sheet');
      }
    });
  });
}

watch(
  () => props.modelValue,
  () => {
    state.iconKey++;
    if (props.modelValue != state.prependIcon) state.defaultModelValue = props.modelValue;
    if (props.modelValue == '') state.defaultModelValue = 'el-icon-Minus';
    state.prependIcon = props.modelValue;
  }
);
onMounted(() => {
  getInputWidth();
  getAwesomeIconfontNames().then((res) => {
    state.fontIconNames = res;
  });
});
</script>

<style scoped>
.size-small {
  height: 24px;
}

.size-large {
  height: 40px;
}

.size-default {
  height: 32px;
}

.icon-prepend {
  display: flex;
  align-items: center;
  justify-content: center;
}

.name {
  padding-left: 5px;
}

.selector-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.selector-tab {
  margin-left: auto;
}

span {
  padding: 0 5px;
  cursor: pointer;
  user-select: none;
}

span.active,
span:hover {
  color: var(--el-color-primary);
  text-decoration: underline;
}

.selector-body {
  height: 250px;
}

.icon-selector-item {
  display: inline-block;
  padding: 10px 10px 6px 10px;
  margin: 3px;
  border: 1px solid var(--ba-border-color);
  border-radius: var(--el-border-radius-main);
  cursor: pointer;
  font-size: 18px;
}

.icon-selector-item .icon {
  height: 18px;
  width: 18px;
}

.icon-selector-item :hover {
  border: 1px solid var(--el-color-primary);
}

.icon-selector-item :deep(.el-input-group__prepend) {
  padding: 0 10px;
}

.icon-selector-item :deep(.el-input-group__append) {
  padding: 0 10px;
}
</style>
