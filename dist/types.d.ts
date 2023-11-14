
import { ModuleOptions, ModulePublicRuntimeConfig } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['prometheus']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['prometheus']?: ModuleOptions }
  interface PublicRuntimeConfig extends ModulePublicRuntimeConfig {}
}


export { ModuleOptions, ModulePublicRuntimeConfig, default } from './module'
