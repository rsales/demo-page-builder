import type {Component} from 'vue'

import PageHeroComponent from '~/components/PageHeroComponent.vue'
import PageLogoComponent from '~/components/PageLogoComponent.vue'

export const componentRegistry: Record<string, Component> = {
  'hero-component': PageHeroComponent,
  'logo-component': PageLogoComponent,
}

export function resolveComponent(slug: string): Component | null {
  return componentRegistry[slug] ?? null
}