import { NuxtModule } from '@nuxt/schema';
import { AnalyticsModuleParams } from '../dist/runtime/type.js';

interface ModuleOptions extends AnalyticsModuleParams {
}
interface ModulePublicRuntimeConfig {
    prometheus: Partial<AnalyticsModuleParams>;
}
declare const module$1: NuxtModule<Partial<AnalyticsModuleParams>>;

export { module$1 as default };
export type { ModuleOptions, ModulePublicRuntimeConfig };
