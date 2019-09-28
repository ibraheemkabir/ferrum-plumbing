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
class LocalCache {
    constructor() {
        this.cache = new Map();
    }
    getAsync(key, factory) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cache.has(key)) {
                const res = yield factory();
                this.cache.set(key, res);
            }
            return this.cache.get(key);
        });
    }
    __name__() {
        return 'LocalCache';
    }
}
exports.LocalCache = LocalCache;
//# sourceMappingURL=LocalCache.js.map