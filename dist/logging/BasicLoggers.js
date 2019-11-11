"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NilLogger {
    __name__() { return 'NilLogger'; }
    critical(errorType, message, error) { }
    debug(...args) { }
    error(...args) { }
    info(...args) { }
}
exports.NilLogger = NilLogger;
class ConsoleLogger {
    constructor(className) {
        this.className = className;
    }
    __name__() { return 'ConsoleLogger'; }
    critical(errorType, message, error) {
        console.error(this.className, errorType, message, error);
    }
    debug(...args) {
        console.debug(this.className, ...args);
    }
    error(...args) {
        console.error(this.className, ...args);
    }
    info(...args) {
        console.info(this.className, ...args);
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=BasicLoggers.js.map