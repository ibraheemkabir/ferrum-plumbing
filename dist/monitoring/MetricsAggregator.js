"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MetricsAggregator {
    constructor() {
        this.counters = new Map();
        this.timersMax = new Map();
        this.timersAvg = new Map();
        this.timersCnt = new Map();
        console.log('MetricsAggregator is constructed');
    }
    count(name, count) {
        this.counters.set(name, (this.counters.get(name) || 0) + (count || 1));
    }
    time(name, time) {
        // Currently using the max strategy, i.e. keeping the max in a range. In future we should support
        // more advanced types of historical monitoring of timestamps
        if (this.timersCnt.has(name)) {
            const cnt = this.timersCnt.get(name);
            this.timersCnt.set(name, cnt + 1);
            const tAvg = this.timersAvg.get(name);
            this.timersAvg.set(name, tAvg + time / cnt * (time < tAvg ? -1 : 1));
            this.timersMax.set(name, Math.max(this.timersMax.get(name), time));
        }
        else {
            this.timersCnt.set(name, 1);
            this.timersMax.set(name, time);
            this.timersAvg.set(name, time);
        }
    }
    reset() {
        const rv = [];
        for (const key of this.counters.keys()) {
            rv.push({ key, count: this.counters.get(key), unit: 'Count' });
        }
        for (const key of this.timersCnt.keys()) {
            rv.push({ key: key + '.max', time: this.timersMax.get(key), unit: 'Milliseconds' });
            rv.push({ key: key + '.avg', time: this.timersAvg.get(key), unit: 'Milliseconds' });
        }
        this.counters = new Map();
        this.timersMax = new Map();
        this.timersAvg = new Map();
        this.timersCnt = new Map();
        return rv;
    }
}
exports.MetricsAggregator = MetricsAggregator;
//# sourceMappingURL=MetricsAggregator.js.map