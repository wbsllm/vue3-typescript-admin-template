<template>
  <el-config-provider :locale="(messages[locale as keyof typeof messages] as Language)">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Language } from 'element-plus/es/locale';
const { locale, messages } = useI18n()
</script>
