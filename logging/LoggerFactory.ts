import {Container, Injectable} from "../ioc/Container";
import {Logger, LoggerForClassName} from "./Types";

export class LoggerFactory implements Injectable {
    constructor(private loggerFun: LoggerForClassName) {}
    __name__(): string { return 'LoggerFactory'; }
    getLogger(clazz: Injectable | string): Logger {
        const name = Container._name(clazz);
        return this.loggerFun(name);
    }
}