<script setup lang="ts">
import PageHeroComponent from './PageHeroComponent.vue'
import PageLogoComponent from './PageLogoComponent.vue'

import type {PageComponent} from '~/types/page'

const props = defineProps<{
  components: PageComponent[]
}>()

const componentRegistry = {
  'hero-component': PageHeroComponent,
  'logo-component': PageLogoComponent,
} as const
</script>

<template>
  <main>
    <component
      v-for="item in props.components"
      :is="componentRegistry[item.component as keyof typeof componentRegistry]"
      :key="item.id"
      v-bind="item.props"
    />
  </main>
</template>