"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeUtils {
    static bufferToHex(buffer) {
        // tslint:disable-next-line:no-magic-numbers
        return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    static async meomize(dis, field, provider) {
        if (!dis[field]) {
            const v = await provider();
            dis[field] = v;
        }
        return dis[field];
    }
}
exports.TypeUtils = TypeUtils;
//# sourceMappingURL=TypeUtils.js.map