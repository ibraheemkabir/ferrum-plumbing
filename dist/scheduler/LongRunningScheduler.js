"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncUtils_1 = require("../utils/AsyncUtils");
const ValidationUtils_1 = require("../utils/ValidationUtils");
class FinishJobScheduleError extends Error {
}
exports.FinishJobScheduleError = FinishJobScheduleError;
class WrappedPromise {
    constructor(pFac) {
        this.pFac = pFac;
        this._completed = false;
        this._started = false;
        this.run = this.run.bind(this);
        this.result = this.result.bind(this);
        this.error = this.error.bind(this);
        this.completed = this.completed.bind(this);
        this.started = this.started.bind(this);
    }
    run() {
        ValidationUtils_1.ValidationUtils.isTrue(!this._started, 'Job is already started.');
        this._started = true;
        return this.pFac().then(r => {
            this._result = r;
            this._completed = true;
            return r === undefined ? null : r;
        }).catch(e => { this._error = e; this._completed = true; return e; });
    }
    result() { return this._result; }
    error() { return this._error; }
    completed() { return this._completed; }
    started() { return this._started; }
}
exports.WrappedPromise = WrappedPromise;
/**
 * To schedule long running Promises, and manage retries, failures.
 */
class LongRunningScheduler {
    constructor(logger, lookupDuration = 100) {
        this.lookupDuration = lookupDuration;
        this.jobs = new Map();
        this._died = false;
        this._interval = 0;
        this.intervalCall = () => {
            /**
             * Check running jobs. Run them if both, the time is right and previous task is complete.
             * If job is failed for any reason, retry until retry is exhausted.
             * If job succeeded, run the next job, passing the result of previous.
             * If retries exhausted, die. No other jobs will run.
             */
            if (this._died) {
                return;
            }
            const now = Date.now();
            const keys = Array.from(this.jobs.keys());
            for (const k of keys) {
                const j = this.jobs.get(k);
                if (j.current.completed()) {
                    if (!!j.current.error()) {
                        const e = j.current.error();
                        if (e instanceof FinishJobScheduleError) {
                            this.log.debug('Job completed: ' + k);
                            this.jobs.delete(k);
                        }
                        else {
                            const message = 'Error running job "' + k + '": ' + e.message;
                            this.log.debug(message);
                            if (j.options.logErrors) {
                                this.log.error(message, e);
                            }
                            if (j.retries >= j.options.retry.count) {
                                this.die();
                            }
                            else {
                                //Retry.
                                j.retries += 1;
                                this._run(j);
                                this.log.debug('Retried a new job for number ' + j.retries + ': ' + k);
                            }
                        }
                    }
                    else {
                        if (now > (j.lastRun + j.options.repeatPeriod)) {
                            // Schedule a new job.
                            j.lastResult = j.current.result();
                            j.retries = 0;
                            this._run(j);
                            this.log.debug('Ran a new job for ' + k);
                        }
                    }
                    // Pass if job is ongoing
                }
            }
        };
        this.log = logger.getLogger(LongRunningScheduler);
    }
    init() {
        this._interval = setInterval(this.intervalCall, this.lookupDuration);
    }
    schedulePeriodic(name, jobFactory, options) {
        const current = new WrappedPromise(() => jobFactory(undefined));
        const j = {
            retries: 0,
            options,
            current,
            lastRun: Date.now(),
            lastResult: undefined,
            jobFactory,
        };
        current.run();
        this.jobs.set(name, j);
    }
    _run(j) {
        const newJob = new WrappedPromise(() => j.jobFactory(j.lastResult));
        j.current = newJob;
        j.lastRun = Date.now();
        newJob.run();
    }
    died() {
        return this._died;
    }
    die() {
        this._died = true;
        if (this._interval) {
            clearInterval(this._interval);
        }
    }
    static async runForever(scheduler, period) {
        while (!scheduler.died()) {
            await AsyncUtils_1.sleep(period);
        }
        throw new Error('Long running scheduler died prematurely.');
    }
    __name__() { return 'LongRunningScheduler'; }
}
exports.LongRunningScheduler = LongRunningScheduler;
//# sourceMappingURL=LongRunningScheduler.js.map