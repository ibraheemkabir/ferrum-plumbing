"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_fetch_1 = __importDefault(require("cross-fetch"));
class FetcherError extends Error {
    constructor(msg, error) {
        super(msg);
        this.error = error;
    }
}
exports.FetcherError = FetcherError;
class Fetcher {
    constructor(logFac) {
        this.logFac = logFac;
        if (!!logFac) {
            this.log = logFac.getLogger(Fetcher);
        }
    }
    __name__() { return 'Fetcher'; }
    async fetch(url, init) {
        try {
            const res = await cross_fetch_1.default(url, init);
            const resText = await res.text();
            if (Math.round(res.status / 100) === 2) {
                return resText ? JSON.parse(resText) : undefined;
            }
            const error = resText;
            let jerror;
            try {
                jerror = JSON.parse(error);
            }
            catch (e) { }
            this._logError('Server returned an error when calling ' + url + JSON.stringify({
                status: res.status, statusText: res.statusText, error
            }), new Error());
            throw new FetcherError((jerror === null || jerror === void 0 ? void 0 : jerror.error) ? jerror.error : error, jerror);
        }
        catch (e) {
            this._logError('Error calling api with ' + url + JSON.stringify(init), e);
            throw e;
        }
    }
    _logError(msg, e) {
        if (!!this.log) {
            this.log.error(msg, e);
        }
        else {
            console.error(msg, e);
        }
    }
}
exports.Fetcher = Fetcher;
//# sourceMappingURL=Fetcher.js.map