<script lang="tsx">
export default {
  name: 'MemuIcon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  render(context: any) {
    const { icon } = context
    if (icon) {
      const firstChar = (icon as string).charCodeAt(0)
      if (firstChar >= 65 && firstChar <= 90) {
        return (<el-icon class="sub-el-icon">
          {h(getCurrentInstance()?.appContext.components[icon] as Component)}
        </el-icon>)
      } else {
        return (<svg-icon icon-class={icon} />)
      }
    }
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
