<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <chart ref="line" :option="lineChartData" height="350px"></chart>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8" key="1">
        <div class="chart-wrapper">
          <chart ref="raddar" :option="raddarChartOption"></chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" key="2">
        <div class="chart-wrapper">
          <chart ref="pie" :option="pieChartOption"></chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <chart ref="bar" :option="barChartOption"></chart>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 24 }" :lg="{ span: 12 }" :xl="{ span: 12 }"
        style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }" :lg="{ span: 6 }" :xl="{ span: 6 }"
        style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }" :lg="{ span: 6 }" :xl="{ span: 6 }"
        style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="DashboardAdmin" lang="ts">
import { chartData, pieChartOption, raddarChartOption, barChartOption, lineChartOption } from './chartData';
import { debounce } from '@/utils'
import chart from './components/chart.vue';
import GithubCorner from '@/components/GithubCorner/index.vue'
import PanelGroup from './components/PanelGroup.vue'
import TransactionTable from './components/TransactionTable.vue'
import TodoList from './components/TodoList/index.vue'
import BoxCard from './components/BoxCard.vue'
import { ECharts } from 'echarts';
let $_sidebarElm = ref<Element>()
let $_resizeHandler: (e: Event) => void
let lineChartData = ref(lineChartOption(chartData.newVisitis))
const handleSetLineChartData = (type: keyof typeof chartData) => {
  lineChartData.value = lineChartOption(chartData[type])
}
let refs: Record<string, { chart: ECharts }>
const $_initResizeEvent = () => {
  window.addEventListener('resize', $_resizeHandler)
}
const $_destroyResizeEvent = () => {
  window.removeEventListener('resize', $_resizeHandler)
}
const $_sidebarResizeHandler = (e: any) => {
  if (e.propertyName === 'width') {
    $_resizeHandler(e)
  }
}
const $_initSidebarResizeEvent = () => {
  $_sidebarElm.value = document.getElementsByClassName('sidebar-container')[0]
  $_sidebarElm.value.addEventListener('transitionend', $_sidebarResizeHandler)
}
const $_destroySidebarResizeEvent = () => {
  $_sidebarElm.value?.removeEventListener(
    'transitionend',
    $_sidebarResizeHandler
  )
}
onMounted(() => {
  refs = getCurrentInstance()?.refs as Record<string, { chart: ECharts }>
  $_resizeHandler = debounce(() => {
    Object.keys(refs).forEach(ref => {
      refs[ref].chart.resize()
    })
  }, 100)
  $_initResizeEvent()
  $_initSidebarResizeEvent()
})

onBeforeUnmount(() => {
  $_destroyResizeEvent()
  $_destroySidebarResizeEvent()
})
onActivated(() => {
  $_initResizeEvent()
  $_initSidebarResizeEvent()
})

onDeactivated(() => {
  $_destroyResizeEvent()
  $_destroySidebarResizeEvent()
})
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
