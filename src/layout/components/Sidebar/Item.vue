<script lang="tsx">
import { Component } from 'vue'
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(context: any) {
    const { icon, title } = context

    const vnodes = []

    if (icon) {
      const firstChar = (icon as string).charCodeAt(0)
      if (firstChar >= 65 && firstChar <= 90) {
        vnodes.push(
          <el-icon class="sub-el-icon">
            {h(getCurrentInstance()?.appContext.components[icon] as Component)}
          </el-icon>
        )
      } else {
        vnodes.push(<svg-icon icon-class={icon} />)
      }
    }

    if (title) {
      vnodes.push(<span v-slot="title">{title}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
