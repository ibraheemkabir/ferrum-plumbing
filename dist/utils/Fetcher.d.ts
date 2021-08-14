import { Injectable, LoggerFactory } from 'models';
export declare class FetcherError extends Error {
    error: any;
    constructor(msg: string, error: any);
}
export declare class Fetcher implements Injectable {
    private logFac;
    private log;
    constructor(logFac: LoggerFactory | undefined);
    __name__(): string;
    fetch<T>(url: string, init: RequestInit | undefined): Promise<T>;
    _logError(msg: string, e: Error): void;
}
//# sourceMappingURL=Fetcher.d.ts.map