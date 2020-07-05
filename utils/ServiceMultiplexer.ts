import { Injectable } from "ioc/Container";
import { Logger } from "logging/Types";
import { LoggerFactory } from "logging/LoggerFactory";
import { ValidationUtils } from "./ValidationUtils";
import { retry, RetryableError } from "./AsyncUtils";

interface MuxInfo<T> {
    nextCallTimeout: number;
    errorBuffer: number;
    errors: number;
    func: () => T;
}

const TEN_MINUTES = 10 * 60 * 1000;

/**
 * Multiplexes a service. Uses different providers in order.
 * Algo:
 *  1. Use the first provider.
 *  2. In case first provider does not respond, caller will call `next`.
 *  3. There would be an exponential fallback for each ID.
 *  4. Next get, fall back to the first item that is available
 */
export class ServiceMultiplexer<T> implements Injectable {
    private index: number = 0;
    private providers : MuxInfo<T>[] = [];
    private log: Logger;

    constructor(providers: (() => T)[], logFac: LoggerFactory) {
        ValidationUtils.isTrue(!!providers && providers.length >= 1, 'At least one provider is required');
        providers.forEach(p => {
            this.providers.push({
                func: p,
                nextCallTimeout: 0,
                errorBuffer: 0,
                errors: 0,
            });
        });
        this.get = this.get.bind(this);
        this.failed = this.failed.bind(this);
        this.log = logFac.getLogger(ServiceMultiplexer);
    }

    __name__() { return 'ServiceMultiplexer'; }

    /**
     * Returns the current provider. If the current provider has not changed, will reset the retries
     */
    get(): T {
        // Run through the providers and get first first
        const now = Date.now();
        let firstCoolIdx = this.providers.findIndex(p => p.nextCallTimeout <= now);
        let firstCool = this.providers[0];
        this.index = 0;
        if (firstCoolIdx >= 0) {
            firstCool = this.providers[firstCoolIdx];
            this.index = firstCoolIdx;
            firstCool!.errors = 0; // TODO: This should only be done if using the index is successful
            firstCool.nextCallTimeout = now;
        }
        return firstCool.func();
    }

    failed() {
        const current = this.providers[this.index];
        const now = Date.now();
        if (current.errorBuffer <= now) {
            current.errors += 1;
            current.nextCallTimeout = now + Math.min(TEN_MINUTES, (2 ** current.errors) * 400 );
            current.errorBuffer = now + 100;
        }
    }

    async retryAsync<TOut>(fun: (t: T) => Promise<TOut>) {
        return retry(async () => {
        try{
            const t = this.get();
            return await fun(t);
        } catch(e) {
            this.log.error('retryAsync: ', e);
            this.failed();
            throw new RetryableError(e.message);
        }});
    }
}