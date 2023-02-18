<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script lang="ts" setup name="UploadExcel">
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
let tableData = ref([])
let tableHeader = ref([])
const beforeUpload = (file: any) => {
  const isLt1M = file.size / 1024 / 1024 < 1

  if (isLt1M) {
    return true
  }

  ElMessage({
    message: 'Please do not upload files larger than 1m in size.',
    type: 'warning'
  })
  return false
}
const handleSuccess = (e: any) => {
  tableData.value = e.results
  tableHeader.value = e.header
}
</script>
