import { Injectable } from "ioc/Container";
import { LoggerFactory } from "logging/LoggerFactory";
export interface UsesServiceMultiplexer {
    setMode(mode: 'load-balance' | 'one-hot'): void;
}
/**
 * Multiplexes a service. Uses different providers in order.
 * Algo:
 *  1. Use the first provider.
 *  2. In case first provider does not respond, caller will call `next`.
 *  3. There would be an exponential fallback for each ID.
 *  4. Next get, fall back to the first item that is available
 */
export declare class ServiceMultiplexer<T> implements Injectable {
    private dontRetryError?;
    private mode;
    private index;
    private providers;
    private log;
    constructor(providers: (() => T)[], logFac: LoggerFactory, dontRetryError?: ((e: Error) => boolean) | undefined, mode?: 'load-balance' | 'one-hot');
    __name__(): string;
    updateMode(mode: 'load-balance' | 'one-hot'): void;
    /**
     * Returns the current provider. If the current provider has not changed, will reset the retries
     */
    get(): T;
    failed(): Promise<void>;
    retryAsync<TOut>(fun: (t: T) => Promise<TOut>): Promise<TOut | undefined>;
}
//# sourceMappingURL=ServiceMultiplexer.d.ts.map