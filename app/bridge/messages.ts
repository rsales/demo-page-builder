import type {PageBuilderMessage} from './protocol'

export function createMessage<T>(
  type: PageBuilderMessage['type'],
  payload?: T,
): PageBuilderMessage<T> {
  return {
    source: 'simple-page-builder',
    type,
    payload,
  }
}