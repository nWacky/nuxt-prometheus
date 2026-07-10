import type { ModulePublicRuntimeConfig } from './module.mjs'

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig extends ModulePublicRuntimeConfig {}
}

export { default } from './module.mjs'

export { type ModuleOptions, type ModulePublicRuntimeConfig } from './module.mjs'
