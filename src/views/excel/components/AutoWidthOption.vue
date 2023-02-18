<template>
  <div style="display:inline-block;">
    <label class="radio-label">Cell Auto-Width: </label>
    <el-radio-group v-model="autoWidth">
      <el-radio :label="true" border>
        True
      </el-radio>
      <el-radio :label="false" border>
        False
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{ modelValue: boolean }>(), { modelValue: true })
const emits = defineEmits<{ (e: 'update:modelValue', val: boolean): void }>()
let autoWidth = computed({
  get() {
    return props.modelValue
  },
  set(val: boolean) {
    emits('update:modelValue', val)
  }
})
</script>
