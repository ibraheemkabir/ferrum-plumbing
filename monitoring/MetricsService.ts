import {MetricsAggregator} from "./MetricsAggregator";
import {MetricsServiceConfig, MetricsUploader} from "./Types";
import {LoggerFactory} from "../logging/LoggerFactory";
import {Injectable} from "../ioc/Container";
import {Logger} from "../logging/Types";

export class MetricsService implements Injectable {
  private log: Logger;
  private interval: any;
  constructor(private aggregator: MetricsAggregator,
              private config: MetricsServiceConfig,
              private uploader: MetricsUploader,
              private logFac: LoggerFactory,
              ) {
    this.log = logFac.getLogger(MetricsService);
    this.cycle = this.cycle.bind(this);
    this.start = this.start.bind(this);
  }

  __name__(): string { return 'MetricsService'; }

  count(name: string, count?: number) {
    this.aggregator.count(name, count);
  }

  time(name: string, time: number) {
    this.aggregator.time(name, time);
  }

  start() {
    this.log.info('Starting the Metric service with upload intervals: ', this.config.period);
    this.interval = setInterval(() => { this.cycle(); }, this.config.period);
  };

  stop = () => {
    clearInterval(this.interval);
  };

  private async cycle() {
    const metrics = this.aggregator.reset();
    return this.uploader.uploadMetrics(metrics);
  }
}
