<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'es'" command="es">
          Español
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'ja'" command="ja">
          日本語
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
const { locale } = useI18n()
const store = useStore()
const language = computed(() => store.getters.language)
const handleSetLanguage = (lang: string) => {
  locale.value = lang
  store.dispatch('app/setLanguage', lang)
  ElMessage({
    message: 'Switch Language Success',
    type: 'success'
  })
}
</script>

<style scoped>
.international{
  line-height: 50px;
}
</style>