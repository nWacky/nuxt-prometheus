import type { AnalyticsModuleParams } from './type.js';
import { Counter, Gauge, Summary } from 'prom-client';
export declare const metrics: {
    /** If `true`, metrics was initialized with `initMetrics` */
    isInitialized: boolean;
    renderTime: Gauge | null;
    requestTime: Gauge | null;
    totalTime: Gauge | null;
    renderTimeSummary: Summary | null;
    requestTimeSummary: Summary | null;
    totalTimeSummary: Summary | null;
    totalRequests: Counter | null;
};
export declare function initMetrics(p: Partial<AnalyticsModuleParams>): void;
