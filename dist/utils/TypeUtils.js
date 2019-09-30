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
class TypeUtils {
    static bufferToHex(buffer) {
        // tslint:disable-next-line:no-magic-numbers
        return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    static meomize(dis, field, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dis[field]) {
                const v = yield provider();
                dis[field] = v;
            }
            return dis[field];
        });
    }
}
exports.TypeUtils = TypeUtils;
//# sourceMappingURL=TypeUtils.js.map