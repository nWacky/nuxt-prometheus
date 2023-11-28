import { Counter, Gauge } from 'prom-client';
import type { AnalyticsModuleParams } from './type';
export declare const metrics: {
    /** If `true`, metrics was initialized with `initMetrics` */
    isInitialized: boolean;
    renderTime: Gauge<string> | null;
    requestTime: Gauge<string> | null;
    totalTime: Gauge<string> | null;
    totalRequests: Counter<string> | null;
};
export declare const initMetrics: (p: Partial<AnalyticsModuleParams>) => void;
