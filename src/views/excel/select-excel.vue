<template>
  <div class="app-container">
    <el-input v-model="filename" placeholder="Please enter the file name (default excel-list)" style="width:350px;"
      prefix-icon="Document" />
    <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="Document"
      @click="handleDownload">
      Export Selected Items
    </el-button>
    <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank"
      style="margin-left:15px;">
      <el-tag type="info">Documentation</el-tag>
    </a>
    <el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
      highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="Id" width="95">
        <template #="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template #="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template #="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Readings" width="115" align="center">
        <template #="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="PDate" width="220">
        <template #="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { fetchList } from '@/api/article'
import { Article } from '../../../mock/article'
import { ElMessage } from 'element-plus'
export default {
  name: 'SelectExcel',
  data() {
    return {
      list: [],
      listLoading: true,
      multipleSelection: [],
      downloadLoading: false,
      filename: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleSelectionChange(val: number[]) {
      (this.multipleSelection as number[]) = val
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time'] as (keyof Article)[]
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          });
          (this.$refs.multipleTable as any).clearSelection()
          this.downloadLoading = false
        })
      } else {
        ElMessage({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
    },
    formatJson(filterVal: (keyof Article)[], jsonData: Article[]) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
