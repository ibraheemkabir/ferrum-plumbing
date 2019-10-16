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
const JsonRpcClient_1 = require("../models/aws/client/JsonRpcClient");
const ValidationUtils_1 = require("../utils/ValidationUtils");
/**
 * A client that produces slightly different call format compared to JSON RPC:
 * - data will be passed as POST body
 */
class JsonApiClient extends JsonRpcClient_1.JsonRpcClient {
    constructor(endpoint, authProvider) {
        super(endpoint, '', '', authProvider);
    }
    fetch(request, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            ValidationUtils_1.ValidationUtils.isTrue(!request.params && !request.params.length, 'Do not include "params" when using JsonApiClient');
            return fetch({
                headers,
                method: 'POST',
                url: this.endpoint + '/' + request.command,
                body: JSON.stringify(request.data),
            });
        });
    }
}
exports.JsonApiClient = JsonApiClient;
//# sourceMappingURL=JsonApiClient.js.map