"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importStar(require("node-fetch"));
class JsonRpcClient {
    constructor(endpoint, apiKey, secretKey) {
        this.endpoint = endpoint;
        this.apiKey = apiKey;
        this.secretKey = secretKey;
    }
    call(request, headers = new node_fetch_1.Headers()) {
        return __awaiter(this, void 0, void 0, function* () {
            headers.append('Content-Type', 'application/json');
            const res = yield node_fetch_1.default({
                headers,
                method: 'POST',
                url: this.endpoint,
                body: JSON.stringify(request),
            });
            if (res.status / 100 === 2) {
                const jsonData = yield res.json();
                return {
                    responseTime: Date.now(),
                    data: jsonData,
                };
            }
            else {
                const text = yield res.text();
                return {
                    responseTime: Date.now(),
                    data: {},
                    error: `${res.statusText}:${text}`,
                };
            }
        });
    }
}
exports.JsonRpcClient = JsonRpcClient;
//# sourceMappingURL=JsonRpcClient.js.map