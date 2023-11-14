import { defu } from 'defu';
import { defineNuxtModule, createResolver, addServerHandler, addPlugin } from '@nuxt/kit';

const name = "@artmizu/nuxt-prometheus";
const version = "2.2.0";

const module = defineNuxtModule({
  meta: {
    name,
    version,
    configKey: "prometheus",
    compatibility: {
      nuxt: "^3.0.0 || ^2.16.0",
      bridge: true
    }
  },
  defaults: {
    verbose: true,
    healthCheck: true,
    prometheusPath: "/metrics",
    healthCheckPath: "/health"
  },
  async setup(options, nuxt) {
    const moduleOptions = defu(
      nuxt.options.runtimeConfig.public.prometheus,
      // TODO
      options
    );
    nuxt.options.runtimeConfig.public.prometheus = moduleOptions;
    const { resolve } = createResolver(import.meta.url);
    nuxt.options.build.transpile.push(resolve("runtime"));
    addServerHandler({
      route: options.prometheusPath,
      method: "get",
      handler: resolve("./runtime/handler")
    });
    if (options.healthCheck) {
      addServerHandler({
        route: options.healthCheckPath,
        method: "get",
        handler: resolve("./runtime/health")
      });
    }
    addPlugin({ src: resolve("./runtime/plugin"), mode: "server" });
  }
});

export { module as default };
