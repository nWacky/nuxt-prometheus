import { defineNuxtPlugin, useRouter, useRuntimeConfig } from "#app";
export default defineNuxtPlugin((ctx) => {
  const params = useRuntimeConfig().public.prometheus;
  if (!params.enabled)
    return;
  const router = useRouter();
  const path = router.currentRoute.value?.matched?.at(-1)?.path;
  ctx.ssrContext.event.context.prometheus = {
    ...ctx.ssrContext.event.context.prometheus,
    path
  };
});
