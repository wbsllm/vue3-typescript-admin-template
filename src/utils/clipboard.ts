import Clipboard from 'clipboard'

function clipboardSuccess() {
  ElMessage.success({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}

function clipboardError() {
  ElMessage.error({
    message: 'Copy failed',
    type: 'error'
  })
}

export default function handleClipboard(text: string, event: Event) {
  const clipboard = new Clipboard(
    (event.target as Node)?.nodeName == 'svg'
      ? ((event.target as Node).parentNode as Element)
      : (event.target as Element),
    { text: () => text }
  )
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  ;(clipboard as any).onClick(event)
}
