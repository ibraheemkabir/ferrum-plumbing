"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CLEANUP_TIME = 300000; // 5 minutes
class LocalCache {
    constructor() {
        this.cache = new Map();
        this.lastCleanup = Date.now();
    }
    getAsync(key, factory, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cache.has(key)) {
                const res = yield factory();
                this.set(key, res, timeout);
            }
            return this.get(key);
        });
    }
    set(key, item, timeout) {
        this.cache.set(key, { time: Date.now(), item: item, timeout });
    }
    get(key) {
        const res = this.cache.get(key);
        this.cleanup();
        return res ? res.item : res;
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