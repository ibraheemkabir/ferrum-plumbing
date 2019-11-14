import {Logger} from "./Types";
import {Injectable} from "../ioc/Container";

export class NilLogger implements Injectable, Logger {
    __name__(): string { return 'NilLogger'; }
    critical(errorType: string, message: string, error: Error): void { }
    debug(...args: any[]): void { }
    error(...args: any[]): void { }
    info(...args: any[]): void { }
}

function timed(msg: string) {
    return `${new Date().toISOString()} ${msg}`;
}

export class ConsoleLogger implements Injectable, Logger {
    constructor(private className: string) { }
    __name__(): string { return 'ConsoleLogger'; }
    critical(errorType: string, message: string, error: Error): void {
        console.error(timed(this.className), errorType, message, error);
    }

    debug(...args: any[]): void {
        console.debug(timed(this.className), ...args);
    }

    error(...args: any[]): void {
        console.error(timed(this.className), ...args);
    }

    info(...args: any[]): void {
        console.info(timed(this.className), ...args);
    }
}