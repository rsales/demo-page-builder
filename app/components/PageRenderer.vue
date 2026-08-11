<script setup lang="ts">
import type {PageComponent} from '~/types/page'
import {resolveComponent} from '~/lib/component-registry'

defineProps<{
  components: PageComponent[]
}>()
</script>

<template>
  <main>
    <component
      v-for="item in components"
      :key="item.id"
      :is="resolveComponent(item.component)"
      v-bind="item.props"
    />
  </main>
</template>