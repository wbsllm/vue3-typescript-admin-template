import { defaultSettings } from '@/settings'

const title = defaultSettings.title || 'Vue Element Admin'

export default function getPageTitle(key: string) {
  if (key) {
    return `${key} - ${title}`
  }
  return `${title}`
}
