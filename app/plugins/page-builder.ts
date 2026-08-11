export default defineNuxtPlugin(() => {
  const pageBuilder = usePageBuilder()

  pageBuilder.connect()

  return {
    provide: {
      pageBuilder,
    },
  }
})