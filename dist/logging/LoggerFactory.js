"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = require("../ioc/Container");
class LoggerFactory {
    constructor(loggerFun) {
        this.loggerFun = loggerFun;
    }
    __name__() { return 'LoggerFactory'; }
    getLogger(clazz) {
        const name = Container_1.Container._name(clazz);
        return this.loggerFun(name);
    }
}
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=LoggerFactory.js.map