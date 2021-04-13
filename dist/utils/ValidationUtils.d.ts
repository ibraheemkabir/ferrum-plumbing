export declare class ValidationError extends Error {
}
export declare class ValidationUtils {
    static notEmpty(obj: any, message: string): void;
    static isTrue(predicate: boolean, message: string): void;
    static allRequired(keys: string[], v: any): void;
}
//# sourceMappingURL=ValidationUtils.d.ts.map