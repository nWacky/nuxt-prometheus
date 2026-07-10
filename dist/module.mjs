import { defineNuxtModule, createResolver, addServerPlugin, addServerHandler, addPlugin } from '@nuxt/kit';
import { defu } from 'defu';

const name = "@artmizu/nuxt-prometheus";
const version = "3.0.3";

const module$1 = defineNuxtModule({
  meta: {
    name,
    version,
    configKey: "prometheus",
    compatibility: {
      nuxt: ">=3.0.0 || >=4.0.0"
    }
  },
  defaults: {
    enabled: true,
    verbose: true,
    healthCheck: true,
    prometheusPath: "/metrics",
    healthCheckPath: "/health",
    disableRequestInterceptor: false,
    metricsEndpoint: true
  },
  async setup(options, nuxt) {
    const moduleOptions = defu(
      nuxt.options.runtimeConfig.public.prometheus,
      options
    );
    nuxt.options.runtimeConfig.public.prometheus = moduleOptions;
    const { resolve } = createResolver(import.meta.url);
    nuxt.options.build.transpile.push(resolve("runtime"));
    addServerPlugin(resolve("./runtime/nitro"));
    addServerHandler({
      route: options.prometheusPath,
      method: "get",
      handler: resolve("./runtime/handler")
    });
    addServerHandler({
      route: options.healthCheckPath,
      method: "get",
      handler: resolve("./runtime/health")
    });
    addPlugin({ src: resolve("./runtime/plugin"), mode: "server" });
  }
});

export { module$1 as default };
