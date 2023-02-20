<template>
  <el-color-picker
    v-model="theme"
    :predefine="[
      '#409EFF',
      '#1890ff',
      '#304156',
      '#212121',
      '#11a983',
      '#13c2c2',
      '#6959CD',
      '#f5222d'
    ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script setup lang="ts">
import { IRootState } from '@/store'
import { version } from 'element-plus/package.json'
const ORIGINAL_THEME = '#409EFF'
const store = useStore<IRootState>()
let defaultTheme = computed(() => store.state.settings.theme)
let emits = defineEmits<{ (e: 'change', val: string): void }>()
let theme = ref('')
let chalk = ref('')
let variables = ref<Record<string, string>>({})
onMounted(() => {
  document
    .querySelector('.theme-picker-dropdown')
    ?.addEventListener('click', (e) => e.stopPropagation())
})
watch(
  defaultTheme,
  (val) => {
    theme.value = val
  },
  { immediate: true }
)
watch(theme, async (val) => {
  const oldVal = chalk.value ? theme.value : ORIGINAL_THEME
  if (typeof val !== 'string') return
  const themeCluster = getThemeCluster(val.replace('#', ''))
  const originalCluster = getThemeCluster(oldVal.replace('#', ''))

  // const $message = ElMessage({
  //   message: '  Compiling the theme',
  //   customClass: 'theme-message',
  //   type: 'success',
  //   duration: 0,
  //   // iconClass: 'el-icon-loading'
  // })

  const getHandler = (variable: string, id: string) => {
    return () => {
      const originalCluster = getThemeCluster(ORIGINAL_THEME.replace('#', ''))
      const newStyle = updateStyle(
        variables.value[variable],
        originalCluster,
        themeCluster
      )

      let styleTag = document.getElementById(id)
      if (!styleTag) {
        styleTag = document.createElement('style')
        styleTag.setAttribute('id', id)
        document.head.appendChild(styleTag)
      }
      styleTag.innerText = newStyle
    }
  }

  if (!chalk.value) {
    const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
    await getCSSString(url, 'chalk')
  }

  const chalkHandler = getHandler('chalk', 'chalk-style')

  chalkHandler()

  const styles = [].slice
    .call(document.querySelectorAll('style'))
    .filter((style) => {
      const text = (style as any).innerText
      return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
    })
  styles.forEach((style) => {
    const { innerText } = style
    if (typeof innerText !== 'string') return
    ;(style as any).innerText = updateStyle(
      innerText,
      originalCluster,
      themeCluster
    )
  })
  console.log(111);
  
  emits('change', val)
  // $message.close()
})

const getThemeCluster = (theme: string) => {
  const tintColor = (color: string, tint: number) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)

    if (tint === 0) {
      // when primary color is in its rgb space
      return [red, green, blue].join(',')
    } else {
      red += Math.round(tint * (255 - red))
      green += Math.round(tint * (255 - green))
      blue += Math.round(tint * (255 - blue))

      return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
    }
  }

  const shadeColor = (color: string, shade: number) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)

    red = Math.round((1 - shade) * red)
    green = Math.round((1 - shade) * green)
    blue = Math.round((1 - shade) * blue)

    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
  }

  const clusters = [theme]
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
  }
  clusters.push(shadeColor(theme, 0.1))
  return clusters
}

const getCSSString = (url: string, variable: string) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        variables.value[variable] = xhr.responseText.replace(
          /@font-face{[^}]+}/,
          ''
        )
        resolve('')
      }
    }
    xhr.open('GET', url)
    xhr.send()
  })
}

const updateStyle = (
  style: string,
  oldCluster: string[],
  newCluster: string[]
) => {
  let newStyle = style
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
  })
  return newStyle
}
</script>

<style>
.el-color-picker {
  float: right;
  height: 26px;
  margin: -3px 8px 0 0;
}

.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
