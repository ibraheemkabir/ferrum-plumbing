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
        return (headers['X-Secret'] || headers['x-secret']) === this.secret;
    }
    async isValidAsync(headers) {
        return [this.isValid(headers), ''];
    }
    verify(headers) {
        ValidationUtils_1.ValidationUtils.isTrue(this.isValid(headers), 'Unauthorized');
    }
    async verifyAsync(headers) {
        this.verify(headers);
    }
}
exports.SecretAuthProvider = SecretAuthProvider;
//# sourceMappingURL=Authentication.js.map