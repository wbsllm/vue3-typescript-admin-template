<template>
  <div style="display:inline-block;">
    <label class="radio-label">Book Type: </label>
    <el-select v-model="bookType" style="width:120px;">
      <el-option v-for="item in options" :key="item" :label="item" :value="item" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ modelValue: string }>(), { modelValue: 'xlsx' })
const emits = defineEmits<{ (e: 'update:modelValue', val: string): void }>()
const options = ['xlsx', 'csv', 'txt']
let bookType = computed({
  get() {
    return props.modelValue
  },
  set(val: string) {
    emits('update:modelValue', val)
  }
})
</script>
