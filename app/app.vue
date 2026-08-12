<script setup lang="ts">
import PageRenderer from '~/components/PageRenderer.vue'
import { page } from '~/data/page'

const { isEditor, pageData } = usePageBuilder()

// iteration 07: prefer content received via page:load; fall back to the
// static import when there's no CMS connection yet (direct access,
// isEditor === false) — see docs/iterations/07-page-load.md.
const components = computed(() => pageData.value?.components ?? page.body)
</script>

<template>
  <div>
    <span v-if="isEditor">
      Editor Mode
    </span>

    <span v-else>
      Preview Mode
    </span>

    <PageRenderer :components="components" />
  </div>
</template>