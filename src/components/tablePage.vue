<script setup>
import { computed, reactive, ref, shallowRef, watch } from 'vue';
import { ElMessage } from 'element-plus';
import request from '@/utils/request';

const tableHeightCss = computed(() => {
  return `calc(100vh - 248px)`;
});
const defineBtnProps = { type: 'primary' };
const props = defineProps({
  toolBar: { type: Array, default: () => [] },
  table: {
    type: Object,
    default: () => {},
  },
});
const toolBar = computed(() => {
  return props.toolBar.filter((btn) => btn.permission === undefined || btn.permission);
});
const toolBarBtn = computed(() => {
  const viewBtns = toolBar.value.slice(0, 3);
  return viewBtns.map((btn) => ({
    ...btn,
    props: { ...defineBtnProps, ...btn.props },
  }));
});
const moreToolBar = computed(() => {
  const moreBtns = toolBar.value.slice(3);
  return moreBtns.map((btn) => ({ ...defineBtnProps, ...btn }));
});

const dialogInfo = reactive({ dialogTableVisible: false, title: '', url: '' });

const changeDialog = ({ title, url, height } = { title: '', url: '', height: '' }) => {
  Object.assign(dialogInfo, {
    dialogTableVisible: !dialogInfo.dialogTableVisible,
    title,
    url,
    height,
  });
};

const columns = ref(props.table.columns.map((col) => ({ show: true, ...col })));

const onChangeShowColumn = (val, prop) => {
  const column = columns.value.find((col) => col.prop === prop);
  column.show = val;
};

const showColumns = computed(() => columns.value.filter((col) => col.show));

const searchParams = ref({});
const defaultSearch = {};

const searchItem = computed(() => {
  if (props.table.columns) {
    return props.table.columns
      .filter((col) => col.search)
      .map((col) => {
        searchParams.value[col.prop] = '';
        defaultSearch[col.prop] = '';
        if (col.searchKey) {
          defaultSearch[col.searchKey] = '';
        }
        const result = {
          label: col.label,
          prop: col.prop,
          optionLabel: col.optionLabel,
          optionValue: col.optionValue,
          type: col.searchOptions ? 'el-select' : col.searchType || 'el-input',
          key: col.searchKey,
          props: col.searchProps,
          defaultProps: col.defaultProps,
        };
        if (Array.isArray(col.searchOptions)) {
          result.options = col.searchOptions;
        } else if (typeof col.searchOptions === 'string' || col.searchUrl) {
          request({
            url: col.searchOptions || col.searchUrl,
            method: 'get',
          }).then((data) => {
            if (col.searchUrl) result.data = col.searchCallBack ? col.searchCallBack(data.data) : data.data;
            else result.options = data.data;
          });
        }
        return result;
      });
  }
  return [];
});

const tableData = shallowRef(props.table.data || []);
const total = ref(tableData.value.length);
const currentPage = ref(props.table.currentPage || 1);
const pageSize = ref(props.table.pageSize || 15);
const loading = ref(false);
const drawer = ref(false);
const currentRow = ref(null);
const tableRef = ref(null);
const emits = defineEmits(['tableCurrentChange', 'tableSelectionChange']);

function treeFormat(source) {
  if (!Array.isArray(source)) return source;
  const stack = [];
  const cache = {};
  let index = -1;
  const length = source.length;
  while (++index < source.length) {
    const data = { ...source[index] };
    cache[data.id] = data;
    if (data.parentId && cache[data.parentId]) {
      cache[data.parentId].children ||= [];
      cache[data.parentId].children.push(data);
    } else if (index < length && data.parentId) {
      source.push(data);
    } else {
      stack.push(data);
    }
  }
  return stack;
}

let search = null;
const getData = (params = {}) => {
  loading.value = true;
  let data = { ...params };
  for (let key in data) {
    if (data[key] === '') {
      delete data[key];
    }
  }
  search = params;
  const defaultParams = props.table.params || {
    limit: pageSize.value,
    page: currentPage.value,
    ...(props.table.initParams || {}),
    ...data,
  };
  const requestConfig = {
    url: props.table.url,
    method: props.table.method || 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  if (props.table.method && props.table.method.toLocaleLowerCase === 'get') {
    requestConfig.params = defaultParams;
  } else {
    requestConfig.data = defaultParams;
  }
  // if(props.table.paramsType && props.table.paramsType === 1){
  //     requestConfig.data = { ...props.table.params }
  // }
  return request(requestConfig)
    .then((res) => {
      if (res.success && res.data) {
        if (props.table.type === 'list') {
          tableData.value = res.data;
          return;
        }
        if (props.table.type === 'tree') {
          tableData.value = props.table.treeFormat ? props.table.treeFormat(res.data) : treeFormat(res.data.rows || res.data);
        } else {
          tableData.value = res.data.list;
          total.value = res.data.total;
        }
      } else {
        ElMessage({
          showClose: true,
          message: res.msg,
          type: 'error',
        });
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const toggleAllExpansion = (bool) => {
  tableData.value.forEach((row) => {
    tableRef.value.toggleRowExpansion(row, bool);
  });
};

const defaultProps = {
  children: 'children',
  label: 'name',
  value: 'name',
};

const handleCurrentChange = () => {
  getData(search);
};

// const tableCurrentChange = (val) => {
//     currentRow.value = val
// }

const handleSizeChange = () => {
  getData(search);
};

const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  emits('tableSelectionChange', multipleSelection.value);
};

const getLabel = (option, item) => {
  if (Array.isArray(item.optionLabel)) {
    const labels = [];
    for (const element of item.optionLabel) {
      labels.push(option[element]);
    }
    return labels.join(' - ');
  }
  return option[item.optionLabel || 'label'];
};

if (props.table.url) {
  getData();
}

const confirmClick = () => {
  currentPage.value = 1;
  getData({ ...search, ...searchParams.value });
  drawer.value = false;
};

const cancelClick = () => {
  Object.assign(searchParams.value, defaultSearch);
};

const customColumns = computed(() => columns.value.filter((col) => col.prop));
const handleRowClick = (row) => {
  if (!props.table.props || !props.table.props['highlight-current-row']) return;
  if (currentRow.value === row) {
    tableRef.value.setCurrentRow();
    currentRow.value = '';
  } else {
    currentRow.value = row;
  }
  emits('tableCurrentChange', currentRow.value);
};

const permissionCheck = (val) => {
  if (Array.isArray(val)) {
    return val.filter((item) => item.permission === undefined || item.permission);
  } else {
    return val;
  }
};

const handleSortChange = ({ column, prop, order }) => {
  const sort = { descending: 'desc', ascending: 'asc' };
  getData({
    order: prop,
    sort: sort[order] || null,
    ...searchParams.value,
    ...search,
  });
};

defineExpose({
  tableData,
  refeshTable: () => {
    getData(search);
  },
  changeDialog,
  currentRow,
  toggleAllExpansion,
  multipleSelection,
  currentPage,
  pageSize,
  loading,
});

watch(
  () => dialogInfo.dialogTableVisible,
  (val) => {
    if (!val) {
      dialogInfo.url = '';
    }
  }
);
</script>

<template>
  <div class="table-wrapper">
    <el-drawer v-model="drawer" title="查询条件" size="30%">
      <el-form label-width="100px" label-position="top">
        <el-form-item :label="item.label" v-for="item in searchItem">
          <component
            v-if="item.options"
            style="width: 100%"
            clearable
            filterable
            :data="item.data"
            :props="item.defaultProps || defaultProps"
            :is="item.type"
            v-model="searchParams[item.key || item.prop]"
            v-bind="item.props"
          >
            <el-option
              v-for="option in item.options"
              :key="option[item.optionValue || 'value']"
              :label="getLabel(option, item)"
              :value="option[item.optionValue || 'value']"
            />
          </component>
          <component
            v-else
            style="width: 100%"
            clearable
            filterable
            :data="item.data"
            :props="item.defaultProps || defaultProps"
            :is="item.type"
            v-model="searchParams[item.key || item.prop]"
            v-bind="item.props"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="confirmClick">查询</el-button>
          <el-button @click="cancelClick">重置</el-button>
        </div>
      </template>
    </el-drawer>
    <div class="table-header">
      <slot name="toolBar"></slot>
      <el-button v-for="(btn, index) in toolBarBtn" v-bind="btn.props" @click="btn.click" :class="{ btn: index > 0 }">
        <i v-if="btn.icon" :class="['iconfont', 'btn-icon', btn.icon || '']"></i>
        {{ btn.label }}
      </el-button>

      <el-dropdown style="margin-left: 12px" v-if="moreToolBar.length">
        <el-button type="primary"> 更多操作<i class="iconfont icon-xiajiantou" style="margin-left: 5px"></i> </el-button>
        <template #dropdown>
          <el-dropdown-menu style="min-width: 90px">
            <el-dropdown-item v-bind="btn.props" v-for="btn in moreToolBar" @click="btn.click">
              <div style="text-align: center; width: 100%">{{ btn.label }}</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-icon v-if="searchItem.length > 0" class="search" @click="() => (drawer = true)"><Guide /></el-icon>
      <el-dropdown :hide-on-click="false" style="float: right; margin: 7px 10px 0 0">
        <i class="iconfont icon-a-icondaxiaomobandefuben11-01"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :key="'drop' + item.prop" v-for="item in customColumns">
              <el-checkbox :model-value="item.show" :label="item.label" @change="onChangeShowColumn($event, item.prop)" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-table
      ref="tableRef"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      :class="props.table.type === 'tree' ? 'table-tree' : 'table'"
      :default-expand-all="props.table.expandAll"
      v-bind="props.table.props"
      :data="tableData"
      stripe
      v-loading="loading"
      row-key="id"
    >
      <el-table-column v-for="col in showColumns" v-bind="col" :key="'col' + col.prop">
        <template #default="scope" v-if="col.render">
          <span v-if="col.showLabel" style="margin-right: 8px"
            ><b>{{ col.showLabel(scope.row) }}</b></span
          >
          <component
            style="margin-left: 0; margin-right: 12px"
            v-if="Array.isArray(col.render(scope.row))"
            v-for="com in permissionCheck(col.render(scope.row, scope.$index))"
            :is="com.type"
            @click="com.click(scope.row, scope.$index)"
            v-bind="com.props"
            >{{ com.label }}
          </component>
          <span v-if="typeof col.render(scope.row) === 'string'" v-html="col.render(scope.row, scope.$index)"></span>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="props.table.type !== 'tree' && props.table.type !== 'list'" class="pagination">
      <el-pagination
        style="float: right"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[15, 30, 60, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-model="dialogInfo.dialogTableVisible" :title="dialogInfo.title">
      <iframe class="iframe" :style="{ height: dialogInfo.height ? dialogInfo.height + 'px' : '' }" :src="dialogInfo.url"></iframe>
    </el-dialog>
  </div>
</template>

<style scoped>
.btn {
  color: #6a86a5;
  background: #f2f4f7;
  border: none;
}

.btn:hover {
  color: #6a86a5;
  background: #f2f4f7;
}

.is-disabled.btn {
  color: var(--el-color-primary-light-8);
}

.iframe {
  width: 100%;
  border: none;
  height: 300px;
}

.btn-icon {
  font-size: 14px;
  margin-right: 5px;
}

.table-wrapper {
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;
}

.table {
  margin-top: 16px;
  width: 100%;
  /* height: calc(100vh - 217px); */
  height: v-bind('tableHeightCss');
}

.table-tree {
  margin-top: 16px;
  width: 100%;
  height: calc(100vh - 200px);
  --ba-border-color: none;
}

.pagination {
  padding-top: 16px;
  overflow: hidden;
}

.search {
  float: right;
  margin-top: 5px;
  cursor: pointer;
  vertical-align: middle;
}
</style>
