import { Injectable } from "ioc/Container";
import { Logger, LogWriter } from "./Types";
export declare class ConfigurableLogger implements Injectable, Logger {
    private className;
    private criticalWriter;
    private errorWriter;
    private infoWriter;
    private debugWriter;
    constructor(className: string, criticalWriter: LogWriter, errorWriter: LogWriter, infoWriter: LogWriter, debugWriter: LogWriter);
    critical(errorType: string, message: string, error: Error): void;
    debug(...args: any[]): void;
    error(...args: any[]): void;
    info(...args: any[]): void;
    __name__(): string;
}
//# sourceMappingURL=ConfigurableLogger.d.ts.map