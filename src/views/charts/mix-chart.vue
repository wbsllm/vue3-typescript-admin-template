<template>
  <div class="chart-container">
    <Chart />
  </div>
</template>

<script lang="ts" setup>
import Chart from '@/components/Charts/MixChart.vue'
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

