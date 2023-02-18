<template>
  <div style="display:inline-block;">
    <label class="radio-label" style="padding-left:0;">Filename: </label>
    <el-input v-model="filename" placeholder="Please enter the file name (default excel-list)" style="width:345px;"
      prefix-icon="Document" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ modelValue: string }>(), { modelValue: '' })
const emits = defineEmits<{ (e: 'update:modelValue', val: string): void }>()
let filename = computed({
  get() {
    return props.modelValue
  },
  set(val: string) {
    emits('update:modelValue', val)
  }
})
</script>
