<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">
    <el-table-column v-loading="loading" align="center" label="ID" width="65" element-loading-text="请给我点时间！">
      <template v-slot="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="Date">
      <template v-slot="scope">
        <span>{{ scope.row.timestamp || dayjs().format('YYYY-MM-DD HH:mm') }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" label="Title">
      <template v-slot="{ row }">
        <span>{{ row.title }}</span>
        <el-tag>{{ row.type }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="Author">
      <template v-slot="scope">
        <span>{{ scope.row.author }}</span>
      </template>
    </el-table-column>

    <el-table-column width="120px" label="Importance">
      <template v-slot="scope">
        <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" />
      </template>
    </el-table-column>

    <el-table-column align="center" label="Readings" width="95">
      <template v-slot="scope">
        <span>{{ scope.row.pageviews }}</span>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="Status" width="110">
      <template v-slot="{ row }">
        <el-tag :type="statusFilter(row.status)">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { fetchList } from '@/api/article'
const props = withDefaults(defineProps<{ type: string }>(), { type: 'CN' })
const emits = defineEmits<{ (e: 'create'): void }>()
let list = ref()
let listQuery = reactive({
  page: 1,
  limit: 5,
  type: props.type,
  sort: '+id'
})
let loading = ref(false)
const getList = () => {
  loading.value = true
  emits('create') // for test
  fetchList(listQuery).then(response => {
    list.value = response.data.items
    loading.value = false
  })
}

const statusMap = {
  published: 'success',
  draft: 'info',
  deleted: 'danger'
}
const statusFilter = (status: keyof typeof statusMap) => {
  return statusMap[status] as 'success' | 'info' | 'danger'
}
onMounted(() => {
  getList()
})
</script>

