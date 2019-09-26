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
}
exports.ValidationUtils = ValidationUtils;
//# sourceMappingURL=ValidationUtils.js.map