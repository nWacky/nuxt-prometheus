import { BatchInterceptor } from "@mswjs/interceptors";
import { ClientRequestInterceptor } from "@mswjs/interceptors/ClientRequest";
import { FetchInterceptor } from "@mswjs/interceptors/fetch";
import { XMLHttpRequestInterceptor } from "@mswjs/interceptors/XMLHttpRequest";
import consola from "consola";
import { defineNitroPlugin, useRuntimeConfig } from "nitropack/runtime";
import { initMetrics, metrics } from "./registry.js";
import { calculateTime } from "./utils.js";
const interceptor = new BatchInterceptor({
  name: "nuxt-prometheus",
  interceptors: [
    new XMLHttpRequestInterceptor(),
    new ClientRequestInterceptor(),
    new FetchInterceptor()
  ]
});
export default defineNitroPlugin((nitroApp) => {
  const params = useRuntimeConfig().public.prometheus;
  if (!params.enabled)
    return;
  if (!params.disableRequestInterceptor)
    interceptor.apply();
  initMetrics(params);
  nitroApp.hooks.hook("request", (event) => {
    event.context.prometheus = {
      start: Date.now(),
      requests: {},
      onRequest({ request }) {
        const url = new URL(request.url);
        const isNuxtRequest = /^\/__/.test(url.pathname);
        if (isNuxtRequest)
          return;
        event.context.prometheus.requests[request.url] = {
          start: Date.now(),
          end: Date.now()
        };
        if (params.verbose)
          consola.info(`[nuxt-prometheus] request: ${request.url}, ${(/* @__PURE__ */ new Date()).toISOString()}`);
      },
      onResponse({ response }) {
        const data = event.context.prometheus.requests[response.url];
        if (data)
          data.end = Date.now();
      }
    };
    interceptor.on("request", event.context.prometheus.onRequest);
    interceptor.on("response", event.context.prometheus.onResponse);
  });
  nitroApp.hooks.hook("afterResponse", (event) => {
    interceptor.off("request", event.context.prometheus.onRequest);
    interceptor.off("response", event.context.prometheus.onResponse);
    const path = event.context.matchedRoute?.path === "/**" ? event.context?.prometheus?.path : event.context.matchedRoute?.path;
    if (!path)
      return;
    const time = calculateTime(event.context.prometheus);
    metrics.renderTime?.labels(path).set(time.render);
    metrics.requestTime?.labels(path).set(time.request);
    metrics.totalTime?.labels(path).set(time.total);
    metrics.renderTimeSummary?.labels(path).observe(time.render);
    metrics.requestTimeSummary?.labels(path).observe(time.request);
    metrics.totalTimeSummary?.labels(path).observe(time.total);
    metrics.totalRequests?.labels(path).inc();
    if (params.verbose) {
      consola.info(`[nuxt-prometheus] \xAB${path}\xBB api request time:`, time.request);
      consola.info(`[nuxt-prometheus] \xAB${path}\xBB render time:`, time.render);
      consola.info(`[nuxt-prometheus] \xAB${path}\xBB total time:`, time.total);
    }
  });
  nitroApp.hooks.hook("error", (error, { event }) => {
    if (event?.context.prometheus.onRequest)
      interceptor.off("request", event.context.prometheus.onRequest);
    if (event?.context.prometheus.onResponse)
      interceptor.off("response", event.context.prometheus.onResponse);
    return error;
  });
});
