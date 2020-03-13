import { Metric } from "./Types";
export declare class MetricsAggregator {
    constructor();
    private counters;
    private timersMax;
    private timersAvg;
    private timersCnt;
    count(name: string, count?: number): void;
    time(name: string, time: number): void;
    reset(): Metric[];
}
//# sourceMappingURL=MetricsAggregator.d.ts.map