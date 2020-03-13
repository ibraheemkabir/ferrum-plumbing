import {MetricsAggregator} from "./MetricsAggregator";
import {MetricsServiceConfig, MetricsUploader} from "./Types";
import {LoggerFactory} from "../logging/LoggerFactory";
import {Injectable} from "../ioc/Container";
import {Logger} from "../logging/Types";

export class MetricsService implements Injectable {
  private log: Logger;
  constructor(private aggregator: MetricsAggregator,
              private config: MetricsServiceConfig,
              private uploader: MetricsUploader,
              private logFac: LoggerFactory,
              ) {
    this.log = logFac.getLogger(MetricsService);
  }

  __name__(): string { return 'MetricsService'; }

  count(name: string, count?: number) {
    this.aggregator.count(name, count);
    this.cycle().catch(e => this.log.error('time', e));
  }

  time(name: string, time: number) {
    this.aggregator.time(name, time);
    this.cycle().catch(e => this.log.error('time', e));
  }

  private async cycle() {
    const metrics = this.aggregator.reset();
    return this.uploader.uploadMetrics(metrics);
  }
}
