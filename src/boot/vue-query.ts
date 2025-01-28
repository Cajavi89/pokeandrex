// src/boot/vue-query.ts
import { boot } from 'quasar/wrappers'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

export default boot(async ({ app }) => {
  // Crea una instancia de QueryClient
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       gcTime: 1000 * 60 * 5, // 5 minutos
  //       refetchOnWindowFocus: false,
  //       retry: 2
  //     }
  //   }
  // })
  const queryClient = new QueryClient()

  // Usa el plugin de Vue Query
  app.use(VueQueryPlugin, { queryClient })

  // VueQueryPlugin.install(app, {
  //   // configuracions
  // })
})
