export declare const globalRetryConfig: {
    defaultTimeout: number;
    count: number;
};
export declare class RetryableError extends Error {
}
export declare function sleep(ms: number): Promise<unknown>;
export declare function retry<T>(fun: () => Promise<T>): Promise<T | undefined>;
//# sourceMappingURL=AsyncUtils.d.ts.map