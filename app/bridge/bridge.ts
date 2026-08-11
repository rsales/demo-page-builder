import { createMessage } from './messages'
import type { PageBuilderMessage } from './protocol'

export interface PageBuilderBridge {
  connect: () => void
  disconnect: () => void

  send: <T>(
    type: PageBuilderMessage['type'],
    payload?: T,
  ) => void

  on: (
    type: PageBuilderMessage['type'],
    callback: (message: PageBuilderMessage) => void,
  ) => () => void
}

export function createPageBuilderBridge(): PageBuilderBridge {
  const listeners = new Map<
    PageBuilderMessage['type'],
    Set<(message: PageBuilderMessage) => void>
  >()

  let connected = false
  let readySent = false

  function handleMessage(event: MessageEvent) {
    console.log('[PageBuilder Bridge] MESSAGE RECEIVED', {
      origin: event.origin,
      data: event.data,
    })

    const message = event.data as PageBuilderMessage

    if (!message || message.source !== 'simple-page-builder') {
      return
    }

    console.log('[PageBuilder Bridge] VALID MESSAGE', message)

    if (message.type === 'bridge:connect') {
      if (connected) {
        console.log('[PageBuilder Bridge] already connected')
        return
      }

      connected = true

      console.log('[PageBuilder Bridge] CMS CONNECTED')
    }

    const callbacks = listeners.get(message.type)

    callbacks?.forEach((callback) => {
      callback(message)
    })
  }

  function connect() {
    window.addEventListener('message', handleMessage)

    console.log('[PageBuilder Bridge] listening')

    // A aplicação não está dentro de um iframe.
    // Portanto não existe CMS parent para conectar.
    if (window.parent === window) {
      return
    }

    if (readySent) {
      return
    }

    readySent = true

    send('bridge:ready')
  }

  function disconnect() {
    window.removeEventListener('message', handleMessage)

    connected = false
    readySent = false

    console.log('[PageBuilder Bridge] disconnected')
  }

  function send<T>(
    type: PageBuilderMessage['type'],
    payload?: T,
  ) {
    console.log('[PageBuilder Bridge] sending:', type)

    window.parent.postMessage(
      createMessage(type, payload),
      '*',
    )
  }

  function on(
    type: PageBuilderMessage['type'],
    callback: (message: PageBuilderMessage) => void,
  ) {
    if (!listeners.has(type)) {
      listeners.set(type, new Set())
    }

    listeners.get(type)!.add(callback)

    return () => {
      listeners.get(type)?.delete(callback)
    }
  }

  return {
    connect,
    disconnect,
    send,
    on,
  }
}