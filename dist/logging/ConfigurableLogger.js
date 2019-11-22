"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleLogWriter = console.log;
function timed(msg) {
    return `${new Date().toISOString()} ${msg}`;
}
class ConfigurableLogger {
    constructor(className, criticalWriter, errorWriter, infoWriter, debugWriter) {
        this.className = className;
        this.criticalWriter = criticalWriter;
        this.errorWriter = errorWriter;
        this.infoWriter = infoWriter;
        this.debugWriter = debugWriter;
    }
    critical(errorType, message, error) {
        this.criticalWriter(timed(this.className), errorType, message, error);
    }
    debug(...args) {
        this.debugWriter(timed(this.className), ...args);
    }
    error(...args) {
        this.errorWriter(timed(this.className), ...args);
    }
    info(...args) {
        this.infoWriter(timed(this.className), ...args);
    }
    __name__() { return 'ConfigurableLogger'; }
}
exports.ConfigurableLogger = ConfigurableLogger;
//# sourceMappingURL=ConfigurableLogger.js.map