import { Injectable } from "ioc/Container";
import {Logger, LogWriter} from "./Types";

const ConsoleLogWriter: LogWriter = console.log;

function timed(msg: string) {
    return `${new Date().toISOString()} ${msg}`;
}

export class ConfigurableLogger implements Injectable, Logger {
    constructor(
        private className: string,
        private criticalWriter: LogWriter,
        private errorWriter: LogWriter,
        private infoWriter: LogWriter,
        private debugWriter: LogWriter, ) {
    }

    critical(errorType: string, message: string, error: Error): void {
        this.criticalWriter(timed(this.className), errorType, message, error);
    }

    debug(...args: any[]): void {
        this.debugWriter(timed(this.className), ...args);
    }

    error(...args: any[]): void {
        this.errorWriter(timed(this.className), ...args);
    }

    info(...args: any[]): void {
        this.infoWriter(timed(this.className), ...args);
    }

    __name__(): string { return 'ConfigurableLogger'; }
}