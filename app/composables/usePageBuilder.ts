import { ref } from 'vue'
import { createPageBuilderBridge } from '~/bridge/bridge'

const bridge = createPageBuilderBridge()

const isEditor = ref(false)
const connected = ref(false)

export function usePageBuilder() {
  function connect() {
    if (!import.meta.client) {
      return
    }

    bridge.on('bridge:connect', () => {
      console.log('[PageBuilder] CMS connected')

      isEditor.value = true
      connected.value = true
    })

    bridge.connect()
  }

  function disconnect() {
    bridge.disconnect()

    isEditor.value = false
    connected.value = false
  }

  return {
    bridge,
    isEditor,
    connected,
    connect,
    disconnect,
  }
}