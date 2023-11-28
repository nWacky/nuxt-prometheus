import { Counter, Gauge, collectDefaultMetrics, register } from "prom-client";
export const metrics = {
  /** If `true`, metrics was initialized with `initMetrics` */
  isInitialized: false,
  renderTime: null,
  requestTime: null,
  totalTime: null,
  totalRequests: null
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
    help: "Time took to render html page, excluding api requests",
    labelNames: ["path"]
  });
  metrics.requestTime = new Gauge({
    name: `${prefix}page_request_time`,
    help: "Time took to send api requests, while rendering page",
    labelNames: ["path"]
  });
  metrics.totalTime = new Gauge({
    name: `${prefix}page_total_time`,
    help: "Total time it took to complete a request",
    labelNames: ["path"]
  });
  metrics.totalRequests = new Counter({
    name: `${prefix}page_total_requests`,
    help: "Total amount of requests received to render html pages",
    labelNames: ["path"]
  });
  metrics.isInitialized = true;
};
