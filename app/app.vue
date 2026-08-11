<script setup lang="ts">
import PageRenderer from '~/components/PageRenderer.vue'
import { page } from '~/data/page'

const { isEditor } = usePageBuilder()
</script>

<template>
  <div>
    <span v-if="isEditor">
      Editor Mode
    </span>

    <span v-else>
      Preview Mode
    </span>

    <PageRenderer :components="page.body" />
  </div>
</template>