"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MetricsService {
    constructor(aggregator, config, uploader, logFac) {
        this.aggregator = aggregator;
        this.config = config;
        this.uploader = uploader;
        this.logFac = logFac;
        this.stop = () => {
            clearInterval(this.interval);
        };
        this.log = logFac.getLogger(MetricsService);
        this.cycle = this.cycle.bind(this);
        this.start = this.start.bind(this);
    }
    __name__() { return 'MetricsService'; }
    count(name, count) {
        this.aggregator.count(name, count);
    }
    time(name, time) {
        this.aggregator.time(name, time);
    }
    start() {
        this.log.info('Starting the Metric service with upload intervals: ', this.config.period);
        this.interval = setInterval(() => { this.cycle(); }, this.config.period);
    }
    ;
    async cycle() {
        const metrics = this.aggregator.reset();
        return this.uploader.uploadMetrics(metrics);
    }
}
exports.MetricsService = MetricsService;
//# sourceMappingURL=MetricsService.js.map