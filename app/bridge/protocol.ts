export type PageBuilderMessageType =
  | 'bridge:connect'
  | 'bridge:ready'
  | 'page:load'
  | 'component:selected'
  | 'component:hover'
  | 'content:add'
  | 'content:move'
  | 'content:update'
  | 'content:remove'

export interface PageBuilderMessage<T = unknown> {
  source: 'simple-page-builder'
  type: PageBuilderMessageType
  payload?: T
}