import { defineNitroPlugin } from "nitropack/dist/runtime/plugin";
import { initMetrics } from "./registry.mjs";
import { useRuntimeConfig } from "#imports";
export default defineNitroPlugin(() => {
  const params = useRuntimeConfig().public.prometheus;
  initMetrics(params);
});
