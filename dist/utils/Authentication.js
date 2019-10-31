"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationUtils_1 = require("./ValidationUtils");
class SecretAuthProvider {
    constructor(secret) {
        this.secret = secret;
    }
    asHeader() {
        return { key: 'X-Secret', value: this.secret };
    }
    getAuthSession() {
        return '';
    }
    isValid(headers) {
        return headers['X-Secret'] === this.secret;
    }
    verify(headers) {
        ValidationUtils_1.ValidationUtils.isTrue(this.isValid(headers), 'Unauthorized');
    }
}
exports.SecretAuthProvider = SecretAuthProvider;
//# sourceMappingURL=Authentication.js.map