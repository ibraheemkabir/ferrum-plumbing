export interface Metric {
    key: string;
    unit: 'Milliseconds' | 'Count';
}
export interface Timed {
    timestamp: number;
}
export interface ScalarMetric extends Metric {
    count: number;
}
export interface PeriodMetric extends Metric {
    time: number;
}
export interface MetricsServiceConfig {
    period: number;
}
export interface MetricsUploader {
    uploadMetrics(metrics: Metric[]): Promise<void>;
}
//# sourceMappingURL=Types.d.ts.map