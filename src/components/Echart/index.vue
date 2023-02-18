<template>
    <div ref="chartDom" :class="className" :style="{ height: height, width: width }" />
</template>
  
<script setup lang="ts">
import { init, ECharts } from 'echarts'
import 'echarts/theme/macarons'
let chart = shallowRef<ECharts>()
let chartDom = ref<HTMLDivElement>()
const props = withDefaults(defineProps<{ className: string, width: string, height: string, option: any }>(), {
    className: 'chart',
    width: '100%',
    height: '300px',
})
watch(props, (val) => {
    chart.value?.setOption(val.option)
}, { deep: true })
const initChart = () => {
    chart.value = init(chartDom.value!, 'macarons')
    chart.value.setOption(props.option)
}

onMounted(() => {
    nextTick(() => {
        initChart()
    })
})

onBeforeUnmount(() => {
    if (!chart.value) {
        return
    }
    chart.value.dispose()
    chart.value = undefined
})

defineExpose({ chart })
</script>
  