import { IRootState } from '@/store'
import { ObjectDirective, DirectiveBinding } from 'vue'
import store from '@/store'

const checkPermission = (el: any, binding: DirectiveBinding) => {
  const { value } = binding
  
  const roles = store.getters.roles as string[]

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

export default {
  updated(el, binding) {
    checkPermission(el, binding)
  },
  mounted(el, binding) {
    checkPermission(el, binding)
  }
} as ObjectDirective
