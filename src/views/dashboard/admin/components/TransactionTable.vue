<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Order_No" min-width="200">
      <template #="scope">
        {{ orderNoFilter(scope.row.order_no) }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template #="scope">
        ¥{{ toThousandFilter(scope.row.price) }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template #="{ row }">
        <el-tag :type="statusFilter(row.status)">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { transactionList } from '@/api/remote-search'
let list = ref([])
const statusMap = {
  success: 'success',
  pending: 'danger'
}
const orderNoFilter = (str: string) => str.substring(0, 30)
const statusFilter = (status: keyof typeof statusMap) => statusMap[status] as 'success' | 'danger'
const toThousandFilter = (num: number) => (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
const fetchData = () => {
  transactionList().then(response => {
    list.value = response.data.items.slice(0, 8)
  })
}
onBeforeMount(() => {
  fetchData()
})
</script>
