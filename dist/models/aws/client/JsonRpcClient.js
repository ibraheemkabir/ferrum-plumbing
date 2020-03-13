"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_fetch_1 = __importStar(require("cross-fetch"));
class JsonRpcError extends Error {
}
exports.JsonRpcError = JsonRpcError;
function raiseForReponse(response) {
    if (!!response.error) {
        throw new JsonRpcError(response.error);
    }
}
exports.raiseForReponse = raiseForReponse;
class JsonRpcClient {
    constructor(endpoint, apiKey, secretKey, authProvider) {
        this.endpoint = endpoint;
        this.apiKey = apiKey;
        this.secretKey = secretKey;
        this.authProvider = authProvider;
    }
    async call(request, headers = new cross_fetch_1.Headers()) {
        headers.append('Content-Type', 'application/json');
        if (this.authProvider) {
            const { key, value } = this.authProvider.asHeader();
            headers.append(key, value);
        }
        const res = await this.fetch(request, headers);
        // tslint:disable-next-line:no-magic-numbers
        if (Math.round(res.status / 100) === 2) {
            const jsonData = await res.json();
            return {
                responseTime: Date.now(),
                data: jsonData,
            };
        }
        const text = await res.text();
        return {
            responseTime: Date.now(),
            data: {},
            error: `${res.statusText}:${text}`,
        };
    }
    async fetch(request, headers) {
        const url = this.endpoint;
        return cross_fetch_1.default(url, {
            headers,
            method: 'POST',
            body: JSON.stringify(request),
        });
    }
}
exports.JsonRpcClient = JsonRpcClient;
//# sourceMappingURL=JsonRpcClient.js.map