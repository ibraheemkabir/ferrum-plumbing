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
exports.globalRetryConfig = {
    defaultTimeout: 300,
    count: 3,
};
class RetryableError extends Error {
}
exports.RetryableError = RetryableError;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
function retry(fun) {
    return __awaiter(this, void 0, void 0, function* () {
        return retryWithConf(exports.globalRetryConfig, fun);
    });
}
exports.retry = retry;
function retryWithConf(conf, fun) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < conf.count; i++) {
            try {
                return yield fun();
            }
            catch (e) {
                if (e instanceof RetryableError) {
                    // pass
                    yield sleep(conf.defaultTimeout * Math.pow(2, i));
                }
                else
                    throw e;
            }
        }
    });
}
exports.retryWithConf = retryWithConf;
//# sourceMappingURL=AsyncUtils.js.map