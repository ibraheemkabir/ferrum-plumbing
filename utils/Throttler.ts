import { Injectable } from "ioc/Container";
import { sleep } from "./AsyncUtils";

export class Throttler implements Injectable {
    private nextSchedule: number = 0;
    
    constructor(private timeBetweenCalls: number = 250) {
    }

    __name__(): string { return 'Throttler'; }

    async throttle() {
        const now = Date.now();
        const executionTime = Math.max(now, this.nextSchedule)
        this.nextSchedule = executionTime + this.timeBetweenCalls;
        const sleepTime = executionTime - now;
        if (sleepTime > 0) {
            await sleep(sleepTime);
        }
    }

}