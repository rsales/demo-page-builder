export interface PageComponent {
  id: string | number
  component: string
  name?: string
  props: Record<string, unknown>
}

export interface PageData {
  body: PageComponent[]
}