"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonRpcClient_1 = require("../models/aws/client/JsonRpcClient");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const ValidationUtils_1 = require("../utils/ValidationUtils");
/**
 * A client that produces slightly different call format compared to JSON RPC:
 * - data will be passed as POST body
 */
class JsonApiClient extends JsonRpcClient_1.JsonRpcClient {
    constructor(endpoint, authProvider) {
        super(endpoint, '', '', authProvider);
    }
    async fetch(request, headers) {
        ValidationUtils_1.ValidationUtils.isTrue(!request.params || !request.params.length, 'Do not include "params" when using JsonApiClient');
        const url = this.endpoint + '/' + request.command;
        return cross_fetch_1.default(url, {
            headers,
            method: 'POST',
            body: JSON.stringify(request.data),
        });
    }
}
exports.JsonApiClient = JsonApiClient;
//# sourceMappingURL=JsonApiClient.js.map