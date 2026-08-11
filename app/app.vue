<script setup lang="ts">
import PageRenderer from '~/components/PageRenderer.vue'
import {page} from '~/data/page'
</script>

<template>
  <PageRenderer :components="page.body" />
</template>