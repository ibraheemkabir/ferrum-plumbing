import {Metric, PeriodMetric, ScalarMetric} from "./Types";

export class MetricsAggregator {
  constructor() { }

  private counters = new Map<string, number>();
  private timersMax = new Map<string, number>();
  private timersAvg = new Map<string, number>();
  private timersCnt = new Map<string, number>();

  count(name: string, count?: number) {
    this.counters.set(name, (this.counters.get(name) || 0) + (count || 1));
  }

  time(name: string, time: number) {
    // Currently using the max strategy, i.e. keeping the max in a range. In future we should support
    // more advanced types of historical monitoring of timestamps
    if (this.timersCnt.has(name)) {
      const cnt = this.timersCnt.get(name)!;
      this.timersCnt.set(name, cnt + 1);
      const tAvg = this.timersAvg.get(name)!;
      this.timersAvg.set(name, tAvg + time / cnt * (time < tAvg ? -1 : 1));
      this.timersMax.set(name, Math.max(this.timersMax.get(name)!, time));
    } else {
      this.timersCnt.set(name, 1);
      this.timersMax.set(name, time);
      this.timersAvg.set(name, time);
    }
  }

  reset(): Metric[] {
    const rv: Metric[] = [];
    for(const key of this.counters.keys()) {
      rv.push({ key, count: this.counters.get(key)! } as ScalarMetric);
    }

    for(const key of this.timersCnt.keys()) {
      rv.push({ key: key + '.max', time: this.timersMax.get(key)! } as PeriodMetric);
      rv.push({ key: key + '.avg', time: this.timersAvg.get(key)! } as PeriodMetric);
    }

    this.counters = new Map<string, number>();
    this.timersMax = new Map<string, number>();
    this.timersAvg = new Map<string, number>();
    this.timersCnt = new Map<string, number>();
    return rv;
  }
}
