import { Gauge } from 'prom-client';
import type { AnalyticsModuleParams } from './type';
export declare const renderTime: Gauge<string> | null;
export declare const requestTime: Gauge<string> | null;
export declare const totalTime: Gauge<string> | null;
export declare const initMetrics: (p: Partial<AnalyticsModuleParams>) => void;
