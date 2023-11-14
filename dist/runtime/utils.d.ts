import type { AnalyticsModuleState } from './type';
export declare function calculateTime(data: AnalyticsModuleState): {
    request: number;
    render: number;
    total: number;
};
