<template>
  <div class="icons-container">
    icons
    <!-- <aside>
      <a href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html" target="_blank">Add and use
      </a>
    </aside>
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div class="grid">
          <div v-for="item of svgIcons" :key="item" @click="clipboard(generateIconCode(item), $event)">
            <el-tooltip placement="top">
              <template #content>{{ generateIconCode(item) }}</template>
              <div class="icon-item">
                <svg-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-Plus Icons">
        <div class="grid">
          <div v-for="item of elementIcons" :key="item">
            <div>
              <el-tooltip placement="top">
                <template #content>{{ generateElementIconCode(item) }}</template>
                <div class="icon-item">
                  <el-icon @click="clipboard(generateElementIconCode(item), $event)">
                    <component :is="item"></component>
                  </el-icon>
                  <span>{{ item }}</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script setup lang="ts" name="Icons">
import clipboard from '@/utils/clipboard'
import svgIcons from './svg-icons'
import elementIcons from './element-icons'
const generateIconCode = (symbol: string) => {
  return `<svg-icon icon-class="${symbol}" />`
}
const generateElementIconCode = (symbol: string) => {
  return `<el-icon><${symbol} /></el-icon>`
}
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
