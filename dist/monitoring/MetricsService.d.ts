import { MetricsAggregator } from "./MetricsAggregator";
import { MetricsServiceConfig, MetricsUploader } from "./Types";
import { LoggerFactory } from "../logging/LoggerFactory";
import { Injectable } from "../ioc/Container";
export declare class MetricsService implements Injectable {
    private aggregator;
    private config;
    private uploader;
    private logFac;
    private log;
    private interval;
    constructor(aggregator: MetricsAggregator, config: MetricsServiceConfig, uploader: MetricsUploader, logFac: LoggerFactory);
    __name__(): string;
    count(name: string, count?: number): void;
    time(name: string, time: number): void;
    start(): void;
    stop: () => void;
    private cycle;
}
//# sourceMappingURL=MetricsService.d.ts.map