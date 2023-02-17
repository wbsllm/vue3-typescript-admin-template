<template>
  <div class="app-container">
    <aside>
      The guide page is useful for some people who entered the project for the first time. You can briefly introduce the
      features of the project. Demo is based on
      <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js.</a>
    </aside>
    <el-button icon="QuestionFilled" type="primary" @click.prevent.stop="guide">
      Show Guide
    </el-button>
  </div>
</template>

<script setup lang="ts" name="Guide">
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './steps'
let driver = ref<Driver>()
const guide = () => {
  driver.value?.defineSteps(steps)
  driver.value?.start()
}
onMounted(() => {
  driver.value = new Driver()
})
</script>
