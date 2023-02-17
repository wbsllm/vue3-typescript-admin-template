<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="use clipboard  directly" name="directly">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="Document" @click="clip(inputData, $event)">
          copy
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by v-directive" name="v-directive">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="Document">
          copy
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="ClipboardDemo" lang="ts">
import clip from '@/utils/clipboard' // use clipboard directly
// import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
import { ElMessage } from 'element-plus';
let activeName = ref('directly')
let inputData = ref('https://github.com/PanJiaChen/vue-element-admin')
const clipboardSuccess = () => {
  ElMessage({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}
</script>

