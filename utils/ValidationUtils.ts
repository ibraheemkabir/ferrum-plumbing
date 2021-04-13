
export class ValidationError extends Error { }

export class ValidationUtils {
  static notEmpty(obj: any, message: string) {
    if (!obj) {
      throw new ValidationError(message);
    }
  }
  static isTrue(predicate: boolean, message: string) {
    if (!predicate) {
      throw new ValidationError(message);
    }
  }
  static allRequired(keys: string[], v: any) {
    keys.forEach(k => {
      ValidationUtils.isTrue(!!k, `"${k}" must be provided`);
    })
  }
}
