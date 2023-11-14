import { NuxtModule } from '@nuxt/schema';

interface AnalyticsModuleParams {
    /**
     * stdout logs about external requests and render time of the page
     * @default true
     */
    verbose: boolean;
    /**
     * To turn on and off the healthcheck route
     * @default true
     */
    healthCheck: boolean;
    /**
     * Healthcheck url path
     * @default '/health'
     */
    healthCheckPath: string;
    /**
     * Prometheus exporter url path
     * @default '/metrics'
     */
    prometheusPath: string;
    /**
     * An optional prefix for metric names.
     *
     * @default no prefix
     */
    prefix?: string;
}

interface RuntimeConfig {
    prometheus: Partial<AnalyticsModuleParams>;
}
interface ModuleOptions extends AnalyticsModuleParams {
}
interface ModulePublicRuntimeConfig extends RuntimeConfig {
}
declare const module: NuxtModule<Partial<AnalyticsModuleParams>>;

export { ModuleOptions, ModulePublicRuntimeConfig, module as default };
