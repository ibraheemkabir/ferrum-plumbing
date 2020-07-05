"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationUtils_1 = require("./ValidationUtils");
const AsyncUtils_1 = require("./AsyncUtils");
const TEN_MINUTES = 10 * 60 * 1000;
/**
 * Multiplexes a service. Uses different providers in order.
 * Algo:
 *  1. Use the first provider.
 *  2. In case first provider does not respond, caller will call `next`.
 *  3. There would be an exponential fallback for each ID.
 *  4. Next get, fall back to the first item that is available
 */
class ServiceMultiplexer {
    constructor(providers, logFac) {
        this.index = 0;
        this.providers = [];
        ValidationUtils_1.ValidationUtils.isTrue(!!providers && providers.length >= 1, 'At least one provider is required');
        providers.forEach(p => {
            this.providers.push({
                func: p,
                nextCallTimeout: 0,
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
    get() {
        // Run through the providers and get first first
        const now = Date.now();
        let firstCoolIdx = this.providers.findIndex(p => p.nextCallTimeout <= now);
        let firstCool = this.providers[0];
        this.index = 0;
        if (firstCoolIdx >= 0) {
            firstCool = this.providers[firstCoolIdx];
            this.index = firstCoolIdx;
            firstCool.errors = 0;
            firstCool.nextCallTimeout = now;
        }
        return firstCool.func();
    }
    failed() {
        const current = this.providers[this.index];
        current.errors += 1;
        current.nextCallTimeout = Date.now() + Math.min(TEN_MINUTES, (2 ** current.errors) * 100);
    }
    async retryAsync(fun) {
        return AsyncUtils_1.retry(async () => {
            try {
                const t = this.get();
                return await fun(t);
            }
            catch (e) {
                this.log.error('retryAsync: ', e);
                this.failed();
                throw new AsyncUtils_1.RetryableError(e.message);
            }
        });
    }
}
exports.ServiceMultiplexer = ServiceMultiplexer;
//# sourceMappingURL=ServiceMultiplexer.js.map