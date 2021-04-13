"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
}
exports.ValidationError = ValidationError;
class ValidationUtils {
    static notEmpty(obj, message) {
        if (!obj) {
            throw new ValidationError(message);
        }
    }
    static isTrue(predicate, message) {
        if (!predicate) {
            throw new ValidationError(message);
        }
    }
    static allRequired(keys, v) {
        keys.forEach(k => {
            ValidationUtils.isTrue(!!k, `"${k}" must be provided`);
        });
    }
}
exports.ValidationUtils = ValidationUtils;
//# sourceMappingURL=ValidationUtils.js.map