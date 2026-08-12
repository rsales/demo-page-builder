import { ref } from 'vue'
import { createPageBuilderBridge } from '~/bridge/bridge'
import type { PageComponent } from '~/types/page'

const bridge = createPageBuilderBridge()

const isEditor = ref(false)
const connected = ref(false)

// NEW — iteration 07. Holds the content received via page:load. null until
// the CMS actually sends something — app.vue falls back to the static
// data/page.ts import while this is null, so the client keeps working
// standalone (see docs/iterations/07-page-load.md scope decision).
const pageData = ref<{ components: PageComponent[] } | null>(null)

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

    // NEW — iteration 07. One-time content sync on connect, not live —
    // see docs/iterations/07-page-load.md.
    bridge.on('page:load', (message) => {
      console.log('[PageBuilder] page:load received', message.payload)

      pageData.value = message.payload as { components: PageComponent[] }
    })

    bridge.connect()
  }

  function disconnect() {
    bridge.disconnect()

    isEditor.value = false
    connected.value = false
    pageData.value = null
  }

  return {
    bridge,
    isEditor,
    connected,
    pageData,
    connect,
    disconnect,
  }
}