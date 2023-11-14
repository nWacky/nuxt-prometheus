import { Gauge, collectDefaultMetrics, register } from "prom-client";
export const metrics = {
  /** If `true`, metrics was initialized with `initMetrics` */
  isInitialized: false,
  renderTime: null,
  requestTime: null,
  totalTime: null
};
export const initMetrics = (p) => {
  if (metrics.isInitialized)
    return;
  collectDefaultMetrics({
    prefix: p.prefix,
    register
  });
  const prefix = p.prefix ?? "";
  metrics.renderTime = new Gauge({
    name: `${prefix}page_render_time`,
    help: "Time took to render a page",
    labelNames: ["path"]
  });
  metrics.requestTime = new Gauge({
    name: `${prefix}page_request_time`,
    help: "Time took to process a request, before rendering page",
    labelNames: ["path"]
  });
  metrics.totalTime = new Gauge({
    name: `${prefix}page_total_time`,
    help: "Total time it took to complete a request",
    labelNames: ["path"]
  });
  metrics.isInitialized = true;
};
