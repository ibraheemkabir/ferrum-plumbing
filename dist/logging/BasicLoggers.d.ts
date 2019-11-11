import { Logger } from "./Types";
import { Injectable } from "../ioc/Container";
export declare class NilLogger implements Injectable, Logger {
    __name__(): string;
    critical(errorType: string, message: string, error: Error): void;
    debug(...args: any[]): void;
    error(...args: any[]): void;
    info(...args: any[]): void;
}
export declare class ConsoleLogger implements Injectable, Logger {
    private className;
    constructor(className: string);
    __name__(): string;
    critical(errorType: string, message: string, error: Error): void;
    debug(...args: any[]): void;
    error(...args: any[]): void;
    info(...args: any[]): void;
}
//# sourceMappingURL=BasicLoggers.d.ts.map