import { Injectable } from "../ioc/Container";
import { RetryConfig } from "../utils/AsyncUtils";
import { LoggerFactory } from "../logging/LoggerFactory";
export declare class FinishJobScheduleError extends Error {
}
export declare class WrappedPromise<T> {
    private pFac;
    private _result;
    private _error;
    private _completed;
    private _started;
    constructor(pFac: () => Promise<T>);
    run(): Promise<T>;
    result(): T | undefined | null;
    error(): Error | undefined;
    completed(): boolean;
    started(): boolean;
}
export interface LongRunningSchedulerOptions {
    repeatPeriod: number;
    runNewIfOldIsNotFinished: boolean;
    retry: RetryConfig;
    logErrors: boolean;
}
export interface Job {
    jobFactory: (r: any) => Promise<any>;
    retries: number;
    lastRun: number;
    lastResult: any;
    current: WrappedPromise<any>;
    options: LongRunningSchedulerOptions;
}
/**
 * To schedule long running Promises, and manage retries, failures.
 */
export declare class LongRunningScheduler implements Injectable {
    private lookupDuration;
    private jobs;
    private _died;
    private _interval;
    private readonly log;
    constructor(logger: LoggerFactory, lookupDuration?: number);
    init(): void;
    schedulePeriodic<T>(name: string, jobFactory: (lastRes: T | undefined) => Promise<T>, options: LongRunningSchedulerOptions): void;
    intervalCall: () => void;
    private _run;
    died(): boolean;
    private die;
    static runForever(scheduler: LongRunningScheduler, period: number): Promise<void>;
    __name__(): string;
}
//# sourceMappingURL=LongRunningScheduler.d.ts.map