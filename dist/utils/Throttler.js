"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncUtils_1 = require("./AsyncUtils");
class Throttler {
    constructor(timeBetweenCalls = 250) {
        this.timeBetweenCalls = timeBetweenCalls;
        this.nextSchedule = 0;
    }
    __name__() { return 'Throttler'; }
    async throttle() {
        const now = Date.now();
        const executionTime = Math.max(now, this.nextSchedule);
        this.nextSchedule = executionTime + this.timeBetweenCalls;
        const sleepTime = executionTime - now;
        if (sleepTime > 0) {
            await AsyncUtils_1.sleep(sleepTime);
        }
    }
}
exports.Throttler = Throttler;
//# sourceMappingURL=Throttler.js.map