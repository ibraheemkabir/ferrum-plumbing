import { Injectable } from "../ioc/Container";
import { Logger, LoggerForClassName } from "./Types";
export declare class LoggerFactory implements Injectable {
    private loggerFun;
    constructor(loggerFun: LoggerForClassName);
    __name__(): string;
    getLogger(clazz: any): Logger;
}
//# sourceMappingURL=LoggerFactory.d.ts.map