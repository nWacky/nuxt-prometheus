import type { NuxtPrometheusState } from './type.js';
export declare function calculateTime(data: NuxtPrometheusState): {
    request: number;
    render: number;
    total: number;
};
