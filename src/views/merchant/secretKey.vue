<template>
  <STable ref="tableRef" v-bind="tableConfig"> </STable>
</template>

<script setup>
import STable from '@/components/tablePage'
import Print from '@/utils/print'
import { ref } from 'vue'
const tableRef = ref(null)

const tableConfig = {
  toolBar: [
    {
      label: '新增',
      click: () => {},
    },
    {
      label: '刷新',
      click: () => {},
    },
    {
      label: '删除',
      click: () => {},
    },
    {
      label: '打印',
      click: () => {
        Print(tableRef.value)
      },
    },
  ],
  table: {
    columns: [
      {
        type: 'selection',
        fixed: true,
        width: '55',
      },
      {
        type: 'index',
        fixed: true,
        width: '55',
        label: '序号',
      },
      {
        prop: 'mcId',
        label: '商户',
        search: true,
        width: '180',
      },
      {
        prop: 'frontId',
        label: '前置机',
        search: true,
        width: '180',
      },
      {
        prop: 'bankCode',
        label: '银行Code',
        search: true,
      },
      {
        prop: 'interVersion',
        label: '接口版本',
        search: true,
      },
      {
        prop: 'interCode',
        label: '接口',
      },
    ],
    url: '/mcBank/openInter/page',
  },
}
</script>

<style lang="scss" scoped></style>
