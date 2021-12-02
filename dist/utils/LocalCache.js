"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CLEANUP_TIME = 300000; // 5 minutes
class LocalCache {
    constructor() {
        this.cache = new Map();
        this.promiseCache = new Map();
        this.lastCleanup = Date.now();
    }
    async getAsync(key, factory, timeout) {
        if (!this.get(key)) {
            if (this.promiseCache.has(key)) {
                return await this.promiseCache.get(key);
            }
            if (factory) {
                const res = factory();
                try {
                    this.promiseCache.set(key, res);
                    this.set(key, await res, timeout);
                }
                finally {
                    this.promiseCache.delete(key);
                }
            }
        }
        return this.get(key);
    }
    set(key, item, timeout) {
        this.cache.set(key, { time: Date.now(), item: item, timeout });
    }
    get(key) {
        const res = this.cache.get(key);
        this.cleanup();
        if (res && res.timeout && (res.time + res.timeout) < Date.now()) {
            return undefined;
        }
        return res ? res.item : undefined;
    }
    remove(key) {
        this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    cleanup() {
        const now = Date.now();
        if ((now - this.lastCleanup) > CLEANUP_TIME) {
            const keys = Array.from(this.cache.keys());
            keys.forEach(k => {
                const val = this.cache.get(k);
                if (val && val.timeout && ((now - val.time) > val.timeout)) {
                    this.cache.delete(k);
                }
            });
        }
    }
    __name__() {
        return 'LocalCache';
    }
}
exports.LocalCache = LocalCache;
//# sourceMappingURL=LocalCache.js.map