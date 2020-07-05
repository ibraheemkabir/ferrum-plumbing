import { Injectable } from "ioc/Container";
export declare class Throttler implements Injectable {
    private timeBetweenCalls;
    private nextSchedule;
    constructor(timeBetweenCalls?: number);
    __name__(): string;
    throttle(): Promise<void>;
}
//# sourceMappingURL=Throttler.d.ts.map