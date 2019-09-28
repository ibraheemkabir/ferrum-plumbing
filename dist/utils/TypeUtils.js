"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeUtils {
    static bufferToHex(buffer) {
        // tslint:disable-next-line:no-magic-numbers
        return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
}
exports.TypeUtils = TypeUtils;
//# sourceMappingURL=TypeUtils.js.map