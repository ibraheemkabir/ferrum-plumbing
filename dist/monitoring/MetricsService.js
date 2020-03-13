"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MetricsService {
    constructor(aggregator, config, uploader, logFac) {
        this.aggregator = aggregator;
        this.config = config;
        this.uploader = uploader;
        this.logFac = logFac;
        this.log = logFac.getLogger(MetricsService);
    }
    __name__() { return 'MetricsService'; }
    count(name, count) {
        this.aggregator.count(name, count);
        this.cycle().catch(e => this.log.error('time', e));
    }
    time(name, time) {
        this.aggregator.time(name, time);
        this.cycle().catch(e => this.log.error('time', e));
    }
    async cycle() {
        const metrics = this.aggregator.reset();
        return this.uploader.uploadMetrics(metrics);
    }
}
exports.MetricsService = MetricsService;
//# sourceMappingURL=MetricsService.js.map